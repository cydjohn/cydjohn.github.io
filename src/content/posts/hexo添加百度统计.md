---
title: "hexo添加百度统计"
date: 2015-09-16 22:16:29
tags: ["hexo"]
slug: "hexo添加百度统计"
---
## litten的主题yilia
* 编辑文件 `themes/yilia/_config.yml` ,添加一行配置，可以删除原来的google analytics

~~~
baidu_tongji: true
~~~



* 新建 `themes/yilia/layout/_partial/baidu_tongji.ejs` 内容如下

~~~javascript
<% if (theme.baidu_tongji) { %>
<script type="text/javascript">
#申请的百度统计代码
</script>
<% } %>
~~~

* 编辑`themes/yilia/layout/_partial/head.ejs` 在 `</head>` 前添加

~~~javascript
<%- partial("baidu_tongji") %>
~~~

* 重新生产部署站点即可。


## Light主题
* 编辑文件 `themes/light/_config.yml` ,添加一行配置，可以删除原来的google analytics

~~~
baidu_tongji: true
~~~

* 新建 `themes/light/layout/_partial/baidu_analytics.ejs` 内容如下

~~~javascript
<% if (theme.baidu_tongji) { %>
<script type="text/javascript">
#申请的百度统计代码
</script>
<% } %>
~~~

* 编辑`themes/light/layout/_partial/head.ejs` 在 `</head>` 前添加

~~~javascript
<%- partial("baidu_tongji") %>
~~~

* 重新生产部署站点即可。

>其他主题应该都一样吧～我猜的因为我也没试过……  
>不过前段时间出了那件事……Github不能访问……貌似跟这段js有点关系。具体我也不知道，反正我现在开始用腾讯统计了。

