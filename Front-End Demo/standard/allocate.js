window.onload=allocateSystemInit;

var exChangedButton="cha_xun_ke_biao";
var arrDepartName=new Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
var arrTypeName=new Array("干事","人力干事","部长级","主席团");
var arrGenderName=new Array("不确定","女","男");
//上课时间
var arrSKSJ=new Array({"b":480,"e":530},{"b":540,"e":590},{"b":610,"e":660},{"b":670,"e":720},//早上4节课
                       {"b":750,"e":810},{"b":810,"e":860},//中午两节课
                       {"b":870,"e":920},{"b":930,"e":980},{"b":990,"e":1040},{"b":1050,"e":1100},
                       {"b":1140,"e":1190},{"b":1200,"e":1250},{"b":1260,"e":1310},{"b":1320,"e":1370});
    


function changeButtonStyle(buttonName)
{
	document.getElementById(exChangedButton).className="alloc_check_div used";
	document.getElementById(buttonName).className="alloc_check_div_click";
	exChangedButton=buttonName;
}

function GetReqKongKeLst(bh,bm,eh,em)
{
  
    var bt=bh*60+bm;
    var et=eh*60+em;
    var ret=new Array();
    console.log("bh:"+bh+" bm:"+bm+" eh:"+eh+" em:"+em);
    for(var i=0;i<arrSKSJ.length;i++)
    {
        if( (bt>=arrSKSJ[i].b&&bt<=arrSKSJ[i].e)//开始时间在一节课中间的，要求空
        || (et>=arrSKSJ[i].b&&et<=arrSKSJ[i].e)//结束时间在一节课中间的，要求空
        || (bt<=arrSKSJ[i].b&&et>=arrSKSJ[i].b)//在这节课前开始，在这节课前没结束的，要求空
        )
        {
            ret.push(i)
        }
    }
    console.log(ret);
    return ret;
}

//当前用户信息
var currentUser

//初始化人员调配系统
function allocateSystemInit()
{
	
	//获取当前用户信息
	currentUser=GetUserData(document.getElementById("login_info_user_id").innerHTML);
	
	var strButtonInfo="<div class=\"alloc_check_div used\" id=\"cha_xun_ke_biao\" title=\"查询可调人员\">\n"
					+	"<p>查询可调人员</p>\n"
					+"</div>\n"
					+"<div class=\"alloc_check_div used\" id=\"cha_xun_kkb\" title=\"查询空课表\">\n"
					+	"<p>查询空课表</p>\n"
					+"</div>\n"
					+"<div class=\"alloc_check_div used\" id=\"qiandao_qianli\" title=\"签到签离记录\">\n"
					+"	<p>签到签离记录</p>\n"
					+"</div>\n"
					+"<div class=\"alloc_check_div used\" id=\"cancle_alloc\" title=\"取消或修改一次外调\">\n"
					+"	<p>取消\\修改外调</p>\n"
					+"</div>\n"
					+"<div class=\"alloc_check_div wacd\">\n"
					+"	<p></p>\n"
					+"</div>\n";
					
	var objAllocBuDiv=document.getElementById("alloc_bu_div");
	objAllocBuDiv.innerHTML=strButtonInfo;
	
	//根据用户类型绑定函数和样式
	if(currentUser.userType!=2)//不是人力干事
	{
		
		document.getElementById("qiandao_qianli").className="alloc_check_div used unable";
		document.getElementById("cancle_alloc").className="alloc_check_div used unable";
		document.getElementById("cha_xun_ke_biao").onclick = function()
		{
			showChaXunKeBiao();
		}
		document.getElementById("cha_xun_kkb").onclick = function()
		{
			showChaXunKKB();
		}
	}
	else
	{
		document.getElementById("cha_xun_ke_biao").onclick = function()
		{
			showChaXunKeBiao();
		}
		document.getElementById("cha_xun_kkb").onclick = function()
		{
			showChaXunKKB();
		}
		document.getElementById("qiandao_qianli").onclick = function()
		{
			showQianDaoQianLi();
		}
		document.getElementById("cancle_alloc").onclick = function()
		{
			showCancleAlloc();
		}
	}
	showChaXunKeBiao();
}	
	

