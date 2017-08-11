/*Created 2017-05-29  by Caitlin*/
function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
       
        start.setDate(start.getDate());
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
        }
        if (start <= today){
            if (val.end_date){
                end = new Date (val.end_date);
                end.setDate(end.getDate() + 1);
                if (end >= today){
                    item_list.push(val);  
                }
             
            } else {
                item_list.push(val);
            }
        }
    });
    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(home_banner).html(item_rendered.join(''));
}

function renderContest(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses

    collection.alt_photo_url = getImageURL(collection.photo_url);
    collection.property_name = getPropertyDetails().name;
    var rendered = Mustache.render(template_html,collection);
    item_rendered.push(rendered);

    $(container).html(item_rendered.join(''));
}

function renderEvents(container, template, collection){
    var mall_name = getPropertyDetails().name;
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        // if (val.eventable_type == "Store") {
        //     var store_details = getStoreDetailsByID(val.eventable_id);
        //     val.store_detail_btn = store_details.slug ;
        //     val.store_name = store_details.name;
            
        //     // var store_front_image = getStoreDetailsBySlug(val.store_detail_btn).gallery;
        //     // var store_logo = getStoreDetailsBySlug(val.store_detail_btn).store_front_url_abs;
            
        //     // if(store_front_image != undefined) {
        //     //     val.image_url = "//mallmaverick.com" + store_front_image;
        //     // }
        //     // if(store_front_image === undefined){
        //     //     val.image_url = store_logo;
        //     // }
        //     // if(store_logo.indexOf('missing.png') > 0){
        //     //     val.image_url  = default_image.image_url;
        //     // }
        // }
        // else{
            val.store_name = "The Gateway";
            val.image_url = val.event_image_url_abs;
            val.logo  = default_image.image_url;
            if(val.image_url.indexOf('missing.png') > 0){
                val.image_url  = val.logo;
            }
        // }
        
        if (val.name.length > 30){
            val.name_short = val.name.substring(0,30) + "...";
        }
        else {
            val.name_short = val.name;
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D")
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEventDetails(container, template, collection){
    var mall_name = getPropertyDetails().name;
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        val.image_url = getImageURL(val.event_image_url);
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_show = "display:none";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D")
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderFeatureItems(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
        }
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderGallery(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.photo_url.indexOf('missing.png') > -1) {
            val.gallery_image = "";
        } else {
            val.gallery_image = "//www.mallmaverick.com" + val.photo_url;
        }

        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHomeHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);    
    $.each( item_list , function( key, val ) {
        var d = moment();
        switch(val.day_of_week) {
            case 0:
                val.day = "Sunday";
                break;
            case 1:
                val.day = "Monday";
                break;
            case 2:
                val.day = "Tuesday";
                break;
            case 3:
                val.day = "Wednesday";
                break;
            case 4:
                val.day = "Thursday";
                break;
            case 5:
                val.day = "Friday";
                break;
            case 6:
                val.day = "Saturday";
                break;
        }
        if (val.open_time && val.close_time && (val.is_closed == false || val.is_closed == null)){
            var open_time = moment(val.open_time).tz(getPropertyTimeZone());
            var close_time = moment(val.close_time).tz(getPropertyTimeZone());
            val.open = "Open Today";
            val.hours = open_time.format("h a") + " - " + close_time.format("h a");
        } else {
            val.open = "Closed Today";
            val.hours = "";
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHours(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    if (type == "reg_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == false) {
                switch(val.day_of_week) {
                    case 0:
                        val.day = "Sunday";
                        break;
                    case 1:
                        val.day = "Monday";
                        break;
                    case 2:
                        val.day = "Tuesday";
                        break;
                    case 3:
                        val.day = "Wednesday";
                        break;
                    case 4:
                        val.day = "Thursday";
                        break;
                    case 5:
                        val.day = "Friday";
                        break;
                    case 6:
                        val.day = "Saturday";
                        break;
                }
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = moment(val.open_time).tz(getPropertyTimeZone());
                    var close_time = moment(val.close_time).tz(getPropertyTimeZone());
                    val.h = open_time.format("h a") + " - " + close_time.format("h a");
                } else {
                    "Closed";
                }
                
                item_list.push(val);
            }
        });
        collection = [];
        collection = item_list;
    }
    if (type == "holiday_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = moment(val.holiday_date).tz(getPropertyTimeZone());
                var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                val.formatted_date = holiday.format("dddd MMM D YYYY");
                if (val.open_time && val.close_time && val.is_closed == false){
                    
                    
                    var open_time = moment(val.open_time).tz(getPropertyTimeZone());
                    var close_time = moment(val.close_time).tz(getPropertyTimeZone());
                    val.h = open_time.format("h a") + " - " + close_time.format("h a");
                } else {
                    val.h = "Closed";
                }
                item_list.push(val);
            }
        });
        collection = [];
        collection = item_list;
    }
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);

    });
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderJobs(container, template, collection){
    var mall_name = getPropertyDetails().name;
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.jobable_type == "Store"){
            val.store_name = getStoreDetailsByID(val.jobable_id).name;
            val.store_slug = getStoreDetailsByID(val.jobable_id).slug;
            val.image_url = getStoreDetailsByID(val.jobable_id).store_front_url_abs;
        }
        else{
            val.store_name = mall_name;
            val.image_url = default_image.image_url;
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D");
            val.end_date = end.format("MMM D");
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderJobDetails(container, template, collection){
    var mall_name = getPropertyDetails().name;
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.jobable_type == "Store") {
            var store_details = getStoreDetailsByID(val.jobable_id);
            val.store_detail_btn = store_details.slug;
            val.store_name = store_details.name;
            if (store_details.store_front_url_abs.indexOf('missing.png') > -1){
                val.image_url = default_image.image_url;
            }
            else{
                val.image_url = store_details.store_front_url_abs;
            }
        }
        else{
            val.store_name = mall_name;
            val.image_url = default_image.image_url;
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderSinglePost(container, template, main_post){
    var item_list = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses

    if (main_post.image_url.indexOf('missing.png') > 0) {
        main_post.post_image = "";
    } else {
        main_post.post_image = main_post.image_url;
    }
    
    if(main_post.title.length > 45){
        main_post.title_short = main_post.title.substring(0, 44) + "...";
    } else {
        main_post.title_short = val.title;
    }
        
    if(main_post.body.length > 175){
        main_post.description_short = main_post.body.substring(0,175) + "...";
    } else {
        main_post.description_short = main_post.body;
    }
    
    main_post.description_short = main_post.description_short.replace("&amp;", "&");
    
    main_post.slug = "posts/" + main_post.slug;
    
    main_post.twitter_title = main_post.title + " via @ShopTheGateway";
    
    var rendered = Mustache.render(template_html, main_post);
    item_list.push(rendered);
    $(container).html(item_list.join(''));
}

function renderPosts(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    var counter = 1;
    Mustache.parse(template_html);   // optional, speeds up future uses
    $.each( collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "";
        } else {
            val.post_image = val.image_url;
        }
        
        if(val.title.length > 45){
            val.title_short = val.title.substring(0, 44) + "...";
        } else {
            val.title_short = val.title;
        }
        
        if(val.body.length > 155){
            val.description_short = val.body.substring(0, 154) + "...";
        }
        else{
            val.description_short = val.body;
        }
        val.description_short = val.description_short.replace("&amp;", "&");
        
        val.slug = "posts/" + val.slug;
        
        val.twitter_title = val.title + " via @ShopTheGateway";

        val.counter = counter;
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
        counter = counter + 1;
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderPostDetails(container, template, collection, blog_posts){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    $.each(collection , function( key, val ) {
        if (val.image_url.indexOf('missing.png') > -1) {
            val.post_image = "";
        } else {
            val.post_image = val.image_url;
        }
        
        if(val.body.length > 100){
            val.description_short = val.body.substring(0,100) + "...";
        }
        else{
            val.description_short = val.body;
        }

        var blog_list = [];
        $.each(blog_posts, function(key, val) {
            var slug = val.slug;
            blog_list.push(val.slug);
        });
        var current_slug = val.slug;
        var index = blog_list.indexOf(current_slug);
        if(index >= 0 && index < blog_list.length){
          var next_slug = blog_list[index + 1];
            if(next_slug != undefined || next_slug != null){
                val.next_post = "/posts/" + next_slug;
                val.next_show = "display: block";
            } else {
                val.next_show = "display: none";
            }
        }
        if(index >= 0 && index < blog_list.length){
            var prev_slug = blog_list[index - 1];
            if(prev_slug != undefined || prev_slug != null){
                val.prev_post = "/posts/" + prev_slug;
                val.prev_show = "display: block";
            } else {
                val.prev_show = "display: none";
            }
        }

        val.twitter_title = val.title + " via @ShopTheGateway";
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).html(item_rendered.join(''));
}

function renderPromotions(container, template, collection){
    var mall_name = getPropertyDetails().name;
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
    
            var store_logo = store_details.store_front_url_abs;
            if(store_logo != undefined){
                val.image_url  = store_logo
            } else {
                val.image_url = default_image.image_url;
            }
        }
        else{
            val.store_name = mall_name;
            val.image_url = default_image.image_url;
        }
        
        if (val.name.length > 20){
            val.name_short = val.name.substring(0,19) + "...";
        }
        else {
            val.name_short = val.name;
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = start.format("MMM D") + " - " + end.format("MMM D");
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPromoDetails(container, template, collection){
    var mall_name = getPropertyDetails().name;
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug;
            val.store_name = store_details.name;
            if (store_details.store_front_url_abs.indexOf('missing.png') > -1){
                val.image_url = default_image.image_url;
            } else {
                val.image_url = store_details.store_front_url_abs;
            }
        } else {
            val.store_name = mall_name;
            val.image_url = default_image.image_url;
        }
        
        if(val.promo_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        } else {
            val.dates = start.format("MMM D") + " - " + end.format("MMM D")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderRepo(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderSimple(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    
    var repo_rendered = Mustache.render(template_html, collection);
    item_rendered.push(repo_rendered);

    $(container).html(item_rendered.join(''));
}

function renderStoreList(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each(collection, function(key, val) {
        if(type == "stores" || type == "category_stores"){
            if(!val.store_front_url_abs ||  val.store_front_url_abs.indexOf('missing.png') > -1 || val.store_front_url_abs.length === 0){
                val.store_front_url_abs = default_image.image_url;
            } 
            if(val.assets != undefined){
                var hover_url = val.assets[0].url;
                val.hover_img = getImageURL(hover_url);
            } else {
                val.hover_img = val.store_front_url_abs;
            }
        }
        
        var current_initial = val.name[0];
        val.cat_list = val.categories.join(',')
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.initial = "";
            val.show = "display:none;";
        } else {
            val.initial = current_initial.toUpperCase();
            store_initial = current_initial;
        }
        
        if(val.is_coming_soon_store == true){
            val.coming_soon_store = "display: block";
        } else {
            val.coming_soon_store = "display:none";
        }
        
        if(val.is_new_store == true){
            val.new_store = "display: block";
        } else {
            val.new_store = "display: none";
        }
        
        if(val.total_published_promos != 0){
            val.promotion_exist = "display: inline";
            val.promotion_list = val.total_published_promos;
        } else {
            val.promotion_exist = "display: none";
        }
        
        if (val.total_published_jobs != 0){
            val.job_exist = "display: inline";
            val.job_list = val.total_published_jobs;
        } else {
            val.job_exist = "display: none";
        }
        
        val.block = current_initial + '-block';
        var rendered = Mustache.render(template_html,val);
        var upper_current_initial = current_initial.toUpperCase();
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderStoreDetails(container, template, collection, slug){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if ((val.store_front_url).indexOf('missing.png') > -1){
            val.alt_store_front_url = default_image.image_url;
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url); 
        }
        
        if(val.is_coming_soon_store != false){
            val.coming_soon_store = "display: block;"
        } else {
            val.coming_soon_store = "display: none;"
        }
        val.category_list = getCategoriesNamesByStoreSlug(slug);
        val.map_x_coordinate = val.x_coordinate - 19;
        val.map_y_coordinate = val.y_coordinate - 58;
        val.property_map = getPropertyDetails().mm_host + getPropertyDetails().map_url;
        
        if (val.website != null && val.website.length > 0){
            val.show = "display:inline-block";
        }
        else{
            val.show = "display:none";
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderStoreDetailsHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        switch(val.day_of_week) {
            case 0:
                val.day = "Sunday";
                break;
            case 1:
                val.day = "Monday";
                break;
            case 2:
                val.day = "Tuesday";
                break;
            case 3:
                val.day = "Wednesday";
                break;
            case 4:
                val.day = "Thursday";
                break;
            case 5:
                val.day = "Friday";
                break;
            case 6:
                val.day = "Saturday";
                break;
            
        }
        var open_time = moment(val.open_time).tz(getPropertyTimeZone());
        var close_time = moment(val.close_time).tz(getPropertyTimeZone());
        
        if(val.is_closed == null || val.is_closed == false && val.open_full_day == false){
            val.hour_string = open_time.format("h:mmA") + " - " + close_time.format("h:mmA");
        }       
        if(val.is_closed == true){
            val.hour_string = "Closed";
        } 
        if(val.open_full_day == true){
            val.hour_string = "Open 24 hours";
        }     

        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}