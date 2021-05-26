<?php
namespace BriefcasewpExtras;

use Elementor;
use Elementor\Plugin;
use WC_Checkout;
use WP_Error;
use WC_Validation;

function is_bew_woo_checkout( $post_id = null ) {
	
		static $foo_called = false;
		if ($foo_called) return;

		$foo_called = true;

		// If no post_id specified try getting the post_id
		if ( empty( $post_id ) ) {
			global $post;
			
			if ( is_object( $post ) ) {
				$post_id = $post->ID;
				
			} else {
				
				// Try to get the post ID from the URL in case this function is called before init
				$schema = is_ssl() ? 'https://' : 'http://';
				$url = explode('?', $schema . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] );
								
				if(! empty($url[1])){
					$post_id = wc_get_page_id( 'checkout' );
				}else {
					$url_check = $url[0];
					$post_id = url_to_postid( $url_check  );
				}
																				
			}
			
			// Get ID from elementor editor
			if(is_admin()){
				$post_id  = $_GET['post'];				
			}
			
			//echo "hola" .$post_id;
		}
							
		// If still no post_id return straight away
		if ( empty( $post_id )) {
			
			$is_bwco = false;
					

		} else {

			if ( 0 == BewWco::$shortcode_page_id ) {
				$post_to_check = ! empty( $post ) ? $post : get_post( $post_id );				
				
				BewWco::check_for_bew_woo_checkout( $post_to_check );
				
			}
			
			// Compare IDs
			if ( $post_id == BewWco::$shortcode_page_id || ( 'yes' == get_post_meta( $post_id, '_bewwco', true ) ) ) {
				$is_bwco = true;					
			} else {
				$is_bwco = false;				
			}
			
		}
													
		return apply_filters( 'is_bew_woo_checkout', $is_bwco );
}

class BewWco{
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
				
		// Checks if a queried page contains the woo checkout widgets shortcode, needs to happen after the "template_redirect"
		add_action( 'the_posts', array( $this,  'bew_ensure_bwco_shortcode_page_id_is_set' ), 10, 2 );
		
