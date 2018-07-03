
$(document).unbind("mousemove").bind("mousemove", function(r) {
	if($("body").hasClass("plat-mob")) return;
	var i = $(".section-bg-moveable");
	i.addClass("transition"), setTimeout(function() {
		i.removeClass("transition")
	}, 500)
	var s = -(.5 - event.clientX / n) * 30,
		o = (.5 - event.clientY / t) * 10,
		u = "translateX(" + -s + "px) translateY(" + o + "px)";
	i.css("transform", u)
}), $("#page-title").bind("click", function() {
	$(this).hasClass("active") ? u.close() : r.gotoSection(0)
})
		
			
				