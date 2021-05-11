//GOLBAL ANIMATION DURATION
var global_duration = 3;
var global_unique_name = [];
var init_launch_count = 0;
var global_bg_video_count = 1;
var global_bg_video_count_two = 1;
var global_bg_video_array = [];

//INITIALISE FRONTEND
function hslide_initialise_frontend(unique_name) {

    init_launch_count++;
    global_unique_name.push(unique_name);

    //GET THE DEFAULT OBJECT
    var object = eval("hslide_default_object_" + unique_name + "");

    //clone object
    var object_clone = jQuery.extend(true, {}, object);

    object_clone = clean_object(object_clone, unique_name);

    //GET A LIST OF ALL IMAGES USED WITHIN THE SLIDER AND SETUP AN ARRAY
    hslider_define_preload_images(object_clone, unique_name);

    //BUILD DATA ARRAYS
    hslider_build_data_arrays(object_clone, unique_name);

    //SET GLOBAL VARIABLE
    hslider_global_obj[unique_name] = object_clone;

    //SORT ELEMENTS
    jQuery(object_clone.slider.slides).each(function (index, element) {
        element.elements.sort(sort_elements);
    });

    //ADD GOOGLE FONT URL TO PAGE
    add_google_fonts(object_clone, unique_name);

    //EXECUTE PRELOADER FOR ALL IMAGES WITHIN THE SLIDER
    hslider_execute_preload_images(object_clone, unique_name);

    //EXECUTE THE RESIZE
    hslider_execute_resize(object_clone, unique_name);

}

function clean_object(obj) {

    var slides_array = [];

    //remove marker pointers from object clone
    jQuery.each(obj.slider.slides, function (key, val) {
        if (parseInt(val.status) === 1) {
            slides_array.push(obj.slider.slides[key]);
        }
    });

    obj.slider.slides = [];

    jQuery(slides_array).each(function (index, element) {
        obj.slider.slides.push(element);
    });

    return obj;

}

/*	/////////////////////////////////
 GOOGLE FONTS
 */	/////////////////////////////////

//add fonts url to page
function add_google_fonts(object_clone, unique_name) {

    var font_array = [];

    //ARROW FONT STYLES
    font_array.push(object_clone.slider.arrows.countFamily);
    font_array.push(object_clone.slider.arrows.descriptionFamily);

    //ELEMENT FONT STYLES
    jQuery(object_clone.slider.slides).each(function (index, element) {

        jQuery(element.elements).each(function (idx, el) {

            switch (el.type) {
                case 'text':
                    font_array.push(el.font[0].family);
                    break;
                case 'post':
                    font_array.push(el.settings[0].font[0].heading[0].fontFamily);
                    font_array.push(el.settings[0].font[0].excerpt[0].fontFamily);
                    font_array.push(el.settings[0].font[0].button[0].fontFamily);
                    break;
                case 'button':
                    font_array.push(el.font[0].family);
                    break;
                case 'woo':
                    font_array.push(el.settings[0].font[0].heading[0].fontFamily);
                    font_array.push(el.settings[0].font[0].excerpt[0].fontFamily);
                    font_array.push(el.settings[0].font[0].button[0].fontFamily);
                    font_array.push(el.settings[0].font[0].price[0].fontFamily);
                    font_array.push(el.settings[0].font[0].saleprice[0].fontFamily);
                    break;
            }

        });

    });

    font_array = unique(font_array);

    var google_var = '<link href="https://fonts.googleapis.com/css?family=' + font_array.join("|") + '" rel="stylesheet" type="text/css">';

    jQuery(google_var).insertBefore('#hslider_' + unique_name);

}

//unique array
function unique(list) {
    var result = [];
    jQuery.each(list, function (i, e) {
        if (jQuery.inArray(e, result) == -1) result.push(e);
    });
    return result;
}



/*	/////////////////////////////////
 POST AND WOO CONTENT MANAGEMENT
 */	/////////////////////////////////

//load post content
function load_post_content(object_clone, unique_name) {

    jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').find('[data-type="post"]').each(function (index, element) {

        //variables
        var slide_index = jQuery(this).attr('data-slide-index');
        var index = jQuery(this).attr('data-index');
        var display = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].display;
        var category = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].category;
        var number = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].postNumber;
        var size = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].postImageSize;
        var obj = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings;

        //load html
        jQuery.ajax({
            url: ajax_url,
            type: "POST",
            data: {
                'action': 'hslide_get_post_content',
                index: 'index',
                display: display,
                category: category,
                number: number,
                size: size
            },
            dataType: "json"
        }).done(function (data) {
            insert_post_html(data, obj, index, slide_index, object_clone, unique_name);
        }).fail(function () {
            //page error
        });

    });

}

//load post content
function load_woo_content(object_clone, unique_name) {

    jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').find('[data-type="woo"]').each(function (index, element) {

        //variables
        var slide_index = jQuery(this).attr('data-slide-index');
        var index = jQuery(this).attr('data-index');
        var category = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].category;
        var number = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].productNumber;
        var size = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].productImageSize;
        var obj = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings;
        var custom_id = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].productCustomId;
        var display = object_clone.slider.slides[slide_index].elements[jQuery(this).attr('data-index')].settings[0].display;

        //load html
        jQuery.ajax({
            url: ajax_url,
            type: "POST",
            data: {
                'action': 'hslide_get_woo_content',
                index: 'index',
                category: category,
                number: number,
                size: size,
                custom: custom_id,
                display: display
            },
            dataType: "json"
        }).done(function (data) {
            insert_woo_html(data, obj, index, slide_index, object_clone, unique_name);
        }).fail(function () {
            //page error
        });

    });

}

//add post html
function insert_post_html(post_obj, element_obj, index, slide_index, object_clone, unique_name) {

    if (post_obj) {

        var post_html = '';

        var img_style = '';

        if (element_obj[0].postImageLayout === 'rounded') {
            img_style = 'post_img_rounded';
        }

        var layout_style = '';

        if (element_obj[0].postLayout === 'side') {
            layout_style = 'hslider_side_layout';
        }

        if (element_obj[0].postLayout === 'side_image') {
            layout_style = 'hslider_side_image_layout';
        }

        post_html += '<div class="post_holder_wrap">';

        jQuery(post_obj).each(function (idx, element) {
            post_html += '<div class="post_holder_item ' + layout_style + '">';
            post_html += '<div class="post_item_img ' + img_style + '" style="background-image:url(' + element.image + ')"></div>';
            post_html += '<div class="post_item_title">';
            post_html += element.title;
            post_html += '</div>';
            post_html += '<div class="post_item_content">';
            post_html += element.content;
            post_html += '</div>';
            post_html += '<a href="' + element.url + '" title="' + element.title + '" class="post_item_button">';
            post_html += element_obj[0].buttonText;
            post_html += '</a>';
            post_html += '</div>';
        });

        post_html += '</div>';

        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index).html(post_html);

        if (element_obj[0].postLayout === 'side') {
            var post_length = post_obj.length;
            var new_width = element_obj[0].postLayoutWidth / post_length;
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_holder_wrap .hslider_side_layout').css({
                'width': new_width + 'px'
            });
        }
        if (element_obj[0].postLayout === 'side_image') {
            var post_length = post_obj.length;
            var new_width = element_obj[0].postLayoutWidth / post_length;
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_holder_wrap .hslider_side_image_layout').css({
                'width': new_width + 'px'
            });
        }
        if (element_obj[0].postLayoutWidth !== "") {
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_holder_wrap').css({
                'width': element_obj[0].postLayoutWidth + 'px'
            });
        } else {
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_holder_wrap').css({
                'width': '400px'
            });
        }
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_item_img').css({
            'width': element_obj[0].postImageSize + 'px',
            'height': element_obj[0].postImageSize + 'px'
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_item_title').css({
            'color': element_obj[0].font[0].heading[0].fontColor,
            'font-family': element_obj[0].font[0].heading[0].fontFamily,
            'font-weight': element_obj[0].font[0].heading[0].fontWeight,
            'font-size': element_obj[0].font[0].heading[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_item_content').css({
            'color': element_obj[0].font[0].excerpt[0].fontColor,
            'font-family': element_obj[0].font[0].excerpt[0].fontFamily,
            'font-weight': element_obj[0].font[0].excerpt[0].fontWeight,
            'font-size': element_obj[0].font[0].excerpt[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .post_item_button').css({
            'color': element_obj[0].font[0].button[0].fontColor,
            'font-family': element_obj[0].font[0].button[0].fontFamily,
            'font-weight': element_obj[0].font[0].button[0].fontWeight,
            'font-size': element_obj[0].font[0].button[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
        });

    } else {
        //do nothing
    }

}

//add product html
function insert_woo_html(woo_obj, element_obj, index, slide_index, object_clone, unique_name) {

    if (woo_obj) {

        var post_html = '';

        var img_style = '';

        if (element_obj[0].productImageLayout === 'rounded') {
            img_style = 'post_img_rounded';
        }

        var layout_style = '';

        if (element_obj[0].productLayout === 'side') {
            layout_style = 'hslider_side_layout';
        }

        if (element_obj[0].productLayout === 'side_image') {
            layout_style = 'hslider_side_image_layout';
        }

        post_html += '<div class="product_holder_wrap">';

        jQuery(woo_obj).each(function (idx, element) {
            post_html += '<div class="product_holder_item ' + layout_style + '">';
            post_html += '<div class="product_item_img ' + img_style + '" style="background-image:url(' + element.image + ')"></div>';
            post_html += '<div class="product_item_title">';
            post_html += element.title;
            post_html += '</div>';
            if (element.sale) {
                post_html += '<div class="product_item_price">';
                post_html += '<div class="product_item_price_old">' + element.symbol + ' ' + element.price + '</div>';
                post_html += '<div class="product_item_price_sale">';
                post_html += element.symbol + ' ' + element.sale_price;
                post_html += '</div>';
                post_html += '</div>';
            } else if (element.price !== '') {
                post_html += '<div class="product_item_price">';
                post_html += element.symbol + ' ' + element.price;
                post_html += '</div>';
            }
            post_html += '<div class="product_item_content">';
            post_html += element.content;
            post_html += '</div>';
            post_html += '<a href="' + element.url + '" title="' + element.title + '" class="product_item_button">';
            post_html += element_obj[0].buttonText;
            post_html += '</a>';
            post_html += '</div>';
        });

        post_html += '</div>';

        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index).html(post_html);

        if (element_obj[0].productLayout === 'side') {
            var post_length = woo_obj.length;
            var new_width = element_obj[0].productLayoutWidth / post_length;
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_holder_wrap .hslider_side_layout').css({
                'width': new_width + 'px'
            });
        }
        if (element_obj[0].productLayout === 'side_image') {
            var post_length = woo_obj.length;
            var new_width = element_obj[0].productLayoutWidth / post_length;
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_holder_wrap .hslider_side_image_layout').css({
                'width': new_width + 'px'
            });
        }
        if (element_obj[0].productLayoutWidth !== "") {
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_holder_wrap').css({
                'width': element_obj[0].productLayoutWidth + 'px'
            });
        } else {
            jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_holder_wrap').css({
                'width': '400px'
            });
        }
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_item_img').css({
            'width': element_obj[0].productImageSize + 'px',
            'height': element_obj[0].productImageSize + 'px',
            'background-position': element_obj[0].productImagePosition,
            'background-repeat': element_obj[0].productImageRepeat,
            'background-size': element_obj[0].productImageSizing
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_item_title').css({
            'color': element_obj[0].font[0].heading[0].fontColor,
            'font-family': element_obj[0].font[0].heading[0].fontFamily,
            'font-weight': element_obj[0].font[0].heading[0].fontWeight,
            'font-size': element_obj[0].font[0].heading[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_item_price').css({
            'color': element_obj[0].font[0].price[0].fontColor,
            'font-family': element_obj[0].font[0].price[0].fontFamily,
            'font-weight': element_obj[0].font[0].price[0].fontWeight,
            'font-size': element_obj[0].font[0].price[0].fontSize + element_obj[0].font[0].price[0].fontSizing
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_item_price_sale').css({
            'color': element_obj[0].font[0].saleprice[0].fontColor,
            'font-family': element_obj[0].font[0].saleprice[0].fontFamily,
            'font-weight': element_obj[0].font[0].saleprice[0].fontWeight,
            'font-size': element_obj[0].font[0].saleprice[0].fontSize + element_obj[0].font[0].saleprice[0].fontSizing
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_item_content').css({
            'color': element_obj[0].font[0].excerpt[0].fontColor,
            'font-family': element_obj[0].font[0].excerpt[0].fontFamily,
            'font-weight': element_obj[0].font[0].excerpt[0].fontWeight,
            'font-size': element_obj[0].font[0].excerpt[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
        });
        jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_index + ' #hslider_element_' + index + ' .product_item_button').css({
            'color': element_obj[0].font[0].button[0].fontColor,
            'font-family': element_obj[0].font[0].button[0].fontFamily,
            'font-weight': element_obj[0].font[0].button[0].fontWeight,
            'font-size': element_obj[0].font[0].button[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
        });

    } else {
        //do nothing
    }

}



//GLOBAL VARIABLES
var hslider_global_obj = [];
var hslider_global_animation_type = [];
var hslider_global_button_type = [];
var hslider_global_side_type = [];
var gloabal_initial_load = true;
var hslider_global_width;


//RESPONSIVE VARIABLES
var slide_width = [];
var slide_height = [];
var checker_width = [];


/*	/////////////////////////////////
 MAIN
 */	/////////////////////////////////

