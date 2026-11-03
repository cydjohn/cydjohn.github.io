---
title: "OS X系统上安装树莓派Raspbian系统"
date: 2015-12-03 11:23:53
tags: ["树莓派"]
slug: "OS-X系统上安装树莓派Raspbian系统"
---
首先去[官网](https://www.raspberrypi.org/)下载一个[Raspbin](https://www.raspberrypi.org/downloads/)

下载完成之后得到一个压缩包，解压之后得到一个镜像文件 `2015-11-21-raspbian-jessie.img`。

然后准备一张SD卡，最好8G以上吧。



## 图形化界面安装

* 将SD卡插入Mac上的读卡器。
* 点击屏幕左上角苹果标志，`关于本机`->`系统报告`,找到`USB`->`Card Reader`->`BSD`。找到一个类似于 `diskn`的数据，比如我的是 `disk2`。
* 用磁盘工具抹掉SD卡，**SD卡文件格式必须为 FAT32**，如果不是自己用磁盘工具重新格式化（`launchpad`->`其他`->`磁盘工具`）。
* 在终端输入   

```bash
sudo dd bs=1m if=path_of_your_image.img of=/dev/rdiskn
```
   其中`path_of_your_image.img`是你放镜像文件的路径，`rdiskn`中`n`是你之前看的`diskn`那个数字，我的是2，所以就是`rdisk2`
*  如果命令失效，就用`diskn`代替`rdiskn`。

## 用命令行安装

1.打开终端   
2.输入 
       
```bash
diskutil list
```
 
找到你的SD卡的磁盘号，我的是disk2。

3.抹除SD卡

输入来抹除SD卡
```bash
diskutil unmountDisk /dev/diskn #n需要替换成数字
```
例如我的是这样

```bash
diskutil unmountDisk /dev/disk2
```

4.把镜像拷到SD卡上

```bash
sudo dd bs=1m if=image.img of=/dev/rdiskn #n需要替换成数字
```

例如我的是

```bash
sudo dd bs=1m if=2015-11-21-raspbian-jessie.img of=/dev/rdisk2
```

如果出现`dd: invalid number '1m'`，就把`1m`换车`1M`。

> 时间很慢，大约需要5分多钟，没有进度条，慢慢等喽

------

2018-10月更新

## 通过 `etcher.io` 安装

最近发现了一个app，支持所有平台，鼠标点点就可以吧镜像写到SD卡里面。

app名字叫`etcher`

官方网站是：https://etcher.io/


![](/image/30ee5f86-a846-4706-bfde-08adc07f9382.gif)


---
[官方安装教程](https://www.raspberrypi.org/documentation/installation/installing-images/README.md)

