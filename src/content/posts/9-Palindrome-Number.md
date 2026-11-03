---
title: "9. Palindrome Number"
date: 2018-04-12 13:48:23
tags: ["算法"]
slug: "9-Palindrome-Number"
---
## 题目

Determine whether an integer is a palindrome. Do this without extra space.



## 思路

声明一个临时变量`sum`，辗转相除以及辗转相乘，然后比较`sum`和输入量的大小即可。

## 代码

```c++
//C++
bool isPalindrome(int x) {
    if(x<0|| (x!=0 &&x%10==0)) {
        return false;
    }
    int sum=0;
    while(x>sum) {
        sum*=10;
        sum+=x%10;
        x/=10;
    }
    return (sum==x)||(x==sum/10);
}
```