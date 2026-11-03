---
title: "345. Reverse Vowels of a String"
date: 2018-01-14 14:29:48
tags: ["算法"]
slug: "345-Reverse-Vowels-of-a-String"
---
## 题目

Write a function that takes a string as input and reverse only the vowels of a string.

**Example 1:**

Given s = "hello", return "holle".

**Example 2:**

Given s = "leetcode", return "leotcede".

**Note:**

The vowels does not include the letter "y".



## 思路

用两个index 分别记录头和尾的位置，然后一一交换元音字母就好。

## 代码

```c++
bool judge(char a) {
    switch(a) {
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u': 
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U': return true; 
        default: return false;
    }
    
}
    
string reverseVowels(string s) {
    int start = 0, end = s.size()-1;
    while(end>start) {
        if(!judge(s[start])) {
            start++;
        }
        else if(!judge(s[end])) {
            end--;
        }
        else {
            swap(s[start++],s[end--]);
        }
    }
    return s;
}
```

```java
//Java Solution
 boolean judge(char a) {
    switch(a) {
        case 'a': 
        case 'e':
        case 'i':
        case 'o':
        case 'u': 
        case 'A':
        case 'E':
        case 'I':
        case 'O':
        case 'U': return true; 
        default: return false;
    }
}
public String reverseVowels(String s) {
    int start = 0, end = s.length()-1;
    char[] chars = s.toCharArray();
    
    while(end>start) {
        if(!judge(chars[start])) {
            start++;
        }
        else if(!judge(chars[end])) {
            end--;
        }
        else {
            char temp = chars[start];
            chars[start] = chars[end];
            chars[end] = temp;
            start++;
            end--;
        }
    }
    return new String(chars);
}
```