---
title: "Could not launch “My App” process launch failed： Security"
date: 2015-11-08 16:39:12
tags: ["IOS"]
slug: "Could-not-launch-“My-App”-process-launch-failed：-Security"
---
1. iOS9真机调试的时候，Xcode会弹出`Could not launch "My App" process launch failed: Security`。
	
	![](http://7xkfbb.com1.z0.glb.clouddn.com/15-11-8/5012101.jpg)
	


2. 这时会发现手机上已经安装了你的应用了。点击应用又会弹出
	 ![](http://7xkfbb.com1.z0.glb.clouddn.com/15-11-8/65641080.jpg)
	 
	


**当时我就跪了！！设置那么大！！你让我去哪里找！！！**

 把设置遍历了一遍终于找到了：


> `设置` -> `通用` -> `描述文件` -> "你真机运行的AppleID" 选择信任


然后就可以了。