//需要与服务器通信
//获取个人信息，尤其是用户类型
function GetUserData(strUserID)
{
	//JSON示例
	var jsonUD=
	{
		"_userID":strUserID,
		"_userType":2,
		"_depart":2,
	};
	
	
	
	//个人信息对象构造函数
	function objUserData(_userID,_userType,_depart)
	{
		this.userID = _userID;
		this.userType = _userType;
		this.depart = _depart;
	}
	
	var objUD = new objUserData(jsonUD._userID,jsonUD._userType,jsonUD._depart);
	
	return objUD;
}


//需要与服务器通信
//发送查询条件
function postAllocQueInfo(objQI)
{
	/*  obj.qDepart是部门
		obj.qYear是时间·年
		obj.qMonth是时间·月
		obj.qDay是时间·日
		obj.qBeginHour和obj.BeginMin是开始工作的时和分
		obj.qEndHour和obj.EndMin是结束工作的时和分
		obj.qGender是性别要求,0表示不限，1表示女，2表示男
	*/
   
    var ret=GetReqKongKeLst(objQI.qBeginHour,objQI.qBeginMin,objQI.qEndHour,objQI.qEndMin);
    var qArrKK=new Array();
    //要求空课的数组
    for(var i=0;i<ret.length;i++)
    {
        qArrKK.push({"qKongKe":ret[i]});
    }
    console.log(qArrKK);
	var jsonPost=
	{
		"qDepart":objQI.qDepart+1,//部门
		"qYear":objQI.qYear,
		"qMonth":objQI.qMonth,
		"qDay":objQI.qDay,
		"qBeginHour":objQI.qBeginHour,
		"qBeginMin":objQI.qBeginMin,
		"qEndHour":objQI.qEndHour,
		"qEndMin":objQI.qEndMin,
		"qGender":objQI.qGender,//性别要求
        "qArrKK":qArrKK,//要求空课
	};
    console.log(jsonPost);
	/*此函数要返还一个查询结果的数组*/
	var arrAnsPerInfo=new Array();
	/*JSON示例*/
	var jsonGet=
	{
		"arrAnsPerInfo":[
			{
				"conformity":"0.3",//符合度用来排序
				"userID":"2012052201",//用户账号
				"userName":"邓作恒",//用户姓名
				"freeTime":"0.3",//查询时间附近的空课时间
				"depart":"2",//部门
				"userType":"3",//用户类型
				"gender":"1",//性别
				"longPhoneNumber":"13726247196",
				"shortPhoneNumber":"617196",
				"total_alloc_time":"5",//总的外调次数
				"recently_alloc_time":"2",//最近一个月
			},
			{
				"conformity":"0.2",//符合度用来排序
				"userID":"2012052202",//用户账号
				"userName":"邓作恒",//用户姓名
				"freeTime":"0.2",//查询时间附近的空课时间
				"depart":"2",//部门
				"userType":"3",//用户类型
				"gender":"1",//性别
				"longPhoneNumber":"13726247196",
				"shortPhoneNumber":"617196",
				"total_alloc_time":"5",//总的外调次数
				"recently_alloc_time":"2",//最近一个月
			},
			{
				"conformity":"0.2",//符合度用来排序
				"userID":"2012052203",//用户账号
				"userName":"邓作恒",//用户姓名
				"freeTime":"0.2",//查询时间附近的空课时间
				"depart":"2",//部门
				"userType":"1",//用户类型
				"gender":"1",//性别
				"longPhoneNumber":"13726247196",
				"shortPhoneNumber":"617196",
				"total_alloc_time":"5",//总的外调次数
				"recently_alloc_time":"2",//最近一个月
			},
			{
				"conformity":"0.2",//符合度用来排序
				"userID":"2012052204",//用户账号
				"userName":"邓作恒",//用户姓名
				"freeTime":"0.2",//查询时间附近的空课时间
				"depart":"2",//部门
				"userType":"1",//用户类型
				"gender":"1",//性别
				"longPhoneNumber":"13726247196",
				"shortPhoneNumber":"617196",
				"total_alloc_time":"4",//总的外调次数
				"recently_alloc_time":"2",//最近一个月
			},
			{
				"conformity":"0.2",//符合度用来排序
				"userID":"2012052205",//用户账号
				"userName":"邓作恒",//用户姓名
				"freeTime":"0.2",//查询时间附近的空课时间
				"depart":"2",//部门
				"userType":"1",//用户类型
				"gender":"1",//性别
				"longPhoneNumber":"13726247196",
				"shortPhoneNumber":"617196",
				"total_alloc_time":"4",//总的外调次数
				"recently_alloc_time":"1",//最近一个月
			},
			{
				"conformity":"0.1",//符合度用来排序
				"userID":"2012052206",//用户账号
				"userName":"邓作恒",//用户姓名
				"freeTime":"0.1",//查询时间附近的空课时间
				"depart":"2",//部门
				"userType":"1",//用户类型
				"gender":"0",//性别
				"longPhoneNumber":"13726247196",
				"shortPhoneNumber":"617196",
				"total_alloc_time":"4",//总的外调次数
				"recently_alloc_time":"1",//最近一个月
			},
			{
				"conformity":"0.1",//符合度用来排序
				"userID":"2012052207",//用户账号
				"userName":"邓作恒",//用户姓名
				"freeTime":"0.1",//查询时间附近的空课时间
				"depart":"2",//部门
				"userType":"1",//用户类型
				"gender":"1",//性别
				"longPhoneNumber":"13726247196",
				"shortPhoneNumber":"617196",
				"total_alloc_time":"4",//总的外调次数
				"recently_alloc_time":"1",//最近一个月
			},
			
			
		],
	};
			
	jsonGet.arrAnsPerInfo.sort(function(lhs,rhs)
	{
		if(lhs.conformity==rhs.conformity)//符合度最优先
		{
			if(lhs.userType==rhs.userType)
			{
				if(lhs.total_alloc_time==rhs.total_alloc_time)
				{
					if(lhs.recently_alloc_time==rhs.recently_alloc_time)
					{
						return lhs.gender<rhs.gender;//男生排前面
					}
					else
					{
						lhs.recently_alloc_time>rhs.recently_alloc_time;//最近外调数少的排前面
					}
				}
				else
				{
					return lhs.total_alloc_time>rhs.total_alloc_time;//累计外调数少的排前面
				}
			}
			else
			{
				return (lhs.userType-rhs.userType)>0;//干事排前面
			}
		}
		else
		{
			return (lhs.conformity-rhs.conformity)<0;//符合度高的排前面
		}
	});
	return jsonGet.arrAnsPerInfo;
}

