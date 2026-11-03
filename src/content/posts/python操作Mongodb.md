---
title: "python操作Mongodb"
date: 2016-10-26 17:28:47
tags: ["python", "mongoDB"]
slug: "python操作Mongodb"
---
先安装`pymongo`

~~~bash
pip install pymongo
~~~



## from pymongo import MongoClient

~~~python
from pymongo import MongoClient
~~~


## 创建链接

~~~python
client = MongoClient()
~~~

~~~python
client = MongoClient("mongodb://mongodb0.example.net:27017")
~~~

## 连接到指定的database和collection

```python
db = client.test_db
collection = db.test_collection
```

也可以像这样

```python
db = client["test_db"]
collection = db["test_collection"]
```
两种代码是等价的

其中`collection`相当于关系型数据库的表。

## 增删查改操作

### 插入

```python
data = {"name":"John","age":23,"sex":"male"}
collection.insert(data)
collection.insert_one(data)

#inser_many()必须为数组
dataList = []
dataList.append(data)
collection.insert_many(dataList)

```

### 删除

```python
collection.remove(temp)      #即便该temp不存在也不会报错
collection.delete_one(temp)
collection.delete_many(temp) #与 .insert_many() 不同，在temp不是list类型时也不会报错
```

### 查询

空查询：

```python
#返回collection所有记录
collection.find({})
```

**find_one()**显示满足条件的第一个collection，而**find()**这是所有满足查询条件的一个数组。


```python
#返回所有名字叫lucy的人
for data in collection.find({"name":"Lucy"})
	print data
```

查询指定条件的collection，可以指定一个活多个条件：

```python
collection.find_one({“name”:”Lucy”})
collection.find_one({“name”:”Lucy”, “sex”:”female”})
```

`.count()`统计结果总条数：

```python
collection.find({“name”:”Lucy”}).count()
```

指定大于小于等于条件查询：

```python
collection.find({“age”: {“$lt”: 30}})

```

这样的查询符号有 `$lt（小于）`， `$gt（大于）`， `$lte（小于等于）`， `$gte（大于等于）`， $ne（不等于），这与原生 MongoDB 中相同。

将查询结果按条件排序：

```python
collection.find().sort("age")  #默认，升序
collection.find().sort("age", pymongo.ASCENDING)   #升序
collection.find().sort("age", pymongo.DESCENDING)  #降序
```

## 更新

```python
temp = collection.find_one({"name":"Lucy"})
temp2 = temp.copy()
temp["name"] = "Jordan"
collection.save(temp)   #或 .update() ，注意参数形式
collection.update(temp, temp2)  #将temp更新为temp2
```

----

如果直接输出查询结果，会发现输出的是一“团”连续的，没有锁进的JSON数据，完全没有办法看，这时可以通过下面这行代码来输出格式化的JSON数据：

```python
import json
# item 是你要输出的数据
print json.dumps(item, indent=4, sort_keys=True)
```



> <http://xitongjiagoushi.blog.51cto.com/9975742/1657096>
> <http://api.mongodb.org/python/current/tutorial.html>











