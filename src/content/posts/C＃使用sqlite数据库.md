---
title: "C＃使用sqlite数据库"
date: 2015-09-16 23:04:02
tags: ["C＃", "sqlite"]
slug: "C＃使用sqlite数据库"
---
> 环境：Mac win7虚拟机，vs2013 

首先下载安装[Sqlite ADO.NET](http://system.data.sqlite.org/index.html/doc/trunk/www/downloads.wiki)(有很多版本，我用的是1.0.93)



下载下来一路next就可以安装好。

然后在工程里面添加引用`system.data.sqlite.dll`和`SQLite.Interop.dll`。我电脑里面这两个文件在`C:\Program Files (x86)\System.Data.SQLite\2013\bin`。

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-9-16/1523753.jpg)

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-9-16/20560647.jpg)

然后添加`using System.Data.SQLite;`就可以用了。

-------
## 具体增删查改操作

### 创建数据库文件

在根目录下创建一个sqlite文件   

~~~csharp
//C#

public static SQLiteConnection getDatabase(){
            SQLiteConnection conn = null;

            string dbPath = "Data Source =" + Environment.CurrentDirectory + "/test.db";
            conn = new SQLiteConnection(dbPath);//创建数据库实例，指定文件位置 
            return conn;
    }
~~~

### 建表
~~~csharp
//C#

private void createTable(){
        SQLiteConnection conn = getDatabase();

        conn.Open();//打开数据库，若文件不存在会自动创建  
        
        string sql = "CREATE TABLE IF NOT EXISTS testTable(id integer primary key,a text,b text,c text);";//建表语句  
        SQLiteCommand cmdCreateTable = new SQLiteCommand(sql, conn);
        cmdCreateTable.ExecuteNonQuery();//如果表不存在，创建数据表 
        conn.Close();
}
~~~
### 增
~~~csharp
//C#
private void insertIntoDatabase()
        {
            SQLiteConnection conn = getDatabase();
            conn.Open();
            SQLiteCommand cmdInsert = new SQLiteCommand(conn);
            cmdInsert.CommandText = "INSERT INTO testTable(a,b,c) VALUES(1,2,3)";//插入数据  
            cmdInsert.ExecuteNonQuery();
            conn.Close();
        }
~~~
### 删
~~~csharp
//C#

private void deleteFromDatabase(int a)
        {
            SQLiteConnection conn = getDatabase();
            conn.Open();
            string sql = "delete from testTable where id = " + a;
            SQLiteCommand cmdInsert = new SQLiteCommand(conn);
            cmdInsert.CommandText = sql;  
            cmdInsert.ExecuteNonQuery();
            conn.Close();
        }

~~~
### 查
~~~csharp
//C#
public void readNameFromDatabase()
        {
            SQLiteConnection conn = getDatabase();
            conn.Open();//打开数据库，若文件不存在会自动创建  
            string sql = "select id name from testTable";
            SQLiteCommand cmdQ = new SQLiteCommand(sql, conn);
            SQLiteDataReader reader = cmdQ.ExecuteReader();
            while (reader.Read())
            {
            	int id = reader.GetInt32(0);
                string a = reader.GetString(1);
                string b = reader.GetString(2);
                string c = reader.GetString(3);
                //………………
            }
            conn.Close();

            // Console.ReadKey(); 
        }
~~~
### 改
~~~csharp
//C#
private void updateDatabase(int a)
        {
            SQLiteConnection conn = getDatabase();
            conn.Open();
            string sql = "update testTable set a = 5,b = 6,c = 7 where id = " + a;
            SQLiteCommand cmdInsert = new SQLiteCommand(conn);
            cmdInsert.CommandText = sql;
            cmdInsert.ExecuteNonQuery();
            conn.Close();
            
        }
~~~

> 跟iOS上sqlite用法好像啊……
