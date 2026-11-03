---
title: "如何添加PCH文件"
date: 2016-01-21 16:21:38
tags: ["IOS"]
slug: "如何添加PCH文件"
---
PCH，pre-Compile Header（预编译头文件）,由编译器在建立工程时自动生成; 其中存放有工程中已经编译的部分代码; 在以后建立工程时不再重新编译这些代码。以前每个项目中会自动生成，但是这个东西被在Xcode6中被取消了，为了加快编译速度。如何在之后的项目中手动加入这个文件呢？



Xcode7中，点击new file。选中`iOS`->`other`->`PCH File`，创建一个新的PCH文件。

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-21/48844691.jpg)

然后在`Build Setting`->`Apple LLVM 7.0 -Language`->`Prefix Header`中添加PCH文件的文件路径，如图

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-21/74431299.jpg)

这样PCH文件就可以正常使用了，可以吧常用的头文件都写在PCH文件里面，避免每个头文件都要import一遍～


![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-21/59938014.jpg)