//ACTIVATE THE SLIDER
function hslider_activate_slider(object_clone, unique_name) {

    var hslider_slide_position = 0;
    var hslider_slide_count = 0;

    //SORT SLIDES
    object_clone.slider.slides.sort(sort_elements);

    //SET SLIDE COUNT
    hslider_slide_count = object_clone.slider.slides.length;

    //SWITCH ON/OFF COMPONENTS
    hslider_switch_components(object_clone, unique_name);

    //ACTIVATE TIMER
    hslider_create_time_object(object_clone, unique_name);

    //ACTIVATE SCROLL BUTTONS
    hslider_activate_scroll_buttons(hslider_slide_count, object_clone, unique_name);

    //TIME OBJECT
    if (object_clone.slider.timer.autoPlay) {
        hslider_activate_timer(hslider_slide_count, object_clone, unique_name);
    }

}

//parralax
function hsliderParaScroll() {

    var lastScrollTop = 0;

    jQuery(".hslider_parralax").css({
        'background-position': 'center top'
    });

    jQuery(window).bind('scroll', function (e) {

        var scrolled = jQuery(this).scrollTop();
        var page_height = jQuery('body').height();
        var perc = ((scrolled / page_height) * 100) + 50;

        /*if (scrolled > lastScrollTop){
         // downscroll code
         TweenLite.to(jQuery(".hslider_slide"),0.2,{css:{backgroundPosition:"0 "+(parseInt(perc))+"%"},onComplete:function(){ }});
         } else {
         // upscroll code
         TweenLite.to(jQuery(".hslider_slide"),0.2,{css:{backgroundPosition:"0 "+(parseInt(perc))+"%"},onComplete:function(){ }});
         }*/

        TweenLite.to(jQuery(".hslider_parralax"), 0, { css: { backgroundPosition: "center " + (-(scrolled * 0.1)) + "px", force3D: true }, onComplete: function () { } });

        //lastScrollTop = scrolled;

    });


}

var time_array = [];
var time_counter = 0;
var timer_value = 0;

//TIMER
function hslider_create_time_object(obj, unique_name) {

    var arr = [];

    //build time array
    jQuery(obj.slider.slides).each(function (index, element) {
        var duration_array = [];
        var delay_array = [];
        timer_value = parseInt(element.slideIdle);
        if (element.elements.length > 0) {
            jQuery(element.elements).each(function (idx, element) {
                //timer_value = timer_value + parseInt(element.animation[0].delay);
                //timer_value = timer_value + parseInt(element.animation[0].duration);
                //new stuff
                duration_array.push(parseInt(element.animation[0].duration));
                delay_array.push(parseInt(element.animation[0].delay));
            });
            //sort arrays
            duration_array.sort(function (a, b) { return b - a });
            delay_array.sort(function (a, b) { return b - a });
            arr.push((timer_value + duration_array[0] + delay_array[0]));
            //time_array[unique_name][time_counter] = timer_value + duration_array[0] + delay_array[0];
        } else {
            arr.push(parseInt(timer_value));
            //time_array[unique_name][time_counter] = parseInt(timer_value);
        }
        time_counter++;
    });

    time_array[unique_name] = arr;

}

var var_time_array = [];

//START THE TIMER
function hslider_activate_timer(slide_count, obj, unique_name) {

    var arr = [];

    for (var i = 0; i < slide_count; i++) {
        arr.push('tween_time_' + i);
    }

    var_time_array[unique_name] = arr;

    jQuery(var_time_array[unique_name]).each(function (index, element) {
        var_time_array[unique_name][index] = new TimelineLite();
    });

    var_time_array[unique_name][hslider_click_count[unique_name] - 1].restart();

    var_time_array[unique_name][hslider_click_count[unique_name] - 1].to(jQuery('#hslider_' + unique_name + ' .hslider_inner_timer'), 0, {
        width: '0px'
    });

    var_time_array[unique_name][hslider_click_count[unique_name] - 1].to(jQuery('#hslider_' + unique_name + ' .hslider_inner_timer'), time_array[unique_name][hslider_click_count[unique_name] - 1], {
        width: '100%',
        opacity: 1,
        ease: Power0.easeNone,
        onUpdate: trigger_func,
        onComplete: hslider_timer_slide,
        onCompleteParams: [slide_count, obj, unique_name]
    });

    //MAKE THE VIDEO MAGIC HAPPEN HERE
    /*if(obj.slider.video.autoPlay){

     var current_slide = jQuery('#hslider_id_'+(hslider_click_count-1));

     jQuery(current_slide).find('[data-element-type="video"]').each(function(index, element) {
     var video_type =  jQuery(this).attr('data-video-type');
     switch(video_type){
     case 'youtube':
     var_time_array[hslider_click_count-1].pause();
     break;
     case 'vimeo':
     var_time_array[hslider_click_count-1].pause();
     break;
     }
     });

     }*/

    //stop timer when scrolling over
    if (obj.slider.timer.hoverStop) {
        jQuery('#hslider_' + unique_name).off().on({
            mouseenter: function () {
                var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].pause();
            },
            mouseleave: function () {
                var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].resume();
            }
        });
    }

}

function trigger_func() {
    //console.log('LOG');
}

function hslider_timer_slide(slide_count, obj, unique_name) {

    if (obj.slider.timer.autoPlay) {
        hslider_previous_count = (hslider_click_count[unique_name] - 1);
        stop_previous_slide_video(hslider_previous_count, unique_name);
    }

    hslider_click_count[unique_name]++;

    if (hslider_click_count[unique_name] > slide_count) {
        hslider_click_count[unique_name] = 1;
    }

    //hslider_animate_slides(hslider_click_count[unique_name]);
    hslider_set_slide_position((hslider_click_count[unique_name] - 1), 'right', unique_name, obj);
    hslider_reset_animate_state((hslider_click_count[unique_name] - 1), 'right', obj, unique_name);
    hslider_set_side_arrows(hslider_click_count[unique_name], obj, true, unique_name);
    eval("hslider_animate_" + hslider_global_animation_type[unique_name][hslider_click_count[unique_name] - 1] + "(" + (hslider_click_count[unique_name] - 1) + ", " + (hslider_click_count[unique_name] - 1) + ", 'right', '" + unique_name + "', '" + JSON.stringify(obj) + "', 'normal')");
    hslider_pager_state(hslider_click_count[unique_name], obj, unique_name);

    //enable timer
    if (obj.slider.timer.autoPlay) {
        if (obj.slider.video.autoPlay) {
            play_next_slide_video(hslider_click_count[unique_name] - 1, unique_name);
        }
        hslider_activate_timer(slide_count, obj, unique_name);
    }

    bg_animation_effect(obj, hslider_click_count[unique_name], unique_name);

}

//SWITCH COMPONENTS ON AND OFF
function hslider_switch_components(obj, unique_name) {

    //ARROWS
    if (!obj.slider.arrows.status) {
        jQuery('#hslider_' + unique_name + ' .hslider_side_btn').hide();
    }

    //PAGER
    if (!obj.slider.pager.status) {
        jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').hide();
    }

}

//SORT
function sort_elements(a, b) {
    return a.order - b.order;
}

//ACTIVATE THE SCROLL BUTTONS
var hslider_click_count = [];
var hslider_previous_count;

function hslider_activate_scroll_buttons(slide_count, object_clone, unique_name) {

    hslider_get_side_button_html(object_clone, unique_name);

    hslider_click_count[unique_name] = 1;

    //CHECK EVENT TYPE MOBILE OR NOT
    var custom_event = jQuery.support.touch ? "tap" : "click";

    //LEFT BUTTON
    jQuery('#hslider_' + unique_name + ' .hslider_side_btn').on(custom_event, function () {
        var button_side = jQuery(this).attr('data-side');
        //SET PREVIOUS VALUE
        hslider_previous_count = (hslider_click_count[unique_name] - 1);
        stop_previous_slide_video(hslider_previous_count, unique_name);
        switch (button_side) {
            case 'left':
                hslider_click_count[unique_name]--;
                if (hslider_click_count[unique_name] <= 0) {
                    hslider_click_count[unique_name] = slide_count;
                }
                //hslider_animate_slides(hslider_click_count[unique_name]);
                hslider_set_slide_position((hslider_click_count[unique_name] - 1), 'left', unique_name, object_clone);
                hslider_reset_animate_state((hslider_click_count[unique_name] - 1), 'left', object_clone, unique_name);
                hslider_set_side_arrows(hslider_click_count[unique_name], object_clone, true, unique_name);
                eval("hslider_animate_" + hslider_global_animation_type[unique_name][hslider_click_count[unique_name] - 1] + "(" + (hslider_click_count[unique_name] - 1) + ", " + (hslider_click_count[unique_name] - 1) + ", 'left', '" + unique_name + "', '" + JSON.stringify(object_clone) + "', 'normal')");
                hslider_pager_state(hslider_click_count[unique_name], object_clone, unique_name);
                //timer
                if (object_clone.slider.timer.autoPlay) {
                    hslider_activate_timer(slide_count, object_clone, unique_name);
                }
                //bg_animation_effect
                bg_animation_effect(object_clone, hslider_click_count[unique_name], unique_name);
                //play next video
                if (object_clone.slider.video.autoPlay) {
                    play_next_slide_video(hslider_click_count[unique_name] - 1, unique_name);
                }
                hslider_check_bg_video(unique_name, hslider_click_count[unique_name]);
                break;
            case 'right':
                hslider_click_count[unique_name]++;
                if (hslider_click_count[unique_name] > slide_count) {
                    hslider_click_count[unique_name] = 1;
                }
                //hslider_animate_slides(hslider_click_count[unique_name]);
                hslider_set_slide_position((hslider_click_count[unique_name] - 1), 'right', unique_name, object_clone);
                hslider_reset_animate_state((hslider_click_count[unique_name] - 1), 'right', object_clone, unique_name);
                hslider_set_side_arrows(hslider_click_count[unique_name], object_clone, true, unique_name);
                eval("hslider_animate_" + hslider_global_animation_type[unique_name][hslider_click_count[unique_name] - 1] + "(" + (hslider_click_count[unique_name] - 1) + ", " + (hslider_click_count[unique_name] - 1) + ", 'right', '" + unique_name + "', '" + JSON.stringify(object_clone) + "', 'normal')");
                hslider_pager_state(hslider_click_count[unique_name], object_clone, unique_name);
                //timer
                if (object_clone.slider.timer.autoPlay) {
                    hslider_activate_timer(slide_count, object_clone, unique_name);
                }
                //bg_animation_effect
                bg_animation_effect(object_clone, hslider_click_count[unique_name], unique_name);
                //play next video
                if (object_clone.slider.video.autoPlay) {
                    play_next_slide_video(hslider_click_count[unique_name] - 1, unique_name);
                }
                hslider_check_bg_video(unique_name, hslider_click_count[unique_name]);
                break;
        }
    });

    //BUILD SLIDE HTML
    hslider_slide_build_html(object_clone, unique_name);

    //SET SIDE ARROW NEXT PREV CONTENT
    hslider_set_side_arrows(hslider_click_count[unique_name], object_clone, true, unique_name);

    //SET ANIMATION STATES - THIS WILL SETUP ALL THE SLIDES INITIAL ANIMATION STATE
    hslider_set_animate_state(hslider_click_count[unique_name], 'left', object_clone, unique_name);

    //SET PAGER POSITION
    hslider_set_pager(slide_count, object_clone, unique_name);

    //ENABLE ELEMENT MOUSE MOVE
    hslider_element_mousemove(slide_count, object_clone, unique_name);

    //ENABLE SWIPE
    if (jQuery.support.touch) {
        enable_slider_swipe(slide_count, object_clone, unique_name);
    }

    //ACTIVATE BUTTON FUNCTIONS
    if (hslider_global_button_type) {
        jQuery.unique(hslider_global_button_type);
        jQuery(hslider_global_button_type).each(function (index, element) {
            eval("hslider_" + element + "()");
        });
    }

    //ACTIVATE SIDE BUTTON FUNCTIONS
    if (hslider_global_side_type) {
        jQuery.unique(hslider_global_side_type);
        jQuery(hslider_global_side_type).each(function (index, element) {
            eval("hslider_animation_" + element + "('" + element + "')");
        });
    }

    //ANIMATE THE BEGINNING SLIDE
    eval("hslider_animate_" + hslider_global_animation_type[unique_name][hslider_click_count[unique_name] - 1] + "(0, 0, 'right', '" + unique_name + "', '" + JSON.stringify(object_clone) + "', 'first')");

    //PLAY FIRST SLIDE BG VIDEO IF AVAILABLE
    hslider_check_bg_video(unique_name, hslider_click_count[unique_name]);

    //BG ANIMATION AFFECT
    bg_animation_effect(object_clone, hslider_click_count[unique_name], unique_name);

}

//ENABLE SWIPE
function enable_slider_swipe(slide_count, object_clone, unique_name) {

    jQuery('.hslider_slide').on({
        'swipeleft': function () {
            jQuery(this).parents('.hslider_misc_holder').children('.hslider_right').trigger('tap');
        },
        'swiperight': function () {
            jQuery(this).parents('.hslider_misc_holder').children('.hslider_left').trigger('tap');
        }
    });

}

//ENABLE MOUSE MOVE
function hslider_element_mousemove(slide_count, object_clone, unique_name) {

    // jQuery('#hslider_'+unique_name+' .hslider_side_btn')

    jQuery(object_clone.slider.slides).each(function (index, element) {

        if (element.mouseMove == '1') {

            var parallaxContainer = jQuery('#hslider_' + unique_name + ' #hslider_id_' + index); //our container
            var parallaxItems = parallaxContainer.find(".hslider_element");  //elements
            var fixer = 0.0004;

            jQuery(parallaxContainer).mousemove(function (event) {

                var pageX = event.pageX - (parallaxContainer.width() * 0.5);
                var pageY = event.pageY - (parallaxContainer.height() * 0.5);

                jQuery(parallaxItems).each(function (index, element) {

                    var div = jQuery(this);

                    var speedX = ((index + 1) * 100);
                    var speedY = ((index + 1) * 100);

                    TweenLite.to(div, 0.5, {
                        x: (div.position().left + pageX * speedX) * fixer,
                        y: (div.position().top + pageY * speedY) * fixer
                    });

                });

            });

        }

    });

}

