'use strict';

var woosingle;

(
	function() {

		woosingle = (
		function() {

				return {

					init: function() { 
						this.single();
					}
				}
			}()
		);
	}
)( jQuery );

jQuery( document ).ready( function() {
	if (!jQuery( 'body' ).hasClass("elementor-editor-active")) {
		woosingle.init();
	}
} );

// Make sure you run this code under Elementor.
jQuery( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/bew_dynamic.default', function() {
		if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
			woosingle.init();
		}
	});
} );

// Single product page
(function( $ ) {

	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();	
		
	woosingle.single = function() {

		var $bewWooSingle = $( '.product.type-product' ),
			$elementoreditorproduct = $( '.elementor-location-single' ),
			$builderElementor = $( '.woocommerce-builder-elementor' );
				
		if ( ! $bewWooSingle.length && ! $elementoreditorproduct.length ) {
			return;
		}
			
		var bewgallery = function() {
			
			if ( (! document.body.classList.contains( 'single-product' ) && document.querySelector( '.single-product' ) === null) &&  ! document.body.classList.contains( 'elementor_library-template-default' ) ) {
				return;
			}
			
			console.log($( ".woocommerce-product-gallery__image" ).length );
			
			if ( $( ".woocommerce-product-gallery__image" ).length == 1	) {
				return;
			}
			
			var _productGallery   = document.querySelector( '.woocommerce-product-gallery' ),
				_productGalleryDefault   = document.querySelector( '.bew-gallery-images' ),
				_mainImageSlider  = document.querySelector( '.woocommerce-product-gallery__slider' ),
				_thumbnailsSlider = document.querySelector( '.thumbnails-slider' ),
				_product_gallery_layout = document.querySelector( '.bew-woo-gallery-view-sticky' ); 

			if ( _productGallery === null || _productGalleryDefault === null) {
				return;
			}
				
			var mainImageSlider = function() {
				
				if ( _product_gallery_layout != null) {				
					return;
				}	
				
				

				if ( $( _mainImageSlider ).attr( 'data-carousel' ) == null ) {
					$( _mainImageSlider ).css( {
						'opacity'   : 1,
						'visibility': 'visible'
					} );
					return;
				}

				if ( _productGallery.classList.contains( 'only-featured-image' ) ) {

					var _zoomTarget = _mainImageSlider.querySelector( '.woocommerce-product-gallery__image' );
					$( _zoomTarget ).trigger( 'zoom.destroy' );

					return;
				}

				var settings = JSON.parse( _mainImageSlider.getAttribute( 'data-carousel' ) );

				$( _mainImageSlider ).not('.slick-initialized').slick( settings );
				
				$( _mainImageSlider ).on('afterChange', function(event, slick, currentSlide, nextSlide){				  
				  if($('.slick-current.bew-video-gallery').length) {
					  $('.slick-dots').addClass("bew-hide"); 
					   $('.lightbox-btn').addClass("bew-hide"); 
				  }else {
					  $('.slick-dots').removeClass("bew-hide"); 
					   $('.lightbox-btn').removeClass("bew-hide");
					  
				  };        
				});
			};

			var mainImageZoom = function() {

				if ( _productGallery.classList.contains( 'only-featured-image' ) ) {
					//return;
				}

				if ( _productGallery.classList.contains( 'product-zoom-on' ) || _productGalleryDefault.classList.contains( 'product-zoom-on' ) ) {

					var _zoomTarget  = $( '.woocommerce-product-gallery__image' ),
						_imageToZoom = _zoomTarget.find( 'img' );

					// But only zoom if the img is larger than its container.
					if ( _imageToZoom.attr( 'data-large_image_width' ) > _productGallery.offsetWidth ) {
						_zoomTarget.trigger( 'zoom.destroy' );
						_zoomTarget.zoom( {
							touch: false
						} );
					}
				}
			};

			var thumbnailsSlider = function() {

				if ( _product_gallery_layout != null ) {
					return;
				}
				
				if ( ! _thumbnailsSlider ) {
					return;
				}

				var settings = JSON.parse( _thumbnailsSlider.getAttribute( 'data-carousel' ) );

				settings.responsive = [{
					breakpoint: 768,
					settings  : {
						slidesToShow   : 4,
						vertical       : false,
						verticalSwiping: false,
						arrows         : false,
						dots           : true,
					},
				}];

				$( _thumbnailsSlider ).not('.slick-initialized').slick( settings );							

				[].slice.call( _thumbnailsSlider.querySelectorAll( 'a.slick-slide' ) ).forEach( function( _slide ) {
					_slide.addEventListener( 'click', function( e ) {
						e.preventDefault();
					} );
				} );
			};

			var lightBoxHandler = function() {

				$( _productGallery ).off( 'click', '.woocommerce-product-gallery__image a' );

				$( _productGallery ).on( 'click', '.lightbox-btn, .woocommerce-product-gallery__image a', function( e ) {

					e.preventDefault();

					openPhotoSwipe( getImageIndex( e ) );
				} );
			}

			var variationHandler = function() {

				var $form = $( 'form.variations_form' );
				
				if ( _product_gallery_layout != null ) {
					return;
				}
				
				$form.on( 'show_variation', function( e, variation ) {

					if ( variation && variation.image && variation.image.src && variation.image.src.length > 1 ) {

						var $slide            = $( _mainImageSlider )
								.find( '.woocommerce-product-gallery__image[data-thumb="' + variation.image.thumb_src + '"]:not(.slick-cloned)' ),
							index             = $slide.index( '.woocommerce-product-gallery__image:not(.slick-cloned)' ),
							$product_img_wrap = $( _productGallery )
								.find( '.woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder' )
								.eq( 0 ),
							$product_img      = $( _productGallery.querySelector( '.wp-post-image' ) ),
							$product_link     = $product_img_wrap.find( 'a' ).eq( 0 );
												
							
							// set image to variation
							if ( $( _mainImageSlider ).hasClass( 'slick-initialized' ) ) {
								$( _mainImageSlider ).slick( 'slickGoTo', parseInt( 0 ) );							
							}

							// change the main image
							$product_img.wc_set_variation_attr( 'src', variation.image.src );
							$product_img.wc_set_variation_attr( 'height', variation.image.src_h );
							$product_img.wc_set_variation_attr( 'width', variation.image.src_w );
							$product_img.wc_set_variation_attr( 'srcset', variation.image.srcset );
							$product_img.wc_set_variation_attr( 'sizes', variation.image.sizes );
							$product_img.wc_set_variation_attr( 'title', variation.image.title );
							$product_img.wc_set_variation_attr( 'alt', variation.image.alt );
							$product_img.wc_set_variation_attr( 'data-src', variation.image.full_src );
							$product_img.wc_set_variation_attr( 'data-large_image', variation.image.full_src );
							$product_img.wc_set_variation_attr( 'data-large_image_width', variation.image.full_src_w );
							$product_img.wc_set_variation_attr( 'data-large_image_height', variation.image.full_src_h );
							$product_img_wrap.wc_set_variation_attr( 'data-thumb', variation.image.thumb_src );
							$product_link.wc_set_variation_attr( 'href', variation.image.full_src );
							
							mainImageZoom();
						
					}
				} );

				$form.on( 'reset_data', function() {

					var $product_img_wrap = $( _productGallery )
							.find( '.woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder' )
							.eq( 0 ),
						$product_img      = $( _productGallery.querySelector( '.wp-post-image' ) ),
						$product_link     = $product_img_wrap.find( 'a' ).eq( 0 ),
						variations        = $( '.variations' ).find( 'tr' ).length,
						$selects          = $form.find( 'select' ),
						chosen_count      = 0;

					$selects.each( function() {

						var value = $( this ).val() || '';

						if ( value.length ) {
							chosen_count ++;
						}
					} );

					if ( variations > 1 && chosen_count == variations ) {
						$( _mainImageSlider ).not('.slick-initialized').slick( 'slickGoTo', 0 );
					}

					// reset image
					$product_img.wc_reset_variation_attr( 'src' );
					$product_img.wc_reset_variation_attr( 'width' );
					$product_img.wc_reset_variation_attr( 'height' );
					$product_img.wc_reset_variation_attr( 'srcset' );
					$product_img.wc_reset_variation_attr( 'sizes' );
					$product_img.wc_reset_variation_attr( 'title' );
					$product_img.wc_reset_variation_attr( 'alt' );
					$product_img.wc_reset_variation_attr( 'data-src' );
					$product_img.wc_reset_variation_attr( 'data-large_image' );
					$product_img.wc_reset_variation_attr( 'data-large_image_width' );
					$product_img.wc_reset_variation_attr( 'data-large_image_height' );
					$product_img_wrap.wc_reset_variation_attr( 'data-thumb' );
					$product_link.wc_reset_variation_attr( 'href' );
					
					mainImageZoom();
					
				} );
			}

			var openPhotoSwipe = function( index ) {

				var pswpElement = document.querySelectorAll( '.pswp' )[0];

				// build item array
				var items = getImages();

				if ( $( 'body' ).hasClass( 'rtl' ) ) {
					index = items.length - index - 1;
					items = items.reverse();
				}

				var options = {
					history              : false,
					showHideOpacity      : true,
					hideAnimationDuration: 333,
					showAnimationDuration: 333,
					index                : index
				};

				var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options );
				gallery.init();
			};

			var getImages = function() {

				var items = [];

				[].slice.call( _mainImageSlider.querySelectorAll( 'a > img' ) )
				  .forEach( function( _img ) {

					  var src    = _img.getAttribute( 'data-large_image' ),
						  width  = _img.getAttribute( 'data-large_image_width' ),
						  height = _img.getAttribute( 'data-large_image_height' );

					  if ( ! $( _img ).closest( '.woocommerce-product-gallery__image' ).hasClass( 'slick-cloned' ) ) {

						  items.push( {
							  src  : src,
							  w    : width,
							  h    : height,
							  title: false
						  } );
					  }

				  } );

				return items;
			};

			var getImageIndex = function( e ) {

				if ( _mainImageSlider.classList.contains( 'slick-slider' ) ) {
					return parseInt( _mainImageSlider.querySelector( '.slick-current' )
													 .getAttribute( 'data-slick-index' ) );
				} else {
					return $( e.currentTarget ).parent().index();
				}
			};

			var scrollToReviews = function() {

				if ( ! $( '#reviews' ).length ) {
					return;
				}

				$body.on( 'click', '.woocommerce-review-link', function( e ) {

					e.preventDefault();

					var scrollTo = $( '#reviews' ).offset().top;
					
					$( 'html, body' ).animate( {
						scrollTop: scrollTo,
					}, 600 );
				} );
			};

			var upSellsandRelated = function() {

				if ( $( '.upsells .products' ).find( '.product' ).length < 4 && $( '.related .products' )
																					.find( '.product' ).length < 4 ) {
					return;
				}

				$( '.upsells .products, .related .products' ).slick( {
					slidesToShow  : 4,
					slidesToScroll: 4,
					dots          : true,
					responsive    : [{
						breakpoint: 992,
						settings  : {
							slidesToShow  : 3,
							slidesToScroll: 3,
						},
					}, {
						breakpoint: 768,
						settings  : {
							slidesToShow  : 2,
							slidesToScroll: 2,
						},
					}, {
						breakpoint: 544,
						settings  : {
							dots          : false,
							adaptiveHeight: true,
							centerPadding : '40px',
							centerMode    : true,
							slidesToShow  : 1,
							slidesToScroll: 1,
						},
					},],
				} );
			};
			
			//video gallery.		
			var videoGallery = function() {	
				$(window).load(function(){
					if($('.woocommerce-product-gallery__wrapper').length){
						var height = $('.woocommerce-product-gallery__wrapper').width();					
						$('iframe').attr('height',height);					
					}else{
						$('iframe').attr('height','500px');
					}
				});
				
			};

			mainImageSlider();
			mainImageZoom();
			thumbnailsSlider();
			lightBoxHandler();
			variationHandler();
			upSellsandRelated();
			scrollToReviews();
			videoGallery();	

			$window.scroll( function() {

				var viewportHeight = $( window ).height();

				$( _productGallery ).find( '.thumbnails > a' ).each( function() {
					var offsetThumbnails = $( this ).offset().top;

					if ( $window.scrollTop() > offsetThumbnails - viewportHeight + 20 ) {

						$( this ).addClass( 'animate-images' );
					}

				} );
			} );			
		
		};
		
								
		//Tabs.		
		var tabs = function() {	
				
			var bewtabs = $( '.bew-woo-tabs' );
				
				bewtabs.each( function() {
									
				$('.wc-tab:first', this).show();
					
				} );

		};
		
		// Woo quantity buttons
		var bewWooQuantityButtons = function( $quantitySelector ) {
			
			var $quantityBoxes,
				$cart = $( '.woocommerce div.product form.cart' );

			if ( ! $quantitySelector ) {
				$quantitySelector = '.qty';
			}

			$quantityBoxes = $( '#bew-cart div.quantity:not(.buttons_added), #bew-cart td.quantity:not(.buttons_added) , #top-avm div.quantity:not(.buttons_added)' ).find( $quantitySelector );	
			
			if ( $quantityBoxes && 'date' !== $quantityBoxes.prop( 'type' ) && 'hidden' !== $quantityBoxes.prop( 'type' ) && $('.bs-quantity').length == 0 ) {

				// Add plus and minus icons
				$quantityBoxes.parent().addClass( 'buttons_added' ).prepend('<a href="javascript:void(0)" class="minus">-</a>');
				$quantityBoxes.after('<a href="javascript:void(0)" class="plus">+</a>');

				// Target quantity inputs on product pages
				$( 'input' + $quantitySelector + ':not(.product-quantity input' + $quantitySelector + ')' ).each( function() {
					var $min = parseFloat( $( this ).attr( 'min' ) );

					if ( $min && $min > 0 && parseFloat( $( this ).val() ) < $min ) {
						$( this ).val( $min );
					}
				});

				// Quantity input
				if ( $( 'body' ).hasClass( 'single-product' )
					&& ! $cart.hasClass( 'grouped_form' ) ) {
					var $quantityInput = $( '.woocommerce form input[type=number].qty' );
					$quantityInput.on( 'keyup', function() { 
						var qty_val = $( this ).val();
						$quantityInput.val( qty_val ); 
					});
				}

				$( '.plus, .minus' ).unbind( 'click' );

				$( 'form.cart .plus, form.cart .minus' ).on( 'click', function() {

					// Quantity
					var $quantityBox;

					// If floating bar is enabled
					if ( $( 'body' ).hasClass( 'single-product' )
						&& $( '#top-avm' ).hasClass( 'show-qty' )
						&& ! $cart.hasClass( 'grouped_form' )
						&& ! $cart.hasClass( 'cart_group' ) ) {
						$quantityBox = $( 'form.cart .plus, form.cart .minus' ).closest( '.quantity' ).find( $quantitySelector );
					} else {
						$quantityBox = $( this ).closest( '.quantity' ).find( $quantitySelector );
					}

					// Get values
					var $currentQuantity = parseFloat( $quantityBox.val() ),
						$maxQuantity     = parseFloat( $quantityBox.attr( 'max' ) ),
						$minQuantity     = parseFloat( $quantityBox.attr( 'min' ) ),
						$step            = $quantityBox.attr( 'step' );

					// Fallback default values
					if ( ! $currentQuantity || '' === $currentQuantity  || 'NaN' === $currentQuantity ) {
						$currentQuantity = 0;
					}
					if ( '' === $maxQuantity || 'NaN' === $maxQuantity ) {
						$maxQuantity = '';
					}

					if ( '' === $minQuantity || 'NaN' === $minQuantity ) {
						$minQuantity = 0;
					}
					if ( 'any' === $step || '' === $step  || undefined === $step || 'NaN' === parseFloat( $step )  ) {
						$step = 1;
					}

					// Change the value
					if ( $( this ).is( '.plus' ) ) {

						if ( $maxQuantity && ( $maxQuantity == $currentQuantity || $currentQuantity > $maxQuantity ) ) {
							$quantityBox.val( $maxQuantity );
						} else {
							$quantityBox.val( $currentQuantity + parseFloat( $step ) );
						}

					} else {

						if ( $minQuantity && ( $minQuantity == $currentQuantity || $currentQuantity < $minQuantity ) ) {
							$quantityBox.val( $minQuantity );
						} else if ( $currentQuantity > 0 ) {
							$quantityBox.val( $currentQuantity - parseFloat( $step ) );
						}

					}

					// Trigger change event
					$quantityBox.trigger( 'change' );
					
				} );
			}			

		};
		
		// Bew Allways visible mode
		var bewAvm = function() {
			
			// Add header class to body after pass add to cart buttom	
			if ($('#bew-cart').length) {
				var showmeTop = $('#bew-cart').offset().top;
			}
			
			if ( $( '#wpadminbar' ).length ) {
					var adminbar = $( '#wpadminbar' ).height();
					$( '#top-avm' ).css("top", adminbar);
			}
			
			$(window).bind( 'load scroll', function() {

				if ( $(window).scrollTop() > showmeTop + 66 ) {
					$( '#top-avm' ).addClass( 'show' );
				} else {
					$( '#top-avm' ).removeClass( 'show' );
				}
			});
			
		};
			
				
		// Bew product Add to cart
		var bewaddtocartAjax = function() {
			
			console.log("from ajax 1dc");
					
			if ( typeof bew_add_to_cart_ajax === 'undefined'
				|| bew_add_to_cart_ajax.product_type == 'grouped' 
				|| bew_add_to_cart_ajax.ajax_active == '') {
				return false;
			}
			
			console.log("from ajax 2dc");
			
			/**
			 * AddToCartHandler class.
			 */
			var bewAddToCartHandler = function() {
				$( document.body )
					.on( 'click', '.product:not(.product-type-external) .single_add_to_cart_button:not(.disabled)', this.onAddToCart )
					.on( 'added_to_cart', this.updateButton );
			};

			/**
			 * Handle the add to cart event.
			 */
			bewAddToCartHandler.prototype.onAddToCart = function( e ) {
				e.preventDefault();

				var button 					= $( this ),
					product_id 				= $( this ).val(),
					variation_id 			= $('input[name="variation_id"]').val(),
					quantity 				= $('input[name="quantity"]').val(),
					variation_form 			= $( this ).closest( '.variations_form' ),
					variations 				= variation_form.find( 'select[name^=attribute]' ),
					item 					= {};
				
							
				button.removeClass( 'added' );
				button.addClass( 'loading' );

				if ( ! variations.length ) {
					variations = variation_form.find( '[name^=attribute]:checked' );
				}

				if ( ! variations.length ) {
					variations = variation_form.find( 'input[name^=attribute]' );
				}

				variations.each( function() {
					var $this 			= $( this ),
						attributeName 	= $this.attr( 'name' ),
						attributevalue 	= $this.val(),
						index,
						attributeTaxName;

					$this.removeClass( 'error' );

					if ( attributevalue.length === 0 ) {
						index = attributeName.lastIndexOf( '_' );
						attributeTaxName = attributeName.substring( index + 1 );
						$this.addClass( 'required error' ).before( 'Please select ' + attributeTaxName + '' );
					} else {
						item[attributeName] = attributevalue;
					}
				} );
							
				// Ajax action.
				if ( variation_id != null ) {
					
					product_id = $('input[name="product_id"]').val(),
					
					$.ajax ({
						url: bew_add_to_cart_ajax.ajax_url,
						type: 'POST',
						data : {
							action : 'bew_add_cart_single_product',
							product_id : product_id,
							variation_id: variation_id,
							variation: item,
							quantity: quantity
						},

						success:function(results) {
							
							console.log("paso");
							
							$( document.body ).trigger( 'wc_fragment_refresh' );
							$( document.body ).trigger( 'added_to_cart', [ results.fragments, results.cart_hash, button ] );

							// Redirect to cart option
							if ( bew_add_to_cart_ajax.cart_redirect_after_add === 'yes' ) {
								window.location = bew_add_to_cart_ajax.cart_url;
								return;
							}
						}
					});
				} else {
					$.ajax ({
						url: bew_add_to_cart_ajax.ajax_url,  
						type: 'POST',
						data : {
							action : 'bew_add_cart_single_product',
							product_id : product_id,
							quantity: quantity
						},

						success:function(results) {
							$( document.body ).trigger( 'wc_fragment_refresh' );
							$( document.body ).trigger( 'added_to_cart', [ results.fragments, results.cart_hash, button ] );

							// Redirect to cart option
							if ( wc_add_to_cart_params.cart_redirect_after_add === 'yes' ) {
								window.location = wc_add_to_cart_params.cart_url;
								return;
							}
						}
					});
				}
			};

			/**
			 * Update cart page elements after add to cart events.
			 */
			bewAddToCartHandler.prototype.updateButton = function( e, fragments, cart_hash, $button ) {
				$button = typeof $button === 'undefined' ? false : $button;

				if ( $button ) {
					$button.removeClass( 'loading' );
					$button.addClass( 'added' );

					// View cart text.
					if ( ! bew_add_to_cart_ajax.is_cart && $button.parent().find( '.added_to_cart' ).length === 0 ) {
						$button.after( ' <a href="' + bew_add_to_cart_ajax.cart_url + '" class="added_to_cart wc-forward" title="' +
							bew_add_to_cart_ajax.view_cart + '">' + bew_add_to_cart_ajax.view_cart + '</a>' );
					}
				}
				
				// Woo display cart
				if ( bew_add_to_cart_ajax.opencart_active == "active" ) {
					$( 'body' ).addClass( 'menu-canvas-enabled' );
					$( '.bew-mini-cart-canvas' ).addClass( 'menucart--open' );
					$( '.drawer__btn-close' ).removeClass( 'btn--hidden' );		
				}
			};

			/**
			 * Init owpAddToCartHandler.
			 */
			new bewAddToCartHandler();	
				
		};
		
		// Woo Slider Single
		var woosliderSingle = function( $context ) {
			
			if (!$( 'body' ).hasClass("elementor-editor-active")) {
				return;
			}
			
			var $carousel = $( '.bew-product-entry-slider', $context ),
				$bewimage = $( '.bew-product-image');

			// If is active slider style
			if ( $carousel.hasClass( 'woo-entry-image' ) ) {
				$('body').addClass( 'bew-slider-active' );
			}
			
			if ( $( '.bew-slider-image').hasClass( 'thumbnails-vertical' ) ) {
				$('body').addClass( 'bew-slider-thumbnails-vertical' );
			} 

			if ( !$('body').hasClass( 'bew-slider-active' ) || $('.bew-woo-grid-slider .products').hasClass( 'bew-products-slider'))  {
				return;
			}

			// If RTL
			if ( $( 'body' ).hasClass( 'rtl' ) ) {
				var rtl = true;
			} else {
				var rtl = false;
			}

			// Return autoplay to false if woo slider
			if ( $carousel.hasClass( 'woo-entry-image' ) ) {
				var autoplay = false;
			} else {
				var autoplay = true;
			}

			// Slide speed
			var speed = 7000;
			
			if ( $('.bew-product-image-type-slider-image').hasClass( 'bew-slider-thumbnail-yes' ) && $('.bew-thumbnails-slider').length) {
				
				// Thumbnails
				var $thumbnailscarousel = $( '.bew-thumbnails-slider');
				var s1 = JSON.parse($( '.bew-thumbnails-slider' ).attr( "data-carousel" ) );		
				var s2 = { asNavFor: '.bew-product-entry-slider' };
							
				var settings = JSON.parse(JSON.stringify($.extend(false,{},s1,s2)));

				// Gallery slider
				$carousel.imagesLoaded( function() {
					$carousel.not('.slick-initialized').slick( {
						autoplay: autoplay,
						autoplaySpeed: speed,
						prevArrow: '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>',
						nextArrow: '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>',
						rtl: rtl,
						asNavFor: '.bew-thumbnails-slider'
					} );
					
					$thumbnailscarousel.not('.slick-initialized').slick(settings);
				} );
			
			} else {
					
					// Slider with no thumbnails
					$carousel.imagesLoaded( function() {
						$carousel.not('.slick-initialized').slick( {
							autoplay: autoplay,
							autoplaySpeed: speed,
							prevArrow: '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>',
							nextArrow: '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>',
							rtl: rtl,
						} );
					} );
					
			}			
			
		};
			
		var events = function() {
			
			  bewgallery();
			  bewWooQuantityButtons();
			  bewAvm();
			  bewaddtocartAjax();
			  woosliderSingle();
			  tabs();
		};
			
		events();		
	};	
		
})( jQuery );