//需要与服务器通信
//发送外调名单
function postAllocFormArr(arrIDList)
{
	var jsonArr=new Array();
	for(var i=0;i<arrIDList.length;i++)
	{
		var jsonID={"strID":arrIDList[i]};
		jsonArr.push(jsonID);
	}
	var jsonPOST=
	{
		"jsonITList":jsonArr,
	}
	//arrIDList是学生的学号，说明这些人被外调
	//返回的是外调序列号
	
	var jsonGet={"allocCode": "20140205-WERT"};
	return jsonGet.allocCode;
}	


//需要与服务器通信
//获取空课表连接
function getKKBList()
{
	//返回的是空课表的名字，如”KSC联盟空课表“及其连接
	
	
	var jsonGet=
	{
		"arrKKBLinkList":
		[
			{
				"name":"KSC联盟空课表",//空课表的名字
				"link":"#",//空课表的连接
			},
			{
				"name":"人力资源部空课表",
				"link":"#",
			},
			{
				"name":"体育部空课表",
				"link":"#",
			},
			
		],
	};
		
	
	return jsonGet.arrKKBLinkList;
}


//需要与服务器通信
//签到签离记录::发送外调序列号
function postAllocCode(strCode)
{
	//发送外调序列号
	var jsonPsot={"allocCode":strCode};
	
	//返回外调人员的ID，姓名的数组
	
	var jsonGet=//外调序列号对应的被外调人员
	{
		"arrAllocedList":
		[
			{
				"ID":"2012052207",//学号
				"name":"邓作恒1",//姓名
				"allocResult":"1",//这个全部是3
			},
			{
				"ID":"2012052208",//学号
				"name":"邓作恒2",//姓名
				"allocResult":"2",//这个全部是3
			},
			{
				"ID":"2012052209",//学号
				"name":"邓作恒3",//姓名
				"allocResult":"3",//这个全部是3
			},
            {
				"ID":"2012052210",//学号
				"name":"邓作恒4",//姓名
				"allocResult":"4",//这个全部是3
			},
		],
	};
			
	
	
	//如果查询的外调不存在，则这个数组是空的，长度为0
	return jsonGet.arrAllocedList;
}


