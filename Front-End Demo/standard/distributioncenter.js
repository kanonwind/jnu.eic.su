window.onload=function()
{
	document.getElementById("articles").onclick=function()
	{
		
		document.getElementById("articles").style.backgroundColor="#242424";
		document.getElementById("announcement").style.backgroundColor="#888888";
		document.getElementById("coming_soon").style.backgroundColor="#888888";
		
	}
	document.getElementById("announcement").onclick=function()
	{
		document.getElementById("articles").style.backgroundColor="#888888";
		document.getElementById("announcement").style.backgroundColor="#242424";
		document.getElementById("coming_soon").style.backgroundColor="#888888";
	}
	document.getElementById("coming_soon").onclick=function()
	{
		document.getElementById("articles").style.backgroundColor="#888888";
		document.getElementById("announcement").style.backgroundColor="#888888";
		document.getElementById("coming_soon").style.backgroundColor="#242424";
	}
	
}
	