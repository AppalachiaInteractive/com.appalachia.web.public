'use strict';

var wooshop,
	wooshopAjax;
(
	function() {

		wooshop = (
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

//Ajax Calls
(
	function() {

		wooshopAjax = (
		function() {

				return {

					init: function() {						
						this.shop_ajax();
					}
				}
			}()
		);
	}
)( jQuery );

jQuery( document ).ready( function() {
	if (!jQuery( 'body' ).hasClass("elementor-editor-active")) {
		wooshop.init();
	}
} );

// Ajax Calls
jQuery( document ).ajaxComplete( function() {
	if (!jQuery( 'body' ).hasClass("elementor-editor-active")) {		
		wooshopAjax.init();
	}
} );

// Make sure you run this code under Elementor..
jQuery( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/bew-woo-grid.default', function() {
		if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
			wooshop.init();
		}
	});
} );

// Shop page
(function( $ ) {

	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();	
		
	wooshop.shop = function() {

		var $bewWooGrid = $( '.bew-woo-grid' ),
			$carousel = $( '.categories-carousel' );
		
		if ( ! $bewWooGrid.length ) {
			return;
		}
		
		//Check if is a mobile view
		function viewport() {
			var e = window, a = 'inner';
			if (!('innerWidth' in window )) {
				a = 'client';
				e = document.documentElement || document.body;
			}
			return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
		}

		var productCategoriesWidget = function() {
			
			if( typeof wooshopConfigs != 'undefined' && wooshopConfigs) {	
				if ( ! wooshopConfigs.categories_toggle ) {
					return;
				}
			}

			var _categoriesWidget = document.querySelector( '.widget_product_categories .product-categories' );

			if ( _categoriesWidget ) {
				_categoriesWidget.classList.add( 'has-toggle' );
			}

			// widget product categories accordion
			var _childrens = [].slice.call( document.querySelectorAll( '.widget_product_categories ul li ul.children' ) );

			if ( _childrens ) {

				_childrens.forEach( function( _children ) {

					var _i = document.createElement( 'i' );
					_i.classList.add( 'fa' );
					_i.classList.add( 'fa-angle-down' );

					_children.parentNode.insertBefore( _i, _children.parentNode.firstChild );
				} );
			}

			var _toggles = [].slice.call( document.querySelectorAll( '.widget_product_categories ul li.cat-parent i' ) );

			_toggles.forEach( function( _toggle ) {

				_toggle.addEventListener( 'click', function() {

					var _parent = _toggle.parentNode;

					if ( _parent.classList.contains( 'expand' ) ) {
						_parent.classList.remove( 'expand' );
						$( _parent ).children( 'ul.children' ).slideUp( 200 );
					} else {
						_parent.classList.add( 'expand' );
						$( _parent ).children( 'ul.children' ).slideDown( 200 );
					}
				} );
			} );

			var _parents = [].slice.call( document.querySelectorAll( '.widget_product_categories ul li.cat-parent' ) );

			_parents.forEach( function( _parent ) {

				if ( _parent.classList.contains( 'current-cat' ) || _parent.classList.contains( 'current-cat-parent' ) ) {
					_parent.classList.add( 'expand' );
					$( _parent ).children( 'ul.children' ).show();
				} else {
					$( _parent ).children( 'ul.children' ).hide();
				}

				$( '.widget_product_categories li.cat-parent.expand' ).find( '> ul.children' ).show();
			} );
			
			// Woo remove brackets from categories and filter widgets
						
			if ( $body.hasClass("oceanwp-theme")){
				
			} else{ 
				$( '.widget_layered_nav span.count, .widget_product_categories span.count' ).each( function() {
				var count = $( this ).html();
				count = count.substring( 1, count.length-1 );
				$( this ).html( count );
				} );
			}
		};
		
		var columnSwitcher = function() {

			if ( ! $( '.col-switcher' ).length ) {
				return;
			}
			
			if ($body.hasClass("elementor-editor-active")) {
			 var _editor = 'active'; 
			}			

			if(_editor != 'active'){
			addActiveClassforColSwitcher();
			}
			
			var $colSwitcher = $( '.col-switcher' ),
				$grid     = $( '.products' );
				
				

			$body.on( 'click', '#page-container', function( e ) {

				var $target = $( e.target ).closest( '.col-switcher' );

				if ( ! $target.length ) {
					$colSwitcher.removeClass( 'open' );
				}
			} );

			// Change columns when click
			$colSwitcher.find( 'a' ).unbind( 'click' ).on( 'click', function( e ) {

				e.preventDefault();

				var $this         = $( this ),
					windowWidth   = $window.width(),
					col           = $this.attr( 'data-col' ),
					removeClasses = '',
					addClasses    = '',
					addClasses2    = '';
				
				if(_editor != 'active'){
				// save cookie
				Cookies.set( 'bew_shop_col', col, {
					expires: 1,
					path   : '/'
				} );
				}				

				$colSwitcher.find( 'a' ).removeClass( 'active' );
				$this.addClass( 'active' );

				if ( windowWidth <= 544 ) {					
					addClasses = 'bew-products-count-' + col;					
					
				} else if ( windowWidth >= 545 && windowWidth <= 767 ) {					
					addClasses = 'bew-products-count-' + col;
				
				} else if ( windowWidth >= 768 && windowWidth <= 991 ) {					
					addClasses = 'bew-products-count-' + col;
					
				} else if ( windowWidth >= 992 && windowWidth <= 1024 ) {					
					addClasses = 'bew-products-count-' + col;
					
				} else if ( windowWidth >= 1025 ) {					
					addClasses = 'bew-products-count-' + col;
					
				}
								
				var el2 = document.querySelector('.products');
				
				if ( el2 != null ) {	
					el2.classList.forEach(className => {
					  if (className.startsWith('bew-products-count')) {
						el2.classList.remove(className);
					  }
					});
					
					$grid.addClass( addClasses );				
					$grid.data('columns', col);
					$grid.attr('data-columns', col);				
				}				
								
			} );
			
			if(_editor != 'active'){
			if ( Cookies.get( 'bew_shop_col' ) ) {
				$colSwitcher.find( 'a[data-col="' + Cookies.get( 'bew_shop_col' ) + '"]' ).trigger( 'click' );
			}
			}
			
		};

		var filterDropdowns = function() {
			
			if( typeof wooshopConfigs != 'undefined' && wooshopConfigs) {	
				if ( ! wooshopConfigs.is_shop ) {
					return;
				}
			}

			$( '.widget_tm_layered_nav' ).on( 'change', 'select', function() {

				var slug       = $( this ).val(),
					href       = $( this ).attr( 'data-filter-url' ).replace( 'bew_FILTER_VALUE', slug ),
					pseudoLink = $( this ).siblings( '.filter-pseudo-link' );

				pseudoLink.attr( 'href', href );
				pseudoLink.trigger( 'click' );
			} );
		};

		var filtersArea = function() {
			if( typeof wooshopConfigs != 'undefined' && wooshopConfigs) {	
				if ( ! wooshopConfigs.is_shop ) {
					return;
				}
			}

			var _filters = document.querySelector( '.filters-area-horizontal' ),
				filters_opened = $( '.shop-filter-type-open-yes' );
				
			if ( _filters === null) {
				return;
			}

			if ( _filters && filters_opened.length == 0 ) {
				$( _filters ).removeClass( 'filters-opened' ).stop().hide();
			} else{
				$( _filters ).addClass( 'filters-opened' ).stop().show();
			}

			$( '.open-filters' ).unbind( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				var _filters = document.querySelector( '.filters-area-horizontal' );

				if ( _filters.classList.contains( 'filters-opened' ) ) {
					closeFilters();
				} else {
					openFilters();
				}
			} );

			var openFilters = function() {

				var _filters   			= document.querySelector( '.filters-area-horizontal' ),
					_btnFilter 			= document.querySelector( '.open-filters' );

				_filters.classList.add( 'filters-opened' );
				$( _filters ).stop().slideDown( 300 );
				_btnFilter.classList.add( 'opened' );

				setTimeout( function() {

					$( '.filters-area-horizontal .bew-layered-nav-filter ul.show-display-list' )
						.perfectScrollbar( { suppressScrollX: true } );

					$( '.filters-area-horizontal .bew-layered-nav-filter ul.show-display-list.show-labels-off li' )
						.each( function() {
							$( this ).find( '.filter-swatch' ).removeClass( 'hint--top' ).addClass( 'hint--right' );
						} );
				}, 500 );
			};

			var closeFilters = function() {

				var _filters   = document.querySelector( '.filters-area-horizontal' ),
					_btnFilter = document.querySelector( '.open-filters' );

				_filters.classList.remove( 'filters-opened' );
				$( _filters ).stop().slideUp( 300 );
				_btnFilter.classList.remove( 'opened' );
			};
		};
		
		var filtersVertical = function() {
			if( typeof wooshopConfigs != 'undefined' && wooshopConfigs) {	
				if ( ! wooshopConfigs.is_shop ) {
					return;
				}
			}
			
			$body.addClass( 'bew-filter-vertical-active' );
			
			var _filters = document.querySelector( '.bew-filter-sidebar' ),
				filters_opened = $( '.shop-filter-type-open-yes' ),
			    filters_grid   	= $( '.bew-products' );
			
			if ( _filters === null) {
				return;
			}
			
			if ( _filters && filters_opened.length == 0 ) {
				$( _filters ).removeClass( 'filters-vertical-opened' ).stop();
			} else{
				$( _filters ).removeClass( 'hide-sidebar' );
				$( _filters ).addClass( 'filters-vertical-opened' );
				filters_grid.removeClass( 'hide-left' );
			}
			
			$( '.open-filters , .filter-btn-close' ).unbind( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				var _filters = document.querySelector( '.bew-filter-sidebar' );

				if ( _filters.classList.contains( 'filters-vertical-opened' ) ) {
					closeFilters();
				} else {
					openFilters();
				}
			} );
			
			var $bewfiltersidebar = $( '.bew-filter-sidebar' );
				
			$bewfiltersidebar.on('click', function (event) {
				if ($bewfiltersidebar.hasClass('filters-vertical-opened') && $bewfiltersidebar[0] === event.target) {
					closeFilters();
				}
			});


			var openFilters = function() {

				var _filters_sidebar   	= document.querySelector( '.bew-filter-sidebar' ),
					_filters_grid   	= document.querySelector( '.bew-products' ),
					_btnFilter 			= document.querySelector( '.open-filters' );

				_filters_sidebar.classList.add( 'filters-vertical-opened' );				
				_filters_sidebar.classList.remove( 'hide-sidebar' );
				_filters_grid.classList.remove( 'hide-left' );
				_btnFilter.classList.add( 'opened' );
				$body.addClass( 'filters-vertical-enabled' );

				setTimeout( function() {

					$( '.filters-area-vertical .bew-layered-nav-filter ul.show-display-list' )
						.perfectScrollbar( { suppressScrollX: true } );

					$( '.filters-area-vertical .bew-layered-nav-filter ul.show-display-list.show-labels-off li' )
						.each( function() {
							$( this ).find( '.filter-swatch' ).removeClass( 'hint--top' ).addClass( 'hint--right' );
						} );
				}, 500 );
			};

			var closeFilters = function() {

				var _filters_sidebar   	= document.querySelector( '.bew-filter-sidebar' ),
					_filters_grid   	= document.querySelector( '.bew-products' ),
					_btnFilter = document.querySelector( '.open-filters' );

				_filters_sidebar.classList.remove( 'filters-vertical-opened' );
				_filters_sidebar.classList.add( 'hide-sidebar' );
				_filters_grid.classList.add( 'hide-left' );
				_btnFilter.classList.remove( 'opened' );
				
				$body.removeClass( 'filters-vertical-enabled' );
			};		
		};
		
		var wooGridSlider = function() {
			
			/* Slider */
			
			$('.bew-products-slider').each(function(){
				if ( $(this).length > 0 ) {

					var slickInduvidual = $(this),
					slider_options 	= $(this).data('woo_grid_slider');
					
					slickInduvidual.not('.slick-initialized').slick(slider_options);
				}
			});	

			/* add id on add to cart button */				
				$('.slick-cloned').each(function(){
					$(this).find('.bew-add-to-cart').attr('id', 'bew-cart');
				});	
				
			/* add id on bew woo action button */				
				$('.slick-cloned').each(function(){
					$(this).find('.bew-wishlist').attr('id', 'bew-woo-action-button');
					$(this).find('.bew-compare').attr('id', 'bew-woo-action-button');
				});	
		};
		
		var wooGridSwiper = function() {
			
			/* Swiper */
			if ( viewport().width  >= 767  ) {
				$('.bew-woo-grid-swiper .products').each(function(){
					if ( $(this).length > 0 ) {
						
						var swiperInduvidual = $(this),
						swiper_options 	= $(this).data('woo_grid_slider'),
						slidestoshow = swiper_options["slidesToShow"];
						
						var BewgridSwiper = new Swiper ('.bew-woo-grid-swiper', {
							// Optional parameters						
							slidesPerView: slidestoshow,
							spaceBetween: 30,
							loop: true,
							centeredSlides: true,
							freeMode: true
							
							})									
					}
				});
			}	
		};
		
		//Sticky vertical filter
		var stickyfilter = function() {
						
			var $filterSticky = $( '.bew-sticky-filter' );
			var productsItems   = document.querySelector( '.products-items' );
						
			if ( $window.width() < 992 ) {
				return;
			}

			if ( ! $filterSticky.length ) {
				return;
			}
			
			$body.addClass( 'bew-sticky-filter-active' );			
			$filterSticky.addClass( 'bew-filter-position' );
		};
		
		//Bew filter
		var bewfilter = function() {
									
			//Product filter			
			if ( ! $( '.bew-woo-grid-filter' ).length ) {
				return;
			}
			
			var $portfolio_selectors = $('.product-filter >li>a');
			var $portfolio = $('.products-items');
			$portfolio.isotope({
				itemSelector : '.products-item',
				layoutMode : 'fitRows'
			});
				
			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
				
			//Change columns when click on elementor editor	
			if ($( 'body' ).hasClass("elementor-editor-active")) {
				 
				var $div = $(".elementor-widget-bew-woo-grid");
				
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.attributeName === "class") {
							var attributeValue = $(mutation.target).prop(mutation.attributeName);	
								
							//Get the current columns value
							var woo_grid = $('.elementor-widget-bew-woo-grid');
							var id = 0;	
							var addClasses = '';
								  
							if(woo_grid.length) {
								var classList = woo_grid.attr('class').split(/\s+/);
								
								$.each(classList, function(index, item) {
									if (item.indexOf('bew-products-columns') >= 0) {
										var item_arr = item.split('columns-');
										id =  item_arr[item_arr.length -1];
										addClasses    += ' bew_span_1_of_' + id;
									}
								});
										
								$('.products-item').removeClass (function (index, className) {
									return (className.match (/(^|\s)bew_span_1_of\S+/g) || []).join(' ');
								});
										
								$('.products-item').addClass(addClasses);
										
								//Get Isotope instance 
								var iso = $('.products-items').data('isotope');									
										
								if($('.products-items').length && iso  ) {
									
									$('.products-items').isotope('layout');
								}
							}
						}
					});
				});
					
				if($div.length) {
					observer.observe($div[0], {
					  attributes: true
					});
				}
			}	
		};
		
		//Woo Grid Show
		var woogridShow = function() {
						
			if ($(".bew-woo-grid").length > 0 ) {
			 $(document).ready(function() {  
				if ($(".shop-filter-type-open-yes").length > 0 ) {
					
					setTimeout(function(){
						$(".bew-woo-grid").addClass("show-bew-woo-grid");
					}, 500);
					 
				} else {
					$(".bew-woo-grid").addClass("show-bew-woo-grid"); 
				}
			  });
			}
			
			if ($(".bew-woo-grid-filter").length > 0 ) {
			  $(document).ready(function() {   
				$(".bew-woo-grid-filter").addClass("show-bew-woo-grid"); 

			  });
			}
			
			if ($(".bew-woo-grid-slider").length > 0 ) {
			  $(document).ready(function() {   
				$(".bew-woo-grid-slider").addClass("show-bew-woo-grid"); 

			  });
			}
			
			if ($("#bew-animates").length > 0 && $("#bew-animates").css("display") != "none") {
			  $(document).ready(function() {  
				$("#woo-grid-loader .bew-loader-content").fadeOut();
				$("#bew-animates").delay(450).fadeOut("slow");         
			  });
			}
						
			//Add Edit shop block on Woo Grid
			if ($( 'body' ).hasClass("elementor-editor-active")) {
				
				var bewwoogridwidget = $('.elementor-widget-bew-woo-grid');
				
				bewwoogridwidget.each(function(){
					
					var bewwoogrid = $('.elementor-widget-container .bew-woo-grid', this),
					    templateID = bewwoogrid.data('id');
						
										
					$(this).addClass("bew-edit-shop-block");
					$(".elementor-" + templateID, this).addClass("bew-shop-block");
					$(".elementor-" + templateID, this).append('<div class="elementor-element-overlay"><ul class="elementor-editor-element-settings elementor-editor-widget-settings"><li data-id-shop="' + templateID + '" class="elementor-editor-element-setting elementor-editor-element-edit edit-shop-block" title="Edit Shop Block"><i class="eicon-edit" aria-hidden="true"></i><span class="elementor-screen-only">Edit Shop Block</span></li></ul></div>');
						
					$('.edit-shop-block', this).on( 'click', function() {
						
						var templateID = $(this).data('id-shop'),				
							href	   = window.location.href.split('?elementor')[0], 
							editUrl    = href + '?p=' + templateID + '&elementor';
							
							window.open(editUrl, '_blank');	
							
					});
				
				});
				
			}
	
		};
		
		//Grid Animation for columns switcher
		var woogridanimate = function() {
		
			const grid = document.querySelector(".products");			
			
			if(grid && (typeof animateCSSGrid != 'undefined')){		
				
				const { unwrapGrid, forceGridAnimation } = animateCSSGrid.wrapGrid(grid, { duration: 350, stagger: 10,  });
				
				unwrapGrid();			
				
				$( '.col-switcher a' ).on( 'click', function( e ) {				
					forceGridAnimation();
				} );
				
			}
	
	
		};
			
		var in_scroll = false;
		function triggerEvent(a, b) {
			var c;
			document.createEvent ? (c = document.createEvent("HTMLEvents"), c.initEvent(b, !0, !0)) : document.createEventObject && (c = document.createEventObject(), c.eventType = b), c.eventName = b, a.dispatchEvent ? a.dispatchEvent(c) : a.fireEvent && htmlEvents["on" + b] ? a.fireEvent("on" + c.eventType, c) : a[b] ? a[b]() : a["on" + b] && a["on" + b]()
		}
		
		var getProductsContainer = function( context = null ) {
			var $container = $( '.bew-products-container-pagination', context ).first();
			
			return $container.addClass( 'bew-products-container-pagination' );
		}
		
		var ajaxResult=[];
		
		var Initsearch = function () {
										
			var $container = $('.bew-products-container-pagination'),
				result = {},					
				$pp = parseInt($container.attr( 'data-current' ),10) + 1;
			
			if (in_scroll) {
			   result['append'] = 1;
			   result['product-page'] = $pp;
			}
										
			var currentUrl = new URL( $container.attr( 'data-shop' ) );
			var shopUrl = new URL( $container.attr( 'data-shop' ) );				
			for ( const i in result ) {
				currentUrl.searchParams.set( i, result[ i ] );
				shopUrl.searchParams.set( i, result[ i ] );
			}
							
			$.ajax({
				url: shopUrl.toString(),
				type: 'GET',
				beforeSend: function () {					
					$container.addClass('wpf-container-wait');									
				},
				complete: function () {					
					$container.removeClass('wpf-container-wait');					
				},
				success: function (resp) {
					if (resp) {
						var scrollTo = $container,
							products=null,
							containerClass = $('.products', $container).attr('class'),
							$resp = $( resp ),
							$resp_container = getProductsContainer( $resp );
														
							$.event.trigger('bew_ajax_before_replace');
							if ( in_scroll ) {
								products = $resp_container.find('.product');
								products.addClass('bew_transient_product')
									.removeClass( 'first last' ); // remove grid classes
									
								// Add Animation								
								for ( var index = 0; index < products.length; index++ ) {
										$( products[index] ).css( 'animation-delay', index * 100 + 100 + 'ms' );									}
									
								products.addClass( 'bewFadeInUp bewAnimation' );
								
								$( '.products', $container ).first().append( products );
								var columns = containerClass.match( /columns-(\d)/ );
								/* add proper "first" & "last" classes to the products */
								if ( columns !== null ) {
									columns = parseInt( columns[1] );
									$( '.products', $container ).first()
										.find( '.product:nth-child(' + columns + 'n+1)' ).addClass( 'first' )
										.end().find( '.product:nth-child(' + columns + 'n)' ).addClass( 'last' );
								}

								var scroll = $resp.find('.bew-products-container-pagination');								    
								var datacurrent = scroll.data('current');
								var datamax = scroll.data('max');
																	
								if(typeof datacurrent != 'undefined'){ 
								$container.attr( 'data-current', datacurrent );
								}
								if(scroll.length > 0){
									$('.bew_infinity a',$container).attr(
										'data-current', datacurrent
									);									
								}
														
								if (((datacurrent + 1) > datamax )) {									
									$('.bew_infinity').remove();										
								}
															
								$container.removeClass('bew-infnitiy-scroll');
								scrollTo = products.first();
								delete result['append'];
								setTimeout(function(){
									in_scroll = false;
								},200);
							} 
							
							if(products!==null){
								products.addClass('bew_transient_end_product');
							}
							
							history.replaceState({}, null, currentUrl.toString() );

							if ( window.wp !== undefined && window.wp.mediaelement !== undefined ) {
								window.wp.mediaelement.initialize();
							}
							$.event.trigger('bew_ajax_success');
							triggerEvent(window, 'resize');							
					}
				}
			});
			
		};
		
		var Initsearchcache = function (i) {
										
			var $container = $('.bew-products-container-pagination'),
				result = {},					
			    $pp = parseInt($container.attr( 'data-current' ),10) + 1;
			
				result['product-page'] = i + 1;
							
			var currentUrl = new URL( $container.attr( 'data-shop' ) );
			var shopUrl = new URL( $container.attr( 'data-shop' ) );				
			for ( const i in result ) {
				currentUrl.searchParams.set( i, result[ i ] );
				shopUrl.searchParams.set( i, result[ i ] );
			}
				
			$.ajax({
				url: shopUrl.toString(),
				type: 'GET',
				beforeSend: function () {									
				},
				complete: function () {					
				},
				success: function (resp) {
					if (resp) {
						var scrollTo = $container,
							products=null,
							containerClass = $('.products', $container).attr('class'),
							$resp = $( resp ),
							$resp_container = getProductsContainer( $resp ),
							page_name = 'product-page-' + (i + 1);
							
							ajaxResult.push({page_name, $resp_container});							
					}
				}
			});			
		};
		
		var infinity = function (e, click) {
			
			if($('.bew-cache-pagination-yes').length > 0){
				var cachedOffset = 100;
			} else {
				var cachedOffset = 400;
			}
					
			if ($('.wpf-search-container').length == 0 ) {
				
				var container = $('.bew-products-container-pagination');
								
				if (!in_scroll && (click || ($(this).scrollTop() + $(this).height() + cachedOffset ) > (container.offset().top + container.height()) )) {
					
					var scroll = $('.bew_infinity a', container);
					if (container.length > 0) {
						var current = scroll.attr('data-current');
						if (current <= scroll.attr('data-max')) {
							
							in_scroll = true;
							if (!click) {
								container.addClass('bew-infinitiy-scroll');
							}
														
							var next = (parseInt(current) + 1 ),
								datamax = scroll.attr('data-max'),
								page = "product-page-" + ( next ),
								$container = $('.bew-products-container-pagination'), 
								cached = false;
								
							// Check if the pages are cached							
							$.each(ajaxResult, function() { 
								 if(this.page_name === page){									
									cached = true;																		
								 } 
							});
														
							if( cached == true ){
								// Get from cache														
								$.each(ajaxResult, function() { 
									 if(this.page_name === page){
																			
										var products = this.$resp_container.find('.product');
											
										for ( var index = 0; index < products.length; index++ ) {
											$( products[index] ).css( 'animation-delay', index * 100 + 100 + 'ms' );
										}	
										products.addClass( 'bewFadeInUp bewAnimation' );									
										$( '.products', $container ).first().append( products );
																			
									 } 
								});
								
								$container.removeClass('bew-infnitiy-scroll');
										
								setTimeout(function(){
									in_scroll = false;
								},200);
								
								if(((next + 1) > datamax )){
									$('.bew_infinity').remove();
								}else{
									$('.bew_infinity a',$container).attr( 'data-current', next );									
								}
														
							} else {
								// Get from Ajax call
								Initsearch();
								
								if (((current + 1) > scroll.attr('data-max'))) {
									$('.bew_infinity').remove();
									if (!click) {
										$(this).off('scroll', infinity);
									}
								}
							}														
						}
					}
				}
			}
		};

		// Bew Pagination Load More and Infinity
		var bewPagination = function () {
							
				if ($('.bew_infinity_auto').length > 0) {
					$('#load-more').remove();				
												
					$(window).off('scroll', infinity).on('scroll', infinity);
					
				} 
				
				if ($('.bew_infinity').length > 0) {
					$('.bew_infinity').closest('.bew-hide-pagination').removeClass('bew-hide-pagination');
					$('#load-more').remove();
					$( '.bew-products-container-pagination' ).off( 'click.bewInfinity' ).on( 'click.bewInfinity', '.bew_infinity a', function (e) {
						
						var next = (parseInt($(this).attr( 'data-current'),10) + 1 ),								
						    datamax = $(this).attr('data-max'),
						    page = "product-page-" + ( next ),
						    $container = $('.bew-products-container-pagination'),
							cached = false;
							
							// Check if the pages are cached							
							$.each(ajaxResult, function() { 
								 if(this.page_name === page){									
									cached = true;																		
								 } 
							});	
							
							e.preventDefault();
							e.stopPropagation();							
													
						if( cached == true ){
							// Get from cache														
							$.each(ajaxResult, function() { 
								 if(this.page_name === page){
																	
									var products = this.$resp_container.find('.product');
									
									for ( var index = 0; index < products.length; index++ ) {
										$( products[index] ).css( 'animation-delay', index * 100 + 100 + 'ms' );
									}
									
									products.addClass( 'bewFadeInUp bewAnimation' );									
									$( '.products', $container ).first().append( products );
																		
								 } 
							});
														
							if(((next + 1) > datamax )){
								$('.bew_infinity').remove();
							}else{
								$('.bew_infinity a',$container).attr( 'data-current', next );									
							}
												
						} else {
							// Get from Ajax call							
							infinity(e, 1);							
						}
					});
				}

				// Cached pagination
				if($('.bew-cache-pagination-yes').length > 0){
					var max = parseInt($('.bew-products-container-pagination').data('max'),10) - 1;
					
					for (let i = 1; i <= max; i ++) {
						Initsearchcache(i);
					}					
				}
				
			
		};

		// Bew Product Tabs
		var bewProductTabs = function () {

			var ajaxResult=[];

				/**
				 * Handle filter
				 */
				 $('.bew-products-grid-filter.filterable .filter li').each(function( ){
					
					if ("dc" == "dc"){
						return;
					}

					var $this = $( this ),
						$grid = $this.closest( '.bew-woo-grid-tabs' ),
						$datafilter = $grid.find( '.bew-products-grid-filter' ),
						$products = $grid.find( '.bew-products' );

					if ( $grid.hasClass( 'filter-type-isotope' ) ) {
						$products.isotope( {filter: $this.data( 'filter' )} );
					} else {
						var filter = $this.attr( 'data-filter' ),
							$container = $grid.find( '.bew-woo-grid-tabs-products' );

						filter = filter.replace( /\./g, '' );
						filter = filter.replace( /product_cat-/g, '' );

						var data = {			
							template_id : $grid.data( 'id' ),
							columns  	: $grid.data( 'columns' ),
							per_page 	: $datafilter.data( 'per_page' ),
							load_more	: $datafilter.data( 'load_more' ),
							type     	: '',
							nonce    	: $datafilter.data( 'nonce' )
						};
						
						if ( $grid.hasClass( 'filter-by-group' ) ) {
							data.type = filter;
						} else {
							data.category = filter;
						}

						$grid.addClass( 'loading' );

						wp.ajax.send( 'bew_load_products', {
							data   : data,
							success: function ( response ) {
								var $_products = $( response );
								var filter_name = data.category;
								
								$grid.removeClass( 'loading' );										
								ajaxResult.push({filter_name, $_products});					
								$this.addClass( 'cached' );

								// Support Jetpack lazy loads.
								$( document.body ).trigger( 'jetpack-lazy-images-load' );
							}
						} );
					}
				} );
								
				$( '.bew-products-grid-filter.filterable' ).on( 'click', '.filter li', function ( e ) {
					
					e.preventDefault();
					
					var $this = $( this ),
						$grid = $this.closest( '.bew-woo-grid-tabs' ),
						$datafilter = $grid.find( '.bew-products-grid-filter' ),
						$products = $grid.find( '.bew-products' );
						
						if ( $this.hasClass( 'active' ) ) {
							return;
						}
							
						$this.addClass( 'active' ).siblings( '.active' ).removeClass( 'active' );
						
					if ( $grid.hasClass( 'filter-type-isotope' ) ) {
							$products.isotope( {filter: $this.data( 'filter' )} );
					} else {
					
						var filter = $this.attr( 'data-filter' ),
							$container = $grid.find( '.bew-woo-grid-tabs-products' );

							filter = filter.replace( /\./g, '' );
							filter = filter.replace( /product_cat-/g, '' );
						
							
						if ( $this.hasClass( 'cached' ) ) {
							
							$.each(ajaxResult, function() { 
								 if(this.filter_name === filter){ 
									$container.children( 'div.woocommerce, .load-more' ).remove();
									$container.children( 'div.bew-products, .load-more' ).remove();
									$container.append( this.$_products ).hide().fadeIn();
								 } 
							});
							
						}else {

								var data = {
									template_id : $grid.data( 'id' ),
									columns  	: $grid.data( 'columns' ),
									per_page 	: $datafilter.data( 'per_page' ),
									load_more	: $datafilter.data( 'load_more' ),
									type     	: '',
									nonce    	: $datafilter.data( 'nonce' )
								};
								
								if ( $grid.hasClass( 'filter-by-group' ) ) {
									data.type = filter;
								} else {
									data.category = filter;
								}

								$grid.addClass( 'loading' );

								wp.ajax.send( 'bew_load_products', {
									data   : data,
									success: function ( response ) {
										var $_products = $( response );

										$grid.removeClass( 'loading' );

										$_products.find( 'ul.products > li' ).addClass( 'product bewFadeIn bewAnimation' );

										$container.children( 'div.woocommerce, .load-more' ).remove();
										$container.append( $_products ).hide().fadeIn();
										console.log("from individual ajax");

										// Support Jetpack lazy loads.
										$( document.body ).trigger( 'jetpack-lazy-images-load' );
									}
								} );
						}
					}
					
				} );		
			
		};	

		/**
		 * Ajax load more products
		 */
		var bewProductTabsloadmore = function () {
			
			$( document.body ).on( 'click', '.ajax-load-products', function ( e ) {
				e.preventDefault();

				var $el = $( this ),
					page = $el.data( 'page' ),
					$container = $el.closest( '.bew-woo-grid-tabs' );

				if ( $el.hasClass( 'loading' ) ) {
					return;
				}

				$el.addClass( 'loading' );

				wp.ajax.send( 'bew_load_products', {
					data   : {						
						page    : page,
						columns : $el.data( 'columns' ),
						per_page: $el.data( 'per_page' ),
						category: $el.data( 'category' ),
						type    : $el.data( 'type' ),
						nonce   : $el.data( 'nonce' ),
						template_id : $container.data( 'id' )
					},
					success: function ( data ) {
						$el.data( 'page', page + 1 ).attr( 'page', page + 1 );
						$el.removeClass( 'loading' );
												
						var $data = $( data ),
							$products = $data.find( 'ul.products > li' ),
							$button = $data.find( '.ajax-load-products' ),							
							$grid = $container.find( 'ul.products' );
							
							console.log($container);

						// If has products
						if ( $products.length ) {
							// Add classes before append products to grid
							$products.addClass( 'product' );

							// Support Jetpack lazy loads.
							$( document.body ).trigger( 'jetpack-lazy-images-load' );

							$( '.product-thumbnail-zoom', $products ).each( function () {
								var $el = $( this );

								$el.zoom( {
									url: $el.attr( 'data-zoom_image' )
								} );
							} );


							if ( $container.hasClass( 'filter-type-isotope' ) ) {
								var index = 0;
								$products.each( function() {
									var $product = $( this );

									setTimeout( function() {
										$grid.isotope( 'insert', $product );
									}, index * 100 );

									index++;
								} );

								setTimeout(function() {
									$grid.isotope( 'layout' );
								}, index * 100 );
							} else {
								for ( var index = 0; index < $products.length; index++ ) {
									$( $products[index] ).css( 'animation-delay', index * 100 + 100 + 'ms' );
								}
								$products.addClass( 'bewFadeInUp bewAnimation' );
								console.log($products);
								
								$grid.append( $products );
							}

							if ( $button.length ) {
								$el.replaceWith( $button );
							} else {
								$el.slideUp();
							}
						}
					}
				} );
			} );
		
		};	
		
		var events = function() {
			
			if ( $body.hasClass('oceanwp-theme' ) ) {					
			} else {
					$( '.shop-filter select.orderby' ).niceSelect();
			}
						
			$( '.product-categories-select .list' ).perfectScrollbar();
			$( '.widget_tm_layered_nav ul.show-display-list' ).perfectScrollbar();
			$( '.widget_product_categories ul.product-categories' ).perfectScrollbar( { suppressScrollX: true } );

			productCategoriesWidget();
			columnSwitcher();			
			filterDropdowns();
			filtersArea();
			filtersVertical();
			wooGridSlider();			
			wooGridSwiper();			
			stickyfilter();
			bewfilter();
			woogridShow();
			woogridanimate();						
			bewPagination();
			bewProductTabs();
			bewProductTabsloadmore();
			wooSlider();
			
		};
		
		var addActiveClassforColSwitcher = function() {

			var $colSwitcher = $( '.col-switcher' );

			if ( ! $colSwitcher.length ) {
				return;
			}

			var width  = $( '.products' ).width(),
				pWidth = $( '.product-loop' ).outerWidth(),
				col    = Cookies.get( 'bew_shop_col' ) ? Cookies.get( 'bew_shop_col' ) : Math.round( width / pWidth );

			$colSwitcher.find( 'a' ).removeClass( 'active' );
			$colSwitcher.find( 'a[data-col="' + col + '"]' ).addClass( 'active' );
		};
		
		// Re-init JS on Wpf Ajax Filter	
		jQuery( document ).on( 'wpf_ajax_success', function() {
			columnSwitcher();
			woogridanimate();
		} );
		
		// Re-init Slick on ajax code to test
		//jQuery( document ).on( 'wc_cart_emptied', function() {			
			//wooSlider();
		//} );	
		
		events();		
	};
})( jQuery );

