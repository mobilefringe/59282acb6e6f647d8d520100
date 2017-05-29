function init(e) {
    
    
}

function show_content(){
    $('.yield').fadeIn();
    $(".modal-backdrop").remove();
    
    var today_hours = getTodaysHours();
    renderHomeHours('#home_hours_container', '#home_hours_template', today_hours)
}