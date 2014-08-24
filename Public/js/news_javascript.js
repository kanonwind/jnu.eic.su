window.onload = NewsInit;

//新闻图片的访问路径
var newsPicName = "news_picture" ;
var newsPicType = ".jpg";

//新闻文章存放在数组
var news_texts = new Array(8);

var iPicSum = 8; //新闻图片的总数
var iIndexPic = 0; //当前显示新闻图片的编号
var iPrePic = 0;//上一张显示新闻的图片的编号

var boolIsFocus = true;//标志是否在当前页面
var boolIsOnNewPic = false;//标志鼠标是否在新闻图片块上

var objPic1;//左边的隐藏图片
var objPic2;//中间的显示的图片
var objPic3;//右边隐藏的图片

var objSlideNewsDiv;//新闻文章块div对象
var objs_schedule_news;  //定义对象的数组来存放活动的圆圈的对象

//图片滑动时的偏移量
var iPicOffSetRight1 = 0; 
var iPicOffSetRight2 = 550;
var iPicOffSetLeft1 = 0; 
var iPicOffSetLeft2 = 550;

//新闻文章块移动偏移量
var iNewsOffSetRight = -350;
var iNewsOffSetLfet = 750;

var Time;//setTimeout函数的返回值

//新闻内容对象
function news_info(title,author,abst,newslink,newsPic)
{
	this.title=title;
	this.author=author;
	this.abst=abst;
	this.newslink=newslink;
    this.newsPic=newsPic;
	this.printNews=function printNews()    //输出成员
	{
		var line1="<h2>"+this.title+"</h2>\n";
		var line2="<p>"+"by "+this.author+"</p>\n";
		var line3="<p>"+this.abst+"...";
		var line4="<a href=\""+this.newslink+"\" class=\"news_detail_link\" >详细</a>\n";
		return line1+line2+line3+line4;
	}
}

//获取新闻内容，news_texts数组的初始化
function get_news()
{
	//请求数据
		var newsData;
	    $.ajax({
		url:APP+"/Home/newsData",//请求用户类型
		data:{},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){newsData=result;}
		});			
		//alert(newsImgURL+newsData[0]['picpath']);
    for(var i=0;i<8;i++)
    {
/*         var title="新闻标题aaaaa"+i;
        var author="文章作者"+i;
        var abst="文章内容"+i+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容";
        abst+=  "文章内容"+i+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容";
        var picpath=imgURL+"news_picture"+i+".jpg"; */
		var title=newsData[i]['title'];
		var author=newsData[i]['author'];
		var abst=newsData[i]['abst'];
		var picpath=newsData[i]['picpath'];
        var obj=new news_info(title,author,abst,"#",picpath);
        news_texts[i]=obj;
    }
	
	alert(news_texts[0].newsPic);
}


function NewsInit()
{
	newsPicName ="news_picture";
	search();
	window.onfocus = function(){boolIsFocus=true; clearTimeout(Time); RotateNews();}
	window.onblur= function(){boolIsFocus=false;}
	IsOnNewPic();
    get_news();
    obj_pre_news = document.getElementById("pre_news");
    obj_next_news = document.getElementById("next_news");
    objs_schedule_news = document.getElementById("news_active"); //获得数组

    objPic1 = document.getElementById("pic1");
    objPic2 = document.getElementById("pic2");
    objPic3 = document.getElementById("pic3");
	objPic1.style.left = "-550px";
	objPic3.style.left = "550px";
	
	objSlideNewsDiv = document.getElementById("news");
    //objSlideNewsDiv.style.left = "200px";

    for(i = 0; i < (objs_schedule_news.childNodes.length-1)/2; ++i)
    {
       MouseOverActive(i, imgURL+"news_mouseover.png", imgURL+"news_mouseout.png"); //处理鼠标放在圆圈上时的事件
    }

    ActiveNews(iIndexPic);//定位当前新闻对应的圆圈

    obj_pre_news.onclick = PreNewsPicture;//处理鼠标按下“上一张”的按钮事件
    obj_next_news.onclick = NextNewsPicture;//处理鼠标按下“下一张”的按钮事件

    MouseOverSlide(obj_pre_news, "pre_mouseover.png", "pre_mouseout.png"); //处理单鼠标放在“上一张”按钮上时的样式
    MouseOverSlide(obj_next_news, "next_mouseover.png", "next_mouseout.png");//处理单鼠标放在“下一张”按钮上时的样式

    RotateNews(); //自动变换新闻
	
	
}

