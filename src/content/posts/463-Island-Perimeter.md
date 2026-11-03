---
title: "463. Island Perimeter"
date: 2018-01-13 18:29:11
tags: ["算法"]
slug: "463-Island-Perimeter"
---
## 题目

You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water. Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells). The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

Example:

> [[0,1,0,0],
> [1,1,1,0],
> [0,1,0,0],
> [1,1,0,0]]

> Answer: 16
> Explanation: The perimeter is the 16 yellow stripes in the image > below:
> 
> ![](http://7xkfbb.com1.z0.glb.clouddn.com/18-1-14/20996627.jpg)




## 思路

给定一个二维数组，其中1表示岛屿，0表示水，求岛的周长。 一种解法是遍历一遍，如果遇到岛屿(1)看周围是不是水(0)，如果是的话周长++。  

然后还有一种比较巧的解法是记录岛屿的数量和每个岛屿下方以及右方岛屿的数量（邻居数）。这样周长就可以由一个公式得到：

\\[
    周长=4\times岛屿数-2\times邻居数
\\]


## 代码

```c++
//C++ Solution
int islandPerimeter(vector<vector<int>>& grid) {
    int islands = 0, neighbors = 0;
    for(int i=0;i<grid.size();i++) {
        for(int j = 0;j<grid[0].size();j++) {
            if(grid[i][j] == 1) {
                islands++;
                if(i<grid.size()-1&&grid[i+1][j]==1) {
                    neighbors ++;
                }
                if(j<grid[0].size()-1&&grid[i][j+1]==1) {
                    neighbors ++;
                }
            }
        }
    }
    return islands*4-neighbors*2;
}
```


```java
//Java Solution
public int islandPerimeter(int[][] grid) {
    int islands=0, neighbors = 0;
    for(int i = 0;i<grid.length;i++) {
        for(int j=0;j<grid[0].length;j++) {
            if(grid[i][j]==1) {
                islands++;
                if(i<grid.length-1&&grid[i+1][j]==1) {
                neighbors ++;
            }
            if(j<grid[0].length-1&&grid[i][j+1]==1) {
                neighbors ++;
            }
            }
        }
    }
    return islands*4-neighbors*2;
}
```