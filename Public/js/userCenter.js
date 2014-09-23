window.onload = UserCenterInit;

var lunarMonths = new Array("一月","二月","三月","四月","五月","六月",
								"七月","八月","九月","十月","十一月","十二月");
var lunarMonthDays = new Array( "初一","初二","初三","初四","初五","初六","初七","初八","初九","初十",
									"十一","十二","十三","十四","十五","十六","十七","十八","十九","二十",
									"廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十");
var gregorianMonths=new Array("1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月");

var gregorianDays=new Array("1日","2日","3日","4日","5日","6日","7日","8日","9日","10日","11日","12日","13日","14日","15日","16日","17日","18日","19日","20日","21日","22日","23日","24日","25日","26日","27日","28日","29日","30日","31日");

var greMonthDays = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

var arrDepartName=new Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部","主席团");

var arrUserType = new Array("干事","人力干事","部长级","主席团");
var arrGender = new Array("女","男","不确定");

var arrMajorName = new Array("包装工程","软件工程","电气工程及其自动化","自动化","电子信息科学与技术","信息安全","物联网工程");

var flagUserData=0;//用户信息，0为要从后台获取数据，1为不用
var flagKKB=0;//空课表，0为要从后台获取数据，1为不用
var flagTXL=0;//通讯录,0为要从后台获取数据,1为不用
var objPersonalData;
var arrES;
var arrObjSortPD;
function UserCenterInit()
{
	ShowPersonalData();
	function Clear()
	{
		document.getElementById("personal_data").innerHTML = "";
		document.getElementById("change_personal_data").innerHTML = "";
		document.getElementById("change_password").innerHTML = "";
		document.getElementById("empty_schedule").innerHTML = "";
		document.getElementById("change_empty_schedule").innerHTML = "";
		document.getElementById("contacts_books").innerHTML = "";
	}
	document.getElementById("main_user_info").onclick = function()
	{
		Clear();
		
		ShowPersonalData();
	}
	document.getElementById("user_kong_ke_biao").onclick = function()
	{
		Clear();

		ShowEmptySchedule();
	}
	document.getElementById("user_address_book").onclick = function()
	{
		Clear();
		
		ShowContactsBooks();
	}
}

//获取个人信息
function GetPersonalData()
{
	
	
    //ajax请求Center/message，接收当前账号的个人信息
    var obj;
    $.ajax({
    url:URL+"/message",
    data:{},
    type:"post",
    async:false,
    dataType:"json",
    success:function(result){obj=result;}
    });
    /*  
    json_Get={
        /////////////账户信息
        "account":"2012052207",//账号
        "name":"邓作恒6666",//姓名
        "type":3,//用户类型
        "apartment":7,//所属部门
        "position":"KSC联盟技术负责人",//职位
        ///////////////联系方式
        "phone":"13726247196",//长号
        "short":"617196",//短号
        "qq":"2470423627",//
        "dorm":"3313",//宿舍号
        "mail":"dengzuoheng@gmail.com",//
        
        ////////////个人信息
        "sex":"1",//性别(别想歪）
        "grade":"2012",//年级
        "major":"软件工程",//
        "birthtype":1,//生日类型，0为公历1为农历
        "birthmonth":8,//生日月，月份1-12，日子1-31
        "birthday":21,//生日日
        };
    console.log(json_Get);
    */
    console.log("接收数据:");
    console.log(obj);
    //if debug
    //return json_Get;
    //if release
    return obj;

}

//向服务器传递数据
function PostPersonalDataToServer(objPersonalData)
{
    //我应该保证了传过来的数据与json格式约定一致的，如果有问题，请找邓作恒
   
    var response;
    $.ajax({
    url:URL+"/modify",
    data:objPersonalData,
    async:false,
    type:"post",
    dataType:"json",
    success:function(result){response=result;}
    });
    //alert(response.status);

	//判断数据是否传递成功
	if(1)
		return true;
	else
		return false;
}
//向服务器传递新密码
function PostPassWordToServer(strAffirmPW)
{
	//alert(strAffirmPW);
    strAffirmPW=hex_md5(strAffirmPW);
    console.log(strAffirmPW);
	var person_info=
	{
		"password":hex_md5(strAffirmPW),
	};
		var response;
	    $.ajax({
		url:URL+"/change",
		data:person_info,
		async:false,
		dataType:"json",
		success:function(result){response=result;}
		});
		alert(response.status);
	//判断新密码是否传递成功
	if(1)
	{
		return true;
	}
	else
		return false;
}
//向服务器验证密码
function CheckPassWord(passWord)
{
	//写了才能触发
    passWord=hex_md5(passWord);
    console.log(passWord);
	var person_info=
	{
		"password":passWord,
	};
		var response;
	    $.ajax({
		url:URL+"/check",
		data:person_info,
		async:false,
		dataType:"json",
		success:function(result){response=result;}
		});
	////把密码发回服务器验证
	//alert(response.status);
	if(response.status){
		alert("正确");
		return true;}
	else{
		alert("错误");
		return false;}
}
//获取空课表
function GetEmptySchedule()
{
	//定义空课表的数组
	var arrSchedule = new Array();
		
	for(var i = 0; i < 7; ++i)
		 arrSchedule[i] = new Array();
		 
	//ajax请求Center/message，接收当前账号的个人信息
	var obj;
	$.ajax({
		url:URL+"/table",
		data:{},
		async:false,
		dataType:"json",
		success:function(result){obj=result;}
	});

	var classStatus=new Array("没课","双周有课","单周有课","有课");
	/* 
    var arr=
	{
	  "mon":
	  [
	    {"a":"有课","b":"单周有课"}
	  ],
	  "tur":
	  [
	    {"a":"有课","b":"单周有课"}
	  ],
	};
    alert(arr.mon[0].a+arr.tur[0].b);
	*/
	
	//给数组赋值
	for(var i = 0; i < 7; ++i)
	{
		for(var j = 0; j < 13; ++j)
		{
			arrSchedule[i][j] = classStatus[obj[i][j]];
		}
	}
		
    return arrSchedule;
}

