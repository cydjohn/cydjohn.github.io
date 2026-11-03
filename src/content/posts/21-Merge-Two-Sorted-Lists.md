---
title: "21. Merge Two Sorted Lists"
date: 2018-04-12 23:31:05
tags: ["算法"]
slug: "21-Merge-Two-Sorted-Lists"
---
## 题目

Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

> Input: 1->2->4, 1->3->4  
> Output: 1->1->2->3->4->4




## 思路

因为链表是有序的所以依次比较两个链表每个值大小添加到新的链表了就好了。就是归并排序。

## 代码

```c++
//C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode head(-1);
    ListNode *tail = &head;

    while(l1 && l2) {
        if(l1->val<l2->val) {
            tail->next = l1;
            l1=l1->next;
        }
        else {
            tail->next = l2;
            l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1?l1:l2;
    return head.next;
}

//递归法

ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    if(!l1) {return l2;}
    if(!l2) {return l1;}
    
    if(l1->val>l2->val) {
        ListNode* temp =l2;
        temp->next = mergeTwoLists(l1,l2->next);
        return temp;
    }
    else {
        ListNode* temp =l1;
        temp->next = mergeTwoLists(l1->next,l2);
        return temp;
    }
}
```