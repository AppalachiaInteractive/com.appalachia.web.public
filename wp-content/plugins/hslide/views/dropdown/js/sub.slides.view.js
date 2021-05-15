//SUB.SLIDES VIEW
var fonts = [
	'fontFamily_0',
	'fontFamily_1',
	'fontFamily_2',
	'fontFamily_3'
];
populate_fonts(fonts);

var global_zoom_val;

//view load
jQuery(function () {

	//set header label
	enable_accordion();

	//remove data from top bar and set it up for custom top bar
	jQuery('#link_sub_slides_view').parents('ul').addClass('slide_ul');
	jQuery('#link_sub_slides_view').parents('ul').html('');

	//populate custom top bar elements
	populate_topbar(main_object);

	//load slide data
	load_slide_data(main_object, global_slide_index);

	//set slide
	set_slide(main_object, global_slide_index);

	//add google fonts
	add_google_fonts(main_object);

	//load slide elements
	load_slide_elements(main_object);

	//load slide grid
	set_slide_grid(main_object);

	//enable sorting
	enable_sorting();

	//check video and woocommerce
	check_video();

});

function check_video() {

	//check video
	var video_element_count = jQuery('.hslider_video_holder').length;

	if (video_element_count > 0) {
		jQuery('.slide_icon_video').unbind('click');
		jQuery('.slide_icon_video').children('.click_block').remove();
		jQuery('.slide_icon_video').prepend('<div data-tooltip="Only 1 video per slide" class="click_block"></div>');
		jQuery('.slide_icon_video').removeClass('data_popup_launch');
	} else {
		jQuery('.slide_icon_video').children('.click_block').remove();
		jQuery('.slide_icon_video').addClass('data_popup_launch');
		activate_custom_popup_load();
	}

	//check woo
	if (!global_woo_check) {
		jQuery('.slide_icon_woo').unbind('click');
		jQuery('.slide_icon_woo').children('.click_block').remove();
		jQuery('.slide_icon_woo').prepend('<div data-tooltip="WooCommerce not installed" class="click_block"></div>');
		jQuery('.slide_icon_woo').removeClass('data_popup_launch');
	} else {
		jQuery('.slide_icon_woo').children('.click_block').remove();
		jQuery('.slide_icon_woo').addClass('data_popup_launch');
		activate_custom_popup_load();
	}

	switch_components();

}

function set_slide_grid(obj) {

	var s_width = parseInt(obj.slider.width);

	if (obj.slider.sliderType === 'responsive') {
		s_width = 1200;
	}

	var h_width = parseInt(obj.slider.height);

	var x_space = s_width / 20;
	var y_space = h_width / 10;

	jQuery('.hslider_ux_grid').off().on('click', function () {

		if (jQuery(this).attr('data-grid-toggle') == 'off') {

			jQuery('.hslider_slide_holder').prepend('<div class="visual_grid_holder"></div>');

			jQuery('.visual_grid_holder').html('');

			jQuery('.hslider_ux_grid .hslider_ux_items').html('Grid Off');

			/////////////////

			for (var i = 0; i <= 20; i++) {
				jQuery('.visual_grid_holder').append('<div class="visual_grid_line_x x_' + i + '"></div>')
				jQuery('.x_' + i).css({
					left: (x_space * i) + 'px'
				});
				delay_val = (0.1 * i);

				if (i === 10) {
					jQuery('.x_' + i).addClass('visual_center');
					TweenLite.to(jQuery('.x_' + i), 0.2, { delay: delay_val, opacity: 0.7, backgroundColor: 'aqua', ease: Power2.easeInOut });
				} else {
					TweenLite.to(jQuery('.x_' + i), 0.2, { delay: delay_val, opacity: 0.7, backgroundColor: '#646473', ease: Power2.easeInOut });
				}
			}

			for (var e = 0; e < 11; e++) {
				jQuery('.visual_grid_holder').append('<div class="visual_grid_line_y y_' + e + '"></div>')
				jQuery('.y_' + e).css({
					top: (y_space * e) + 'px'
				});
				delay_val = (0.1 * e);

				if (e === 5) {
					jQuery('.y_' + e).addClass('visual_across');
					TweenLite.to(jQuery('.y_' + e), 0.2, { delay: delay_val, opacity: 0.7, backgroundColor: 'aqua', ease: Power2.easeInOut });
				} else {
					TweenLite.to(jQuery('.y_' + e), 0.2, { delay: delay_val, opacity: 0.7, backgroundColor: '#646473', ease: Power2.easeInOut });
				}
			}

			jQuery(this).attr('data-grid-toggle', 'open');

			/////////////////

		} else {

			jQuery('.hslider_ux_grid .hslider_ux_items').html('Grid On');

			jQuery('.visual_grid_holder').remove();

			jQuery(this).attr('data-grid-toggle', 'off');

		}

	});



}

