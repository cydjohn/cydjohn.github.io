---
title: "461. Hamming Distance"
date: 2018-04-28 01:09:26
tags: []
slug: "461-Hamming-Distance"
---
## 题目

The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers x and y, calculate the Hamming distance.

Note:
0 ≤ x, y < 2^31 .

**Example:**


> **Input:** x = 1, y = 4

> **Output:** 2

> **Explanation:**  

```
1   (0 0 0 1)    
4   (0 1 0 0)    
       ↑   ↑
```


> The above arrows point to positions where the corresponding bits are different.



## 思路

题目说 y < 2^31 那写一个32次的循环，依次统计一共有多少个1就好。



## 代码

```c++
//C++
int hammingDistance(int x, int y) {
    int result = 0;
    int s = x^y;
    for(int i = 0;i<32;i++) {
        if(s & 1 == 1) {
            result ++;
        }
        s = s>>1;
    }
    return result;
}
```

然后看到别人思路貌似有个比32次循环更快的方法：

```c++
//C++
int hammingDistance(int x, int y) {
    int dist = 0, n = x ^ y;
    while (n) {
        ++dist;
        n &= n - 1;
    }
    return dist;
}
```
