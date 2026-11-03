---
title: "如何根据文字的多少动态的调整TableViewCell的高度"
date: 2016-01-25 17:59:18
tags: ["IOS"]
slug: "如何根据文字的多少动态的调整TableViewCell的高度"
---
开发中经常会遇到需要动态调整UITableViewCell的高度的问题，这个问题百度到的十分不清楚，但是谷歌到的就十分清楚，在百度没完之前我还是自己还是记录下吧……



## 方法一：使用AutoLayout

在storyboard中设置label的约束如图所示：

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-21/40577384.jpg)

**或者:**


![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-25/67412403.jpg)

然后在viewDidLoad中添加

```objectivec
self.tableView.rowHeight = UITableViewAutomaticDimension;
self.tableView.estimatedRowHeight = 44;
```

 
 **tableView需要设置为Dynamic Prototypes，上图的约束一条都不能少！！**
 
 
 
## 方法二：调用heightForRowAtIndexPath

```objectivec
#define ScreenFrame [[UIScreen mainScreen]bounds]
#define ScreenSize ScreenFrame.size
#define FONT_SIZE 15.0f
#define CELL_CONTENT_WIDTH ScreenSize.width //CELL_CONTENT_WIDTH 为cell的宽度
#define CELL_CONTENT_MARGIN 8.0f //CELL_CONTENT_MARGIN为label距cell两边的宽度

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{

//  获取当前indexPath下的cell的那个lable的内容
    NSDictionary *rowData = _dataArray[indexPath.section];
    text = [rowData objectForKey:@"content"];
    

//CELL_CONTENT_WIDTH 为cell的宽度；CELL_CONTENT_MARGIN为label距cell两边的宽度，相减得到label长度～；后面的20000任意设置
    CGSize constraint = CGSizeMake(CELL_CONTENT_WIDTH - (CELL_CONTENT_MARGIN * 2), 20000.0f);
    
    //CGSize size = [text sizeWithFont:[UIFont systemFontOfSize:FONT_SIZE] constrainedToSize:constraint lineBreakMode:UILineBreakModeWordWrap];
    
    NSAttributedString *attributedText = [[NSAttributedString alloc]initWithString:text attributes:@{
                        NSFontAttributeName:[UIFont systemFontOfSize:FONT_SIZE]
                                                                                                     }];
    CGRect rect = [attributedText boundingRectWithSize:constraint
                                               options:NSStringDrawingUsesLineFragmentOrigin
                                               context:nil];
    CGSize size = rect.size;
    CGFloat height = MAX(size.height + 82, 100.0f);
    return height;

    
}
```

-----
然后运行，就可以啦

![](http://7xkfbb.com1.z0.glb.clouddn.com/16-1-25/32336227.jpg)

> 百度药丸～
 