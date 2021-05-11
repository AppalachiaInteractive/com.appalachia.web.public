//FOLD ANIMATION
var mobile_touch_check = jQuery.support.touch;

function hslider_animation_fold(animation_type){

	//VARIABLES
	var animation_duration = 0.5;
	var animation_delay = 0.5;

    if(!mobile_touch_check){

        jQuery(jQuery('.hslider_' + animation_type).children('.hslider_side_btn')).on('mouseenter', function(){
            var side = jQuery(this).attr('data-side');
            if(side == 'left'){
                TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {left:170, ease:Power2.easeInOut});
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {bottom:-20, ease:Power2.easeInOut, delay:animation_delay});
            } else {
                TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {right:170, ease:Power2.easeInOut});
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {bottom:-20, ease:Power2.easeInOut, delay:animation_delay});
            }
        });

        jQuery(jQuery('.hslider_' + animation_type).children('.hslider_side_btn')).on('mouseleave', function(){
            var side = jQuery(this).attr('data-side');
            if(side == 'left'){
                TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {left:0, ease:Power2.easeInOut});
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {bottom:0, ease:Power2.easeInOut});
            } else {
                TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {right:0, ease:Power2.easeInOut});
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {bottom:0, ease:Power2.easeInOut});
            }
        });

    }
	
}

//FULL ARROW ANIMATION
function hslider_animation_fullarrow(animation_type){
	
	//VARIABLES
	var animation_duration = 0.3;
	var animation_delay = 0;
	var side = '';

    if(!mobile_touch_check){

        jQuery('.hslider_' + animation_type).children('.hslider_side_btn').on({
            mouseenter: function(){
                 side = jQuery(this).attr('data-side');
                 if(side == 'left'){
                    jQuery(this).children('.hslider_side_inner').children('.hslider_side_image').css({'width':'0px'});
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image'), animation_duration, {width:'50px', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {opacity:1, backgroundColor:'#FFFFFF', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this), animation_duration, {color:'#FFF', ease:Power2.easeInOut});
                 } else {
                    jQuery(this).children('.hslider_side_inner').children('.hslider_side_image').css({'width':'0px'});
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image'), animation_duration, {width:'50px', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {opacity:1, backgroundColor:'#FFFFFF', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this), animation_duration, {color:'#FFF', ease:Power2.easeInOut});
                 }
            },
            mouseleave: function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image'), animation_duration, {width:'50px', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {opacity:0, backgroundColor:'none', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this), animation_duration, {color:'#363B3F', ease:Power2.easeInOut});
                } else {
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image'), animation_duration, {width:'50px', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {opacity:0, backgroundColor:'none', ease:Power2.easeInOut});
                    TweenLite.to(jQuery(this), animation_duration, {color:'#363B3F', ease:Power2.easeInOut});
                }
            }
        });

    }
		
}

//SIDE SLIDE ANIMATION
function hslider_animation_sideslide(animation_type){
	
	//VARIABLES
	var animation_duration = 0.5;
	var animation_delay = 0;
	var side = '';

    if(!mobile_touch_check){

        jQuery('.hslider_' + animation_type).children('.hslider_side_btn').on({
            mouseenter:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        left:'0px',
                        ease:Power2.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        right:'0',
                        ease:Power2.easeInOut
                    });
                }
            },
            mouseleave:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        left:'-320',
                        ease:Power2.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        right:'-320',
                        ease:Power2.easeInOut
                    });
                }
            }
        });

    }
		
}

//CIRCLE ANIMATION
function hslider_animation_circle(animation_type){
	
	//VARIABLES
	var animation_duration = 0.5;
	var animation_delay = 0;
	var side = '';

    if(!mobile_touch_check){

        jQuery('.hslider_' + animation_type).children('.hslider_side_btn').on({
            mouseenter:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image_wrap').children('.hslider_side_image'), animation_duration, {
                        opacity:1,
                        left:'0',
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        opacity:1,
                        margin:'0px 11px',
                        width:'50px',
                        height:'50px',
                        ease:Power2.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image_wrap').children('.hslider_side_image'), animation_duration, {
                        opacity:1,
                        right:'0',
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        opacity:1,
                        margin:'0px 11px',
                        width:'50px',
                        height:'50px',
                        ease:Power2.easeInOut
                    });
                }
            },
            mouseleave:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image'), animation_duration, {
                        opacity:0,
                        left:'-50',
                        ease:Power2.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        opacity:0,
                        backgroundColor:'none',
                        margin:'0px 11px',
                        width:'50px',
                        height:'50px',
                        ease:Power2.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image'), animation_duration, {
                        opacity:0,
                        right:'-50',
                        ease:Power2.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        opacity:0,
                        backgroundColor:'none',
                        margin:'0px 11px',
                        width:'50px',
                        height:'50px',
                        ease:Power2.easeInOut
                    });
                }
            }
        });

    }
		
}

