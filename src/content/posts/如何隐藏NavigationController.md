---
title: "如何隐藏NavigationController"
date: 2015-08-13 16:29:16
tags: ["IOS"]
slug: "如何隐藏NavigationController"
---
如何隐藏NavigationController？

隐藏`NavigationController`只需要调用一个方法就可以了：

~~~objectivec
//OC
self.navigationController.navigationBar.hidden = YES;
~~~

要回复它只用把状态改为NO就好。




## `ScrollView`或`TableView`向上滑动隐藏`NavigationController`
如果是在一个`ScrollView`或者是一个`TableView`里面，想要实现向上滑动隐藏`NavigationController`，调用这个函数即可：

~~~objectivec
//OC
-(void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset{
    if (velocity.y > 0.0)
    {
        //向上滑动隐藏导航栏
        [self.navigationController setNavigationBarHidden:YES animated:YES];
    }else
    {
        //向下滑动显示导航栏
        [self.navigationController setNavigationBarHidden:NO animated:YES];
    }
}
~~~

其中

~~~objectivec
//OC
[self.navigationController setNavigationBarHidden:YES animated:YES];
~~~

是带有动画效果的，如果不需要动画效果可以直接用

~~~objectivec
//OC
self.navigationController.navigationBar.hidden = YES;
~~~

不过应该不会有人不想用动画效果吧

效果图：

![hide NavigationController](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-15/92146754.jpg)

-----
当然从效果图来看这样实现并不好，因为`StatusBar`和`tableView`的内容重合了，现在可以做一点优化。

在`viewDidLoad`里面添加：

~~~objectivec
//OC
[self setNeedsStatusBarAppearanceUpdate];
~~~


添加一个函数：

~~~objectivec
//OC
- (UIStatusBarStyle)preferredStatusBarStyle
{
    
    return UIStatusBarStyleLightContent;
}
~~~

效果图：

![“Hide”status bar](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-15/21162414.jpg)

-----
那如果要"保留"`StatusBar`要怎么做呢？

网上查了一下，有一个思路是把`NavigationController`的高度降为22，这样看起来就像是保留了`StatusBar`。

~~~objectivec
//OC

@property (assign, nonatomic)BOOL isHidden;
//…………

-(void)showNavigationController{
    if (self.isHidden) {
        CGRect frame = self.navigationController.navigationBar.frame;
        frame.origin.y = 20;
        [UIView animateWithDuration:0.2 animations:^{
            self.navigationController.navigationBar.frame = frame;
            
            [self.item setTitle:@"item"];
            self.title = @"Title";
        }];
        self.isHidden= NO;
    }
}

-(void)hideNavigationController{
    if (!self.isHidden) {
        CGRect frame = self.navigationController.navigationBar.frame;
        frame.origin.y = -24;
        [UIView animateWithDuration:0.2 animations:^{
            self.navigationController.navigationBar.frame = frame;
            
//			  隐藏navigationController上的控件
            [self.item setTitle:@""];
            self.title = @"";
        } completion:nil];
        self.isHidden=YES;
    }
}
~~~

然后修改下`scrollViewWillEndDragging`就可以了

~~~objectivec
//OC
-(void)scrollViewWillEndDragging:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity targetContentOffset:(inout CGPoint *)targetContentOffset{
    if (velocity.y > 0.0)
    {
        //向上滑动隐藏导航栏
        [self hideNavigationController];
        
    }else
    {
        //向下滑动显示导航栏
        [self showNavigationController];
    }
}
~~~

效果图：  
![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-15/98069774.jpg)

[代码下载 Xcode6.4](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-15/70939852-hideNavigationController.zip)


##iOS8之后
```objective-c
//objective-c
self.navigationController.hidesBarsOnSwipe = YES;
```

```swift
//swift
self.navigationController!.hidesBarsOnSwipe = true;
```