var ken_burns_tween = new TimelineLite();

//SET BACKGROUND ANIMATION
function bg_animation_effect(object_clone, hslider_click_count, unique_name) {

    var slide_pos = hslider_click_count - 1;

    switch (object_clone.slider.slides[slide_pos].background[0].backgroundAnimation) {
        case 'zoom':
            //ken_burns
            TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + slide_pos + ' .ken_burns_' + slide_pos), parseInt(time_array[unique_name][hslider_click_count - 1]), { css: { transform: "scale(1." + object_clone.slider.slides[slide_pos].background[0].burnsDistance + ",1." + object_clone.slider.slides[slide_pos].background[0].burnsDistance + ")", transformOrigin: object_clone.slider.slides[slide_pos].background[0].burnsDirection }, ease: Power0.easeNone, force3D: true, rotationZ: 0.01 });
            break;
        case 'para':

            var is_mobile = jQuery.support.touch ? "tap" : "click";

            if (is_mobile === 'click') {

                var window_height = jQuery(window).height();
                var position_on_stage = jQuery('#hslider_' + unique_name + ' .hslider_parralax').offset().top;
                var scroll_position_on_stage = position_on_stage - jQuery(window).scrollTop();
                var start_point = (window_height);
                var scale = (((((start_point - scroll_position_on_stage) / start_point) * 100) / 100) / 2) + 1;

                if (scroll_position_on_stage < start_point) {
                    jQuery('#hslider_' + unique_name + ' .hslider_parralax .hslide_parralax_scaler').css({
                        '-ms-transform': "scale(" + scale + "," + scale + ")",
                        '-webkit-transform': "scale(" + scale + "," + scale + ")",
                        'transform': "scale(" + scale + "," + scale + ")",
                        'transform-origin': 'top center'
                    })
                }

                jQuery(window).bind('scroll', function (e) {

                    //variables
                    var scrolled = jQuery(this).scrollTop();
                    position_on_stage = jQuery('#hslider_' + unique_name + ' .hslider_parralax').offset().top;
                    scroll_position_on_stage = position_on_stage - scrolled;

                    if (scroll_position_on_stage < start_point) {

                        scale = (((((start_point - scroll_position_on_stage) / start_point) * 100) / 100) / 2) + 1;

                        TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_parralax .hslide_parralax_scaler'), 0.2, {
                            css: {
                                transform: "scale(" + scale + "," + scale + ")",
                                transformOrigin: 'top center',
                                force3D: true
                            }, ease: Power0.easeIn, onComplete: function () {
                            }
                        });

                    }

                });
            } else {
                jQuery('#hslider_' + unique_name + ' .hslider_parralax').css({
                    'background-position': 'center !important',
                    'background-size': 'cover !important',
                    'background-attachment': 'inherit !important'
                });
            }
            break;
        case 'static':
            //console.log('static');
            break;
    }

}

//SET THE PAGER
function hslider_set_pager(slide_count, object_clone, unique_name) {

    /*
     HELPFUL INFO:
     ***********************
     - Pager has 2 sizes, 10(px) and 20(px)
     - The margin between each pager button is 5px (left) and 5px (right)
     */

    //REQUIRED CALCULATION FOR POSITION ON CERTAIN AREAS
    var pager_width = (slide_count * object_clone.slider.pager.size) + (slide_count * 10);

    //RETURN THE PROPER PAGER HTML
    jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').html(hslider_return_pager_html(slide_count, object_clone.slider.pager.type));

    //SET POSITION
    switch (object_clone.slider.pager.position) {
        case 'bottom_center':
            jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').css({
                'margin-left': '-' + (pager_width / 2) + 'px',
                'bottom': '30px'
            });
            break;
        case 'bottom_left':
            jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').css({
                'left': '30px',
                'bottom': '30px'
            });
            break;
        case 'bottom_right':
            jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').css({
                'right': '30px',
                'left': 'auto',
                'bottom': '30px'
            });
            break;
        case 'top_center':
            jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').css({
                'margin-left': '-' + (pager_width / 2) + 'px',
                'top': '30px'
            });
            break;
        case 'top_left':
            jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').css({
                'left': '30px',
                'top': '30px'
            });
            break;
        case 'top_right':
            jQuery('#hslider_' + unique_name + ' .hslider_pager_holder').css({
                'right': '30px',
                'left': 'auto',
                'top': '30px'
            });
            break;
    }

    //AFTER PAGER IS PLACED, ACTIVATE THE REQUIRED FUNCTIONALITY
    hslider_activate_pager(1, object_clone, unique_name);

}

//BUILD PAGER HTML
function hslider_return_pager_html(slide_count, type) {

    var pager_html = '';

    //LOOP THE AMOUNT OF SLIDES TO CREATE MULTIPLE BUTTONS
    for (var s = 1; s <= slide_count; s++) {
        //RETURN THE PROPER PAGER HTML
        switch (type) {
            case 'scale_up':
                pager_html += '<div class="hslider_pager_btn hslider_scale_btn hslider_rounded_pager" data-pager-position="' + s + '"></div>';
                break;
            case 'fill_up':
                pager_html += '<div class="hslider_pager_btn hslider_fill_btn hslider_rounded_pager" data-pager-position="' + s + '"></div>';
                break;
            case 'inner_circle':
                pager_html += '<div class="hslider_pager_btn hslider_circle_btn hslider_rounded_pager" data-pager-position="' + s + '"><div class="hslider_rounded_pager"></div></div>';
                break;
        }
    }

    return pager_html;

}

//ACTIVATE PAGER
function hslider_activate_pager(position, object_clone, unique_name) {

    jQuery('#hslider_' + unique_name + ' .hslider_pager_holder .hslider_pager_btn').on('click', function () {

        //SET PREVIOUS VALUE

        hslider_previous_count = (hslider_click_count[unique_name] - 1);
        stop_previous_slide_video(hslider_previous_count, unique_name);

        hslider_click_count[unique_name] = jQuery(this).attr('data-pager-position');

        hslider_set_slide_position((hslider_click_count[unique_name] - 1), 'right', unique_name, object_clone);
        hslider_reset_animate_state((hslider_click_count[unique_name] - 1), 'right', object_clone, unique_name);
        hslider_set_side_arrows(hslider_click_count[unique_name], object_clone, true, unique_name);
        eval("hslider_animate_" + hslider_global_animation_type[unique_name][hslider_click_count[unique_name] - 1] + "(" + (hslider_click_count[unique_name] - 1) + ", " + (hslider_click_count[unique_name] - 1) + ", 'right', '" + unique_name + "', '" + JSON.stringify(object_clone) + "', 'normal')");

        hslider_pager_state(hslider_click_count[unique_name], object_clone, unique_name);

        //SET SLIDE COUNT
        var hslider_slide_count = object_clone.slider.slides.length;

        bg_animation_effect(object_clone, hslider_click_count[unique_name], unique_name);

        if (object_clone.slider.video.autoPlay) {
            play_next_slide_video(hslider_click_count[unique_name] - 1, unique_name);
        }

        if (object_clone.slider.timer.autoPlay) {
            hslider_activate_timer(hslider_slide_count, object_clone, unique_name);
        }

    });

    //SET ACTIVE STATE
    hslider_pager_state(position, object_clone, unique_name);

}

//SET PAGER ACTIVE STATE
function hslider_pager_state(position, object_clone, unique_name) {

    jQuery('#hslider_' + unique_name + ' .hslider_pager_holder .hslider_pager_btn').each(function (index, element) {
        if (position != jQuery(this).attr('data-pager-position')) {
            jQuery(this).removeClass('hslider_pager_active');
            hslider_anmimate_state(jQuery(this), object_clone, false);
        } else {
            jQuery(this).addClass('hslider_pager_active');
            hslider_anmimate_state(jQuery(this), object_clone, true);
        }
    });

}

//ANIMATE THE STATE OF THE PAGER ACTIVE
function hslider_anmimate_state(ele, obj, status) {

    switch (obj.slider.pager.type) {
        case 'scale_up':
            if (status) {
                //ANIMATE ACTIVE STATE TRUE
                TweenLite.to(ele, 0.5, { scaleX: 1.7, scaleY: 1.7, force3D: true, opacity: 1, backgroundColor: obj.slider.pager.primaryColor, ease: Power2.easeInOut });
            } else {
                //ANIMATE OFF STATE FALSE
                TweenLite.to(ele, 0.5, { scaleX: 1, scaleY: 1, force3D: true, opacity: obj.slider.pager.transparency, backgroundColor: obj.slider.pager.secondaryColor, ease: Power2.easeInOut });
            }
            break;
        case 'fill_up':
            if (status) {
                //ANIMATE ACTIVE STATE TRUE
                TweenLite.to(ele, 0.5, { opacity: 1, force3D: true, backgroundColor: obj.slider.pager.primaryColor, borderColor: obj.slider.pager.secondaryColor, ease: Power2.easeInOut });
            } else {
                //ANIMATE OFF STATE FALSE
                TweenLite.to(ele, 0.5, { opacity: obj.slider.pager.transparency, force3D: true, backgroundColor: 'none', borderColor: obj.slider.pager.primaryColor, ease: Power2.easeInOut });
            }
            break;
        case 'inner_circle':
            if (status) {
                //ANIMATE ACTIVE STATE TRUE
                TweenLite.to(ele, 0.5, { opacity: 1, force3D: true, borderColor: obj.slider.pager.secondaryColor, ease: Power2.easeInOut });
                TweenLite.to(jQuery(ele).children('div'), 0.5, { opacity: 1, force3D: true, scaleX: 0.6, scaleY: 0.6, backgroundColor: obj.slider.pager.primaryColor, ease: Power2.easeInOut });
            } else {
                //ANIMATE OFF STATE FALSE
                TweenLite.to(ele, 0.5, { opacity: obj.slider.pager.transparency, force3D: true, backgroundColor: 'none', borderColor: obj.slider.pager.primaryColor, ease: Power2.easeInOut });
                TweenLite.to(jQuery(ele).children('div'), 0.5, { opacity: 1, force3D: true, scaleX: 1, scaleY: 1, backgroundColor: 'none', ease: Power2.easeInOut });
            }
            break;
    }

}

//SET SIDE ARROW NEXT PREV CONTENT
function hslider_set_side_arrows(hslider_click_count, object_clone, action, unique_name) {

    var array_position = hslider_click_count - 1;
    var object_count = object_clone.slider.slides.length - 1;

    var next_content = array_position + 1;
    var prev_content = array_position - 1;

    //CHECK PREVIOUS COUNT
    if (prev_content < 0) {
        prev_content = object_count;
    }

    //CHECK NEXT COUNT
    if (next_content > object_count) {
        next_content = 0;
    }

    var left_position = 'left', right_position = 'right';

    //CHECK WHICH ARROW TYPE IS BEING USED
    switch (object_clone.slider.arrows.type) {
        case 'sideslide':
            left_position = 'right';
            right_position = 'left';
            break;
    }

    var prev_type = object_clone.slider.slides[prev_content].type;
    var next_type = object_clone.slider.slides[next_content].type;

    jQuery('#hslider_' + unique_name + ' .hslider_side_inner .hslider_side_image').addClass('hslider_active').removeClass('hslider_new');

    if (!action) {
        //SET PREVIOUS BUTTON
        jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_active').css({
            'background-image': 'url(' + object_clone.slider.slides[prev_content].background[0].backgroundImage + ')',
            'background-color': object_clone.slider.slides[prev_content].background[0].backgroundColor
        });

        //manage arrow content
        manage_arrow_content(hslider_click_count, object_clone, prev_content, 'prev');

        //SET NEXT BUTTON
        jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_active').css({
            'background-image': 'url(' + object_clone.slider.slides[next_content].background[0].backgroundImage + ')',
            'background-color': object_clone.slider.slides[next_content].background[0].backgroundColor
        });

        //manage arrow content
        manage_arrow_content(hslider_click_count, object_clone, next_content, 'next');

    }

    var img_holder_width = jQuery('.hslider_active').width();
    var inner_width = jQuery('#hslider_' + unique_name + ' .hslider_side_image').width();

    //ACTION ILLUSTRATES THE EVENT, IF TRUE THEN IT IS A CLICK EVENT, OTHERWISE FALSE FOR INITIAL LOAD
    if (action) {

        //LEFT SIDE ANIMATE
        jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_inner .hslider_side_image_wrap').prepend('<div class="hslider_side_image hslider_new"></div>');

        jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_inner .hslider_new').css({
            'left': '-' + img_holder_width + 'px'
        });

        TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_inner .hslider_active'), 0.5, {
            left: img_holder_width + 'px',
            ease: Power2.easeInOut,
            force3D: true
        });

        TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_inner .hslider_new'), 0.5, {
            //width:inner_width,
            left: 0,
            onComplete: hslider_remove_active,
            ease: Power2.easeInOut,
            force3D: true
        });

        //RIGHT SIDE ANIMATE
        jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_inner .hslider_side_image_wrap').prepend('<div class="hslider_side_image hslider_new"></div>');

        jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_inner .hslider_new').css({
            'right': img_holder_width
        });

        TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_inner .hslider_active'), 0.5, {
            right: '-' + img_holder_width + 'px',
            ease: Power2.easeInOut,
            force3D: true
        });

        TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_inner .hslider_new'), 0.5, {
            width: inner_width,
            right: 0,
            onComplete: hslider_remove_active,
            ease: Power2.easeInOut,
            force3D: true
        });

        //SET PREVIOUS BUTTON
        jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_new').css({
            'background-image': 'url(' + object_clone.slider.slides[prev_content].background[0].backgroundImage + ')',
            'background-color': object_clone.slider.slides[prev_content].background[0].backgroundColor
        });

        //manage arrow content
        manage_arrow_content(hslider_click_count, object_clone, prev_content, 'prev', unique_name);

        //SET NEXT BUTTON
        jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_new').css({
            'background-image': 'url(' + object_clone.slider.slides[next_content].background[0].backgroundImage + ')',
            'background-color': object_clone.slider.slides[next_content].background[0].backgroundColor
        });

        //manage arrow content
        manage_arrow_content(hslider_click_count, object_clone, next_content, 'next', unique_name);

    }

}

