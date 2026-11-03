---
title: "186. Reverse Words in a String II"
date: 2018-07-13 19:50:41
tags: ["算法"]
slug: "186-Reverse-Words-in-a-String-II"
---
## 题目

Given an input string , reverse the string word by word. 

**Example:**

> **Input:**  ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]    
> **Output:** ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]

**Note:**

* A word is defined as a sequence of non-space characters.
* The input string does not contain leading or trailing spaces.
* The words are always separated by a single space.

**Follow up:** Could you do it in-place without allocating extra space?



## 思路

先把整个数组调换一遍，再根据空格为单位，再分别调换每一个单词就好。

## 代码

```c++
void reverse(vector<char>& str,int start, int end) {
    while(end>start) {
        swap(str[start++],str[end--]);
    }
}
    
void reverseWords(vector<char>& str) {
    //先把整个数组转换一遍
    int i = 0, j = str.size()-1;
    reverse(str,i, j);
    int start = 0, end = 0;
    //再根据空格转换一遍
    for(int i = 0; i< str.size();i++) {
        if(str[i] == ' ') {
            end = i-1;
            reverse(str,start, end);
            start = i+1;
        }
    }
    // 最后一个单词
    end = str.size()-1;
    reverse(str,start, end);
}
```