---
title: "371. Sum of Two Integers"
date: 2018-04-24 00:34:12
tags: ["算法"]
slug: "371-Sum-of-Two-Integers"
---
## 题目

Calculate the sum of two integers a and b, but you are not allowed to use the operator `+` and `-`.

**Example:**

Given a = 1 and b = 2, return 3.



## 思路

不能用 `+` 号或者 `-` 号，那就只能用位操作了。位操作有四种：

`&` 与操作（AND operation）： 2 (0010) & 7 (0111) => 2 (0010)

`|` 或操作 （OR operation）： 2 (0010) | 7 (0111) => 7 (0111)

`^` 异或操作 （XOR operation）： 2 (0010) ^ 7 (0111) => 5 (0101)

`~` 非操作 （NOT operation）： ~2(0010) => -3 (1101) `补码，见文末`

其中，最左边一位是符号位，代表正负，比如

1111 代表 -1 （补码）

1110 代表 -2

这题两个位置全为1的地方需要进一位，不全为1的地方直接异或操作就好。于是我们用一个`carry`来记录进位，每次进位完需要左移一位。

## 代码

### C++

```c++
//C++
int getSum(int a, int b) {
    if(a==0) {
        return b;
    } 
    if(b==0) {
        return a;
    } 
    while(b!=0) {
        int carry = a & b;
        a = a ^ b;
        b = carry<<1;
    }
    return a;
}
```




## 扩展

### 减法

```c++
//C++
int getSubtract(int a, int b) {
	while (b != 0) {
		int borrow = (~a) & b;
		a = a ^ b;
		b = borrow << 1;
	}
	
	return a;
}
```



