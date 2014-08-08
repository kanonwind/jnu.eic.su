window.onload = PerformInit;

var year;//年份
var month;//月份

var arrDepartName=new Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");
var arrTypeName=new Array("干事","人力干事","部长级","主席团");

function GetObjById(strId)//根据ID获取对象
{
	return document.getElementById(strId);
}


function GetId(e)//根据鼠标处理事件获取鼠标活动当前的ID
{
	e=e||event;
	var tag=e.srcElement||e.target;
	return tag.id;
}


function CheckLegalStr(strCheck)//检查输入的字符串是否含有非法字段
{
	strCheck.toLowerCase();
	var re = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
	if(re.test(strCheck))
		return false;
	else
		return true;
}


//把字符串的一些特殊字符转化再存入数据库
function TranStr_Post(str)
{
	//&hh&表示换行符，&kg&表示空格符
	str = str.toString().replace(new RegExp('([\n])', 'g'), "&hh&");//转换换行
	str = str.toString().replace(new RegExp(" ", 'g'), "&kg&");//转换空格
	return str
}


//把从数据库获取的字符串转化后再显示
function TranStr_Get(str)
{
	str = str.toString().replace(new RegExp("&hh&", 'g'), "\n");//转换为换行符，显示换行
	str = str.toString().replace(new RegExp("&kg&", 'g'), " ");//转换为空格符，显示空格
	return str;
}


//部门转为对应的数字
function TranTextToDig(text)
{
	arrDepartName.indexOf(text);
}


//对应的数字转成相应的部门
function TranDigToText(iBuMen)
{
	var arrBuMen = new Array("秘书处", "人力资源部", "宣传部", "信息编辑部",
							"学术部", "体育部", "KSC联盟", "组织部",
							"文娱部", "公关部", "心理服务部", "主席团");
	var text = arrBuMen[iBuMen-1];
	return text;
}


//获取当前用户需要的各种考核表
function GetTable()
{
	//测试用数据
	//四种用户：YBGS RLGS BZJ ZXT
	//GetObjById("login_info_user_id").text;
	//请求数据
	/*
		var obj;
	    $.ajax({
		url:URL+"/funcqqlx",//请求用户类型
		data:{"year":year,"month":month},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});		
		var arr=obj;
		//alert(obj.type);
	*/
	
	var arr=
	{
	  "account":"2012052308",
	  "type":"YBGS",
	};
	
	/*
	var arrCeShiTable = new Array("干事自评表","干事考核反馈表","跟进部门出勤统计表","调研意见采纳表",
							  "整体考核结果反馈表","部长自评表","干事考核表","部长反馈表",
							  "部长考核表","部门考核表","优秀部长评定表","主席团反馈表", 
							  "考核进程控制表",  "其他情况加减分", "优秀评定限制表");
	var arrYBGS = new Array("干事自评表","干事考核反馈表");
	var arrRLGS = new Array("干事自评表","干事考核反馈表","跟进部门出勤统计表","调研意见采纳表","整体考核结果反馈表");
	var arrBZJ = new Array("整体考核结果反馈表","部长自评表","干事考核表","部长反馈表");
	var arrZXT = new Array("部长考核表","部门考核表","优秀部长评定表","主席团反馈表","整体考核结果反馈表");
	*/
	
	var arrCeShiTable = new Array("干事自评表","干事考核反馈表","跟进部门出勤统计表","调研意见采纳表",
							  "整体考核结果反馈表","部长自评表","干事考核表","部长反馈表",
							  "部长考核表","部门考核表","优秀部长评定表","主席团反馈表", "考核进程控制表","其他情况加减分",
							  "优秀评定限制表","查看未完成情况");
	
	var arrYBGS = new Array("干事自评表","干事考核反馈表");
	var arrRLGS = new Array("干事自评表","跟进部门出勤统计表","其他情况加减分","调研意见采纳表","干事考核反馈表","整体考核结果反馈表");
	var arrRLBZ = new Array("优秀评定限制表","部长自评表","干事考核表","整体考核结果反馈表","部长反馈表","考核进程控制表");
	var arrBZJ = new Array("部长自评表","干事考核表","部长反馈表","整体考核结果反馈表");
	var arrZXT = new Array("部长考核表","部门考核表","优秀部长评定表","整体考核结果反馈表","主席团反馈表");
	//alert(arr.type);
	/*
	switch(arr.type)
	{
	  case "BZJ": return arrBZJ;
	  case "YBGS": return arrYBGS;
	  case "RLGS": return arrRLGS;
	  case "ZXT": return arrZXT;
	  case "RLBZ":return arrRLBZ;
	};*/
	
	return arrCeShiTable;
}


//把获得的时间传回服务器
/*function PostTimeToServer(year, month, buttonText)
{
	var iCurButton = PostTable(buttonText);
	json_Time = 
	{
		"year":2014,
		"month":4,
		"button":iCurButton,
	};
	if(1)
		return true;
	else
		return false;
}
//把点击的表传给服务器
function PostTable(buttonText)
{
	var iCurButton = 1;
	switch(buttonText)
	{
		case "干事自评表":
			iCurButton = 1;
			break;
		case "干事考核表":
			iCurButton = 2;
			break;
		case "部长自评表":
			iCurButton = 3;
			break;
		case "部长考核表":
			iCurButton = 4;
			break;
		case "部门考核表":
			iCurButton = 5;
			break;
		case "干事考核反馈表":
			iCurButton = 6;
			break;
		case "跟进部门出勤统计表":
			iCurButton = 7;
			break;
		case "调研意见采纳表":
			iCurButton = 8;
			break;
		case "整体考核结果反馈表":
			iCurButton = 9;
			break;
		case "部长反馈表":
			iCurButton = 10;
			break;
		case "优秀部长评定表":
			iCurButton = 11;
			break;
		case "主席团反馈表":
			iCurButton = 12;
			break;
	}
	return iCurButton;
}*/


//干事自评表的考核项目和评分标准
function GSZP_BZ()
{
	function obj_GSZP()
	{	
		function obj_GZNL()
		{
			this.xm = "工作能力";	
			this.rowspan = 14;//跨行的数目
			/*
			function obj_GZNL()
			{
				this.bz = "工作量";
				this.a = "9-10.工作远多于部门内其他干事，需要较多时间完成";
				this.b = "7-8.工作与部门内其他干事差不多，在承受范围之内";
				this.c = "5-6.工作较部门内其他干事少，利用很少时间便可完成";
				this.d = "3-4.几乎没有工作";
			}
			*/
			function obj_GZXL()
			{
				this.bz = "工作效率";
				this.a = "9-10.总能提早截止日期较多完成安排下去的任务";
				this.b = "7-8.能够按时完成安排下去的任务，踩着时间点完成";
				this.c = "5-6.要超时才能完成安排下去的任务";
				this.d = "3-4.无法完成安排下去的任务";
			}
			function obj_GZZS()
			{
				this.bz = "工作知识";
				this.a = "9-10.部长级讲过工作知识后各方面均能掌握，极为优秀";
				this.b = "7-8.部长级讲过工作知识后对工作了解较充分，能够理解，运用起来有点生疏";
				this.c = "5-6.部长级讲过工作知识后仍对工作不太了解，需要不断询问和他人不断提醒";
				this.d = "3-4.部长级讲过工作知识后对与工作有关的事情有很多都不了解，也不去询问";
			}
			function obj_YBCLNL()
			{
				this.bz = "应变处理能力";
				this.a = "9-10.遇到情况总能随机应变,首先想办法自己解决，不会立刻求助他人";
				this.b = "7-8.遇到情况一般先求助于他人，偶尔才自己想办法解决";
				this.c = "5-6.遇到情况总是首先求助于他人，不会自己想应变方法，但勉强能解决事情";
				this.d = "3-4.遇到情况不会随机应变，也不问其他人，总把事情搞砸";
			}
		
			this.arrObj = new Array(new obj_GZXL(), new obj_GZZS(),new obj_YBCLNL());
		}
		
		function obj_GZTD()
		{
			this.xm = "工作态度";	
			this.rowspan = 14;//跨行的数目
			function obj_JJX()
			{
				this.bz = "积极性";
				this.a = "9-10.主动向部长级要求工作，对工作充满热情";
				this.b = "7-8.能够接受部长级布置的任务，并有办好的愿望";
				this.c = "5-6.能够接受部长级安排的任务，但缺乏积极性，办事有点拖拉";
				this.d = "3-4.不领会部长级的安排的任务，需要部长级不断催促";
			}
			function obj_ZRG()
			{
				this.bz = "责任感";
				this.a = "9-10.对布置的工作能够极其认真的完成，犯错误能自觉主动对自己的行为及后果负责";
				this.b = "7-8.布置的任务能够完成，犯错在部长级监督下能对自己的行为后果负责";
				this.c = "5-6.布置的任务不一定能负责的完成，对于工作中的失误有时逃避或推卸责任";
				this.d = "3-4.布置的任务敷衍不负责，对于工作中的失误总是逃避或推卸责任";
			}
			function obj_JLX()
			{
				this.bz = "纪律性";
				this.a = "9-10.有良好的纪律意识，严格规范自身，不随意违反其他部门制度，工作作风比较严谨";
				this.b = "7-8.能履行职责，大体上能遵守各项规章制度，不服从命令的事少有发生";
				this.c = "5-6.偶尔会发生不守纪律的事情，但部长提醒后能够改正";
				this.d = "3-4.经常发生不守纪律的事，再三提醒下还会出现问题";
			}
		
			this.arrObj = new Array(new obj_JJX(), new obj_ZRG(), new obj_JLX());
		}
		
		function obj_GTNL()
		{
			this.xm = "沟通能力";
			this.rowspan = 14;//跨行的数目
			function obj_HZNL()
			{
				this.bz = "合作能力";
				this.a = "9-10.能够很好的与他人合作，能提出自己想法，发挥自己的作用，也能接受他人意见";
				this.b = "7-8.愿意与他人合作，但合作中能够相处愉快，但不太主动";
				this.c = "5-6.仅在必要时才与人合作，偶尔会有摩擦，勉强接受与自己不一致的意见";
				this.d = "3-4.排斥与他人合作，十分难以相处";
			}
			function obj_BDNL()
			{
				this.bz = "表达能力";
				this.a = "9-10.能够清晰地表达自己的观点，让别人乐于聆听和理解自己的想法";
				this.b = "7-8.能够表达自己的观点，但需要其他人稍作提示";
				this.c = "5-6.表达自己的观点时存在有人听不懂请求解释的情况，但能解释清楚";
				this.d = "3-4.表达自己观点时太含糊，别人完全听不懂，解释自己的观点时也不够清楚";
			}
			function obj_TDJS()
			{
				this.bz = "团队精神";
				this.a = "9-10.爱护团体，有强烈的团队精神，部门内有活动总是热情参与，也常协助其他同事";
				this.b = "7-8.比较爱护团体，能参与部门活动但偶尔会缺席，与其他同事感情良好";
				this.c = "5-6.团队精神欠缺，偶尔不愿意与部门一起活动，才与部门内其他成员沟通少";
				this.d = "3-4.脱离群众，排斥与部门一起活动，更愿意单独行动，必要时才与他人沟通";
			}
		
			this.arrObj = new Array(new obj_HZNL(), new obj_BDNL(), new obj_TDJS());
		}
		function obj_GRNL()
		{
			this.xm = "工作能力";	
			this.rowspan = 6;//跨行的数目
			
			/*
			function obj_XTNL()
			{
				this.bz = "协调能力";
				this.a = "9-10.能很好地协调本部门工作与其他工作，活动，学习，生活的关系，各方面均衡发展";
				this.b = "7-8.协调能力尚可，基本能完成学习与工作中的任务，但对两者都有点影响";
				this.c = "5-6.协调能力较差，难以兼顾学习、工作与生活，但仍愿意完成任务";
				this.d = "3-4.完全无法兼顾学习、工作与生活，严重影响到工作情绪";
			}
			
			function obj_ZWJDNL()
			{
				this.bz = "自我监督能力";
				this.a = "9-10.无论是否有人监督，都能一丝不苟完成任务，自我监督能力强";
				this.b = "7-8.有人在场时工作热情较高，无人监督时有松懈和下降，但基本维持在较好的状态";
				this.c = "5-6.在没有监督的机制下工作毫无主动性，不自觉";
				this.d = "3-4.不管是否有人监督对工作都缺乏认真度和自觉性";
			}*/
			this.arrObj = new Array(new obj_YBCLNL());
		}		
				
		this.arrObj_GSZP = new Array(new obj_GZNL(), new obj_GZTD(), 
									new obj_GTNL());
	}
	
	var objReturn = new obj_GSZP();
	return objReturn;
}


//获取干事自评表数据
function Get_GSZP()
{
	var objTemp =  GSZP_BZ();
	
	//从数据库回去数据。注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错

	//考核项目对象
	function obj_GSZP()
	{		
		this.objGSZP_BZ = objTemp;

		
        //alert("请求前");
		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/funcgszp",
		data:{"year":year,"month":month},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		*/
		//alert("请求成功:"+obj.status);
		//alert("干事得分："+obj.DF[0].df);
		//alert("推优干事:"+obj.TYGS.tygs);
		//alert("对部长评价:"+obj.DBZPJ[0].name);
		
		//var json_Get_GSZP=obj;
		//这里进行请求，判断能否进行填表
		
		var json_Get_GSZP=
		{
		  "status":0,
		  "DF":
		  [
		    {"df":9},{"df":9},{"df":9},{"df":9},{"df":9},{"df":9},{"df":9},
			{"df":9},{"df":9},{"df":9},{"df":9},{"df":9},{"df":9},{"df":9},
		  ],
		  "zongfen":0,
		  "zwpj":"感觉良好",
		  "TongShi":
		  [
		    {"name":"同事A", "account":2012052210},
			{"name":"同事C","account":2012052211},	
			{"name":"同事B", "account":2012052212},
			{"name":"同事D","account":2012052213},	
		  ],
		  
		  "TYGS":
		  {
			 "tygs":"同事C",
			 "account":2012052211,//学号
			 "tyly":"理由是.....我勒个去",
		  },
		 
		  "DBZPJ":
		  [
			{"name":"部长", "account":2012052211, "fs":9, "pj":"评价",},
		  ],
		  "bumenliuyan":"这个部门还是撤了吧- -",
		  //新增，对部门的匿名留言，将会反馈到部长级的反馈表中
		  "arrTongshiliuyan":
		  [
			{"account":2012052210,"liuyan":"我喜欢你"},
			{"account":2012052211,"liuyan":"- -"},
		  ],
		};
		
		this.status =  json_Get_GSZP.status;//0;//是否可以提交状态，“0”表示可以提交可以进行填写，“1”表示已提交不能再进行填写	

		this.arrDF = new Array(); //得分数组
		for (var i = 0; i < this.objGSZP_BZ.arrObj_GSZP.length; ++i) 
		{
			this.arrDF[i] = new Array();
			
			for (var j = 0; j <  this.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j) 
			{
				this.arrDF[i][j] = json_Get_GSZP.DF[i*3+j].df;
			}
		}
		
		this.zongfen = json_Get_GSZP.zongfen;//总分		
		
		this.zwpj = TranStr_Get(json_Get_GSZP.zwpj);//自我评价的评语
		this.bumenliuyan=TranStr_Get(json_Get_GSZP.bumenliuyan);//部门留言
		this.arrTongshiliuyan=new Array();
		for(var i=0;i<json_Get_GSZP.arrTongshiliuyan.length;i++)
		{
			this.arrTongshiliuyan[i]=json_Get_GSZP.arrTongshiliuyan[i];
			this.arrTongshiliuyan[i].liuyan=TranStr_Get(json_Get_GSZP.arrTongshiliuyan[i].liuyan);
		}
		if(this.zwpj == "")
		{
			this.zwpj = "请填写.....";
		}
		
		//同事
		function obj_TongShi(TongShi)
		{
			this.name = TongShi.name;
			this.account = TongShi.account;
		}
		this.arrTongShi = new Array();
		for(var i = 0; i < json_Get_GSZP.TongShi.length; ++i)
		{
			this.arrTongShi.push(new obj_TongShi(json_Get_GSZP.TongShi[i]));
		}
		
		function obj_TYGS()
		{
			this.tygs = json_Get_GSZP.TYGS.tygs;//推优干事
			this.account = json_Get_GSZP.TYGS.account;//学号
			this.tyly = TranStr_Get(json_Get_GSZP.TYGS.tyly);//推优理由
		}
		this.TYGS = new obj_TYGS();

		function DBZPJ(name, account, fs, pj) //对本部门部长评价
		{
			this.name = name;
			this.account = account;
			this.fs = fs;
			this.pj = TranStr_Get(pj);
		}
		this.arrDBZPJ = new Array();
		for(var i = 0; i < json_Get_GSZP.DBZPJ.length; ++i)
		{
			this.arrDBZPJ.push(new DBZPJ(json_Get_GSZP.DBZPJ[i].name,json_Get_GSZP.DBZPJ[i].account, json_Get_GSZP.DBZPJ[i].fs, json_Get_GSZP.DBZPJ[i].pj));
		}
	}
	
	var objReturn = new obj_GSZP();
	return objReturn;
}


