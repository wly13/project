$(function(){
	$("#T_xuanxi li").click(function(event) {
		/* Act on the event */
		$("#T_xuanxi li").eq($(this).index()).addClass('T_on').siblings().removeClass('T_on')
		$("#T_tuxian li").eq($(this).index()).addClass("T_xian").siblings().removeClass('T_xian')
	});
	// 星风尚
	$(".Th_left li").click(function(event) {
		/* Act on the event */
		$(".Th_left li").eq($(this).index()).addClass("Th_on").siblings().removeClass('Th_on')
		$("#Th_tudian li").eq($(this).index()).addClass("Th_cxuan").siblings().removeClass('Th_cxuan')
	});
	$(".T_banner .T_ns").click(function(){
		$(".T_ns").addClass("T_tmmp").removeClass("T_ll");
		$(".T_ss").addClass("T_ksa").removeClass("T_nim");
//		$(".T_ns").removeClass("T_tmmp");
//		$(".T_ss").addClas("T_ksa");
	})
//	二
	$(".T_banner .T_nser").click(function(){
		$(".T_nser").addClass("T_tmmp").removeClass("T_ll");
		$(".T_sser").addClass("T_ksa").removeClass("T_nim");
	})
//	三
	$(".T_banner .T_nssan").click(function(){
		$(".T_nssan").addClass("T_tmmp").removeClass("T_ll");
		$(".T_sssan").addClass("T_ksa").removeClass("T_nim");
	})
//	四
	$(".T_banner .T_nssana").click(function(){
		$(".T_nssana").addClass("T_tmmp").removeClass("T_ll");
		$(".T_sssana").addClass("T_ksa").removeClass("T_nim");
	})
	
//	一
	$(".T_ss").click(function(){
		$(".T_ns").addClass("T_ll").removeClass("T_tmmp")
		$(".T_ss").addClass("T_nim").removeClass("T_ksa")
	})
//	二
	$(".T_sser").click(function(){
		$(".T_nser").addClass("T_ll").removeClass("T_tmmp")
		$(".T_sser").addClass("T_nim").removeClass("T_ksa")
	})
//	三
	$(".T_sssan").click(function(){
		$(".T_nssan").addClass("T_ll").removeClass("T_tmmp")
		$(".T_sssan").addClass("T_nim").removeClass("T_ksa")
	})
//	四
	$(".T_sssana").click(function(){
		$(".T_nssana").addClass("T_ll").removeClass("T_tmmp")
		$(".T_sssana").addClass("T_nim").removeClass("T_ksa")
	})
})












