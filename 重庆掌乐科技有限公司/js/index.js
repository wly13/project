var page=1
$(function(){
	ajax1();
	ajax2();
	ajax3();
//	产品中心
	$(".P_list_xuan li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		var index=$(this).index();
		$(".P_list_main>div").eq(index).addClass("P_main_on").siblings().removeClass("P_main_on")
	})
	$(".P_list_main1 li").mousemove(function(){
		$(this).children().css({
			'color':'#437CB8'
		})
	}).mouseout(function(){
		$(this).children().css({
			'color':'#000'
		})
	})
	
	$(".P_list_main2 li").mousemove(function(){
		$(this).children().css({
			'color':'#437CB8'
		})
	}).mouseout(function(){
		$(this).children().css({
			'color':'#000'
		})
	})
	
	$(".P_list_xuan1 li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		var index=$(this).index();
		$(".P_list_main>div").eq(index).addClass("P_main_on").siblings().removeClass("P_main_on")
	})
//	新闻中心
	$(".news_list_xuan li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		var index=$(this).index();
		$(".news_list_main>div").eq(index).addClass("N_L_on").siblings().removeClass("N_L_on")
	})
	
	$(".news_list_xuan1 li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		var index=$(this).index();
		$(".news_list_main>div").eq(index).addClass("N_L_on").siblings().removeClass("N_L_on")
	})
	
	$(".fanye li").click(function(){
		$(this).addClass("N_on").siblings().removeClass("N_on")
		page=$(".fanye li.N_on").index()
		ajax1()
		ajax2()
		ajax3()
	})
	$(".N_pre").click(function(){
		$(".fanye li.N_on").prev('li').addClass('N_on').siblings().removeClass('N_on')
		page--
		if(page<=1){
			page=1
		}
		ajax1()
		ajax2()
		ajax3()
	})
	$(".N_next").click(function(){
		$(".fanye li.N_on").next('li').addClass('N_on').siblings().removeClass('N_on')
		page++
		if(page>=4){
			page=4
		}
		ajax1()
		ajax2()
		ajax3()
	})
	$(".news_list_xuan li").click(function(){
		if(page=$(".fanye li.N_on").index()){
			page=1
		}
		$(".fanye li.N_on").eq(0).addClass('N_on').siblings().removeClass('N_on')
		ajax1()
		ajax2()
		ajax3()
	})
//新闻详情
	$(".news_info_xuan li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		$(".P_mianbao p").text("")
		$(".news_info .fanye").addClass('fanye_on')
		var index=$(this).index();
		$(".news_info_main>div").eq(index).addClass("news_info_on").siblings().removeClass("news_info_on")
		
		
	})

//关于我们
	$(".A_list_xuan li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		var index=$(this).index();
		$(".A_Main>div").eq(index).addClass("A_Main_on").siblings().removeClass("A_Main_on")
	})
	
	$(".A_list_xuan1 li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		var index=$(this).index();
		$(".A_Main>div").eq(index).addClass("A_Main_on").siblings().removeClass("A_Main_on")
	})
	
//招聘人才
	$(".R_mian_top span").click(function(){
		$(this).addClass("R_mian_on").siblings().removeClass("R_mian_on")
		var index=$(this).index()
		$(".R_mian_list>div").eq(index).addClass("R_list_on").siblings().removeClass("R_list_on")
	})
	
	
//	首页
	$(".join_tu").mousemove(function(){
		$(this).siblings("div").addClass("join_tu_on1")
	}).mouseout(function(){
		$(this).siblings("div").removeClass("join_tu_on1")
	})