//add fonts url to page
function add_google_fonts(main_object) {

	var font_array = [];

	//remove
	jQuery('#google_fonts').remove();


	//create array with all fonts
	jQuery(main_object.slider.slides).each(function (index, element) {

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

	//make the arrays unique
	font_array = unique(font_array);

	//create google font url
	var google_var = '<link href="https://fonts.googleapis.com/css?family=' + font_array.join("|") + '" id="google_fonts" rel="stylesheet" type="text/css">';

	//insert font url to page
	jQuery(google_var).insertBefore('.hslider_slide_main');

	//reload drage dimentions
	set_drag_dimentions();

}

//unique array
function unique(list) {
	var result = [];
	jQuery.each(list, function (i, e) {
		if (jQuery.inArray(e, result) == -1) result.push(e);
	});
	return result;
}

var zoom_val = 0.3;
var slide_width;
var slide_height;
var slide_main_width;

//set slide
function set_slide(obj, index) {

	//variables
	slide_width = obj.slider.width;
	if (obj.slider.sliderType === 'responsive') {
		slide_width = 1200;
	}
	slide_height = obj.slider.height;
	zoom_val = (jQuery('.hslider_slide_main').width() / slide_width);
	var drag_percentage = (zoom_val * 100).toFixed(0);

	//set global zoom val 
	global_zoom_val = zoom_val.toFixed(2);

	//set preview image container / this has been give the actual width of the slider and scaled down to give an example preview. so the ration is maintained!
	jQuery('.hslider_bg_preview').css({
		'width': slide_width + 'px',
		'height': slide_height + 'px'
	});
	TweenLite.to(jQuery('.hslider_bg_preview'), 0, { transformOrigin: "left top", scaleX: 0.2, scaleY: .2, ease: Power2.easeInOut });
	TweenLite.to(jQuery('.hslider_bg_preview').parent('.hero_col_12'), 0, { width: (jQuery('.hslider_bg_preview').width() * 0.2), height: (jQuery('.hslider_bg_preview').height() * 0.2), ease: Power2.easeInOut });

	//set the slide holder width and height
	jQuery('.hslider_slide_holder').css({
		"width": slide_width + "px",
		"height": slide_height + "px"
	});

	slide_main_width = jQuery('.hslider_slide_main').width();

	if (slide_width > slide_main_width) {
		//set global zoom val 
		global_zoom_val = zoom_val.toFixed(2);
		TweenLite.to(jQuery('.hslider_slide_holder'), 0, { transformOrigin: "center top", scale: zoom_val, ease: Power2.easeInOut });
		jQuery('.hslider_slide_main').height((slide_height * zoom_val));
		jQuery('.hslider_slide_holder').css({ "zoom": zoom_val });
		//set drag div's initial position
		TweenLite.to(jQuery('.hslider_zoom_drag'), 2, { left: drag_percentage + "%", ease: Power2.easeOut });
		jQuery('.hslider_line_perc').html(drag_percentage + '%');
	} else {
		//set global zoom val 
		global_zoom_val = 1;
		TweenLite.to(jQuery('.hslider_zoom_drag'), 2, { left: "285px", ease: Power2.easeOut });
		jQuery('.hslider_line_perc').html(100 + '%');
	}

	Draggable.create(".hslider_zoom_drag", {
		type: "x",
		edgeResistance: 1,
		bounds: ".hslider_zoom_holder",
		throwProps: false,
		onDragStart: function () {
			TweenLite.to(jQuery('.hslider_zoom_line'), 0.5, { backgroundColor: '#5BC0DE', ease: Power2.easeInOut });
		},
		onDrag: function () {
			var pos = jQuery('.hslider_zoom_drag').position();
			var percentage = ((pos.left) + 15) / 300;
			//set global zoom val 
			global_zoom_val = percentage.toFixed(2);
			TweenLite.to(jQuery('.hslider_slide_holder'), 0, { transformOrigin: "center top", scale: percentage.toFixed(2), ease: Power2.easeInOut, onComplete: adjust_holder });
			jQuery('.hslider_line_perc').html((percentage * 100).toFixed(0) + '%');
			jQuery('.hslider_slide_main').height((slide_height * percentage));
		},
		onDragEnd: function () {
			TweenLite.to(jQuery('.hslider_zoom_line'), 0.5, { backgroundColor: '#CCC', ease: Power2.easeInOut });
		}
	});

	adjust_holder();

}

//adjust holder height
function adjust_holder() {
	var holder_height = jQuery('.hslider_slide_main').height();
	TweenLite.to(jQuery('.slide_holder_adjust'), 0, { height: holder_height + 60, ease: Power2.easeInOut });
}

//load slide data
function load_slide_data(obj, index) {

	//set delete button index
	jQuery('.slide_delete_btn').attr('data-index', global_slide_index);

	//set slide options
	var slide_status = obj.slider.slides[index].status;
	var slide_transition = obj.slider.slides[index].animationType;
	var slide_arrow_idle = obj.slider.slides[index].slideIdle;
	var slide_mouse_move = obj.slider.slides[index].mouseMove;

	//set status
	if (slide_status) {
		if (jQuery('#slide_active').val() == slide_status) {
			jQuery('#slide_active').attr('checked', 'checked');
		}
	}

	//set status
	if (slide_mouse_move) {
		if (jQuery('#move_elements_active').val() == slide_mouse_move) {
			jQuery('#move_elements_active').attr('checked', 'checked');
		}
	}

	//set transparency
	if (slide_transition) {
		jQuery('#transition option').each(function (index, element) {
			if (jQuery(this).val() === slide_transition) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	}

	//set transparency
	if (slide_arrow_idle) {
		jQuery('#arrow_idle option').each(function (index, element) {
			if (jQuery(this).val() === slide_arrow_idle) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	}

	//set background variables
	var background_image = obj.slider.slides[index].background[0].backgroundImage;
	var background_position = obj.slider.slides[index].background[0].backgroundPosition;
	var background_repeat = obj.slider.slides[index].background[0].backgroundRepeat;
	var background_size = obj.slider.slides[index].background[0].backgroundSize;
	var burns_direction = obj.slider.slides[index].background[0].burnsDirection;
	var para_direction = obj.slider.slides[index].background[0].paraDirection;
	var burns_distance = obj.slider.slides[index].background[0].burnsDistance;

	//set position
	if (background_position) {
		jQuery('#background_position option').each(function (index, element) {
			if (jQuery(this).val() === background_position) {
				jQuery(this).attr('selected', 'selected');
			}
		});
		set_slide_background(background_position, 'position');
	}

	//set repeat
	if (background_repeat) {
		jQuery('#background_repeat option').each(function (index, element) {
			if (jQuery(this).val() === background_repeat) {
				jQuery(this).attr('selected', 'selected');
			}
		});
		set_slide_background(background_repeat, 'repeat');
	}

	//set size
	if (background_size) {
		jQuery('#background_size option').each(function (index, element) {
			if (jQuery(this).val() === background_size) {
				jQuery(this).attr('selected', 'selected');
			}
		});
		set_slide_background(background_size, 'size');
	}

	//set background image
	if (background_image) {
		jQuery('#background_image').val(background_image);
		set_slide_background(background_image, 'image');
	}

	//set description varaibles
	var slide_bg_color = obj.slider.slides[index].background[0].backgroundColor;
	var slide_bg_animation = obj.slider.slides[index].background[0].backgroundAnimation;

	//set background hover type
	if (slide_bg_animation) {
		if (jQuery('#slide_bg_animation_static').val() == slide_bg_animation) {
			jQuery('#slide_bg_animation_static').attr('checked', 'checked');
			jQuery('.effect_para').hide();
			jQuery('.effect_burns').hide();
		}
		if (jQuery('#slide_bg_animation_para').val() == slide_bg_animation) {
			jQuery('#slide_bg_animation_para').attr('checked', 'checked');
			jQuery('.effect_para').show();
			jQuery('.effect_burns').hide();
		}
		if (jQuery('#slide_bg_animation_zoom').val() == slide_bg_animation) {
			jQuery('#slide_bg_animation_zoom').attr('checked', 'checked');
			jQuery('.effect_para').hide();
			jQuery('.effect_burns').show();
		}
	}

	if (burns_direction) {
		jQuery('#burns_direction option').each(function (index, element) {
			if (jQuery(this).val() === burns_direction) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	}

	if (burns_distance) {
		jQuery('#burns_distance option').each(function (index, element) {
			if (jQuery(this).val() === burns_distance) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	}

	if (para_direction) {
		jQuery('#para_direction option').each(function (index, element) {
			if (jQuery(this).val() === para_direction) {
				jQuery(this).attr('selected', 'selected');
			}
		});
	}

	//set slide description
	if (slide_bg_color) {
		jQuery('#slide_bg_color').val(slide_bg_color);
		TweenLite.to(jQuery('.hslider_slide_holder'), 1, { backgroundColor: slide_bg_color, ease: Power2.easeInOut });
		TweenLite.to(jQuery('.hslider_bg_preview'), 1, { backgroundColor: slide_bg_color, ease: Power2.easeInOut });
	}

	//set video variables
	var video_mp4 = obj.slider.slides[index].background[0].mp4;
	var video_ogg = obj.slider.slides[index].background[0].ogg;
	var video_webm = obj.slider.slides[index].background[0].webm;
	var video_default = obj.slider.slides[index].background[0].backgroundDefault;

	//set video mp4
	if (video_mp4) {
		jQuery('#video_mp4').val(video_mp4);
	}

	//set video ogg
	if (video_ogg) {
		jQuery('#video_ogg').val(video_ogg);
	}

	//set video webm
	if (video_webm) {
		jQuery('#video_webm').val(video_webm);
	}

	//set video default image
	if (video_default) {
		jQuery('#video_default_image').val(video_default);
	}

	//set description varaibles
	var slide_desc = obj.slider.slides[index].slideDescription;

	//set slide description
	if (slide_desc) {
		jQuery('#slide_description').val(slide_desc);
	}

	//bind video/image toggle
	toggle_section(obj.slider.slides[index].background[0].type);

	//switch components
	switch_components();

	//enable update settings
	enable_update_settings(obj, index);

}

//toggle image video section
function toggle_section(type) {

	switch (type) {
		case 'image':
			jQuery('#image').show();
			jQuery('#video').hide();
			jQuery('body').find('[data-type="image"]').removeClass('btn_off');
			jQuery('body').find('[data-type="video"]').addClass('btn_off');
			break;
		case 'video':
			jQuery('#image').hide();
			jQuery('#video').show();
			jQuery('body').find('[data-type="image"]').addClass('btn_off');
			jQuery('body').find('[data-type="video"]').removeClass('btn_off');
			break;
	}

}

//enable update settings
function enable_update_settings(obj, index) {

	var control_status = jQuery('#slide_active');
	var control_transition = jQuery('#transition');
	var control_arrow_idle = jQuery('#arrow_idle');
	var control_mouse_move = jQuery('#move_elements_active');

	//change: slide status
	jQuery(control_status).on('change', function () {
		jQuery(this).prop('checked') ? obj.slider.slides[index].status = jQuery(this).val() : obj.slider.slides[index].status = 0;
		flag_save_required('hplugin_persist_object_data');
	});

	//change: slide status
	jQuery(control_mouse_move).on('change', function () {
		jQuery(this).prop('checked') ? obj.slider.slides[index].mouseMove = jQuery(this).val() : obj.slider.slides[index].mouseMove = 0;
		flag_save_required('hplugin_persist_object_data');
	});

	//change: animation type
	jQuery('.transition .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_transition).trigger('change');
	});
	jQuery(control_transition).on('change', function () {
		obj.slider.slides[index].animationType = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
		jQuery('.hslider_animation_toggle_inner').remove();
		if (jQuery(this).children('option:selected').val() === 'lax') {
			jQuery('.hslider_animation_toggle').append('<div class="hslider_animation_toggle_inner">Parallax slide transition active, settings disabled.</div>');
			jQuery('.switch_for_parallax').prop('disabled', false).removeClass('hslider_disable_input');
			jQuery('.switch_for_parallax2').prop('disabled', true).addClass('hslider_disable_input');
			jQuery('.hslider_offset_toggle').show();
			//LABELS
			jQuery('.parallax_heading').html('Parallax offset');
			jQuery('.parallax_sub_heading').html('Offset (Left/Right)');
		} else {
			jQuery(obj.slider.slides[index].elements).each(function (idx, ele) {
				if (ele.animation[0].direction !== 'custom') {
					jQuery('#element_list_' + idx + ' .hslider_offset_toggle').hide();
					jQuery('#element_list_' + idx + ' .switch_for_parallax').prop('disabled', true).addClass('hslider_disable_input');
					jQuery('#element_list_' + idx + ' .switch_for_parallax2').prop('disabled', true).addClass('hslider_disable_input');
				} else {
					jQuery('#element_list_' + idx + ' .hslider_offset_toggle').show();
					jQuery('#element_list_' + idx + ' .switch_for_parallax').prop('disabled', false).removeClass('hslider_disable_input');
					jQuery('#element_list_' + idx + ' .switch_for_parallax2').prop('disabled', false).removeClass('hslider_disable_input');
				}
			});
			//LABELS
			jQuery('.parallax_heading').html('Starting position');
			jQuery('.parallax_sub_heading').html('Start position: Horizontal');
		}
	});

	//change: slide idle
	jQuery('.arrow_idle .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_arrow_idle).trigger('change');
	});
	jQuery(control_arrow_idle).on('change', function () {
		obj.slider.slides[index].slideIdle = jQuery(this).children('option:selected').val();
		jQuery(obj.slider.slides[index].elements).each(function (index, element) {
			switch_duration_preview(element, index, element.animation[0].delay, element.animation[0].duration);
		});
		jQuery('.element_time_idle .hero_white').html('Slide idle duration (' + jQuery(this).children('option:selected').val() + ' sec)');
		flag_save_required('hplugin_persist_object_data');
	});

	var control_background_image = jQuery('#background_image');
	var control_background_position = jQuery('#background_position');
	var control_background_repeat = jQuery('#background_repeat');
	var control_background_size = jQuery('#background_size');

	//change: background image
	jQuery(control_background_image).on('change keyup', function () {
		obj.slider.slides[index].background[0].backgroundImage = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
		set_slide_background(jQuery(this).val(), 'image');
	});

	//change: background position
	jQuery('.background_position .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_background_position).trigger('change');
	});
	jQuery(control_background_position).on('change', function () {
		obj.slider.slides[index].background[0].backgroundPosition = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
		set_slide_background(jQuery(this).val(), 'position');
	});

	//change: background repeat
	jQuery('.background_repeat .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_background_repeat).trigger('change');
	});
	jQuery(control_background_repeat).on('change', function () {
		obj.slider.slides[index].background[0].backgroundRepeat = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
		set_slide_background(jQuery(this).val(), 'repeat');
	});

	//change: background size
	jQuery('.background_size .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_background_size).trigger('change');
	});
	jQuery(control_background_size).on('change', function () {
		obj.slider.slides[index].background[0].backgroundSize = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
		set_slide_background(jQuery(this).val(), 'size');
	});

	var control_slide_bg_color = jQuery('#slide_bg_color');
	var control_static = jQuery('#slide_bg_animation_static');
	var control_para = jQuery('#slide_bg_animation_para');
	var control_para_direction = jQuery('#para_direction');
	var control_zoom = jQuery('#slide_bg_animation_zoom');
	var control_zoom_direction = jQuery('#burns_direction');
	var control_zoom_distance = jQuery('#burns_distance');

	//change: animation static
	jQuery(control_static).on('change', function () {
		obj.slider.slides[index].background[0].backgroundAnimation = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
		jQuery('.effect_para').hide();
		jQuery('.effect_burns').hide();
	});

	//change: animation para
	jQuery(control_para).on('change', function () {
		obj.slider.slides[index].background[0].backgroundAnimation = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
		jQuery('.effect_para').show();
		jQuery('.effect_burns').hide();
	});

	//change: para direction
	jQuery('.para_direction .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_para_direction).trigger('change');
	});
	jQuery(control_para_direction).on('change', function () {
		obj.slider.slides[index].background[0].paraDirection = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	//change: animation zoom
	jQuery(control_zoom).on('change', function () {
		obj.slider.slides[index].background[0].backgroundAnimation = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
		jQuery('.effect_para').hide();
		jQuery('.effect_burns').show();
	});

	//change: burns direction
	jQuery('.burns_direction .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_zoom_direction).trigger('change');
	});
	jQuery(control_zoom_direction).on('change', function () {
		obj.slider.slides[index].background[0].burnsDirection = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	//change: burns direction
	jQuery('.burns_distance .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery(control_zoom_distance).trigger('change');
	});
	jQuery(control_zoom_distance).on('change', function () {
		obj.slider.slides[index].background[0].burnsDistance = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	//change: bg color
	jQuery(control_slide_bg_color).on('change keyup', function () {
		obj.slider.slides[index].background[0].backgroundColor = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
		TweenLite.to(jQuery('.hslider_slide_holder'), 1, { backgroundColor: jQuery(this).val(), ease: Power2.easeInOut });
		TweenLite.to(jQuery('.hslider_bg_preview'), 1, { backgroundColor: jQuery(this).val(), ease: Power2.easeInOut });
	});

	var control_mp4 = jQuery('#video_mp4');
	var control_ogg = jQuery('#video_ogg');
	var control_webm = jQuery('#video_webm');
	var control_default = jQuery('#video_default_image');

	//change: mp4
	jQuery(control_mp4).on('change keyup', function () {
		obj.slider.slides[index].background[0].mp4 = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	//change: ogg
	jQuery(control_ogg).on('change keyup', function () {
		obj.slider.slides[index].background[0].ogg = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	//change: webm
	jQuery(control_webm).on('change keyup', function () {
		obj.slider.slides[index].background[0].webm = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	//change: default image
	jQuery(control_default).on('change keyup', function () {
		obj.slider.slides[index].background[0].backgroundDefault = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	var control_slide_description = jQuery('#slide_description');

	//change: mp4
	jQuery(control_slide_description).on('change keyup', function () {
		obj.slider.slides[index].slideDescription = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('.toggle_bg_type').on('click', function () {
		obj.slider.slides[index].background[0].type = jQuery(this).attr('data-type');
		flag_save_required('hplugin_persist_object_data');
		toggle_section(jQuery(this).attr('data-type'));
	});

	//delete slide button
	jQuery('.slide_delete_btn').on('click', function () {
		obj.slider.slides.splice(jQuery(this).attr('data-index'), 1);
		if (obj.slider.slides.length < 1) {
			reload_sub_view('sub_slides_view', 'dropdown/', 'sub.slides');
			global_slide_index = 0;
		} else {
			reload_sub_view('sub_slides_view', 'dropdown/', 'sub.slides');
			global_slide_index = 0;
		}
		flag_save_required('hplugin_persist_object_data');
	});

}

//set slide background
function set_slide_background(val, attr) {

	switch (attr) {
		case 'image':
			jQuery('.hslider_slide_holder').css({
				'background-image': 'url(' + val + ')'
			});
			jQuery('.hslider_bg_preview').css({
				'background-image': 'url(' + val + ')'
			});
			break;
		case 'position':
			jQuery('.hslider_slide_holder').css({
				'background-position': val
			});
			jQuery('.hslider_bg_preview').css({
				'background-position': val
			});
			break;
		case 'repeat':
			jQuery('.hslider_slide_holder').css({
				'background-repeat': val
			});
			jQuery('.hslider_bg_preview').css({
				'background-repeat': val
			});
			break;
		case 'size':
			jQuery('.hslider_slide_holder').css({
				'background-size': val
			});
			jQuery('.hslider_bg_preview').css({
				'background-size': val
			});
			break;
	}
}

//populate top bar
function populate_topbar(main_object) {

	jQuery('ul.slide_ul').html('');

	//add the add slide btn
	jQuery('ul.slide_ul').append('<li class="add_new_slide">+ Add New Slide</li>');

	//add empty ul for slide items
	jQuery('ul.slide_ul').append('<ul class="slide_items"></ul>');

	//add slides to top bar
	if (main_object.slider.slides.length !== 0) {

		var slide_item_html = '';

		//sort slides
		main_object.slider.slides.sort(sort_items);

		jQuery(main_object.slider.slides).each(function (index, element) {

			var background_image = '';
			var background_color = '';

			var active_style = '';

			if (index == global_slide_index) {
				active_style = 'top_slide_active';
			}

			slide_item_html += '<li class="top_slide_item ' + active_style + '" data-id="' + element.slideId + '" data-index="' + index + '">Slide ' + (index + 1) + '<div class="slide_item_drag"></div></li>';

		});

	} else {
		add_slide_object();
	}

	//add html
	jQuery('.slide_items').append(slide_item_html);

	//animate slide items in top nav
	/*jQuery('.slide_ul').find("[data-id]").each(function(index, element) {
		var delay_amount = 0.1 * index;			
		TweenLite.to(jQuery(this), 0.3, {opacity:1, ease:Power2.easeInOut, delay:delay_amount});
	});*/

	//enable add button
	enable_add_slide();

	//enable item hover
	enable_slide_item();

	//enable slide order change
	enable_slide_order_change();

}

//enable slide order change
function enable_slide_order_change() {

	jQuery(".slide_items").sortable({
		placeholder: "item_placeholder",
		cancel: '.add_new_slide',
		stop: function (e, ui) {
			set_slide_order();
			flag_save_required('hplugin_persist_object_data');
			//
			reload_sub_view('sub_slides_view', 'dropdown/', 'sub.slides');
			global_slide_index = ui.item.index();
			load_slide_data(main_object, ui.item.index());
		},
		handle: '.slide_item_drag'
	});

}

function set_slide_order() {

	jQuery('.top_slide_item ').each(function (index, element) {
		var the_index = jQuery(this).data('index');
		main_object.slider.slides[the_index].order = index;
	});

}

//enable add slide
function enable_add_slide() {

	jQuery('.add_new_slide').off().on('click', function () {
		add_slide_object();
	});

}

//enable item hover
function enable_slide_item() {

	jQuery('.top_slide_item').on({
		click: function () {
			reload_sub_view('sub_slides_view', 'dropdown/', 'sub.slides');
			global_slide_index = jQuery(this).attr('data-index');
			load_slide_data(main_object, global_slide_index);
		}
	});

}

//slide object
function add_slide_object() {

	var json;

	var slide_count = main_object.slider.slides.length;

	json = '{ "slideId":0, "status":1, "mouseMove":0, "type":"content", "order":"' + slide_count + '", "animationType":"fade", "background":[{ "type":"image", "backgroundImage":"", "backgroundDefault":"", "mp4":"", "ogg":"", "webm":"", "backgroundPosition":"center", "backgroundRepeat":"none", "backgroundSize":"cover", "backgroundColor":"#CCC", "backgroundAnimation":"static", "burnsDirection":"left right", "burnsDistance":"4","paraDirection":"top_down" } ], "slideIdle":"5", "slideDescription":"", "elements":[] }';

	var parse_string = JSON.parse(json);

	main_object.slider.slides.push(parse_string);

	//populate top bar with new slide
	populate_topbar(main_object);

	//enable save
	flag_save_required('hplugin_persist_object_data');

}

//enable accordion
function enable_accordion() {

	jQuery('.element_edit_btn').on('click', function () {

		//variables
		var item_height = jQuery(this).parents('.elememt_list_item').children('.element_settings').height();
		var position = jQuery(this).parents('.elememt_list_item').attr('data-position');
		var normal_height = 43;

		//tween
		TweenLite.to(jQuery(this).parents('.elememt_list_item'), 0.5, { height: (normal_height + item_height) + 30, ease: Power2.easeInOut });
		TweenLite.to(jQuery(this).parents('.elememt_list_item').children('.element_timeline'), 0.5, { height: 19, ease: Power2.easeInOut });
		TweenLite.to(jQuery(this).parents('.elememt_list_item').children('.element_timeline').children('.element_time'), 0.5, { height: 19, ease: Power2.easeInOut });

		//set attribute
		jQuery(this).parents('.elememt_list_item').attr('data-toggle', 'open');

		close_accordion(position);

	});

}

//close accordion
function close_accordion(position) {

	jQuery('.elememt_list_item').each(function (index, element) {

		if (jQuery(this).attr('data-position') !== position) {

			//tween
			TweenLite.to(jQuery(this), 0.5, { height: 43, ease: Power2.easeInOut });
			TweenLite.to(jQuery(this).children('.element_timeline'), 0.5, { height: 3, ease: Power2.easeInOut });
			TweenLite.to(jQuery(this).children('.element_timeline').children('.element_time'), 0.5, { height: 3, ease: Power2.easeInOut });

		}

	});

}

//custom popup load
function activate_custom_popup_load() {

	//set initial state
	TweenLite.to(jQuery('.hero_custom_popup_holder .hero_custom_popup_inner'), 0, { ease: Power2.easeInOut });

	//open popup
	jQuery('.data_popup_launch').off().on('click', function () {

		//check what action is being applied
		var action = jQuery(this).attr('data-action');

		//animation
		jQuery('.hero_custom_popup_holder').css({ 'display': 'table' });
		TweenLite.to(jQuery('.hero_custom_popup_holder'), 0, { opacity: 1, ease: Power2.easeInOut });
		jQuery('.hero_custom_popup_inner').css({ 'background-color': '#FFF' });
		TweenLite.to(jQuery('.hero_custom_popup_inner'), 0, { opacity: 1, ease: Power2.easeInOut });
		jQuery('.hero_custom_popup_content').css({ 'overflow': 'visible' });

		//variables	
		var html_load = jQuery(this).attr('data-load');
		var the_url = core_view_path + 'views/dropdown/html_snippets/html_' + html_load + '.html';
		var the_title = jQuery(this).attr('data-title');
		var the_index = jQuery(this).attr('data-index');

		jQuery('.hero_custom_popup_top_title').html(the_title);

		//remove html
		jQuery('.hero_custom_popup_info').remove();
		jQuery('.hero_custom_popup_top_inner select').remove();
		jQuery('.hero_custom_popup_top_inner div').remove();

		//load html
		jQuery.ajax({
			url: the_url,
			data: {
				index: 'index'
			},
			async: false,
			dataType: "html"
		}).done(function (data) {
			//append html
			jQuery('.hero_custom_popup_content').html(data);

			//add posts categories to post popup
			if (html_load === 'post' || html_load === 'woo') {
				add_custom_to_popup(html_load, the_index);
			}

			//button animation
			TweenMax.to(jQuery('.popup_update_holder'), 0, { opacity: 0, bottom: -70, ease: Strong.easeInOut });
			TweenMax.to(jQuery('.popup_update_holder'), 1, { opacity: 1, delay: 0.5, bottom: -50, ease: Strong.easeInOut });

			//set add button data
			switch (action) {
				case 'insert':

					var element_count = main_object.slider.slides[global_slide_index].elements.length;

					populate_fonts();
					add_element_data(html_load, action);

					//enable_woo_product_loader
					enable_woo_product_loader(element_count);

					break;
				case 'update':

					populate_fonts();
					add_update_data(html_load, action, the_index);

					//enable_woo_product_loader
					enable_woo_product_loader(the_index);

					break;
			}

			//add posts categories to post popup
			if (html_load === 'button') {
				add_custom_to_popup(html_load, the_index);
			}

			//switch components
			switch_components();

		}).fail(function () {
			//page error
		});

	});

	//close popup
	jQuery('.hero_custom_close').off().on('click', function () {
		TweenLite.to(jQuery('.hero_custom_popup_holder'), 0, { opacity: 0, ease: Power2.easeInOut, onComplete: custom_popup_none });
		TweenLite.to(jQuery('.hero_custom_popup_inner'), 0, { opacity: 0, ease: Power2.easeInOut });
		jQuery('.hero_custom_sidebar_close').trigger('click');
	});

}

function toggle_product_display(val) {

	if (val === 'woo_normal_display' || typeof (val) === 'undefined') {
		jQuery('.hslider_normal_display').show();
		jQuery('.hslider_custom_display').hide();
		jQuery('.hero_custom_sidebar_close').trigger('click');
	} else {
		jQuery('.hslider_normal_display').hide();
		jQuery('.hslider_custom_display').show();
	}

}

//add custom data to the popup inputs, selects etc...
function add_custom_to_popup(html_load, the_index) {

	switch (html_load) {
		case 'post':
			var items = '';
			jQuery(global_post_object.categories).each(function (index, element) {
				items += '<option value="' + element.id + '">' + element.title + '</option>';
			});
			jQuery('#post_category').html(items);
			break;
		case 'woo':

			//add categories
			var items = '';
			jQuery(global_woo_object.categories).each(function (index, element) {
				items += '<option value="' + element.slug + '">' + element.title + '</option>';
			});
			jQuery('#product_category').html(items);

			//add toggle
			toggle_product_display(jQuery('#product_display').val());
			jQuery('.product_display .hero_dropdown .hero_drop_row').on('click', function () {
				jQuery(control_para_direction).trigger('change');
			});
			jQuery('#product_display').on('change', function () {
				toggle_product_display(jQuery(this).children('option:selected').val());
			});

			break;
		case 'button':

			//get button html
			jQuery('#button_theme').on('change', function () {

				//json object
				json = '{ "font":[ { "family":"' + jQuery('#button_family').val() + '", "weight":"' + jQuery('#button_weight').val() + '", "transform":"uppercase", "size":"' + jQuery('#button_size').val() + '", "sizing":"' + jQuery('#button_sizing').val() + '", "color":"' + jQuery('#button_1_color').val() + '", "secondary":"' + jQuery('#button_2_color').val() + '" } ] }';

				//parse json					
				parse_string = JSON.parse(json);

				jQuery('.hero_button_preview_holder').html(hslider_button_html(jQuery('#button_content').val(), jQuery(this).val(), parse_string, 'example', 1));
				jQuery('<style type="text/css" id="example_styles">' + hslider_button_css(jQuery(this).val(), parse_string, 'example', 1) + '</style>').appendTo('.hero_button_preview_holder');

				eval("hslider_" + jQuery('#button_theme').val() + "()");

			});

			//trigger
			jQuery('#button_theme').trigger('change');

			break;
	}

}

//set update button element data
function add_update_data(type_to_load, action, the_index) {

	//set add button data
	jQuery('.element_insert_button').attr('data-element', type_to_load);
	jQuery('.element_insert_button').attr('data-action', action);
	jQuery('.element_insert_button').attr('data-index', the_index);
	jQuery('.element_insert_button').html('Update element');

	//set data for popup
	switch (type_to_load) {
		case 'text':

			//set text popup data			
			jQuery('#element_content').val(main_object.slider.slides[global_slide_index].elements[the_index].content.replace(/<br\s*\/?>/mg, "\n"));
			jQuery('#element_width').val(main_object.slider.slides[global_slide_index].elements[the_index].width);
			jQuery('#element_url').val(main_object.slider.slides[global_slide_index].elements[the_index].url);
			jQuery('#element_alt').val(main_object.slider.slides[global_slide_index].elements[the_index].alt);
			jQuery('#element_title').val(main_object.slider.slides[global_slide_index].elements[the_index].title);

			jQuery('#element_target option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].target) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_target'));

			jQuery('#element_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].family) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_font_family'));

			jQuery('#element_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].weight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_font_weight'));

			jQuery('#element_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].font[0].size);

			jQuery('#element_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].sizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_font_sizing'));

			jQuery('#element_color').val(main_object.slider.slides[global_slide_index].elements[the_index].font[0].color);

			jQuery('#element_font_align option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].align) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_font_align'));

			jQuery('#element_font_style option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].fontStyle) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_font_style'));

			jQuery('#element_spacing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].letterSpacing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_spacing'));

			break;
		case 'element':

			//set text popup data			
			jQuery('#element_source').val(main_object.slider.slides[global_slide_index].elements[the_index].source);
			jQuery('#element_url').val(main_object.slider.slides[global_slide_index].elements[the_index].url);
			jQuery('#element_alt').val(main_object.slider.slides[global_slide_index].elements[the_index].alt);
			jQuery('#element_title').val(main_object.slider.slides[global_slide_index].elements[the_index].title);

			jQuery('#element_target option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].target) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_target'));

			break;
		case 'post':

			jQuery('#post_category option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].category) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#post_category'));

			jQuery('#post_number option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].postNumber) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#post_number'));

			///////////////////

			//jQuery('#element_url').val(main_object.slider.slides[global_slide_index].elements[the_index].url);			
			//jQuery('#element_alt').val(main_object.slider.slides[global_slide_index].elements[the_index].alt);			
			//jQuery('#element_title').val(main_object.slider.slides[global_slide_index].elements[the_index].title);	

			jQuery('#element_target option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].target) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#element_target'));

			jQuery('#button_text').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].buttonText);

			///////////////////

			jQuery('#post_layout option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].postLayout) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#post_layout'));

			jQuery('#post_img_layout option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].postImageLayout) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#post_img_layout'));

			jQuery('#post_img_size option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].postImageSize) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#post_img_size'));

			jQuery('#post_width').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].postLayoutWidth);

			///////////////////

			jQuery('#heading_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#heading_font_family'));

			jQuery('#heading_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#heading_font_weight'));

			jQuery('#heading_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSize);

			jQuery('#heading_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#heading_font_sizing'));

			jQuery('#heading_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontColor);

			///////////////////

			jQuery('#excerpt_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#excerpt_font_family'));

			jQuery('#excerpt_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#excerpt_font_weight'));

			jQuery('#excerpt_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontSize);

			jQuery('#excerpt_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#excerpt_font_sizing'));

			jQuery('#excerpt_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontColor);

			///////////////////

			jQuery('#button_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_font_family'));

			jQuery('#button_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_font_weight'));

			jQuery('#button_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontSize);

			jQuery('#button_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_font_sizing'));

			jQuery('#button_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontColor);

			break;
		case 'video':

			//set text popup data
			jQuery('#video_type option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].videoType) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#video_type'));

			jQuery('#video_id').val(main_object.slider.slides[global_slide_index].elements[the_index].videoId);
			jQuery('#youtube_width').val(main_object.slider.slides[global_slide_index].elements[the_index].videoSettings.youtube.width);
			jQuery('#youtube_height').val(main_object.slider.slides[global_slide_index].elements[the_index].videoSettings.youtube.height);
			jQuery('#youtube_theme option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].videoSettings.youtube.theme) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#youtube_theme'));
			jQuery('#vimeo_width').val(main_object.slider.slides[global_slide_index].elements[the_index].videoSettings.vimeo.width);
			jQuery('#vimeo_height').val(main_object.slider.slides[global_slide_index].elements[the_index].videoSettings.vimeo.height);
			jQuery('#vimeo_color').val(main_object.slider.slides[global_slide_index].elements[the_index].videoSettings.vimeo.color);

			break;
		case 'button':

			//set text popup data				
			jQuery('#button_theme option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].theme) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_theme'));

			jQuery('#button_content').val(main_object.slider.slides[global_slide_index].elements[the_index].content);

			jQuery('#button_url').val(main_object.slider.slides[global_slide_index].elements[the_index].url);
			jQuery('#button_alt').val(main_object.slider.slides[global_slide_index].elements[the_index].alt);
			jQuery('#button_title').val(main_object.slider.slides[global_slide_index].elements[the_index].title);

			jQuery('#button_target option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].target) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_target'));

			jQuery('#button_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].family) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_family'));

			jQuery('#button_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].weight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_weight'));

			jQuery('#button_size').val(main_object.slider.slides[global_slide_index].elements[the_index].font[0].size);

			jQuery('#button_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].sizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_sizing'));

			jQuery('#button_transform option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].font[0].transform) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_transform'));

			jQuery('#button_border option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].borderType) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_border'));

			jQuery('#button_1_color').val(main_object.slider.slides[global_slide_index].elements[the_index].font[0].color);
			jQuery('#button_2_color').val(main_object.slider.slides[global_slide_index].elements[the_index].font[0].secondary);

			break;

		case 'woo':

			toggle_product_display(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].display);

			jQuery('#product_display option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].display) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_display'));

			jQuery('#product_category option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].category) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_category'));

			jQuery('#product_number option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productNumber) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_number'));

			jQuery('#product_custom_id').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productCustomId);

			///////////////////

			jQuery('#product_layout option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productLayout) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_layout'));

			jQuery('#product_img_layout option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productImageLayout) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_img_layout'));

			jQuery('#product_img_size option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productImageSize) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_img_size'));

			jQuery('#product_width').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productLayoutWidth);

			///////////////////
			/////////////////

			jQuery('#product_background_position option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productImagePosition) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_background_position'));

			jQuery('#product_background_repeat option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productImageRepeat) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_background_repeat'));

			jQuery('#product_background_size option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].productImageSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#product_background_size'));

			jQuery('#product_button_text').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].buttonText);

			///////////////////

			jQuery('#heading_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#heading_font_family'));

			jQuery('#heading_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#heading_font_weight'));

			jQuery('#heading_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSize);

			jQuery('#heading_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#heading_font_sizing'));

			jQuery('#heading_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontColor);

			///////////////////

			jQuery('#price_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].price[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#price_font_family'));

			jQuery('#price_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].price[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#price_font_weight'));

			jQuery('#price_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].price[0].fontSize);

			jQuery('#price_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].price[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#price_font_sizing'));

			jQuery('#price_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].price[0].fontColor);

			///////////////////

			jQuery('#saleprice_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].saleprice[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#saleprice_font_family'));

			jQuery('#saleprice_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].saleprice[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#saleprice_font_weight'));

			jQuery('#saleprice_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].saleprice[0].fontSize);

			jQuery('#saleprice_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].saleprice[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#saleprice_font_sizing'));

			jQuery('#saleprice_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].saleprice[0].fontColor);

			///////////////////

			jQuery('#excerpt_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#excerpt_font_family'));

			jQuery('#excerpt_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#excerpt_font_weight'));

			jQuery('#excerpt_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontSize);

			jQuery('#excerpt_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#excerpt_font_sizing'));

			jQuery('#excerpt_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].excerpt[0].fontColor);

			///////////////////

			jQuery('#button_font_family option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontFamily) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_font_family'));

			jQuery('#button_font_weight option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontWeight) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_font_weight'));

			jQuery('#button_font_size').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontSize);

			jQuery('#button_font_sizing option').each(function (index, element) {
				if (jQuery(this).val() === main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].heading[0].fontSizing) {
					jQuery(this).attr('selected', 'selected');
				}
			});
			update_select_component(jQuery('#button_font_sizing'));

			jQuery('#button_color').val(main_object.slider.slides[global_slide_index].elements[the_index].settings[0].font[0].button[0].fontColor);

			break;
	}

	//set click event
	jQuery('.element_insert_button').off().on('click', function () {

		var data_element = jQuery('.element_insert_button').attr('data-element');
		var data_index = jQuery('.element_insert_button').attr('data-index');

		switch (data_element) {
			case 'text':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'element':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'post':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'video':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'button':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'woo':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
		}

		//create json
		var element_object = {};

		jQuery.each(serialized_data, function () {
			if (element_object[this.name]) {
				if (!element_object[this.name].push) {
					element_object[this.name] = [element_object[this.name]];
				}
				element_object[this.name].push(this.value || '');
			} else {
				element_object[this.name] = this.value || '';
			}
		});

		//add json to main object and add to page
		json_update_element_objects(element_object, data_index, type_to_load);

		//activate_custom_popup_load
		activate_custom_popup_load();

		//close popup
		jQuery('.hero_custom_close, .hero_custom_sidebar_close').trigger('click');

		jQuery('#element_list_holder').html('');

		//reload list items
		var element_count = main_object.slider.slides[global_slide_index].elements.length;

		jQuery(main_object.slider.slides[global_slide_index].elements).each(function (index, element) {
			//add element to list
			insert_element_to_list(element, index, 'append');
		});

	});

}

