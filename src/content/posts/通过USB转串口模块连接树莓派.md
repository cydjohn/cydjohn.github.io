---
title: "通过USB转串口模块连接树莓派"
date: 2015-10-03 13:38:33
tags: ["树莓派"]
slug: "通过USB转串口模块连接树莓派"
---
> 我的是树莓派B型，Mac OS系统。由于放假回家没有显示器，没有键盘，没法用树莓派，所以研究了下这个方法。当然，还可以通过ssh链接，但是要建立在你的树莓派和你的电脑链接在同一个局域网的情况下。



## 串口模块
首先，你要有个USB转ttl模块，淘宝上有卖，几块钱一个，很便宜，我用的是`PL2303`  ![PL2303](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-3/33261930.jpg)



## 驱动
然后，就要去下载相应的驱动来安装。`PL2303`[驱动下载](http://www.prolific.com.tw/US/ShowProduct.aspx?p_id=229&pcid=41)

通过命令 

```sh
ls /dev/tty.usb*
```

来检查驱动是否安装成功了

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-3/47399324.jpg)

记得把串口插到USB上，不然会显示

```sh
ls: /dev/tty.usb*: No such file or directory
```


然后把`PL2303`连到树莓派上面：GND->GND;

> **TSD->RXD;RXD->TSD**  
> **TSD->RXD;RXD->TSD**  
> **TSD->RXD;RXD->TSD**  
> 别连反了！

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-3/33456921.jpg)

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-3/54787738.jpg)

## 通过screen连接。
打开终端，输入 

```sh
screen -v
```

如果显示没有该命令，就

```sh
brew install screen
```

然后通过命令

```sh
screen /dev/tty.usbserial 115200
```
就会看到一个空界面，按Enter键，就会出现Raspberry Pi的登录提示了。树莓派的默认用户名是`pi`，密码是`raspberry` 。(一般要等一下，不会立即出来，出不来就多按几次Enter～)

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-3/6454775.jpg)

-----
如果直接拔掉串口模块，需要重新连接，需要输入

```sh
ps -x|grep tty
```

得到进程号，然后通过`kill`命令关掉那个进程，才可以重新连接。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-3/79325063.jpg) 

