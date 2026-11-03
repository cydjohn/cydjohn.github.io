---
title: "8. String to Integer (atoi)"
date: 2018-04-16 23:40:00
tags: ["算法"]
slug: "8-String-to-Integer-atoi"
---
## 题目

Implement atoi which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

**Note:** 

Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT\_MAX (2^31 − 1) or INT\_MIN (−2^31 ) is returned.



**Example 1:**

> **Input:** "42"  
> **Output:** 42

**Example 2:**

> **Input:** "&nbsp;&nbsp;&nbsp;&nbsp; -42"   
> **Output:** -42  
> **Explanation:** The first non-whitespace character is '-', which is the minus sign.Then take as many numerical digits as possible, which gets 42.

**Example 3:**

> **Input:** "4193 with words"  
> **Output:** 4193  
> **Explanation:** Conversion stops at digit '3' as the next character is not a numerical digit.

**Example 4:**

> **Input:** "words and 987"  
> **Output:** 0  
> **Explanation:** The first non-whitespace character is 'w', which is not a numerical digit or a +/- sign. Therefore no valid conversion could be performed.

**Example 5:**

> **Input:** "-91283472332"  
> **Output:** -2147483648  
> **Explanation:** The number "-91283472332" is out of the range of a 32-bit signed integer. Thefore INT_MIN (−231) is returned.




## 思路

**这题太他妈傻逼了！！！！**

题目5个要求：

1. string 转 int
2. 丢弃数字前面的空格
3. 丢弃数字后面的字符串
4. 无视字符串后面的数字
5. 超过INT\_MAX (2^31 − 1) 或 INT\_MIN (−2^31 )返回边界值


本来挺简单的，题目写if else就好，但是测试用例里面居然还有`+-2`,`+1`这种情况！！ 什么破玩意。


## 代码

```c++
//C++
int myAtoi(string str) {
    int flag = 1;
    double result = 0;
    int i = 0;
    while(str[i] == ' ') {
        i++;
    }

    if(str[i] == '-'||str[i] == '+') {
        if(str[i+1] != '-'||str[i+1] != '-') {
            if(str[i] == '-') {
                flag = -1;
            }
            i++;
        }
        else {
            return 0;
        }
        
    }
    while(str[i]<='9'&&str[i]>='0'&&i<str.size()) {
        result*=10;
        result+=(int)str[i] - 48;
        i++;
    }

    result *= flag;
    result = result<INT_MIN?INT_MIN:result;
    result = result>INT_MAX?INT_MAX:result;
    return result;
}

//简洁版 https://leetcode.com/problems/string-to-integer-atoi/discuss/4642/8ms-C++-solution-easy-to-understand
int myAtoi(string str) {
    long result = 0;
    int indicator = 1;
    for(int i = 0; i<str.size();)
    {
        i = str.find_first_not_of(' ');
        if(str[i] == '-' || str[i] == '+')
            indicator = (str[i++] == '-')? -1 : 1;
        while('0'<= str[i] && str[i] <= '9') 
        {
            result = result*10 + (str[i++]-'0');
            if(result*indicator >= INT_MAX) return INT_MAX;
            if(result*indicator <= INT_MIN) return INT_MIN;                
        }
        return result*indicator;
    }
}
```




