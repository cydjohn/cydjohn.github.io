---
title: "MBProgressHUD"
date: 2015-12-23 16:43:35
tags: ["IOS"]
slug: "MBProgressHUD"
---
<https://github.com/jdg/MBProgressHUD>

MBProgressHUD 是目前Github上**star**最多的HUD，支持所有版本的iOS，但是不支持Mac。

## 效果图

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/731771.jpg)![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/74700189.jpg)![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/11697486.jpg)![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/50268525.jpg)![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/84569473.jpg)![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/31201509.jpg)![](http://7xkfbb.com1.z0.glb.clouddn.com/15-12-23/84728130.jpg)


## 安装

**Cocoapods**

在`Podfile`里面添加

```bash
pod 'MBProgressHUD', '~> 0.9.2'
```

*或者：*

**Carthage**

在`Cartfile`里面添加

```bash
github "jdg/MBProgressHUD" ~> 0.9.2
```
*或者：*

**Source files**

直接把 `MBProgressHUD.h`和`MBProgressHUD.m`添加到工程中。

*或者:*

**Static library**

把`MBProgressHUD.xcodeproj`拖到工程文件中，Libraries中添加`libMBProgressHUD.a`，再将`MBProgressHUD`添加到`Target Dependencies list`里面。

## 使用

标准情况

```objectivec
HUD = [[MBProgressHUD alloc] initWithView:self.navigationController.view];
	[self.navigationController.view addSubview:HUD];
	
	HUD.delegate = self;
	HUD.labelText = @"Loading";
	HUD.detailsLabelText = @"updating data";
	HUD.square = YES;
	
	[HUD showWhileExecuting:@selector(myTask) onTarget:self withObject:nil animated:YES];

- (void)myTask {
	// Do something usefull in here instead of sleeping ...
	sleep(3);
}	
	
```

带进度条的情况

```objectivec
HUD = [[MBProgressHUD alloc] initWithView:self.navigationController.view];
	[self.navigationController.view addSubview:HUD];
	
	// Set determinate mode
	HUD.mode = MBProgressHUDModeAnnularDeterminate;
	
	HUD.delegate = self;
	HUD.labelText = @"Loading";
	
	// myProgressTask uses the HUD instance to update progress
	[HUD showWhileExecuting:@selector(myProgressTask) onTarget:self withObject:nil animated:YES];
	

- (void)myProgressTask {
	// This just increases the progress indicator in a loop
	float progress = 0.0f;
	while (progress < 1.0f) {
		progress += 0.01f;
		HUD.progress = progress;
		usleep(50000);
	}
}
```

更详细的用法可以参考官方的[DEMO](https://github.com/jdg/MBProgressHUD)
