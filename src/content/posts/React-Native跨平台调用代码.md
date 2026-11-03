---
title: "React-Native跨平台调用代码"
date: 2018-12-11 23:31:38
tags: ["React-Native"]
slug: "React-Native跨平台调用代码"
---
有时候React-Native需要访问原生API，但是官方并没有封装，这时候就需要自己手动调用原生代码，比如调用安卓的Toast，比如需要调用某些硬件接口。这篇文章主要记录了如何调用安卓和iOS原生方法。



## iOS

首先创建一个`bridge`文件，我这里叫MessageBridge，继承RCTEventEmitter类，以及实现RCTBridgeModule协议，如下所示。

```objective-c
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Foundation/Foundation.h>
@interface MessageBridge : RCTEventEmitter<RCTBridgeModule>

@end
```

为了实现RCTBridgeModule协议，类里面还需要加上RCT_EXPORT_MODULE()宏。这个宏是为了导出模块的方法给Javascript，假设不传递参数给他就默认导出当前类的名字，如果指定了Javascript调用的就是你指定的名字。比如下面代码在JavaScript中看到的模块名字就是`MessageBridge`。

```objective-c
#import "MessageBridge.h"
@implementation MessageBridge
RCT_EXPORT_MODULE();
@end
```

消息传递我分了两类，一个是从原生平台直接回调消息，一个是原生平台给JavaScript推送消息。

### 回调消息

iOS可以直接实现一个Promise给React-Native。使用ES2016中的`async/await`关键字可以极大的简化代码。

```objective-c
RCT_REMAP_METHOD(getMessage,:(NSString *)message
                 findEventsWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSDictionary *data = @{@"success":@YES,@"message":[message stringByAppendingString:@" (Promises)"]};
  if (data) {
    resolve(data);
  } else {
    NSError *error = [[NSError alloc] initWithDomain:@"show" code:200 userInfo:nil];
    reject(@"no_events", @"There were no events", error);
  }
}
```

这样的话JavaScript可以得到一个Promise，使用`await`关键字就可以得到回调的值了。

```javascript
  async getMessage() {
    try {
      var data = await MessageBridge.getMessage('Get Message');
      this.setState({ "getMessage": data.message });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }
```

### 推送消息

对于某些特殊情况需要从原生平台推送消息给React-Native，我们可以通过实现`supportedEvents`方法然后调用`self sendEventWithNam:：`就可以完成消息的推送了。

> 注意supportedEvents一定要实现不然会报错。

```objective-c
#import "MessageBridge.h"
@implementation MessageBridge
RCT_EXPORT_MODULE();
RCT_REMAP_METHOD(pushMessage,:(NSString *)message)
{
  NSDictionary *data = @{@"success":@YES,@"message":[message stringByAppendingString:@" (send event)"]};
  [self sendEventWithName:@"PushMessage" body:data];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"PushMessage"];
}
@end
```

## Android

首先在`android/app/src/main/java/com/(your-app-name)/`文件夹下创建一个`MessageBridge`类，继承ReactContextBaseJavaModule。

然后要实现`ReactContextBaseJavaModule`中的`getName`方法，这个方法返回JavaScript调用时需要的类名。

```java
import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.Promise;


public class MessageBridge extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "MessageBridge";
    }
}
```

然后在同一个目录下创建一个CustomReactPackages.java文件，这个文件用来导出自定的package名字，文件内容如下：

```java
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomReactPackages implements ReactPackage{
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new MessageBridge(reactContext)); // <-- 添加刚创建的类名

        return modules;
    }
}
```

最后在MainApplication.java文件中添加CustomToastPackage()：

> 注意是MainApplication.java不是MainActivity.java，之前弄错了bug调的我怀疑人生。

```java
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CustomToastPackages()); // <-- package name.
}
```

## 回调消息

安卓也可以直接实现一个Promise给React-Native。

```java
@ReactMethod
public void getMessage(String message, Promise promise) {
    try {
        WritableMap data = Arguments.createMap();
        data.putString("status","success");
        data.putString("message", message + " (promise)");
        promise.resolve(data);
    } catch(IllegalViewOperationException e){
        promise.reject("error", e);
    }
}
```

其中注释@ReactMethod是为了将方法暴露给JavaScript。加了@ReactMethod后会将Java变量类型一一映射成JavaScript的变量类型

> Boolean -> Bool    
> Integer -> Number   
> Double -> Number  
> Float -> Number  
> String -> String  
> Callback -> function  
> ReadableMap -> Object   
> ReadableArray -> Array

JavaScript端代码跟iOS一样，使用`await`关键字就可以得到回调的值了。

```javascript
  async getMessage() {
    try {
      var data = await MessageBridge.getMessage('Get Message');
      this.setState({ "getMessage": data.message });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }
```

## 推送消息

安卓中推送消息给`React-Native`最简单的方法就是通过使用`ReactContext`中的`RCTDeviceEventEmitter`方法，如下面代码所示：

```java
private void sendEvent(ReactContext reactContext,
                       String eventName,
                       @Nullable WritableMap params) {
    reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
}

@ReactMethod
public void pushMessage(String message) {
    WritableMap data = Arguments.createMap();
    data.putString("status","success");
    data.putString("message",message + " (send event)");
    this.sendEvent(this.mReactContext,"PushMessage",data);
}
```

然后在JavaScript端可以直接使用`DeviceEventEmitter`来监听事件

```javascript
componentWillMount: function() {
  DeviceEventEmitter.addListener('keyboardWillShow', function(e: Event) {
    // handle event.
  });
}
```



> Demo 地址：https://github.com/cydjohn/RNNativeModules