//把干事自评表的填写的内容传给服务器
function Post_GSZP(obj_GSZP)//obj_GSZP为Get_GSZP()定义的对象
{
    //alert(obj_GSZP.tygs);
	//传数据会数据库，注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错
	var arrDFTemp = new Array();
	for (var i = 0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i) 
	{
		for (var j = 0; j <  obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j) 
		{
			arrDFTemp.push({"df":obj_GSZP.arrDF[i][j]});
		}
	}
	
	var arrTongShiTemp = new Array();//同事
	for(var i = 0; i < obj_GSZP.arrTongShi.length; ++i)
	{
		arrTongShiTemp.push({"name":obj_GSZP.arrTongShi[i].name, "account":obj_GSZP.arrTongShi[i].account});
	}
	
	var arrDBZPJTemp = new Array();//对部长评价
	for(var i = 0; i < obj_GSZP.arrDBZPJ.length; ++i)
	{
		arrDBZPJTemp.push({"name":obj_GSZP.arrDBZPJ[i].name, "account":obj_GSZP.arrDBZPJ[i].account ,"fs":obj_GSZP.arrDBZPJ[i].fs, "pj":TranStr_Post(obj_GSZP.arrDBZPJ[i].pj)});
	}
	var arrTSLYTemp=new Array();//同事留言
	for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
	{
		strLiuyanTemp=obj_GSZP.arrTongshiliuyan[i].liuyan;
		if(strLiuyanTemp!=""&&strLiuyanTemp!=" "&&strLiuyanTemp!="无")//空的留言就不要了
		{
			arrTSLYTemp.push({"account":obj_GSZP.arrTongshiliuyan[i].account,"liuyan":TranStr_Post(strLiuyanTemp)});
		}
			
	}
	var json_Post_GSZP = 
	{
	    "year" : year,
		"month" : month,
		"status" : obj_GSZP.status,
		"arrDF" : arrDFTemp,//得分数组
		
		"zongfen" : obj_GSZP.zongfen,
		"zwpj" : TranStr_Post(obj_GSZP.zwpj),
		"arrTongShi" : arrTongShiTemp,//同事数组
		"arrTongshiliuyan":arrTSLYTemp,//同事留言
		"bumenliuyan":TranStr_Post(obj_GSZP.bumenliuyan),//部门留言
		"TYGS" :{"tygs":obj_GSZP.TYGS.tygs , "account":obj_GSZP.TYGS.account , "tyly":TranStr_Post(obj_GSZP.TYGS.tyly)},
		"arrDBZPJ" : arrDBZPJTemp, //对本部门部长评价数组
		"hadSubmit":obj_GSZP.hadSubmit,//新增字段，1表示这是点提交按钮来的，所以数据库要存起来
		//如果数据库检查用户没填完必要部分，但是这个字段却显示提交过，则说明存入数据库时有错
	};
	//alert(json_Post_GSZP.TYGS.account);
	
	    //ajax请求，发送干事自评表
		var obj;
	    $.ajax({
		url:URL+"/post_gszp",
		data:json_Post_GSZP,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
	//alert(obj.status)
	//服务器成功接收信息，则返回true，否则返回false
	if(1)
		return true;
	else
		return false;
}


//获取干事考核反馈表数据
function Get_GSKHFK()
{
	function obj_GSKHFK() 
	{
	
	    //ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/jsgskh",
		data:{"year":year,"month":month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		var json_Get_GSKHFK = obj;
		*/
		var json_Get_GSKHFK = 
		{
			"zongfen":"100",//总分
			"paiming":"1",//该月排名
			"yxgs":"朱林杰",//该月优秀干事
			"bmpm":1,//所在部门的排名
			"bmdf":1024,//所在部门的得分
			"DFXJ"://得分细节
			[
				{"a":2, "b":4, "c":8, "d":16, "e":32, "f":64, "g":128},
			],
			
			"zwpj":"自我感觉良好",//自我评价
			"qtgspj"://其他干事评价
			[
				{"pj":"还好"},
				{"pj":"还好"},
				{"pj":"还好"},
				{"pj":"还好"},
				{"pj":"还好"},
				{"pj":"还好"},
				{"pj":"还好"},
				{"pj":"还好"},
				{"pj":"还好"},
				
			],
			"bzpj"://部长评价
			[
				{"bzpj":"不错"},
				{"bzpj":"不错"},
				{"bzpj":"不错"},
				{"bzpj":"不错"},
			],
			"liuyan"://留言板部分
			[
				{"liuyan":"我喜欢你"},
				{"liuyan":"烧死异性恋"},
			],
		};

		this.zongfen = json_Get_GSKHFK.zongfen; //总分
		this.paiming = json_Get_GSKHFK.paiming; //该月排名
		this.bmpm=json_Get_GSKHFK.bmpm;
		this.bmdf=json_Get_GSKHFK.bmdf;
		this.yxgs = json_Get_GSKHFK.yxgs; //该月优秀干事
		//得分细节
		this.arrDFXZ = new Array(json_Get_GSKHFK.DFXJ[0].a, json_Get_GSKHFK.DFXJ[0].b, json_Get_GSKHFK.DFXJ[0].c, json_Get_GSKHFK.DFXJ[0].d, json_Get_GSKHFK.DFXJ[0].e, json_Get_GSKHFK.DFXJ[0].f, json_Get_GSKHFK.DFXJ[0].g);
		
		this.zwpj = TranStr_Post(json_Get_GSKHFK.zwpj); //自我评价
		this.qtgspj = new Array();
		for(var i = 0; i < json_Get_GSKHFK.qtgspj.length; ++i)
		{
			var str = TranStr_Post(json_Get_GSKHFK.qtgspj[i].pj);
			this.qtgspj.push(str);		
		}
		
		this.bzpj = new Array();
		for(var i = 0; i < json_Get_GSKHFK.bzpj.length; ++i)
		{
			var str = TranStr_Post(json_Get_GSKHFK.bzpj[i].bzpj);
			this.bzpj.push(str);
		}
		this.liuyan=json_Get_GSKHFK.liuyan;
	}
	
	var obj = new obj_GSKHFK();
	return obj;
}


//获取跟进部门出勤统计表数据
function Get_GJBMCQTJ()
{
	//注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错
	function obj_GJBMCQTJ()
	{	
	
		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/jsgjbmcqtj",
		data:{"year":year,"month":month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		//alert(obj.str);
	    var json_Get_GJBMCQTJ = obj;
		*/
		
		var json_Get_GJBMCQTJ = 
		{
			"gjbm":2,
			"renshu":1,
			"status":0,
			"chuqin":
			[	
				{"name":"邓作恒", "qj":0, "ct":0, "qx":0, "account":201205222},//名字,请假次数,迟到或早退次数,缺席,学号
			],
		};
	
		this.gjbm = json_Get_GJBMCQTJ.gjbm;//跟进部门
		this.renshu = json_Get_GJBMCQTJ.renshu;//人数
		this.status = json_Get_GJBMCQTJ.status;//是否可以提交状态，“0”表示可以提交可以进行填写，“1”表示已提交不能再进行填写
		//出勤
		this.chuqin = new Array();//alert(json_Get_GJBMCQTJ.renshu);
		for(var i=0; i < json_Get_GJBMCQTJ.chuqin.length; ++i)
		{
			this.chuqin[i] = new Array();//alert(json_Get_GJBMCQTJ.chuqin[i].name);
			this.chuqin[i][0] = json_Get_GJBMCQTJ.chuqin[i].name;//干事名字
			this.chuqin[i][1] = json_Get_GJBMCQTJ.chuqin[i].qj;//请假次数
			this.chuqin[i][2] = json_Get_GJBMCQTJ.chuqin[i].ct;//迟到或早退次数
			this.chuqin[i][3] = json_Get_GJBMCQTJ.chuqin[i].qx;//无辜缺席次数
			this.chuqin[i][4] = json_Get_GJBMCQTJ.chuqin[i].account;//学号
		}
	}
	var obj = new obj_GJBMCQTJ();
	return obj;
}


//把跟进部门统计表填写的内容传给服务器
function Post_GJBMCQTJ(obj_GJBMCQTJ)//obj_GJBMCQTJ为Get_GJBMCQTJ()定义的对象
{
	//注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错
	var arrChuQinTemp = new Array();
	for(var i = 0; i < obj_GJBMCQTJ.renshu; ++i)
	{
		arrChuQinTemp.push({"name":obj_GJBMCQTJ.chuqin[i][0], "qj":obj_GJBMCQTJ.chuqin[i][1], "ct":obj_GJBMCQTJ.chuqin[i][2], "qx":obj_GJBMCQTJ.chuqin[i][3], "account":obj_GJBMCQTJ.chuqin[i][4]});
	}
	
	var json_Post_GJBMCQTJ = 
	{
	    "year":year,
		"month":month,
		"gjbm":obj_GJBMCQTJ.gjbm,
		"renshu":obj_GJBMCQTJ.renshu,
		"status":obj_GJBMCQTJ.status,
		"chuqin":arrChuQinTemp,
	};
	//alert(json_Post_GJBMCQTJ.chuqin[2].account);
	//服务器成功接收信息，则返回true，否则返回false
	
	    //ajax请求，发送部长自评表
		//alert(99);
		//alert(json_Post_GJBMCQTJ.chuqin[0].account);
		var obj;
	    $.ajax({
		url:URL+"/post_gjbmcqtj",
		data:json_Post_GJBMCQTJ,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		
	//alert(obj.str+"adsf");
	if(1)
		return true;
	else
		return false;
}


//获取调研意见采纳表数据
function Get_DYYJCN()
{
	function obj_DYYJCN()
	{
	
		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/jsdyyjcn",
		data:{"year":year,"month":month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
		//alert("asdf"+obj.str+obj.arrBM[0].arrCNJF[0].jiafen);
	    var json_obj_DYYJCN = obj;
		*/
		
		
		var json_obj_DYYJCN = 
		{
			"status":0,
			//"bmsm":11,
			"arrBM":
			[
				{
					"bmmz":"2", 
					//"bmrs":8, 
					"arrCNJF":
					[
						{"name":"邓作恒", "account":2012032210, "jiafen":2,},
					],
				},
				
			],
			
		};

		this.status = json_obj_DYYJCN.status;//是否为课填写提交状态
		this.bmsm = json_obj_DYYJCN.bmsm;//部门数目
		
		function obj_BM(bmmz, bmrs, arrCNJF) //
		{
			this.bmmz = bmmz;//部门名字
			this.bmrs = bmrs; //部门人数
			function obj_CNJF(name, account, jiafen) //每个人的名字和采纳加分组成一个子对象
			{
				this.name = name; //名字
				this.account = account
				this.jiafen = jiafen; //采纳加分
			}
			this.arrObjCNJF = new Array(); //子对象数组
			for (var j = 0; j < this.bmrs; ++j) 
			{
				var objTemp1 = new obj_CNJF(arrCNJF[j].name, arrCNJF[j].account, arrCNJF[j].jiafen);
				this.arrObjCNJF.push(objTemp1);
			}
		}
		
		this.arrObjBM = new Array();
		for(var i = 0; i < json_obj_DYYJCN.arrBM.length; ++i)
		{
			var objTemp = new obj_BM(json_obj_DYYJCN.arrBM[i].bmmz, json_obj_DYYJCN.arrBM[i].arrCNJF.length, json_obj_DYYJCN.arrBM[i].arrCNJF);
			this.arrObjBM.push(objTemp);
		}
	}
	var objReturn = new obj_DYYJCN();
	return objReturn;
}


//把调研意见采纳表的填写的内容传给服务器
function Post_DYYJCN(obj_DYYJCN)//obj_DYYJCN为Get_DYYJCN()定义的对象
{
    
	//注意：JS这边和数据库那边的各对象和变量命名尽量保持一致，不然可能会出错
	var _arrBM = new Array();
	for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
	{	
		var _arrCNJF = new Array();
		for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
		{
			_arrCNJF.push({"name":obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name, "account":obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].account, "jiafen":obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen});
		}
		_arrBM.push({"bmmz":obj_DYYJCN.arrObjBM[i].bmmz, "bmrs":obj_DYYJCN.arrObjBM[i].bmrs, "arrCNJF":_arrCNJF});
	}
	
	var json_Post_DYYJCN = 
	{
	    "year":year,
		"month":month,
		"status":obj_DYYJCN.status,
		"bmsm":obj_DYYJCN.bmsm,
		"arrBM": _arrBM,
	};

	    
		//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/post_dyyjcn",
		data:json_Post_DYYJCN,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
	    //var json_Get_GJBMCQTJ = obj;	
	
	if(1)
		return true;
	else
		return false;
}


//获取整体考核结果反馈表数据
function Get_ZTKHJGFK()
{
	function obj_ZTKHJGFK()
	{
	
		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/jsztkhjgfk",
		data:{"year":year,"month":month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});		
	    var json_Get_ZTKHJGFK = obj;
		
		*/
		
		var json_Get_ZTKHJGFK = 
		{
			"arrYXBM"://优秀部门
			[
				{"bm":"4","df":1024,},//部门名字,得分
			],
			
			"arrYXBZ"://优秀部长
			[
				{"bm":"邓作恒", "account":2013021120, "ssbm":"5", "df":1024,},//部长名字,所属部门,得分
			],
			
			"YXGS"://各部门优秀干事
			{
				
				"arrBM":
				[
					{
						"bm":"2",//部门
						"GS"://一个部门多个干事
						[//优秀干事名字,学号，得分,是否为月度优秀干事,1表示是月度优秀干事，0表示不是优秀干事
							{"name":"邓作恒", "account":2013021120, "df":1024,"ydyxgs":1,},
						],
					},
					
				],				
			},
			
			"WDJDRY"://外调较多人员
			{
				"arrBM":
				[
					{
						"bm":"3",//部门
						"GS"://一个部门多个干事
						[
							{"name":"邓作恒", "account":2013021120, "wdcs":2,},//外调干事名字,外调次数
						],
					},
				],				
			},
		};

		function obj_YXBM(bm, df)//优秀部门
		{
			this.bm = arrDepartName[bm-1];//部门名字
			this.df = df;//得分
		}
		this.arrObjYXBM = new Array();//保存优秀部门的数组
		for(var i = 0; i < json_Get_ZTKHJGFK.arrYXBM.length; ++i)
		{
			this.arrObjYXBM.push(new obj_YXBM(json_Get_ZTKHJGFK.arrYXBM[i].bm, json_Get_ZTKHJGFK.arrYXBM[i].df));
		}
		
		
		function obj_YXBZ(bzmz, account, ssbm, df)//优秀部长
		{
			this.bzmz = bzmz;//部长名字
			this.account = account;//学号
			this.ssbm = arrDepartName[ssbm-1];//所属部门
			this.df = df;//得分
		}
		this.arrObjYXBZ = new Array();//保存优秀部长的数组
		for(var i = 0; i < json_Get_ZTKHJGFK.arrYXBZ.length; ++i)
		{
			this.arrObjYXBZ.push(new obj_YXBZ(json_Get_ZTKHJGFK.arrYXBZ[i].bm, json_Get_ZTKHJGFK.arrYXBZ[i].account, json_Get_ZTKHJGFK.arrYXBZ[i].ssbm, json_Get_ZTKHJGFK.arrYXBZ[i].df));
		}
		
		
		function obj_YXGS(BM)//各部门优秀干事
		{
			this.bm = arrDepartName[BM.bm-1];//部门
			function obj_GBMYXGS(GS)//一个部门优秀干事
			{
				this.name = GS.name;//优秀干事名字
				this.account = GS.account;//学号
				this.df = GS.df;//得分
				if(GS.ydyxgs == 1)//是否为月度优秀干事
					this.ydyxgs = "月度优秀干事";
				else
					this.ydyxgs = "";
			}
			this.arrObjGBMYXGS = new Array();//保存一个部门优秀干事的数组
			for(var i = 0; i < BM.GS.length; ++i)
			{
				this.arrObjGBMYXGS.push(new obj_GBMYXGS(BM.GS[i]));
			}
		}
		this.arrObjYXGS = new Array();//保存多个部门优秀干事的数组
		for(var i = 0; i < json_Get_ZTKHJGFK.YXGS.arrBM.length; ++i)
		{
			this.arrObjYXGS.push(new obj_YXGS(json_Get_ZTKHJGFK.YXGS.arrBM[i]));
		}
		
		function obj_WDJDRY(BM)//外调较多人员
		{
			this.bm = arrDepartName[BM.bm-1];//部门
			function obj_GBMWDJDRY(GS)//一个部门外调较多的干事
			{
				this.name = GS.name;//外调干事名字
				this.account = GS.account;//学号
				this.wdcs = GS.wdcs;//外调次数
			}
			this.arrObjGBMWDJDRY = new Array();//保存一个部门w外调较多干事的数组
			for(var i = 0; i < BM.GS.length; ++i)
			{
				this.arrObjGBMWDJDRY.push(new obj_GBMWDJDRY(BM.GS[i]));
			}
		}
		this.arrObjWDJDRY = new Array();//保存多个部门外调较多干事的数组
		for(var i = 0; i < json_Get_ZTKHJGFK.WDJDRY.arrBM.length; ++i)
		{
			this.arrObjWDJDRY.push(new obj_WDJDRY(json_Get_ZTKHJGFK.WDJDRY.arrBM[i]));
		}		
	}
	
	var objReturn = new obj_ZTKHJGFK();
	return objReturn;
}


//部长自评表的考核项目和评分标准
function BZZP_BZ()
{
	function obj_BZZP()
	{	
		function obj_GZQK()
		{
			this.xm = "工作情况";	
			this.rowspan =14;//跨行的数目
			function obj_GZL()
			{
				this.bz = "工作量";
				this.a = "9-10.工作远多于其他部门或本部门内其他部长，难度较大，需要较多时间完成";
				this.b = "7-8.工作与部门内其他部长相当，在承受范围之内";
				this.c = "5-6.工作较部门内其他部长少，利用很少时间便可完成";
				this.d = "3-4.几乎没有工作";
			}
			
			function obj_GZTD()
			{
				this.bz = "工作态度";
				this.a = "9-10.对工作能够极其积极且认真负责的完成，犯错误能自觉主动对自己的行为及后果负责";
				this.b = "7-8.布置的任务能够完成，积极度一般，犯错能在其他人监督下对自己的行为后果负责";
				this.c = "5-6.布置的任务不一定能认真负责的完成，对于工作中的失误有时逃避或推卸责任";
				this.d = "3-4.布置的任务敷衍不负责，对于工作中的失误总是逃避或推卸责任";
			}
			function obj_GZFF()
			{
				this.bz = "工作方法";
				this.a = "9-10.在工作中逐渐自主创新找到新方法并取得良好的成效，有突破";
				this.b = "7-8.按照固有方式按部就班并认真完成，效果较好";
				this.c = "5-6.按照固有方式完成但效率不高";
				this.d = "3-4.没能找到合适的方法使工作效率降低";
			}
			
			
			this.arrObj = new Array(new obj_GZL(),  new obj_GZTD(),new obj_GZFF());
		}
		
		function obj_GZNL()
		{
			this.xm= "工作能力";	
			this.rowspan = 10;//跨行的数目
			function obj_FXWTNL()
			{
				this.bz = "发现问题能力";
				this.a = "9-10.能够不断的正确的思考分析问题，并能及时发现存在的问题";
				this.b = "7-8.能分析绝大多数问题，也能发现问题但不太及时";
				this.c = "5-6.分析问题过于简单，发现问题花费时间较长，经常无法发现";
				this.d = "3-4.分析问题过于死板，没条理，无法发现存在的问题";
			}
			function obj_JJWTNL()
			{
				this.bz = "解决问题能力";
				this.a = "9-10.在发现问题后能主动、及时、效率高、效果好的解决问题，并能继续高质量的完成工作";
				this.b = "7-8.不能十分及时解决问题，有点手忙脚乱，但在他人的提醒下能够解决，效果尚可";
				this.c = "5-6.解决问题不及时，手忙脚乱，较难想到解决的办法";
				this.d = "3-4.完全找不到解决办法，导致了比较严重的后果";
			}
			
			this.arrObj = new Array(new obj_FXWTNL(), new obj_JJWTNL());
		}
		
		function obj_XZNL()
		{
			this.xm = "协作能力";
			this.rowspan = 14;//跨行的数目			
			function obj_GTNL()
			{
				this.bz = "沟通能力";
				this.a = "9-10.沟通能力很强，经常与干事、其他部长级和主管副主席进行有效的沟通，效果很好";
				this.b = "7-8.愿意与上级和下级沟通，沟通效果尚可";
				this.c = "5-6.不乐于与人沟通，仅在必要沟通时才会沟通，效果一般";
				this.d = "3-4.沟通合作能力差，不肯与人合作，完全封闭自我";
			}
			function obj_FGNL()
			{
				this.bz = "分工合作能力";
				this.a = "9-10.能有各自明确合力的分工，合作时能够共同出色的完成任务，也能很乐意的接受他人意见，完成工作效率高";
				this.b = "7-8.愿意与他人合作，虽分工欠合理但合作中能够相处愉快，一开始可能有分歧最终也能统一，工作完成效果一般";
				this.c = "5-6.仅在必要时才与人合作，分工混乱且不均，合作中会有摩擦，勉强接受与自己不一致的意见，导致工作效率降低";
				this.d = "3-4.排斥与他人合作，分工情况严重不均，完全无视他人意见，固执己见，十分难以相处，导致工作效率低，效果差";
			}
			
			function obj_GZQX()
			{
				this.bz = "工作情绪";
				this.a = "9-10.生活中导致的不良情绪极少带到工作和部门活动中，在部门成员面前总是保持较好的状态";
				this.b = "7-8.生活中的不良情绪偶尔会带到工作中来，导致工作效率欠佳，但仍能够较好完成工作";
				this.c = "5-6.不良情绪容易影响到部门工作，工作效率降低，甚至影响到其他同事的情绪";
				this.d = "3-4.不良情绪总是对自己造成极大的影响，严重影响到整个部门的运作";
			}
			this.arrObj = new Array(new obj_GTNL(), new obj_FGNL(), new obj_GZQX());
		}
		
		function obj_GLNL()
		{
			this.xm = "管理能力";
			this.rowspan = 19;//跨行的数目
			function obj_FPGZNL()
			{
				this.bz = "分配工作能力";
				this.a = "9-10.给干事工作布置合理，每个人都有比较平均的任务，完成效果好";
				this.b = "7-8.给干事工作布置欠合理，有的忙有的闲，但工作能够正常完成";
				this.c = "5-6.没有合理分配工作，导致工作勉强完成，而且完成效果欠佳";
				this.d = "3-4.工作分配严重不合理，导致有的干事无法完成工作，效果很差";
			}
			function obj_DDNL()
			{
				this.bz = "督导能力";
				this.a = "9-10.常与干事督导与调练，乐于主动帮助干事，经常给予指导性意见";
				this.b = "7-8.肯应干事要求帮助干事，但缺乏主动性";
				this.c = "5-6.仅在必要时才进行督导，导致干事的工作中出现了较多错误";
				this.d = "3-4.从不督导干事，甚至拒绝干事的督导要求";
			}
			function obj_BMGQ()
			{
				this.bz = "部门感情";
				this.a = "9-10.经常组织部门一起活动，没有特殊事务不会缺席，部门内感情很好，其乐融融，有归属感";
				this.b = "7-8.会组织部门一起活动，但有时因为情绪等原因会缺席活动，部门感情尚可";
				this.c = "5-6.部门一起活动的情况少，懒于组织部门活动，部门感情淡薄";
				this.d = "3-4.部门基本没有一起出去活动过，部门内所有人工作热情很低，怨言重";
			}
			function obj_LDNL()
			{
				this.bz = "领导能力";
				this.a = "9-10.能有效组织整个部门积极高效的完成工作，领导执行力强 ";
				this.b = "7-8.能组织部门活动、工作，有一定的领导及执行力 ";
				this.c = "5-6.组织部门成员进行工作有一定难度，缺乏领导力 ";
				this.d = "3-4.很难领导部门成员进行工作，执行力弱 ";
			}
			this.arrObj = new Array(new obj_FPGZNL(), new obj_DDNL(),
										new obj_BMGQ(), new obj_LDNL());
		}
		
		this.arrObj_BZZP = new Array(new obj_GZQK(), new obj_GZNL(), 
									new obj_XZNL(), new obj_GLNL());

	}
	
	var objReturn = new obj_BZZP();
	return objReturn;
}


//获取部长自评表数据
function Get_BZZP()
{

		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/funcbzzp",
		data:{"year":year,"month":month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
        var json_Get_BZZP = obj;
		*/
		

	var json_Get_BZZP = 
	{
		"zongfen" : 0, //总分
		"status" : 0, //是否为可提交状态
		"hadSubmit":0,//是否提交过，是的话为1
		"arrDF" : //得分数组
		[
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
			{"df" : 0,}, //得分
		],

		"zwpj" : "", //自我评价
		"DQTBZPJ" : //对本部门其他部长评价
		{
			"sum" : 4, //部长人数
			"arrBZ" :
			[
				{"name" : "邓作恒", "account":2013042210, "fs":100,"pj":"不错",}, //名字，学号，得分，评价评语
				{"name" : "邓作恒", "account":2013042210, "fs":100,"pj":"不错",}, //名字，学号，得分，评价评语
				{"name" : "邓作恒", "account":2013042210, "fs":100,"pj":"不错",}, //名字，学号，得分，评价评语
				{"name" : "邓作恒", "account":2013042210, "fs":100,"pj":"不错",}, //名字，学号，得分，评价评语
			],
		},

		"dzgfzxpj" : "很好", //对主管副主席评价
		
		"NMPJ"://对主席团成员的匿名评价	
		[
			{"name":"主席", "account":2013042210, "depart":"副主席", "pj":"匿名评价"},
			{"name":"主席", "account":2013042210, "depart":"副主席", "pj":"匿名评价"},
			{"name":"主席", "account":2013042210, "depart":"副主席", "pj":"匿名评价"},
			{"name":"主席", "account":2013042210, "depart":"副主席", "pj":"匿名评价"},
			{"name":"主席", "account":2013042210, "depart":"副主席", "pj":"匿名评价"},
		],
		"TongShi":
		[
			{"name":"同事A","account":2012052210},
			{"name":"同事B","account":2012052211},
			{"name":"同事C","account":2012052212},
			{"name":"同事D","account":2012052213},
			{"name":"同事E","account":2012052214},
			{"name":"同事F","account":2012052215},
		],
		"TongShiliuYan":
		[
			{"account":2012052210,"liuyan":"我喜欢你"},
			{"account":2012052211,"liuyan":"我喜欢你的手机"},
		],
	};
	var objBZZP =  BZZP_BZ();
			
	function obj_BZZP() 
	{
		this.zongfen = json_Get_BZZP.zongfen;//总分
		this.status = json_Get_BZZP.status;//是否为可提交状态
		this.arrDF = new Array(); //得分数组
		var iCount = 0;
		for (var i = 0; i < objBZZP.arrObj_BZZP.length; ++i) 
		{
			this.arrDF[i] = new Array();
			for (var j = 0; j <  objBZZP.arrObj_BZZP[i].arrObj.length; ++j) 
			{
				this.arrDF[i][j] = json_Get_BZZP.arrDF[iCount++].df;
			}
		}

		this.zwpj = TranStr_Get(json_Get_BZZP.zwpj); //自我评价
		if(this.zwpj == "")
		{
			this.zwpj = "请填写.....";
		}
		
		function DQTBZPJ(BZ) //对本部门其他部长评价
		{
			this.name = BZ.name;
			this.account = BZ.account;
			this.fs = BZ.fs;
			this.pj = TranStr_Get(BZ.pj);
		}
		this.arrDQTBZPJ = new Array();
		for(var i = 0; i < json_Get_BZZP.DQTBZPJ.sum; ++i)
		{
			this.arrDQTBZPJ.push(new DQTBZPJ(json_Get_BZZP.DQTBZPJ.arrBZ[i]));
		}

		this.dzgfzxpj = TranStr_Get(json_Get_BZZP.dzgfzxpj); //对主管副主席评价
		if(this.dzgfzxpj == "")
		{
			this.dzgfzxpj = "请填写.....";
		}
		
		//匿名评价
		function obj_NMPJ(person)
		{
			this.name = person.name;
			this.account = person.account;
			this.depart = person.depart;
			this.pj = TranStr_Get(person.pj);
		}
		this.arrNMPJ = new Array();
		for(var i = 0; i < json_Get_BZZP.NMPJ.length; ++i)
		{
			this.arrNMPJ.push(new obj_NMPJ(json_Get_BZZP.NMPJ[i]));
		}
		this.arrTSLY=json_Get_BZZP.TongShiliuYan;
		for(var i=0;i<this.arrTSLY.length;i++)
		{
			this.arrTSLY[i].liuyan=TranStr_Get(this.arrTSLY[i].liuyan);
		}
		this.arrTongShi=json_Get_BZZP.TongShi;
	}
	var objReturn = new obj_BZZP();
	return objReturn;
}


//把部长自评表的填写的内容传给服务器
function Post_BZZP(obj_BZZP)//obj_BZZP为Get_BZZP()定义的对象
{
	var _arrDF = new Array();
	for (var i = 0; i < obj_BZZP.arrDF.length; ++i) 
	{
		for (var j = 0; j <  obj_BZZP.arrDF[i].length; ++j) 
		{
			_arrDF.push({"df" : obj_BZZP.arrDF[i][j]});
		}
	}
	
	var _arrBZ = new Array();
	for(var i = 0; i < obj_BZZP.arrDQTBZPJ.length; ++i)
	{
		_arrBZ.push({"name":obj_BZZP.arrDQTBZPJ[i].name, "account":obj_BZZP.arrDQTBZPJ[i].account, "fs" : obj_BZZP.arrDQTBZPJ[i].fs,"pj" : TranStr_Post(obj_BZZP.arrDQTBZPJ[i].pj),});
	}
	
	var _arrNMPJ = new Array();
	for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
	{
		_arrNMPJ.push({"name":obj_BZZP.arrNMPJ[i].name, "account":obj_BZZP.arrNMPJ[i].account, "depart":obj_BZZP.arrNMPJ[i].depart, "pj":TranStr_Post(obj_BZZP.arrNMPJ[i].pj)});
	}
	var _arrTSLY=new Array();
	for(var i=0;i<obj_BZZP.arrTSLY.length;++i)
	{
		if(obj_BZZP.arrTSLY[i].liuyan!=""&&obj_BZZP.arrTSLY[i].liuyan!=" "&&obj_BZZP.arrTSLY[i].liuyan!="无")
		{
			_arrTSLY.push({"account":obj_BZZP.arrTSLY[i].account,"liuyan":TranStr_Post(obj_BZZP.arrTSLY[i].liuyan)});
		}
	}
	var json_Post_BZZP = 
	{
	    "year" : year,
		"month" : month,
		"hadSubmit":obj_BZZP.hadSubmit,
		"zongfen" : obj_BZZP.zongfen, //总分
		"status" : obj_BZZP.status, //是否为可提交状态
		"arrDF" : _arrDF,//得分数组
		"zwpj" : TranStr_Post(obj_BZZP.zwpj), //自我评价
		"DQTBZPJ" : //对本部门其他部长评价
		{
			"sum" : obj_BZZP.arrDQTBZPJ.length, //部长人数
			"arrBZ" : _arrBZ,//部长数组
		},
		"dzgfzxpj" : TranStr_Post(obj_BZZP.dzgfzxpj), //对主管副主席评价	
		"NMPJ"://对主席团成员的匿名评价
		{
			"sum":obj_BZZP.arrNMPJ.length,//人数
			"arrNMPJ":_arrNMPJ,
		},
		"TSLY":_arrTSLY,
	};//alert(json_Post_BZZP.NMPJ.arrNMPJ[0].pj);
	//alert(json_Post_BZZP.NMPJ.arrNMPJ[2].account);
	//服务器成功接收信息，则返回true，否则返回false
	
	    //ajax请求，发送部长自评表
		
		var obj;
	    $.ajax({
		url:URL+"/post_bzzp",
		data:json_Post_BZZP,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		
	   
		//alert(obj.status);
	if(obj.status)
		return true;
	else
		return false;
}


//干事考核表的考核项目和评分标准
function GSKH_BZ()
{
	function objGSKH()
	{		
	
		this.str0 = 
		"<div id=\"gzl\">"
			+"<p><h3  style=\"text-align:center\">工作量</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.工作远多于部门内其他干事，需要较多时间完成</p>"
			+ "<p>7-8.工作与部门内其他干事差不多，在承受范围之内</p>"
			+ "<p>5-6.工作较部门内其他干事少，利用很少时间便可完成</p>"
			+ "<p>3-4.几乎没有工作</p>"
		+ "</div>";
		
		this.str1 = 
		"<div id=\"gzxl\">"
			+"<p><h3  style=\"text-align:center\">工作效率</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.总能提早截止日期较多完成安排下去的任务</p>"
			+ "<p>7-8.能够按时完成安排下去的任务，踩着时间点完成</p>"
			+ "<p>5-6.要超时才能完成安排下去的任务</p>"
			+ "<p>3-4.无法完成安排下去的任务</p>"
		+ "</div>";
		
		this.str2= 
		"<div id=\"gzzl\">"
			+"<p><h3  style=\"text-align:center\">工作质量</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.出色地完成各项任务，并有一定的突破，工作过程中无纰漏和失误，完成质量很高</p>"
			+ "<p>7-8.能够顺利按要求完成任务，质量一般，存在一些细节性的失误和漏洞</p>"
			+ "<p>5-6.工作或任务内容有一小部分未能完成，存在一定的失误，需要不断修改</p>"
			+ "<p>3-4.工作完成情况较差，出现较严重的错误</p>"
		+ "</div>";
		
		this.str3=
		"<div id=\"gzzl\">"
			+"<p><h3  style=\"text-align:center\">工作态度</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.对待工作积极性高，主动要求工作，并且能认真热情的完成；责任感强，犯错时敢作敢担当；纪律性强，严格规范自身，工作严谨</p>"
			+ "<p>7-8.对待工作积极性一般，能接受布置的任务；责任感一般，犯错时能在监督下承担自己的责任；纪律性一般，大体遵守规章制度</p>"
			+ "<p>5-6.对待工作积极性低，能接受布置的任务但办事拖拉；责任感弱，犯错时会逃避或推卸；纪律性弱，偶尔不守纪律，但提醒后能改正</p>"
			+ "<p>3-4.对待工作积极性过低，完成任务时需不断催促；责任感过低，做事敷衍，犯错逃避或推卸责任；纪律性过低，经常不守纪律，再三提醒仍出错</p>"
		+ "</div>";
		this.str4 = 
		"<div id=\"jjx\">"
			+"<p><h3  style=\"text-align:center\">工作能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能很好理解部长级交代的任务，并能在上级经验中加入自己的思考和看法，有创新既灵活又高效率，在遇事能随机应变，首想自己解决而非寻求帮助。</p>"
			+ "<p>7-8.能明白部长级交代的任务但仍需询问提醒，工作时中规中矩无新意也能顺利完成，偶尔有新意，在遇事时首想寻求帮助，偶尔自己解决。</p>"
			+ "<p>5-6.未能及时理解部长级交代的任务需不断询问提醒，工作时不按照指导爱擅作主张，无想法，只在被问时才偶尔有点想法，遇事时总求助他人，勉强解决问题。</p>"
			+ "<p>3-4.不理解部长级交代的任务且在不断提醒后仍态度懒散，工作时自作主张导致失误，基本没有创新，被动下也无新想法，遇事时不会随机应变，也不寻求帮助。</p>"
		+ "</div>";
		this.str5 = 
		"<div id=\"hznl\">"
			+"<p><h3  style=\"text-align:center\">合作能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能够很好的与他人合作，能提出自己想法，发挥自己的作用，也能接受他人意见</p>"
			+ "<p>7-8.愿意与他人合作，但合作中能够相处愉快，但不太主动</p>"
			+ "<p>5-6.仅在必要时才与人合作，偶尔会有摩擦，勉强接受与自己不一致的意见</p>"
			+ "<p>3-4.排斥与他人合作，十分难以相处</p>"
		+ "</div>";
		
		this.str6 = 
		"<div id=\"bdnl\">"
			+"<p><h3  style=\"text-align:center\">表达能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能够清晰地表达自己的观点，让别人乐于聆听和理解自己的想法</p>"
			+ "<p>7-8.能够表达自己的观点，但需要其他人稍作提示</p>"
			+ "<p>5-6.表达自己的观点时存在有人听不懂请求解释的情况，但能解释清楚</p>"
			+ "<p>3-4.表达自己观点时太含糊，别人完全听不懂，解释自己的观点时也不够清楚</p>"
		+ "</div>";
		
		this.str7 = 
		"<div id=\"tdjs\">"
			+"<p><h3  style=\"text-align:center\">团队精神</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.爱护团体，有强烈的团队精神，部门内有活动总是热情参与，也常协助其他同事</p>"
			+ "<p>7-8.比较爱护团体，能参与部门活动但偶尔会缺席，与其他同事感情良好</p>"
			+ "<p>5-6.团队精神欠缺，偶尔不愿意与部门一起活动，才与部门内其他成员沟通少</p>"
			+ "<p>3-4.脱离群众，排斥与部门一起活动，更愿意单独行动，必要时才与他人沟通</p>"
		+ "</div>";
		
	}
	
	var objReturn = new objGSKH();
	return objReturn;
}


//获取干事考核表数据
function Get_GSKH()
{
	//部门特色，要从服务器获取
		
		var arrBMTS=new Array();
		//秘书
		arrBMTS[0]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">秘书处职能</h3></p>"
					+"<p>评价标准:</p>"
					+"<p>文档制作能力、细致认真程度、协调应急能力</p>"          
					+"<p>（每一项必须评，每项3.333333分，请直接写出以总分为10分的分数）</p>"
					+"</div>";
		//人力
		arrBMTS[1]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">人力职能</h3></p>"
					+"<p>评价标准:</p>"
					+"<p>软件使用（包括excel，ppt，word）</p>"  
					+"<p>撰写能力（写策划的能力和发短信内容）</p>"
					+"</div>";
		//宣传
		arrBMTS[2]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">宣传部职能</h3></p>"
					+"<p>立宣制作:</p>"
					+"<p>9-10.立宣的制作方面很有想法，可行性很好</p>"          
					+"<p>7-8.立宣的制作想法，可行性基本ok</p>"
					+"<p>5-6.立宣制作方面很有想法，但可行性不足</p>"
					+"<p>3-4.立宣的制作基本没什么想法，跟着别人想法走</p>"
					+"<p>电宣制作:</p>"
					+"<p>9-10.能熟练地运用PS制作电宣，作品效果很好</p>"          
					+"<p>7-8.电宣制作基本ok，基本符合活动部门要求</p>"
					+"<p>5-6.电宣制作想法很好，但制作欠佳</p>"
					+"<p>3-4.电宣方面训练不够，作品欠佳</p>"
					+"<p>（立宣制作和电宣制作每项5分，请直接写出以总分为10分的分数）</p>"
					+"</div>";	
		//信编
		arrBMTS[3]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">信编职能</h3></p>"
					+"<p>评价说明:</p>"
					+"<p>撰写新闻稿能力，拍照能力，制作视频能力</p>"          
					+"<p>（请部长级选择自己了解的一项进行打分，直接写出以总分为10分的分数）</p>"
					+"</div>";	
		//学术		
		arrBMTS[4]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
					+"<p>评价说明:</p>"
					+"<p>您的部门没有设置部门特色评分项，请填写为0</p>"          
					+"</div>";
		//体育
		arrBMTS[5]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
					+"<p>评价说明:</p>"
					+"<p>您的部门没有设置部门特色评分项，请填写为0</p>"          
					+"</div>";
		//KSC
		arrBMTS[6]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">交流会表现得分</h3></p>"
					+"<p>评价说明:</p>"
					+"<p>根据小干事在交流会上学习的参与积极性以及会后任务题的完成度打分</p>"          
					+"<p>（满分10分）</p>"
					+"</div>";
		//组织部
		arrBMTS[7]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
					+"<p>活动方面:</p>"
					+"<p>9-10.主动要求任务，对办活动充满热情，并认真负责地完成，并且对活动提出宝贵建议</p>"
					+"<p>7-8.偶尔会提出自己的想法，会负责完成任务</p>"
					+"<p>5-6.觉得无所谓，偶尔不愿意工作，但还是会完成自己的任务，不会提出自己的想法</p>"
					+"<p>3-4.完全被动型，觉得很麻烦，有种被迫去做的感觉</p>"
					+"<p>处理团务:</p>"
					+"<p>9-10.每次都很认真完成任务，并细心、有耐心地尽自己的职责，乐于接受任务</p>"              
					+"<p>7-8.会负责任地完成任务，工作效果良好</p>"
					+"<p>5-6.欠缺耐心，有时候不想完成任务，属于被动型</p>"
					+"<p>3-4.觉得团务很麻烦，完全不想完成任务，被催了才会去做</p>"
					+"<p>（处理团务和活动方面每项5分，请直接写出以总分为10分的分数）</p>"
					+"</div>";
		//文娱
		arrBMTS[8]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">与部门内其他人联系情况</h3></p>"
					+"<p>9-10.多，积极</p>"
					+"<p>7-8.还行</p>"
					+"<p>5-6.比较少</p>"
					+"<p>3-4.很少</p>"
					+"</div>";	

		//公关
		arrBMTS[9]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">部门特色</h3></p>"
					+"<p>评价说明:</p>"
					+"<p>您的部门没有设置部门特色评分项，请填写为0</p>"          
					+"</div>";
		//心服
		arrBMTS[10]="<div id=\"bmts\">"
					+"<p><h3  style=\"text-align:center\">心服职能</h3></p>"
					+"<p>评价说明:</p>"
					+"<p>心理知识</p>"          
					+"<p>（满分10分）</p>"
					+"</div>";		
		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/funcgskh",
		data:{'year':year,'month':month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});		
		//alert(obj.status);
	var json_Get_GSKH = obj;	
	*/
	var strBMTS=new String();
	var json_Get_GSKH = 
	{
		"status" : 0, //是否为可提交状态
		"bmts" : strBMTS, //部门特色，要从服务器获取
		"hadSubmit":0,//是否提交过，提交过为1

		"arrGSDF" :
		[
			{
				"name" : "干事", //干事名字
				"account": 2014073,//学号
				"df0" : 10, //工作方法
				"df1" : 10, //理解能力
				"df2" : 10, //创新能力
				"df3" : 10, //应变处理能力
				"df4" : 10, //合作能力
				"df5" : 10, //表达能力
				"df6" : 10, //团队精神
				"df7" : 10, //工作量
				"df8" : 10, //工作效率
				"df9" : 10, //工作质量
				"df10" :10, //积极性
				"df11" :10, //责任感
				"df12" : 10, //纪律性
				"df13" : 10, //部门特色
			},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			{"name":"干事","account":2014073,"df0": 9,"df1":9,"df2":9,"df3":9,"df4":9,"df5":9,"df6":9,"df7":9,"df8":9,"df9":9,"df10":9,"df11":9,"df12":9,"df13":9,},
			
		],
		
		"arrDGSPJ" :
		[
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
			{"name" : "干事", "account":201203, "pj" : "评价",}, //干事名字,学号， 对干事的评价
		],
	};
	
	var obj_BZ = GSKH_BZ();
	function obj_GSKH()
	{
		this.GSKH_BZ = obj_BZ;
		
		this.status = json_Get_GSKH.status;//是否为可提交状态		
		this.bmts = arrBMTS[json_Get_GSKH.apartment-1];//部门特色
		
		function obj_GSDF(GSDF)
		{	
			this.name = GSDF.name;//干事名字
			this.account = GSDF.account;//学号
			this.df0 = GSDF.df0;//工作方法
			this.df1 = GSDF.df1;//理解能力
			this.df2 = GSDF.df2;//创新能力
			this.df3 = GSDF.df3;//应变处理能力
			this.df4 = GSDF.df4;//合作能力
			this.df5 = GSDF.df5;//表达能力
			this.df6 = GSDF.df6;//团队精神
			this.df7 = GSDF.df7;//工作量
			this.df8 = GSDF.df8;//工作效率
			this.df9 = GSDF.df9;//工作质量
			this.df10 = GSDF.df10;//积极性
			this.df11 = GSDF.df11;//责任感
			this.df12 = GSDF.df12;//纪律性
			this.df13 = GSDF.df13;//部门特色
		}
		this.arrGSDF = new Array();
		for(var i = 0; i < json_Get_GSKH.arrGSDF.length; ++i)
		{
			this.arrGSDF.push(new obj_GSDF(json_Get_GSKH.arrGSDF[i]));
		}
		
		function obj_DGSPJ(DGSPJ)
		{
			this.name = DGSPJ.name;//干事名字
			this.account = DGSPJ.account;//学号
			this.pj = TranStr_Get(DGSPJ.pj);//对干事的评价
		}
		this.arrDGSPJ = new Array();
		for(var i = 0; i < json_Get_GSKH.arrDGSPJ.length; ++i)
		{
			this.arrDGSPJ.push(new obj_DGSPJ(json_Get_GSKH.arrDGSPJ[i]));
		}
	}
	
	var objReturn = new obj_GSKH();
	return objReturn;
}


//把干事考核表的填写的内容传给服务器
function Post_GSKH(obj_GSKH)//obj_GSKH为Get_GSKH()定义的对象
{
	var _arrGSDF = new Array();
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		_arrGSDF.push(
						{
							"name" : obj_GSKH.arrGSDF[i].name, //干事名字
							"account": obj_GSKH.arrGSDF[i].account,//学号
							"df0" : obj_GSKH.arrGSDF[i].df0, //工作方法
							"df1" : obj_GSKH.arrGSDF[i].df1, //理解能力
							"df2" : obj_GSKH.arrGSDF[i].df2, //创新能力
							"df3" : obj_GSKH.arrGSDF[i].df3, //应变处理能力
							"df4" : obj_GSKH.arrGSDF[i].df4, //合作能力
							"df5" : obj_GSKH.arrGSDF[i].df5, //表达能力
							"df6" : obj_GSKH.arrGSDF[i].df6, //团队精神
							"df7" : obj_GSKH.arrGSDF[i].df7, //工作量
							"df8" : obj_GSKH.arrGSDF[i].df8, //工作效率
							"df9" : obj_GSKH.arrGSDF[i].df9, //工作质量
							"df10" : obj_GSKH.arrGSDF[i].df10, //积极性
							"df11" : obj_GSKH.arrGSDF[i].df11, //责任感
							"df12" : obj_GSKH.arrGSDF[i].df12, //纪律性
							"df13" : obj_GSKH.arrGSDF[i].df13, //部门特色
						}
					  );
	}
	
	var _arrDGSPJ = new Array();
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		_arrDGSPJ.push({"name" : obj_GSKH.arrDGSPJ[i].name,"account":obj_GSKH.arrDGSPJ[i].account, "pj" : TranStr_Post(obj_GSKH.arrDGSPJ[i].pj)});
	}
	
	var json_Post_GSKH = 
	{
	    "year" : year,
		"month" : month,
		"status" : obj_GSKH.status, //是否为可提交状态
		"hadSubmit":obj_GSKH.hadSubmit,
		//"bmts" : strBMTS, //部门特色，要从服务器获取
		"GSDF" : //干事得分
		{
			"sum" : obj_GSKH.arrGSDF.length, //干事人数
			"arrGSDF" : _arrGSDF,//得分数组
		},
		
		"DGSPJ" : //对干事评价
		{
			"sum" : obj_GSKH.arrGSDF.length,//干事人数
			"arrDGSPJ" :_arrDGSPJ,
		},
	};
	//alert(json_Post_GSKH.GSDF.arrGSDF[0].name + json_Post_GSKH.DGSPJ.arrDGSPJ[3].account);
	
	
		//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/post_gskh",
		data:json_Post_GSKH,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
	
	//服务器成功接收信息，则返回true，否则返回false
	if(obj.status)
		return true;
	else
		return false;
}


//获取部长反馈表数据
function Get_BZFK()
{
	//此函数返回的是一个对象，对象的成员是总分，得分细项的数组，自我评价，干事评价数组，其他部长评价数组
	//主管副主席，干事自我评价数组
	//部门得分，部门排名，部门得分细则数组、主席的部门评价，主管副主席的部门评价
	
		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/jsbzfk",
		data:{"year":year,"month":month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});		
        var json_BZFK =obj; 
		*/
	//	alert(obj.ZongFen);
	
	var json_BZFK = 
	{
		"ZongFen":1024,//总分
		"arrDeFenXiZhe"://这是得分细则数组，共8项，具体对应参考该表格
		{
			"a":2, "b":4, "c":8, "d":16, "e":32, "f":64, "g":128, "h":256, 
		},
		"ZiWoPingJia":"还好吧，很好，非常好，无与伦比",//自我评价
		"QiTaBuZhanPinJia":
		{
			"sum":3,//部长人数
			"arrQiTaBuZhanPinJia":
			[
				{"pj":"还好",},//其他部长评价
			],
		},
		
		"ZhuGuanFuZhuXiPinJia":"还好吧，很好，非常好，无与伦比",//主管副主席评价
		
		"GSZP":
		{
			"sum":15,//干事人数
			"arrGSZP":
			[
				{"name":"干事1", "account":2014052211, "assess":"还好吧的干事自评",},//干事姓名, 学号，干事自我评价
			]
		},
		"arrGSPM":
		[
			{"name":"干事1","score":"100"},
		],
		
		"GanShiPingJia":
		{
			"sum":4,//干事人数
			"arrGanShiPingJia"://干事评价数组
			[
				{"gspj":"还好吧"},
			],
		},
		
		"BuMenDeFeng":"1024",//部门得分
		"BuMenPaiMing"://列出部门得分排名，从得分高到得分低
		[
			{"bm":1,"df":1234},
			{"bm":2,"df":123},
			{"bm":3,"df":12},
			{"bm":4,"df":1},
		],
			
		
		"arrBuMenDeFenXiZhe"://这是部门得分细则数组，共八项，具体参看表格
		{
			"a":2, "b":4, "c":8, "d":16, "e":32, "f":64, "g":128, "h":256, 
		},
		
		"ZhuGuanFuZhuXiBuMenPinJia":"还好吧",//主管副主席的部门评价
		"ZhuXiDeBuMenPinJia":"还好吧",//主席的部门评价
		"LiuYan":
		[
			{"liuyan":"你欠我的50块什么时候还- -"},
			{"liuyan":"下个星期还你- -"},
			{"liuyan":"无"},
			{"liuyan":" "},
		],
		"BuMenLiuYan":
		[
			{"liuyan":"这个部门还是撤了吧- -"},
			{"liuyan":"我上次活动的前还没报销呢"},
		],
		
	};
	
	function classBZFK()
	{
		this.ZongFen = json_BZFK.ZongFen;
		this.arrDeFenXiZhe = new Array(json_BZFK.arrDeFenXiZhe.a, json_BZFK.arrDeFenXiZhe.b, json_BZFK.arrDeFenXiZhe.c, json_BZFK.arrDeFenXiZhe.d, json_BZFK.arrDeFenXiZhe.e, json_BZFK.arrDeFenXiZhe.f, json_BZFK.arrDeFenXiZhe.g, json_BZFK.arrDeFenXiZhe.h);
		//这是得分细则数组，共8项，具体对应参考该表格
		this.ZiWoPingJia = TranStr_Get(json_BZFK.ZiWoPingJia);//自我评价
		
		
		this.arrQiTaBuZhanPinJia = new Array();//其他部长评价数组
		for(var i = 0; i < json_BZFK.QiTaBuZhanPinJia.arrQiTaBuZhanPinJia.length; ++i)
		{
			var str = TranStr_Get(json_BZFK.QiTaBuZhanPinJia.arrQiTaBuZhanPinJia[i].pj);
			this.arrQiTaBuZhanPinJia.push(str);
		}
		this.ZhuGuanFuZhuXiPinJia =  TranStr_Get(json_BZFK.ZhuGuanFuZhuXiPinJia);//主管副主席评价
		
		function classGanShi(GSZP)
		{
			this.name = GSZP.name;//干事姓名
			this.account = GSZP.account;//学号
			this.assess = TranStr_Get(GSZP.assess);//干事自我评价
		}
		
		var arrGSZP = new Array();
		for(var i=0;i<json_BZFK.GSZP.arrGSZP.length;i++)
		{
			arrGSZP[i]=new classGanShi(json_BZFK.GSZP.arrGSZP[i]);
		}
		
		this.arrGanShiPingJia = new Array( );//干事评价数组
		for(var i = 0; i < json_BZFK.GanShiPingJia.arrGanShiPingJia.length; ++i)
		{
			var str = TranStr_Get(json_BZFK.GanShiPingJia.arrGanShiPingJia[i].gspj);
			this.arrGanShiPingJia.push(str);
		}
		this.arrLiuYan=new Array();
		
		for(var i=0;i<json_BZFK.LiuYan.length;i++)
		{
			var str=TranStr_Get(json_BZFK.LiuYan[i].liuyan);
			if(str==""||str=="无"||str==" ")
			{
				continue;
			}
			else
			{
				this.arrLiuYan.push(str);
			}
		}
		this.arrBuMenLiuYan=new Array();
		for(var i=0;i<json_BZFK.BuMenLiuYan.length;i++)
		{
			var str=TranStr_Get(json_BZFK.BuMenLiuYan[i].liuyan);
			if(str==""||str=="无"||str==" ")
			{
				continue;
			}
			else
			{
				this.arrBuMenLiuYan.push(str);
			}
		}
		this.arrGanShiZhiWoPinJia = arrGSZP;//干事自我评价数组
		this.arrGanShiDeFengPaiMing = json_BZFK.arrGSPM//干事排名
		this.BuMenDeFeng = json_BZFK.BuMenDeFeng;//部门得分
		this.arrBuMenPaiMing = json_BZFK.BuMenPaiMing;//部门排名
		this.arrBuMenDeFenXiZhe = new Array(json_BZFK.arrBuMenDeFenXiZhe.a, json_BZFK.arrBuMenDeFenXiZhe.b, json_BZFK.arrBuMenDeFenXiZhe.c, json_BZFK.arrBuMenDeFenXiZhe.d, json_BZFK.arrBuMenDeFenXiZhe.e, json_BZFK.arrBuMenDeFenXiZhe.f, json_BZFK.arrBuMenDeFenXiZhe.g,json_BZFK.arrBuMenDeFenXiZhe.h);
		//这是部门得分细则数组，共八项，具体参看表格
		this.ZhuGuanFuZhuXiBuMenPinJia = TranStr_Get(json_BZFK.ZhuGuanFuZhuXiBuMenPinJia);//主管副主席的部门评价
		this.ZhuXiDeBuMenPinJia = TranStr_Get(json_BZFK.ZhuXiDeBuMenPinJia);//主席的部门评价
	}
	var objBZFK = new classBZFK();
	return objBZFK;
}


//部长考核表的考核项目和评分标准
function BZKH_BZ()
{
	function objBZKH()
	{		
	
		this.str0 = 
		"<div id=\"gtnl\">"
			+"<p><h3  style=\"text-align:center\">沟通能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.沟通能力很强，能够经常与上级和下级进行有效的沟通，效果很好</p>"
			+ "<p>7-8.愿意与上级和下级沟通，沟通效果尚可</p>"
			+ "<p>5-6.不乐于与人沟通，仅在必要沟通时才会沟通，效果一般</p>"
			+ "<p>3-4.沟通合作能力差，不肯与人合作，完全封闭自我</p>"
		+ "</div>";
		
		this.str1 = 
		"<div id=\"hznl\">"
			+"<p><h3  style=\"text-align:center\">合作能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能够很好的与他人合作，能提出自己想法，发挥自己的作用，也能接受他人意见</p>"
			+ "<p>7-8.愿意与他人合作，但合作中能够相处愉快，但不太主动</p>"
			+ "<p>5-6.仅在必要时才与人合作，偶尔会有摩擦，勉强接受与自己不一致的意见</p>"
			+ "<p>3-4.排斥与他人合作，十分难以相处</p>"
		+ "</div>";
		
		this.str2 = 
		"<div id=\"bdnl\">"
			+"<p><h3  style=\"text-align:center\">表达能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能够清晰地表达自己的观点，让别人乐于聆听和理解自己的想法</p>"
			+ "<p>7-8.能够表达自己的观点，但需要其他人稍作提示</p>"
			+ "<p>5-6.表达自己的观点时存在有人听不懂请求解释的情况，但能解释清楚</p>"
			+ "<p>3-4.表达自己观点时太含糊，别人完全听不懂，解释自己的观点时也不够清楚</p>"
		+ "</div>";
		
		this.str3 = 
		"<div id=\"jjwtnl\">"
			+"<p><h3  style=\"text-align:center\">管理能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能很好地管理部门事务和干事工作，有条理性，恰到好处，使工作能井然有序进行。</p>"
			+ "<p>7-8.能较好地管理部门事务和干事工作，有少许纰漏导致少许失序，但工作亦能较好进行。</p>"
			+ "<p>5-6.能一般地管理部门失误和干事工作，纰漏略多，失误略多，工作未能较好进行。</p>"
			+ "<p>3-4.太放任管理部门事务和干事工作不管，导致失误多，工作效果差，无法完成任务。</p>"
		+ "</div>";
		
		this.str4 = 
		"<div id=\"lddnl\">"
			+"<p><h3  style=\"text-align:center\">领导能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能有效组织整个部门积极高效的完成工作，领导执行力强 </p>"
			+ "<p>7-8.能组织部门活动、工作，有一定的领导及执行力 </p>"
			+ "<p>5-6.组织部门成员进行工作有一定难度，缺乏领导力 </p>"
			+ "<p>3-4.很难领导部门成员进行工作，执行力弱 </p>"
		+ "</div>";
		
		this.str5 = 
		"<div id=\"gzl\">"
			+"<p><h3  style=\"text-align:center\">工作量</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.工作远多于其他部门或本部门内其他部长，难度较大，需要较多时间完成</p>"
			+ "<p>7-8.工作与部门内其他部长相当，在承受范围之内</p>"
			+ "<p>5-6.工作较部门内其他部长少，利用很少时间便可完成</p>"
			+ "<p>3-4.几乎没有工作</p>";
		+ "</div>";
		
		this.str6 = 
		"<div id=\"wcqk\">"
			+"<p><h3  style=\"text-align:center\">工作方法</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.在工作中逐渐自主创新找到新方法并取得良好的成效，有突破</p>"
			+ "<p>7-8.按照固有方式按部就班并认真完成，效果较好</p>"
			+ "<p>5-6.按照固有方式完成但效率不高</p>"
			+ "<p>3-4.没能找到合适的方法使工作效率降低</p>"
		+ "</div>";
		
		this.str7 = 
		"<div id=\"gzff\">"
			+"<p><h3  style=\"text-align:center\">工作态度</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.对工作能够极其积极认真负责的完成，犯错误能自觉主动对自己的行为及后果负责</p>"
			+ "<p>7-8.布置的任务能够完成，积极度一般，犯错能在其他人监督下对自己的行为后果负责</p>"
			+ "<p>5-6.布置的任务不一定能认真负责的完成，对于工作中的失误有时逃避或推卸责任</p>"
			+ "<p>3-4.布置的任务敷衍不负责，对于工作中的失误总是逃避或推卸责任</p>"
		+ "</div>";
		
		this.str8 = 
		"<div id=\"tcnl\">"
			+"<p><h3  style=\"text-align:center\">工作能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.善于统筹规划，大局与细节并重，细心认真，能不断正确思考分析问题并时常能有新想法，及时发现并较好地解决问题给部门带来利益，遇事能随机应变，自行解决不求他人</p>"
			+ "<p>7-8.能顺利完成任务，细节方面有瑕疵，效果尚可，能思考问题，偶尔能主动提出新想法，但难以较好的解决问题，遇事时先求助他人，偶尔自行解决</p>"
			+ "<p>5-6.统筹能力不够，细节照顾不够，任务未能顺利完成，难以发现问题，基本无创新思想，发现问题亦需花费不少时间解决，遇事时求助他人不求自己，勉强完成任务</p>"
			+ "<p>3-4.基本未完成任务，细节忽略较多，无法发现问题，待提醒后亦未几时解决问题，无创新能力，无想法，遇事不随机应变，不求助亦不自助</p>"
		+ "</div>";
		
	}
	
	var objReturn = new objBZKH();
	return objReturn;
}


//获取部长考核表数据
function Get_BZKH()
{

		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/funcbzkh",
		data:{'year':year,'month':month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
        var json_BZKH = obj;
		*/
	var json_BZKH = 
	{
		"status":0,//是否为可提交状态
		"hadSubmit":0,
		"BMBZ":
		{
			"bmsm":3,//部门数目
			"arrBM":
			[
				{
					"bm" : 1, //部门名字
					"bzrs" : 4, //部长人数
					"arrBZ" :
					[
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						
						
					],
				},
				
				{
					"bm" : 2, //部门名字
					"bzrs" : 4, //部长人数
					"arrBZ" :
					[
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
					],
				},
				
				{
					"bm" : 3, //部门名字
					"bzrs" : 4, //部长人数
					"arrBZ" :
					[
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
						{
							"bzmz" : "部长", //部长名字
							"account":20120421,//学号
							"pj" : "评价",
							"df0":0,"df1":1,"df2":2,"df3":3,"df4":4,"df5":5,"df6":6,"df7":7,"df8":8,"df9":9,"df10":10,"df11":11,"df12":12,"df13":13,"df14":14,
						},
					],
				},
				
			],
		}
	}
	
	
	function obj_BZKH()
	{//alert("jjj"+json_BZKH.BMBZ.arrBM[0].bm);
		this.status = json_BZKH.status;//是否为可提交状态
		
		this.BZKH_BZ = new BZKH_BZ();
		
		function obj_BMBZ(BM)
		{
			this.bm = TranDigToText(BM.bm);//部门名字
			function obj_BZ(BZ)
			{
				this.bzmz = BZ.bzmz;//部长名字
				this.account = BZ.account;//学号
				this.pj = TranStr_Get(BZ.pj);//评价
				this.df0 = BZ.df0;//工作量
				this.df1 = BZ.df1;//完成情况
				this.df2 = BZ.df2;//工作方法
				this.df3 = BZ.df3;//沟通能力
				this.df4 = BZ.df4;//合作能力
				this.df5 = BZ.df5;//表达能力
				this.df6 = BZ.df6;//发现/解决问题能力
				this.df7 = BZ.df7;//统筹能力
				this.df8 = BZ.df8;//创新能力
				this.df9 = BZ.df9;//应变处理能力
				this.df10 = BZ.df10;//责任感
				this.df11 = BZ.df11;//纪律性
				this.df12 = BZ.df12;//监督能力
				this.df13 = BZ.df13;//领导能力
				this.df14 = BZ.df14;//部门感情
			}
			this.arrBZ = new Array();
			for(var i = 0; i < BM.arrBZ.length; ++i)
			{
				this.arrBZ.push(new obj_BZ(BM.arrBZ[i]));
			}
		}
		this.arrBMBZ = new Array();
		for(var i = 0; i < json_BZKH.BMBZ.arrBM.length; ++i)
		{
			this.arrBMBZ.push(new obj_BMBZ(json_BZKH.BMBZ.arrBM[i]));
		}	
		this.hadSubmit=json_BZKH.BMBZ.hadSubmit;
	}
	
	var objReturn = new obj_BZKH();
	return objReturn;
}


//把部长考核表的填写的内容传给服务器
function Post_BZKH(obj_BZKH)//obj_BZKH为Get_BZKH()定义的对象
{
	var _arrBM = new Array();
	for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
	{
		var _arrBZ = new Array();
		for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			_arrBZ.push(
							{
								"bzmz" : obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz, //部长名字
								"account": obj_BZKH.arrBMBZ[i].arrBZ[j].account,//学号
								"pj" : TranStr_Post(obj_BZKH.arrBMBZ[i].arrBZ[j].pj),
								"df0" : obj_BZKH.arrBMBZ[i].arrBZ[j].df0, //工作量
								"df1" : obj_BZKH.arrBMBZ[i].arrBZ[j].df1, //完成情况
								"df2" : obj_BZKH.arrBMBZ[i].arrBZ[j].df2, //工作方法
								"df3" : obj_BZKH.arrBMBZ[i].arrBZ[j].df3, //沟通能力
								"df4" : obj_BZKH.arrBMBZ[i].arrBZ[j].df4, //合作能力
								"df5" : obj_BZKH.arrBMBZ[i].arrBZ[j].df5, //表达能力
								"df6" : obj_BZKH.arrBMBZ[i].arrBZ[j].df6, //发现/解决问题能力
								"df7" : obj_BZKH.arrBMBZ[i].arrBZ[j].df7, //统筹能力
								"df8" : obj_BZKH.arrBMBZ[i].arrBZ[j].df8, //创新能力
								"df9" : obj_BZKH.arrBMBZ[i].arrBZ[j].df9, //应变处理能力
								"df10" : obj_BZKH.arrBMBZ[i].arrBZ[j].df10, //责任感
								"df11" : obj_BZKH.arrBMBZ[i].arrBZ[j].df11, //纪律性
								"df12" : obj_BZKH.arrBMBZ[i].arrBZ[j].df12, //监督能力
								"df13" : obj_BZKH.arrBMBZ[i].arrBZ[j].df13, //领导能力
								"df14" : obj_BZKH.arrBMBZ[i].arrBZ[j].df14, //部门感情
							}
						);
		}
		_arrBM.push({"bm" : TranTextToDig(obj_BZKH.arrBMBZ[i].bm), "bzrs" : obj_BZKH.arrBMBZ[i].arrBZ.length, "arrBZ" :_arrBZ});
	}
	//alert(_arrBM[0].arrBZ[0].pj+"   kkk");
	var json_Post_BZKH = 
	{
	    "year" : year,
		"month" : month,
		"status":obj_BZKH.status,//是否为可提交状态
		"hadSubmit":obj_BZKH.hadSubmit,
		"BMBZ":
		{
			"bmsm":obj_BZKH.arrBMBZ.length,//部门数目
			"arrBM":_arrBM,
		}			
	};

	//alert(json_Post_BZKH.BMBZ.arrBM[3].arrBZ[2].account);
	
	//服务器成功接收信息，则返回true，否则返回false
	
		//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/post_bzkh",
		data:json_Post_BZKH,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
	
	if(obj.status)
		return true;
	else
		return false;
}


//部门考核表的考核项目和评分标准
function BMKH_BZ()
{
	function objBMKH()
	{		
		this.str0 = 
		"<div id=\"gznd\">"
			+"<p><h3  style=\"text-align:center\">工作量/工作难度</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.工作量远高于其他部门，工作难度也很大</p>"
			+ "<p>7-8.工作量与其他部门相当，工作难度适中</p>"
			+ "<p>5-6.工作量较其他部门较少，不太有难度</p>"
			+ "<p>3-4.工作量远少于其他部门，能够很轻松的完成</p>"
		+ "</div>";
				
		this.str1 = 
		"<div id=\"gzwcxg\">"
			+"<p><h3  style=\"text-align:center\">工作完成效果</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.很满意，完成的超出预期，效果很好，各方面反响都比较热烈</p>"
			+ "<p>7-8.基本满意，能够顺利完成，虽有些细节没有注意，也达到预期效果，反响较好</p>"
			+ "<p>5-6.基本完成，但许多细节没有注意，也稍微不及预想效果，反响一般</p>"
			+ "<p>3-4.基本未完成，犯了比较严重的错误，远不及预期效果，反响较差</p>"
		+ "</div>";
		
		this.str2 = 
		"<div id=\"gztd\">"
			+"<p><h3  style=\"text-align:center\">工作态度</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.各成员都能积极完成工作，并对工作认真负责</p>"
			+ "<p>7-8.各成员能按要求完成工作，但积极性一般</p>"
			+ "<p>5-6.有部分成员对工作不够热心，不能很好地配合部门工作</p>"
			+ "<p>3-4.整个部门做事松散，不能及时有序的完成工作要求</p>"
		+ "</div>";
		
		this.str3 = 
		"<div id=\"jlx\">"
			+"<p><h3  style=\"text-align:center\">纪律性</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.部门内所有成员都有良好的纪律意识，严格规范自身，不随意违反制度，工作作风严谨</p>"
			+ "<p>7-8.能履行职责，成员大体上能遵守各项规章制度，但有个别分子作风比较随意</p>"
			+ "<p>5-6.偶尔有成员会发生不守纪律的事情，给部门或兄弟部门带来不便，但在他人提醒下能够改正</p>"
			+ "<p>3-4.成员经常发生不守纪律的事，他人再三提醒下还会出现问题，不愿改正</p>";
		+ "</div>";
		
		this.str4 = 
		"<div id=\"bmnjl\">"
			+"<p><h3  style=\"text-align:center\">部门凝聚力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.部门成员团结一致，奋发向上，所有成员感情很好，其乐融融，有归属感</p>"
			+ "<p>7-8.部门感情较好，部门成员能按要求工作，也较有热情</p>"
			+ "<p>5-6.部门成员合作中有时分歧且不能及时解决，导致工作热情降低，内部感情淡薄</p>"
			+ "<p>3-4.部门成员无法合作，所有人工作热情很低，怨言重，而且十分松散</p>"
		+ "</div>";

		this.str5 = 
		"<div id=\"gthznl\">"
			+"<p><h3  style=\"text-align:center\">沟通合作能力</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.能跟其他兄弟部门很好的沟通交流合作，尊重其他部门工作，相处十分和谐，合作效果很好</p>"
			+ "<p>7-8.跟兄弟部门合作效果尚可，偶尔发生分歧，但最终能共同完成任务</p>"
			+ "<p>5-6.跟兄弟部门合作时有分歧且不能及时解决，导致关系较差，影响了合作关系</p>"
			+ "<p>3-4.跟兄弟部门成员完全无法合作，以本部门为中心，完全不顾其他部门</p>"
		+ "</div>";
		
		this.str6 = 
		"<div id=\"bmcybx\">"
			+"<p><h3  style=\"text-align:center\">部门成员表现</h3></p>"
			+"<p>评价标准:</p>"
			+ "<p>9-10.部长级能发挥应有的带头作用，干事能够听从部长级的安排，部门内工作进行的有条不紊</p>"
			+ "<p>7-8.部长级能够管理部门，但干事偶尔有不听从部长级安排的行为，但部门运作尚能进行</p>"
			+ "<p>5-6.部长级难以发挥其作用，干事不听从部长级安排，影响部门运作</p>"
			+ "<p>3-4.部长级完全无法管理整个部门，干事作风十分随意，严重影响部门运作</p>"
		+ "</div>";
	}
	
	var objReturn = new objBMKH();
	return objReturn;
}


//获取部门考核表数据
function Get_BMKH()
{

		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/funcbmkh",
		data:{'year':year,'month':month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});		
	var json_BMKH = obj;
	*/
	var json_BMKH = 
	{
		"status":0,//是否为可提交状态
		"hadSubmit":0,
		"BM":
		{
			"sum":4,//部门数目
			"arrBM":
			[
				{
					"bm":1, //部门名字
					"pj":"评价",
					"df0":0, //工作量/工作难度
					"df1":1, //工作完成效果
					"df2":2, //工作态度
					"df3":3, //纪律性
					"df4":4, //部门凝聚力
					"df5":5, //沟通合作能力
					"df6":6, //部门成员表现
				},
				
				{
					"bm":2, //部门名字
					"pj":"评价",
					"df0":0, //工作量/工作难度
					"df1":1, //工作完成效果
					"df2":2, //工作态度
					"df3":3, //纪律性
					"df4":4, //部门凝聚力
					"df5":5, //沟通合作能力
					"df6":6, //部门成员表现
				},
				
				{
					"bm":3, //部门名字
					"pj":"评价",
					"df0":0, //工作量/工作难度
					"df1":1, //工作完成效果
					"df2":2, //工作态度
					"df3":3, //纪律性
					"df4":4, //部门凝聚力
					"df5":5, //沟通合作能力
					"df6":6, //部门成员表现
				},
				
				{
					"bm":4, //部门名字
					"pj":"评价",
					"df0":0, //工作量/工作难度
					"df1":1, //工作完成效果
					"df2":2, //工作态度
					"df3":3, //纪律性
					"df4":4, //部门凝聚力
					"df5":5, //沟通合作能力
					"df6":6, //部门成员表现
				},
			],
		},
		
		"BuMen"://推优部门
		  [
		    {"name":1},
		    {"name":2},
		    {"name":3},
		    {"name":4},
			{"name":5},
		    {"name":6},
		    {"name":7},
		    {"name":8},
			{"name":9},
		    {"name":10},			
		  ],
		  
		  "TYBM":2,
	};
	
	function obj_BMKH()
	{
		this.status = json_BMKH.status;//是否为可提交状态
		
		this.BMKH_BZ = new BMKH_BZ();
		
		function obj_BM(BM)
		{
			this.bm = TranDigToText(BM.bm); //部门名字
			this.pj = TranStr_Get(BM.pj);
			this.df0 = BM.df0; //工作量/工作难度
			this.df1 = BM.df1; //工作完成效果
			this.df2 = BM.df2; //工作态度
			this.df3 = BM.df3; //纪律性
			this.df4 = BM.df4; //部门凝聚力
			this.df5 = BM.df5; //沟通合作能力
			this.df6 = BM.df6; //部门成员表现
		}
		this.arrBM = new Array();//alert(json_BMKH.BM.arrBM.length);
		for(var i = 0; i < json_BMKH.BM.arrBM.length; ++i)
		{
			this.arrBM.push(new obj_BM(json_BMKH.BM.arrBM[i]));
		}
		
		this.arrBuMen = new Array();
		for(var i = 0; i < json_BMKH.BuMen.length; ++i)
		{
			this.arrBuMen.push({"name":TranDigToText(json_BMKH.BuMen[i].name)});
		}

		this.TYBM = TranDigToText(json_BMKH.TYBM);
		this.hadSubmit=json_BMKH.hadSubmit;
	}
	
	var objReturn = new obj_BMKH();
	return objReturn;
}


//把部门考核表的填写的内容传给服务器
function Post_BMKH(obj_BMKH)//obj_BMKH为Get_BMKH()定义的对象
{
	var _arrBM = new Array();
	for(var i = 0; i < obj_BMKH.arrBM.length; ++i)
	{
		_arrBM.push(
						{
							"bm":TranTextToDig(obj_BMKH.arrBM[i].bm), //部门名字
							"pj":obj_BMKH.arrBM[i].pj,
							"df0":obj_BMKH.arrBM[i].df0, //工作量/工作难度
							"df1":obj_BMKH.arrBM[i].df1, //工作完成效果
							"df2":obj_BMKH.arrBM[i].df2, //工作态度
							"df3":obj_BMKH.arrBM[i].df3, //纪律性
							"df4":obj_BMKH.arrBM[i].df4, //部门凝聚力
							"df5":obj_BMKH.arrBM[i].df5, //沟通合作能力
							"df6":obj_BMKH.arrBM[i].df6, //部门成员表现
						}
					);
	}
	
	var _arrBuMen = new Array();
	for(var i = 0; i < obj_BMKH.arrBuMen.length; ++i)
	{
		_arrBuMen.push({"name":TranTextToDig(obj_BMKH.arrBuMen[i].name)});
	}

	var json_Post_BMKH = 
	{
	    "year" : year,
		"month" : month,
		"status":obj_BMKH.status,//是否为可提交状态
		"hadSubmit":obj_BMKH.hadSubmit,
		"BM":
		{
			"sum":obj_BMKH.arrBM.length,//部门数目
			"arrBM":_arrBM,
		},
		//"BuMen":_arrBuMen,//推优部门
		"TYBM":TranTextToDig(obj_BMKH.TYBM),
	};
	//alert(json_Post_BMKH.BM.arrBM[2].bm);
	//服务器成功接收信息，则返回true，否则返回false
	
		//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/post_bmkh",
		data:json_Post_BMKH,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
			
	//alert(obj.status);
	if(obj.status)
		return true;
	else
		return false;
}


//获取优秀部长评定表数据
function Get_YXBZPD()
{

		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/funcyxbz",
		data:{'year':year,'month':month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
		var json_YXBZPD = obj;
		//alert(obj.status);
		*/

	var json_YXBZPD = 
	{
		"status":0,
		"arrYXBZPDlist":
		[
			{
				"name" : "部长11",
				"account" : "201205220",
				"Checked" : true, //true表示此人被选，false表示没选
				"depart":"2",
				"score":"9.3948",
			},
			{
				"name" : "部长222",
				"account" : "201205221",
				"Checked" : true, //true表示此人被选，false表示没选
				"depart":"2",
				"score":"9.48607",
			},
			{
				"name" : "部长3",
				"account" : "201205222",
				"Checked" : true, //true表示此人被选，false表示没选
				"depart":"2",
				"score":"9.5",
			},
			{
				"name" : "部长",
				"account" : "201205223",
				"Checked" : true, //true表示此人被选，false表示没选
				"depart":"2",
				"score":"9.2",
			},
		],
	};

	for(var i=0;i<json_YXBZPD.arrYXBZPDlist.length;i++)
	{
		var index=json_YXBZPD.arrYXBZPDlist[i].depart;
		json_YXBZPD.arrYXBZPDlist[i].depart=arrDepartName[index-1];
	}
	return json_YXBZPD;
}


//获取主席团反馈表数据
function Get_ZXTFK()
{

		//ajax请求，接收当前账号的个人信息
		/*
		var obj;
	    $.ajax({
		url:URL+"/jszxtfk",
		data:{"year":year,"month":month},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
        var json_ZXTFK = obj;
		*/
	var json_ZXTFK = 
	{
		"classSortDepart"://首先是部门排名情况，按排名给出部门名字，得分，是否优秀部门
		{
			"sum":11,//部门数目
			"arrSorted":
			[
				{
					"name":2,
					"score":1024,
					"isExc":true,//true表示是优秀部门，优秀部门应该只有两个，但是前端并不检测数量
				},
				
				
			],
		},
		
		"ExcMinster"://然后是优秀部长数组
		[
			{"name":"某部长", "depart":3, "score":1024},
		],
		
		
		"classSituation"://然后是部长情况数组，每个元素有部门，部长名，自我评价，对主管副主席的评价
		{
			"sum":5,
			"arrMinFeedBack":
			[
				{
					"depart":4,
					"minister":"某部长",
					"selfAssess":"还好吧,应该还好，其实挺好，一切正常，自我感觉良好",
					"feedBack":"很好，非常好，很称职，很有深度，很有魄力，很有能力，很有霸气",
				},
			],
		},
		"_arrAnonymity"://匿名评价数组
		[
			{"anonymityFeedBack":"这人身高太逆天"},
		],
	};
	
	/*
	//切记主席团反馈表的数据是主席ID不同而不同的
	var currentUserID=GetObjById("login_info_user_id").innerHTML;
	
	//此函数返回一个对象，定义及示例如下：
	
	//首先是部门排名情况，按排名给出部门名字，得分，是否优秀部门
	function classSortDepart(Sorted)
	{
		this.name = Sorted.name;
		this.score = Sorted.score;
		this.isExc = Sorted.isExc;//true表示是优秀部门，优秀部门应该只有两个，但是前端并不检测数量
	}
	var _arrSorted = new Array();
	for(var i=0;i<json_ZXTFK.classSortDepart.sum;i++)
	{
		_arrSorted[i]=new classSortDepart(json_ZXTFK.classSortDepart.arrSorted[i]);
	}
	
	//然后是优秀部长数组
	function ExcMinister(ExcMin)
	{
		this.name=ExcMin.name;
		this.depart=ExcMin.depart;
		this.score=ExcMin.score;
	}
	var _arrExcMin = new Array();
	for(var i=0;i<json_ZXTFK.ExcMinister.sum;i++)
	{
		_arrExcMin[i]=new ExcMinister(json_ZXTFK.ExcMinister.arrExcMin[i]);
	}
	
	//然后是部长情况数组，每个元素有部门，部长名，自我评价，对主管副主席的评价
	function classSituation(MinFeedBack)
	{
		this.depart = MinFeedBack.depart;
		this.minister = MinFeedBack.minister;
		this.selfAssess = MinFeedBack.selfAssess;
		this.feedBack = MinFeedBack.feedBack;
	}
	var _arrMinFeedBack = new Array();
	for(var i=0;i<json_ZXTFK.classSituation.sum;i++)
	{
		_arrMinFeedBack[i]=new classSituation(json_ZXTFK.classSituation.arrMinFeedBack[i]);
	}
	*/
	//这就是最后要返回的类了
	function classZXTFK()
	{
		this.arrSorted=new Array();
		this.arrExcMin = new Array();
		this.arrMinFeedBack = new Array();
		this.arrAnonymity = new Array();
	}
	
	var objZXTFK=new classZXTFK;
	//alert(json_ZXTFK.classSortDepart.sum);
	objZXTFK.arrSorted=json_ZXTFK.classSortDepart.arrSorted;
	objZXTFK.arrExcMin =json_ZXTFK.ExcMinster;
	objZXTFK.arrMinFeedBack=json_ZXTFK.classSituation.arrMinFeedBack;
	objZXTFK.arrAnonymity=json_ZXTFK._arrAnonymity;
	for(var i = 0; i < objZXTFK.arrMinFeedBack.length; ++i)
	{
		objZXTFK.arrMinFeedBack[i].selfAssess = TranStr_Get(objZXTFK.arrMinFeedBack[i].selfAssess);
		objZXTFK.arrMinFeedBack[i].feedBack = TranStr_Get(objZXTFK.arrMinFeedBack[i].feedBack);
	}
	for(var i = 0; i < objZXTFK.arrAnonymity.length; ++i)
	{
		objZXTFK.arrAnonymity[i].anonymityFeedBack = TranStr_Get(objZXTFK.arrAnonymity[i].anonymityFeedBack);
	}
	return objZXTFK;
	
}


//发送优秀部长评定表的结果
function Post_YXBZPD(arrIDlist)
{	
	//arrIDlist是一组学号（ID），学号对应的就是被推选为优秀部长的
	
	var jsonArr=new Array();
	
	for(var i=0;i<arrIDlist.length;i++)
	{
		var jsonID={"account":arrIDlist[i]};
		jsonArr[i]=jsonID;
	}
	var jsonPost={
	"year" : year,
	"month" : month,
	"arrIDlist":jsonArr};
	/*
	var json={
	"arrIDlist":
	[
		{"account":"2012052207"},
		{"account":"2013052207"},
	],
	};
	
	*/
	
	//发送成功返回true，失败返回false
		//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/post_yxbz",
		data:jsonPost,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		
	//alert(obj.status);
	if(obj.status)
		return true;
	else
		return false;
}


//获取考核进程控制表的数据
function Get_KHJCKZ()
{
	var json_Get_KHJCKZ = 
	{
		"KSKH":1,//开始本月考核
		"KSPD":0,//开始优秀部长评定
		"FBJG":0,//发布结果
	};
	
	return json_Get_KHJCKZ;
}


//发送考核进程控制表的数据回数据库
function Post_KHJCKZ(obj_KHJCKZ)
{
	var json_Post_KHJCKZ = obj_KHJCKZ;
	
	//alert(json_Post_KHJCKZ.KSKH);
	if(1)
		return true;
	else
		return false;
}


//获取其他情况加减分数据
function Get_QTQKJJF()
{
//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/funcqt",
		data:{'year':year,'month':month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
	var json_Get_QYQKJJF = obj;	
		/*
	var json_Get_QYQKJJF = 
	{
	    "year":0,
		"month":0,
		"status":0,//是否可填写状态
		"gjbm":"1",//跟进部门
		"persons":
		[
			//姓名，学号，职位，加减分，理由
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			{"name":"姓名", "account":201202222, "depart":"职位", "jiajianfen":-3, "liyou":"理由",},
			
		],
		//部门加减分
		"bmjjf":{"name":"1","jiajianfen":-3, "liyou":"理由",},
	};
	*/
	for(var i = 0; i < json_Get_QYQKJJF.persons.length; ++i)
	{
		json_Get_QYQKJJF.persons[i].liyou = TranStr_Get(json_Get_QYQKJJF.persons[i].liyou);
	}
	
	
	return json_Get_QYQKJJF;
}


//发送其他情况加减分数据
function POST_QTQKJJF(obj_QTQKJJF)
{
	/*var arrPersons = new Array();
	for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
	{
		arrPersons.push({"name":obj_QTQKJJF.persons[i].name, "account":obj_QTQKJJF.persons[i].account, 
						"depart":obj_QTQKJJF.persons[i].depart, "jiajianfen":obj_QTQKJJF.persons[i].jiajianfen, 
						"liyou":obj_QTQKJJF.persons[i].liyou});
	}
	
	var json_POST_QTQKJJF = 
	{
		"status":obj_QTQKJJF.status,//是否可填写状态
		"gjbm":obj_QTQKJJF.gjbm,//跟进部门
		"persons":arrPersons,
	};*/
	obj_QTQKJJF.year = year;
	obj_QTQKJJF.month = month;
	
	var json_POST_QTQKJJF = obj_QTQKJJF;
	//发送成功返回true，失败返回false
		//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/post_qt",
		data:json_POST_QTQKJJF,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
	//alert(json_POST_QTQKJJF.persons[3].jiajianfen);
	if(1)//发送成功返回true，否则返回false
		return true;
	else
		return false;
}


//获取优秀评定限制表数据
function Get_YXPDXZ()
{
        //ajax请求
		var obj;
	    $.ajax({
		url:URL+"/funcyxchxz",
		data:{'year':year,'month':month,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});	
		//alert(obj.str);
		var json_Get_YXPDXZ = obj;
		
		for(var i  = 0; i < json_Get_YXPDXZ.arrDepart.length; ++i)
		{
			json_Get_YXPDXZ.arrDepart[i].depart = TranDigToText(json_Get_YXPDXZ.arrDepart[i].depart);
			//alert(json_Get_YXPDXZ.arrDepart[i].depart);
			for(var j = 0; j < json_Get_YXPDXZ.arrDepart[i].arrPersons.length; ++j)
			{
				if(json_Get_YXPDXZ.arrDepart[i].arrPersons[j].check == 1)
					json_Get_YXPDXZ.arrDepart[i].arrPersons[j].check = true;
				else	
					json_Get_YXPDXZ.arrDepart[i].arrPersons[j].check = false;
			}
		}
		for(var k = 0; k < json_Get_YXPDXZ.arrBMPD.length; ++k)
		{
			json_Get_YXPDXZ.arrBMPD[k].depart = TranDigToText(json_Get_YXPDXZ.arrBMPD[k].depart);
			if(json_Get_YXPDXZ.arrBMPD[k].check == 1)
				json_Get_YXPDXZ.arrBMPD[k].check = true;
			else
				json_Get_YXPDXZ.arrBMPD[k].check = false;
		}
		
		
		/*
	var json_Get_YXPDXZ =
	{
	    "year":year,
		"month":month,
		"status":0,//是否可填写状态
		//各部门部长和干事评定限制
		"arrDepart"://部门数组
		[
			{
				"depart":"部门",//部门名字
				"arrPersons"://一个部门中的人的数组
				[
					{"name":"部长", "account":2013042212, "check":true},
					{"name":"部长", "account":2013042212, "check":true},
					
				],
			},
			
		],
		
		"arrBMPD"://部门评定限制
		[
			{"depart":"部门", "check":true},//部门名字，是否选中
			{"depart":"部门", "check":true},//部门名字，是否选中
			
		],
	};
	*/
	return json_Get_YXPDXZ;
}


//发送优秀评定限制表
function Post_YXPDXZ(obj_YXPDXZ)
{
	//应该可以直接传obj_YXPDXZ对象回去，因为这个就是json对象格式的，可以不用进行下面的转换
	
	/*var _arrDepart = new Array();
	for(var i = 0; i < obj_YXPDXZ.arrDepart.length; ++i)
	{
		_arrPersons = new Array();
		for(var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j)
		{
			_arrPersons.push({"name":obj_YXPDXZ.arrDepart[i].arrPersons[j].name,
							  "account":obj_YXPDXZ.arrDepart[i].arrPersons[j].account,
							  "check":obj_YXPDXZ.arrDepart[i].arrPersons[j].check});
		}
		_arrDepart.push({"depart":obj_YXPDXZ.arrDepart[i].depart, 
						 "arrPersons":_arrPersons});
	}
	
	var _arrBMPD = new Array();//部门评定限制
	for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
	{
		_arrBMPD.push({"depart":obj_YXPDXZ.arrBMPD[i].depart, "check":obj_YXPDXZ.arrBMPD[i].check});
	}
	
	var json_Post_YXPDXZ = 
	{
		"status":obj_YXPDXZ.status,//是否可填写状态
		"arrDepart":_arrDepart,//部门数组
		"arrBMPD":_arrBMPD,//部门评定限制
	};*/
	
	for(var i  = 0; i < obj_YXPDXZ.arrDepart.length; ++i)
	{
		json_Get_YXPDXZ.arrDepart[i].depart = TranTextToDig(json_Get_YXPDXZ.arrDepart[i].depart);
		for(var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j)
		{
			if(obj_YXPDXZ.arrDepart[i].arrPersons[j].check == 1)
				obj_YXPDXZ.arrDepart[i].arrPersons[j].check = true;
			else	
				obj_YXPDXZ.arrDepart[i].arrPersons[j].check = false;
		}
	}
	for(var k = 0; k < obj_YXPDXZ.arrBMPD.length; ++k)
	{
		json_Get_YXPDXZ.arrBMPD[k].depart = TranTextToDig(json_Get_YXPDXZ.arrBMPD[k].depart);
		if(obj_YXPDXZ.arrBMPD[k].check == 1)
			obj_YXPDXZ.arrBMPD[k].check = true;
		else
			obj_YXPDXZ.arrBMPD[k].check = false;
	}
	
	obj_YXPDXZ.year = year;
	obj_YXPDXZ.month = month;
	
	var json_Post_YXPDXZ = obj_YXPDXZ;
	//alert(json_Post_YXPDXZ.year);
	//alert(json_Post_YXPDXZ.month);
	//alert(json_Post_YXPDXZ.arrDepart[0].arrPersons[0].check);
	//ajax请求
		var obj;
	    $.ajax({
		url:URL+"/post_yxchxz",
		data:json_Post_YXPDXZ,
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		alert(obj.status+"adsf");
	//alert(json_Post_YXPDXZ.arrDepart[1].depart + json_Post_YXPDXZ.arrDepart[1].arrPersons[2].check)
	if(1)//发送成功返回true，否则返回false
		return true;
	else
		return false;
}

//获取未完成情况数据
function Get_CKWWCQK()
{
	json_Get_CKWWCQK=
	{
		"statusGSZP":0,//代表现在干事自评表是否还可以提交，0表示可以
		"statusYXBZPD":1,//代表现在优秀部长评定表能否提交，注意一次考核前半部分是不能提交的
		"arrGSZP"://干事自评
		[
			{"name":"干事1","depart":2,"hadSubmit":1},
			{"name":"干事2","depart":3,"hadSubmit":0},
			{"name":"干事1","depart":2,"hadSubmit":1},
			{"name":"干事2","depart":3,"hadSubmit":0},
		],
		"arrBZZP"://部长自评
		[
			{"name":"部长1","depart":3,"hadSubmit":1},
			{"name":"部长2","depart":4,"hadSubmit":0},
		],
		"arrGSKH"://干事考核
		[
			{"name":"部长1","depart":5,"hadSubmit":1},
			{"name":"部长2","depart":5,"hadSubmit":0},
		],
		"arrBZKH"://部长考核表
		[
			{"name":"主席1","hadSubmit":1},
			{"name":"主席2","hadSubmit":0},
		],
		"arrBMKH"://部门考核表
		[
			{"name":"主席3","hadSubmit":1},
			{"name":"主席4","hadSubmit":0},
		],
	};
	return json_Get_CKWWCQK;
			
}


function PerformInit()
{
	AutoHideHead();

	var arrTable = GetTable();
	GetObjById("table_name").innerHTML = arrTable[0];
		
	ActiveTableButton();
	SelectTime(0);
}


//自动隐藏头部
function AutoHideHead() 
{
	var iTopHide = 0;
	var iTopDisplay = 0;
	var flag = 1;
	var ySite = 0;

	GetObjById("hdr").style.top = "0px";
	
	setTimeout(HideDisplay, 500);
	function HideDisplay() 
	{
		function getScrollTop() 
		{
			var scrollPos;
			if (window.pageYOffset) 
			{
				scrollPos = window.pageYOffset;
			} 
			else if (document.compatMode && document.compatMode != 'BackCompat') 
			{
				scrollPos = document.documentElement.scrollTop;
			} 
			else if (document.body) 
			{
				scrollPos = document.body.scrollTop;
			}
			return scrollPos;
		}

		function SlideToDisplay()
		{
			if (getScrollTop() < GetObjById("perform_hdr").offsetTop) 
			{
				GetObjById("hdr").style.top = 0 + "px";
				return;
			}

			if (iTopDisplay < 0) 
			{
				iTopDisplay += 2;
				GetObjById("hdr").style.top = iTopDisplay + "px";
				setTimeout(SlideToDisplay, 5);
			}
			else
				GetObjById("hdr").style.top = "0px";
		}

		function SlideToHide() 
		{
			if (iTopHide > -134) 
			{
				iTopHide -= 2;
				GetObjById("hdr").style.top = iTopHide + "px";
				setTimeout(SlideToHide, 5);
			}
			if (getScrollTop() < GetObjById("perform_hdr").offsetTop) 
			{
				GetObjById("hdr").style.top = 0 + "px";
				return;
			}
		}

		document.onmouseover = function (e) 
		{
			ySite = e.clientY;
			window.onscroll = function () 
			{
				if (getScrollTop() >= GetObjById("perform_hdr").offsetTop) 
				{
					if (GetObjById("hdr").style.top == "0px" && ySite > 140) 
					{
						iTopHide = 0;
						setTimeout(SlideToHide, 1000);
					}
				} 
				else 
				{
					GetObjById("hdr").style.top = 0 + "px";
				}
			}

			setTimeout(AutoHide, 2000);
			function AutoHide() 
			{
				if (getScrollTop() >= GetObjById("perform_hdr").offsetTop) 
				{
					if (GetObjById("hdr").style.top == "0px" && ySite > 140) 
					{
						if (flag == 1) 
						{
							iTopHide = 0;
							SlideToHide();
						}
					}
				} 
				else 
				{
					GetObjById("hdr").style.top = 0 + "px";
				}
			}

			if (getScrollTop() >= GetObjById("perform_hdr").offsetTop) 
			{
				if (GetObjById("hdr").style.top == "-134px" && ySite <= 6)
				{
					iTopDisplay = parseInt(GetObjById("hdr").style.top);
					SlideToDisplay();
				}
			} 
			else 
			{
				GetObjById("hdr").style.top = 0 + "px";
			}
		}
		
	}
}


function ActiveTableButton()
{
	var arrTable = GetTable();

	var strHTML = "";
	for(var i=0; i<arrTable.length; ++i)
	{
		var strId = "button_" + i;
		strHTML += "<button type=\"button\" class=\"perf_ctrl_button\" id=\"" 
				+ strId + "\" value=\"" + arrTable[i] + "\">" + arrTable[i] + "</button>\n";
	}
	
	strHTML += "<img id=\"zhibiao\" src=\"zhibiao2.png\" />"
	
	GetObjById("control_group").innerHTML = strHTML;	
	
	var iPreTable = 0;
	var iCurTable = 0;
	
	GetObjById("button_"+iCurTable).style.background = "#018f89";
	for(var iCount=0; iCount<arrTable.length; ++iCount )
	{
		var strId = "button_" + iCount;
		document.getElementById(strId).onclick=function(e)
		{		
			strId=GetId(e);
			var arr = strId.split("_");
			iPreTable = iCurTable;
			iCurTable = parseInt(arr[1]);
			ChangStyle(iPreTable, iCurTable);//改变当前激活的按钮的样式
			SelectTime(iCurTable, this.value);//处理当前被激活的按钮对应的信息
			GetObjById("show_more").innerHTML = "";
			//PostTable(this.value);//把点击的表传给服务器			
		}
	}
}


//改变选中的部分的样式
function ChangStyle(iPreTable, iCurTable)
{
	GetObjById("button_"+iPreTable).style.background = "#79c0be";
	ZhiBiaoHuaDong(iPreTable, iCurTable);//滑动指标指向当前别激活的按钮
	GetObjById("button_"+iCurTable).style.background = "#018f89";
	
	var arrTable = GetTable();
	GetObjById("table_name").innerHTML = arrTable[iCurTable];//打印当前被激活的按钮的内容的名字
}


//设置三角形指标滑动
function ZhiBiaoHuaDong(iPreTable, iCurTable)
{
	var iImgLocation = 43 + 105*iPreTable;
	var iDif = (iCurTable-iPreTable) * 105;
	if(iDif != 0)
		Slide();
	function Slide()
	{
		var iChange = iDif/10;
		
		if(Math.abs(iDif) >= 1)
		{
			iImgLocation  += iChange;
			GetObjById("zhibiao").style.top = iImgLocation + "px";
			iDif -= iChange;
			setTimeout(Slide, 5);
		}
		else
		{
			iImgLocation  += iDif;
			GetObjById("zhibiao").style.top = iImgLocation + "px";
		}
	}
}


//根据选择时间显示内容
function SelectTime(iCurShowFunction, btnText)
{
	/*var date = new Date();
	var curYear = date.getFullYear();
	var curMonth = date.getMonth();
	
	var objYear = GetObjById("year");
	var objMonth = GetObjById("month");
	
	objYear.options[3] = new Option((curYear-3));
	objYear.options[2] = new Option((curYear-2));
	objYear.options[1] = new Option((curYear-1));
	objYear.options[0] = new Option(curYear);
	
	objYear.selectedIndex = 0
	objMonth.options.length = 0;
	for(var i = curMonth; i >= 1; --i)
	{
		objMonth.options[curMonth - i] = new Option(i);
	}
	objMonth.selectedIndex = 0;
	
	objYear.onchange = function()
	{	
		if(this.selectedIndex == 0)
		{
			objMonth.options.length = 0;
			for(var i = curMonth; i >= 1; --i)
			{
				objMonth.options[curMonth - i] = new Option(i);
			}
		}
		else
		{
			for(var j = 12; j >= 1; --j)
			{
				objMonth.options[12 - j] = new Option(j);
			}
		}
	}

	GetObjById("OK_button").onclick = function()
	{
		year = objYear.options[objYear.selectedIndex].text;
		month = objMonth.options[objMonth.selectedIndex].text;
		var arrShowFun = ArrShowTable();
		//if(PostTimeToServer(year, month, btnText ))//把获取到的时间的表传回服务器
	
		arrShowFun[iCurShowFunction]();//调用被激活的按钮对应的信息的函数
	}*/
	
	
	var objYear = GetObjById("year");
	var objMonth = GetObjById("month");
	var curYear = 1;
	var curMonth = 2;
	objMonth.options.length = 0;
	objYear.options.length = 0;
	objYear.options[0] = new Option("2014");
	objYear.selectedIndex = 0;
	objMonth.options[0] = new Option("4");
	objMonth.options[1] = new Option("5");
	objMonth.selectedIndex = 0;
	GetObjById("OK_button").onclick = function()
	{
		year = objYear.options[objYear.selectedIndex].text;
		month = objMonth.options[objMonth.selectedIndex].text;
		var arrShowFun = ArrShowTable();
		//if(PostTimeToServer(year, month, btnText ))//把获取到的时间的表传回服务器

		arrShowFun[iCurShowFunction]();//调用被激活的按钮对应的信息的函数
	}
}


function ArrShowTable()
{
	var arrTable = GetTable();
	var arrShowFunction = new Array();//存放显示各种表格函数的数组
	
	for(var i=0; i<arrTable.length; ++i)
	{
		switch(arrTable[i])
		{
			case "干事自评表":
			arrShowFunction.push(Show_GSZP);
			break;
			case "干事考核反馈表":
			arrShowFunction.push(Show_GSKHFK);
			break;
			case "跟进部门出勤统计表":
			arrShowFunction.push(Show_GJBMCQTJ);
			break;
			case "调研意见采纳表":
			arrShowFunction.push(Show_DYYJCN);
			break;
			case "整体考核结果反馈表":
			arrShowFunction.push(Show_ZTKHJGFK);
			break;
			case "部长自评表":
			arrShowFunction.push(Show_BZZP);
			break;
			case "干事考核表":
			arrShowFunction.push(Show_GSKH);
			break;
			case "部长反馈表":
			arrShowFunction.push(Show_BZFK);
			break;
			case "部长考核表":
			arrShowFunction.push(Show_BZKH);
			break;
			case "部门考核表":
			arrShowFunction.push(Show_BMKH);
			break;
			case "优秀部长评定表":
			arrShowFunction.push(Show_YXBZPD);
			break;
			case "主席团反馈表":
			arrShowFunction.push(Show_ZXTFK);
			break;
			case "考核进程控制表":
			arrShowFunction.push(Show_KHJCKZ);
			break;
			case "其他情况加减分":
			arrShowFunction.push(Show_QTQKJJF);
			break;	
			case "优秀评定限制表":
			arrShowFunction.push(Show_YXPDXZ);
			break;	
			case "查看未完成情况":
			arrShowFunction.push(Show_CKWWCQK);
		}
	}
	return arrShowFunction;
}


//干事自评表
function Show_GSZP()
{
	var obj_GSZP = Get_GSZP();
	
	var strHTML = "";
	strHTML += "<h3>自我评分部分</h3>\n"
	+"			<p class=\"fill_in_tips\">\n"
	+"				<span class=\"till_part\">填写指引：</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请按照自己的真实情况自评\n"
	+"			</p>\n"
	+"			<form method=\"post\" action=\"#\">\n"
	+"				<table class=\"yijibiao\">\n"
	+"					<tr>\n"
	+"						<td colspan=\"2\" scope=\"col\">考核项目</td><td>评价标准</td><td>得分</td>\n"
	+"					</tr>\n"
	+"					<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";

	for(var i = 0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
	{
		strHTML += "<tr>\n"
		+"				<td rowspan=" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].rowspan + " scope=\"row\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].xm + "</p1></td><!--一级项目-->\n";
		for(var j = 0; j < obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
		{		
			var dfStrId = "df_" + i + "_" + j;
			
			if(j !=0)
				strHTML += "<tr>\n";
				
			strHTML +="	<td rowspan=" + 4 + " scope=\"row\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].bz + "</p1></td><!--二级项目-->\n"
			+"				<td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].a + "</p1></td>\n"
			+"				<td rowspan=" + 4 + " scope=\"row\"><input name=\"#\" id=\"" + dfStrId + "\" value = \"" + obj_GSZP.arrDF[i][j] + "\"></td>\n"
			+"			</tr>\n"		
			+"			<tr><td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].b + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].c + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj[j].d + "</p1></td></tr>\n";
			if(j != obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length-1)
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"3\" scope=\"col\"></td></tr><!--空行-->\n";
			}
			else
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";
			}
		}
	}

	strHTML += "<tr><td colspan=\"3\" scope=\"col\">总分</td> <td id=\"zongfen\" class=\"total_score\">" + obj_GSZP.zongfen + "</td></tr>\n"			
	+"				</table>\n";

	{
	strHTML += "			<h3>自我评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请总结本月的工作情况，评价自己的工作状态，说出收获，反映遇到的问题以及和部门内其他人相处的感受，我们会反馈给部长级\n"
	 + "					</p>\n"
	 + "					<textarea id=\"ziwopingjia\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_GSZP.zwpj + "</textarea>	\n"
	 + "					<h3>推优部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请推举一名除自己以外你觉得本月表现最突出的干事，并说明理由，理由会反馈给该干事\n"
	 + "					</p>\n"
	 + "					<p>\n"
	 + "						姓名：\n"
	 + "						<!--同部门的干事-->\n"
	 + "						<select name=\"#\" id=\"tuiyou\">\n"
	 + "						</select>\n"
	 + "					</p>\n"
	 + "					<p>\n"
	 + "						理由：\n"
	 + "						<input id=\"tuiyouliyou\" class=\"perf_textarea\" type=\"text\" name=\"#\" size=\"80\" />\n"
	 + "					<h3>部长评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请你为部长的综合表现打分(满分10分)及填写评价，评价会以匿名形式反馈给该部长\n"
	 + "					</p>\n"
	 + "					<table class=\"erjibiao\" id=\"bzpj\">\n"
	 + "						<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n"
	 + "						<!--正部应该拍前面-->\n"
	 + "					</table>\n"
	 + "					<h3>部门留言板</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请你为部门的整体情况表述意见或建议,匿名形式反馈给部长级\n"
	 + "					</p>\n"
	 + "					<textarea id=\"bumenliuyan\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_GSZP.bumenliuyan + "</textarea>	\n"
	 + " 					<h3>同事留言板</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>你可对你因其工作态度或工作情况不满的干事提出自己的想法，会以匿名形式反馈给该干事\n"
	 + "					</p>\n"
	 + "					<div id=\"liuyanban\"></div>"
	 + "					<button type=\"button\" id=\"add_a_words\" title=\"添加\" class=\"perf_button\">﹢</button>"
	 + "					<!--预留报错位-->\n"
	 + "					<div></div>\n"
	 + "					<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"
	 +"						<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"
	 + "				</form>\n";

	}
	GetObjById("show_more").innerHTML = strHTML;

	/*留言板部分*/
	
	function delete_a_word()
	{
		//alert("dddd");
		strID=this.id;
		strIndex=strID.replace("delete_liuyan_","");
		//alert(strIndex);
		obj_GSZP.arrTongshiliuyan.splice(strIndex,1);
		reRender();
		
		bind_the_action_handler();
		
	}
	function bind_the_action_handler()
	{
		for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
		{
			GetObjById("liuyan_"+i).value=obj_GSZP.arrTongshiliuyan[i].liuyan;
		}
		for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
		{
			//alert("jjj");
			GetObjById("delete_liuyan_"+i).onclick=delete_a_word;
			GetObjById("liuyanban_"+i).onchange=function()
			{
				strID=this.id;
				strIndex=strID.replace("liuyanban_","");
				obj_GSZP.arrTongshiliuyan[strIndex].account=this.value;
				GetObjById("liuyan_"+strIndex).value="";//输入框内容设为空
				obj_GSZP.arrTongshiliuyan[strIndex].liuyan="";
			}
			GetObjById("liuyan_"+i).onchange=function()
			{
				
				strID=this.id;
				strIndex=strID.replace("liuyan_","");
				if(!CheckLegalStr(this.value))
				{
					alert("您的输入含有非法字段，请重新输入!");
					this.value=obj_GSZP.arrTongshiliuyan[strIndex].liuyan;
					return false;
				}
				obj_GSZP.arrTongshiliuyan[strIndex].liuyan=this.value;
				
			}
				
		}
	}
	//同事留言的内容有obj_GSZP.arrTonshiliuyan的数据决定，增加或删除时都重新渲染HTML
	function reRender()
	{
		var strNewHTML=new String();
		for(var i=0;i<obj_GSZP.arrTongshiliuyan.length;i++)
		{
			strNewHTML+="<select id=\"liuyanban_"+i+"\">";//id是liuyanban_i
			for(var j=0;j<obj_GSZP.arrTongShi.length;j++)
			{
				strNewHTML+="<option value=\""+obj_GSZP.arrTongShi[j].account+"\""
				if(obj_GSZP.arrTongshiliuyan[i].account==obj_GSZP.arrTongShi[j].account)
				{
					strNewHTML+="selected=\"selected\"";
				}
				strNewHTML+=";>"+obj_GSZP.arrTongShi[j].name+"</option>";
			}
			strNewHTML+="</select><input type=\"text\" size=\"80\" class=\"perf_textarea\" id=\"liuyan_"+i+"\"/><span class=\"onclick\" id=\"delete_liuyan_"+i+"\">删除</span><br />";
		}
		GetObjById("liuyanban").innerHTML=strNewHTML;
	}
	reRender();
	bind_the_action_handler();
	
	GetObjById("add_a_words").onclick=function()
	{
		var strNew=new String();
		//obj_GSZP.arrTongshiliuyan.push({obj_GSZP.arrTongShi[0].account,""});//增加一个
		var i=obj_GSZP.arrTongshiliuyan.length;
		if(i+1>obj_GSZP.arrTongShi.length)
		{
			alert("你的同事总共才"+obj_GSZP.arrTongShi.length+"人，你加那么多干嘛- -");
			return false;
		}
		var newItem={"account":obj_GSZP.arrTongShi[0].account,"liuyan":""};
		obj_GSZP.arrTongshiliuyan.push(newItem);
		
		reRender();
		
		bind_the_action_handler();
	}	
		
	/*部门留言板*/
	GetObjById("bumenliuyan").onchange=function()
	{
		if(CheckLegalStr(this.value))
		{
			obj_GSZP.bumenliuyan=this.value;
		}
		else
		{
			alert("您输入有非法字段，请重新输入");
			this.value=obj_GSZP.bumenliuyan;
		}
	}
	
	var bzpjStrHTML = "<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n";
	for (var i = 0; i < obj_GSZP.arrDBZPJ.length; ++i) 
	{
		var fsStrId = "fenshu" + "_" + i;
		var pjStrId = "pingjia" + "_" + i;
		bzpjStrHTML += "<tr><td>" + obj_GSZP.arrDBZPJ[i].name + "</td><td class=\"normal_input\"><input id=" + fsStrId + " type=\"text\" size=\"5\" class=\"perf_textarea\"/></td><td class=\"normal_input\"><input id=" + pjStrId + " type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n";
	}
	GetObjById("bzpj").innerHTML = bzpjStrHTML;

	if (obj_GSZP.status == 0) //可以提交状态
	{
		//填写各项得分并计算总分
		for(var i=0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
		{
			for(var j=0; j< obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;							
				
				GetObjById(dfStr).onchange = function(e)
				{
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						var arr = strId.split("_");
						
						var dfPre = obj_GSZP.arrDF[arr[1]][arr[2]];//保存更改前的得分
						obj_GSZP.arrDF[arr[1]][arr[2]] = this.value;
						obj_GSZP.zongfen = parseInt(obj_GSZP.zongfen) - parseInt(dfPre) + parseInt(this.value);
						GetObjById("zongfen").innerHTML = obj_GSZP.zongfen;
					}
					else
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
				GetObjById(dfStr).onfocus = function()
				{
					this.style.backgroundColor="white";
					this.style.color = "#79c0be";
				}
				GetObjById(dfStr).onblur = function()
				{
					this.style.backgroundColor="#79c0be";
					this.style.color = "white";
				}
			}
		}
		
		//自我评价
		GetObjById("ziwopingjia").onchange = function()
		{

			if(CheckLegalStr(this.value))
				obj_GSZP.zwpj = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_GSZP.zwpj  = "";
				this.value = "";
			}
		}
		
		//推优部分
		GetObjById("tuiyou").options.length = 0;
		var iIndex = 0;
		for(var i=0; i<obj_GSZP.arrTongShi.length; ++i)
		{
			GetObjById("tuiyou").options[i] = new Option(obj_GSZP.arrTongShi[i].name);
			if(obj_GSZP.TYGS.tygs == obj_GSZP.arrTongShi[i].name)
				iIndex = i;
		}

		GetObjById("tuiyou").selectedIndex = iIndex;
		GetObjById("tuiyouliyou").value = obj_GSZP.TYGS.tyly;
		
		GetObjById("tuiyou").onchange = function()
		{
			if(this.selectedIndex != iIndex)
				GetObjById("tuiyouliyou").value = "请填写......";
			else
				GetObjById("tuiyouliyou").value = obj_GSZP.TYGS.tyly;
				
			obj_GSZP.TYGS.tygs = this.options[this.selectedIndex].text;
			obj_GSZP.TYGS.account = obj_GSZP.arrTongShi[this.selectedIndex].account;
		}
		GetObjById("tuiyouliyou").onchange = function()
		{
			if(CheckLegalStr(this.value))
				obj_GSZP.TYGS.tyly = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_GSZP.TYGS.tyly = "";
				this.value = "";
			}
		}
		
		//部长评价部分
		for(var j = 0; j < obj_GSZP.arrDBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			
			GetObjById(fsStrId).value = obj_GSZP.arrDBZPJ[j].fs;
			GetObjById(pjStrId).value = obj_GSZP.arrDBZPJ[j].pj;
			
			GetObjById(fsStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if (this.value >= 0 && this.value <= 10) 
				{
					obj_GSZP.arrDBZPJ[curIndex[1]].fs = this.value;
				}
				else
				{
					this.value = "";
					alert("*得分不能大于10或小于0，请重新填！");
				}
				
			}
			GetObjById(pjStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if(CheckLegalStr(this.value))
					obj_GSZP.arrDBZPJ[curIndex[1]].pj = this.value;
				else
				{
					alert("您输入有非法字段，请重新输入");	
					obj_GSZP.arrDBZPJ[curIndex[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i=0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
			{
				for(var j=0; j< obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
				{
					var dfStr = "df_" + i + "_" + j;
					if(GetObjById(dfStr).value == "")
						return false;
				}
			}
			
			if(GetObjById("ziwopingjia").value == "")
				return false;
				
			if(GetObjById("tuiyouliyou").value == "")
				return false;
				
			for(var j = 0; j < obj_GSZP.arrDBZPJ.length; ++j)
			{
				var fsStrId = "fenshu" + "_" + j;
				var pjStrId = "pingjia" + "_" + j;
				if(GetObjById(fsStrId).value == "" || GetObjById(pjStrId).value == "")
					return false;
			}
			return true;
		}
		
		GetObjById("save").onclick = function()
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
			}
			else if(Post_GSZP(obj_GSZP))//
			{
				alert("保存成功！");
				GetObjById("show_more").innerHTML = "";
			}
			else
			{
				alert("*保存失败，请重试");
			}
		}
		function AllConfirm()
		{
			if( !Finish() )
			{
				alert("提交前不允许留有空白");
				return false;
			}
			
			for (var i = 0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i) 
			{
				for (var j = 0; j <  obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j) 
				{
					if(0==obj_GSZP.arrDF[i][j])
					{
						alert("评分部分第"+(i+1)+"大项第"+(j+1)+"小项分数为零或未填写，不允许这样提交");
						return false;
					}
				}
			}
			
			for(var i = 0; i < obj_GSZP.arrDBZPJ.length; ++i)
			{
				
				if(0==obj_GSZP.arrDBZPJ[i].fs)
				{
					alert("你对"+obj_GSZP.arrDBZPJ[i].name+"部长的评分为0,表酱紫");
					return false;
				}
				if(obj_GSZP.arrDBZPJ[i].pj=="无"||obj_GSZP.arrDBZPJ[i].pj=="")
				{
					if(confirm("你对"+obj_GSZP.arrDBZPJ[i].name+"部长的评价未填写，你确定就这样提交？")==false)
					{
						return false;
					}
				}
				
			}
			if(obj_GSZP.zwpj=="无"||obj_GSZP.zwpj==""||"请填写....."==obj_GSZP.zwpj)
			{
				if(confirm("你的自我评价未填写，你确定就这样提交？")==false)
				{
					return false;
				}
			}
			return true;
		}
		GetObjById("submit").onclick=function()
		{
			
			if(AllConfirm())
			{
				obj_GSZP.hadSubmit=1;
				if(Post_GSZP(obj_GSZP))
				{
					alert("提交成功");
					GetObjById("show_more").innerHTML = "";
				}
				else
				{
					alert("*提交失败，请重试");
				}
			}
		}
	}
	else
	{
		for(var i=0; i < obj_GSZP.objGSZP_BZ.arrObj_GSZP.length; ++i)
		{
			for(var j=0; j< obj_GSZP.objGSZP_BZ.arrObj_GSZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;
				GetObjById(dfStr).value = obj_GSZP.arrDF[i][j];
				GetObjById(dfStr).readOnly = true;//设置为只读
			}
		}
		
		
		GetObjById("ziwopingjia").value = obj_GSZP.zwpj;
		GetObjById("ziwopingjia").readOnly = true;
		
		GetObjById("tuiyou").options.length = 0;
		GetObjById("tuiyou").options[0] = new Option(obj_GSZP.TYGS.tygs);
		GetObjById("tuiyouliyou").value = obj_GSZP.TYGS.tyly;
		GetObjById("tuiyouliyou").readOnly = true;
		
		for(var j=0; j<obj_GSZP.arrDBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			GetObjById(fsStrId).value = obj_GSZP.arrDBZPJ[j].fs;
			GetObjById(fsStrId).readOnly = true;
			GetObjById(pjStrId).value = obj_GSZP.arrDBZPJ[j].pj;
			GetObjById(pjStrId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}	
}

//干事反馈表
function Show_GSKHFK()
{
	
	var objGSKHFK = Get_GSKHFK();
	
	var strHTML = "";
	
	strHTML += "<h3>得分部分</h3>\n"
	+"				<p>总分：" + objGSKHFK.zongfen + "</p>\n"
	+"				<p>该月排名：" + objGSKHFK.paiming + "</p>\n"
	+"				<p>该月优秀干事：" + objGSKHFK.yxgs + "</p>\n"
	+"				<p>所在部门该月得分："+objGSKHFK.bmdf+"</p>"
	+"				<p>所在部门该月排名："+objGSKHFK.bmpm+"</p>"
	+"				<p class=\"fill_in_tips\">\n"
	+"					<span class=\"fill_part\">得分细节</span>\n"
	+"				</p>\n"
	+"				<table class=\"yijibiao\">\n"
	+"					<tr>\n"
	+"						<td>项目</td><td>细则</td><td>得分/加减分</td><td>备注</td>\n"
	+"					</tr>\n"
	+"				<tr>\n"
	+"					<td>干事自评表得分</td><td>满分2分</td><td>" + objGSKHFK.arrDFXZ[0] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>干事考核表得分</td><td>满分5分</td><td>" + objGSKHFK.arrDFXZ[1] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>出勤得分</td><td><p>基本得分1分</p><p>A.例会 大会 拓展（请假-0.1/次，迟到-0.2/次，缺席-0.3/次）</p><p>B.外调（缺席-0.1/次）</p></td><td>" + objGSKHFK.arrDFXZ[2] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>外调加分</td><td><p>基本分0分</p><p>A.例会 大会 拓展（请假-0.1/次，迟到-0.2/次，缺席-0.3/次）</p><p>B.外调（缺席-0.1/次）</p></td><td>" + objGSKHFK.arrDFXZ[3] + "</td><td><p>此外调统计包括人力平时外调各部门干事，司仪、礼仪队的外调，信编拍照外调和人力观察员外调</p></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>推优加分</td><td>0.1/票</td><td>" + objGSKHFK.arrDFXZ[4] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>反馈加分</td><td><p>0.1/次</p><p>在外调反馈表或活动调研问卷中写的意见被活动部门采纳</p></td><td>" + objGSKHFK.arrDFXZ[5] + "</td><td></td>\n"
	+"				</tr>\n"
	+"				<tr>\n"
	+"					<td>其他</td><td></td><td>" + objGSKHFK.arrDFXZ[6] + "</td><td></td>\n"
	+"				</tr>\n"
	+"			</table>\n";

	strHTML += "<h3>评价部分</h3>\n"
+"				<p class=\"fill_in_tips\">自我评价</p>\n"
+"				<div id=\"assessment\">\n"
+"				<div id=\"assessment\">\n"
+"					<ul>\n"
+"						<li><p class=\"self-assessment\">" + objGSKHFK.zwpj + "</p></li>\n"
+"					</ul>\n"
+"				</div>\n"
+"				</div>\n"
+"				<p class=\"fill_in_tips\">其他干事评价</p>\n"
+"				<ul id=\"entrusted_assessment\">\n";
	for(var i = 0; i < objGSKHFK.qtgspj.length; ++i)
	{
		strHTML += "<li>" + objGSKHFK.qtgspj[i]+ "</li>\n"
	}
	strHTML += "</ul>\n"
+"				<p class=\"fill_in_tips\">部长级评价</p>\n"
+"				<ul id=\"ministerial\">\n";

	for(var i = 0; i < objGSKHFK.bzpj.length; ++i)
	{
		strHTML += "<li>" + objGSKHFK.bzpj[i] + "</li>\n"
	}
	strHTML += "</ul>\n";
	strHTML+="<h3>留言部分</h3>"
			+"<p class=\"fill_in_tips\">同事留言:放弃吧，数据库也不知道是谁留的</p>\n"
			+"<ul>";
	for(var i=0;i<objGSKHFK.liuyan.length;i++)
	{
		strHTML+="<li>"+TranStr_Get(objGSKHFK.liuyan[i].liuyan)+"</li>";
	}
	strHTML += "</ul><input type=\"button\" value=\"确定\" id=\"submit\"  class=\"perf_button\" />\n"
	
	GetObjById("show_more").innerHTML = strHTML;
	
	GetObjById("submit").onclick = function()
	{
		GetObjById("show_more").innerHTML = "";
	}		
}

//跟进部门出勤统计表
function Show_GJBMCQTJ()
{
	
	var obj_GJBMCQTJ = Get_GJBMCQTJ();
	
	var strHTML = "";
	
	strHTML += "<h3>跟进部门：" +  arrDepartName[obj_GJBMCQTJ.gjbm-1] + "</h3>\n"
+"				<h3>人数：" +  obj_GJBMCQTJ.renshu + "</h3>\n"
+"				<form method=\"post\" action=\"#\">\n"
+"					<table class=\"erjibiao\">\n"
+"						<tr><td>姓名</td><td>请假次数</td><td>迟到或早退次数</td><td>无辜缺席次数</td>\n";
	
	for(var i = 0; i <  obj_GJBMCQTJ.renshu; ++i)
	{
		strHTML += "<tr>\n"
+"							<td>" + obj_GJBMCQTJ.chuqin[i][0] + "</td>\n"
+"							<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" id=cq_" + i + "_1" + " value=\"" + obj_GJBMCQTJ.chuqin[i][1] + "\" /></td>\n"
+"							<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" id=cq_" + i + "_2" + " value=\"" + obj_GJBMCQTJ.chuqin[i][2] + "\" /></td>\n"
+"							<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" id=cq_" + i + "_3" + " value=\"" + obj_GJBMCQTJ.chuqin[i][3] + "\" /></td>\n"
+"						</tr>\n";
	}
	strHTML += "</table>\n"
+ "					<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"
+"				</form>\n";

	GetObjById("show_more").innerHTML = strHTML;
	
	
	if(obj_GJBMCQTJ.status == 0)//可以提交状态
	{
		for (var i = 0; i < obj_GJBMCQTJ.renshu; ++i) 
		{
			for (var j = 1; j < 4; ++j) 
			{
				var strId = "cq_" + i + "_" + j;
				GetObjById(strId).onchange = function (e) 
				{
					strId = GetId(e);
					var arr = strId.split("_");
					if(this.value=="")
					{
						this.value="0";
					}
					if (CheckLegalStr(this.value))
						obj_GJBMCQTJ.chuqin[arr[1]][arr[2]] = this.value;
					else
					{
						alert("您输入有非法字段，请重新输入");
						obj_GJBMCQTJ.chuqin[arr[1]][arr[2]] = "";
						this.value = "0";
					}
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for (var i = 0; i < obj_GJBMCQTJ.renshu; ++i) 
			{
				for (var j = 1; j < 4; ++j) 
				{
					var strId = "cq_" + i + "_" + j;
					if(GetObjById(strId) == "")
						return false;
				}
			}
			
			return true;
		}
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("您还未完成，请填完再提交");
			}
			else if (Post_GJBMCQTJ(obj_GJBMCQTJ)) 
			{
				alert("提交成功！");
				GetObjById("show_more").innerHTML = "";
			} else {
				alert("*提交失败，请再提交");
			}
		}
	}
	else 
	{
		for (var i = 0; i < obj_GJBMCQTJ.renshu; ++i) 
		{
			for (var j = 1; j < 4; ++j) 
			{
				var strId = "cq_" + i + "_" + j;
				GetObjById(strId).value = obj_GJBMCQTJ.chuqin[i][j];
				GetObjById(strId).readOnly = true;
			}
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function () 
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//调研意见采纳表
function Show_DYYJCN()
{
	
	var obj_DYYJCN = Get_DYYJCN();
	
	var strHTML = "";
	strHTML += "<form method=\"post\" action=\"#\">\n";
	
	for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
	{
		strHTML += "<h3>" + arrDepartName[obj_DYYJCN.arrObjBM[i].bmmz-1] + "</h3>\n"
+"					<table class=\"erjibiao\">\n"
+"						<tr><td>用户名</td><td>采纳次数</td><td>用户名</td><td>采纳次数</td><td>用户名</td><td>采纳次数</td>\n";
		for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
		{
			var strId = "cnjf_" + i + "_" + j;
			strHTML += "<tr>\n"
			+ " <td>" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name  + "</td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen + "\" /></td>\n";
			++j
			if(j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length )
			{
				strId = "cnjf_" + i + "_" + j;
				strHTML += "<td>" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name  + "</td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen + "\" /></td>\n";
			}
			else
				strHTML += "<td></td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\" \"/></td>\n";
			
			++j
			if(j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length )
			{
				strId = "cnjf_" + i + "_" + j;
				strHTML += "<td>" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].name  + "</td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen + "\" /></td>\n";
			}
			else
				strHTML += "<td></td><td class=\"normal_input\"><input id=" + strId + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\" \"/></td>\n";
			
			strHTML += "</tr>\n";
		}
		strHTML += "</table>\n"
	}
	
	strHTML += "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"
			+"</form>\n";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	if(obj_DYYJCN.status == 0)//可填写状态
	{
		for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
		{
			for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
			{
				var strId = "cnjf_" + i + "_" + j;
				GetObjById(strId).onchange = function(e)
				{
					strId = GetId(e);
					var arr = strId.split("_");
					obj_DYYJCN.arrObjBM[arr[1]].arrObjCNJF[arr[2]].jiafen = this.value;
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
			{
				for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
				{
					var strId = "cnjf_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
			
			return true;
		}
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("您还未完成，请填完再提交");
			}
			else if (Post_DYYJCN(obj_DYYJCN)) 
			{
				alert("提交成功！");
				GetObjById("show_more").innerHTML = "";
			} else {
				alert("*提交失败，请再提交");
			}
		}
	}
	else//不可填写，只能查看状态
	{
		for(var i = 0; i < obj_DYYJCN.arrObjBM.length; ++i)
		{
			for(var j = 0; j < obj_DYYJCN.arrObjBM[i].arrObjCNJF.length; ++j)
			{
				var strId = "cnjf_" + i + "_" + j;
				GetObjById(strId).value = obj_DYYJCN.arrObjBM[i].arrObjCNJF[j].jiafen;
				GetObjById(strId).readOnly = true;
			}
		}
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function () 
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//整体考核结果反馈表
function Show_ZTKHJGFK()
{
	
	var obj_ZTKHJGFK = Get_ZTKHJGFK();
	
	var strHTML = "";
	strHTML += "<p class=\"fill_in_tips\">优秀部门</p>\n"
			+"	<ol>\n";
	for(var i = 0; i < obj_ZTKHJGFK.arrObjYXBM.length; ++i)
		strHTML += "<li>" + obj_ZTKHJGFK.arrObjYXBM[i].bm + " &emsp;<span>得分：</span>" + obj_ZTKHJGFK.arrObjYXBM[i].df + "</li>\n";
	strHTML += "</ol>\n";
	
	strHTML += "<p class=\"fill_in_tips\">优秀部长</p>\n"
			+"	<ol>\n"
	for(var i = 0; i < obj_ZTKHJGFK.arrObjYXBZ.length; ++i)
		strHTML += "<li>" + obj_ZTKHJGFK.arrObjYXBZ[i].bzmz + "&emsp;<span>所属部门：</span>" + obj_ZTKHJGFK.arrObjYXBZ[i].ssbm + "&emsp;<span>得分：</span>" + obj_ZTKHJGFK.arrObjYXBZ[i].df + "</li>\n";
	strHTML += "</ol>\n";
	
	strHTML += "<p class=\"fill_in_tips\">各部门优秀干事</p>\n"
			+"	<ul>\n";
	for(var i = 0; i < obj_ZTKHJGFK.arrObjYXGS.length; ++i)
	{	
		
		strHTML += "<li><span>" + obj_ZTKHJGFK.arrObjYXGS[i].bm + "</span>&emsp;\n"
				+"		<ol>\n";
		
		for(var j = 0; j < obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS.length; ++j)
		{
			
			strHTML += "<li>" + obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS[j].name + "&emsp;<span>得分：</span>" + obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS[j].df + "&emsp;<span>" + obj_ZTKHJGFK.arrObjYXGS[i].arrObjGBMYXGS[j].ydyxgs + "</span></li>\n"
		}
		strHTML += "</ol>\n"
				+"</li>\n";
	}
	strHTML += "</ul>\n";
	
	strHTML += "<p class=\"fill_in_tips\">各部门外调较多人员</p>\n"
			+"	<ul>\n";
	for(var i = 0; i < obj_ZTKHJGFK.arrObjWDJDRY.length; ++i)
	{
		strHTML += "<li><span>" + obj_ZTKHJGFK.arrObjWDJDRY[i].bm + "</span>&emsp;\n"
				+"		<ol>\n";
		for(var j = 0; j < obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY.length; ++j)
		{
			if(obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY[j].wdcs>=3)
			{
				strHTML += "<li>" + obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY[j].name + "&emsp;<span>外调次数：</span>" + obj_ZTKHJGFK.arrObjWDJDRY[i].arrObjGBMWDJDRY[j].wdcs + "</li>\n";
			}
		}
		strHTML += "</ol>\n"
				+"</li>\n";
	}
	strHTML += "</ul>\n";
	
	strHTML += "<input type=\"button\" value=\"确定\" id=\"submit\"  class=\"perf_button\" />\n";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	GetObjById("submit").onclick = function()
	{
		GetObjById("show_more").innerHTML = "";
	}		
}

//部长自评表
function Show_BZZP()
{

	var objBZZP_BZ = BZZP_BZ();
	var obj_BZZP = Get_BZZP();
	
	var strHTML = "";
	strHTML += "<h3>自我评分部分</h3>\n"
	+"			<p class=\"fill_in_tips\">\n"
	+"				<span class=\"till_part\">填写指引：</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请按照自己的真实情况自评\n"
	+"			</p>\n"
	+"			<form method=\"post\" action=\"#\">\n"
	+"				<table class=\"yijibiao\">\n"
	+"					<tr>\n"
	+"						<td colspan=\"2\" scope=\"col\">考核项目</td><td>评价标准</td><td>得分</td>\n"
	+"					</tr>\n"
	+"					<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";

	for(var i = 0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
	{
		strHTML += "<tr>\n"
		+"				<td rowspan=" + objBZZP_BZ.arrObj_BZZP[i].rowspan + " scope=\"row\">" + objBZZP_BZ.arrObj_BZZP[i].xm + "</td><!--一级项目-->\n";
		for(var j = 0; j < objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
		{		
			var dfStrId = "df_" + i + "_" + j;
			
			if(j !=0)
				strHTML += "<tr>\n";
				
			strHTML +="	<td rowspan=" + 4 + " scope=\"row\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].bz + "</p1></td><!--二级项目-->\n"
			+"				<td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].a + "</p1></td>\n"
			+"				<td rowspan=" + 4 + " scope=\"row\"><input name=\"#\" id=" + dfStrId + " value=\"" + obj_BZZP.arrDF[i][j] + "\"></td>\n"
			+"			</tr>\n"		
			+"			<tr><td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].b + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].c + "</p1></td></tr>\n"
			+"			<tr><td class=\"min_item\"><p1>" + objBZZP_BZ.arrObj_BZZP[i].arrObj[j].d + "</p1></td></tr>\n";
			if(j != objBZZP_BZ.arrObj_BZZP[i].arrObj.length-1)
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"3\" scope=\"col\"></td></tr><!--空行-->\n";
			}
			else
			{
				strHTML += "<tr><td class=\"blankline\" colspan=\"4\" scope=\"col\"></td></tr><!--空行-->\n";
			}
		}
	}
	
	strHTML += "<tr><td colspan=\"3\" scope=\"col\">总分</td> <td id=\"zongfen\" class=\"total_score\">" + obj_BZZP.zongfen + "</td></tr>\n"			
	+"		 </table>\n";

	
	strHTML += "			<h3>自我评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请总结本月的工作情况，评价自己的工作状态，说出收获，反映遇到的问题以及和部门内其他人相处的感受，我们会反馈给主管副主席\n"
	 + "					</p>\n"
	 + "					<textarea id=\"ziwopingjia\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_BZZP.zwpj + "</textarea>	\n"
	 + "					<h3>对本部门其他部长级打分及评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请对本部门其他部长级的综合表现打分，满分10分，并且填写评价，我们会把评价反馈给该部长级\n"
	 + "					</p>\n"
	 + "					<table class=\"erjibiao\" id=\"bzpj\">\n"
	 + "						<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n"
	 + "						<!--正部应该拍前面-->\n"
	 + "					</table>\n"
	 + "					<h3>对主管副主席评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">对主管副主席评价部分:</span>请填写对主管副主席的意见或建议，我们会反馈给主管副主席\n"
	 + "					</p>\n"
	 +"						<textarea id=\"dzgfzxpj\" class=\"perf_textarea\" name=\"#\" rows=\"4\" cols=\"50\">" + obj_BZZP.dzgfzxpj + "</textarea>\n";
	 

	strHTML += " 			<h3>对主席团的匿名评价部分</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>此处非必填，你可以对主席团的任意成员评价，我们会匿名反馈给该主席团成员\n"
	 + "					</p>\n"
	 + "					<table class=\"erjibiao\" id=\"nmpj\">\n"
	 + "						<tr><td>姓名</td><td>职位</td><td>匿名评价</td>\n"
	 + "						<!--正部应该拍前面-->\n"
	 + "						<tr><td>主席1</td><td>副主席</td><td class=\"normal_input\"><input id=\"pingjia3\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n"
	 + "					</table>\n"
	 + "					<h3>对其他部门部长级的留言板</h3>\n"
	 + "					<p class=\"fill_in_tips\">\n"
	 + "						<span class=\"fill_part\">填写指引：</span>请对其他部门部长级以及部门工作的综合表填写建议或意见，我们会把评价反馈给该部长级\n"
	 + "					</p>\n"
	 + "					<div id=\"liuyanban\"></div>"
	 + "					<button type=\"button\" id=\"add_a_words\" title=\"添加\" class=\"perf_button\">﹢</button>"
	 + "					<!--预留报错位-->\n"
	 + "					<div></div>\n"
	 + "					<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
	 +"						<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"
	+ "				</form>\n";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	/*留言板部分*/
	function delete_a_word()
	{
		//alert("dddd");
		strID=this.id;
		strIndex=strID.replace("delete_liuyan_","");
		//alert(strIndex);
		obj_BZZP.arrTSLY.splice(strIndex,1);
		reRender();
		
		bind_the_action_handler();
		
	}
	function bind_the_action_handler()
	{
		for(var i=0;i<obj_BZZP.arrTSLY.length;i++)
		{
			GetObjById("liuyan_"+i).value=obj_BZZP.arrTSLY[i].liuyan;
		}
		for(var i=0;i<obj_BZZP.arrTSLY.length;i++)
		{
			//alert("jjj");
			GetObjById("delete_liuyan_"+i).onclick=delete_a_word;
			GetObjById("liuyanban_"+i).onchange=function()
			{
				strID=this.id;
				strIndex=strID.replace("liuyanban_","");
				obj_BZZP.arrTSLY[strIndex].account=this.value;
				GetObjById("liuyan_"+strIndex).value="";//输入框内容设为空
				obj_BZZP.arrTSLY[strIndex].liuyan="";
			}
			GetObjById("liuyan_"+i).onchange=function()
			{
				
				strID=this.id;
				strIndex=strID.replace("liuyan_","");
				if(!CheckLegalStr(this.value))
				{
					alert("您的输入含有非法字段，请重新输入!");
					this.value=obj_BZZP.arrTSLY[strIndex].liuyan;
					return false;
				}
				obj_BZZP.arrTSLY[strIndex].liuyan=this.value;
				
			}
				
		}
	}
	//同事留言的内容有obj_BZZP.arrTSLY的数据决定，增加或删除时都重新渲染HTML
	function reRender()
	{
		var strNewHTML=new String();
		for(var i=0;i<obj_BZZP.arrTSLY.length;i++)
		{
			strNewHTML+="<select id=\"liuyanban_"+i+"\">";//id是liuyanban_i
			for(var j=0;j<obj_BZZP.arrTongShi.length;j++)
			{
				strNewHTML+="<option value=\""+obj_BZZP.arrTongShi[j].account+"\""
				if(obj_BZZP.arrTSLY[i].account==obj_BZZP.arrTongShi[j].account)
				{
					strNewHTML+="selected=\"selected\"";
				}
				strNewHTML+=">"+obj_BZZP.arrTongShi[j].name+"</option>";
			}
			strNewHTML+="</select><input type=\"text\" size=\"80\" class=\"perf_textarea\" id=\"liuyan_"+i+"\"/><span class=\"onclick\" id=\"delete_liuyan_"+i+"\">删除</span><br />";
		}
		GetObjById("liuyanban").innerHTML=strNewHTML;
	}
	reRender();
	bind_the_action_handler();
	
	GetObjById("add_a_words").onclick=function()
	{
		var strNew=new String();
		var i=obj_BZZP.arrTSLY.length;
		if(i+1>obj_BZZP.arrTongShi.length)
		{
			alert("你的同事总共才"+obj_BZZP.arrTongShi.length+"人，你加那么多干嘛- -");
			return false;
		}
		var newItem={"account":obj_BZZP.arrTongShi[0].account,"liuyan":""};
		obj_BZZP.arrTSLY.push(newItem);
		
		reRender();
		
		bind_the_action_handler();
	}	
	/*留言部分完*/
	
	var bzpjStrHTML = "<tr><td>姓名</td><td>分数</td><td>对部长的评价</td>\n";
	for (var i = 0; i < obj_BZZP.arrDQTBZPJ.length; ++i) 
	{
		var fsStrId = "fenshu" + "_" + i;
		var pjStrId = "pingjia" + "_" + i;
		bzpjStrHTML += "<tr><td>" + obj_BZZP.arrDQTBZPJ[i].name + "</td><td class=\"normal_input\"><input id=" + fsStrId + " type=\"text\" size=\"5\" class=\"perf_textarea\"/></td><td class=\"normal_input\"><input id=" + pjStrId + " type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n";
	}
	GetObjById("bzpj").innerHTML = bzpjStrHTML;
	
	var nmpjStrHTML = "<tr><td>姓名</td><td>职位</td><td>匿名评价</td>\n";
	for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
	{
		nmpjStrHTML += "<tr><td>" + obj_BZZP.arrNMPJ[i].name + "</td><td>" + obj_BZZP.arrNMPJ[i].depart + "</td><td class=\"normal_input\"><input id=" + ("nmpj_"+i) + " type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>\n";
	}
	GetObjById("nmpj").innerHTML = nmpjStrHTML;
	
	if (obj_BZZP.status == 0) //可以提交状态
	{
		//填写各项得分并计算总分
		for(var i=0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
		{
			for(var j=0; j< objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;							
				
				GetObjById(dfStr).onchange = function(e)
				{
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						var arr = strId.split("_");
						
						var dfPre = obj_BZZP.arrDF[arr[1]][arr[2]];
						obj_BZZP.arrDF[arr[1]][arr[2]] = this.value;
						obj_BZZP.zongfen = parseInt(obj_BZZP.zongfen) - parseInt(dfPre) + parseInt(this.value);
						GetObjById("zongfen").innerHTML = obj_BZZP.zongfen;
					}
					else
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
				GetObjById(dfStr).onfocus = function()
				{
					this.style.backgroundColor="white";
					this.style.color = "#79c0be";
				}
				GetObjById(dfStr).onblur = function()
				{
					this.style.backgroundColor="#79c0be";
					this.style.color = "white";
				}
			}
		}
		
		//自我评价
		GetObjById("ziwopingjia").onchange = function()
		{

			if(CheckLegalStr(this.value))
				obj_BZZP.zwpj = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_BZZP.zwpj = "";
				this.value = "";
			}
		}
		
		//对其他部长评价部分
		for(var j=0; j<obj_BZZP.arrDQTBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			
			GetObjById(fsStrId).value = obj_BZZP.arrDQTBZPJ[j].fs;
			GetObjById(pjStrId).value = obj_BZZP.arrDQTBZPJ[j].pj;		
			
			GetObjById(fsStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if (this.value >= 0 && this.value <= 10) 
				{
					obj_BZZP.arrDQTBZPJ[curIndex[1]].fs = this.value;
				}
				else
				{
					this.value = "";
					alert("*得分不能大于10或小于0，请重新填！");
				}
				
			}
			GetObjById(pjStrId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if(CheckLegalStr(this.value))
					obj_BZZP.arrDQTBZPJ[curIndex[1]].pj = this.value;
				else
				{
					alert("您输入有非法字段，请重新输入");
					obj_BZZP.arrDQTBZPJ[curIndex[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		//对主管副主席评价
		GetObjById("dzgfzxpj").onchange = function()
		{

			if(CheckLegalStr(this.value))
				obj_BZZP.dzgfzxpj = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_BZZP.dzgfzxpj = "";
				this.value = "";
			}
		}
		
		//对主席团的匿名评价
		for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
		{
			var strId = "nmpj_"+i;
			GetObjById(strId).value = obj_BZZP.arrNMPJ[i].pj;
			GetObjById(strId).onchange = function(e)
			{
				var curId = GetId(e);
				var curIndex = curId.split("_");
				if(CheckLegalStr(this.value))
					obj_BZZP.arrNMPJ[curIndex[1]].pj = this.value;
				else
				{
					alert("您输入有非法字段，请重新输入");
					obj_BZZP.arrNMPJ[curIndex[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i=0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
			{
				for(var j=0; j< objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
				{
					var dfStr = "df_" + i + "_" + j;
					if(GetObjById(dfStr) == "")
						return false;
				}
			}
			
			if(GetObjById("ziwopingjia").value == "")
				return false;
			
			for(var j=0; j<obj_BZZP.arrDQTBZPJ.length; ++j)
			{
				var fsStrId = "fenshu" + "_" + j;
				var pjStrId = "pingjia" + "_" + j;
				if(GetObjById(fsStrId).value == "" || GetObjById(pjStrId).value == "")
					return false;
			}
			
			if(GetObjById("dzgfzxpj").value == "")
				return false;
			
			return true;
		}
		
		GetObjById("save").onclick = function()
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
			}
			else if(Post_BZZP(obj_BZZP))//
			{
				alert("保存成功！");
				GetObjById("show_more").innerHTML = "";
			}
			else
			{
				alert("*保存失败，请重试");
			}
		}
		function AllConfirm()
		{
			if( !Finish() )
			{
				alert("提交前不允许留有空白");
				return false;
			}
			//检查评分有没写完
			//alert("检查评分");
			for (var i = 0; i < obj_BZZP.arrDF.length; ++i) 
			{
				for (var j = 0; j <  obj_BZZP.arrDF[i].length; ++j) 
				{
					if(obj_BZZP.arrDF[i][j]==0)
					{
						alert("您的第"+(i+1)+"项，第"+(j+1)+"小项自评为0，但是我们是不允许0分的，请修改");
						return false;
					}
				}
			}
			//检查自我评价有没写
			//alert("检查自我评价");
			if(obj_BZZP.zwpj==""||obj_BZZP.zwpj==" "||obj_BZZP.zwpj=="无"||obj_BZZP.zwpj=="请填写.....")
			{
				if(!confirm("您的自我评价还没写，你确定要提交？"))
				{
					return false;
				}
			}
			//检查对本部门其他部长评价有没有写
			//alert("检查部长评价");
			for(var i=0;i<obj_BZZP.arrDQTBZPJ.length;++i)
			{
				if(obj_BZZP.arrDQTBZPJ[i].fs==0)
				{
					if(!confirm("您对"+obj_BZZP.arrDQTBZPJ[i].name+"的评分为0,你确定这样提交？"))
					{
						return false;
					}
				}
				if(obj_BZZP.arrDQTBZPJ[i].pj==""||obj_BZZP.arrDQTBZPJ[i].pj==" "||obj_BZZP.arrDQTBZPJ[i].pj=="无")
				{
					if(!confirm("您对"+obj_BZZP.arrDQTBZPJ[i].name+"的评价未填,你确定这样提交？"))
					{
						return false;
					}
				}
			}
			//alert("检查完了");
			return true;
			
			
		}
		GetObjById("submit").onclick=function()
		{
			
			if(AllConfirm())
			{
				obj_BZZP.hadSubmit=1;
				//alert("提交");
				if(Post_BZZP(obj_BZZP))
				{
					alert("提交成功");
					GetObjById("show_more").innerHTML = "";
				}
				else
				{
					alert("*提交失败，请重试");
				}
			}
		}
			
		
	}
	else
	{
		for(var i=0; i < objBZZP_BZ.arrObj_BZZP.length; ++i)
		{
			for(var j=0; j< objBZZP_BZ.arrObj_BZZP[i].arrObj.length; ++j)
			{
				var dfStr = "df_" + i + "_" + j;
				GetObjById(dfStr).value = obj_BZZP.arrDF[i][j];
				GetObjById(dfStr).readOnly = true;//设置为只读
			}
		}
		
		GetObjById("ziwopingjia").value = obj_BZZP.zwpj;
		GetObjById("ziwopingjia").readOnly = true;
		
		for(var j=0; j<obj_BZZP.arrDQTBZPJ.length; ++j)
		{
			var fsStrId = "fenshu" + "_" + j;
			var pjStrId = "pingjia" + "_" + j;
			GetObjById(fsStrId).value = obj_BZZP.arrDQTBZPJ[j].fs;
			GetObjById(fsStrId).readOnly = true;
			GetObjById(pjStrId).value = obj_BZZP.arrDQTBZPJ[j].pj;
			GetObjById(pjStrId).readOnly = true;
		}
		
		//对主席团的匿名评价
		for(var i = 0; i < obj_BZZP.arrNMPJ.length; ++i)
		{
			var strId = "nmpj_"+i;
			GetObjById(strId).value = obj_BZZP.arrNMPJ[i].pj;
			GetObjById(strId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//干事考核表
function Show_GSKH()
{
	var obj_GSKH = Get_GSKH();
		
	var strHTML = "<div id=\"pjbz\"></div>";
	strHTML += "<h3>评分部分</h3>"
				+"<p class=\"fill_in_tips\">"
					+"<span class=\"till_part\">考核干事部分:</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请为干事评分"
				+"</p>"
				+"<form method=\"post\" action=\"#\">"
					+"<table class=\"erjibiao ganshikaohebiao\">"
					+"<tr>"
							+"<td class=\"blankline\" colspan=\"6\" scope=\"col\"></td>"
						+"</tr>"						
						+"<tr>"
							+"<td></td>"
							+"<td colspan=\"5\" scope=\"col\">工作情况</td>"
						+"</tr>"
						+"<tr>"
							+"<td></td>"
							+"<td>工作量</td>"
							+"<td>工作效率</td>"
							+"<td>工作质量</td>"
							+"<td>工作态度</td>"							
							+"<td>工作能力</td>"
							
						+"</tr>";				
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		strHTML += "<tr>"
						+"<td>" + obj_GSKH.arrGSDF[i].name + "</td>";
		for(var j = 0 ; j < 5; ++j)
		{
			strHTML += "<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_GSKH.arrGSDF[i][("df"+j)] + "\" id =" + ("bzId_"+i+"_"+j) + " size=\"16\"/></td>";
		}
		strHTML += "</tr>";
	}
	
	strHTML +=" <tr>"
			+ "		<td class=\"blankline\" colspan=\"8\" scope=\"col\"></td>"
			+ "	</tr>";
	
	strHTML += "<tr>"
					+"<td></td><td colspan=\"3\" scope=\"col\">工作情况</td>"
					+"<td colspan=\"1\" scope=\"col\">总分(5分制)</td>"
				+"</tr>"
				+"<tr>"
					+"<td></td>"
					+"<td>合作能力</td>"
					+"<td>表达能力</td>"
					+"<td>团队精神</td>"
					+"<td>总分</td>"
				+"</tr>";
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		strHTML += "<tr>"
						+"<td>" + obj_GSKH.arrGSDF[i].name + "</td>";
		for(var j = 5 ; j < 8; ++j)
		{
			strHTML += "<td class=\"normal_input\"><input class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_GSKH.arrGSDF[i][("df"+j)] + "\" id =" + ("bzId_"+i+"_"+j) + " size=\"16\"/></td>";
		}
		strHTML+="<td id=\"zdf_"+i+"\">"+jisuanzongfen(i)+"</td>";
		strHTML += "</tr>";
	}
	function jisuanzongfen(i)
	{
		var fs=0;
		for(var j=0;j<8;j++)
		{
			fs+=parseFloat(obj_GSKH.arrGSDF[i][("df"+j)]);
		}
		fs=(fs/80)*5;
		
		return fs;
	}
	strHTML += "</table>";
	
	strHTML += "<h3>评价干事部分</h3>"
				+"<p class=\"fill_in_tips\">"
					+"<span class=\"till_part\">评价干事:</span>根据您对干事的观察与了解，您认为该干事在本时段的工作中哪些地方最让你欣赏或者是哪些地方还需要改进的，请给该干事一个整体的评价和发展建议。"
				+"</p>"					
				+"<table class=\"erjibiao\">"
					+"<tr><td>姓名</td><td>对干事的评价</td>";
					
	for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)
	{
		strHTML += "<tr><td>" + obj_GSKH.arrDGSPJ[i].name + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i) + " type=\"text\" size=\"100\" class=\"perf_textarea\" value=\"" + obj_GSKH.arrDGSPJ[i].pj + "\" /></td></tr>";
	}
	strHTML += "</table>";
	
	strHTML += "<!--预留报错位-->\n"
			+ "	<div></div>\n"
			+ "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
			+"<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n";		
	
	strHTML +="</form>";
	GetObjById("show_more").innerHTML = strHTML;
	
	for(var i = 0; i < obj_GSKH.arrGSDF.length; ++i)
	{
		for(var j = 0; j < 8; ++j)
		{
			strId = "bzId_" + i + "_" + j;
			GetObjById(strId).onfocus = function(e)
			{
				var xSite = new Array(400, 550, 700, 800, 400, 550, 700);
				
				strId = GetId(e);
				var arrI = strId.split("_");
				GetObjById("pjbz").style.left = xSite[arrI[2]%5] + "px";
				if(arrI[2] == 13)
				{
					GetObjById("pjbz").innerHTML = obj_GSKH.bmts;
				}
				else
				{
					GetObjById("pjbz").innerHTML = obj_GSKH.GSKH_BZ[("str"+arrI[2])];
				}

				
				//GetObjById("pjbz").innerHTML = xCoord + ", " + yCoord;
			}
			GetObjById(strId).onblur = function(e)
			{
				GetObjById("pjbz").innerHTML = "";
			}
		}
	}
	
		
	if(obj_GSKH.status == 0)//可提交状态
	{
		for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
		{
			for (var j = 0; j < 8; ++j) 
			{
				strId = "bzId_" + i + "_" + j;
				GetObjById(strId).onchange = function (e)
				{
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						strId = GetId(e);
						var arrI = strId.split("_");
						obj_GSKH.arrGSDF[arrI[1]][("df" + arrI[2])] = parseFloat(this.value);
						GetObjById("zdf_"+arrI[1]).innerHTML=jisuanzongfen(arrI[1]);
					} 
					else 
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
			}
		}
		
		for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)//评价干事
		{
			var strId = "pj_" + i;
			GetObjById(strId).onchange = function(e)
			{
				strId = GetId(e);
				var arr = strId.split("_");
				
				if(CheckLegalStr(this.value))
				{
					obj_GSKH.arrDGSPJ[arr[1]].pj = this.value;
					
				}
				else
				{
					alert("您输入有非法字段，请重新输入");
					obj_GSKH.arrDGSPJ[arr[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
			{
				for (var j = 0; j < 8; ++j) 
				{
					strId = "bzId_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
			
			for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)//评价干事
			{
				var strId = "pj_" + i;
				if(GetObjById(strId).value == "")
					return false;
			}
			return true;
		}
		
		function AllConfirm()
		{
			for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
			{
				for (var j = 0; j < 8; ++j) 
				{
					if(obj_GSKH.arrGSDF[i][("df" + j)]==0)
					{
						alert(obj_GSKH.arrGSDF[i].name+"的第"+(j+1)+"项得分为0，必须填写才能提交");
						return false;
					}
				}
				if(obj_GSKH.arrDGSPJ[i].pj=="无"||obj_GSKH.arrDGSPJ[i].pj==""||obj_GSKH.arrDGSPJ[i].pj==" ")
				{
					if(!confirm(obj_GSKH.arrDGSPJ[i].name+"的评价还没写，你确定这样提交？"))
					{
						return false;
					}
				}
			}
			return true;
		}
		
		GetObjById("save").onclick = function () 
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
			}
			else if (Post_GSKH(obj_GSKH)) 
			{
				alert("保存成功！");
				GetObjById("show_more").innerHTML = "";
			} 
			else 
			{
				alert("*保存失败，请重试");
			}
		}
		GetObjById("submit").onclick=function()
		{
			if(AllConfirm())
			{
				obj_GSKH.hadSubmit=1;
				if(Post_GSKH(obj_GSKH))
				{
					alert("提交成功");
					GetObjById("show_more").innerHTML = "";
				}
				else
				{
					alert("*提交失败，请重试");
				}
			}
		}
	}
	else//不可提交状态
	{
		for (var i = 0; i < obj_GSKH.arrGSDF.length; ++i) 
		{
			for (var j = 0; j < 8; ++j) 
			{
				strId = "bzId_" + i + "_" + j;
				GetObjById(strId).value = obj_GSKH.arrGSDF[i][("df" + j)];
				GetObjById(strId).readOnly = true;
			}
		}
		
		for(var i = 0; i < obj_GSKH.arrDGSPJ.length; ++i)//评价干事
		{
			var strId = "pj_" + i;
			GetObjById(strId).value = obj_GSKH.arrDGSPJ[i].pj;
			GetObjById(strId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//部长反馈表
function Show_BZFK()
{
	var obj_BZFK = Get_BZFK();
	var strInnerHtml = new String();
	strInnerHtml += "<h3>得分部分</h3>\n"
				+"<p>总分："+obj_BZFK.ZongFen+"</p>\n"
				+"<p class=\"fill_in_tips\">\n"
				+"	<span class=\"fill_part\">得分细节</span>\n"
				+"</p>\n"
				+"<table class=\"yijibiao\">\n"
				+"	<tr>\n"
				+"		<td>项目</td><td>细则</td><td>得分/加减分</td><td>备注</td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>部长自评表得分</td><td><p>满分2分<p></td><td>"+obj_BZFK.arrDeFenXiZhe[0]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>部长考核表得分</td><td><p>满分5分<p></td><td>"+obj_BZFK.arrDeFenXiZhe[1]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>干事评分</td><td><p>满分2分，干事打分为10分制，由干事打分*0.2/部门干事人数）</p></td><td>"+obj_BZFK.arrDeFenXiZhe[2]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>其他部长级评分</td><td><p>满分2分，部长打分为10分制，由部长打分*0.2/部门除该部长外部长人数）</p></td><td>"+obj_BZFK.arrDeFenXiZhe[3]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>出勤得分</td><td><p>基本得分1分</p><p>A.例会 大会 拓展（请假-0.1/次，迟到-0.2/次，缺席-0.3/次）</p><p>B.外调（缺席-0.1/次）</p></td><td>"+obj_BZFK.arrDeFenXiZhe[4]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>外调加分</td><td><p>基本分0分</p><p>A.例会 大会 拓展（请假-0.1/次，迟到-0.2/次，缺席-0.3/次）</p><p>B.外调（缺席-0.1/次）</p></td><td>"+obj_BZFK.arrDeFenXiZhe[5]+"</td><td><p>此外调统计包括人力平时外调各部门干事，司仪、礼仪队的外调，信编拍照外调和人力观察员外调</p></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>反馈加分</td><td><p>0.1/次</p><p>在外调反馈表或活动调研问卷中写的意见被活动部门采纳</p></td><td>"+obj_BZFK.arrDeFenXiZhe[6]+"</td><td></td>\n"
				+"	</tr>\n"
				+"	<tr>\n"
				+"		<td>其他</td><td></td><td>"+obj_BZFK.arrDeFenXiZhe[7]+"</td><td></td>\n"
				+"	</tr>\n"
				+"</table>\n"
				
				+"<h3>评价部分</h3>\n"
				+"<p class=\"fill_in_tips\">自我评价</p>\n"
				+"<div id=\"assessment\">\n"
				+"	<ul>\n"
				+"		<li><p class=\"self-assessment\">"+obj_BZFK.ZiWoPingJia+"</p></li>\n"
				+"	</ul>\n"
				+"</div>\n"
				+"<p class=\"fill_in_tips\">干事评价</p>\n"
				+"<ul id=\"entrusted_assessment\">\n";
	for(var i=0;i<obj_BZFK.arrGanShiPingJia.length;i++)
	{
		strInnerHtml += "<li>"+obj_BZFK.arrGanShiPingJia[i]+"</li>";
	}
	strInnerHtml += "</ul>"
					+"<p class=\"fill_in_tips\">其他部长评价</p>"
					+"<ul class=\"ministerial\">";
	for(var i=0;i<obj_BZFK.arrQiTaBuZhanPinJia.length;i++)
	{
		strInnerHtml += "<li>"+obj_BZFK.arrQiTaBuZhanPinJia[i]+"</li>";
	}
	strInnerHtml+="</ul>"
				+"<p class=\"fill_in_tips\">来自其他部门其他部长级的留言</p>"
				+"<ul class=\"ministerial\">";
	if(obj_BZFK.arrLiuYan.length==0)
	{
		strInnerHtml+="<li>木有留言</li>";
	}
	for(var i=0;i<obj_BZFK.arrLiuYan.length;i++)
	{
		strInnerHtml+="<li>"+obj_BZFK.arrLiuYan[i]+"</li>";
	}
	strInnerHtml += "</ul>"
					+"<p class=\"fill_in_tips\">主管副主席评价</p>"
					+"<ul class=\"ministerial\">"
					+"<li>"
					+obj_BZFK.ZhuGuanFuZhuXiPinJia
					+"</li>"
					+"</ul>"
					+"<h3>干事自我评价部分</h3>"
					+"<ul>";
	for(var i=0;i<obj_BZFK.arrGanShiZhiWoPinJia.length;i++)
	{
		strInnerHtml += "<li><p class=\"self-assessment\">"+obj_BZFK.arrGanShiZhiWoPinJia[i].name+"<br />"+obj_BZFK.arrGanShiZhiWoPinJia[i].assess+"</p></li>";
	}
	
	strInnerHtml +="</ul>";
	strInnerHtml+="<h3>干事得分排名</h3><ol>";
	for(var i=0;i<obj_BZFK.arrGanShiDeFengPaiMing.length;i++)
	{
		strInnerHtml+="<li>"+obj_BZFK.arrGanShiDeFengPaiMing[i].name+"&emsp;<span>得分：</span>"+obj_BZFK.arrGanShiDeFengPaiMing[i].score+"</li>";
	}
	strInnerHtml+="</ol>"
					+"<h3>部门情况反馈</h3>"
					+"<p>部门得分："+obj_BZFK.BuMenDeFeng+"</p>"
					+"<p class=\"fill_in_tips\">部门排名：</p>"
					+"<table>";
	for(var i=0;i<obj_BZFK.arrBuMenPaiMing.length;i++)
	{
		strInnerHtml+="<tr><td>"+(i+1)+". </td><td>&emsp;&emsp;"+arrDepartName[obj_BZFK.arrBuMenPaiMing[i].bm-1]+"</td><td><span>得分:</span>"+obj_BZFK.arrBuMenPaiMing[i].df+"</td></tr>";
	}
	strInnerHtml+="</table>"
					+"<p class=\"fill_in_tips\">"
					+"<span class=\"fill_part\">得分细节</span>"
					+"</p>"
					+"<table class=\"yijibiao\">"
					+"	<tr>"
					+"		<td>项目</td><td>细则</td><td>得分/加减分</td><td>备注</td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>主席评分</td><td><p>满分5分<p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[0]+"</td><td></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>主管副主席评分</td><td><p>满分3分<p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[1]+"</td><td></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>部门出勤</td><td><p>基本得分2分</p><p>A例会 大会 拓展（请假-0.1/人次，迟到-0.2/人次，缺席-0.3/人次）</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[2]+"</td><td><p>此统计还包括部长级例会的出勤情况（扣分情况与平时例会相同），外调缺席不扣部门出勤分<p></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>违反违规惩戒制度</td><td><p>包括秘书、人力、公关、信编和宣传的违规惩戒制度，具体扣分细则请看总群群共享上的《违规惩戒制度》</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[3]+"</td><td><p>此外调统计包括人力平时外调各部门干事，司仪、礼仪队的外调，信编拍照外调和人力观察员外调</p></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>反馈加分</td><td><p>0.1/人次</p><p>在外调反馈表或活动调研问卷中写的意见被活动部门采纳</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[4]+"</td><td></td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>主管副主席推优</td><td><p>0.3/票</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[5]+"</td><td>每位主管副主席推优一个非主管部门</td>"
					+"	</tr>"
					+"	<tr>"
					+"		<td>优秀部长加分</td><td><p>0.2</p></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[6]+"</td><td></td>"
					+"	</tr>"
					+"		<td>其他</td><td></td><td>"+obj_BZFK.arrBuMenDeFenXiZhe[7]+"</td><td></td>"
					+"	</tr>"
					+"</table>"
					
					+"<p class=\"fill_in_tips\">主席的部门评价</p>"
					+"<ul class=\"ministerial\">"
					+"	<li><p class=\"self-assessment\">"+obj_BZFK.ZhuXiDeBuMenPinJia+"</p></li>"
					+"</ul>"
					+"<p class=\"fill_in_tips\">主管副主席的部门评价</p>"
					+"<ul class=\"ministerial\">"
					+"	<li><p class=\"self-assessment\">"+obj_BZFK.ZhuGuanFuZhuXiBuMenPinJia+"</p></li>"
					+"</ul>"
					+"<p class=\"fill_in_tips\">干事对部门的评价</p>"
					+"<ul class=\"ministerial\">";
	for(var i=0;i<obj_BZFK.arrBuMenLiuYan.length;i++)
	{
		strInnerHtml+="	<li><p class=\"self-assessment\">"+obj_BZFK.arrBuMenLiuYan[i]+"</p></li>";
	}
	
	strInnerHtml+="</ul>"
				+"<button type=\"button\" id=\"submit\" class=\"perf_button\">确定</button>";
	GetObjById("show_more").innerHTML = strInnerHtml;
	GetObjById("submit").onclick = function()
	{
		GetObjById("show_more").innerHTML ="";
	}
}

//部长考核表
function Show_BZKH()
{
	var obj_BZKH = Get_BZKH();
	
	var strHTML = "<div id=\"pjbz\"></div>";
	strHTML +=" <h3>评分部分</h3>"
			+ "	<p class=\"fill_in_tips\">"
			+ "		<span class=\"till_part\">考核干事部分:</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请为部长评分"
			+ "	</p>"
			+ "	<form method=\"post\" action=\"#\">"
			+ "		<table class=\"erjibiao ganshikaohebiao\">"
			+ "			<tr>"
			+ "				<td></td>"
			+ "				<td></td>"
			+ "				<td colspan=\"3\" scope=\"col\">协作能力</td>"
			+ "				<td colspan=\"2\" scope=\"col\">督导能力</td>"
			+ "			</tr>"
			+ "			<tr>"
			+ "				<td>部门</td>"
			+ "				<td>姓名</td>"
			+ "				<td>沟通能力</td>"
			+ "				<td>合作能力</td>"
			+ "				<td>表达能力</td>"
			+ "				<td>管理能力</td>"
			+ "				<td>领导能力</td>"
			+ "			</tr>";			
	for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
	{
		for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			strHTML += "<tr>";
			if(j == 0)
				strHTML += "<td rowspan=" + obj_BZKH.arrBMBZ[i].arrBZ.length + " scope=\"row\">" + obj_BZKH.arrBMBZ[i].bm + "</td>";
			strHTML += "<td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td>";
			for(var k = 0; k < 5; ++k)
				strHTML += "<td class=\"normal_input\"><input id=" + ("df_"+i+"_"+j+"_"+k) + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)] + "\" size=\"16\"/></td>";
		}
		strHTML += "</tr>";
	}
	
	strHTML +=" <tr>"
			+ "		<td class=\"blankline\" colspan=\"8\" scope=\"col\"></td>"
			+ "	</tr>"
			+ "	<tr>"
			+ "		<td></td>"
			+ "		<td></td>"
			+ "		<td colspan=\"4\" scope=\"col\">工作情况</td>"
			+ "		<td colspan=\"1\" scope=\"col\">总分(5分制)</td>"
			+ "	</tr>"
			+ " <tr>"
			+ "		<td>部门</td>"
			+ "		<td>姓名</td>"
			+ "		<td>工作量</td>"
			+ "		<td>工作方法</td>"
			+ "		<td>工作态度</td>"
			+ "		<td>工作能力</td>"	
			+ "		<td>总分</td>"
			+ "	</tr>";
	for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
	{
		for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			strHTML += "<tr>";
			if(j == 0)
				strHTML += "<td rowspan=" + obj_BZKH.arrBMBZ[i].arrBZ.length + " scope=\"row\">" + obj_BZKH.arrBMBZ[i].bm + "</td>";
			
			strHTML += "<td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td>";
			for(var k = 5; k < 9; ++k)
			{
				strHTML += "<td class=\"normal_input\"><input id=" + ("df_"+i+"_"+j+"_"+k) + " class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)] + "\" size=\"16\"/></td>";
			}
			strHTML+="<td id=\"zdf_"+i+"_"+j+"\">"+jisuanzongdefen(i,j)+"</td>";
				
		}
		strHTML += "</tr>";
	}
	
	function jisuanzongdefen(i,j)
	{
		var fs=0;
		for(var k=0;k<9;k++)
		{
			fs+=parseFloat(obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)]);
		}
		fs=(fs/90)*5;
		return fs;
	}
	strHTML += "</table>";
	
	strHTML +=" <h3>评价部长部分</h3>"
			+ "	<p class=\"fill_in_tips\">"
			+ "		<span class=\"till_part\">评价部长:</span>根据您对部长级的观察与了解，您认为该部长级在本时段的工作中哪些地方最让你欣赏或者是哪些地方还需要改进的，请给该部长级一个整体的评价和发展建议。"
			+ "	</p>"
			+ "	<table class=\"erjibiao\">"
			+ "		<tr><td>部门</td><td>姓名</td><td>对部长的评价</td>";
	for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
	{
		for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			if(j == 0)
				strHTML +=" <tr><td rowspan="+ obj_BZKH.arrBMBZ[i].arrBZ.length + " scope=\"row\">" + obj_BZKH.arrBMBZ[i].bm + "</td><td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i+"_"+j) + " value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j].pj + "\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>";
			else
				strHTML += "<tr><td>" + obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i+"_"+j) + " value=\"" + obj_BZKH.arrBMBZ[i].arrBZ[j].pj + "\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>";
		}
	}
	strHTML += "</table>";
	
	strHTML += "<!--预留报错位-->\n"
			+ "	<div></div>\n"
			+ "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
			+ "<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"	;		
		
	strHTML += "</form>";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	for (var i = 0; i < obj_BZKH.arrBMBZ.length; ++i) 
	{
		for (var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
		{
			for (var k = 0; k < 9; ++k) 
			{
				var strId = "df_" + i + "_" + j + "_" + k;
				GetObjById(strId).onfocus = function (e) 
				{
					var xSite = new Array(450, 600, 750, 300, 450, 600);

					strId = GetId(e);
					var arr = strId.split("_");
					GetObjById("pjbz").style.left = xSite[arr[3] % 5] + "px";
					
					GetObjById("pjbz").innerHTML = obj_BZKH.BZKH_BZ[("str" + arr[3])];

					//GetObjById("pjbz").innerHTML = e.clientX +" , "+e.clientY;
				}
				GetObjById(strId).onblur = function (e) 
				{
					GetObjById("pjbz").innerHTML = "";
				}
			}
		}
	}
	
	if(obj_BZKH.status == 0)//可提交状态
	{
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				for (var k = 0; k < 9; ++k) 
				{
					var strId = "df_" + i + "_" + j + "_" + k;
					GetObjById(strId).onchange = function (e) 
					{
						var strId = GetId(e);
						if (this.value >= 0 && this.value <= 10) 
						{
							strId = GetId(e);
							var arr = strId.split("_");
							obj_BZKH.arrBMBZ[arr[1]].arrBZ[arr[2]][("df"+arr[3])] = this.value;
							GetObjById("zdf_"+arr[1]+"_"+arr[2]).innerHTML=jisuanzongdefen(arr[1],arr[2]);
						}
						else 
						{
							this.value = "";
							alert("*得分不能大于10或小于0，请重新填！");
						}
					}
					
				}
			}
		}
	
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				var strId = "pj_" + i + "_" + j;
				GetObjById(strId).onchange = function (e) 
				{
					strId = GetId(e);
					var arr = strId.split("_");

					if (CheckLegalStr(this.value))
						obj_BZKH.arrBMBZ[arr[1]].arrBZ[arr[2]].pj = this.value;
					else 
					{
						alert("您输入有非法字段，请重新输入");
						obj_BZKH.arrBMBZ[arr[1]].arrBZ[arr[2]].pj = "";
						this.value = "";
					}
				}
			}
		}
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
			{
				for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
				{
					for (var k = 0; k < 9; ++k) 
					{
						var strId = "df_" + i + "_" + j + "_" + k;
						if(GetObjById(strId).value == "")
							return false;
					}
				}
			}
			
			for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
			{
				for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
				{
					var strId = "pj_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
		
			return true;
		}
	
		GetObjById("save").onclick = function () 
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白");
			}
			else if (Post_BZKH(obj_BZKH)) 
			{
				alert("保存成功！");
				GetObjById("show_more").innerHTML = "";
			} 
			else 
			{
				alert("*保存失败，请重试");
			}
		}
		function AllConfirm()
		{
			for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
			{
				for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
				{
					for (var k = 0; k < 9; ++k) 
					{
						
						if(0==obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)])
						{
							alert(obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz+"的第"+(j+1)+"项评分未填，必须填写才能提交- -");
							return false;
						}
								
						
					}
					var strPj=obj_BZKH.arrBMBZ[i].arrBZ[j].pj;
					if(strPj=="无"||strPj==""||strPj==" "||strPj=="请填写......")
					{
						if(!confirm(obj_BZKH.arrBMBZ[i].arrBZ[j].bzmz+"的评价未填写，您确定这样提交？"))
						{
							return false;
						}
					}
					
				}
			}
			return true;
		}
		
		GetObjById("submit").onclick=function()
		{
			if(AllConfirm())
			{
				obj_BZKH.hadSubmit=1;
				if(Post_BZKH(obj_BZKH))
				{
					alert("提交成功");
					GetObjById("show_more").innerHTML = "";
				}
				else
				{
					alert("*提交失败，请重试");
				}
			}
		}
		
	}
	else//不可提交状态
	{
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				for (var k = 0; k < 15; ++k) 
				{
					var strId = "df_" + i + "_" + j + "_" + k;					
					GetObjById(strId).value = obj_BZKH.arrBMBZ[i].arrBZ[j][("df"+k)];	
					GetObjById(strId).readOnly = true;
				}
			}
		}
	
		for(var i = 0; i < obj_BZKH.arrBMBZ.length; ++i)
		{
			for(var j = 0; j < obj_BZKH.arrBMBZ[i].arrBZ.length; ++j)
			{
				var strId = "pj_" + i + "_" + j;
				GetObjById(strId).value = obj_BZKH.arrBMBZ[i].arrBZ[j].pj;
				GetObjById(strId).readOnly = true;
			}
		}
	
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//部门考核表
function Show_BMKH()
{
	var obj_BMKH = Get_BMKH();
	
	var strHTML = "<div id=\"pjbz\"></div>";
	strHTML +=" <h3>部门评分部分</h3>"
			+ "	<p class=\"fill_in_tips\">"
			+ "		<span class=\"till_part\">部门评分部分：</span>满分10分，A项对应9-10分，B项对应7-8分，C项对应5-6分，D项对应3-4分，请为部长评分"
			+ "	</p>"
			+ "	<form method=\"post\" action=\"#\">"
			+ "		<table class=\"erjibiao ganshikaohebiao\">"
			+ "			<tr>"
			+ "				<td>部门</td>"
			+ "				<td>工作量/工作难度</td>"
			+ "				<td>工作完成效果</td>"
			+ "				<td>工作态度</td>"
			+ "				<td>纪律性</td>"
			+ "				<td>部门凝聚力</td>"
			+ "				<td>沟通合作能力</td>"
			+ "				<td>部门成员表现</td>"
			+ "			</tr>";
		
	for(var i = 0; i < obj_BMKH.arrBM.length; ++i)
	{
		strHTML +=" <tr>"							
				+ "		<td>" + obj_BMKH.arrBM[i].bm + "</td>";
		for(var j = 0; j < 7; ++j)
		{
			strHTML +=" <td class=\"normal_input\"><input id=" + ("df_"+i+"_"+j) + " value=\"" + obj_BMKH.arrBM[i][("df"+j)] + "\" class=\"perf_textarea\" name=\"#\" type=\"text\" value=\"0\" size=\"16\"/></td>";
		}
		strHTML +=" </tr>";
	}
	strHTML += "</table>";
	
	strHTML +=" <table class=\"erjibiao\">"
			+ "		<tr><td>部门</td><td>对部门的评价</td>";
	for(var i = 0; i < obj_BMKH.arrBM.length; ++i)
	{
		strHTML += "<tr><td>" + obj_BMKH.arrBM[i].bm + "</td><td class=\"normal_input\"><input id=" + ("pj_"+i) + " value=\"" + obj_BMKH.arrBM[i].pj + "\" type=\"text\" size=\"80\" class=\"perf_textarea\" /></td></tr>";
	}
	strHTML += "</table>";
	
	strHTML += "<h3>推优部分</h3>\n"
			 + "<p class=\"fill_in_tips\">\n"
			 + "	<span class=\"fill_part\">填写指引：</span>请推选一个本月表现突出的非本人主管部门，并说明理由，理由会反馈给该部长\n"
			 + "</p>\n"
			 + "<p>\n"
			 + "	部门：\n"
			 + "	<!--部门-->\n"
			 + "	<select name=\"#\" id=\"tuiyou\">\n"
			 + "	</select>\n"
			 + "</p>\n";
			 //+ "<p>\n"
			// + "	理由：\n"
			 //+ "	<input id=\"tuiyouliyou\" class=\"perf_textarea\" type=\"text\" name=\"#\" size=\"80\" />\n"
			 //+ "</p>";
	
	strHTML += "<!--预留报错位-->\n"
			+ "	<div></div>\n"
			+ "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
			+ "<input type=\"button\" value=\"保存\" id=\"save\"  class=\"perf_button\" />\n"	;					
		
	strHTML += "</form>";
	
	GetObjById("show_more").innerHTML = strHTML;
	
	for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
	{
		for (var j = 0; j < 7; ++j) 
		{
			var strId = "df_" + i + "_" + j;
			GetObjById(strId).onfocus = function (e) 
			{
				var xSite = new Array(390, 530, 660, 800, 390, 530, 660);

				strId = GetId(e);
				var arr = strId.split("_");
				GetObjById("pjbz").style.left = xSite[arr[2] % 7] + "px";

				GetObjById("pjbz").innerHTML = obj_BMKH.BMKH_BZ[("str" + arr[2])];
			}
			GetObjById(strId).onblur = function (e) 
			{
				GetObjById("pjbz").innerHTML = "";
			}
		}
	}
	
	if(obj_BMKH.status == 0)//可提交状态
	{
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			for (var j = 0; j < 7; ++j) 
			{
				var strId = "df_" + i + "_" + j;
				GetObjById(strId).onchange = function (e) 
				{				
					var strId = GetId(e);
					if (this.value >= 0 && this.value <= 10) 
					{
						strId = GetId(e);
						var arr = strId.split("_");
						obj_BMKH.arrBM[arr[1]][("df" + arr[2])] = this.value;
					} 
					else 
					{
						this.value = "";
						alert("*得分不能大于10或小于0，请重新填！");
					}
				}
			}
		}
		
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			var strId = "pj_" + i;
			GetObjById(strId).onchange = function (e) 
			{
				strId = GetId(e);
				var arr = strId.split("_");

				if (CheckLegalStr(this.value))
					obj_BMKH.arrBM[arr[1]].pj = this.value;
				else 
				{
					alert("您输入有非法字段，请重新输入");
					obj_BMKH.arrBM[arr[1]].pj = "";
					this.value = "";
				}
			}
		}
		
		//推优部分
		GetObjById("tuiyou").options.length = 0;
		var iIndex = 0;
		for(var i=0; i<obj_BMKH.arrBuMen.length; ++i)
		{
			GetObjById("tuiyou").options[i] = new Option(obj_BMKH.arrBuMen[i].name);
			if(obj_BMKH.TYBM == obj_BMKH.arrBuMen[i].name)
				iIndex = i;
		}

		GetObjById("tuiyou").selectedIndex = iIndex;
		//GetObjById("tuiyouliyou").value = obj_BMKH.TYBZ.tyly;
		
		GetObjById("tuiyou").onchange = function()
		{
			//if(this.selectedIndex != iIndex)
			//	GetObjById("tuiyouliyou").value = "请填写......";
			//else
			//	GetObjById("tuiyouliyou").value = obj_BMKH.TYBZ.tyly;
				
			obj_BMKH.TYBM = this.options[this.selectedIndex].text;
			//obj_BMKH.TYBZ.account = obj_BMKH.arrBuZhang[this.selectedIndex].account;
		}
		/*GetObjById("tuiyouliyou").onchange = function()
		{
			if(CheckLegalStr(this.value))
				obj_BMKH.TYBZ.tyly = this.value;
			else
			{
				alert("您输入有非法字段，请重新输入");
				obj_BMKH.TYBZ.tyly = "";
				this.value = "";
			}
		}*/
		
		
		function Finish()//判断是否全部完成需要填写的内容
		{
			for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
			{
				for (var j = 0; j < 7; ++j) 
				{	
					var strId = "df_" + i + "_" + j;
					if(GetObjById(strId).value == "")
						return false;
				}
			}
			
			for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
			{
				var strId = "pj_" + i;
				if(GetObjById(strId).value == "")
					return false;
			}
			
			//if(GetObjById("tuiyouliyou").value == "")
			//	return false;
			
			return true;
		}
		
		GetObjById("save").onclick = function () 
		{
			if( !Finish() )
			{
				alert("保存前不允许留有空白！");
			}
			else if (Post_BMKH(obj_BMKH)) 
			{
				alert("保存成功！");
				GetObjById("show_more").innerHTML = "";
			} else {
				alert("*保存失败，请再提交");
			}
		}
		
		function AllConfirm()
		{
			for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
			{
				for (var j = 0; j < 7; ++j) 
				{
					
					if(obj_BMKH.arrBM[i][("df" + j)] ==0)
					{
						
						alert(obj_BMKH.arrBM[i].bm+"的第"+(i+1)+"项评分未填写，请填写了再提交!");
						return false;
					}
					
						
				}
				var strPj=obj_BMKH.arrBM[i].pj;
				if(strPj==""||strPj==" "||strPj=="无")
				{
					if(!confirm(obj_BMKH.arrBM[i].bm+"的评价未填写，您确定就这样提交？"))
					{
						return false;
					}
				}
			}
			return true;
		}
		
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("提交前不允许留有空白！");
				return false;
			}
			if(AllConfirm())
			{
				obj_BMKH.hadSubmit=1;
				if (Post_BMKH(obj_BMKH)) 
				{
					alert("保存成功！");
					GetObjById("show_more").innerHTML = "";
				}
				else
				{
					alert("*保存失败，请再提交");
				}
			}
		}
		
	}
	else//不可提交状态
	{
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			for (var j = 0; j < 7; ++j) 
			{
				var strId = "df_" + i + "_" + j;
				GetObjById(strId).value = obj_BMKH.arrBM[i][("df" + j)];
				GetObjById(strId).readOnly = true;
			}
		}
		
		for (var i = 0; i < obj_BMKH.arrBM.length; ++i) 
		{
			var strId = "pj_" + i;
			GetObjById(strId).value = obj_BMKH.arrBM[i].pj;
			GetObjById(strId).readOnly = true;
		}
		
		GetObjById("tuiyou").options.length = 0;
		GetObjById("tuiyou").options[0] = new Option(obj_BMKH.TYBM);
		//GetObjById("tuiyouliyou").value = obj_BMKH.TYBZ.tyly;
		//GetObjById("tuiyouliyou").readOnly = true;		
		
		GetObjById("submit").value = "确定";
		GetObjById("save").remove();
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//优秀部长评定
function Show_YXBZPD()
{
	
	var objYXBZPD = Get_YXBZPD();
	var strCheckForm = new String();
	strCheckForm += "<h3>评定本月优秀部长</h3>\n"
				+"<p class=\"fill_in_tips\">请勾选4名你认为本月表现较好的部长级</p>\n"
				+"<form name=\"yxbzpdb\" id=\"yxbzpdb\" action=\"#\" method=\"#\">\n"
				//+"<ol>\n";
				+"<table>";
	for(var i=0;i<objYXBZPD.arrYXBZPDlist.length;i++)
	{
		var strID=objYXBZPD.arrYXBZPDlist[i].account;
		var strName=objYXBZPD.arrYXBZPDlist[i].name;
		var strDepart=objYXBZPD.arrYXBZPDlist[i].depart;
		var strScore=objYXBZPD.arrYXBZPDlist[i].score;
		/*
		strCheckForm += "<li><label for=\""+strID+"\"><input type=\"checkbox\" id=\""+strID+"\" name=\""+strID+"\" value=\""+strID+"\""; 
		if(true == objYXBZPD.arrYXBZPDlist[i].Checked)
		{
			strCheckForm += "checked=\"checked\"";
		}
		strCheckForm +="/>"+strName+"<span>&emsp;部门:</span> "+strDepart+"<span>&emsp;得分:</span> "+strScore+"</label></li>\n";
		*/
		strCheckForm+="<tr><td>"+(i+1)+".</td><td><label for=\""+strID+"\"><input type=\"checkbox\" id=\""+strID+"\" name=\""+strID+"\" value=\""+strID+"\""; 
		if(true == objYXBZPD.arrYXBZPDlist[i].Checked)
		{
			strCheckForm += "checked=\"checked\"";
		}
		strCheckForm +="/>"+strName+"</label></td><td> <span>&emsp;部门:</span> "+strDepart+"</td><td><span>&emsp;得分:</span> "+strScore+"</td></tr>";
	}
	strCheckForm+="</table>";
	if(0==objYXBZPD.status)
	{
		
		strCheckForm+="<button type=\"button\" name=\"youxiubuzhan\" id=\"youxiubuzhan\" class=\"perf_button\">"
					+"	提交\n"
					+"</button>\n";
		document.getElementById("show_more").innerHTML=strCheckForm;
		document.getElementById("youxiubuzhan").onclick = function()
		{
			
			var objYXBZNameList = document.forms["yxbzpdb"];
			var arrIDList = new Array();
			for(var i=0;i<objYXBZPD.arrYXBZPDlist.length;i++)
			{	
				
				if(true == objYXBZNameList.elements[i].checked)
				{
					arrIDList.push(objYXBZNameList.elements[i].name);
					
				}
			}
			if(4 >= arrIDList.length&&0<arrIDList.length)
			{
				
				if(true == Post_YXBZPD(arrIDList) )
				{
					alert("提交成功！");
					GetObjById("show_more").innerHTML = "";
				}
				else
				{
					alert("提交失败，请重试！");
					return false;
				}
			}
			else
			{
				alert("你勾选的数量非法");
			}
		}
	}
	else
	{
		strCheckForm+="<button type=\"button\" name=\"youxiubuzhan\" id=\"youxiubuzhan\" class=\"perf_button\">"
					+"	确定\n"
					+"</button>\n";
		GetObjById("show_more").innerHTML=strCheckForm;
		GetObjById("youxiubuzhan").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
	
}

//主席团反馈表
function Show_ZXTFK()
{
	
	var objZXTFK = Get_ZXTFK(year,month);
	
	var strFeedBack = new String();
	strFeedBack += "<p class=\"fill_int_tips\">部门排名情况</p>\n<ol>";
	for(var i=0;i<objZXTFK.arrSorted.length;i++)
	{
		strFeedBack+="<li>"+arrDepartName[objZXTFK.arrSorted[i].name-1]+"&emsp;<span>得分：</span>"+objZXTFK.arrSorted[i].score;
		if(true == objZXTFK.arrSorted[i].isExc)
		{
			strFeedBack+="<span>&emsp;月度优秀部门</span>";
		}
		strFeedBack+="</li>";
	}
	
	strFeedBack+="</ol>"
			+"<p class=\"fill_in_tips\">优秀部长</p>\n"
			+"<ol>";
	for(var i=0;i<objZXTFK.arrExcMin.length;i++)
	{
		strFeedBack+="<li><span>月度优秀部长：</span>"
					+objZXTFK.arrExcMin[i].name
					+"&emsp;<span>所属部门：</span>"
					+arrDepartName[objZXTFK.arrExcMin[i].depart-1]
					+"&emsp;<span>得分：</span>"
					+objZXTFK.arrExcMin[i].score
					+"</li>";
	}
	strFeedBack+="</ol><p class=\"fill_in_tips\">部长级情况反馈</p>\n"
				+"<ul>";
				
	for(var i=0;i<objZXTFK.arrMinFeedBack.length;i++)
	{
		strFeedBack+="<li><span>"+arrDepartName[objZXTFK.arrMinFeedBack[i].depart-1]+":&emsp;</span>"
					+objZXTFK.arrMinFeedBack[i].minister
					+"<ul><li>自我评价：<br /><p class=\"self-assessment\">"
					+objZXTFK.arrMinFeedBack[i].selfAssess
					+"<p></li><li>对主管副主席的评价：<br /><p class\"self-assessment\">"
					+objZXTFK.arrMinFeedBack[i].feedBack
					+"</p></li></ul></li>";
	}
	strFeedBack+="</ul><p class=\"fill_in_tips\">来自其他部长级的匿名评价</p><ul>\n";
	for(var i=0;i<objZXTFK.arrAnonymity.length;i++)
	{
		var str=objZXTFK.arrAnonymity[i].anonymityFeedBack;
		if(str!=""&&str!=" "&&str!="无")
		{
			strFeedBack+="<li>"+objZXTFK.arrAnonymity[i].anonymityFeedBack+"</li>";
		}
	}
	
	strFeedBack+="</ul><button type=\"button\" id=\"submit\" class=\"perf_button\">确定</button>";
	
	GetObjById("show_more").innerHTML =strFeedBack;		
	GetObjById("submit").onclick = function()
	{
		GetObjById("show_more").innerHTML ="";
	}	
}

//考核进程控制表
function Show_KHJCKZ()
{
	var strHTML = "";
	strHTML += "<h3>开始本月考核</h3>"
			+"	<p class=\"fill_in_tips\">开始填写：点击后激活本月绩效考核，各项表格除《优秀部长考核表》外可填</p>"
			+"	<button type=\"button\" name=\"kaishikaohe\" id=\"kaishikaohe\" class=\"perf_button\">"
			+"	开始本月考核"
			+"	</button>"
			+"	<hr class=\"perf_hr\" />"
			+"	<h3>开始优秀部长评定</h3>"
			+"	<p class=\"fill_in_tips\">开始优秀部长评定：点击后关闭干事和部长的所有填写性表格，激活《优秀部长评定表》,激活后，除《优秀部长评定表》外所有表格不可填</p>"
			+"	<button type=\"button\" name=\"kaishikaohe\" id=\"yxpzpd\" class=\"perf_button\">"
			+"	开始优秀部长评定"
			+"	</button>"
			+"	<hr class=\"perf_hr\" />"
			+"	<h3>发布结果</h3>"
			+"	<p class=\"fill_in_tips\">发布结果：点击后所有反馈表发布，所有可填表关闭，结束本月考核</p>"
			+"	<button type=\"button\" name=\"kaishikaohe\" id=\"fabujieguo\" class=\"perf_button\">"
			+"	发布结果"
			+"	</button>"
			+"	<hr class=\"perf_hr\" />"
			+"</ul><button type=\"button\" id=\"submit\" class=\"perf_button\">确定</button>";
			
	GetObjById("show_more").innerHTML = strHTML;
	
	var obj_KHJCKZ = Get_KHJCKZ();
	
	GetObjById("kaishikaohe").onclick = function()
	{
		if(obj_KHJCKZ.KSKH == 0)
		{
			if(confirm("确定开始本月考核?"))
			{
				obj_KHJCKZ.KSKH = 1;//确定
				if(Post_KHJCKZ(obj_KHJCKZ))
					GetObjById("show_more").innerHTML = "";
				else
					alert("确定开始本月考核失败，请重试");
			}
		}
		else
		{
			alert("已经开始了本月份的考核");
		}
	}
	GetObjById("yxpzpd").onclick = function()
	{
		if(obj_KHJCKZ.KSKH == 1 && obj_KHJCKZ.KSPD == 0)
		{
			if(confirm("确定开始优秀部长评定?"))
			{
				obj_KHJCKZ.KSPD = 1;//确定
				if(Post_KHJCKZ(obj_KHJCKZ))
					GetObjById("show_more").innerHTML = "";
				else
					alert("开始优秀部长评定失败，请重试");
			}
		}
		else if(obj_KHJCKZ.KSKH == 0)
		{
			alert("还没进行考核，不能开始优秀部长评定");
		}
		else
		{
			alert("已经开始了本月份的优秀部长评定");
		}
	}
	GetObjById("fabujieguo").onclick = function()
	{
		if(obj_KHJCKZ.KSKH == 1 && obj_KHJCKZ.KSPD == 1 && obj_KHJCKZ.FBJG == 0)
		{
			if(confirm("确定发布结果?"))
			{
				obj_KHJCKZ.FBJG = 1;//确定
				if(Post_KHJCKZ(obj_KHJCKZ))
					GetObjById("show_more").innerHTML = "";
				else
					alert("发布结果失败，请重试");
			}
		}
		else if(obj_KHJCKZ.KSKH == 0 )
		{
			alert("还没开始考核，不能发布结果");
		}
		else if(obj_KHJCKZ.KSPD == 0)
		{
			alert("还没进行优秀部长评定，不能发布结果");
		}
		else
		{
			alert("已经发布了本月份的考核结果");
		}
	}	
	
	GetObjById("submit").onclick = function()
	{
		GetObjById("show_more").innerHTML = "";
	}
}

//其他情况加减分
function Show_QTQKJJF()
{
	var obj_QTQKJJF = Get_QTQKJJF();

	var strHTML = "";
	
	strHTML += "<h3>跟进部门：" + arrDepartName[obj_QTQKJJF.gjbm-1]  + "</h3>";
	
	strHTML +="<table class=\"erjibiao\">"
			+ "		<tr><td>姓名</td><td>职位</td><td>加减分</td><td>理由</td>";
	for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
	{
		strHTML += "<tr><td>" + obj_QTQKJJF.persons[i].name + "</td><td>" + arrTypeName[obj_QTQKJJF.persons[i].depart-1] + "</td>"
				+  "<td class=\"normal_input\"><input id=\"" + ("jiajianfen_"+i) + "\" type=\"text\" size=\"5\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.persons[i].jiajianfen + "\" /></td>"
				+  "<td class=\"normal_input\"><input id=\"" + ("liyou_"+i) + "\" type=\"texteara\" size=\"80\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.persons[i].liyou + "\" /></td></tr>\n";
	}
	strHTML += "<tr><td>" + arrDepartName[obj_QTQKJJF.bmjjf.name-1] + "</td><td></td>"
			+  "<td class=\"normal_input\"><input id=\"" + ("bmjjf") + "\" type=\"text\" size=\"5\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.bmjjf.jiajianfen + "\" /></td>"
				+  "<td class=\"normal_input\"><input id=\"" + ("liyou") + "\" type=\"texteara\" size=\"80\" class=\"perf_textarea\" value=\"" + obj_QTQKJJF.bmjjf.liyou + "\" /></td></tr>\n";
	
	strHTML += "</table>";
	
	strHTML += "<input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	

	
	GetObjById("show_more").innerHTML = strHTML;
	
	if(obj_QTQKJJF.status == 0)//可填写状态
	{
		for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
		{
			var jjfId = "jiajianfen_"+i;//加减分Id
			var liyouId = "liyou_"+i;//理由Id
			GetObjById(jjfId).onchange = function(e)
			{
				jjfId = GetId(e);
				var iJjf = jjfId.split("_");
				obj_QTQKJJF.persons[iJjf[1]].jiajianfen = this.value;
			}
			GetObjById(liyouId).onchange = function(e)
			{
				liyouId = GetId(e);
				var iLiyou = liyouId.split("_");
				if( !CheckLegalStr(this.value) )
				{
					this.value = "";
					alert("您输入有非法字段，请重新输入");					
				}
				obj_QTQKJJF.persons[iLiyou[1]].liyou = this.value;
			}
		}
		GetObjById("bmjjf").onchange = function()
		{
			obj_QTQKJJF.bmjjf.jiajianfen = this.value;
		}
		GetObjById("liyou").onchange = function()
		{
			if( !CheckLegalStr(this.value) )
			{
				this.value = "";
				alert("您输入有非法字段，请重新输入");					
			}
			obj_QTQKJJF.bmjjf.liyou = this.value;
		}
		function Finish()//判断是否全部完成需要填写的内容
		{
			for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
			{
				var jjfId = "jiajianfen_"+i;//加减分Id
				var liyouId = "liyou_"+i;//理由Id
				if(GetObjById(jjfId).value == "")
					return false;
				if(GetObjById(liyouId).value == "")
					return false;
			}
			if(GetObjById("bmjjf").value == "")
				return false;
			if(GetObjById("liyou").value == "")
				return false;
			
			return true;
		}
		
		GetObjById("submit").onclick = function () 
		{
			if( !Finish() )
			{
				alert("您还未完成，请填完再提交");
			}
			else if (POST_QTQKJJF(obj_QTQKJJF)) 
			{
				alert("提交成功！");
				GetObjById("show_more").innerHTML = "";
			} 
			else 
			{
				alert("*提交失败，请再提交");
			}
		}
	}
	else//不可填写状态
	{
		for(var i = 0; i < obj_QTQKJJF.persons.length; ++i)
		{
			var jjfId = "jiajianfen_"+i;//加减分Id
			var liyouId = "liyou_"+i;//理由Id
			GetObjById(jjfId).readOnly = true;
			GetObjById(liyouId).readOnly = true;
		}
		
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

//优秀评定限制表
function Show_YXPDXZ()
{
	var obj_YXPDXZ = Get_YXPDXZ();

	var strHTML = "<br /><h2>各部门部长和干事优秀评定限制</h2>";
	
	for(var i = 0; i < obj_YXPDXZ.arrDepart.length; ++i)
	{//alert(obj_YXPDXZ.arrDepart[i].depart);
		strHTML += "<h3>" + obj_YXPDXZ.arrDepart[i].depart + "</h3>"
				+  "<label><input type=\"checkbox\" id=\"" + ("quanxuan_"+i) + "\" />全选</label><br />"; 
		
		for(var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j)
		{
			if(j%5 == 0)
				strHTML += "<br />";
			strHTML += "<label>"
					+  "<input type=\"checkbox\" id=\"" + ("xuanze_"+i+"_"+j) + "\" />" + obj_YXPDXZ.arrDepart[i].arrPersons[j].name
					+  "</label>"; 
			strHTML += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
		}
	}
	
	strHTML += "<br /><br /><h2>部门优秀评定限制</h2>";
	strHTML += "<label><input type=\"checkbox\" id=\"" + ("quanxuan") + "\" />全选</label><br />"; 
	for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
	{
		if(i%5 == 0)
			strHTML += "<br />";
		strHTML += "<label>"
				+  "<input type=\"checkbox\" id=\"" + ("xuanze_"+i) + "\" />" + obj_YXPDXZ.arrBMPD[i].depart;
				+  "</label>"; 
		strHTML += "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
	}
	
	strHTML += "<br /><input type=\"button\" value=\"提交\" id=\"submit\"  class=\"perf_button\" />\n"	
	
	GetObjById("show_more").innerHTML = strHTML;
	
	
	if (obj_YXPDXZ.status == 0) //可填写状态
	{
		var iChoose = new Array();//记录选中的个数
		for (var i = 0; i < obj_YXPDXZ.arrDepart.length; ++i) 
		{
			var isAllChoose = true; //标志是否全选中
			iChoose[i] = 0;//new Array();
			for (var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j) 
			{
				var xuanzeId = "xuanze_" + i + "_" + j;
				GetObjById(xuanzeId).checked = obj_YXPDXZ.arrDepart[i].arrPersons[j].check;
				if (GetObjById(xuanzeId).checked == false)
					isAllChoose = false;
				else
					iChoose[i]++;

				GetObjById(xuanzeId).onclick = function (e) 
				{
					xuanzeId = GetId(e);
					var arr = xuanzeId.split("_");
					obj_YXPDXZ.arrDepart[arr[1]].arrPersons[arr[2]].check = this.checked;
					if(this.checked == false)
					{
						GetObjById("quanxuan_"+arr[1]).checked = false;
						iChoose[arr[1]]--;
					}
					else
					{
						iChoose[arr[1]]++;
						if(iChoose[arr[1]] == obj_YXPDXZ.arrDepart[arr[1]].arrPersons.length)
							GetObjById("quanxuan_"+arr[1]).checked = true;
					}
				}
			}

			var quanxuanId = "quanxuan_" + i;
			if (isAllChoose == true)
			{
				GetObjById(quanxuanId).checked = true;
			}
			GetObjById(quanxuanId).onclick = function (e) 
			{
				quanxuanId = GetId(e);
				var arr = quanxuanId.split("_");
				for (var k = 0; k < obj_YXPDXZ.arrDepart[arr[1]].arrPersons.length; ++k) 
				{
					obj_YXPDXZ.arrDepart[arr[1]].arrPersons[k].check = this.checked;
					GetObjById(("xuanze_" + arr[1] + "_" + k)).checked = this.checked;
				}
			}
		}
		
		var iChooseDepart = 0;//记录选择的部门的个数
		for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
		{
			if(obj_YXPDXZ.arrBMPD[i].check == true)
				iChooseDepart++;
			var xuanzeId = "xuanze_"+i;
			GetObjById(xuanzeId).checked = obj_YXPDXZ.arrBMPD[i].check;
			GetObjById(xuanzeId).onclick = function(e)
			{
				xuanzeId = GetId(e);
				var arr = xuanzeId.split("_");
				if(this.checked == true)
				{
					iChooseDepart++;
					obj_YXPDXZ.arrBMPD[arr[1]].check = true;
					if(iChooseDepart == obj_YXPDXZ.arrBMPD.length)
						GetObjById("quanxuan").checked = true;
				}
				else
				{
					iChooseDepart--;
					GetObjById("quanxuan").checked = false;
					obj_YXPDXZ.arrBMPD[arr[1]].check = false;
				}
				
			}
		}
		
		if(iChooseDepart == obj_YXPDXZ.arrBMPD.length)
			GetObjById("quanxuan").checked = true;
		
		GetObjById("quanxuan").onclick = function()
		{
		
			for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
			{
				GetObjById(("xuanze_"+i)).checked = this.checked;
				obj_YXPDXZ.arrBMPD[i].check = this.checkde;
			}
		}
		
		GetObjById("submit").onclick = function () 
		{
			if (Post_YXPDXZ(obj_YXPDXZ)) 
			{
				alert("提交成功！");
				GetObjById("show_more").innerHTML = "";
			} 
			else 
			{
				alert("*提交失败，请再提交");
			}
		}
	}
	else//不可填写状态
	{
		for (var i = 0; i < obj_YXPDXZ.arrDepart.length; ++i) 
		{
			var isAllChoose = true; //标志是否全选中
			for (var j = 0; j < obj_YXPDXZ.arrDepart[i].arrPersons.length; ++j) 
			{
				var xuanzeId = "xuanze_" + i + "_" + j;
				GetObjById(xuanzeId).checked = obj_YXPDXZ.arrDepart[i].arrPersons[j].check;
				GetObjById(xuanzeId).disabled = "disabled";
				
				if (GetObjById(xuanzeId).checked == false)
					isAllChoose = false;
			}
			
			var quanxuanId = "quanxuan_" + i;
			if (isAllChoose == true)
			{
				GetObjById(quanxuanId).checked = true;
			}
			GetObjById(quanxuanId).disabled = "disabled";
		}
		
		var iChooseDepart = 0;
		for(var i = 0; i < obj_YXPDXZ.arrBMPD.length; ++i)
		{
			if(obj_YXPDXZ.arrBMPD[i].check == true)
				iChooseDepart++;
			var xuanzeId = "xuanze_"+i;
			GetObjById(xuanzeId).checked = obj_YXPDXZ.arrBMPD[i].check;
			GetObjById(xuanzeId).disabled = "disabled";
		}
		if(iChooseDepart == obj_YXPDXZ.arrBMPD.length)
		{
			GetObjById("quanxuan").checked = true;
		}
		GetObjById("quanxuan").disabled = "disabled";
		
		GetObjById("submit").value = "确定";
		GetObjById("submit").onclick = function()
		{
			GetObjById("show_more").innerHTML = "";
		}
	}
}

function Show_CKWWCQK()
{
	var obj_CKWWCQK=Get_CKWWCQK();
	var strHtml=new String();
	strHtml+="<h3>干事自评表未填写</h3>\n"
			+"<p class=\"fill_in_tips\">未填写干事自评表的名单</p>\n"
			+"<table class=\"erjibiao\" >"
			+"<tr><td>干事姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td><td>姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrGSZP.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrGSZP[i].name+"</td>"
				+"<td>"+arrDepartName[obj_CKWWCQK.arrGSZP[i].depart-1]+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrGSZP[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusGSZP==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	strHtml+="</table><h3>部长自评表未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写部长自评表的名单</p>\n"
			+"<table class=\"erjibiao\">"
			+"<tr><td>部长姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td><td>姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrBZZP.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrBZZP[i].name+"</td>"
				+"<td>"+arrDepartName[obj_CKWWCQK.arrBZZP[i].depart-1]+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrBZZP[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusBZZP==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	strHtml+="</table><h3>干事考核表未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写干事考核表的名单</p>\n"
			+"<table class=\"erjibiao\">"
			+"<tr><td>部长姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td><td>部长姓名</td><td>部门</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrGSKH.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrGSKH[i].name+"</td>"
				+"<td>"+arrDepartName[obj_CKWWCQK.arrGSKH[i].depart-1]+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrGSKH[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusGSKH==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	
	strHtml+="</table><h3>部长考核表未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写部长考核表的名单</p>"
			+"<table class=\"erjibiao\">"
			+"<tr><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrBZKH.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrBZKH[i].name+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrBZKH[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusBZKH==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}
	strHtml+="</table><h3>部门考核未填写</h3>"
			+"<p class=\"fill_in_tips\">未填写部门考核表的名单</p>"
			+"<table class=\"erjibiao\">"
			+"<tr><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td><td>主席姓名</td><td>是否有提交记录</td><td>当前是否可提交</td></tr>";
	for(var i=0;i<obj_CKWWCQK.arrBMKH.length;i++)
	{
		if(i%2==0)
		{
			strHtml+="<tr class=\"ckwwcqk\">";
		}
		strHtml+="<td>"+obj_CKWWCQK.arrBMKH[i].name+"</td>"
				+"<td>";
		if(obj_CKWWCQK.arrBMKH[i].hadSubmit==1)
		{
			strHtml+="提交过";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td><td>";
		if(obj_CKWWCQK.statusBMKH==0)
		{
			strHtml+="是";
		}
		else
		{
			strHtml+="否";
		}
		strHtml+="</td>";
		if(i%2==1)
		{
			strHtml+="</tr>";
		}
	}	
	strHtml+="</table><input type=\"button\" value=\"确定\" id=\"submit\"  class=\"perf_button\" />\n"	
	GetObjById("show_more").innerHTML =strHtml;
	GetObjById("submit").onclick=function()
	{
		GetObjById("show_more").innerHTML="";
	}
	
}





