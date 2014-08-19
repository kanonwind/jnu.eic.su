function GetObjById(strId)
{
    return document.getElementById(strId);
}

window.onload=function()
{
	GetObjById("articles").onclick=function()
	{
			
        initArticles();
		
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
    alert("tinymce");
}

function initArticles()
{
    GetObjById("articles").style.backgroundColor="#242424";
    GetObjById("announcement").style.backgroundColor="#888888";
	GetObjById("coming_soon").style.backgroundColor="#888888";
    strInnerHTML=new String();
    strInnerHTML+="<form method=\"post\" action=\"#\" name=\"article_form\" id=\"article_form\"> "
				+"<table>"
				+"	<tr>"
				+"		<td><label for=\"article_title\">标题：</label></td>"
				+"		<td><input type=\"text\" name=\"article_title\" id=\"article_title\" title=\"输入文章标题\"/></td>"
				+"	</tr>"
				+"		<td><label for=\"article_author\">作者：</label></td>"
				+"		<td><input type=\"text\" name=\"article_author\" id=\"article_author\" title=\"输入文章作者\" /></td>"
				+"	<tr>"
				+"		<td><label for=\"artcle_key_word\">关键词：</label></td>"
				+"		<td><input type=\"text\" name=\"artcle_key_word\" id=\"artcle_key_word\" value=\"不同关键词请使用|隔开，如“关键词1|关键词2”\" title=\"输入文章关键词\"/></td>"
				+"	</tr>"
				+"	<tr>"
				+"		<td><label for=\"article_type\">类别：</label></td>"
				+"		<td>"
				+"			<select name=\"article_type\" id=\"article_type\">"
				+"				<option value=\"1\" selected=\"selected\">新闻</option>"
				+"				<option value=\"2\">学生工作</option>"
				+"				<option value=\"3\">活动</option>"
				+"				<option value=\"4\">现行制度</option>"
				+"			</select>"
				+"		</td>"
				+"	</tr>"
				+"	<tr>"
				+"		<td><label for=\"article_text_type\">正文：</label></td>"
				+"		<td>"
				+"			<button type=\"button\" id=\"artcle_type_online\">在线编辑</button>"
				+"			<button type=\"button\" id=\"artcle_type_upload\">上传文件</button>"
				+"		</td>"
				+"	</tr>"		
				+"</table>"
                +"<div id=\"main_input_area\"></div>"
                +"  <button type=\"submit\" id=\"submitbutton\">发表</button>"
                +"  <button type=\"button\" id=\"cancel\">取消</button>";
                
    GetObjById("main").innerHTML=strInnerHTML;
    function OnlineEditInit()
    {
        GetObjById("main_input_area").innerHTML="<textarea id=\"article_text\" name=\"article_text\"></textarea>";
        tinymce.init({
			selector: "textarea#article_text",
			theme: "modern",
			language:"zh_CN",
			height:"920px",
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
        //TODO:进入到公告或即将到来后再回来，tinymce就不工作了
        
    }
    OnlineEditInit();
    
    GetObjById("artcle_type_online").onclick=function()
    {
        OnlineEditInit();
    }
    function UploadFileInit()
    {
        
        var str=new String();
        str+="<label for=\"artcle_upload\">文件: </label>"
			+"<input type=\"file\" name=\"uploaded_file\" id=\"uploaded_file\" />"
            +"<br /><br /><br /><br /><br /><br /><br /><br />";
        GetObjById("main_input_area").innerHTML=str;
    }
    GetObjById("artcle_type_upload").onclick=function()
    {
        UploadFileInit();
    }
        
}

function initAnnouce()
{
    GetObjById("articles").style.backgroundColor="#888888";
	GetObjById("announcement").style.backgroundColor="#242424";
	GetObjById("coming_soon").style.backgroundColor="#888888";
    var str="<p>*填写公告内容，注意不要找过45字<p><textarea name=\"gonggao\" id=\"gonggao\"></textarea><br />"
            +"  <button type=\"submit\" id=\"submitbutton\">发表</button>"
            +"  <button type=\"button\" id=\"cancel\">取消</button>";
    str+="<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />";
    GetObjById("main").innerHTML=str;
}

function initComing()
{
    
    GetObjById("articles").style.backgroundColor="#888888";
	GetObjById("announcement").style.backgroundColor="#888888";
	GetObjById("coming_soon").style.backgroundColor="#242424"; 
    var strInnerHTML=new String();
    strInnerHTML+="<table>"
				+"		<tr>"
				+"			<td>活动名称：</td><td><input type=\"text\" /></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>举办时间：</td><td><input type=\"text\" /></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>活动地点：</td><td><input type=\"text\" /></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>举办部门：</td><td><input type=\"text\" /></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>活动口号：</td><td><input type=\"text\" /></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>大海报：</td><td><input type=\"text\" /></td>"
				+"		</tr>"
				+"		<tr>"
				+"			<td>小海报：</td><td><input type=\"text\" /></td>"
				+"		</tr>"
				+"	</table>"
                +"  <button type=\"submit\" id=\"submitbutton\">发表</button>"
				+"  <button type=\"button\" id=\"cancel\">取消</button>";
    GetObjById("main").innerHTML=strInnerHTML;
}
	