var arrDepartName=new Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","JDC","组织部","文娱部","公关部","心理服务部");

function debug()
{
    return false;
}

function errmsg()
{
    if(!debug())
    {
        alert("AJAX通信错误,请与管理员联系");
        throw "ajax error";
    }
}


window.onload=function()
{
	//document.getElementById("bind-depart-chairman").innerHTML="加载中...";
	var objGetInfo=GetBindInfo();
	if(typeof(objGetInfo)=="undefined")
	{
		document.getElementById("bind-depart-chairman").innerHTML="加载失败-_-|||";
	}
	else
	{
		var strInnerHtml=new String();
		strInnerHtml+=	"<h2>指定主席</h2>"
					+"<select id=\"chairman\" name=\"chairman\">";
		for(var i=0;i<objGetInfo.arrZXT.length;i++)
		{
			strInnerHtml+="<option value=\""+objGetInfo.arrZXT[i].account+"\" ";
			if(objGetInfo.arrZXT[i].account==objGetInfo.chairman.account)
			{
				strInnerHtml+="selected=\"selected\" ";
			}
			strInnerHtml+=">"+objGetInfo.arrZXT[i].name+"</option>";
		}
		strInnerHtml+="</select>";
		
		//绑定主席团主管部门
		strInnerHtml+="<hr class=\"perf_hr\" /><h2>绑定主管部门</h2>"
			+"<table class=\"erjibiao\">"
			+"	<tr>"
			+"		<td>主席团成员</td><td >主管部门</td>"
			+"	</tr>"
			+"	<tr>";
		for(var i=0;i<objGetInfo.arrZXT.length;i++)
		{
			strInnerHtml+="<td>"+objGetInfo.arrZXT[i].name+"</td>"
			+"<td class=\"normal_input\">";
			
			for(var j=0;j<arrDepartName.length;j++)
			{
				/*input的name和id是主席团id+该部门标记号，比如1是秘书，2是人力，value是部门标记号*/
				strInnerHtml+="<input type=\"checkbox\" name=\""+(objGetInfo.arrZXT[i].account+"-"+(j+1))+"\""
				+"id=\""+(objGetInfo.arrZXT[i].account+"-"+(j+1))+"\""+"value=\""+(j+1)+"\" ";
				
				for(var k=0;k<objGetInfo.arrZXT[i].department.length;k++)
				{
					if(j==objGetInfo.arrZXT[i].department[k].num-1)
					{
						strInnerHtml+="checked=\"checked\"";
					}
				}
				strInnerHtml+="/>";
				
				strInnerHtml+="<label for=\""+(objGetInfo.arrZXT[i].account+"-"+(j+1))+"\">"+arrDepartName[j]+"</label>";
			}
			strInnerHtml+="</td></tr>";
		}
		//绑定人力干事跟进部门
		strInnerHtml+="</table><hr class=\"perf_hr\" />"
		+"<h2>绑定跟进部门</h2>"
		+"	<table class=\"erjibiao\">"
		+"		<tr><td>人力干事</td><td>跟进部门</td></tr>";
		
		for(var i=0;i<objGetInfo.arrRLGS.length;i++)
		{
			strInnerHtml+="<tr>"
			+"<td>"+objGetInfo.arrRLGS[i].name+"</td>"
			+"<td class=\"normal_input\">";
			for(var j=0;j<arrDepartName.length;j++)
			{
				/*input的name是人力干事ID，value是部门标记号*/
				strInnerHtml+="<input type=\"radio\" name=\""+objGetInfo.arrRLGS[i].account+"\"  value=\" "+(j+1)+"\"";
				if(objGetInfo.arrRLGS[i].department-1==j)
				{
					strInnerHtml+="checked=\"checked\" ";
				}
				strInnerHtml+=" /><label for\""
				+objGetInfo.arrRLGS[i].account+"\">"+arrDepartName[j]+"</label>";
			}
			strInnerHtml+="</td></tr>"
		}
		strInnerHtml+="</table>"
			+"<hr class=\"perf_hr\" />"
        //指定违纪登记人
        strInnerHtml+="<h2>绑定违纪登记人</h2>"
            +"<table class=\"erjibiao\">"
            +"<tr><td>对应制度</td><td>违纪登记表填写人</td></tr>"
            +"<tr><td>秘书处制度</td><td class=\"normal_input\"><select id=\"mswjdjr\" name=\"mswjdjr\">";
        for(var i=0;i<objGetInfo.allStudentName.length;++i)
        {
            strInnerHtml+="<option value=\""+objGetInfo.allStudentName[i].account+"\">"+objGetInfo.allStudentName[i].name+"</option>";
        }
        strInnerHtml+= "<tr><td>人力资源部制度</td><td class=\"normal_input\"><select id=\"rlwjdjr\" name=\"rlwidjr\">";
        for(var i=0;i<objGetInfo.allStudentName.length;++i)
        {
            strInnerHtml+="<option value=\""+objGetInfo.allStudentName[i].account+"\">"+objGetInfo.allStudentName[i].name+"</option>";
        }
        strInnerHtml+= "<tr><td>司仪礼队仪制度</td><td class=\"normal_input\"><select id=\"sylywjdjr\" name=\"sylywjdjr\">";
        for(var i=0;i<objGetInfo.allStudentName.length;++i)
        {
            strInnerHtml+="<option value=\""+objGetInfo.allStudentName[i].account+"\">"+objGetInfo.allStudentName[i].name+"</option>";
        }
        strInnerHtml+= "<tr><td>宣传部制度</td><td class=\"normal_input\"><select id=\"xcwjdjr\" name=\"xcwidjr\">";
        for(var i=0;i<objGetInfo.allStudentName.length;++i)
        {
            strInnerHtml+="<option value=\""+objGetInfo.allStudentName[i].account+"\">"+objGetInfo.allStudentName[i].name+"</option>";
        }
        strInnerHtml+= "<tr><td>信息编辑部制度</td><td class=\"normal_input\"><select id=\"xbwjdjr\" name=\"xbwidjr\">";
        for(var i=0;i<objGetInfo.allStudentName.length;++i)
        {
            strInnerHtml+="<option value=\""+objGetInfo.allStudentName[i].account+"\">"+objGetInfo.allStudentName[i].name+"</option>";
        }
        strInnerHtml+= "<tr><td>公关部部制度</td><td class=\"normal_input\"><select id=\"ggwjdjr\" name=\"ggwidjr\">";
        for(var i=0;i<objGetInfo.allStudentName.length;++i)
        {
            strInnerHtml+="<option value=\""+objGetInfo.allStudentName[i].account+"\">"+objGetInfo.allStudentName[i].name+"</option>";
        }
        
        strInnerHtml+="</table>"
			+"<hr class=\"perf_hr\" />"
			+"<button type=\"button\" class=\"perf_button\" id=\"adminsubmit\">确定</button>";
		
		document.getElementById("bind-depart-chairman").innerHTML=strInnerHtml;
        //指定违纪登记人的默认选项
        $("#mswjdjr").val(objGetInfo.MSWJDJR);
        $("#rlwjdjr").val(objGetInfo.RLWJDJR);
        $("#xcwjdjr").val(objGetInfo.XCWJDJR);
        $("#ggwjdjr").val(objGetInfo.GGWJDJR);
        $("#sylywjdjr").val(objGetInfo.SYLYWJDJR);
		$("#xbwjdjr").val(objGetInfo.XBWJDJR);
		document.getElementById("adminsubmit").onclick=function()
		{
			var sltChm=document.getElementById("chairman");
			var chmId=sltChm.options[sltChm.selectedIndex].value;//被选中的主席的account
			var arrChecked=new Array();
			
			//获取主席团主管部门表单信息
			for(var i=0;i<objGetInfo.arrZXT.length;i++)
			{
				
				var arrDepart=new Array();
				for(var j=0;j<arrDepartName.length;j++)
				{
					
					var strid=objGetInfo.arrZXT[i].account+"-"+(j+1);
					
					var c=document.getElementById(strid);
					
					if(c.checked==true)
					{
						arrDepart.push(c.value);
					}
				}
				function classChecked()
				{
					this.account=objGetInfo.arrZXT[i].account;
					this.arrZGBM=arrDepart;
				}
				arrChecked.push(new classChecked() );
			}
            function checkArrChecked()
            {
                var arrBM=new Array(0,0,0,0,0,0,0,0,0,0,0);
                //不允许主管超过两个部门
                for(var i=0;i<arrChecked.length;++i)
                {
                    if(arrChecked[i].arrZGBM.length>3||arrChecked[i].arrZGBM.length<1)
                    {
                        alert("主席团第"+(i+1)+"个成员的主管部门数目不科学");
                        return false;
                    }
                    //检查主管部门重复
                    for(var j=0;j<arrChecked[i].arrZGBM.length;++j)
                    {
                        arrBM[arrChecked[i].arrZGBM[j]-1]++;
                    }
                }
                //每个部门应该被主管一次
                //console.log(arrBM);
                for(var i=0;i<arrBM.length;++i)
                {
                    if(arrBM[i]!=1)
                    {
                        alert("主席团主管部门那里不科学,检查一下");
                        return false;
                    }
                }
                return true;
            
            }
            if(!checkArrChecked())
            {
                return false;
            }
                
			
			//获取人力干事跟进部门表单信息
			var  arrGJBM=new Array();
			for(var i=0;i<objGetInfo.arrRLGS.length;i++)
			{
				var arrTemp=document.getElementsByName(objGetInfo.arrRLGS[i].account);
				var checkIndex=0;
				
				for(var j=0;j<arrTemp.length;j++)
				{
					
					if(true==arrTemp[j].checked)
					{
						checkIndex=arrTemp[j].value;
						break;
					}
				}
				function classGJBM()
				{
					this.account=objGetInfo.arrRLGS[i].account;
					this.department=checkIndex;
				}
				arrGJBM.push(new classGJBM);
			}
            var arrBM=new Array(0,0,0,0,0,0,0,0,0,0,0);
            function checkArrGJBM()
            {
                for(var i=0;i<arrGJBM.length;++i)
                {
                    arrBM[arrGJBM[i].department-1]++;
                }
                //console.log(arrBM);
                for(var i=0;i<arrBM.length;i++)
                {
                    if(arrBM[i]!=1)
                    {
                        alert("跟进干事那里不科学,检查一下");
                        return false;
                    }
                   
                }
               
                return true;
            }
            
            if(!checkArrGJBM())
            {
                return false;
            }
            //获取各违纪登记人信息
            var jsonWJDJ={
                "MSWJDJR":$("#mswjdjr").val(),
                "RLWJDJR":$("#rlwjdjr").val(),
                "XCWJDJR":$("#xcwjdjr").val(),
                "XBWJDJR":$("#xbwjdjr").val(),
                "GGWJDJR":$("#ggwjdjr").val(),
                "SYLYWJDJR":$("#sylywjdjr").val(),
                };
            console.log(chmId);
            console.log(arrChecked);
            console.log(arrGJBM);
            console.log(jsonWJDJ);
			if(0==PostBindInfo(chmId, arrChecked,arrGJBM,jsonWJDJ))
			{
				alert("提交成功!");
			}
			else
			{
				alert("提交失败，请重试");
			}
			
			
			
			
		}
	}
		
		
}

