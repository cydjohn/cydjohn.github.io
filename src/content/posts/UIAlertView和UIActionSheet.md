---
title: "UIAlertView和UIActionSheet"
date: 2015-07-28 20:59:39
tags: ["IOS"]
slug: "UIAlertView和UIActionSheet"
---
IOS提示框大概有两种方法，一个是UIAlertView另一个是UIActionsheet。



## UIAlertView:

~~~swift
//swift
    func showAlertView(){
        var alert = UIAlertView()
        alert.title = "Title"
        alert.message = "message"
        //设置代理
        alert.delegate = self
        alert.addButtonWithTitle("canel")
        alert.addButtonWithTitle("OK")
        alert.cancelButtonIndex = 0
        alert.show()
    }
~~~

~~~objectivec
//OC
- (void)showAlerView{
    UIAlertView *alert = [[UIAlertView alloc] init];
    alert.title = @"Title";
    alert.message = @"message";
    
    ///设置代理
    alert.delegate = self;
    [alert addButtonWithTitle:@"cancel"];
    [alert addButtonWithTitle:@"OK"];
    alert.cancelButtonIndex = 0;
    [alert show];
}
~~~

![UIAlertView](http://7xkfbb.com1.z0.glb.clouddn.com/15-7-28/81705118.jpg)

设置delegate需要在class后面加UIActionSheetDelegate

~~~swift
//swift
class ViewController: UIViewController ,UIAlertViewDelegate
~~~

~~~objectivec
//OC
@interface ViewController : UIViewController<UIAlertViewDelegate>
~~~

然后通过这个函数检测用户点击了哪个button

~~~swift
//swift
    /**
    UIAlerViewDelegate
    
    :param: alertView   包含所点击按钮的alert view.
    :param: buttonIndex 所点击的按钮在该alert view中的索引号（index），索引号从0开始
    */
    func alertView(alertView: UIAlertView, clickedButtonAtIndex buttonIndex: Int) {
        
    }
~~~

~~~objectivec
//OC
/**
 *
 *  @param alertView   包含所点击按钮的alert view.
 *  @param buttonIndex 所点击的按钮在该alert view中的索引号（index），索引号从0开始
 */
- (void) alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex{
    NSLog(@"%ld",(long)buttonIndex);
}
~~~


## UIActionSheet:

~~~swift
//swift
    func showActionSheet(){
        var actionSheet = UIActionSheet()
        //设置代理
        actionSheet.delegate = self
        actionSheet.title = "Title"
        actionSheet.addButtonWithTitle("cancel")
        actionSheet.addButtonWithTitle("Action1")
        actionSheet.addButtonWithTitle("destructiveButton")
        
        ///让destructiveButton变为红色,"destructiveButtonIndex"
        actionSheet.destructiveButtonIndex = 2
        actionSheet.cancelButtonIndex = 0
        actionSheet.showInView(barButton, animated: true)
        
    }
~~~

~~~objectivec
//OC
- (void)showActionSheet{
    UIActionSheet *actionSheet = [[UIActionSheet alloc] init];
    
    ///设置代理
    actionSheet.delegate = self;
    actionSheet.title = @"Title";
    [actionSheet addButtonWithTitle:@"cancel"];
    [actionSheet addButtonWithTitle:@"Action1"];
    [actionSheet addButtonWithTitle:@"destructiveButton"];
    
    ///让destructiveButton变为红色,"destructiveButtonIndex"
    actionSheet.destructiveButtonIndex = 2;
    actionSheet.cancelButtonIndex = 0;
    [actionSheet showInView:self.view];
    
}
~~~

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-7-28/93972059.jpg)
上面那个`Title`是通过这行代码加上去的，实在恶心……

~~~swift
//swift
actionSheet.title = "Title"
~~~
一般我不用……仔细一想我好像从来没用过～

设置delegate需要在class后面加UIActionSheetDelegate

~~~swift
//swift
class ViewController: UIViewController ,UIActionSheetDelegate
~~~

~~~objectivec
//OC
@interface ViewController : UIViewController<UIActionSheetDelegate>
~~~

然后通过这个函数检测用户点击了哪个button

~~~swift
//swift
    /**
    :param: actionSheet 包含所点击按钮的action sheet.
    :param: buttonIndex 所点击的按钮在该action sheet中的索引号（index），索引号从0开始
    */
    func actionSheet(actionSheet: UIActionSheet, clickedButtonAtIndex buttonIndex: Int) {
        
    }
~~~

~~~objectivec
//OC
/**
 *
 *  @param actionSheet 包含所点击按钮的action sheet.
 *  @param buttonIndex 所点击的按钮在该action sheet中的索引号（index），索引号从0开始
 */
-(void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex{
    
}
~~~
不过IOS8之后苹果又新出了个叫做[UIAlertController]()的东西统一了UIAlertView和UIActionSheet。


>写到现在终于写了一篇我自己稍微知道点的东西了😂，想写点东西怎么就那么难……