	$(document).ready(function(){
	//var person_info=getjson;
	//alert(person_info.name);
	getjson();
function getjson()
{
	    var obj;
	    $.ajax({
		url:URL+"/message",
		data:{},
		async:false,
		dataType:"json",
		success:function(result){obj=result;alert(result.name);}
		});
		return obj;
}
	    
	});