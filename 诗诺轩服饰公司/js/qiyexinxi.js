$(function(){
	var flag=true;
	$(".correct").click(function(){ 
		if(flag){
			$(this).children().removeClass();
			$(this).children().addClass("test");
			 flag=false;
		}
		else{
			$(this).children().removeClass();
			$(this).children().addClass("test2");
			 flag=true;
		}
		});
	$(window).scroll(function(){
		var h=$(document).scrollTop();
		console.log(h)
		if(h>175){
			$("#flx").css("display","block")
		}else if(h<175){
			$("#flx").css("display","none")
		}
	})
})