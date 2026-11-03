---
title: "35. Search Insert Position"
date: 2016-11-27 00:14:50
tags: ["leetcode"]
slug: "35-Search-Insert-Position"
---
## 题目

> Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

> You may assume no duplicates in the array.

> Here are few examples.
> [1,3,5,6], 5 → 2
> [1,3,5,6], 2 → 1
> [1,3,5,6], 7 → 4
> [1,3,5,6], 0 → 0



## 思路

这个应该算easy吧……不是很懂难度划分

找到大于等于`target`的数字返回下标就好。

## 代码

### 暴力……

```C++
//C++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        for(int i=0;i<nums.size();i++){
            if(nums[i]>=target){
                return i;
            }
            else if(i==nums.size()-1){
                return i+1;
            }
        }
        return 0;
    }
};
```

### 二分法：

```C++
//C++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size()-1;
        while(left<=right){
            int mid = left + (right-left)/2;
            if(nums[mid]==target){
                return mid;
            }
            else if(nums[mid]<target){
                left = mid + 1;
                
            }
            else {
                right = mid - 1;
                
            }
        }
        return right + 1;
    }
};
```