//enable woo loader
function enable_woo_product_loader(element_index) {

	//open sidebar
	jQuery('.hslider_add_product').off().on('click', function () {

		TweenLite.to(jQuery('.hero_custom_sidebar'), 0.5, { right: 0, ease: Power2.easeInOut });

		//add items to select
		var items = '';
		items += '<option value="">all</option>';
		jQuery(global_woo_object.categories).each(function (index, element) {
			items += '<option value="' + element.slug + '">' + element.title + '</option>';
		});
		jQuery('#hslider_woo_selector').html(items);

		//switch components
		update_select_component(jQuery('#hslider_woo_selector'));

		//load woo data
		load_woo_sidebar_data('all', 0, 0);

	});

	//remove id's
	jQuery('.hslider_remove_product_id').off().on('click', function () {
		jQuery('#product_custom_id').val('');
	});

	//on change
	jQuery('.hslider_woo_selector .hero_dropdown .hero_drop_row').off().on('click', function () {
		jQuery('#hslider_woo_selector').trigger('change');
	});
	jQuery('#hslider_woo_selector').off().on('change', function () {
		//load woo data
		load_woo_sidebar_data(jQuery(this).children('option:selected').val(), 0, 0);
	});

	//close btn
	jQuery('.hero_custom_sidebar_close').off().on('click', function () {
		TweenLite.to(jQuery('.hero_custom_sidebar'), 0.5, { right: -400, ease: Power2.easeInOut });
	});

}

//load woo sidebar data
function load_woo_sidebar_data(category, off, idx) {

	//load html
	jQuery.ajax({
		url: ajax_url,
		type: "POST",
		data: {
			'action': 'hslide_get_woo_products',
			slug: category,
			offset: off
		},
		dataType: "json"
	}).done(function (data) {
		insert_sidebar_product_html(category, data, idx);
	}).fail(function (event) {
		//page error
		//console.log(event);
	});

}

