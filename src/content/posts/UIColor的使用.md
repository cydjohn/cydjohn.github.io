---
title: "UIColor的使用"
date: 2015-08-01 17:42:22
tags: ["IOS"]
slug: "UIColor的使用"
---
一般定义一个控件或者一个view的颜色可以这样：

~~~objectivec
//OC
self.backgroundColor = [UIColor redColor];
~~~
或者这样：

~~~objectivec
//OC
[view setBackgroundColor:[UIColor redColor]];
~~~



其中redColor是UIColor定义好的，直接用就好了。
另外UIColor定义过的还有这些：
  
~~~objectivec
UIColor blackColor
UIColor darkGrayColor
UIColor lightGrayColor
UIColor whiteColor
UIColor grayColor
UIColor redColor
UIColor greenColor
UIColor blueColor
UIColor cyanColor
UIColor yellowColor
UIColor magentaColor
UIColor orangeColor
UIColor purpleColor
UIColor brownColor
UIColor clearColor
UIColor lightTextColor
UIColor darkTextColor
UIColor groupTableViewBackgroundColor
UIColor viewFlipsideBackgroundColor
UIColor scrollViewTexturedBackgroundColor
UIColor underPageBackgroundColor
~~~

如果要自己定义RGB就需要用到下面的方法：

~~~objectivec
//OC
self.backgroundColor = [UIColor colorWithRed:226.0/255.0 green:231.0/255.0 blue:237.0/255.0 alpha:1.0];
~~~
其中alpha为透明度。。。

另外如果你发现设置了自定义的RGB控件颜色并没有变，一直都是白色，你可能犯了这个错（忘记除以255……）

~~~objectivec
//OC
self.backgroundColor = [UIColor colorWithRed:226 green:231 blue:237 alpha:1.0];
~~~

虽然错误很低级，但是我还是被它折腾了一下午![](http://7xkfbb.com1.z0.glb.clouddn.com/15-7-16/47607869.jpg)

然后顺便再说一个，如果你发现控件颜色一直是黑色，可能犯了这个错：

~~~objectivec
//OC
self.backgroundColor = [UIColor colorWithRed:226/255 green:231/255 blue:237/255 alpha:1.0];
~~~
注意要除以 255.0 而不是255。因为int/int结果还是int，而它需要一个float值～