//下面的点的mouseover函数绑定
function MouseOverActive(iActivePic, path_over, path_out)
{

    objs_schedule_news.childNodes[iActivePic*2+1].onclick = function()
	{		
		ActiveNews(iActivePic);
		this.src = path_over;
		CurrentNewsPicture(iPrePic, iActivePic);
		
		if(iPrePic < iActivePic)
		{
			//var strPicPath = newsImgURL+newsPicName + iActivePic + newsPicType;
			var strPicPath=newsImgURL+news_texts[iActivePic].newsPic;
			objPic1.src = strPicPath; 
			
			SlidesToRight();
		}
		
		if(iPrePic > iActivePic)
		{
			//var strPicPath = newsImgURL+newsPicName + iActivePic + newsPicType;
			var strPicPath=newsImgURL+news_texts[iActivePic].newsPic;
			objPic3.src = strPicPath;
			SlidesToLeft();
		}
	}
	objs_schedule_news.childNodes[iActivePic*2+1].src = path_out;
    //objs_schedule_news.childNodes[iActivePic*2+1].onmouseout = function(){this.src = path_out; }//ActiveNews(iActivePic); return false;}

    ActiveNews(iActivePic);
}


function MouseOverSlide(object, path_over, path_out)
{
    object.onmouseover = function(){this.src = imgURL+path_over; return false;}
    object.onmouseout = function(){this.src = imgURL+path_out; return false;}


}

//显示当前那个点
function ActiveNews(iActivePic)
{
    objs_schedule_news.childNodes[iActivePic*2+1].src  = imgURL+"news_mouseover.png";
    objs_schedule_news.childNodes[iActivePic*2+1].id = "Active";
	
	iIndexPic = iActivePic;

    for(var i = iActivePic + 1; i != iActivePic; ++i)
    {
        if(i == 8)
        {
            i = -1;
        }

        if(i != -1 && objs_schedule_news.childNodes[i*2+1].id == "Active" )
        {
			iPrePic = i;
            objs_schedule_news.childNodes[i*2+1].id = "i";
            objs_schedule_news.childNodes[i*2+1].src = imgURL+"news_mouseout.png";
            break;
        }
    }
}

//按下“上一张”按钮响应函数
function PreNewsPicture()
{
	iPrePic = iIndexPic;
    if(iIndexPic == 0)
    {
        iIndexPic = iPicSum;
    }
    iIndexPic--;
	
	//var strPicPath = newsImgURL+newsPicName + iIndexPic + newsPicType;
	var strPicPath=newsImgURL+news_texts[iIndexPic].newsPic;
	objPic3.src = strPicPath; 

    CurrentNewsPicture(iPrePic, iIndexPic);
	SlidesToLeft();//图片从右到左切换滑动效果函数
}

//按下“下一张”按钮响应函数
function NextNewsPicture()
{
	iPrePic = iIndexPic;
    iIndexPic++;
    if(iIndexPic == iPicSum)
    {
        iIndexPic = 0;
    }
	//alert(iIndexPic);
	//var strPicPath = newsImgURL+newsPicName + iIndexPic + newsPicType;
	var strPicPath=newsImgURL+news_texts[iIndexPic].newsPic;
	objPic1.src = strPicPath; 
	
	CurrentNewsPicture(iPrePic, iIndexPic);
	SlidesToRight();//图片从左到右切换滑动效果函数
}

//显示当前的新闻图片
function CurrentNewsPicture(iPrePicForSlide, iIndexPicForSlide)
{
	//objPic2.style.zIndex = "4";
    //objPic3.style.zIndex = "3";
	/*var strPicPath = newsPicName + iIndexPicForSlide + newsPicType;
	objPic3.src = strPicPath; 
    var strPicPath = newsPicName + iPrePicForSlide + newsPicType;
    objPic2.src = strPicPath;*/

    ActiveNews(iIndexPicForSlide);//显示对应新闻图片的圆圈
 
    document.getElementById("news_text").innerHTML = news_texts[iIndexPicForSlide].printNews();//新闻内容
}

