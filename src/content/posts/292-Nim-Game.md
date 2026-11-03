---
title: "292. Nim Game"
date: 2018-04-18 17:44:46
tags: ["算法"]
slug: "292-Nim-Game"
---
## 题目

You are playing the following Nim Game with your friend: There is a heap of stones on the table, each time one of you take turns to remove 1 to 3 stones. The one who removes the last stone will be the winner. You will take the first turn to remove the stones.

Both of you are very clever and have optimal strategies for the game. Write a function to determine whether you can win the game given the number of stones in the heap.

For example, if there are 4 stones in the heap, then you will never win the game: no matter 1, 2, or 3 stones you remove, the last stone will always be removed by your friend.



## 思路

靠脑子想一下子没想出来（菜的抠脚）。

其实这题倒过来想，什么情况必输。那就是会后一轮剩下的石头总数等于4；那如何保证最后一轮剩下的石头数量等于4呢，就是倒数第二轮剩下的石头有8个……以此类推，得出的结论就是石头数量是4的倍数不可能赢。

于是判断石头数量是不是4的倍数就可以了。

## 代码

```c++
//C++
bool canWinNim(int n) {
    return n % 4;
}
```