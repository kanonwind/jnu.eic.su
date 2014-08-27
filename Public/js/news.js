$(document).ready(function()
{
    if($("#edit_the_article"))
    {
        $("#edit_the_article").click(function()
        {
            //提示语句
            $("#edit_button").append("<p>加载中...</p>");
            //异步加载tinymce
            /*
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = './tinymce/tinymce.min.js';
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            */
            //$("head").append("<script type='text/javascript' src='test.js'></script>");
            //获取文章内容
            var strTitle=$("#article_title").text();
            
            var strAuthor_etc=$("p#author_etc span:first").text();
            
            var strAuthor=strAuthor_etc.replace("作者：","");
           
            var arrTemp=$("p#article_key_word span");
            var strKeyWord=arrTemp[1].innerHTML;
            for(var i=2;i<arrTemp.length;i++)
            {
                strKeyWord+="|"+arrTemp[i].innerHTML;
            }
            
            var strText=$("#article_text").html();
            var varArticleType=$("#article_type_init").attr("value");
            
            strInnerHTML=new String();
            strInnerHTML+="<table>"
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
				+"				<option value=\"1\">新闻</option>"
				+"				<option value=\"2\">学生工作</option>"
				+"				<option value=\"3\">活动</option>"
				+"				<option value=\"4\">现行制度</option>"
				+"			</select>"
				+"		</td>"
				+"	</tr>"
				+"	<tr>"
				+"		<td><label for=\"article_text_type\">正文：</label></td>"
				+"	</tr>"		
				+"</table>"
                +"<div id=\"main_input_area\">"
                +"<textarea id=\"article_text\" name=\"article_text\"></textarea>"
                +"</div>"
                +"<button type=\"submit\" id=\"submitbutton\" title=\"提交\">提交</button>"
                +"<button type=\"button\" id=\"cancel\">取消</button>";
                
            
            $("#the_latest_news").html(strInnerHTML);
            
             //填充value
            $("#article_type").val(varArticleType);
            $("#article_title").val(strTitle);
            $("#article_author").val(strAuthor);
            $("#artcle_key_word").val(strKeyWord);
            $("#article_text").val(strText);
            
             //初始化tinymce
            
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
            TODO:表单检查
            
        });
    }
});
