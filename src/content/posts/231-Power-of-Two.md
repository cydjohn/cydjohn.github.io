---
title: "231. Power of Two"
date: 2018-01-14 13:37:32
tags: ["算法"]
slug: "231-Power-of-Two"
---
## 题目

Given an integer, write a function to determine if it is a power of two.



## 思路

循环除以2看是否等于1。

或者

整型的范围是-2147483648 (-2^31) ~ 2147483647 (2^31-1)，用最大的整型 2^30(1073741824)去除它看是否能除尽。

## 代码

```c++
//C++ Solution
bool isPowerOfTwo(int n) {
    if(n==1) return true;
    if(n==0||n%2!=0) return false;
    else {
        return isPowerOfTwo(n/2);
    }
}
```


```c++
//C++ Solution
bool isPowerOfTwo(int n) {
    if(n<=0) return false;
    return 1073741824%n==0;
}
```

### Bit Operation

Discuss 上还有一种位操作的方法：



> 如果n是2的X次方，那么：

> n = 2 ^ 0 = 1 = 0b0000…00000001, and (n - 1) = 0 = 0b0000…0000.   
> n = 2 ^ 1 = 2 = 0b0000…00000010, and (n - 1) = 1 = 0b0000…0001.   
> n = 2 ^ 2 = 4 = 0b0000…00000100, and (n - 1) = 3 = 0b0000…0011.   
> n = 2 ^ 3 = 8 = 0b0000…00001000, and (n - 1) = 7 = 0b0000…0111.

> 于是我们可以得出 n & (n-1) == 0b0000…0000 == 0

```c++
bool isPowerOfTwo(int n) {
    return (n>0)&&((n & (n-1))==0);
}
``
