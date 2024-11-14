//缓存规则
module.exports.cacheList = {
//缓存网站文件
    happyking: {
        clean: true,
        match: url => url.hostname === 'blog.happyking.top' && url.pathname.match(/\.(html|woff2|woff|ttf|cur|js|css|png|mp3|svg|webp|jpg|jpeg)$/)
    },
//缓存网站页面
    page: {
        clean:true,
        match: url => url.hostname === 'blog.happyking.top' && url.pathname.match(/\/$/)
    }
}
//替换jsd的cdn
module.exports.modifyRequest = request => {
    const url = request.url
    const source = '//cdn.jsdelivr.net/'
    if (url.includes(source)) {
      request.url = url.replace(source, '//cdn1.tianli0.top/')
      return true
    }
}
