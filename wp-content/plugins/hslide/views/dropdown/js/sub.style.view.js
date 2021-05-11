//SUB.STYLE VIEW

//view load
jQuery(function(){
	//set header label
	set_current_header_label('Currently Editing', object_name);
	//set example images
	set_example_images(main_object);
	//set example timer
	set_example_timer(main_object);
	//activate custom popup
	activate_custom_popup_styles();
	//set button data
	set_arrow_btn_data(main_object.slider.arrows.type);
	set_pager_btn_data(main_object.slider.pager.type);
	//populate fonts
	populate_fonts();
	do_toggle();
});

function do_toggle(){
	
	jQuery('.hero_viewport').find('[data-toggle]').on("change", function(){
		//console.log(jQuery(this).val());
	});
	
}

//set example timer
function set_example_timer(main_object){
	
	/*TweenLite.to(jQuery('.timer_example_display'), 0.5, {opacity:main_object.slider.timer.transparency, backgroundColor:main_object.slider.timer.primaryColor, ease:Power2.easeInOut});	
	TweenLite.to(jQuery('.timer_example_inner'), 0.5, {opacity:main_object.slider.timer.transparency, backgroundColor:main_object.slider.timer.secondaryColor, ease:Power2.easeInOut});	
	
	jQuery('#timer_transparency').on('change', function(){
		TweenLite.to(jQuery('.timer_example_display'), 0.5, {opacity:jQuery(this).val(), ease:Power2.easeInOut});	
		TweenLite.to(jQuery('.timer_example_inner'), 0.5, {opacity:jQuery(this).val(), ease:Power2.easeInOut});
	});
	
	jQuery('#timer_primary_color').off('keyup.bgcolor change.bgcolor paste.bgcolor').on('keyup.bgcolor change.bgcolor paste.bgcolor', function(){
		
		TweenLite.to(jQuery('.timer_example_display'), 0.5, {opacity:jQuery(this).val(), ease:Power2.easeInOut});	
		
	});
	
	jQuery('#timer_secondary_color').off('keyup.bgcolor2 change.bgcolor2 paste.bgcolor2').on('keyup.bgcolor2 change.bgcolor2 paste.bgcolor2', function(){
		
		TweenLite.to(jQuery('.timer_example_inner'), 0.5, {opacity:jQuery(this).val(), ease:Power2.easeInOut});	
		
	});*/
	
	//timer_secondary_color
	
}

//set example images
function set_example_images(main_object){
	
	//set example image
	jQuery('.hslider_image_placeholder').each(function(index, element) {
        switch(jQuery(this).attr('data-example-type')){
			case 'arrows':
				jQuery(this).html(get_example_html('arrows', main_object.slider.arrows.type));
			break;
			case 'pager':
				jQuery(this).html(get_example_html('pager', main_object.slider.pager.type));
			break;
		}
    });
	
	//change example image
	jQuery('.hero_views').find('[data-example-change]').on('change', function(){
		switch(jQuery(this).attr('data-example-change')){
			case 'arrows':
				jQuery('.example_arrows').html(get_example_html('arrows', jQuery(this).val()));
				set_arrow_btn_data(jQuery(this).val());
			break;
			case 'pager':
				jQuery('.example_pager').html(get_example_html('pager', jQuery(this).val()));
				set_pager_btn_data(jQuery(this).val());
			break;
		}
	});
	
}

//get example html
function get_example_html(example, type){
	var img_html = '';
	switch(example){
		case 'arrows':
			img_html += '<img src="'+plugin_url+'assets/images/admin/_arrows/'+type+'.jpg">';
		break;
		case 'pager':
			img_html += '<img src="'+plugin_url+'assets/images/admin/_pager/'+type+'.jpg">';
		break;
	}	
	return img_html;	
}

//show_arrow_examples
function show_arrow_examples(type){
	hslider_get_side_button_html(type);
}

//show_pager_examples
function show_pager_examples(type){
	hslider_get_pager_html(type);
}

