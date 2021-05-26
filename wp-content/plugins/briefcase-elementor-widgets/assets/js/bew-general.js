'use strict';

var bewgeneral;

(
	function() {

		bewgeneral = (
		function() {

				return {

					init: function() {

						this.general();
					}
				}
			}()
		);
	}
)( jQuery );

jQuery( document ).ready( function() {
	if (!jQuery( 'body' ).hasClass("elementor-editor-active")) {
		bewgeneral.init();
	}
} );

// Make sure you run this code under Elementor.
jQuery( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function() {
		if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
			bewgeneral.init();
		}
	});
} );
	
// General
(
	function( $ ) {

		var $body = $( 'body' );
						
		bewgeneral.general = function() {

			// Menu dropdown horizontal.	
			var menuHorizontal = function() {
				
				$('#menu-horizontal').click(function () {
				if ( $( '#menu-horizontal div' ).hasClass( "elementor-active" ) ) {
  
				$('#logo-menu').addClass('hide-logo');    
				} else {
				$('#logo-menu').removeClass('hide-logo'); 	
				}
				});
				
			};
			
			// Hide Title	
			var hideTitle = function() {
			
				//	Check if is a mobile view
				function viewport() {
					var e = window, a = 'inner';
					if (!('innerWidth' in window )) {
						a = 'client';
						e = document.documentElement || document.body;
					}
					return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
				}
				
				if (viewport().width  >= 767 ) {
				
					// Add title class to body after 40px
					$(window).bind( 'load scroll', function() {
						if ( $(window).scrollTop() > 40 ) {			
							$( '#title-page' ).addClass( 'hide-title-page' );
						} else {			
							$( '#title-page' ).removeClass( 'hide-title-page' );
						}
					});
				}				
				
			};
			
			// Hide Header	
			var hideHeader = function() {
			
				// Hide Header on on scroll down
				var didScroll;
				var lastScrollTop = 0;
				var delta = 5;
				var navbarHeight = $('#header-page').outerHeight();

				$(window).scroll(function(event){
					didScroll = true;
				});

				setInterval(function() {
					if (didScroll) {
						hasScrolled();
						didScroll = false;
					}
				}, 250);

				function hasScrolled() {
					var st = $(this).scrollTop();
					
					// Make sure they scroll more than delta
					if(Math.abs(lastScrollTop - st) <= delta)
						return;
					
					// If they scrolled down and are past the navbar, add class .nav-up.
					// This is necessary so you never see what is "behind" the navbar.
					if (st > lastScrollTop && st > navbarHeight){
						// Scroll Down
						if($(window).scrollTop() + $(window).height() > $(document).height()-90)  {
						$('#header-page').removeClass('nav-up').addClass('nav-down');
						} else {
						$('#header-page').removeClass('nav-down').addClass('nav-up');
						}	
					} else {
						// Scroll Up
						if(st + $(window).height() < $(document).height()) {
							$('#header-page').removeClass('nav-up').addClass('nav-down');
						}
					}
					
					lastScrollTop = st;
				}				
				
			};
		
			var events = function() {

				  menuHorizontal();
				  hideTitle();
				  hideHeader();
			};
				
			events();		
		};
	
})( jQuery );

