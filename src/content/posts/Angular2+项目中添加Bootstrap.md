---
title: "Angular2+项目中添加Bootstrap"
date: 2018-10-19 00:35:33
tags: ["Angular"]
slug: "Angular2-项目中添加Bootstrap"
---
大部分内容翻译自 <https://github.com/angular/angular-cli/wiki/stories-include-bootstrap>

Boostrap是一款很好用的CSS框架，但是如何把它加到Angular2项目里好像中文文档写的很少。下面就介绍下如何讲Bootstrap添加到Angular2+项目中。



## 如果你使用CSS

### 新建项目

先新建一个Angular2 项目然后cd到项目目录下。

```bash
ng new my-app
cd my-app
```


### 安装Bootstrap

新建好项目之后就需要将Bootstrap添加到项目中。使用—save可以把依赖顺便添加到package.json文件中

```bash
npm install bootstrap --save
```

### 修改项目配置

找到项目中的angular.json文件。在文件中的projects.architect.build.options下找到style属性。添加一条到bootstrap.min.css的路径。

配置文件build部分如下所示：


```json
"build": {
  "options": {
    "styles": [
      "./node_modules/bootstrap/dist/css/bootstrap.min.css",
      "styles.css"
    ],
  }
}
```

> 官网的路径写的是`../node_modules/bootstrap/dist/css/bootstrap.min.css` 但是我觉得他们可能写错了，node_modules和angular.json明明在同一层级。


### 测试项目

在app.component.html 添加以下代码，

```html
<button class="btn btn-primary">Test Button</button>
```

然后通过ng serve运行项目，打开浏览器访问`localhost:4200`，查看按钮样式是否改变。


## 如果你使用SASS

### 新建项目

先新建一个Angular2 项目然后cd到项目目录下。（注意这次有--style=scss）

```bash
ng new my-app --style=scss
cd my-app
```


### 安装Bootstrap

```bash
npm install bootstrap --save
```

### 修改项目配置

在 src/文件夹下新建一个文件_variables.scss。

将以下内容添加到_variables.scss文件中：

```scss
$icon-font-path: '../node_modules/bootstrap-sass/assets/fonts/bootstrap/';
```

在项目根目录下找到 styles.scss文件添加以下内容：

```scss
@import 'variables';
@import '../node_modules/bootstrap/scss/bootstrap';
```


### 测试项目

在app.component.html 添加以下代码，

```html
<button class="btn btn-primary">Test Button</button>
```

然后通过ng serve运行项目，打开浏览器访问localhost:4200，查看按钮样式是否改变。


为了确保项目已经配置好，可以打开_variables.scss添加：

```scss
$primary: red;
```

然后保存刷新网页查看字体颜色是否变成了红色。

