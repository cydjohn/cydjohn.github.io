---
title: "1. Two Sum"
date: 2016-12-15 18:49:03
tags: ["算法"]
slug: "1-Two-Sum"
---
## 原题

> Given an array of integers, return indices of the two numbers such that they add up to a specific target.

> You may assume that each input would have exactly one solution.

> Example:
> *Given nums = [2, 7, 11, 15], target = 9,*

> *Because nums[0] + nums[1] = 2 + 7 = 9,* 
> *return [0, 1].*

> UPDATE (2016/2/13):  
> The return format had been changed to zero-based indices.   
> Please read the above updated description carefully.  



## 思路

用一个map，存入`target-nums[i]`的值和当前下标，也就是与当前元素配对的值和下标。如果遇到map里面已经有的值就返回map里的下标和当前下标就好～

## 代码

```C++
//C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        vector<int> result;

        for (int i = 0; i < nums.size(); i++) {
            if (map.find(nums[i]) != map.end()) {
                result.push_back(map[nums[i]]);
                result.push_back(i);
                return result;
            }
            map[target - nums[i]] = i;
        }

        return result;
    }
};
```