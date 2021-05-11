//SUB.GENERAL VIEW

//view load
jQuery(function(){
	
	"use strict";
	
	//set header label
	set_current_header_label('Currently Editing', object_name);
	
	//toggle slider type options
	check_selected_type(main_object);
	
	//toggle holders
	//activate_hplugin_toggle();
	
	jQuery('.slider_id_example').html(object_id);

	//set copy
	var string_val = '<?php echo do_shortcode("[hslide id='+object_id+']"); ?>';
	var string_val_2 = '[hslide id='+object_id+']';
	
	jQuery('#do_short').val(string_val);
	jQuery('#the_short').val(string_val_2);
	
});

//toggle slider type options
function check_selected_type(main_object){
	
	"use strict";
	
	//set the current option
	toggle_slider_type_options(main_object.slider.sliderType);
	
	jQuery('.hslider_type_options').find('[name=responsive_group]').on('change', function(){
		//the selected value
		toggle_slider_type_options(jQuery(this).attr('value'));
	});
		
}

function toggle_slider_type_options(type){
	
	"use strict";
	
	//check what the type is
	switch(type){
		case 'fixed':
			jQuery('#slider_width').prop('disabled', false).removeClass('hslider_disable_input');
			jQuery('#slider_height').prop('disabled', false).removeClass('hslider_disable_input');
			jQuery('#slider_width').val(main_object.slider.width);
			
			jQuery('#slider_width').show();
			jQuery('#slider_width_100').hide();
			
		break;
		case 'responsive':
			jQuery('#slider_width_100').prop('disabled', true).addClass('hslider_disable_input');
			jQuery('#slider_height').prop('disabled', false).removeClass('hslider_disable_input');
			
			jQuery('#slider_width_100').css({
				'background-image':'url('+plugin_url+'assets/images/admin/type_perc_light.png)',
				'background-repeat':'no-repeat',
				'background-position':'right'
			});
			jQuery('#slider_width_100').show();
			jQuery('#slider_width').hide();
			
		break;
		case 'full':
			jQuery('#slider_width').prop('disabled', true).addClass('hslider_disable_input');
			jQuery('#slider_height').prop('disabled', false).removeClass('hslider_disable_input');
		break;
		case 'fullscreen':
			jQuery('#slider_width').prop('disabled', true).addClass('hslider_disable_input');
			jQuery('#slider_height').prop('disabled', true).addClass('hslider_disable_input');
		break;
	}	
	
}