		$this->add_actions();		
	}
	
	public static function bew_ensure_bwco_shortcode_page_id_is_set( $posts, $query ) {

		// Return straight away if there are no posts or if its a secondary query
		if ( empty( $posts ) || ! $query->is_main_query() ) {
			return $posts;
		}

		if ( 0 == self::$shortcode_page_id ) {
			foreach ( $posts as $post ) {
				if ( ( false !== stripos( $post->post_content, 'bew-woo-checkout' ) ) || ( 'yes' == get_post_meta( $post->ID, '_bewwco', true ) ) ) {
					self::$add_scripts = true;
					self::$shortcode_page_id = $post->ID;
					break;
				}
			}
		}
		
		return $posts;
	}
		
	public static function check_for_bew_woo_checkout( $post_to_check ) {
			
		if ( false !== stripos( $post_to_check->post_content, 'bew-woo-checkout' ) ) {
			self::$add_scripts = true;
			self::$shortcode_page_id = $post_to_check->ID;
			
			$contains_shortcode = true;			
		} else {
			$contains_shortcode = false;			
		}		
				
		return $contains_shortcode;
	}
	
	function bew_order_fragments_split_shipping($order_fragments) {

		ob_start();
		$this->bew_woocommerce_order_review_shipping_split();
		$bew_woocommerce_order_review_shipping_split = ob_get_clean();

		$order_fragments['.bew-checkout-review-shipping-table'] = $bew_woocommerce_order_review_shipping_split;

		return $order_fragments;

		}
		
		function bew_order_fragments_review_order($order_fragments) {

		ob_start();
		$this->bew_woocommerce_order_review_order();
		$bew_woocommerce_order_review_order = ob_get_clean();

		$order_fragments['.bew-woocommerce-checkout-review-order-table'] = $bew_woocommerce_order_review_order;

		return $order_fragments;

	}

	// We'll get the template that just has the shipping options that we need for the new table
	function bew_woocommerce_order_review_shipping_split( $deprecated = false ) {
		
		if( file_exists( BEW_EXTRAS_PATH . 'includes/bew-woo-templates/bew-shipping-order-review.php' ) ){
			include BEW_EXTRAS_PATH . 'includes/bew-woo-templates/bew-shipping-order-review.php';
		}
		//wc_get_template( 'checkout/shipping-order-review.php', array( 'checkout' => WC()->checkout() ) );
	}
	
	// We'll get the template bew review order
	function bew_woocommerce_order_review_order( $deprecated = false ) {
		
		if( file_exists( BEW_EXTRAS_PATH . 'includes/bew-woo-templates/bew-review-order.php' ) ){
			include BEW_EXTRAS_PATH . 'includes/bew-woo-templates/bew-review-order.php';
		}
	}
	
	public static function bew_redirect_wc( $atts ) {
		global $wp;

		// Check cart class is loaded or abort.
		if ( is_null( WC()->cart ) ) {
			return;
		}

		// Backwards compatibility with old pay and thanks link arguments.
		if ( isset( $_GET['order'] ) && isset( $_GET['key'] ) ) { // WPCS: input var ok, CSRF ok.
			wc_deprecated_argument( __CLASS__ . '->' . __FUNCTION__, '2.1', '"order" is no longer used to pass an order ID. Use the order-pay or order-received endpoint instead.' );

			// Get the order to work out what we are showing.
			$order_id = absint( $_GET['order'] ); // WPCS: input var ok.
			$order    = wc_get_order( $order_id );

			if ( $order && $order->has_status( 'pending' ) ) {
				$wp->query_vars['order-pay'] = absint( $_GET['order'] ); // WPCS: input var ok.
			} else {
				$wp->query_vars['order-received'] = absint( $_GET['order'] ); // WPCS: input var ok.
			}
		}

		// Handle checkout actions.
		if ( isset( $wp->query_vars['order-received'] ) ) {

			self::order_received( $wp->query_vars['order-received'] );
		}
	}
	
	
	/**
	 * Show the thanks page.
	 *
	 * @param int $order_id Order ID.
	 */
	private static function order_received( $order_id = 0 ) {
		$order = false;

		// Get the order.
		$order_id  = apply_filters( 'woocommerce_thankyou_order_id', absint( $order_id ) );
		$order_key = apply_filters( 'woocommerce_thankyou_order_key', empty( $_GET['key'] ) ? '' : wc_clean( wp_unslash( $_GET['key'] ) ) ); // WPCS: input var ok, CSRF ok.

		if ( $order_id > 0 ) {
			$order = wc_get_order( $order_id );
			if ( ! $order || ! hash_equals( $order->get_order_key(), $order_key ) ) {
				$order = false;
			}
		}

		// Empty awaiting payment session.
		unset( WC()->session->order_awaiting_payment );

		// In case order is created from admin, but paid by the actual customer, store the ip address of the payer
		// when they visit the payment confirmation page.
		if ( $order && $order->is_created_via( 'admin' ) ) {
			$order->set_customer_ip_address( WC_Geolocation::get_ip_address() );
			$order->save();
		}

		// Empty current cart.
		wc_empty_cart();

		wc_get_template( 'checkout/thankyou.php', array( 'order' => $order ) );
	}
	
	function override_default_address_checkout_fields( $address_fields ) {
   
		$address_fields['address_1']['placeholder'] = '';
		$address_fields['address_2']['label'] = '';
		
		
		$fields['billing']['billing_address_2']['label'] = 'Apartment, suite, etc.';
		
		return $address_fields;
	}

	function my_woocommerce_form_field( $field ) {
		return preg_replace(
			'#<p class="form-row (.*?)"(.*?)>(.*?)</p>#',
			'<div class="form-row $1 "$2>$3</div>',
			$field
		);
	}
	
	public function bew_regenerate_fields( $fields ) {
				
		global $post;
		if( has_shortcode( $post->post_content, 'woocommerce_checkout' ) ) return $fields;
		//if( stripos( $post->post_content, 'bew-wao' ) ) return $fields;
		
		$_checkout_fields = get_option( '_bew_checkout_fields', [] );
		
		//echo var_dump($_checkout_fields);
		
		if( empty($_checkout_fields) ) return $fields;
					
		// Apply Custom fields
		//$fields = $_checkout_fields ;
		
		// Create custom fields for sections.		
		//echo var_dump($_checkout_fields);
		
		//check if bew_fields_billing is active
		$bf_billing = get_option( '_bew_checkout_fields_billing');
		
		//check if bew_fields_information is active
		$bf_information = get_option( '_bew_checkout_fields_information');
		
		//check if bew_fields_shipping is active
		$bf_shipping = get_option( '_bew_checkout_fields_shipping');
		
		//check if bew_fields_order is active
		$bf_order = get_option( '_bew_checkout_fields_order');

				
		foreach ( $_checkout_fields as $section => $_fields ) {
						
			if(${"bf_" . $section}  == "bew_fields_". $section ){
				
				if($section == 'information'){
					$section == 'billing';
				}
				
				foreach ( $_fields as $key => $_field ) {
				  
				  //label			  
				  $fields[$section][$key]['label'] = $_field['label'];
				  
				  //required
				  //fields that change dynamically based on the chosen country of a user (address 1, address 2, city, state, postcode) cannot have custom required rules			  
				  if( ($key == $section . '_country') || ($key == $section . '_address_1') || ($key == $section . '_address_2') || 
					  ($key == $section . '_city') || ($key == $section . '_state') || ($key == $section . '_postcode')   ){
					 
				  } else {
					//echo var_dump($key);
					//if(){
					$fields[$section][$key]['required'] = $_field['required'];  
				  }
							  
				}
			}
			
		}
		
		//$fields['billing']['billing_first_name']['label'] = 'testing';
		
		// Get list of fields 
		foreach ( $_checkout_fields as $section => $_fields ) {
			
			if( count( $_fields ) > 0 ) {
				foreach ( $_fields as $key => $_field ) {					
					$bew_fields[] = $key;													
				}
			}
		}
				
		$wc_fields = $this->bew_wc_fields();
		
		//update_option( '_bew_checkout_fields_validate', $bew_fields );
				
		//echo var_dump($wc_fields);
		//echo var_dump($_checkout_fields);
		//echo var_dump($bew_fields);
		//$get_fields = WC()->checkout->get_checkout_fields();
		//echo var_dump($get_fields) ;
		//echo var_dump($fields);
		if ( !is_admin()) {
			
			foreach ( $wc_fields as $section => $_fields ) {
				
				if( count( $_fields ) > 0 ) {
					// Unset delete fields
					foreach ( $_fields as $_field ) {							
						if( !in_array( $_field, $bew_fields ) ) {						
							unset( $fields[ $section ][ $_field ] );
						}
					}
				}
			}
		}
				
		return $fields;
	}
	
	public function bew_regenerate_fields_validate( $fields ) {
				
		global $post;
		if( has_shortcode( $post->post_content, 'woocommerce_checkout' ) ) return $fields;
		//if( stripos( $post->post_content, 'bew-wao' ) ) return $fields;
	
		$_checkout_fields = get_option( '_bew_checkout_fields', [] );
						
		if( empty($_checkout_fields) ) return $fields;
								
		foreach ( $_checkout_fields as $section => $_fields ) {
			
			if( count( $_fields ) > 0 ) {

				foreach ( $_fields as $_field ) {
					
					$bew_fields[] = $_field["{$section}_input_name"] ;
					
					if($section == 'information'){
						$section = 'billing';
						$fields[ 'information' ][ $_field["{$section}_input_name"] ] = [
						'label'			=> $_field["{$section}_input_label"],
						'required'		=> $_field["{$section}_input_required"],
						'class'			=> $_field["{$section}_input_class"],
						'autocomplete'	=> $_field["{$section}_input_autocomplete"],
						'type'			=> $_field["{$section}_input_type"],
						];	
					} else {
						
						$fields[ $section ][ $_field["{$section}_input_name"] ] = [
						'label'			=> $_field["{$section}_input_label"],
						'required'		=> $_field["{$section}_input_required"],
						'class'			=> $_field["{$section}_input_class"],
						'autocomplete'	=> $_field["{$section}_input_autocomplete"],
						'type'			=> $_field["{$section}_input_type"],
						];	
						
					}										
													
				}
			}
		}
				
		$wc_fields = $this->bew_wc_fields();
				
		//echo var_dump($wc_fields);
		//echo var_dump($_checkout_fields);
		//echo var_dump($bew_fields);
		//echo var_dump($fields);
		//$get_fields = WC()->checkout->get_checkout_fields();
		//echo var_dump($get_fields) ;
			
			foreach ( $wc_fields as $section => $_fields ) {
				
				if( count( $_fields ) > 0 ) {
					// Unset delete fields
					foreach ( $_fields as $_field ) {							
						if( !in_array( $_field, $bew_fields ) ) {						
							unset( $fields[ $section ][ $_field ] );
						}
					}
				}
			}
						
		return $fields;
	}
		
	public function bew_address_fields( $checkout_fields ) {

		$checkout_fields['billing']['billing_address_2']['label'] = 'Apartment, suite, etc.';
		$checkout_fields['shipping']['shipping_address_2']['label'] = 'Apartment, suite, etc.';
		
		return $checkout_fields;
	}
	
	public function bew_save_additional_fields( $order, $data ) {
		$posted = $_POST;

		unset( $posted['woocommerce-process-checkout-nonce'] );
		unset( $posted['_wp_http_referer'] );
		
		$wc_fields = $this->bew_wc_fields();
		$default_fields = array_merge( $wc_fields['information'], $wc_fields['billing'], $wc_fields['shipping'], $wc_fields['order'] );
						
		foreach ( $posted as $key => $value ) {
			if( !in_array( $key, $default_fields ) ) {
				$order->update_meta_data( $key, sanitize_text_field( $value ) );
			}
		}
	}
	
	function bew_wc_fields( $section = '' ) {
		$fields = [
			'billing' => [ 'billing_first_name', 'billing_last_name', 'billing_company', 'billing_country', 'billing_address_1', 'billing_address_2', 'billing_city', 'billing_state', 'billing_postcode', 'billing_phone', 'billing_email' ],
			'shipping' => [ 'shipping_first_name', 'shipping_last_name', 'shipping_company', 'shipping_country', 'shipping_address_1', 'shipping_address_2', 'shipping_city', 'shipping_state', 'shipping_postcode' ],
			'order' => [ 'order_comments' ]
		];

		if( $section != '' && isset( $fields[ $section ] ) ) {
			return apply_filters( 'bew_wc_fields', $fields[ $section ] );
		}

		return apply_filters( 'bew_wc_fields', $fields );
	}
		
	/**
	 * Display field value on the order edit page
	 */	
	function bew_checkout_field_display_admin_order_meta($order){
		echo '<p><strong>'.__('Shipping Phone').':</strong> ' . '<span style=" display: block; margin: 5px 0 0 0; ">' .get_post_meta( $order->get_id(), 'shipping_phone', true ) . '</span>'. '</p>';
	}
		
	function bew_review_order_shipping_address() {
		
		$state_code = WC()->customer->get_shipping_state();		
		$country_code = WC()->customer->get_shipping_country();
		$state_name   = WC()->countries->get_states($country_code)[$state_code];	
		$country_name   = WC()->countries->countries[ $country_code ];
				
		$shipping_address = $state_name . ", " . $country_name; 
		
		if ( $shipping_address ) {
			// Translators: $s shipping destination.
			printf( esc_html__( 'Shipping to %s.', 'woocommerce' ) . ' ', '<span>' . esc_html( $shipping_address ) . '</span>' );
		} else {
			echo wp_kses_post( apply_filters( 'woocommerce_shipping_estimate_html', __( 'Shipping options will be updated during checkout.', 'woocommerce' ) ) );
		}
	}
		
	function is_bewwco($is_bew_woo_checkout) {
		$is_bewwco = "yes";
		echo $is_bewwco;
		return $is_bewwco;
	}
	
	
	/**
	 * Validate multi-step checkout fields.
	 *
	 * @since 2.1.0
	 */
	public function bew_validate_checkout_callback() {
		$posted_data = isset($_POST['posted_data'])?$_POST['posted_data']:array();
		
		$_checkout_fields = get_option( '_bew_checkout_fields_validate', [] );
				
		$WC_Checkout = new WC_Checkout();
        $errors = new WP_Error();
		
		//Get custom bew checkout fields to validate
		add_filter( 'woocommerce_checkout_fields', [ $this, 'bew_regenerate_fields_validate' ]);
		
		$html = '';
		
        ////////////////////////////////////////
        $skipped = array();
        $data = array(
            'terms' => (int) isset($posted_data['terms']),
            'createaccount' => (int) !empty($posted_data['createaccount']),
            'payment_method' => isset($posted_data['payment_method']) ? wc_clean($posted_data['payment_method']) : '',
            'shipping_method' => isset($posted_data['shipping_method']) ? wc_clean($posted_data['shipping_method']) : '',
            'ship_to_different_address' => !empty($posted_data['ship_to_different_address']) && !wc_ship_to_billing_address_only(),
            'woocommerce_checkout_update_totals' => isset($posted_data['woocommerce_checkout_update_totals']),
			'use_address_for_billing' => isset($posted_data['use_address_for_billing']),
        );
		            
        foreach ($WC_Checkout->get_checkout_fields() as $fieldset_key => $fieldset) {
            if (isset($data['ship_to_different_address'])) {
                if ('shipping' === $fieldset_key && (!$data['ship_to_different_address'] || !WC()->cart->needs_shipping_address() )) {
                    continue;
                }
            }

            if (isset($data['createaccount'])) {
                if ('account' === $fieldset_key && ( is_user_logged_in() || (!$WC_Checkout->is_registration_required() && empty($data['createaccount']) ) )) {
                    continue;
                }
            }
            foreach ($fieldset as $key => $field) {
                $type = sanitize_title(isset($field['type']) ? $field['type'] : 'text' );

                switch ($type) {
                    case 'checkbox' :
                        $value = isset($posted_data[$key]) ? 1 : '';
                        break;
                    case 'multiselect' :
                        $value = isset($posted_data[$key]) ? implode(', ', wc_clean($posted_data[$key])) : '';
                        break;
                    case 'textarea' :
                        $value = isset($posted_data[$key]) ? wc_sanitize_textarea($posted_data[$key]) : '';
                        break;
                    default :
                        $value = isset($posted_data[$key]) ? wc_clean($posted_data[$key]) : '';
                        break;
                }

                $data[$key] = apply_filters('woocommerce_process_checkout_' . $type . '_field', apply_filters('woocommerce_process_checkout_field_' . $key, $value));
            }
        }

        if (in_array('shipping', $skipped) && ( WC()->cart->needs_shipping_address() || wc_ship_to_billing_address_only() )) {
            foreach ($this->get_checkout_fields('shipping') as $key => $field) {
                $data[$key] = isset($data['billing_' . substr($key, 9)]) ? $data['billing_' . substr($key, 9)] : '';
            }
        }

        //////////////////////////////////////////////////
        foreach ($WC_Checkout->get_checkout_fields() as $fieldset_key => $fieldset) {
			
			//$html.= var_dump("hola". $data['use_address_for_billing']);	
			
			if ($data['use_address_for_billing'] === true){
				
				// Check shipping and contact fields								
				if($fieldset_key == 'billing')
				continue;				
				
			} else {
				// Check shipping, contact and billing fields				
			
			}
			
			//$html.= var_dump($information);
          	//$html.= var_dump($fieldset);		
			//$html.= var_dump($WC_Checkout->get_checkout_fields()); 
			
            if (isset($data['ship_to_different_address'])) {
								
                if ('shipping' === $fieldset_key && (!$data['ship_to_different_address'] || !WC()->cart->needs_shipping_address() )) {
                    continue;						
                }
            }

            if (isset($data['createaccount'])) {
                if ('account' === $fieldset_key && ( is_user_logged_in() || (!$WC_Checkout->is_registration_required() && empty($data['createaccount']) ) )) {
                    continue;
                }
            }
			
			
				
			// add email information on shipping fields
			//$fieldset = $fieldset;
			
			//$html.= var_dump($fieldset);			
            foreach ($fieldset as $key => $field) {
                if (!isset($data[$key])) {
                    continue;
                }
                $required = !empty($field['required']);
                $format = array_filter(isset($field['validate']) ? (array) $field['validate'] : array() );
                $field_label = isset($field['label']) ? $field['label'] : '';
										
					switch ($fieldset_key) {
						case 'shipping' :
							/* translators: %s: field name */
							$field_label = sprintf(__('Shipping %s', 'briefcase-extras'), $field_label);
							break;
						case 'billing' :
							/* translators: %s: field name */
							$field_label = sprintf(__('Billing %s', 'briefcase-extras'), $field_label);
							break;
						case 'information' :
							/* translators: %s: field name */
							$field_label = sprintf(__('Contact %s', 'briefcase-extras'), $field_label);
							break;
					}
				
                if (in_array('postcode', $format)) {
                    $country = isset($data[$fieldset_key . '_country']) ? $data[$fieldset_key . '_country'] : WC()->customer->{"get_{$fieldset_key}_country"}();
											
                    $data[$key] = wc_format_postcode($data[$key], $country);						

                    if ('' !== $data[$key] && !WC_Validation::is_postcode($data[$key], $country)) {
                        $errors->add('validation', sprintf(__('%s is not a valid postcode / ZIP.', 'briefcase-extras'), '<strong>' . esc_html($field_label) . '</strong>'));
                    }
                }

                if (in_array('phone', $format)) {
                    $data[$key] = wc_format_phone_number($data[$key]);

                    if ('' !== $data[$key] && !WC_Validation::is_phone($data[$key])) {
                        /* translators: %s: phone number */
                        $errors->add('validation', sprintf(__('%s is not a valid phone number.', 'briefcase-extras'), '<strong>' . esc_html($field_label) . '</strong>'));
                    }
                }

                if (in_array('email', $format) && '' !== $data[$key]) {
                    $data[$key] = sanitize_email($data[$key]);

                    if (!is_email($data[$key])) {
                        /* translators: %s: email address */
                        $errors->add('validation', sprintf(__('%s is not a valid email address.', 'briefcase-extras'), '<strong>' . esc_html($field_label) . '</strong>'));
                        continue;
                    }
                }

                if ($required && '' === $data[$key]) {
                    /* translators: %s: field name */
                    $errors->add('required-field', apply_filters('woocommerce_checkout_required_field_notice', sprintf(__('%s is a required field.', 'briefcase-extras'), '<strong>' . esc_html($field_label) . '</strong>'), $field_label));
                }
            }
        }
            
        $valid = TRUE;
        if ($errors->get_error_messages()) {
            $valid = FALSE;
            $html = '<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout"><ul class="woocommerce-error" role="alert">';
            foreach ($errors->get_error_messages() as $message) {
                $html.='<li>' . $message . '</li>';
            }
                $html.='</ul></div>';
            }
            
        wp_send_json(array("valid"=>$valid,"html"=>$html));
        wp_die();
    }

    public function get_checkout_fields( $order = false ){
      
        $needs_shipping = true;		
		$fields = get_option( '_bew_checkout_fields', [] );

        return $fields;
    }

    public function get_order_id($order){
        $order_id = false;
        if( version_compare( WOOCOMMERCE_VERSION, '2.3.0', '>=' ) ){
            $order_id = $order->get_id();
        }else{
            $order_id = $order->id;
        }
        return $order_id;
    }

    public function get_option_value( $field, $value ){
        $type = isset( $field['type'] ) ? $field['type'] : false;
        if( $type === 'select' || $type === 'radio' ){
            $options = isset( $field['options'] ) ? $field['options'] : array();
            $options = array_map( 'trim', explode( "\n", $options ) );
            if( is_array( $options ) ){
                $pickvalue = explode( ',', $options[$value-1] );
                $value = ( isset( $pickvalue[1] ) ? $pickvalue[1] : '' );
            }
        }
        return $value;
    }

    public function is_custom_field( $field ){
        $status = false;
        if( is_array( $field ) ){
            if( isset( $field['custom'] ) && $field['custom'] === true ){
                $status = true;
            }
        }
        return $status;
    }

    public function bew_show_custom_fields_in_email( $ofields, $sent_to_admin, $order ){
        
        $custom_fields    = array();
        $checkout_fields  = $this->get_checkout_fields();

        foreach ( $checkout_fields as $section => $fields ) {
			foreach( $fields as $key => $field ) {

				if( isset( $field['show_in_email'] ) && $field['show_in_email'] ){

					$order_id   = $this->get_order_id($order);
					$value      = get_post_meta( $order_id, $key, true );
					
					if( $value ){
						$label = isset( $field['label'] ) && $field['label'] ? $field['label'] : $key;
						$label = esc_attr( $label );
						$value = $this->get_option_value( $field, $value );
						
						$custom_field = array();
						$custom_field['label'] = $label;
						$custom_field['value'] = $value;

						$custom_fields[$key] = $custom_field;
					}

				}

			}
		}

        return array_merge( $ofields, $custom_fields );
    }
	
    public function bew_order_details_after_order_table( $order ){

        $order_id        = $this->get_order_id( $order );
        $checkout_fields = $this->get_checkout_fields( $order );

        if( is_array( $checkout_fields ) && !empty( $checkout_fields ) ){

            $output_data = '';
			
			foreach ( $checkout_fields as $section => $fields ) {
			
				if( count( $fields ) > 0 ) {

					foreach( $fields as $key => $field ){     

						if( $this->is_custom_field( $field ) && isset( $field['show_in_order'] ) && $field['show_in_order'] ){

							$value = get_post_meta( $order_id, $key, true );
							
							if( $value ){

								$label = ( isset( $field['label'] ) && $field['label'] ? $field['label'] : $key );

								$label = esc_attr( $label );

								$value = $this->get_option_value( $field, $value );
								
								if( is_account_page() ){
									if( apply_filters( 'bew_view_order_customer_details_table_view', true ) ){
										$output_data .= '<tr><th>'. $label .':</th><td>'. $value .'</td></tr>';
									}else{
										$output_data .= '<br/><dt>'. $label .':</dt><dd>'. $value .'</dd>';
									}
								}else{
									if( apply_filters( 'bew_thankyou_customer_details_table_view', true )){
										$output_data .= '<tr><th>'. $label .':</th><td>'. $value .'</td></tr>';
									}else{
										$output_data .= '<br/><dt>'. $label .':</dt><dd>'. $value .'</dd>';
									}
								}
							}
						}
					}
				}
			
            }
            
            if( $output_data ){
                do_action( 'bew_order_details_before_custom_fields_table', $order ); 
                ?>
                    <table class="woocommerce-table woocommerce-table--custom-fields shop_table custom-fields">
                        <?php echo $output_data; ?>
                    </table>
                <?php
                do_action( 'bew_order_details_after_custom_fields_table', $order ); 
            }

        }
    }
				
	private function add_actions() {
		
		add_filter('woocommerce_email_order_meta_fields', [ $this, 'bew_show_custom_fields_in_email' ], 10, 3 );
		add_action( 'woocommerce_admin_order_data_after_shipping_address', [ $this, 'bew_checkout_field_display_admin_order_meta'], 10, 1 );
		add_action('woocommerce_order_details_after_order_table', [ $this, 'bew_order_details_after_order_table' ], 20, 1);
		add_action( 'woocommerce_checkout_create_order', [ $this, 'bew_save_additional_fields' ], 10, 2);
		
			
		// Checkout validation
		add_action( 'wp_ajax_bew_validate_checkout', array( $this, 'bew_validate_checkout_callback' ) );
	    add_action( 'wp_ajax_nopriv_bew_validate_checkout', array( $this, 'bew_validate_checkout_callback' ) );
									
		if( is_bew_woo_checkout()) { 
			
			add_filter( 'is_bewopc_checkout', function( $is_opc ) {
				return false;
			} );
			
			add_filter( 'is_bewwao_checkout', function( $is_wao ) {
				return false;
			} );
			
			if ( !is_admin()) {			
			//add_filter( 'bew_woocommerce_form_field', [ $this, 'my_woocommerce_form_field' ] );
			add_filter( 'woocommerce_checkout_fields', [ $this, 'bew_regenerate_fields' ]);
			add_filter( 'woocommerce_checkout_fields', [ $this, 'bew_address_fields' ]);
			}
			
			//add_filter( 'woocommerce_default_address_fields' , [ $this, 'override_default_address_checkout_fields' ], 20, 1 );
			
			// hook into the fragments in AJAX and add our new table to the group
			add_filter('woocommerce_update_order_review_fragments', [ $this, 'bew_order_fragments_split_shipping' ], 10, 1);
			
			// hook into the fragments in AJAX and add our new review order
			add_filter('woocommerce_update_order_review_fragments', [ $this, 'bew_order_fragments_review_order' ], 10, 1);

			//Wp hook for templates for each page
			//add_action( 'template_redirect', [ $this, 'bew_redirect_wc' ] );	
			
			add_action( 'bew_order_received', array( $this, 'bew_redirect_wc'), 21 );
			
			//Use customer shipping address 
			add_action( 'bew_review_order_shipping', [ $this, 'bew_review_order_shipping_address' ] );		
		
			add_action( 'is_bew_woo_checkout', array( $this, 'is_bewwco'), 10, 2 );
			
				
		}
	
	}

}
BewWco::instance();