// Shop page Ajax Calls
(function( $ ) { 
	
	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();	
		
	wooshopAjax.shop_ajax = function() {
		
		//console.log("ajax run");
		var events = function() {
			wooSlider();			
		};
		
		events();		
	};
})( jQuery );

		
//Woo Slider
var wooSlider = function( $context ) {
			
	(function( $ ) { 
			
		var $carousel = $( '.bew-product-entry-slider', $context ),
			$thumbnailscarousel = $( '.bew-thumbnails-slider', $context ),
			$shopgrid = $( '.bew-woo-grid', $context ),
			$bewimage = $( '.bew-product-image'),
			windowWidth   = $( window ).width();

		//If is active slider style
		if ( $carousel.hasClass( 'woo-entry-image' )) {
			$('body').addClass( 'bew-slider-active' );
		}

		if ( $( '.bew-slider-image').hasClass( 'thumbnails-vertical' ) ) {
			$('body').addClass( 'bew-slider-thumbnails-vertical' );
		}
			
		if ( !$('body').hasClass( 'bew-slider-active' ) || $('.bew-woo-grid-slider .products').hasClass( 'bew-products-slider' ) ) {
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
			
		if ( $('body').hasClass( 'single single-product' ) ) {
				
			// Gallery slider		
			$carousel.imagesLoaded( function() {
				
				setTimeout(function(){
					$carousel.not('.slick-initialized').slick( {
						autoplay: autoplay,
						autoplaySpeed: speed,
						adaptiveHeight: true,
						prevArrow: '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>',
						nextArrow: '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>',
						rtl: rtl,
					} );
					},
				600);
		
			} );
				
		}else{
				
			if ( $('body').hasClass( 'bew-slider-thumbnails-vertical' ) && windowWidth >= 1025 && !$j( 'body' ).hasClass("elementor-editor-active") ) {
				// Generate width for slider		
				$(function() {
							
					var $wrapper = $('.bew-products');//the element we want to measure
					var wrapperWidth = $wrapper.width();//get its width 		
					var data_settings = $(".elementor-widget-bew-woo-grid").data('settings');
					var data_columns = $(".bew-woo-grid .products").data('columns');
							
					if ( typeof data_settings != 'undefined') {	
						if ( windowWidth <= 544 ) {					
							var data_settings_columns = data_settings["columns-mobile"];					
								
						} else if ( windowWidth >= 545 && windowWidth <= 767 ) {					
							var data_settings_columns = data_settings["columns-mobile"];
								
						} else if ( windowWidth >= 768 && windowWidth <= 991 ) {					
							var data_settings_columns = data_settings["columns-tablet"];
									
						} else if ( windowWidth >= 992 && windowWidth <= 1024 ) {					
							var data_settings_columns = data_settings["columns-tablet"];
									
						} else if ( windowWidth >= 1025 ) {					
							var data_settings_columns = data_settings["columns"];
						}
					}
					
					if ( data_settings_columns != null  ) {				
						if (data_columns == null ){
							var columns_settings = data_settings_columns;
						}else{
							var columns_settings = data_columns;
						}
								
							var column_gap_settings = data_settings["column_gap"];
							var gap_size = column_gap_settings["size"]*(columns_settings - 1);							
							var wrapperWidth = (wrapperWidth - gap_size)/ columns_settings;
								
							$(".bew-products .elementor-container").css("max-width", wrapperWidth);
					
						}					
					
					// Change width on resize window							
					var windowResize={
					width:0,
					init:function() {
						this.width=$j(window).width();
					},
					checkResize:function(callback) {
						if( this.width!=$j(window).width() ) {
							callback.apply();
						}
					}
					};
					windowResize.init();
					$(window).resize(function() {windowResize.checkResize(function() {

						wrapperWidth = $wrapper.width();//re-get the width
								
						function viewport() {
							var e = window, a = 'inner';
							if (!('innerWidth' in window )) {
								a = 'client';
								e = document.documentElement || document.body;
							}
							return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
						}
														
						if (viewport().width  >= 1024 ) {									
									
							var data_settings = $(".elementor-widget-bew-woo-grid").data('settings');
									
							if ( typeof data_settings != 'undefined' ) {			
								var columns_settings = data_settings["columns"];
								var column_gap_settings = data_settings["column_gap"];
								var gap_size = column_gap_settings["size"]*(columns_settings - 1);
							}
											
							wrapperWidth = (wrapperWidth - gap_size)/ columns_settings;
								
							$(".bew-products .elementor-container").css("max-width", wrapperWidth);			
							$carousel.slick('setPosition');
							
						}else{
							$(".bew-products .elementor-container").css("max-width", '');
						}
					});
				});
			});
		}
				
		if ( $('.bew-product-image-type-slider-image').hasClass( 'bew-slider-thumbnail-yes' ) && $('.bew-thumbnails-slider').length) {
					
			// Create slick slider					
			$carousel.each(function(key, item) {
						
				var $form = $( 'form.variations_form' );
				var sliderIdName = 'slider' + key;
				var sliderNavIdName = 'sliderNav' + key;
						
				this.id = sliderIdName;
						
				$('.bew-thumbnails-slider')[key].id = sliderNavIdName;
						
				var sliderId = '#' + sliderIdName;
				var sliderNavId = '#' + sliderNavIdName;
						  
				  $( sliderId + " img").not($j(".bew-current img")).removeClass('wp-post-image');	
				  $( sliderNavId + " img").removeClass('wp-post-image');
						
				var s1 = JSON.parse($( '.bew-thumbnails-slider' ).attr( "data-carousel" ) );		
				var s2 = { asNavFor: sliderId };
							
				var settings = JSON.parse(JSON.stringify($j.extend(false,{},s1,s2)));

				// Gallery slider
				$(sliderId).imagesLoaded( function() {
					$(sliderId).slick( {
						autoplay: autoplay,
						autoplaySpeed: speed,
						variableWidth: false,				
						prevArrow: '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>',
						nextArrow: '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>',
						rtl: rtl,
						asNavFor: sliderNavId
					} );
							
					$(sliderNavId).slick(settings);
								
				} );
			} );
					
			// slick go to index 0 slide	
			$( '.variations_form' ).on( 'click', function() { 

				var product_id  = $(this).data("product_id");								
				$("#bew-image-" + product_id + " .bew-product-entry-slider").slick('slickGoTo', 0, true); 
					
			} );
				
		} else {
					
			if ($(".shop-filter-type-open-yes").length){
				
					// Slider with no thumbnails							
					$carousel.imagesLoaded( function() {
						$carousel.on('init', function(slick) {
							console.log('fired!');
						})
								
						setTimeout(function(){
							$carousel.not('.slick-initialized').slick( {
								autoplay: autoplay,
								autoplaySpeed: speed,
								adaptiveHeight: true,
								prevArrow: '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>',
								nextArrow: '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>',
								rtl: rtl,
							} );
							},
						500);
				
					} );
				
						
			} else{
				
				// Slider with no thumbnails
				$carousel.imagesLoaded( function() {
					setTimeout(function(){
						$carousel.not('.slick-initialized').slick( {
							autoplay: autoplay,
							autoplaySpeed: speed,
							prevArrow: '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>',
							nextArrow: '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>',
							rtl: rtl,
						} );
						},
					500);
				} );
									
			}
					
			$carousel.on('afterChange', function(event, slick, currentSlide, nextSlide){
			  $(".slick-slide").removeClass('bew-current');
			  $('.slick-current').addClass('bew-current');        
			});
							
		}
				
		if ( $('body').hasClass( 'bew-slider-thumbnails-vertical' ) ) {
					
			// Change width with col-switcher
			$(function() {
				var $colSwitcherslide = $( '.col-switcher' );
				var $wrapper = $('.bew-products .products');//the element we want to measure
				var wrapperWidth = $wrapper.width();//get its width
				var wrapperWidth2 = '';//get its width 
						
				// Change columns when click
				$colSwitcherslide.find( 'a' ).on( 'click', function() {
							
					var data_columns = $(".bew-woo-grid .products").data('columns');				
					var data_settings = $(".elementor-widget-bew-woo-grid").data('settings');
							
					if ( typeof data_settings != 'undefined' ) {			
						var column_gap_settings = data_settings["column_gap"];
						var gap_size = column_gap_settings["size"]*(data_columns - 1);
					}
									
					wrapperWidth2 = (wrapperWidth - gap_size)/ data_columns;			
							
					$(".bew-products .elementor-container").css("max-width", wrapperWidth2);			
					$carousel.slick('setPosition');
					$thumbnailscarousel.slick('setPosition');			
				} );
			});
		} else {
								
			var $colSwitcherslide = $( '.col-switcher' );
				
			// Change columns when click
			$colSwitcherslide.find( 'a' ).on( 'click', function() {						
				$carousel.slick('setPosition');
				$thumbnailscarousel.slick('setPosition');					
			} );					
		}
	}
			
	if ( $( '.bew-woo-filter-view-vertical' ).length ) {
				
		// Initial if filter open enabled
		//$carousel.slick('setPosition');
				
		// Change width with vertical filter
		$(function() {
			var $fvslide = $( '.bew-woo-filter-view-vertical .bew-filter-buttons' );					
				
			// Change width when click filter vertical
			$fvslide.find( 'a' ).on( 'click', function() {
					
			$carousel.each(function() {
				//$carousel.slick('setPosition');			
				var $this = $(this),							
				       ce = $this.slick('slickCurrentSlide');							
							
					$this.slick('unslick');
																	
					setTimeout(function(){								
						$this.imagesLoaded( function() {
							$this.not('.slick-initialized').slick( {
								autoplay: autoplay,
								autoplaySpeed: speed,
								prevArrow: '<button type="button" class="slick-prev"><span class="fa fa-angle-left"></span></button>',
								nextArrow: '<button type="button" class="slick-next"><span class="fa fa-angle-right"></span></button>',
								rtl: rtl,
								initialSlide: ce,
							} );
						} );
					},
					500);							
				} );
			});
		});
	}

	// Change columns when click on elementor editor	
	if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
		var $div = $(".elementor-widget-bew-woo-grid");
		var observer = new MutationObserver(function(mutations) {
		  mutations.forEach(function(mutation) {
			if (mutation.attributeName === "class") {
			  var attributeValue = $(mutation.target).prop(mutation.attributeName);					  
			  $carousel.slick('setPosition');
			  $thumbnailscarousel.slick('setPosition');
			}
		  });
		});
		observer.observe($div[0], {
		  attributes: true
		});
	}

	})( jQuery );
};
		
