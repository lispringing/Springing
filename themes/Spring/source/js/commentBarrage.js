//在JS最上面加段代码，内容如下：
if (typeof (testjsflag) == "undefined") {
    var testjsflag;

const commentBarrageConfig = {
	//颜色
	colors:[
		['rgba(56,106,178,0.93)','rgba(255,255,255,0.8)'],
		['rgba(146, 72, 240,0.93)','rgba(255,255,255,0.8)'],
		['rgba(45, 165, 93,0.93)','rgba(255,255,255,0.8)'],
		['rgba(255, 197, 5,0.93)','rgba(255,255,255,0.9)'],
		['rgba(212, 78, 48,0.93)','rgba(255,255,255,0.8)']
	],
	//同时最多显示弹幕数
	maxBarrage: 2,
	//弹幕显示间隔时间ms
	barrageTime: 3000,
	//twikoo部署地址腾讯云的为环境ID
	twikooUrl: "https://twikoo.happyking.top",
	//token获取见上方
	accessToken: "034b789cb954d752ee9e8e146c9d1a91",
	pageUrl: window.location.pathname,
	barrageTimer: [],
	barrageList: [],
	barrageIndex: 0,
	dom: document.querySelector('.comment-barrage'),

}
function initCommentBarrage(){
	console.log('成功初始化文章弹幕列表x你知道太多了x')
		var data = JSON.stringify({
		  "event": "COMMENT_GET",
		  "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
		  "url": commentBarrageConfig.pageUrl
		});
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
		  if(this.readyState === 4) {
			commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
			commentBarrageConfig.dom.innerHTML = '';
		  }
		});
		xhr.open("POST", commentBarrageConfig.twikooUrl);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(data);

		setInterval(()=>{
			if(commentBarrageConfig.barrageList.length){
				popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
				commentBarrageConfig.barrageIndex += 1;
				commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
			}
			if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
				removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
			}
		},commentBarrageConfig.barrageTime)

}
function commentLinkFilter(data){
	data.sort((a,b)=>{
		return a.created - b.created;
	})
	let newData = [];
	data.forEach(item=>{
		newData.push(...getCommentReplies(item));
	});
	return newData;
}
function getCommentReplies(item){
	if(item.replies){
		let replies = [item];
		item.replies.forEach(item=>{
			replies.push(...getCommentReplies(item));
		})
		return replies;
	}else{
		return [];
	}
}
function popCommentBarrage(data){
	let barrage = document.createElement('div');
	let width = commentBarrageConfig.dom.clientWidth;
	let height = commentBarrageConfig.dom.clientHeight;
	barrage.className = 'comment-barrage-item'
	let ran = Math.floor(Math.random()*commentBarrageConfig.colors.length)
	barrage.style.background = commentBarrageConfig.colors[ran][0];
	barrage.style.color = commentBarrageConfig.colors[ran][1];

	barrage.innerHTML = `
		<div class="barrageHead">
			<div class="barrageNick">${data.nick}</div>
			<img class="barrageAvatar" src="https://cravatar.cn/avatar/${data.mailMd5}"/>
		</div>
		<div class="barrageContent">${data.comment}</div>
	`
	commentBarrageConfig.barrageTimer.push(barrage);
	commentBarrageConfig.dom.append(barrage);
}
function removeCommentBarrage(barrage){
	barrage.className = 'comment-barrage-item out';
	setTimeout(()=>{
		commentBarrageConfig.dom.removeChild(barrage);
	},1000)
}

initCommentBarrage()

}