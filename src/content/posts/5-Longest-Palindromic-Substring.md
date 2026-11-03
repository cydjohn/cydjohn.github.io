---
title: "5. Longest Palindromic Substring"
date: 2018-04-13 00:58:13
tags: ["算法"]
slug: "5-Longest-Palindromic-Substring"
---
## 题目

Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

**Example 1:**

> **Input:** "babad"    
> **Output:** "bab"  
> **Note:** "aba" is also a valid answer.

**Example 2:**

> **Input:** "cbbd"   
> **Output:** "bb"



## 思路

### 动态规划法

假设字符串长度为n，那么我们可以用一个大小为`dp[n][n]`的二维数组来代表字符串状态。其中，`dp[i][j]`代表`i~j`区间的字符是否为回文串。

* 当i=j时，只有一个字符，肯定是回文串；
* 当`i=j+1`时，说明是相邻字符，只用判断`s[i]`是否等于`s[j]`；
* 当字符不相邻，也就是`i-j>2`时，**判断`s[i]`是否等于`s[j]`以及`dp[i+1][j-1]`是否为回文串即可。**

通过上面的分析可以写出递推公式如下：

```js
dp[i, j] = 1   									//if i == j

dp[i, j] = s[i] == s[j] 						//if j = i + 1

dp[i, j] = s[i] == s[j] && dp[i + 1][j - 1]     //if j > i + 1  
```

例如，字符串`aabba`每一步dp的状态依次如下:

```js
// a
1 0 0 0 0 
0 0 0 0 0 
0 0 0 0 0 
0 0 0 0 0 
0 0 0 0 0 

// aa
1 1 0 0 0 
0 1 0 0 0 
0 0 0 0 0 
0 0 0 0 0 
0 0 0 0 0 

// aab
1 1 0 0 0 
0 1 0 0 0 
0 0 1 0 0 
0 0 0 0 0 
0 0 0 0 0 

// aabb
1 1 0 0 0 
0 1 0 0 0 
0 0 1 1 0 
0 0 0 1 0 
0 0 0 0 0 

// aabba
1 1 0 0 0 
0 1 0 0 1 
0 0 1 1 0 
0 0 0 1 0 
0 0 0 0 1 
```

### Manacher's Algorithm 马拉车算法

<http://www.cnblogs.com/grandyang/p/4475985.html>
<https://blog.csdn.net/dyx404514/article/details/42061017>

最逆天的地方在于他把时间复杂度提高到了线性`O(n)`。

## 代码

### 动态规划

```c++
//C++
string longestPalindrome(string s) {
    int dp[s.size()][s.size()] = {0};
    int left =0,right=0,len=0;
    for (int j = 0; j < s.size(); ++j) {
        for (int i = 0; i < j; ++i) {
            dp[i][j] = (s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]));
            if (dp[i][j] && len < j - i + 1) {
                len = j - i + 1;
                left = i;
                right = j;
            }
        }
        dp[j][j] = 1;
    }
    return s.substr(left,right-left+1);
}
```

### Manacher's Algorithm 马拉车算法

```c++
//C++
string Manacher(string s) {
    // Insert '#'
    string t = "$#";
    for (int i = 0; i < s.size(); ++i) {
        t += s[i];
        t += "#";
    }
    // Process t
    vector<int> p(t.size(), 0);
    int mx = 0, id = 0, resLen = 0, resCenter = 0;
    for (int i = 1; i < t.size(); ++i) {
        p[i] = mx > i ? min(p[2 * id - i], mx - i) : 1;
        while (t[i + p[i]] == t[i - p[i]]) ++p[i];
        if (mx < i + p[i]) {
            mx = i + p[i];
            id = i;
        }
        if (resLen < p[i]) {
            resLen = p[i];
            resCenter = i;
        }
    }
    return s.substr((resCenter - resLen) / 2, resLen - 1);
}
```