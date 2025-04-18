---
abbrlink: '20230109'
categories:
- - 代码开发
cover: ./img/64b3589e5d432.webp
date: '2023-01-09 19:57:40'
description: null
mathjax: true
password: null
tags:
- npm插件
- CDN
- 代码开发
title: 腾讯云cdn自动刷新插件(使用文档+实现原理)
top: false
updated: '2023-01-12 17:06:28'
---
# Hexo 腾讯云CDN主动刷新插件
这是一个Hexo使用腾讯云CDN自动刷新的插件，当你的博客启用了腾讯云的cdn后,每次部署完成后都要手动刷新cdn的缓存,故开发此插件配合腾讯云cdn使用

目前只支持腾讯云的CDN刷新,后期的话可能会考虑开发其他厂商的cdn（~~或者你可以自己魔改源代码~~）

> 注意,本插件能够自动刷新变更的文件或者自动刷新全部的缓存,但是不支持刷新指定URL链接的缓存,如果你执意想要刷新url链接,可以考虑对插件进行改造(具体请见本文的`开发过程/原理说明`部分)

# 快速开始
前往[腾讯云CDN主动刷新插件](https://blog.happyking.top/p/20230109/)阅读插件说明

在你的博客根目录中运行npm安装指令

```bash
npm install hexo-cdn-refresh -s
```

在hexo的`_congig.yml`中添加以下配置项目

```yml
tencentcdn:
 secretId: '*******************' # 你在https://console.cloud.tencent.com/cam/capi 获取到的ID
 secretKey: '******************' * # 你在https://console.cloud.tencent.com/cam/capi 获取到的SecretKey
 type: 1 #刷新方式,1为只刷新变更资源,2为刷新网站下的全部缓存
 timer: 60000 #延时器,单位为毫秒,延时多长时间再执行刷新命令,不需要的填写0
```

在hexo的`_congig.yml`的`deploy`配置项中添加

```yml
deploy:
- type: tencent_cdn
```

延时器说明:主要为网站托管在GitHub Pages,vercel,或者netlify的用户设置,当你更新网站后,这些托管平台需要一段的时间来构建页面,如果不设置延时器,那么会导致cdn立即刷新,拉去到未更新的源站内容,所以说延时器必须填写,具体数值看自己的页面构建速度,如果是其他部署方式,不需要延时器的就填写0

注意:`- type: tencent_cdn`一定要加在最后面,因为hexo d这个命令是按照type的顺序运行的,如果你加载了前面会先刷新cdn的缓存,再上传文件,达不到更新网站的效果

运行`hexo d`即可上传网站并且刷新cdn，控制台提示如下为刷新成功

```bash
CDN刷新结果{"code":0,"message":"","codeDesc":"Success","data":{"count":1,"task_id":"1540810210711616112"}}
```

> 注意,只有code返回为0才为正常刷新,如果返回其他字符段(一般为4000),请检查自己的api ID 与密钥是否填写正确,确认无误后请检查自己的_congig.yml文件中的url:配置选项中的网址是否为/结尾的,列如
>
> url:https://blog.happyking.top(这是错误的填写方法,必须是/结尾)
>
> url:https://blog.happyking.top/(正确)

计划开发其他家的cdn缓存刷新

# 具体配置项说明

我们的主要配置项有两个,第一个用于配置变量,插件运行的时候会带入你填写好的东西来运行

```yml
tencentcdn:
 secretId: '*******************' # 你在https://console.cloud.tencent.com/cam/capi 获取到的ID
 secretKey: '******************' * # 你在https://console.cloud.tencent.com/cam/capi 获取到的SecretKey
 type: 1 #刷新方式,1为只刷新变更资源,2为刷新网站下的全部缓存
 timer: 60000 #延时器,单位为毫秒,延时多长时间再执行刷新命令,不需要的填写0
```

首先是`secretId`和`secretKey`这两个需要前往腾讯云的密钥控制台获取,作用就是让插件获得你的cdn操作权限

> 注意,腾讯云生成的密钥有两种类型:一种是主账号的密钥(获得你账号的全部权限),还有一种则是子账号密钥(可以指定权限),这里推荐使用子账号的密钥,当然使用主账号的密钥也是可以的,只是请注意保管好,要不然可能会造成损失

之后是`type`选项，这里只提供两种选择,一种是"只刷新更新的资源",另一种是"刷新全站缓存",当你的文章进行了大版本的更新(比如说魔改了很多文件),建议你食用`全站刷新`，因为用第一种方式的话CDN可能会误判更新文件(亲身经理,我也不知道为什么)

最后的选项是`timer`延时器选项,对于这一选项的配置你首先要知道自己的博客是什么的部署方式

若你的博客部署在`GitHub Pages`,`vercel(存放生成后的文件仓库部署,不是源代码仓库)`，`netlify（同Vercel）`上面,因为你的GitHub Pages在源代码上传后需要时间去构建网站,所以说`延时器`就需要填写比这段时间稍微多一点,目前我的部署方式是`netlify直接部署的静态文件仓库`,而我的页面构建时间一般为1分10秒左右,所以说我的延时器就填写了90000

如果你的博客部署在`自己的服务器`,`vercel(源代码仓库部署)`,`netlify（源代码仓库部署）`，因为运行完毕`hexo g`命令后页面就已经更新了,所以说不需要填写延时器,故设置为0

第二个配置项加在`deploy`上,用于触发插件运行,***注意:这个一定要放在deploy的最后面***

```yml
deploy:
- type: tencent_cdn
```

比如说我的

```yml
deploy:
- type: git
  repo:
    gitHub: ************************************* #上传到静态文件仓库
- type: cjh_bing_url_submitter #再向bing提交url
- type: tencent_cdn #最后刷新腾讯云的CDN
```

# 开发过程/原理说明

## 开发的原因

之所以开发这个插件是因为之前本站开启了`sw`,而且为了保证每一次sw刷新后用户拉取的资源为最新资源,所以说我当时就把CDN设置为了`html`文件不刷新,这样更新文章后无需自动刷新便可以达到更新网站的目的,(~~当然修改js,css文件后还需要手动刷新缓存~~)

但是这样的问题也是显而易见,那就是我的`html`文件基本上全部回源了,但是我的静态站点又是以html文件居多,那我这个CDN不是用了个寂寞？

所以说我便把我的CDN缓存设置为了全部缓存365天,但是问题也随之而来,那就是每次更新文章/魔改后,都要前往腾讯云控制台进行手动刷新，对此我也是很无语啊

于是便开始开发这个插件,其实说起来也很简单,一开始我找到了[hexo-deploy-tencentcloud-cdn ](https://www.npmjs.com/package/hexo-deploy-tencentcloud-cdn)这个插件,但是很不幸,这个插件已经挂掉了，而且它只支持刷新你的首页,也就是说如果你更新了文章或者css,js一样还是要手动刷新,ps~~原项目作者于2018年已经停止更新了,所以说我感觉指望作者开发玩不太可靠~~

## 着手修复

于是我便开始着手修复这个插件(或者说是在它的基础上加以改造)

> 这个插件的原理很简单,就是通过腾讯云的api接口上传CDN刷新的post请求

所以说首先我修复了它的api接口功能,这是改动后的第一版

```js
module.exports = function(args) {
var qcloudSDK = require('./submit'); 
var config = this.config;
var secret_Id = config.tencentcdn.secretId;
var secret_Key = config.tencentcdn.secretKey;
var url = config.url
qcloudSDK.config({
    secretId: secret_Id,
    secretKey: secret_Key
})
qcloudSDK.request('RefreshCdnUrl', {
    'urls.0': url
}, (res) => {
console.log('腾讯云CDN首页刷新推送结果' + res);
// console.log('secret_Id:' + secret_Id);
// console.log('secret_Key:' + secret_Key);
// console.log('url:' + url);
})
};
```

其实我做的也就是把源码中的`1`改成了`0`(因为原来的插件太久没维护,所以说部分参数失效了),但这样的话我们完成了初步的api接口上传的功能

之后要做的就是对插件的上传参数修改一下,一开始我是直接添加了一个配置项`refresh-url`,给他填写

```yml
https://blog.happyking.top/*/*.*
```

按照理论来说这样应该就ok了,但是最终的结果是不行,通过阅读`腾讯云apiv2.0`的文档得知腾讯云的url刷新方式不支持通配符,但是还有一种刷新方式--`目录刷新`所以说我只要将上传的post参数改为目录刷新的即可

修改完成后便能够成功刷新cdn缓存了,但是我发现了一个问题就是,当你更新了源站资源后,托管平台(我的在netlify上面,用GitHub Action部署)需要一定的时间来进行页面构建,但是这个插件却在构建完成之前就提交了刷新请求,所以说导致刷新出的还是老旧的资源

由于这个插件的运行是绑定在`hexo d`这个命令的,我也没找到让各个命令延时运行的方法,于是就采用了`setTimeout()`设定了一个延时器的选项让插件延时

之后的工作就是填写package,`npm publish`发包就完工了

# 二次开发指南

请修改`libs/push.js`这个文件

具体参数请阅读[全站加速网络 缓存刷新-API 文档-文档中心-腾讯云 (tencent.com)](https://cloud.tencent.com/document/product/570/38855#.E8.B0.83.E7.94.A8.E7.A4.BA.E4.BE.8B)

# 答疑解惑
question：这个插件可以刷新其他cdn厂商的缓存吗？
answer：不可以,因为不同厂商的cdn缓存刷新参数不同，本插件时根据腾讯云CDN来编写的，所以说只能刷新腾讯云CDN的缓存，如果你需要其他厂商的CDN刷新功能可以尝试`自己修改插件`或者`在评论区催促小王尽快开发`

question：刷新结果代码：code4000怎么回事？
answer：首先检查你的密钥ID与密钥是否正确,之后请确保你的`_congig.yml`url配置是以/结尾的,如果还不行,请在评论区留言,我会进一步排查，修复插件
```yml
# URL
url: https://blog.happyking.top/ #这里务必是以/结尾的网址
root: /

```


{% tip home %}这篇文章真的花费了小王很多时间和精力,能不能投喂一下小王qwq(下方打赏按钮){% endtip %}






















