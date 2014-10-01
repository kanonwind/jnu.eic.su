window.onload = NewsInit;

//新闻图片的访问路径
var newsPicName = "news_picture" ;
var newsPicType = ".jpg";



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
var boolIsFocus = true;//标志是否在当前页面
var boolIsOnNewPic = false;//标志鼠标是否在新闻图片块上
var booIsNewsShow = false;//新闻是否展开
var boolIsOnBtn_pre = false;//标记鼠标是否在左按钮上
var boolIsOnBtn_next = false;//标记鼠标是否在右按钮上

var objLeftPic;//左边的隐藏图片
var objMidPic;//中间的显示的图片
var objRightPic;//右边隐藏的图片

var objLeftNewsTitle;//左边的隐藏新闻标题
var objMidNewsTitle;//中间的显示的闻标题
var objRightNewsTitle;//右边隐藏的闻标题

var arrColor = new Array("#940707", "#00a0e9", "#486a00", "#04caac", "#005982", "#959595", "#8c97cb", "#ff7200");
//var iIndexPic = 0;

var iPicSum = 8; //新闻图片的总数
var iIndexPic = 0; //当前显示新闻图片的编号
var iPrePic = 0;//上一张显示新闻的图片的编号
var arrNewsTitle = new Array();
var arrNewsText = new Array();



//获取新闻内容，news_texts数组的初始化
function get_news()
{
    /*
    for(var i=0;i<8;i++)
    {
        var title="新闻标题"+i;
        var author="文章作者"+i;
        var abst="文章内容"+i+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容";
        abst+=  "文章内容"+i+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容"+"文章内容";
        var picpath="news_picture"+i+".jpg";
        var obj=new news_info(title,author,abst,"#",picpath);
        arrNewsText[i]=obj;
		arrNewsTitle[i] = title;
    }
    */
	//请求数据
		var newsData;
	    $.ajax({
		url:APP+"/Index/newsData",//请求用户类型
		data:{},
		async:false,
		dataType:"json",
		type:"POST",
		success:function(result){newsData=result;}
		});	
		json_Get=newsData;
/*
	json_Get={
        "arrNewsInfo":
        [
            {
                "title":"标题0","author":"作者0","abst":"内容0",
                "picpath":"33EC15DCC2478C38978983DBD27DE95C.jpg",
                "newslink":"#",//正文连接
            },
            {
                "title":"标题1","author":"作者1","abst":"内容1",
                "picpath":"9B36EF8AFBCC736EB6C880F136966007.jpg",
                "newslink":"#",//正文连接
            },
            {
                "title":"标题2","author":"作者2","abst":"内容2",
                "picpath":"D52369F3255366E5E43E0443CD7ADC2F.jpg",
                "newslink":"#",//正文连接
            },
            {
                "title":"标题3","author":"作者3","abst":"内容3",
                "picpath":"CDD02A5C5208EBE8BEACBB3AF5AC3BF1.jpg",
                "newslink":"#",//正文连接
            },
            {
                "title":"标题4","author":"作者4","abst":"内容4",
                "picpath":"A5EE731ED6DAB6DFF5E214DDC9428C12.jpg",
                "newslink":"#",//正文连接
            },
            {
                "title":"标题5","author":"作者5","abst":"内容5",
                "picpath":"4873EB0C0AB45965B65C403EC2EDA8D8.jpg",
                "newslink":"#",//正文连接
            },
            {
                "title":"标题6","author":"作者6","abst":"内容6",
                "picpath":"1C5BC9C8DB02C129ED811429CFFE8AA3.jpg",
                "newslink":"#",//正文连接
            },
           {
                "title":"标题7","author":"作者7","abst":"内容7",
                "picpath":"89E809B6C5AEFCE52997624B2FB56F15.jpg",
                "newslink":"#",//正文连接
            },
        ],
    };
	*/
    for(var i=0;i<json_Get.arrNewsInfo.length;i++)
    {
        arrNewsText[i]=new news_info(
            json_Get.arrNewsInfo[i].title,
            json_Get.arrNewsInfo[i].author,
            json_Get.arrNewsInfo[i].abst,
            json_Get.arrNewsInfo[i].newslink,
            json_Get.arrNewsInfo[i].picpath);
        arrNewsTitle[i]=json_Get.arrNewsInfo[i].title;
    }
    iPicSum=json_Get.arrNewsInfo.length;
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
}

