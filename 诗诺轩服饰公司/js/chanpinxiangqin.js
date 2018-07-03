$(function(){
	fangdajing()
	
	var ull=document.getElementById("ull")
	var ill=ull.getElementsByTagName("li")
	var oll=document.getElementById("oll")
	var oli=oll.getElementsByTagName("li")
	var datu=document.getElementById("datukuang")
	var num=0
	var time=""
	
	for(var i=0;i<oli.length;i++){
		oli[i].setAttribute("index",i)
		oli[i].onclick=function(){
			move(this)
		}
	}

	function move(e){
		for(var j=0;j<oli.length;j++){
			oli[j].className=""
		}
		e.className="on"
		for(var k=0;k<ill.length;k++){
			if(e.attributes.index.value==k){
				ill[k].className="tou";
			}
			else{
				ill[k].className="";
			}
		}
		for(var w=0;w<$(".datukuang li").length;w++){
			if(e.attributes.index.value==w){
				$(".datukuang li")[w].className="chu";
			}
			else{
				$(".datukuang li")[w].className="";
			}
		}

	}
})
function fangdajing(){
	function Zoom(box, move, l, t, x, y, h_w, h_h, fangdajing) {
    var moveX = x - l - (h_w / 2);
    //鼠标区域距离
    var moveY = y - t - (h_h / 2);
    //鼠标区域距离
    if (moveX < 0) {
        moveX = 0
    }
    if (moveY < 0) {
        moveY = 0
    }
    if (moveX > box.width() - h_w) {
        moveX = box.width() - h_w
    }
    if (moveY > box.height() - h_h) {
        moveY = box.height() - h_h
    }
    //判断鼠标使其不跑出图片框
    var zoomX = fangdajing.width() / box.width()
    //求图片比例
    var zoomY = fangdajing.height() / box.height()
	
    $(".chu img").css({
        left: -(moveX * 4),
        top: -(moveY * 4)
    })
    move.css({
        left: moveX,
        top: moveY
    })
    //确定位置

}

	function Zoomhover(box, move, fangdajing) {
	    var l = box.offset().left;
	    var t = box.offset().top;
	    var w = move.width();
	    var h = move.height();
	    var time;
	    
	    $(".info_pic1 img,.move").mouseover(function(e) {
	        var x = e.pageX;
	        var y = e.pageY;
	        $(".move,.chu").show();
	        move.css("opacity", "0.3")
	        time = setTimeout(function() {
	            Zoom(box, move, l, t, x, y, w, h, fangdajing)
	        }, 1)
	    }).mousemove(function(e) {
	        var x = e.pageX;
	        var y = e.pageY;
	        time = setTimeout(function() {
	            Zoom(box, move, l, t, x, y, w, h, fangdajing)
	        }, 1)
	    }).mouseout(function() {
	        fangdajing.parent().hide()
	        move.hide();
	    })
	}
	$(function() {
	    Zoomhover($(".info_pic1 img"), $(".move"), $(".fangdajing img"));
	})
}