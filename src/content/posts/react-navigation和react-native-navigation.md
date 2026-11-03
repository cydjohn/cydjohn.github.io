---
title: "react-navigation和react-native-navigation"
date: 2017-10-04 00:59:38
tags: ["React-Native"]
slug: "react-navigation和react-native-navigation"
---
写项目的时候肯定会遇到实现类似于iOS 的Navigation Controller或者Tab bar之类的界面。官方只有一个`NavigatorIOS`的控件可以用，但是这个控件只能用在iOS平台，安卓的要另外重写，十分鸡肋。所以官方还提供了两个控件可以选择：react-navigation 和 react-native-navigation。这两个的区别我感觉网上写的很少，所以写这篇博客来记下两个区别。。。

> 当然如果懒得看完，可以直接用这个结论：   
> **用 react-navigation！！！**  
> **好用的多！！！**





## react-native-navigation

react-native 版本需要大于 0.43，nmp 版本大于 3.0

### 安装

```shell
yarn add react-native-navigation@latest
```

#### iOS 安装

通过 /iOS/<project name>.xcodeproj 打开项目

1. `Libraries`->`Add files to [project name]` 添加(Add) `./node_modules/react-native-navigation/ios/ReactNativeNavigation.xcodeproj`
![](http://7xkfbb.com1.z0.glb.clouddn.com/17-9-6/82366898.jpg)
2. 点击`Build Phases`，在 `Link Binary With Libraries`里添加 `libReactNativeNavigation.a`
![](http://7xkfbb.com1.z0.glb.clouddn.com/17-9-6/92007932.jpg)
3. 点击`Build Settings`，在`Header Search Paths`里添加 `$(SRCROOT)/../node_modules/react-native-navigation/ios`，确保是`recursive`模式。
![](http://7xkfbb.com1.z0.glb.clouddn.com/17-9-6/18147584.jpg)
4. 修改`AppDelegate.m`如下

```OC

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
#ifdef DEBUG
  //  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
  
  
  // **********************************************
  // *** DON'T MISS: THIS IS HOW WE BOOTSTRAP *****
  // **********************************************
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  
  /*
   // original RN bootstrap - remove this part
   RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
   moduleName:@"example"
   initialProperties:nil
   launchOptions:launchOptions];
   self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
   UIViewController *rootViewController = [UIViewController new];
   rootViewController.view = rootView;
   self.window.rootViewController = rootViewController;
   [self.window makeKeyAndVisible];
   */
  
  
  return YES;
}
```


#### Android 安装


在`android/settings.gradle`里面添加：

```json
include ':react-native-navigation'
 project(':react-native-navigation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-navigation/android/app/')
```

更新`android/app/build.gradle`文件如下：

```json
 android {
     compileSdkVersion 25
     buildToolsVersion "25.0.1"
     ...
 }

 dependencies {
     compile fileTree(dir: "libs", include: ["*.jar"])
     compile "com.android.support:appcompat-v7:23.0.1"
     compile "com.facebook.react:react-native:+"
     compile project(':react-native-navigation')
 }
```

修改 `android/app/src/main/java/com/yourproject/MainActivity.java`文件，MainActivity 应该继承 `com.reactnativenavigation.controllers.SplashActivity` 而不是 `ReactActivity`

```java
import com.reactnativenavigation.controllers.SplashActivity;

 public class MainActivity extends SplashActivity {

 }
```

`MainApplication.java`文件添加以下内容

```java
 import com.reactnativenavigation.NavigationApplication;

 public class MainApplication extends NavigationApplication {

     @Override
     public boolean isDebug() {
         // Make sure you are using BuildConfig from your own application
         return BuildConfig.DEBUG;
     }

     protected List<ReactPackage> getPackages() {
         // Add additional packages you require here
         // No need to add RnnPackage and MainReactPackage
         return Arrays.<ReactPackage>asList(
             // eg. new VectorIconsPackage()
         );
     }

     @Override
     public List<ReactPackage> createAdditionalReactPackages() {
         return getPackages();
     }
 }
```


更新 `AndroidManifest.xml` 把 **android:name** 的值改成 `.MainApplication`

```xml
 <application
     android:name=".MainApplication"
     ...
 />
```

### 用法
这里我们实现三个页面来介绍react-native-navigation的用法。

```javascript
//FirstTabScreen.js

import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Button } from 'react-native';

export default class FirstTabScreen extends Component {
  onPushAnother = () => {
    this.props.navigator.push({
      screen: 'example.PushedScreen',
      title: 'Pushed Screen'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPushAnother}
          title="Push Another Screen" />
        <Text style={styles.content}>first screen</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    textAlign: 'center',
    marginTop: 10,
  },
});


//SecondTabScreen.js && PushedScreen.js(改下<Text>里面的文字就好)

import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';

export default class SecondTabScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.content}>second screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    textAlign: 'center',
    marginTop: 10,
  },
});

```

<br>

<br>

----

以及 `index.js`，这是`react-native-navigation`中最重要的部分，没有之一。注意看这里的操作，通过`Navigation.registerComponent`方法注册所有的页面，每个页面手动分了一个id，比如`example.FirstTabScreen`就是`“example.FirstTabScreen”`，之后如果用到页面就通过这个id把它调出来。而 `registerScreens()`方法只能调用一次就是说**你要把你项目中所有的页面全部在这里写一遍！！！**当时我也很震惊，哪有这么写框架的，一点也不优雅，但是它真是这么干的，而且官方的例子也是这么写的:

```javascript
//index.js
import { Navigation } from 'react-native-navigation';

import FirstTabScreen from './FirstTabScreen';
import SecondTabScreen from './SecondTabScreen';
import PushedScreen from './PushedScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => FirstTabScreen);
  Navigation.registerComponent('example.SecondTabScreen', () => SecondTabScreen);
  Navigation.registerComponent('example.PushedScreen', () => PushedScreen);
}
```

以上页面放到一个screen文件夹中。


然后`index.ios.js`加入以下代码：

```javascript
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.FirstTabScreen', // this is a registered name for a screen
      title: 'Screen One'
    },
    {
      label: 'Two',
      screen: 'example.SecondTabScreen',
      title: 'Screen Two'
    }
  ]
});
```

### 效果

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-10-3/74589375.jpg)

## react-navigation

这个是airbnb团队开发的，个人感觉比`react-native-navigation`好用，强烈推荐

### 安装

```bash
npm install --save react-navigation
```
or

```bash
yarn add react-navigation
```

修改`index.ios.js`代码：

```javascript
import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

export default const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
});

// if you are using create-react-native-app you don't need this line
AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
```

就可以了，十分方便

### 用法
这里我们同样用三个页面来介绍react-navigation的用法。


```javascript
//FirstTabScreen.js
import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PushedScreen from './PushedScreen'


class Fcreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button
                onPress={() => this.props.navigation.navigate('Pushed', {name: 'Pushed Screen'})}
                    title="Push Another Screen" />
                <Text style={styles.content}>first screen</Text>
            </View>
        );
    }
}

export default class FirstTabScreen extends Component {
    render() {
        FPage = StackNavigator({
            FirstTabScreen: {
                screen: Fcreen,
            },
            Pushed: {
                navigationOptions: ({ navigation }) => ({
                    title: 'Pushed Screen',
                }),
                
                screen: PushedScreen,
            },
        });
        return <FPage/>

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        textAlign: 'center',
        marginTop: 10,
    },
});



//SecondTabScreen.js 和 PushedScreen.js(改改字符串)

import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';

export default class SecondTabScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.content}>second screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    textAlign: 'center',
    marginTop: 10,
  },
});

```

以及`index.ios.js` 或 `index.android.js`

```javascript
import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import FirstTabScreen from './view/FirstTabScreen'
import SecondTabScreen from './view/SecondTabScreen'


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

const test = TabNavigator({
  First: {
    screen: FirstTabScreen,
  },
  Second: {
    screen: SecondTabScreen,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});


// if you are using create-react-native-app you don't need this line
AppRegistry.registerComponent('test', () => test);
```



### 效果

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-10-4/80706001.jpg)

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-10-9/72844807.jpg)