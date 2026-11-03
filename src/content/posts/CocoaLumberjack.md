---
title: "CocoaLumberjack"
date: 2015-12-23 16:41:14
tags: ["IOS"]
slug: "CocoaLumberjack"
---
<https://github.com/CocoaLumberjack/CocoaLumberjack>

CocoaLumberjack是一款log框架，支持iOS和Mac。最大的好处就是可以把Log分成不同等级，方便调适，从此抛弃NSLog。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/42692645.jpg)



## 安装

**CocoaPods:**

在`Podfile`中加上：

Objective-C

```ruby
platform :ios, '7.0'
pod 'CocoaLumberjack'
```
Swift

```ruby
platform :ios, '8.0'
pod 'CocoaLumberjack/Swift'
use_frameworks!
```
*或者：*

**Carthage**

在`Cartfile`中加上：

```
github "CocoaLumberjack/CocoaLumberjack"
```

*或者手动安装*

> 好麻烦不想写了……官网上有😷😷😷。 大概意思就是把`CocoaLumberjack/Lumberjack.xcodeproj`拖到项目中，编译然后选自己项目对应的框架。


## 用法

引入

```objectivec
#import <CocoaLumberjack/CocoaLumberjack.h>
```

Log分为以下几种，分别代表不同的等级

* DDLogError
* DDLogWarn
* DDLogInfo
* DDLogDebug
* DDLogVerbose

严重度：`DDLogError`>`DDLogWarn`>`DDLogInfo`>`DDLogDebug`>`DDLogVerbose`

通过下面这个语句可以设置调适的时候在控制台输出哪个等级的Log：

```objectivec
static const DDLogLevel ddLogLevel = DDLogLevelDebug;
```  

`DDLog`语法跟`NSLog`语法一摸一样

```objectivec
// Convert from this:
NSLog(@"Broken sprocket detected!");
NSLog(@"User selected file:%@ withSize:%u", filePath, fileSize);

// To this:
DDLogError(@"Broken sprocket detected!");
DDLogVerbose(@"User selected file:%@ withSize:%u", filePath, fileSize);
```

比如选了`DDLogLevelDebug`调试的时候只会在控制台输出`Debug`,`Info`,`Warn`和`Error`。

swift用法

```swift
//swift
DDLog.addLogger(DDTTYLogger.sharedInstance()) // TTY = Xcode console
DDLog.addLogger(DDASLLogger.sharedInstance()) // ASL = Apple System Logs

let fileLogger: DDFileLogger = DDFileLogger() // File Logger
fileLogger.rollingFrequency = 60*60*24  // 24 hours
fileLogger.logFileManager.maximumNumberOfLogFiles = 7
DDLog.addLogger(fileLogger)

...

DDLogVerbose("Verbose");
DDLogDebug("Debug");
DDLogInfo("Info");
DDLogWarn("Warn");
DDLogError("Error");
```

Objective-C用法：

```objectivec
[DDLog addLogger:[DDTTYLogger sharedInstance]]; // TTY = Xcode console
[DDLog addLogger:[DDASLLogger sharedInstance]]; // ASL = Apple System Logs

DDFileLogger *fileLogger = [[DDFileLogger alloc] init]; // File Logger
fileLogger.rollingFrequency = 60 * 60 * 24; // 24 hour rolling
fileLogger.logFileManager.maximumNumberOfLogFiles = 7;
[DDLog addLogger:fileLogger];

...

DDLogVerbose(@"Verbose");
DDLogDebug(@"Debug");
DDLogInfo(@"Info");
DDLogWarn(@"Warn");
DDLogError(@"Error");
```

### 如何输出有颜色的Log？

首先要去安装一个Xcode插件[XcodeColors](https://github.com/robbiehanson/XcodeColors)

**安装方法**

把项目下载下来，运行，然后重启Xcode。。。。点击`Load Bundle`就好


然后在项目中加入这两个语句（可以写在`- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions` 里面）：


```objective-c
// Standard lumberjack initialization
[DDLog addLogger:[DDTTYLogger sharedInstance]];

// And we also enable colors
[[DDTTYLogger sharedInstance] setColorsEnabled:YES];
```

**还没完！！！**

然后在Xcode中设置：

* Xcode中点击`Product` -> `Edit Scheme`
* 点击左边的`Run`，然后选中`Arguments`
* 添加一项新的`Environment Variable`叫`XcodeColors`，`value`写`YES`。

现在控制台输出的就是带有颜色的Log了，默认

- `DDLogError` : 红色
- `DDLogWarn`  : 橙色


**自定义颜色**

代码中加入：

```objectivec
// Let's customize our colors.
// DDLogInfo : Pink

#if TARGET_OS_IPHONE
UIColor *pink = [UIColor colorWithRed:(255/255.0) green:(58/255.0) blue:(159/255.0) alpha:1.0];
#else
NSColor *pink = [NSColor colorWithCalibratedRed:(255/255.0) green:(58/255.0) blue:(159/255.0) alpha:1.0];
#endif

[[DDTTYLogger sharedInstance] setForegroundColor:pink backgroundColor:nil forFlag:DDLogFlagInfo];

DDLogInfo(@"Warming up printer"); // Prints in Pink !
```

----

</br></br></br>

####有个小技巧：

创建一个pch文件，在这个文件里面引入

```objectivec
#import <CocoaLumberjack/CocoaLumberjack.h>
```

然后设置log等级

```objectivec
static const DDLogLevel ddLogLevel = DDLogLevelDebug;
``` 

整个项目的其它文件就都可以正常使用`DDLog`了~

> 对于如何创建pch文件，以及什么是pch文件有疑问的同学[传送门](http://caoyudong.com/2016/01/21/如何添加PCH文件/)




