---
title: "206. Reverse Linked List"
date: 2018-07-08 12:04:38
tags: ["算法"]
slug: "206-Reverse-Linked-List"
---
# 206. Reverse Linked List


## 题目

Reverse a singly linked list.

**Example:**

> **Input:** 1->2->3->4->5->NULL    
> **Output:** 5->4->3->2->1->NULL
 
 
 
**Follow up:**

A linked list can be reversed either iteratively or recursively. Could you implement both?



## 思路

新建一个表头，通过循环依次反转链表指针方向就好。 `1->2->3->4->5->NULL` 变成 `NULL<-1<-2<-3<-4<-5`


## 代码

```c++
ListNode* reverseList(ListNode* head) {
    ListNode* result = NULL;
    while(head) {
        ListNode* cur = head->next;
        head->next = result;
        result = head;
        head = cur;
    }
    return result;
}
```


----

之前一直写错成这样是不对的，`cur`指向`head`的地址，改变了`cur->next`的值相当于改变了`head->next`的值，这样写结果只会返回链表第一个值：

```c++
//C++
ListNode* reverseList(ListNode* head) {
    ListNode* result = NULL;
    while(head) {
        ListNode* cur = head;
        cur->next = result;
        result = cur;
        head = head->next;
    }
    return result;
}
```




----


<https://leetcode.com/problems/reverse-linked-list/discuss/58130/8ms-C++-Iterative-and-Recursive-Solutions-with-Explanations>