function filtersSearch(e) {
	
			  //Declare variables
			  var id, filter, ul, li, ulchildren, lichildren, a, i, txtValue;			  
			  id = e.getAttribute('id');	
			  filter = e.value.toUpperCase();
			  
			  if (id == 'search-box-categories'){
				ul = document.getElementsByClassName("product-categories");  
			  }else{
				ul = document.getElementsByClassName("list-" + id);  
			  }			  
			  
			  li = ul[0].getElementsByTagName('li');
			  
			  for (i = 0; i < li.length; i++) {
			  if (li[i].getElementsByTagName("ul").length>0){
				 
				  ulchildren = document.getElementsByClassName("children");
				  lichildren = ulchildren[0].getElementsByTagName('li');	
			  } 			  
			  }
			  
			  // Loop through all list items, and hide those who don't match the search query
			  for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName("a")[0];
				txtValue = a.textContent || a.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
				  li[i].style.display = "";
				} else {
				  li[i].style.display = "none";
				}
			  }
			  
			  if (lichildren != undefined){
				  // Loop through all list children items, and hide those who don't match the search query
				  for (i = 0; i < lichildren.length; i++) {
					a = lichildren[i].getElementsByTagName("a")[0];
					txtValue = a.textContent || a.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
					  lichildren[i].style.display = "";
					  lichildren[i].closest("ul").style.display = "";
					  lichildren[i].closest(".cat-parent").style.display = "";
					} else {
					  lichildren[i].style.display = "none";
					}
				  }
			  }  
};
