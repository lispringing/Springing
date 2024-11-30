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


//分类条
function categoriesBarActive(){
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  console.log(urlinfo);
  //判断是否是首页
  if (urlinfo == '/'){
    if (document.querySelector('#category-bar')){
      document.getElementById('首页').classList.add("select")
    }
  }else {
    // 验证是否是分类链接
    var pattern = /\/categories\/.*?\//;
    var patbool = pattern.test(urlinfo);
    console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      if (document.querySelector('#category-bar')){
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  }
}
//鼠标控制分类条横向滚动
function topCategoriesBarScroll(){
  if (document.getElementById("category-bar-items")){
    let xscroll = document.getElementById("category-bar-items");
  xscroll.addEventListener("mousewheel", function (e) {
    //计算鼠标滚轮滚动的距离
    let v = -e.wheelDelta / 2;
    xscroll.scrollLeft += v;
    //阻止浏览器默认方法
    e.preventDefault();
}, false);
  }
}
categoriesBarActive()
topCategoriesBarScroll()



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

