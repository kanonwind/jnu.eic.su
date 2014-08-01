/*author:dengzuoheng form KSC 2014*/

window.onload=initLogin;

function getObjbyID(id)
{
	return document.getElementById(id);
}

function initLogin()
{
	
	document.getElementById("login_button").onclick=function()
	{
		
		var objForm = document.forms["login_info"];
		
		var strUserName = objForm.elements["user_login_name"].value;
		
		var strUserPW = objForm.elements["user_login_pw"].value;
	
		//objForm.elements["user_login_pw"].value=hex_md5(strPW);
		function IsValid( oField ) 
		{ 
			re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i; 
		
			if ( re.test(oField.toLowerCase()) ) 
			{ 
				return false;
			}
			return true;
		} 
		
		function validUsername(str)
		{
			re = /^\d{10}$/;
			if(re.test(str) && IsValid(str)&&10==str.length)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		
		function validUserPW(str)
		{
			return IsValid(str)&&(str!="");
		}
		if(!validUsername(strUserName))
		{
			
			getObjbyID("login_error").innerHTML="*非法用户名!";
			getObjbyID("user_login_name").style.borderColor="red";
			objForm.elements["user_login_name"].value="";
			return false;
		}
		else if(!validUserPW(strUserPW))
		{
			getObjbyID("login_error").innerHTML="*密码或用户名错误！";
			getObjbyID("user_login_pw").style.borderColor="red";
			objForm.elements["user_login_pw"].value="";
			return false;
		}
		else if(""==strUserName)
		{
			getObjbyID("login_error").innerHTML="*用户名不能为空！";
			getObjbyID("user_login_name").style.borderColor="red";
			return false;
		}
		else 
		{
		
			/*
			strError=postNameandPW(strUserName,strUserPW);
			if(strError=="")
			{	
				if(document.getElementById("keep_login").checked=true)
				{
					writeCookie(strUserName,strUserPW);
				}
				//返回上一页并刷新
				history.go(-1);
				location.reload();
			}
			else
			{
				document.getElementById("login_error").innerHTML=strError;
				document.getElementById("user_login_name").style.borderColor="red";
				document.getElementById("user_login_pw").style.borderColor="red";
			}
			*/
			var strPW=objForm.elements["user_login_pw"].value;
			objForm.elements["user_login_pw"].value=hex_md5(strPW);
			return true;
		}
	}
	getObjbyID("cancel_button").onclick=function()
	{
		history.go(-1);
	}
	//文本框的边框效果
	getObjbyID("user_login_name").onfocus=function()
	{
		getObjbyID("user_login_name").style.borderColor="black";
	}
	getObjbyID("user_login_name").onblur=function()
	{
		getObjbyID("user_login_name").style.borderColor="#999999";
	}
	getObjbyID("user_login_pw").onblur=function()
	{
		getObjbyID("user_login_pw").style.borderColor="#999999";
	}
	getObjbyID("user_login_pw").onfocus=function()
	{
		getObjbyID("user_login_pw").style.borderColor="black";
	}
	getObjbyID("vertication_code").onfocus=function()
	{
		getObjbyID("vertication_code").style.borderColor="black";
	}
	getObjbyID("vertication_code").onblur=function()
	{
		getObjbyID("vertication_code").style.borderColor="#999999";
	}
}

//发送用户名和密码
function postNameandPW(strUserName,strUserPW)
{
	//alert(strUserName);
	//alert(strUserPW);
	//发送密码和用户名，成功返回空字符串，失败返回失败原因
		
	var jsonPW=
	{
		"username":strUserName,
		"password":strUserPW,
	};
	
	return "";//返回失败原因
}

//写入cookie
function writeCookie(strUserName,strUserPW)
{
	return 0;
}