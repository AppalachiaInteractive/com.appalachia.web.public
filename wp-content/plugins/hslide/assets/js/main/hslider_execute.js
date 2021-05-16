"use strict";
//GLOBAL VARIABLES
var hslider_global_obj = [];
var hslider_global_animation_type = [];
var hslider_global_button_type = [];
var hslider_global_side_type = [];
var gloabal_initial_load = true;
var hslider_global_width;

//JQUERY HSLIDER
jQuery(function () {
	//GET JSON OBJECT
	hslider_get_json_object();
});



/*	/////////////////////////////////
	TRIGGER RESIZE
*/	/////////////////////////////////

//EXECUTE THE RESIZE
function hslider_execute_resize(obj) {

	hslider_global_width = obj.slider[0].width;

	hslider_resize(obj, hslider_global_width);

	jQuery(window).on('resize', function () {
		hslider_resize(obj, hslider_global_width);
	});

}

function hslider_resize(obj, hslider_global_width) {
	TweenLite.to(jQuery('#hslider_' + obj.slider[0].sliderId), 0, { width: hslider_global_width, ease: Power2.easeInOut });
}



/*	/////////////////////////////////
	MAIN 
*/	/////////////////////////////////

//JQUERY HSLIDER JSON
function hslider_get_json_object() {

	jQuery.getJSON('json/slider_object.js', function (data) {
		//GET A LIST OF ALL IMAGES USED WITHIN THE SLIDER AND SETUP AN ARRAY
		hslider_define_preload_images(data);
		//BUILD DATA ARRAYS
		hslider_build_data_arrays(data);
		//SET GLOBAL VARIABLE
		hslider_global_obj = data;
		//EXECUTE PRELOADER FOR ALL IMAGES WITHIN THE SLIDER
		hslider_execute_preload_images();
		//EXECUTE THE RESIZE
		hslider_execute_resize(data);
	}).done(function () {
		//SUCCESS
		console.log('Success');
	}).fail(function () {
		//FAIL
		console.log('Fail error.');
	});

}

//ACTIVATE THE SLIDER
function hslider_activate_slider(obj) {

	var hslider_slide_position = 0;
	var hslider_slide_count = 0;

	//SET SLIDE COUNT
	hslider_slide_count = obj.slider[0].slides.length;

	//ACTIVATE SCROLL BUTTONS
	hslider_activate_scroll_buttons(hslider_slide_count, obj);

}

//ACTIVATE THE SCROLL BUTTONS
var hslider_click_count = 1;
function hslider_activate_scroll_buttons(slide_count, obj) {

	hslider_get_side_button_html(obj);

	//LEFT BUTTON
	jQuery('.hslider_side_btn').on('click', function () {
		var button_side = jQuery(this).attr('data-side');
		switch (button_side) {
			case 'left':
				hslider_click_count--;
				if (hslider_click_count <= 0) {
					hslider_click_count = slide_count;
				}
				//hslider_animate_slides(hslider_click_count);
				hslider_set_slide_position((hslider_click_count - 1), 'left');
				hslider_reset_animate_state((hslider_click_count - 1), 'left');
				hslider_set_side_arrows(hslider_click_count, obj, true);
				eval("hslider_animate_" + hslider_global_animation_type[hslider_click_count - 1] + "(" + (hslider_click_count - 1) + ", " + (hslider_click_count - 1) + ", 'left')");
				hslider_pager_state(hslider_click_count, obj);
				break;
			case 'right':
				hslider_click_count++;
				if (hslider_click_count > slide_count) {
					hslider_click_count = 1;
				}
				//hslider_animate_slides(hslider_click_count);
				hslider_set_slide_position((hslider_click_count - 1), 'right');
				hslider_reset_animate_state((hslider_click_count - 1), 'right');
				hslider_set_side_arrows(hslider_click_count, obj, true);
				eval("hslider_animate_" + hslider_global_animation_type[hslider_click_count - 1] + "(" + (hslider_click_count - 1) + ", " + (hslider_click_count - 1) + ", 'right')");
				hslider_pager_state(hslider_click_count, obj);
				break;
		}
	});

	//SET SIDE ARROW NEXT PREV CONTENT
	hslider_set_side_arrows(hslider_click_count, obj, false);

	//BUILD SLIDE HTML
	hslider_slide_build_html(obj);

	//SET ANIMATION STATES - THIS WILL SETUP ALL THE SLIDES INITIAL ANIMATION STATE
	hslider_set_animate_state(hslider_click_count, 'left');

	//SET PAGER POSITION
	hslider_set_pager(slide_count, obj);

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
	eval("hslider_animate_" + hslider_global_animation_type[hslider_click_count - 1] + "(0, 0, 'left')");

}

