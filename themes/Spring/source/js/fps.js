//fps帧率检测
document.addEventListener('pjax:complete', fps);
document.addEventListener('DOMContentLoaded', fps);
function fps(){
// if(window.localStorage.getItem("fpson")=="1"){ 
//如果要使博客设置上面的设置项能生效，就把上面一行取消注释
var rAF = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();
var frame = 0;
var allFrameCount = 0;
var lastTime = Date.now();
var lastFameTime = Date.now();
var loop = function () {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);
 
    lastFameTime = now;
    // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
    allFrameCount++;
    frame++;
 
    if (now > 1000 + lastTime) {
        var fps = Math.round((frame * 1000) / (now - lastTime));
        if(fps<=6){
            var kd=`<span style="color:#bd0000">帧率过低</span>`
        }
        else if(fps<=10){
            var kd=`<span style="color:red">帧率较低</span>`
        }
        else if(fps<=14){
            var kd=`<span style="color:black">帧率低</span>`
        }
        else if(fps<24){
            var kd=`<span style="color:orange">帧率一般</span>`
        }
        else if(fps<=40){
            var kd=`<span style="color:green">帧率较好</span>`
        }
        else{
            var kd=`<span style="color:#425aef">帧率正常</span>`
        }
        document.getElementById("fps").innerHTML=`FPS:${fps} ${kd}`;
        frame = 0;
        lastTime = now;
    };
 
    rAF(loop);
}

loop();
// }
// else{$("#fps").hide()}
//如果要使博客设置上面的设置项能生效，就把上面两行取消注释
}


