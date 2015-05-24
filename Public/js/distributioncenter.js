function GetObjById(strId)
{
    return document.getElementById(strId);
}

window.onload=function()
{
    
	GetObjById("articles").onclick=function()
	{
			
        //initArticles();
        //15/4/20 deng:采用最暴力的方法
        window.location.href = "http://jnu.eicsu.com/index.php/News/create";
		
	}
    
	GetObjById("announcement").onclick=function()
	{
		
        initAnnouce();
	}
	document.getElementById("coming_soon").onclick=function()
	{
	
        initComing();
	}
    initDistri();
	
}

function initDistri()
{
    initArticles();
}

function initcallback()
{
    
}

function initArticles()
{
    GetObjById("articles").style.backgroundColor="#242424";
    GetObjById("announcement").style.backgroundColor="#888888";
	GetObjById("coming_soon").style.backgroundColor="#888888";
    strInnerHTML=new String();
    strInnerHTML+='<div >\
                        <div class="lead"></div>\
                        <form method="post" action="'+APP+'/News/createNews" name="article_form" id="article_form" enctype="multipart/form-data">\
                            <div class="form-group">\
                                <label for="article_title">标题</label>\
                                <input type="text" class="form-control" name="article_title" id="earticle_title" placeholder="标题">\
                            </div>\
                            <div class="form-group">\
                                <label for="article_type">类别</label>\
                                <select class="form-control" name="article_type">\
                                    <option value="1" selected="selected">新闻中心</option>\
                                    <option value="7">通知公示</option>\
                                    <option value="4">现行制度</option>\
                                    <option value="8">团学简介</option>\
                                </select>\
                            </div>\
                            <div class="form-group">\
                                <label for="article_author">作者</label>\
                                <input type="text" class="form-control" name="article_author" id="article_author" placeholder="作者">\
                            </div>\
                            <div class="form-group">\
                                <label for="article_datetime">时间</label>\
                                <div class="input-group date form_datetime" data-date="" data-link-field="article_datetime">\
                                    <input class="form-control" type="text" value="" placeholder="格式: YYYY-MM-DD HH-II-SS 从右边的控件选就可以了">\
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>\
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>\
                                </div>\
                                <input type="hidden" id="article_datetime" name="article_datetime" value="" />\
                            </div>\
                            <div class="form-group">\
                                <label for="artcle_key_word">关键词</label>\
                                <input type="text" class="form-control" name="artcle_key_word" id="artcle_key_word" placeholder="不同关键词请使用|隔开，如“关键词1|关键词2”">\
                            </div>\
                            <div class="form-group">\
                                <label for="exampleInputPassword1">正文</label>\
                                <textarea class="form-control" name="article_text" id="main_input_area"></textarea>\
                            </div>\
                            <button type="submit" class="btn btn-block btn-primary" id="submitbutton">发表</button>\
                            </form>\
                        </div>';
                
    GetObjById("main").innerHTML=strInnerHTML;
    function OnlineEditInit()
    {
        //GetObjById("main_input_area").innerHTML="<textarea id=\"article_text\" name=\"article_text\"></textarea>";
        tinymce.init({
			selector: "textarea#main_input_area",
            language_url : "/Public/js/tinymce/langs/zh_CN.js",
			theme: "modern",
			height:"520px",
			width:"920px",
			plugins: [
				"advlist autolink lists link image charmap hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars code",
				"insertdatetime media nonbreaking save table contextmenu directionality",
				"emoticons template paste textcolor colorpicker textpattern"
			],
			toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |media link image| forecolor backcolor emoticons",
			image_advtab: true,
			templates: [
				{title: 'Test template 1', content: 'Test 1'},
				{title: 'Test template 2', content: 'Test 2'}
			],
            //init_instance_callback :"initcallback",
		});
 
        $('.form_datetime').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            //showMeridian: 1,
            language:'zh-CN',
            format:'yyyy-mm-dd hh:ii:ss'
        });
        
    }
    OnlineEditInit();
    /*
    GetObjById("artcle_type_online").onclick=function()
    {
        OnlineEditInit();
    }
    */
    function UploadFileInit()
    {
        
        var str=new String();
        str+="<label for=\"artcle_upload\">文件: </label>"
			+"<input type=\"file\" name=\"uploaded_file\" id=\"uploaded_file\" />"
            +"<br /><br /><br /><br /><br /><br /><br /><br />";
        GetObjById("main_input_area").innerHTML=str;
    }
    /*
    GetObjById("artcle_type_upload").onclick=function()
    {
        UploadFileInit();
    }
    */
        
}

