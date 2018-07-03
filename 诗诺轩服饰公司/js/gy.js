$(function(){
	$(window).scroll(function(){
		var h=$(document).scrollTop();
		console.log(h)
		if(h>790){
			$("#fix").css("display","block")
		}else if(h<790){
			$("#fix").css("display","none")
		}
	})
})