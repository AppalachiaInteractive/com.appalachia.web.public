<?php
namespace BriefcasewpExtras\Modules\WooCheckout;

use Elementor;
use Elementor\Plugin;
use Elementor\Controls_Manager;
use Elementor\Controls_Stack;
use BriefcasewpExtras\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Module extends Module_Base {
	
	public static function is_active() {
		return class_exists( 'woocommerce' );
	}

	public function get_name() {
		return 'woo-checkout';
	}

	public function get_widgets() {
		return [
			'Woo_Checkout_Form_Information',
			'Woo_Checkout_Form_Billing',
			'Woo_Checkout_Form_Shipping',
			'Woo_Checkout_Form_Additional',
			'Woo_Checkout_Form_Login',
			'Woo_Checkout_Coupon_Form',
			'Woo_Checkout_Review_Order',
			'Woo_Checkout_Payment',
			'Woo_Checkout_Shipping_Options',
			'Woo_Checkout_Place_Order',
			'Woo_Checkout_Multistep_Timeline',
			'Woo_Checkout_Multistep_Actions',
		];
	}
	
	public function register_controls( $element, $section_id, $args ) {
		if ( 'section' === $element->get_name() && 'section_structure' == $section_id ) {
			
			global $post;
			$post_id = $post->ID;
			$checkout_id = wc_get_page_id( 'checkout' );
						
			if($post_id != $checkout_id ){			
			return;
			}
			
			$element->start_controls_section(
				'section_bew_checkout',
				[
					'label' => __( 'Bew Checkout', 'bew-extras' ),
					'tab' => Controls_Manager::TAB_LAYOUT,				
				]
			);

			$element->add_control(
				'bew_checkout',
				[
					'label'	=> __( 'Enable Checkout Form', 'bew-extras' ),
					'type' => Controls_Manager::SWITCHER,
					'label_on' => __( 'On', 'bew-extras' ),
					'label_off' => __( 'Off', 'bew-extras' ),
					'return_value' => 'yes',
					'default' => '',
					'frontend_available' => true,
					'prefix_class' => 'bew-checkout-',
					'description'	=> __( 'Enable Bew Checkout Form on this section', 'bew-extras' )
				]
			);
			
			$element->add_control(
				'bew_checkout_loading',
				[
					'label'	=> __( 'Enable Loading', 'bew-extras' ),
					'type' => Controls_Manager::SWITCHER,
					'label_on' => __( 'On', 'bew-extras' ),
					'label_off' => __( 'Off', 'bew-extras' ),
					'return_value' => 'yes',
					'default' => 'yes',
					'frontend_available' => true,
					'description'	=> __( 'Enable Bew Checkout loading effect.', 'bew-extras' ),
					'condition' => [
						'bew_checkout' => 'yes',
					],
				]
			);
			
			$element->add_control(
				'bew_checkout_multistep',
				[
					'label'	=> __( 'Enable Checkout Multistep', 'bew-extras' ),
					'type' => Controls_Manager::SWITCHER,
					'label_on' => __( 'On', 'bew-extras' ),
					'label_off' => __( 'Off', 'bew-extras' ),
					'return_value' => 'yes',
					'default' => '',
					'frontend_available' => true,
					'prefix_class' => 'bew-checkout-multistep-',
					'description'	=> __( 'Enable Bew Checkout Multis on this section', 'bew-extras' )
				]
			);
						
			$element->end_controls_section();
		}
	}

	
	/**
	 * Show the bew checkout.
	 */
	private static function bew_checkout() {
		// Show non-cart errors.
		do_action( 'woocommerce_before_checkout_form_cart_notices' );

		// Check cart has contents.
		if ( WC()->cart->is_empty() && ! is_customize_preview() && apply_filters( 'woocommerce_checkout_redirect_empty_cart', true ) ) {
			return;
		}

		// Check cart contents for errors.
		do_action( 'woocommerce_check_cart_items' );

		// Calc totals.
		WC()->cart->calculate_totals();

		// Get checkout object.
		$checkout = WC()->checkout();

		if ( empty( $_POST ) && wc_notice_count( 'error' ) > 0 ) { // WPCS: input var ok, CSRF ok.

			wc_get_template( 'checkout/cart-errors.php', array( 'checkout' => $checkout ) );
			wc_clear_notices();

		} else {

			$non_js_checkout = ! empty( $_POST['woocommerce_checkout_update_totals'] ); // WPCS: input var ok, CSRF ok.

			if ( wc_notice_count( 'error' ) === 0 && $non_js_checkout ) {
				wc_add_notice( __( 'The order totals have been updated. Please confirm your order by pressing the "Place order" button at the bottom of the page.', 'woocommerce' ) );
			}

			//wc_get_template( 'checkout/form-checkout.php', array( 'checkout' => $checkout ) );
			
			// Add star form from form-checkout template, replace form-checkout.php
			
			remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_login_form', 10 );
			remove_action( 'woocommerce_before_checkout_form', 'woocommerce_checkout_coupon_form', 10 );			
			do_action( 'woocommerce_before_checkout_form', $checkout );					
			
			// If checkout registration is disabled and not logged in, the user cannot checkout.
			if ( ! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in() ) {
				echo esc_html( apply_filters( 'woocommerce_checkout_must_be_logged_in_message', __( 'You must be logged in to checkout.', 'woocommerce' ) ) );
				return;
			}
						
			echo apply_filters( 'bew-checkout-form-tag', '<form name="checkout" method="post" class="checkout woocommerce-checkout" action="" enctype="multipart/form-data" novalidate="novalidate" style="opacity:0;">' );
			
		}
	}
	
	public function bew_form_start ( $element ) {
		$settings = $element->get_settings_for_display();
		if( $settings['bew_checkout'] == 'yes' ) {
			if ( ( is_checkout() && !is_wc_endpoint_url('order-received') ) ) {
				
				if( $settings['bew_checkout_loading'] == 'yes' ) {
					echo $this->bew_checkout_skeleton();
				}

				$this-> bew_checkout();
				
			} else{
				
			?><div class="woocommerce bew-woocommerce-order"> <?php 
				do_action( 'bew_order_received' );
			?></div><?php 
				
			}		
		}
	}

	public function bew_form_close( $element ) {
		$settings = $element->get_settings_for_display();
		if( $settings['bew_checkout'] == 'yes' ) {
			
			if ( ( is_checkout() && !is_wc_endpoint_url('order-received') ) ) {
				echo '</form>';	
				
				do_action( 'woocommerce_after_checkout_form', $checkout );
				
			} else {
				
				add_action( 'wp_footer', [ $this, 'bew_send_thankyou_js'] );
				
			}
			
		}
	}
	
	function bew_send_thankyou_js(){
				 
		// exit if we are not on the Thank You page
		if( !is_wc_endpoint_url( 'order-received' ) ) return;
				 
			echo "<script>
			jQuery( function( $ ) {
				$('.bew-checkout-yes').remove();
				$('.bew-woocommerce-order').siblings('.elementor-section').remove();
				});
			</script>";		 
	}
			
	function bew_checkout_skeleton(){
		 ?>
		<section class="elementor-element bew-checkout-yes elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-element_type="section" data-settings="{&quot;bew_checkout&quot;:&quot;yes&quot;}">
			<div class="elementor-container elementor-column-gap-default">
					
				<div class="bew-skeleton bew-components-sidebar-layout bew-checkout bew-checkout--is-loading bew-checkout--skeleton" aria-hidden="true">
					<div class="bew-components-main bew-checkout__main">
						<div class="bew-components-express-checkout"></div>
						<div class="bew-components-express-checkout-continue-rule"><span></span></div>
						<form class="bew-components-checkout-form">
							<fieldset class="bew-checkout__contact-fields bew-components-checkout-step">
								<div class="bew-components-checkout-step__heading">
									<div class="bew-components-checkout-step__title"></div>
								</div>
								<div class="bew-components-checkout-step__container">
									<div class="bew-components-checkout-step__content">
										<span></span>
									</div>
								</div>
							</fieldset>
							<fieldset class="bew-checkout__contact-fields bew-components-checkout-step">
								<div class="bew-components-checkout-step__heading">
									<div class="bew-components-checkout-step__title"></div>
								</div>
								<div class="bew-components-checkout-step__container">
									<div class="bew-components-checkout-step__content">
										<span></span>
									</div>
								</div>
							</fieldset>
							<fieldset class="bew-checkout__contact-fields bew-components-checkout-step">
								<div class="bew-components-checkout-step__heading">
									<div class="bew-components-checkout-step__title"></div>
								</div>
								<div class="bew-components-checkout-step__container">
									<div class="bew-components-checkout-step__content">
										<span></span>
									</div>
								</div>
							</fieldset>
							<fieldset class="bew-checkout__contact-fields bew-components-checkout-step">
								<div class="bew-components-checkout-step__heading">
									<div class="bew-components-checkout-step__title"></div>
								</div>
								<div class="bew-components-checkout-step__container">
									<div class="bew-components-checkout-step__content">
										<span></span>
									</div>
								</div>
							</fieldset>
						</form>
					</div>
					<div class="bew-components-sidebar bew-checkout__sidebar">
						<div class="components-card"></div>
					</div>
					<div class="bew-components-main bew-checkout__main-totals">
						<div class="bew-checkout__actions">
							<button class="components-button button bew-button bew-components-checkout-place-order-button">&nbsp;</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<?php
	}
	
	public function body_class_checkout( $classes ){
        if ( ( is_checkout() && !is_wc_endpoint_url('order-received') ) ) {
			$classes[] = 'bew-checkout';
			$classes[] = 'bew-woocommerce-builder';
        }
        return $classes;
    }
	
	private function add_actions() {
	
		add_action( 'elementor/element/after_section_end', [ $this, 'register_controls' ], 10, 3  );		
		add_action( 'elementor/frontend/section/before_render', [ $this, 'bew_form_start'] );
		add_action( 'elementor/frontend/section/after_render', [ $this, 'bew_form_close'] );
		add_filter( 'body_class', [ $this, 'body_class_checkout'] );

	}
			
	public function __construct() {
		parent::__construct();
		
		// Enabled bew woo checkout for elementor editor and disabled OPC ans Wao on woo orders settings.
		//if(is_admin()){
		//	add_filter( 'is_bew_woo_checkout', function( $is_bwco ) {
		//		return true;
		//	} );
		//	add_filter( 'is_bewopc_checkout', function( $is_opc ) {
		//		return false;
		//	} );
		//	
		//	add_filter( 'is_bewwao_checkout', function( $is_wao ) {
		//		return false;
		//	} );
			
		// } 
					
		require_once BEW_EXTRAS_PATH . 'modules/woo-checkout/classes/bew-woo-checkout.php';		
			
		$this->add_actions();				
		
	
	}
	
}
