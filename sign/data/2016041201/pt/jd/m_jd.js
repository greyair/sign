/*
 * Copy Right: tonytony.club
 * Comments: 适用于http://m.jd.com/
 * Author: Greyair
 * Date: 2016-08-26
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);



function init(){
	console.log("[m_jd.js start]");
    var user_name = "";
    var sign_click = -1;
    var jd_num = "";

    //获取用户名
    if(document.querySelectorAll("#ttbar-login .link-user").length>0){
        user_name = document.querySelectorAll("#ttbar-login .link-user")[0].innerText;
    }

    //点击签到
    if(document.querySelectorAll("#signId").length>0){
        click_btn(document.querySelectorAll("#signId")[0]);
        sign_click = 1;
    }
    else{//没有签到按钮，说明已经签到
        sign_click = 0;
    }

	//获取京豆数量
    if(document.querySelectorAll(".emphasize").length>0)
        jd_num=document.querySelectorAll(".emphasize")[0].innerText.trim();   
    
    var msg = {type:"JD",name:"m_jd_click",id:user_name,sign:sign_click};//,num:credit_num};

    setTimeout(function(){
        post_parent(msg);

        //跳转京豆页，获取京豆数量
        location.href = "http://bean.jd.com/myJingBean/list";
    },1000)
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