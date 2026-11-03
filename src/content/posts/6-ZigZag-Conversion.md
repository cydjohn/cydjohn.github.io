---
title: "6. ZigZag Conversion"
date: 2018-04-16 20:24:54
tags: ["算法"]
slug: "6-ZigZag-Conversion"
---
## 题目

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N  
A P L S I I G  
Y   I   R   
```

And then read line by line: "PAHNAPLSIIGYIR"

 

Write the code that will take a string and make this conversion given a number of rows:

> string convert(string text, int nRows);

`convert("PAYPALISHIRING", 3)` should return `"PAHNAPLSIIGYIR"`.



## 思路

这题指的`zigzag pattern`一开始我也不是很明白，看了Discuss之后才搞清楚，大概就是这样：

n=4的时候，图案是这样：

```
1    7   	  13
2  6 8   12 14
3 5  9 11   15
4    10
```

3行的时候图案是这样：

```
1   5   9  12
2 4 6 8 10 13 15
3   7   11 14
```

2行：

```
1 3 5 7  9
2 4 6 8 10
```

所以根据上述规律，可以发现第一行和最后一行每个数字之间都是相隔`2n-2`；然后斜着那条线，字符的位置永远与当前周期的前一个数字相隔`2n-2-2i`（i是行数），所以在第j个周期的第i行，那个字符的位置应该是`j+2n-2-2i`。


## 代码

```c++
//C++
string convert(string s, int numRows) {
    if(s.size()<2) {
        return s;
    }
    if(numRows==1) {
        return s;
    }
    string result;
    for(int i = 0;i<numRows;i++) {
        for(int j = i;j<s.size();j+=2*numRows-2) {
            result.push_back(s[j]);
            if(i!=0 && i!=numRows-1) {
                if(j+2*numRows-2-2*i<s.size()) {
                    result.push_back(s[j+2*numRows-2-2*i]);
                }
            }
            
        }
    }
    return result;
}
```