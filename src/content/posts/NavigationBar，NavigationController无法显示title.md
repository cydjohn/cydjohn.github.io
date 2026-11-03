---
title: "NavigationBar，NavigationController无法显示title"
date: 2016-03-09 10:38:47
tags: ["IOS"]
slug: "NavigationBar，NavigationController无法显示title"
---
做项目的时候发现在一个界面里面，设置 self.title = @"XXX", 但是项目运行的时候发现并没有显示内容。这个问题困扰了我好久。。。直到今天



我用谷歌搜了一下，点开了第一条，找到了解决办法：

调用这一条函数即可：

```objectivec
[self.navigationController.navigationBar.topItem setTitle:@"XXX"];
```

为什么我要一直用百度查呢？我什么我就不突发奇想尝试下谷歌呢？这样问题早就解决了……我真是菜的抠脚