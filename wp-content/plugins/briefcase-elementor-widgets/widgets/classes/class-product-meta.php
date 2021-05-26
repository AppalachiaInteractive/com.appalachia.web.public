<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Meta
 *
 * This class is for anything Product Meta related
 *
 * @class          Bew_dynamic_field_product_meta
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_meta {
	
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
		return $this->bew_product_meta();
	}

	protected function bew_product_meta() {
		
		$settings = &$this->settings;
		$product  = &$this->product;		
				
		// Meta				
		echo '<div class="bew-product-meta">';
		echo woocommerce_template_single_meta();
		echo '</div>';
		
	}
}