---
title: "pip和easy_install"
date: 2016-09-28 19:59:46
tags: ["Mac"]
slug: "pip和easy-install"
---
# pip和easy_install


有句话这么说的：

> Don't use easy_install, unless you like stabbing yourself in the face. Use pip.




*easy_install*诞生于2004年，用于安装PyPI上的各种程序包以及它们的依赖，是一种自动化的包管理工具。

*pip*诞生于2008年，是*easy_install*的升级版。 具体区别如下：

|  | pip |  easy_install | 
|---|:---:|:---:|
|Installs from Wheels|Yes|No|
|Uninstall Packages	|Yes (pip uninstall)|No|
|Dependency Overrides	|Yes (Requirements Files) |No|
|List Installed Packages|	Yes (pip list and pip freeze) |No|
|PEP 438 Support	|Yes	|No
|Installation format	|‘Flat’ packages with egg-info metadata.|	Encapsulated Egg format|
|sys.path modification	|No	|Yes|
|Installs from Eggs|	No	|Yes|
|pylauncher support|	No	|Yes|
|Multi-version Installs	|No	|Yes|
|Exclude scripts during install|	No	|Yes|

总之，就是把几乎把easy_install的功能都包含进去了，还附加了许多新功能，尤其是`uninstall` 卸载功能以及安装失败不会对你的系统环境不会有什么影响。


[1] http://stackoverflow.com/questions/3220404/why-use-pip-over-easy-install   

[2] https://packaging.python.org/pip_easy_install/


------

当然，也不是一定只能用pip，今天就有个很蛋疼的事。为了做Machine Learning的作业，我需要安装`pydot`等包。使用pip之后包被成功安装在`/Library/Python/2.7/site-packages`文件夹下，但是程序报错说`ImportError: No module named pydot`。然后我先后尝试了：

1. 把`/Library/Python/2.7/site-packages`路径加入 `~/.bash_profile`
2. `python -m pip install pydot`
3. 删除`pydot`然后冲洗安装
4. 重新安装python
5. 升级`pip`

……

等操作，都没有什么卵用，于是我打算重装系统了。

后来，在最绝望的时候，某个一直为情所困的女同志发消息说她好了，因为课业太重了，没功夫纠结。我就突然想到貌似可以用个东西代替`pip`，也就是`easy_install`。然后试了下，`easy_install`刚好也是把`pydot`装在`/Library/Python/2.7/site-packages/`目录下，然而程序可以运行了…… 真是神奇的不行


