<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Category
 *
 * This class is for anything Product Category related
 *
 * @class          Bew_dynamic_field_product_category
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_category {
	
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
		return $this->bew_product_category();
	}

	protected function bew_product_category() {
		
		$settings = &$this->settings;
		$product  = &$this->product;
		
		$product_category_truncate = $settings['product_category_truncate'];
				
		// Category
		echo '<div class="bew-category">';
		if ( version_compare( self::get_wc_version(), '2.7', '>=' ) ) {
						
			if ( $product_category_truncate == 'yes' ) {
				echo wp_kses_post( wc_get_product_category_list( $product->get_id(), ', ', '<li class="category">', '</li>' ) );
			} else{
				echo wp_kses_post( wc_get_product_category_list( $product->get_id(), ', <li>', '<ul class="category"><li>', '</ul>' ) );	
			}
														
		} else {
							
			if ( $product_category_truncate == 'yes' ) {
				echo wp_kses_post( $product->get_categories( ', ', '<li class="category">', '</li>' ) );
			} else{								
				echo wp_kses_post( $product->get_categories( ', <li>', '<ul class="category"><li>', '</ul>' ) );
			}
							
		}
		echo '</div>';
	}
	
	/**
	* Helper method to get the version of the currently installed WooCommerce.
	*
	* @since 1.1.0
	* @return string woocommerce version number or null.
	*/
	public static function get_wc_version() {
			return defined( 'WC_VERSION' ) && WC_VERSION ? WC_VERSION : null;
	}
}