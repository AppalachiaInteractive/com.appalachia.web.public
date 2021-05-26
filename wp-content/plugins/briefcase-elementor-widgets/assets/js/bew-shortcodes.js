jQuery( document ).ready( function ( $ ) {
	'use strict';
	
	/**
	 * Handle filter
	 */
	$( '.bew-product-grid.filterable' ).on( 'click', '.filter li', function ( e ) {
		e.preventDefault();

		var $this = $( this ),
			$grid = $this.closest( '.bew-product-grid' ),
			$products = $grid.find( '.products' );

		if ( $this.hasClass( 'active' ) ) {
			return;
		}

		$this.addClass( 'active' ).siblings( '.active' ).removeClass( 'active' );

		if ( $grid.hasClass( 'filter-type-isotope' ) ) {
			$products.isotope( {filter: $this.data( 'filter' )} );
		} else {
			var filter = $this.attr( 'data-filter' ),
				$container = $grid.find( '.products-grid' );

			filter = filter.replace( /\./g, '' );
			filter = filter.replace( /product_cat-/g, '' );

			var data = {
				columns  : $grid.data( 'columns' ),
				per_page : $grid.data( 'per_page' ),
				load_more: $grid.data( 'load_more' ),
				type     : '',
				block    : $('.bew-shop-block').data( 'block' ),
				nonce    : $grid.data( 'nonce' )
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
					$container.append( $_products );

					// Support Jetpack lazy loads.
					$( document.body ).trigger( 'jetpack-lazy-images-load' );

					$( '.product-thumbnail-zoom', $container ).each( function () {
						var $el = $( this );

						$el.zoom( {
							url: $el.attr( 'data-zoom_image' )
						} );
					} );

				}
			} );
		}
	} );

	/**
	 * Ajax load more products
	 */
	$( document.body ).on( 'click', '.ajax-load-products', function ( e ) {
		e.preventDefault();

		var $el = $( this ),
			page = $el.data( 'page' );

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
				nonce   : $el.data( 'nonce' )
			},
			success: function ( data ) {
				$el.data( 'page', page + 1 ).attr( 'page', page + 1 );
				$el.removeClass( 'loading' );

				var $data = $( data ),
					$products = $data.find( 'ul.products > li' ),
					$button = $data.find( '.ajax-load-products' ),
					$container = $el.closest( '.products-grid' ),
					$grid = $container.find( 'ul.products' );

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

} );
