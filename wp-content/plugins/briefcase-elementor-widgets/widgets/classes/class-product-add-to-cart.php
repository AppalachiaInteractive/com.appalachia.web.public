<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Add to cart
 *
 * This class is for anything Product Add to carte related
 *
 * @class          Bew_dynamic_product_add_to_cart
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_add_to_cart {
	
	private $settings = [];	

	public function __construct( $settings = [], $product = [] ) {
		$this->settings = $settings;
		$this->product = $product;
	}
	
	/**
	 * Get Content: bew_get_content	 
	 *
	 * @return $content
	 */	 
	public function bewdf_get_content() {
		return $this->bew_product_add_to_cart();
	}

	protected function bew_product_add_to_cart() {
		
		$settings = &$this->settings;
		$product  = &$this->product;
		
		$product_type 		 			 		= $settings['product_type'];
		$product_id_custom 	 			 		= $settings['product_id'];
		$product_addtocart_visible_buttom		= $settings['product_addtocart_visible_buttom'];
		$product_addtocart_ajax					= $settings['product_addtocart_ajax'];		
		$product_opencart_ajax					= $settings['product_opencart_ajax'];	
		$product_show_qty_box 	 			 	= $settings['product_show_qty_box'];
		$product_add_to_cart_options	 		= $settings['product_add_to_cart_options'];
		
		//echo $product_add_to_cart_options;
				
		// conditional for product by ID
		if('yes' == $product_type){
			
			// conditional for  add to  product always visible mode
			if('yes' == $product_addtocart_visible_buttom){	
				$this->product_add_to_cart_visible_by_id();			
			}					
				
				$this->get_product_data_by_id();
			
		} else {
							
			// conditional for  add to cart product always visible mode
			if('yes' == $product_addtocart_visible_buttom){	
			$this->product_add_to_cart_visible();			
			}
					
			$this->product_add_to_cart_html();
															
			$product_id  = $product->get_id();	
					
			$product_view_cart_text =  $settings['product_addtocart_text_view_cart'];					
			$product_view_cart_icon =  $settings['product_addtocart_icon_view_cart'];
			$product_view_cart_link =  $settings['product_addtocart_view_cart_link'];
			$product_view_cart_link_url =  $settings['product_addtocart_view_cart_link_url'];
					
			if( $product_view_cart_link == 'yes' ){
						
				if( empty($product_view_cart_link_url) ){	
					$product_view_cart_link_url =  apply_filters( 'bew_woocommerce_add_to_cart_redirect', wc_get_cart_url() );
				}else{
					$product_view_cart_link_url =  $settings['product_addtocart_view_cart_link_url'];
				}
						
			} else{
												
				$product_view_cart_link_url =  "";
						
			}
			
			$product_type = $product->get_type();
			
			if(is_single($product_id )){
		
				//passing variables to the javascript file
				wp_localize_script('woo-single-product', 'bew_add_to_cart_ajax', array(
					'ajax_url' => admin_url( 'admin-ajax.php' ),
					'ajax_active' => $product_addtocart_ajax,
					'product_type' => $product_type,
					'opencart_active' => $product_opencart_ajax,
					'is_cart' => is_cart(),
					'cart_url' => apply_filters( 'bew_woocommerce_add_to_cart_redirect', wc_get_cart_url() ),
					'view_cart' => esc_html__( 'View cart', 'briefcase-elementor-widgets' )
				));		
			}
						
				//passing variables to woo general
				wp_localize_script( 'woo-general', 'bew_woo_view_cart', array(
					'is_cart' => is_cart(),
					'view_cart' => esc_html__( $product_view_cart_text, 'briefcase-elementor-widgets' ),
					'view_cart_icon' => esc_html__( $product_view_cart_icon, 'briefcase-elementor-widgets' ),
					'view_cart_link' => esc_html__( $product_view_cart_link, 'briefcase-elementor-widgets' ),
					'view_cart_link_url' => esc_html__( $product_view_cart_link_url, 'briefcase-elementor-widgets' )
				));													
		}
	}

	function bew_get_last_product_id(){
		global $wpdb;
		
		// Getting last Product ID (max value)
		$results = $wpdb->get_col( "
			SELECT MAX(ID) FROM {$wpdb->prefix}posts
			WHERE post_type LIKE 'product'
			AND post_status = 'publish'" 
		);
		return reset($results);
	}
	
	protected function check_product_add_to_cart(){
		
		$settings = &$this->settings;
							
		global $product;
		global $post;
		
		if(!$product){
            return '';
        }
		
		$product_id  = $product->get_id();		
		$post_type = get_post_type($post->ID);	
					
		if( class_exists( 'WooCommerce' ) ) {
			
			switch ( $post_type ) {
			case 'product':	
			if ( is_single($product_id ) ){			
			
				return woocommerce_template_single_add_to_cart();
				
			}else{
				
				if ( class_exists( 'Woo_Variation_Swatches_Pro' ) ){
					
					// options for wvs_pro plugin
					$position = trim( woo_variation_swatches()->get_option( 'archive_swatches_position' ) );
					if ( $position == "before" ){
						?>
						<div class="woo-variation-swatches-shop-before">
						<?php
							do_action('wvs_pro_variation_show_archive_variation_before_cart_button');
						?>
						</div>
						<?php
							woocommerce_template_loop_add_to_cart();
					}else{
							woocommerce_template_loop_add_to_cart();
						?>
						<div class="woo-variation-swatches-shop-after">
						<?php
							do_action('wvs_pro_variation_show_archive_variation_after_cart_button');
						?>
						</div>
						<?php
					}
					
				}else{
					
					// Hook For Iconic Swatches plugin
					do_action( 'bew_shop_loop_before_add_to_cart' );
					
					return woocommerce_template_loop_add_to_cart();
					
					// Hook For Iconic Swatches plugin
					do_action( 'bew_shop_loop_after_add_to_cart' );
				}
		
			}
			break;
			case 'elementor_library':	
			
			$bew_template_type = get_post_meta($post->ID, 'briefcase_template_layout', true);
			
				if ( 'woo-product' == $bew_template_type  ){
								
					return woocommerce_template_single_add_to_cart();				 					 			
				}else {
				
					return woocommerce_template_loop_add_to_cart();		
				}		    
			break;
			default:
			
			return woocommerce_template_loop_add_to_cart();	    
			}
		}
	}
			
	protected function get_product_data_by_id(){
		
		$settings = &$this->settings;
		
		$product_type 		 			 		= $settings['product_type'];
		$product_id_custom 	 					= $settings['product_id'];		
		$product_show_qty_box 	 			 	= $settings['product_show_qty_box'];
		$product_addtocart_icon 		    	= $settings['product_addtocart_icon'];
		$product_addtocart_text 		    	= $settings['product_addtocart_text'];
		$product_addtocart_icon_align 		    = $settings['product_addtocart_icon_align'];
		$product_buttom_direction				= $settings['product_buttom_direction'];
		$product_addtocart_underlines			= $settings['product_addtocart_underlines'];

		
		// Wrap classes
		$wrap_classes 		= array( 'product-by-id');
		
		if ( 'yes' == $product_show_qty_box) {
				$wrap_classes[]  = 'show-qty';
		}		
				
		$wrap_classes = implode( ' ', $wrap_classes );
		
		// Inner classes
		$inner_classes 		= array( 'bew-add-to-cart');
		
		if ( 'yes' == $product_type) {
				$inner_classes[]  = 'button-by-id';
		}
		
		if ( 'yes' == $product_show_qty_box) {
				$inner_classes[]  = 'show-qty';
		}
		
		if ( '' == $product_addtocart_text ) {
				$inner_classes[]  = 'button-no-text';
		}		
				$inner_classes[]  = 'bew-align-icon-' . $product_addtocart_icon_align;
				
				$inner_classes[]  = 'bew-product-button-' . $product_buttom_direction;
				
		if ( 'yes' == $product_addtocart_underlines) {
				$inner_classes[]  = 'btn-underlines';
		
		}		
						
		$inner_classes = implode( ' ', $inner_classes );		
		
		// Show custom ID		
			 
        if ($product_id_custom != ''){
			
            $product_data = wc_get_product($product_id_custom);
			
        }else{
           
		   $product_id_last = $this->bew_get_last_product_id();			
		   $product_data =  wc_get_product($product_id_last );

		}
        
        $product = $product_data; 
		
		//echo var_dump($product->get_id());
				
	// Add to cart underlines mode		
		if ( 'yes' == $product_addtocart_underlines) {
				$svg  =	'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="61" height="12" viewBox="0 0 61 12"><path d="';
				$html = 'M60.217,1.433 C45.717,2.825 31.217,4.217 16.717,5.609 C13.227,5.944 8.806,6.200 6.390,5.310 C7.803,4.196 11.676,3.654 15.204,3.216 C28.324,1.587 42.033,-0.069 56.184,0.335 C58.234,0.394 60.964,0.830 60.217,1.433 ZM50.155,5.670 C52.205,5.728 54.936,6.165 54.188,6.767 C39.688,8.160 25.188,9.552 10.688,10.943 C7.198,11.278 2.778,11.535 0.362,10.645 C1.774,9.531 5.647,8.988 9.175,8.551 C22.295,6.922 36.005,5.265 50.155,5.670 Z';
				$svg2 = '"></path></svg>';
		}	
		
	// Made the add to cart buttom by id		
		echo'<div class="'. esc_attr( $wrap_classes ) .'">';
		
		// Quantity section
		if ( ! is_shop() && ! is_product_taxonomy() && $product->is_type( 'simple' ) ) {
		echo'<div id="bew-qty" class="bew-quantity">';		
		$quantity_field = woocommerce_quantity_input( array(
			'input_name'  => 'product_id',
			'input_value' => ! empty( $product->cart_item['quantity'] ) ? $product->cart_item['quantity'] : 1,
			'max_value'   => $product->backorders_allowed() ? '' : $product->get_stock_quantity(),
			'min_value'   => 0,
		), $product, false );
		echo $quantity_field;
		echo '</div>';		
		}

	    // Buttom section
	    if ( version_compare( WC()->version, '3.0.0', '>=' ) ) {
			$product_id = $product->get_id();
			$product_type = $product->get_type();
		} else {
			$product_id = $product->id;
			$product_type = $product->product_type;
		}

		$class = implode( ' ', array_filter( [
			'button bew-element-woo-add-to-cart-btn',
			'product_type_' . $product_type,
			$product->is_purchasable() && $product->is_in_stock() ? 'add_to_cart_button' : 'out-of-stock',
			$product->supports( 'ajax_add_to_cart' ) ? 'ajax_add_to_cart' : '',
		] ) );

		echo'<div id="bew-cart" class="'. esc_attr( $inner_classes ) .'">';	
			
			if ( $product && $product->is_type( 'simple' ) && $product->is_purchasable() && $product->is_in_stock() && ! $product->is_sold_individually() ) {
						
			echo apply_filters( 'woocommerce_loop_add_to_cart_link',
			   sprintf( '<a rel="nofollow" href="%s" data-quantity="%s" data-product_id="%s" data-product_sku="%s" class="%s"><i class="%s" aria-hidden="true"></i>%s'.$svg. '%s' . $svg2 .'</a>',			   
			   esc_url( $product->add_to_cart_url() ),
				   esc_attr( isset( $quantity ) ? $quantity : 1 ),
				   esc_attr( $product->get_id() ),
				   esc_attr( $product->get_sku() ),
				   esc_attr( isset( $class ) ? $class : 'button bew-element-woo-add-to-cart-btn' ),
				   esc_attr( $product_addtocart_icon ),
				   esc_html( $product_addtocart_text ),
				   esc_attr( $html )
			   ),
			   $product,
			   $args );			
		   } elseif( $product && $product->is_type( 'variable' ) && $product->is_purchasable() && $product->is_in_stock() && ! $product->is_sold_individually() ) {
			  //woocommerce_variable_add_to_cart(); 
			  echo'<div class="button bew-element-woo-add-to-cart-btn">Set a Product ID</div>';	
		   }
		   
		echo '</div>';
		   
		echo '</div>';   
	   
	// JS for update the quantity data
		wc_enqueue_js( "
		jQuery( '#bew-qty .qty' ).on( 'change', function() {
		
			var qty = jQuery( this ),
				atc = jQuery( this ).on( '#bew-cart a' );
			
		jQuery( '#bew-cart .add_to_cart_button' ).attr( 'data-quantity', qty.val() );
		});
		" );
		
	}
	
	protected function product_add_to_cart_visible_by_id(){	
		
		$settings = &$this->settings;
	
		$product_type 					= $settings['product_type'];
		$product_showqtyv				= $settings['product_showqtyv'];
		$product_id_custom 				= $settings['product_id'];
		$product_addtocart_icon    		= $settings['product_addtocart_icon'];
		$product_addtocart_text    		= $settings['product_addtocart_text'];
		$product_addtocart_icon_align 	= $settings['product_addtocart_icon_align'];	
		
		// show qty box
		if ( 'yes' == $product_showqtyv ) {
			$show_qty_class = 'show-qty';
		}
		
		// Inner classes
		$inner_classes 		= array( 'bew-add-to-cart-avm');
			
		if ( 'yes' == $product_type) {
			$inner_classes[]  = 'button-by-id';
		}
			
		if ( '' == $product_addtocart_text ) {
			$inner_classes[]  = 'button-no-text';
		}
			
		$inner_classes[]  = 'bew-align-icon-' . $product_addtocart_icon_align;
			
		$inner_classes = implode( ' ', $inner_classes );
			
		// Show custom ID			 
		if ( 'yes' == $product_type) {
			
			if ($product_id_custom != ''){
				$product_data = wc_get_product($product_id_custom);
			}else{					
				$product_id = $this->bew_get_last_product_id();			
				$product_data =  wc_get_product($product_id );
			}       
			$product = $product_data;
			
		} else {
				
			// Show current product data		
			global $product;
			
		}
			
		// Made the add to cart buttom by id		
			
		echo '<div id="top-avm" class = "always-visible productadd">';
		echo '<div class = "product-title">';		
		echo '<h2 class="single-post-title-ovm" itemprop="name">' . $product->get_title() . '</h2>';
		echo '</div>';
		echo '<div class = "product-buttom">';	
		echo '<div class = "product-by-id ' . $show_qty_class . '">';	
			
		// Quantity section
		if ( ! is_shop() && ! is_product_taxonomy() ) {
			echo'<div id="bew-qty-avm" class="bew-quantity">';		
			$quantity_field = woocommerce_quantity_input( array(
				'input_name'  => 'product_id',
				'input_value' => ! empty( $product->cart_item['quantity'] ) ? $product->cart_item['quantity'] : 1,
				'max_value'   => $product->backorders_allowed() ? '' : $product->get_stock_quantity(),
				'min_value'   => 0,
			), $product, false );
			echo $quantity_field;
			echo '</div>';		
		}

		// Buttom section
		if ( version_compare( WC()->version, '3.0.0', '>=' ) ) {
			$product_id = $product->get_id();
			$product_type = $product->get_type();
		} else {
			$product_id = $product->id;
			$product_type = $product->product_type;
		}

		$class = implode( ' ', array_filter( [
			'button bew-element-woo-add-to-cart-btn',
			'product_type_' . $product_type,
			$product->is_purchasable() && $product->is_in_stock() ? 'add_to_cart_button' : 'out-of-stock',
			$product->supports( 'ajax_add_to_cart' ) ? 'ajax_add_to_cart' : '',
		] ) );
			   
		if ( $product && $product->is_type( 'simple' ) && $product->is_purchasable() && $product->is_in_stock() && ! $product->is_sold_individually() ) {
				
			echo'<div id="bew-cart-avm" class="'. esc_attr( $inner_classes ) .'">';	
			echo apply_filters( 'woocommerce_loop_add_to_cart_link',
				   
			sprintf( '<a rel="nofollow" href="%s" data-quantity="%s" data-product_id="%s" data-product_sku="%s" class="%s"><i class="%s" aria-hidden="true"></i>%s</a>',
				esc_url( $product->add_to_cart_url() ),
					esc_attr( isset( $quantity ) ? $quantity : 1 ),
					esc_attr( $product->get_id() ),
					esc_attr( $product->get_sku() ),
					esc_attr( isset( $class ) ? $class : 'button bew-element-woo-add-to-cart-btn' ),
					esc_attr( $product_addtocart_icon ),
					esc_html( $product_addtocart_text )	
				),
				$product );
				   
			echo '</div>';
		}
			   
			echo '</div>';
			echo '<p itemprop="price">' . $product->get_price_html() . '</p>';		
			echo '</div>';
			echo '</div>';
		   
		// JS for update the quantity data
		wc_enqueue_js( "
		jQuery( '#bew-qty .qty' ).on( 'change', function() {
			
			var qty = jQuery( this ),
				atc = jQuery( this ).on( '#bew-cart a' );
				
				jQuery( '#bew-cart .add_to_cart_button' ).attr( 'data-quantity', qty.val() );
		});
		" );		
		
	}
	
	protected function product_add_to_cart_visible(){	
		
		$settings = &$this->settings;
		
		$product_type 			= $settings['product_type'];
		$product_showqtyv		= $settings['product_showqtyv'];
		$product_id_custom 		= $settings['product_id'];
		$product_addtocart_text = $settings['product_addtocart_text'];
		
		// show qty box
		if ( 'yes' == $product_showqtyv ) {
			$show_qty_class = 'show-qty';
		}
		
		// Show custom ID			 
		if ( 'yes' == $product_type) { 
			if ($product_id_custom != ''):
				$product_data = wc_get_product($product_id_custom);
			else:
				// Todo:: Get product from template meta field if available
				$args = array(
					'post_type' => 'product',
					'post_status' => 'publish',
					'posts_per_page' => 1
				);
				$preview_data = get_posts( $args );
				$product_data =  wc_get_product($preview_data[0]->ID);
			endif;        
				$product = $product_data; 
		} else {	
		// Show current product data		
		global $product; 
		}
			
		// Add to cart text
		$product_addtocart_text_sanitize = sanitize_title($product_addtocart_text);
		$product_addtocart_text = esc_html__( $product_addtocart_text , 'briefcase-elementor-widgets' );
			
		if ( 'add-to-cart' == $product_addtocart_text_sanitize) { 
			$product_addtocart_text = esc_html( $product->single_add_to_cart_text() );				
		}
				
		if ( $product && $product->is_type( 'simple' ) && $product->is_purchasable() && $product->is_in_stock() && ! $product->is_sold_individually() ) {
			$html  = '<div id="top-avm" class = "always-visible ' . (isset($show_qty_class) ? $show_qty_class : null) . ' productadd ">';
			$html .= '<div class = "product-title">';		
			$html .= '<h2 class="single-post-title-ovm" itemprop="name">' . $product->get_title() . '</h2>';
			$html .= '</div>';
			$html .= '<div class = "product-buttom">';		
			$html .= '<form action="' . esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ) . '" class="cart" method="post" enctype="multipart/form-data">';
			$html .= woocommerce_quantity_input( array(
					'input_name'  => 'quantity',
					'input_value' => ! empty( $product->cart_item['quantity'] ) ? $product->cart_item['quantity'] : 1,
					'max_value'   => $product->backorders_allowed() ? '' : $product->get_stock_quantity(),
					'min_value'   => 0,
				), $product, false );
			$html .= '<button type="submit" name="add-to-cart" value="'.$product->get_id().'" class="single_add_to_cart_button button button-by-id alt ">' . $product_addtocart_text . '<span class = "line"> - </span>' . $product->get_price_html() . '</button>';
			$html .= '</form>';
			$html .= '<p itemprop="price">' . $product->get_price_html() . '</p>';
			$html .= '</div>';
			$html .= '</div>';
		}
			
		echo $html;
			
		do_action( 'woocommerce_before_single_product' );
	}
	
	protected function bew_loop_add_to_cart($product_addtocart_icon,$product_addtocart_text,$product_addtocart_text_variable,$product_addtocart_text_grouped,$overlay_button,$product_addtocart_underlines){
	
	    global $product;
	   
	    if ( version_compare( WC()->version, '3.0.0', '>=' ) ) {
			$product_id = $product->get_id();
			$product_type = $product->get_type();
		} else {
			$product_id = $product->id;
			$product_type = $product->product_type;
		}

		$class = implode( ' ', array_filter( [
			'button bew-element-woo-add-to-cart-btn',
			'product_type_' . $product_type,
			$product->is_purchasable() && $product->is_in_stock() ? 'add_to_cart_button' : 'out-of-stock',
			$product->supports( 'ajax_add_to_cart' ) ? 'ajax_add_to_cart' : '',
		] ) );

		if ( 'square' == $overlay_button || 'circle' == $overlay_button ) {
			if ( '' == $product_addtocart_icon) {
				$product_addtocart_icon = 'fa fa-shopping-bag';
			}
				$product_addtocart_text = '';				
		}
			
		if ( 'yes' == $product_addtocart_underlines) {
			$svg  =	'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="61" height="12" viewBox="0 0 61 12"><path d="';
			$html = 'M60.217,1.433 C45.717,2.825 31.217,4.217 16.717,5.609 C13.227,5.944 8.806,6.200 6.390,5.310 C7.803,4.196 11.676,3.654 15.204,3.216 C28.324,1.587 42.033,-0.069 56.184,0.335 C58.234,0.394 60.964,0.830 60.217,1.433 ZM50.155,5.670 C52.205,5.728 54.936,6.165 54.188,6.767 C39.688,8.160 25.188,9.552 10.688,10.943 C7.198,11.278 2.778,11.535 0.362,10.645 C1.774,9.531 5.647,8.988 9.175,8.551 C22.295,6.922 36.005,5.265 50.155,5.670 Z';
            $svg2 = '"></path></svg>';
		}
							
		if ($product->is_in_stock()) {
								
			if (empty($product_addtocart_text)) {
				
				$product_addtocart_text_v = '';
				
			} else {
						
				$product_type = $product->get_type();
				$external_text = $product->button_text;
			
				$subscription_text = get_option( 'woocommerce_subscriptions_add_to_cart_button_text', __( 'Sign Up Now', 'woocommerce-subscriptions' ) );
										
				switch ( $product_type ) {
					case 'simple':
						$options = __( $options = $product_addtocart_text, 'woocommerce' );
					break;
					case 'grouped':
						$options = __( $options = $product_addtocart_text_grouped, 'woocommerce' );
					break;
					case 'external':						
						if (empty($external_text)){
							$options = __( $options = 'Buy Now', 'woocommerce' );	
						} else{
							$options = __( $options = $external_text, 'woocommerce' );							
						}
					break;
					case 'variable':
						$options = __( $options = $product_addtocart_text_variable, 'woocommerce' );
					break;
					case 'subscription':							
						if (empty($subscription_text)){
							$options = __( $options = 'Sign Up Now', 'woocommerce' );	
						} else{
							$options = __( $options = $subscription_text, 'woocommerce' );							
						}
					break;
					case 'variable-subscription':
						if (empty($subscription_text)){
							$options = __( $options = 'Select options', 'woocommerce' );	
						} else{
							$options = __( $options = $subscription_text, 'woocommerce' );								
						}
					break;
					case 'booking':
						$options = __( $options = 'Book now', 'woocommerce-bookings' );
					break;
					default:
						$options = __( $options = $product_addtocart_text, 'woocommerce' );
				}											
					$product_addtocart_text_v = $options;				
			} 
		} else {
			if (empty($product_addtocart_text)) {
				$product_addtocart_text_v = '';
			} else {
				$product_addtocart_text_v = 'Read More';
			}
		}

        echo apply_filters( 'woocommerce_loop_add_to_cart_link',
            sprintf( '<a rel="nofollow" href="%s" data-quantity="%s" data-product_id="%s" data-product_sku="%s" class="%s"><i class="%s" aria-hidden="true"></i>%s'.$svg. '%s' . $svg2 .'</a>',
               esc_url( $product->add_to_cart_url() ),
               esc_attr( isset( $quantity ) ? $quantity : 1 ),
               esc_attr( $product->get_id() ),
               esc_attr( $product->get_sku() ),
               esc_attr( isset( $class ) ? $class : 'button bew-element-woo-add-to-cart-btn' ),
			   esc_attr( $product_addtocart_icon ),
               esc_html( $product_addtocart_text_v ),
			   esc_attr( $html )
			),
           $product );
	}
	 
	protected function product_add_to_cart_html(){			
		
		$settings = &$this->settings;
		
		
		$dynamic_field_value 						= $settings['dynamic_field_value'];
		$product_show_qty_box 	 			 		= $settings['product_show_qty_box'];
		$product_show_qty_text 	 			 		= $settings['product_show_qty_text'];
		$product_qty_text 	 			 	    	= $settings['product_qty_text'];
		$product_addtocart_visible_buttom			= $settings['product_addtocart_visible_buttom'];
		$product_addtocart_hover_buttom 			= $settings['product_addtocart_hover_buttom'];
		$product_addtocart_icon 		    		= $settings['product_addtocart_icon'];
		$product_addtocart_text 		    		= $settings['product_addtocart_text'];
		$product_addtocart_text_variable 			= $settings['product_addtocart_text_variable'];
		$product_addtocart_text_grouped 			= $settings['product_addtocart_text_grouped'];
		$product_addtocart_icon_align 		    	= $settings['product_addtocart_icon_align'];
		$product_buttom_direction					= $settings['product_buttom_direction'];
		$overlay_button								= $settings['overlay_button'];
		$product_addtocart_underlines				= $settings['product_addtocart_underlines'];
		$price_variation_text						= $settings['price_variation_text'];
		$product_addtocart_vp_dynamic		    	= $settings['product_addtocart_variation_price_dynamic'];
		$vp_dynamic_description		    			= $settings['variation_price_dynamic_description'];
		$vp_dynamic_availability		    		= $settings['variation_price_dynamic_availability'];
		$product_addtocart_icon_view_cart 			= $settings['product_addtocart_icon_view_cart'];
		$product_addtocart_icon_align_view_cart 	= $settings['product_addtocart_icon_align_view_cart'];
		$product_addtocart_text_view_cart		 	= $settings['product_addtocart_text_view_cart'];
		
		global $product;
		// Inner classes
		$inner_classes 		= array( 'bew-add-to-cart bew-add-to-cart-single');
		
		if ( 'yes' == $product_show_qty_box) {
			$inner_classes[]  = 'show-qty';
		}
		if ( 'yes' == $product_addtocart_visible_buttom) {
			$inner_classes[]  = 'hide-buttomdc';
		}
		if ( 'yes' == $product_addtocart_hover_buttom) {
			$inner_classes[]  = 'hover-buttom';
		}
		if ( 'custom' == $overlay_button) {
			$inner_classes[]  = 'btn-custom';
		}
		if ( 'square' == $overlay_button) {
			$inner_classes[]  = 'btn-square';				
		}
		if ( 'circle' == $overlay_button) {
			$inner_classes[]  = 'btn-circle';
		}
		if ( 'yes' == $product_addtocart_underlines) {
			$inner_classes[]  = 'btn-underlines';		
		}
				
		if ( 'block' == $product_buttom_direction) {
			$inner_classes[]  = 'bew-cart-vertical';
		}
			$inner_classes[] = 'bew-image-'. $product->get_id();
			$inner_classes[] = 'bew-product-'. $product->get_id();
						
		if ( '' == $product_addtocart_text || 'circle' == $overlay_button || 'square' == $overlay_button) {
			$inner_classes[]  = 'button-no-text';
			$inner_classes[]  = 'bew-align-icon-middle';
			$inner_classes[]  = 'bew-align-icon-view-cart-middle';
		} else {
			$inner_classes[]  = 'bew-align-icon-' . $product_addtocart_icon_align;
			$inner_classes[]  = 'bew-align-icon-view-cart-' . $product_addtocart_icon_align_view_cart;
		}
		
		if ( ! empty($product_addtocart_icon_view_cart)) {
			$inner_classes[]  = 'view-cart-custom-icon';
		}
		
		if ( empty($product_addtocart_text_view_cart)) {
			$inner_classes[]  = 'view-cart-no-text';
		}
		
		$inner_classes = implode( ' ', $inner_classes );
				
		ob_start();
		
		?>		
		<div id="bew-cart" class="<?php echo esc_attr( $inner_classes ); ?>">		
		<?php
		
		
		if ( 'square' == $overlay_button || 'circle' == $overlay_button  || 'yes' == $product_addtocart_underlines || ('' != $product_addtocart_icon && !is_product()) ) {
			
			// Hook For Iconic Swatches plugin
			do_action( 'bew_shop_loop_before_add_to_cart' );
				
			$this->bew_loop_add_to_cart($product_addtocart_icon,$product_addtocart_text,$product_addtocart_text_variable,$product_addtocart_text_grouped,$overlay_button,$product_addtocart_underlines);
					
			// Hook For Iconic Swatches plugin
			do_action( 'bew_shop_loop_after_add_to_cart' );
		
		} else {
		
			$product_type = $product->get_type();
		
			$product_addtocart_text_sanitize = sanitize_title($product_addtocart_text);
			$product_addtocart_text_variable_sanitize = sanitize_title($product_addtocart_text_variable);
			$product_addtocart_text_grouped_sanitize = sanitize_title($product_addtocart_text_grouped);
		
			$product_id  = $product->get_id();	
			$current_single = is_single($product_id );
			
			if ('add-to-cart' != $product_addtocart_text_sanitize || 'select-options' != $product_addtocart_text_variable_sanitize || 'view-products' != $product_addtocart_text_grouped_sanitize  ) {	
				
				// Filter add to cart text
				add_filter( 'woocommerce_product_add_to_cart_text' , [ $this, 'custom_woocommerce_product_add_to_cart_text_loop' ] );
				if (is_product() && $current_single  == '1' ) {		
					add_filter( 'woocommerce_product_single_add_to_cart_text', [ $this,  'custom_woocommerce_product_add_to_cart_text_single' ] );
					add_filter( 'woocommerce_booking_single_add_to_cart_text', [ $this, 'custom_woocommerce_product_add_to_cart_text_single' ] );	
				}
	
			}
						
			// Apply the correct add to cart type
			$this->check_product_add_to_cart();
				
			// Show Dynamic Variation Price.		
			if($product_addtocart_vp_dynamic == 'yes' && $current_single){
				?>
				<script type="text/javascript">
					jQuery(function ($) {
					/**
					* Change Price Variation to correct position
					*/				
						$('.variations_form').on('show_variation', function () {
							
							var variation_price = $('.woocommerce-variation-price .price').html();
							var vp_dynamic_description = '<?php echo $vp_dynamic_description; ?>';
							var vp_dynamic_availability = '<?php echo $vp_dynamic_availability; ?>';
							
							if(vp_dynamic_description != 'yes'|| vp_dynamic_availability != 'yes' ){
									$('.woocommerce-variation' ).addClass("no-margin");
									$('.woocommerce-variation-description' ).css("margin","0");
								}
								
							if(variation_price){
																
									$('.bew-price-grid .product-price' ).hide();
									$('.bew-price-grid .bew-variation-price .price').html(variation_price).show();
							}					
						});				
					});	
							
					jQuery(function ($) {
						$('.variations_form').on('hide_variation', function () {	
							$('.bew-price-grid .product-price' ).show();
						  $('.bew-price-grid .bew-variation-price .price').hide();						 
						});						
					});	
							
				</script>
				<?php
			}
						
			// js for add icon to the buttom on product page
			$icon_type = '<i class="' . $product_addtocart_icon . '" aria-hidden="true"></i>';
			?>
			<script type="text/javascript">
				( function( $ ) {
					$(document).ready(function() {
					
					var product_id = '.bew-product-<?php echo $product->get_id(); ?>'
					var submit_button = $('#bew-cart' + product_id  + ' .button');			
					var icon_type = '<?php echo $icon_type; ?>';
					var icon = '<?php echo $product_addtocart_icon; ?>';
					var price_variation_text = '<?php echo $price_variation_text; ?>';
					var price_variation = $('.single_variation_wrap');
					var product_qty_text = '<?php echo $product_qty_text; ?>';
					var product_qty = $('#bew-cart .quantity');
					
					
					if (icon === '') {				
					} else {	
					submit_button.not(':has(i)').prepend(icon_type);	
					}
					if (price_variation_text === '') {				
					} else {						
					  price_variation.prepend('<style>#bew-cart .woocommerce-variation-price .price:before{ content: "' + price_variation_text + ': "}</style>');
					}
					
					if (product_qty_text === '') {				
					} else {						
					  product_qty.before('<span class="bew-qty-text">' + product_qty_text + '</span>');
					}
											
					});
				} )( jQuery );		
			</script>
		
			<?php	
		}
		?>
		</div>
		<?php
		$my_buttom = ob_get_clean();
		
		echo $my_buttom; 		
	
	}

	function custom_woocommerce_product_add_to_cart_text_single() {
	
		$settings = &$this->settings;
		
		global $product;
		
		$product_addtocart_text = $settings['product_addtocart_text'];	
		
		if (empty($product_addtocart_text)) {
			
				return __( $options = '', 'woocommerce' );
				
		} else {					
		
			$external_text = $product->button_text;			
			$subscription_text = get_option( 'woocommerce_subscriptions_add_to_cart_button_text', __( 'Sign Up Now', 'woocommerce-subscriptions' ) );
			
			$product_type = $product->get_type();
			
			if ( $product->is_in_stock()) {
				
				switch ( $product_type ) {
					case 'simple':
						return __( $options = $product_addtocart_text, 'woocommerce' );
					break;
					case 'grouped':
						return __( $options = $product_addtocart_text, 'woocommerce' );
					break;
					case 'external':						
						if (empty($external_text)){
							return __( $options = 'Buy Now', 'woocommerce' );	
						} else{
							return __( $options = $external_text, 'woocommerce' );							
						}
					break;
					case 'variable':
						return __( $options = $product_addtocart_text, 'woocommerce' );
					break;
					case 'subscription':							
						if (empty($subscription_text)){
							return __( $options = 'Sign Up Now', 'woocommerce' );	
						} else{
							return __( $options = $subscription_text, 'woocommerce' );							
						}
					break;
					case 'variable-subscription':
						if (empty($subscription_text)){
							return __( $options = 'Sign Up Now', 'woocommerce' );	
						} else{
							return __( $options = $subscription_text, 'woocommerce' );							
						}
					break;
					case 'booking':
						return __( $options = 'Book now', 'woocommerce-bookings' );
					break;
					default:
						return __( $options = $product_addtocart_text, 'woocommerce' );
				} 
				
			} else {
				
				return __( $options = 'Read more', 'woocommerce' );	
				
			}		
				
		}
			
    }	
	
	function custom_woocommerce_product_add_to_cart_text_loop() {
	
		$settings = &$this->settings;
		
		global $product;
		
		$product_addtocart_text    			= $settings['product_addtocart_text'];
		$product_addtocart_text_variable    = $settings['product_addtocart_text_variable'];
		$product_addtocart_text_grouped   	= $settings['product_addtocart_text_grouped'];
		
		if (empty($product_addtocart_text)) {
			
			return __( $options = '', 'woocommerce' );
				
		} else {					
		
			$external_text = $product->button_text;			
			$subscription_text = get_option( 'woocommerce_subscriptions_add_to_cart_button_text', __( 'Sign Up Now', 'woocommerce-subscriptions' ) );			
			$product_type = $product->get_type();
			
			if ( $product->is_in_stock()) {
			
				switch ( $product_type ) {
					case 'simple':
						return __( $options = $product_addtocart_text, 'woocommerce' );
					break;
					case 'grouped':
						return __( $options = $product_addtocart_text_grouped, 'woocommerce' );
					break;
					case 'external':
						if (empty($external_text)){
							return __( $options = 'Buy Now', 'woocommerce' );	
						} else{
							return __( $options = $external_text, 'woocommerce' );							
						}
					break;
					case 'variable':
						return __( $options = $product_addtocart_text_variable, 'woocommerce' );
					break;
					break;
					case 'subscription':
						if (empty($subscription_text)){
							return __( $options = 'Sign Up Now', 'woocommerce' );	
						} else{
							return __( $options = $subscription_text, 'woocommerce' );							
						}
					break;
					case 'variable-subscription':
						return __( $options = 'Select options', 'woocommerce' );
					break;
					case 'booking':
						return __( $options = 'Book now', 'woocommerce-bookings' );
					break;
					default:
						return __( $options = $product_addtocart_text, 'woocommerce' );
				}
				
			} else {
				
			    return __( $options = 'Read more', 'woocommerce' );					
			}		
				
		}			
    }
	
	/**
	 * Changes the external product button's add to cart text
	 *
	 * @param string $button_text the button's text
	 * @param \WC_Product $product
	 * @return string - updated button text
	 */
	function sv_wc_external_product_button( $button_text) {
		
		global $product;   
		
		if ( 'external' == $product->get_type() ) {
			// enter the default text for external products			
			return $product->button_text ? $product->button_text : 'Buy at Amazon';			
		}		
		return $button_text;
	}
			
	/**
	 * Check if product is in stock
	 *
	 * @since 1.0.0
	 */
	public static function bew_woo_product_instock( $product_id = '' ) {
		global $product;
	
		$product_id      = $product_id ? $product_id : $product->get_id();
		$stock_status 	 = get_post_meta( $product_id, '_stock_status', true );
		if ( 'instock'  != $stock_status ) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Adds an out of stock tag to the products.
	 *
	 * @since 1.0.0
	 */
	public static function add_out_of_stock_badge_bew() {	
		global $product;
		$product_id      = $product_id ? $product_id : $product->get_id();
		$stock_status 	 = get_post_meta( $product_id, '_stock_status', true );
		if ( 'instock'  != $stock_status ) {
			$label = esc_html__( 'Out of Stock', 'briefcase-elementor-widgets' );  ?>
			<div class="outofstock-badge">
				<?php echo esc_html( apply_filters( 'bew_woo_outofstock_text', $label ) ); ?>
			</div><!-- .product-entry-out-of-stock-badge -->
			
		<?php }
	}
	
	/**
	 * Quick view button.
	 *
	 * @since 1.4.2
	 */
	public static function quick_view_button() {
		global $product;

		$button  = '<a href="#" id="product_id_' . $product->get_id() . '" class="owp-quick-view" data-product_id="' . $product->get_id() . '"><i class="icon-eye"></i>' . esc_html__( 'Quick View', 'oceanwp' ) . '</a>';
		echo apply_filters( 'bew_woo_quick_view_button_html', $button );
	}
	
}