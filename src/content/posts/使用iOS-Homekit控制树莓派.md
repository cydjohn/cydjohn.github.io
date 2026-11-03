---
title: "使用iOS Homekit控制树莓派"
date: 2017-01-10 19:45:28
tags: ["树莓派"]
slug: "使用iOS-Homekit控制树莓派"
---
# 使用iOS Homekit控制树莓派

`HomeKit` 就是苹果官方的智能家居平台解决方案，包括移动设备 SDK，智能家居硬件通信协议 (HAP: HomeKit Accessory Protocol) 、以及 MFi(Made for iPhone/iPod/iPad) 认证等等。通过 WiFi 或蓝牙连接智能家居设备（或 bridge 设备），也可以利用 Apple TV(4代) 或闲家中的置 iPad 实现设备的远程控制（HAP over iCloud）。

但是 HAP 协议部分是需要加入 MFi Program 才能获取文档，而且 MFi Program 无法以个人开发者身份加入。

好在有好心人（大牛）逆向了 HAP 的服务端协议，给了我们折腾党一个机会～



为了实现这个，我们需要用到一个库，叫做[Homebridge](https://github.com/nfarina/homebridge)。`Homebridge`是一个用Node.js实现的轻量级后台，能够在局域网内与苹果的Homekit API对接，并且支持插件。

然后我们用到的插件叫做[Homebridge GPIO WiringPi](https://github.com/rsg98/homebridge-gpio-wpi)，用来控制树莓派上的GPIO。

## 安装

先安装 `Homebridge`

```bash
npm install -g homebridge
```

再安装`Homebridge GPIO WiringPi`插件

```bash
npm install -g homebridge-gpio-wpi
```

## 创建`config.json`文件

在根目录下，进入 `.homebridge` 文件夹

```bash
cd ~/.homebridge/ 
```


新建 `config.json`文件

```bash
vim config.json
```

然后文件内容如下：

```vim
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:32",
        "port": 51826,
        "pin": "031-45-155"
    },

    "description": "This has some fake accessories",

    "accessories": [
        {
            "accessory": "GPIO",
            "name": "Yellow Light",
            "pin": 27
        },
        {
            "accessory": "GPIO",
            "name": "Red Light",
            "pin": 22
        },
        {
            "accessory": "GPIO",
            "name": "Green Light",
            "pin": 17
        }
    ],
    
    "platforms": []
}

```

其中 `bridge`字段表示这个设备的基本信息，`username`可以随便写，`pin`是链接时候需要用到的一串数字，等下会看到。`accessories`是声明GPIO，其中，里面的`pin`是GPIO引脚的编号（BCM），`accessory`必须写GPIO。



引脚信息如下：




 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
|-----|-----|---------|------|---|---|---|---|------|---------|-----|-----|
 |     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
 |   2 |   8 |   SDA.1 |  OUT | 0 |  3 || 4  |   |      | 5V      |     |     |
 |   3 |   9 |   SCL.1 |   IN | 1 |  5 || 6  |   |      | 0v      |     |     |
 |   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 1 | ALT0 | TxD     | 15  | 14  |
 |     |     |      0v |      |   |  9 || 10 | 1 | ALT0 | RxD     | 16  | 15  |
 |  17 |   0 | GPIO. 0 |  OUT | 0 | 11 || 12 | 1 | IN   | GPIO. 1 | 1   | 18  |
 |  27 |   2 | GPIO. 2 |  OUT | 0 | 13 || 14 |   |      | 0v      |     |     |
 |  22 |   3 | GPIO. 3 |  OUT | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
 |     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
 |  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
 |   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 0 | IN   | GPIO. 6 | 6   | 25  |
 |  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
 |     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
 |   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
 |   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
 |   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
 |  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
 |  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
 |  26 |  25 | GPIO.25 |   IN | 0 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
 |     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
 | BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |



之后保存文件。

## 连接电路

注意GPIO引脚的编号，我们用的是BCM编号，三个引脚分别为17，27，22，如图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-1-11/20899053-file_1484095589589_1f1.jpg)


## 运行Homebridge

直接在终端输入命令即可

```bash
homebridge
```

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-1-11/90476577-file_1484094408691_16d0c.png)

打开手机的Homekit，按照提示连接到树莓派上，如下：

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-1-11/60340144-file_1484094685902_1812d.png)

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-1-11/6495076-file_1484094975726_17911.png)


然后就可以控制灯泡了。。。


可以尝试用Siri控制下开关，试试

> Turn on the Red Light


很神奇～


------

## 可能遇到的问题

**1. /usr/local/lib/node_modules/homebridge-gpio-wpi/index.js:33
      throw new Error('Pin ' + this.pin + ' is not readable (' + currentPinStatus.error.code + ').  Did you run gpio export as the right user?');**
      
可能是引脚的问题，尝试在终端运行，注意替换引脚的编号
    
```bash  
gpio -g mode 22 out   
gpio -g mode 22 down  
gpio export 22 out   
```



