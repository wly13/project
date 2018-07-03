$(document).ready(function () {
    var flag=true;
    $("#nav").click(function(){
        if(flag){
            flag=false;
            $(this).css({
                transition:"transform 0.5s",
                webkitTransition:"transform 0.5s",
                oTransition:"transform 0.5s",
                msTransition:"transform 0.5s",
                mozTransition:"transform 0.5s",
				opacity: "1",
                transform:"scale(1.5)",
                webkitTransform:"scale(1.5)",
                oTransform:"scale(1.5)",
                msTransform:"scale(1.5)",
                mozTransform:"scale(1.5)"
            });
            $("#out").css({
                transition:"left 0.8s,top 0.8s",
                webkitTransition:"left 0.8s, top 0.8s",
                oTransition:"left 0.8s, top 0.8s",
                msTransition:"left 0.8s, top 0.8s",
                mozTransition:"left 0.8s, top 0.8s",

                left:"-200px",
                top:"-200px"
            });
            $("#first").css({
                transition:"left 1.1s,top 1.1s",
                webkitTransition:"left 1.1s,top 1.1s",
                oTransition:"left 1.1s,top 1.1s",
                msTransition:"left 1.1s,top 1.1s",
                mozTransition:"left 1.1s,top 1.1s",

                left:"320px",
                top:"200px"
            });
            $("#second").css({
                transition:"left 1.1s,top 1.1s",
                webkitTransition:"left 1.1s,top 1.1s",
                oTransition:"left 1.1s,top 1.1s",
                msTransition:"left 1.1s,top 1.1s",
                mozTransition:"left 1.1s,top 1.1s",
                left:"310px",
                top:"240px"
            });
            $("#third").css({
                transition:"left 1.1s,top 1.1s",
                webkitTransition:"left 1.1s,top 1.1s",
                oTransition:"left 1.1s,top 1.1s",
                msTransition:"left 1.1s,top 1.1s",
                mozTransition:"left 1.1s,top 1.1s",
                left:"280px",
                top:"280px"
            });
            $("#four").css({
                transition:"left 1.1s,top 1.1s",
                webkitTransition:"left 1.1s,top 1.1s",
                oTransition:"left 1.1s,top 1.1s",
                msTransition:"left 1.1s,top 1.1s",
                mozTransition:"left 1.1s,top 1.1s",

                left:"240px",
                top:"310px"
            });
            $("#five").css({
                transition:"left 1.1s,top 1.1s",
                webkitTransition:"left 1.1s,top 1.1s",
                oTransition:"left 1.1s,top 1.1s",
                msTransition:"left 1.1s,top 1.1s",
                mozTransition:"left 1.1s,top 1.1s",
                left:"200px",
                top:"330px"
            });
            $("#six").css({
               transition:"left 1.1s,top 1.1s",
                webkitTransition:"left 1.1s,top 1.1s",
                oTransition:"left 1.1s,top 1.1s",
                msTransition:"left 1.1s,top 1.1s",
                mozTransition:"left 1.1s,top 1.1s",
                left:"150px",
                top:"330px"
            });
        }else{
            flag=true;
            $(this).css({
                transition:"transform 1s",
                webkitTransition:"transform 1s",
                oTransition:"transform 1s",
                msTransition:"transform 1s",
                mozTransition:"transform 1s",

                transform:"scale(1)",
                webkitTransform:"scale(1)",
                oTransform:"scale(1)",
                mozTransition:"scale(1)",
                msTransform:"scale(1)",
                opacity: "0.5"
            });
            $("#out").css({
                transition:"left 0.5s, top 0.5s",
                webkitTransition:"left 0.5s, top 0.5s",
                oTransition:"left 0.5s, top 0.5s",
                msTransition:"left 0.5s, top 0.5s",
                mozTransition:"left 0.5s, top 0.5s",
                left:"-550px",
                top:"-550px"
            });
            $("#first").css({
                transition:"left 1s,top 1s",
                webkitTransition:"left 1s,top 1s",
                oTransition:"left 1s,top 1s",
                msTransition:"left 1s,top 1s",
                mozTransition:"left 1s,top 1s",
                left:"-100px",
                top:"-100px"
            });
            $("#second").css({
                transition:"left 1s,top 1s",
                webkitTransition:"left 1s,top 1s",
                oTransition:"left 1s,top 1s",
                msTransition:"left 1s,top 1s",
                mozTransition:"left 1s,top 1s",
                left:"-100px",
                top:"-100px"
            });
            $("#third").css({
                transition:"left 1s,top 1s",
                webkitTransition:"left 1s,top 1s",
                oTransition:"left 1s,top 1s",
                msTransition:"left 1s,top 1s",
                mozTransition:"left 1s,top 1s",
                left:"-100px",
                top:"-100px"
            });
            $("#four").css({
                transition:"left 1s,top 1s",
                webkitTransition:"left 1s,top 1s",
                oTransition:"left 1s,top 1s",
                msTransition:"left 1s,top 1s",
                mozTransition:"left 1s,top 1s",
                left:"-100px",
                top:"-100px"
            });
            $("#five").css({
                transition:"left 1s,top 1s",
                webkitTransition:"left 1s,top 1s",
                oTransition:"left 1s,top 1s",
                msTransition:"left 1s,top 1s",
                mozTransition:"left 1s,top 1s",
                left:"-100px",
                top:"-100px"
            });
            $("#six").css({
                transition:"left 1s,top 1s",
                webkitTransition:"left 1s,top 1s",
                oTransition:"left 1s,top 1s",
                msTransition:"left 1s,top 1s",
                mozTransition:"left 1s,top 1s",
                left:"-100px",
                top:"-100px"
            });
        }
    });
});


