---
title: "53.Maximum Subarray"
date: 2016-11-29 13:21:30
tags: ["leetcode"]
slug: "53-Maximum-Subarray"
---
## 原题

> Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

> For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
the contiguous subarray [4,-1,2,1] has the largest sum = 6.

> More practice:  
> If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

## 思路
非常典型的DP问题。

子数组只会有两种操作：

1. 如果总和比之前大就不停的添加新成员
2. 如果总和比之前一次变小了就清空成员重新计数


于是只用记住历史最大值和数组总和最大值就好

## 代码

```C++
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxValue = INT_MIN;
        int tempMax = 0;
        for(int x:nums){
            tempMax = max(tempMax + x,x);
            maxValue = max(maxValue,tempMax);
        }
        return maxValue;
    }
    
};
```

