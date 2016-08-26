/*
 * Copy Right: tonytony.club
 * Comments: 自动抢筹码
 * Author: kundy
 * Date: 2016-04-10
 */


console.log("[LOAD data.js] 2016041201 ");


//任务列表
if(TASK_LIST)TASK_LIST = ["JD_VIP","JD_JR","JD_CHOUMA","JD_MOBILE"];
//if(TASK_LIST)TASK_LIST = ["JD_VIP","JD_JR","JD_CHOUMA","ETAO","VIP_QQ","BAIDU_WENKU","XUNLEI_DAKA","LIANTONG","XIAMI","LIFEVC","PINGAN"];


//页面嵌入脚本列表
//第三个参数为1时为精准匹配，为0 时为模糊匹配
if(URL_LIST)URL_LIST = [
	//京东会员
	["http://vip.jd.com/","jd/vip_jd.js",1],

    //京东金融
    ["http://vip.jr.jd.com/","jd/jr_jd.js",1],//京东金融页

    //京东筹码
    ["http://pingce.jd.com/funding/usercenter.action","jd/pingce_jd.js",1],//京东金融-我的筹码页
    ["http://trade-z.jd.com/funding/mychip.action","jd/chouma_jd.js",1],//京东金融-签到页

    //京东京豆
    ["http://bean.jd.com/myJingBean/list","jd/bean_jd.js",1],//我的京豆页

	//京东移动端
    ["http://ld.m.jd.com/userBeanHomePage/getLoginUserBean.action","jd/m_jd.js",1],//京豆手机签到
    
    //etao-淘金币
    ["http://www.etao.com/","taobao/etao.js",1],//etao主页
    ["http://jf.etao.com/ajax/getCreditForSrp.htm","taobao/etao_getCreditForSrp.js",0],//etao签到页
    ["https://taojinbi.taobao.com/coin/userCoinDetail.htm","taobao/coin_userCoinDetail.js",1],//etao签到页

    //QQ会员-签到获取积分
    ["http://vip.qq.com/jf/earn.html","qq/jf_earn.js",1],

    //百度文库
    ["http://wenku.baidu.com/","baidu/wenku_baidu.js",1],
    ["http://wenku.baidu.com/task/browse/daily","baidu/task_browse_daily.js",1],
    ["http://wenku.baidu.com/user/mydocs","baidu/user_mydocs.js",1],

    //迅雷打卡
    ["http://vip.xunlei.com/index.html","xunlei.js",1],

    //联通签到
    ["http://iservice.10010.com/e3/signIn/index.html","liantong_10010.js",1],

    //虾米签到
    ["http://www.xiami.com/","xiami.js",1],
    ["http://www.xiami.com/account","xiami.js",1],

    //平安签到
    ["http://events.pingan.com/qiandao/index.html","pingan.js",1],

    //lifeVC
    ["http://www.lifevc.com/","lifevc.js",1],
    ["http://account.lifevc.com/UserCenter/MemberContent?type=signin&caller=Home","lifevc.js",0],
    ["https://account.lifevc.com/UserCenter/MemberContent?type=integral&caller=Home","lifevc.js",0],
]




