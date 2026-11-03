---
title: "实现navigationController渐变"
date: 2017-01-14 18:11:40
tags: ["IOS"]
slug: "实现navigationController渐变"
---
## 效果

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-1-15/14395718-file_1484434225269_c4f5.gif)



## 实现思路

先观察NavigationBar的结构图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/17-1-15/30926148-file_1484434436169_130c5.png)

可以发现navigationBar后面是有个imageView的，只要把它设置为无图就可以看到透明，设置backgroundColor就不可以

需要注意的是navigationBar还有另一个imageView，其实那个是导航栏下面的那一根细线。

## 实现

直接获取那张ImageView,然后设置他的透明度
它其实就在subviews的第一个,即,我们可以这样

```objectivec
//Objective-C
UIView barImageView = new UIView()

barImageView = self.navigationController.navigationBar.subviews.firstObject
```


```swift
//swift  

// var barImageView = UIView()
barImageView = (navigationController?.navigationBar.subviews.first)!
```

然后设置它透明

```swift
//swift
navigationController?.navigationBar.setBackgroundImage(UIImage(), for: UIBarPosition.top, barMetrics: UIBarMetrics.default)
```


然后在scrollViewDidScroll方法里面根据偏移量来动态改变barImageView颜色就好

```swift
//swift
override func scrollViewDidScroll(_ scrollView: UIScrollView) {
    
    let offsetY:CGFloat = scrollView.contentOffset.y
    if (offsetY >= 44) {
        let alpha:CGFloat = min(0.95, 1 - ((50 + 64 - offsetY) / 64)) //50 可以任意改变，控制你的tableView拉到什么样子的时候他才变成不透明

        barImageView.backgroundColor = UIColor.white.withAlphaComponent(alpha)

        if alpha > 0.95 {
            // setNavigationBarTextBlack() 
            //导航栏被拉下来
        }
    }
    else {

        barImageView.backgroundColor = UIColor.white.withAlphaComponent(0.0)
        // setNavigationBarTextClear()
        // 导航栏在初始位置状态
    }
}
```


-----
## 补充代码

**改变导航栏标题颜色和返回键颜色**

```swift
//swift
self.navigationController?.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName:UIColor.white]
self.navigationController?.navigationBar.tintColor = UIColor.white
```


**需要重写`viewWillAppear`和`viewWillDisappear`**

```swift
//
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    self.tableView.delegate = self;
    self.navigationController?.navigationBar.shadowImage = UIImage()
}

override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    self.tableView.delegate = nil;
    setNavigationBarTextBlack()
}
```

不然你返回到上一个界面的时候会发现导航栏很奇怪


如果懒得自己写可以试下这个轮子：

<https://github.com/ltebean/LTNavigationBar/tree/master>