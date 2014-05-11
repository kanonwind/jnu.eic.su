function search()
{
	document.getElementById("query").onfocus = function()
	{
		document.getElementById("query").style.background="white";
		document.getElementById("search_bar").style.background="white";
		
		var obj=document.getElementById("searchsubmit");
		obj.style.background="#52a3ed";
		obj.onmouseover = function()
		{
			obj.style.background="#448aca";
		}
		obj.onmouseout = function()
		{
			obj.style.background="#52a3ed";
		}
		
	}
	document.getElementById("query").onblur = function()
	{
		var strColor="white";
		document.getElementById("query").style.background= strColor;
		document.getElementById("search_bar").style.background= strColor;
		document.getElementById("searchsubmit").style.background= strColor;
		var obj=document.getElementById("searchsubmit");
		obj.style.background= strColor;
		obj.onmouseover = function()
		{
			obj.style.background= strColor;
		}
		obj.onmouseout = function()
		{
			obj.style.background= strColor;
		}
	}
}