//set arrow button data
function set_arrow_btn_data(type){	
	jQuery('#show_arrow_examples').attr('data-example-type', type);	
}

//set pager button data
function set_pager_btn_data(type){	
	jQuery('#show_pager_examples').attr('data-example-type', type);	
}

//get side button html
function hslider_get_side_button_html(type){
	
	var side_html = '';
	var arrow_html = '';
	var select_html = '';
	
	var title = get_arrow_text(type, 'load', 'show_arrow_examples');
	jQuery('.hero_custom_popup_inner').append(title);
	
	//set the button data type
	jQuery('.hero_custom_btn').attr('data-type', type);
	
	select_html += '<select data-size="lrg" id="arrow_type_example" name="arrow_type_example" data-example-change="arrows" data-node_val="slider/arrows/type">';
		select_html += '<option value="fold">Image slide out</option>';
		select_html += '<option value="fullarrow" selected="selected">Flat image view</option>';
		select_html += '<option value="sideslide">Image &amp; description</option>';
		select_html += '<option value="circle">Rounded image</option>';
		select_html += '<option value="rounded">Rounded description</option>';
		select_html += '<option value="doubleflip">Fold out</option>';
		select_html += '<option value="bend">Simple description</option>';
	select_html += '</select>';
	
	side_html += '<div class="example_arrow_holder hslider_'+type+'">';
		
		switch(type){
			case 'fold':
				arrow_html += '<div class="hslider_side_inner">';
					arrow_html += '<div class="hslider_side_image_wrap">';
						arrow_html += '<div class="hslider_side_image"></div>';
					arrow_html += '</div>';
					arrow_html += '<div class="hslider_side_label">6/6</div> ';
				arrow_html += '</div>';
			break;
			case 'fullarrow':
				arrow_html += '<div class="hslider_side_inner">';
					arrow_html += '<div class="hslider_side_image_wrap">';
						arrow_html += '<div class="hslider_side_image"></div>';
					arrow_html += '</div>';
					arrow_html += '<div class="hslider_side_label">6/6</div> ';
				arrow_html += '</div>';
			break;
			case 'sideslide':
				arrow_html += '<div class="hslider_side_inner">';
					arrow_html += '<div class="hslider_side_image_wrap">';
						arrow_html += '<div class="hslider_side_image"></div>';
					arrow_html += '</div>';
					arrow_html += '<div class="hslider_side_label">Slide description goes here.</div> ';
				arrow_html += '</div>';
			break;
			case 'circle':
				arrow_html += '<div class="hslider_side_inner">';
					arrow_html += '<div class="hslider_side_image_wrap">';
						arrow_html += '<div class="hslider_side_image"></div>';
					arrow_html += '</div>';
					arrow_html += '<div class="hslider_side_label">6/6</div> ';
				arrow_html += '</div>';
			break;
			case 'rounded':
				arrow_html += '<div class="hslider_side_inner">';
					arrow_html += '<div class="hslider_side_image"></div>';
					arrow_html += '<div class="hslider_side_label">Slide description</div> ';
				arrow_html += '</div>';
			break;
			case 'doubleflip':
				arrow_html += '<div class="hslider_side_inner">';
					arrow_html += '<div class="hslider_side_image_wrap">';
						arrow_html += '<div class="hslider_side_image"></div>';
					arrow_html += '</div>';
					arrow_html += '<div class="hslider_side_label">6/6</div> ';
				arrow_html += '</div>';
			break;
			case 'bend':
				arrow_html += '<div class="hslider_side_icon"></div>';
				arrow_html += '<div class="hslider_side_inner">';
					arrow_html += '<div class="hslider_side_line"></div>';
					arrow_html += '<div class="hslider_side_count">1 OF 3</div>';
					arrow_html += '<div class="hslider_side_image"></div>';
					arrow_html += '<div class="hslider_side_label">Description...</div>'; 
				arrow_html += '</div>';
			break;
		}
		
		side_html += '<div class="hslider_left hslider_side_btn" data-side-button="true" data-side="left">';
			side_html += arrow_html;
		side_html += '</div>';
		
		side_html += '<div class="hslider_right hslider_side_btn" data-side-button="true" data-side="right">';
			side_html += arrow_html;
		side_html += '</div>';
	
	side_html += '</div>';
	
	//add html
	jQuery('.hero_custom_popup_content').html(side_html);
	jQuery('.hero_custom_popup_top_inner').html(select_html);
	
	//set selected
	jQuery('.hero_custom_popup_top_inner select').children('option').each(function(index, element) {
        if(jQuery(this).val() === type){
			jQuery(this).prop('selected', true)
		}
    });	
	
	jQuery('.hero_custom_btn').on('click', function(){
		
		//set selected
		jQuery('#arrow_type').children('option').each(function(index, element) {
			if(jQuery(this).val() === type){
				jQuery(this).prop('selected', true);
				main_object.slider.arrows.type = jQuery(this).val();
				flag_save_required('hplugin_persist_object_data');
			} else {
				jQuery(this).prop('selected', false);
			}
		});
		update_select_component(jQuery('#arrow_type'));
		
		//set the button data type
		jQuery('#show_arrow_examples').attr('data-example-type', jQuery(this).attr('data-type'));
	
		//set preview example image
		jQuery('.example_arrows').html(get_example_html('arrows', jQuery(this).attr('data-type')));
	
		//close popup
		jQuery('.hero_custom_close').trigger('click');
		
	});
	
	//update the select component
	update_select_component(jQuery('#arrow_type_example'));
	
	//change example image
	jQuery('#arrow_type_example').on('change', function(){
		get_arrow_text(jQuery(this).val(), 'select', 'show_arrow_examples');
		hslider_get_side_button_html(jQuery(this).val());		
	});
	
	//activate animation
	eval('hslider_animation_'+type+'("'+type+'")');
	
}

