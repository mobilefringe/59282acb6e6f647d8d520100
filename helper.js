function init(e) {
    get_instagram("//dixieoutlet.mallmaverick.com/api/v2/dixieoutlet/social.json", 6, 'thumbnail', render_instagram);
    
    $(".alpha_list a").click(function(e) {
        e.preventDefault();
        var id = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(id).offset().top -220
        }, 1500);
    });
}

function drop_pin(id){
    map.marksHide();
    var coords = map.get_coords(id);
    var height = parseInt(coords["height"]);
    var width = parseInt(coords["width"]);
    var x_offset = (parseInt(width) / 2);
    var y_offset = (parseInt(height) / 2);
    map.setMarks([{ xy: [coords["x"] - 27 + x_offset, coords["y"] - 72 + y_offset],
        attrs: {
            src:  '//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1492031824000/northside_map_pin-01.png'
        }
    }]);
    map.setViewBox(id);
    $('#btnZoomIn').click()
}

function load_store_map(reg, store_details){
    this_region = {};
    this_region = store_details.svgmap_region;
    map = $('#mapsvg_store_detail').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa', hover: 0},
        disableAll: true,
        height:335,
        width:848,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'left' },
        pan:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,5],
        viewBox:[420,420,1650,1650]
    });
    // map.setViewBox(store_details.svgmap_region);
    map.selectRegion(store_details.svgmap_region);
    drop_pin(store_details.svgmap_region);
}

function render_instagram(data){
    $('#instafeed').html(data)
}

function show_content(){
    $('.yield').fadeIn();
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

var default_image = {
    "image_url" : "//codecloud.cdn.speedyrails.net/sites/58bdb9106e6f644783090000/image/png/1490119146000/northside_logo_default.png",
}