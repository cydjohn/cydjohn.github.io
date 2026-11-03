---
title: "657. Judge Route Circle"
date: 2018-01-12 00:21:48
tags: ["算法"]
slug: "657-Judge-Route-Circle"
---
## 题目

Initially, there is a Robot at position (0, 0). Given a sequence of its moves, judge if this robot makes a circle, which means it moves back to the original place.

The move sequence is represented by a string. And each move is represent by a character. The valid robot moves are R (Right), L (Left), U (Up) and D (down). The output should be true or false representing whether the robot makes a circle.

**Example 1:**
> Input: "UD"   
> Output: true

**Example 2:**
> Input: "LL"   
> Output: false



## 思路
设置两个变量代表x,y轴坐标，然后对应操作就好。最后查看x，y是否还等于0。


## 代码

```c++
class Solution {
public:
    bool judgeCircle(string moves) {
        int x = 0,y=0;
        for(auto m:moves) {
            switch(m) {
                case 'L':x--;break;
                case 'R':x++;break;
                case 'U':y++;break;
                case 'D':y--;break;
            }
        }
        if(x == 0 && y == 0) {
            return true;
        }
        else {
            return false;
        }
    }
};
```