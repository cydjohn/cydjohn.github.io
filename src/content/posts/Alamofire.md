---
title: "Alamofire"
date: 2015-10-27 13:31:00
tags: ["IOS"]
slug: "Alamofire"
---
[Alamofire](https://github.com/Alamofire/Alamofire) 是一款用swift写的用于http网络连接的库，目的是用来在swift中代替OC的AFNetworking。

使用十分简单：


```swift
//swift
import Alamofire

Alamofire.request(.GET, "http://httpbin.org/get")

```





## 安装

> 须要用swift，项目必须运行在iOS 8或者更高版本iOS。OS X Mavericks或者更高版本OS上。用OC其实也可以，但是折腾很多东西……OC还是直接用AFNetworking吧～

**CocoaPods**

把下面这些加到`Podfile`里面然后 `pod install`：

```ruby
source 'https://github.com/CocoaPods/Specs.git'
platform :ios, '8.0'
use_frameworks!

pod 'Alamofire', '~> 1.2'

```

**carthage**

把下面这些加到 `Cartfile`里面：

```ogdl
github "Alamofire/Alamofire" >= 1.2

```

或者也可以手动安装……详情见[Alamofire](https://github.com/Alamofire/Alamofire)


## 用法

> Alamofire所有请求都是是异步的，所以可以放心大胆的用～

~~~swift
//swift
import Alamofire
~~~

**发起一个连接：**

```swift
//swift
import Alamofire

Alamofire.request(.GET, "http://httpbin.org/get")

```  
  

**收到数据转为string**


```swift
//swift
Alamofire.request(.GET, "http://httpbin.org/get")
         .responseString { (_, _, string, _) in
                  println(string)
         }
         
```

**收到数据转为JSON**

```swift
//swift
Alamofire.request(.GET, "http://httpbin.org/get")
         .responseJSON { (_, _, JSON, _) in
                  println(JSON)
         }
```

**转化结果的方法：**

- `response()`
- `responseString(encoding: NSStringEncoding)`
- `responseJSON(options: NSJSONReadingOptions)`
- `responsePropertyList(options: NSPropertyListReadOptions)`

**Alamofire支持的HTTP方法**

```swift
//swift
public enum Method: String {
    case OPTIONS = "OPTIONS"
    case GET = "GET"
    case HEAD = "HEAD"
    case POST = "POST"
    case PUT = "PUT"
    case PATCH = "PATCH"
    case DELETE = "DELETE"
    case TRACE = "TRACE"
    case CONNECT = "CONNECT"
}
```

**使用时修改第一个参数即可：**

```swift
//swift
Alamofire.request(.POST, "http://httpbin.org/post")

Alamofire.request(.PUT, "http://httpbin.org/put")

Alamofire.request(.DELETE, "http://httpbin.org/delete")
```

## 加参数的网络请求：

**GET请求：**

```swift
//swift
Alamofire.request(.GET, "http://httpbin.org/get", parameters: ["foo": "bar"])
// http://httpbin.org/get?foo=bar
```

**POST请求：**

```swift
//swift
let parameters = [
    "foo": "bar",
    "baz": ["a", 1],
    "qux": [
        "x": 1,
        "y": 2,
        "z": 3
    ]
]

Alamofire.request(.POST, "http://httpbin.org/post", parameters: parameters)
// HTTP body: foo=bar&baz[]=a&baz[]=1&qux[x]=1&qux[y]=2&qux[z]=3
```

<!--**form形式上传图片**-->




由于大部分网络数据都是JSON格式的，所以Alamofire搭配[SwiftyJSON](http://caoyudong.com/2015/10/27/SwiftyJSON/)会比较好用

> 介于swift一直在升级，很多东西会经常变动。这篇文档也可能过一段时间就过时了，可以到[Alamofire](https://github.com/Alamofire/Alamofire)查看具体的改动，我也会经常来更新下博客的～