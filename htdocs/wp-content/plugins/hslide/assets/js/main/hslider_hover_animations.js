//JQUERY HSLIDER HOVER ANIMATIONS

function trigger_hover_animation(){
	
	hslider_execute_block_hover();
	
}

//RUN THE BLOCK HOVER ANIMATION
function hslider_execute_block_hover(){
	
	//FIND BLOCK HOVER ANIMATIONS
	jQuery('.hslider_slide_content_holder').find('[data-block-hover-type]').each(function(index, element) {
		switch(jQuery(this).attr('data-block-hover-type')){
			case 'zoom':
				hslider_apply_zoom(jQuery(this));
			break;
			case 'blur':
				hslider_apply_blur(jQuery(this));
			break;
			case 'opaque':
				hslider_apply_opaque(jQuery(this));
			break;
		}
	});
	
}

//ZOOM FUNCTION
function hslider_apply_zoom(div){
		
	jQuery(div).on({
		mouseenter: function(){
			TweenLite.to(jQuery(this).children('.hslider_post_image'), 1, {scaleX:1.2, scaleY:1.2, ease:Power4.easeInOut});	
			TweenLite.to(jQuery(this).children('.hslider_post_content'), 0.5, {paddingBottom:60, ease:Power2.easeInOut});
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_post_image'), 1, {scaleX:1, scaleY:1, ease:Power2.easeOut});		
			TweenLite.to(jQuery(this).children('.hslider_post_content'), 0.5, {paddingBottom:20, ease:Power2.easeInOut});	
		}
	});
	
}