---
title: "AFNetworking"
date: 2015-12-21 21:49:04
tags: ["IOS"]
slug: "AFNetworking"
---
<https://github.com/AFNetworking/AFNetworking>

AFNetworking 是一款备受喜爱的iOS端和Mac OS X端的网络库。它构建于[ Foundation URL Loading System](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/URLLoadingSystem/URLLoadingSystem.html)之上, 对cocoa的网络层做了扩展。它拥有良好的架构,丰富的api,以及模块化构建方式,使得使用起来非常轻松。





> Swift可以使用[Alamofire](http://caoyudong.com/2015/10/27/Alamofire/)


## 安装

### 使用CocoaPods安装

在`Podfile`里面加入

```bash
source 'https://github.com/CocoaPods/Specs.git'
platform :ios, '8.0'

pod 'AFNetworking', '~> 3.0'
```

### 使用Carthage安装

在`Cartfile`中加入:

```bash
github "AFNetworking/AFNetworking" ~> 3.0
```

> 3.0版本只支持`iOS 7`、`OS X 10.9`以上的版本


## 使用

导入头文件

```objectivec
#import <AFNetworking.h>
```

### 检查网络是否连接

```objectivec
    [[AFNetworkReachabilityManager sharedManager] setReachabilityStatusChangeBlock:^(AFNetworkReachabilityStatus status) {
        NSLog(@"Reachability: %@", AFStringFromNetworkReachabilityStatus(status));
        
    }];
    
    [[AFNetworkReachabilityManager sharedManager] startMonitoring];
```

其中`status`表示网络状态,通过Wi-Fi链接返回2，用手机流量返回1，无连接为0，为止状态为－1 。

```objectivec
typedef NS_ENUM(NSInteger, AFNetworkReachabilityStatus) {
    AFNetworkReachabilityStatusUnknown          = -1,
    AFNetworkReachabilityStatusNotReachable     =  0,
    AFNetworkReachabilityStatusReachableViaWWAN =  1,
    AFNetworkReachabilityStatusReachableViaWiFi =  2,
};
```
----
### 请求JSON数据

```objectivec
    NSURL *URL = [NSURL URLWithString:@"http://example.com"];
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    [manager GET:URL.absoluteString parameters:nil success:^(NSURLSessionTask *task, id responseObject) {
        NSLog(@"JSON: %@", responseObject);
        
        
        //如果穿回来的数据带有数组可以这样
        //NSArray *data = [responseObject objectForKey:@"data"];
        //NSString *name = [data[0] objectForKey:@"name"];
        //NSLog(@"name: %@", name);
    } failure:^(NSURLSessionTask *operation, NSError *error) {
        NSLog(@"Error: %@", error);
    }];
```

其中`parameters`可以用`NSDictionary`，如

```objectivec
NSDictionary *parameters = @{@"foo": @"bar", @"baz": @[@1, @2, @3]};
```

post数据的话将 `GET`改为`POST`就可以了～

----
### 下载文件

```objectivec
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];

NSURL *URL = [NSURL URLWithString:@"http://example.com/download.zip"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];

NSURLSessionDownloadTask *downloadTask = [manager downloadTaskWithRequest:request progress:nil destination:^NSURL *(NSURL *targetPath, NSURLResponse *response) {
    NSURL *documentsDirectoryURL = [[NSFileManager defaultManager] URLForDirectory:NSDocumentDirectory inDomain:NSUserDomainMask appropriateForURL:nil create:NO error:nil];
    return [documentsDirectoryURL URLByAppendingPathComponent:[response suggestedFilename]];
} completionHandler:^(NSURLResponse *response, NSURL *filePath, NSError *error) {
    NSLog(@"File downloaded to: %@", filePath);
}];
[downloadTask resume];
```
----
### 上传文件

```objectivec
NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];

NSURL *URL = [NSURL URLWithString:@"http://example.com/upload"];
NSURLRequest *request = [NSURLRequest requestWithURL:URL];

NSURL *filePath = [NSURL fileURLWithPath:@"file://path/to/image.png"];
NSURLSessionUploadTask *uploadTask = [manager uploadTaskWithRequest:request fromFile:filePath progress:nil completionHandler:^(NSURLResponse *response, id responseObject, NSError *error) {
    if (error) {
        NSLog(@"Error: %@", error);
    } else {
        NSLog(@"Success: %@ %@", response, responseObject);
    }
}];
[uploadTask resume];
```


> 从2.0迁移到3.0的方法，[官方文档](https://github.com/AFNetworking/AFNetworking/wiki/AFNetworking-3.0-Migration-Guide)