//insert_sidebar_product_html
function insert_sidebar_product_html(category, obj, id) {

	//clear html
	jQuery('.hero_custom_sidebar_products').html('');

	var val_delay = 0.1;

	jQuery(obj.products).each(function (index, element) {

		var html = '';

		html += '<div class="hero_side_item_holder woo_item_' + index + '">';
		html += '<div class="hero_side_item_img" style="background-image:url(' + element.image + ');">';
		html += '<div class="hero_side_item_id">' + element.id + '</div>';
		html += '</div>';
		html += '<div class="hero_side_item_title">' + element.title + '</div>';
		html += '<div class="hero_side_item_btn" data-product-add-id="' + element.id + '"></div>';
		html += '</div>';

		jQuery('.hero_custom_sidebar_products').append(html);

		TweenLite.to(jQuery('.woo_item_' + index), 0, { opacity: 0, ease: Power2.easeInOut });
		TweenLite.to(jQuery('.woo_item_' + index), 0.3, { opacity: 1, delay: (val_delay * index), ease: Power2.easeInOut });

	});

	var display = obj.settings[0].display;
	var total = obj.settings[0].total_products;
	var display_count = obj.settings[0].post_count_displayed;
	var offset = obj.settings[0].offset;

	var total_pagers = Math.ceil(total / display);

	jQuery('.hslide_prod_pager').html('');

	var val_delay_pager = 0.1;

	var total_viewing = (display * id) + display_count;

	//set label
	jQuery('.woo_total').html(total);
	jQuery('.woo_viewing').html(total_viewing);

	//set ul width
	var ul_pager_width = total_pagers * 30;
	jQuery('.hslide_prod_pager').width(ul_pager_width);

	if (ul_pager_width < 90) {
		jQuery('.sidebar_hide_pager').width(ul_pager_width);
	}

	//move the ul into position
	var the_id_check = parseInt(id) + 1;
	var the_check_calc = total_pagers - the_id_check;

	if (the_id_check === 1) {
		TweenLite.to(jQuery('.hslide_prod_pager'), 0.3, { opacity: 1, marginLeft: -(id * 30), delay: 0.3, ease: Strong.easeOut });
	} else if (the_check_calc > 0) {
		TweenLite.to(jQuery('.hslide_prod_pager'), 0.3, { opacity: 1, marginLeft: -(id * 30) + 30, delay: 0.3, ease: Strong.easeOut });
	} else if (the_id_check === total_pagers) {
		TweenLite.to(jQuery('.hslide_prod_pager'), 0.3, { opacity: 1, marginLeft: -(id * 30) + 60, delay: 0.3, ease: Strong.easeOut });
	}

	var the_position = parseInt(id);

	for (var i = 0; i < total_pagers; i++) {
		var pager_html = '';
		if (the_position === i) {
			pager_html += '<li class="sidebar_pager_woo_btn pager_' + i + ' pager_active_sidebar" data-idx="' + i + '" data-category="' + category + '" data-offset="' + (i * display) + '">' + (i + 1) + '</li>';
		} else {
			pager_html += '<li class="sidebar_pager_woo_btn pager_' + i + '" data-idx="' + i + '" data-category="' + category + '" data-offset="' + (i * display) + '">' + (i + 1) + '</li>';
		}

		jQuery('.hslide_prod_pager').append(pager_html);
		TweenLite.to(jQuery('.pager_' + i), 0.3, { opacity: 1, marginTop: 0, delay: (val_delay_pager * i), ease: Back.easeOut });
	}

	jQuery('.sidebar_pager_woo_btn').off().on('click', function () {

		var the_cat = jQuery(this).attr('data-category');
		var the_offset = jQuery(this).attr('data-offset');
		var idx = jQuery(this).attr('data-idx');

		load_woo_sidebar_data(the_cat, the_offset, idx);

	});

	//pager side arrows	
	jQuery('.sidebar_pager_left').off().on('click', function () {

		the_position--;

		if (the_position < 0) {
			the_position = total_pagers - 1;
		}

		var offset = (the_position) * display;

		load_woo_sidebar_data(category, offset, the_position);

	});

	jQuery('.sidebar_pager_right').off().on('click', function () {

		the_position++;

		if (the_position > (total_pagers - 1)) {
			the_position = 0;
		}

		var offset = (the_position) * display;

		load_woo_sidebar_data(category, offset, the_position);

	});

	//get window height
	var window_height = jQuery(window).height();

	jQuery('.hero_custom_sidebar_products').height((window_height - 245));

	enable_add_product_btn();

}

function enable_add_product_btn() {

	var the_id_string = '';

	jQuery('.hero_side_item_btn').off().on('click', function () {
		var current_val = jQuery('#product_custom_id').val() + ',';
		the_id_string += current_val + jQuery(this).attr('data-product-add-id');
		jQuery('#product_custom_id').val(the_id_string.replace(/^,/, ''));
		the_id_string = '';
	});

}

//data update element object
function json_update_element_objects(obj, index, type) {

	switch (type) {
		case 'text':

			//set data
			main_object.slider.slides[global_slide_index].elements[index].content = obj.element_content.replace(/\r?\n|\r/g, "<br>");
			main_object.slider.slides[global_slide_index].elements[index].width = obj.element_width;
			main_object.slider.slides[global_slide_index].elements[index].url = obj.element_url;
			main_object.slider.slides[global_slide_index].elements[index].alt = obj.element_alt;
			main_object.slider.slides[global_slide_index].elements[index].title = obj.element_title;
			main_object.slider.slides[global_slide_index].elements[index].target = obj.element_target;
			main_object.slider.slides[global_slide_index].elements[index].font[0].family = obj.element_font_family;
			main_object.slider.slides[global_slide_index].elements[index].font[0].weight = obj.element_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].font[0].size = obj.element_font_size;
			main_object.slider.slides[global_slide_index].elements[index].font[0].sizing = obj.element_font_sizing;
			main_object.slider.slides[global_slide_index].elements[index].font[0].color = obj.element_color;
			main_object.slider.slides[global_slide_index].elements[index].font[0].align = obj.element_font_align;
			main_object.slider.slides[global_slide_index].elements[index].font[0].fontStyle = obj.element_font_style;
			main_object.slider.slides[global_slide_index].elements[index].font[0].letterSpacing = obj.element_spacing;

			//remove old element
			jQuery("#element_" + index).remove();

			//insert updated element to stage
			insert_element_to_stage(type, main_object.slider.slides[global_slide_index].elements[index], index);

			break;
		case 'element':

			//set data
			main_object.slider.slides[global_slide_index].elements[index].source = obj.element_source;
			main_object.slider.slides[global_slide_index].elements[index].url = obj.element_url;
			main_object.slider.slides[global_slide_index].elements[index].alt = obj.element_alt;
			main_object.slider.slides[global_slide_index].elements[index].title = obj.element_title;
			main_object.slider.slides[global_slide_index].elements[index].target = obj.element_target;

			//remove old element
			jQuery("#element_" + index).remove();

			//insert updated element to stage
			insert_element_to_stage(type, main_object.slider.slides[global_slide_index].elements[index], index);

			break;
		case 'post':

			//set data
			main_object.slider.slides[global_slide_index].elements[index].settings[0].display = 'display_default';
			main_object.slider.slides[global_slide_index].elements[index].settings[0].category = obj.post_category;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].postNumber = obj.post_number;

			//main_object.slider.slides[global_slide_index].elements[index].url = obj.element_url;
			//main_object.slider.slides[global_slide_index].elements[index].alt = obj.element_alt;
			//main_object.slider.slides[global_slide_index].elements[index].title = obj.element_title;
			main_object.slider.slides[global_slide_index].elements[index].target = obj.element_target;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].buttonText = obj.button_text;

			main_object.slider.slides[global_slide_index].elements[index].settings[0].postLayout = obj.post_layout;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].postImageLayout = obj.post_img_layout;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].postImageSize = obj.post_img_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].postLayoutWidth = obj.post_width;

			//heading styling
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontColor = obj.heading_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontFamily = obj.heading_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontWeight = obj.heading_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontSize = obj.heading_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontSizing = obj.heading_font_sizing;

			//excerpt styling	
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontColor = obj.excerpt_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontFamily = obj.excerpt_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontWeight = obj.excerpt_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontSize = obj.excerpt_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontSizing = obj.excerpt_font_sizing;

			//button styling						
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontColor = obj.button_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontFamily = obj.button_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontWeight = obj.button_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontSize = obj.button_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontSizing = obj.button_font_sizing;

			//remove old element
			jQuery("#element_" + index).remove();

			//insert updated element to stage
			insert_element_to_stage(type, main_object.slider.slides[global_slide_index].elements[index], index);

			//reload data
			load_post_content();

			break;
		case 'video':

			//set data
			main_object.slider.slides[global_slide_index].elements[index].videoType = obj.video_type;
			main_object.slider.slides[global_slide_index].elements[index].videoId = obj.video_id;

			main_object.slider.slides[global_slide_index].elements[index].videoSettings.youtube.width = obj.youtube_width;
			main_object.slider.slides[global_slide_index].elements[index].videoSettings.youtube.height = obj.youtube_height;
			main_object.slider.slides[global_slide_index].elements[index].videoSettings.youtube.theme = obj.youtube_theme;

			main_object.slider.slides[global_slide_index].elements[index].videoSettings.vimeo.width = obj.vimeo_width;
			main_object.slider.slides[global_slide_index].elements[index].videoSettings.vimeo.height = obj.vimeo_height;
			main_object.slider.slides[global_slide_index].elements[index].videoSettings.vimeo.color = obj.vimeo_color;

			//remove old element
			jQuery("#element_" + index).remove();

			//insert updated element to stage
			insert_element_to_stage(type, main_object.slider.slides[global_slide_index].elements[index], index);

			break;
		case 'button':

			//set data
			main_object.slider.slides[global_slide_index].elements[index].theme = obj.button_theme;
			main_object.slider.slides[global_slide_index].elements[index].content = obj.button_content;

			main_object.slider.slides[global_slide_index].elements[index].url = obj.button_url;
			main_object.slider.slides[global_slide_index].elements[index].alt = obj.button_alt;
			main_object.slider.slides[global_slide_index].elements[index].title = obj.button_title;
			main_object.slider.slides[global_slide_index].elements[index].target = obj.button_target;
			main_object.slider.slides[global_slide_index].elements[index].borderType = obj.button_border

			main_object.slider.slides[global_slide_index].elements[index].font[0].family = obj.button_family;
			main_object.slider.slides[global_slide_index].elements[index].font[0].weight = obj.button_weight;
			main_object.slider.slides[global_slide_index].elements[index].font[0].size = obj.button_size;
			main_object.slider.slides[global_slide_index].elements[index].font[0].sizing = obj.button_sizing;
			main_object.slider.slides[global_slide_index].elements[index].font[0].color = obj.button_1_color;
			main_object.slider.slides[global_slide_index].elements[index].font[0].secondary = obj.button_2_color;

			main_object.slider.slides[global_slide_index].elements[index].font[0].transform = obj.button_transform;

			//remove old element
			jQuery("#element_" + index).remove();

			//insert updated element to stage
			insert_element_to_stage(type, main_object.slider.slides[global_slide_index].elements[index], index);

			break;
		case 'woo':

			//set data
			main_object.slider.slides[global_slide_index].elements[index].settings[0].display = obj.product_display;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].category = obj.product_category;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].productNumber = obj.product_number;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].productCustomId = obj.product_custom_id;

			main_object.slider.slides[global_slide_index].elements[index].settings[0].productLayout = obj.product_layout;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].productImageLayout = obj.product_img_layout;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].productImageSize = obj.product_img_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].productLayoutWidth = obj.product_width;

			main_object.slider.slides[global_slide_index].elements[index].settings[0].productImagePosition = obj.product_background_position;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].productImageRepeat = obj.product_background_repeat;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].productImageSizing = obj.product_background_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].buttonText = obj.product_button_text;

			//heading styling
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontColor = obj.heading_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontFamily = obj.heading_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontWeight = obj.heading_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontSize = obj.heading_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontSizing = obj.heading_font_sizing;

			//price styling
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].price[0].fontColor = obj.price_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].price[0].fontFamily = obj.price_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].price[0].fontWeight = obj.price_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].price[0].fontSize = obj.price_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].price[0].fontSizing = obj.price_font_sizing;

			//sale price styling
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].saleprice[0].fontColor = obj.saleprice_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].saleprice[0].fontFamily = obj.saleprice_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].saleprice[0].fontWeight = obj.saleprice_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].saleprice[0].fontSize = obj.saleprice_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].saleprice[0].fontSizing = obj.saleprice_font_sizing;

			//excerpt styling	
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontColor = obj.excerpt_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontFamily = obj.excerpt_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontWeight = obj.excerpt_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].excerpt[0].fontSize = obj.excerpt_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontSizing = obj.excerpt_font_sizing;

			//button styling						
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontColor = obj.button_color;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontFamily = obj.button_font_family;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontWeight = obj.button_font_weight;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].button[0].fontSize = obj.button_font_size;
			main_object.slider.slides[global_slide_index].elements[index].settings[0].font[0].heading[0].fontSizing = obj.button_font_sizing;

			//remove old element
			jQuery("#element_" + index).remove();

			//insert updated element to stage
			insert_element_to_stage(type, main_object.slider.slides[global_slide_index].elements[index], index);

			//reload data
			load_woo_content();

			break;
	}

	//add google fonts
	add_google_fonts(main_object);

	flag_save_required('hplugin_persist_object_data');

}

//set add button element data
function add_element_data(type_to_load, action) {

	//set add button data
	jQuery('.element_insert_button').attr('data-element', type_to_load);
	jQuery('.element_insert_button').attr('data-action', action);
	jQuery('.element_insert_button').html('Add element to slide');

	var serialized_data;

	//set click event
	jQuery('.element_insert_button').on('click', function () {

		var data_element = jQuery('.element_insert_button').attr('data-element');

		switch (data_element) {
			case 'text':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'element':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'post':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'video':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'button':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
			case 'woo':
				serialized_data = jQuery('#element_form').serializeArray();
				break;
		}

		//create json
		var element_object = {};

		jQuery.each(serialized_data, function () {
			if (element_object[this.name]) {
				if (!element_object[this.name].push) {
					element_object[this.name] = [element_object[this.name]];
				}
				element_object[this.name].push(this.value || '');
			} else {
				element_object[this.name] = this.value || '';
			}
		});

		//add json to main object and add to page
		json_element_objects(type_to_load, element_object);

		//load post content
		load_post_content();
		load_woo_content();

	});

	//activate_custom_popup_slides
	activate_custom_popup_load();

}