//需要与服务器通信
//发送外调表现结果
function postAllocPerfValue(arrAllocedStudents)
{
	var jsonArr=new Array();
	console.log(arrAllocedStudents);
	for(var i=0;i<arrAllocedStudents.length;i++)
	{
		var jsonPer={"ID":arrAllocedStudents[i].ID,"BX":arrAllocedStudents[i].allocResult};
        //用户id和表现
		jsonArr.push(jsonPer);
	}
	console.log(jsonArr);
	//用于发送的json
	var jsonPOST={"arrAllocedPerf":jsonArr};
	
	//成功返回true
	return true;
}

//需要与服务器通信
//发送取消请求的序列号
function postAllocCodeforCancel(strCode)
{
	/*发送取消请求的序列号到服务器，服务器给我一些数据，比如此次外调生成的时间、
	谁生成的外调、申请外调的部门、外调工作时间*/
	
	//发送外调序列号
	var jsonPsot={"allocCode":strCode};
	
	//获取json对象
	var jsonGet=
	{
		"exist":"exist",//此外调是否存在
		"code":strCode,//此外调序列号
		"applyTime":"2012-13-13 25:60:60",//该序列号的生成日期
		"operator":"邓作恒",//生成序列号时是谁操作的
		"applyDepart":"KSC联盟",//生成序列号时，”申请部门“填的是什么
		"workTime":"2012-14-14 16:30--17:40",//该外调的工作日期
	}
	
	//然后给我返回这样一个对象
	return jsonGet;
}

//需要与服务器通信
//取消序列号对应的外调
function cancelAlloc(strCode)
{
	//发送外调序列号
	var jsonPsot={"allocCode":strCode};
	
	//取消成功或外调不存在返回true
	return true;
}


