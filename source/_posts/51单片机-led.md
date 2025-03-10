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








