---
title: 单片机-LED
cover: ./img/12121.jpg
date: '2025-3-9'
updated: '2025-3-9'
description: 51单片机学习笔记
tags:
- 51单片机
categories:
- 学习笔记
top: false
abbrlink: '20250309'
---
>这个是春子给自己看的复习笔记
>首先前置条件是安装好单片机USB驱动，keil5或者keil4软件 以及stc的下载工具

# 点亮一个LED
在单片机上实现通过
cpu-寄存器-驱动器-LED
这个过程来实现
阅读单片机的电路原理图
![](/img/wdads.png)
可以知道这8个LED灯是通过P1端口来控制
我们给LED灯输入1代表不亮 0代表亮，实际上就是电位的高低的问题
如果想要让D0点亮，应该是0111 1111 但是在c语言程序里面要倒着写 1111 1110
同时使用16进制的方式来表示(二进制转16进制)


>代码编写如下
```c
#include <REGX52.H> //这个相当于单片机的头文件

void mian() //创建一个main函数
{
P1=0xFE; //1111 1110 0x代表使用16进制 F是1111 E 是1110
}
```

# LED灯闪烁
>在stc下载工具中有一个工具可以辅助你生成延时代码，但是要注意自己的单片机的晶振频率

>代码编写如下
```c
#include <REGX52.H>
#include <INTRINS.H> //这个是延时函数用到的头文件

void Delay500ms()		//晶振频率@11.0592MHz的延时函数
{
	unsigned char i, j, k;

	_nop_();
	_nop_();
	i = 22;
	j = 3;
	k = 227;
	do
	{
		do
		{
			while (--k);
		} while (--j);
	} while (--i);
}

void main()
{
while(1) //一直循环这个过程
{
P1=0xFE;// 1111 1110 亮第一个
Delay500ms();
P1=0xFF; //1111 1111 全灭
Delay500ms();	  
}
}
```

# LED流水灯

可以通过一下这种简单的方式实现
``` c
#include <REGX52.H>
#include <INTRINS.H> //这个是延时函数用到的头文件

void Delay100ms()		//@11.0592MHz 延时100ms
{
	unsigned char i, j, k;

	_nop_();
	_nop_();
	i = 5;
	j = 52;
	k = 195;
	do
	{
		do
		{
			while (--k);
		} while (--j);
	} while (--i);
}


void main()
{
while(1) //这里的1代表一直循环
{
P1=0xFE; // 1111 1110
Delay100ms();
P1=0xFD; //1111 1101
Delay100ms();
P1=0xFB; //1111 1011
Delay100ms();
P1=0xF7; //1111 0111
Delay100ms();
P1=0xEF; //1110 1111
Delay100ms();
P1=0xDF; //1101 1111
Delay100ms();
P1=0xBF; //1011 1111
Delay100ms();
P1=0x7F; //0111 1111
Delay100ms();	  
}
}
```
但是如果我们想修改延时时间过于繁琐，可以有一下版本

```c
#include <REGX52.H>
#include <INTRINS.H>

void Delayxms(unsigned int _ms)     //这个函数是一个延时x秒的函数，你只要给它传入参数就行了，这样比较方便
{
    unsigned char i, j;

    while (_ms--)
    {
        _nop_();
        i = 2;
        j = 199;
        do
        {
            while (--j);
        } while (--i);
    }
}


void main()
{
while(1)
{
P1=0xFE; // 1111 1110
Delayxms(100);
P1=0xFD; //1111 1101
Delayxms(100);
P1=0xFB; //1111 1011
Delayxms(100);
P1=0xF7; //1111 0111
Delayxms(100);
P1=0xEF; //1110 1111
Delayxms(500);
P1=0xDF; //1101 1111
Delayxms(500);
P1=0xBF; //1011 1111
Delayxms(500);
P1=0x7F; //0111 1111
Delayxms(500);	  
}
}
```
# 使用独立的开关来控制LED的亮灭