//查询可调人员页
function showChaXunKeBiao()
{
	changeButtonStyle("cha_xun_ke_biao");
	
	document.getElementById("alloc_work_f").innerHTML="";
	
	var strAllocQ="<div id=\"alloc_q\">\n"
						+"<form name=\"alloc_q_form\" method=\"post\" action=\"#\">\n"
							+"<h2>申请部门</h2>\n"
							+"<select class=\"alloc_select\" name=\"shenqingbumen\" id=\"shengqingbumen\">\n";
	
	//选择部门
	for(var iCount=0;iCount<arrDepartName.length;iCount++)
	{
		strAllocQ += "<option value=\""+iCount+"\"";
		if(iCount==currentUser.depart-1)
		{
			strAllocQ += "selected=\"selected\"";
		}
		strAllocQ += ">"+arrDepartName[iCount]+"</opyion>\n";
	}
	strAllocQ +="</select>\n"	
				+"<h2>查询条件</h2>\n"
				+"<p>\n"
				+"工作日期：\n"
				+"<select class=\"alloc_select\" name=\"shijian_nian\" id=\"shijian_nian\">\n";
	var date=new Date();
	var currentYear=date.getFullYear();
	strAllocQ +="<option value=\""+currentYear+"\">"+currentYear+"</option>";
	strAllocQ +="<option value=\""+(currentYear+1)+"\">"+(currentYear+1)+"</option>";
	strAllocQ +="</select>";
	strAllocQ +="年\\";
	strAllocQ +="<select class=\"alloc_select\" name=\"shijian_yue\" id=\"shijian_yue\">\n";
	//选择月
	for(var iCount=0;iCount<12;iCount++)
	{
		strAllocQ +="<option value=\""+(iCount+1)+"\">"+(iCount+1)+"</option>\n";
	}
	strAllocQ +="</select>"
			+"月\\"
			+"<select class=\"alloc_select\" name=\"shijian_ri\" id=\"shijian_ri\">\n";
	//选择日
	for(var iCount=0;iCount<31;iCount++)
	{
		strAllocQ +="<option value=\""+(iCount+1)+"\">"+(iCount+1)+"</option>\n";
	}
	strAllocQ +="</select>\n"
			+"日\n"
			+"</p>\n"
			+"<p>\n"
			+"工作时间：\n"
			+"<select class=\"alloc_select\" name=\"shijian_kaishi_h\" id=\"shijian_kaishi_h\">\n";
	for(var iCount=5;iCount<19;iCount++)
	{
		strAllocQ += "<option value=\""+iCount+"\">"+iCount+"</option>\n";
	}
	strAllocQ += "</select>\n"
			+":\n"
			+"<select class=\"alloc_select\" name=\"shijian_kaishi_fen\" id=\"shijian_kaishi_fen\">";
			
	for(var iCount=0;iCount<6;iCount++)
	{
		strAllocQ +=  "<option value=\""+iCount+"0"+"\">"+iCount+"0"+"</option>\n";
	}
	
	strAllocQ += "</select>\n"
				+"	— —\n"			
				+"	<select class=\"alloc_select\" name=\"shijian_jieshu_h\" id=\"shijian_jieshu_h\">\n";
	for(var iCount=5;iCount<19;iCount++)
	{
		strAllocQ += "<option value=\""+iCount+"\">"+iCount+"</option>\n";
	}
	strAllocQ += "</select>\n"
			+":\n"				
			+"<select class=\"alloc_select\" name=\"shijian_jieshu_fen\" id=\"shijian_jieshu_fen\">\n";
	for(var iCount=0;iCount<6;iCount++)
	{
		strAllocQ +=  "<option value=\""+iCount+"0"+"\">"+iCount+"0"+"</option>\n";
	}
	strAllocQ += "</select><a href=\"#\" id=\"help\">帮助</a>\n"
				+"</p>\n"
				+"<p>\n"
				+"	性别要求：\n"
				+"	<select class=\"alloc_select\" name=\"teshu_sex\" id=\"teshu_sex\">\n"
				+"		<option value=\"0\" selected=\"selected\">不限</option>\n"
				+"		<option value=\"1\">女</option>\n"
				+"		<option value=\"2\">男</option>\n"
				+"	</select>\n"
				+"</p>\n"
				+"<div id=\"time_error\" class=\"alloc_code_error\"></div>"
				+"<p>\n"
				+"	<button class=\"alloc_sub_bu\" type=\"button\" name=\"q_submit\" id=\"q_submit\" title=\"提交查询\">\n"
				+"		查询\n"
				+"	</button>\n"
				+"</p>\n"
				+"</form>\n"
				+"<hr />\n"
				+"</div>\n"
				+"<div id=\"q_result\"></div>"
				+"<div id=\"alloc_succeed\"></div>";
	document.getElementById("alloc_work_f").innerHTML=strAllocQ;
	document.getElementById("help").onclick=function()
    {
        alert("此处工作时间用于查询空课表\n"+
            "系统先用此时间判断那节课需要为空才能符合工作时间\n"+
            "判断标准如下：\n"+
            "开始时间在一节课中间的，要求空\n结束时间在一节课中间的，要求空\n在这节课前开始，在这节课前没结束的，要求空");
        return false;
    }
	document.getElementById("q_submit").onclick = function()
	{
		var strError=new String();
		
		//闰年此处bug，待修正
		var objForm = document.forms["alloc_q_form"];
		
		if(2==objForm.elements["shijian_yue"].value && 29<objForm.elements["shijian_ri"].value )
		{
			strError += "*2月没有"+ objForm.elements["shijian_ri"].value;
		}
		var bh=parseInt(objForm.elements["shijian_kaishi_h"].value);
        var eh=parseInt(objForm.elements["shijian_jieshu_h"].value);
        var em=parseInt(objForm["shijian_jieshu_fen"].value);
        var bm=parseInt(objForm["shijian_kaishi_fen"].value);
        
        if( (bh*60+bm)-(eh*60+em)>0 )
        {
            strError+="*开始时间晚于结束时间，这不科学\n";
        }
        
		if(strError!="")
		{
			document.getElementById("time_error").innerHTML=strError;
			return false;
		}
		else
		{
			document.getElementById("time_error").innerHTML="";
			function objQueInfo()
			{
				this.qDepart=parseInt(objForm.elements["shengqingbumen"].value);
				this.qYear=parseInt(objForm.elements["shijian_nian"].value);
				this.qMonth=parseInt(objForm.elements["shijian_yue"].value);
				this.qDay=parseInt(objForm.elements["shijian_ri"].value);
				this.qBeginHour=parseInt(objForm.elements["shijian_kaishi_h"].value);
				this.qBeginMin=parseInt(objForm.elements["shijian_kaishi_fen"].value);
				this.qEndHour=parseInt(objForm.elements["shijian_jieshu_h"].value);
				this.qEndMin=parseInt(objForm.elements["shijian_jieshu_fen"].value);
				this.qGender=parseInt(objForm.elements["teshu_sex"].value);
			}
			var objQI=new objQueInfo();
			var arrResponse = postAllocQueInfo(objQI);
			if(arrResponse.length!=0)
			{
				var strQueryReTable = new String();
				strQueryReTable+="<h2>查询结果</h2>\n"
					+"	<form method=\"post\" action=\"#\" name=\"alloc_list_form\">\n"
					+"		<table class=\"alloc_mb_table\">\n"
					+"			<thead>\n"
					+"				<tr>\n"
					+"					<th>调用</th>\n"
					+"					<th>姓名</th>\n"
					+"					<th>空课时间</th>\n"
					+"					<th>所属部门</th>\n"
					+"					<th>用户类型</th>\n"
					+"					<th>性别</th>\n"
					+"					<th>长号</th>\n"
					+"					<th>短号</th>\n"
					+"					<th>累计/最近外调数</th>\n"
					+"				</tr>\n"
					+"			</thead>\n"
					+"			<tbody>\n";
				for(var i=0;i<arrResponse.length;i++)
				{
					strQueryReTable += "<tr><td><input type=\"checkbox\" name=\""+arrResponse[i].userID+"\" value=\""+arrResponse[i].userID+"\"/></td>"
									+"<td>"+arrResponse[i].userName+"</td>" 
									+"<td>"+arrResponse[i].freeTime + "</td>"
									+"<td>"+arrDepartName[arrResponse[i].depart-1] + "</td>"
									+"<td>"+arrTypeName[arrResponse[i].userType-1] + "</td>"
									+"<td>"+arrGenderName[arrResponse[i].gender] + "</td>"
									+"<td>"+arrResponse[i].longPhoneNumber + "</td>"
									+"<td>"+arrResponse[i].shortPhoneNumber + "</td>"
									+"<td>"+(arrResponse[i].total_alloc_time +"/"+arrResponse[i].recently_alloc_time)+ "</td>"
									+"</tr>";
				}
				strQueryReTable += "</tbody></table><div id=\"verification\"><div>";
				if(currentUser.userType==2)//如果是人力干事
				{
					strQueryReTable += "<button class=\"alloc_sub_bu\"	type=\"button\" name=\"al_submit\" id=\"al_submit\" title=\"调用选中人\">\n"
									+	"调用选中人\n"
									+	"</button>\n"
									+"</form>\n"
					document.getElementById("q_result").innerHTML=strQueryReTable;
					
				}
				else
				{
					document.getElementById("q_result").innerHTML=strQueryReTable;
				}
				document.getElementById("al_submit").onclick = function()
				{
					var objAllocFormList = document.forms["alloc_list_form"];
					var arrIDList = new Array();
					for(var i=0;i<arrResponse.length;i++)
					{
						if(true == objAllocFormList.elements[i].checked)
						{
							arrIDList.push(objAllocFormList.elements[i].name);
							
						}
					}
					var strAllocCode=postAllocFormArr(arrIDList);
					if(0 == arrIDList.length)
					{
						alert("你必须选择你要外调的同学!");
					}
					else
					{
						var strAllSucceed="<p>调用成功！</p><p>本次外调序列号：</p><p>"+strAllocCode+"</p>";
						strAllSucceed += "<div class=\"alloc_code_error\">"
									+"*请务必记住外调序列号！"
									+"</div>";
						strAllSucceed += "<button class=\"alloc_sub_bu\"	type=\"button\" name=\"al_succeed\" id=\"al_succeed\" title=\"返回前请记住外调序列号\">\n"
									+	"确认并返回\n"
									+	"</button>\n";
						
						document.getElementById("alloc_succeed").innerHTML=strAllSucceed;
						document.getElementById("al_submit").style.visibility="hidden";
						document.getElementById("al_succeed").onclick = function()
						{
							showChaXunKeBiao();
						}
					}	
				}	
			}
			else
			{
				var strQueryReTable;
				strQueryReTable="<h2>查询无结果o(╯□╰)o</h2>\n";
				document.getElementById("q_result").innerHTML=strQueryReTable;
			}
			
		}
	}
	
}