//获取通信录
function GetContactsBooks()
{
	////测试数据
	function objContactsBooks(depart, post, name, QQNum, longPhoneNum, shortPhoneNum, dormNO, birType, month, day, grade, major)
	{
        this.name = name;
        this.depart = depart;
        this.post = post;

        this.longPhoneNum = longPhoneNum;
        this.shortPhoneNum = shortPhoneNum;
        this.QQNum = QQNum;
		this.dormNO = dormNO;

        this.grade = grade;
        this.major = major;       
		this.birType = birType;
		this.month = month;
		this.day = day;
		//this.birthday = this.birType + " " + this.month + this.day;
	}
	
	
	var arrObjPD = new Array();
	/*var arrDepart = new Array("主席团","秘书处","人力资源部","KSC联盟","信息编辑部",
			"组织部","宣传部","学术部","公关部","体育部","文娱部","心理服务部");
	var arrPost = new Array("干事","副部长","部长","第一副书记兼主席");*/
	//获取通讯录信息，赋值给arr
	var obj;
	$.ajax({
		url:URL+"/address",
		data:{},
		async:false,
		dataType:"json",
		type:"post",
		success:function(result){obj=result;}
	});
	//alert(obj[0].name);
	var arr={
		"num":obj.length,
		"person":obj
	};
/* 	var arr=
	{
	  "num":3,
	  "person":
	  [
	    {"depart":"秘书处","post":"部长级","name":"杨宁","QQNum":"2546606474","longPhoneNum":"13726247287","shortPhoneNum":"627287","dormNO":"3321","birType":"公历","month":"9","day":"18","grade":"12","major":"信息安全"},
		{"depart":"KSC联盟","post":"部长级","name":"renzhan","QQNum":"2546606474","longPhoneNum":"13726247287","shortPhoneNum":"627287","dormNO":"3321","birType":"公历","month":"9","day":"18","grade":"12","major":"信息安全"},
		{"depart":"公关部","post":"部长级","name":"邓大神","QQNum":"2546606474","longPhoneNum":"13726247287","shortPhoneNum":"627287","dormNO":"3321","birType":"公历","month":"9","day":"18","grade":"12","major":"信息安全"}
	  ]
	}; */
	//alert(arr.person[0].name);
	
	for(var iCount = 0; iCount < arr.num; ++iCount)
	{
		//var objPD = new objContactsBooks("主席团", "部长", "林杰", "QQ", "13631261719", "641719", "3313", "农历", "八月", "廿一", "12", "软件工程");
		var objPD = new objContactsBooks(
            arr.person[iCount].depart, 
            arr.person[iCount].post, 
            arr.person[iCount].name, 
            arr.person[iCount].QQNum, 
            arr.person[iCount].longPhoneNum, 
            arr.person[iCount].shortPhoneNum, 
            arr.person[iCount].dormNO, 
            arr.person[iCount].birType, 
            arr.person[iCount].month, 
            arr.person[iCount].day, 
            arr.person[iCount].grade, 
            arr.person[iCount].major);
		
		/*objPD.userId = 11111;
		//objPD.password = _password;
        objPD.name = "aaaa";
        objPD.userType = "部长级";
        objPD.depart = "秘书处";
        objPD.post = _post;

        objPD.longPhoneNum = _longPhoneNum;
        objPD.shortPhoneNum = _shortPhoneNum;
        objPD.QQNum = _QQNum;
        objPD.dormNO = _dormNO;
        objPD.Email = _Email;

        objPD.sex = _sex;
        objPD.grade = _grade;
        objPD.major = _major;       
		objPD.birType = _birType;
		tobjPD.month = _month;
		objPD.day = _day;
		
		
		
		var iIndex = Math.floor((Math.random()*arrDepart.length));//alert(iIndex);
		objPD.depart = arrDepart[iIndex];
		var iIndex1 = Math.floor((Math.random()*arrPost.length));
		objPD.post = arrPost[iIndex1];*/
		
		arrObjPD.push(objPD);
	}
	///
	
	//从服务器获取个人信息对象的数组
	
    console.log("通讯录接收数据:");
    console.log(arrObjPD);
	return arrObjPD;
}
//把修改后的空课表传回服务器
function PostESToServer(arrES)
{
    //需要将arrES数组转化为json格式
	var postTableData={
		'sun':arrES[0],
		'mon':arrES[1],
		'tue':arrES[2],
		'wed':arrES[3],
		'thu':arrES[4],
		'fri':arrES[5],
		'sat':arrES[6],
	};
	//alert(arrES[0][12]+arrES[1][1]);
	//ajax请求
	var obj;
	$.ajax({
		url:URL+"/gettable",
		data:postTableData,
		type:"post",
		async:false,
		dataType:"json",
		success:function(result){obj=result;}
	});
	//alert(obj.back);
	if(obj.back)
		return true;
	else
		return false;
}
//显示个人信息
function ShowPersonalData()
{
	//document.getElementById("change_personal_data").innerHTML = "";
	//document.getElementById("change_password").innerHTML = "";
	if(flagUserData==0)
    {
        objPersonalData = GetPersonalData();
        flagUserData=1;
    }
    var strPersonalDataHTML;

    strPersonalDataHTML =
        "<div class=\"sign_of_click\" id=\"user_info_sign\" >\n"
        + "</div>\n"
        + "<div class=\"work_filed\" id=\"user_info_work_filed\">\n"
            + "<div class=\"main_per_info\">\n"
                + "<div class=\"account\" id=\"account_info\">\n"
                    + "<h2>账户信息</h2>\n"
                    + "<div class=\"info_item\">\n"
                        + "<p>账号：</p>\n"
                        + "<p>姓名：</p>\n"
                        + "<p>用户类型：</p>\n"
                        + "<p>所属部门：</p>\n"
                        + "<p>职位：</p>\n"
                    + "</div>\n"
                    + "<div class=\"info_item\" id=\"account_info_detail\"><!--这是要从服务器拿数据的，这里只是例子-->\n"
                        + "<p>" + objPersonalData.account + "&nbsp;</p>\n"
                        + "<p>" + objPersonalData.name + "&nbsp;</p>\n"
                        + "<p>" + arrUserType[objPersonalData.type-1] + "&nbsp;</p>\n"
                        + "<p>" + arrDepartName[objPersonalData.apartment-1] + "&nbsp;</p>\n"
                        + "<p>" + objPersonalData.position + "&nbsp;</p>\n"
                     + "</div>\n"
                + "</div>\n"
                + "<div class=\"account\" id=\"contact_info\">\n"
                    + "<h2>联系方式</h2>\n"
                    + "<div class=\"info_item\">\n"
                        + "<p>长号：</p>\n"
                        + "<p>短号：</p>\n"
                        + "<p>QQ：</p>\n"
                        + "<p>宿舍号：</p>\n"
                        + "<p>常用邮箱：</p>\n"
                    + "</div>\n"
                    + "<div class=\"info_item\" id=\"contact_info_detail\">\n"
                        + "<p>" + objPersonalData.phone + "&nbsp;</p>\n"
                        + "<p>" + objPersonalData.short + "&nbsp;</p>\n"
                        + "<p>" + objPersonalData.qq + "&nbsp;</p>\n"
                        + "<p>" + objPersonalData.dorm + "&nbsp;</p>\n"
                        + "<p>" + objPersonalData.mail + "&nbsp;</p>\n"
                    + "</div>\n"
                + "</div>\n"
                + "<div class=\"account\" id=\"personal_info\">\n"
                    + "<h2>个人信息</h2>\n"
                    + "<div class=\"info_item\">\n"
                        + "<p>性别：</p>\n"
                        + "<p>年级：</p>\n"
                        + "<p>专业：</p>\n"
                        + "<p>生日：</p>\n"
                    + "</div>\n"
                    + "<div class=\"info_item\" id=\"personal_info_detail\">\n"
                        + "<p>" + arrGender[objPersonalData.sex] + "&nbsp;</p>\n"
                        + "<p>" + objPersonalData.grade + "&nbsp;</p>\n"
                        + "<p>" + arrMajorName[objPersonalData.major] + "&nbsp;</p>\n"
                        + "<p>" ;
            if(objPersonalData.birthmonth==""|| objPersonalData.birthday=="")
            {
                strPersonalDataHTML+="生日未填写- -";
            }
            else
            {
                if(objPersonalData.birthtype==1)
                {
                    strPersonalDataHTML+="农历 "+lunarMonths[objPersonalData.birthmonth-1]+lunarMonthDays[objPersonalData.birthday-1];
                }
                else
                {
                    strPersonalDataHTML+="公历 "+gregorianMonths[objPersonalData.birthmonth-1]+gregorianDays[objPersonalData.birthday-1];
                }
            }
            
            strPersonalDataHTML+= "&nbsp;</p>\n"
                    + "</div>\n"
                + "</div>\n"
            + "</div>\n"
            + "<div class=\"modification\" id=\"per_info_modf_button\">\n"
                + "<button type=\"button\" class=\"user_center_modf_button\" name=\"per_info_modf_apy\" id=\"per_info_modf_apy\" title=\"修改个人资料\">\n"
                    + "修改\n"
                + "</button>\n"
                + "<a href=\"#\" id=\"passworld_change\">\n"
                    + "修改密码\n"
                + "</a>\n"
            + "</div>\n"
        + "</div>\n";
    
    $("#personal_data").hide().html(strPersonalDataHTML);
	$("#per_info_modf_apy").click(function(){
        $("#personal_data").html("");
        flagUserData=0;
        ChangePersonalData(objPersonalData); 
    });
	$("#passworld_change").click(function(){
        $("#personal_data").html("");
        ChangePassWord();
    });
	$("#personal_data").slideDown();
		

}

