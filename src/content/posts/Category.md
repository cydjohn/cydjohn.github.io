---
title: "Category"
date: 2016-03-24 21:29:13
tags: ["IOS"]
slug: "Category"
---
开发的时候，如果我们想往一个已经存在的并且很复杂的类里面添加一个方法怎么办呢？翻源码加？源码已经那么复杂了，如果不断往里面添加，代码将变得不可维护。。。那就创建子类喽！问题是，那么多子类，谁会记得调用哪个类的哪个方法……就算你征服了如此复杂的代码，系统顺利跑起来了，一段时间后接手维护代码的人肯定要问候你全家千万遍。

所以，苹果给出了解决这一问题的方法--**Category**。



Category 是一种往已经存在的类里面添加新函数的方法。对于被扩展的类我们不需要访问他的源码，也不需要创建子类。

这里一般使用约定俗成的习惯，将声明文件和实现文件统一采用 **原类名+Category名** 的方式命名。使用也非常简单，引入Category的声明文件，然后正常调用即可。

**创建Category的方法：**

> `New file` -> `Objective-C File` -> (`file type` -> `Category`, `subclass` -> `NSXXXX`, `name` -> `……`) -> `Create~`就可以了


## 举个例子

比如，开发中我们经常用到NSUserDefault。每次使用我们都要这样：

```objectivec
[[NSUserDefaults standardUserDefaults] setValue:status forKey:@"userId"];
```
很麻烦，而且不同地方使用如果把`key`写错了会得不到正确的值，改正这种Debug需要极高的想象力。

但是我们可以用Category解决这个问题：

创建一个NSUserDefault的Category,然后在里面写上一些常用的set和get方法，使用的时候就可以轻易的得到或者设置想要的值，不必担心`key`值写错。

比如：

```objectivec
//  NSUserDefaults+CCUserDefaults.h

#import <Foundation/Foundation.h>

@interface NSUserDefaults (CCUserDefaults)

+(void)setUserPassword:(NSString *)password;
+(NSString *)userPassword;

+(void)setUserAccount:(NSString *)account;
+(NSString *)userAccount;
@end
```

```objectivec
//  NSUserDefaults+CCUserDefaults.m

#import "NSUserDefaults+CCUserDefaults.h"

static NSString * const userPassword = @"password";
static NSString * const userAccount  = @"account";

@implementation NSUserDefaults (CCUserDefaults)

+(void)setUserPassword:(NSString *)password {
    [[NSUserDefaults standardUserDefaults] setValue:password forKey:userPassword];
}
+(NSString *)userPassword {
    return [[NSUserDefaults standardUserDefaults] stringForKey:userPassword];
}

+(void)setUserAccount:(NSString *)account {
    [[NSUserDefaults standardUserDefaults] setValue:account forKey:userAccount];
}
+(NSString *)userAccount {
    return [[NSUserDefaults standardUserDefaults] stringForKey:userAccount];
}

@end
```

使用的时候直接使用就可以，方便了很多：

```objectivec
//某个controller

#import "NSUserDefaults+CCUserDefaults.h"

[NSUserDefaults setUserPassword:self.password];
[NSUserDefaults setUserAccount:self.account];
```

> 貌似这个例子有点抠脚……



