/*
 * Copy Right: tonytony.club
 * Comments: 适用于http://bean.jd.com/myJingBean/list
 * Author: kundy
 * Date: 2016-04-21
 */



var GET_CHIP_FLAG = 0;//防止重复加载引起多次运行
(function(){


if(GET_CHIP_FLAG==1)return;
GET_CHIP_FLAG=1;

setTimeout(init,500);



function init(){
	console.log("[bean_jd.js start]");

    //根据来源获取签到类型
    var task = document.referrer;
    var keyword = "";
    if(task.indexOf("vip.jr.jd.com")>-1){
        keyword = "金融"
    }else if(task.indexOf("vip.jd.com")>-1){
        keyword = "京东会员"
    }else if(task.indexOf("m.jd.com")>-1){
        keyword = "无线端"
    }

    //获取京豆总数量
    var jd_num ="";
    if(document.querySelectorAll(".user-bean-cont .num").length>0){
        jd_num=document.querySelectorAll(".user-bean-cont .num")[0].innerText;   
    }

    //获取今天对应签到京豆数量
    var tr = document.querySelectorAll(".tb-void tbody tr")
    var today = new Date().Format("yyyy-MM-dd")
    var tonum = 0
    for(var i = 0;i < 7; i++){
        if(tr[i].querySelectorAll("td")[0].innerText.substring(0,10) == today && tr[i].querySelectorAll("td")[2].innerText.indexOf(keyword)>-1){
            tonum += parseInt(tr[i].querySelectorAll("td")[1].innerText)
        }
    }

    var msg = {type:"JD",name:"jd_num",total:jd_num,num:tonum,task:document.referrer};
    post_parent(msg);
}

function post_parent(msg){
	var str = JSON.stringify(msg) 
	window.parent.postMessage(str,'*');
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

})();
