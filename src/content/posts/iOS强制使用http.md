---
title: "iOS 强制使用http"
date: 2015-12-21 21:40:57
tags: ["IOS"]
slug: "iOS强制使用http"
---
iOS 9要求App内访问的网络必须使用HTTPS协议，这样就会导致所有的http请求全部失效了。为了让程序正常运行，可以强制程序使用http协议。

方法是 通过修改 `info.plist`，添加`NSAppTransportSecurity`->`NSAllowsArbitraryLoads`即可。



## 步骤

1. 点击`项目`->`info`；

2. 任意一栏点`＋`号添加`NSAppTransportSecurity`（类型为`Dictionary`）

3. `NSAppTransportSecurity`下面添加`NSAllowsArbitraryLoads`(类型为`Boolen`,值为`YES`)
4. 注意所有字段不要多了空格，然后就可以了。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-21/56147039.jpg)