---
title: "如何在自己的app中打开其他app"
date: 2015-09-01 21:25:11
tags: ["IOS"]
slug: "如何在自己的app中打开其他app"
---
这个动作通过`iOS URL schemes`完成，每个程序都有一个`URL schemes`。

通过`openURL`就可以打开相应的应用了。openurl()里面填上对应程序的URL。

~~~swift
//swift
UIApplication.sharedApplication().openURL(NSURL(string: "…………")!)
~~~

~~~objectivec
//OC
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"…………"]]
~~~



比如拨打电话：

~~~swift
//swift
UIApplication.sharedApplication().openURL(NSURL(string: "tel://1234567890")!)
~~~



## 打开其他应用的url
 
[你所知道好玩有趣的 iOS URL schemes 有哪些？（我只是搬运工）](http://www.zhihu.com/question/19907735)

应用        |  url      
----------|------
QQ的url|mqq:// 
微信 | weixin:// 
淘宝 | taobao:// 
点评 | dianping:// dianping://search 
微博 | sinaweibo://  
名片全能王|camcard:// 
weico微博|weico:// 
支付宝|alipay:// 
豆瓣fm|doubanradio:// 
微盘|sinavdisk:// 
网易公开课|ntesopen://
美团|imeituan:// 
京冬|openapp.jdmoble:// 
人人|renren:// 
我查查|wcc:// 
1号店|wccbyihaodian:// 
有道词典|yddictproapp:// 
知乎|zhihu://
优酷|youku://

其中，微信的有

url | 功能
----|----
weixin://dl/scan | 扫一扫
weixin://dl/feedback |反馈
weixin://dl/moments |朋友圈
weixin://dl/settings |设置
weixin://dl/notifications | 消息通知设置
weixin://dl/chat |聊天设置
weixin://dl/general| 通用设置
weixin://dl/officialaccounts |公众号
weixin://dl/games |游戏
weixin://dl/help | 帮助
weixin://dl/feedback |反馈
weixin://dl/profile |个人信息
weixin://dl/features |功能插件 

-------

## 在自己的程序里面添加`iOS URL schemes`

先在`info.plist`添加如下属性（这个地方和网上的教程有很大的不同，多了很多功能，我也不是很清楚具体代表什么）。点击工程 ->info ->URL Types。

注意, 这里的URL Schemes必填， URL identifier选填。  
另外，URL Schemes建议都小写，因为之后接收到数据的时候，不区分大小写， 都是转为小写。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-22/24810830.jpg)

然后在` Appdelegate.swift`中添加如下代码。

~~~swift
//swift
    func application(application: UIApplication, handleOpenURL url: NSURL) -> Bool {
        println(url)
        if (url.scheme == "urltest"){
            let text = url.host?.stringByReplacingPercentEscapesUsingEncoding(NSUTF8StringEncoding)
            var alert:UIAlertView = UIAlertView()
            alert.addButtonWithTitle("OK")
            alert.title = "title"
            alert.message = text
            alert.show()
            return true
        }
        return false
    }
~~~

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-22/11060372.jpg)

