'use strict';

var bewmobilefirst;

(
	function() {

		bewmobilefirst = (
		function() {

				return {

					init: function() { 
						this.shop();
					}
				}
			}()
		);
	}
)( jQuery );

jQuery( document ).ready( function() {
	if (!jQuery( 'body' ).hasClass("elementor-editor-active")) {
		bewmobilefirst.init();
	}
} );


// Make sure you run this code under Elementor..
jQuery( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function() {
		if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
			bewmobilefirst.init();
		}
	});
} );

//Shop page

(function( $ ) {

	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();		

	bewmobilefirst.shop = function() {

		//	Check if Bew Mobile Firts Design is enabled
		if ( $('.bew-mobile-first-yes').length == 0 ) {			
			return;
		}
		
		//	Check if is a mobile view
		function viewport() {
			var e = window, a = 'inner';
			if (!('innerWidth' in window )) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
		}
				
		//	Add classes for content fold
		var $BmfdContainers = $('.bew-mobile-first-content-fold-yes');
		
			if ( $BmfdContainers != null ) {
				
				$BmfdContainers.each(function() {
					$(this).addClass('bmfd__fold fold'); 
					$(".elementor-element.elementor-widget-heading:first-of-type" , this).addClass('heading--add fold__toggle');
					$(".elementor-element" , this).not(".elementor-widget-heading:first-of-type").not(".elementor-column").addClass('fold__content'); 
					console.log("hola");
				} );
				
			}
		
		//	Add classes for ripple effect
		var $BmfdRipple = $('.bew-mobile-first-ripple-yes');
		
			if ( $BmfdRipple != null ) {
				
				$BmfdRipple.each(function() {
					//	Add ripple to elementor button
					$('.elementor-button' , this).attr('anim', 'ripple');
					
					//	Add ripple to mobile menu
					$('.bew-menu-icon-items li a' , this).attr('anim', 'ripple');
					
					//	Add ripple to briefcasewp buttons
					//$('#bew-cart .add_to_cart_button' , this).attr('anim', 'ripple');
					//$('.bew-woo-grid .woocommerce-pagination .page-numbers' , this).attr('anim', 'ripple');
					
					function isiPhone(){
						return (
							(navigator.platform.indexOf("iPhone") != -1) ||
							(navigator.platform.indexOf("iPod") != -1)
						);
					}
					if(isiPhone()){					  
					   // Add ripple effect Iphone
					$('.elementor-button' , this).addClass('ripple');
					//	Add ripple to mobile menu
					$('.bew-menu-icon-items li a' , this).addClass('ripple');
					
					}
				} );
			}
		
		//	Add classes for Bew Swipe
		var $BmfdSwipe = $('.bew-mobile-first-swipe-yes');
		var $WooGridSwipe = $('.bew-woo-grid-swiper');
		var $BmfdSwipeSection = $('.bew-mobile-first-swipe-yes.elementor-section');
		
		
			if ( ($BmfdSwipe != null || $WooGridSwipe != null)  && viewport().width  <= 767 && !$( 'body' ).hasClass("elementor-editor-active")    ) {
									
				$BmfdSwipeSection.each(function() {
					
					var aa = $(this);
					var bb = $('.bew-woo-grid', this).length;
					var cc = $('.elementor-widget-bew-categories', this).length;
					
					//	Add swipe to elementor section
					if($('.bew-woo-grid', this).length == 0 && $('.elementor-widget-bew-categories', this).length == 0){
						
						$('> div', this).addClass('bew-swiper-container');
						$('> div > div', this).addClass('swiper-wrapper');
						$('.swiper-wrapper > div', this).addClass('swiper-slide');
					}
				} );
								
				$BmfdSwipe.each(function() {
					
					//	Add swipe to bew woo grid
					if($('.bew-woo-grid', this) != null ){
						$('.bew-woo-grid', this).addClass('bew-swiper-container').removeClass('bew-woo-grid');
						$('.bew-grid', this).addClass('swiper-wrapper').removeClass('bew-grid bew-products');
						$('.swiper-wrapper > div', this).addClass('swiper-slide');
					}

					//	Add swipe to bew categories block
					if($('.elementor-widget-bew-categories', this) != null ){
						
						$('.block-column-1', this).contents().unwrap();
						$('.block-column-2', this).contents().unwrap();
						
						$('.elementor-widget-bew-categories .bew-container', this).removeClass().addClass('bew-swiper-container');
						$('.bew-swiper-container .bew-row', this).removeClass().addClass('swiper-wrapper');
						$('.swiper-wrapper .cat-block', this).removeClass('cat-block').addClass('swiper-slide');
					}
					
				} );

				$WooGridSwipe.each(function() {
					
					//	Add swipe to bew woo grid					
						$(this).addClass('bew-swiper-container').removeClass('bew-woo-grid-swiper');
				} );
				
						
				
			}
		
		var foldElements = function() {
            var $foldContainers = $('.fold');
            if ($foldContainers.length === 0) {
                return 0;
            }
            var $foldToggle = $foldContainers.find('.fold__toggle');
            $foldToggle.click(function(e) {
                var $foldElement = $(e.target).closest('.fold')
                $foldElement.toggleClass('open');
				
            });
        };
		
		var IconMenu = function() {
			$('.bew-menu-icon-items li a').filter(function(){
			  return this.href === location.href;
			}).addClass('active');
		};		

		var Ripple = function() {
			
			if (viewport().width  <= 767 ) {
								
				//	Add ripple effect					
				[].map.call(document.querySelectorAll('[anim="ripple"]'), el=> {
					el.addEventListener('click',e => {
						e = e.touches ? e.touches[0] : e;
						const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
						el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop; 
						el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
					})
				})
							
			}
		
		};
		
		var BewSwiper = function() {
			//initialize swiper when document ready			
			console.log(viewport().width);
			if (viewport().width  <= 767 ) {
			console.log("holaaa");	
			var mySwiper = new Swiper ('.bew-swiper-container', {
				// Optional parameters
				slidesPerView: 'auto',
				spaceBetween: 10,				
				freeMode: true
				})			
			}
		};	
		
		var BewSwiper2 = function() {
			//initialize swiper when document ready			
			var swiper = new Swiper('.swiper-container', {
			  slidesPerView: 4,
			  spaceBetween: 30,
			  centeredSlides: true,
			  loop: true,
			  navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			  },
			  
			})
			
		};
		
		
		var BewmenuActive = function() {
			var url = window.location.pathname,
			urlRegExp = new RegExp(url == '/' ? window.location.origin + '/?$' : url.replace(/\/$/,'')); 
				$('.bew-menu-icon-items li a').each(function () {
					if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
						$(this).addClass('active2');
					}
				});										
				};	
		
		var events = function() {

			foldElements();
			IconMenu();
			Ripple();
			BewSwiper();
			//BewSwiper2();
			//BewmenuActive();
		};
		
		events();	
		
	};
})( jQuery );

