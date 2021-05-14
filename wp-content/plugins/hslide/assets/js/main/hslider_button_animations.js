//JQUERY HSLIDER BUTTON ANIMATIONS

function hslider_x_factor(){
	
	var button_height;
	var shift_by;
		
	jQuery('.hslider_x_factor').on({
		mouseenter: function(){
			button_height = jQuery(this).height()
			shift_by = button_height / 2;
			TweenLite.to(jQuery(this).children('.hslider_line_top'), 0.3, {opacity:0.5, rotation:45, top:shift_by, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.3, {opacity:0.5, rotation:-45, bottom:shift_by, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_top'), 0.5, {opacity:1, rotation:0, top:0, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.5, {opacity:1, rotation:0, bottom:0, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		}
	});
	
}

function hslider_side_pipe(){
		
	jQuery('.hslider_side_pipe').on({
		mouseenter: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_left'), 0.3, {opacity:1, left:-20, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_right'), 0.3, {opacity:1, right:-20, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_left'), 0.5, {opacity:0, left:0, ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_right'), 0.5, {opacity:0, right:0, ease:Power2.easeInOut});
		}
	});
	
}

function hslider_side_flat(){
		
	var button_width;
	var pipe_height;
	var top_height;
	
	jQuery('.hslider_side_flat').on({
		mouseenter: function(){
			button_width = jQuery(this).width();
			pipe_height = jQuery(this).children('.hslider_line_left').height();
			top_height = pipe_height/2;
			TweenLite.to(jQuery(this).children('.hslider_line_left'), 0.3, {opacity:1, rotation:90, top:-top_height, left:'50%', backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_right'), 0.3, {opacity:1, rotation:90, top:top_height+3, right:'50%', marginRight:-2, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_left'), 0.5, {opacity:1, left:-15, top:0, rotation:0, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_right'), 0.5, {opacity:1, right:-15, top:0, rotation:0, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
		}
	});
	
}

function hslider_hidden_underline(){
		
	var button_width;
	var pipe_height;
	var top_height;
	
	jQuery('.hslider_hidden_underline').on({
		mouseenter: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.3, {opacity:1, bottom:-10, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {color:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});			
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.3, {opacity:0, bottom:-20, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		}
	});
	
}

function hslider_double_line(){
	
	var button_height;
	
	jQuery('.hslider_double_line').on({
		mouseenter: function(){
			button_height = jQuery(this).height()
			TweenLite.to(jQuery(this).children('.hslider_line_top'), 0.3, {opacity:1, scaleX:1.1, top:-10, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.3, {opacity:1, scaleX:1.1, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {color:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_top'), 0.3, {opacity:0, scaleX:1, top:button_height+10, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.3, {opacity:1, scaleX:1, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		}
	});
	
}

function hslider_double_clamp(){
		
	var button_width;
	var pipe_height;
	var top_height;
	
	jQuery('.hslider_double_clamp').on({
		mouseenter: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_top'), 0.3, {opacity:1, top:-5, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.3, {opacity:1, bottom:-5, backgroundColor:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {color:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});			
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_line_top'), 0.3, {opacity:0, top:-20, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_line_bottom'), 0.3, {opacity:0, bottom:-20, backgroundColor:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		}
	});
	
}

function hslider_border_button(){
		
	var button_width;
	var pipe_height;
	var top_height;
	
	jQuery('.hslider_border_button').on({
		mouseenter: function(){
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {borderColor:jQuery(this).attr('data-color'), backgroundColor:jQuery(this).attr('data-secondary'), color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});			
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {borderColor:jQuery(this).attr('data-secondary'), backgroundColor:'none', color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		}
	});
	
}

function hslider_border_button_translucent(){
		
	var button_width;
	var pipe_height;
	var top_height;
	
	jQuery('.hslider_border_button_translucent').on({
		mouseenter: function(){
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {borderColor:jQuery(this).attr('data-color'), backgroundColor:jQuery(this).attr('data-secondary'), color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});			
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {borderColor:jQuery(this).attr('data-secondary'), backgroundColor:hexToRgbA(jQuery(this).attr('data-secondary'), '0.66'), color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		}
	});
	
}

function hslider_full_button(){
		
	var button_width;
	var pipe_height;
	var top_height;
	
	jQuery('.hslider_full_button').on({
		mouseenter: function(){
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {backgroundColor:jQuery(this).attr('data-color'), color:jQuery(this).attr('data-secondary'), ease:Power2.easeInOut});			
		},
		mouseleave: function(){
			TweenLite.to(jQuery(this).children('.hslider_button_content'), 0.3, {backgroundColor:jQuery(this).attr('data-secondary'), color:jQuery(this).attr('data-color'), ease:Power2.easeInOut});
		}
	});
	
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
