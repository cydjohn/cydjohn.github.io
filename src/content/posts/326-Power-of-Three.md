---
title: "326. Power of Three"
date: 2018-01-13 19:31:48
tags: ["算法"]
slug: "326-Power-of-Three"
---
## 题目

Given an integer, write a function to determine if it is a power of three.

Follow up:
Could you do it without using any loop / recursion?



## 思路

如果一个数是3的X次方，那么把这个数循环除以3一定会等于1，所以写个循环就好。

## 代码

```c++
//C++ Solution
bool isPowerOfThree(int n) {
    while(n>0&&n%3==0) {
        n = n/3;
    }
    return n == 1;
}
```


看到题目说不能用递归，顺便想了下用递归怎么做（我也不能理解我这脑回路


```c++
//C++ Solution
bool isPowerOfThree(int n) {
    if(n == 1) return true;
    if(n%3!=0||n<=0) return false;
    else {
        return isPowerOfThree(n/3);
    }
}
```

然后还看到了Discuss上两种神奇的解法：

### 任何一个3的x次方一定能被int型里最大的3的x次方整除

1162261467 是3^19,3^20 比int大

```c++
//C++ Solution
bool isPowerOfThree(int n) {
    return n>0?!(1162261467 % n):0;  
}
```
### log函数

如果N是3的X次方：
  
* 那么 `3^N == N`
* 那么 `log (3^X) == log N`
* 那么 `X log 3 == log N`
* 那么 `X == (log N) / (log 3)`
* 根据题目，`X`必须是个整数，所以只用判断`X`是不是整数就好

但是由于计算机存储数字的方式，log(N)不可能被精确的存下来，所以判断的方式需要这样实现：

```c++
//C++ Solution
bool isPowerOfThree(int n) {
    double x = log(n)/log(3);
    return abs(x-rint(x))<=0.00000000000001;
}
```