//MANAGE ARROW CONTENT
function manage_arrow_content(hslider_click_count, object_clone, position, side, unique_name) {

    var count = object_clone.slider.slides.length;

    switch (side) {
        case 'prev':

            var prev_description = '';
            var prev_count = '';

            if (object_clone.slider.slides[position].slideDescription !== '') {
                if (object_clone.slider.arrows.type !== 'doubleflip') {
                    prev_description = object_clone.slider.slides[position].slideDescription;
                    prev_count = (position + 1) + ' OF ' + count;
                } else {
                    prev_description = '<em class="hslide_num_1">' + (position + 1) + ' </em> <em>&frasl;</em> <em class="hslide_num_2">' + count + '</em>';
                }
                jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_count').html(prev_count);
            } else {
                if (object_clone.slider.arrows.type !== 'bend' && object_clone.slider.arrows.type !== 'doubleflip') {
                    prev_description = (position + 1) + ' OF ' + count;
                    prev_count = (position + 1) + ' OF ' + count;
                } else if (object_clone.slider.arrows.type === 'doubleflip') {
                    prev_description = '<em class="hslide_num_1">' + (position + 1) + ' </em> <em>&frasl;</em> <em class="hslide_num_2">' + count + '</em>';
                } else {
                    prev_description = 'Prev slide ' + (position + 1);
                    prev_count = (position + 1) + ' OF ' + count;
                }
                jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_count').html(prev_count);
            }

            if (prev_description.length > 20 && object_clone.slider.arrows.type !== 'doubleflip') {
                prev_description = prev_description.substr(0, 15).trim() + '...';
            }

            jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_label').html(prev_description);

            position_arrow_label(object_clone, unique_name);

            break;
        case 'next':

            //substr(start,length)

            var next_description = '';
            var next_count = '';

            if (object_clone.slider.slides[position].slideDescription !== '') {
                if (object_clone.slider.arrows.type !== 'doubleflip') {
                    next_description = object_clone.slider.slides[position].slideDescription;
                    next_count = (position + 1) + ' OF ' + count;
                } else {
                    next_description = '<em class="hslide_num_1">' + (position + 1) + ' </em> <em>&frasl;</em> <em class="hslide_num_2">' + count + '</em>';
                }
                jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_count').html(next_count);
            } else {
                if (object_clone.slider.arrows.type !== 'bend' && object_clone.slider.arrows.type !== 'doubleflip') {
                    next_description = (position + 1) + ' OF ' + count;
                    next_count = (position + 1) + ' OF ' + count;
                } else if (object_clone.slider.arrows.type === 'doubleflip') {
                    next_description = '<em class="hslide_num_1">' + (position + 1) + ' </em> <em>&frasl;</em> <em class="hslide_num_2">' + count + '</em>';
                } else {
                    next_description = 'Next slide ' + (position + 1);
                    next_count = (position + 1) + ' OF ' + count;
                }
                jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_count').html(next_count);
            }

            if (next_description.length > 20 && object_clone.slider.arrows.type !== 'doubleflip') {
                next_description = next_description.substr(0, 15).trim() + '...';
            }

            jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_label').html(next_description);

            position_arrow_label(object_clone, unique_name);

            break;
    }

}

function position_arrow_label(object_clone, unique_name) {

    switch (object_clone.slider.arrows.type) {
        case 'sideslide':
            //left
            var label_left_height = jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_label').height();
            var padding_left = (70 - label_left_height) / 2;
            TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_left .hslider_side_label'), 0.5, {
                paddingTop: padding_left,
                force3D: true
            });
            //right
            var label_right_height = jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_label').height();
            var padding_right = (70 - label_right_height) / 2;
            TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_right .hslider_side_label'), 0.5, {
                paddingTop: padding_right,
                force3D: true
            });
            break;
    }

}

//REMOVE THE ACTIVE STATE
function hslider_remove_active() {
    jQuery('.hslider_active').remove();
}

//BUILD SLIDE HTML
function hslider_slide_build_html(object_clone, unique_name) {

    var slide_html = '';

    var h_width = 0;
    var h_height = object_clone.slider.height;

    if (object_clone.slider.sliderType === 'responsive') {
        h_width = '100%';
    } else {
        h_width = object_clone.slider.width;
    }

    jQuery(object_clone.slider.slides).each(function (index, element) {

        var slide_background = '';
        var parralax_slide = '';

        //CHECK ANIMATION TYPE
        if (element.animationType !== 'split' && element.background[0].type !== 'video' && element.background[0].backgroundAnimation !== 'zoom') {
            slide_background = 'style="background-image:url(' + element.background[0].backgroundImage + ')"';
        }

        //CHECK IF THIS IS A PARRALAX SLIDE
        if (element.background[0].backgroundAnimation === 'para') {
            parralax_slide = 'hslider_parralax';
        }

        slide_html += '<div ' + slide_background + ' class="hslider_slide ' + parralax_slide + '" data-slide-type="' + element.type + '" data-animation-type="' + element.animationType + '" id="hslider_id_' + index + '">';
        if (element.background[0].backgroundAnimation === 'para') {
            slide_html += '<div class="hslide_parralax_scaler" ' + slide_background + '></div>';
        }
        //BUILD INNER HTML - ANIMATION TYPE - THIS WILL ONLY BE USED FOR THE SPLIT TRANSITIONS
        if (element.animationType === 'split' && element.background[0].type !== 'video') {
            slide_html += hslider_build_animation_html(element.animationType, element.background[0].backgroundImage);
        } else if (element.background[0].type === 'video') {
            slide_html += hslider_build_video_bg_html(element.background[0], unique_name, global_bg_video_count, h_width, h_height);
            global_bg_video_count++;
        }
        //INSERT IMAGE FOR KEN BURNS EFFECT
        if (element.background[0].backgroundAnimation === 'zoom') {
            slide_html += '<img src="' + element.background[0].backgroundImage + '" class="ken_burns_hero_img ken_burns_' + index + '">';
        }
        //BUILD INNER HTML - CONTENT
        var full_width_class = '';
        if (element.type === 'product' || element.type === 'post') {
            full_width_class = 'hslider_full_width';
        }
        slide_html += '<div class="hslider_slide_content_holder ' + full_width_class + '">';
        slide_html += hslider_slide_content_html(element.elements, index, unique_name);
        slide_html += '</div>';
        slide_html += '</div>';

    });

    //APPEND SLIDE HTML
    jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').append(slide_html);

    //CREATE VIDEO BG ARRAY
    jQuery(object_clone.slider.slides).each(function (index, element) {
        if (element.background[0].type === 'video') {
            //POPULATE ARRAY
            global_bg_video_array["bg_" + unique_name + "_" + global_bg_video_count_two] = document.getElementById("bg_" + unique_name + '_' + global_bg_video_count_two);
            global_bg_video_count_two++;
        }
    });

    if (object_clone.slider.sliderType === 'responsive') {
        jQuery('#hslider_' + unique_name + ' .hslider_slide_content_holder ').width(1200);
    }

    //CHECK RESIZE KEN BURN IMAGE
    resize_ken_img();
    position_video();

    //RESIZE VIDEO
    hslider_video_size(h_width, h_height, unique_name);

    //CREATE VIDEO OBJECT
    create_video_object(object_clone, unique_name);

    //ADD VIDEO API'S
    load_video_api(object_clone, unique_name);

    //LOAD DYNAMIC CONTENT
    load_post_content(object_clone, unique_name);
    load_woo_content(object_clone, unique_name);

    //APPEND STYLES
    jQuery('<style type="text/css">' + hslider_return_styles(object_clone, unique_name) + '</style>').appendTo('head');

    //SET HTML SIZES - CURRENTLY USED TO SET THE SIZE OF THE ANIMATION TYPE HTML FOR SPLIT TRANSITIONS
    hslider_set_sizes();

    //SET POSITIONING
    hslider_set_position(unique_name);

    //TRIGGET HOVER ANIMATION
    //trigger_hover_animation();

}

var global_yt_object = [];
var global_vim_object = [];

//STOP PREVIOUS SLIDE VIDEO
function stop_previous_slide_video(previous_count, unique_name) {

    var current_slide = jQuery('#hslider_' + unique_name + ' #hslider_id_' + (previous_count));

    jQuery(current_slide).find('[data-element-type="video"]').each(function (index, element) {
        var video_type = jQuery(this).attr('data-video-type');
        var video_id = jQuery(this).attr('data-video-id');
        switch (video_type) {
            case 'youtube':
                yt_video_var_object['hslider_yt_' + video_id].seekTo(0.1);
                yt_video_var_object['hslider_yt_' + video_id].stopVideo();
                break;
            case 'vimeo':
                player[video_id].api('unload');
                break;
        }
    });

}

//PLAY NEXT VIDEO
function play_next_slide_video(next_count, unique_name) {

    //console.log('PLAY SLIDE VIDEO: ' + next_count);

    var current_slide = jQuery('#hslider_' + unique_name + ' #hslider_id_' + (next_count));

    jQuery(current_slide).find('[data-element-type="video"]').each(function (index, element) {
        var video_type = jQuery(this).attr('data-video-type');
        var video_id = jQuery(this).attr('data-video-id');
        switch (video_type) {
            case 'youtube':
                yt_video_var_object['hslider_yt_' + video_id].playVideo();
                break;
            case 'vimeo':
                player[video_id].api('play');
                break;
        }
    });

}

//CREATE VIDEO OBJECT
function create_video_object(object_clone, unique_name) {

    var yt_arr = '{ "unique_name":"' + unique_name + '", "videos":[] }';
    var parse_yt_json = JSON.parse(yt_arr);
    var vim_arr = '{ "unique_name":"' + unique_name + '", "videos":[] }';
    var parse_vim_json = JSON.parse(vim_arr);

    jQuery(object_clone.slider.slides).each(function (index, element) {

        //CHECK ELEMENTS
        if (element.elements.length > 0) {
            jQuery(element.elements).each(function (index, element) {
                if (element.type === 'video' && element.videoType === 'youtube') {
                    parse_yt_json.videos.push(element);
                } else if (element.type === 'video' && element.videoType === 'vimeo') {
                    parse_vim_json.videos.push(element);
                }
            });
        }

    });

    if (parse_yt_json.videos.length > 0) {
        global_yt_object.push(parse_yt_json);
    }

    if (parse_vim_json.videos.length > 0) {
        global_vim_object.push(parse_vim_json);
    }

}

//CHECK WHICH API TO LOAD
function load_video_api(object_clone, unique_name) {

    jQuery(object_clone.slider.slides).each(function (index, element) {

        //CHECK ELEMENTS
        if (element.elements.length > 0) {
            jQuery(element.elements).each(function (index, element) {
                switch (element.videoType) {
                    case 'youtube':
                        load_yt_api(element);
                        break;
                    case 'vimeo':
                        load_vim_api(element);
                        break;
                }
            });
        }

    });

}

//YOUTUBE VARIABLES
var yt_load_count = 0;
var yt_video_var_object = [];

//LOAD YT API
function load_yt_api(element) {

    if (yt_load_count < 1) {
        //YT VARIABLES
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    yt_load_count = 1;

}

//YOUTUBE API READY
function onYouTubeIframeAPIReady() {

    jQuery(global_yt_object).each(function (idx, ele) {
        //loop videos
        jQuery(ele.videos).each(function (index, element) {
            yt_video_var_object.push('hslider_yt_' + element.videoId);
            yt_video_var_object['hslider_yt_' + element.videoId] = new YT.Player('hslider_yt_' + element.videoId, {
                height: element.videoSettings.youtube.height,
                width: element.videoSettings.youtube.width,
                videoId: element.videoId,
                playerVars: { 'autoplay': 0, 'controls': 1 },
                events: {
                    'onReady': function (event) {
                        onPlayerReady(event, hslider_global_obj[ele.unique_name], ele.unique_name);
                    },
                    'onStateChange': function (event) {
                        onPlayerStateChange(event, hslider_global_obj[ele.unique_name], ele.unique_name);
                    }
                }
            });
        });
    });

}

//PLAYER READY
function onPlayerReady(event, obj, unique_name) {

    //ready
    if (obj.slider.video.autoPlay) {

        var current_slide = jQuery('#hslider_' + unique_name + ' #hslider_id_' + (hslider_click_count[unique_name] - 1));

        jQuery(current_slide).find('[data-element-type="video"]').each(function (index, element) {
            var video_type = jQuery(this).attr('data-video-type');
            var video_id = jQuery(this).attr('data-video-id');
            switch (video_type) {
                case 'youtube':
                    yt_video_var_object['hslider_yt_' + video_id].playVideo();
                    break;
            }
        });

    }
}

//STATE CHANGE
function onPlayerStateChange(event, obj, unique_name) {
    if (obj.slider.timer.autoPlay) {
        if (event.data === 1 || event.data === 3) {
            var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].pause();
        } else if (event.data === -1) {
            var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].resume();
        } else {
            var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].resume();
        }
    }
}


var player = [];

