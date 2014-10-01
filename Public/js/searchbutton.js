
(function search()
{
    console.log("search");
    $("#query").focus(function(){
        $("#query,#search_bar").css("background","white");
        $("#searchsubmit").css("background","#52a3ed").mouseover(function(){$(this).css("background","#448aca");}).mouseout(function(){$(this).css("background","#52a3ed");});
        console.log("focus");
    }).blur(function(){
        $("#query,#search_bar,#searchsubmit").css("background","white");
        $("#searchsubmit").mouseover(function(){$(this).css("background","white");}).mouseout(function(){$(this).css("background","white");});
        console.log("blur");
    });
})();
