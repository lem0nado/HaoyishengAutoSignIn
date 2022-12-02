
/*<![CDATA[*/
var signFlag = 1;
var faceFlag = 0;
var signConfig = [{"id":26545,"name":"\u7B2C2\u6B21\u7B7E\u5230","beginTime":"2022-11-29T15:34:00.000+08:00","endTime":"2022-11-29T15:40:00.000+08:00","meetingId":"584E46F4A49F7ADF9C33DC5901307461","status":1,"beginTimeText":"2022\/11\/29 15:34:00","endTimeText":"2022\/11\/29 15:40:00"}];
var meetingId = "584E46F4A49F7ADF9C33DC5901307461";
var meetingName = "\u5317\u4EAC\u8F93\u8840\u6C99\u9F99\u7B2C\u4E94\u671F";
var userId = "13599988887";//互动者
var qrcode = null;
var isPay = null ;
var price = "0.00" ;
var isOpenWin = false; //是否弹出窗口
var orderIds;//订单id
var  alreadySign = new Array();
var countUser=0;
var likedCount=177;

DWLive.init({
    userid: "3FC3C3C236011776",
    roomid: meetingId,
    viewername: userId,
    viewertoken: '',
    pcH5Live:true ,
    viewercustomua: 'android'

});
DWLive.onKickOut = function(data){
    //{"viewerid":"11","kick_out_type":"10"}
    console.log(data);
    if (typeof data === 'string') {
        data = JSON.parse(data) ;
        if(data.kick_out_type==10){
            alert("当前账号已被登录。。。");
            location.href="http://link.haoyisheng.com/entry/route?meetingNo="+"202211110008";
        }
    }
}
$(function () {
    //监控
    if(isPay==1){
        layer.open({
            type: 2,
            title: '提示',
            id: 'txt',
            shadeClose: false,
            shade: false,
            maxmin: false, //开启最大化最小化按钮
            closeBtn: 0,
            shade: [0.8, '#393D49'],
            area: ['450px', '280px'],
            content: "\/entry\/toIsPay?meetingId="+meetingId+'&userId='+userId+'&price='+price,
            end:function () {
                layer.open({
                    type: 2,
                    title: '提示',
                    id: 'txt',
                    shadeClose: false,
                    shade: false,
                    maxmin: false, //开启最大化最小化按钮
                    closeBtn: 0,
                    shade: [0.8, '#393D49'],
                    area: ['450px', '280px'],
                    content: "\/entry\/toIsPayEnd?orderId="+orderIds+'&price='+price

                });
            }
        });
    }else{

        if(signFlag==1) {
            setInterval(function () {
                $.each(signConfig, function (index, sc) {
                    if (!isOpenWin && date.isDuringDate(sc.beginTimeText, sc.endTimeText) && ($.inArray(sc.id, alreadySign) < 0)) {
                        alert("直播即将进行签到，请回到直播首页（非全屏状态）进行签到");
                        openWin(signFlag, faceFlag, sc.id, date.getDiffNow(sc.endTimeText));
                    }
                });
            }, 1000)
        }
    }







    function openWin(sign,face,num,timeOut) {
        DWLive.switchFullScreen(false);//全屏设置 true或false
        isOpenWin = true;
        console.info(timeOut);
        layer.open({
            type: 2,
            title: '签到提醒',
            id:'txt',
            shadeClose: true,
            shade: false,
            maxmin: false, //开启最大化最小化按钮
            closeBtn: 0,
            time:timeOut,
            shade: [0.8, '#393D49'],
            area: ['300px', '250px'],
            content: "\/entry\/monitor?meetingId="+meetingId+'&signFlag='+sign+'&userId='+userId+'&faceFlag='+face+'&num='+num,
            end: function(){
                isOpenWin = false;

            }
        });
    }


    function openWinFace(sign,face,num,timeOut) {
        DWLive.switchFullScreen(false);//全屏设置 true或false
        isOpenWin = true;
        console.info(timeOut);
        layer.open({
            type: 2,
            title:false,
            id:'txt',
            shadeClose: true,
            shade: false,
            maxmin: false, //开启最大化最小化按钮
            closeBtn: 0,
            time:timeOut,
            shade: [0.8, '#393D49'],
            area: ['100%', '100%'],
            content: "\/entry\/monitor?meetingId="+meetingId+'&signFlag='+sign+'&userId='+userId+'&faceFlag='+face+'&num='+num,
            end: function(){
                isOpenWin = false;
            }
        });
    }

    // -------zhifu end-----
    var date = {
        isDuringDate: function (beginDateStr, endDateStr) {
            if(beginDateStr==null||endDateStr==null)
                return false;
            var curDate = new Date(),
                beginDate = new Date(beginDateStr),
                endDate = new Date(endDateStr);
            if (curDate >= beginDate && curDate <= endDate) {
                return true;
            }
            return false;
        },
        getDiffNow:function (endDateStr) {
            if(endDateStr==null)
                return 0;
            var curDate = new Date(),
                endDate = new Date(endDateStr);
            return endDate.getTime()-curDate.getTime();
        }
    }

    //监控
    if(signFlag==2){
        setInterval(function(){
            $.each(signConfig,function(index,sc){
                if(!isOpenWin&&date.isDuringDate(sc.beginTimeText, sc.endTimeText)&&($.inArray(sc.id,alreadySign)<0)){
                    //alert("直播即将进行签到，请回到直播首页（非全屏状态）进行签到");
                    DWLive.logout(this);
                    DWLive.init({
                        userid: "3FC3C3C236011776",
                        roomid: "584E46F4A49F7ADF9C33DC5901307461",
                        viewername: "13599988887"
                    });
                    openWinFace(signFlag,faceFlag,sc.id,date.getDiffNow(sc.endTimeText));
                }
            });
        },1000)
    }

    var groupInfos = [];
    if(groupInfos.length>0){
        //监控刷新分会场
        setInterval(function () {
            $.get('/entry/getGroupInfo', { meetingId: meetingId},
                function(data){
                    console.log(data);
                    if(data!=null){
                        var li="";
                        for(var i=0 ;i<data.length;i++){
                            var groupInfo = data[i];
                            // console.log(groupInfo);
                            li+=
                                "   <li>\n" +
                                "      <a href=\"/entry/route?meetingNo="+groupInfo.meetingNo+"&meetingId="+meetingId + " \">   " +
                                // "      <a th:href=\"@{/entry/route?meetingNo="+groupInfo.meetingNo+"}\">   " +
                                "                        <div>\n" +
                                "                            <i class=\"pause\"><img src=\"https://media.haoyisheng.com/link/upload/202106/17/images/icon_pause.png\" alt=\"\"></i>\n" +
                                "                            <span class=\"liveState  "+ (groupInfo.stateStr=="未开始"? "":"liveing")  +"\">"+groupInfo.stateStr+"</span>\n" +
                                "                            <img src=\"https://media.haoyisheng.com/link/upload/"+(groupInfo.coverImageUrl==null?"202106/17/images/img_occupy.png": groupInfo.coverImageUrl)  +"\" alt=\"\">\n" +
                                "                        </div>\n" +
                                "                        <p> \n" +
                                "                            <i>"+groupInfo.mainStatusStr+"</i>\n" +
                                "                            " +groupInfo.meetingName +
                                "                        </p>\n" +
                                "                        <span> 直播时间："+groupInfo.scheduleLiveStartStr+"</span>\n" +
                                "                    </a>\n" +
                                "                </li>"
                        }

                        $(".branch_venue ul").html(li);
                    }
                }
            );
        }, 1000*60)

    }





})


