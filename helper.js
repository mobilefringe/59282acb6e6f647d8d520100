function init(e) {
    
    $(".dd_menu").click(function() {
        var id = $(this).attr("id");
        show_dd(id);
    });

    function show_dd(id){
        if ($("#s_sub_"+ id ).is(":visible")){ 
            $("#triangle_"+ id ).hide();
            $(".submenu_bar").slideUp()
            $("#s_sub_"+ id ).hide();               
        } else {
            if ($(".submenu_bar").is(":visible")){
                $(".main_menu li").css({"background":"white", "color":"#4d4d4f"});
                $(".triangle_down").hide();
                $("#triangle_"+id).show();
                $(".dd_submenu").hide();
                $("#s_sub_"+id).show();
                // $("#m"+id).css({"background":"#7b929d", "color":"white"});
            } else {
                $("#triangle_"+id).show();
                $("#s_sub_"+id).show();
                $(".submenu_bar").slideDown()
                // $("#m"+id).css({"background":"#7b929d", "color":"white"});
                
            }
            
        }
    }
    
}