---
title: "Electron中使用Bootstrap和JQuery"
date: 2018-05-01 17:07:57
tags: ["Electron"]
slug: "Electron中使用Bootstrap和JQuery"
---
一般网页都可以直接使用`bootstrap`和`JQuery` 的CDN来请求`bootstrap`和`JQuery`。但是做electron应用的时候希望做成本地的，因为不是每时每刻都可以联网。原以为 `npm` 安装之后直接用就可以，结果遇到了很多坑，这里记录下。



## 安装
首先使用npm安装bootstrap 和 JQuery

```bash
npm install bootstrap --save
npm install JQuery --save
```

然后就会发现有一行警告

> npm WARN bootstrap@4.1.1 requires a peer of popper.js@^1.14.3 but none is installed. You must install peer dependencies yourself.


于是还需要安装 `popper.js`

```bash
npm install popper.js --save
```

安装部分就完成了。

## 使用

bootstrap 直接从安装文件里面拿就好，地址是 `./node_modules/bootstrap/dist/css/bootstrap.min.css`

```html
<link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
```

JQuery 就很坑了，google了好多资料，electron里面你应该这么写：


```html
<script>window.$ = window.jQuery = require('jquery');</script>
```

不然会报错，很多神奇的错误。



-------



## 关于bootstrap-datepicker的一个坑

~~使用npm安装的bootstrap-datepicker完全没用，我从网上复制粘贴了整个`bootstrap-datepicker.js` 的代码，本地新建文件，然后`<script src = "bootstrap-datepicker.js"></script>`才可以正常使用~~

后来发现可以这样：

```bash
npm install bootstrap-datepicker --save
```
然后

```html
<script> require('bootstrap-datepicker');</script>
```

> 菜的抠脚






