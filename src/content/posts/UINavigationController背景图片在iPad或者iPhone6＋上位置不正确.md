---
title: "UINavigationController背景图片在iPad或者iPhone6＋上位置不正确"
date: 2016-03-09 11:55:48
tags: ["IOS"]
slug: "UINavigationController背景图片在iPad或者iPhone6＋上位置不正确"
---
之前调用了方法：

```objectivec
[self.navigationController.navigationBar setBackgroundImage:[UIImage imageNamed:@"image_nav_bar"]  forBarMetrics:UIBarMetricsDefault];
```
 后布局在iPhone 6 plus上看会变成这样
![](http://7xkfbb.com1.z0.glb.clouddn.com/16-3-9/38501689.jpg) 



为了防止这种情况出现应该讲图片做一个拉伸，所以这个方法应该写错这样：

```objectivec
[self.navigationController.navigationBar setBackgroundImage:[[UIImage imageNamed:@"image_nav_bar"] resizableImageWithCapInsets:UIEdgeInsetsMake(0, 0, 0, 0) resizingMode:UIImageResizingModeStretch] forBarMetrics:UIBarMetricsDefault];
```

现在背景图片就可以正常显示了～