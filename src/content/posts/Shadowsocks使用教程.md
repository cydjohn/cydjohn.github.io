---
title: "Shadowsocks使用教程"
date: 2015-09-24 01:16:24
tags: ["Linux"]
slug: "Shadowsocks使用教程"
---
> Shadowsocks（中文名称：影梭）是使用Python、C++、C#等语言开发的、基于Apache许可证的开放源代码软件，用于保护网络流量、加密数据传输。Shadowsocks使用Socks5代理方式。

> Shadowsocks分为服务器端和客户端。在使用之前，需要先将服务器端部署到服务器上面，然后通过客户端连接并创建本地代理。

> 在中国大陆，本工具也被广泛用于突破防火长城（GFW），以浏览被封锁、屏蔽或干扰的内容。在2015年8月22日，Shadowsocks原作者Clowwindy称受到了中国政府的压力，宣布停止维护此项目并移除其用户页面所载的源代码。


**但是如果人在国外，就可以反过来，通过国内的服务器去下载和访问一些“有版权问题”的资源。由于传输数据被加密过，外国政府一般不可能知道你下载或者访问了什么，只知道你链接了一个中国的服务器(当然，如果用了什么好莱坞电影里面那种黑科技查出来了我也没办法……）**


## Windows端

先到这里下载windows客户端<https://github.com/shadowsocks/shadowsocks-windows/releases>

![](http://i1.piimg.com/567571/3cebd7e6a08c6b16.png)

然后，解压，双击打开



填入地址密码端口号等信息，然后点击`确定`

![](http://i1.piimg.com/567571/be5646c90c5f1b35.png)

然后在通知栏找到小飞机标志，打开`全局模式`，打开代理就可以正常使用了（如图：

![](http://p1.bqimg.com/567571/c25a92c442852751.png)


## Mac端

* 先从这里下载程序<https://github.com/shadowsocks/shadowsocks-iOS/releases>

![](http://i1.piimg.com/567571/b078ee3235b03e4a.png)

* 然后双击下载文件，将程序拖入`Applications`中

![](http://i1.piimg.com/567571/03d584a3b478e03e.png)


之后在lunchpad中找到ShadowsocksX，点击运行，可以在电脑右上角看到这个标志

![](http://i1.piimg.com/567571/126a757dee254e9b.png)

点击“Servers”-> “Open Server Preferences”

![](http://i1.piimg.com/567571/62cd073e960c7dc1.png)


点击“➕”号添加一个服务器

![](http://i1.piimg.com/567571/dd9d627b7b57b853.png)

填入地址密码端口号等信息，然后点击`OK`

然后选全局模式，打开Shadowsocks，就可以用了

![](http://i1.piimg.com/567571/252aec0c8adeaac8.png)


### 服务器是阿里云顶配，100M带宽，下东西嗖嗖嗖的

![](http://i1.piimg.com/567571/5109201685d772a7.png)

### 网易音乐等东西也可以正常用，跟国内一样

![](http://i1.piimg.com/567571/ee3445ba962101a6.png)