function NewsInit()
{
    get_news();//获取新闻
    try{
		strInnerHTML=new String();
		strInnerHTML+="<div id=\"main_news_div\">"    
				+"		<img src=\""+newsImgURL+arrNewsText[0].newsPic+"\" id=\"midPic\" alt=\"newsPic\"/>"
				+"		<img src=\""+newsImgURL+arrNewsText[1].newsPic+"\"\" id=\"leftPic\" alt=\"newsPic\"/>"
				+"		<img src=\""+newsImgURL+arrNewsText[arrNewsText.length-1].newsPic+"\"\" id=\"rightPic\" alt=\"newsPic\"/>"							
				+"		<div id=\"news_slide_button\">"
				+"			<a id=\"pre_news\" href=\"javascript:\" style><img id=\"btn_pre\" src=\"http://jnueicsu-upload.stor.sinaapp.com/image/btn-carousel-prev.png\" /></a>"
				+"			<a id=\"next_news\" href=\"javascript:\"><img id=\"btn_next\" src=\"http://jnueicsu-upload.stor.sinaapp.com/image/btn-carousel-next.png\" /></a>"
				+"		</div>"
				+"		<div id=\"mid_news_title\"><p id=\"mid_news_text\"></p></div>"
				+"		<div id=\"left_news_title\"><p id=\"left_news_text\"></p></div>"
				+"		<div id=\"right_news_title\"><p id=\"right_news_text\"></p></div>"	
				+"		<div id=\"news\">"
				+"			<p id=\"news_text\"></p>"
				+"		</div>"
				+"</div>";
		
		//return;
		document.getElementById("slide_news").innerHTML=strInnerHTML;      
		search();
		objLeftPic = document.getElementById("leftPic");
		objMidPic = document.getElementById("midPic");
		objRightPic = document.getElementById("rightPic");
		objLeftPic.style.left = "-550px";
		objRightPic.style.left = "550px";
		
		
		
		objLeftNewsTitle = document.getElementById("left_news_title");
		objMidNewsTitle = document.getElementById("mid_news_title");
		objRightNewsTitle = document.getElementById("right_news_title");
		objLeftNewsTitle.style.left = "-550px";	
		objRightNewsTitle.style.left = "550px";
		document.getElementById("left_news_text").innerHTML = arrNewsTitle[iPicSum-1];
		document.getElementById("mid_news_text").innerHTML = arrNewsTitle[0];
		document.getElementById("right_news_text").innerHTML = arrNewsTitle[1];
		
		window.onfocus = function(){boolIsFocus=true; RotateNews();}
		window.onblur= function(){boolIsFocus=false;}
		if (navigator.userAgent.indexOf("Chrome")>=0) //判断是否为Chrome浏览器
		{
			RotateNews();
		}
		
		IsOnNewPic();//判断鼠标是否位于新闻div块上，如果是则不自动滑动
		
		document.getElementById("btn_pre").onclick = function(){PreNewsPicture();}
		document.getElementById("btn_next").onclick = function(){NextNewsPicture();}
		
		document.getElementById("pre_news").onmouseover = function(){boolIsOnBtn_pre = true;this.style.background="black";}
		document.getElementById("next_news").onmouseover = function(){boolIsOnBtn_next = true;this.style.background="black";}
		document.getElementById("pre_news").onmouseout = function()
		{
			boolIsOnBtn_pre = false;
			this.style.background=arrColor[iIndexPic];
		}
		document.getElementById("next_news").onmouseout = function()
		{
			boolIsOnBtn_next = false;
			this.style.background=arrColor[iIndexPic];
		}	
		
		//显示新闻
		document.getElementById("mid_news_title").onmouseover = function()
		{
			var strTop = getCSSValue(document.getElementById("news"), "top")
			if(strTop == "342px")
			{
				ShowNews(document.getElementById("news"));
				booIsNewsShow = true;
			}
		}
		//隐藏新闻
		document.getElementById("news").onmouseout = function(e)
		{
			var strTop = getCSSValue(this, "top")		
			if(strTop == "0px")
			{
				var yPos = GetOffset(e);
				if(yPos >= 342)
				{
					HideNews(this);
				}
				if(e.clientX < 213 || e.clientX > 765)
				{	
					HideNews(this);
				}
			}
			
		}
	}catch(err)
	{
		console.log(err);
		console.log("新闻加载失败");
	}
}

