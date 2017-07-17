function init(e) {
    $('<div class="modal-backdrop custom_backdrop"><div class="loader">Loading...</div></div>').appendTo(document.body);
    
    get_instagram("//thegateway.mallmaverick.com/api/v3/thegateway/social.json", 1, 'standard_resolution', render_instagram_single);
    get_instagram_feed("//thegateway.mallmaverick.com/api/v3/thegateway/social.json", 6, 'standard_resolution', render_instagram);
    
    // jQuery(document).ready(function ($) {
    $(window).scroll(function(){
        var scrollTop = 142;
		if($(window).scrollTop() >= scrollTop){
			$('.nav_container').css({
				position : 'fixed',
				top : '0'
			});
			$('.nav_container').addClass('.sticky');
		}
		if($(window).scrollTop() < scrollTop){
			$('.nav_container').removeAttr('style');	
			$('.nav_container').removeClass('.sticky');
		}
	})
	
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
    
    $(".flex-prev").html(" ");
    $(".flex-next").html(" ");
    
    $(".alpha_list a").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(id).offset().top -75
        }, 1500);
    });
    
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    
    $('#subForm').submit(function(e){
        e.preventDefault();
        // if ($("#newsletter_agree").prop("checked") != true){
        //     alert("Please agree to receive newsletters from " + site_json.name + "." );
        //     $("#newsletter_agree").focus();
        //     return false;
        // }
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Please try again later.");
                } else { // 200
                    $("#success_subscribe").fadeIn()
                    $('#success_subscribe').delay(2000).fadeOut();
                    $('#subForm').trigger('reset')
                }
            }
        );
    });
}

function add_landmark(store_x_coordinate, store_y_coordinate, pin_id, store_name){
	var name = store_name;
	var x_coordinate = store_x_coordinate;
	var y_coordinate = store_y_coordinate;
	var mark = "mark_store_" + pin_id;

    // Remove existing landmark
    $('#zoom_image').smoothZoom('removeLandmark');

	// Add new landmark
	$('#zoom_image').smoothZoom('addLandmark', 
		[
		'<div class="item mark" data-show-at-zoom="0" data-position="' + x_coordinate + ',' + y_coordinate + '" id="' + mark + '">\
			<div>\
				<div class="text">\
				<strong>' + name + '</strong>\
			</div>\
			<img src="//codecloud.cdn.speedyrails.net/sites/589e308f6e6f641b9f010000/image/png/1484850466000/show_pin.png" width="40px" height="65px" alt="' + name +'" />\
			</div>\
		</div>'
		]
	);

	// Focus on new landmark
	$('#zoom_image').smoothZoom('focusTo',{
		x: x_coordinate,
		y: y_coordinate,
		zoom: 120,
		speed: 5
	});
}

function load_more(num){
    var n = parseInt(num);
    for(i = n; i < n + 3; i++){
        var id = i.toString();
        $('#show_' + id ).fadeIn();
    }
    var posts = getBlogDataBySlug('thegateway-blog').posts;
    var total_posts = posts.length;
    if(i >= total_posts){
        $('#loaded_posts').hide();
        $('#all_loaded').show();
    }
    $('#num_loaded').val(i);
}

function render_instagram_single(data){
    $('.instafeed_single').html(data)
}

function render_instagram(data){
    $('#instafeed').html(data)
}

function get_instagram_feed(url, total, size, callback){
    var html = '<div class="insta ih-item circle effect19"><a class="ig-image" target="_blank" href="{{{link}}}"><img src="{{{image}}}" alt="{{caption}}"/><div class="info"><div class="content"><p>{{{caption_short}}}</p></div></div></a></div>'
    var item_rendered = [];
    Mustache.parse(html); 
    log('fetching instagram data from: ' + url);
    $.getJSON(url).done(function(data) {
        var insta_feed = data.social.instagram
        if(insta_feed != null){
            main_feed = insta_feed.splice(1,6);
            $.each(main_feed, function(i,v){
                var feed_obj = {}
                if(v.caption != null){
                    if(v.caption.text.length > 100){
                        feed_obj.caption_short = v.caption.text.substring(0,99) + "...";
                    }
                    // feed_obj.caption = v.caption.text
                }
                else{
                    feed_obj.caption = ""
                }
                feed_obj.image = v.images[size].url
                feed_obj.link = v.link
                if (i < total){
                    
                    var ig_rendered =  Mustache.render(html,feed_obj);
                    item_rendered.push(ig_rendered.trim());
                }
            })
            callback(item_rendered.join(''))
        }
    });
}

