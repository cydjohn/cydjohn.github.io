---
title: "TypeError:undefined is not an object (evaluating context._currentValue = currentValue)"
date: 2018-09-21 23:21:11
tags: ["React-Native"]
slug: "TypeError-undefined-is-not-an-object-evaluating-context-currentValue-currentValue"
---
## 修复 `TypeError: undefined is not an object (evaluating 'context._currentValue = currentValue')`的报错


把`package.js`里面`react` 和 `react-native` 改成以下版本：

> "react": "16.3.1"   
> "react-native": "^0.57.0"

**之前是："react": "16.3.0-rc.0"**