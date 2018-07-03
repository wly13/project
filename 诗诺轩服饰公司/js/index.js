$(function(){
	$(window).scroll(function(){
		show()
	})
})
function show(){
	var winH=$(window).height()
//	console.log(winH)
	var scH=$(window).scrollTop()
//	console.log(scH)
	var fa=$(".W_Fashion li").offset().top
	var bj=$(".W_beijing").offset().top
	var pt=$(".W_product_top").offset().top
	var pr=$(".W_product li").offset().top
	var cl=$(".W_culture").offset().top
	var ne=$(".W_news").offset().top
	var ab=$(".W_aboutus").offset().top
   
	console.log(fa)
	console.log(bj)
	console.log(pr)
	console.log(cl)
	console.log(ne)
	console.log(ab)
//	console.log(winH+scH)
//	console.log(scH-(winH+fa))
	var cha=winH+scH
	console.log(cha)
	if(fa<cha){
		$(".W_Fashion li").animate({
			'opacity':'1',
		},2000)
	}
	if(bj<cha){
		$(".W_beijing").animate({
			'opacity':'1',
			'left':'250px'
		},2000)
	}
	if(pr<cha){
		$(".W_product_top").animate({
			'opacity':1,
		},2000)
	}
	if(pr<cha){
		$(".W_product li").animate({
			'opacity':1,
		},2000)
	}
	if(cl<cha){
		$(".W_culture").animate({
			'opacity':1,
		},2000)
	}
	if(ab<cha){
		$(".W_aboutus").animate({
			'opacity':1,
		},2000)
	}
	if(ne<cha){
		$(".W_news").animate({
			'opacity':1,
		},2000)
	}
}