//处理消息
if(HANDLE_MSG)HANDLE_MSG = function(msg){
    //console.log(msg)
    switch(msg.type)
    {

        case "JD":
            switch(msg.name)
            {
                case "vip_jd_click":
                    CHIP_DATA["JD_VIP"].auth = 1;
                    CHIP_DATA["JD_VIP"].today = msg.sign;   
					CHIP_DATA["JD_VIP"].id = msg.id;
                    break;
                case "jr_jd_click"://今天金融签到成功
                    CHIP_DATA["JD_JR"].auth = 1;
                    CHIP_DATA["JD_JR"].today = msg.sign;				
					CHIP_DATA["JD_JR"].id = msg.id;       
                    break;
				case "m_jd_click":
					CHIP_DATA["JD_MOBILE"].auth = 1;
                    CHIP_DATA["JD_MOBILE"].today = msg.sign;
					CHIP_DATA["JD_MOBILE"].id = msg.id;
                    break;
                case "chouma_click"://筹码签到成功
					CHIP_DATA["JD_CHOUMA"].auth = 1;
                    CHIP_DATA["JD_CHOUMA"].today = msg.sign;
                    CHIP_DATA["JD_CHOUMA"].id = msg.id;
                    break;
                case "chouma_num"://筹码数量
                    CHIP_DATA["JD_CHOUMA"].num = msg.num;
					CHIP_DATA["JD_CHOUMA"].total = msg.total; 
					CHIP_DATA["JD_CHOUMA"].task.finish();
                    break;
                case "jd_num"://京豆
					if(msg.task.indexOf("vip.jr.jd.com")>-1){
                        CHIP_DATA["JD_JR"].num = msg.num;
                        CHIP_DATA["JD_JR"].total = msg.total;
                        CHIP_DATA["JD_JR"].task.finish();
                    }else if(msg.task.indexOf("vip.jd.com")>-1){
                        CHIP_DATA["JD_VIP"].num = msg.num;
                        CHIP_DATA["JD_VIP"].total = msg.total;
					    CHIP_DATA["JD_VIP"].task.finish();
                    }else if(msg.task.indexOf("m.jd.com")>-1){
                        CHIP_DATA["JD_MOBILE"].num = msg.num;
                        CHIP_DATA["JD_MOBILE"].total = msg.total;
					    CHIP_DATA["JD_MOBILE"].task.finish();
                    }
                    break;
                default:
                    break;
            }
            break;
        case "ETAO":
            switch(msg.name)
            {
                case "login":
                    if(msg.data==""){//未登录
                        CHIP_DATA["ETAO"].auth = 0;
                        CHIP_DATA["ETAO"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["ETAO"].auth = 1;
                        CHIP_DATA["ETAO"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["ETAO"].today=1;
                    break;
                case "coin_num"://淘金币数量
                    CHIP_DATA["ETAO"].num = msg.data;
                    CHIP_DATA["ETAO"].task.finish();
                    break;
                default:
                    break;
            }
            break;
        case "VIP_QQ":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["VIP_QQ"].auth = 0;
                        CHIP_DATA["VIP_QQ"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["VIP_QQ"].auth = 1;
                        CHIP_DATA["VIP_QQ"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["VIP_QQ"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["VIP_QQ"].num = msg.data;
                    CHIP_DATA["VIP_QQ"].task.finish();
                    break;
                default:
                    break;
            }
            break;

        case "BAIDU_WENKU":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["BAIDU_WENKU"].auth = 0;
                        CHIP_DATA["BAIDU_WENKU"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["BAIDU_WENKU"].auth = 1;
                        CHIP_DATA["BAIDU_WENKU"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["BAIDU_WENKU"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["BAIDU_WENKU"].num = msg.data;
                    CHIP_DATA["BAIDU_WENKU"].task.finish();
                    break;
                default:
                    break;
            }
            break;
        case "XUNLEI_DAKA":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["XUNLEI_DAKA"].auth = 0;
                        CHIP_DATA["XUNLEI_DAKA"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["XUNLEI_DAKA"].auth = 1;
                        CHIP_DATA["XUNLEI_DAKA"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["XUNLEI_DAKA"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["XUNLEI_DAKA"].num = msg.data;
                    CHIP_DATA["XUNLEI_DAKA"].task.finish();
                    break;
                default:
                    break;
            }
            break;

        case "LIANTONG":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["LIANTONG"].auth = 0;
                        CHIP_DATA["LIANTONG"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["LIANTONG"].auth = 1;
                        CHIP_DATA["LIANTONG"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["LIANTONG"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["LIANTONG"].num = msg.data;
                    CHIP_DATA["LIANTONG"].task.finish();
                    break;
                default:
                    break;
            }
            break;

        case "XIAMI":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["XIAMI"].auth = 0;
                        CHIP_DATA["XIAMI"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["XIAMI"].auth = 1;
                        CHIP_DATA["XIAMI"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["XIAMI"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["XIAMI"].num = msg.data;
                    CHIP_DATA["XIAMI"].task.finish();
                    break;
                default:
                    break;
            }
            break;
        case "PINGAN":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["PINGAN"].auth = 0;
                        CHIP_DATA["PINGAN"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["PINGAN"].auth = 1;
                        CHIP_DATA["PINGAN"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["PINGAN"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["PINGAN"].num = msg.data;
                    CHIP_DATA["PINGAN"].task.finish();
                    break;
                default:
                    break;
            }
            break;

         case "LIFEVC":
            switch(msg.name)
            {
                case "user_name":
                    if(msg.data==""){//未登录
                        CHIP_DATA["LIFEVC"].auth = 0;
                        CHIP_DATA["LIFEVC"].task.finish();
                    }
                    else{//已登录
                        CHIP_DATA["LIFEVC"].auth = 1;
                        CHIP_DATA["LIFEVC"].id = msg.data;
                    }
                    break;
                case "sign_click"://签到成功
                    CHIP_DATA["LIFEVC"].today=1;
                    break;
                case "credit_num"://积分数量
                    CHIP_DATA["LIFEVC"].num = msg.data;
                    CHIP_DATA["LIFEVC"].task.finish();
                    break;
                default:
                    break;
            }
            break;

                
        default:
            break;
    }
}
