---
title: "如何用C#写一个加法计算器（一）"
date: 2015-08-02 11:05:32
tags: ["C＃"]
slug: "如何用C＃写一个加法计算器（一）"
---
>我用的是VS2013，windows7。



首先，新建个项目。选择 ***Visual C# -> windows***，然后项目名称随意。

![新建项目](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-2/64743553.jpg)

然后就会直接来到这个界面

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-2/525898.jpg)

当然有些东西可能跟我的不一样，没关系，继续看就好～～

窗口中那个Form1就是程序窗口了，鼠标放到上面会出现这种效果，拖动边框可以任意改变它的大小。现在直接点击运行是可以跑的，只是只有个窗口，并没有什么功能……

![Form1](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-18/35057443.jpg)


## 界面
然后找到***工具箱*** ，如果界面上没有可以从最上面 ***视图*** 一栏找到

![工具箱](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-18/7029636.jpg)

从工具箱中找到 ***Button*** 控件和  ***TextBox*** 控件，直接拖到窗口上（找不到可以尝试下工具箱最上面那个搜索框）

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-2/46756365.jpg)

如果要改变Button的显示值，先选中那个要修改的Button，然后在属性栏修改，属性栏一般在VS的最右边，如果找不到可以从最上面 ***视图*** 一栏找到。然后修改 ***Text*** 的值 为 ***1***。比如，现在把这个button显示值改为1。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-18/99866980.jpg)

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-18/87741943.jpg)

如果要修改控件的其他属性都可以在属性栏修改。**强烈建议修改（Name）的值**, 因为如果只是单纯的拖控件到话，VS会自动帮你命名。第一个Button就会叫做 Button1 ，第二个就会叫做 Button2。![](http://7xkfbb.com1.z0.glb.clouddn.com/15-7-16/47607869.jpg) （你上班的时候这么命名会被组长打死

然后现在选中Button1，拖动边界把他调整到自己想要的大小。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-18/10858189.jpg)

然后同理，放更多的button到界面上来，调整为一个计算器的样子，我是调成了这样：

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-18/34890069.jpg)

现在运行下就可以得到计算器的界面了，只是无论怎么点击按键都不会有用，因为后面的逻辑还没有加上。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-2/85573366.jpg)

[**如何用C#写一个加法计算器（二）**](http://caoyudong.com/2015/08/02/%E5%A6%82%E4%BD%95%E7%94%A8C%EF%BC%83%E5%86%99%E4%B8%80%E4%B8%AA%E5%8A%A0%E6%B3%95%E8%AE%A1%E7%AE%97%E5%99%A8%EF%BC%88%E4%BA%8C%EF%BC%89/)