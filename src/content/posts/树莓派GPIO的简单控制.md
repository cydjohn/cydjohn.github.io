---
title: "树莓派GPIO的简单控制"
date: 2015-10-18 22:15:44
tags: ["树莓派"]
slug: "树莓派GPIO的简单控制"
---
General Purpose Input Output （通用输入/输出）简称为GPIO，或总线扩展器。也就是树莓派上那一堆引脚。



## GPIO库

1. wiringPi C,有Perl,PHP,Ruby,Node.js和Golang的扩展，支持wiringPi Pin 和BCM GPIO两种编号
2. RPi.GPIO Python, 支持Board Pin和BCM GPIO两种编号
3. Webiopi，Python，使用BCM GPIO编号
4. BCM2835, 使用BCM GPIO编号
5. WiringPi－GO，GO语言，支持以上三种编号

### 具体情况如下图：

Board Pin 编号为板上的自然编号，左边引脚为1、3、5……39；右边引脚为2、4、6……40。`RPi.GPIO.setmode(GPIO.BOARD)`采用这列编号

BCM GPIO为树莓派主芯片提供商Broadcom的编号方法，相当于调用了`WiringPiSetupGpio()`或`RPi.GPIO.setmode(GPIO.BCM)`采用这列编号

![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-18/44779713.jpg)




### Python

安装：

新的系统（2015/11月的）好像自带了

```bash
sudo apt-get install python-dev
```

安装python pip


```bash
sudo apt-get install python-pip
```

安装python的GPIO库

```bash
sudo apt-get install rpi.gpio
```
代码示例

~~~python
#python
import RPi.GPIO as GPIO
import time

a = 21
GPIO.setmode(GPIO.BCM) 
GPIO.setup(a,GPIO.OUT)

while True:
    GPIO.output(a,GPIO.HIGH)
    time.sleep(1)
    GPIO.output(a,GPIO.LOW)
    time.sleep(1)
GPIO.cleanup()
~~~

### C

**wiringPi库**

安装：

~~~sh
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build
~~~

测试有没有安装好

~~~sh
$gpio -v
$gpio readall
~~~


~~~c
//c

#include <wiringPi.h>

// LED Pin - wiringPi pin 0 is BCM_GPIO 17.

#define LED     21

int main ()
{

  wiringPiSetup () ;
  pinMode (LED, OUTPUT) ;

  for (;;)
  {
    digitalWrite (LED, HIGH) ;  // On
    delay (500) ;               // mS
    digitalWrite (LED, LOW) ;   // Off
    delay (500) ;
  }
  return 0 ;
}
~~~

> 编译需要用  `gcc -Wall -o test test.c -lwiringPi`  
> 然后 `sudo ./test`


**BCM2835库**

安装

1. 下载:  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `$ wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.35.tar.gz`
2. 解压缩:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   `$tar xvzf bcm2835-1.35.tar.gz`
3. 进入压缩之后的目录: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`$cd bcm2835-1.35`
4. 配置:    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;          `$./configure`
5. 从源代码生成安装包: &nbsp;&nbsp;&nbsp;&nbsp; `$make`
6. 执行检查:    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;       `$sudo make check`
7. 安装 bcm2835库:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  `$sudo make install`


```c
//c
 #include <bcm2835.h>

 // P1插座第11脚
 #define PIN RPI_GPIO_P1_11

 int main(int argc, char **argv)
 {
   if (!bcm2835_init())
   return 1;

   // 输出方式
   bcm2835_gpio_fsel(PIN, BCM2835_GPIO_FSEL_OUTP);

   while (1)
   {
     bcm2835_gpio_write(PIN, HIGH);
     bcm2835_delay(100);

     bcm2835_gpio_write(PIN, LOW);
     bcm2835_delay(100);
   }
   bcm2835_close();
   return 0;
 }
```

------
![](http://7xkfbb.com1.z0.glb.clouddn.com/15-10-18/93321296.jpg)
