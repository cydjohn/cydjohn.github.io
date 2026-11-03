---
title: "458. Poor Pigs"
date: 2018-04-16 20:23:41
tags: ["算法"]
slug: "458-Poor-Pigs"
---
## 题目

There are 1000 buckets, one and only one of them contains poison, the rest are filled with water. They all look the same. If a pig drinks that poison it will die within 15 minutes. What is the minimum amount of pigs you need to figure out which bucket contains the poison within one hour.

Answer this question, and write an algorithm for the follow-up general case.

**Follow-up:**

If there are n buckets and a pig drinking poison will die within m minutes, how many pigs (x) you need to figure out the "poison" bucket within p minutes? There is exact one bucket with poison.



<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

## 思路

看了别人一个特别吊的思路：<https://leetcode.com/problems/poor-pigs/discuss/94266/Another-explanation-and-solution>

假设我们有两只猪，喝了有毒的水之后15分钟死亡，一共有60分钟，那么我们最多可以在25个桶里找到有毒的那一桶。方法如下，将25个桶排列成`5X5`的一块：

```
1  2  3  4   5
6  7  8  9  10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25 
```

然后我们用第一只猪喝每一行的水，第二只猪喝每一列的水。比如，第一只猪喝`1,2,3,4,5`号桶的水，然后等15分钟，再喝`6,7,8,9,10` 号桶的水，然后再等15分钟；第二只猪喝`1,6,11,16,21`号桶的水，等15分钟再喝`2,7,12,17,22`号桶的水，以此类推。。。

我们一共有60分钟，毒药发作时间是15分钟，那么我们在规定时间内一共可以测4轮。假设第一只猪第三轮死了，我们可以确定有毒的那桶在第三行，第二只猪第四轮死了，我们就可以确定有毒那桶在第三行第四列，也就是19。

假设我们有三只猪，我们就可以用一个`5x5x5`的立方体来测，一共125桶水。

综上所诉我们可以的到公式

\\[
	buckets = (\frac{minutesToTest}{minutesToDie})^{pigs}
\\]


## 代码


```c++
//C++
int poorPigs(int buckets, int minutesToDie, int minutesToTest) {
    int pigs = 0;
    while(pow((minutesToTest/minutesToDie+1),pigs) < buckets) {
        pigs++;
    }
    return pigs;
}
```