//打印HTML代码
function PrintToHTML(objPersonalData, curYear)
{
	var strChangePersonalDataHTML;
	strChangePersonalDataHTML = 
		"<div class=\"sign_of_click\" id=\"user_info_sign\" >\n"
		+ "</div>\n"
		
			+ "<div class=\"work_filed\" id=\"user_info_work_filed\">\n"
				+ "<form method=" + "post"+ " action=\"#\" >\n"
					+ "<div class=\"main_per_info\">\n"
						+ "<div class=\"account\" id=\"account_info\">\n"
							+ "<h2>账户信息</h2>\n"
							+ "<div class=\"info_item\">\n"
								+ "<p>账号：</p>\n"
								+ "<p>姓名：</p>\n"
								+ "<p>用户类型：</p>\n"
								+ "<p>所属部门：</p>\n"
								+ "<p>职位：</p>\n"
							+ "</div>\n"
							+ "<div class=\"info_item\" id=\"account_info_detail\"><!--这是要从服务器拿数据的，这里只是例子-->\n"
								+ "<p>\n"
									+ objPersonalData.account + "\n"
									+ "<!--账号当然是不允许修改的-->\n"
								+ "</p><!--这里的默认值是修改前的用户名，从数据库中抓，假设这一部分是用javascript实现的，与服务器通行的是javascipt-->\n"
								+ "<p>\n"
									+ "<input type=\"text\" id=\"modf_user_name\" name=\"modf_user_name\" value=" + objPersonalData.name + " />\n"
								+ "</p>\n"
								+ "<p>\n"
                                + "<select id=\"modf_user_type\">\n";
                                for(var i=0;i<arrUserType.length;i++)
                                {
                                    strChangePersonalDataHTML+="<option value=\""+(i+1)+"\">"+arrUserType[i]+"</option>\n";
                                }
								
								strChangePersonalDataHTML+="</select>\n"
								+ "</p>\n"
								+ "<p>\n"
                            
                                + "<select id=\"modf_user_department\">\n";
                                for(var i=0;i<arrDepartName.length;i++)
                                {
                                    strChangePersonalDataHTML+="<option value=\""+(i+1)+"\">"+arrDepartName[i]+"</option>";
                                }
                                strChangePersonalDataHTML+="</select>\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<input type=\"text\" id=\"modf_user_position\" name=\"modf_user_position\" value=\"" + objPersonalData.position + "\" />\n"
								+ "</p>\n"
							+ "</div>\n"
						+ "</div>\n"
					
						+ "<div class=\"account\" id=\"contact_info\">\n"
							+ "<h2>联系方式</h2>\n"
							+ "<div class=\"info_item\">\n"
								+ "<p>长号：</p>\n"
								+ "<p>短号：</p>\n"
								+ "<p>QQ：</p>\n"
								+ "<p>宿舍号：</p>\n"
								+ "<p>常用邮箱：</p>\n"
							+ "</div>\n"
							+ "<div class=\"info_item\" id=\"contact_info_detail\">\n"
								+ "<p>\n"
									+ "<input type=\"text\" id=\"modf_user_lphnum\" name=\"modf_user_lphnum\" value=\"" + objPersonalData.phone + "\" />\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<input type=\"text\" id=\"modf_user_sphnum\" name=\"modf_user_sphnum\" value=\"" + objPersonalData.short + "\" />\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<input type=\"text\" id=\"modf_user_qq\" name=\"modf_user_qq\" value=\"" + objPersonalData.qq + "\" />\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<input type=\"text\" id=\"modf_user_dorm\" name=\"modf_user_dorm\" value=\"" + objPersonalData.dorm + "\" />\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<input type=\"text\" id=\"modf_user_email\" name=\"modf_user_email\" value=\"" + objPersonalData.mail + "\" />\n"
								+ "</p>\n"
							+ "</div>\n"
						+ "</div>\n"
						+ "<div class=\"account\" id=\"personal_info\">\n"
							+ "<h2>个人信息</h2>\n"
							+ "<div class=\"info_item\">\n"
								+ "<p>性别：</p>\n"
								+ "<p>年级：</p>\n"
								+ "<p>专业：</p>\n"
								+ "<p>生日：</p>\n"
							+ "</div>\n"
							+ "<div class=\"info_item\" id=\"personal_info_detail\">\n"
								+ "<p>\n"
									+ "<select id=\"modf_user_sex\">\n"
										+ "<option value=\"0\">女</option>\n"
										+ "<option value=\"1\">男</option>\n"
										+ "<option value=\"2\">不确定</option>\n"
									+ "</select>\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<select id=\"modf_user_grade\">\n"
										+ "<option value=\"" + (curYear-2) + "\">" + (curYear - 2) + "</option>\n"
										+ "<option value=\"" + (curYear-1) + "\">" + (curYear-1) + "</option>\n"
										+ "<option value=\"" + curYear + "\">" + curYear + "</option>\n"
									+ "</select>\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<select id=\"modf_user_major\">\n"
                                for(var i=0;i<arrMajorName.length;i++)
                                {
                                    strChangePersonalDataHTML+="<option value=\""+i+"\">"+arrMajorName[i]+"</option>";
                                }
								
								strChangePersonalDataHTML+="</select>\n"
								+ "</p>\n"
								
								+ "<p>\n"
									+ "<select id=\"birthday_type\">\n"
										+ "<option value=\"gregorian\">公历</option>\n"
										+ "<option value=\"lunar\">农历</option>\n"			
									+ "</select>\n"
									
									+ "<select id=\"month_type\">\n"
										+ "<option value=\"0\">Month</option>\n"
									+ "</select>\n"
									+ "<select id=\"days_type\">\n"
										+ "<option value=\"0\">Day</option>\n"
									+ "</select>\n"
									
								+ "</p>\n\n"
										
							+ "</div>\n"
						+ "</div>\n"
					+ "</div>\n"
					+ "<div id=\"modf_error\">\n"
					//+ objPersonalData.returnError + "\n"
					+ "</div>\n"
					+ "<div class=\"modification\" id=\"per_info_modf_button\">\n"
						+ "<button type=\"button\" class=\"user_center_modf_button\" name=\"per_info_modf_submit\" id=\"per_info_modf_submit\" title=\"保存修改的个人资料\">\n"
							+ "保存\n"
						+ "</button>\n"
					+ "</div>\n"
				+ "</form>\n\n"						
			+ "</div>\n";
			
	document.getElementById("change_personal_data").innerHTML = strChangePersonalDataHTML;
	
}

