---
title: "如何用C#写一个加法计算器（二）"
date: 2015-08-02 12:07:22
tags: ["C#"]
slug: "如何用C＃写一个加法计算器（二）"
---
>我用的是VS2013，windows7，苹果虚拟机。

[**如何用C#写一个加法计算器（一）**](http://caoyudong.com/2015/08/02/%E5%A6%82%E4%BD%95%E7%94%A8C%EF%BC%83%E5%86%99%E4%B8%80%E4%B8%AA%E5%8A%A0%E6%B3%95%E8%AE%A1%E7%AE%97%E5%99%A8%EF%BC%88%E4%B8%80%EF%BC%89/)



## 代码

现在来讲下代码部分怎么写，双击数字 **1** 那个button，程序会自动跳转到另一个界面，并且帮你创建好了一个函数，这个函数是点击 button1时的监听事件，就是处理当你点了button1之后你希望程序做什么事情代码都可以写在这里。现在我们往里面加一行 `textBox1.Text += "1";`:

~~~csharp
//C#
private void button1_Click(object sender, EventArgs e)
        {
            textBox1.Text += "1";
        }
~~~

意思是点击1之后，textBox1的值会从右边多个1（我也说不清楚，自己运行体会下，语文差别怪我）。textBox1是刚刚拖到窗口上的那个textBox，由于我直接用了VS自动帮我取的名字所以这个控件叫做textBox1。补充说一句，所有控件在这里面都相当于是全局变量，在Form1.cs里面随便用的。

然后同理，把剩下的2～0的button的监听函数都改一遍。比如2就是`textBox1.Text += "2";`，3就是`textBox1.Text += "3";`。

~~~csharp
//C#

        private void button2_Click(object sender, EventArgs e)
        {
            textBox1.Text += "2";
        }

        private void button3_Click(object sender, EventArgs e)
        {
            textBox1.Text += "3";
        }

        private void button6_Click(object sender, EventArgs e)
        {
            textBox1.Text += "4";
        }

        private void button5_Click(object sender, EventArgs e)
        {
            textBox1.Text += "5";
        }

        private void button4_Click(object sender, EventArgs e)
        {
            textBox1.Text += "6";
        }

        private void button9_Click(object sender, EventArgs e)
        {
            textBox1.Text += "7";
        }

        private void button8_Click(object sender, EventArgs e)
        {
            textBox1.Text += "8";
        }

        private void button7_Click(object sender, EventArgs e)
        {
            textBox1.Text += "9";
        }

        private void button13_Click(object sender, EventArgs e)
        {
            textBox1.Text += "0";
        }
~~~

这里需要注意下，由于拖动控件的顺序不同，button的编号不一定代表button对应数值，如果强迫症的童鞋可以在属性那里改一下。还要说的是，应该有办法写一个监听函数，然后直接获取button上的值就可以知道用户点击哪个button了，但是我不知道那个方法，因为我
>其实不会C#
有谁知道可以告诉下我。

然后现在因为计算需要，需要声明两个变量来储存用户输入的第一个值和第二个值以及想进行什么运算。所以在类开头声明这三个东西：`firstNumber` `secondNumber` `operation`,分别代表输入的第一个数字，第二个数字，和操作符。

~~~csharp
//C#
    public partial class Form1 : Form
    {
        String firstNumber;
        String secondNumber;
        String operation;
        
        ……
        ……
~~~

然后为了体现良好的编程习惯，变量都应该在程序刚运行到时候初始化，找到`public Form1()`，添加这些代码。`public Form1()`是程序自动生成的，每次程序运行都会先运行这个函数*(其实我也不确定，IOS是这样所以我觉得windows也应该是这样，都说了其实我不会C#)*

~~~csharp
//C#
    public Form1()
        {
            InitializeComponent();
            firstNumber = "0";
            secondNumber = "0";
            operation = "";
            textBox1.Text = "";
        }
~~~

然后我们来处理下加减法。我的计算逻辑是这样的，用户先输入一个数字，然后按“＋”或者“－”号，然后再输入一个数字，然后按“＝”得到结果。

所以“＋”和“－”button的处理事件我是这样写的：

~~~csharp
//C#
	//加法
        private void button10_Click(object sender, EventArgs e)
        {
            firstNumber = textBox1.Text;
            textBox1.Text = "";
            operation = "+";
        }
        
   //减法
    private void button11_Click(object sender, EventArgs e)
        {
            firstNumber = textBox1.Text;
            textBox1.Text = "";
            operation = "-";
        }
~~~

思路是这样，先获取用户输入的第一个数字，然后清空输入栏（textBox）内容，同时记下运算符，等待用户输入第二个数字。

`＝`button的事件：

~~~csharp
//C#
//等于
           private void button12_Click(object sender, EventArgs e)
        {
            secondNumber = textBox1.Text;
            switch (operation)
            {
                case "+":
                    textBox1.Text = System.String.Format("{0}", int.Parse(firstNumber) + int.Parse(secondNumber));
                    break;
                case "-":
                    textBox1.Text = System.String.Format("{0}", int.Parse(firstNumber) - int.Parse(secondNumber));
                    break;
                default:
                    break;
            }
            firstNumber = "0";
            secondNumber = "0";
            operation = "";
        }
~~~

C#的`switch`可以是字符串所以通过`switch`可以区分出操作符。然后由于获取到的`firstNumber`和`secondNumber`都是字符串格式不能直接进行计算所以要通过`int.Parse()`函数把它转化成int类型然后计算。计算结果由`System.String.Format({0},……)`函数转为字符串赋值给textBox显示。最后清空三个全局变量。

最后处理下 `AC`键，就是清零。那这个很简单，重置所有东西就好了：

~~~csharp
//C#
 private void button14_Click(object sender, EventArgs e)
        {
            operation = "";
            firstNumber = "";
            secondNumber = "";
            textBox1.Text = "";
        }
~~~
最后的效果就是这样：

![最终效果](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-2/21766413.jpg)


[.exe下载地址](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-2/28170240-calcultor.exe)  
[代码下载地址](![](http://7xkfbb.com1.z0.glb.clouddn.com/15-8-2/87862436-calculator.rar))