//发送表单数据到服务器
function PostBindInfo(chmId, arrChecked,arrGJBM,jsonWJDJ)
{
	var arrZXT=new Array();
	for(var i=0;i<arrChecked.length;i++)
	{
		var arrZGBM=new Array();
		for(var j=0;j<arrChecked[i].arrZGBM.length;j++)
		{
			arrZGBM[j]={"num":arrChecked[i].arrZGBM[j]};
		}
		arrZXT[i]={
		"account":arrChecked[i].account,
		"arrZGBM":arrZGBM,
		};
	}
	var arrRLGS=new Array();
	for(var i=0;i<arrGJBM.length;i++)
	{
		arrRLGS[i]={"account":arrGJBM[i].account,"department":arrGJBM[i].department};
	}
	console.log(arrZXT);
	var jsonPost={
		"chairman":chmId,
		"arrZXT":arrZXT,
		"arrRLGS":arrRLGS,
        "jsonWJDJ":jsonWJDJ,//***新增,违纪登记表信息
		};
			var obj;
	        $.ajax({
            url:URL+"/postJsonAdmin",
            data:jsonPost,
            type:"post",
            async:false,
            dataType:"json",
            success:function(result){obj=result;}
        });
		alert(obj.flagCrud);
	/*json示例	
	var jsonPost={
		"chairman":"2012052207",
		"arrZXT"://主席团主管部门
		[
			{
				"account":"2012052207",
				"arrZGBM":
				[
					{"num":"1"},
					{"num":"2"},
				],
			},
		],
		"arrRLGS":
		[
			{"account":"2012052206","department":"1"}
		],
        "jsonWJDJ":
        {
            "MSWJDJR":"2012052206",
            "RLWJDJR":"2013123456",
            "XCWJDJR":"2014123456",
            "XBWJDJR":"2015123456",
            "GGWJDJR":"2016123456",
            "SYLYWJDJR":"2017123456",
        },
       
	};
	*/	
	if(obj.flagCrud==1)
		return true;
	else
		return false;
	//发送成功返回true
}
				
		


