$(function(){
	$(".Y_main_top").click(function(){
		$(".Y_main_a").css("display","block")
		$(".Y_main_b").css("display","none")
		$(this).css("background","#6A4401")
		$(".Y_main_foot").css("background","#1D1D1D")
	})
	$(".Y_main_foot").click(function(){
		$(".Y_main_b").css("display","block")
		$(".Y_main_a").css("display","none")
		$(this).css("background","#6A4401")
		$(".Y_main_top").css("background","#1D1D1D")
	})
	
	

})