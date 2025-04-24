---
title: C#学习笔记
mathjax: false
top: false
date: 2025-04-23 
cover: ./img/e29c9fc6-5686-4406-81d2-d0a98ec659ad_1745378537625669424_origin~tplv-a9rns2rl98-image-dark-watermark_compressed.png
categories: 学习笔记
tags:
  - 学习笔记
  - 编程
password:
description: 小春子的c#学习笔记，里面的内容基本上是给春子自己看的，当然大家也可以当作复习教程看
abbrlink: 20250423
---


# 何为c#
c#不同于c语言，c语言是一种低级的，底层的语言。c#比较高级
比如说，c语言我们要考虑的东西有很多，比如说最经典的内存管理
但是再c#中存在GC，可以帮助你自动的管理这些东西

# 开发环境配置

在这里使用VScode 
1.先安装.NetCore SDK （这是一个支持全平台 win mac linux 开发的SDK）
2.安装完毕后，再cmd窗口里面键入**dotnet -h**来验证是否安装成功
3.vscode 安装 C#、C# Extensions、C/C++三个插件，用于辅助后续代码写作，提升效率
4.新建一个文件夹(这就是以后你c#项目的开发文件夹)，然后在vscode中打开，打开终端，输入**dotnet new console**，**dotnet run**即可开始代码写作

# c#基本结构
基本结构：
``` c#
using System; //类似于c语言中的引入头文件，python中的import库

namespace VSCode_C_ //命名空间 ，名字可以自己自定义
{
    class Program //同理，这个Program也可以自己改，这个是类
    {
        static void Main(string[] args) //这里搞了一个主函数
        {
            Console.WriteLine("Hello World!"); //在这里写主函数的内容
        }
    }
}
```
Console.WriteLine("Hello World!");是输出函数，类似于c语言的printf

# c#变量
在c#中存在多种变量，其实跟c语言差不多
像是 int ，char ，string，float ，doubule ， 这些，都一样
>但是c#提供了一种自动类型，叫做var，比如说我写 var name =666 它会自己把name这个变量判断为int类型 （更便捷了）

# c#输出语句
注意！这样写你需要提前using System
```c#
Console.WriteLine("你好！"); // 输出后自动换行
Console.Write("你好！"); // 输出后不会自动换行
```

# c#输入语句
注意！这样写你需要提前using System
```c#
Console.WriteLine("请输入您的用户名:");
string userName = Console.ReadLine(); //这里的意思是把你输入的东西传入一个名字为userName 类型为string的变量里面去
Console.WriteLine("您的用户名是: " + userName);
```

# c#等待键入(运行完毕后不立刻关闭)

```c#
Console.ReadKey(); //意思就是叫等你随便按一个按钮后，执行下一步
```

# c#数据类型转换
隐式类型转换
隐式转换是不需要编写代码来指定的转换，编译器会自动进行。这种转换通常用于将一个较小范围的数据类型转换为较大范围的数据类型，不会导致数据丢失。例如，从 int 到 long，从 float 到 double。
```c#
int intValue = 42; 
long longValue = intValue; // 隐式转换，从 int 到 long
```
显式类型转换（强制转换）
显式类型转换需要程序员在代码中明确指定。强制转换通常用于将一个较大范围的数据类型转换为较小范围的数据类型，或者将一个对象类型转换为另一个对象类型时。强制转换可能会导致数据丢失
也就是说变的太厉害了，编译器话怕数据丢失，不敢给你改，所以说你强制一下
```c#
double doubleValue = 3.14;
int intValue = (int) doubleValue; // 强制从 double 到 int，数据可能损失小数部分
```











