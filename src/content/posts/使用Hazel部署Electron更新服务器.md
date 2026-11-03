---
title: "使用Hazel部署Electron更新服务器"
date: 2018-06-19 17:13:32
tags: ["Electron"]
slug: "使用Hazel部署Electron更新服务器"
---
[Hazel](https://github.com/zeit/hazel)是一款轻量级的Electron 程序更新服务器，可以在[Now](https://zeit.co/now)上免费部署。它会自动从`GitHub Releases`中拉取更新文件，并且利用 GitHub CDN 的强大性能，下载很快。





## 安装

首先在自己电脑上安装一个 [Now桌面端](https://zeit.co/now#get-started)，然后创建一个账户登录进去。


然后通过命令行进入到项目更目录下，比如项目文件夹叫`app-project`，直接输入

```bash
now zeit/hazel
```

然后就根据提示，输入你github的用户名`ACCOUNT`以及仓库`REPOSITORY`的名字。

之后，now会给你一个更新的URL，需要把这个URL记下来，以后用得到，比如我的就是：`https://electrontest-xpugzqzjyt.now.sh `

## 使用

### 代码

在程序的主线程（main.js）里面添加以下代码：

```js
const { app, autoUpdater } = require('electron')

const server = <之前的更新URL地址>
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

然后就可以使用了。

### github端

在github网页直接发布release就好。

但是需要注意的是，windows端发布需要直接上传`.exe`文件和`.nupkg`文件以及一个`RELEASES`文件。**直接上传zip压缩文件是没用的！**

可以参考[electron-api-demos的release](https://github.com/electron/electron-api-demos/releases)