//判断鼠标是否在新闻块
function IsOnNewPic()
{
	//window.onblur= function(){boolIsFocus=false;}
	//window.onfocus = function(){boolIsFocus=true; RotateNews();}
	
	
	
	document.getElementById("slide_news").onmouseover = function () 
	{
		boolIsOnNewPic = true;
		
		document.getElementById("button").onmouseover = function () 
		{
			boolIsOnNewPic = true;
		}

		document.getElementById("news_text").onmouseover = function () 
		{
			boolIsOnNewPic = true;
		}
		document.getElementById("news_text").onmouseout = function () 
		{
			boolIsOnNewPic = true;
		}

		document.getElementById("news_active").onmouseover = function()
		{
			boolIsOnNewPic = true;
		}

		document.getElementById("mask").onmouseover = function () 
		{
			boolIsOnNewPic = true;
		}
		document.getElementById("mask").onmouseout = function () 
		{
			boolIsOnNewPic = true;
		}
	}
	
	var time1 = new Date();
		var now = time1.getTime();
		var then;
	document.getElementById("slide_news").onmouseout = function (e)
	{	//alert(e.clientX);
		
		
		if(e.clientX < 213 || e.clientX > 765)
		{
			var time2 = new Date();
			then = time2.getTime();
			boolIsOnNewPic = false;
			//alert(then);alert(now);
			if(then - now >= 5*1000)
			{clearTimeout(Time);	setTimeout(RotateNews, 5*1000);}
			now = then;
		}	
		
	}
	
}

//自动变换新闻
function RotateNews()
{	
	if(true==boolIsFocus && boolIsOnNewPic == false)
	{
		Time = setTimeout(RotateNews, 5*1000);
		NextNewsPicture();
	}
}

//图片切换时向右滑动
function SlidesToRight()
{
	if(iPicOffSetRight1 <= 550)
	{
		var picStyleRight1 = iPicOffSetRight1 + "px";
		var picStyleRight2 = "-" + iPicOffSetRight2 + "px";
        var newsStyleRight = iNewsOffSetRight + "px";
		objPic2.style.left = picStyleRight1;
		objPic1.style.left = picStyleRight2;
        objSlideNewsDiv.style.left = newsStyleRight;
		
		iPicOffSetRight1 += 10;
		iPicOffSetRight2 -= 10;
        iNewsOffSetRight += 10;
		setTimeout(SlidesToRight, 10);
	}
	else
	{
		objPic2.style.zIndex = 1;
		objPic2.src = objPic1.src;
		objPic2.style.left = "0px";
		objPic1.style.left = "-550px";
		
		iPicOffSetRight1 = 0; 
		iPicOffSetRight2 = 550;
        iNewsOffSetRight = -350;
	}
}

////图片切换时向左滑动
function SlidesToLeft()
{
	if(iPicOffSetLeft1 <= 550)
	{
		var picStyleLeft1 = "-" + iPicOffSetLeft1 + "px";
		var picStyleLeft2 = iPicOffSetLeft2 + "px";
        var newsStyleLef = iNewsOffSetLfet + "px";
		objPic2.style.left = picStyleLeft1;
		objPic3.style.left = picStyleLeft2;
        objSlideNewsDiv.style.left = newsStyleLef;
		
		iPicOffSetLeft1 += 10;
		iPicOffSetLeft2 -= 10;
        iNewsOffSetLfet -= 10;
		setTimeout(SlidesToLeft, 10);
	}
	else
	{
		objPic2.style.zIndex = 1;
		objPic2.src = objPic3.src;
		objPic2.style.left = "0px";
		objPic3.style.left = "550px";
		
		iPicOffSetLeft1 = 0; 
		iPicOffSetLeft2 = 550;
        iNewsOffSetLfet = 750;
	}
	return 0;
}