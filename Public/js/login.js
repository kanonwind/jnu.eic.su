/*author:dengzuoheng form KSC 2014*/

window.onload=initLogin;

function initLogin()
{
	
	document.getElementById("login_button").onclick=function()
	{

		var objForm = document.forms["login_info"];
		var strUserName = objForm.elements["user_login_name"].value;
		var strUserPW = objForm.elements["user_login_pw"].value;
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
			if(re.test(str) && IsValid(str) &&str.length==10)
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
			return IsValid(str);
		}
		//验证码事件处理
		if(""==$('#vertication_code').val())
		{
			document.getElementById("login_error").innerHTML="*验证码不能为空!";
			document.getElementById("vertication_code").style.borderColor="red";
			return false;
		}
		else
		{
			checknumber=$('#vertication_code').val();
			var obj;
			$.ajax({
				type:"POST",
				url:URL+"/vertication",
				data:{'checknumber':checknumber},
				dataType:"json",
				async:false,
				success:function(result){
					obj=result;			
				},
			});
			if(obj.checked==0)
			{
				document.getElementById("login_error").innerHTML="*验证码错误!";
				document.getElementById("vertication_code").style.borderColor="red";
				objForm.elements["vertication_code"].value="";
				//alert("验证码错误");
				$('#vertication_code').val("")
				$('#vertication_img').attr('src',URL+'/vertication');
				return false;
			}
		}
		if(!validUsername(strUserName))
		{
			document.getElementById("login_error").innerHTML="*非法用户名!";
			document.getElementById("user_login_name").style.borderColor="red";
			objForm.elements["user_login_name"].value="";
			return false;
		}
		else if(!validUserPW(strUserPW))
		{
			document.getElementById("login_error").innerHTML="*密码或用户名错误！";
			document.getElementById("user_login_pw").style.borderColor="red";
			objForm.elements["user_login_pw"].value="";
			return false;
		}
		else if(""==strUserName)
		{
			document.getElementById("login_error").innerHTML="*用户名不能为空！";
			document.getElementById("user_login_name").style.borderColor="red";
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
	document.getElementById("cancel_button").onclick=function()
	{
		history.go(-1);
	}
	document.getElementById("user_login_name").onfocus=function()
	{
		document.getElementById("user_login_name").style.borderColor="black";
	}
	document.getElementById("user_login_name").onblur=function()
	{
		document.getElementById("user_login_name").style.borderColor="#999999";
	}
	document.getElementById("user_login_pw").onblur=function()
	{
		document.getElementById("user_login_pw").style.borderColor="#999999";
	}
	document.getElementById("user_login_pw").onfocus=function()
	{
		document.getElementById("user_login_pw").style.borderColor="black";
	}
	document.getElementById("user_login_pw").onfocus=function()
	{
		document.getElementById("user_login_pw").style.borderColor="black";
	}
	document.getElementById("vertication_code").onfocus=function()
	{
		document.getElementById("vertication_code").style.borderColor="black";
	}
	document.getElementById("vertication_code").onblur=function()
	{
		document.getElementById("vertication_code").style.borderColor="#999999";
	}
	//验证码切换图片
	$('#vertication_img').attr('src',URL+'/vertication');
	$('#vertication_img').click(function(){
		$('#vertication_img').attr('src',URL+'/vertication');
		
	});

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