//修改个人信息
function ChangePersonalData(objPersonalData)
{
	//var objPersonalData = GetPersonalData();   
	flagUserData=0;
    falgTXL=0;
	////确定当前大一入学的年份
	var curYear;
	var myDate = new Date();
	var month = myDate.getMonth();
	var year = myDate.getFullYear();
	if(month < 8)
		curYear = year-1;
	else
		curYear = year;
	///////////
	
	////写入HTML文件
	PrintToHTML(objPersonalData, curYear);
   

	//////////显示修改前个人信息
	
    document.getElementById("modf_user_type").selectedIndex = objPersonalData.type-1;
	
	document.getElementById("modf_user_department").selectedIndex =objPersonalData.apartment-1;
			
	document.getElementById("modf_user_sex").selectedIndex = objPersonalData.sex;
	
	
    $("#modf_user_grade").val(objPersonalData.grade);
	$("#modf_user_major").val(objPersonalData.major);
	

	/////设置生日日期	
	var objBirType = document.getElementById("birthday_type");
	var objMonthType = document.getElementById("month_type");
	var objDaysType = document.getElementById("days_type");
	
		
	if(objPersonalData.birthtype == 0)//公历为0
	{
		GreMonths();
		GreDays();
        
		objBirType.selectedIndex = 0;
		objMonthType.selectedIndex = objPersonalData.birthmonth-1;
		objDaysType.selectedIndex = objPersonalData.birthday-1;
	}
	else
	{
        //console.log(objPersonalData.birthtype);
		LunarMonths();
		LunarDays();
		objBirType.selectedIndex=1;
		objMonthType.selectedIndex = objPersonalData.birthmonth-1;
		objDaysType.selectedIndex = objPersonalData.birthday-1;
	}
		
	objBirType.onchange = BirType;
	function BirType()
	{
		objPersonalData.birthtype = this.selectedIndex;
		
		if(objPersonalData.birthtype==1)
		{
			LunarMonths();
			LunarDays();
		}
		if(objPersonalData.birthtype==0)
		{
			GreMonths();
			GreDays();
		}	
		objPersonalData.month = objMonthType.selectedIndex+1;
		objPersonalData.day = objDaysType.selectedIndex+1;
	}

	function LunarMonths()//设置农历月份
	{
		objMonthType.options.length = 0;
		for(var i = 0; i < 12; ++i)
			objMonthType.options[i] = new Option(lunarMonths[i]);
	}
	
	function GreMonths()//设置公历月份
	{
		objMonthType.options.length = 0;
		for(var i = 0; i < 12; ++i)
		{
			var greMonth = (i+1) + "月";
			objMonthType.options[i] = new Option(greMonth);
			objMonthType.options[i].value = i;
		}
	}	
	
	function LunarDays()//设置农历日期
	{
		objDaysType.options.length = 0;
		for(var i = 0; i < 30; ++i)
			objDaysType.options[i] = new Option(lunarMonthDays[i]);
	}	

	function GreDays()//设置公历日期
	{	
		var strMonth = objMonthType.options[objMonthType.selectedIndex].value;
		var iMonth = parseInt(strMonth);
		
		objDaysType.options.length = 0;
		for(var i = 0; i < greMonthDays[iMonth]; ++i)
        {
            if(iMonth==2)
            console.log(i);
			objDaysType.options[i] = new Option(i+1);
        }
	}////生日日期设置结束
	////////////显示修改前信息结束
	
	////////修改个人信息处理
	//修改生日
	objMonthType.onchange = function()
	{
		objPersonalData.birthtype =objBirType.selectedIndex;
		objPersonalData.birthmonth = this.selectedIndex+1;
		objPersonalData.birthday = objDaysType.selectedIndex+1;
	}
	objDaysType.onchange = function()
	{
		objPersonalData.birthtype =objBirType.selectedIndex;
		objPersonalData.birthmonth = objMonthType.selectedIndex+1;
		objPersonalData.birthday =this.selectedIndex+1;
	}	
	//修改名字
	document.getElementById("modf_user_name").onchange = function() 
	{
        objPersonalData.name = this.value;
    }
	//修改用户类型
	var strUDE = "";
	document.getElementById("modf_user_type").onchange = function() 
	{
		objPersonalData.type = this.selectedIndex+1;
		CheckDepart();
	}
		
	function CheckDepart()
	{
		if(arrUserType[objPersonalData.type-1] == "主席团")
		{
			if(arrDepartName[objPersonalData.apartment-1] != "主席团")
				strUDE = "*用户类型为\"主席团\"时，所属部门必须为\"主席团\"" + "<br />";
			else
				strUDE = "";
		}		
		else if(arrUserType[objPersonalData.type-1] == "人力干事")
		{
			if(arrDepartName[objPersonalData.apartment-1] != "人力资源部")			
				strUDE = "*用户类型为\"人力干事\"时，所属部门必须为\"人力资源部\"" + "<br />";
			else
				strUDE = "";
		}
		else if(arrDepartName[objPersonalData.apartment-1] == "主席团")
			strUDE = "*用户类型为非\"主席团\"，所属部门不能为\"主席团\"" + "<br />";
		else
			strUDE = "";
	}
	//修改所属部门
	document.getElementById("modf_user_department").onchange = function() 
	{
		objPersonalData.apartment = this.selectedIndex+1;
		CheckDepart();
	}	
	CheckDepart();
	//修改职位
	document.getElementById("modf_user_position").onchange = function(){objPersonalData.position = this.value;}
	//修改电话长号
	var strULE = "";
	function CheckLphum()
	{
		var re = /^[0-9]+$/;
		var bool = re.test(objPersonalData.phone);
		if(!bool)
			strULE = "*请正确填写长号" + "<br />";
		else
			strULE = "";
	}
	CheckLphum();
	document.getElementById("modf_user_lphnum").onchange = function() 
	{ 
		objPersonalData.phone = this.value;
		CheckLphum();			
	}
	//修改电话短号
	var strUSE = "";
	function CheckSphnum()
	{
		var re = /^[0-9]{6}$/;
		var bool = re.test(objPersonalData.short);
		if(!bool)
			strUSE = "*请正确填写短号" + "<br />";
		else
			strUSE = "";
	}
	CheckSphnum();
	document.getElementById("modf_user_sphnum").onchange = function() 
	{
		objPersonalData.short = this.value;
		CheckSphnum();		
	}
	//修改QQ号
	var strUQE = "";
	function CheckQQ()
	{
		var re = /^[0-9]+$/;
		var bool = re.test(objPersonalData.qq);
		if(!bool)
			strUQE = "*请正确填写QQ号" + "<br />";
		else
			strUQE = "";
	}
	CheckQQ();
	document.getElementById("modf_user_qq").onchange = function() 
	{
		objPersonalData.qq = this.value;
		CheckQQ();
	}
	//修改宿舍号
	var strMUDE = "";
	function CheckDorm()
	{
		var re = /^[0-9]{4}$/;
		var bool = re.test(objPersonalData.dorm);
		if(!bool)
			strMUDE = "*请正确填写宿舍号" + "<br />";
		else
			strMUDE = "";
	}
	CheckDorm();
    $("#modf_user_dorm").change(function(){CheckDorm();objPersonalData.dorm=$(this).val();});
	
	//修改常用邮箱
	var strUEE = "";
	function CheckEmail()
	{
		//用正则表达式验证邮箱
		var re = /^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/;//(com|cn|net|org)+$/;
		var bool = re.test(objPersonalData.mail);
		if(!bool)
			strUEE = "*请正确填写邮箱" + "<br />";
		else
			strUEE = "";
	}
	CheckEmail();
    $("#modf_user_email").change(function(){objPersonalData.mail=$(this).val();CheckEmail();});
	//修改性别
    $("#modf_user_sex").change(function(){objPersonalData.sex=$(this).val();});
	//修改年级
    $("#modf_user_grade").change(function(){objPersonalData.grade=$(this).val();});
	//修改专业
    $("#modf_user_major").change(function(){objPersonalData.major=$(this).val();});
	
	//保存
    $("#per_info_modf_submit").click(function(){
        strError= strUDE + strULE + strUSE + strUQE + strMUDE + strUEE;
		if("" == strError)
		{	
			console.log("发送数据:");
            console.log(objPersonalData);
            $("#modf_error").html("");
			if(PostPersonalDataToServer(objPersonalData))
			{
				ShowPersonalData();
				$("#change_personal_data").html("");
				return true;
			}
			else
			{
				$("#modf_error").html("*保存失败，请再次保存");
			}
		}
		else
		{
			$("#modf_error").html(strError);
		}
    });
	
}