function initAnnouce()
{
    GetObjById("articles").style.backgroundColor="#888888";
	GetObjById("announcement").style.backgroundColor="#242424";
	GetObjById("coming_soon").style.backgroundColor="#888888";
    /*
    var str="<p>*填写公告内容，注意不要超过45字<p>"
			+"<form method=\"post\" action=\""+APP+"/News/createAnnouncement"+"\">"
			+"<textarea name=\"gonggao\" id=\"gonggao\"></textarea><br />"
            +"  <button type=\"submit\" id=\"submitbutton\">发表</button>"
            +"  <button type=\"button\" id=\"cancel\">取消</button>"
			+"</form>";
    str+="<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />";
    */
    var str ='<div >\
                <div class="lead"></div>\
                <form method="post" action="'+APP+'/News/createAnnouncement" name="article_form" id="article_form" enctype="multipart/form-data">\
                    <div class="form-group">\
                        <label for="article_title">新公告</label>\
                        <textarea class="form-control" name="gonggao" id="gonggao" placeholder="填写公告内容，注意不要超过45字"></textarea>\
                    </div>\
                    <button type="submit" class="btn btn-block btn-primary" id="submitbutton">发表</button>\
                </form>\
            </div>';
    GetObjById("main").innerHTML=str;
}

function initComing()
{
    
    GetObjById("articles").style.backgroundColor="#888888";
	GetObjById("announcement").style.backgroundColor="#888888";
	GetObjById("coming_soon").style.backgroundColor="#242424"; 
    var strInnerHTML=new String();
    /*
    strInnerHTML+="<form method=\"post\" action=\""+APP+"/News/createActivity"+"\">"
				+"<table>"
				+"		<tr>"
				+"			<td>活动名称：</td><td><input type=\"text\" name=\"act_name\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>举办时间：</td><td><input type=\"text\" name=\"act_time\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>活动地点：</td><td><input type=\"text\" name=\"act_address\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>举办部门：</td><td><input type=\"text\" name=\"act_apartment\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>活动口号：</td><td><input type=\"text\" name=\"act_slogan\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>大海报(520x380)：</td><td><input type=\"text\" name=\"act_bigposter\"/></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>小海报(160x200)：</td><td><input type=\"text\" name=\"act_smallposter\"/></td>"
				+"		</tr>"
				+"	</table>"
                +"  <button type=\"submit\" id=\"submitbutton\">发表</button>"
				+"  <button type=\"button\" id=\"cancel\">取消</button>"
				+"</form>";
    */
    strInnerHTML+=  '<div >\
                        <div class="lead"></div>\
                        <form method="post" action="'+APP+'/News/createActivity" name="article_form" id="article_form" enctype="multipart/form-data">\
                            <div class="form-group">\
                                <label for="act_name">活动名称: </label>\
                                <input type="text" class="form-control" name="act_name" id="act_name" placeholder="活动名称">\
                            </div>\
                            <div class="form-group">\
                                <label for="act_time">举办时间: </label>\
                                <input type="text" class="form-control" name="act_time" id="act_time" placeholder="举办时间">\
                            </div>\
                            <div class="form-group">\
                                <label for="act_address">举办地点: </label>\
                                <input type="text" class="form-control" name="act_address" id="act_address" placeholder="举办地点">\
                            </div>\
                            <div class="form-group">\
                                <label for="act_apartment">举办部门: </label>\
                                <input type="text" class="form-control" name="act_apartment" id="act_apartment" placeholder="举办部门">\
                            </div>\
                            <div class="form-group">\
                                <label for="act_slogan">活动口号: </label>\
                                <input type="text" class="form-control" name="act_slogan" id="act_slogan" placeholder="活动口号">\
                            </div>\
                            <div class="form-group">\
                                <label for="act_bigposter">大海报(520x380): </label>\
                                <input type="text" class="form-control" name="act_bigposter" id="act_bigposter" placeholder="填写图片地址, 图片可以用下面的控件上传">\
                            </div>\
                            <div class="form-group">\
                                <label for="act_smallposter">小海报(160x200): </label>\
                                <input type="text" class="form-control" name="act_smallposter" id="act_smallposter" placeholder="填写图片地址, 图片可以用下面的控件上传">\
                            </div>\
                            <button type="submit" class="btn btn-block btn-primary" id="submitbutton">发表</button>\
                            </form>\
                        </div>';
    GetObjById("main").innerHTML=strInnerHTML;
}
	