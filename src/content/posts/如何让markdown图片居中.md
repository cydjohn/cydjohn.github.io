---
title: "如何让Markdown图片居中"
date: 2015-07-15 15:13:57
tags: ["Mac"]
slug: "如何让markdown图片居中"
---
一般在MarkDown中通过

	 '![](url)' 
	 
添加图片看到的都是这样的：

![](/image/515efc15-56d8-4018-996c-1337b5d2edd8.JPG)

但是如果我想让图片居中该怎么做呢？查了点资料之后发现可以这样：

```html
<div style="text-align: center">
<img src="url"/>
</div>
```


把这几行代码直接加到markdown里面就可以了，url换成图片的地址，就像这样：


<div style="text-align: center">
	<img src="/image/515efc15-56d8-4018-996c-1337b5d2edd8.JPG"/>
</div>
	
相当于手动嵌入了HTML代码
	
**或者**  

```html
<center>
![](url)
</center>
```


<center>

![](/image/515efc15-56d8-4018-996c-1337b5d2edd8.JPG)

</center>


