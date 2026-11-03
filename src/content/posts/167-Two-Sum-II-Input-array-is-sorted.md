---
title: "167. Two Sum II - Input array is sorted"
date: 2018-04-23 23:50:01
tags: ["算法"]
slug: "167-Two-Sum-II-Input-array-is-sorted"
---
## 题目

Given an array of integers that is already ***sorted in ascending order***, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.

You may assume that each input would have exactly one solution and you may not use the same element twice.

**Input:** numbers={2, 7, 11, 15}, target=9
**Output:** index1=1, index2=2




## 思路

跟`Two Sum`类似，不过这是排好序的，就只用用两个指针，一个指向数组头部，一个指向尾部，然后依次扫描就可以了。

## 代码


```c++
//C++
vector<int> twoSum(vector<int>& numbers, int target) {
    int l = 0, h = numbers.size()-1;
    vector<int> result;
    while(l<h) {
        if(numbers[l]+numbers[h]==target) {
            result.push_back(l+1);
            result.push_back(h+1);
            break;
        }
        else if(numbers[l]+numbers[h]>target) {
            h--;
        }
        else {
            l++;
        }
    }
    return result;
}
```