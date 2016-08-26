/*
 * Copy Right: tonytony.club
 * Comments: 适用于 http://trade-z.jd.com/funding/mychip.action
 * Author: kundy
 * Date: 2016-04-21
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,2500);



function init(){
	console.log("[chouma_jd.js start]");
	var user_name ="";
	var sign_click = -1;
	var chouma_num = 0

	//获取用户名
    if(document.querySelectorAll(".name").length>0){
        user_name=document.querySelectorAll(".name")[0].innerText;
    }

	//点击签到
	$(".chouma_box a").attr("target","_self");
	if($(".banner-container button.btn").length>0){
		click_btn($(".banner-container button.btn")[0])
		sign_click = 1;
	}
	else{//没有签到按钮，说明已经签到
		sign_click = 0;  
    }

	//获取之前筹码数量
	if(document.querySelectorAll(".user .usable .num a").length>0)
		chouma_num = parseInt(document.querySelectorAll(".user .usable .num a")[0].innerText);

	var msg = {type:"JD",name:"chouma_click",id:user_name,sign:sign_click};

	setTimeout(function(){
		post_parent(msg);

		setTimeout(function(){get_credit(chouma_num)},1500);
	},1000)
	
}

//获取筹码数量
function get_credit(lastcnum){
	var chouma_num = 0;
	var tonum = lastcnum;

	if(document.querySelectorAll(".user .usable .num a").length>0)
		chouma_num = parseInt(document.querySelectorAll(".user .usable .num a")[0].innerText);
	if(chouma_num - lastcnum > 0)
		tonum = chouma_num - lastcnum
	
	var msg = {type:"JD",name:"chouma_num",num:tonum,total:chouma_num};
	post_parent(msg);
}


function click_btn(obj){
    var evt = document.createEvent("MouseEvents"); 
    evt.initEvent("click", false, false);
    obj.dispatchEvent(evt);    
}


function post_parent(msg){
	var str = JSON.stringify(msg) 
	window.parent.postMessage(str,'*');
}



})();

















