//SET THE PAGER
function hslider_set_pager(slide_count, obj) {

	/*
		HELPFUL INFO:
		***********************
		- Pager has 2 sizes, 10(px) and 20(px)
		- The margin between each pager button is 5px (left) and 5px (right)
	*/

	//REQUIRED CALCULATION FOR POSITION ON CERTAIN AREAS
	var pager_width = (slide_count * obj.slider[0].pager[0].size) + (slide_count * 10);

	//RETURN THE PROPER PAGER HTML
	jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder').html(hslider_return_pager_html(slide_count, obj.slider[0].pager[0].type));

	//SET POSITION
	switch (obj.slider[0].pager[0].position) {
		case 'bottom_center':
			jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder').css({
				'margin-left': '-' + (pager_width / 2) + 'px',
				'bottom': '30px'
			});
			break;
		case 'bottom_left':
			jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder').css({
				'left': '30px',
				'bottom': '30px'
			});
			break;
		case 'bottom_right':
			jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder').css({
				'right': '30px',
				'left': 'auto',
				'bottom': '30px'
			});
			break;
		case 'top_center':
			jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder').css({
				'margin-left': '-' + (pager_width / 2) + 'px',
				'top': '30px'
			});
			break;
		case 'top_left':
			jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder').css({
				'left': '30px',
				'top': '30px'
			});
			break;
		case 'top_right':
			jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder').css({
				'right': '30px',
				'left': 'auto',
				'top': '30px'
			});
			break;
	}

	//AFTER PAGER IS PLACED, ACTIVATE THE REQUIRED FUNCTIONALITY
	hslider_activate_pager(1, obj);

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
function hslider_activate_pager(position, obj) {

	jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder .hslider_pager_btn').on('click', function () {

		hslider_click_count = jQuery(this).attr('data-pager-position');

		hslider_set_slide_position((hslider_click_count - 1), 'right');
		hslider_reset_animate_state((hslider_click_count - 1), 'right');
		hslider_set_side_arrows(hslider_click_count, obj, true);
		eval("hslider_animate_" + hslider_global_animation_type[hslider_click_count - 1] + "(" + (hslider_click_count - 1) + ", " + (hslider_click_count - 1) + ", 'right')");

		hslider_pager_state(hslider_click_count, obj);

	});

	//SET ACTIVE STATE
	hslider_pager_state(position, obj);

}

//SET PAGER ACTIVE STATE
function hslider_pager_state(position, obj) {

	jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_pager_holder .hslider_pager_btn').each(function (index, element) {
		if (position != jQuery(this).attr('data-pager-position')) {
			jQuery(this).removeClass('hslider_pager_active');
			hslider_anmimate_state(jQuery(this), obj, false);
		} else {
			jQuery(this).addClass('hslider_pager_active');
			hslider_anmimate_state(jQuery(this), obj, true);
		}
	});

}

//ANIMATE THE STATE OF THE PAGER ACTIVE
function hslider_anmimate_state(ele, obj, status) {

	switch (obj.slider[0].pager[0].type) {
		case 'scale_up':
			if (status) {
				//ANIMATE ACTIVE STATE TRUE
				TweenLite.to(ele, 0.5, { scaleX: 1.7, scaleY: 1.7, opacity: 1, backgroundColor: obj.slider[0].pager[0].primaryColor, ease: Power2.easeInOut });
			} else {
				//ANIMATE OFF STATE FALSE	
				TweenLite.to(ele, 0.5, { scaleX: 1, scaleY: 1, opacity: obj.slider[0].pager[0].transparency, backgroundColor: obj.slider[0].pager[0].secondaryColor, ease: Power2.easeInOut });
			}
			break;
		case 'fill_up':
			if (status) {
				//ANIMATE ACTIVE STATE TRUE
				TweenLite.to(ele, 0.5, { opacity: 1, backgroundColor: obj.slider[0].pager[0].primaryColor, borderColor: obj.slider[0].pager[0].secondaryColor, ease: Power2.easeInOut });
			} else {
				//ANIMATE OFF STATE FALSE	
				TweenLite.to(ele, 0.5, { opacity: obj.slider[0].pager[0].transparency, backgroundColor: 'none', borderColor: obj.slider[0].pager[0].primaryColor, ease: Power2.easeInOut });
			}
			break;
		case 'inner_circle':
			if (status) {
				//ANIMATE ACTIVE STATE TRUE
				TweenLite.to(ele, 0.5, { opacity: 1, borderColor: obj.slider[0].pager[0].secondaryColor, ease: Power2.easeInOut });
				TweenLite.to(jQuery(ele).children('div'), 0.5, { opacity: 1, scaleX: 0.6, scaleY: 0.6, backgroundColor: obj.slider[0].pager[0].primaryColor, ease: Power2.easeInOut });
			} else {
				//ANIMATE OFF STATE FALSE	
				TweenLite.to(ele, 0.5, { opacity: obj.slider[0].pager[0].transparency, backgroundColor: 'none', borderColor: obj.slider[0].pager[0].primaryColor, ease: Power2.easeInOut });
				TweenLite.to(jQuery(ele).children('div'), 0.5, { opacity: 1, scaleX: 1, scaleY: 1, backgroundColor: 'none', ease: Power2.easeInOut });
			}
			break;
	}

}

