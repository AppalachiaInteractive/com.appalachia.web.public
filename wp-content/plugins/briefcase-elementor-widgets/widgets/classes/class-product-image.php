<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Image
 *
 * This class is for anything Product Image related
 *
 * @class          Bew_dynamic_field_product_image
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_image {
	
	private $settings = [];	

	public function __construct( $settings = [], $product = []) {
		$this->settings = $settings;
		$this->product = $product;		
		
	}
	
	/**
	 * Get Content: bew_get_content	 
	 *
	 * @return $content
	 */	 
	public function bewdf_get_content() {
		return $this->bew_product_image();
	}

	protected function bew_product_image() {
		
		$settings = &$this->settings;
		$product  = &$this->product;

		$product_image_link 	 			 	= $settings['product_image_link'];
		$product_image_size 	 			 	= $settings['product_image_size'];
		$product_image_style					= $settings['product_image_style'];
		$product_image_style_slider_thumbnails	= $settings['product_image_style_slider_thumbnails'];
		$product_image_slider_layout		    = $settings['product_image_slider_layout'];
		$product_image_labels_new				= $settings['product_image_labels_new'];
		$product_image_labels_new_text			= $settings['product_image_labels_new_text'];
		$product_image_labels_new_days			= $settings['product_image_labels_new_days'];
		$product_image_labels_featured			= $settings['product_image_labels_featured'];
		$product_image_labels_featured_text		= $settings['product_image_labels_featured_text'];
		$product_image_labels_outofstock		= $settings['product_image_labels_outofstock'];
		$product_image_labels_outofstock_text	= $settings['product_image_labels_outofstock_text'];
		$product_image_labels_sale				= $settings['product_image_labels_sale'];
		$product_image_labels_sale_text			= $settings['product_image_labels_sale_text'];
		$product_image_labels_sale_percent		= $settings['product_image_labels_sale_percent'];
						
		//Wrapper image classes
		$wrap_classes_image = array( 'bew-product-image' , 'image-wrap' );				
		$wrap_classes_image[] ='bew-image-' . $product->get_id();								
		$wrap_classes_image = implode( ' ', $wrap_classes_image );
				
		//Product Image
		echo '<div class="product-image">';
				
		// Labels										
		wc_get_template( 'loop/bew-sale-flash.php', 
					array('product_image_labels_new' => $product_image_labels_new,
						  'product_image_labels_new_text' => $product_image_labels_new_text,
						  'product_image_labels_new_days' => $product_image_labels_new_days,
						  'product_image_labels_featured' => $product_image_labels_featured,
						  'product_image_labels_featured_text' => $product_image_labels_featured_text,
						  'product_image_labels_outofstock' => $product_image_labels_outofstock,
						  'product_image_labels_outofstock_text' => $product_image_labels_outofstock_text,
						  'product_image_labels_sale' => $product_image_labels_sale,
						  'product_image_labels_sale_text' => $product_image_labels_sale_text,
						  'product_image_labels_sale_percent' => $product_image_labels_sale_percent ) );									  
				
		if('yes' == $product_image_link){
			echo '<div class="' . esc_attr( $wrap_classes_image ). '" id="bew-image-' . $product->get_id() .'">';
													
			self::loop_product_thumbnail_bew($product_image_style, $product_image_size, $product_image_style_slider_thumbnails, $product_image_slider_layout);							
							
			echo '</div>';
		} else {
			
			$image = woocommerce_get_product_thumbnail( $size = 'full' );		
			$image_html = sprintf( '<%1$s %2$s>%3$s</%1$s>', 'div', 'class= bew-product-image', $image );
			
			echo $image_html;
			
		}
					
		echo '</div>';
	}
	
	/**
	 * Returns our product thumbnail from our template parts based on selected style in theme mods.
	 *
	 * @since 1.0.0
	 */
	public static function loop_product_thumbnail_bew($product_image_style, $product_image_size, $product_image_style_slider_thumbnails, $product_image_slider_layout) {
		if ( function_exists( 'wc_get_template' ) ) {
						
			$slider_thumbnails = false;
			
			if ((isset($product_image_style_slider_thumbnails) ? $product_image_style_slider_thumbnails : null) === 'yes') { 
				$slider_thumbnails = true;				
			}
			
			// Get entry product media template part
			wc_get_template( 'loop/thumbnail/'. $product_image_style .'.php' ,
							array('product_image_size' => $product_image_size,
								  'slider_thumbnails' => $slider_thumbnails,
								  'product_image_slider_layout' => $product_image_slider_layout) );
		}
	}
}