//自动变换新闻
function RotateNews()
{	
	if(true==boolIsFocus && boolIsOnNewPic == false && booIsNewsShow == false)
	{
		clearInterval(Time);
		Time = setInterval(RotateNews, 5*1000);
		NextNewsPicture();
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
	
	var strPicPath = newsImgURL+arrNewsText[iIndexPic].newsPic;
	objRightPic.src = strPicPath; 
	
	objRightNewsTitle.style.background = arrColor[iIndexPic];//改变标题块颜色
	document.getElementById("right_news_text").innerHTML = arrNewsTitle[iIndexPic];//改变新闻标题内容
	document.getElementById("news").style.background = arrColor[iIndexPic];//改变新闻块的颜色
	document.getElementById("news_text").innerHTML = arrNewsText[iIndexPic].printNews();//新闻内容
	
	//换左右按钮的背景颜色
	if(boolIsOnBtn_pre == false)
		document.getElementById("pre_news").style.background = arrColor[iIndexPic];
	else
		document.getElementById("pre_news").style.background = "black";
			
	if(boolIsOnBtn_next == false)
		document.getElementById("next_news").style.background = arrColor[iIndexPic];
	else
		document.getElementById("next_news").style.background = "black";
	

    //CurrentNewsPicture(iPrePic, iIndexPic);
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

	//var strPicPath = newsPicName + iIndexPic + newsPicType;
    var strPicPath=newsImgURL+arrNewsText[iIndexPic].newsPic;
	objLeftPic.src = strPicPath; 
	
	objLeftNewsTitle.style.background = arrColor[iIndexPic];//改变标题块颜色
	document.getElementById("left_news_text").innerHTML = arrNewsTitle[iIndexPic];//改变新闻标题内容
	document.getElementById("news").style.background = arrColor[iIndexPic];//改变新闻块的颜色
	document.getElementById("news_text").innerHTML = arrNewsText[iIndexPic].printNews();//新闻内容

	SlidesToRight();//图片从左到右切换滑动效果函数
}

//判断鼠标是否在新闻块
function IsOnNewPic()
{
	document.getElementById("main_news_div").onmouseover = function () 
	{
		boolIsOnNewPic = true;
	}

	document.getElementById("main_news_div").onmouseout = function (e)
	{
		var strTop = getCSSValue(document.getElementById("news"), "top");
		if(	e.clientX < 215 
		|| e.clientX > 760
		|| (getScrollTop() > 20 && e.clientY < 140)
		|| ((getScrollTop() < 20) && e.clientY < (160 - getScrollTop()))
		|| (e.clientY > (500 - getScrollTop())) )
		{
			if(strTop == "342px")
			{
				boolIsOnNewPic = false;
				clearInterval(Time);
				Time = setInterval(RotateNews, 5*1000);
			}
			if(strTop == "0px")
			{
				HideNews(document.getElementById("news"));
			}
			
			
		}		
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
		objMidPic.style.left = picStyleRight1;
		objLeftPic.style.left = picStyleRight2;
		
		objMidNewsTitle.style.left = picStyleRight1;
		objLeftNewsTitle.style.left = picStyleRight2;
        //objSlideNewsDiv.style.left = newsStyleRight;
		
		iPicOffSetRight1 += 10;
		iPicOffSetRight2 -= 10;
        iNewsOffSetRight += 10;
		setTimeout(SlidesToRight, 10);
	}
	else
	{
		objMidNewsTitle.style.background = arrColor[iIndexPic];//改变标题块颜色
		document.getElementById("mid_news_text").innerHTML = arrNewsTitle[iIndexPic];//改变新闻标题内容
		
		objMidPic.style.zIndex = 1;
		objMidPic.src = objLeftPic.src;
		objMidPic.style.left = "0px";
		objLeftPic.style.left = "-550px";
		
		objMidNewsTitle.style.left = "0px";
		objLeftNewsTitle.style.left = "-550px";
		
		iPicOffSetRight1 = 0; 
		iPicOffSetRight2 = 550;
        iNewsOffSetRight = -350;
		
		//换左右按钮的背景颜色
		if(boolIsOnBtn_pre == false)
			document.getElementById("pre_news").style.background = arrColor[iIndexPic];
		else
			document.getElementById("pre_news").style.background = "black";
		if(boolIsOnBtn_next == false)
			document.getElementById("next_news").style.background = arrColor[iIndexPic];
		else
			document.getElementById("next_news").style.background = "black";
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
		objMidPic.style.left = picStyleLeft1;
		objRightPic.style.left = picStyleLeft2;
		
		objMidNewsTitle.style.left = picStyleLeft1;
		objRightNewsTitle.style.left = picStyleLeft2;
        //objSlideNewsDiv.style.left = newsStyleLef;
		
		iPicOffSetLeft1 += 10;
		iPicOffSetLeft2 -= 10;
        iNewsOffSetLfet -= 10;
		setTimeout(SlidesToLeft, 10);
	}
	else
	{
		objMidNewsTitle.style.background = arrColor[iIndexPic];//改变标题块颜色
		document.getElementById("mid_news_text").innerHTML = arrNewsTitle[iIndexPic];//改变新闻标题内容
		
		objMidPic.style.zIndex = 1;
		objMidPic.src = objRightPic.src;
		objMidPic.style.left = "0px";
		objRightPic.style.left = "550px";
		
		objMidNewsTitle.style.left = "0px";
		objRightNewsTitle.style.left = "550px";
		
		iPicOffSetLeft1 = 0; 
		iPicOffSetLeft2 = 550;
        iNewsOffSetLfet = 750;
		
		/* //换左右按钮的背景颜色
		if(boolIsOnBtn_pre == false)
			document.getElementById("pre_news").style.background = arrColor[iIndexPic];
		else
			document.getElementById("pre_news").style.background = "black";
			
		if(boolIsOnBtn_next == false)
			document.getElementById("next_news").style.background = arrColor[iIndexPic];
		else
			document.getElementById("next_news").style.background = "black"; */
	}
	return 0;
}

//显示具体新闻
function ShowNews(newsObj)
{
	var iTop = 342;
	newsObj.style.background = arrColor[iIndexPic];
	SlideShow();
	function SlideShow()
	{
		if(iTop <= 0.5)
		{
			newsObj.style.top = "0px";
			return ;
		}
		else
		{
			iTop = iTop - iTop/10;
			newsObj.style.top = iTop + "px";
			setTimeout(SlideShow, 10);
		}
	}
}
//隐藏具体新闻
function HideNews(newsObj)
{
	var iTop = 0;
	SlideHide()
	//newsObj.background = arrColor[iIndexPic];
	function SlideHide()
	{
		if(iTop >= 342)
		{
			newsObj.style.top = "342px";
			booIsNewsShow = false;
			boolIsOnNewPic = false;
			boolIsFocus=true;
			setTimeout(RotateNews, 1000);
			return ;
		}
		else
		{
			if(iTop == 0)
				iTop = 5;
			iTop = iTop + iTop/10;
			newsObj.style.top = iTop + "px";
			setTimeout(SlideHide, 10);
		}
	}
}

//获得相对间距
function GetOffset(e) 
{
	var e = window.event || e,
	posY = (e.offsetY == undefined) ? getOffset(e).offsetY : e.offsetY;
	return posY;

	function getOffset(e) //兼容火狐offset
	{
		var target = e.target;
		if (target.offsetLeft == undefined) 
		{
			target = target.parentNode;
		}
		var pageCoord = getPageCoord(target);
		var eventCoord = 
		{
			x : window.pageXOffset + e.clientX,
			y : window.pageYOffset + e.clientY
		};
		var offset = 
		{
			offsetX : eventCoord.x - pageCoord.x,
			offsetY : eventCoord.y - pageCoord.y
		};
		return offset;

		function getPageCoord(element) 
		{
			var coord = 
			{
				x : 0,
				y : 0
			};
			while (element) 
			{
				coord.x += element.offsetLeft;
				coord.y += element.offsetTop;
				element = element.offsetParent;
			}
			return coord;
		}
	}
}

function getCSSValue(obj,key)//获取属性元素CSS值
{
	if(obj.currentStyle){//IE
		return obj.currentStyle[key];	
	}else{//!IE
		return document.defaultView.getComputedStyle(obj,null)[key];
	}
}

//获取div块相对于顶端的位置
function getScrollTop() 
{
	var scrollPos;
	if (window.pageYOffset) 
	{
		scrollPos = window.pageYOffset;
	} 
	else if (document.compatMode && document.compatMode != 'BackCompat') 
	{
		scrollPos = document.documentElement.scrollTop;
	} 
	else if (document.body) 
	{
		scrollPos = document.body.scrollTop;
	}
	return scrollPos;
}