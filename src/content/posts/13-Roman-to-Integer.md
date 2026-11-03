---
title: "13. Roman to Integer"
date: 2018-04-12 22:13:15
tags: []
slug: "13-Roman-to-Integer"
---
## 题目

Given a roman numeral, convert it to an integer.

Input is guaranteed to be within the range from 1 to 3999.



## 思路

罗马数字共有7个，即Ⅰ（1）、Ⅴ（5）、Ⅹ（10）、Ⅼ（50）、Ⅽ（100）、Ⅾ（500）和Ⅿ（1000）。

* 重复数次：一个罗马数字重复几次，就表示这个数的几倍。
* 右加左减：
	* 在较大的罗马数字的右边记上较小的罗马数字，表示大数字加小数字。
	* 在较大的罗马数字的左边记上较小的罗马数字，表示大数字减小数字。
	* 左减的数字有限制，仅限于I、X、C。比如45不可以写成VL，只能是XLV
但是，左减时不可跨越一个位值。比如，99不可以用IC（ {\displaystyle 100-1} 100-1）表示，而是用XCIX（ {\displaystyle [100-10]+[10-1]} [100-10]+[10-1]）表示。（等同于阿拉伯数字每位数字分别表示。）
	* 左减数字必须为一位，比如8写成VIII，而非IIX。
	* 右加数字不可连续超过三位，比如14写成XIV，而非XIIII。

> 参考自[维基百科](https://zh.wikipedia.org/wiki/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97)


所以从右往左依次读取每一个字符，比较他们的大小。如果右边一位字符的值大于当前字符的值，就在总结果里面减去当前的值，如果大于或等于当前的值就在总结果加上当前的值。


## 代码

```c++
//C++
int romanToInt(string s) {
    map<char,int> romanMap = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};
    int result = romanMap[s[s.size()-1]];
    for(int i = s.size()-2;i>=0;i--) {
        if(romanMap[s[i]]>=romanMap[s[i+1]]) {
            result+=romanMap[s[i]];
        }
        else {
            result-=romanMap[s[i]];
        }
    }
    return result;
}
```