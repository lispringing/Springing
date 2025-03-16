//随机背景图片数组,图片可以换成图床链接，注意最后一条后面不要有逗号
var backimg =[
    "url(https://bu.dusays.com/2023/07/16/64b3eb0f0f00d.webp)",
    "url(https://bu.dusays.com/2023/07/16/64b3eb1eed051.webp)",
    "url(https://bu.dusays.com/2023/07/16/64b3eb36629fa.webp)",
    "url(https://bu.dusays.com/2023/07/16/64b3eb4ada88a.webp)",
    "url(https://bu.dusays.com/2023/07/16/64b3eb5b36426.webp)",
    "url(https://bu.dusays.com/2023/07/16/64b3eb717ac92.webp)",
    "url(https://bu.dusays.com/2023/07/16/64b3eb8683c19.webp)",
    "url(https://bu.dusays.com/2023/07/16/64b3eb9533290.webp)",
    "url(https://bu.dusays.com/2023/07/14/64b1469b71e1a.webp)",
    "url(https://bu.dusays.com/2023/07/20/64b91a1a31414.webp)"
  ];
  //获取背景图片总数，生成随机数
  var bgindex =Math.floor(Math.random() * backimg.length);
  //重设背景图片
  document.getElementById("web_bg").style.backgroundImage = backimg[bgindex];