//ROUNDED ANIMATION
function hslider_animation_rounded(animation_type){
	
	//VARIABLES
	var animation_duration = 1;
	var animation_delay = 0;
	var side = '';

    if(!mobile_touch_check){

        jQuery('.hslider_' + animation_type).children('.hslider_side_btn').on({
            mouseenter:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        left:'0',
                        width:240,
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        paddingLeft:'40px',
                        width:300,
                        ease:Strong.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        right:'0',
                        width:240,
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        paddingRight:'40px',
                        width:300,
                        ease:Strong.easeInOut
                    });
                }
            },
            mouseleave:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        width:50,
                        left:'-50',
                        ease:Power2.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        paddingLeft:'70px',
                        width:300,
                        ease:Strong.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner'), animation_duration, {
                        width:50,
                        right:'-50',
                        ease:Power2.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        paddingRight:'70px',
                        width:300,
                        ease:Strong.easeInOut
                    });
                }
            }
        });

    }
		
}

//DOUBLE FLIP ANIMATION
function hslider_animation_doubleflip(animation_type){
	
	var tl = new TimelineLite();

	//VARIABLES
	var animation_duration = 0.2;
	var animation_delay = 0;
	var side = '';
	
	//SET CURRENT POSITION
    if(!mobile_touch_check){

        jQuery('.hslider_' + animation_type).children('.hslider_side_btn').each(function(index, element){
            side = jQuery(this).attr('data-side');
            if(side == 'left'){
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image_wrap'), 0, {
                    opacity:0,
                    rotationY:90,
                    transformOrigin:"left",
                    left:-60,
                    ease:Strong.easeInOut
                });
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), 0, {
                    opacity:0,
                    rotationY:90,
                    transformOrigin:"left",
                    left:0,
                    ease:Strong.easeInOut
                });
            }else{
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image_wrap'), 0, {
                    opacity:0,
                    rotationY:-90,
                    transformOrigin:"right",
                    right:-60,
                    ease:Strong.easeInOut
                });
                TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), 0, {
                    opacity:0,
                    rotationY:-90,
                    transformOrigin:"right",
                    right:0,
                    ease:Strong.easeInOut
                });
            }
        });

        var tween1, tween2, tween3, tween4;
        var tl;

        jQuery('.hslider_' + animation_type).children('.hslider_side_btn').on({
            mouseenter:function(){
                tl = new TimelineLite();
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    tl.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image_wrap'), animation_duration, {
                        opacity:1,
                        left:0,
                        transformPerspective:100,
                        rotationY:0,
                        transformOrigin:"left",
                        ease:Strong.easeInOut
                    });
                    tl.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        opacity:1,
                        left:60,
                        transformPerspective:100,
                        rotationY:0,
                        transformOrigin:"left",
                        ease:Strong.easeInOut
                    });
                }else{
                    tl.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_image_wrap'), animation_duration, {
                        opacity:1,
                        right:0,
                        transformPerspective:100,
                        rotationY:0,
                        transformOrigin:"right",
                        ease:Strong.easeInOut
                    });
                    tl.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        opacity:1,
                        right:60,
                        transformPerspective:100,
                        rotationY:0,
                        transformOrigin:"right",
                        ease:Strong.easeInOut
                    });
                }
            },
            mouseleave:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    tl.reverse();
                }else{
                    tl.reverse();
                }
            }
        });

    }
		
}


//ROUNDED ANIMATION
function hslider_animation_bend(animation_type){
	
	//VARIABLES
	var animation_duration = 1;
	var animation_delay = 0;
	var side = '';

    if(!mobile_touch_check){

        jQuery('.hslider_' + animation_type).children('.hslider_side_btn').on({
            mouseenter:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        opacity:1,
                        paddingLeft:50,
                        ease:Power4.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_line'), animation_duration, {
                        opacity:0.5,
                        width:'100%',
                        ease:Strong.easeOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_count'), 1.5, {
                        opacity:1,
                        paddingLeft:50,
                        ease:Power4.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_icon'), animation_duration, {
                        opacity:1,
                        paddingLeft:10,
                        ease:Strong.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        opacity:1,
                        paddingRight:50,
                        ease:Power4.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_line'), animation_duration, {
                        opacity:0.5,
                        width:'100%',
                        ease:Strong.easeOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_count'), 1.5, {
                        opacity:1,
                        paddingRight:50,
                        ease:Power4.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_icon'), animation_duration, {
                        opacity:1,
                        marginRight:10,
                        ease:Strong.easeInOut
                    });
                }
            },
            mouseleave:function(){
                side = jQuery(this).attr('data-side');
                if(side == 'left'){
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        opacity:0,
                        paddingLeft:100,
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_line'), animation_duration, {
                        opacity:0,
                        width:'0',
                        ease:Strong.easeOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_count'), 1.5, {
                        opacity:0,
                        paddingLeft:100,
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_icon'), animation_duration, {
                        opacity:1,
                        paddingLeft:0,
                        ease:Strong.easeInOut
                    });
                }else{
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_label'), animation_duration, {
                        opacity:0,
                        paddingRight:100,
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_line'), animation_duration, {
                        opacity:0.5,
                        width:'0',
                        ease:Strong.easeOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_inner').children('.hslider_side_count'), 1.5, {
                        opacity:0,
                        paddingRight:100,
                        ease:Strong.easeInOut
                    });
                    TweenLite.to(jQuery(this).children('.hslider_side_icon'), animation_duration, {
                        opacity:1,
                        marginRight:0,
                        ease:Strong.easeInOut
                    });
                }
            }
        });

    }
		
}

function double(){
}

function run_simulation(status){
	
	if(status){
		
		var element = jQuery('.hslider_side_label');
		TweenMax.to(element, 3, {rotationY:-180, transformOrigin:"left top"})
		
	}
	
}