//SET SIDE ARROW NEXT PREV CONTENT
function hslider_set_side_arrows(hslider_click_count, obj, action) {

	var array_position = hslider_click_count - 1;
	var object_count = obj.slider[0].slides.length - 1;

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
	switch (obj.slider[0].arrows[0].type) {
		case 'sideslide':
			left_position = 'right';
			right_position = 'left';
			break;
	}

	var prev_type = obj.slider[0].slides[prev_content].type;
	var next_type = obj.slider[0].slides[next_content].type;

	jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_side_inner .hslider_side_image').addClass('hslider_active').removeClass('hslider_new');

	if (!action) {
		//SET PREVIOUS BUTTON
		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_left .hslider_active').css({
			'background-image': 'url(' + obj.slider[0].slides[prev_content].background[0].backgroundImage + ')'
		});

		//SET NEXT BUTTON
		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_right .hslider_active').css({
			'background-image': 'url(' + obj.slider[0].slides[next_content].background[0].backgroundImage + ')'
		});
	}

	var img_holder_width = jQuery('.hslider_active').width();
	var inner_width = jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_side_image').width();

	//ACTION ILLUSTRATES THE EVENT, IF TRUE THEN IT IS A CLICK EVENT, OTHERWISE FALSE FOR INITIAL LOAD
	if (action) {

		//LEFT SIDE ANIMATE
		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_left .hslider_side_inner .hslider_side_image_wrap').prepend('<div class="hslider_side_image hslider_new"></div>');

		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_left .hslider_side_inner .hslider_new').css({
			'left': '-' + img_holder_width + 'px'
		});

		TweenLite.to(jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_left .hslider_side_inner .hslider_active'), 0.5, {
			left: img_holder_width + 'px',
			ease: Power2.easeInOut
		});

		TweenLite.to(jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_left .hslider_side_inner .hslider_new'), 0.5, {
			width: inner_width,
			left: 0,
			onComplete: hslider_remove_active,
			ease: Power2.easeInOut
		});

		//RIGHT SIDE ANIMATE
		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_right .hslider_side_inner .hslider_side_image_wrap').prepend('<div class="hslider_side_image hslider_new"></div>');

		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_right .hslider_side_inner .hslider_new').css({
			'right': img_holder_width
		});

		TweenLite.to(jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_right .hslider_side_inner .hslider_active'), 0.5, {
			right: '-' + img_holder_width + 'px',
			ease: Power2.easeInOut
		});

		TweenLite.to(jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_right .hslider_side_inner .hslider_new'), 0.5, {
			width: inner_width,
			right: 0,
			onComplete: hslider_remove_active,
			ease: Power2.easeInOut
		});

		//SET PREVIOUS BUTTON
		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_left .hslider_new').css({
			'background-image': 'url(' + obj.slider[0].slides[prev_content].background[0].backgroundImage + ')'
		});

		//SET NEXT BUTTON
		jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_right .hslider_new').css({
			'background-image': 'url(' + obj.slider[0].slides[next_content].background[0].backgroundImage + ')'
		});
	}

}

//REMOVE THE ACTIVE STATE
function hslider_remove_active() {
	jQuery('.hslider_active').remove();
}

//BUILD SLIDE HTML
function hslider_slide_build_html(obj) {

	var slide_html = '';

	jQuery(obj.slider[0].slides).each(function (index, element) {

		var slide_background = '';

		//CHECK ANIMATION TYPE			
		if (element.animationType !== 'split' && element.background[0].type !== 'video') {
			slide_background = 'style="background-image:url(' + element.background[0].backgroundImage + ')"';
		}

		slide_html += '<div ' + slide_background + ' class="hslider_slide" data-slide-type="' + element.type + '" data-animation-type="' + element.animationType + '" id="hslider_id_' + index + '">';
		//BUILD INNER HTML - ANIMATION TYPE - THIS WILL ONLY BE USED FOR THE SPLIT TRANSITIONS
		if (element.animationType === 'split' && element.background[0].type !== 'video') {
			slide_html += hslider_build_animation_html(element.animationType, element.background[0].backgroundImage);
		} else if (element.background[0].type === 'video') {
			slide_html += hslider_build_video_bg_html(element.background[0].source);
		}
		//BUILD INNER HTML - CONTENT
		var full_width_class = '';
		if (element.type === 'product' || element.type === 'post') {
			full_width_class = 'hslider_full_width';
		}
		slide_html += '<div class="hslider_slide_content_holder ' + full_width_class + '">';
		slide_html += hslider_slide_content_html(element.elements);
		slide_html += '</div>';
		slide_html += '</div>';

	});

	//APPEND SLIDE HTML
	jQuery('.hslider_slide_holder').append(slide_html);

	//APPEND STYLES
	jQuery('<style type="text/css">' + hslider_return_styles(obj) + '</style>').appendTo('head');

	//SET HTML SIZES - CURRENTLY USED TO SET THE SIZE OF THE ANIMATION TYPE HTML FOR SPLIT TRANSITIONS	
	hslider_set_sizes();

	//SET POSITIONING
	hslider_set_position();

	//TRIGGET HOVER ANIMATION
	trigger_hover_animation();

}