//修改密码
function ChangePassWord()
{
	var strHTML;
	strHTML = "<div class=\"sign_of_click\" id=\"user_info_sign\" >\n"
			+ "</div>\n"
			+ "<div class=\"work_filed\" id=\"user_info_work_filed\">\n"
				+ "<form method=\"post\" action=\"#\" >\n"
					+ "<div class=\"main_per_info\">\n"
						+ "<div class=\"account\" id=\"changepw\">\n"
							+ "<div class=\"pwtitleimg\">\n"
								+ "<img src=\"http://jnueicsu-upload.stor.sinaapp.com/image/warnningpw.png\" width=\"32px\" height=\"32px\" alt=\"警告\" />\n"
							+ "</div>\n"
							+ "<div class=\"pwtitleh2\">\n"
								+ "<h2>修改密码</h2>\n"
							+ "</div>\n"
							+ "<div class=\"clearboth\">\n"
							+ "</div>\n"
							+ "<div class=\"info_item\">\n"
								+ "<p>当前密码：</p>\n"
								+ "<p>新密码：</p>\n"
								+ "<p>确认密码：</p>\n"
							+ "</div>\n"
							+ "<div class=\"info_item\" id=\"changepw\">\n"
								+ "<p>\n"
									+ "<input type=\"password\" id=\"currentpw\" name=\"currentpw\" />\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<input type=\"password\" id=\"newpw\" name=\"newpw\" />\n"
								+ "</p>\n"
								+ "<p>\n"
									+ "<input type=\"password\" id=\"affirmpw\" name=\"affirmpw\" />\n"
								+ "</p>\n"
							+ "</div>\n"
						+ "</div>\n"
						+ "<div id=\"modf_error\">\n"
						+ "</div>\n"
						+ "<div class=\"modification\" id=\"pw_modf_button\">\n"
							+ "<button type=\"button\" class=\"user_center_modf_button\" name=\"pw_modf_submit\" id=\"pw_modf_submit\" title=\"保存新密码\">\n"
								+ "保存\n"
							+ "</button>\n"
						+ "</div>\n"
					+ "</div>\n"
				+ "</form>\n"
			+ "</div>\n";
			
	document.getElementById("change_password").innerHTML = strHTML;
	
	var objCurPW = document.getElementById("currentpw");
	var objNewPW = document.getElementById("newpw");
	var objAffirmPW = document.getElementById("affirmpw");
	var strCurPW = "";
	var strNewPW = "";
	var strAffirmPW = "";
	var error1 = "*密码不能为空<br />";
	var error2 = "*密码不能为空<br />";
	var error;
	
	objCurPW.onchange = function()
	{
		strCurPW = objCurPW.value;
		if(!CheckPassWord(strCurPW))
			error1 = "*密码错误，请重新输入";
		else
			error1 = "";
	}
	
	objNewPW.onchange = function()
	{
		strNewPW = objNewPW.value;
		if(strAffirmPW != "")
		{
			if(strNewPW != strAffirmPW)
				error2 = "*两次密码输入不一致,请重新输入<br />";
			else
				error2 = "";
		}
		else
			error2 = "*密码不能为空<br />";
	}
	
	objAffirmPW.onchange = function()
	{
		strAffirmPW = objAffirmPW.value;
		if(strAffirmPW != "")
		{
			if(strNewPW != strAffirmPW)
				error2 = "*两次密码输入不一致,请重新输入<br />";
			else
				error2 = "";
		}
		else
			error2 = "*密码不能为空<br />";
	}
	
	document.getElementById("pw_modf_submit").onclick = function()
	{
		error = error1 + error2;
		if("" == error)
		{	
			
			if(PostPassWordToServer(strAffirmPW))
			{	
				alert("密码修改成功！");
				document.getElementById("change_password").innerHTML = "";				
				ShowPersonalData();				
				return true;
			}
			else
			{
				document.getElementById("modf_error").innerHTML = "*密码保存失败，请再次保存";
				error = "";
			}
		}
		else
		{
			document.getElementById("modf_error").innerHTML = error;
			error = "";
		}
	}	
		
}


