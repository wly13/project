//将col-lg替换成col-xs
$(function(){
	$("div[class^='col-lg-']").each(function(e){
		var oldClass=$(this).attr("class").toString()
		var lgNum=parseInt(oldClass.substr(7,2))
		$(this).remove("div[class^='col-xs-']")
		$(this).addClass("col-xs-"+lgNum)
	})
})
