---
title: "CUICatalog：Invalid asset name supplied：(null)"
date: 2015-09-07 11:33:12
tags: ["IOS"]
slug: "CUICatalog：Invalid-asset-name-supplied：-null"
---
今天遇到了个神奇的问题：

~~~
2015-09-06 14:32:32.246 B-smart[1056:65917] CUICatalog: Invalid asset name supplied: (null)
2015-09-06 14:32:32.246 B-smart[1056:65917] Could not load the "(null)" image referenced from a nib in the bundle with identifier "com.scut.B-smart"
~~~

查了下，这个提示的意思是说你用了这个方法：`[UIImage imageNamed:name];`但是这个name却是空的，所以就报了这个错了。

解决方法，在项目中搜索`[UIImage imageNamed:`,然后打印看看所谓的name是否为空。找到后替换。