//data objects for each element
function json_element_objects(type_to_add, element_object) {

	var json;
	var parse_string;

	var element_count = main_object.slider.slides[global_slide_index].elements.length;

	switch (type_to_add) {

		case 'text':

			json = '{ "elementId":' + element_count + ', "order":' + element_count + ', "type":"text", "content":"' + element_object.element_content.replace(/\"/g, '&quot;') + '", "x":100, "y":100, "offset_x":0, "offset_y":0, "url":"' + element_object.element_url + '", "alt":"' + element_object.element_alt + '", "title":"' + element_object.element_title + '", "target":"' + element_object.element_target + '", "width":"' + element_object.element_width + '", "font":[ { "family":"' + element_object.element_font_family + '", "weight":"' + element_object.element_font_weight + '", "transform":"uppercase", "size":"' + element_object.element_font_size + '", "sizing":"' + element_object.element_font_sizing + '", "color":"' + element_object.element_color + '", "align":"' + element_object.element_font_align + '", "lineHeight":"20", "fontStyle":"' + element_object.element_font_style + '", "letterSpacing":"' + element_object.element_spacing + '" } ], "animation":[ { "animationType":"", "animationStrength":"Strong", "animationEasing":"easeInOut", "direction":"left_right", "distance":"200", "delay":1, "duration":2, "rotation":0, "startOpacity":0, "endOpacity":1 } ] }';

			//var test = json.replace(/\r?\n|\r/g, "<br>");

			parse_string = JSON.parse(json.replace(/\r?\n|\r/g, "<br>"));

			break;

		case 'element':

			json = '{ "elementId":' + element_count + ', "order":' + element_count + ', "type":"element", "source":"' + element_object.element_source + '", "x":100, "y":100, "offset_x":0, "offset_y":0, "url":"' + element_object.element_url + '", "alt":"' + element_object.element_alt + '", "title":"' + element_object.element_title + '", "target":"' + element_object.element_target + '", "width":null, "animation":[ { "animationType":"", "animationStrength":"Strong", "animationEasing":"easeInOut", "direction":"left_right", "distance":"200", "delay":1, "duration":2, "rotation":0, "startOpacity":0, "endOpacity":1 } ] }';

			parse_string = JSON.parse(json);

			break;

		case 'post':

			json = '{ "elementId":' + element_count + ', "order":' + element_count + ', "type":"post", "x":100, "y":100, "offset_x":0, "offset_y":0, "url":"' + element_object.element_url + '", "alt":"' + element_object.element_alt + '", "title":"' + element_object.element_title + '", "target":"' + element_object.element_target + '", "width":null, "settings":[ {"display":"' + element_object.post_display + '", "buttonText":"' + element_object.button_text + '", "category":"' + element_object.post_category + '", "postNumber":"' + element_object.post_number + '", "theme":"full_crisp", "primaryColor":"#FFFFFF", "secondaryColor":"aqua", "postLayout":"' + element_object.post_layout + '", "postImageLayout":"' + element_object.post_img_layout + '", "postImageSize":"' + element_object.post_img_size + '", "postLayoutWidth":"' + element_object.post_width + '", "font":[ {"heading":[ {"fontFamily":"' + element_object.heading_font_family + '", "fontColor":"' + element_object.heading_color + '", "fontSize":"' + element_object.heading_font_size + '", "fontWeight":"' + element_object.heading_font_weight + '", "fontSizing":"' + element_object.heading_font_sizing + '" } ], "excerpt":[ {"fontFamily":"' + element_object.excerpt_font_family + '",	"fontColor":"' + element_object.excerpt_color + '", "fontSize":"' + element_object.excerpt_font_size + '", "fontWeight":"' + element_object.excerpt_font_weight + '", "fontSizing":"' + element_object.excerpt_font_sizing + '" } ], "button":[ {"fontFamily":"' + element_object.button_font_family + '", "fontColor":"' + element_object.button_color + '", "fontSize":"' + element_object.button_font_size + '", "fontWeight":"' + element_object.button_font_weight + '", "fontSizing":"' + element_object.button_font_sizing + '" } ] } ], "target":"_self", "visible":4 } ], "animation":[ { "animationType":"", "animationStrength":"Strong", "animationEasing":"easeInOut", "direction":"left_right", "distance":"200", "delay":1, "duration":2, "rotation":0, "startOpacity":0, "endOpacity":1 } ] }';

			parse_string = JSON.parse(json);

			break;

		case 'video':

			json = '{ "elementId":' + element_count + ', "order":' + element_count + ', "type":"video", "videoType":"' + element_object.video_type + '", "videoId":"' + element_object.video_id + '", "x":100, "y":100, "offset_x":0, "offset_y":0, "width":300, "videoSettings":{"youtube":{ "width":"' + element_object.youtube_width + '", "height":"' + element_object.youtube_height + '", "theme":"' + element_object.youtube_theme + '" }, "vimeo":{ "width":"' + element_object.vimeo_width + '", "height":"' + element_object.vimeo_height + '", "color":"' + element_object.vimeo_color + '" }}, "animation":[ { "animationType":"", "animationStrength":"Strong", "animationEasing":"easeInOut", "direction":"left_right", "distance":"200", "delay":1, "duration":2, "rotation":0, "startOpacity":0, "endOpacity":1 } ] }';

			parse_string = JSON.parse(json);

			break;

		case 'button':
			json = '{ "elementId":' + element_count + ', "order":' + element_count + ', "type":"button", "content":"' + element_object.button_content + '", "x":100, "y":100, "offset_x":0, "offset_y":0, "url":"' + element_object.button_url + '", "alt":"' + element_object.button_alt + '", "title":"' + element_object.button_title + '", "target":"' + element_object.button_target + '", "theme":"' + element_object.button_theme + '", "borderType":"' + element_object.button_border + '", "font":[ { "family":"' + element_object.button_family + '", "weight":"' + element_object.button_weight + '", "transform":"none", "size":"' + element_object.button_size + '", "sizing":"' + element_object.button_sizing + '", "color":"' + element_object.button_1_color + '", "secondary":"' + element_object.button_2_color + '" } ], "animation":[ { "animationType":"", "animationStrength":"Strong", "animationEasing":"easeInOut", "direction":"left_right", "distance":"200", "delay":1, "duration":2, "rotation":0, "startOpacity":0, "endOpacity":1 } ] }';

			parse_string = JSON.parse(json);

			break;

		case 'woo':

			json = '{ "elementId":' + element_count + ', "order":' + element_count + ', "type":"woo", "x":100, "y":100, "offset_x":0, "offset_y":0, "width":null, "settings":[ {"display":"' + element_object.product_display + '", "category":"' + element_object.product_category + '", "productNumber":"' + element_object.product_number + '", "productCustomId":"' + element_object.product_custom_id + '", "theme":"full_crisp", "primaryColor":"#FFFFFF", "secondaryColor":"aqua", "productLayout":"' + element_object.product_layout + '", "productImageLayout":"' + element_object.product_img_layout + '", "productImageSize":"' + element_object.product_img_size + '", "productImagePosition":"' + element_object.product_background_position + '", "productImageRepeat":"' + element_object.product_background_repeat + '", "productImageSizing":"' + element_object.product_background_size + '", "buttonText":"' + element_object.product_button_text + '", "productLayoutWidth":"' + element_object.product_width + '", "font":[ {"heading":[ {"fontFamily":"' + element_object.heading_font_family + '", "fontColor":"' + element_object.heading_color + '", "fontSize":"' + element_object.heading_font_size + '", "fontWeight":"' + element_object.heading_font_weight + '", "fontSizing":"' + element_object.heading_font_sizing + '" } ], "price":[ {"fontFamily":"' + element_object.price_font_family + '",	"fontColor":"' + element_object.price_color + '", "fontSize":"' + element_object.price_font_size + '", "fontWeight":"' + element_object.price_font_weight + '", "fontSizing":"' + element_object.price_font_sizing + '" } ], "saleprice":[ {"fontFamily":"' + element_object.saleprice_font_family + '",	"fontColor":"' + element_object.saleprice_color + '", "fontSize":"' + element_object.saleprice_font_size + '", "fontWeight":"' + element_object.saleprice_font_weight + '", "fontSizing":"' + element_object.saleprice_font_sizing + '" } ], "excerpt":[ {"fontFamily":"' + element_object.excerpt_font_family + '",	"fontColor":"' + element_object.excerpt_color + '", "fontSize":"' + element_object.excerpt_font_size + '", "fontWeight":"' + element_object.excerpt_font_weight + '", "fontSizing":"' + element_object.excerpt_font_sizing + '" } ], "button":[ {"fontFamily":"' + element_object.button_font_family + '", "fontColor":"' + element_object.button_color + '", "fontSize":"' + element_object.button_font_size + '", "fontWeight":"' + element_object.button_font_weight + '", "fontSizing":"' + element_object.button_font_sizing + '" } ] } ], "target":"_self", "visible":4 } ], "animation":[ { "animationType":"", "animationStrength":"Strong", "animationEasing":"easeInOut", "direction":"left_right", "distance":"200", "delay":1, "duration":2, "rotation":0, "startOpacity":0, "endOpacity":1 } ] }';

			parse_string = JSON.parse(json);

			break;

	}

	main_object.slider.slides[global_slide_index].elements.push(parse_string);

	//add new element to stage
	insert_element_to_stage(type_to_add, main_object.slider.slides[global_slide_index].elements[element_count], element_count);

	//add element to list
	insert_element_to_list(main_object.slider.slides[global_slide_index].elements[element_count], element_count, 'prepend');

	//close popup
	jQuery('.hero_custom_close, .hero_custom_sidebar_close').trigger('click');

	//activate_custom_popup_load
	activate_custom_popup_load();

	//add google fonts
	add_google_fonts(main_object);

	//flag save
	flag_save_required('hplugin_persist_object_data');

	set_order();

	check_video();

}

//load slide elements
function load_slide_elements(main_object) {

	var element_count = main_object.slider.slides[global_slide_index].elements.length;

	if (element_count !== 0) {
		//sort the elements according to the order
		main_object.slider.slides[global_slide_index].elements.sort(sort_items_reverse);
		//looop through all the elements
		jQuery(main_object.slider.slides[global_slide_index].elements).each(function (index, element) {
			switch (element.type) {
				case 'text':
					insert_element_to_stage(element.type, element, index);
					insert_element_to_list(element, index, 'append');
					break;
				case 'element':
					insert_element_to_stage(element.type, element, index);
					insert_element_to_list(element, index, 'append');
					break;
				case 'post':
					insert_element_to_stage(element.type, element, index);
					insert_element_to_list(element, index, 'append');
					break;
				case 'video':
					insert_element_to_stage(element.type, element, index);
					insert_element_to_list(element, index, 'append');
					break;
				case 'button':
					insert_element_to_stage(element.type, element, index);
					insert_element_to_list(element, index, 'append');
					break;
				case 'woo':
					insert_element_to_stage(element.type, element, index);
					insert_element_to_list(element, index, 'append');
					break;
			}
		});
		set_order();
		load_post_content();
		load_woo_content();
		//check_video
		check_video();
	} else {
		jQuery('#element_list_holder').html('<div class="nothing_found">No elements have been added.</div>');
	}

	//activate_custom_popup_slides
	activate_custom_popup_load();

}

//load post content
function load_post_content() {

	jQuery('.hslider_slide_holder').find('[data-type="post"]').each(function (index, element) {

		//variables
		var category = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].category;
		var number = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].postNumber;
		var size = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].postImageSize;
		var obj = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings;
		var index = jQuery(this).attr('data-index');

		//load html
		jQuery.ajax({
			url: ajax_url,
			type: "POST",
			data: {
				'action': 'hslide_get_post_content',
				index: 'index',
				category: category,
				number: number,
				size: size
			},
			dataType: "json"
		}).done(function (data) {
			insert_post_html(data, obj, index);
		}).fail(function () {
			//page error
		});

	});

}

//load post content
function load_woo_content() {

	jQuery('.hslider_slide_holder').find('[data-type="woo"]').each(function (index, element) {

		//variables
		var display = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].display;
		var category = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].category;
		var number = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].productNumber;
		var size = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].productImageSize;
		var obj = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings;
		var index = jQuery(this).attr('data-index');
		var custom_id = main_object.slider.slides[global_slide_index].elements[jQuery(this).attr('data-index')].settings[0].productCustomId;

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
			insert_woo_html(data, obj, index);
		}).fail(function (event) {
			//page error
			//console.log(event);
		});

	});

}

//return video html
function insert_video_html(index) {

	//variables
	var html = '';
	var type = main_object.slider.slides[global_slide_index].elements[index].videoType;

	var w, h, c, v;

	switch (type) {
		case 'youtube':
			//variables
			w = main_object.slider.slides[global_slide_index].elements[index].videoSettings.youtube.width;
			h = main_object.slider.slides[global_slide_index].elements[index].videoSettings.youtube.height;
			c = main_object.slider.slides[global_slide_index].elements[index].videoSettings.youtube.theme;
			v = main_object.slider.slides[global_slide_index].elements[index].videoId;
			html += '<iframe type="text/html" id="hslider_yt_' + index + '" theme="light" src="http://www.youtube.com/embed/' + v + '" width="' + w + '" height="' + h + '" color="CC0000" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			break;
		case 'vimeo':
			//variables
			w = main_object.slider.slides[global_slide_index].elements[index].videoSettings.vimeo.width;
			h = main_object.slider.slides[global_slide_index].elements[index].videoSettings.vimeo.height;
			c = main_object.slider.slides[global_slide_index].elements[index].videoSettings.vimeo.color.replace('#', '');
			v = main_object.slider.slides[global_slide_index].elements[index].videoId;
			html += '<iframe src="//player.vimeo.com/video/' + v + '?color=' + c + '" width="' + w + '" height="' + h + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
			break;
	}

	return html;

}

