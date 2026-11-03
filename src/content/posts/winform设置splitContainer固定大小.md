---
title: "winform设置splitContainer固定大小"
date: 2016-03-20 21:15:42
tags: ["C＃"]
slug: "winform设置splitContainer固定大小"
---
比如，要设置左边的`pannel`固定大小：

```csharp
this.splitContainer1.IsSplitterFixed = false;
this.splitContainer1.FixedPanel = FixedPanel.Panel1;
```

其中

```csharp
this.splitContainer1.IsSplitterFixed = false;
```

用来设置`splitContainer1`的大小是否可以改变

`IsSplitterFixed`获取或设置一个值，用以指示拆分器是固定的还是可移动的。如果为**false**就可以改变，**true**不可以改变。


> 究竟为什么我来趟.NET这个坑，明明js写桌面端那么容易