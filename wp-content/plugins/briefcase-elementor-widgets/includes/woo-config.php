<?php
namespace Briefcase;

use Astra_Woocommerce;
use Elementor\Core\Files\CSS\Post as Post_CSS;

class Wooconfig{
	
	private static $_instance = null;
   

    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
	
	public function __construct() {
		// Main Woo Filters
		
			add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'menu_cart_bew_fragments' ) );
			add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'mini_cart_bew_fragments' ) );
			add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'woo_orders_cart_fragments' ) );
			add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'bew_sidebar_mini_cart_fragments' ) );
			add_filter( 'woocommerce_add_to_cart_fragments', array( $this, 'bew_whatsapp_fragments' ) );
			add_action( 'wp_ajax_bewwoo_update_qty', array( $this, 'bewwoo_update_qty' ) );
			add_action( 'wp_ajax_nopriv_bewwoo_update_qty', array( $this, 'bewwoo_update_qty' ) );
			add_action( 'wp_ajax_empty_cart_woo_grid', array( $this, 'empty_cart_woo_grid' ) );
			add_action( 'wp_ajax_nopriv_empty_cart_woo_grid', array( $this, 'empty_cart_woo_grid' ) );
			add_action( 'wp_ajax_update_submit_nonce', array( $this, 'update_submit_nonce' ) );
			add_action( 'wp_ajax_nopriv_update_submit_nonce', array( $this, 'update_submit_nonce' ) );
			
			// Astra compatibility for ajax calls on shop customization
			$current_theme = wp_get_theme(get_template());
			if($current_theme == 'Astra' && class_exists( 'WooCommerce' )){
				$astra_woocommerce_instance = Astra_Woocommerce::get_instance();
				add_action( 'bew_astra_shop_layout', array( $astra_woocommerce_instance, 'shop_customization' ) );
				add_action( 'bew_astra_shop_layout', array( $astra_woocommerce_instance, 'woocommerce_init' ) );
			}
	}
	
	/**
	 * Add menu cart item to the Woo fragments so it updates with AJAX
	 *
	 * @since 1.1.0
	 */
	public function menu_cart_bew_fragments( $fragments ) {
						
			ob_start();
			$this->bew_woomenucart2();
			$fragments['span.woo-cart-quantity'] = ob_get_clean();

			return $fragments;
	}
	
	public function mini_cart_bew_fragments( $fragments ) {
			
			global $woocommerce;
			
			ob_start(); ?>
			<div class="shopping-cart-content content-update">			
			<?php woocommerce_mini_cart(); ?>
			</div>
			<?php
			$fragments['div.shopping-cart-content'] = ob_get_clean();

			return $fragments;
	}
	
	public function woo_orders_cart_fragments( $fragments ) {
						
			ob_start();
			$this->woo_orders_cart();
			$fragments['span.woo-orders-cart-quantity'] = ob_get_clean();

			return $fragments;
	}
	
	public function bew_sidebar_mini_cart_fragments( $fragments ) {
			
			global $woocommerce;
			
			ob_start(); 
			$this->bew_sidebar_mini_cart();
			$fragments['div.shopping-cart-content-sidebar'] = ob_get_clean();

			return $fragments;
	}
	
	public function bew_whatsapp_fragments( $fragments ) {
			
			global $woocommerce;
			
			ob_start();
			$this->bew_whatsapp_url();
			$fragments['a.bewwhatsapp_button'] = ob_get_clean();

			return $fragments;
	}
		
	public function bew_woomenucart2() {
			
			$count = WC()->cart->cart_contents_count;
			// Menu Cart WooCommerce
					if( class_exists( 'WooCommerce' ) ) { ?>						
						<span class="woo-cart-quantity woo-cart-quantity-update">
							<?php printf( _n( '%1$s <span class="woo-cart-text-quantity">item</span>', '%1$s <span class="woo-cart-text-quantity">items</span>', $count , 'briefcase-elementor-widgets' ), $count ) ?>
						</span>
						<?php }
	}
	
	public function woo_orders_cart() {
			
			$count = WC()->cart->cart_contents_count;
			// Woo Orders Cart WooCommerce
					if( class_exists( 'WooCommerce' ) ) { ?>
						<span class="woo-orders-cart-quantity woo-orders-cart-quantity-update "><?php echo $count ?></span>											
					<?php }
	}
	
	public function bew_sidebar_mini_cart() {
			?>
			<div class="shopping-cart-content-sidebar update">
			<?php echo wc_get_template( 'cart/sidebar-mini-cart.php');?>
			</div>
			<?php
	}

	public function bew_whatsapp_url() {
			
		$items= WC()->cart->get_cart();

		$message= "I want to buy ";

		$currency= get_option('woocommerce_currency');
		
		if ( !empty ($items)){
		
        foreach($items as $item ) { 
            $_product =  wc_get_product( $item['product_id']);     
            $product_name= $_product->get_name();
            $qty= $item['quantity'];            
            $price= $item['line_subtotal'];
            $product_url= get_post_permalink($item['product_id']);
        
        	$message.= "Product Name: ".$product_name."\r\nQuantity: ".$qty."\r\nPrice: ".$price." ".$currency."\r\nUrl: ".$product_url."\r\n";
        }
        $message.="user info ";
		
		}

        $whatsapp_number= "whatsapp-number";
        
        $url = 'https://api.whatsapp.com/send?phone='.$whatsapp_number.'&text='.urlencode($message);
		
		?> 
		<a href="<?php echo $url; ?> " class="bewwhatsapp_button  bewwhatsapp-update" id="bewwhatsapp_button" target="_blank"><i class="ion-social-whatsapp-outline" aria-hidden="true"></i> Send my Order</a>
		<?php						
	}
	
	function bewwoo_update_qty() {
		if ( isset( $_POST['cart_item_key'], $_POST['cart_item_qty'] ) ) {
			WC()->cart->set_quantity( $_POST['cart_item_key'], (float) $_POST['cart_item_qty'] );
			
			$count = WC()->cart->cart_contents_count;
			
			$cart = array( 'action' => 'update_qty',
						   'count' => $count );
			echo json_encode( $cart );

			die();
		}
	}
	
	function update_submit_nonce() {
		if ( isset( $_POST ) ) {
			
			$nonce_submit = wp_nonce_field( 'woocommerce-process_checkout', 'woocommerce-process-checkout-nonce' );			
			wp_die();
		}
	}
	
	function empty_cart_woo_grid() {
		if ( isset( $_POST['woo_grid_id'] ) ) {
						
			$post_id = $_POST['woo_grid_id'];		
			$css_file = Post_CSS::create( $post_id );		
			$css_file->enqueue();
			$css_file->print_css();
						
			die();
		}
	}
	 	
}
Wooconfig::instance();
