<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Excerpt
 *
 * This class is for anything Product Excerpt related
 *
 * @class          Bew_dynamic_field_product_excerpt
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_excerpt {
	
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
		return $this->bew_product_excerpt();
	}

	protected function bew_product_excerpt() {
		
		$settings = &$this->settings;
		$product  = &$this->product;
										
		// Wrapper excerpt classes
		$wrap_classes_excerpt = array( 'bew-excerpt' );
		$wrap_classes_excerpt = implode( ' ', $wrap_classes_excerpt );
				
		echo '<div class="'. esc_attr( $wrap_classes_excerpt ) . '">';
		if ( is_product() ){
			echo woocommerce_template_single_excerpt();
		} else {
			echo $product->get_short_description();			
		}
		echo '</div>';
	}
}