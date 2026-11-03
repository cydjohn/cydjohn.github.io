---
title: "20. Valid Parentheses"
date: 2018-01-12 17:41:25
tags: ["算法"]
slug: "20-Valid-Parentheses"
---
## 题目

Given a string containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

The brackets must close in the correct order, `"()"` and `"()[]{}"` are all valid but `"(]"` and `"([)]"` are not.



## 思路

用一个栈依次压入或者抛出相应的括号。


## 代码

```c++
//c++ Solution
class Solution {
public:
    bool isValid(string s) {
        stack<char> result;
        for(char a:s) {
            switch(a) {
                case '(':
                case '[':
                case '{':result.push(a);break;
                case ')':if(!result.empty()&&result.top()=='(') {result.pop();} else {return false;};break;
                case ']':if(!result.empty()&&result.top()=='[') {result.pop();} else {return false;};break;
                case '}':if(!result.empty()&&result.top()=='{') {result.pop();} else {return false;};break;
            }
        }
       return result.empty();
    }
};
```

```java
//Java Solution
class Solution {
    public boolean isValid(String s) {
        Stack<Character> result = new Stack<Character>();
        for(char a:s.toCharArray()) {
            switch(a) {
                case '(':
                case '[':
                case '{': result.push(a); break;
                case ')': if(!result.empty()&&result.pop()=='('){break;} else{return false;}
                case ']': if(!result.empty()&&result.pop()=='['){break;} else{return false;}
                case '}': if(!result.empty()&&result.pop()=='{'){break;} else{return false;}
            }
        }
        return result.empty();
    }
}
```


-----

### Java 和 C++ 的 Stack类 用法：


#### Java


|方法| 描述|
|----|-----|
|boolean empty()|测试堆栈是否为空|
|Object peek( )|查看堆栈顶部的对象，但不从堆栈中移除它|
|Object pop( )|移除堆栈顶部的对象，并作为此函数的值返回该对象|
|Object push(Object element)|把项压入堆栈顶部|
|int search(Object element)|返回对象在堆栈中的位置，以 1 为基数|




#### C++


|方法| 描述|
|----|-----|
|bool empty() | 堆栈为空则返回真|
|pop()| 移除栈顶元素|
|push()| 在栈顶增加元素|
|size() |返回栈中元素数目|
|top() |返回栈顶元素|
















