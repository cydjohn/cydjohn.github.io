---
title: "React-Native推送消息"
date: 2019-06-28 00:28:20
tags: ["React-Native"]
slug: "React-Native推送消息"
---
这里我基本上直接用的[react-native-push-notification](https://github.com/zo0r/react-native-push-notification)， 但是使用途中还是遇到了几个小坑，费了一些时间才解决掉，这里记录下步骤。



## 安装

```bash
npm install --save react-native-push-notification 
```
or

```bash
yarn add react-native-push-notification
```

然后

```bash
react-native link react-native-push-notification
```

## iOS

iOS 安装需要手动把`react-native-push-notification` 项目添加到自己的项目里面。

右键点击工程目录下的`Libraries`->`Add Files`

![](/image/e67afc58-5231-4b21-908e-a58db0ab969b.png)

在`node_modules/react-native/Libraries/PushNotificationIOS`文件夹下找到 `RCTPushNotification.xcodeproj` 点击添加

![](/image/4a625874-2e88-4c2c-87cf-adf784a64ca0.png)

然后在 `General` -> `Linked Frameworks and Libraries` 添加 `libRCTPushNotifaction.a`


![](/image/6c52675c-ffde-4f53-9317-82fbb691efe3.png)

 找到 `Capabilities` -> `Background Modes`， 选中 `Remote notifications`以及 `Background Modes` -> `Remote notifications`。

![](/image/267b5dba-5c17-4a9c-9408-ba8c4a09f7c7.png)

> 如果找不到Remote notifications，说明你的开发者账号不支持推送，需要换一个账号（应该是要充了钱那种。


在AppDelegate.m 中添加

```objectivec
#import <React/RCTPushNotificationManager.h>
......
 // Required to register for notifications
 - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
 {
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
 }
 // Required for the register event.
 - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
 {
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
 }
 // Required for the notification event. You must call the completion handler after handling the remote notification.
 - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
                                                        fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
 {
   [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
 }
 // Required for the registrationError event.
 - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
 {
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
 }
 // Required for the localNotification event.
 - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
 {
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
 }

```

### 获取推送证书

从[苹果开发者中心](https://developer.apple.com/account/)登录。

选择 `Certificates` -> `Identifiers & Profiles` -> `Keys ▸ All `， 点击 `+` 创建一个新的密钥。

给密钥随便取个名字，比如`Push Notification Key` ， 然后选中`Apple Push Notifications service (APNs)`。

![](/image/e01eb1db-fa4f-4bbf-8b5b-f158ab3efe5b.jpeg)

点击`Continue` 然后`Confirm`，下载生成的密钥。密钥命名会像这样：`AuthKey_4SVKWF966R.p8`，其中 `4SVKWF966R` 就是 `Key ID`。此外我们还需要 `Team ID`，可以在[这个页面](https://developer.apple.com/account/#/membership)找到。


## Android

在 `AndroidManifest.xml`里面添加

```xml
    <!-- < Only if you're using GCM or localNotificationSchedule() > -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <permission
        android:name="${applicationId}.permission.C2D_MESSAGE"
        android:protectionLevel="signature" />
    <uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />
    <!-- < Only if you're using GCM or localNotificationSchedule() > -->

    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

    <application ....>
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_name"
                android:value="YOUR NOTIFICATION CHANNEL NAME"/>
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_channel_description"
                    android:value="YOUR NOTIFICATION CHANNEL DESCRIPTION"/>
        <!-- Change the resource name to your App's accent color - or any other color you want -->
        <meta-data  android:name="com.dieam.reactnativepushnotification.notification_color"
                    android:resource="@android:color/white"/>

        <!-- < Only if you're using GCM or localNotificationSchedule() > -->
        <receiver
            android:name="com.google.android.gms.gcm.GcmReceiver"
            android:exported="true"
            android:permission="com.google.android.c2dm.permission.SEND" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
                <category android:name="${applicationId}" />
            </intent-filter>
        </receiver>
        <!-- < Only if you're using GCM or localNotificationSchedule() > -->

        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationPublisher" />
        <receiver android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationBootEventReceiver">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
            </intent-filter>
        </receiver>
        <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationRegistrationService"/>

        <!-- < Only if you're using GCM or localNotificationSchedule() > -->
        <service
            android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerServiceGcm"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            </intent-filter>
        </service>
        <!-- </ Only if you're using GCM or localNotificationSchedule() > -->

        <!-- < Else > -->
        <service
            android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
            android:exported="false" >
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
        <!-- </Else> -->
```

在 `android/app/src/res/values/colors.xml`里面添加 **很关键！**

```xml
<resources>
    <color name="white">#FFF</color>
</resources>
```

`android/settings.gradle`中（运行react-native link时应该自动添加了）：

```gradle
include ':react-native-push-notification'
project(':react-native-push-notification').projectDir = file(‘../node_modules/react-native-push-notification/android')
```


`MainApplication.java` 中（运行react-native link时应该自动添加了）：

```java
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
      @Override
      protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactNativePushNotificationPackage() // <---- Add the Package
      );
    }
  };

  ....
}
```

## 代码

```javascript
var PushNotification = require('react-native-push-notification');

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM (OR FCM) SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});
```

其中：
`onRegister()`获得的token为每个设备唯一的识别号，需要记录下来，推送会用到。

`senderID`是谷歌firebase的推送id，如果不用谷歌的firebase可以不用管这里。

### 注册Firebase

我这里使用谷歌firebase，国内应该有别的推送服务比如极光推送，小米推送等等。

先到[firebase](https://console.firebase.google.com)创建一个项目，名字随便取。

![](/image/3166d13a-8c0e-4b80-8dee-7f74b3978d97.png)

然后注册一个新的安卓应用，其中安卓软件包名就是`build.gradle` 文件中的 `applicationId`

![](/image/547bd056-5d86-4451-9e96-3b1d310286f3.png)

点击下一步，根据提示下载`google-services.json`
然后把“google-services.json”文件移至 Android 应用模块的根目录。

![](/image/8804917f-21ed-4f63-b036-1620757b1d2b.png)



## 测试


下载 [Push Notification Tester](https://github.com/onmyway133/PushNotifications)， 这是一个可以用来测试iOS消息推送的软件，软件界面如下。填入`Key ID`，`Team ID`，密钥，`bundle id`以及获取的设备码，点击send即可测试。

![](/image/210c34da-55a7-488c-98a3-929a868ab03f.png)

-------

## Reference

https://github.com/zo0r/react-native-push-notification

https://facebook.github.io/react-native/docs/pushnotificationios.html#content

https://www.raywenderlich.com/8164-push-notifications-tutorial-getting-started