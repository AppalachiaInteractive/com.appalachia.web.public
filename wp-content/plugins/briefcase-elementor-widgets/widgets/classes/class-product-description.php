<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Description
 *
 * This class is for anything Product Description related
 *
 * @class          Bew_dynamic_field_product_description
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_description {
	
	private $settings = [];	

	public function __construct( $settings = [] , $product ) {
		$this->settings = $settings;		
		$this->product = $product;
	}
	
	/**
	 * Get Content: bew_get_content	 
	 *
	 * @return $content
	 */	 
	public function bewdf_get_content() {
		return $this->bew_product_description();
	}

	protected function bew_product_description() {
		
		$settings = &$this->settings;
		$product  = &$this->product;		
						
		$edit_mode = get_post_meta($product->get_id(),'_elementor_edit_mode','');
		if(isset($edit_mode[0]) && $edit_mode[0] == 'builder'){
			$product_description = '<div class="bew_data elementor elementor-<?php echo $product_id; ?>">';
			$product_description .=  Elementor\Plugin::instance()->frontend->get_builder_content( $product->get_id() );
			$product_description .= '</div>';
		}else{
			$product_description = wpautop($product->get_description());
			if(isset($GLOBALS['wp_embed'])){
				$product_description = $GLOBALS['wp_embed']->autoembed($product_description);
			}
		}
												
		// Wrapper description classes
		$wrap_classes_description = array( 'bew-description' ); 
		$wrap_classes_description = implode( ' ', $wrap_classes_description );
				
		echo '<div class="'. esc_attr( $wrap_classes_description ) . '">';			
		echo do_shortcode($product_description);
		echo '</div>';
		
	}
}