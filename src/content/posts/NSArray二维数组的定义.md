---
title: "NSArray二维数组的定义"
date: 2015-08-01 17:42:47
tags: ["IOS"]
slug: "NSArray二维数组的定义"
---
初始化使用这个方法[[NSArray alloc] initWithObjects:……,nil];

~~~objectivec
//OC
NSArray *arr = [[NSArray alloc] initWithObjects:
				  [[NSArray alloc] initWithObjects: @"1",@"1",nil],
				  [[NSArray alloc] initWithObjects: @"2",@"2",@"2",nil],
				  [[NSArray alloc] initWithObjects: @"3",@"3",@"3",@"3",nil],
				  ,nil]; 
~~~



如果要初始化1000项，可以这样：

~~~objectivec
//OC
NSMutableArray *arr = [[NSMutableArray alloc] initWithCapacity:1];
    for (int i = 0; i<1000; i++) {
        [arr addObject:@"德玛西亚"];
    }
~~~

> 当然换成swift就超级简单了：

~~~swift
//swift
var arr = [
            ["1"],
            ["2","2"],
            ["3","3","3"]
            ]
~~~

初始化1000项:

~~~swift
//swift
var arr = [String](count: 1000, repeatedValue: "德玛西亚")
~~~

多维数组：

~~~swift
//swift
var arr = [[String]](count: 1000, repeatedValue: [String](count: 10, repeatedValue: "德玛西亚"))
~~~

> 好像每个人都是准备OC转swift，是不是只有我这个奇葩放掉了swift来重新学OC![](http://7xkfbb.com1.z0.glb.clouddn.com/15-7-16/47607869.jpg)
