function init(e) {
    $('<div class="modal-backdrop custom_backdrop"><div class="loader">Loading...</div></div>').appendTo(document.body);
    
    get_instagram("//northside.mallmaverick.com/api/v2/northside/social.json", 10, 'thumbnail', render_instagram);
    
    $('#menu-icon').click(function(){
		$(this).toggleClass('open');
		$('#mobile_nav').slideToggle();
		$('body').toggleClass('no_scroll');
	});
    
    $("#signup").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(id).offset().top -75
        }, 1500);
        $("#fieldEmail").focus();
    });
    
    $(".alpha_list a").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(id).offset().top -75
        }, 1500);
    });
    
    // BANNER MESSAGE
    $.getJSON("//thegateway.mallmaverick.com/api/v3/thegateway/messages.json").done(function(data){
        var messages = data.messages.bulletin
        if (messages != undefined){
            if (messages.length == 0){
                $('.news-ticker').hide();
            } else {
                $.each(messages, function(key ,val){
                    $('#bulletin').append('<li><strong>' + val.messages[0].title + ' </strong>'  + val.messages[0].body +  '</li>')
                });
                if ($('#bulletin li').length > 1){
                    var tickerSpeed = $('.news-ticker').attr('data-speed');
                    $('.news-ticker ul li').hide();
                    $('.news-ticker ul li:first').show();
                    
                    var currentSlide = 0;
                    var slideCount = ($('.news-ticker li').length) - 1;
                    
                    var startTicker = setInterval(function(){
                        $('.news-ticker ul li').eq(currentSlide).fadeOut(500)
                        
                        if (currentSlide < slideCount) {
                            currentSlide += 1;
                        } else {
                            currentSlide = 0;
                        }
                        
                        $('.news-ticker ul li').eq(currentSlide).fadeIn(500)
                    
                    }, tickerSpeed);
                }
            $('.news-ticker').show();
            }
        } else {
            $('.news-ticker').hide();
        }
    });
    
    //WEATHER
    $.ajax({
        url : "http://api.wunderground.com/api/Your_Key/geolookup/conditions/q/IA/Cedar_Rapids.json",
        dataType : "jsonp",
        success : function(parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            alert("Current temperature in " + location + " is: " + temp_f);
        }
    });
});
}

function render_instagram(data){
    $('#instafeed').html(data)
}

function show_content(){
    $('.page_content').fadeIn();
    $(".modal-backdrop").remove();
    
    var today_hours = getTodaysHours();
    renderHomeHours('#home_hours_container', '#home_hours_template', today_hours)
}

function show_png_pin(trigger, map){
    $(trigger).bind("change", function(e) {
        e.preventDefault()
        
        var selectedOption = $("select.mapper").val().split(",");
        var selectedOptionName = $(".mapper option:selected").text();
        
        var isMobile = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
        // coords = $(selectedOption).attr('data-value').split(",");
        var zoomData = $(map).smoothZoom('getZoomData');
        x_coord = parseInt(selectedOption[0]) + 5;
        y_coord = parseInt(selectedOption[1]);
    
        $(map).smoothZoom('removeLandmark')
        if (isMobile) {
            $(map).smoothZoom('focusTo', {x:x_coord, y:y_coord, zoom:100});    
        } else {
            $(map).smoothZoom('focusTo', {x:x_coord, y:y_coord, zoom:150});
        }
        
        $(map).smoothZoom('addLandmark', 
			[
			'<div class="item mark" data-show-at-zoom="0" data-position="' + x_coord + ',' + y_coord + '">\
				<div>\
					<div class="text">\
					<strong>'+ selectedOptionName + '</strong>\
				</div>\
				<img src="//www.mallmaverick.com/system/sites/map_markers/000/000/027/original/map_marker.png?1417461836" width="45px" height="59px" alt="marker" />\
				</div>\
			</div>'
			]
		);
    });
}

function store_search() {
    $('#close_search_results').click(function(){
        $(this).hide();
        $('#store_search_img').show();
        $('#store_search_results').html('');
        $('#store_search_results').hide();
        $('#store_search').val('')
    });
    $('#store_search').keyup(function(){
        if ($('#store_search').val() == ""){
            $('#store_search_results').html('');
            $('#store_search_results').hide();
            $('#close_search_results').hide();
        } else {
            $('#store_search_img').hide();
            $('#close_search_results').show();
            $('#store_search_results').html('');
            
            var val = $(this).val().toLowerCase();
            var results = getSearchResults(val);
            var s_stores = results.stores;
            
            if(s_stores != undefined && s_stores.length > 0){
                $.each(s_stores, function(i, v){
                    var div_stores = "<div class='store_search_list'>";
                    div_stores = div_stores + "<h4><a href='/stores/" + v.slug + "'>" + v.name + "</a></h4>";
                    div_stores = div_stores + "</div>";
                    $('#store_search_results').append(div_stores);
                    $('#store_search_results').show();
                });
            }
        }
    });
}

function submit_contest(slug) {
    var contest_entry = {};
    var contest_data = {};
    contest_data.first_name = $('#first_name').val();
    contest_data.last_name = $('#last_name').val();
    contest_data.email = $('#email').val();
    contest_data.phone = $('#phone_number').val();
    contest_data.postal_code = $('#postal_code').val();
    contest_data.age = $('#age').val();
    contest_data.gender = $('#gender').val();
    contest_data.newsletter = $('#newsletter_signup').prop("checked");
    
    contest_entry.contest = contest_data;
    
    var propertyDetails = getPropertyDetails();
    var host = propertyDetails.mm_host.replace("http:", "");
    var action = host + "/contests/" + slug + "/create_js_entry"
    $.ajax({
        url : action,
        type: "POST",
        data : contest_entry,
        success: function(data){
           $('#succes_msg').show();
           $('.contest_btn').prop('disabled', false);
           $('#contest_form').trigger('reset');
        },
        error: function (data){
            alert('An error occured while processing your request. Please try again later!')
        }
    });
}

var default_image = {
    "image_url" : "//codecloud.cdn.speedyrails.net/sites/59282acb6e6f647d8d520100/image/png/1496850961000/LogoBox.png",
}