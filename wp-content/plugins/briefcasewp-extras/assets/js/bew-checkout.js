'use strict';
var bewcheckout;

(
	function() {

		bewcheckout = (
		function() {

				return {

					init: function() { 
						this.checkout();
						this.cart();
						this.account();
					}
				}
			}()
		);
	}
)( jQuery );

jQuery( document ).ready( function() {
	if (!jQuery( 'body' ).hasClass("elementor-editor-active")) {
		bewcheckout.init();
	}
} );

// Make sure you run this code under Elementor.
jQuery( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function() {
		if (jQuery( 'body' ).hasClass("elementor-editor-active")) {
			bewcheckout.init();
		}
	});
} );

//Checkout pages

(function( $ ) {

	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();		

	bewcheckout.checkout = function() {
		
		if(!$body.hasClass("woocommerce-checkout")){
			return;
		}
		
		var CheckoutPage = function() {
		
			//$body.addClass('bew-checkout');	
									
			if ($(".woocommerce-checkout").length > 0 ) {
			  $(document).ready(function() {			
										
					$(".bew-skeleton").addClass("hidde-bew-skeleton");
					$(".woocommerce-checkout").addClass("show-bew-checkout");													
			  });
			}
						
			//Initiate Selectwoo	
			$('#billing_country').selectWoo();
			$('#billing_state').selectWoo();
			$('#shipping_country').selectWoo();
			$('#shipping_state').selectWoo();
        };
		
		var CheckoutInput = function() {
		
			$('.label-inside-yes input, .label-inside-yes select').each( function () {
				
				var $this = $(this);
				
				if ( this.value != '' ) $this.parents('div.form-row.label-inside-yes').addClass('is-active');
				if ( this.value != '' ) $this.parents('p.form-row.label-inside-yes').addClass('is-active');				
				$this.attr("placeholder", "");
			});
			
			$( '#billing_country, #billing_state, #billing_city, #billing_postcode, #shipping_country' ).on( 'change', function() {
				$('.label-inside-yes input, .label-inside-yes select').each( function () {
					var $this = $(this);	
					$this.attr("placeholder", "");
				});
			} )
			
			$('.bew-checkout').on('focus input','input, select',  function(){
								
				if($(this).val() != '' ) {					
				    
				}else{					
					$(this).parents('div.form-row.label-inside-yes').addClass('is-active');
					$(this).parents('p.form-row.label-inside-yes').addClass('is-active');
				} 
				 
			})
			
			$('.bew-checkout').on('blur','input, select',  function(){
								
				if($(this).val() != '' ) {					
				    
				}else{					
					$(this).parents('div.form-row.label-inside-yes').removeClass('is-active');
					$(this).parents('p.form-row.label-inside-yes').removeClass('is-active');
				} 
				 
			})
								
			if($('#shipping_state').is("input")){
				
				var address_text = $(".bew-components-shipping-address span").text(),
					state = $('#shipping_state').val(),
					text_split = address_text.split(','),						
					newtext = address_text.replace(text_split[0], state );					

				setTimeout(function(){
					$(".bew-components-shipping-address span").text(newtext);
				},1000);
			}
			
			$('.bew-checkout').on('keyup change','#shipping_state',  function(){
											
					var address_text = $(".bew-components-shipping-address span").text(),
						state_select = $(this).find('option:selected').text(),
						state_input = $(this).val();
												
					if($(this).is("input")){
						var state = state_input; 
					 }else {
						var state = state_select; 
					 }
					
					var text_split = address_text.split(','),						
						newtext = address_text.replace(text_split[0], state );						
											
						$(".bew-components-shipping-address span").text(newtext);
						
			});
						
			// Get settings layout if shipping country change
			$('.bew-checkout').on('keyup change','#shipping_country_field',  function(){
				
				$('.form-row').each( function () {
					var $this = $(this);
					setTimeout(function(){
						var old_class = $this.attr("data-row");
						
						if(typeof old_class != 'undefined' ){
							$this.addClass(old_class);	
						}
					},200);
					
					if($('#shipping_state').is("input")){
						setTimeout(function(){
							if($('#shipping_state').val() == '' ) {
								$('#shipping_state_field').removeClass('is-active');
							}
						},200);				
						
					}

					if($('#billing_state').is("select")){
						setTimeout(function(){
							if ($('.shipping-checkbox-input-b').is(':checked')) {
							$('#billing_state').selectWoo();
							}
						},100);				
						
					}
					
				});							
			});
			
			// Get settings layout if billing country change
			$('.bew-checkout').on('keyup change','#billing_country_field',  function(){
				$('.form-row').each( function () {
					var $this = $(this);
					setTimeout(function(){
						var old_class = $this.attr("data-row");
						
						if(typeof old_class != 'undefined' ){													
							$this.addClass(old_class);	
						}
					},100);
					
					if($('#billing_state').is("input")){
						setTimeout(function(){
							if($('#billing_state').val() == '' ) {
								$('#billing_state_field').removeClass('is-active');
							}
						},100);						
						
					}					
				});						
			});
			
																	
        };
		
		var CheckoutSummary = function() {
			
			var _toggles = $( '.woocommerce-checkout-review-order' ),
				collapse_mobile = $( '.show-summary-mobile' );
								
			if ( (w <= 767) && (collapse_mobile.length == 0)  ) {
				_toggles.removeClass( 'show-summary' );	
			}
									
			$( '.bew-checkout' ).on( 'click',  '.order-review-coupon-layout-collapse #bew-order-summary',  function( e ) {				
				e.preventDefault();
							
				if ( _toggles.hasClass( 'show-summary' ) ) {
					_toggles.removeClass( 'show-summary' );					
				} else {
					_toggles.addClass( 'show-summary' );					
				}
			} );
			
        };
		
		var CheckoutInputShipping = function() {
						
			$('.bew-checkout .bew-shipping select').each( function () {
				
				var id = $(this).attr('id'),
					id_split = id.split('_'),
					newID = id.replace(id_split[0], "billing");
							
					$("#" + newID  ).val($(this).val());
				
			});	
			
			if($('#shipping_state').is("input")){		
				$("#billing_state").val($("#shipping_state").val());
			}
			
			$('.bew-checkout').on('keyup change','.bew-information input, .bew-shipping input',  function(){
				
				if ($('.shipping-checkbox-input-b').is(':checked')) {
				
					var id = $(this).attr('id'),
						id_split = id.split('_'),
						newID = id.replace(id_split[0], "billing");						
							
						$("#" + newID  ).val($(this).val());
						$("#" + newID  ).parents('div.form-row.label-inside-yes').addClass('is-active');
				}		
				
			});
			
			$('.bew-checkout').on('change','.bew-shipping select',  function(){
				var id = $(this).attr('id'),
					id_split = id.split('_'),
					newID = id.replace(id_split[0], "billing");	
					
					$("#" + newID).val($(this).val()).change();
					
			});
					
			$('#shipping-checkbox-b').on('click',function () {
                if ($('.shipping-checkbox-input-b').is(':checked')) {
					setTimeout(function(){
						$('.billing-checkbox-fields .bew-billing input:not([type=radio]), .billing-checkbox-fields .bew-billing select').each( function () {
							
							var id = $(this).attr('id'),
							id_split = id.split('_'),
							newID = id.replace(id_split[0], "shipping");
							
							var sv =  $("#" + newID  ).val();						
							$(this).val(sv);
							
							if($(this).val().length){
								$(this).parents('div.form-row.label-inside-yes').addClass('is-active');
								//$(this).parents('p.form-row.label-inside-yes').addClass('is-active');
							}
						});
					},500);
                	        	
                }else{
                   	$('.billing-checkbox-fields .bew-billing .form-row:not(.field-conditional-yes) input:not([type=radio])').each( function () {
						var $this = $(this);
						$this.parents('p.form-row.label-inside-yes').removeClass('is-active');
						$this.parents('div.form-row.label-inside-yes').removeClass('is-active');
						$this.val("");						
						
                	});
				}
			});
		
		};
		
		var CheckoutShipping = function() {				
			
			if( typeof checkoutShipping != 'undefined' && checkoutShipping) {	
				var default_checked = checkoutShipping.default_checked,
					default_checkedb = checkoutShipping.default_checkedb;				
			}
		
			if ( 'yes' != default_checked ) {
				$(window).load(function() {
					$('.bew-shipping').hide();
				});						
			}
                	
			$('.shipping-checkbox-area').on('click',function () {
                if ($('.shipping-checkbox-input').is(':checked')) {
                   	$('.bew-shipping').slideDown();
                }else{
                   	$('.bew-shipping').slideUp();
                }
            });
						
			// Use-address-for-billing
			if ( 'yes' == default_checkedb ) {
				$(window).load(function() {
					$('.elementor-widget-woo-checkout-form-shipping').next('.elementor-widget-woo-checkout-form-billing').addClass('billing-checkbox-fields').hide();
				});						
			}
                	
			$('#shipping-checkbox-b').on('click',function () {
                if ($('.shipping-checkbox-input-b').is(':checked')) {
					setTimeout(function(){
						$('.elementor-widget-woo-checkout-form-shipping').next('.elementor-widget-woo-checkout-form-billing').slideUp();
					},300);
                }else{
					setTimeout(function(){                	        	
						$('.elementor-widget-woo-checkout-form-shipping').next('.elementor-widget-woo-checkout-form-billing').slideDown();
					},300);
                }
            });			
		
		
        };
		
		var CheckoutPayment = function() {	
			
			$('.bew-checkout').on('click', '.bew-nav-link', function(){		
				
				$(this).parent().find('input').click();
			});
									
		
        };

		var CheckoutPaymentTab = function() {
					
			var previousActiveTabIndex = 0;
			
			$(".bew-checkout").on('click keypress', '.tab-switcher', function (event) {
				// event.which === 13 means the "Enter" key is pressed
				
				if ((event.type === "keypress" && event.which === 13) || event.type === "click") {
					
					var tabClicked = $(this).data("tab-index");

					if(tabClicked != previousActiveTabIndex) {
						$("#allTabsContainer .tab-container").each(function () {
							if($(this).data("tab-index") == tabClicked) {
								$(".tab-container").hide();
								$(this).show();
								previousActiveTabIndex = $(this).data("tab-index");
								return;
							}
						});
					}
				}
			});


		};
		
		var Bew_checkout_coupons = {
			init: function() {
				
				$( document.body ).on( 'click', 'form.bew-checkout_coupon .button', this.apply_coupon  );
				$( document.body ).on( 'click', '.bew-remove-coupon', this.remove_coupon );
				
			},		
			apply_coupon: function( e ) {				
				e.preventDefault();
				
				var $form = $( '.bew-checkout_coupon');

				if ( $form.is( '.processing' ) ) {
					return false;
				}

				$form.addClass( 'processing' ).block({
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				});

				var data = {
					security:		wc_checkout_params.apply_coupon_nonce,
					coupon_code:	$form.find( 'input[name="coupon_code"]' ).val()
				};

				$.ajax({
					type:		'POST',
					url:		wc_checkout_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'apply_coupon' ),
					data:		data,
					success:	function( code ) {
						$( '.woocommerce-error, .woocommerce-message' ).remove();
						$form.removeClass( 'processing' ).unblock();
						
						if ( code ) {
							//$( 'form.woocommerce-checkout').before( code );
							$ ('.woocommerce-checkout-review-order').removeClass('show-coupon');

							$( document.body ).trigger( 'applied_coupon_in_checkout', [ data.coupon_code ] );
							$( document.body ).trigger( 'update_checkout', { update_shipping_method: false } );							
							
							var content_holder = code.replace(/<(?:.|\n)*?>/gm, '');
							
							setTimeout(function(){
								Snackbar.show({ showAction: false, 
											pos: 'bottom-left' , 
											text: content_holder });
							},2000);
							
							
							
						}
					},
					dataType: 'html'
				});

				return false;
			},
			remove_coupon: function( e ) {
				e.preventDefault();

				var container = $( this ).parents(  '.bew-components-totals-discount__coupon-list li' ),
					coupon    = $( this ).data( 'coupon' );

				container.addClass( 'processing' ).block({
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				});

				var data = {
					security: wc_checkout_params.remove_coupon_nonce,
					coupon:   coupon
				};

				$.ajax({
					type:    'POST',
					url:     wc_checkout_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'remove_coupon' ),
					data:    data,
					success: function( code ) {
						$( '.woocommerce-error, .woocommerce-message' ).remove();
						//container.removeClass( 'processing' ).unblock();

						if ( code ) {
							//$( 'form.woocommerce-checkout' ).before( code );

							$( document.body ).trigger( 'removed_coupon_in_checkout', [ data.coupon_code ] );
							$( document.body ).trigger( 'update_checkout', { update_shipping_method: false } );

							// Remove coupon code from coupon field
							$( 'form.checkout_coupon' ).find( 'input[name="coupon_code"]' ).val( '' );
							
							var content_holder = code.replace(/<(?:.|\n)*?>/gm, '');
														
							setTimeout(function(){
								Snackbar.show({ showAction: false, 
											pos: 'bottom-left' , 
											text: content_holder });
							},2000);
						}
					},
					error: function ( jqXHR ) {
						if ( wc_checkout_params.debug_mode ) {
							/* jshint devel: true */
							console.log( jqXHR.responseText );
						}
					},
					dataType: 'html'
				});
			}
		};
		
		var BewCouponsWidget = function() {
						
			$(".bew-checkout").on('click', '.bew-coupon-input button', function (e) {
				e.preventDefault();
				//console.log("hola");
				
				var $i = $(".bew-coupon-input").find( 'input[name="bew_coupon_code"]' ).val();
				
				$('.bew-checkout_coupon').find( 'input[name="coupon_code"]' ).val($i);				
				$('.bew-checkout_coupon button').click();
	
			});


		};
				
		var MultiStepCheckout = function() {	
			"use strict"
			
			$('.elementor-widget-woo-checkout-form-information').addClass('step step-information');
			$('.elementor-widget-woo-checkout-form-shipping').addClass('step step-information');
			$('.elementor-widget-woo-checkout-form-billing').addClass('step  step-information');
			
			$('#shipping-checkbox-b').on('click',function () {
                if (!$('.shipping-checkbox-input-b').is(':checked')) {			
					$('.elementor-widget-woo-checkout-form-billing').addClass('step step-information');
				}
			});
			
			$('.elementor-widget-woo-checkout-shipping-options').addClass('step step-shipping-option');
			$('.elementor-widget-woo-checkout-payment').addClass('step step-payment');
			$('.elementor-widget-woo-checkout-place-order').addClass('step step-payment');
			
			if($('.elementor-widget-woo-checkout-form-additional').hasClass('step-default')) {
				$('.elementor-widget-woo-checkout-form-additional').addClass('step-shipping-option');
			}

			var body                = $( 'body' ),
				login               = $( '#checkout_login' ),
				billing             = $( '.elementor-widget-woo-checkout-form-billing' ),
				information         = $( '.step-information' ),
				shipping            = $( '.elementor-widget-woo-checkout-form-shipping' ),
				shipping_option     = $( '.step-shipping-option' ),
				order               = $( '#order_review' ),
				payment             = $( '.step-payment' ),
				form_actions        = $( '#form_actions' ),
				prev                = form_actions.find( '.button.prev' ),
				next                = form_actions.find( '.button.next' ),
				coupon              = $( '#checkout_coupon' ),				
				payment_method      = function () {

					$( '#place_order' ).on( 'click', function () {
						var $this               = $( '#order_checkout_payment' ).find( 'input[name=payment_method]:checked' ),
							current_gateway     = $this.val(),
							order_button_text   = $this.data( 'order_button_text' );

						order.find( 'input[name="payment_method"]' ).val( current_gateway ).data( 'order_button_text', order_button_text ).attr( 'checked', 'checked' );
					} );

				};
				
				if(information.hasClass('dont-need-shipping-yes')){
					var steps = new Array( login, information, payment );
				}else {
					var steps = new Array( login, information, shipping_option, payment );
				}

				var ns = steps.length;			

			body.on( 'updated_checkout', function( e ) {
								
				steps[ns] = $( '#order_checkout_payment' );
				if ( e.type == 'updated_checkout' ) {
					steps[ns] = $( '#order_checkout_payment' );
				}

				$( '#order_checkout_payment' ).find( 'input[name=payment_method]' ).on( 'click', function() {

					if ( $( '.payment_methods input.input-radio' ).length > 1 ) {
						var target_payment_box = $( 'div.payment_box.' + $( this ).attr( 'ID' ) );

						if ( $( this ).is( ':checked' ) && ! target_payment_box.is( ':visible' ) ) {
							$( 'div.payment_box' ).filter( ':visible' ).slideUp( 250 );

							if ( $( this ).is( ':checked' ) ) {
								$( 'div.payment_box.' + $( this ).attr( 'ID' )).slideDown( 250 );
							}
						}
					} else {
						$( 'div.payment_box' ).show();
					}

					if ( $( this ).data( 'order_button_text' )) {
						$( '#place_order' ).val( $( this ).data( 'order_button_text' ) );
					} else {
						$( '#place_order' ).val( $( '#place_order' ).data( 'value' ) );
					}
				} );

			} );

			form_actions.find( '.button.prev' ).add( '.button.next' ).on( 'click', function( e ) {
				
				e.preventDefault();
				
				var $this           = $( this ),
					timeline        = $( '#bew-checkout-timeline' ),
					action          = $this.data( 'action' ),
					current_step    = form_actions.data( 'step' ),
					next_step       = parseInt(current_step) + 1,
					prev_step       = parseInt(current_step) - 1,					
					checkout_form   = $( 'form.woocommerce-checkout' ),
					is_logged_in    = checkouTimeline.is_logged_in,
					button_title,
					valid           = false,
					current_step_item = steps[current_step],
					selector        = current_step_item,
					posted_data     = {},
					type            = '',
					$offset         = 0,
					$adminBar       = $( '#wpadminbar' ),
					$stickyTopBar   = $( '#top-bar-wrap' ),
					$stickyHeader   = $( '#site-header' );
					
					$offset = $offset + $adminBar.height() + $stickyTopBar.height() + $stickyHeader.height();
					//console.log("cu" + current_step);
					//console.log("next" + next_step);		
					//console.log(selector);

				$( 'form.woocommerce-checkout .woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout' ).remove();
				
				//type = ($( selector ).hasClass( 'elementor-widget-woo-checkout-form-billing' ) ) ? 'billing' : type;
				//type = ($( selector ).hasClass( 'elementor-widget-woo-checkout-form-shipping' )) ? 'shipping' : type;				
				type = ($( selector ).hasClass( 'step-information' )) ? 'information' : type;
				
				//console.log(type);
				if("1" == "1"){
											
					if(selector.hasClass( 'step-information' )){
						console.log("info");
						validate_fields("information") && after_validation(timeline,form_actions,checkout_form,steps,action,next_step,current_step,prev_step,prev,next,$offset,is_logged_in,coupon);
					}else if((selector.hasClass( 'step-shipping-option' )) && (selector.find( '.validate-required' ).length > 0) && (action == 'next') ){		
						
						console.log("shipping-option");
						validate_fields("shipping-option") && after_validation(timeline,form_actions,checkout_form,steps,action,next_step,current_step,prev_step,prev,next,$offset,is_logged_in,coupon); 
					} else{
						console.log("no-validation");
						after_validation(timeline,form_actions,checkout_form,steps,action,next_step,current_step,prev_step,prev,next,$offset,is_logged_in,coupon);
					}
					
				}else {				
					if ( type == 'billing' || type == 'shipping' || type == 'information') {
						
						$( selector ).find( '.validate-required input' ).each( function() {
							posted_data[ $( this ).attr( 'name' ) ] = $( this ).val();
						} );

						$( selector ).find( '.validate-required select' ).each( function() {
							posted_data[ $( this ).attr( 'name' ) ] = $( this ).val();
						} );

						$( selector ).find( '.input-checkbox' ).each( function() {
							if ( $( this ).is( ':checked' ) ) {
								posted_data[ $( this ).attr( 'name' ) ] = $( this ).val();
							}
						} );
						
						if(type == 'information'){
							posted_data[ 'type_group' ] = 'information';
							posted_data[ 'ship_to_different_address' ] = true;
						   
						   if ($('.shipping-checkbox-input-b').is(':checked')) {	
							posted_data[ 'use_address_for_billing' ] = true;
						   }
						}

						var data = {
							action: 'bew_validate_checkout',
							type: type,
							posted_data: posted_data
						};

						$.ajax( {
							type: 'POST',
							url: checkouTimeline.ajax_url,
							data: data,
							success: function( response ) {
								valid = response.valid;

								if ( ! response.valid ) {
									$j( 'form.woocommerce-checkout' ).prepend( response.html );
									$j( 'html, body' ).animate( {
										scrollTop: $j( 'form.woocommerce-checkout' ).offset().top - $offset },
									'slow' );
								}
								else{
									after_validation(timeline,form_actions,checkout_form,steps,action,next_step,current_step,prev_step,prev,next,$offset,is_logged_in,coupon);                    }
							},
							complete: function() {}
						} );

					} else {
						valid = true;
						after_validation(timeline,form_actions,checkout_form,steps,action,next_step,current_step,prev_step,prev,next,$offset,is_logged_in,coupon);
						//console.log("direct");
					}
				}

			} );

			
			// Click on review shipping and payment block		
			$( '.bew-formReview-action a' ).on( 'click', function(e) {
				
				//$('.button.prev').click();
				e.preventDefault();	
				
				var $this           = $( this ),
					timeline        = $( '#bew-checkout-timeline' ),
					current_step    = form_actions.data( 'step' ),
					prev_step       = current_step - 1,																		
					$offset         = 0,
					s				= '',
					t 				= $this.attr("data-target");					
										
					go_to_step(timeline,form_actions,steps,current_step,next,prev,$offset,t,s);
					
			} );
			
			// Click on timeline
			if ($("#form_actions .rc-layout").length != 0){
				
				$(".bew-multistep-timeline").addClass("is-clickable");				
				
				$( '.timeline:not(".cart")' ).on( 'click', function(e) {
					
					e.preventDefault();	
					
					var $this           = $( this ),
						timeline        = $( '#bew-checkout-timeline' ),
						current_step    = form_actions.data( 'step' ),																	
						$offset         = 0,
						t               = '',
						s 				= $this.attr("data-step");
						
						
						if("error"==""){	
							if(current_step != 1) {
								go_to_step(timeline,form_actions,steps,current_step,$offset,t,s);						
							}						
							if( (current_step == 1) && (s == 2) ) {						
								validate_fields("information") && $('.button.next').click();						
							}
						}
						
						validate_fields("information") && go_to_step(timeline,form_actions,steps,current_step,next,prev,$offset,t,s);
						
				} );
			}
			
			// Change Dynamic text on actions buttons for cr_layout	
			if ($("#form_actions .rc-layout").length != 0){
				console.log()
				var rc_current_step = form_actions.data( 'step' ),
					rc_next_step = parseInt(rc_current_step) + 1,
					rc_prev_step = parseInt(rc_current_step) - 1,
					prefix_next = $("#form_actions .next").attr('data-text-cr'),
					prefix_prev = $("#form_actions .prev").attr('data-text-cr'),
					step_name_next = $("#timeline-" + rc_next_step).attr('data-step-name'),
					step_name_prev = $("#timeline-" + rc_prev_step).attr('data-step-name');
				
				// Next title
				if ( rc_current_step == 1 ) {
					next.find('span').text( prefix_next + " " + step_name_next );
				}			
			}

		};
		
		var validate_fields = function (e) {
            var t = [],
                i = $(".step.step-" + e + " .validate-required");
            $("._invalid-error").remove();
			          
			for (var o = 0; o < i.length; o++) {
                var n = i[o],
                    s = $("input, textarea, select", n);					
					//console.log(s);					
                if (("" == s.val()) || ("default" == s.val()) || ((s.attr('type') == 'checkbox') && (!s.is(':checked')) )  ) {										
                    var c = !0;
                    $("input#createaccount").prop("checked") || (s.closest(".create-account").length && (c = !1)),
                        c && ($(n).addClass("woocommerce-invalid-required-field woocommerce-invalid"), $('<span class="_invalid-error">' + "This information is required." + "</span>").insertAfter($(".woocommerce-input-wrapper", n)), t.push("1"));
                }
                if (i.length - 1 === o) return !t.length;
            }
        };
		
		var go_to_step = function (timeline,form_actions,steps,current_step,next,prev,$offset,t,s) {
			
			timeline.find( '.active' ).removeClass( 'active' );
						
			//Complete contact and ship to information
			update_form_reviews();
						
			//console.log(t);
			//console.log(current_step );		
			
			if (t != ''){
				var position = 0;
				$.each(steps, function(i) {
				if ($(this).hasClass(t) == true) { position = i; }
				});
			}
			
			if (s != ''){ 
				var position = s;
			}
			
			//console.log (position);			
			form_actions.data( 'step', position );
						
            steps[current_step].fadeOut( 0, function() {
				//console.log(current_step);			
				steps[position].not('.billing-checkbox-fields').fadeIn( 120 );		
											
				// Continue & Return layout
				if( $('.rc-layout').length ){
					update_cr_actions(form_actions,next,prev);
				} else{
					// Information step
					if( position == 1 ){
						form_actions.find( '.button.prev' ).fadeOut( 0 );
						form_actions.find( '.button.next' ).fadeIn( 0 );
					} else {
						form_actions.find( '.button.next' ).fadeIn( 0 );
						form_actions.find( '.button.prev' ).fadeIn( 0 );
					}
					
					// Last step			
					if( position == 3 ){
						form_actions.find( '.button.next' ).fadeOut( 0 );
					} 					
				}
								
            } );
			
            $( '#timeline-' + position ).toggleClass( 'active' );
            //$( 'html, body' ).animate( {
            //    scrollTop: $offset },
            // 'slow' );			
			
        };
		
		var after_validation = function( timeline,form_actions,checkout_form,steps,action,next_step,current_step,prev_step,prev,next,$offset,is_logged_in,coupon ) { 
               timeline.find( '.active' ).removeClass( 'active' );
			console.log("cu-a" + current_step);
            if ( action == 'next' ) {
				//console.log(next_step),
                form_actions.data( 'step', next_step );
                steps[current_step].fadeOut( 0, function() {
                    steps[next_step].fadeIn( 120 );
                } );

                $( '#timeline-' + next_step ).toggleClass( 'active' );
				
				//Complete contact and ship to information
				update_form_reviews();
				//console.log($( '#bew-checkout-timeline' ).offset().top);
                $( 'html, body' ).animate( {
                    //scrollTop: $( '#bew-checkout-timeline' ).offset().top - $offset },
					scrollTop: 0 },
                'slow' );
            } else if ( action == 'prev' ) {
                form_actions.data( 'step', prev_step );
                steps[current_step].fadeOut( 0, function() {
					
					steps[prev_step].not('.billing-checkbox-fields').fadeIn( 120 );
					
                } );

                $( '#timeline-' + prev_step ).toggleClass( 'active' );
                //$( 'html, body' ).animate( {
                //    scrollTop: $offset },
                //'slow' );
            }

            current_step = form_actions.data( 'step' );
			
            if ( ( current_step == 1
                    && is_logged_in == true ) ||
                ( is_logged_in == false
                    && ( ( current_step == 0
                        && checkouTimeline.login_reminder_enabled == 1 )
                    ||  ( current_step == 1
                        && checkouTimeline.login_reminder_enabled == 0 ) ) ) ) {
                prev.fadeOut( 0 );
            } else {
                prev.fadeIn( 0 );
            }

            // Next title
            if ( is_logged_in == false
                && ( ( current_step == 0
                        && checkouTimeline.login_reminder_enabled == 1 )
                    ||  ( current_step == 1
                        && checkouTimeline.login_reminder_enabled == 1 ) )  ) {
                next.val( checkouTimeline.no_account_btn );
            } else {
                next.val( checkoutActions.next );
            }

            // Last step			
            if ( current_step == (steps.length-2) ) {
                checkout_form.removeClass( 'processing' );
                coupon.fadeIn( 80 );
                next.fadeOut( 0 );
            } else {
                checkout_form.addClass( 'processing' );
                coupon.fadeOut( 80 );
                next.fadeIn( 0 );
            }
			
			// Continue & Return layout	
			if( $('.rc-layout').length ){
				update_cr_actions(form_actions,next,prev);
			}			
		}
					
		var update_cr_actions = function (form_actions,next,prev) {
					
			var rc_current_step = form_actions.data( 'step' ),
				rc_next_step = parseInt(rc_current_step) + 1,
				rc_prev_step = parseInt(rc_current_step) - 1,
				prefix_next = $("#form_actions .next").attr('data-text-cr'),
			    prefix_prev = $("#form_actions .prev").attr('data-text-cr'),
				step_name_next = $("#timeline-" + rc_next_step).attr('data-step-name'),
			    step_name_prev = $("#timeline-" + rc_prev_step).attr('data-step-name');
			
			//console.log("current:" + rc_current_step);
			//console.log(step_name_next);
			//console.log(step_name_prev);
			
			// Next title
			if ( rc_current_step == 1 ) {
				next.find('span').text( prefix_next + " " + step_name_next );
				next.fadeIn( 0 );
				$(".back-to-cart").show();
			} else if (rc_current_step == 2) {
				$(".back-to-cart").hide();				
				next.find('span').text( prefix_next + " " + step_name_next );
				next.fadeIn( 0 );
			} else if (rc_current_step == 3)  {
				next.fadeOut( 0 );
				$(".back-to-cart").hide();
			}
				
			// Prev title
			if ( rc_current_step == 1 ) {
				prev.fadeOut( 0 );
			} else if (rc_current_step == 2) {
				prev.find('span').text( prefix_prev + " " + step_name_prev );
				prev.fadeIn( 0 );
			} else if (rc_current_step == 3) {
				prev.fadeOut( 0 );
			}			
		};
		 
		var update_form_reviews = function () {
            $(".bew-formReview-block").each(function (e, t) {
                var i = $(t),
                    o = $(".bew-formReview-content", i),
                    n = o.attr("data-fill");
                if ("email" === n) {
                    var s = $("#billing_email");
                    s.length && o.text(s.val());
                } else if ("address_ship" === n) {
                    var c = [];
                    $.each(["shipping_address_1", "shipping_city", "shipping_state", "shipping_postcode", "shipping_country"], function (e, t) {
                        var i = $("#" + t);
                        i.length && c.push(i.val());
                    }),
                        o.text(c.join(", "));
                } else if ("address_bill" === n) {
                    var a = [];
                    $.each(["billing_address_1", "billing_city", "billing_state", "billing_postcode", "billing_country"], function (e, t) {
                        var i = $("#" + t);
                        i.length && a.push(i.val());
                    }),
                        o.text(a.join(", "));
                } else if ("method" === n) {
                    var r = $("#shipping_method input[type='radio']:checked");
                    r.length || (r = $("#shipping_method input[type='hidden']")), r.length && o.html(r.next("label").html());
                }
            });
        };
		
		var wc_checkout_login_form = {
			init: function() {
				$( document.body ).on( 'click', 'a.showlogin', this.show_login_form );
				
			},
			show_login_form: function() {
				
				$( '.layout-collapse' ).removeClass("initial-hide");
				$( 'form.login, form.woocommerce-form--login' ).slideToggle();
				return false;
			}
		};
		
		var CheckoutConditional  = function () {
			
			$('.bew-checkout .field-conditional-yes').each( function () {
				
				var $this = $(this),
					conditional = $('input', this).attr('conditional'),
					superior_field = $('input', this).attr('superior_field'),
					sf_option = $('input', this).attr('superior_field_option'),
					sf_field_selector = '#' + superior_field + '_field input',
					sf_option_selector = '#' + superior_field + '_' + sf_option;
															
					if( typeof conditional != 'undefined' && conditional) {	
						
						
						if($this.length && $( '#' + superior_field + '_field ' + sf_option_selector).is(':checked')) {							
							$this.addClass("field-conditional-show");								
						}
						
						$('#shipping-checkbox-b').on('click',function () {
							if ($('.shipping-checkbox-input-b').is(':checked')) {
								setTimeout(function(){
									$this.find('input').val("Not applicable");
								},500);														
							}else{							
								$this.find('input').val("");							
							}
						});	
												
						$( '.bew-checkout' ).on( 'change',  sf_field_selector,  function() {	
							
							if ($( '#' + superior_field + '_field ' + sf_option_selector).is(':checked')) {								
								$this.addClass("field-conditional-show");
								$this.find('input').val("");
								$this.removeClass('is-active');
							}else {
								$this.removeClass("field-conditional-show");
								$this.find('input').val("Not applicable");
							}
					
						});						
						
					}
									
			});	

		};
		
		var Bew_validate_fields = function () {
			
			$(document.body).on('checkout_error', function () {
				
				var t = [],
                i = $(".form-row.validate-required");
				
				$("._invalid-error").remove();
				//$(".woocommerce-error").remove();
				
				// Check required validation				
				for (var o = 0; o < i.length; o++) {
					var n = i[o],
						s = $("input, textarea, select", n);
						
					if (("" == s.val()) || ("default" == s.val()) ) {
						//console.log(s.val());
						var c = !0;
						$("input#createaccount").prop("checked") || (s.closest(".create-account").length && (c = !1)),
							c && ($(n).addClass("woocommerce-invalid-required-field woocommerce-invalid"), $('<span class="_invalid-error bew_error_required">' + checkoutBilling.error_billing_required + "</span>").insertAfter($(".woocommerce-input-wrapper", n)), t.push("1"));
					}
					//if (i.length - 1 === o) return !t.length;
				};
				
				// check validation	for invalid format					
				$('.woocommerce-error li').each(function() {
					
					var data_id = $(this).attr('data-id');
					
					if( typeof data_id != 'undefined' && data_id) {	
					
						var data_id  = $(this).attr('data-id') + "_field",
							data_id_name = $(this).attr('data-id').split('_').pop(),
							data_text = '<span class="_invalid-error">' + checkoutBilling.error_billing_validation + " " + data_id_name + "</span>";
											
						if( $("#" + data_id + " .bew_error_required").length == 0 ){		
							$("#" + data_id).append( data_text );
						}
						
					} else{
						
						var data_text          = $(this).text().replace('billing','contact'),
							data_text_span     = '<span class="_invalid-error">' + data_text + '</span>', 
							data_text_span_std = '<span class="_invalid-error">' + checkoutInformation.error_email_validation + '</span>';
							
						// check if email is valid on contact information
						if(data_text.includes("email")){
							if( $("#billing_email_field .bew_error_required").length == 0 ){		
								$("#billing_email_field").append( data_text_span );
							}
						} else {
							if( $("#billing_email_field .bew_error_required").length == 0 ){		
								$("#billing_email_field").append( data_text_span_std );
							}
						}
						
					}
					
				});
				
				//$(".woocommerce-error").remove();				
						
			});
            
        };
		
		var Bew_toggle_create_account = function () {
			
			if ($( 'body' ).hasClass("elementor-editor-active")) {				
				$( 'div.create-account' ).hide();				
				$('p.create-account').on('click',function () {
					if ($('p.create-account .input-checkbox').is(':checked')) {						
						$('div.create-account').slideDown();						
					}else{						               	        	
						$('div.create-account').hide();						
					}
				});								
			}
			
		};
		
		var events = function() {
			CheckoutPage();
			CheckoutInput();
			CheckoutSummary();
			//CheckoutCoupon();
			CheckoutInputShipping();
			CheckoutShipping();
			CheckoutPayment();
			CheckoutPaymentTab();
			BewCouponsWidget();
			MultiStepCheckout();
			CheckoutConditional();
			Bew_validate_fields();
			Bew_toggle_create_account();
			
			//wc_checkout_login_form.init();
		};
		
		events();
		Bew_checkout_coupons.init();

	};
})( jQuery );
		
				
var CheckoutCoupon = function() {						
				
	var _toggle = jQuery( '.woocommerce-checkout-review-order' );
					
	jQuery( '.bew-checkout' ).on( 'click',  '#bew-coupon',  function( e ) {
		e.preventDefault();
		
		if ( _toggle.hasClass( 'show-coupon' ) ) {
			_toggle.removeClass( 'show-coupon' );					
		} else {
			_toggle.addClass( 'show-coupon' );
			jQuery(".bew-checkout_coupon .label-inside-yes input").attr("placeholder", "");
		}
	} );			
				
};
		