( function( $ ) {
	var bewelementoreditor = function( $scope, $ ) {
		
		if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
					
			// Bew product Add to cart hover on briefcasewp shop block
			var bewaddtocart = function() {
						
				// Product Add to cart hidde icon		
				var buttom_selectors = $('#bew-cart a');
				var preview = $('.elementor-editor-active').length;
						
				if ( preview  == 0){
					buttom_selectors.on('click', function(){
						buttom_selectors.removeClass('hidde');
						$(this).addClass('hidde');				
					});
				}
				
				// Product Add to cart	overlay image		
				$('.bew-product-image').hover(function(e) {				
					if(this.id){
						$('#bew-cart.hover-buttom.' + this.id)[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('show-add-to-cart'); 	
					}else {
						$('.' + $(this).attr('class').split(' ')[2])[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('show-add-to-cart'); 	
					}				
				});	
				
				// Show variation image on overlay swatches	
				$('.variations_form').hover(function(e) {
				
					var product_id = $(this).data('product_id');				
					$('#bew-image-' + product_id)[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('show-variation-image'); 	
								
				});
			
			};		
			
			// Bew Product Gallery
			var bewgallery = function() {
			 
				var $maincarousel = $scope.find( '.woocommerce-product-gallery__slider' ).eq(0),
					$thumbnailscarousel = $scope.find( '.thumbnails-slider' ).eq(0);
				
				if (!$('body').hasClass('elementor-editor-active')) {
					return;
				}
				
				if ( $maincarousel === null ) {
					return;
				}
						
				var main = $('.woocommerce-product-gallery__slider'),
					data_main_settings = main.data('carousel');
					
				if( typeof data_main_settings != 'undefined' && data_main_settings) {	
				var 	data_infinite = data_main_settings["infinite"];
				}
				
				var thumbnails = $('.thumbnails-slider'),
					data_thumbnails_settings = thumbnails.data('carousel');
					
				if( typeof data_thumbnails_settings != 'undefined' && data_thumbnails_settings) {	
				var	data_infinite_th = data_thumbnails_settings["infinite"];
				}	
				
				$maincarousel.slick({			
					dots: true,
					arrows: true,
					infinite: data_infinite,
					asNavFor: '.thumbnails-slider'
				} );
				
				$thumbnailscarousel.slick({			
					focusOnSelect:true,
					variableWidth:true,	
					slidesToShow: 3, 
					infinite: data_infinite_th,
					asNavFor: '.woocommerce-product-gallery__slider'  
				});
				
			};		
				
			// Bew Tabs
			var bewtabs = function() {			
		
				var bewtabs = $( '.bew-woo-tabs' );
					
				bewtabs.each( function() {		
					$('.wc-tabs li:first' , this).addClass('active');
					
					$( '.wc-tab, .woocommerce-tabs .panel:not(.panel .panel)' , this).hide();
					$('.wc-tab:first', this).show();
				
				} );
				
			};		
			
			// Bew Star ratings for comments
			var bewratings = function() {				
	
				if ( $( '.comment-form-rating p' ).hasClass( 'stars' ) ) {
				}else{	
					$( '#rating' ).hide().before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );
				}
				
			};		
			
			// Zoom
			var bewzoom = function() {	
			
				var _productGallery   = document.querySelector( '.woocommerce-product-gallery' ),
					_productGalleryDefault   = document.querySelector( '.bew-gallery-images' );
					
				if ( _productGallery === null || _productGalleryDefault  === null ) {
					return;
				}
						
				if ( _productGallery.classList.contains( 'product-zoom-on' ) || _productGalleryDefault.classList.contains( 'product-zoom-on' ) ) {

						var _zoomTarget  = $( '.woocommerce-product-gallery__image' ),
							_imageToZoom = _zoomTarget.find( 'img' );

						// But only zoom if the img is larger than its container.
						if ( _imageToZoom.attr( 'data-large_image_width' ) > _productGallery.offsetWidth ) {
							_zoomTarget.trigger( 'zoom.destroy' );
							_zoomTarget.zoom( {
								touch: false
							} );
						}
				}
					
			};		
			
			bewaddtocart();
			//bewgallery();
			bewtabs();
			bewratings();
			bewzoom();
		
		}	
	};
	
		// Make sure we run this code under Elementor
		$( window ).on( 'elementor/frontend/init', function() {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/bew_dynamic.default', bewelementoreditor );
		} );
		
} )( jQuery );
		



