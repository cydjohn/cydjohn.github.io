---
title: "155. Min Stack"
date: 2018-01-13 00:19:51
tags: ["算法"]
slug: "155-Min-Stack"
---
## 题目
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

* push(x) -- Push element x onto stack.
* pop() -- Removes the element on top of the stack.
* top() -- Get the top element.
* getMin() -- Retrieve the minimum element in the stack.


Example:

> MinStack minStack = new MinStack();   
> minStack.push(-2);   
> minStack.push(0);   
> minStack.push(-3);   
> minStack.getMin();   --> Returns -3.   
> minStack.pop();   
> minStack.top();      --> Returns 0.   
> minStack.getMin();   --> Returns -2.



## 思路

题目要求在`O(1)`时间内实现，所以用一个Stack应该是不可能的，于是这题应该是用两个Stack，一个当做正常的Stack，一个专门用来储存最小值。

**不过后面看了Discuss，有人用一个栈就做出来了……**


## 代码

```c++
//C++ Solution
class MinStack {
    /** initialize your data structure here. */
private:
    stack<int> nor;
    stack<int> min;
public: 
    void push(int x) {
        if(min.empty()||x<=min.top()) {
            min.push(x);
        }
        nor.push(x);
    }
    
    void pop() {
        if(nor.top()==min.top()) {
            min.pop();
        }
        nor.pop();
    }
    
    int top() {
        return nor.top();
    }
    
    int getMin() {
        return min.top();
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */
```


```java
//Java Solution
class MinStack {

    /** initialize your data structure here. */
    Stack<Integer> nor = new Stack<>();
    Stack<Integer> min = new Stack<>();
    public MinStack() {
        
    }
    
    public void push(int x) {
        if(min.isEmpty()||x<=min.peek()) {
            min.push(x);
        }
        nor.push(x);
    }
    
    public void pop() {
        if(nor.peek() == min.peek()) { min.pop();}
        nor.pop();
    }
    
    public int top() {
        return nor.peek();
    }
    
    public int getMin() {
        return min.peek();
    }
}
```

------
### 一个栈的方法

```java
public class MinStack {
    long min;
    Stack<Long> stack;

    public MinStack(){
        stack=new Stack<>();
    }
    
    public void push(int x) {
        if (stack.isEmpty()){
            stack.push(0L);
            min=x;
        }else{
            stack.push(x-min);//Could be negative if min value needs to change
            if (x<min) min=x;
        }
    }

    public void pop() {
        if (stack.isEmpty()) return;
        
        long pop=stack.pop();
        
        if (pop<0)  min=min-pop;//If negative, increase the min value
        
    }

    public int top() {
        long top=stack.peek();
        if (top>0){
            return (int)(top+min);
        }else{
           return (int)(min);
        }
    }

    public int getMin() {
        return (int)min;
    }
}
```