//LOAD VIMEO API
var playerOrigin = '*';
function load_vim_api() {

    //get vimeo object
    jQuery(global_vim_object).each(function (key, val) {

        //reference video node
        jQuery(val.videos).each(function (k, v) {

            //define placer container
            if (jQuery('#hslider_vim_' + v.videoId).length > 0) {

                //check if already processed
                if (jQuery('#hslider_vim_' + v.videoId).data('vim-processed') !== 'processed') {

                    //set attr to show complete
                    jQuery('#hslider_vim_' + v.videoId).attr('data-vim-processed', 'processed');
                    var unique_name = jQuery('#hslider_vim_' + v.videoId).attr('data-unique-name');;

                    //process frame data
                    var iframe = jQuery('#hslider_vim_' + v.videoId)[0];
                    player[v.videoId] = $f(iframe);

                    //on ready
                    player[v.videoId].addEvent('ready', function () {

                        if (hslider_global_obj[unique_name].slider.video.autoPlay) {

                            var current_slide = jQuery('#hslider_' + unique_name + ' #hslider_id_' + (hslider_click_count[unique_name] - 1));

                            jQuery(current_slide).find('[data-element-type="video"]').each(function (index, element) {
                                var video_type = jQuery(this).attr('data-video-type');
                                var video_id = jQuery(this).attr('data-video-id');
                                switch (video_type) {
                                    case 'vimeo':
                                        player[v.videoId].api('play');
                                        break;
                                }
                            });

                        }

                        //var_time_array[unique_name][parseInt(hslider_click_count[unique_name]-1)].pause();

                        //pause
                        player[v.videoId].addEvent('pause', function (id) {
                            onPause(id, unique_name, player[v.videoId]);
                        });

                        //finish
                        player[v.videoId].addEvent('finish', function (id) {
                            onFinish(id, unique_name, player[v.videoId]);
                        });

                        //playProgress
                        player[v.videoId].addEvent('playProgress', function (id) {
                            onPlayProgress(id, unique_name, player[v.videoId]);
                        });

                    });

                }

            }

        });

    });

}

//on pause
function onPause(id, unique_name, player) {
    if (hslider_global_obj[unique_name].slider.timer.autoPlay) {
        var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].resume();
    }
}

//on finish
function onFinish(id, unique_name, player) {
    if (hslider_global_obj[unique_name].slider.timer.autoPlay) {
        var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].resume();
    }
}

//on play progress
function onPlayProgress(id, unique_name, player) {
    if (hslider_global_obj[unique_name].slider.timer.autoPlay) {
        var_time_array[unique_name][parseInt(hslider_click_count[unique_name] - 1)].pause();
    }
}

//BUILD CONTENT HTML
function hslider_slide_content_html(element_obj, slide_index, unique_name) {

    var content_html = '';
    var link_start = 'div';
    var link_end = 'div';

    //LOOP THROUGH ALL THE ELEMENTS
    jQuery(element_obj).each(function (index, element) {
        switch (element.type) {
            case 'element':
                if (element.url !== '') {
                    link_start = 'a href="' + element.url + '" target="' + element.target + '" title="' + element.title + '"';
                    link_end = 'a';
                }
                content_html += '<' + link_start + ' class="hslider_image_element hslider_element" data-para-offset="' + element.offset_x + '" data-element-type="' + element.type + '" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '"><img src="' + element.source + '" /></' + link_end + '>';
                break;
            case 'text':
                if (element.url !== '') {
                    link_start = 'a href="' + element.url + '" target="' + element.target + '" title="' + element.title + '"';
                    link_end = 'a';
                }
                content_html += '<' + link_start + ' class="hslider_text_element hslider_element" data-para-offset="' + element.offset_x + '" data-element-type="' + element.type + '" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '">' + element.content + '</' + link_end + '>';
                break;
            case 'button':
                if (element.url !== '') {
                    link_start = 'a href="' + element.url + '" target="' + element.target + '" title="' + element.title + '"';
                    link_end = 'a';
                }
                content_html += '<' + link_start + ' class="hslider_button_element hslider_element hslider_' + element.theme + '" data-para-offset="' + element.offset_x + '" data-element-type="' + element.type + '" data-color="' + element.font[0].color + '" data-secondary="' + element.font[0].secondary + '" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '">' + hslider_button_html(element.content, element.theme) + '</' + link_end + '>';
                break;
            case 'woo':
                //REMEMBER THAT THE PRODUCTS NEED TO BE LOADED DYNAMICALLY FROM THE DB 'WOOCOMMERCE', CURRENTLY ONLY OUT PUTTING STATIC HTML
                content_html += '<div class="hslider_product_element hslider_element" data-element-type="' + element.type + '" data-para-offset="' + element.offset_x + '" data-type="' + element.type + '" data-slide-index="' + slide_index + '" data-index="' + index + '" id="hslider_element_' + element.elementId + '">';
                //content_html += hslider_get_products_html(element_obj);
                content_html += '</div>';
                break;
            case 'video':
                //REMEMBER THAT THE PRODUCTS NEED TO BE LOADED DYNAMICALLY FROM THE DB 'WOOCOMMERCE', CURRENTLY ONLY OUT PUTTING STATIC HTML
                content_html += '<div class="hslider_video_element hslider_element" data-element-type="' + element.type + '" data-para-offset="' + element.offset_x + '" data-video-id="' + element.videoId + '" data-video-type="' + element.videoType + '" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '">';
                content_html += hslider_get_video_html(element, unique_name);
                //insert_video_html(index, data)
                content_html += '</div>';
                break;
            case 'post':
                //REMEMBER THAT THE PRODUCTS NEED TO BE LOADED DYNAMICALLY FROM THE DB 'WOOCOMMERCE', CURRENTLY ONLY OUT PUTTING STATIC HTML
                content_html += '<div class="hslider_post_element hslider_element" data-element-type="' + element.type + '" data-para-offset="' + element.offset_x + '" data-type="' + element.type + '" data-slide-index="' + slide_index + '" data-index="' + index + '" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '">';
                //content_html += hslider_get_posts_html(element_obj);
                content_html += '</div>';
                break;
        }
    });

    return content_html;

}

//GET BUTTON HTML
function hslider_button_html(content, theme) {

    var button_html = '';

    switch (theme) {
        case 'x_factor':
            button_html += '<div class="hslider_line_top"></div>';
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            button_html += '<div class="hslider_line_bottom"></div>';
            break;
        case 'side_pipe':
            button_html += '<div class="hslider_line_left"></div>';
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            button_html += '<div class="hslider_line_right"></div>';
            break;
        case 'side_flat':
            button_html += '<div class="hslider_line_left"></div>';
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            button_html += '<div class="hslider_line_right"></div>';
            break;
        case 'hidden_underline':
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            button_html += '<div class="hslider_line_bottom"></div>';
            break;
        case 'double_line':
            button_html += '<div class="hslider_line_top"></div>';
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            button_html += '<div class="hslider_line_bottom"></div>';
            break;
        case 'double_clamp':
            button_html += '<div class="hslider_line_top"></div>';
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            button_html += '<div class="hslider_line_bottom"></div>';
            break;
        case 'border_button':
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            break;
        case 'full_button':
            button_html += '<div class="hslider_button_content">' + content + '</div>';
            break;
    }

    return button_html;

}

//SET INITIAL SLIDE ANIMATION STATE
function hslider_set_animate_state(hslider_click_count, side, object_clone, unique_name) {
    jQuery(hslider_global_animation_type[unique_name]).each(function (idx, ele) {
        jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').find('[data-animation-type="' + ele + '"]').each(function (index, element) {
            if (idx === 0) {
                eval("hslider_set_animate_" + ele + "(" + hslider_click_count + ", " + idx + ", 0, '" + side + "', '" + JSON.stringify(object_clone) + "', '" + unique_name + "', 'first_load')");
            } else {
                eval("hslider_set_animate_" + ele + "(" + hslider_click_count + ", " + idx + ", 0, '" + side + "', '" + JSON.stringify(object_clone) + "', '" + unique_name + "', 'last_load')");
            }
        });
    });

}

//RE SET INITIAL SLIDE ANIMATION STATE
function hslider_reset_animate_state(hslider_click_count, side, object_clone, unique_name) {

    jQuery(hslider_global_animation_type[unique_name]).each(function (idx, ele) {
        if (idx !== hslider_click_count) {
            jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').find('[data-animation-type="' + ele + '"]').each(function (index, element) {
                eval("hslider_set_animate_" + ele + "(" + hslider_click_count + ", " + idx + ", " + global_duration + ", '" + side + "', '" + JSON.stringify(object_clone) + "', '" + unique_name + "', 'last_load')");
            });
        }
    });

}

//RE SET INITIAL SLIDE ANIMATION POSITION FOR SLIDE AND PARRALAX
function hslider_set_slide_position(hslider_click_count, side, unique_name, object_clone) {

    var animation_type = object_clone.slider.slides[hslider_click_count].animationType;
    var offset = global_slider_animate_width[unique_name];

    if (animation_type === 'lax' || animation_type === 'slide') {
        if (side === 'left') {
            TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + hslider_click_count), 0, { left: '-' + offset + 'px', force3D: true, ease: Power2.easeInOut });
        } else {
            TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + hslider_click_count), 0, { left: offset + 'px', force3D: true, ease: Power2.easeInOut });
        }
    }

}



/*	/////////////////////////////////
 STYLES
 */	/////////////////////////////////

