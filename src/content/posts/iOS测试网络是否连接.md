---
title: "iOS测试网络是否连接"
date: 2015-07-29 23:09:55
tags: ["IOS"]
slug: "iOS测试网络是否连接"
---
先导入一个头文件

~~~objectivec
//OC
#import <SystemConfiguration/SystemConfiguration.h>
~~~



然后通过调用这个函数

~~~objectivec
//OC
/**
 *  检测是否能上网
 *
 *  @return YES说明网络已经连接；NO说明没有网络连接
 */
- (BOOL) isConnectionAvailable
{
    SCNetworkReachabilityFlags flags;
    BOOL receivedFlags;
    
    SCNetworkReachabilityRef reachability = SCNetworkReachabilityCreateWithName(CFAllocatorGetDefault(), [@"www.baidu.com" UTF8String]);
    receivedFlags = SCNetworkReachabilityGetFlags(reachability, &flags);
    CFRelease(reachability);
    
    if (!receivedFlags || (flags == 0) )
    {
        return FALSE;
    } else {
        return TRUE;
    }
}
~~~

检测函数返回值就知道了。返回true说明有网络连接，返回false说明没有网络连接。

> 网上找的方法，感觉就是试着访问下百度，连得上就说明网络是可以用的，连不上说明不可以………………仔细想想这个方法好像我很小的时候就会了：打开浏览器，输入百度网址，看得到就说明可以上网，然后关掉*百度*打开*谷歌*，嚯嚯嚯我那个时候真是个天才～～

