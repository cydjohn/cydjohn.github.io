---
title: "66. Plus One"
date: 2018-01-12 22:23:38
tags: ["算法"]
slug: "66-Plus-One"
---
## 题目

Given a non-negative integer represented as a non-empty array of digits, plus one to the integer.

You may assume the integer do not contain any leading zero, except the number 0 itself.

The digits are stored such that the most significant digit is at the head of the list.



## 思路

弄个临时变量记进位，从第`n-1`位按照加法开始依次加就好了。

## 代码

```c++
//C++ Solution
vector<int> plusOne(vector<int>& digits) {
        int flag = 1;
        for(int i = digits.size()-1;i>=0;i--) {
            int temp = digits[i] + flag;
            if(temp<10) {
                digits[i] = temp;
                flag = 0;
                break;
            }
            else {
                digits[i] = temp%10;
                flag = 1;
            }
        }
        if(flag == 1) {
            digits.insert(digits.begin(),1);
        }
        return digits;
    }
```

然后Discuss看到了个比较吊的

```c++
//C++ Solution
void plusone(vector<int> &digits)
{
	int n = digits.size();
	for (int i = n - 1; i >= 0; --i)
	{
		if (digits[i] == 9)
		{
			digits[i] = 0;
		}
		else
		{
			digits[i]++;
			return;
		}
	}
		digits[0] =1;
		digits.push_back(0);
		
}
```

