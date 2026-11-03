---
title: "53. Maximum Subarray"
date: 2018-07-05 22:31:04
tags: ["算法"]
slug: "53-Maximum-Subarray-1"
---
## 题目

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.




## 思路

只用记录两个变量，一个局部最优`tempSum`，一个全局最优`maxSum`。当局部最优小于零的时候就不考虑之前的数字，直接归零，然后依次得出全局最优。



## 代码

只用记录两个变量，一个是区间的临时总和`tempSum`，一个是和的最大值`maxSum`，然后遍历一次数组。假设遍历到第`n`个数，此时`tempSum = tempSum + n`。但是如果n之前的tempSum的值已经小于0了，我们就不用考虑他，因为下一个值不管是正数还是负数，加上`tempSum`值会变得更小。

```c++
//C++
int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN, tempSum = 0;
    for(int n:nums) {
        tempSum = n + (tempSum>0?tempSum:0);
        maxSum = maxSum>tempSum?maxSum:tempSum;
    }
    return maxSum;
}
```

然后还在网上看到了动态规划法：

状态转移方程为：

```
maxSubArray(A, i) = maxSubArray(A, i - 1) > 0 ? maxSubArray(A, i - 1) : 0 + A[i]; 
```

```java
//Java
public int maxSubArray(int[] A) {
        int n = A.length;
        int[] dp = new int[n];//dp[i] means the maximum subarray ending with A[i];
        dp[0] = A[0];
        int max = dp[0];
        
        for(int i = 1; i < n; i++){
            dp[i] = A[i] + (dp[i - 1] > 0 ? dp[i - 1] : 0);
            max = Math.max(max, dp[i]);
        }
        
        return max;
}
```

-----

<https://leetcode.com/problems/maximum-subarray/discuss/20193/DP-solution-and-some-thoughts>