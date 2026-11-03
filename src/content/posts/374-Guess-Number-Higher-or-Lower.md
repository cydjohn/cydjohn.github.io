---
title: "374. Guess Number Higher or Lower"
date: 2018-01-14 17:12:47
tags: []
slug: "374-Guess-Number-Higher-or-Lower"
---
## 题目

We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I'll tell you whether the number is higher or lower.

You call a pre-defined API `guess(int num)` which returns 3 possible results (`-1`, `1`, or `0`):

> -1 : My number is lower
> 1 : My number is higher
> 0 : Congrats! You got it!
 
**Example:**

> n = 10, I pick 6.

> Return 6.




## 思路

实现一个二分搜索就好了。。


## 代码

```c++
int guessNumber(int n) {
    int start = 1, end = n, mid = (end-start)/2+start;
    int g = guess(mid);
    while(g!=0) {
        if(g==-1) {
            end = mid-1;
        }
        else {
            start = mid+1;
        }
        mid = (end-start)/2+start;
        g = guess(mid);
    }
    return mid;
    
}
```