//从服务器获取主席主管部门与人力跟进部门信息
function GetBindInfo()
{
	//json格式示例
    try{
        if(debug())
            throw("ajax");
        var obj;
        $.ajax({
            url:URL+"/getJsonAdmin",
            data:{},
            type:"post",
            async:false,
            dataType:"json",
            success:function(result){obj=result;}
        });
        var jsonGet=obj;
    }
    catch(err)
    {
        
        var jsonGet={
            "arrZXT"://主席团主管部门信息
            [
                {
                    "account":"2012052207",
                    "name":"主席1",
                    "department"://因为可以主管多个部门，所以是数组
                        [
                            {"num":"1"},
                            {"num":"2"}
                        ]
                },
                {
                    "account":"2012052208",
                    "name":"主席2",
                    "department":
                        [
                            {"num":"3"},
                            {"num":"4"}
                        ]
                },
            ],
            "arrRLGS"://人力干事跟进部门
            [
                {
                    "account":"2012052209",
                    "name":"人力干事1",
                    "department":"5",//因为只能跟进一个部门，所以不是数组
                },
                {
                    "account":"2012052210",
                    "name":"人力干事2",
                    "department":"6",//因为只能跟进一个部门，所以不是数组
                }
            ],
            "chairman":
            {
                "account":"2012052208",
                "name":"主席2",
            },
            "MSWJDJR":"2012123456",//秘书处违纪登记人
            "RLWJDJR":"2013123456",//人力制度违纪登记人
            "XCWJDJR":"2014123456",//宣传部违纪登记人
            "XBWJDJR":"2015123456",//信编
            "GGWJDJR":"2016123456",//公关
            "SYLYWJDJR":"2017123456",//司仪礼仪队
            "allStudentName"://把所有成员的账号和姓名给我
            [
                {"account":"2012123456","name":"赵作恒"},
                {"account":"2013123456","name":"钱作恒"},
                {"account":"2014123456","name":"孙作恒"},
                {"account":"2015123456","name":"李作恒"},
                {"account":"2016123456","name":"周作恒"},
                {"account":"2017123456","name":"吴作恒"},
                {"account":"2018123456","name":"郑作恒"},
                {"account":"2019123456","name":"王作恒"},
                {"account":"2010123456","name":"冯作恒"},
                {"account":"2011123456","name":"陈作恒"},
            ],
                
        };
        errmsg();
    }
	
	return jsonGet;
}

			
			