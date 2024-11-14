---
title: hexo博客访问优化加速
mathjax: true
top: false
message: 
date: 2022-04-09 19:11:09
cover: https://bu.dusays.com/2023/07/16/64b35a21cb847.webp
categories: 优质教程
tags:
  - butterfly
  - hexo
  - 编程
password:
description:
abbrlink: 8945645634564
---
{% folding green open, 前言 %}
一切的一切还要从这个b说起（bushi），这个好哥们网站跑分
![](https://bu.dusays.com/2023/07/16/64b35a35abd40.webp)
我也是fuo了,所以说专门来写一篇教程来说说关于hexo博客优化加速的的一些事情
顺便把这个*的博客放上去（都去骚扰他去）
{% link Mars, https://wangyuning2005.github.io/,https://wangyuning2005.github.io/img/%E5%A4%B4%E5%83%8F.gif  %}
{% endfolding %}
# 使用cdn加速
>在这里打个比方让大家先理解一下什么是cdn加速
>没有加速时:你上课时（别人访问你的网站）,你需要从书洞里面找出书来（你的网站加载）
>加速后：你上课（别人来访问你的网站）,但是你的书已经在桌子上面放好了（cdn加速）
>只要是个正常人都能看出来,有了cdn的访问速度会提升

**如何启用**
你要找一个cdn服务商（给你提供桌子放书的）
目前主要有：腾讯云,七牛云,阿里,又拍云,jsdeliver（国外）
我们这里用tianli来演示
**1.自己折腾法**
首先把自己的资源上传到GitHub上
之后引用,代码如下：
```url
https://cdn1.tianli0.top/gh/用户名/储存库名称@分支/文件名
```
之后讲这个链接引用到需要的地方就可以了,如：
```yml
archive_img: https://cdn1.tianli0.top/npm/happyking/link/1.webp
这是我的分类界面引用的链接
```
**2.小王法**
~~使用小王自己搭建的上传工具（上传的图片都会自动cdn加速,无需注册登录,图片永久保存）ps：没错我是来给自己打广告的~~开学了,该服务停止维护
{% link 图片托管, https://blog.happyking.top/img/avatar.webp  %}
>可能出现的bug
>jsdeliver时免费服务,更新资源后缓存可能无法及时刷新,使用以下工具进行缓存刷新
{% link 刷新工具, https://blog.happyking.top/img/avatar.webp  %}

# 去除无需版块
>很明显,我们的博客是由很多版块构成的,加载他们的时候也是要占用桌子的空间的,接下来以我的butterfly主题给大家举个例子

首先考虑以下**什么东西**你不需要
比如说我觉得手机端时的这部分侧栏就是多余
![](https://bu.dusays.com/2023/07/16/64b35a4f21a66.webp)
所以说对应的在主题配置文件中把这部分设置为：移动端不显示
```yml
#侧边栏
aside:
  enable: true
  hide: false
  button: true
  mobile: false #手机是否显示
  position: right #位置
```
>以上只是一个例子,具体情况看自己

# 图片压缩
这个很好理解吧,毕竟你要是在博客里面用上**4K**大图,我估计访问速度也别想上去了
图片压缩工具大家可以自行寻找,这里不说了（其实就是不想说）

# 博客托管平台
>自行选择,反正我感觉GitHub挺好的

由于博客部署在 Github Pages, 所以在国内访问速度显然会比较慢。可选方案为国内的代码托管平台**码云**(自己百度)，码云提供了 Coding Pages 服务，使用起来比 Github Pages 更加方便。
当然Gitee更好（也是一个类似的托管平台）
**例子**
使用站长之家的「网站测速工具」对分别部署在「七牛（也是一个托管平台）」和「Github Pages」的我的两个博客进行测速，结果如下所示，速度高下立判。
这是GitHub的
![](https://bu.dusays.com/2023/07/16/64b35a63abdde.webp)
这是七牛的：
![](https://bu.dusays.com/2023/07/16/64b35a757617f.webp)

# 访问统计
>各种主题默认使用的时布蒜子，但是众所周知，不蒜子日常抽风，加载时间动不动就超过 1s

大家可以自行切换统计服务商（这里不说了,没错又是不想写）

# 预加载
>网站第一次加载的等待时间非常重要，但浏览过程中的链接跳转的加载速度同样重要。
>提前加载网页，即通过 js 对当前页面中的本站链接进行预先加载，或是在鼠标悬浮在链接上时，对该链接进行预先加载。

以butterfly为例，在主题配置文件中:
```yml
#预加载
instantpage: true
```
# 懒加载
以butterfly为例，在主题配置文件中:
```yml
# 图片懒加载
lazyload:
  enable: true # 是否开启图片懒加载
  onlypost: true # 是否只对文章的图片做懒加载
  loadingImg: /images/loading.gif
```

# 尽量统一外链
这里指的外链是文件外链，加载不同域的文件需要不同的 SSL 连接时间。比如你的一个 js 来自 jsdelivr.net，另一个来自 staticfile.org，那么你就需要两次 SSL 连接，而如果你的两个文件全部来自 jsdelivr.net 那你将只需要一次 SSL 连接。

# gulp压缩代码
>gulp可以将代码进行压缩来达到加速的目的

1、安装gulp
```bash
npm install --global gulp-cli
```
2、安装gulp模块
```bash
npm install gulp --save
npm install gulp-htmlclean gulp-htmlmin gulp-clean-css gulp-uglify gulp-imagemin --save
npm install gulp-babel babel-preset-env babel-preset-mobx --save
npm install -D @babel/core @babel/preset-react @babel/preset-env --save
```
3、在hexo目录创建gulpfile.js，内容为：
```
let gulp = require('gulp')
let cleanCSS = require('gulp-clean-css')
let htmlmin = require('gulp-htmlmin')
let htmlclean = require('gulp-htmlclean')
let babel = require('gulp-babel') /* 转换为es2015 */
let uglify = require('gulp-uglify')
let imagemin = require('gulp-imagemin')

// 设置根目录
const root = './public'

// 匹配模式， **/*代表匹配所有目录下的所有文件
const pattern = '**/*'

// 压缩html
gulp.task('minify-html', function() {
  return gulp
    // 匹配所有 .html结尾的文件
    .src(`${root}/${pattern}.html`)
    .pipe(htmlclean())
    .pipe(
      htmlmin({
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      })
    )
    .pipe(gulp.dest('./public'))
})

// 压缩css
gulp.task('minify-css', function() {
  return gulp
    // 匹配所有 .css结尾的文件
    .src(`${root}/${pattern}.css`)
    .pipe(
      cleanCSS({
        compatibility: 'ie8'
      })
    )
    .pipe(gulp.dest('./public'))
})

// 压缩js
gulp.task('minify-js', function() {
  return gulp
    // 匹配所有 .js结尾的文件
    .src(`${root}/${pattern}.js`)
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./public'))
})

// 压缩图片
gulp.task('minify-images', function() {
  return gulp
    // 匹配public/images目录下的所有文件
    .src(`${root}/images/${pattern}`)
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ optimizationLevel: 3 }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 7 }),
          imagemin.svgo()
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest('./public/images'))
})

gulp.task('default', gulp.series('minify-html', 'minify-css', 'minify-js'))
```
4.执行
终端中输入gulp进行压缩
```bash
gulp
```
{% tip home %}创作不易,能不能投喂一下小王qwq(下方打赏按钮){% endtip %}
