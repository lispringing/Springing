---
title: butterfly主题分类界面魔改
mathjax: true
top: false
date: 2022-04-12 15:35:37
cover: https://bu.dusays.com/2023/07/16/64b359c43b4fb.webp
categories: 魔改教程
tags:
  - butterfly
  - hexo
  - 编程
password:
description: 明天就开学了,水一篇文章（呜呜呜呜呜呜）qaq
abbrlink: 565531
---
# 我的分类界面
>这是F12爬的<a href="https://blog.eurkon.com/">eurkon</a>大佬的.

## 样式预览
![](./img/64b359af9095d.webp)

## 代码
引入css文件（我的因为字体的原因,字体改为白色,你们因情况而定)
```css
/* 分类页 */
#page .category-lists .category-list .category-list-item {
	position: relative;
	display: inline-block;
	padding: 0 1rem;
	width: 48%;
	font-weight: 700;
	margin: 0 .5% 2% .5%;
	border-radius: 8px;
	-webkit-box-shadow: rgb(50 50 50 / 30%) 50px 50px 50px 50px inset;
	box-shadow: rgb(50 50 50 / 30%) 50px 50px 50px 50px inset;
}

@media (max-width: 640px) {
	#page .category-lists .category-list .category-list-item {
		width: 95%;
	}
}

#page .category-lists .category-list .category-list-item::before {
	display: none;
}

#page .category-lists .category-list .category-list-item .category-list-link {
	color: var(--second);
	font-size: 1.5rem;
	margin-left: .4rem;
}

#page .category-lists .category-list .category-list-item .category-list-link::after {
	content: '';
	position: relative;
	width: 0;
	bottom: 0;
	display: block;
	height: 3px;
	border-radius: 3px;
	background: var(--second);
}

#page .category-lists .category-list .category-list-item .category-list-link:hover::after {
	width: 60%;
	left: 1%;
	-webkit-transition: all .6s;
	-moz-transition: all .6s;
	-o-transition: all .6s;
	-ms-transition: all .6s;
	transition: all .6s;
}

#page .category-lists .category-list .category-list-item .category-list-count {
	color: var(--second);
	font-size: 1.3rem;
}

#page .category-lists .category-list .category-list-item .category-list-count::before {
	content: '\f02d';
	padding-right: 15px;
	font-family: 'Font Awesome 6 Free';
}

#page .category-lists .category-list .category-list-item .category-list-count::after {
	display: none;
}

#page .category-lists .category-list li.category-list-item a.category-list-link::before {
	position: absolute;
	font-size: 4rem;
	line-height: 4rem;
	top: 1rem;
	right: 1rem;
	opacity: .7;
	box-shadow: 0 3px 8px 6px rgb(85 85 85 / 6%);
	transform: rotate(-15deg);
	-ms-transform: rotate(-15deg);
	-moz-transform: rotate(-15deg);
	-webkit-transform: rotate(-15deg);
	-o-transform: rotate(-15deg);
	-webkit-transition: all .6s;
	-moz-transition: all .6s;
	-o-transition: all .6s;
	-ms-transition: all .6s;
	transition: all .6s;
}

#page .category-lists .category-list li.category-list-item a.category-list-link:hover::before {
	opacity: .9;
	transform: rotate(0deg);
	-ms-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	-webkit-transform: rotate(0deg);
	-o-transform: rotate(0deg);
}

#page .category-lists .category-list li.category-list-item:nth-child(1) {
	background: -webkit-linear-gradient(left,#364f6b,#3fc1c9);
	background: -moz-linear-gradient(left,#364f6b,#3fc1c9);
	background: -o-linear-gradient(left,#364f6b,#3fc1c9);
	background: -ms-linear-gradient(left,#364f6b,#3fc1c9);
	background: linear-gradient(to right,#364f6b,#3fc1c9);
  color: white;
}

#page .category-lists .category-list li.category-list-item:nth-child(1) a.category-list-link::before {
	content: '🖥️';
}

#page .category-lists .category-list li.category-list-item:nth-child(2) {
	background: -webkit-linear-gradient(left,#ba52ed,#ff99fe);
	background: -moz-linear-gradient(left,#ba52ed,#ff99fe);
	background: -o-linear-gradient(left,#ba52ed,#ff99fe);
	background: -ms-linear-gradient(left,#ba52ed,#ff99fe);
	background: linear-gradient(to right,#ba52ed,#ff99fe);
  color: white;
}

#page .category-lists .category-list li.category-list-item:nth-child(2) a.category-list-link::before {
	content: '📚';
}

#page .category-lists .category-list li.category-list-item:nth-child(3) {
	background: -webkit-linear-gradient(left,#6639a6,#3490de);
	background: -moz-linear-gradient(left,#6639a6,#3490de);
	background: -o-linear-gradient(left,#6639a6,#3490de);
	background: -ms-linear-gradient(left,#6639a6,#3490de);
	background: linear-gradient(to right,#6639a6,#3490de);
  color: white;
}

#page .category-lists .category-list li.category-list-item:nth-child(3) a.category-list-link::before {
	content: '💬';
}

#page .category-lists .category-list li.category-list-item:nth-child(4) {
	background: -webkit-linear-gradient(right,#38ef7d,#11998e);
	background: -moz-linear-gradient(right,#38ef7d,#11998e);
	background: -o-linear-gradient(right,#38ef7d,#11998e);
	background: -ms-linear-gradient(right,#38ef7d,#11998e);
	background: linear-gradient(to left,#38ef7d,#11998e);
  color: white;
}

#page .category-lists .category-list li.category-list-item:nth-child(4) a.category-list-link::before {
	content: '🌐';
}

#page .category-lists .category-list li.category-list-item:nth-child(5) {
	background: -webkit-linear-gradient(left,#b91d73,#f953c6);
	background: -moz-linear-gradient(left,#b91d73,#f953c6);
	background: -o-linear-gradient(left,#b91d73,#f953c6);
	background: -ms-linear-gradient(left,#b91d73,#f953c6);
	background: linear-gradient(to right,#b91d73,#f953c6);
  color: white;
}

#page .category-lists .category-list li.category-list-item:nth-child(5) a.category-list-link::before {
	content: '📝';
}

#page .category-lists .category-list li.category-list-item:nth-child(6) {
	background: -webkit-linear-gradient(left,#f12711,#f5af19);
	background: -moz-linear-gradient(left,#f12711,#f5af19);
	background: -o-linear-gradient(left,#f12711,#f5af19);
	background: -ms-linear-gradient(left,#f12711,#f5af19);
	background: linear-gradient(to right,#f12711,#f5af19);
  color: white;
}

#page .category-lists .category-list li.category-list-item:nth-child(6) a.category-list-link::before {
	content: '🎨';
}
```

>注意我这是仅仅写了6个分类标签的css,如果你的标签更多可以自行复制粘贴

{% tip home %}创作不易,能不能投喂一下小王qwq(下方打赏按钮){% endtip %}

