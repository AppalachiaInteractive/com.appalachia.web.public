<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product price
 *
 * This class is for anything Product price related
 *
 * @class          Bew_dynamic_field_product_price
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_price {
	
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
		return $this->bew_product_price();
	}

	protected function bew_product_price() {
		
		$settings = &$this->settings;
		$product  = &$this->product;

		$product_price_absolute		= $settings['product_price_absolute'];
		$product_price_regular 		= $settings['product_price_regular'];
		$product_price_sale 		= $settings['product_price_sale'];
		$product_price_low 	 		= $settings['product_price_low'];
		$product_price_low_text 	= $settings['product_price_low_text'];
		$product_price_high 		= $settings['product_price_high'];
		$product_price_high_text	= $settings['product_price_high_text'];
		$product_price_hide 		= $settings['product_price_hide'];
							
		// Wrapper price classes
		$wrap_classes_price = array( 'product-price' );				
				
		if('yes' == $product_price_absolute){
			$wrap_classes_price[] ='price-absolute';
		}
				
		if ($product->is_on_sale()){
			$wrap_classes_price[] ='product-on-sale';
		} else {
			$wrap_classes_price[] ='product-regular';
		}
				
		if('yes' == $product_price_regular){					
			$wrap_classes_price[] ='show-price-regular';
		}				
		
		if('yes' == $product_price_sale){
			$wrap_classes_price[] ='show-price-sale';
		}				
		
		$wrap_classes_price = implode( ' ', $wrap_classes_price );
				
		if('yes' == $product_price_low){
			add_filter( 'woocommerce_variable_sale_price_html', array( $this, 'bew_variation_price_low_format' ), 10, 2 );
			add_filter( 'woocommerce_variable_price_html', array( $this, 'bew_variation_price_low_format' ), 10, 2 );
			//add_filter( 'woocommerce_grouped_sale_price_html', array( $this, 'bew_variation_price_low_format' ), 10, 2 );
			//add_filter( 'woocommerce_grouped_price_html', array( $this, 'bew_variation_price_low_format' ), 10, 2 );
		}
				
		if('yes' == $product_price_high){
			add_filter( 'woocommerce_variable_sale_price_html', array( $this, 'bew_variation_price_high_format' ), 10, 2 );
			add_filter( 'woocommerce_variable_price_html', array( $this, 'bew_variation_price_high_format' ), 10, 2 );
			//add_filter( 'woocommerce_grouped_sale_price_html', array( $this, 'bew_variation_price_high_format' ), 10, 2 );
			//add_filter( 'woocommerce_grouped_price_html', array( $this, 'bew_variation_price_high_format' ), 10, 2 );
		}
				
		if('yes' == $product_price_hide){
			add_filter( 'woocommerce_variable_sale_price_html', array( $this, 'bew_variation_price_hide' ), 10, 2 );
			add_filter( 'woocommerce_variable_price_html', array( $this, 'bew_variation_price_hide' ), 10, 2 );
			//add_filter( 'woocommerce_grouped_sale_price_html', array( $this, 'bew_variation_price_hide' ), 10, 2 );
			//add_filter( 'woocommerce_grouped_price_html', array( $this, 'bew_variation_price_hide' ), 10, 2 );	
		}
				
		$product_id  = $product->get_id();	
		$current_single = is_single($product_id );
				
			echo '<div class="bew-price-grid">';
			echo '<div class="'. esc_attr( $wrap_classes_price ) . '">';
			echo woocommerce_template_single_price();
			echo '</div>';
		if($current_single &&  $product->is_type( 'variable' )){
			echo '<div class="bew-variation-price">';
			echo '<p class="price"></p>';
			echo '</div>';
		}
			echo '</div>';
	}
	
	/**
	 * Product variation lowest price
     * param $price
     * param $product_price_low_text     
     */	
	public function bew_variation_price_low_format( $price, $product ) {
		
		$settings = &$this->settings;
		$product_price_low_text = $settings['product_price_low_text'];
		$allprices = $product->get_variation_prices();
					 
		// Main Price
		$prices = array( $product->get_variation_price( 'min', true ), $product->get_variation_price( 'max', true ) );
		$price = $prices[0] !== $prices[1] ? sprintf( __( '%1$s %2$s', 'woocommerce' ), $product_price_low_text , wc_price( $prices[0] ) ) : wc_price( $prices[0] );
		$price2 = $prices[0] !== $prices[1] ? sprintf( __( '%1$s', 'woocommerce' ), wc_price( $prices[0] ) ) : wc_price( $prices[0] );
		
		
		// Sale Price		
		$arrayprices = $allprices['price'];
		$key = array_search ($prices[0], $arrayprices);
		$arrayregular = $allprices['regular_price'];
		$regularprice = $arrayregular[$key];
		
		$saleprice = $regularprice ? sprintf( __( '%1$s', 'woocommerce' ), wc_price( $regularprice ) ) : wc_price( $regularprice );
				
		if ( $price2 !== $saleprice ) {
			$price = '<del>' . $saleprice . $product->get_price_suffix() . '</del> <ins>' . $price . $product->get_price_suffix() . '</ins>';
		}
		return $price;		
	}
	
	/**
	 * Product variation highest price
     * param $price
     * param $product_price_high_text     
     */	
	public function bew_variation_price_high_format( $price, $product ) {
		
		$settings = &$this->settings;
		$product_price_high_text = $settings['product_price_high_text'];		
		$allprices = $product->get_variation_prices();
						
		// Main Price
		$prices = array( $product->get_variation_price( 'max', true ), $product->get_variation_price( 'min', true ) );
		$price = $prices[0] !== $prices[1] ? sprintf( __( '%1$s %2$s', 'woocommerce' ), $product_price_high_text , wc_price( $prices[0] ) ) : wc_price( $prices[0] );
		$price2 = $prices[0] !== $prices[1] ? sprintf( __( '%1$s', 'woocommerce' ), wc_price( $prices[0] ) ) : wc_price( $prices[0] );
		
		
		// Sale Price
		
		$arrayprices = $allprices['price'];
		$key = array_search ($prices[0], $arrayprices);
		$arrayregular = $allprices['regular_price'];
		$regularprice = $arrayregular[$key];
						
		$saleprice = $regularprice ? sprintf( __( '%1$s', 'woocommerce' ), wc_price( $regularprice ) ) : wc_price( $regularprice );		
		
		if ( $price2 !== $saleprice ) {
			$price = '<del>' . $saleprice . $product->get_price_suffix() . '</del> <ins>' . $price . $product->get_price_suffix() . '</ins>';
		}
		return $price;	
		
	}
	
	/**
	 * Product variation hide price until select
     * param $price   
     */	
	public function bew_variation_price_hide( $price) {		
		$price = '';
		return $price;
	}
	
}