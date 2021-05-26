<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Gallery
 *
 * This class is for anything Product Gallery related
 *
 * @class          Bew_dynamic_field_product_gallery
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_gallery {
	
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
		return $this->bew_product_gallery();
	}

	protected function bew_product_gallery() {
		
		$settings = &$this->settings;
		$product  = &$this->product;

		$product_gallery_layout					= $settings['product_gallery_layout'];
		$product_gallery_lightbox				= $settings['product_gallery_lightbox'];
		$product_gallery_zoom				    = $settings['product_gallery_zoom'];
		$product_gallery_labels_new				= $settings['product_gallery_labels_new'];
		$product_gallery_labels_new_text		= $settings['product_gallery_labels_new_text'];
		$product_gallery_labels_new_days		= $settings['product_gallery_labels_new_days'];
		$product_gallery_labels_featured		= $settings['product_gallery_labels_featured'];
		$product_gallery_labels_featured_text	= $settings['product_gallery_labels_featured_text'];
		$product_gallery_labels_outofstock		= $settings['product_gallery_labels_outofstock'];
		$product_gallery_labels_outofstock_text	= $settings['product_gallery_labels_outofstock_text'];
		$product_gallery_labels_sale			= $settings['product_gallery_labels_sale'];
		$product_gallery_labels_sale_text		= $settings['product_gallery_labels_sale_text'];
		$product_gallery_labels_sale_percent	= $settings['product_gallery_labels_sale_percent'];
		$product_gallery_woo_default			= $settings['product_gallery_woo_default'];
														
		// Wrapper gallery classes
		$wrap_classes_gallery = array( 'bew-gallery-images' );				
				
		if('yes' == $product_gallery_woo_default && 'yes' == $product_gallery_zoom){
			$wrap_classes_gallery[] ='product-zoom-on';
		}
				
		$wrap_classes_gallery = implode( ' ', $wrap_classes_gallery );
				
		add_filter( 'woocommerce_get_image_size_gallery_thumbnail', function( $size ) {
		return array(
				'width'  => 150,
				'height' => 150,
				'crop'   => 0,
			);
		} );
				
		echo '<div class="'. esc_attr( $wrap_classes_gallery ) . '">';
								
		if(class_exists( 'Woo_Variation_Gallery' ) || $product_gallery_woo_default == 'yes'){
			
			if ( empty( $product ) ) {
			return;
			}

			if ( 'yes' === $settings['sale_flash'] ) {
				wc_get_template( 'loop/sale-flash.php' );
			}
			wc_get_template( 'single-product/product-image.php' );

			// On render widget from Editor - trigger the init manually.
			if ( wp_doing_ajax() && Elementor\Plugin::instance()->editor->is_edit_mode() ) {
				?>
				<script>
					jQuery( '.woocommerce-product-gallery' ).each( function() {
						jQuery( this ).wc_product_gallery();
					} );
				</script>
				<?php
			}
								
		} else {
			
			remove_theme_support( 'wc-product-gallery-slider' );	
			wc_get_template( 'single-product/bew-product-image.php', 
							array('product_gallery_layout' => $product_gallery_layout, 
								  'product_gallery_lightbox' => $product_gallery_lightbox, 
								  'product_gallery_zoom' => $product_gallery_zoom,
								  'product_gallery_labels_new' => $product_gallery_labels_new,
								  'product_gallery_labels_new_text' => $product_gallery_labels_new_text,
								  'product_gallery_labels_new_days' => $product_gallery_labels_new_days,
								  'product_gallery_labels_featured' => $product_gallery_labels_featured,
								  'product_gallery_labels_featured_text' => $product_gallery_labels_featured_text,
								  'product_gallery_labels_outofstock' => $product_gallery_labels_outofstock,
								  'product_gallery_labels_outofstock_text' => $product_gallery_labels_outofstock_text,
								  'product_gallery_labels_sale' => $product_gallery_labels_sale,
								  'product_gallery_labels_sale_text' => $product_gallery_labels_sale_text,
								  'product_gallery_labels_sale_percent' => $product_gallery_labels_sale_percent ) );
		}
				
		echo '</div>';
	}
}