//显示空课表
function  ShowEmptySchedule()
{
	//var arrES = GetEmptySchedule();
    if(flagKKB==0)
    {
        arrES= GetEmptySchedule();
        flagKKB=1;
    }
	var strESHTML = "<div class=\"sign_of_click\" id=\"kkb_sign\" >\n"
			+ "</div>\n"
			+ "<div class=\"work_filed\" id=\"kkb_work_filed\">\n"
				+ "<table class=\"kkb\">\n"
					+ "<thead>\n"
						+ "<tr>\n"
							+ "<th>空课表</th>\n"
							+ "<th>周日</th>\n"
							+ "<th>周一</th>\n"
							+ "<th>周二</th>\n"
							+ "<th>周三</th>\n"
							+ "<th>周四</th>\n"
							+ "<th>周五</th>\n"
							+ "<th>周六</th>\n"
						+ "</tr>\n"
					+ "</thead>\n"
					+ "<tbody>\n";						

	//一天每节课对应的时间
	var arrTime = new Array("08:00-08:45","08:55-09:40","10:00-10:45","10:55-11:40",
							"12:40-13:25","13:35-14:20","14:30-15:15","15:25-16:10",
							"16:20-17:05","17:15-18:00","19:00-19:45","19:55-20:40","20:50-21:35");						
	
	for(var j = 0; j < 13; ++j)
	{
		var strWeek = "<tr>\n" + "<th>节" + (j+1) + " " + arrTime[j] + "</th>\n";
		for(var i = 0; i < 7; ++i)
		{
			var strClass = "";
			if(arrES[i][j] == "有课")
				strClass = "youke";
			else if(arrES[i][j] == "没课")
				strClass = "meike";
			else if(arrES[i][j] == "单周有课")
				strClass = "danyou";
			else
				strClass = "suanyou";
			
			//var strId = i + "-" + j;
			
			strWeek += "<td class="+strClass + ">" + arrES[i][j] + "</td>\n";
		}
		
		strESHTML += strWeek + "</tr>\n";
	}
	
	strESHTML +="</tbody>\n"
				+ "</table>\n"
				+ "<div class=\"modification\" id=\"kkb_modf_buttom\">\n"
					+ "<button type=\"button\" class=\"user_center_modf_button\" name=\"kkb_modf_apy\" id=\"kkb_modf_apy\" title=\"修改空课表\">\n"
						+ "修改\n"
					+ "</button>\n"
				+ "</div>\n"
			+ "</div>\n";
	document.getElementById("empty_schedule").innerHTML = strESHTML;
	
	document.getElementById("kkb_modf_apy").onclick = function()
	{
        document.getElementById("empty_schedule").innerHTML="";
        flagKKB=0;
        ChangeEmptySchedule(arrES); 
    }
}
//修改空课表
function ChangeEmptySchedule(arrES)
{
    flagKKB=0;
	var strESHTML = "<div class=\"sign_of_click\" id=\"kkb_sign\" >\n"
			+ "</div>\n"
			+ "<div class=\"work_filed\" id=\"kkb_work_filed\">\n"
			+ "<form method=\"post\" action=\"#\">\n"
				+ "<table class=\"kkb\">\n"
					+ "<thead>\n"
						+ "<tr>\n"
							+ "<th>空课表</th>\n"
							+ "<th>周日</th>\n"
							+ "<th>周一</th>\n"
							+ "<th>周二</th>\n"
							+ "<th>周三</th>\n"
							+ "<th>周四</th>\n"
							+ "<th>周五</th>\n"
							+ "<th>周六</th>\n"
						+ "</tr>\n"
					+ "</thead>\n"
					+ "<tbody>\n";						

				
	
	//一天每节课对应的时间
	var arrTime = new Array("08:00-08:50","09:00-09:50","10:10-11:00","11:10-12:00",
							"12:30-13:20","13:30-14:20","14:30-15:20","15:30-16:20",
							"16:30-17:20","17:30-18:20","19:00-19:50","20:00-20:50","21:00-21:50");						
	
	for(var jCount1 = 0; jCount1 < 13; ++jCount1)
	{
		var strWeek = "<tr>\n" + "<th>节" + (jCount1+1) + " " + arrTime[jCount1] + "</th>\n";
		for(var iCount1 = 0; iCount1 < 7; ++iCount1)
		{
			var strId1 = "";
			strId1 = iCount1 + "-" + jCount1;		
			var strOption = "<td>\n"
					+ "<select name=\"kkb_1-1\" id=" + strId1 + ">\n"
						+ "<option value=\"3\">有课</option>\n"
						+ "<option value=\"2\">单周有课</option>\n"
						+ "<option value=\"1\">双周有课</option>\n"
						+ "<option value=\"0\">没课</option>\n"
					+ "</select>\n"
				+ "</td>\n";
			strWeek += strOption;
		}			
		strESHTML += strWeek + "</tr>\n";
	}
	
	strESHTML +="</tbody>\n"
				+ "</table>\n"
				+ "<div id=\"modf_error\">\n"
				+ "</div>\n"
				+ "<div class=\"modification\" id=\"kkb_modf_buttom\">\n"
					+ "<button type=\"button\" class=\"user_center_modf_button\" name=\"kkb_modf_submit\" id=\"kkb_modf_submit\" title=\"保存空课表\">\n"
						+ "保存\n"
					+ "</button>\n"
				+ "</div>\n"
				+ "</form>\n"
			+ "</div>\n";
	document.getElementById("change_empty_schedule").innerHTML = strESHTML;
	
	for(var jCount2 = 0; jCount2 < 13;  ++jCount2)
	{
		for(var iCount2 = 0; iCount2 < 7; ++iCount2)
		{
			var strId2 = iCount2 + "-" + jCount2;
			obj = document.getElementById(strId2);
			if(arrES[iCount2][jCount2] == "有课")
				obj.selectedIndex = 0;
			else if(arrES[iCount2][jCount2] == "单周有课")
				obj.selectedIndex = 1;
			else if(arrES[iCount2][jCount2] == "双周有课")
				obj.selectedIndex = 2;
			else
				obj.selectedIndex = 3;
		}
	}
	for(var jCount3 = 0; jCount3 < 13;  ++jCount3)
	{
		for(var iCount3 = 0; iCount3 < 7; ++iCount3)
		{
			var strId = iCount3 + "-" + jCount3;
			document.getElementById(strId).onchange = function(e)
			{
				e=e||event;
				var tag=e.srcElement||e.target;
				/*if(tag.id)	
					alert(tag.id);*/
				strId = tag.id;
											
				var obj = document.getElementById(strId);
				var strIndex = strId.split("-");
				var iIndex = parseInt(strIndex[0]);
				var jIndex = parseInt(strIndex[1]);
				arrES[iIndex][jIndex] = obj.options[obj.selectedIndex].text;
			}
		}
	}
	
	document.getElementById("kkb_modf_submit").onclick = function()
	{
		if(PostESToServer(arrES))//判断数据传回服务器是否成功
		{
			document.getElementById("change_empty_schedule").innerHTML = "";
			ShowEmptySchedule();
		}
		else
		{
			document.getElementById("modf_error").innerHTML = "*保存失败，请再次保存";
		}
	}
	
}


