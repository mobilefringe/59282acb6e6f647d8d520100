function init(e) {
    get_instagram("//dixieoutlet.mallmaverick.com/api/v2/dixieoutlet/social.json", 9, 'thumbnail', render_instagram);
    
}

function show_content(){
    $('.yield').fadeIn();
    $(".modal-backdrop").remove();
    
    var today_hours = getTodaysHours();
    renderHomeHours('#home_hours_container', '#home_hours_template', today_hours)
}