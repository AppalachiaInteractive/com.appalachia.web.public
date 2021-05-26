<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Category Image
 *
 * This class is for anything Category Image related
 *
 * @class          Bew_dynamic_field_category_image
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_category_image {
	
	private $settings = [];	

	public function __construct( $settings = [] ) {
		$this->settings = $settings;		
		
	}
	
	/**
	 * Get Content: bew_get_content	 
	 *
	 * @return $content
	 */	 
	public function bewdf_get_content() {
		return $this->bew_category_image();
	}
	
	/**
	 * Get Category Data for Woo Grid Loop template
	 *
	 * @since 1.0.0
	 */
	public static function category_data_loop() {
			
		if(empty($category)){
			// Get terms and workaround WP bug with parents/pad counts.
			$args = array(					
				'orderby'    => 'id',
				'order'      => 'DESC',					
				'hide_empty' => 0,
				'parent'     => 0					
			);

			$product_categories = get_terms( 'product_cat', $args );												
			$id_cat =  $product_categories[0]->term_id;
			$category_data = get_term_by( 'id', $id_cat, 'product_cat' );					
			$category = $category_data;

			return $category;			
		}
		
	}

	protected function bew_category_image() {
		
		$settings = &$this->settings;
		$cat_image_hover_black = $settings['cat_image_hover_black'];

		global $bewcategory;
		$category = $bewcategory;
				
		if(empty($category)){
			$category = $this->category_data_loop();
		}
												
		// Wrapper category classes
		$wrap_classes_cat_image = array( 'bew-cat-image' );	

		if('yes' == $cat_image_hover_black){
			$wrap_classes_cat_image[] ='hover-black-overlay';
		}
							
		$wrap_classes_cat_image = implode( ' ', $wrap_classes_cat_image );
				
		echo '<div class="'. esc_attr( $wrap_classes_cat_image ). '" id="bew-cat-image-' . $category->term_id .'">';
		//show the category image
		echo '<a href="' . esc_url( get_term_link( $category, 'product_cat' ) ) . '">';
			woocommerce_subcategory_thumbnail( $category );
		echo '</a>';								
		echo '</div>';
				
		if('yes' == $cat_image_hover_black){
		?>	
			<script type="text/javascript">
			( function( $ ) {
				$(document).ready(function() {						
					var title = $('.bew-cat-title');
							
					// Image overlay title
					title.hover(function(e) {
						var lastClass = this.className.split(' ').pop();						
						$('#' + lastClass)[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('show-cat-image-overlay'); 
					});												
				});
			} )( jQuery );		
			</script>
			<?php
		}
	}

}