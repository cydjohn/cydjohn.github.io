---
title: "C++，python运行速度比较程序"
date: 2020-08-12 00:18:58
tags: ["python"]
slug: "如何证明C-运行速度比python快"
---
给别人上课的时候突然有了这个问题。 其实所有人都知道C++运行速度要比Python快许多倍，网上也有很多文章做了解释，但是如果面对一个小白最好的办法就是跑一个功能相同的程序给他看时间对比。然后我就想了个证明方法，感觉还挺直观的，这里记录下。方法就是用两种语言分别写两个冒泡排序，然后从文件中读取随机数，排序之后比较程序运行时间。选择用冒泡排序是因为O（n^2)复杂度，可以拉长程序运行时间，结果比较更直观， 快排结果不太理想，两个程序运行时间差距不大。





## 生成随机数

这里只生成了三万个随机数，因为在我电脑上测试之后发现如果随机数比这多会导致python程序运行时间过长，有点浪费时间。

```python
import random
a = []
numbers = 30000
f = open("randomNumber.txt", "a")
for i in range(numbers):
    a.append(random.uniform(0, 1)*numbers)
    f.write(str(a[-1])+",")
f.close()
```

## 冒泡排序

```c++
#include <iostream>
#include <fstream>
#include <vector>
#include <sstream>
using namespace std;

void bubbleSort(vector<int>& a)
{
      bool swapp = true;
      while(swapp){
        swapp = false;
        for (size_t i = 0; i < a.size()-1; i++) {
            if (a[i]>a[i+1] ){
                a[i] += a[i+1];
                a[i+1] = a[i] - a[i+1];
                a[i] -=a[i+1];
                swapp = true;
            }
        }
    }
}

int main()
{
    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();

    ifstream in("randomNumber.txt", ifstream::in);
    vector<int> lstNumbers;
    while ((!in.eof()) && in)
    {
        string row;
        in >> row;
        replace(row.begin(), row.end(), ',', ' '); 
        stringstream ss(row);
        double temp;
        while (ss >> temp)
        {
            lstNumbers.push_back(temp);
        }
            
    }
    in.close();
    cout<<lstNumbers.size()<<endl;
    bubbleSort(lstNumbers);
    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
    std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::milliseconds>(end - begin).count() / 1000.0 << "[s]" << std::endl;
}
```

```python
import time
def main():
    randomNumberFile = open('randomNumber.txt', 'r').readlines()
    numbers = randomNumberFile[0].split(",")
    bubbleSort(numbers)

def bubbleSort(arr): 
    n = len(arr) 
    # Traverse through all array elements 
    for i in range(n-1): 
    # range(n) also work but outer loop will repeat one time more than needed. 
        # Last i elements are already in place 
        for j in range(0, n-i-1): 
            # traverse the array from 0 to n-i-1 
            # Swap if the element found is greater 
            # than the next element 
            if arr[j] > arr[j+1] : 
                arr[j], arr[j+1] = arr[j+1], arr[j] 

start_time = time.time()
main()
print("--- %s seconds ---" % (time.time() - start_time))
```

## 结果

C++程序使用`make`编译完直接运行二进制文件一般要9～10秒钟，python程序一般需要 50 秒，快了将近五倍，可以在短时间内看出差距。

