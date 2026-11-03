---
title: "14. Longest Common Prefix"
date: 2018-04-28 00:47:33
tags: ["算法"]
slug: "14-Longest-Common-Prefix"
---
## 题目

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

**Example 1:**

> **Input:** ["flower","flow","flight"]   
> **Output:** "fl"

**Example 2:**

> **Input:** ["dog","racecar","car"]    
> **Output:** ""

**Explanation:** There is no common prefix among the input strings.
Note:

All given inputs are in lowercase letters `a-z`.



## 思路

我的思路是以第一个字符串为标准设为`result `，依次寻找每个字符串的公共前缀，如果有不一样的就从`result`里把不一样的移除，剩下的`result`就是所求的公共前缀了。

然后就是看到别人的思路：从0开始依次遍历每一个字符串，如果是公共前缀就加到`result`里。

> 貌似我的比他快了一毫秒O(∩_∩)O~


## 代码

```c++
//C++
string longestCommonPrefix(vector<string>& strs) {
    if(strs.size() == 0) {
        return "";
    }
    string result = strs[0];

    for(string s:strs) {
        if(s.size()==0) {
            return "";
        }
        for(int i = 0;i<result.size() && i<s.size();i++) {
            if(s[i] != result[i]) {
                result.erase(i,result.size()-i);
                break;
            }
        }
        if(result.size()>s.size()) {
            result.erase(s.size(),result.size()-s.size());
        }
    }
    return result;
}
```
-----

从0开始依次遍历每一个字符串，如果是公共前缀就加到`result`里。

```c++
//C++ 
string longestCommonPrefix(vector<string>& strs) {
    string prefix = "";
    for(int idx=0; strs.size()>0; prefix+=strs[0][idx], idx++)
        for(int i=0; i<strs.size(); i++)
            if(idx >= strs[i].size() ||(i > 0 && strs[i][idx] != strs[i-1][idx]))
                return prefix;
    return prefix;
}
```