//SETUP STYLES
function hslider_return_styles(object_clone, unique_name) {

    //VARIABLES
    var styles = '';

    //SLIDER STYLES LOOP - FOR IF MORE THAN 2 EXIST
    jQuery(object_clone).each(function (index, element) {

        //VARIABLES
        var slider_id = '#hslider_' + unique_name;

        //START :: ARROW STYLES

        styles += slider_id + ' .hslider_side_btn:before{ ';
        styles += 'color:' + element.slider.arrows.primaryColor + '; ';
        //styles += 'background-color:'+element.slider.arrows.secondaryColor+'; ';
        styles += '}\n';

        styles += slider_id + ' .hslider_side_btn .hslider_side_icon:before{ ';
        styles += 'color:' + element.slider.arrows.primaryColor + '; ';
        //styles += 'background-color:'+element.slider.arrows.secondaryColor+'; ';
        styles += '}\n';

        styles += slider_id + ' .hslider_side_btn .hslider_side_line{ ';
        styles += 'background-color:' + element.slider.arrows.primaryColor + '; ';
        styles += '}\n';

        styles += slider_id + ' .hslider_side_btn .hslider_side_inner{ ';
        //styles += 'background-color:'+element.slider.arrows.secondaryColor+'; ';
        styles += '}\n';

        styles += '.hslider_doubleflip .hslider_side_btn:before{ ';
        styles += 'background-color:' + element.slider.arrows.secondaryColor + ' !important; ';
        styles += '}\n';

        styles += '.hslider_doubleflip .hslider_side_label{ ';
        styles += 'background-color:' + element.slider.arrows.secondaryColor + ' !important; ';
        styles += 'color:' + element.slider.arrows.descriptionColor + '; ';
        styles += '}\n';

        styles += slider_id + ' .hslider_side_btn .hslider_side_label{ ';
        styles += 'color:' + element.slider.arrows.descriptionColor + '; ';
        styles += 'font-family:' + element.slider.arrows.descriptionFamily + '; ';
        styles += 'font-size:' + element.slider.arrows.descriptionSize + element.slider.arrows.descriptionSizing + '; ';
        styles += 'font-weight:' + element.slider.arrows.descriptionWeight + '; ';
        styles += '}\n';

        styles += slider_id + ' .hslider_side_btn .hslider_side_count{ ';
        styles += 'color:' + element.slider.arrows.countColor + '; ';
        styles += 'font-family:' + element.slider.arrows.countFamily + '; ';
        styles += 'font-size:' + element.slider.arrows.countSize + element.slider.arrows.countSizing + '; ';
        styles += 'font-weight:' + element.slider.arrows.countWeight + '; ';
        styles += '}\n';

        //SPECIFIC ARROW STYLES
        switch (element.slider.arrows.type) {
            case 'sideslide':
                styles += slider_id + ' .hslider_side_btn .hslider_side_inner{ ';
                styles += 'background-color:' + element.slider.arrows.secondaryColor + '; ';
                styles += '}\n';
                break;
            case 'rounded':
                styles += slider_id + ' .hslider_side_btn .hslider_side_inner{ ';
                styles += 'background-color:' + element.slider.arrows.secondaryColor + '; ';
                styles += '}\n';
                break;
        }

        //END :: ARROW STYLES

        //START :: TIMER STYLES

        if (element.slider.timer.autoPlay) {
            styles += slider_id + ' .hslider_timer_holder{ ';
            styles += 'display:table; ';
            styles += 'background-color:' + element.slider.timer.primaryColor + '; ';
            styles += 'opacity:' + element.slider.timer.transparency + '; '
            styles += 'filter:' + 'alpha(opacity=' + element.slider.timer.transparency + ')';
            styles += '}\n';
            styles += slider_id + ' .hslider_inner_timer{ ';
            styles += 'display:table; ';
            styles += 'background-color:' + element.slider.timer.secondaryColor + '; ';
            styles += 'opacity:' + element.slider.timer.transparency + '; ';
            styles += 'filter:' + 'alpha(opacity=' + element.slider.timer.transparency + ')';
            styles += '}\n';
        }

        //END :: TIMER STYLES

        //START :: BORDER STYLES

        if (element.slider.border.status) {
            styles += slider_id + '{ ';
            styles += 'border:' + element.slider.border.borderSize + 'px ' + element.slider.border.borderType + ' ' + element.slider.border.borderColor + '; ';
            if (element.slider.border.borderRadius) {
                styles += '-webkit-border-radius:' + element.slider.border.borderRadiusTopLeft + 'px ' + element.slider.border.borderRadiusTopRight + 'px ' + element.slider.border.borderRadiusBottomRight + 'px ' + element.slider.border.borderRadiusBottomLeft + 'px; ';
                styles += '-moz-border-radius:' + element.slider.border.borderRadiusTopLeft + 'px ' + element.slider.border.borderRadiusTopRight + 'px ' + element.slider.border.borderRadiusBottomRight + 'px ' + element.slider.border.borderRadiusBottomLeft + 'px; ';
                styles += 'border-radius:' + element.slider.border.borderRadiusTopLeft + 'px ' + element.slider.border.borderRadiusTopRight + 'px ' + element.slider.border.borderRadiusBottomRight + 'px ' + element.slider.border.borderRadiusBottomLeft + 'px; ';
            }
            styles += '}\n';
        }

        //END :: BORDER STYLES

        //START :: CONTENT TEXT STYLES

        jQuery(element.slider.slides).each(function (idx, ele) {

            //SLIDE SPECIFIC STYLING
            styles += slider_id + ' #hslider_id_' + idx + '{ ';
            styles += 'background-size:' + ele.background[0].backgroundSize + '; ';
            styles += 'background-position:' + ele.background[0].backgroundPosition + '; ';
            styles += 'background-repeat:' + ele.background[0].backgroundRepeat + '; ';
            styles += 'background-color:' + ele.background[0].backgroundColor + '; ';
            styles += '}\n';

            styles += slider_id + ' #hslider_id_' + idx + ' .hslider_split_inner{ ';
            styles += 'background-size:' + ele.background[0].backgroundSize + '; ';
            styles += 'background-position:' + ele.background[0].backgroundPosition + '; ';
            styles += 'background-repeat:' + ele.background[0].backgroundRepeat + '; ';
            styles += 'background-color:' + ele.background[0].backgroundColor + '; ';
            styles += '}\n';

            //ELEMENT SPECIFIC STYLING
            jQuery(ele.elements).each(function (id, el) {

                var slide_id = '#hslider_id_' + idx;

                //ELEMENT TEXT
                switch (el.type) {
                    case 'text':
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                        styles += 'color:' + el.font[0].color + '; ';
                        styles += 'font-family:' + el.font[0].family + '; ';
                        styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                        styles += 'font-weight:' + el.font[0].weight + '; ';
                        styles += 'font-style:' + el.font[0].fontStyle + '; ';
                        styles += 'letter-spacing:' + el.font[0].letterSpacing + '; ';
                        //styles += 'text-transform:'+el.font[0].transform+'; ';
                        styles += 'text-align:' + el.font[0].align + '; ';
                        styles += 'line-height:' + (parseInt(el.font[0].size) + 7) + el.font[0].sizing + '; ';
                        if (el.width !== '' || el.width !== null) { styles += 'width:' + el.width + 'px; '; }
                        styles += '}\n';
                        break;
                    case 'button':
                        switch (el.theme) {
                            case 'x_factor':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size) + 20) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_top, ';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_bottom{ ';
                                styles += 'background-color:' + el.font[0].color + ';';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                break;
                            case 'side_pipe':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size) + 10) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_left, ';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_right{ ';
                                styles += 'height:' + (parseInt(el.font[0].size) + 8) + 'px;';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                break;
                            case 'side_flat':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size) + 9) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_left, ';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_right{ ';
                                styles += 'height:' + (parseInt(el.font[0].size) + 8) + 'px;';
                                styles += 'background-color:' + el.font[0].secondary;
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_left{ ';
                                styles += 'left: -15px';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_right{ ';
                                styles += 'right: -15px';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                break;
                            case 'hidden_underline':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size)) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                break;
                            case 'double_line':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size)) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_top, ';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_line_bottom{ ';
                                styles += 'background-color:' + el.font[0].secondary;
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                break;
                            case 'double_clamp':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size)) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                break;
                            case 'border_button':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size)) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'border-color:' + el.font[0].secondary;
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                if (el.borderType === "rounded") {
                                    styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                    styles += '-webkit-border-radius: 200px ;';
                                    styles += '-moz-border-radius: 200px ;';
                                    styles += 'border-radius: 200px ;';
                                    styles += 'overflow: hidden ;';
                                    styles += '}\n';
                                    styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                    styles += '-webkit-border-radius: 200px ;';
                                    styles += '-moz-border-radius: 200px ;';
                                    styles += 'border-radius: 200px ;';
                                    styles += '}\n';
                                }
                                break;
                            case 'full_button':
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'line-height:' + (parseInt(el.font[0].size)) + 'px; ';
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
                                styles += 'background-color:' + el.font[0].secondary;
                                styles += '}\n';
                                styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                styles += 'color:' + el.font[0].color + '; ';
                                styles += 'font-family:' + el.font[0].family + '; ';
                                styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
                                styles += 'font-weight:' + el.font[0].weight + '; ';
                                styles += 'text-transform:' + el.font[0].transform + '; ';
                                styles += '}\n';
                                if (el.borderType === "rounded") {
                                    styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + '{ ';
                                    styles += '-webkit-border-radius: 200px ;';
                                    styles += '-moz-border-radius: 200px ;';
                                    styles += 'border-radius: 200px ;';
                                    styles += 'overflow: hidden ;';
                                    styles += '}\n';
                                }
                                break;
                        }
                        break;
                    case 'product':
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_product_name{ ';
                        styles += 'color:' + el.settings[0].font[0].heading[0].fontColor + '; ';
                        styles += 'font-weight:' + el.settings[0].font[0].heading[0].fontWeight + '; ';
                        styles += 'font-size:' + el.settings[0].font[0].heading[0].fontSize + el.settings[0].font[0].heading[0].fontSizing + '; ';
                        styles += '}\n';
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_product_price{ ';
                        styles += 'color:' + el.settings[0].font[0].price[0].fontColor + '; ';
                        styles += 'font-weight:' + el.settings[0].font[0].price[0].fontWeight + '; ';
                        styles += 'font-size:' + el.settings[0].font[0].price[0].fontSize + el.settings[0].font[0].price[0].fontSizing + '; ';
                        styles += '}\n';
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_product_excerpt{ ';
                        styles += 'color:' + el.settings[0].font[0].excerpt[0].fontColor + '; ';
                        styles += 'font-weight:' + el.settings[0].font[0].excerpt[0].fontWeight + '; ';
                        styles += 'font-size:' + el.settings[0].font[0].excerpt[0].fontSize + el.settings[0].font[0].excerpt[0].fontSizing + '; ';
                        styles += '}\n';
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_product_cart_button{ ';
                        styles += 'color:' + el.settings[0].font[0].button.fontColor + '; ';
                        styles += 'font-weight:' + el.settings[0].font[0].button.fontWeight + '; ';
                        styles += 'font-size:' + el.settings[0].font[0].button.fontSize + el.settings[0].font[0].button.fontSizing + '; ';
                        styles += '}\n';
                        break;
                    case 'post':
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_post_name{ ';
                        styles += 'color:' + el.settings[0].font[0].heading[0].fontColor + '; ';
                        styles += 'font-weight:' + el.settings[0].font[0].heading[0].fontWeight + '; ';
                        styles += 'font-size:' + el.settings[0].font[0].heading[0].fontSize + el.settings[0].font[0].heading[0].fontSizing + '; ';
                        styles += '}\n';
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_post_excerpt{ ';
                        styles += 'color:' + el.settings[0].font[0].excerpt[0].fontColor + '; ';
                        styles += 'font-weight:' + el.settings[0].font[0].excerpt[0].fontWeight + '; ';
                        styles += 'font-size:' + el.settings[0].font[0].excerpt[0].fontSize + el.settings[0].font[0].excerpt[0].fontSizing + '; ';
                        styles += '}\n';
                        styles += slider_id + ' ' + slide_id + ' #hslider_element_' + el.elementId + ' .hslider_post_button{ ';
                        styles += 'color:' + el.settings[0].font[0].button.fontColor + '; ';
                        styles += 'font-weight:' + el.settings[0].font[0].button.fontWeight + '; ';
                        styles += 'font-size:' + el.settings[0].font[0].button.fontSize + el.settings[0].font[0].button.fontSizing + '; ';
                        styles += '}\n';
                        break;
                }

            });


        });


        //END :: CONTENT TEXT STYLES

    });

    return styles;

}



/*	/////////////////////////////////
 SET ANIMATION
 */	/////////////////////////////////

function reset_burns(index, unique_name, object_clone) {
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index + ' .ken_burns_' + index), 0, { css: { transform: "scale(1,1)", force3D: true, transformOrigin: object_clone.slider.slides[index].background[0].burnsDirection }, ease: Power0.easeNone });
}

//SET ANIMATE FADE
function hslider_set_animate_fade(hslider_click_count, index, duration, side, object_clone, unique_name, initial_load) {

    //SET
    var obj = JSON.parse(object_clone);
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), duration, { opacity: 0, force3D: true, zIndex: 0, ease: Power2.easeInOut, onComplete: reset_burns, onCompleteParams: [index, unique_name, obj] });

}

//SET ANIMATE SLIDE
function hslider_set_animate_slide(hslider_click_count, index, duration, side, object_clone, unique_name, initial_load) {

    var shift_to = 0;
    var opacity_val = 0;

    if (initial_load !== 'first_load') {
        if (side === 'left') {
            shift_to = global_slider_animate_width[unique_name];
        } else {
            shift_to = -global_slider_animate_width[unique_name];
        }
        opacity_val = 1;
    }

    //SET
    var obj = JSON.parse(object_clone);
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), duration, { opacity: opacity_val, force3D: true, zIndex: 0, left: shift_to, ease: Power2.easeInOut, onComplete: reset_burns, onCompleteParams: [index, unique_name, obj] });

}

//SET ANIMATE PARRALAX
function hslider_set_animate_lax(hslider_click_count, index, duration, side, object_clone, unique_name, initial_load) {

    var shift_to = 0;

    if (side == 'left') {
        shift_to = global_slider_animate_width[unique_name];
    } else {
        shift_to = -global_slider_animate_width[unique_name];
    }

    //SET
    var obj = JSON.parse(object_clone);
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), duration, { opacity: 1, force3D: true, zIndex: 0, left: shift_to, ease: Power2.easeInOut, onUpdate: hslider_animate_parralax_elements, onUpdateParams: ['#hslider_' + unique_name + ' #hslider_id_' + index, side, 'out', unique_name], onComplete: reset_burns, onCompleteParams: [index, unique_name, obj] });

}

//SET ANIMATE ZOOM
function hslider_set_animate_zoom(hslider_click_count, index, duration, side, object_clone, unique_name, initial_load) {

    //SET
    var obj = JSON.parse(object_clone);
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), duration, { opacity: 0, force3D: true, zIndex: 0, scaleX: 0.5, scaleY: 0.5, ease: Power2.easeInOut, onComplete: reset_burns, onCompleteParams: [index, unique_name, obj], force3D: true, rotationZ: 0.01 });

}

//SET ANIMATE SPLIT
function hslider_set_animate_split(hslider_click_count, index, duration, side, object_clone, unique_name, initial_load) {

    //SET
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), duration, { opacity: 1, zIndex: 0, force3D: true, ease: Power2.easeInOut });

    jQuery('#hslider_' + unique_name + ' #hslider_id_' + index).each(function (index, element) {

        var count = 0;

        jQuery(this).children('.hslider_split_animation_holder').children('div').each(function (index, element) {

            if (count == 0) {
                TweenLite.to(jQuery(this), duration, { marginTop: -700, rotation: 20, scaleX: 1.2, scaleY: 1.2, force3D: true, ease: Power2.easeInOut });
            } else {
                TweenLite.to(jQuery(this), duration, { marginTop: 1400, rotation: 20, scaleX: 1.2, scaleY: 1.2, force3D: true, ease: Power2.easeInOut });
            }

            count++;

        });

    });

}



/*	/////////////////////////////////
 ANIMATION
 */	/////////////////////////////////

var hslider_tween = new TimelineLite();

//ANIMATE PARRALAX ELEMENTS
function hslider_animate_parralax_elements(holder, side, status, unique_name) {

    var opac = 1;

    if (status === 'out') {
        opac = 1;
    }

    var holder_position = jQuery(holder).position();
    var the_total = global_slider_animate_width[unique_name];
    var prec_usage = 0;

    if (side === 'left') {
        prec_usage = the_total - Math.abs(holder_position.left);
    } else {
        prec_usage = the_total - holder_position.left;
    }

    var percentage = 0;

    //CHECK IF SLIDE IS COMING IN OUR GOING OUT
    if (status === 'out') {
        if (side === 'left') {
            percentage = Math.abs(holder_position.left) / the_total;
        } else {
            percentage = Math.abs(prec_usage - the_total) / the_total;
        }
    } else {
        percentage = prec_usage / the_total;
    }

    var offset_by = 0;

    var var_array = [];

    jQuery(holder + ' .hslider_slide_content_holder .hslider_element').each(function (index, element) {

        var position = jQuery(this).attr('data-finish');
        var element_para_offset = parseInt(jQuery(this).attr('data-para-offset'));

        if (status === 'out') {

            /*if(side === 'left'){
             offset_by = -400 * (index + 1);
             } else {
             offset_by = 400 * (index + 1);
             }*/


            if (side === 'left') {
                offset_by = -(element_para_offset);
            } else {
                offset_by = element_para_offset;
            }

            position = jQuery(this).attr('data-finish') - offset_by;

        }

        //push tween element variables
        var_array.push('tween_ele_time_' + index);

        var_array[index] = new TimelineLite();

        var_array[index].to(jQuery(this), global_duration, { opacity: opac, zIndex: 999, force3D: true, left: position, ease: Power2.easeInOut });

        var_array[index].pause();

        if (status === 'out') {

            var_array[index].progress(percentage);

        } else {

            var_array[index].progress(percentage / 3);

        }

    });


    //percentage.toFixed(2);

}

