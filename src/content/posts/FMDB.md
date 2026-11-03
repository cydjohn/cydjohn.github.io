---
title: "FMDB"
date: 2015-08-05 15:09:45
tags: ["IOS"]
slug: "FMDB"
---
IOS中原生的SQLite API十分不友好，对于我这种菜鸟来说简直不能用，于是就有大神写了封装了SQLite API的库，比如FMDB,[https://github.com/ccgus/fmdb](https://github.com/ccgus/fmdb)。



安装方法可以在官网上看，我是直接用了cocoaPods。如果是swift项目要直接把fmdb文件夹下的这些文件拖到你的项目中

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-4/44494850.jpg)
然后Xcode会自动新建一个*桥接文件（bridge）*，然后在那个文件添加一行

~~~objectivec
//OC
#import "FMDB.h"
~~~
就可以用了。

OC直接添加`#import "FMDB.h"`就可以。

> 用之前需要在`General`的`Linked Frameworks and Libraries`里面添加`libsqlite3.0.dylib`，不然会报错（而且是30多个）！


创建`FMDatabase`需要指定一个路径，通过下面这条语句实现。

~~~objectivec
//OC
FMDatabase *db = [FMDatabase databaseWithPath:@"/tmp/tmp.db"];
~~~
不过既然是用数据库，那一般都是要持久化的存储，那么这个sqlite文件应该放到`Document`文件夹下。所以一般我是这么创建的（其实貌似也是标准的创建方法）：

~~~objectivec
//OC
NSString *documentsDirectory = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) objectAtIndex:0];
    NSString* databasePath = [documentsDirectory stringByAppendingPathComponent: @"test.sqlite"];
    FMDatabase* db = [FMDatabase databaseWithPath:databasePath];

~~~

~~~swift
//swift
let documentsFolder = NSSearchPathForDirectoriesInDomains(.DocumentDirectory, .UserDomainMask, true)[0] as String
let path = documentsFolder.stringByAppendingPathComponent("test.sqlite")
let database = FMDatabase(path: path)
~~~

里面的`@"user.sqlite"`，是sqlite文件的名字，随你怎么叫。然后就可以拿着这个`db`做增删查改的活了。

## 创建数据库：

~~~objectivec
//OC
if (![db open]) {
        NSLog(@"Could not open db.");
    }
NSString *sql = @"create table test(x text, y text, z text)";
    if (![db executeUpdate:sql] ) {
        NSLog(@"create table failed: %@",[db lastErrorMessage]);
    }
    [db close];
~~~
~~~swift
//swift
 if database.open() {
       if !database.executeUpdate("create table if not exists test(x text, y text, z text)", withArgumentsInArray: nil) {
            println("create table failed: \(database.lastErrorMessage())")
        }
    database.close()
    }
~~~


## 增加一行数据：

~~~objectivec
//OC
    if (![db open]) {
        NSLog(@"Could not open db.");
    }
    if (![db executeUpdate:@"insert into test(x, y, z) values (? , ?, ?)",@"a",@"b",@"c"]) {
        NSLog(@"insert 1 table failed: %@", [db lastErrorMessage]);
    }
    [db close];
~~~

~~~swift
//swift
 if database.open() {
            if !database.executeUpdate("create table if not exists test(x text, y text, z text)", withArgumentsInArray: nil) {
                println("create table failed: \(database.lastErrorMessage())")
            }
            database.close()
        }
~~~

注意参数必须是NSObject的子类，所以什么int,double,bool都需要封装

比如官网上的例子：

~~~objectivec
//OC
// 错误，42不能作为参数
[db executeUpdate:@"INSERT INTO myTable VALUES (?)", 42];
// 正确，将42封装成 NSNumber 类
[db executeUpdate:@"INSERT INTO myTable VALUES (?)", [NSNumber numberWithInt:42]];
~~~




## 删除一行数据：

~~~objectivec
//OC
if (![db open]) {
        NSLog(@"Could not open db.");
    }
    if (![db executeUpdate:@"delete from test where x = ?",@"a"]) {
        NSLog(@"delete failed: %@",[db lastErrorMessage]);
    }
    [db close];
~~~
~~~swift
//swift
if database.open(){
            if !database.executeUpdate("delete from test where x = ?", withArgumentsInArray: ["a"]){
                println("delete failed: \(database.lastErrorMessage())")
            }
            
            database.close()
        }
~~~

## 查询：

~~~objectivec
//OC
if (![db open]) {
        NSLog(@"Could not open db.");
    }
    FMResultSet *rs = [db executeQuery:@"select x, y, z from test"];
    while (rs.next) {
        NSString *x = [rs stringForColumn:@"x"];
        NSString *y = [rs stringForColumn:@"y"];
        NSString *z = [rs stringForColumn:@"z"];
        NSLog(@"x = %@; y = %@; z = %@",x,y,z);
    }
    [db close];
~~~
~~~swift
//swift
 if database.open(){
        if let rs = database.executeQuery("select x, y, z from test", withArgumentsInArray: nil) {
            while rs.next() {
                let x = rs.stringForColumn("x")
                let y = rs.stringForColumn("y")
                let z = rs.stringForColumn("z")
                println("x = \(x); y = \(y); z = \(z)")
            }
        } else {
            println("select failed: \(database.lastErrorMessage())")
        }
        database.close()
        }
~~~

## 修改：

~~~objectivec
//OC
 if (![db open]) {
        NSLog(@"Could not open db.");
    }
    if (![db executeUpdate:@"update test set y = ? where x = ?",@"00",@"a"]) {
        NSLog(@"update falied: %@" , [db lastErrorMessage]);
    }
    [db close];
~~~
~~~swift
//swift
if database.open(){
            if !database.executeUpdate("update test set y = ? where x = ?", withArgumentsInArray: ["00","a"]){
                println("update failed: \(database.lastErrorMessage())")
            }
            
            database.close()
        }
~~~

[OC示例下载](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-5/19333329-fmdbOC.zip)  
[swift示例下载（swift1.2；Xcode 6.4）](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-5/87232102-fmdbSwift.zip)

如果各位在用的时候**FMDB**发现增删查改的时候老是报 *“no such table”* 这种错，而且拍着胸脯表示自己绝对创建表了！！怎么可能报错说没有表！！！
  
那应该是犯了跟我一样的小错误～～  

当然为了搞清楚这是怎么回事我今天从下午三点一直谷歌，百度，stackoverflow，github……到处找原因，甚至还跑去看日语，俄语的博客（当然我看不懂，只是翻翻代码）。然后我惊讶的发现，遇到跟我一样问题的人只是极少数，而且都只是提了问题后续都没有结果！
  
经验告诉我，这不会是**FMDB**的问题只会是我自己的问题，而且是一个特别傻的问题。但是到底是什么问题我还是找不出来……  

***于是我就出去理了个发。***  

俗话说的好，头发长见识短。理完发回来就是晚上九点了，这时的我精神焕发，思路清晰，智商比下午至少提高了7点！再次打开代码，啊！哈！果然！

>###在FMDB中，只有`查询操作`需要用到`executeQuery`，其他增删查改操作都是用`executeUpdate`！！！！  

这么一改果然没问题了……可怜了我的头发，现在感觉自己像个和尚😭