//BUILD CONTENT HTML
function hslider_slide_content_html(element_obj) {

	var content_html = '';

	//LOOP THROUGH ALL THE ELEMENTS
	jQuery(element_obj).each(function (index, element) {
		switch (element.type) {
			case 'image':
				content_html += '<div class="hslider_image_element hslider_element" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '">';
				content_html += '<img src="' + element.source;
				element_html += element_obj.width_sizing !== 'none' ? 'width="' + element_obj.width + element_obj.width_sizing + '"' : '' ;
				element_html += element_obj.height_sizing !== 'none' ? 'height="' + element_obj.height + element_obj.height_sizing + '"' : ''  ;
				element_html += '/></div>';
				break;
			case 'text':
				content_html += '<div class="hslider_text_element hslider_element" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '">' + element.content + '</div>';
				break;
			case 'button':
				content_html += '<div class="hslider_button_element hslider_element hslider_' + element.theme + '" data-color="' + element.font[0].color + '" data-secondary="' + element.font[0].secondary + '" id="hslider_element_' + element.elementId + '" data-finish="' + element.x + '" data-y="' + element.y + '">' + hslider_button_html(element.content, element.theme) + '</div>';
				break;
			case 'product':
				//REMEMBER THAT THE PRODUCTS NEED TO BE LOADED DYNAMICALLY FROM THE DB 'WOOCOMMERCE', CURRENTLY ONLY OUT PUTTING STATIC HTML
				content_html += '<div class="hslider_product_element" id="hslider_element_' + element.elementId + '">';
				content_html += hslider_get_products_html(element_obj);
				content_html += '</div>';
				break;
			case 'post':
				//REMEMBER THAT THE PRODUCTS NEED TO BE LOADED DYNAMICALLY FROM THE DB 'WOOCOMMERCE', CURRENTLY ONLY OUT PUTTING STATIC HTML
				content_html += '<div class="hslider_post_element" id="hslider_element_' + element.elementId + '">';
				content_html += hslider_get_posts_html(element_obj);
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
		case 'border_button_translucent':
			button_html += '<div class="hslider_button_content">' + content + '</div>';
			break;
		case 'full_button':
			button_html += '<div class="hslider_button_content">' + content + '</div>';
			break;
	}

	return button_html;

}

//SET INITIAL SLIDE ANIMATION STATE
function hslider_set_animate_state(hslider_click_count, side) {

	jQuery(hslider_global_animation_type).each(function (idx, ele) {
		jQuery('.hslider_slide_holder').find('[data-animation-type="' + ele + '"]').each(function (index, element) {
			eval("hslider_set_animate_" + ele + "(" + hslider_click_count + ", " + idx + ", 0, '" + side + "')");
		});
	});

}

//RE SET INITIAL SLIDE ANIMATION STATE
function hslider_reset_animate_state(hslider_click_count, side) {

	jQuery(hslider_global_animation_type).each(function (idx, ele) {
		if (idx !== hslider_click_count) {
			jQuery('.hslider_slide_holder').find('[data-animation-type="' + ele + '"]').each(function (index, element) {
				eval("hslider_set_animate_" + ele + "(" + hslider_click_count + ", " + idx + ", 2, '" + side + "')");
			});
		}
	});

}

//RE SET INITIAL SLIDE ANIMATION POSITION FOR SLIDE AND PARRALAX
function hslider_set_slide_position(hslider_click_count, side) {

	var animation_type = hslider_global_obj.slider[0].slides[hslider_click_count].animationType;
	var offset = 1430;

	if (animation_type === 'lax' || animation_type === 'slide') {
		if (side === 'left') {
			TweenLite.to(jQuery('#hslider_id_' + hslider_click_count), 0, { left: '-' + offset + 'px', ease: Power2.easeInOut });
		} else {
			TweenLite.to(jQuery('#hslider_id_' + hslider_click_count), 0, { left: offset + 'px', ease: Power2.easeInOut });
		}
	}

}



/*	/////////////////////////////////
	STYLES
*/	/////////////////////////////////

//SETUP STYLES
function hslider_return_styles(obj) {

	//VARIABLES
	var styles = '';

	//SLIDER STYLES LOOP - FOR IF MORE THAN 2 EXIST
	jQuery(obj).each(function (index, element) {

		//VARIABLES
		var slider_id = '#hslider_' + element.slider[0].sliderId;

		//START :: ARROW STYLES

		styles += slider_id + ' .hslider_side_btn:before{ ';
		styles += 'color:' + element.slider[0].arrows[0].primaryColor + '; ';
		//styles += 'background-color:'+element.slider[0].arrows[0].secondaryColor+'; ';
		styles += '}\n';

		styles += slider_id + ' .hslider_side_btn .hslider_side_line{ ';
		styles += 'background-color:' + element.slider[0].arrows[0].primaryColor + '; ';
		styles += '}\n';

		styles += slider_id + ' .hslider_side_btn .hslider_side_label{ ';
		styles += 'color:' + element.slider[0].arrows[0].descriptionColor + '; ';
		styles += 'font-family:' + element.slider[0].arrows[0].descriptionFamily + '; ';
		styles += 'font-size:' + element.slider[0].arrows[0].descriptionSize + element.slider[0].arrows[0].descriptionSizing + '; ';
		styles += 'font-weight:' + element.slider[0].arrows[0].descriptionWeight + '; ';
		styles += '}\n';

		styles += slider_id + ' .hslider_side_btn .hslider_side_count{ ';
		styles += 'color:' + element.slider[0].arrows[0].countColor + '; ';
		styles += 'font-family:' + element.slider[0].arrows[0].countFamily + '; ';
		styles += 'font-size:' + element.slider[0].arrows[0].countSize + element.slider[0].arrows[0].countSizing + '; ';
		styles += 'font-weight:' + element.slider[0].arrows[0].countWeight + '; ';
		styles += '}\n';

		//END :: ARROW STYLES

		//START :: BORDER STYLES

		if (element.slider[0].border[0].status) {
			styles += slider_id + '{ ';
			styles += 'border:' + element.slider[0].border[0].borderSize + 'px ' + element.slider[0].border[0].borderType + ' ' + element.slider[0].border[0].borderColor + '; ';
			if (element.slider[0].border[0].borderRadius) {
				styles += '-webkit-border-radius:' + element.slider[0].border[0].borderRadiusTopLeft + 'px ' + element.slider[0].border[0].borderRadiusTopRight + 'px ' + element.slider[0].border[0].borderRadiusBottomRight + 'px ' + element.slider[0].border[0].borderRadiusBottomLeft + 'px; ';
				styles += '-moz-border-radius:' + element.slider[0].border[0].borderRadiusTopLeft + 'px ' + element.slider[0].border[0].borderRadiusTopRight + 'px ' + element.slider[0].border[0].borderRadiusBottomRight + 'px ' + element.slider[0].border[0].borderRadiusBottomLeft + 'px; ';
				styles += 'border-radius:' + element.slider[0].border[0].borderRadiusTopLeft + 'px ' + element.slider[0].border[0].borderRadiusTopRight + 'px ' + element.slider[0].border[0].borderRadiusBottomRight + 'px ' + element.slider[0].border[0].borderRadiusBottomLeft + 'px; ';
			}
			styles += '}\n';
		}

		//END :: BORDER STYLES

		//START :: CONTENT TEXT STYLES

		jQuery(element.slider[0].slides).each(function (idx, ele) {

			//SLIDE SPECIFIC STYLING

			//ELEMENT SPECIFIC STYLING
			jQuery(ele.elements).each(function (id, el) {

				//ELEMENT TEXT
				switch (el.type) {
					case 'text':
						styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
						styles += 'color:' + el.font[0].color + '; ';
						styles += 'font-family:' + el.font[0].family + '; ';
						styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
						styles += 'font-weight:' + el.font[0].weight + '; ';
						styles += 'text-transform:' + el.font[0].transform + '; ';
						styles += 'text-align:' + el.font[0].align + '; ';
						styles += 'line-height:' + el.font[0].lineHeight + el.font[0].sizing + '; ';
						if (el.width !== '' || el.width !== null) { styles += 'width:' + el.width + 'px; '; }
						styles += '}\n';
						break;
					case 'button':
						switch (el.theme) {
							case 'x_factor':
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
								styles += 'line-height:' + (parseInt(el.font[0].size) + 20) + 'px; ';
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_top, ';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_bottom{ ';
								styles += 'background-color:' + el.font[0].color + ';';
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
							case 'side_pipe':
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
								styles += 'line-height:' + (parseInt(el.font[0].size) + 10) + 'px; ';
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_left, ';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_right{ ';
								styles += 'height:' + (parseInt(el.font[0].size) + 8) + 'px;';
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
							case 'side_flat':
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
								styles += 'line-height:' + (parseInt(el.font[0].size) + 10) + 'px; ';
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_left, ';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_right{ ';
								styles += 'height:' + (parseInt(el.font[0].size) + 8) + 'px;';
								styles += 'background-color:' + el.font[0].secondary;
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_left{ ';
								styles += 'left: -15px';
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_right{ ';
								styles += 'right: -15px';
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
							case 'hidden_underline':
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
							case 'double_line':
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_top, ';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_line_bottom{ ';
								styles += 'background-color:' + el.font[0].secondary;
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
							case 'double_clamp':
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
							case 'border_button':
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
								styles += 'border-color:' + el.font[0].secondary;		
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
							case 'border_button_translucent':
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
								styles += 'border-color:' + el.font[0].secondary;		
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
								styles += 'background-color:' + hexToRgbA(el.font[0].secondary, '0.66');
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;								
							case 'full_button':
								styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_button_content{ ';
								styles += 'background-color:' + el.font[0].secondary;
								styles += '}\n';
								styles += slider_id + ' #hslider_element_' + el.elementId + '{ ';
								styles += 'color:' + el.font[0].color + '; ';
								styles += 'font-family:' + el.font[0].family + '; ';
								styles += 'font-size:' + el.font[0].size + el.font[0].sizing + '; ';
								styles += 'font-weight:' + el.font[0].weight + '; ';
								styles += 'text-transform:' + el.font[0].transform + '; ';
								styles += '}\n';
								break;
						}
						break;
					case 'product':
						styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_product_name{ ';
						styles += 'color:' + el.settings[0].font[0].heading[0].fontColor + '; ';
						styles += 'font-weight:' + el.settings[0].font[0].heading[0].fontWeight + '; ';
						styles += 'font-size:' + el.settings[0].font[0].heading[0].fontSize + el.settings[0].font[0].heading[0].fontSizing + '; ';
						styles += '}\n';
						styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_product_price{ ';
						styles += 'color:' + el.settings[0].font[0].price[0].fontColor + '; ';
						styles += 'font-weight:' + el.settings[0].font[0].price[0].fontWeight + '; ';
						styles += 'font-size:' + el.settings[0].font[0].price[0].fontSize + el.settings[0].font[0].price[0].fontSizing + '; ';
						styles += '}\n';
						styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_product_excerpt{ ';
						styles += 'color:' + el.settings[0].font[0].excerpt[0].fontColor + '; ';
						styles += 'font-weight:' + el.settings[0].font[0].excerpt[0].fontWeight + '; ';
						styles += 'font-size:' + el.settings[0].font[0].excerpt[0].fontSize + el.settings[0].font[0].excerpt[0].fontSizing + '; ';
						styles += '}\n';
						styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_product_cart_button{ ';
						styles += 'color:' + el.settings[0].font[0].button[0].fontColor + '; ';
						styles += 'font-weight:' + el.settings[0].font[0].button[0].fontWeight + '; ';
						styles += 'font-size:' + el.settings[0].font[0].button[0].fontSize + el.settings[0].font[0].button[0].fontSizing + '; ';
						styles += '}\n';
						break;
					case 'post':
						styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_post_name{ ';
						styles += 'color:' + el.settings[0].font[0].heading[0].fontColor + '; ';
						styles += 'font-weight:' + el.settings[0].font[0].heading[0].fontWeight + '; ';
						styles += 'font-size:' + el.settings[0].font[0].heading[0].fontSize + el.settings[0].font[0].heading[0].fontSizing + '; ';
						styles += '}\n';
						styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_post_excerpt{ ';
						styles += 'color:' + el.settings[0].font[0].excerpt[0].fontColor + '; ';
						styles += 'font-weight:' + el.settings[0].font[0].excerpt[0].fontWeight + '; ';
						styles += 'font-size:' + el.settings[0].font[0].excerpt[0].fontSize + el.settings[0].font[0].excerpt[0].fontSizing + '; ';
						styles += '}\n';
						styles += slider_id + ' #hslider_element_' + el.elementId + ' .hslider_post_button{ ';
						styles += 'color:' + el.settings[0].font[0].button[0].fontColor + '; ';
						styles += 'font-weight:' + el.settings[0].font[0].button[0].fontWeight + '; ';
						styles += 'font-size:' + el.settings[0].font[0].button[0].fontSize + el.settings[0].font[0].button[0].fontSizing + '; ';
						styles += '}\n';
						break;
				}

			});


		});


		//END :: CONTENT TEXT STYLES

	});

	return styles;

}


function hexToRgbA(hex, opacity){
	var c;
	if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
		c= hex.substring(1).split('');
		if(c.length== 3){
			c= [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c= '0x'+c.join('');
		return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
	}
	throw new Error('Bad Hex');
}


/*	/////////////////////////////////
	SET ANIMATION 
*/	/////////////////////////////////

//SET ANIMATE FADE
function hslider_set_animate_fade(hslider_click_count, index, duration, side) {

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), duration, { opacity: 0, zIndex: 0, ease: Power2.easeInOut });

}

//SET ANIMATE SLIDE
function hslider_set_animate_slide(hslider_click_count, index, duration, side) {

	var shift_to = 0;

	if (side === 'left') {
		shift_to = hslider_global_width;
	} else {
		shift_to = -hslider_global_width;
	}

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), duration, { opacity: 0, zIndex: 0, left: shift_to, ease: Power2.easeInOut });

}

//SET ANIMATE PARRALAX
function hslider_set_animate_lax(hslider_click_count, index, duration, side) {

	var shift_to = 0;

	if (side == 'left') {
		shift_to = hslider_global_width;
	} else {
		shift_to = -hslider_global_width;
	}

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), duration, { opacity: 0, zIndex: 0, left: shift_to, ease: Power2.easeInOut, onUpdate: hslider_animate_parralax_elements, onUpdateParams: ['#hslider_id_' + index, side, 'out'] });

}

//SET ANIMATE ZOOM
function hslider_set_animate_zoom(hslider_click_count, index, duration, side) {

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), duration, { opacity: 0, zIndex: 0, scaleX: 0.5, scaleY: 0.5, ease: Power2.easeInOut });

}

//SET ANIMATE SPLIT
function hslider_set_animate_split(hslider_click_count, index, duration, side) {

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), duration, { opacity: 0, zIndex: 0, ease: Power2.easeInOut });

	jQuery('#hslider_id_' + index).each(function (index, element) {

		var count = 0;

		jQuery(this).children('.hslider_split_animation_holder').children('div').each(function (index, element) {

			if (count == 0) {
				TweenLite.to(jQuery(this), duration, { marginTop: -700, rotation: 20, scaleX: 1.2, scaleY: 1.2, ease: Power2.easeInOut });
			} else {
				TweenLite.to(jQuery(this), duration, { marginTop: 1400, rotation: 20, scaleX: 1.2, scaleY: 1.2, ease: Power2.easeInOut });
			}

			count++;

		});

	});

}



/*	/////////////////////////////////
	ANIMATION 
*/	/////////////////////////////////

var hslider_tween;

//ANIMATE PARRALAX ELEMENTS
function hslider_animate_parralax_elements(holder, side, status) {

	var opac = 1;

	if (status === 'out') {
		opac = 0;
	}

	var holder_position = jQuery(holder).position();
	var the_total = 1430;
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

	jQuery(holder + ' .hslider_slide_content_holder .hslider_element').each(function (index, element) {

		var position = jQuery(this).attr('data-finish');

		if (status === 'out') {

			if (side === 'left') {
				offset_by = 400 * (index + 1);
			} else {
				offset_by = -400 * (index + 1);
			}

			position = jQuery(this).attr('data-finish') - offset_by;

		}

		hslider_tween = TweenLite.to(jQuery(this), 2, { opacity: opac, zIndex: 999, left: position, ease: Circ.easeInOut });

		hslider_tween.pause();

		hslider_tween.progress(percentage.toFixed(2) / 2.5);

	});


	//percentage.toFixed(2);

}

//ANIMATE ELEMENTS
function hslider_animate_elements(holder, index, side) {

	jQuery(holder + " .hslider_slide_content_holder .hslider_element").each(function (ix, element) {

		//VARIABLES
		var ele_x = hslider_global_obj.slider[0].slides[index].elements[ix].x;
		var ele_y = hslider_global_obj.slider[0].slides[index].elements[ix].y;

		var ele_animationType = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].animationType;
		var ele_animationStrength = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].animationStrength;
		var ele_animationEasing = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].animationEasing;
		var ele_direction = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].direction;
		var ele_delay = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].delay;
		var ele_duration = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].duration;
		var ele_rotation = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].rotation;
		var ele_startOpacity = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].startOpacity;
		var ele_endOpacity = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].endOpacity;

		TweenLite.to(jQuery(this), ele_duration, {
			opacity: ele_endOpacity,
			zIndex: ix,
			left: ele_x,
			top: ele_y,
			delay: ele_delay,
			rotation: ele_rotation,
			ease: eval(ele_animationStrength + "." + ele_animationEasing)
		});

	});

}