//刷新页面
function reloadTable(index,num){
    alreadySign.push(num);
    layer.close(index);
    layer.msg('签到完成',{
        icon:1,time:2000
    })
}

//关闭人脸页面
function closeFace(index,num){
    alreadySign.push(num);
    layer.close(index);
}



//-------------zhifu start---------
//点击立即支付后弹出遮罩

//关闭浏览器
function CloseWebPage() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else { location.reload();
            window.open('', '_top');
            window.top.close();
        }
    } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        window.location.href = 'about:blank '; //火狐默认状态非window.open的页面window.close是无效的
        //window.history.go(-2);
    } else {
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}

//仅关闭窗口
function loadPage(index){
    location.reload();
}

//关闭你支付窗口并打开付款页面
function closePayWindow(index,qrcode,orderId,meetingId){
    orderIds = orderId;
    layer.close(index);
    window.open('/meetingInfoPay/toMeetingInfoPay?qrCode='+qrcode+'&meetingId='+meetingId+'&orderId='+orderId,"_blank");
}

/* 重定向到考试界面*/
function  redirctKs() {
    $.get("\/entry\/ksUrl", { userId:"13599988887",meetingId: "584E46F4A49F7ADF9C33DC5901307461"},
        function(data){
            window.open(data,'_blank');
        }
    );
}
function  redirctQuestion(qrCodeUrl) {
    window.open(qrCodeUrl,'_blank');
    //window.location.href = qrCodeUrl;
}

function  closeDiv() {
    $("#yhxy").hide();
}
/*]]>*/
