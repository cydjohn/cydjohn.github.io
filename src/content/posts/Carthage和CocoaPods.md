---
title: "Carthage和CocoaPods"
date: 2015-12-24 23:34:49
tags: ["IOS"]
slug: "Carthage和CocoaPods"
---
[Carthage](https://github.com/Carthage/Carthage)

![](https://github.com/Carthage/Carthage/raw/master/Logo/PNG/header.png)

[CocoaPods](https://github.com/CocoaPods/CocoaPods)
![](https://camo.githubusercontent.com/bc5c9328a1d48a8c805e0fa16904b617adca99b4/68747470733a2f2f7261772e6769746875622e636f6d2f436f636f61506f64732f7368617265645f7265736f75726365732f6d61737465722f6173736574732f636f636f61706f64732d62616e6e65722d726561646d652e706e67)

Carthage和CocoaPods和都是主流的iOS包管理工具。其中CocoaPods比较主流，因为使用方便，开发者很容易就可以将一个第三方库集成到自己的项目里。

但是CocoaPods会改变项目结构， CocoaPods 会生成一个 Workspace，打开项目需要通过新建的Workspave，不然项目会报错。而Carthage就不会。

Carthage编译你的依赖，并提供框架的二进制文件，但你仍然保留对项目的结构和设置的完整控制。Carthage不会自动的修改你的项目文件或编译设置。

#### PS：Carthage和CocoaPods在同一个项目里面可以混用！！




## CocoaPods

**安装**

安装CocoaPods需要Ruby环境，Ruby是Mac OS X自带的，所以可以直接安装。

输入以下命令就可以安装：

```bash
sudo gem install cocoapods
```

> 国内安装会卡住，因为链接被墙了。这时候可以用VPN或者淘宝Ruby镜像来访问。  

按照下面的顺序在终端中敲入依次敲入命令：

```bash
gem sources --remove https://rubygems.org/
```

等有反应之后再敲入以下命令:

```bash
gem sources -a http://ruby.taobao.org/
```

为了验证你的Ruby镜像是并且仅是taobao，可以用以下命令查看：
```bash
$ gem sources -l
```
只有在终端中出现下面文字才表明你上面的命令是成功的：

```bash
*** CURRENT SOURCES ***

http://ruby.taobao.org/
```

这时候再运行

```bash
sudo gem install cocoapods
```
就可以了

**使用**

举个例子吧

比如你想安装 `AFNetworking` <https://github.com/AFNetworking/AFNetworking>

先在终端输入

```bash
$ pod search AFNetworking
```
可以看到以下结果，说明可以用CocoaPods安装 AFNetworking

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/68424321.jpg)


或者，可以直接去`AFNetworking`的Github页面上看，一般支持CocoaPods安装的项目作者都会写到README.md里面

* 在你需要用到的工厂目录下创建个新文件，文件名交`PodFile`。
	![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/26981649.jpg)
* 在`PodFile`中加入  
  
	```ruby
	platform :ios, '8.0'
	pod 'AFNetworking', '~> 3.0'
	```
* 然后在终端CD到项目目录下，输入

	```bash
	$ pod install 
	```
![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/47224208.jpg)

这时候文件目录就会变成这样：
![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/77644882.jpg)

现在点击`.xcworkspace` 才可以正常打开项目。



## Carthage

Carthage的基本工作流：

1. 创建一个Cartfile，包含你希望在项目中使用的框架的列表。
2. 运行Carthage，将会获取列出的框架并编译它们。
3. 将编译完成的.framework二进制文件拖拽到你的Xcode项目当中。

**安装**

Carthage提供OS X平台的pkg安装文件，你可以从Github的最新[release](https://github.com/Carthage/Carthage/releases)中找到，按照引导一步步安装即可。

**使用**

假设项目中要加入AFNetworking

* 在项目目录下创建一个叫做`Cartfile`的文件
* 文件中写入

	```
	github "AFNetworking/AFNetworking" ~> 3.0
	```
![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/96350374.jpg)

* 然后在控制台中CD到项目目录下，输入`carthage update`

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/57524755.jpg)

然后文件目录就会变成这样：

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/86681271.jpg)

在`Carthage`->`Build`->`iOS`找到`AFNetworking.framework`

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-24/7963598.jpg)

将`framwork`拖入项目中就可以使用了。


> 参考资料  
> <http://www.open-open.com/lib/view/open1436886568084.html>
> <http://blog.csdn.net/iunion/article/details/17010267>