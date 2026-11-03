---
title: "Openssl产生随机数"
date: 2015-10-27 13:27:48
tags: ["openssl"]
slug: "Openssl产生随机数"
---
**终端**

```powershell
openssl rand[-out file] [-randfile(s)] [-base64] [-hex] num
```
产生10位的随机数

```sh
rand 10
```


结果为`:M??;?????`，全是乱码

可以尝试

```sh
rand -hex 10
```
结果为`02aa218ecc084e5f263f`

或者

```sh
rand -base64 10
```
结果为`sNzstP2XbcJ9mw==`

来输出不同编码的随机数

或者通过

```sh
rand -out test -hex 10
```

来输出到`test`文件上

**C语言**

C语言有很多函数可以调用:


```c
int RAND_bytes(unsigned char *buf,int num);
```
根据加密算法生成随机数，其实也是一个伪随机数，但是，如果在调用此函数之前，设定好随机种子，那么生成的随机数是不能被预先计算出来的。
buf：输出，生产的随机数存储的数组；

num： 输入，生产的随机数个数；

返回值：1 ，成功， 0 失败；

-----

```c
void RAND_seed(const void *buf,int num);
```

随机数生成前设定种子；

buf： 输入， 种子保存的数组；

num： 输入，种子数据长度；

-----

```c
void RAND_add(const void *buf,int num,double entropy);
```
增加随机数生成的不可预知性，将buf数组中num个数据加入PRNG中，entropy是对buf中数据的随机性估计值，如果entropy 和num相等，那么RAND_add函数与Rand_seed函数相同；

buf中的数据，一般采用系统中随机性的事件，比如一些交互性数据，用户敲击的键盘值，鼠标滑过的位置等等。

---

```c
void RAND_screen(void);
```
RAND\_screen也是为Windows系统设计的函数，将当前屏幕数据加入到PRNG中，在windows系统中，对于应用开发者，最好采用RAND_event函数来收集硬件事件，增加PRNG的随机性，需要注意的是，这两个函数，不能在没有交互性的系统比如服务器中使用。

----
```c
const char *RAND_file_name(char *buf, size_t num);
```
在默认路径下，生成随机数种子文件，
buf： 保存文件名
num： 文件名字符数；
如果\$RANDFILE设定，文件名即为\$RANDFILE，如果没有设定，那么文件名是\$HOME/.rnd
如果\$HOME或者num的数字太小，不能容纳文件名，那么函数将返回错误。
返回值，如果成功，返回buf的地址，如果失败，NULL

-----
```c
int RAND_load_file(const char *filename, long max_bytes);
```

从随机数种子文件中读取数据，加入到PRNG中；
filename： 随机数种子文件；
max_bytes：可以读取的最大字节数；如果max_bytes 的值是-1，将读取整个文件；
返回值： 读取的数据个数；

---

```c
int RAND_write_file(const char *filename);
```

将随机数写入种子文件，当前是1024个字节，使用者后面可以调用RAND_load_file读取这些随机数；

返回值： 写入的字节数，如果失败，则写入-1；

---

```c
void RAND_cleanup(void);
```
清除PRNG的状态；

---
```c
int RAND_egd(const char *path);
```

向取随机数种子的Dameon程序EGD要求种子数据，数据长度为255个字节；
path： EGD的socket路径；
返回值：读取的数据字节数，如果失败，返回-1

----

```c
int RAND_egd_bytes(const char *path, int bytes)
```

向取随机数种子的Dameon程序EGD要求种子数据，数据长度为bytes定义的字节数；
path： EGD的socket路径；
bytes：请求的字节数；
返回值：读取的数据字节数，如果失败，返回-1

----

```c
int RAND_query_egd_bytes(const char *path, unsigned char *buf, int bytes);
```
向取随机数种子的Dameon程序EGD要求种子数据，数据长度为bytes定义的字节数，如果buf不是空，那么数据保存在buf定义的内存中，否则直接加到PRNG中；
path： EGD的socket路径；
bytes：请求的字节数；
返回值：读取的数据字节数，如果失败，返回-1

> 关于EGD：//tbc
> 系统中如果没有/dev/*random服务，可以通过edg Deamon服务来实现对随机数种子的获取，edg通过socket界面来通信，一次最多可以获取255个字节，一次连接可以获取多次数据；

### 示例

```c
#include <memory.h>
#include <stdio.h>
#include <stdlib.h>
#include <openssl/rand.h>
int main(int argc,char ** argv)
{
    unsigned char a[128];
    int r;
    r = RAND_bytes(a, 128);
    if(r){
            int i=0;
            for(i =0;i<128;i++)
            {
                printf("%d",a[i]);
            }
    }
}
```
