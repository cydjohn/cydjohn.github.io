---
title: "消除Cocoapods中的警告"
date: 2016-02-26 17:08:33
tags: ["IOS", "cocoapods"]
slug: "消除Cocoapods中的警告"
---
我们在使用CocoaPods的时候经常会发现一些pod会出现一些警告，这时在 `Podfile`中加入一句`inhibit_all_warnings!`就可以消除这些pod中的警告。强迫症专用啊！！

当然，我是无所谓，对于我这种低等级程序猿来说，只要程序能运行就好了～



比如 

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-2-26/90730174.jpg)

加了之后重新`pod install`就没有了

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-2-26/19761672.jpg)