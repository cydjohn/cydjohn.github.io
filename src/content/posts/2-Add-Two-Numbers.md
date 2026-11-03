---
title: "2. Add Two Numbers"
date: 2018-01-18 23:11:09
tags: []
slug: "2-Add-Two-Numbers"
---
## 题目

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.


**Example**

> Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)   
> Output: 7 -> 0 -> 8   
> Explanation: 342 + 465 = 807.  



## 思路

一开始没看清题目还卡了一下，后来仔细一看他输入的数字是倒过来放的。于是用一个新链表把结果存起来就好了。

## 代码

```c++
C++ Solution
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode preHead(0), *p = &preHead;
    int temp = 0;
    while(l1||l2||temp) {
        int sum = (l1?l1->val:0) + (l2?l2->val:0) + temp;
        p->next = new ListNode(sum%10);
        temp = sum/10;
        p = p->next;
        l1 = l1?l1->next:l1;
        l2 = l2?l2->next:l2;
    }
    return preHead.next;
}
```



```java
//Java Solution
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode head = new ListNode(0);
    ListNode p = head;
    int temp=0;
    while(l1!=null || l2!=null || temp!=0) {
        int sum = (l1!=null?l1.val:0) + (l2!=null?l2.val:0)+temp;
        temp = sum/10;
        p.next = new ListNode(sum%10);
        p = p.next;
        l1=l1!=null?l1.next:l1;
        l2=l2!=null?l2.next:l2;
    }
    return head.next;
}
```