'use strict';
var bewscroll;
(
	function() {
		bewscroll = (
		function() {
				return {
					init: function() { 
						this.section();
					}
				}
			}()
		);
	}
)( jQuery );

jQuery( document ).ready( function() {
	if (!jQuery( 'body' ).hasClass("elementor-editor-active")) {
		bewscroll.init();
	}
} );


//Section

(function( $ ) {

	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();		

	bewscroll.section = function() {
		
		//	Check if is a mobile view
		function viewport() {
			var e = window, a = 'inner';
			if (!('innerWidth' in window )) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
		}
		
		//	Fade-in-on-load Title
		if ($(".fade-in-on-load").length > 0 ) {
		  $( document ).ready( function() {   
			$(".fade-in-on-load").addClass("show-fade-in-on-load"); 

		  });
		}
	
		if (viewport().width  <= 690 ) {		
			return;
		}
		
		console.log(viewport().width);
				
		//	Check if Bew Scroll is enabled
		var $BsEnabled = $('.bew-scroll-yes');	
		if ( ! $BsEnabled.length ) {
			return;
		}
					
		//	Add classes for section change bg
		var $BsBgchange = $('.bew-scroll-background-yes');		
			if ( $BsBgchange != null ) {
				
				var html = '';				
				html +=	 '<div class="bewbg">';
				html +=  '<div class="bewbg-0"></div>';	
				
				$BsBgchange.each(function( index ) {					
					index += 1					
					var newClass = "bew-section-background";
					var bewbg = "bewbg-" + index;
					
					html += '<div class="' + bewbg + '"></div>';					
					$(this).addClass(newClass);
					
					var data_settings = $(this).data('settings');
					
					if ( typeof data_settings != 'undefined' ) {
						var background = data_settings["bew_section_bg_color"];
						
						$(this).attr('data-background', background); // sets 
					}
					 
				} );							
				html +=		'</div>';
				
				$BsBgchange.closest( ".elementor-section-wrap" ).append(html);  
			}
			
		var BsBgchange = function() {
						
			  var wHeight = $(window).innerHeight();
			  var siblings = $('.bew-scroll-background-yes');			
			  var perset = {};			  
			  var scroll_pos = 0;			  
			  var sumHeight = $('.bew-scroll-background-yes:first').offset().top;
			  var firtsposition = sumHeight;
			  var lastposition = $('.bew-scroll-background-yes:last').offset().top + $('.bew-scroll-background-yes:last').outerHeight(true); 
			  
				siblings.each(function() {
					
					if($(this).data('background')){
					  perset[sumHeight] =  $(this).data('background');				  
					}
					else {
					  perset[sumHeight] =  0;
					}										
					sumHeight= sumHeight + $(this).outerHeight(true);					
				} );					
			  processScroll();

			  function lessThan(nums, key){
				if(nums == null || nums.length == 0 || key ==0 ) 
				  return 0;
				var low = 0;
				var high = nums.length -1;
				while(low <= high){
					var mid = parseInt((low + high) >> 1);
					if(key <= nums[mid]){
						high = mid - 1;
					}else {
						low = mid +1;
					}
				}
				return high;
			  }			  

			  function processScroll() { 
				scroll_pos = $(this).scrollTop();				
				if (scroll_pos == null && firtsposition == 0){
					scroll_pos = 0;
				}
				if (scroll_pos <= firtsposition || scroll_pos >= lastposition ){
					$(".bewbg").css('background-color',"");
				}else{
					var presetHeights = Object.keys(perset);				
					var x = lessThan(presetHeights,scroll_pos);
					var bgColor = perset[presetHeights[x]];
					
					if(bgColor) {
					  $(".bewbg").css('background-color',bgColor);
					}						
				}
			  }
			  $(document).scroll(processScroll);
		};		

		var events = function() {
			BsBgchange();
		};		
		events();
	};	
})( jQuery );