// <a class="ig-image" target="_blank" href="{{{link}}}" ><img src="{{{image}}}" alt="{{caption}}" /></a>

function show_cat_stores(){
    $('.show_cat_stores').click(function(e){
        var cat_id = $(this).attr('data-id');
        var cat_name = $(this).attr('name');
        var rows = $('.cats_row');
        if(cat_id != "000") {
            rows.hide();
            // $('#cat_name').text($(this).text());
            // $('#cat_name').css('display', 'block');
            $.each(rows, function(i, val){
                var cat_array = val.getAttribute('data-cat').split(',');
                if ($.inArray(cat_id, cat_array) >= 0){
                    $(val).show();
                }
            });
            $(".store_initial").css("display", "none");
        } else {
            rows.show();
            // $.each($('.store_initial'), function(i, val){
            //     if ($(val).text().length > 0){
            //         $(val).show();
            //     } 
            // });
            $('#cat_name').hide();    
        }
        $('.dropdown-menu .cat_list').css('display', 'none');
        $('#store_cat_list').html(cat_name + '<span class="dropdown_arrow"><img src="//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1489097373000/Expand Arrow.png" alt=""></span>');
        $('html, body').animate({scrollTop : 0},800);
        e.preventDefault();
    });
}

function show_content(){
    $('.page_content').fadeIn();
    $('.custom_backdrop').remove();
    
    // BANNER MESSAGE
    $.getJSON("//thegateway.mallmaverick.com/api/v3/thegateway/messages.json").done(function(data){
        var messages = data.messages.bulletin
        if (messages != undefined){
            if (messages.length == 0){
                $('.news-ticker').hide();
            } else {
                $.each(messages, function(key ,val){
                    $('#bulletin').append('<li class="caps"><strong>' + val.messages[0].title + ' </strong>'  + val.messages[0].body +  '</li>')
                });
            $('.news-ticker').show();
            }
        } else {
            $('.news-ticker').hide();
        }
    });

    // MARQUEE SCROLL EFFECT 
    $(function(){
        var window_width = $( window ).width();
        if (window_width < 769) {
            $('a').removeClass('open_details_modal');
        }
        var marquee = {
            init: function(){
                $('.marquee').css({
                    overflow: 'hidden'
                  });
                marquee.loop();
            },
            loop: function(){
                if (window_width > 769) {
                    $('.marquee .news-ticker').css({
                        position: 'relative',
                        right: '-100%'
                    }).animate({
                        right: '200%'
                    }, 15000, 'linear' );
                } else {
                    $('.marquee .news-ticker').css({
                        position: 'relative',
                        right: '-100%'
                    }).animate({
                        right: '300%'
                    }, 15000, 'linear' );
                }
                setTimeout(marquee.loop, 15010);
            }
        };
        marquee.init();
    });
    
    //WEATHER
    $.simpleWeather({
        location: 'Salt Lake City, Utah',
        woeid: '',
        unit: 'f',
        success: function(weather) {
            html = '<i class="icon-'+weather.code+'"></i><p>' + weather.temp + '&deg;' + weather.units.temp + '</p>';
            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
    
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

$('#subForm').submit(function (e) {
    // if ($("#agree_terms").prop("checked") != true){
    //     alert("Please agree to the term and conditions.");
    //     $("#agree_terms").focus();
    //     return false;
    // }
    e.preventDefault();
    $.getJSON(
        this.action + "?callback=?",
        $(this).serialize(),
        function (data) {
            if (data.Status === 400) {
                alert("Please try again later.");
            } else { // 200
                $('#subForm').trigger('reset');
                $("#success_subscribe").fadeIn();
            }
    });
});