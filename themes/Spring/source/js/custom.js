//控制台输出相关信息
console.log(
  "CUSTOM.js挂载完毕"
)

// 隐藏全局滚动条
;(function () {
  const id = 'global-hide-scrollbar'
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  style.textContent = `
    html, body { scrollbar-width: none; -ms-overflow-style: none; }
    html::-webkit-scrollbar, body::-webkit-scrollbar { display: none; width: 0; height: 0; }
    * { scrollbar-width: none; -ms-overflow-style: none; }
    *::-webkit-scrollbar { display: none; width: 0; height: 0; }
  `
  document.head.appendChild(style)
})()

// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标
  result <= 99 || (result = 99), (btn.innerHTML = result);
}
document.getElementById("page-name").innerText = document.title.split(" | 欢乐小王")[0];
function scrollToTop(){
  document.getElementsByClassName("menus_items")[1].setAttribute("style","");
  document.getElementById("name-container").setAttribute("style","display:none");
  btf.scrollToDest(0, 500);
}



//控制弹幕显隐
function switchCommentBarrage(){
    let commentBarrage = document.querySelector('.comment-barrage');
    if(commentBarrage){
        $(commentBarrage).toggle()
    }
}


//控制台输出字符
//console.clear();
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`
var styleTitle3 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleContent = `
color: rgb(30,152,255);
`
var title1 = '小春子の博客'
var title2 = `                                
███████╗██████╗ ██████╗ ██╗███╗   ██╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
██╔════╝██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝ 
███████╗██████╔╝██████╔╝██║██╔██╗ ██║██║  ███╗██║██╔██╗ ██║██║  ███╗
╚════██║██╔═══╝ ██╔══██╗██║██║╚██╗██║██║   ██║██║██║╚██╗██║██║   ██║
███████║██║     ██║  ██║██║██║ ╚████║╚██████╔╝██║██║ ╚████║╚██████╔╝
╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝                                                                                   
`
var title3 = '成功打开控制台 婧怡大王颜值+1 身高+1 财富+1 健康+1'
var content = `
🐟运行框架目前版本：鲸鱼1.0.8
🎣最新框架版本：鲸鱼1.0.9 Beta
控制台输入update删除本地缓存并更新框架
`
console.log(`%c${title1} %c${title2} %c${title3}
%c${content}`, styleTitle1, styleTitle2, styleTitle3 ,styleContent)

;(function () {
  const STYLE_ID = 'ios18-cc-style'
  const BUTTON_ID = 'control-center-button'
  const OVERLAY_ID = 'ios18-control-center'

  const ensureStyle = () => {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      /* ===== 导航栏按钮 ===== */
      #nav #${BUTTON_ID} { margin-left: .5rem; position: relative; }
      #nav #${BUTTON_ID} > a {
        width: 35px; height: 35px;
        display: flex; align-items: center; justify-content: center;
        transition: all .3s cubic-bezier(.4,0,.2,1);
      }
      #nav #${BUTTON_ID} .cc-toggle-btn.is-active {
        border-radius: 12px;
        background: rgba(10, 132, 255, 0.22);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
      }

      /* ===== 全屏覆盖层 - 真全屏，不滚动 ===== */
      #${OVERLAY_ID} {
        position: fixed; inset: 0;
        z-index: 9999;
        display: flex; flex-direction: column;
        padding: 48px 20px 20px;
        opacity: 0; visibility: hidden; pointer-events: none;
        transform: scale(0.94);
        transition: opacity .35s cubic-bezier(.4,0,.2,1),
                    transform .4s cubic-bezier(.4,0,.2,1),
                    visibility .35s;
        overflow: hidden;
      }
      #${OVERLAY_ID}.is-open {
        opacity: 1; visibility: visible; pointer-events: auto;
        transform: scale(1);
      }
      /* 打开时锁定背景滚动 */
      body.cc-lock-scroll { overflow: hidden !important; height: 100vh; }

      /* 液态玻璃背景 - 多层叠加 */
      #${OVERLAY_ID}::before {
        content: '';
        position: absolute; inset: 0;
        background:
          radial-gradient(ellipse 90% 60% at 20% 0%, rgba(130,190,255,0.4), transparent 55%),
          radial-gradient(ellipse 70% 50% at 90% 20%, rgba(200,140,255,0.3), transparent 50%),
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(100,220,255,0.25), transparent 55%),
          linear-gradient(160deg, rgba(250,252,255,0.75) 0%, rgba(235,243,255,0.6) 50%, rgba(225,238,255,0.65) 100%);
        backdrop-filter: blur(80px) saturate(200%);
        -webkit-backdrop-filter: blur(80px) saturate(200%);
        z-index: -2;
      }
      /* 边缘高光折射层 */
      #${OVERLAY_ID}::after {
        content: '';
        position: absolute; inset: 0;
        background:
          linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 15%, transparent 40%, transparent 70%, rgba(255,255,255,0.2) 100%);
        pointer-events: none;
        z-index: -1;
      }

      /* ===== 内容滚动区（只有这里能滚，滚动条隐藏） ===== */
      .cc-scroll {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 4px;
      }
      .cc-scroll::-webkit-scrollbar { display: none; width: 0; height: 0; }

      /* ===== 内容容器 ===== */
      .cc-content {
        width: 100%;
        max-width: 680px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin: auto 0;
      }

      /* ===== 液态玻璃卡片基础 ===== */
      .cc-card {
        border-radius: 28px;
        background: rgba(255,255,255,0.32);
        backdrop-filter: blur(30px) saturate(180%);
        -webkit-backdrop-filter: blur(30px) saturate(180%);
        border: 1px solid rgba(255,255,255,0.6);
        box-shadow:
          0 12px 40px rgba(31,38,135,0.15),
          0 2px 8px rgba(31,38,135,0.08),
          inset 0 1px 0 rgba(255,255,255,0.9),
          inset 0 -1px 0 rgba(255,255,255,0.25);
        padding: 18px;
        position: relative;
        overflow: hidden;
        transition: transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s;
      }
      .cc-card:active { transform: scale(0.97); }
      .cc-card::after {
        content: '';
        position: absolute; top: 0; left: 0; right: 0; height: 55%;
        background: linear-gradient(180deg, rgba(255,255,255,0.35), transparent);
        border-radius: 28px 28px 0 0;
        pointer-events: none;
      }

      /* ===== 连接性卡片 ===== */
      .cc-connectivity {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .cc-conn-item {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 12px;
        border-radius: 18px;
        background: rgba(255,255,255,0.4);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(255,255,255,0.5);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
        cursor: pointer;
        transition: all .25s cubic-bezier(.4,0,.2,1);
        position: relative; z-index: 1;
      }
      .cc-conn-item:hover {
        background: rgba(255,255,255,0.6);
        transform: translateY(-1px);
      }
      .cc-conn-item.active {
        background: linear-gradient(135deg, rgba(10,132,255,0.9), rgba(0,100,220,0.85));
        color: #fff;
        border-color: rgba(255,255,255,0.35);
        box-shadow: 0 4px 16px rgba(10,132,255,0.4), inset 0 1px 0 rgba(255,255,255,0.3);
      }
      .cc-conn-icon {
        width: 30px; height: 30px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 50%;
        background: rgba(255,255,255,0.55);
        font-size: 13px;
        flex-shrink: 0;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
      }
      .cc-conn-item.active .cc-conn-icon {
        background: rgba(255,255,255,0.25);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
      }
      .cc-conn-label { font-size: 12px; font-weight: 600; }

      /* ===== 音乐卡片 ===== */
      .cc-music {
        display: flex; flex-direction: column; justify-content: space-between;
        gap: 14px;
      }
      .cc-music-info { display: flex; align-items: center; gap: 12px; position: relative; z-index: 1; }
      .cc-music-cover {
        width: 46px; height: 46px; border-radius: 12px;
        background: linear-gradient(135deg, #ff6b6b, #feca57);
        display: flex; align-items: center; justify-content: center;
        font-size: 18px; color: #fff;
        box-shadow: 0 6px 16px rgba(255,107,107,0.45), inset 0 1px 0 rgba(255,255,255,0.4);
        flex-shrink: 0;
      }
      .cc-music-text { flex: 1; min-width: 0; }
      .cc-music-title {
        font-size: 14px; font-weight: 700; color: #1c1c1e;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .cc-music-artist {
        font-size: 11px; color: #1c1c1e; opacity: 0.5; margin-top: 3px;
      }
      .cc-music-controls {
        display: flex; justify-content: center; gap: 24px;
        font-size: 18px; color: #1c1c1e;
        position: relative; z-index: 1;
      }
      .cc-music-controls i { cursor: pointer; transition: transform .2s; opacity: 0.8; }
      .cc-music-controls i:hover { transform: scale(1.2); opacity: 1; }

      /* ===== 搜索框 ===== */
      .cc-search {
        grid-column: 1 / -1;
        border-radius: 28px;
        background: rgba(255,255,255,0.32);
        backdrop-filter: blur(30px) saturate(180%);
        -webkit-backdrop-filter: blur(30px) saturate(180%);
        border: 1px solid rgba(255,255,255,0.6);
        box-shadow:
          0 12px 40px rgba(31,38,135,0.12),
          inset 0 1px 0 rgba(255,255,255,0.9),
          inset 0 -1px 0 rgba(255,255,255,0.25);
        padding: 16px 20px;
        display: flex; align-items: center; gap: 14px;
        position: relative; overflow: hidden;
        transition: all .3s cubic-bezier(.4,0,.2,1);
      }
      .cc-search::after {
        content: '';
        position: absolute; top: 0; left: 0; right: 0; height: 55%;
        background: linear-gradient(180deg, rgba(255,255,255,0.35), transparent);
        border-radius: 28px 28px 0 0; pointer-events: none;
      }
      .cc-search:focus-within {
        border-color: rgba(10,132,255,0.6);
        box-shadow:
          0 12px 40px rgba(10,132,255,0.25),
          0 0 0 4px rgba(10,132,255,0.1),
          inset 0 1px 0 rgba(255,255,255,0.9);
        transform: translateY(-1px);
      }
      .cc-search-icon {
        font-size: 18px; color: #1c1c1e; opacity: 0.45;
        position: relative; z-index: 1; flex-shrink: 0;
      }
      .cc-search-input {
        flex: 1;
        background: transparent;
        border: none; outline: none;
        font-size: 16px; color: #1c1c1e;
        font-family: inherit; font-weight: 500;
        position: relative; z-index: 1;
      }
      .cc-search-input::placeholder { color: #1c1c1e; opacity: 0.35; }
      .cc-search-hint {
        font-size: 11px; color: #1c1c1e; opacity: 0.35;
        position: relative; z-index: 1; flex-shrink: 0;
        padding: 3px 8px;
        border-radius: 8px;
        background: rgba(255,255,255,0.4);
        border: 1px solid rgba(255,255,255,0.5);
      }

      /* ===== 快捷开关 ===== */
      .cc-toggles {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }
      .cc-toggle {
        aspect-ratio: 1;
        border-radius: 22px;
        background: rgba(255,255,255,0.32);
        backdrop-filter: blur(30px) saturate(180%);
        -webkit-backdrop-filter: blur(30px) saturate(180%);
        border: 1px solid rgba(255,255,255,0.6);
        box-shadow:
          0 6px 20px rgba(31,38,135,0.12),
          inset 0 1px 0 rgba(255,255,255,0.9),
          inset 0 -1px 0 rgba(255,255,255,0.2);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 6px; cursor: pointer;
        transition: all .25s cubic-bezier(.4,0,.2,1);
        position: relative; overflow: hidden;
      }
      .cc-toggle::after {
        content: '';
        position: absolute; top: 0; left: 0; right: 0; height: 55%;
        background: linear-gradient(180deg, rgba(255,255,255,0.3), transparent);
        border-radius: 22px 22px 0 0; pointer-events: none;
      }
      .cc-toggle:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(31,38,135,0.18), inset 0 1px 0 rgba(255,255,255,0.9); }
      .cc-toggle:active { transform: scale(0.93); }
      .cc-toggle.active {
        background: linear-gradient(135deg, rgba(10,132,255,0.92), rgba(0,100,220,0.88));
        border-color: rgba(255,255,255,0.35);
        box-shadow: 0 8px 28px rgba(10,132,255,0.45), inset 0 1px 0 rgba(255,255,255,0.35);
      }
      .cc-toggle-icon {
        font-size: 19px; color: #1c1c1e;
        position: relative; z-index: 1;
      }
      .cc-toggle.active .cc-toggle-icon { color: #fff; }
      .cc-toggle-label {
        font-size: 10px; font-weight: 600; color: #1c1c1e; opacity: 0.65;
        position: relative; z-index: 1;
      }
      .cc-toggle.active .cc-toggle-label { color: #fff; opacity: 0.95; }

      /* ===== 底部 Home Indicator ===== */
      .cc-home-indicator {
        width: 130px; height: 5px;
        border-radius: 999px;
        background: rgba(0,0,0,0.25);
        box-shadow: 0 1px 0 rgba(255,255,255,0.3);
        margin: 18px auto 0;
        cursor: pointer;
        flex-shrink: 0;
      }

      /* ===== 暗夜模式完整适配 ===== */
      [data-theme='dark'] #${OVERLAY_ID}::before {
        background:
          radial-gradient(ellipse 90% 60% at 20% 0%, rgba(40,80,160,0.5), transparent 55%),
          radial-gradient(ellipse 70% 50% at 90% 20%, rgba(100,50,160,0.4), transparent 50%),
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(20,80,140,0.35), transparent 55%),
          linear-gradient(160deg, rgba(18,22,32,0.85) 0%, rgba(12,16,26,0.78) 50%, rgba(15,20,32,0.82) 100%);
      }
      [data-theme='dark'] #${OVERLAY_ID}::after {
        background:
          linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 15%, transparent 40%, transparent 70%, rgba(255,255,255,0.06) 100%);
      }
      [data-theme='dark'] .cc-card,
      [data-theme='dark'] .cc-search,
      [data-theme='dark'] .cc-toggle {
        background: rgba(35,42,58,0.55);
        border-color: rgba(255,255,255,0.12);
        box-shadow:
          0 12px 40px rgba(0,0,0,0.5),
          0 2px 8px rgba(0,0,0,0.3),
          inset 0 1px 0 rgba(255,255,255,0.12),
          inset 0 -1px 0 rgba(255,255,255,0.04);
      }
      [data-theme='dark'] .cc-card::after,
      [data-theme='dark'] .cc-search::after,
      [data-theme='dark'] .cc-toggle::after {
        background: linear-gradient(180deg, rgba(255,255,255,0.1), transparent);
      }
      [data-theme='dark'] .cc-conn-item {
        background: rgba(255,255,255,0.07);
        border-color: rgba(255,255,255,0.1);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        color: #fff;
      }
      [data-theme='dark'] .cc-conn-item:hover {
        background: rgba(255,255,255,0.12);
      }
      [data-theme='dark'] .cc-conn-item.active {
        background: linear-gradient(135deg, rgba(10,132,255,0.9), rgba(0,90,200,0.85));
        border-color: rgba(255,255,255,0.25);
        box-shadow: 0 4px 16px rgba(10,132,255,0.5), inset 0 1px 0 rgba(255,255,255,0.25);
      }
      [data-theme='dark'] .cc-conn-icon {
        background: rgba(255,255,255,0.1);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
        color: #fff;
      }
      [data-theme='dark'] .cc-conn-item.active .cc-conn-icon {
        background: rgba(255,255,255,0.2);
      }
      [data-theme='dark'] .cc-music-title { color: #fff; }
      [data-theme='dark'] .cc-music-artist { color: #fff; opacity: 0.5; }
      [data-theme='dark'] .cc-music-controls { color: #fff; }
      [data-theme='dark'] .cc-search-icon { color: #fff; opacity: 0.5; }
      [data-theme='dark'] .cc-search-input { color: #fff; }
      [data-theme='dark'] .cc-search-input::placeholder { color: #fff; opacity: 0.35; }
      [data-theme='dark'] .cc-search-hint {
        color: #fff; opacity: 0.5;
        background: rgba(255,255,255,0.08);
        border-color: rgba(255,255,255,0.12);
      }
      [data-theme='dark'] .cc-search:focus-within {
        border-color: rgba(10,132,255,0.6);
        box-shadow: 0 12px 40px rgba(10,132,255,0.35), 0 0 0 4px rgba(10,132,255,0.15), inset 0 1px 0 rgba(255,255,255,0.15);
      }
      [data-theme='dark'] .cc-toggle:hover {
        box-shadow: 0 10px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
      }
      [data-theme='dark'] .cc-toggle.active {
        background: linear-gradient(135deg, rgba(10,132,255,0.95), rgba(0,90,200,0.9));
        border-color: rgba(255,255,255,0.25);
        box-shadow: 0 8px 28px rgba(10,132,255,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
      }
      [data-theme='dark'] .cc-toggle-icon { color: #fff; opacity: 0.9; }
      [data-theme='dark'] .cc-toggle-label { color: #fff; opacity: 0.6; }
      [data-theme='dark'] .cc-home-indicator {
        background: rgba(255,255,255,0.3);
        box-shadow: 0 1px 0 rgba(0,0,0,0.3);
      }

      /* ===== 响应式自适应 ===== */
      @media (max-width: 768px) {
        #${OVERLAY_ID} { padding: 40px 16px 16px; }
        .cc-toggles { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cc-content { max-width: 560px; gap: 12px; }
        .cc-card, .cc-search { padding: 16px; border-radius: 24px; }
        .cc-toggle { border-radius: 20px; }
      }
      @media (max-width: 480px) {
        #${OVERLAY_ID} { padding: 32px 12px 12px; }
        .cc-content {
          grid-template-columns: 1fr;
          max-width: 360px;
          gap: 12px;
        }
        .cc-toggles { grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cc-card, .cc-search { padding: 14px; border-radius: 22px; }
        .cc-toggle { border-radius: 18px; }
        .cc-toggle-icon { font-size: 17px; }
      }
      @media (max-width: 360px) {
        .cc-toggles { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 768px) {
        #nav #${BUTTON_ID} { display: none !important; }
      }
      #nav.hide-menu #${BUTTON_ID} { display: none !important; }
    `
    document.head.appendChild(style)
  }

  const closePanel = () => {
    const overlay = document.getElementById(OVERLAY_ID)
    const toggle = document.querySelector(`#${BUTTON_ID} .cc-toggle-btn`)
    if (overlay) {
      overlay.classList.remove('is-open')
      overlay.setAttribute('aria-hidden', 'true')
    }
    if (toggle) {
      toggle.classList.remove('is-active')
      toggle.setAttribute('aria-expanded', 'false')
    }
    document.body.classList.remove('cc-lock-scroll')
  }

  const openPanel = () => {
    const overlay = document.getElementById(OVERLAY_ID)
    const toggle = document.querySelector(`#${BUTTON_ID} .cc-toggle-btn`)
    if (overlay) {
      overlay.classList.add('is-open')
      overlay.setAttribute('aria-hidden', 'false')
      const scroll = overlay.querySelector('.cc-scroll')
      if (scroll) scroll.scrollTop = 0
      // 搜索框自动聚焦
      setTimeout(() => {
        const input = overlay.querySelector('.cc-search-input')
        if (input) input.focus()
      }, 300)
    }
    if (toggle) {
      toggle.classList.add('is-active')
      toggle.setAttribute('aria-expanded', 'true')
    }
    document.body.classList.add('cc-lock-scroll')
  }

  const shouldEnable = () => {
    const nav = document.getElementById('nav')
    if (!nav) return false
    if (window.innerWidth < 768) return false
    if (nav.classList.contains('hide-menu')) return false
    return true
  }

  const initControlCenter = () => {
    const menus = document.querySelector('#nav #menus')
    if (!menus) return

    const oldButton = document.getElementById(BUTTON_ID)
    const oldOverlay = document.getElementById(OVERLAY_ID)
    oldButton && oldButton.remove()
    oldOverlay && oldOverlay.remove()

    if (!shouldEnable()) return

    // 导航栏按钮
    const button = document.createElement('div')
    button.id = BUTTON_ID
    button.className = 'nav-button'
    button.innerHTML = `
      <a class="site-page social-icon cc-toggle-btn" title="控制中心" aria-label="控制中心" aria-expanded="false">
        <i class="fas fa-sliders-h fa-fw"></i>
      </a>
    `

    // 全屏覆盖层
    const overlay = document.createElement('div')
    overlay.id = OVERLAY_ID
    overlay.setAttribute('aria-hidden', 'true')
    overlay.innerHTML = `
      <div class="cc-scroll">
        <div class="cc-content">
          <div class="cc-card cc-connectivity">
            <div class="cc-conn-item active" data-action="wifi">
              <div class="cc-conn-icon"><i class="fas fa-wifi"></i></div>
              <span class="cc-conn-label">Wi-Fi</span>
            </div>
            <div class="cc-conn-item active" data-action="bluetooth">
              <div class="cc-conn-icon"><i class="fab fa-bluetooth-b"></i></div>
              <span class="cc-conn-label">蓝牙</span>
            </div>
            <div class="cc-conn-item" data-action="airplane">
              <div class="cc-conn-icon"><i class="fas fa-plane"></i></div>
              <span class="cc-conn-label">飞行</span>
            </div>
            <div class="cc-conn-item" data-action="cellular">
              <div class="cc-conn-icon"><i class="fas fa-signal"></i></div>
              <span class="cc-conn-label">蜂窝</span>
            </div>
          </div>

          <div class="cc-card cc-music">
            <div class="cc-music-info">
              <div class="cc-music-cover"><i class="fas fa-music"></i></div>
              <div class="cc-music-text">
                <div class="cc-music-title">未在播放</div>
                <div class="cc-music-artist">Springing Blog</div>
              </div>
            </div>
            <div class="cc-music-controls">
              <i class="fas fa-backward"></i>
              <i class="fas fa-play-circle"></i>
              <i class="fas fa-forward"></i>
            </div>
          </div>

          <div class="cc-search">
            <i class="fas fa-search cc-search-icon"></i>
            <input type="text" class="cc-search-input" placeholder="搜索文章..." autocomplete="off">
            <span class="cc-search-hint">回车</span>
          </div>

          <div class="cc-toggles">
            <div class="cc-toggle" data-action="theme">
              <i class="fas fa-moon cc-toggle-icon"></i>
              <span class="cc-toggle-label">深色</span>
            </div>
            <div class="cc-toggle active" data-action="search">
              <i class="fas fa-search cc-toggle-icon"></i>
              <span class="cc-toggle-label">搜索</span>
            </div>
            <div class="cc-toggle" data-action="top">
              <i class="fas fa-arrow-up cc-toggle-icon"></i>
              <span class="cc-toggle-label">顶部</span>
            </div>
            <div class="cc-toggle" data-action="barrage">
              <i class="fas fa-comment-dots cc-toggle-icon"></i>
              <span class="cc-toggle-label">弹幕</span>
            </div>
            <div class="cc-toggle" data-action="rotate">
              <i class="fas fa-lock cc-toggle-icon"></i>
              <span class="cc-toggle-label">旋转锁</span>
            </div>
            <div class="cc-toggle" data-action="focus">
              <i class="fas fa-moon cc-toggle-icon"></i>
              <span class="cc-toggle-label">专注</span>
            </div>
            <div class="cc-toggle" data-action="flashlight">
              <i class="fas fa-flashlight cc-toggle-icon"></i>
              <span class="cc-toggle-label">手电</span>
            </div>
            <div class="cc-toggle" data-action="timer">
              <i class="fas fa-stopwatch cc-toggle-icon"></i>
              <span class="cc-toggle-label">计时</span>
            </div>
          </div>
        </div>
        <div class="cc-home-indicator"></div>
      </div>
    `

    // 插入按钮
    const searchButton = document.getElementById('search-button')
    if (searchButton && searchButton.parentNode === menus) {
      searchButton.insertAdjacentElement('afterend', button)
    } else {
      const darkmodeButton = document.getElementById('darkmode_navswitch')
      if (darkmodeButton && darkmodeButton.parentNode === menus) {
        darkmodeButton.insertAdjacentElement('beforebegin', button)
      } else {
        menus.insertBefore(button, menus.firstChild)
      }
    }

    document.body.appendChild(overlay)

    // 按钮切换
    const toggleBtn = button.querySelector('.cc-toggle-btn')
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (overlay.classList.contains('is-open')) closePanel()
      else openPanel()
    })

    // 连接性切换
    overlay.querySelectorAll('.cc-conn-item').forEach(item => {
      item.addEventListener('click', () => item.classList.toggle('active'))
    })

    // 快捷开关
    overlay.querySelectorAll('.cc-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const action = toggle.dataset.action
        toggle.classList.toggle('active')
        switch (action) {
          case 'theme':
            const root = document.documentElement
            const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            root.setAttribute('data-theme', newTheme)
            try { localStorage.setItem('theme', newTheme) } catch(e) {}
            document.dispatchEvent(new CustomEvent('themeChange', { detail: newTheme }))
            break
          case 'search':
            closePanel()
            setTimeout(() => {
              const sb = document.getElementById('search-button')
              if (sb) sb.click()
            }, 300)
            break
          case 'top':
            closePanel()
            setTimeout(() => {
              if (typeof btf !== 'undefined' && btf.scrollToDest) btf.scrollToDest(0, 500)
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }, 300)
            break
          case 'barrage':
            if (typeof switchCommentBarrage === 'function') switchCommentBarrage()
            break
        }
      })
    })

    // 搜索框：调用博客自带本地搜索
    const searchInput = overlay.querySelector('.cc-search-input')
    if (searchInput) {
      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const keyword = searchInput.value.trim()
          closePanel()
          setTimeout(() => {
            // 触发博客搜索按钮
            const searchBtn = document.querySelector('#search-button > .search')
            if (searchBtn) searchBtn.click()
            // 填入关键词并触发搜索
            setTimeout(() => {
              const input = document.querySelector('#local-search-input input')
              if (input) {
                input.value = keyword
                input.dispatchEvent(new Event('input'))
                input.focus()
              }
            }, 400)
          }, 250)
        }
      })
    }

    // 点击空白关闭（点卡片/开关/搜索框/连接项/音乐按钮不关闭）
    overlay.addEventListener('click', e => {
      if (e.target.closest('.cc-card, .cc-toggle, .cc-search, .cc-conn-item, .cc-music-controls')) return
      closePanel()
    })
  }

  ensureStyle()
  initControlCenter()

  if (!window.__ccGlobalBinded__) {
    window.__ccGlobalBinded__ = true
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel() })
    window.addEventListener('resize', () => { closePanel(); initControlCenter() })
    document.addEventListener('pjax:complete', () => { closePanel(); initControlCenter() })
  }
})()

