//这里可以定义弹幕的背景色与字体色
const barrageColors = [
	['#386adecc','#fffa'],
	['#9248f0cc','#fffa'],
	['#2da55dcc','#fffa'],
	['#ffc505cc','#fffc'],
	['#d44e30cc','#fffa']
]
//这两个是与随机位置的范围相关的
const maxBarrageWidth = 150;
const maxBarrageHeight = 100;
//最多同时显示的弹幕个数
const maxBarrage = 10;
//每个弹幕的间隔时间
const barrageTime = 1500;
//我用的是Vercel部署，这里链接就是Vercel的链接，腾讯云的自己琢磨一下哈，应该也差不多
const twikooUrl = "https://twikoo.happyking.top/";
//token要手动获取（反正我是开发者工具里获取的，教程在下面
const accessToken = "034b789cb954d752ee9e8e146c9d1a91";
const pageUrl = "/comments/"


const barrageTimer = [];
let barrageList = [];
let barrageIndex = 0;


const barrageDom = document.getElementById('barrage-container');
window.addEventListener('load',()=>{

	var data = JSON.stringify({
	  "event": "COMMENT_GET",
	  "accessToken": accessToken,
	  "url": pageUrl
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function() {
	  if(this.readyState === 4) {
		barrageList = linkFilter(JSON.parse(this.responseText).data);
		barrageDom.innerHTML = '';
	  }
	});

	xhr.open("POST", twikooUrl);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(data);

	setInterval(()=>{
		if(barrageList.length){
			popBarrage(barrageList[barrageIndex]);
			barrageIndex += 1;
			barrageIndex %= barrageList.length;
		}
		if(barrageTimer.length > (barrageList.length > maxBarrage?maxBarrage:barrageList.length)){
			removeBarrage(barrageTimer.shift())
		}
	},barrageTime)
})






function linkFilter(data){
	const newData = data.filter((comment)=>{
		return !comment.master;
	})
	return newData;
}
function popBarrage(data){
	let barrage = document.createElement('div');
	let width = barrageDom.clientWidth;
	let height = barrageDom.clientHeight;
	barrage.className = 'barrage'
	barrage.style.top = Math.floor(Math.random()*(height - maxBarrageHeight))+'px';
	barrage.style.left = Math.floor(Math.random()*(width - maxBarrageWidth))+'px';
	let ran = Math.floor(Math.random()*barrageColors.length)
	barrage.style.background = barrageColors[ran][0];
	barrage.style.color = barrageColors[ran][1];

	barrage.innerHTML = `
		<div class="barrageHead">
			<img class="barrageAvatar" src="https://cravatar.cn/avatar/${data.mailMd5}"/>
			<div class="barrageNick">${data.nick}</div>
		</div>
		<div class="barrageContent">${data.comment}</div>
	`
	barrageTimer.push(barrage);
	barrageDom.append(barrage);
    //防止溢出（这里防止随机位置产生的溢出，弹幕太大产生的溢出就要靠css了
	if(barrage.clientWidth+parseInt(barrage.style.left)>width){
		barrage.style.left = (width - barrage.clientWidth) + 'px';
	}
	if(barrage.clientHeight+parseInt(barrage.style.top)>height){
		barrage.style.top = (height - barrage.clientHeight) + 'px';
	}
}
function removeBarrage(barrage){
	barrage.className = 'barrage out';
	setTimeout(()=>{
		barrageDom.removeChild(barrage);
	},1000)
}