//SET ELEMENTS
function hslider_set_elements(holder, index, side, type) {

	//FIND ALL ELEMENTS WITHIN HOLDER
	var offset_by = 0;

	//CHECK IF THE TYPE IS FOR PARRALAX OR BASIC TWEEN ANIMATIONS
	switch (type) {
		case 'lax':
			jQuery(holder + ' .hslider_slide_content_holder .hslider_element').each(function (idx, element) {
				if (side === 'left') {
					offset_by = -200 * (idx + 1);
				} else {
					offset_by = 200 * (idx + 1);
				}
				var offset = jQuery(this).attr('data-finish') - offset_by;
				var offset_y = jQuery(this).attr('data-y');
				/*jQuery(this).css({
					'left': offset + 'px',
					'top': offset_y + 'px'
				});*/
				TweenLite.to(jQuery(this), 0, { left: offset, top: offset_y, ease: Circ.easeInOut });
			});
			break;
		case 'basic':

			var the_type = jQuery(holder).attr('data-slide-type');

			if (the_type === 'content') {

				jQuery(holder + " .hslider_slide_content_holder .hslider_element").each(function (ix, element) {

					//VARIABLES
					var ele_x = hslider_global_obj.slider[0].slides[index].elements[ix].offset_x;
					var ele_y = hslider_global_obj.slider[0].slides[index].elements[ix].offset_y;

					var ele_start_opac = hslider_global_obj.slider[0].slides[index].elements[ix].animation[0].startOpacity;

					TweenLite.to(jQuery(this), 0, { opacity: ele_start_opac, rotation: 0, zIndex: ix, left: ele_x, top: ele_y, ease: Circ.easeInOut });

				});

			}

			break;
	}

}

