//DROPDOWN VIEW CORE

//globals
var object_id;
var object_name;
var global_slide_index = 0;
var global_post_object = {};
var global_woo_object = {};
var global_google_fonts = {};

//get object
function load_default_object(json){
	//get object id
	object_id = json.object_id;
	//get object
	hplugin_get_object(object_id, 'load_view_content');
	//highlight active
	setTimeout(function(){
		jQuery('.hero_sub #sub_item_row_'+ json.object_id).addClass('active_sidebar_elem');
	},400);
	//unlock core view
	unlock_core_view_reload();
	//activate custom popup
	activate_custom_popup_styles();
	//get post data
	get_post_data();
	get_woo_data();
	check_woo();
	//load google fonts
	load_google_fonts();
}

//load google fonts
function load_google_fonts(){
	
	jQuery.ajax({
		url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCe3XGw8IKuzIXe7bL6ZQc1xbe3MX5DR-s',
		type: "GET",
		dataType: "json"
	}).done(function(data){
		global_google_fonts = data.items;
	}).fail(function(){
		//error
	});
	
}

//populate google fonts
function populate_fonts(){
	
	//populate selct boxes according to array above
	jQuery('.load_fonts').each(function(index, elm) {        
       
	    var the_fonts = '';
		
		var default_fonts = ['inherit', 'Arial', 'Verdana', 'Times New Roman', 'Times', 'Trebuchet MS', 'sans-serif', 'serif'];
		
		jQuery(default_fonts).each(function(index, element) {
			the_fonts += "<option value='"+element+"'>"+element+"</option>";		
		});
		
		jQuery(global_google_fonts).each(function(index, element) {
			the_fonts += "<option value='"+element.family+"'>"+element.family+"</option>";			
		});
		
		jQuery(this).html(the_fonts);
		
		update_select_component(jQuery(this));
		
    });	
	
}

function load_view_content(object){
	//set title
	object_name = object.object_name;
	//replace ’ with single quote
 	var replacement_object = (object.object).replace(/&#39;/g,"'").replace(/(?:\r\n|\r|\n)/g, '<br>');
	//define main object
	main_object = JSON.parse(replacement_object);
	//initialise object manager
	hplugin_bind_view_components(object_id, main_object);
	//load sub view
	manual_load_view('dropdown_default');	
}

function example_callback(json){
	//console.log('callback function');
}

function activate_custom_popup_styles(){
		
	//set initial state
	TweenLite.to(jQuery('.hero_custom_popup_holder .hero_custom_popup_inner'), 0, {ease:Power2.easeInOut});
	
	//open popup
	jQuery('.custom_popup_open').on('click', function(){
		
		var attr_val = jQuery(this).attr('data-example-type');
		var button_type = jQuery(this).attr('data-function');
		//var title = get_arrow_text(attr_val, 'load', button_type);
		//jQuery('.hero_custom_popup_inner').append(title);
		
		jQuery('.hero_custom_popup_holder').css({'display':'table'});
		TweenLite.to(jQuery('.hero_custom_popup_holder'), 0, {opacity:1, ease:Power2.easeInOut});
		jQuery('.hero_custom_popup_content').css({ 'overflow':'hidden' });
		jQuery('.hero_custom_popup_inner').css({'background-color':'#DC4551'});
		TweenLite.to(jQuery('.hero_custom_popup_inner'), 0, {scaleX:1, scaleY:1, opacity:1, ease:Power2.easeInOut});
		//function to run
		
		eval(jQuery(this).attr('data-function')+"('"+jQuery(this).attr('data-example-type')+"')");
		jQuery('.hero_custom_popup_top_title').html('');	
	});
	
	//close popup
	jQuery('.hero_custom_close').off().on('click', function(){			
		TweenLite.to(jQuery('.hero_custom_popup_holder'), 0, {opacity:0, ease:Power2.easeInOut, onComplete:custom_popup_none});
		TweenLite.to(jQuery('.hero_custom_popup_inner'), 0, {opacity:0, ease:Power2.easeInOut});
	});
	
}

function get_arrow_text(attr, load_type, type){
		
	var title = '';
	
	if(type === 'show_arrow_examples'){
		switch(attr){	
			case 'fold':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Image slide out</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'fullarrow':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Flat image view</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'sideslide':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Image and description</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'circle':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Rounded image</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'rounded':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Rounded description</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'doubleflip':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Fold out</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'bend':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Simple description</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
		}
	} else if(type === 'show_pager_examples') {
		switch(attr){	
			case 'scale_up':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Scale up</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'fill_up':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Fill up</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
			case 'inner_circle':	
				title += '<div class="hero_custom_popup_info">';
					title += '<h1>Inner circle</h1>';
					title += '<p>Solid block with transparent arrow, showing the next/previous slide on hover.</p>';
					title += '<div class="hero_custom_btn rounded_3">USE</div>';
				title += '</div>';
			break;
		}
	}
	
	if(load_type === 'select'){
		jQuery('.hero_custom_popup_info').remove();	
		jQuery('.hero_custom_popup_inner').append(title);
	} else {
		return title;
	}
		
	
}

function custom_popup_none(){
	jQuery('.hero_custom_popup_holder').css({'display':'none'});
}

//get post data
function get_post_data(){
	
	//get menu object
	jQuery.ajax({
		url: ajax_url,
		type: "POST",
		data: {
			'action': 'hslide_get_post_data'
		},
		dataType: "json"
	}).done(function(data){	
		//done
		global_post_object = data;
	}).fail(function(event){
		//page error		
	});
	
}

//get post data
function get_woo_data(){
	
	//get menu object
	jQuery.ajax({
		url: ajax_url,
		type: "POST",
		data: {
			'action': 'hslide_get_woo_data'
		},
		dataType: "json"
	}).done(function(data){	
		//done
		global_woo_object = data;
	}).fail(function(event){
		//page error		
	});
	
}

var global_woo_check = false;

//check woo
function check_woo(){
	
	//get menu object
	jQuery.ajax({
		url: ajax_url,
		type: "POST",
		data: {
			'action': 'hslide_get_check_woo'
		},
		dataType: "json"
	}).done(function(data){	
		//done
		global_woo_check = data;
	}).fail(function(event){
		//page error		
	});
	
}