//get pager button html
function hslider_get_pager_html(type){
	
	var pager_html = '';
	var slide_count = 6;
	var select_html = '';
	
	var title = get_arrow_text(type, 'load', 'show_pager_examples');
	jQuery('.hero_custom_popup_inner').append(title);
	
	//set the button data type
	jQuery('.hero_custom_btn').attr('data-type', type);
	
	select_html += '<select data-size="lrg" id="pager_type_example" name="pager_type_example" data-example-change="pager" data-node_val="slider/pager/type">';
		select_html += '<option value="scale_up">Scale up pager</option>';
		select_html += '<option value="fill_up">Fill up pager</option>';
		select_html += '<option value="inner_circle">Inner circle pager</option>';
	select_html += '</select>';
	
	//LOOP THE AMOUNT OF SLIDES TO CREATE MULTIPLE BUTTONS
	
	pager_html += '<div class="hslider_pager_holder hslider_pager_scale">';
	
	for(var s = 1; s <= slide_count; s++){
		//RETURN THE PROPER PAGER HTML
		switch(type){
			case 'scale_up':
				pager_html += '<div class="hslider_pager_btn hslider_scale_btn hslider_rounded_pager" data-pager-position="'+s+'"></div>';
			break;
			case 'fill_up':
				pager_html += '<div class="hslider_pager_btn hslider_fill_btn hslider_rounded_pager" data-pager-position="'+s+'"></div>';
			break;
			case 'inner_circle':
				pager_html += '<div class="hslider_pager_btn hslider_circle_btn hslider_rounded_pager" data-pager-position="'+s+'"><div class="hslider_rounded_pager"></div></div>';
			break;
		}		
	}
	
	pager_html += '</div>';
	
	//add html
	jQuery('.hero_custom_popup_content').html(pager_html);	
	jQuery('.hero_custom_popup_top_inner').html(select_html);
	
	//set selected
	jQuery('.hero_custom_popup_top_inner select').children('option').each(function(index, element) {
        if(jQuery(this).val() === type){
			jQuery(this).prop('selected', true)
		}
    });
	
	jQuery('.hero_custom_btn').on('click', function(){
		
		//set selected
		jQuery('#pager_type').children('option').each(function(index, element) {
			if(jQuery(this).val() === type){
				jQuery(this).prop('selected', true);
				main_object.slider.timer.type = jQuery(this).val();
				flag_save_required('hplugin_persist_object_data');
			} else {
				jQuery(this).prop('selected', false);
			}
		});
		update_select_component(jQuery('#pager_type'));
		
		//set the button data type
		jQuery('#show_pager_examples').attr('data-example-type', jQuery(this).attr('data-type'));
	
		//set preview example image
		jQuery('.example_pager').html(get_example_html('pager', jQuery(this).attr('data-type')));
	
		//close popup
		jQuery('.hero_custom_close').trigger('click');
		
	});
	
	//update the select component
	update_select_component(jQuery('#pager_type_example'));
	
	//change example image
	jQuery('#pager_type_example').on('change', function(){
		get_arrow_text(jQuery(this).val(), 'select', 'show_pager_examples');
		hslider_get_pager_html(jQuery(this).val());
	});
	
	jQuery('.hslider_pager_holder .hslider_pager_btn').on('click', function(){
		
		hslider_click_count = jQuery(this).attr('data-pager-position');	
		
		hslider_pager_state(hslider_click_count, type);
		
	});
	
	//SET ACTIVE STATE
	hslider_pager_state(1, type);
	
}