//签到签离记录
function showQianDaoQianLi(currentUser)
{
	changeButtonStyle("qiandao_qianli");
	var strCodeQue = new String();
	
	strCodeQue +="	<div id=\"code_s_q\">\n"
				+"		<h2>外调序列号</h2>\n"
				+"		<div id=\"code_tips\">\n"
				+"			输入外调序列号:\n"
				+"		</div>\n"
				+"		<form method=\"post\" action=\"#\" name=\"code_input\">\n"
				+"			<input type=\"text\" id=\"alloc_code\" name=\"alloc_code\" />\n"
				+"			<div id=\"alloc_code_error\" class=\"alloc_code_error\"></div>\n"
				+"			<button type=\"button\" id=\"alloc_code_sub\" name=\"alloc_code_sub\" class=\"alloc_sub_bu\" title=\"外调序列号提交按钮\">确定</button>\n"
				+"		</form>\n"
				+"		<hr />\n"
				+"	</div>\n"
				+"	<div id=\"pref_radio_s\"></div>\n";
	document.getElementById("alloc_work_f").innerHTML=strCodeQue;
	function invalidCode(Code)
	{
		var re =/^\d{8}-[A-Z]{4}$/;
		return re.test(Code);
		
	}
	document.getElementById("alloc_code_sub").onclick=function()
	{
		var strCode=document.forms["code_input"].elements["alloc_code"].value;
		if(true == invalidCode(strCode))
		{
			document.getElementById("alloc_code_error").innerHTML="";
			var arrAllocedStudents=postAllocCode(strCode);
			
			var strAllocPerf = new String();
			if(0 != arrAllocedStudents.length)
			{
				strAllocPerf += "<h2>外调表现表</h2>\n"
								+"<form method=\"post\" action=\"#\" name=\"alloc_perf_form_list\">\n"
								+"	<table id=\"qiandaoqianli_table\" class=\"alloc_mb_table\">\n"
								+"		<thead>\n"
								+"			<tr>\n"
								+"				<th>姓名</th>\n"
								+"				<th>外调表现</th>\n"
								+"			</tr>\n"
								+"		</thead>\n"
								+"		<tbody>\n";
                var arrResultName=new Array("缺席","迟到或早退","一般","表项突出");
				for(var i=0;i<arrAllocedStudents.length;i++)
				{
					strAllocPerf+="<tr><td>"
								+arrAllocedStudents[i].name
								+"</td><td class=\"width_400\">";
                    for(var j=0;j<4;j++)
                    {
                        strAllocPerf+="<label for=\""+(arrAllocedStudents[i].ID+"_p"+j)+"\">"+arrResultName[j]+"</label>"
								+"<input type=\"radio\" name=\""
								+arrAllocedStudents[i].ID
								+"\" id=\""
								+(arrAllocedStudents[i].ID+"_p1")
								+"\" value=\""+(j+1)+"\" ";
                        if(j==arrAllocedStudents[i].allocResult-1)
                        {
                            strAllocPerf+="checked=\"checked\"";
                        }
                        strAllocPerf+="class=\"alloc_perf_radio\" />";
                    }
					
				}
				strAllocPerf +="</tbody></table>\n"
								+"<button type=\"button\" id=\"alloc_pref_sub\" name=\"alloc_pref_sub\" class=\"alloc_sub_bu\" title=\"外调表现表提交按钮\">提交</button>\n"
								+"</form>\n";
			}
			else
			{
				strAllocPerf += "<h2>找不到"+strCode+"对应的外调!</h2>";
			}
            
			document.getElementById("pref_radio_s").innerHTML=strAllocPerf;
           
			document.getElementById("alloc_pref_sub").onclick = function()
			{
				for(var iCount=0;iCount<arrAllocedStudents.length;iCount++)
				{
					
					var arrRadios=document.getElementsByName(arrAllocedStudents[iCount].ID);
					
					for(var j=0;j<arrRadios.length;j++)
					{
						
						if(true == arrRadios[j].checked)
						{
							arrAllocedStudents[iCount].allocResult=arrRadios[j].value;
						}
					}
				}
               
				if( true == postAllocPerfValue(arrAllocedStudents) )
				{
					alert("外调"+strCode+"的考核结果提交成功！点击确定返回");
					showQianDaoQianLi();
				}
				else
				{
					alert("提交失败。。请重试。。");
				}
					
			}
		}
		else
		{
			document.getElementById("alloc_code_error").innerHTML="*外调序列号格式错误";
		}
	}
}

