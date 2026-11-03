---
title: "JGProgressHUD"
date: 2015-12-22 15:30:59
tags: ["IOS"]
slug: "JGProgressHUD"
---
<https://github.com/JonasGessner/JGProgressHUD>

JGProgressHUD是HUD(head up Display)中的一种，虽然它在Github上的star不是做多的，但是它功能应该是最花哨的，我比较喜欢～～ ~~毕竟可以装逼~~

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-22/81178201.jpg)



## 安装

**CocoaPods:**  

把下面这行写进`Podfile`:

```bash
pod 'JGProgressHUD'
```


**Carthage:**

把下面这行写进`Cartfile`:

```bash
github "JonasGessner/JGProgressHUD" >= 1.3.1
```


**Framework (iOS >= 8.0 only):**  

1. 把`JGProgressHUD.xcodeproj`拖入工程文件。
2. 把`JGProgressHUD.framework` 加到工程的`General`->`Embedded Binaries`中。
3. 在`Build Settings`->`Other Linker Flags`中加入`-ObjC flag`。

## 使用

首先要“import”头文件 

Objective-C:

```objectivec
#import "JGProgressHUD.h"
```

swift:  

```swift
import JGProgressHUD
```

### 模糊进度显示(其实就是一朵菊花)

```objectivec
 JGProgressHUD *HUD = [JGProgressHUD progressHUDWithStyle:JGProgressHUDStyleDark];
    HUD.textLabel.text = @"Loading";
    [HUD showInView:self.view];
    [HUD dismissAfterDelay:3.0];
```

### 错误显示

```objectivec
JGProgressHUD *HUD = [JGProgressHUD progressHUDWithStyle:JGProgressHUDStyleDark];
    HUD.textLabel.text = @"Error";
    HUD.indicatorView = [[JGProgressHUDErrorIndicatorView alloc] init]; //JGProgressHUDSuccessIndicatorView is also available
    [HUD showInView:self.view];
    [HUD dismissAfterDelay:3.0];
```

### 自定义图片显示

```objectivec
JGProgressHUD *HUD = [JGProgressHUD progressHUDWithStyle:JGProgressHUDStyleDark];
HUD.indicatorView = [[JGProgressHUDImageIndicatorView alloc] initWithImage:[UIImage imageNamed:@"my_image.png"]];
[HUD showInView:self.view];
[HUD dismissAfterDelay:3.0];
```

### 有进度显示

```objectivec

JGProgressHUD *HUD = [JGProgressHUD progressHUDWithStyle:JGProgressHUDStyleDark];
HUD.indicatorView = [[JGProgressHUDPieIndicatorView alloc] initWithHUDStyle:HUD.style]; //Or JGProgressHUDRingIndicatorView
[HUD showInView:self.view];
[HUD dismissAfterDelay:3.0];

```


## 效果图

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-22/99720404.jpg)

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-22/40583952.jpg)

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-22/10991201.jpg)

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-22/35768606.jpg)


