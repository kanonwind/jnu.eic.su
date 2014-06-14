window.onload = Init;
function Init()
{
		var id="12346";
		//发送flag和id
	    $.ajax({
		url:URL+"/getJson",
		data:{"id":id,"flag":"1"},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){alert("success")}
		});
		
		//获得page
		var obj;
	    $.ajax({
		url:URL+"/sendJson",
		data:{"id":id,},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){obj=result;}
		});
		alert("value of page is :"+obj.page);
		
}