//查询空课表页
function showChaXunKKB()
{
	changeButtonStyle("cha_xun_kkb");
	var arrKKBLinkList=getKKBList();
	var strLinkButton=new String();
	for(var i=0;i<arrKKBLinkList.length;i++)
	{
		strLinkButton += "<div class=\"bmkkb_bu\" ><a href=\""
		+arrKKBLinkList[i].link+"\" class=\"bmkkb\"><p>"
		+arrKKBLinkList[i].name+"</p></a></div>";
	}
	document.getElementById("alloc_work_f").innerHTML=strLinkButton;
}

//取消或修改外调
function showCancleAlloc()
{
	changeButtonStyle("cancle_alloc");
	var strCodeQue = new String();
	
	strCodeQue +="	<div id=\"code_s_q\">\n"
				+"		<h2>外调序列号</h2>\n"
				+"		<div id=\"code_tips\">\n"
				+"			输入外调序列号:\n"
				+"		</div>\n"
				+"		<form method=\"post\" action=\"#\" name=\"code_input\">\n"
				+"			<input type=\"text\" id=\"alloc_code\" name=\"alloc_code\" />\n"
				+"			<div id=\"alloc_code_error\" class=\"alloc_code_error\"></div>\n"
				+"			<button type=\"button\" id=\"alloc_code_sub\" name=\"alloc_code_sub\" class=\"alloc_sub_bu\" title=\"外调序列号提交按钮\">确定</button>\n"
				+"		</form>\n"
				+"		<hr />\n"
				+"	</div>\n"
				+"	<div id=\"decide_cancel_alloc\"></div>\n";
	document.getElementById("alloc_work_f").innerHTML=strCodeQue;
	function invalidCode(Code)
	{
		var re =/^\d{8}-[A-Z]{4}$/;
		return re.test(Code);	
	}
	
	document.getElementById("alloc_code_sub").onclick=function()
	{
		var strCode=document.forms["code_input"].elements["alloc_code"].value;
	
		if(true == invalidCode(strCode))
		{
			document.getElementById("alloc_code_error").innerHTML="";
			var objAllocData = postAllocCodeforCancel(strCode);
			
			var strVerifyInfo = new String();
			
			if("exist"==objAllocData.exist)
			{
				
				strVerifyInfo+= "<h2>确定取消此次外调</h2>\n"
							+	"<div id=\"this_alloc_info\">\n"
							+	"<p>外调序列号："+objAllocData.code+"</p>"
							+	"<p>外调生成时间:"+objAllocData.applyTime+"</p>"
							+	"<p>操作员："+objAllocData.operator+"</p>"
							+	"<p>外调申请部门："+objAllocData.applyDepart+"</p>"
							+	"<p>外调工作时间："+objAllocData.workTime+"</p>"
							+	"</div>"
							+	"<button type=\"button\" id=\"decide_cancel_alloc_sub\" name=\"decide_cancel_alloc_sub\" class=\"alloc_sub_bu\" title=\"确定取消此次外调\">"
							+	"取消此次外调</button><div id=\"cancel_succeed\"></div>";
			}
			else
			{
				strVerifyInfo+="<h2>找不到"+strCode+"对应的外调!</h2>";
			}
			document.getElementById("decide_cancel_alloc").innerHTML = strVerifyInfo;
			document.getElementById("decide_cancel_alloc_sub").onclick = function()
			{
				if(true==cancelAlloc(strCode))
				{
					strCancelSucceed = new String();
					strCancelSucceed+="<p>外调"+strCode+"已经被取消</p>"
									+"<button type=\"button\" id=\"confirm_the_result\" name=\"confirm_the_result\" class=\"alloc_sub_bu\" title=\"确定并返回\">"
									+"确定并返回</button>"
					document.getElementById("cancel_succeed").innerHTML=strCancelSucceed;
					document.getElementById("decide_cancel_alloc_sub").style.display="none";
					document.getElementById("confirm_the_result").onclick = function()
					{
						showCancleAlloc();
					}
				}
				else
				{
					alert("操作失败，请重试。。");
					return false;
				}
			}
		}
		else
		{
			document.getElementById("alloc_code_error").innerHTML="*外调序列号格式错误";
		}
	}
}