//add post html
function insert_post_html(post_obj, element_obj, index) {

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
			post_html += '<div class="post_item_button">';
			post_html += element_obj[0].buttonText;
			post_html += '</div>';
			post_html += '</div>';
		});

		post_html += '</div>';

		jQuery('#element_' + index + ' .hslider_post_back_holder').html(post_html);

		if (element_obj[0].postLayout === 'side') {
			var post_length = post_obj.length;
			var new_width = element_obj[0].postLayoutWidth / post_length;
			jQuery('#element_' + index + ' .hslider_post_back_holder .post_holder_wrap .hslider_side_layout').css({
				'width': new_width + 'px'
			});
		}
		if (element_obj[0].postLayout === 'side_image') {
			var post_length = post_obj.length;
			var new_width = element_obj[0].postLayoutWidth / post_length;
			jQuery('#element_' + index + ' .hslider_post_back_holder .post_holder_wrap .hslider_side_image_layout').css({
				'width': new_width + 'px'
			});
		}
		if (element_obj[0].postLayoutWidth !== "") {
			jQuery('#element_' + index + ' .hslider_post_back_holder .post_holder_wrap').css({
				'width': element_obj[0].postLayoutWidth + 'px'
			});
		} else {
			jQuery('#element_' + index + ' .hslider_post_back_holder .post_holder_wrap').css({
				'width': '400px'
			});
		}
		jQuery('#element_' + index + ' .post_item_img').css({
			'width': element_obj[0].postImageSize + 'px',
			'height': element_obj[0].postImageSize + 'px'
		});
		jQuery('#element_' + index + ' .post_item_title').css({
			'color': element_obj[0].font[0].heading[0].fontColor,
			'font-family': element_obj[0].font[0].heading[0].fontFamily,
			'font-weight': element_obj[0].font[0].heading[0].fontWeight,
			'font-size': element_obj[0].font[0].heading[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
		});
		jQuery('#element_' + index + ' .post_item_content').css({
			'color': element_obj[0].font[0].excerpt[0].fontColor,
			'font-family': element_obj[0].font[0].excerpt[0].fontFamily,
			'font-weight': element_obj[0].font[0].excerpt[0].fontWeight,
			'font-size': element_obj[0].font[0].excerpt[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
		});
		jQuery('#element_' + index + ' .post_item_button').css({
			'color': element_obj[0].font[0].button[0].fontColor,
			'font-family': element_obj[0].font[0].button[0].fontFamily,
			'font-weight': element_obj[0].font[0].button[0].fontWeight,
			'font-size': element_obj[0].font[0].button[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
		});

		set_drag_dimentions();

	} else {

	}

}

//add product html
function insert_woo_html(woo_obj, element_obj, index) {

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
			} else {
				post_html += '<div class="product_item_price">';
				post_html += element.symbol + ' ' + element.price;
				post_html += '</div>';
			}
			post_html += '<div class="product_item_content">';
			post_html += element.content;
			post_html += '</div>';
			post_html += '<div class="product_item_button">';
			post_html += element_obj[0].buttonText;
			post_html += '</div>';
			post_html += '</div>';
		});

		post_html += '</div>';

		jQuery('#element_' + index + ' .hslider_product_back_holder').html(post_html);

		if (element_obj[0].productLayout === 'side') {
			var post_length = woo_obj.length;
			var new_width = element_obj[0].productLayoutWidth / post_length;
			jQuery('#element_' + index + ' .hslider_product_back_holder .product_holder_wrap .hslider_side_layout').css({
				'width': new_width + 'px'
			});
		}
		if (element_obj[0].productLayout === 'side_image') {
			var post_length = woo_obj.length;
			var new_width = element_obj[0].productLayoutWidth / post_length;
			jQuery('#element_' + index + ' .hslider_product_back_holder .product_holder_wrap .hslider_side_image_layout').css({
				'width': new_width + 'px'
			});
		}
		if (element_obj[0].productLayoutWidth !== "") {
			jQuery('#element_' + index + ' .hslider_product_back_holder .product_holder_wrap').css({
				'width': element_obj[0].productLayoutWidth + 'px'
			});
		} else {
			jQuery('#element_' + index + ' .hslider_product_back_holder .product_holder_wrap').css({
				'width': '400px'
			});
		}
		jQuery('#element_' + index + ' .product_item_img').css({
			'width': element_obj[0].productImageSize + 'px',
			'height': element_obj[0].productImageSize + 'px',
			'background-position': element_obj[0].productImagePosition,
			'background-repeat': element_obj[0].productImageRepeat,
			'background-size': element_obj[0].productImageSizing
		});
		jQuery('#element_' + index + ' .product_item_title').css({
			'color': element_obj[0].font[0].heading[0].fontColor,
			'font-family': element_obj[0].font[0].heading[0].fontFamily,
			'font-weight': element_obj[0].font[0].heading[0].fontWeight,
			'font-size': element_obj[0].font[0].heading[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
		});
		jQuery('#element_' + index + ' .product_item_price').css({
			'color': element_obj[0].font[0].price[0].fontColor,
			'font-family': element_obj[0].font[0].price[0].fontFamily,
			'font-weight': element_obj[0].font[0].price[0].fontWeight,
			'font-size': element_obj[0].font[0].price[0].fontSize + element_obj[0].font[0].price[0].fontSizing
		});
		jQuery('#element_' + index + ' .product_item_price_sale').css({
			'color': element_obj[0].font[0].saleprice[0].fontColor,
			'font-family': element_obj[0].font[0].saleprice[0].fontFamily,
			'font-weight': element_obj[0].font[0].saleprice[0].fontWeight,
			'font-size': element_obj[0].font[0].saleprice[0].fontSize + element_obj[0].font[0].saleprice[0].fontSizing
		});
		jQuery('#element_' + index + ' .product_item_content').css({
			'color': element_obj[0].font[0].excerpt[0].fontColor,
			'font-family': element_obj[0].font[0].excerpt[0].fontFamily,
			'font-weight': element_obj[0].font[0].excerpt[0].fontWeight,
			'font-size': element_obj[0].font[0].excerpt[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
		});
		jQuery('#element_' + index + ' .product_item_button').css({
			'color': element_obj[0].font[0].button[0].fontColor,
			'font-family': element_obj[0].font[0].button[0].fontFamily,
			'font-weight': element_obj[0].font[0].button[0].fontWeight,
			'font-size': element_obj[0].font[0].button[0].fontSize + element_obj[0].font[0].heading[0].fontSizing
		});

		set_drag_dimentions();

	} else {

	}

}

//add elements to stage
function insert_element_to_stage(type, element_obj, index) {

	var element_html = '';

	jQuery('.nothing_found').remove();

	//add element
	switch (element_obj.type) {
		case 'text':
			element_html += '<div class="hslider_backend_element element_draggable" data-order="' + index + '" data-index="' + index + '" id="element_' + index + '">';
			element_html += element_obj.content;
			element_html += '<div class="hslider_element_tools">';
			element_html += '<div class="hlsider_inner_tools">';
			element_html += '<div class="tools_icon tools_element_edit data_popup_launch" data-tooltip="Edit text element" data-title="Text Element" data-load="' + element_obj.type + '" data-action="update" data-index="' + index + '"></div>';
			element_html += '<div class="tools_icon tools_element_delete" data-tooltip="Delete element" onclick="delete_element(' + index + ', \'' + element_obj.type + '\');"></div>';
			element_html += '<div class="tools_icon tools_element_move" data-tooltip="Move element"></div>';
			element_html += '</div>';
			element_html += '</div>';
			element_html += '</div>';
			break;
		case 'element':
			element_html += '<div class="hslider_backend_element element_draggable" data-order="' + index + '" data-index="' + index + '" id="element_' + index + '">';
			element_html += '<img id="element_img_' + index + '" src="' + element_obj.source + '">';
			element_html += '<div class="hslider_element_tools">';
			element_html += '<div class="hlsider_inner_tools">';
			element_html += '<div class="tools_icon tools_element_edit data_popup_launch" data-tooltip="Edit image element" data-title="Element" data-load="' + element_obj.type + '" data-action="update" data-index="' + index + '"></div>';
			element_html += '<div class="tools_icon tools_element_delete" data-tooltip="Delete element" onclick="delete_element(' + index + ', \'' + element_obj.type + '\');"></div>';
			element_html += '<div class="tools_icon tools_element_move" data-tooltip="Move element"></div>';
			element_html += '</div>';
			element_html += '</div>';
			element_html += '</div>';
			break;
		case 'post':
			element_html += '<div class="hslider_backend_element element_draggable" data-type="' + element_obj.type + '" data-order="' + index + '" data-index="' + index + '" id="element_' + index + '">';
			element_html += '<div class="hslider_post_back_holder"></div>';
			element_html += '<div class="hslider_element_tools">';
			element_html += '<div class="hlsider_inner_tools">';
			element_html += '<div class="tools_icon tools_element_edit data_popup_launch" data-tooltip="Edit post element" data-title="Posts" data-load="' + element_obj.type + '" data-action="update" data-index="' + index + '"></div>';
			element_html += '<div class="tools_icon tools_element_delete" data-tooltip="Delete element" onclick="delete_element(' + index + ', \'' + element_obj.type + '\');"></div>';
			element_html += '<div class="tools_icon tools_element_move" data-tooltip="Move element"></div>';
			element_html += '</div>';
			element_html += '</div>';
			element_html += '</div>';
			break;
		case 'video':
			element_html += '<div class="hslider_backend_element element_draggable" data-order="' + index + '" data-index="' + index + '" id="element_' + index + '">';
			element_html += '<div class="hslider_video_holder">' + insert_video_html(index) + '</div>';
			element_html += '<div class="hslider_element_tools">';
			element_html += '<div class="hlsider_inner_tools">';
			element_html += '<div class="tools_icon tools_element_edit data_popup_launch" data-tooltip="Edit video element" data-title="Video" data-load="' + element_obj.type + '" data-action="update" data-index="' + index + '"></div>';
			element_html += '<div class="tools_icon tools_element_delete" data-tooltip="Delete element" onclick="delete_element(' + index + ', \'' + element_obj.type + '\');"></div>';
			element_html += '<div class="tools_icon tools_element_move" data-tooltip="Move element"></div>';
			element_html += '</div>';
			element_html += '</div>';
			element_html += '</div>';
			break;
		case 'button':
			element_html += '<div class="hslider_backend_element element_draggable" data-order="' + index + '" data-index="' + index + '" id="element_' + index + '">';
			element_html += '<div class="hslider_button_holder" id="stage_button_' + index + '">';
			element_html += hslider_button_html(element_obj.content, element_obj.theme, element_obj, 'stage', index);
			element_html += '<style type="text/css" id="example_styles">' + hslider_button_css(element_obj.theme, element_obj, 'stage', index) + '</style>';
			element_html += '</div>';
			element_html += '<div class="hslider_element_tools">';
			element_html += '<div class="hlsider_inner_tools">';
			element_html += '<div class="tools_icon tools_element_edit data_popup_launch" data-tooltip="Edit button element" data-title="Button Element" data-load="' + element_obj.type + '" data-action="update" data-index="' + index + '"></div>';
			element_html += '<div class="tools_icon tools_element_delete" data-tooltip="Delete element" onclick="delete_element(' + index + ', \'' + element_obj.type + '\');"></div>';
			element_html += '<div class="tools_icon tools_element_move" data-tooltip="Move element"></div>';
			element_html += '</div>';
			element_html += '</div>';
			element_html += '</div>';
			break;
		case 'woo':
			element_html += '<div class="hslider_backend_element element_draggable" data-type="' + element_obj.type + '" data-order="' + index + '" data-index="' + index + '" id="element_' + index + '">';
			element_html += '<div class="hslider_product_back_holder"></div>';
			element_html += '<div class="hslider_element_tools">';
			element_html += '<div class="hlsider_inner_tools">';
			element_html += '<div class="tools_icon tools_element_edit data_popup_launch" data-tooltip="Edit woo element" data-title="Posts" data-load="' + element_obj.type + '" data-action="update" data-index="' + index + '"></div>';
			element_html += '<div class="tools_icon tools_element_delete" data-tooltip="Delete element" onclick="delete_element(' + index + ', \'' + element_obj.type + '\');"></div>';
			element_html += '<div class="tools_icon tools_element_move" data-tooltip="Move element"></div>';
			element_html += '</div>';
			element_html += '</div>';
			element_html += '</div>';
			break;
	}

	jQuery('.hslider_slide_holder').append(element_html);

	//add element style
	switch (element_obj.type) {
		case 'text':
			jQuery('#element_' + index).css({
				'color': element_obj.font[0].color,
				'font-family': element_obj.font[0].family,
				'font-weight': element_obj.font[0].weight,
				'font-size': element_obj.font[0].size + element_obj.font[0].sizing,
				'text-align': element_obj.font[0].align,
				'font-style': element_obj.font[0].fontStyle,
				'letter-spacing': element_obj.font[0].letterSpacing,
				'left': element_obj.x + 'px',
				'top': element_obj.y + 'px',
				'z-index': element_obj.order + '!important',
				'line-height': (parseInt(element_obj.font[0].size) + 7) + element_obj.font[0].sizing,
				'width': element_obj.width + 'px'
			});
			break;
		case 'element':
			jQuery('#element_' + index).css({
				'left': element_obj.x + 'px',
				'top': element_obj.y + 'px',
				'z-index': element_obj.order
			});
			//for images check that it has loaded then enable the drag function
			jQuery("#element_img_" + index).on('load', function () {
				set_drag_dimentions();
			}).attr('src', element_obj.source);
			break;
		case 'post':
			jQuery('#element_' + index).css({
				'left': element_obj.x + 'px',
				'top': element_obj.y + 'px',
				'z-index': element_obj.order
			});
			break;
		case 'video':
			jQuery('#element_' + index).css({
				'left': element_obj.x + 'px',
				'top': element_obj.y + 'px',
				'z-index': element_obj.order
			});
			break;
		case 'button':
			jQuery('#element_' + index).css({
				'left': element_obj.x + 'px',
				'top': element_obj.y + 'px',
				'z-index': element_obj.order
			});
			break;
		case 'woo':
			jQuery('#element_' + index).css({
				'left': element_obj.x + 'px',
				'top': element_obj.y + 'px',
				'z-index': element_obj.order
			});
			break;
	}

	//set draggable area width and height
	set_drag_dimentions();

	//enable draggable elements
	enable_element_drag();

}

//set draggable dimentions
function set_drag_dimentions() {

	//set tool div height
	jQuery('.hslider_element_tools').each(function (index, element) {
		jQuery(this).height(jQuery(this).parent('.element_draggable').height());
		jQuery(this).width('100%');
	});

}


// get element edit button
function get_element_edit_button(element_obj, index) {

	element_html='<div class="tools_icon tools_element_edit data_popup_launch element_edit_btn" data-tooltip=';

	switch (element_obj.type) {
		
		case 'text':
			element_html += 'data-tooltip="Edit text element" data-title="Text Element"';
			break;
		case 'element':
			element_html += 'data-tooltip="Edit image element" data-title="Element"';
			break;
		case 'post':
			element_html += 'data-tooltip="Edit post element" data-title="Posts';
			break;
		case 'video':
			element_html += 'data-tooltip="Edit video element" data-title="Video"';
			break;
		case 'button':
			element_html += 'data-tooltip="Edit button element" data-title="Button Element"';
			break;
		case 'woo':
			element_html += 'data-tooltip="Edit woo element" data-title="Posts"';
			break;
	}

	element_html+=' data-load="' + element_obj.type + '" data-action="update" data-index="' + index + '"></div>';

	return element_html;
}


//add elements to list
function insert_element_to_list(element, index, append_type) {

	//variables
	var element_list_html = '';

	//html setup
	element_list_html += '<div class="elememt_list_item" data-toggle="closed" id="element_list_' + index + '" data-position="' + index + '">';

	//top section: start

	element_list_html += '<div class="element_identify">';
	element_list_html += '<img src="' + core_view_path + 'assets/images/admin/_icons_slide/' + element.type + '.png">';
	element_list_html += '</div>';
	element_list_html += '<div class="element_name">';
	element_list_html += '<div class="element_order_no">';
	element_list_html += '';
	element_list_html += '</div>';
	switch (element.type) {
		case 'text':
			element_list_html += '<span>' + element.content + '</span>';
			break;
		case 'element':
			element_list_html += '<img class="hslider_list_element_img" src="' + element.source + '">';
			break;
		case 'post':
			element_list_html += '<span>Category ID: ' + element.settings[0].category + '</span>';
			break;
		case 'button':
			element_list_html += '<span>' + element.content + '</span>';
			break;
		case 'video':
			element_list_html += '<span>' + element.videoType + ' - (' + element.videoId + ')</span>';
			break;
		case 'woo':
			element_list_html += '<span>WooCommerce</span>';
			break;
	}
	element_list_html += '</div>';
	element_list_html += '<div class="element_edit">';
	element_list_html += '<div class="hero_edits rounded_20">';
	element_list_html += get_element_edit_button(element, index);
	element_list_html += '<div class="hero_edit_item element_edit_btn" data-tooltip="Edit slide element" style="background-image:url(' + core_view_path + 'assets/images/admin/edit_icon.png)"></div>';
	element_list_html += '<div class="hero_edit_item" data-tooltip="Delete slide element" onclick="delete_element(' + index + ', \'' + element.type + '\');" style="background-image:url(' + core_view_path + 'assets/images/admin/delete_icon.png)"></div>';
	element_list_html += '<div class="hero_edit_item hero_item_drag" data-tooltip="Set the order of the element" style="background-image:url(' + core_view_path + 'assets/images/admin/drag_icon.png)"></div>';
	element_list_html += '</div>';
	element_list_html += '</div>';
	element_list_html += '<div class="element_timeline">';
	element_list_html += '<div class="element_time"><span class="element_time_label hero_white">Animation</span></div>';
	element_list_html += '<div class="element_time_delay"><span class="hero_white">Delay</span></div>';
	element_list_html += '<div class="element_time_idle"><span class="hero_white">Slide idle duration (' + main_object.slider.slides[global_slide_index].slideIdle + ' sec)</span></div>';
	element_list_html += '</div>';

	//top section: end

	//settings: start

	element_list_html += get_html_chunk('list_item_settings', index);

	//settings: end

	element_list_html += '</div>';

	//append the list items
	if (append_type === 'append') {
		jQuery('#element_list_holder').append(element_list_html);
	} else {
		jQuery('#element_list_holder').prepend(element_list_html);
	}

	enable_accordion();
	enable_list_item_data(element, index);
	enable_list_item_data_update(element, index);

	//disable settings if parallax
	if (main_object.slider.slides[global_slide_index].animationType === 'lax') {
		jQuery('#element_list_' + index + ' .hslider_animation_toggle').append('<div class="hslider_animation_toggle_inner">Parallax slide transition active, settings disabled.</div>');
		jQuery('#element_list_' + index + ' .switch_for_parallax').prop('disabled', false).removeClass('hslider_disable_input');
		jQuery('#element_list_' + index + ' .switch_for_parallax2').prop('disabled', true).addClass('hslider_disable_input');
		jQuery('.parallax_heading').html('Parallax offset');
		jQuery('.parallax_sub_heading').html('Offset (Left/Right)');
		jQuery('#element_list_' + index + ' .hslider_offset_toggle').show();
	} else {
		jQuery('.parallax_heading').html('Starting position');
		jQuery('.parallax_sub_heading').html('Start position: Horizontal');
		if (element.animation[0].direction !== 'custom') {
			jQuery('#element_list_' + index + ' .hslider_offset_toggle').hide();
			jQuery('#element_list_' + index + ' .switch_for_parallax').prop('disabled', true).addClass('hslider_disable_input');
			jQuery('#element_list_' + index + ' .switch_for_parallax2').prop('disabled', true).addClass('hslider_disable_input');
		} else {
			jQuery('#element_list_' + index + ' .hslider_offset_toggle').show();
			jQuery('#element_list_' + index + ' .switch_for_parallax').prop('disabled', false).removeClass('hslider_disable_input');
			jQuery('#element_list_' + index + ' .switch_for_parallax2').prop('disabled', false).removeClass('hslider_disable_input');
		}
	}

	//set_order();

}

