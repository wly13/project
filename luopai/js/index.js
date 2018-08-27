var T=1000*10;
$(function(){
	moving(T);
	
	$("#moveing").hover(function(){
		$(this).stop()
	},function(){
		var t=($("#moveing").width()/2-Math.abs(parseFloat($(this).css("left"))))/(($("#moveing").width()/2)/T);
		moving(t);
	})

})

function moving(e){
	$("#moveing").animate({left:-$("#moveing").width()/2},e,"linear",function(){
		$(this).css("left",0);
		moving(T);
	})
}