//	首页正则判断
	var text1=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9])|(17[1,5,7-9]))\\d{8}$/;
	$("#tel").change(function(){
		var vol=$("#tel").val()
		if(text1.test(vol)){
			console.log(1)
		}else{
			alert("不是有效的电话")
		}
	}).keyup(function(){
		$(this).val($(this).val().replace(/\D|^0/g,''))
//		alert("输入的不是数字")
	})
	var text2=/^[\u4E00-\u9FA5A-Za-z]+$/
	 	$("#name").change(function(){
     	 	 var vol1=$("#name").val() ;
      	if(text2.test(vol1)){
        console.log(1)
       	}else{
       	 	alert("名字不是有效的")
       	}
    });
    
    $(".join_main_tpo .shixi").click(function(){
    	$(".join_mian_xian1").addClass("join_xian_on")
    	$(".join_mian_xian").removeClass("join_xian_on")
    })
    $(".join_main_tpo .zhengshi").click(function(){
    	$(".join_mian_xian").addClass("join_xian_on")
    	$(".join_mian_xian1").removeClass("join_xian_on")
    })
    
	
	$(".join_main_info li").eq(0).click(function(){
		$(this).children().eq(0).addClass("join_tu_on1")
		$(".join_main_info li").eq(1).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(2).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(3).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(4).children().eq(0).removeClass("join_tu_on1")
//		$(this).siblings().children().eq(0).removeClass("join_tu_on1")
		
		$(this).children().eq(2).addClass("join_tu_on")
		$(".join_main_info li").eq(1).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(2).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(3).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(4).children().eq(2).removeClass("join_tu_on")
		
		
		$(this).children().eq(0).children().eq(0).addClass("join_tu_yin").siblings().addClass("join_tu1")
		$(".join_main_info li").eq(1).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(2).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(3).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(4).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")

	})
	$(".join_main_info li").eq(1).click(function(){
		$(this).children().eq(0).addClass("join_tu_on1")
		$(".join_main_info li").eq(0).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(2).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(3).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(4).children().eq(0).removeClass("join_tu_on1")
//		$(this).siblings().children().eq(0).removeClass("join_tu_on1")
		
		$(this).children().eq(2).addClass("join_tu_on")
		$(".join_main_info li").eq(0).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(2).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(3).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(4).children().eq(2).removeClass("join_tu_on")
		
		$(this).children().eq(0).children().eq(0).addClass("join_tu_yin").siblings().addClass("join_tu1")
		$(".join_main_info li").eq(0).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(2).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(3).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(4).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		
	})
	$(".join_main_info li").eq(2).click(function(){
		$(this).children().eq(0).addClass("join_tu_on1")
		$(".join_main_info li").eq(1).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(0).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(3).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(4).children().eq(0).removeClass("join_tu_on1")
//		$(this).siblings().children().eq(0).removeClass("join_tu_on1")
		
		$(this).children().eq(2).addClass("join_tu_on")
		$(".join_main_info li").eq(1).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(0).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(3).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(4).children().eq(2).removeClass("join_tu_on")
		
		$(this).children().eq(0).children().eq(0).addClass("join_tu_yin").siblings().addClass("join_tu1")
		$(".join_main_info li").eq(1).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(0).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(3).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(4).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
	})
	$(".join_main_info li").eq(3).click(function(){
		$(this).children().eq(0).addClass("join_tu_on1")
		$(".join_main_info li").eq(1).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(2).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(0).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(4).children().eq(0).removeClass("join_tu_on1")
//		$(this).siblings().children().eq(0).removeClass("join_tu_on1")
		
		$(this).children().eq(2).addClass("join_tu_on")
		$(".join_main_info li").eq(1).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(2).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(0).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(4).children().eq(2).removeClass("join_tu_on")
		
		$(this).children().eq(0).children().eq(0).addClass("join_tu_yin").siblings().addClass("join_tu1")
		$(".join_main_info li").eq(1).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(2).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(0).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(4).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
	})
	
	$(".join_main_info li").eq(4).click(function(){
		$(this).children().eq(0).addClass("join_tu_on1")
		$(".join_main_info li").eq(1).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(2).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(3).children().eq(0).removeClass("join_tu_on1")
		$(".join_main_info li").eq(0).children().eq(0).removeClass("join_tu_on1")
//		$(this).siblings().children().eq(0).removeClass("join_tu_on1")
		
		$(this).children().eq(2).addClass("join_tu_on")
		$(".join_main_info li").eq(1).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(2).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(3).children().eq(2).removeClass("join_tu_on")
		$(".join_main_info li").eq(0).children().eq(2).removeClass("join_tu_on")
		
		$(this).children().eq(0).children().eq(0).addClass("join_tu_yin").siblings().addClass("join_tu1")
		$(".join_main_info li").eq(1).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(2).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(3).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
		$(".join_main_info li").eq(0).children().eq(0).children().eq(0).removeClass("join_tu_yin").siblings().removeClass("join_tu1")
	})

    
    
    
    
//  产品详情
	$(".P_info .P_list_xuan li").click(function(){
		$(this).addClass("P_list_on").siblings().removeClass("P_list_on")
		$(this).children().addClass("P_san_on")
		$(this).siblings().children().removeClass("P_san_on")
		$(".P_mianbao p").text("")
		var index=$(this).index();
		$(".P_info_main>div").eq(index).addClass("P_info_on").siblings().removeClass("P_info_on")
	})
    
  
})
function ajax1(){
	$.ajax({
		type:"GET",
		    url:"http://api.tianapi.com/keji/?key=b8c78b3926d953a69417c97a3db2a591&num=10&page="+page+"",
		    dataType:"json",
		success:function(data){
			var tinda=""
		for(var i=0; i<10; i++){
	    tanxin="<div class='col-lg-12 '><a href='news_info.html'><span class='col-lg-8  N_desc'>"+data["newslist"][i]["title"]+"</span><span class='col-lg-4 N_time pull-right'>"+data["newslist"][i]["ctime"]+"</span></a></div>"
		   tinda+=tanxin
		}
			$(".N_L_main1").html(tinda)
		}
	});
};

function ajax2(){
	$.ajax({
		type:"GET",
		    url:"http://api.tianapi.com/it/?key=b8c78b3926d953a69417c97a3db2a591&num=10&page="+page+"",
		    dataType:"json",
		success:function(data){
			var tinda=""
		for(var i=0; i<10; i++){
	    tanxin="<div class='col-lg-12 '><a href='news_info.html'><span class='col-lg-8 N_desc'>"+data["newslist"][i]["title"]+"</span><span class='col-lg-4 N_time pull-right'>"+data["newslist"][i]["ctime"]+"</span></a></div>"
		   tinda+=tanxin
		}
			$(".N_L_main2").html(tinda)
		}
	});
};

function ajax3(){
	$.ajax({
		type:"GET",
		    url:"http://api.tianapi.com/mobile/?key=b8c78b3926d953a69417c97a3db2a591&num=10&page="+page+"",
		    dataType:"json",
		success:function(data){
			var tinda=""
		for(var i=0; i<10; i++){
	    tanxin="<div class='col-lg-12 '><a href='news_info.html'><span class='col-lg-8 N_desc'>"+data["newslist"][i]["title"]+"</span><span class='col-lg-4 N_time pull-right'>"+data["newslist"][i]["ctime"]+"</span></a></div>"
		   tinda+=tanxin
		}
			$(".N_L_main3").html(tinda)
		}
	});
};