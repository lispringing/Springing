//控制台输出相关信息
console.log(
  "CUSTOM.js挂载完毕"
)
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
var styleContent = `
color: rgb(30,152,255);
`
var title1 = '欢乐小王の博客'
var title2 = `                                
██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗   ██╗██╗  ██╗██╗███╗   ██╗ ██████╗ 
██║  ██║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██║ ██╔╝██║████╗  ██║██╔════╝ 
███████║███████║██████╔╝██████╔╝ ╚████╔╝ █████╔╝ ██║██╔██╗ ██║██║  ███╗
██╔══██║██╔══██║██╔═══╝ ██╔═══╝   ╚██╔╝  ██╔═██╗ ██║██║╚██╗██║██║   ██║
██║  ██║██║  ██║██║     ██║        ██║   ██║  ██╗██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
 ████████╗ ██████╗ ██████╗ 
 ╚══██╔══╝██╔═══██╗██╔══██╗
    ██║   ██║   ██║██████╔╝
    ██║   ██║   ██║██╔═══╝ 
 ██╗██║   ╚██████╔╝██║     
 ╚═╝╚═╝    ╚═════╝ ╚═╝                                                                                      
`
var content = `
❌你知道的太多了❌
驱动内核-Spring-已载入🌎
版本:Beta-迎春-12.32.5
“桃李春迎一杯酒,江湖夜雨十年灯.”
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)

;(function () {
  const STYLE_ID = 'control-center-style'
  const BUTTON_ID = 'control-center-button'
  const PANEL_ID = 'control-center-panel'

  const ensureStyle = () => {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
      #nav #${BUTTON_ID} { margin-left: .5rem; }
      #nav #${BUTTON_ID} { position: relative; }
      #nav #${BUTTON_ID} > a {
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #nav #${BUTTON_ID} .control-center-toggle.is-active {
        border-radius: 10px;
        background: rgba(10, 132, 255, 0.18);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
      }
      #nav #${BUTTON_ID} #${PANEL_ID} {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        z-index: 120;
        width: 320px;
        padding: 14px;
        border-radius: 16px;
        border: 1px solid rgba(210, 224, 244, 0.9);
        background: linear-gradient(145deg, rgba(244, 249, 255, 0.96), rgba(233, 242, 253, 0.92));
        box-shadow: 0 18px 42px rgba(10, 34, 68, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.94);
        backdrop-filter: blur(14px) saturate(130%);
        -webkit-backdrop-filter: blur(14px) saturate(130%);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-8px);
        transition: opacity .25s ease, transform .25s ease, visibility .25s ease;
      }
      #nav #${BUTTON_ID} #${PANEL_ID}.is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 12px;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-title {
        color: var(--caojunyi);
        font-size: 14px;
        font-weight: 700;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-subtitle {
        color: var(--caojunyi);
        opacity: .72;
        font-size: 12px;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-bottom: 12px;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-tile {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(208, 221, 241, 0.88);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.8);
        color: var(--caojunyi);
        font-size: 13px;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-sliders {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-slider-label {
        display: block;
        margin-bottom: 6px;
        color: var(--caojunyi);
        opacity: .72;
        font-size: 12px;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-slider-track {
        width: 100%;
        height: 8px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.86);
        border: 1px solid rgba(210, 224, 244, 0.9);
        overflow: hidden;
      }
      #nav #${BUTTON_ID} #${PANEL_ID} .cc-slider-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #4a8cf7 0%, #63b3ff 100%);
      }
      @media screen and (max-width: 768px) {
        #nav #${BUTTON_ID},
        #nav #${BUTTON_ID} #${PANEL_ID} {
          display: none !important;
        }
      }
      #nav.hide-menu #${BUTTON_ID},
      #nav.hide-menu #${BUTTON_ID} #${PANEL_ID} {
        display: none !important;
      }
      [data-theme='dark'] #nav #${BUTTON_ID} #${PANEL_ID} {
        border-color: rgba(97, 115, 140, 0.72);
        background: linear-gradient(145deg, rgba(34, 43, 57, 0.94), rgba(23, 30, 41, 0.9));
        box-shadow: 0 22px 46px rgba(0, 8, 20, 0.56), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(12px) saturate(120%);
        -webkit-backdrop-filter: blur(12px) saturate(120%);
      }
      [data-theme='dark'] #nav #${BUTTON_ID} .control-center-toggle.is-active {
        background: rgba(10, 132, 255, 0.22);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
      [data-theme='dark'] #nav #${BUTTON_ID} #${PANEL_ID} .cc-tile {
        background: rgba(49, 60, 77, 0.78);
        border-color: rgba(104, 123, 149, 0.58);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
      [data-theme='dark'] #nav #${BUTTON_ID} #${PANEL_ID} .cc-slider-track {
        background: rgba(49, 60, 77, 0.8);
        border-color: rgba(104, 123, 149, 0.58);
      }
    `
    document.head.appendChild(style)
  }

  const closePanel = () => {
    const toggle = document.querySelector(`#${BUTTON_ID} .control-center-toggle`)
    const panel = document.getElementById(PANEL_ID)
    if (!toggle || !panel) return
    toggle.classList.remove('is-active')
    toggle.setAttribute('aria-expanded', 'false')
    panel.classList.remove('is-open')
    panel.setAttribute('aria-hidden', 'true')
  }

  const shouldEnable = () => {
    const nav = document.getElementById('nav')
    if (!nav) return false
    if (window.innerWidth < 992) return false
    if (nav.classList.contains('hide-menu')) return false
    return true
  }

  const initControlCenter = () => {
    const menus = document.querySelector('#nav #menus')
    if (!menus) return

    const oldButton = document.getElementById(BUTTON_ID)
    const oldPanel = document.getElementById(PANEL_ID)
    oldButton && oldButton.remove()
    oldPanel && oldPanel.remove()

    if (!shouldEnable()) return

    const button = document.createElement('div')
    button.id = BUTTON_ID
    button.className = 'nav-button'
    button.innerHTML = `
      <a class="site-page social-icon control-center-toggle" title="Control Center" aria-label="Control Center" aria-controls="${PANEL_ID}" aria-expanded="false">
        <i class="fas fa-sliders-h fa-fw"></i>
      </a>
    `

    const panel = document.createElement('div')
    panel.id = PANEL_ID
    panel.setAttribute('aria-hidden', 'true')
    panel.innerHTML = `
      <div class="cc-header">
        <span class="cc-title">Control Center</span>
        <span class="cc-subtitle">Coming Soon</span>
      </div>
      <div class="cc-grid">
        <div class="cc-tile"><i class="fas fa-wifi fa-fw"></i><span>Wi-Fi</span></div>
        <div class="cc-tile"><i class="fas fa-bluetooth-b fa-fw"></i><span>Bluetooth</span></div>
        <div class="cc-tile"><i class="fas fa-bell fa-fw"></i><span>Alerts</span></div>
        <div class="cc-tile"><i class="fas fa-moon fa-fw"></i><span>Focus</span></div>
      </div>
      <div class="cc-sliders">
        <div>
          <span class="cc-slider-label">Brightness</span>
          <div class="cc-slider-track"><div class="cc-slider-fill" style="width:68%"></div></div>
        </div>
        <div>
          <span class="cc-slider-label">Volume</span>
          <div class="cc-slider-track"><div class="cc-slider-fill" style="width:42%"></div></div>
        </div>
      </div>
    `

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
    button.appendChild(panel)

    const toggle = button.querySelector('.control-center-toggle')
    toggle.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      const willOpen = !panel.classList.contains('is-open')
      if (willOpen) {
        toggle.classList.add('is-active')
        toggle.setAttribute('aria-expanded', 'true')
        panel.classList.add('is-open')
        panel.setAttribute('aria-hidden', 'false')
      } else {
        closePanel()
      }
    })

    panel.addEventListener('click', (e) => e.stopPropagation())
  }

  ensureStyle()
  initControlCenter()

  if (!window.__ccGlobalBinded__) {
    window.__ccGlobalBinded__ = true
    document.addEventListener('click', closePanel)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel()
    })
    window.addEventListener('resize', () => {
      closePanel()
      initControlCenter()
    })
    document.addEventListener('pjax:complete', () => {
      closePanel()
      initControlCenter()
    })
  }
})()