//enable the sorting for the elements on the stage
function enable_sorting() {

	jQuery("#element_list_holder").sortable({
		placeholder: "placeholder",
		stop: function () {
			set_order();
			flag_save_required('hplugin_persist_object_data');
		},
		handle: '.hero_item_drag'
	});

}

//set order
function set_order() {

	//set positions of new order
	var element_length = jQuery('.elememt_list_item').length;
	jQuery('.elememt_list_item').each(function (index, element) {
		var the_index = jQuery(this).data('position');
		main_object.slider.slides[global_slide_index].elements[the_index].order = element_length;
		jQuery('.hslider_slide_holder').find('[data-index="' + the_index + '"]').css({ 'z-index': element_length });
		jQuery(this).children('.element_name').children('.element_order_no').html('z-index: ' + element_length);
		element_length--;
	});
	//flag_save_required('hplugin_persist_object_data');
}

//sort nav items
function sort_items(a, b) {
	return a.order - b.order;
}

function sort_items_reverse(a, b) {
	return b.order - a.order;
}

//delete element
function delete_element(index, type) {

	if (window.confirm('Are you sure you want to delete the nav item?')) {

		switch (type) {
			case 'text':
				//remove data and html
				main_object.slider.slides[global_slide_index].elements.splice(index, 1);
				jQuery('#element_' + index).remove();
				jQuery('#element_list_' + index).remove();
				//enable save
				flag_save_required('hplugin_persist_object_data');
				break;
			case 'element':
				//remove data and html
				main_object.slider.slides[global_slide_index].elements.splice(index, 1);
				jQuery('#element_' + index).remove();
				jQuery('#element_list_' + index).remove();
				//enable save
				flag_save_required('hplugin_persist_object_data');
				break;
			case 'post':
				//remove data and html
				main_object.slider.slides[global_slide_index].elements.splice(index, 1);
				jQuery('#element_' + index).remove();
				jQuery('#element_list_' + index).remove();
				//enable save
				flag_save_required('hplugin_persist_object_data');
				break;
			case 'video':
				//remove data and html
				main_object.slider.slides[global_slide_index].elements.splice(index, 1);
				jQuery('#element_' + index).remove();
				jQuery('#element_list_' + index).remove();
				//enable save
				flag_save_required('hplugin_persist_object_data');
				break;
			case 'button':
				//remove data and html
				main_object.slider.slides[global_slide_index].elements.splice(index, 1);
				jQuery('#element_' + index).remove();
				jQuery('#element_list_' + index).remove();
				//enable save
				flag_save_required('hplugin_persist_object_data');
				break;
			case 'woo':
				//remove data and html
				main_object.slider.slides[global_slide_index].elements.splice(index, 1);
				jQuery('#element_' + index).remove();
				jQuery('#element_list_' + index).remove();
				//enable save
				flag_save_required('hplugin_persist_object_data');
				break;
		}

		var element_count = main_object.slider.slides[global_slide_index].elements.length;

		//reload data to reset indexes etc...
		if (element_count !== 0) {
			jQuery('#element_list_holder').html('');
			jQuery('.hslider_slide_holder').html('');
			main_object.slider.slides[global_slide_index].elements.sort(sort_items_reverse);
			jQuery(main_object.slider.slides[global_slide_index].elements).each(function (index, element) {
				insert_element_to_list(element, index, 'append');
				insert_element_to_stage(element.type, main_object.slider.slides[global_slide_index].elements[index], index);
				load_post_content();
				load_woo_content();
			});
		} else {
			jQuery('#element_list_holder').html('<div class="nothing_found">No elements have been added.</div>');
		}

		check_video();

		if (jQuery('.hslider_ux_grid').attr('data-grid-toggle') === 'open') {
			jQuery('.hslider_ux_grid').trigger('click');
		}

	} else {
		//do nothing
	}


}

//set list item data
function enable_list_item_data(element, index) {

	//offset position
	jQuery('#position_offset_x_' + index).val(element.offset_x);
	jQuery('#position_offset_y_' + index).val(element.offset_y);

	//enable the offset if direction is equal to custom
	if (element.animation[0].direction !== 'custom') {
		jQuery('#position_offset_x_' + index).prop('disabled', true).addClass('hslider_disable_input');
		jQuery('#position_offset_y_' + index).prop('disabled', true).addClass('hslider_disable_input');
	} else {
		jQuery('#element_animate_distance_' + index).prop('disabled', true).addClass('hslider_disable_input');
	}

	//end position
	jQuery('#position_x_' + index).val(element.x);
	jQuery('#position_y_' + index).val(element.y);

	//animation settings
	jQuery('#element_animation_type_' + index + ' option').each(function (idx, el) {
		if (jQuery(this).val() == element.animation[0].animationStrength) {
			jQuery(this).attr('selected', 'selected')
		}
	});
	jQuery('#element_animation_easing_' + index + ' option').each(function (idx, el) {
		if (jQuery(this).val() == element.animation[0].animationEasing) {
			jQuery(this).attr('selected', 'selected')
		}
	});
	jQuery('#element_delay_' + index).val(element.animation[0].delay);
	jQuery('#element_duration_' + index).val(element.animation[0].duration);
	jQuery('#element_animate_direction_' + index + ' option').each(function (idx, el) {
		if (jQuery(this).val() == element.animation[0].direction) {
			jQuery(this).attr('selected', 'selected')
		}
	});
	jQuery('#element_animate_distance_' + index).val(element.animation[0].distance);
	jQuery('#element_rotation_' + index + ' option').each(function (idx, el) {
		if (jQuery(this).val() == element.animation[0].rotation) {
			jQuery(this).attr('selected', 'selected')
		}
	});
	jQuery('#element_opacity_start_' + index + ' option').each(function (idx, el) {
		if (jQuery(this).val() == element.animation[0].startOpacity) {
			jQuery(this).attr('selected', 'selected')
		}
	});
	jQuery('#element_opacity_end_' + index + ' option').each(function (idx, el) {
		if (jQuery(this).val() == element.animation[0].endOpacity) {
			jQuery(this).attr('selected', 'selected')
		}
	});
	//element options
	jQuery('#element_url_' + index).val(element.url);
	jQuery('#element_alt_' + index).val(element.alt);
	jQuery('#element_target_' + index + ' option').each(function (idx, el) {
		if (jQuery(this).val() == element.target) {
			jQuery(this).attr('selected', 'selected')
		}
	});

	//switch components
	switch_components();

	//enable the direction change
	switch_direction(element, index);

	//switch duration preview
	switch_duration_preview(element, index, element.animation[0].delay, element.animation[0].duration);

}

//switch duration preview
function switch_duration_preview(element, index, delay_time, animation_time) {

	var delay_percentage = (delay_time / main_object.slider.slides[global_slide_index].slideIdle) * 100;
	var animation_percentage = (animation_time / main_object.slider.slides[global_slide_index].slideIdle) * 100;

	TweenLite.to(jQuery('#element_list_' + index + ' .element_time_delay'), 3, { width: delay_percentage + '%', ease: Power2.easeInOut });
	TweenLite.to(jQuery('#element_list_' + index + ' .element_time'), 3, { width: animation_percentage + '%', left: delay_percentage + '%', ease: Power2.easeInOut });

}

//enable the direction change
function switch_direction(element, index) {

	jQuery('.element_animate_direction_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_animate_direction_' + index).trigger('change');
	});
	jQuery('#element_animate_direction_' + index).on('change', function () {
		if (jQuery(this).children('option:selected').val() !== 'custom') {
			jQuery('#element_list_' + index + ' .hslider_offset_toggle').hide();
			jQuery('#position_offset_x_' + index).prop('disabled', true).addClass('hslider_disable_input');
			jQuery('#position_offset_y_' + index).prop('disabled', true).addClass('hslider_disable_input');
			jQuery('#element_animate_distance_' + index).prop('disabled', false).removeClass('hslider_disable_input');
		} else {
			jQuery('#element_list_' + index + ' .hslider_offset_toggle').show();
			jQuery('#position_offset_x_' + index).prop('disabled', false).removeClass('hslider_disable_input');
			jQuery('#position_offset_y_' + index).prop('disabled', false).removeClass('hslider_disable_input');
			jQuery('#element_animate_distance_' + index).prop('disabled', true).addClass('hslider_disable_input');
		}
		flag_save_required('hplugin_persist_object_data');
	});

}