//SET PAGER ACTIVE STATE
function hslider_pager_state(position, type){
	
	jQuery('.hslider_pager_holder .hslider_pager_btn').each(function(index, element) {
        if(position != jQuery(this).attr('data-pager-position')){
			jQuery(this).removeClass('hslider_pager_active');
			hslider_anmimate_state(jQuery(this), type, false);
		} else {
			jQuery(this).addClass('hslider_pager_active');
			hslider_anmimate_state(jQuery(this), type, true);
		}
    });
	
}

//ANIMATE THE STATE OF THE PAGER ACTIVE
function hslider_anmimate_state(ele, type, status){
	
	switch(type){
		case 'scale_up':
			if(status){
				//ANIMATE ACTIVE STATE TRUE
				TweenLite.to(ele, 0.5, {scaleX:1.7, scaleY:1.7, opacity:1, backgroundColor:'#FFFFFF', ease:Power2.easeInOut});	
			} else {
				//ANIMATE OFF STATE FALSE	
				TweenLite.to(ele, 0.5, {scaleX:1, scaleY:1, opacity:0.5,  backgroundColor:'#FFFFFF', ease:Power2.easeInOut});	
			}
		break;
		case 'fill_up':
			if(status){
				//ANIMATE ACTIVE STATE TRUE
				TweenLite.to(ele, 0.5, {opacity:1, backgroundColor:'#FFFFFF', borderColor:'#FFFFFF', ease:Power2.easeInOut});	
			} else {
				//ANIMATE OFF STATE FALSE	
				TweenLite.to(ele, 0.5, {opacity:0.5, backgroundColor:'none', borderColor:'#FFFFFF', ease:Power2.easeInOut});	
			}
		break;
		case 'inner_circle':
			if(status){
				//ANIMATE ACTIVE STATE TRUE
				TweenLite.to(ele, 0.5, {opacity:1, borderColor:'#FFFFFF', ease:Power2.easeInOut});	
				TweenLite.to(jQuery(ele).children('div'), 0.5, {opacity:1, scaleX:0.6, scaleY:0.6, backgroundColor:'#FFFFFF', ease:Power2.easeInOut});
			} else {
				//ANIMATE OFF STATE FALSE	
				TweenLite.to(ele, 0.5, {opacity:0.5, backgroundColor:'none', borderColor:'#FFFFFF', ease:Power2.easeInOut});
				TweenLite.to(jQuery(ele).children('div'), 0.5, {opacity:1, scaleX:1, scaleY:1, backgroundColor:'#FFFFFF', ease:Power2.easeInOut});	
			}
		break;
	}
	
}