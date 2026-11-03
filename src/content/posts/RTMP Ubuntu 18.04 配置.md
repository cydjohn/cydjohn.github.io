---
title: "RTMP Ubuntu 18.04 配置"
date: 2018-12-02 02:20:10
tags: ["网络"]
slug: "RTMP-Ubuntu-18-04-配置"
---
> Digital Ocean Ubuntu 18.04 x64



## 安装 Nginx 和 Nginx-RTMP

首先下载依赖

```bash
sudo apt-get install build-essential libpcre3 libpcre3-dev libssl-dev
```

创建一个工作目录（可以起别的名字

```bash
mkdir ~/working
cd ~/working
```

下载`Nginx`和`Nginx-RTMP`源码

```bash
wget  http://nginx.org/download/nginx-1.15.7.tar.gz
wget https://github.com/arut/nginx-rtmp-module/archive/master.zip
```

安装一个解压工具

```bash
sudo apt-get install unzip
```

解压

```bash
tar -zxvf  nginx-1.15.7
unzip master.zip
```

进入`nginx`目录

```bash
cd  nginx-1.15.7
```

添加编译的配置，把 `nginx-rtmp`模块加到里面（后面的`--without-http_gzip_module`应该可以不加，但是如果在`digital ocean`上不添加会报错

```bash
./configure --with-http_ssl_module --add-module=../nginx-rtmp-module-master --without-http_gzip_module
```

编译`nginx`和`nginx-rtmp`模块

```bash
make
sudo make install
```

安装nginx初始化脚本

``` bash
sudo wget https://raw.github.com/JasonGiedymin/nginx-init-ubuntu/master/nginx -O /etc/init.d/nginx
sudo chmod +x /etc/init.d/nginx
sudo update-rc.d nginx defaults
```

测试nginx（运行了sudo service nginx start看能否访问那个服务器

```bash
sudo service nginx start
sudo service nginx stop
```

## 安装 FFmpeg

添加 FFmpeg PPA（Personal Package Archives）.

```bash
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:kirillshkrogalev/ffmpeg-next
Update the package lists.
sudo apt-get update
```

安装 FFmpeg.

```bash
sudo apt-get install ffmpeg
```

## 修改 `Nginx-RTMP` 和 `FFmpeg` 配置文件

打开`Nginx`配置文件（这里vi或者vim都可以

```bash
sudo nano /usr/local/nginx/conf/nginx.conf
```

在末尾复制粘贴以下信息

```json
rtmp {
    server {
            listen 1935;
            chunk_size 4096;

            application live {
                    live on;
                    record off;
                    exec ffmpeg -i rtmp://localhost/live/$name -threads 1 -c:v libx264 -profile:v baseline -b:v 350K -s 640x360 -f flv -c:a aac -ac 1 -strict -2 -b:a 56k rtmp://localhost/live360p/$name;
            }
            application live360p {
                    live on;
                    record off;
        }
    }
}
```

最后	

```bash
sudo service nginx restart
```

这时候就配置好了。

iOS同学可以用 https://github.com/LaiFengiOS/LFLiveKit 来测试，如果配置成功可直接连上。

> 需要修改`LFLivePreview.m`的第364行：@"rtmp://<服务器IP>:1935/live/test"， test 那里可以随意取名字.      
> 
> `rtmp://138.68.7.200:1935/live/test` 这是我自己配置的服务器，我已经确定可以使用了


> 参考自 https://www.vultr.com/docs/setup-nginx-rtmp-on-ubuntu-14-04