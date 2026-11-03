---
title: "RKTagsView"
date: 2016-04-03 18:17:34
tags: ["IOS"]
slug: "RKTagsView"
---
# RKTagsView

安利一个神奇的东西：[RKTagsView](https://github.com/kuler90/RKTagsView)，可以把输入的内容变成一段一段的标签样式。

效果如图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-3/57474176.jpg)



[项目地址](https://github.com/kuler90/RKTagsView)

## 安装

### cocoapods

在`PodFile`中添加：即可

```ruby
pod "RKTagsView"
```

### 添加源文件

直接把`RKTagsView.h`,`RKTagsView.m`两个文件拖到自己项目中也可以。

## 使用

### 常规使用

使用非常简单，新建一个`UIView`，然后设置这个View的类为 **RKTagsView**

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-3/6970625.jpg)


```objectivec

//是否可以编辑
self.tagsView.editable = NO;  

//标签是否可以被选中
self.tagsView.selectable = NO;  

//是否可以同时选择多个标签
self.tagsView.allowsMultipleSelection = NO;  

//标签之间的左右间距
self.tagsView.interitemSpacing = 1.0;

//标签之间的上下间距
self.tagsView.lineSpacing = 1.0;

//添加标签
[self.tagsView addTag:@"tag"];

//移除标签
[self.tagsView removeAllTags];

```

### 自定义标签样式

自定义需要设置View的代理

```objectivec
<RKTagsViewDelegate>


self.tagsView.delegate = self;
```

然后在`(UIButton *)tagsView:(RKTagsView *)tagsView buttonForTagAtIndex:(NSInteger)index`函数中设置相应的样式，比如下面这个例子就设置了每隔四个标签显示不同颜色的`tagsView`:


```objectivec
- (UIButton *)tagsView:(RKTagsView *)tagsView buttonForTagAtIndex:(NSInteger)index {
    UIButton *customButton = [UIButton buttonWithType:UIButtonTypeCustom];
  customButton.titleLabel.font = tagsView.font;
  [customButton setTitle:[NSString stringWithFormat:@" %@ ", tagsView.tags[index]] forState:UIControlStateNormal];
    customButton.layer.cornerRadius = 3.0;
    customButton.layer.masksToBounds = YES;
    
    customButton.layer.borderWidth = 1.0;
    switch (index % 4) {
        case 0:
            [customButton setTitleColor:[UIColor colorWithRed:66.0/255 green:175.0/255 blue:137.0/255 alpha:1.0] forState:UIControlStateNormal];
            customButton.layer.borderColor = [UIColor colorWithRed:66.0/255 green:175.0/255 blue:137.0/255 alpha:1.0].CGColor;
            break;
        case 1:
            [customButton setTitleColor:[UIColor colorWithRed:110.0/255 green:193.0/255 blue:209.0/255 alpha:1.0] forState:UIControlStateNormal];
            customButton.layer.borderColor = [UIColor colorWithRed:110.0/255 green:193.0/255 blue:209.0/255 alpha:1.0].CGColor;
            break;
        case 2:
            [customButton setTitleColor:[UIColor colorWithRed:223.0/255 green:162.0/255 blue:42.0/255 alpha:1.0] forState:UIControlStateNormal];
            customButton.layer.borderColor = [UIColor colorWithRed:223.0/255 green:162.0/255 blue:42.0/255 alpha:1.0].CGColor;
            break;
        default:
            [customButton setTitleColor:[UIColor colorWithRed:209.0/255 green:33.0/255 blue:96.0/255 alpha:1.0] forState:UIControlStateNormal];
            customButton.layer.borderColor = [UIColor colorWithRed:209.0/255 green:33.0/255 blue:96.0/255 alpha:1.0].CGColor;
            break;
    }

  return customButton;
}

```

效果图：

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-4-7/76263015.jpg)

> 你可以说这样写很丑但是你不可以说我审美有问题……我又不是设计师我怎么知道怎么配色好看🌚🌚🌚