//ANIMATE FADE
function hslider_animate_fade(hslider_click_count, index, side) {

	//VARIABLES
	var animation_duration = 2;

	//SET ELEMENT START
	hslider_set_elements('#hslider_id_' + index, index, side, 'basic');

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), animation_duration, { opacity: 1, zIndex: 999, ease: Power2.easeInOut, onStart: hslider_animate_elements, onStartParams: ['#hslider_id_' + index, index, side] });

}

//ANIMATE SLIDE
function hslider_animate_slide(hslider_click_count, index, side) {

	//VARIABLES
	var animation_duration = 2;

	//SET ELEMENT START
	hslider_set_elements('#hslider_id_' + index, index, side, 'basic');

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), animation_duration, { opacity: 1, zIndex: 999, left: 0, ease: Power2.easeInOut, onStart: hslider_animate_elements, onStartParams: ['#hslider_id_' + index, index, side] });

}

//ANIMATE PARRALAX
function hslider_animate_lax(hslider_click_count, index, side) {

	//VARIABLES
	var animation_duration = 2;

	//SET ELEMENT START
	hslider_set_elements('#hslider_id_' + index, index, side, 'lax');

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), animation_duration, { opacity: 1, zIndex: 999, left: 0, ease: Power2.easeInOut, onUpdate: hslider_animate_parralax_elements, onUpdateParams: ['#hslider_id_' + index, side, 'in'] });

}

