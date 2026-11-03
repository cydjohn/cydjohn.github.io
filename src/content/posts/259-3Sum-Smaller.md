---
title: "259. 3Sum Smaller"
date: 2018-07-17 16:38:10
tags: ["算法"]
slug: "259-3Sum-Smaller"
---
## 题目

Given an array of n integers nums and a target, find the number of index triplets `i, j, k` with `0 <= i < j < k < n `that satisfy the condition `nums[i] + nums[j] + nums[k] < target`.

**Example:**

> **Input:** nums = [-2,0,1,3], and target = 2
> **Output:** 2 
> **Explanation:** Because there are two triplets which sums  are less than 2:   
>             [-2,0,1]   
>             [-2,0,3]



## 思路

跟 3Sum 类似，但是这题只用求count个数。所以当second 和 third满足条件时，`[second,third]`这个区间都满足条件，于是 计算`count += third - second`就可以了。

## 代码

```c++
//C++
int threeSumSmaller(vector<int>& nums, int target) {
    if(nums.size()<3) return 0;
    int count = 0;
    sort(nums.begin(),nums.end());
    for(int first = 0;first<nums.size()-2;first++) {
        int second = first + 1;
        int third = nums.size()-1;
        while(second<third) {
            if(nums[first] + nums[second] + nums[third]<target) {
                count += third - second;
                second ++;
            }
            else {
                third --;
            }

        }
    }
    return count;
}
```
