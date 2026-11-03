---
title: "121. Best Time to Buy and Sell Stock"
date: 2018-02-06 16:54:08
tags: ["算法"]
slug: "121-Best-Time-to-Buy-and-Sell-Stock"
---
## 题目

Say you have an array for which the i^th element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.

**Example 1:**

```
Input: [7, 1, 5, 3, 6, 4]
Output: 5

max. difference = 6-1 = 5 (not 7-1 = 6, as selling price needs to be larger than buying price)
```

**Example 2:**

```
Input: [7, 6, 4, 3, 1]
Output: 0

In this case, no transaction is done, i.e. max profit = 0.
```



## 思路

遍历一遍数组，不断地更新最小值和利润的的值就好。


## 代码

```c++
int maxProfit(vector<int>& prices) {
    int profit = 0;
    int min = INT_MAX;
    for(int i:prices) {
        if(i<min) {
            min = i;
        }
        else if(i-min>profit){
            profit = i - min;
        }
    }
    return profit;
}
```