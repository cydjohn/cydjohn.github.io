---
title: "Ubuntu16.04上使用Nginx部署Laravel应用程序"
date: 2019-05-21 01:16:40
tags: ["laravel", "nginx"]
slug: "Ubuntu16-04上使用Nginx部署Laravel应用程序"
---
Laravel 是一个非常流行的PHP框架，以编码风格优雅著称，每行代码都非常简洁，富有表达力，并且拥有强大的组件开发生态，号称为web艺术家创造的PHP框架。我最近的个人项目尝试了下Laravel框架，部署的的时候遇到了一些坑，这里记录下。

我用的服务器是DigitalOcean的Ubuntu 16.04 LTS，其他公司的服务器应该也大同小异，有一些公司甚至简化了安装流程，几乎不用改动配置文件就可以让自己的程序跑起来（比如阿里云



## 安装依赖

### 更新apt-get

```bash
sudo apt-get update
```

### 安装 php7.0

```bash
sudo apt-get install php7.0-mbstring php7.0-fpm php7.0-xml composer unzip
```

## 配置MySql

### 安装

```bash

sudo apt-get install mysql-server
```


安装期间会提示你设置新的密码，一定要记住了。

### 配置

登录MySQL root 账号：

```bash
mysql -u root -p
```

然后创建一个名为 laravel 的数据库，数据库可以是别的名字：


```sql
CREATE DATABASE laravel DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```

然后再创建一个允许访问这个数据库的用户，这里使用 laraveluser 作为用户名

```sql
GRANT ALL ON laravel.* TO 'laraveluser'@'localhost' IDENTIFIED BY 'password';
```

刷新权限

```sql
FLUSH PRIVILEGES;
```

退出

```sql
EXIT;
```

### 安装 pdo_mysql

pdo_mysql 是php需要用到的mysql的驱动

```bash
sudo apt-get install php7.0-mysql
```


## 安装nginx


### 安装 

```bash
sudo apt install nginx
```

## 安装 laravel

这里使用laravel 发布在GitHub 上的演示程序 QuickStart 来作为例子。

先在nginx目录下创建一个叫quickstart的文件夹

```bash
sudo mkdir -p /var/www/html/quickstart
```

然后到新目录将项目git clone 下来

```bash
cd /var/www/html/quickstart
git clone https://github.com/laravel/quickstart-basic .
```

> 注意 git clone 最后有个点

然后安装laravel的依赖

```bash
composer install
```

## 配置 .env

```bash
vim .env
```

修改数据库字段：

```
APP_ENV=local
APP_DEBUG=true
APP_KEY=b809vCwvtawRbsG0BmP1tWgnlXQfdsaw
APP_URL=http://localhost

DB_HOST=127.0.0.1
DB_DATABASE=laravel
DB_USERNAME=laraveluser
DB_PASSWORD=password
```

保存，退出

迁移数据库

```bash
php artisan migrate
```

## 配置 Nginx

将storage和bootstrap/cache目录的组所有权更改为www-data， 因为服务器需要向这两个文件夹里面写东西

```bash
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

修改配置文件

```bash
vim /etc/nginx/sites-enabled/default
```

```json
server {
        listen 80;
        listen [::]:80;
        root /var/www/html/quickstart/public;

        # Add index.php to the list if you are using PHP
        index index.php index.html index.nginx-debian.html;

        server_name _;
                location / {
                
                try_files $uri $uri/ /index.php?$query_string;
        }
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        location ~ \.php$ {
                include snippets/fastcgi-php.conf;
        #
        #       # With php7.0-cgi alone:
        #       fastcgi_pass 127.0.0.1:9000;
        #       # With php7.0-fpm:
                fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        }
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        location ~ /\.ht {
                deny all;
        }
}
```
然后

```bash
sudo systemctl reload nginx
```

现在访问服务器IP地址就可以浏览网页了。

------

## 我遇到过的报错

### Operation timed out (IPv6 issues)

*You may run into errors if IPv6 is not configured correctly. A common error is:
The "https://getcomposer.org/version" file could not be downloaded: failed to
open stream: Operation timed out*

```bash
sudo sh -c "echo 'precedence ::ffff:0:0/96 100' >> /etc/gai.conf"
```

### No application encryption key has been specified.

```bash
php artisan key:generate
```

### Laravel 5.4: Specified key was too long error
  
  *1   PDOException::("SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 767 bytes")
      /home/pi/Desktop/kxcrmserver/vendor/laravel/framework/src/Illuminate/Database/Connection.php:458
  2   PDOStatement::execute()
      /home/pi/Desktop/kxcrmserver/vendor/laravel/framework/src/Illuminate/Database/Connection.php:458*

```php
use Illuminate\Support\Facades\Schema; 

public function boot() { 
	Schema::defaultStringLength(191); 
}

```

> nginx 的错误日志在这个位置：`/var/log/nginx/error.log`，大部分问题都需要查看日志然后单独解决。
      
      

