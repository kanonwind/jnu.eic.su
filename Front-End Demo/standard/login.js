/*author:dengzuoheng form KSC 2014*/
try{
    $(document).ready(function(){
        $("#login_button").click(function(){
            var strUserName = $("#user_login_name").val();
            var strUserPW = $("#user_login_pw").val();
            function IsValid( oField ) 
            { 
                console.log("IsValid");
                re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i; 
            
                if ( re.test(oField.toLowerCase()) ) 
                { 
                    return false;
                }
                return true;
            } 
            
            function validUserName(str)
            {
                console.log("validUserName");
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
                console.log("validUserPW");
                return IsValid(str);
            }
            //验证码事件处理
            if(""==$('#vertication_code').val())
            {
                $("#login_error").html("*验证码不能为空!");
                $("#vertication_code").css("border-color","red");
                return false;
            }
            else
            {
                try{
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
                        $("#login_error").html("*验证码错误!");
                        $("#vertication_code").css("border-color","red").val("");
                        $('#vertication_img').attr('src',URL+'/vertication');
                        return false;
                    }
                }
                catch(err){
                    $("#login_error").html("*验证码发送错误,请刷新页面重新登录");
                    return false;
                }
            }
            if(!validUserName(strUserName))
            {
                $("#login_error").html("*非法用户名!");
                $("#user_login_name").css("border-color","red").val("");
                return false;
            }
            else if(!validUserPW(strUserPW))
            {
                $("#login_error").html("*密码或用户名错误！");
                $("#user_login_pw").css("border-color","red").val("");
                return false;
            }
            else if(""==strUserName)
            {
                $("#login_error").html("*用户名不能为空！");
                $("#user_login_name").css("border-color","red");
                return false;
            }
            else 
            {
                $("form #user_login_pw").val(hex_md5($("form #user_login_pw").val()));
                return true;
            }
        });
        $("#cancel_button").click(function(){history.go(-1)});
        $("#user_login_name,#user_login_pw,#vertication_code").focus(function(){
                $(this).css("border-color","black");
            }).blur(function(){
                $(this).css("border-color","#999999");
                });
        
        //验证码切换图片
        $('#vertication_img').attr('src',URL+'/vertication').click(function(){
            $('#vertication_img').attr('src',URL+'/vertication');	
        });

    });
}catch(err){
    //出了奇怪的错误就把登录按钮无效化,并要求通知管理员
    document.getElementById("login_error").innerHTML="*"+err+"\t请联系系统管理员";
    document.getElementById("login_button").onclick=function(){return false;};
}
