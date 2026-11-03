---
title: "16. 3Sum Closest"
date: 2018-07-17 15:18:52
tags: ["算法"]
slug: "16-3Sum-Closest"
---
## 题目

Given an array `nums` of n integers and an integer `target`, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

Example:

Given array nums = [-1, 2, 1, -4], and target = 1.

The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).



## 思路

跟[15. 3Sum](http://caoyudong.com/2018/01/23/15-3Sum/)差不多，把数组排序之后依次比较当前得数和剩下两个数之和。

唯一的不同就是单独声明一个变量来记录最接近的那个值。


## 代码

```c++
int threeSumClosest(vector<int>& nums, int target) {
    if(nums.size()<3) return 0;
    sort(nums.begin(),nums.end());
    int result = nums[0] + nums[1] + nums[2];
    for(int first = 0;first < nums.size()-1;first ++) {
        if(first > 0 && nums[first] == nums[first-1]) continue;
        int second = first + 1;
        int third = nums.size() - 1;
        while(second < third) {
            int curSum = nums[first] + nums[second] + nums[third];
            if(abs(target - result)>abs(target - curSum)) {
                result = curSum;
            }
            if(curSum == target) {
                return target;
            }
            else if(curSum > target) {
                --third;
            }
            else {
                ++second;
            }
        }
    }
    return result;
}
```