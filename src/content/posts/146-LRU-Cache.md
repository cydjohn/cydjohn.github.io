---
title: "146. LRU Cache"
date: 2018-01-14 23:56:50
tags: []
slug: "146-LRU-Cache"
---
## 题目

Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

**Follow up:**

Could you do both operations in **O(1)** time complexity?

**Example:**

LRUCache cache = new LRUCache( 2 /* capacity */ );

> cache.put(1, 1);   
> cache.put(2, 2);    
> cache.get(1);       // returns 1   
> cache.put(3, 3);    // evicts key 2   
> cache.get(2);       // returns -1 (not found)    
> cache.put(4, 4);    // evicts key 1   
> cache.get(1);       // returns -1 (not found)   
> cache.get(3);       // returns 3   
> cache.get(4);       // returns 4  



## 思路

设计一个LRU算法。

操作系统中进行内存管理中时采用一些页面置换算法，如LRU、LFU和FIFO等。其中LRU应用较为广泛。LRU的全称是Least Recently Used，即最近最少使用算法。当访问数据时，如缓存中有数据，则将该数据移动至链表的顶端；没有该数据则在顶端加入该数据，并移除链表中的最不常使用的数据。

这题应该用双链表来实现，使用Queue的话会超时因为Queue的查找使用了O(n)，双链表可以在`O(1)`完成`get(key)``put(key)`操作。

* Cache 使用一个HashMap来达到`O(1)`的查找效果。
* Get 用一个双链表，自定义一个Node，里面有key，value，preNode，nextNode。
	* 假如miss，返回-1（rise exception？）
	* 假如 hit：
		* 记录当前节点的value
		* 在双链表中删除这个Node
		* 链表头部加入这个Node
* Set
	* 假如miss：
		* 假如List.Size()<Capacity：
			* 添加新节点到队头
			* 增加新节点到map
		* 假如 List.Size()>Capacity：
			* 删掉队尾节点
			* 增加新节点到map
			* 添加新节点到队头
	* 假如 hit：
		* 更新vaule值
		* 节点移到队头






## 代码

```java
class LRUCache {
    class Node {
    int key;
    int value;
    Node pre;
    Node next;

    public Node(int key, int value) {
        this.key = key;
        this.value = value;
    }
}
    HashMap<Integer, Node> map;
    int capacity, count;
    Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<Integer, Node>();
        head = new Node(0,0);
        tail = new Node(0,0);
        head.next = tail;
        head.pre = null;
        tail.pre = head;
        tail.next = null;
        count = 0;
    }
    
    private void removeNode(Node node) {
        node.pre.next = node.next;
        node.next.pre = node.pre;
    }
    
    private void addNodeToHead(Node node) {
        node.next = head.next;
        node.next.pre = node;
        
        node.pre = head;
        head.next = node;
   
    }
    
    public int get(int key) {
        Node node = map.get(key);
        if(node !=null) {
            int result = node.value;
            removeNode(node);
            addNodeToHead(node);
            return result;
        }
        else {
            return -1;
        }
    }
    
    public void put(int key, int value) {
        if(map.get(key)!=null) {
            Node node = map.get(key);
            node.value = value;
            removeNode(node);
            addNodeToHead(node);
        } else {
            Node node = new Node(key,value);
            map.put(key,node);
            if(count<capacity) {
                count++;
            } else {
                map.remove(tail.pre.key);
                removeNode(tail.pre);
            }
            addNodeToHead(node);
        }
    }
}
```


```c++
```


Java里面有个数据结构叫`LinkedHashMap`，刚好可以满足LRU算法，不过面试的时候应该不会让你用吧，不然对我们这种C++选手太不公平了！

```java
//Java Solution
public class LRUCache {
    private LinkedHashMap<Integer, Integer> map;
    private final int CAPACITY;
    public LRUCache(int capacity) {
        CAPACITY = capacity;
        map = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true){
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return size() > CAPACITY;
            }
        };
    }
    public int get(int key) {
        return map.getOrDefault(key, -1);
    }
    public void put(int key, int value) {
        map.put(key, value);
    }
}
```