//按部门进行分类
function SortPersonalDataObj()
{
	var arrObjPersonalData = GetContactsBooks();
	
	var arrObjPR = new Array();//主席团
	var arrObjSE = new Array();//秘书处	
	var arrObjHR = new Array();//人力资源部	
	var arrObjKSC = new Array();//KSC联盟	
	var arrObjEO = new Array();//信息编辑部	
	var arrObjOD = new Array();//组织部	
	var arrObjPD = new Array();//宣传部	
	var arrObjAD = new Array();//学术部	
	var arrObjPRD = new Array();//公关部	
	var arrObjSD = new Array();//体育部	
	var arrObjED = new Array();//文娱部	
	var arrObjPSD = new Array();//心理服务部
	var arrObjST = new Array();//指导老师
		
	for(var iCount = 0; iCount < arrObjPersonalData.length; ++iCount)
	{
		var objTemp = arrObjPersonalData[iCount];
		switch(objTemp.depart)
		{
			case "主席团":
				arrObjPR.push(objTemp);
				break;
			case "秘书处":
				arrObjSE.push(objTemp);
				break;
			case "人力资源部":
				arrObjHR.push(objTemp);
				break;
			case "KSC联盟":
				arrObjKSC.push(objTemp);
				break;
			case "信息编辑部":
				arrObjEO.push(objTemp);
				break;
			case "组织部":
				arrObjOD.push(objTemp);
				break;
			case "宣传部":
				arrObjPD.push(objTemp);
				break;
			case "学术部":
				arrObjAD.push(objTemp);
				break;
			case "公关部":
				arrObjPRD.push(objTemp);
				break;
			case "体育部":
				arrObjSD.push(objTemp);
				break;
			case "文娱部":
				arrObjED.push(objTemp);
				break;
			case "心理服务部":
				arrObjPSD.push(objTemp);
				break;
			case "指导老师":
				arrObjST.push(objTemp);
				break;
		}
	}
	
	var arrObjSortPD = new Array();
	arrObjSortPD[0] = arrObjPR;
	arrObjSortPD[1] = arrObjSE;
	arrObjSortPD[2] = arrObjHR;
	arrObjSortPD[3] = arrObjKSC;
	arrObjSortPD[4] = arrObjEO;
	arrObjSortPD[5] = arrObjOD;
	arrObjSortPD[6] = arrObjPD;
	arrObjSortPD[7] = arrObjAD;
	arrObjSortPD[8] = arrObjPRD;
	arrObjSortPD[9] = arrObjSD;
	arrObjSortPD[10] = arrObjED;
	arrObjSortPD[11] = arrObjPSD;
	arrObjSortPD[12] = arrObjST;
			
	for(i = 0; i < arrObjPR.length; ++i)
	{
		var objTemp;
		if(arrObjPR[i].post == "第一副书记兼主席")
		{
			objTemp = arrObjPR[i];
			arrObjPR[i] = arrObjPR[0];
			arrObjPR[0] = objTemp;
			break;
		}
	}

	for(var i = 1; i <= 11; ++i )
	{
		var buzhang = new Array();
		var fubuzhang = new Array();
		var ganshi = new Array();
		var qita = new Array();				
		
		for(var j = 0; j < arrObjSortPD[i].length; ++j)
		{
			switch(arrObjSortPD[i][j].post)
			{
				case "部长":
					buzhang.push(arrObjSortPD[i][j]);
					break;
				case "副部长":
					fubuzhang.push(arrObjSortPD[i][j]);
					break;
				case "干事":
                case "人力干事":
					ganshi.push(arrObjSortPD[i][j]);
					break;
				default:
					qita.push(arrObjSortPD[i][j]);
			}
		}
		
		var k = 0;		
		for(l1 = 0; l1 < buzhang.length; ++l1)
		{
			arrObjSortPD[i][k++] = buzhang[l1];
		}
		for(l2 = 0; l2 < fubuzhang.length; ++l2)
		{
			arrObjSortPD[i][k++] = fubuzhang[l2];
		}
		for(l4 = 0; l4 < qita.length; ++l4)
		{
			arrObjSortPD[i][k++] = qita[l4];
		}	
		for(l3 = 0; l3 < ganshi.length; ++l3)
		{
			arrObjSortPD[i][k++] = ganshi[l3];
		}
				
	}
	
	return arrObjSortPD;
}
 //显示通信录