/*
* Run this code under Elementor.
*/
jQuery(window).on('elementor/frontend/init', function () {

	elementorFrontend.hooks.addAction( 'frontend/element_ready/woo-checkout-review-order.default', CheckoutCoupon);

});

// Bew Cart
(function( $ ) {

	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();		

	bewcheckout.cart = function() {
		
		if(!$body.hasClass("woocommerce-cart")){
				return;
		}
		
		var CartPage = function() {
		
			$body.addClass('bew-cart');		
						
			if ($(".woocommerce-cart").length > 0 ) {
			  $(document).ready(function() {			
					
					setTimeout(function(){
						$(".bew-skeleton").addClass("hidde-bew-skeleton");
						$(".bew-cart-yes").addClass("show-bew-cart");
					},200);							
			  });
			}
						
			if($(".bew-cart-empty").length > 0){	
				
				$('.bew-cart-yes').find('.elementor-container').first().addClass('bew-column-100');
				$('.bew-cart-yes').find('.elementor-row').first().addClass('bew-column-100');
				
				//apply new class on column	
				$(".elementor-row.bew-column-100 > .elementor-column").each( function () {
					if($(this).find(".bew-cart-empty").length ) {
						
					} else {
						$(this).remove();
					}
				});
								
				$(".elementor-row.bew-column-100 > .elementor-column").removeClass(function(index, className) {
					return (className.match (/(^|\s)elementor-element-\S+/g) || []).join(' ');
				});
				
				$('.elementor-row.bew-column-100 > .elementor-column').addClass('bew-elementor-col-100');
				
				$('.elementor > .elementor-inner > .elementor-section-wrap').children('.elementor-section:not(".bew-cart-yes")').remove();
				$('.bew-elementor-col-100 .elementor-element').not('.elementor-widget-woo-cart-table , .elementor-widget-woo-cart-table .bew-cart-empty .elementor-element').remove();
				
				//remove element id class from container
				$('.elementor-widget-woo-cart-table').removeClass().addClass('elementor-element');
			}

        };
		
		var CartInput = function() {
			
			$('.shipping-calculator-form input, .shipping-calculator-form select').each( function () {
				var $this = $(this);
				if ( this.value != '' ) $this.parents('div.form-row').addClass('is-active');
				if ( this.value != '' ) $this.parents('p.form-row').addClass('is-active');
				$this.attr("placeholder", "");
			});
			
			
			$('.bew-cart').on('focus','input, select',  function(){
								
				if($(this).val() != '' ) {					
				    $(this).parents('div.form-row').addClass('is-active');
				    $(this).parents('p.form-row').addClass('is-active');
				}else{					
					$(this).parents('div.form-row').addClass('is-active');
					$(this).parents('p.form-row').addClass('is-active');
				} 
				 
			})
			
			$('.bew-cart').on('blur','input, select',  function(){
								
				if($(this).val() != '' ) {					
				    $(this).parents('div.form-row').addClass('is-active');
				    $(this).parents('p.form-row').addClass('is-active');
				}else{					
					$(this).parents('div.form-row').removeClass('is-active');
					$(this).parents('p.form-row').removeClass('is-active');
				} 
				 
			})
			
			$('.bew-cart').on('click', '.shipping-calculator-button', function(){
				$('input, select').each( function () {
					var $this = $(this);
					if ( this.value != '' ) $this.parents('div.form-row').addClass('is-active');
					if ( this.value != '' ) $this.parents('p.form-row').addClass('is-active');
					
				});
			});
																	
        };
		
		var CartEmpty= function() {			
			
			function cartEmptied(e) {
				//The below 2 elements can be changed according to the classes you use in your custom cart template
				var cartForm = $('.woocommerce-cart-form'),
				    cartCollaterals = $('.bew-cart-totals');
				
				if (cartForm.length > 0) {
					cartForm.remove();
				}

				if (cartCollaterals.length > 0) {
					cartCollaterals.remove();
				}
				
				$('.bew-cart-yes').find('.elementor-container').first().addClass('bew-column-100');
				$('.bew-cart-yes').find('.elementor-row').first().addClass('bew-column-100');

				//apply new class on column	
				$(".elementor-row.bew-column-100 > .elementor-column").each( function () {
					if($(this).find(".bew-woo-cart-table").length ) {
						
					} else {
						$(this).remove();
					}
				});
				
				$(".elementor-row.bew-column-100 > .elementor-column").removeClass(function(index, className) {
					return (className.match (/(^|\s)elementor-element-\S+/g) || []).join(' ');
				});

				$('.elementor-row.bew-column-100 > .elementor-column').addClass('bew-elementor-col-100');
				
				$('.elementor > .elementor-inner > .elementor-section-wrap').children('.elementor-section:not(".bew-cart-yes")').remove();
				$('.bew-elementor-col-100 .elementor-element').not('.elementor-widget-woo-cart-table , .elementor-widget-woo-cart-table .bew-cart-empty .elementor-element').remove();
				
				//remove element id class from container
				$('.elementor-widget-woo-cart-table').removeClass().addClass('elementor-element');
				
				var woogrid_id = $('.bew-woo-grid').attr("data-id");
				
				// send id to create grid css
				var data = {
						action: 'empty_cart_woo_grid',
						woo_grid_id: woogrid_id
					};

				$.ajax( {
					type: 'POST',
					url: bewcart_vars.ajax_url,
					data: data,
					success: function( response ) {		
						
						$('.bew-woo-grid').prepend(response);
						//console.log(response);					
					},
					complete: function() {
						
					}
				} );
								
				$('.bew-woo-grid').addClass('show-bew-woo-grid'); 				
				
			}
			$(document.body).on('wc_cart_emptied', cartEmptied);

        };
		
		var is_blocked = function( $node ) {
			return $node.is( '.processing' ) || $node.parents( '.processing' ).length;
		};
		
		var block = function( $node ) {
			if ( ! is_blocked( $node ) ) {
				$node.addClass( 'processing' ).block( {
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				} );
			}
		};

		var unblock = function( $node ) {
			$node.removeClass( 'processing' ).unblock();
		};
		
		var get_url = function( endpoint ) {
			return wc_cart_params.wc_ajax_url.toString().replace(
				'%%endpoint%%',
				endpoint
			);
		};

		var bewWooqtyCart = function( $quantitySelector ) {
				
			if(!$body.hasClass("woocommerce-cart")){
				return;
			}
			
			//if(!$body.hasClass("elementor-editor-active")){
			//	return;
			//}
				
			if($(".elementor-widget-woo-cart-table").length == 0 ){ 
				return;
			}
				
			$body.addClass('bew-cart');	
								
			var $quantityBoxes,
				$cart = $( '.woocommerce-cart form.woocommerce-cart-form' );

			if ( ! $quantitySelector ) {
				$quantitySelector = '.qty';
			}

			$quantityBoxes = $( '.product-quantity div.quantity:not(.buttons_added), .product-quantity .quantity:not(.buttons_added)' ).find( $quantitySelector );	
				
			if ( $quantityBoxes && 'date' !== $quantityBoxes.prop( 'type' ) && 'hidden' !== $quantityBoxes.prop( 'type' ) && $('.bs-quantity').length == 0 ) {
					
				// Add plus and minus icons
				$quantityBoxes.parent().addClass( 'buttons_added' ).prepend('<a href="javascript:void(0)" class="minus">-</a>');
				$quantityBoxes.after('<a href="javascript:void(0)" class="plus">+</a>');

				// Target quantity inputs on cart pages
				$( 'input' + $quantitySelector + ':not(.product-quantity input' + $quantitySelector + ')' ).each( function() {
					var $min = parseFloat( $( this ).attr( 'min' ) );

					if ( $min && $min > 0 && parseFloat( $( this ).val() ) < $min ) {
						$( this ).val( $min );
					}
				});

				// Quantity input
				//if ( $( 'body' ).hasClass( 'woocommerce-cart' ) && ! $cart.hasClass( 'grouped_form' ) ) {
				//	var $quantityInput = $( '.woocommerce-cart form input[type=number].qty' );
				//		$quantityInput.on( 'keyup', function() { 
				//			var qty_val = $( this ).val();
				//			$quantityInput.val( qty_val ); 
				//		});
				//}

					$( '.plus, .minus' ).unbind( 'click' );

					$( 'form.woocommerce-cart-form .plus, form.woocommerce-cart-form .minus' ).on( 'click', function() {

					// Quantity
					var $quantityBox;

					// If floating bar is enabled
					if ( $( 'body' ).hasClass( 'woocommerce-cart' )
						&& ! $cart.hasClass( 'grouped_form' )
						&& ! $cart.hasClass( 'cart_group' ) ) {						
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
		
		var update_wc_div = function( html_str, preserve_notices ) {
			var $html       = $.parseHTML( html_str );
			var $new_form   = $( '.woocommerce-cart-form', $html );
			var $new_totals = $( '.cart_totals', $html );
			var $notices    = $( '.woocommerce-error, .woocommerce-message, .woocommerce-info', $html );

			// No form, cannot do this.
			if ( $( '.woocommerce-cart-form' ).length === 0 ) {
				window.location.reload();
				return;
			}

			// Remove errors
			if ( ! preserve_notices ) {
				$( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();
			}

			if ( $new_form.length === 0 ) {
				// If the checkout is also displayed on this page, trigger reload instead.
				if ( $( '.woocommerce-checkout' ).length ) {
					window.location.reload();
					return;
				}

				// No items to display now! Replace all cart content.
				var $cart_html = $( '.cart-empty', $html ).closest( '.woocommerce' );
				$( '.woocommerce-cart-form__contents' ).closest( '.woocommerce' ).replaceWith( $cart_html );

				// Display errors
				if ( $notices.length > 0 ) {
					show_notice( $notices );
				}

				// Notify plugins that the cart was emptied.
				$( document.body ).trigger( 'wc_cart_emptied' );
			} else {
				// If the checkout is also displayed on this page, trigger update event.
				if ( $( '.woocommerce-checkout' ).length ) {
					$( document.body ).trigger( 'update_checkout' );
				}

				$( '.woocommerce-cart-form' ).replaceWith( $new_form );
				$( '.woocommerce-cart-form' ).find( ':input[name="update_cart"]' ).prop( 'disabled', true ).attr( 'aria-disabled', true );

				if ( $notices.length > 0 ) {
					show_notice( $notices );
				}

				update_cart_totals_div( $new_totals );
			}
			bewWooqtyCart();
			$( document.body ).trigger( 'updated_wc_div' );
		};
		
		var update_cart_totals_div = function( html_str ) {
			$( '.cart_totals' ).replaceWith( html_str );
			$( document.body ).trigger( 'updated_cart_totals' );
		};
						
		var show_notice = function( html_element, $target ) {
			if ( ! $target ) {
				$target = $( '.woocommerce-notices-wrapper:first' ) ||
					$( '.cart-empty' ).closest( '.woocommerce' ) ||
					$( '.woocommerce-cart-form' );
			}
			$target.prepend( html_element );
		};
		
		/**
		 * Object to handle AJAX calls for cart shipping changes.
		 */
		var bewcart_shipping = {

			/**
			 * Initialize event handlers and UI state.
			 */
			init: function( cart ) {
				this.cart                       = cart;
				this.shipping_calculator_submit = this.shipping_calculator_submit.bind( this );

				$( document ).on(
					'submit',
					'form.bew-woocommerce-shipping-calculator',
					this.shipping_calculator_submit
				);

			},

			/**
			 * Handles a shipping calculator form submit.
			 *
			 * @param {Object} evt The JQuery event.
			 */
			shipping_calculator_submit: function( evt ) {
				evt.preventDefault();

				var $form = $( evt.currentTarget );

				block( $( 'div.cart_totals' ) );
				block( $form );

				// Provide the submit button value because wc-form-handler expects it.
				$( '<input />' ).attr( 'type', 'hidden' )
								.attr( 'name', 'calc_shipping' )
								.attr( 'value', 'x' )
								.appendTo( $form );

				// Make call to actual form post URL.
				$.ajax( {
					type:     $form.attr( 'method' ),
					url:      $form.attr( 'action' ),
					data:     $form.serialize(),
					dataType: 'html',
					success:  function( response ) {
						bewWooqtyCart();
						update_wc_div( response );
						var $notices    = $( '.woocommerce-error, .woocommerce-message, .woocommerce-info', response ),						
						    message = $notices.text(),
						    content_holder = message.replace(/<(?:.|\n)*?>/gm, '');
						
							setTimeout(function(){
								Snackbar.show({ showAction: false, 
											pos: 'bottom-left' , 
											text: content_holder });
							},500);
					},
					complete: function() {
						unblock( $form );
						unblock( $( 'div.cart_totals' ) );
					}
				} );
			}
		};

			
		/**
		 * Object to handle bew cart UI.
		 */
		var bewcart = {
			/**
			 * Initialize bew cart UI events.
			 */
			init: function() {
				
				this.apply_coupon          = this.apply_coupon.bind( this );
				this.remove_coupon_clicked = this.remove_coupon_clicked.bind( this );
				this.cart_submit           = this.cart_submit.bind( this );
				this.submit_click          = this.submit_click.bind( this );
				this.qty_click             = this.qty_click.bind( this );
				this.item_remove_clicked   = this.item_remove_clicked.bind( this );
				this.update_cart           = this.update_cart.bind( this );
			
				$( document ).on(
					'click',
					'.bew-cart_coupon :input[type=submit]',
					this.submit_click );
				$( document ).on(
					'submit',
					'.bew-cart_coupon',
					this.cart_submit );
				$( document ).on(
					'click',
					'a.bew-remove-coupon',
					this.remove_coupon_clicked );
				$( document ).on(
					'click',
					'.woocommerce-cart-form .bew-product-remove > a',
					this.item_remove_clicked );								
				$( document ).on(
					'change',
					'input.qty',
					this.qty_click );			
			},

			/**
			 * Update entire cart via ajax.
			 */
			update_cart: function( preserve_notices ) {
				var $form = $( '.woocommerce-cart-form' );
				
				//block( $form );
				//block( $( 'div.cart_totals' ) );
				
				// Make call to actual form post URL.
				$.ajax( {
					type:     $form.attr( 'method' ),
					url:      $form.attr( 'action' ),
					data:     $form.serialize(),
					dataType: 'html',
					success:  function( response ) {
						update_wc_div( response, preserve_notices );
					},
					complete: function() {
						//unblock( $form );
						//unblock( $( 'div.cart_totals' ) );
						//$.scroll_to_notices( $( '[role="alert"]' ) );
					}
				} );
			},
			qty_click: function( evt ) {
		
				this.qty_cart_submit( evt );			
					
			},
			qty_cart_submit: function( evt ) {
				var $submit  = $( document.activeElement ),
					$clicked = $( ':input[type=submit][clicked=true]' ),
					$form    = $( evt.currentTarget );

				// For submit events, currentTarget is form.
				// For keypress events, currentTarget is input.
				if ( ! $form.is( 'form' ) ) {
					$form = $( evt.currentTarget ).parents( 'form' );
				}

				if ( 0 === $form.find( '.woocommerce-cart-form__contents' ).length ) {
					return;
				}

				evt.preventDefault();
				var timeout,
				    $this = this;
					
					if (timeout != undefined) clearTimeout(timeout); //cancel previously scheduled event
					timeout = setTimeout(function() {						
						$this.quantity_update( $form );						
					}, 800 ); // schedule update cart event with 1000 miliseconds delay			
			
			},
			cart_submit: function( evt ) {
							
				var $submit  = $( document.activeElement ),
					$clicked = $( ':input[type=submit][clicked=true]' ),
					$form    = $( evt.currentTarget );

				// For submit events, currentTarget is form.
				// For keypress events, currentTarget is input.
				if ( ! $form.is( 'form' ) ) {
					$form = $( evt.currentTarget ).parents( 'form' );
				}
				
				if ( is_blocked( $form ) ) {
					return false;
				}

				if ( $clicked.is( ':input[name="apply_coupon"]' ) || $submit.is( '#coupon_code_total' ) ) {				
					evt.preventDefault();
					this.apply_coupon( $form );
				}
			},
			submit_click: function( evt ) {
				$( ':input[type=submit]', $( evt.target ).parents( 'form' ) ).removeAttr( 'clicked' );
				$( evt.target ).attr( 'clicked', 'true' );
			},
			apply_coupon: function( $form ) {
				block( $form );
				
				var cart = this;
				var $text_field = $( '#coupon_code_total' );
				var coupon_code = $text_field.val();
				
				var data = {
					security: wc_cart_params.apply_coupon_nonce,
					coupon_code: coupon_code
				};

				$.ajax( {
					type:     'POST',
					url:      get_url( 'apply_coupon' ),
					data:     data,
					dataType: 'html',
					success: function( response ) {
						$( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();
						//show_notice( response );
						$ ('.bew-cart-totals').removeClass('show-coupon');
						$( document.body ).trigger( 'applied_coupon', [ coupon_code ] );
						
						var content_holder = response.replace(/<(?:.|\n)*?>/gm, '');
														
							setTimeout(function(){
								Snackbar.show({ showAction: false, 
											pos: 'bottom-left' , 
											text: content_holder });
							},2000);
					},
					complete: function() {
						unblock( $form );
						$text_field.val( '' );
						cart.update_cart( true );
					}
				} );
			},
			remove_coupon_clicked: function( evt ) {
				evt.preventDefault();

				var cart     = this;
				var $wrapper = $( evt.currentTarget ).closest( '.bew-components-totals-discount__coupon-list li' );
				var coupon   = $( evt.currentTarget ).attr( 'data-coupon' );

				block( $wrapper );

				var data = {
					security: wc_cart_params.remove_coupon_nonce,
					coupon: coupon
				};

				$.ajax( {
					type:    'POST',
					url:      get_url( 'remove_coupon' ),
					data:     data,
					dataType: 'html',
					success: function( response ) {
						$( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();
						//show_notice( response );
						$( document.body ).trigger( 'removed_coupon', [ coupon ] );
						//unblock( $wrapper );
						
						var content_holder = response.replace(/<(?:.|\n)*?>/gm, '');
						
							setTimeout(function(){
								Snackbar.show({ showAction: false, 
											pos: 'bottom-left' , 
											text: content_holder });
							},2000);
					},
					complete: function() {
						cart.update_cart( true );
					}
				} );
			},
			item_remove_clicked: function( evt ) {
				evt.preventDefault();

				var $a = $( evt.currentTarget );
				var $form = $a.parents( 'form' );
				var $item = $a.parents( '.woocommerce-cart-form__cart-item');
				
				block( $item );				

				$.ajax( {
					type:     'GET',
					url:      $a.attr( 'href' ),
					dataType: 'html',
					success:  function( response ) {
						update_wc_div( response );
												
						var $notices    = $( '.woocommerce-error, .woocommerce-message, .woocommerce-info', response ),						
						    message = $notices.text(),							
							text_split = message.split('.'),						
							newtext = text_split[0],	
							content_holder = newtext.replace(/<(?:.|\n)*?>/gm, '') + ".";
														
							setTimeout(function(){
								Snackbar.show({ showAction: false, 
											pos: 'bottom-left' , 
											text: content_holder });
							},500);
							
					},
					complete: function() {
						unblock( $form );				
						
					}
				} );
			},
			quantity_update: function( $form ) {
				
				// Provide the submit button value because wc-form-handler expects it.
				$( '<input />' ).attr( 'type', 'hidden' )
								.attr( 'name', 'update_cart' )
								.attr( 'value', 'Update Cart' )
								.appendTo( $form );

				// Make call to actual form post URL.
				$.ajax( {
					type:     $form.attr( 'method' ),
					url:      $form.attr( 'action' ),
					data:     $form.serialize(),
					dataType: 'html',
					success:  function( response ) {
						update_wc_div( response );						
						var $notices    = $( '.woocommerce-error, .woocommerce-message, .woocommerce-info', response ),						
						    message = $notices.text();
						   							
							if (message === ''){
								var content_holder = "Cart Update.";
							}else {
								var content_holder = message.replace(/<(?:.|\n)*?>/gm, '');
							}
						
							setTimeout(function(){
								Snackbar.show({ showAction: false, 
											pos: 'bottom-left' , 
											text: content_holder });
							},500);
					},
					complete: function() {				
					}
				} );
			},

		};
		
		var CartUpdate= function() {			
			
			function cartUpdateEvent() {
				bewWooqtyCart();				
			}
			
			$(document.body).on('updated_wc_div', cartUpdateEvent);

        };

		var events = function() {
			CartPage();
			CartInput();
			//CartCoupon();
			CartEmpty();
			CartUpdate();
			bewWooqtyCart();
		};
		
		events();
		bewcart_shipping.init( bewcart );
		bewcart.init();
		
	};
})( jQuery );
				
var CartCoupon = function() {
			
	var _toggle = jQuery( '.bew-cart-totals' );
			
			
	jQuery( '.bew-cart' ).on( 'click',  '#bew-coupon',  function( e ) {
		e.preventDefault();
				
		if ( _toggle.hasClass( 'show-coupon' ) ) {
			_toggle.removeClass( 'show-coupon' );					
		} else {
			_toggle.addClass( 'show-coupon' );					
		}
	} );
			
};

/*
* Run this code under Elementor.
*/
jQuery(window).on('elementor/frontend/init', function () {

	elementorFrontend.hooks.addAction( 'frontend/element_ready/woo-cart-totals.default', CartCoupon);

});

// Bew Account
(function( $ ) {

	var $window   = $( window ),
		$document = $( document ),
		$body     = $( 'body' ),
		w         = $window.width();		

	bewcheckout.account = function() {
		
		if(!$body.hasClass("woocommerce-account")){
			return;
		}
		
		var BewAccount  = function () {			
			if ($(".bew-woocommerce-account").length > 0 ) {
			  $(document).ready(function() {							  
				  $(".bew-woocommerce-account").addClass("show-bew-account");				
			  });
			}
		};		

		var events = function() {			
			BewAccount();			
		};
		
		events();
		
	};
})( jQuery );