//ANIMATE ELEMENTS
function hslider_animate_elements(holder, index, side, unique_name, object_clone) {

    var obj = JSON.parse(object_clone);

    jQuery(holder + " .hslider_slide_content_holder .hslider_element").each(function (ix, element) {

        //VARIABLES
        var ele_x;
        var ele_y;
        var animation = obj.slider.slides[index].elements[ix].animation[0].direction;
        var distance = parseInt(obj.slider.slides[index].elements[ix].animation[0].distance);

        //check if animation type is custom or not
        if (animation === 'custom') {
            ele_x = parseInt(obj.slider.slides[index].elements[ix].x);
            ele_y = parseInt(obj.slider.slides[index].elements[ix].y);
        } else {
            ele_x = parseInt(obj.slider.slides[index].elements[ix].x);
            ele_y = parseInt(obj.slider.slides[index].elements[ix].y);
        }

        var ele_animationType = obj.slider.slides[index].elements[ix].animation[0].animationType;
        var ele_animationStrength = obj.slider.slides[index].elements[ix].animation[0].animationStrength;
        var ele_animationEasing = obj.slider.slides[index].elements[ix].animation[0].animationEasing;
        var ele_direction = obj.slider.slides[index].elements[ix].animation[0].direction;
        var ele_delay = obj.slider.slides[index].elements[ix].animation[0].delay;
        var ele_duration = obj.slider.slides[index].elements[ix].animation[0].duration;
        var ele_rotation = obj.slider.slides[index].elements[ix].animation[0].rotation;
        var ele_startOpacity = obj.slider.slides[index].elements[ix].animation[0].startOpacity;
        var ele_endOpacity = obj.slider.slides[index].elements[ix].animation[0].endOpacity;

        TweenLite.to(jQuery(this), ele_duration, {
            opacity: ele_endOpacity,
            zIndex: ix,
            left: ele_x,
            top: ele_y,
            delay: ele_delay,
            rotation: 0,
            force3D: true,
            ease: eval(ele_animationStrength + "." + ele_animationEasing)
        });

    });

}

//SET ELEMENTS
function hslider_set_elements(holder, index, side, type, obj) {

    //FIND ALL ELEMENTS WITHIN HOLDER
    var offset_by = 0;

    //CHECK IF THE TYPE IS FOR PARRALAX OR BASIC TWEEN ANIMATIONS
    switch (type) {
        case 'lax':
            jQuery(holder + ' .hslider_slide_content_holder .hslider_element').each(function (idx, element) {
                var element_para_offset = parseInt(jQuery(this).attr('data-para-offset'));
                if (side === 'left') {
                    offset_by = element_para_offset;
                } else {
                    offset_by = -(element_para_offset);
                }
                var offset = jQuery(this).attr('data-finish') - offset_by;
                var offset_y = jQuery(this).attr('data-y');
                /*jQuery(this).css({
                 'left': offset + 'px',
                 'top': offset_y + 'px'
                 });*/
                TweenLite.to(jQuery(this), 0, { left: offset, top: offset_y, force3D: true, ease: Circ.easeInOut });
            });
            break;
        case 'basic':

            var the_type = jQuery(holder).attr('data-slide-type');

            if (the_type === 'content') {

                jQuery(holder + " .hslider_slide_content_holder .hslider_element").each(function (ix, element) {

                    //VARIABLES
                    //var ele_x = hslider_global_obj.slider.slides[index].elements[ix].offset_x;
                    //var ele_y = hslider_global_obj.slider.slides[index].elements[ix].offset_y;
                    var ele_x;
                    var ele_y;
                    var animation = obj.slider.slides[index].elements[ix].animation[0].direction;
                    var distance = parseInt(obj.slider.slides[index].elements[ix].animation[0].distance);

                    var ele_start_opac = obj.slider.slides[index].elements[ix].animation[0].startOpacity;

                    var ele_rotation = obj.slider.slides[index].elements[ix].animation[0].rotation;

                    //check if animation type is custom or not
                    if (animation === 'custom') {
                        ele_x = parseInt(obj.slider.slides[index].elements[ix].offset_x);
                        ele_y = parseInt(obj.slider.slides[index].elements[ix].offset_y);
                    } else {
                        switch (animation) {
                            case 'left_right':
                                ele_x = parseInt(obj.slider.slides[index].elements[ix].x) - distance;
                                ele_y = parseInt(obj.slider.slides[index].elements[ix].y);
                                break;
                            case 'right_left':
                                ele_x = parseInt(obj.slider.slides[index].elements[ix].x) + distance;
                                ele_y = parseInt(obj.slider.slides[index].elements[ix].y);
                                break;
                            case 'top_down':
                                ele_x = parseInt(obj.slider.slides[index].elements[ix].x);
                                ele_y = parseInt(obj.slider.slides[index].elements[ix].y) - distance;
                                break;
                            case 'down_top':
                                ele_x = parseInt(obj.slider.slides[index].elements[ix].x);
                                ele_y = parseInt(obj.slider.slides[index].elements[ix].y) + distance;
                                break;
                        }
                    }

                    //run animation
                    TweenLite.to(jQuery(this), 0, { opacity: ele_start_opac, force3D: true, rotation: ele_rotation, zIndex: ix, left: ele_x, top: ele_y, ease: Circ.easeInOut });

                });

            }

            break;
    }

}

//ANIMATE FADE
function hslider_animate_fade(hslider_click_count, index, side, unique_name, object_clone, initial_load) {

    //SET ELEMENT START
    var obj = JSON.parse(object_clone);
    hslider_set_elements('#hslider_' + unique_name + ' #hslider_id_' + index, index, side, 'basic', obj);

    //SET
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), global_duration, { opacity: 1, force3D: true, ease: Power2.easeInOut, onStart: hslider_animate_elements, onStartParams: ['#hslider_' + unique_name + ' #hslider_id_' + index, index, side, unique_name, object_clone] });

    //ZINDEX
    jQuery('#hslider_' + unique_name + ' #hslider_id_' + index).css({
        'z-index': '999'
    });
}

//ANIMATE SLIDE
function hslider_animate_slide(hslider_click_count, index, side, unique_name, object_clone, initial_load) {

    var obj = JSON.parse(object_clone);
    hslider_set_elements('#hslider_' + unique_name + ' #hslider_id_' + index, index, side, 'basic', obj);

    //SET
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), global_duration, { opacity: 1, force3D: true, left: 0, ease: Power2.easeInOut, onStart: hslider_animate_elements, onStartParams: ['#hslider_' + unique_name + ' #hslider_id_' + index, index, side, unique_name, object_clone] });

    //ZINDEX
    jQuery('#hslider_' + unique_name + ' #hslider_id_' + index).css({
        'z-index': '999'
    });

}

//ANIMATE PARRALAX
function hslider_animate_lax(hslider_click_count, index, side, unique_name, object_clone, initial_load) {

    var obj = JSON.parse(object_clone);
    hslider_set_elements('#hslider_' + unique_name + ' #hslider_id_' + index, index, side, 'lax', obj);

    //SET
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), global_duration, { opacity: 1, force3D: true, left: 0, ease: Power2.easeInOut, onUpdate: hslider_animate_parralax_elements, onUpdateParams: ['#hslider_' + unique_name + ' #hslider_id_' + index, side, 'in', unique_name] });

    //ZINDEX
    jQuery('#hslider_' + unique_name + ' #hslider_id_' + index).css({
        'z-index': '999'
    });

}

//ANIMATE ZOOM
function hslider_animate_zoom(hslider_click_count, index, side, unique_name, object_clone, initial_load) {

    var obj = JSON.parse(object_clone);
    hslider_set_elements('#hslider_' + unique_name + ' #hslider_id_' + index, index, side, 'basic', obj);

    //SET
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), global_duration, { opacity: 1, force3D: true, scaleX: 1, scaleY: 1, ease: Power2.easeInOut, onStart: hslider_animate_elements, onStartParams: ['#hslider_' + unique_name + ' #hslider_id_' + index, index, side, unique_name, object_clone] });

    //ZINDEX
    jQuery('#hslider_' + unique_name + ' #hslider_id_' + index).css({
        'z-index': '999'
    });

}

//ANIMATE SPLIT
function hslider_animate_split(hslider_click_count, index, side, unique_name, object_clone, initial_load) {

    var obj = JSON.parse(object_clone);
    hslider_set_elements('#hslider_' + unique_name + ' #hslider_id_' + index, index, side, 'basic', obj);

    //SET
    TweenLite.to(jQuery('#hslider_' + unique_name + ' #hslider_id_' + index), global_duration, { opacity: 1, force3D: true, ease: Power2.easeInOut, onStart: hslider_animate_elements, onStartParams: ['#hslider_' + unique_name + ' #hslider_id_' + index, index, side, unique_name, object_clone] });

    //ZINDEX
    jQuery('#hslider_' + unique_name + ' #hslider_id_' + index).css({
        'z-index': '999'
    });

    jQuery('#hslider_' + unique_name + ' #hslider_id_' + index).each(function (index, element) {

        var count = 0;

        jQuery(this).children('.hslider_split_animation_holder').children('div').each(function (index, element) {

            if (count == 0) {
                TweenLite.to(jQuery(this), global_duration, { marginTop: 0, rotation: 0, scaleX: 1, force3D: true, scaleY: 1, ease: Power2.easeInOut });
            } else {
                TweenLite.to(jQuery(this), global_duration, { marginTop: 0, rotation: 0, scaleX: 1, force3D: true, scaleY: 1, ease: Power2.easeInOut });
            }

            count++;

        });

    });

}



/*	/////////////////////////////////
 SET
 */	/////////////////////////////////

//SET SIZES
function hslider_set_sizes() {

    jQuery('.hslider_slide_holder').find('[data-animation-type="split"]').each(function (index, element) {

        var holder_width = jQuery(this).width();
        var holder_height = jQuery(this).height();

        var div_inner_width = holder_width;
        var div_inner_height = holder_height / 2;

        jQuery(this).children('.hslider_split_animation_holder').children('div').each(function (index, element) {

            var negative_position = div_inner_height * index;

            jQuery(this).css({
                'width': div_inner_width,
                'height': div_inner_height,
                'background-position': '0px -' + negative_position + 'px'
            });

        });

    });

    jQuery('.hslider_slide_holder').find('.hslider_post_element').each(function (index, element) {

        var post_holder_width = jQuery(this).width();
        var post_holder_height = jQuery(this).height();

        var number_of_posts = jQuery(this).children('div').length;

        jQuery(this).children('div').css({
            'width': (post_holder_width / number_of_posts)
        });

    });

}

//SET POSITIONS
function hslider_set_position(unique_name) {

    var slide_width = jQuery('.hslider_slide').width();
    var slide_height = jQuery('.hslider_slide').height();

    jQuery('.hslider_slide_holder').find('.hslider_product_element').each(function (index, element) {

        var element_prod_width = jQuery(this).width();
        var element_prod_height = jQuery(this).height();

        jQuery(this).css({
            'left': '50%',
            'margin-left': '-' + (element_prod_width / 2) + 'px',
            'top': '50%',
            'margin-top': '-' + (element_prod_height / 2) + 'px'
        });

    });

}



/*	/////////////////////////////////
 DATA ARRAY
 */	/////////////////////////////////

//BUILD ARRAYS OF DATA - WE USE THIS INSTEAD TO REDUCE CLUTTER WITHIN THE HTML - RATHER USE ARRAYS WITH THE SAME INDEX POSITION TO CHECK WHAT NEEDS TO BE DONE
function hslider_build_data_arrays(object_clone, unique_name) {

    var arr = [];

    //BUILD ANIMATION TYPE ARRAY
    jQuery(object_clone.slider.slides).each(function (index, element) {
        arr.push(element.animationType);
    });

    hslider_global_animation_type[unique_name] = arr;

    //BUILD BUTTON ELEMENT ARRAY
    jQuery(object_clone.slider.slides).each(function (index, element) {
        jQuery(element.elements).each(function (id, ele) {
            if (ele.type === 'button') {
                hslider_global_button_type.push(ele.theme);
            }
        });
    });

    //BUILD SIDE BUTTON ARRAThslider_global_side_type
    jQuery(object_clone.slider).each(function (index, element) {
        hslider_global_side_type.push(element.arrows.type);
    });

}



/*	/////////////////////////////////
 HTML
 */	/////////////////////////////////

//BUILD VIDEO HTML
function hslider_get_video_html(element, unique_name) {

    //variables
    var html = '';
    var type = element.videoType;

    var w, h, c, v;

    switch (type) {
        case 'youtube':
            //variables
            w = element.videoSettings.youtube.width;
            h = element.videoSettings.youtube.height;
            c = element.videoSettings.youtube.theme;
            v = element.videoId;
            //html += '<iframe type="text/html" id="hslider_yt_'+element.elementId+'" theme="light" src="http://www.youtube.com/embed/'+v+'" width="'+w+'" height="'+h+'" color="CC0000" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            html += '<div id="hslider_yt_' + element.videoId + '"></div>';

            break;
        case 'vimeo':
            //variables
            w = element.videoSettings.vimeo.width;
            h = element.videoSettings.vimeo.height;
            c = element.videoSettings.vimeo.color.replace('#', '');
            v = element.videoId;

            vimeo_unique_name = unique_name;

            html += '<iframe id="hslider_vim_' + element.videoId + '" data-unique-name="' + unique_name + '" src="https://player.vimeo.com/video/' + v + '?color=' + c + '&amp;api=1&amp;player_id=hslider_vim_' + element.videoId + '" width="' + w + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            break;
    }

    return html;

}

//BUILD ANIMTATION HTML
function hslider_build_animation_html(animation_type, background_image) {

    var animation_html = '';

    switch (animation_type) {
        case 'split':
            animation_html += '<div class="hslider_split_animation_holder">';
            animation_html += '<div class="hslider_split_inner" style="background-image:url(' + background_image + ')"></div>';
            animation_html += '<div class="hslider_split_inner" style="background-image:url(' + background_image + ')"></div>';
            animation_html += '</div>';
            break;
    }

    return animation_html;

}

