<?php
namespace BriefcasewpExtras;

function is_bew_woo_cart( $post_id = null ) {

		// If no post_id specified try getting the post_id
		if ( empty( $post_id ) ) {
			global $post;

			if ( is_object( $post ) ) {
				$post_id = $post->ID;
			} else {
				// Try to get the post ID from cart id
				$post_id = wc_get_page_id( 'cart' );
				
			}
		}
				
		// If still no post_id return straight away
		if ( empty( $post_id )) {

			$is_bwc = false;

		} else {

			if ( 0 == BewWc::$shortcode_page_id ) {
				$post_to_check = ! empty( $post ) ? $post : get_post( $post_id );
				BewWc::check_for_bew_woo_cart( $post_to_check );
			}
						
			// Compare IDs
			if ( $post_id == BewWc::$shortcode_page_id || ( 'yes' == get_post_meta( $post_id, '_bewwc', true ) ) ) {
				$is_bwc = true;
			} else {
				$is_bwc = false;
			}
						
		}
							
		return apply_filters( 'is_bew_woo_cart', $is_bwc );
}

class BewWc{
	private static $_instance = null;
	
	static $shortcode_page_id = 0;

	static $add_scripts = false;

    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
	
	public function __construct() {
				
		// Checks if a queried page contains the woo cart widgets shortcode, needs to happen after the "template_redirect"
		add_action( 'the_posts', array( $this,  'bew_ensure_bwc_shortcode_page_id_is_set' ), 10, 2 );
		
		$this->add_actions();		
	}

	
	public static function bew_ensure_bwc_shortcode_page_id_is_set( $posts, $query ) {

		// Return straight away if there are no posts or if its a secondary query
		if ( empty( $posts ) || ! $query->is_main_query() ) {
			return $posts;
		}

		if ( 0 == self::$shortcode_page_id ) {
			foreach ( $posts as $post ) {
				if ( ( false !== stripos( $post->post_content, 'bew-woo-cart' ) ) || ( 'yes' == get_post_meta( $post->ID, '_bewwc', true ) ) ) {
					self::$add_scripts = true;
					self::$shortcode_page_id = $post->ID;
					break;
				}
			}
		}
		
		return $posts;
	}
		
	public static function check_for_bew_woo_cart( $post_to_check ) {
		
		if ( false !== stripos( $post_to_check->post_content, 'bew-woo-cart' ) ) {
			self::$add_scripts = true;
			self::$shortcode_page_id = $post_to_check->ID;
			$contains_shortcode = true;			
		} else {
			$contains_shortcode = false;			
		}		
		
		return $contains_shortcode;
	}
	
	public function formatted_address_replacements( $replacements, $args ) { 
		
	    $state_code = $args['state'];		
		$country_code = $args['country'];
		$state_name   = WC()->countries->get_states($country_code)[$state_code];
				
		$shipping_address = $state_name . ", " . $country_name; 
		
		$full_state = ( $country_code && $state_code && isset( $state_name) ) ? $state_name : $state_code;
	  
		$replacements['{state_code}'] = $full_state; 
	  
		return $replacements; 
	}
	
	function filter_woocommerce_cart_totals_coupon_html( $coupon_html, $coupon, $discount_amount_html ) {
		if ( is_string( $coupon ) ) { 
			$coupon = new WC_Coupon( $coupon ); 
		} 
	 
		$discount_amount_html = ''; 
	 
		if ( $amount = WC()->cart->get_coupon_discount_amount( $coupon->get_code(), WC()->cart->display_cart_ex_tax ) ) { 
			$discount_amount_html = ''; 
		} elseif ( $coupon->get_free_shipping() ) { 
			$discount_amount_html = __( 'Free shipping coupon', 'woocommerce' ); 
		} 
	 
		$discount_amount_html = apply_filters( 'woocommerce_coupon_discount_amount_html', $discount_amount_html, $coupon ); 
		$coupon_html = $discount_amount_html . ' <a href="' . esc_url( add_query_arg( 'remove_coupon', urlencode( $coupon->get_code() ), defined( 'WOOCOMMERCE_CHECKOUT' ) ? wc_get_checkout_url() : wc_get_cart_url() ) ) . '" class="bew-remove-coupon" data-coupon="' . esc_attr( $coupon->get_code() ) . '">' .'<i class="pe-7s-close"></i>' . '</a>'; 
	 
    return $coupon_html;
	}
	
	function bew_cart_totals_shipping_html() {
	$packages = WC()->shipping()->get_packages();
	$first    = true;

		foreach ( $packages as $i => $package ) {
			$chosen_method = isset( WC()->session->chosen_shipping_methods[ $i ] ) ? WC()->session->chosen_shipping_methods[ $i ] : '';
			$product_names = array();

			if ( count( $packages ) > 1 ) {
				foreach ( $package['contents'] as $item_id => $values ) {
					$product_names[ $item_id ] = $values['data']->get_name() . ' &times;' . $values['quantity'];
				}
				$product_names = apply_filters( 'woocommerce_shipping_package_details_array', $product_names, $package );
			}
			
			wc_get_template(
				'cart/bew-cart-shipping.php',
				array(
					'package'                  => $package,
					'available_methods'        => $package['rates'],
					'show_package_details'     => count( $packages ) > 1,
					'show_shipping_calculator' => is_cart() && apply_filters( 'woocommerce_shipping_show_shipping_calculator', $first, $i, $package ),
					'package_details'          => implode( ', ', $product_names ),
					/* translators: %d: shipping package number */
					'package_name'             => apply_filters( 'woocommerce_shipping_package_name', ( ( $i + 1 ) > 1 ) ? sprintf( _x( 'Shipping %d', 'shipping packages', 'woocommerce' ), ( $i + 1 ) ) : _x( 'Shipping', 'shipping packages', 'woocommerce' ), $i, $package ),
					'index'                    => $i,
					'chosen_method'            => $chosen_method,
					'formatted_destination'    => WC()->countries->get_formatted_address( $package['destination'], ', ' ),
					'has_calculated_shipping'  => WC()->customer->has_calculated_shipping(),
				)
			);

			$first = false;
		}
	}
	
	function is_bewwc($is_bew_woo_cart) {
		$is_bewwc = "yes";
		echo $is_bewwc;
		return $is_bewwc;
	}
			
	private function add_actions() {
								
		if( is_bew_woo_cart()) { 		
			add_filter( 'woocommerce_formatted_address_force_country_display', '__return_true' );
			add_filter( 'woocommerce_formatted_address_replacements', array( $this, 'formatted_address_replacements' ), 10, 2 ); 		
			add_filter( 'woocommerce_cart_totals_coupon_html', array( $this, 'filter_woocommerce_cart_totals_coupon_html' ), 10, 3 );
			add_action( 'bew_cart_totals_shipping', array( $this, 'bew_cart_totals_shipping_html'), 21 );
			add_action( 'is_bew_woo_cart', array( $this, 'is_bewwc'), 10, 2 );
			//add_filter('woocommerce_add_message', '__return_false');
			//add_filter('woocommerce_cart_item_removed_notice_type', '__return_null');			
		}
	
	}

}
BewWc::instance();