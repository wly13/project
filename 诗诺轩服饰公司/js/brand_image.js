$(function(){
	
	
	$(".one li").click(function(){
		$(this).addClass("d_color").siblings().removeClass("d_color")
		var index=$(this).index()
		
//		$(".d_banner>div").eq(index).css("display","block").siblings().css("display","none")
		$(".d_banner>div").eq(index).addClass("d_div").siblings().removeClass("d_div")
	})
	$(".d_phone_ul li").click(function(){
		
		$(this).addClass("d_color").siblings().removeClass("d_color")
		var index=$(this).index()
		$(".d_pic>div").eq(index).addClass("d_insidepic").siblings().removeClass("d_insidepic")
	
	})
	
})
