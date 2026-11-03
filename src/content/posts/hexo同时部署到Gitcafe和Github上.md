---
title: "hexo同时部署到Gitcafe和Github上"
date: 2015-11-02 11:06:12
tags: ["hexo"]
slug: "hexo同时部署到Gitcafe和Github上"
---
推荐一个可以同时部署到Gitcafe和Github上的hexo插件——[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)




##  安装方法

在hexo的目录下

~~~bash
npm install hexo-deployer-git --save
~~~

##  使用方法

**之前需要配置好Github和Gitcafe!!**

在`_config.yml`中，deploy部分改为

```yml
deploy:
  type: git
  message: Site updated
  repo: 
    github: git@github.com:cydjohn/cydjohn.github.io.git,master
    gitcafe: git@gitcafe.com:caoyudong/caoyudong.git,gitcafe-pages
```

然后就可以同时部署到两个地方了。


----
> dns可以修改一下，国外的指向Github，国内的Gitcafe，这样速度会很快

> 虽然并没有什么人看我博客……