//CHECK BG VIDEO
function hslider_check_bg_video(unique_name, slide_count) {

    //STOP
    jQuery('#hslider_' + unique_name).children('.hslider_slide_holder').find('video').each(function () {
        global_bg_video_array[jQuery(this).attr('id')].pause();
    });
    //PLAY
    jQuery('#hslider_' + unique_name).children('.hslider_slide_holder').children('[id="hslider_id_' + (slide_count - 1) + '"]').find('video').each(function () {
        global_bg_video_array[jQuery(this).attr('id')].load();
        global_bg_video_array[jQuery(this).attr('id')].play();
    });

}

//BUILD VIDEO BG HTML
function hslider_build_video_bg_html(obj, unique_name, video_count, width, height) {

    var source_html = '';

    source_html += '<div class="hslider_video_changer" style="width:' + width + 'px; height:' + height + 'px; position:absolute; overflow:hidden; top:0; left:0; z-index:-1;">';

    source_html += '<video playsinline width="800" height="800" loop poster="' + obj.backgroundDefault + '" data-index="' + video_count + '" src="' + obj.mp4 + '" id="bg_' + unique_name + '_' + video_count + '">';

    if (obj.mp4 !== '') {
        source_html += '<source src="' + obj.mp4 + '" type="video/mp4" />';
    }

    if (obj.ogg !== '') {
        source_html += '<source src="' + obj.ogg + '" type="video/ogg" />';
    }

    if (obj.webm !== '') {
        source_html += '<source src="' + obj.webm + '" type="video/webm" />';
    }

    source_html += '</video>';

    source_html += '</div>';

    return source_html;

}

var min_w = 300; // minimum video width allowed
var vid_w_orig;  // original video dimensions
var vid_h_orig;

function hslider_video_size(width, height, unique_name) {

    vid_w_orig = parseInt(jQuery('video').attr('width'));
    vid_h_orig = parseInt(jQuery('video').attr('height'));

    jQuery(window).on('resize', function () { hslider_resize_video(width, height, unique_name); });
    jQuery(window).trigger('resize');

}

function hslider_resize_video(width, height, unique_name) {

    // set the video viewport to the window size
    jQuery('#hslider_' + unique_name + ' .hslider_video_changer').width(width);
    jQuery('#hslider_' + unique_name + ' .hslider_video_changer').height(height);

    // use largest scale factor of horizontal/vertical
    var scale_h = jQuery('#hslider_' + unique_name + ' .hslider_video_changer').width() / vid_w_orig;
    var scale_v = jQuery('#hslider_' + unique_name + ' .hslider_video_changer').height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) { scale = min_w / vid_w_orig; };

    // now scale the video
    jQuery('#hslider_' + unique_name + ' video').width(scale * vid_w_orig);
    jQuery('#hslider_' + unique_name + ' video').height(scale * vid_h_orig);

    // and center it by scrolling the video viewport
    jQuery('#hslider_' + unique_name + ' .hslider_video_changer').scrollLeft((jQuery('#hslider_' + unique_name + ' video').width() - jQuery('#hslider_' + unique_name + ' .hslider_video_changer').width()) / 2);
    jQuery('#hslider_' + unique_name + ' .hslider_video_changer').scrollTop((jQuery('#hslider_' + unique_name + ' video').height() - jQuery('#hslider_' + unique_name + ' .hslider_video_changer').height()) / 2);
}

//GET SIDE BUTTON HTML
function hslider_get_side_button_html(object_clone, unique_name) {

    var side_html = '';

    switch (object_clone.slider.arrows.type) {
        case 'fold':
            side_html += '<div class="hslider_side_inner">';
            side_html += '<div class="hslider_side_image_wrap">';
            side_html += '<div class="hslider_side_image"></div>';
            side_html += '</div>';
            side_html += '<div class="hslider_side_label"></div> ';
            side_html += '</div>';
            break;
        case 'fullarrow':
            side_html += '<div class="hslider_side_inner">';
            side_html += '<div class="hslider_side_image_wrap">';
            side_html += '<div class="hslider_side_image"></div>';
            side_html += '</div>';
            side_html += '<div class="hslider_side_label"></div> ';
            side_html += '</div>';
            break;
        case 'sideslide':
            side_html += '<div class="hslider_side_inner">';
            side_html += '<div class="hslider_side_image_wrap">';
            side_html += '<div class="hslider_side_image"></div>';
            side_html += '</div>';
            side_html += '<div class="hslider_side_label"></div> ';
            side_html += '</div>';
            break;
        case 'circle':
            side_html += '<div class="hslider_side_inner">';
            side_html += '<div class="hslider_side_image_wrap">';
            side_html += '<div class="hslider_side_image"></div>';
            side_html += '</div>';
            side_html += '<div class="hslider_side_label"></div> ';
            side_html += '</div>';
            break;
        case 'rounded':
            side_html += '<div class="hslider_side_inner">';
            side_html += '<div class="hslider_side_image"></div>';
            side_html += '<div class="hslider_side_label"></div> ';
            side_html += '</div>';
            break;
        case 'doubleflip':
            side_html += '<div class="hslider_side_inner">';
            //side_html += '<div class="hslider_side_image"></div>';
            side_html += '<div class="hslider_side_image_wrap">';
            side_html += '<div class="hslider_side_image"></div>';
            side_html += '</div>';
            side_html += '<div class="hslider_side_label"></div> ';
            side_html += '</div>';
            break;
        case 'bend':
            side_html += '<div class="hslider_side_icon"></div>';
            side_html += '<div class="hslider_side_inner">';
            side_html += '<div class="hslider_side_line"></div>';
            side_html += '<div class="hslider_side_count">1of3</div>';
            side_html += '<div class="hslider_side_image"></div>';
            side_html += '<div class="hslider_side_label">Description here</div>';
            side_html += '</div>';
            break;
    }

    //ADD THE CLASS TO THE MISC HOLDER
    jQuery('#hslider_' + unique_name).addClass('hslider_' + object_clone.slider.arrows.type);

    //INSERT THE HTML
    jQuery('#hslider_' + unique_name + ' .hslider_side_btn').each(function (index, element) {
        jQuery(this).html(side_html);
    });

}



/*	/////////////////////////////////
 PRELOADER
 */	/////////////////////////////////

// PRELOADER VARIABLES
var hslider_loader_images = [];
var hslider_loader_count = [];

// PRELOADER
function hslider_define_preload_images(object_clone, unique_name) {

    hslider_loader_count[unique_name] = 0;

    var arr = [];

    //GET IMAGES AND PUSH THEM INTO ARRAY
    jQuery(object_clone.slider.slides).each(function (index, element) {
        //BACKGROUND
        if (element.background[0].type !== 'video' && element.background[0].backgroundImage !== '') {
            arr.push(element.background[0].backgroundImage);
        }
        //ELEMENTS
        jQuery(element.elements).each(function (idx, el) {
            if (el.type === 'element' && el.source !== '') {
                arr.push(el.source);
            }
        });
    });

    hslider_loader_images[unique_name] = arr;

}


// PRELOADER EXECUTE
function hslider_execute_preload_images(object_clone, unique_name) {

    //jQuery( ".hslider_loader" ).html('LOADING... ' + perc + '%');
    TweenLite.to(jQuery('#hslider_loader_' + unique_name), 1, { opacity: 1, force3D: true, ease: Power2.easeInOut });

    if (hslider_loader_images[unique_name].length > 0) {

        // Add the image element to the document and give it a ID based on the current load position
        jQuery('#hslider_hidden_' + unique_name).append('<img width="100" src="' + hslider_loader_images[unique_name][hslider_loader_count[unique_name]] + '" id="loadimage' + hslider_loader_count[unique_name] + '">');

        // Bind the load event to the image
        jQuery('#hslider_hidden_' + unique_name + ' #loadimage' + hslider_loader_count[unique_name]).load(function () {

            // Increment the load count once the image is loaded successfuly
            hslider_loader_count[unique_name]++;

            // Calculate the percentage based on the current load position based on the amount of images
            var perc = Math.ceil((hslider_loader_count[unique_name] / hslider_loader_images[unique_name].length) * 100);

            // Use the percentage to animate a preloaded bar.
            if (perc == 100) {
                //ACTIVATE SLIDER
                hslider_activate_slider(object_clone, unique_name);
                TweenLite.to(jQuery('#hslider_loader_' + unique_name), 1, { opacity: 0, force3D: true, marginTop: -50, ease: Power2.easeInOut });
            }

            if (hslider_loader_count[unique_name] < hslider_loader_images[unique_name].length) {
                hslider_execute_preload_images(object_clone, unique_name);
            }

        });

    } else {

        hslider_activate_slider(object_clone, unique_name);
        TweenLite.to(jQuery('#hslider_loader_' + unique_name), 1, { opacity: 0, force3D: true, marginTop: -50, ease: Power2.easeInOut });

    }

}

/*	/////////////////////////////////
 TRIGGER RESIZE
 */	/////////////////////////////////

var global_slider_animate_width = [];

//EXECUTE RESIZE
function hslider_execute_resize(object_clone, unique_name) {

    jQuery('#hslider_width_checker_' + unique_name).parent('div').parent('div').css({
        'position': 'relative'
    });

    //SET GLOBAL VARIABLES
    checker_width[unique_name] = jQuery('#hslider_width_checker_' + unique_name).width();

    //SET WIDTHS
    slide_width[unique_name] = object_clone.slider.width;
    slide_height[unique_name] = object_clone.slider.height;

    if (object_clone.slider.sliderType === 'responsive') {
        slide_width[unique_name] = 1200;
        global_slider_animate_width[unique_name] = checker_width[unique_name];
        jQuery('#hslider_' + unique_name).css({
            'width': '100%',
            'height': slide_height[unique_name] + 'px'
        });
        jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').css({
            'width': '100%',
            'height': slide_height[unique_name] + 'px'
        });
    } else {
        global_slider_animate_width[unique_name] = slide_width[unique_name];
        jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').css({
            'width': slide_width[unique_name] + 'px',
            'height': slide_height[unique_name] + 'px'
        });
    }

    //ACTIVATE WIDTH CHECK
    activate_width_checker(slide_width[unique_name], checker_width[unique_name], object_clone.slider.sliderType, unique_name);

    //ACTIVATE RESIZER
    activate_resizer_checker(object_clone.slider.sliderType, unique_name);

}

function resize_ken_img() {

    jQuery('.ken_burns_hero_img').each(function (index, element) {

        var img_width = jQuery(this).width();

        var left_margin = -(img_width / 2);

        jQuery(this).css({
            'left': '50%',
            'margin-left': left_margin
        });

    });

}

function position_video() {

    jQuery('.hslider_slide video').each(function (index, element) {

        var video_height = jQuery(this).height();

        var top_margin = -(video_height / 2);

        jQuery(this).css({
            //'margin-top':top_margin
        });

    });

}

//CHECK THE WIDTH AND SCALE ACCORDINGLY
function activate_width_checker(slide_width, checker_width, responsive_type, unique_name) {

    var scale_value = checker_width / slide_width;

    if (checker_width <= slide_width) {
        if (responsive_type === 'responsive') {
            jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').width(slide_width);
            global_slider_animate_width[unique_name] = 1200;
        } else {
            global_slider_animate_width[unique_name] = slide_width;
        }
        TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_slide_holder'), 0, { transformOrigin: "left top", force3D: true, scale: scale_value, ease: Power2.easeInOut });
        jQuery('#hslider_' + unique_name).height(slide_height[unique_name] * scale_value);
        jQuery('#hslider_' + unique_name).width(checker_width);
    } else {
        //jQuery(slide_html()).insertBefore('.width_checker');
        TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_slide_holder'), 0, { transformOrigin: "left top", force3D: true, scale: 1, ease: Power2.easeInOut });
        jQuery('#hslider_' + unique_name).height(slide_height[unique_name]);
        if (responsive_type === 'responsive') {
            jQuery('#hslider_' + unique_name).width('100%');
            jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').width('100%');
            jQuery('#hslider_' + unique_name + ' .hslider_slide').width('100%');
        } else {
            jQuery('#hslider_' + unique_name).width(slide_width);
        }
    }

    //jQuery('.hslider_misc_holder').width(checker_width);

}

//ACTIVATE THE RESIZER
function activate_resizer_checker(responsive_type, unique_name) {

    jQuery(window).on('resize', function () {

        jQuery('#hslider_width_checker_' + unique_name).parent('div').parent('div').css({
            'position': 'relative'
        });

        checker_width[unique_name] = jQuery('#hslider_width_checker_' + unique_name).width();

        var scale_value = checker_width[unique_name] / slide_width[unique_name];

        if (checker_width[unique_name] <= slide_width[unique_name]) {
            if (responsive_type === 'responsive') {
                jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').width(slide_width[unique_name]);
                global_slider_animate_width[unique_name] = 1200;
            } else {
                global_slider_animate_width[unique_name] = slide_width[unique_name];
            }
            TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_slide_holder'), 0, { transformOrigin: "left top", force3D: true, scale: scale_value, ease: Power2.easeInOut });
            jQuery('#hslider_' + unique_name).height(slide_height[unique_name] * scale_value);
            jQuery('#hslider_' + unique_name).width(checker_width[unique_name]);
        } else {
            TweenLite.to(jQuery('#hslider_' + unique_name + ' .hslider_slide_holder'), 0, { transformOrigin: "left top", force3D: true, scale: 1, ease: Power2.easeInOut });
            jQuery('#hslider_' + unique_name).height(slide_height[unique_name]);
            if (responsive_type === 'responsive') {
                global_slider_animate_width[unique_name] = checker_width[unique_name];
                jQuery('#hslider_' + unique_name).width('100%');
                jQuery('#hslider_' + unique_name + ' .hslider_slide_holder').width('100%');
                jQuery('#hslider_' + unique_name + ' .hslider_slide').width('100%');
            } else {
                global_slider_animate_width[unique_name] = slide_width[unique_name];
                jQuery('#hslider_' + unique_name).width(slide_width[unique_name]);
            }
        }

        //jQuery('.hslider_misc_holder').width(checker_width);

    });

}