//set list item data update
function enable_list_item_data_update(element, index) {

	//change: positions
	jQuery('#position_offset_x_' + index).on('change keyup', function () {
		element.offset_x = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('#position_offset_y_' + index).on('change keyup', function () {
		element.offset_y = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('#position_x_' + index).on('change keyup', function () {
		element.x = jQuery(this).val();
		change_element_stage_position(index, jQuery(this).val(), 'x');
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('#position_y_' + index).on('change keyup', function () {
		element.y = jQuery(this).val();
		change_element_stage_position(index, jQuery(this).val(), 'y');
		flag_save_required('hplugin_persist_object_data');
	});

	//change: animation settings
	jQuery('.element_animation_type_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_animation_type_' + index).trigger('change');
	});
	jQuery('#element_animation_type_' + index).on('change', function () {
		element.animation[0].animationStrength = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('.element_animation_easing_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_animation_easing_' + index).trigger('change');
	});
	jQuery('#element_animation_easing_' + index).on('change', function () {
		element.animation[0].animationEasing = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('#element_delay_' + index).on('change keyup', function () {
		element.animation[0].delay = jQuery(this).val();
		switch_duration_preview(element, index, element.animation[0].delay, element.animation[0].duration);
		flag_save_required('hplugin_persist_object_data');
	});

	/*jQuery('#element_delay_'+index).on('change keyup', function(){
		element.animation[0].delay = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});	*/

	jQuery('#element_duration_' + index).on('change keyup', function () {
		element.animation[0].duration = jQuery(this).val();
		switch_duration_preview(element, index, element.animation[0].delay, element.animation[0].duration);
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('.element_animate_direction_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_animate_direction_' + index).trigger('change');
	});
	jQuery('#element_animate_direction_' + index).on('change', function () {
		element.animation[0].direction = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('#element_animate_distance_' + index).on('change keyup', function () {
		element.animation[0].distance = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('.element_rotation_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_rotation_' + index).trigger('change');
	});
	jQuery('#element_rotation_' + index).on('change', function () {
		element.animation[0].rotation = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('.element_opacity_start_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_opacity_start_' + index).trigger('change');
	});
	jQuery('#element_opacity_start_' + index).on('change', function () {
		element.animation[0].startOpacity = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('.element_opacity_end_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_opacity_end_' + index).trigger('change');
	});
	jQuery('#element_opacity_end_' + index).on('change', function () {
		element.animation[0].endOpacity = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

	//change: options
	jQuery('#element_url_' + index).on('change keyup', function () {
		element.url = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('#element_alt_' + index).on('change keyup', function () {
		element.alt = jQuery(this).val();
		flag_save_required('hplugin_persist_object_data');
	});

	jQuery('.element_target_' + index + ' .hero_dropdown .hero_drop_row').on('click', function () {
		jQuery('#element_target_' + index).trigger('change');
	});
	jQuery('#element_target_' + index).on('change', function () {
		element.target = jQuery(this).children('option:selected').val();
		flag_save_required('hplugin_persist_object_data');
	});

}

//change element position on stage with a nice smooth animation
function change_element_stage_position(index, val, direction) {

	switch (direction) {
		case 'x':
			TweenLite.to(jQuery('#element_' + index), 1, { left: val, ease: Power2.easeInOut });
			break;
		case 'y':
			TweenLite.to(jQuery('#element_' + index), 1, { top: val, ease: Power2.easeInOut });
			break;
	}

}

//get html chunks
function get_html_chunk(type, id) {

	//variables
	var chunk_html = '';

	switch (type) {
		case 'list_item_settings':
			chunk_html += '<div class="element_settings">';
			chunk_html += '<!-- ELEMENT ROW : START -->';
			chunk_html += '<div class="element_row hslider_animation_toggle">';
			chunk_html += '<div class="element_settings_inner">';
			chunk_html += '<div class="element_container">';
			chunk_html += '<div class="element_heading hero_green size_16">';
			chunk_html += 'Animation options';
			chunk_html += '</div>';
			chunk_html += '<div class="element_settings_holder">';
			chunk_html += '<div class="hero_col_2">';
			chunk_html += '<div class="size_12">Type</div>';
			chunk_html += '<select data-size="lrg" data-height="100" id="element_animation_type_' + id + '" name="element_animation_type_' + id + '">';
			chunk_html += '<option value="Bounce">Bounce</option>';
			chunk_html += '<option value="Elastic">Elastic</option>';
			chunk_html += '<option value="Strong">Strong</option>';
			chunk_html += '<option value="Power0">Power0</option>';
			chunk_html += '<option value="Power1">Power1</option>';
			chunk_html += '<option value="Power2">Power2</option>';
			chunk_html += '<option value="Power3">Power3</option>';
			chunk_html += '<option value="Power4">Power4</option>';
			chunk_html += '<option value="Back">Back</option>';
			chunk_html += '<option value="Circ">Circ</option>';
			chunk_html += '<option value="Expo">Expo</option>';
			chunk_html += '<option value="Sine">Sine</option>';
			chunk_html += '</select>';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_2">';
			chunk_html += '<div class="size_12">Easing</div>';
			chunk_html += '<select data-size="lrg" id="element_animation_easing_' + id + '" name="element_animation_easing_' + id + '">';
			chunk_html += '<option value="easeOut">easeOut</option>';
			chunk_html += '<option value="easeIn">easeIn</option>';
			chunk_html += '<option value="easeInOut">easeInOut</option>';
			chunk_html += '</select>';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_1">';
			chunk_html += '<div class="size_12">Delay</div>';
			chunk_html += '<input type="text" data-size="lrg" style="border:1px solid #A1A1A1;" maxlength="4" id="element_delay_' + id + '" name="element_delay_' + id + '">';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_1">';
			chunk_html += '<div class="size_12">Duration</div>';
			chunk_html += '<input type="text" data-size="lrg" maxlength="4" style="border:1px solid #5BC0DE;" id="element_duration_' + id + '" name="element_duration_' + id + '">';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_2">';
			chunk_html += '<div class="size_12">Direction</div>';
			chunk_html += '<select data-size="lrg" data-height="100" id="element_animate_direction_' + id + '" name="element_animate_direction_' + id + '">';
			chunk_html += '<option value="left_right">Left to Right</option>';
			chunk_html += '<option value="right_left">Right to Left</option>';
			chunk_html += '<option value="top_down">Top to Bottom</option>';
			chunk_html += '<option value="down_top">Botton to Top</option>';
			chunk_html += '<option value="custom">Custom</option>';
			chunk_html += '</select>';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_2">';
			chunk_html += '<div class="size_12">Distance</div>';
			chunk_html += '<input type="text" data-size="lrg" data-hero_type="px" maxlength="4" id="element_animate_distance_' + id + '" name="element_animate_distance_' + id + '">';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_1" style="width:8%">';
			chunk_html += '<div class="size_12" data-tooltip="This is the start rotation of your element">Rotation</div>';
			//chunk_html += '<input type="text" data-size="lrg" class="hero_int_only" maxlength="3" id="element_rotation_'+id+'" name="element_rotation_'+id+'">';
			chunk_html += '<select data-size="lrg" data-height="100" id="element_rotation_' + id + '" name="element_rotation_' + id + '">';
			chunk_html += '<option value="0">0&deg;</option>';
			chunk_html += '<option value="20">20&deg;</option>';
			chunk_html += '<option value="45">45&deg;</option>';
			chunk_html += '<option value="60">60&deg;</option>';
			chunk_html += '<option value="90">90&deg;</option>';
			chunk_html += '<option value="115">115&deg;</option>';
			chunk_html += '<option value="140">140&deg;</option>';
			chunk_html += '<option value="180">180&deg;</option>';
			chunk_html += '<option value="210">210&deg;</option>';
			chunk_html += '<option value="260">260&deg;</option>';
			chunk_html += '<option value="360">360&deg;</option>';
			chunk_html += '</select>';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_1" style="width:8%">';
			chunk_html += '<div class="size_12" data-tooltip="The start opacity for your element">Opacity</div>';
			//chunk_html += '<input type="text" data-size="lrg" class="hero_int_only" maxlength="3" id="element_opacity_start_'+id+'" name="element_opacity_start_'+id+'">';
			chunk_html += '<select data-size="lrg" data-height="100" id="element_opacity_start_' + id + '" name="element_opacity_start_' + id + '">';
			chunk_html += '<option value="0">0%</option>';
			chunk_html += '<option value="0.1">10%</option>';
			chunk_html += '<option value="0.2">20%</option>';
			chunk_html += '<option value="0.3">30%</option>';
			chunk_html += '<option value="0.4">40%</option>';
			chunk_html += '<option value="0.5">50%</option>';
			chunk_html += '<option value="0.6">60%</option>';
			chunk_html += '<option value="0.7">70%</option>';
			chunk_html += '<option value="0.8">80%</option>';
			chunk_html += '<option value="0.9">90%</option>';
			chunk_html += '<option value="1">100%</option>';
			chunk_html += '</select>';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_1" style="width:8%">';
			chunk_html += '<div class="size_12" data-tooltip="The end opacity for your element"> End opacity</div>';
			//chunk_html += '<input type="text" data-size="lrg" class="hero_int_only" maxlength="3" id="element_opacity_end_'+id+'" name="element_opacity_end_'+id+'">';
			chunk_html += '<select data-size="lrg" data-height="100" id="element_opacity_end_' + id + '" name="element_opacity_end_' + id + '">';
			chunk_html += '<option value="0">0%</option>';
			chunk_html += '<option value="0.1">10%</option>';
			chunk_html += '<option value="0.2">20%</option>';
			chunk_html += '<option value="0.3">30%</option>';
			chunk_html += '<option value="0.4">40%</option>';
			chunk_html += '<option value="0.5">50%</option>';
			chunk_html += '<option value="0.6">60%</option>';
			chunk_html += '<option value="0.7">70%</option>';
			chunk_html += '<option value="0.8">80%</option>';
			chunk_html += '<option value="0.9">90%</option>';
			chunk_html += '<option value="1">100%</option>';
			chunk_html += '</select>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '<!-- ELEMENT ROW : END -->';
			chunk_html += '<!-- ELEMENT ROW : START -->';
			chunk_html += '<div class="element_row">';
			chunk_html += '<div class="element_settings_inner">';
			chunk_html += '<div class="hero_col_5">';
			chunk_html += '<div class="element_heading hero_green size_16">';
			chunk_html += 'End position';
			chunk_html += '</div>';
			chunk_html += '<div class="element_settings_holder">';
			chunk_html += '<div class="hero_col_6">';
			chunk_html += '<div class="size_12">End position: Horizontal</div>';
			chunk_html += '<input type="text" data-size="lrg" data-hero_type="px" class="hero_int_only" maxlength="4" id="position_x_' + id + '" name="position_x_' + id + '">';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_6">';
			chunk_html += '<div class="size_12">End position: Vertical</div>';
			chunk_html += '<input type="text" data-size="lrg" data-hero_type="px" class="hero_int_only" maxlength="4" id="position_y_' + id + '" name="position_y_' + id + '">';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_5 hslider_offset_toggle">';
			chunk_html += '<div class="element_heading hero_green size_16 parallax_heading">';
			chunk_html += 'Starting position';
			chunk_html += '</div>';
			chunk_html += '<div class="element_settings_holder">';
			chunk_html += '<div class="hero_col_6">';
			//hslider_disable_input
			chunk_html += '<div class="size_12 parallax_sub_heading">Start position: Horizontal</div>';
			chunk_html += '<input type="text" data-size="lrg" data-hero_type="px" class="hero_int_only switch_for_parallax" maxlength="4" id="position_offset_x_' + id + '" name="position_offset_x_' + id + '">';
			chunk_html += '</div>';
			chunk_html += '<div class="hero_col_6">';
			chunk_html += '<div class="size_12">Start position: Vertical</div>';
			chunk_html += '<input type="text" data-size="lrg" data-hero_type="px" class="hero_int_only switch_for_parallax2" maxlength="4" id="position_offset_y_' + id + '" name="position_offset_y_' + id + '">';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '</div>';
			chunk_html += '<!-- ELEMENT ROW : END -->';
			/*chunk_html += '<!-- ELEMENT ROW : START -->';
				chunk_html += '<div class="element_row">';
					chunk_html += '<div class="element_settings_inner">';                        	
						chunk_html += '<div class="element_container">';
							chunk_html += '<div class="element_heading hero_green size_16">';
								chunk_html += 'Element options';
							chunk_html += '</div>';
							chunk_html += '<div class="element_settings_holder">';
								chunk_html += '<div class="hero_col_6">';
									chunk_html += '<div class="size_12">URL</div>';
									chunk_html += '<input type="text" data-size="lrg" id="element_url_'+id+'" name="element_url_'+id+'">';
								chunk_html += '</div>';
								chunk_html += '<div class="hero_col_3">';
									chunk_html += '<div class="size_12">Alt</div>';
									chunk_html += '<input type="text" data-size="lrg" id="element_alt_'+id+'" name="element_alt_'+id+'">';
								chunk_html += '</div>';
								chunk_html += '<div class="hero_col_3">';
									chunk_html += '<div class="size_12">Target</div>';
									chunk_html += '<select data-size="lrg" id="element_target_'+id+'" name="element_target_'+id+'">';
										chunk_html += '<option value="_blank">New page</option>';
										chunk_html += '<option value="_self">Same page</option>';
									chunk_html += '</select>';
								chunk_html += '</div>';
							chunk_html += '</div>';
						chunk_html += '</div>';                        
					chunk_html += '</div>'; 
				chunk_html += '</div>';
			chunk_html += '<!-- ELEMENT ROW : END -->'; */
			chunk_html += '</div>';
			break;
	}

	return chunk_html;

}

//enable drag elements
function enable_element_drag() {

	//variables
	var the_slide_width = main_object.slider.width;
	if (main_object.slider.sliderType === 'responsive') {
		the_slide_width = 1200;
	}
	var the_slide_height = main_object.slider.height;

	//hover show the tools
	jQuery('.element_draggable').on({
		mouseenter: function () {
			TweenMax.to(jQuery(this).children('.hslider_element_tools'), 0.3, { opacity: 1, ease: Strong.easeInOut });
		},
		mouseleave: function () {
			TweenMax.to(jQuery(this).children('.hslider_element_tools'), 0.3, { opacity: 0, ease: Strong.easeInOut });
		}
	});

	//enable the drag
	jQuery(".element_draggable").each(function (index, element) {

		Draggable.create(jQuery(this), {
			type: "x,y",
			trigger: jQuery(this).children('.hslider_element_tools').children('.hlsider_inner_tools').children('.tools_element_move'),
			edgeResistance: 1,
			onDragStart: function () {
				//start
			},
			onDrag: function () {

				//variables
				var element_index = jQuery('#' + this._eventTarget.id).attr('data-index');

				if (global_zoom_val < 1) {
					var x_position = (jQuery('#' + this._eventTarget.id).position().left / global_zoom_val);
					var y_position = (jQuery('#' + this._eventTarget.id).position().top / global_zoom_val);
				} else {
					var x_position = jQuery('#' + this._eventTarget.id).position().left;
					var y_position = jQuery('#' + this._eventTarget.id).position().top;
				}

				//set data
				main_object.slider.slides[global_slide_index].elements[element_index].x = x_position.toFixed(0);
				main_object.slider.slides[global_slide_index].elements[element_index].y = y_position.toFixed(0);

				//set list item values
				jQuery('#position_x_' + element_index).val(x_position.toFixed(0));
				jQuery('#position_y_' + element_index).val(y_position.toFixed(0));

			},
			onDragEnd: function () {

				var element_index = jQuery('#' + this._eventTarget.id).attr('data-index');

				jQuery('#element_' + element_index).css({
					'z-index': main_object.slider.slides[global_slide_index].elements[element_index].order
				});

				flag_save_required('hplugin_persist_object_data');

			}
		});

	});

}

//get button html
function hslider_button_html(content, theme, font_obj, location, index) {

	var button_html = '';

	button_html += '<div class="hslider_button_element hslider_element button_' + location + '_' + index + ' hslider_' + theme + '" data-color="' + font_obj.font[0].color + '" data-secondary="' + font_obj.font[0].secondary + '">';

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

	button_html += '</div>';

	return button_html;

}

//get button css
function hslider_button_css(theme, font_obj, location, index) {

	var styles = '';

	switch (theme) {
		case 'x_factor':
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size) + 20) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_line_top, ';
			styles += '.button_' + location + '_' + index + ' .hslider_line_bottom{ ';
			styles += 'background-color:' + font_obj.font[0].color + ';';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			break;
		case 'side_pipe':
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size) + 10) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_line_left, ';
			styles += '.button_' + location + '_' + index + ' .hslider_line_right{ ';
			styles += 'height:' + (parseInt(font_obj.font[0].size) + 8) + 'px;';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			break;
		case 'side_flat':
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size) + 9) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_line_left, ';
			styles += '.button_' + location + '_' + index + ' .hslider_line_right{ ';
			styles += 'height:' + (parseInt(font_obj.font[0].size) + 8) + 'px;';
			styles += 'background-color:' + font_obj.font[0].secondary;
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_line_left{ ';
			styles += 'left: -15px';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_line_right{ ';
			styles += 'right: -15px';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			break;
		case 'hidden_underline':
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size)) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			break;
		case 'double_line':
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size)) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_line_top, ';
			styles += '.button_' + location + '_' + index + ' .hslider_line_bottom{ ';
			styles += 'background-color:' + font_obj.font[0].secondary;
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			break;
		case 'double_clamp':
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size)) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			break;
		case 'border_button':			
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size)) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'border-color:' + font_obj.font[0].secondary;
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			if (font_obj.borderType === "rounded") {
				styles += '.button_' + location + '_' + index + ' { ';
				styles += '-webkit-border-radius: 200px ;';
				styles += '-moz-border-radius: 200px ;';
				styles += 'border-radius: 200px ;';
				styles += 'overflow: hidden ;';
				styles += '}\n';
				styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
				styles += '-webkit-border-radius: 200px ;';
				styles += '-moz-border-radius: 200px ;';
				styles += 'border-radius: 200px ;';
				styles += '}\n';
			}
			break;	
		case 'border_button_translucent':			
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size)) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'border-color:' + font_obj.font[0].secondary;
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'background-color:' + hexToRgbA(font_obj.font[0].secondary, '0.66');
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			if (font_obj.borderType === "rounded") {
				styles += '.button_' + location + '_' + index + ' { ';
				styles += '-webkit-border-radius: 200px ;';
				styles += '-moz-border-radius: 200px ;';
				styles += 'border-radius: 200px ;';
				styles += 'overflow: hidden ;';
				styles += '}\n';
				styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
				styles += '-webkit-border-radius: 200px ;';
				styles += '-moz-border-radius: 200px ;';
				styles += 'border-radius: 200px ;';
				styles += '}\n';
			}
			break;
		case 'full_button':
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'line-height:' + (parseInt(font_obj.font[0].size)) + 'px; ';
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' .hslider_button_content{ ';
			styles += 'background-color:' + font_obj.font[0].secondary;
			styles += '}\n';
			styles += '.button_' + location + '_' + index + ' { ';
			styles += 'color:' + font_obj.font[0].color + '; ';
			styles += 'font-family:' + font_obj.font[0].family + '; ';
			styles += 'font-size:' + font_obj.font[0].size + font_obj.font[0].sizing + '; ';
			styles += 'font-weight:' + font_obj.font[0].weight + '; ';
			styles += 'text-transform:' + font_obj.font[0].transform + '; ';
			styles += '}\n';
			if (font_obj.borderType === "rounded") {
				styles += '.button_' + location + '_' + index + ' { ';
				styles += '-webkit-border-radius: 200px ;';
				styles += '-moz-border-radius: 200px ;';
				styles += 'border-radius: 200px ;';
				styles += 'overflow: hidden ;';
				styles += '}\n';
			}
			break;		
	}

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

//file uploader
function bind_uploader(index, content) {

	var file_frame;

	var main_index = index;
	var content_index = content;

	jQuery('.media_uploader').off().on('click', function (event) {

		var the_input_value = jQuery('#' + jQuery(this).data('link'));

		event.preventDefault();

		if (file_frame) {
			file_frame.open();
			return;
		}

		file_frame = wp.media.frames.file_frame = wp.media({
			title: jQuery(this).data('title'),
			button: {
				text: jQuery(this).data('text'),
			},
			multiple: false
		});

		file_frame.on('select', function () {
			attachment = file_frame.state().get('selection').first().toJSON();
			the_input_value.val(attachment.sizes.full.url)
			jQuery(the_input_value).trigger('change');
		});

		file_frame.open();

	});
}