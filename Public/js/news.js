$(document).ready(function()
{
    if($("#edit_the_article"))
    {
        $("#edit_the_article").click(function()
        {
            //提示语句
            $("#edit_button").append("<p>加载中...</p>");
            //获取文章内容
            var strTitle=$("#article_title").text();
            
            var strAuthor_etc=$("p#author_etc span:first").text();
            var strDateTime = $("p#author_etc span:last").text();
            strDateTime = strDateTime.replace("时间：","");
            if(strDateTime.length==10)
            {
                //以前的时间是没有时分秒的. 所以要补上
                strDateTime += ' 00:00:00';
            }
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
            /*
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
            */
            strInnerHTML+='<div class="form-group">\
                                <label for="article_type">类别</label>\
                                <select class="form-control" name="article_type" id="article_type">\
                                    <option value="1">新闻中心</option>\
                                    <option value="7">通知公示</option>\
                                    <option value="4">现行制度</option>\
                                    <option value="8">团学简介</option>\
                                    <option value="9">活动存档</option>\
                                </select>\
                            </div>\
                            <div class="form-group">\
                                <label for="article_title">标题</label>\
                                <input type="text" class="form-control" name="article_title" id="article_title" placeholder="标题">\
                            </div>\
                            <div class="form-group">\
                                <label for="article_author">作者</label>\
                                <input type="text" class="form-control" name="article_author" id="article_author" placeholder="作者">\
                            </div>\
                            <div class="form-group">\
                                <label for="article_datetime">时间</label>\
                                <div class="input-group date form_datetime" data-date="" data-link-field="article_datetime">\
                                    <input class="form-control" type="text" value="" id="article_datetime_facade" placeholder="格式: YYYY-MM-DD HH-II-SS 从右边的控件选就可以了">\
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
                            <div class="form-group">\
                                <button type="submit" class="btn btn-block btn-primary" id="submitbutton">发表</button>\
                            </div>\
                            <div class="form-group">\
                                <button type="button" class="btn btn-block" id="cancel">取消</button>\
                            </div>';
            $("#the_latest_news").html(strInnerHTML);
            $("#uploadPhotoArea").show();
		  
             //填充value
            $("#article_type").val(varArticleType);
            $("#article_title").val(strTitle);
            $("#article_author").val(strAuthor);
            $("#article_datetime").val(strDateTime);
            $("#article_datetime_facade").val(strDateTime);
            $("#artcle_key_word").val(strKeyWord);
            $("#main_input_area").val(strText);
            
             //初始化tinymce
            
            tinymce.init({
                selector: "textarea#main_input_area",
                theme: "modern",
                language_url : "/Public/js/tinymce/langs/zh_CN.js",
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
            //TODO:表单检查
            $("#cancel").click(function(){location.reload();});
        });
       
    }
});
