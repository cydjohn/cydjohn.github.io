---
title: "CMMotionActivityManager"
date: 2018-09-24 21:14:44
tags: ["iOS"]
slug: "CMMotionActivityManager"
---
现在很多应用都需要检测用户的运动情况，而iPhone上有一整套传感器可以帮助开发者确定用户的运动状况例如 气压计，陀螺仪，磁强计，加速度传感器和GPS模块，然而这些传感器模块的数据需要通过CPU计算得到判断得到结果，如果一直在后台运行程序来不断获取数据容易让app变得十分耗电，比如美国的一家新型保险公司root。他们通过app来检测得到用户的驾驶数据，然后通过计算得到用户的驾驶习惯，评估之后会给出用户相应的保险报价。比如这个人加速过快或者转弯过猛就说明这个人驾驶习惯不好，保险费用就会相对来说高一些。然后我下载了这个app之后惊奇的发现，就算半夜我没开车它也一直在后台获取我的数据，导致我手机一晚上耗电百分之十几（新的iPhone 8P，平时一晚上大约掉1%的电）



## M系列协处理器

对于这个问题，苹果有更好的解决办法了。自从2013年的iPhone5s之后每一台iPhone和Apple Watch上都装上了**M系列**协处理器。通过这个专用硬件系统可以将所有传感器处理工作从CPU上卸载掉，从而减少电量的使用。CMMotionActivityManager 由 Core Motion 框架提供。Core Motion 通过调用**M系列**协处理器来获取用户运动情况。

## CMMotionActivity

CMMotionActivity 对每种运动都会有个布尔值属性，并且还有一个设备是否处于静止状态的属性。也就是说用户可能同时处于多个状态，比如开着车突然停在了红灯前，那么 automotive和 stationary都会为 ture。

属性列表如下：

|属性|解释|
|:---|:---|
|stationary|禁止状态|
|walking|走路|
|running|跑步|
|cycling|自行车|
|automotive|交通工具（如果是在陆地上可以视为开车，如果是在水里可以视为在坐船）|
|unknown|无法识别|


为了方便理解我自己写了个app，放几张截图来解释下，其中红色背景代表熟悉布尔值为`false`的情况，绿色为`true`的情况：

这是你在开车 *（刚开始开车不会识别，大约行驶1分钟之后显示为在开车）*：

![](/image/d7fbe7a4-ae14-45bf-a3e7-1cb23e7f2640.PNG)

这是你开车停到了红灯前：

![](/image/359d0179-68d9-4e40-8bab-f4f927cafd66.PNG)

这是手机放着不动：

![](/image/7aff2260-cb42-4b58-8d23-87a981ddb981.PNG)

这是跑步或者你快速的摇手机：

![](/image/e62d20ad-05a2-46d7-9e40-ec072d1a07c2.PNG)

这是人在走路或者慢慢的摇手机：

![](/image/8113be39-f23f-408d-b3c1-686b937caee3.PNG)


## 核心代码



```swift
import CoreMotion
let manager = CMMotionActivityManager()
manager.startActivityUpdates(to: .main) { (activity) in
    guard let activity = activity else {
        return
    }
    if activity.walking {
        print("🚶‍")
    }
    if activity.running {
        print("🏃‍")
    }
    if activity.cycling {
        print("🚴‍")
    }
    if activity.automotive {
        print("🚗")
    }
    if activity.stationary {
        print("🛑")
    }
}
```

> https://developer.apple.com/documentation/coremotion/cmmotionactivity