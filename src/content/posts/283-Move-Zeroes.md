---
title: "283. Move Zeroes"
date: 2016-12-15 18:24:14
tags: ["leetcode"]
slug: "283-Move-Zeroes"
---
## 原题

> Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

> For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].

> Note:

> *1. You must do this in-place without making a copy of the array.*  
> *2. Minimize the total number of operations.*



## 思路

直接把不是0的数往前移，然后把剩下的位置用零代替，这样只用遍历一遍数组。



## 代码

~~~C++
//C++
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int count =0;
        for(int i = 0;i<nums.size();i++) {
            if(!nums[i]==0){
                nums[count]=nums[i];
                count ++;
            }
        }
        while(count<nums.size()){
            nums[count] = 0;
            count ++;
        }
    }
};
~~~