function ShowContactsBooks()
{
    if(flagTXL==0)
    {
        arrObjSortPD = SortPersonalDataObj();
        flagTXL=1;
    }
	var strHTML = "<div class=\"sign_of_click\" id=\"txl_sign\">\n"
			+ "</div>\n"
			+ "<div class=\"work_filed\" id=\"txl_work_filed\">\n"
				+ "<table id=\"whole_add\">\n"
					+ "<caption>\n"
						+ "电气信息学院团委学生会通讯录\n"
					+ "</caption>\n"
					+ "<thead>\n"
						+ "<tr>\n"
							+ "<th>部门</th><th>职位</th><th>姓名</th><th>QQ</th><th>长号</th><th>短号</th><th>宿舍号</th><th>生日</th><th>年级专业</th>\n"
						+ "</tr>\n"
					+ "</thead>\n";
					
	var iPRSum = arrObjSortPD[0].length;//主席团人数
	var iSTSum = arrObjSortPD[12].length;//指导老师的人数
	var iAllSum = 0;//总的人数
	var iRestSum = 0;//余下的人数
	for(iCount = 0; iCount < arrObjSortPD.length; ++iCount)
		iAllSum += arrObjSortPD[iCount].length;
	iRestSum = iAllSum - iPRSum - iSTSum;
	
	var strST = "";//指导老师
	for(var iCount = 0; iCount < iSTSum; ++ iCount)
	{
		str += arrObjSortPD[12][iCount].name + " " + arrObjSortPD[12][iCount].longPhoneNum + "  ";alert("KKK");
	}
	
	strHTML += "<tfoot>\n"
				+ "<tr>\n"
					+ "<td colspan=\"9\" scope=\"col\">指导老师：" + strST + "</td>\n"						
				+ "</tr>\n"
				+ "<tr>\n"
					+ "<td colspan=\"9\" scope=\"col\">主席团共" + iPRSum + "人，部长级+干事共" + iRestSum + "人</td>\n"
				+ "</tr>\n"
			+ "</tfoot>\n";
	
	var strTBody = "";
	var arrDepart = new Array("主席团","秘书处","人力资源部","KSC联盟","信息编辑部",
			"组织部","宣传部","学术部","公关部","体育部","文娱部","心理服务部");
            
    function getBirthStr(pObj)
    {
        try{
            if(pObj.birType=="")
            {
                return "";
            }
            else if(pObj.birType==1)
            {
                return "农历 "+lunarMonths[pObj.month-1]+lunarMonthDays[pObj.day-1];
            }
            else
            {
                return "公历 "+gregorianMonths[pObj.month-1]+gregorianDays[pObj.day-1];
            }
        }catch(err){return "";}
    }
	for(var iCount = 0; iCount < arrObjSortPD.length -1; ++iCount)
	{		
		var iLength = arrObjSortPD[iCount].length;
		if(arrObjSortPD[iCount].length > 0)
		{
            var strDepart = "<tr class=\"first_line\">\n"
						+ "<th rowspan=" + iLength + " scope=\"row\">" + arrObjSortPD[iCount][0].depart + "</th>\n"
						+ "<td>" + arrObjSortPD[iCount][0].post + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][0].name + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][0].QQNum + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][0].longPhoneNum + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][0].shortPhoneNum + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][0].dormNO + "</td>\n"
							+ "<td>" + getBirthStr(arrObjSortPD[iCount][0]) + "</td>\n"
							+ "<td>" + arrMajorName[arrObjSortPD[iCount][0].major] + "</td>\n"
						+ "</tr>\n";
		var strPersons = "";
		for(var jCount = 1; jCount < iLength; ++jCount)
		{
			strPersons += "<tr>\n"
							+ "<td>" + arrObjSortPD[iCount][jCount].post + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][jCount].name + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][jCount].QQNum + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][jCount].longPhoneNum + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][jCount].shortPhoneNum + "</td>\n"
							+ "<td>" + arrObjSortPD[iCount][jCount].dormNO + "</td>\n"
							+ "<td>" + getBirthStr(arrObjSortPD[iCount][jCount])+ "</td>\n"
							+ "<td>" + arrMajorName[arrObjSortPD[iCount][jCount].major] + "</td>\n"
						+ "</tr>\n";
		}
		strDepart += strPersons;
		strTBody += strDepart;}
	}
	strHTML +=strTBody;
	strHTML += "</tbody>\n"
			+"</table>\n"								
		+"</div>\n";
    $("#contacts_books").hide().html(strHTML);
	
	
	//合并列相同的行
	function UnitTable(tableId)
	{
		var objTable = document.getElementById(tableId);
		var rowsCount = objTable.rows.length;

		var startRow = 0;
		for(var i=0; i<rowsCount-2; i++)
		{
			if( (objTable.rows[startRow].cells[0].innerHTML == "干事"||objTable.rows[startRow].cells[0].innerHTML == "人力干事") 
            &&objTable.rows[startRow].cells[0].innerHTML == objTable.rows[i+1].cells[0].innerHTML)
			{
				objTable.rows[i+1].removeChild(objTable.rows[i+1].cells[0]);
				objTable.rows[startRow].cells[0].rowSpan=(objTable.rows[startRow].cells[0].rowSpan|0)+1;
			}
			else
			{
				startRow=i+1;
			}
		}
	}
	UnitTable("whole_add");
    $("#contacts_books").slideDown();
}
