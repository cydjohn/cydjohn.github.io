---
title: "C语言使用Sqlite"
date: 2015-10-28 21:40:20
tags: ["C", "sqlite"]
slug: "C语言使用Sqlite"
---
## Mac下
Xcode中需要引入`libsqlite3.0.tbd`

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-28/18226100.jpg)


## Windows下
需要用到sqlite3.lib



 sqlite3官网上并没有sqlite3.lib可下载，要用需自编译生成。[官网地址](http://www.sqlite.org/)  
 
 如从sqlite3.7.5版本中得到sqlite3.lib，可用VS的LIB工具链接得到。
具体过程如下：   

1. 先将sqlite-dll-win64-x64-3090100.rar解压到文件夹sqlite-dll-win64-x64-3090100，   
2. 再将VS安装目录下VC中的LIB.EXE，LINK.EXE复制到sqlite-dll-win64-x64-3090100文件夹，**(lib.exe，link.exe地址：C:\Program Files (x86)\Microsoft Visual Studio 11.0\VC\bin)**   
3. 在网上下载[mspdb60.dll](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-28/86470628-mspdb60.dll)，复制到sqlite-dll-win64-x64-3090100文件夹，   
4. 将Program Files (x86)\Microsoft Visual Studio 10.0\Common7\IDE内的   mspdb110.dll复制到sqlite-dll-win64-x64-3090100文件夹。   
5. 在命令窗内运行命令进入sqlite-dll-win64-x64-3090100文件夹   
6. 执行LIB /DEF:SQLITE3.DEF /MACHINE:IX86或LIB /DEF:SQLITE3.DEF 即可生成sqlite3.lib文件。
7. 然后将sqlite3.lib文件引入项目中

[sqlite3.lib下载](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-28/2668125-SQLITE3.lib)

> 或者，使用一个超简单的方法.直接从官网上下载源文件，然后把`sqlite3.c`, `sqlite3.h` 放入工程中～

## 主要函数


### **sqlite3_open(const char \*filename,sqlite3 **ppDb)**
 
* **filename:** 数据库文件的名字
* **ppDb:** sqlite的一个handle，之后通过这个handle对数据库做操作

### **sqlite3_exec(sqlite3\*, const char \*sql,int (\*callback)(void\*,int,char\*\*,char\*\*),void \*,char \*\*errmsg)**



*  **sqlite3:** 一个已经打开的handle（通过sqlite3_open处理过）
*  **sql:**  需要执行的sql语句
*  **int (\*callback)(void\*,int,char\*\*,char\*\*):**  一个回调函数
*  **void\*:**  一个回调参数
*  **\*\*errmsg**  错误消息                                  


## 具体增删查改操作

```c
//c
#include "sqlite3.h"
```

### 创建数据库文件

```c
//c
sqlite3 *getDatabase()
{
    sqlite3 *db=NULL;
    int rc;
    rc = sqlite3_open("test.db", &db);   //打开指定的数据库文件,如果不存在将创建一个同名的数据库文件
    if( rc ){
        fprintf(stderr, "Can't open database: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        exit(1);
    }
    return db;
}

```

### 建表

```c
//c
void createTable()
{
    sqlite3 *db = getDatabase();
    const char * sql = "CREATE TABLE IF NOT EXISTS testTable(id integer primary key,a text,b text,c text);";
    char * pErrMsg = "0";
    int result = sqlite3_exec(db, sql, 0, 0, &pErrMsg );
    if( result != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", pErrMsg);
        sqlite3_free(pErrMsg);
    }
    sqlite3_close(db);                //关闭数据库
}

```

### 增

```c
//c
void insertIntoDatabase()
{
    sqlite3 *db = getDatabase();
    char * pErrMsg = 0;
    int result = sqlite3_exec(db, "INSERT INTO testTable(a,b,c) VALUES(1,2,3);", 0, 0, &pErrMsg);
    if(result == SQLITE_OK){
        printf("插入数据成功\n");
    }
    sqlite3_close(db);                //关闭数据库
}
```

### 删

```c
//c
void deleteFromTable()
{
    sqlite3 *db = getDatabase();
    char *pErrMsg = 0;
    sqlite3_exec(db, "delete from testTable where id = 2", NULL,NULL, &pErrMsg);
    sqlite3_close(db);
}
```

### 查

```c
//c
int select_callback(void * data, int col_count, char ** col_values, char ** col_Name)
{
    // 每条记录回调一次该函数,有多少条就回调多少次
    int i;
    for( i=0; i < col_count; i++){
        printf( "%s = %s\n", col_Name[i], col_values[i] == 0 ? "NULL" : col_values[i] );
    }
    
    return 0;
}
void databaseQuery()
{
    sqlite3 *db = getDatabase();
    char * pErrMsg = 0;
    sqlite3_exec(db, "select * from testTable;", select_callback, 0, &pErrMsg);
    sqlite3_close(db);                //关闭数据库
}
```
> 输出很奇葩，需要根据自己项目做修改

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-28/40328337.jpg)

### 改

```c
//c
void updateTable()
{
    sqlite3 *db = getDatabase();
    char *pErrMsg = 0;
    sqlite3_exec(db, "update testTable set a = 666 where id = 1" , NULL, NULL, &pErrMsg);
    sqlite3_close(db);
}

```