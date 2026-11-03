---
title: "SwiftyJSON"
date: 2015-10-27 13:39:53
tags: ["IOS"]
slug: "SwiftyJSON"
---
[SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON)是用swift写的一款处理JSON数据的库。我个人觉得非常好用～


为什么好用呢？借用下作者的例子：以前，我们需要向下面这样处理JSON数据，来得到一个人的名字：

```swift

let JSONObject: AnyObject? = NSJSONSerialization.JSONObjectWithData(data, options: nil, error: nil)

if let statusesArray = JSONObject as? [AnyObject],
   let status = statusesArray[0] as? [String: AnyObject],
   let user = status["user"] as? [String: AnyObject],
   let username = user["name"] as? String {
    // Finally we got the username
}

```
很不优雅……

但是用了SwiftJSON之后这样就可以得到了

```swift

let json = JSON(data: dataFromNetworking)
if let userName = json[0]["user"]["name"].string{
  //Now you got your value
}

```

而且随便玩，完全不用担心程序崩溃。如果数组访问越界或者数据不存在它自动返回`nil`



```swift

let json = JSON(data: dataFromNetworking)
if let userName = json[999999]["wrong_key"]["wrong_name"].string{
    //Calm down, take it easy, the ".string" property still produces the correct Optional String type with safety
} else {
    //Print the error
    println(json[999999]["wrong_key"]["wrong_name"])
}

```

## 安装

**CocoaPods**

将下面这个加到你的`Podfile`里面：

```ruby
pod "SwiftyJSON", ">= 2.2"
```

**Carthage**

将下面这个加到你的`Cartfile`里面：

```
github "SwiftyJSON/SwiftyJSON" >= 2.2
```

**手动安装**

直接将`SwiftyJSON.swift`拖到工程文件里面

## 用法

初始化

```swift
let json = JSON(data: dataFromNetworking)
```
```swift
let json = JSON(jsonObject)
```
```swift
if let dataFromString = jsonString.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: false) {
    let json = JSON(data: dataFromString)
}
```

获取各种数据


```swift
//NSNumber
if let id = json["user"]["favourites_count"].number {
   //Do something you want
} else {
   //Print the error
   println(json["user"]["favourites_count"].error)
}
```
```swift
//String
if let id = json["user"]["name"].string {
   //Do something you want
} else {
   //Print the error
   println(json["user"]["name"])
}
```
```swift
//Bool
if let id = json["user"]["is_translator"].bool {
   //Do something you want
} else {
   //Print the error
   println(json["user"]["is_translator"])
}
```
```swift
//Int
if let id = json["user"]["id"].int {
   //Do something you want
} else {
   //Print the error
   println(json["user"]["id"])
}
...
```

或者用`xxxValue`，如果不确定数据格式的话。

```swift
//If not a Number or nil, return 0
let id: Int = json["id"].intValue
```
```swift
//If not a String or nil, return ""
let name: String = json["name"].stringValue
```
```swift
//If not a Array or nil, return []
let list: Array<JSON> = json["list"].arrayValue
```
```swift
//If not a Dictionary or nil, return [:]
let user: Dictionary<String, JSON> = json["user"].dictionaryValue
```



循环访问数据

```swift
//If json is .Dictionary
for (key: String, subJson: JSON) in json {
   //Do something you want
}
```


在[Alamofire](http://caoyudong.com/2015/10/27/Alamofire/)里面使用SwiftyJSON

```swift
Alamofire.request(.GET, url, parameters: parameters)
  .responseJSON { (req, res, json, error) in
    if(error != nil) {
      NSLog("Error: \(error)")
      println(req)
      println(res)
    }
    else {
      NSLog("Success: \(url)")
      var json = JSON(json!)
    }
  }
```

> 介于swift一直在升级，很多东西会经常变动。这篇文档也可能过一段时间就过时了，有问题可以到[SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON)里面提下issue，我也会经常来更新下博客的～
