var arrDepartName=new Array("秘书处","人力资源部","宣传部","信息编辑部","学术部",
"体育部","KSC联盟","组织部","文娱部","公关部","心理服务部");

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
			+"<button type=\"button\" class=\"perf_button\" id=\"adminsubmit\">确定</button>";
		
		document.getElementById("bind-depart-chairman").innerHTML=strInnerHtml;
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
			if(true==PostBindInfo(chmId, arrChecked,arrGJBM))
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
function PostBindInfo(chmId, arrChecked,arrGJBM)
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
		"account":arrChecked.account,
		"arrZGBM":arrZGBM,
		};
	}
	var arrRLGS=new Array();
	for(var i=0;i<arrGJBM.length;i++)
	{
		arrRLGS[i]={"account":arrGJBM.account,"department":arrGJBM.department};
	}
	
	var jsonPost={
		"chairman":chmid,
		"arrZXT":arrZXT,
		"arrRLGS":arrRLGS,
		};
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
		]
		"arrRLGS":
		[
			{"account":"2012052206","department":"1"}
		]
	};
	*/	
	
	return true;//发送成功返回true
}
				
		


//从服务器获取主席主管部门与人力跟进部门信息
function GetBindInfo()
{
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
	//json格式示例
	/*
	var jsonGet={
		"arrZXT"://主席团主管部门信息
		[
			{
				"account":"2012052207",
				"name":"主席111",
				"department"://因为可以主管多个部门，所以是数组
					[
						{"num":"1"},
						{"num":"2"}
					]
			},
			{
				"account":"2012052208",
				"name":"主席222",
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
		}
	};
	*/
	return jsonGet;
}

			
			