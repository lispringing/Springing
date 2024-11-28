/**
 * Butterfly
 * 1. Merge CDN
 * 2. Capitalize the first letter of comment name
 */

'use strict'

hexo.extend.filter.register('before_generate', () => {
  const themeConfig = hexo.theme.config

  /**
   * Merge CDN
   */

  const defaultCDN = {
    main_css: '/css/index.css',
    main: '/js/main.js',
    utils: '/js/utils.js',

    // pjax
    pjax: '/js/main/pjax.min.js',

    // comments
    gitalk: 'https://cdn1.tianli0.top/npm/gitalk@latest/dist/gitalk.min.js',
    gitalk_css: 'https://cdn1.tianli0.top/npm/gitalk/dist/gitalk.min.css',
    blueimp_md5: 'https://cdn1.tianli0.top/npm/blueimp-md5/js/md5.min.js',
    valine: 'https://cdn1.tianli0.top/npm/valine/dist/Valine.min.js',
    disqusjs: 'https://cdn1.tianli0.top/npm/disqusjs@1/dist/disqus.js',
    disqusjs_css: 'https://cdn1.tianli0.top/npm/disqusjs@1/dist/disqusjs.css',
    utterances: 'https://utteranc.es/client.js',
    twikoo: '/js/main/twikoo.min.js',
    waline: 'https://cdn1.tianli0.top/npm/@waline/client/dist/Waline.min.js',
    giscus: 'https://giscus.app/client.js',

    // share
    addtoany: 'https://static.addtoany.com/menu/page.js',
    sharejs: 'https://cdn1.tianli0.top/npm/social-share.js/dist/js/social-share.min.js',
    sharejs_css: 'https://cdn1.tianli0.top/npm/social-share.js/dist/css/share.min.css',

    // search
    local_search: '/js/search/local-search.js',
    algolia_js: '/js/search/algolia.js',
    algolia_search_v4: 'https://cdn1.tianli0.top/npm/algoliasearch@4/dist/algoliasearch-lite.umd.js',
    instantsearch_v4: 'https://cdn1.tianli0.top/npm/instantsearch.js@4/dist/instantsearch.production.min.js',

    // math
    mathjax: 'https://cdn1.tianli0.top/npm/mathjax@3/es5/tex-mml-chtml.js',
    katex: 'https://cdn1.tianli0.top/npm/katex@latest/dist/katex.min.css',
    katex_copytex: 'https://cdn1.tianli0.top/npm/katex@latest/dist/contrib/copy-tex.min.js',
    katex_copytex_css: 'https://cdn1.tianli0.top/npm/katex@latest/dist/contrib/copy-tex.css',
    mermaid: 'https://cdn1.tianli0.top/npm/mermaid/dist/mermaid.min.js',

    // count
    busuanzi: '/js/main/busuanzi.min.js',

    // background effect
    canvas_ribbon: 'https://cdn1.tianli0.top/npm/butterfly-extsrc@1/dist/canvas-ribbon.min.js',
    canvas_fluttering_ribbon: 'https://cdn1.tianli0.top/npm/butterfly-extsrc@1/dist/canvas-fluttering-ribbon.min.js',
    canvas_nest: 'https://cdn1.tianli0.top/npm/butterfly-extsrc@1/dist/canvas-nest.min.js',

    lazyload: 'https://cdn1.tianli0.top/npm/vanilla-lazyload/dist/lazyload.iife.min.js',
    instantpage: 'https://cdn1.tianli0.top/npm/instant.page/instantpage.min.js',
    typed: 'https://cdn1.tianli0.top/npm/typed.js/lib/typed.min.js',
    pangu: 'https://cdn1.tianli0.top/npm/pangu/dist/browser/pangu.min.js',

    // photo
    fancybox_css_v4: '/css/main/photo/fancybox.css',
    fancybox_v4: '/js/main/fancybox.umd.js',
    medium_zoom: 'https://cdn1.tianli0.top/npm/medium-zoom/dist/medium-zoom.min.js',

    // snackbar
    snackbar_css: '/css/main/snackbar/snackbar.min.css',
    snackbar: '/js/main/snackbar/snackbar.min.js',

    // effect
    activate_power_mode: 'https://cdn1.tianli0.top/npm/butterfly-extsrc@1/dist/activate-power-mode.min.js',
    fireworks: 'https://cdn1.tianli0.top/npm/butterfly-extsrc@1/dist/fireworks.min.js',
    click_heart: 'https://cdn1.tianli0.top/npm/butterfly-extsrc@1/dist/click-heart.min.js',
    ClickShowText: '/css/main/effect/click-text.js',

    // fontawesome
    fontawesomeV6: '/css/main/fontawesome/fontawesome.css',

    // Conversion between Traditional and Simplified Chinese
    translate: '/js/tw_cn.js',

    // flickr-justified-gallery
    flickr_justified_gallery_js: 'https://cdn1.tianli0.top/npm/flickr-justified-gallery@2/dist/fjGallery.min.js',
    flickr_justified_gallery_css: 'https://cdn1.tianli0.top/npm/flickr-justified-gallery@2/dist/fjGallery.min.css',

    // aplayer
    aplayer_css: 'https://cdn1.tianli0.top/npm/aplayer/dist/APlayer.min.css',
    aplayer_js: 'https://cdn1.tianli0.top/npm/aplayer/dist/APlayer.min.js',
    meting_js: 'https://cdn1.tianli0.top/gh/metowolf/MetingJS@1.2/dist/Meting.min.js',

    // Prism.js
    prismjs_js: 'https://cdn1.tianli0.top/npm/prismjs/prism.min.js',
    prismjs_lineNumber_js: 'https://cdn1.tianli0.top/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js',
    prismjs_autoloader: '/js/main/prism-autoloader.min.js'
  }

  // delete null value
  const deleteNullValue = obj => {
    for (const i in obj) {
      obj[i] === null && delete obj[i]
    }
    return obj
  }

  themeConfig.CDN = Object.assign(defaultCDN, deleteNullValue(themeConfig.CDN))

  /**
   * Capitalize the first letter of comment name
   */

  let { use } = themeConfig.comments

  if (!use) return

  if (typeof use === 'string') {
    use = use.split(',')
  }

  const newArray = use.map(item => item.toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase()))

  themeConfig.comments.use = newArray
})