//ANIMATE ZOOM
function hslider_animate_zoom(hslider_click_count, index, side) {

	//VARIABLES
	var animation_duration = 2;

	//SET ELEMENT START
	hslider_set_elements('#hslider_id_' + index, index, side, 'basic');

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), animation_duration, { opacity: 1, zIndex: 999, scaleX: 1, scaleY: 1, ease: Power2.easeInOut });

}

//ANIMATE SPLIT
function hslider_animate_split(hslider_click_count, index, side) {

	//VARIABLES
	var animation_duration = 2;

	//SET ELEMENT START
	hslider_set_elements('#hslider_id_' + index, index, side, 'basic');

	//SET
	TweenLite.to(jQuery('#hslider_id_' + index), animation_duration, { opacity: 1, zIndex: 999, ease: Power2.easeInOut });

	jQuery('#hslider_id_' + index).each(function (index, element) {

		var count = 0;

		jQuery(this).children('.hslider_split_animation_holder').children('div').each(function (index, element) {

			if (count == 0) {
				TweenLite.to(jQuery(this), animation_duration, { marginTop: 0, rotation: 0, scaleX: 1, scaleY: 1, ease: Power2.easeInOut });
			} else {
				TweenLite.to(jQuery(this), animation_duration, { marginTop: 0, rotation: 0, scaleX: 1, scaleY: 1, ease: Power2.easeInOut });
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
function hslider_set_position() {

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
function hslider_build_data_arrays(data) {

	//BUILD ANIMATION TYPE ARRAY
	jQuery(data.slider[0].slides).each(function (index, element) {
		hslider_global_animation_type.push(element.animationType);
	});

	//BUILD BUTTON ELEMENT ARRAY
	jQuery(data.slider[0].slides).each(function (index, element) {
		jQuery(element.elements).each(function (id, ele) {
			if (ele.type === 'button') {
				hslider_global_button_type.push(ele.theme);
			}
		});
	});

	//BUILD SIDE BUTTON ARRAThslider_global_side_type
	jQuery(data.slider[0]).each(function (index, element) {
		hslider_global_side_type.push(element.arrows[0].type);
	});

}



/*	/////////////////////////////////
	HTML 
*/	/////////////////////////////////

//BUILD ANIMTATION HTML
function hslider_build_animation_html(animation_type, background_image) {

	var animation_html = '';

	switch (animation_type) {
		case 'split':
			animation_html += '<div class="hslider_split_animation_holder">';
			animation_html += '<div class="hslider_split_inner" style="background-image:url(' + background_image + ')">SPLIT 1</div>';
			animation_html += '<div class="hslider_split_inner" style="background-image:url(' + background_image + ')">SPLIT 2</div>';
			animation_html += '</div>';
			break;
	}

	return animation_html;

}

//BUILD VIDEO BG HTML
function hslider_build_video_bg_html(obj) {

	var source_html = '';

	source_html += '<video loop autoplay poster="http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-49173.jpg">';

	jQuery(obj).each(function (index, element) {

		source_html += '<source src="' + element.src + '" type="' + element.type + '" />';

	});

	source_html += '</video>';

	return source_html;

}

//BUILD PRODUCT HTML
function hslider_get_products_html(obj) {

	var product_html = '';
	var loop = 4;

	for (var i = 0; i < loop; i++) {
		product_html += '<div class="hslider_product_holder">';
		product_html += '<div class="hslider_product_image">';
		product_html += '</div>';
		product_html += '<div class="hslider_product_content">';
		product_html += '<div class="hslider_product_details">';
		product_html += '<div class="hslider_product_name">Casual Pants &amp; Top</div>';
		product_html += '<div class="hslider_product_price">R200.00</div>';
		product_html += '</div>';
		product_html += '<div class="hslider_product_cart_button">';
		product_html += 'ADD';
		product_html += '</div>';
		product_html += '</div>';
		product_html += '</div>';
	}

	return product_html;

}

//BUILD POSTS HTML
function hslider_get_posts_html(obj) {

	var posts_html = '';
	var loop = 4;

	for (var i = 0; i < loop; i++) {
		posts_html += '<div class="hslider_post_holder_full" data-block-hover-type="' + obj[0].animation[0].animationType + '">';
		posts_html += '<div style="background-image:url(placeholders/post/img_' + (i + 1) + '.jpg)" class="hslider_post_image">';
		posts_html += '</div>';
		posts_html += '<div class="hslider_post_content">';
		posts_html += '<div class="hslider_post_details">';
		posts_html += '<div class="hslider_post_name">Casual Pants &amp; Top</div>';
		posts_html += '<div class="hslider_post_excerpt">Content here</div>';
		posts_html += '</div>';
		posts_html += '<div class="hslider_post_button">';
		posts_html += 'READ MORE';
		posts_html += '</div>';
		posts_html += '</div>';
		posts_html += '</div>';
	}

	return posts_html;

}

//GET SIDE BUTTON HTML
function hslider_get_side_button_html(obj) {

	var side_html = '';

	switch (obj.slider[0].arrows[0].type) {
		case 'fold':
			side_html += '<div class="hslider_side_inner">';
			side_html += '<div class="hslider_side_image_wrap">';
			side_html += '<div class="hslider_side_image"></div>';
			side_html += '</div>';
			side_html += '<div class="hslider_side_label">6/6</div> ';
			side_html += '</div>';
			break;
		case 'fullarrow':
			side_html += '<div class="hslider_side_inner">';
			side_html += '<div class="hslider_side_image_wrap">';
			side_html += '<div class="hslider_side_image"></div>';
			side_html += '</div>';
			side_html += '<div class="hslider_side_label">6/6</div> ';
			side_html += '</div>';
			break;
		case 'sideslide':
			side_html += '<div class="hslider_side_inner">';
			side_html += '<div class="hslider_side_image_wrap">';
			side_html += '<div class="hslider_side_image"></div>';
			side_html += '</div>';
			side_html += '<div class="hslider_side_label">6/6</div> ';
			side_html += '</div>';
			break;
		case 'circle':
			side_html += '<div class="hslider_side_inner">';
			side_html += '<div class="hslider_side_image_wrap">';
			side_html += '<div class="hslider_side_image"></div>';
			side_html += '</div>';
			side_html += '<div class="hslider_side_label">6/6</div> ';
			side_html += '</div>';
			break;
		case 'rounded':
			side_html += '<div class="hslider_side_inner">';
			side_html += '<div class="hslider_side_image"></div>';
			side_html += '<div class="hslider_side_label">6/6</div> ';
			side_html += '</div>';
			break;
		case 'doubleflip':
			side_html += '<div class="hslider_side_inner">';
			side_html += '<div class="hslider_side_image"></div>';
			side_html += '<div class="hslider_side_label">6/6</div> ';
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
	jQuery('#hslider_' + obj.slider[0].sliderId).addClass('hslider_' + obj.slider[0].arrows[0].type);

	//INSERT THE HTML
	jQuery('#hslider_' + obj.slider[0].sliderId + ' .hslider_side_btn').each(function (index, element) {
		jQuery(this).html(side_html);
	});

}



/*	/////////////////////////////////
	PRELOADER 
*/	/////////////////////////////////

// PRELOADER VARIABLES
var hslider_loader_images = [];
var hslider_loader_count = 0;

// PRELOADER
function hslider_define_preload_images(data) {
	//GET IMAGES AND PUSH THEM INTO ARRAY
	jQuery(data.slider[0].slides).each(function (index, element) {
		//BACKGROUND
		if (element.background[0].type !== 'video') {
			hslider_loader_images.push(element.background[0].backgroundImage);
		}
		//ELEMENTS
		jQuery(element.elements).each(function (idx, el) {
			if (el.type === 'image') {
				hslider_loader_images.push(el.source);
			}
		});
	});
}

// PRELOADER EXECUTE
function hslider_execute_preload_images() {

	// Add the image element to the document and give it a ID based on the current load position
	jQuery('.hslider_hidden').append('<img width="100" src="' + hslider_loader_images[hslider_loader_count] + '" id="loadimage' + hslider_loader_count + '">');

	// Bind the load event to the image
	jQuery('#loadimage' + hslider_loader_count).load(function () {

		// Increment the load count once the image is loaded successfuly
		hslider_loader_count++;

		// Calculate the percentage based on the current load position based on the amount of images
		var perc = Math.ceil((hslider_loader_count / hslider_loader_images.length) * 100);

		jQuery(".hslider_percentage").html('LOADING... ' + perc + '%');

		// Use the percentage to animate a preloaded bar.
		if (perc == 100) {
			//SHOW PERCENTAGE COMPLETION
			jQuery(".hslider_percentage").html('LOAD COMPLETE');
			//ACTIVATE SLIDER
			hslider_activate_slider(hslider_global_obj);
		}

		if (hslider_loader_count < hslider_loader_images.length) {
			hslider_execute_preload_images();
		}

	});

}




