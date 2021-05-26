<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Category Title
 *
 * This class is for anything Category Title related
 *
 * @class          Bew_dynamic_field_product_title
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_category_title {
	
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
		return $this->bew_category_title();
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

	protected function bew_category_title() {
		
		$settings = &$this->settings;

		$cat_title_absolute				= $settings['cat_title_absolute'];
		$cat_title_absolute_translate	= $settings['cat_title_absolute_translate'];
		$cat_title_count				= $settings['cat_title_count'];
		
		global $bewcategory;
		$category = $bewcategory;
				
		if(empty($category)){
			$category = $this->category_data_loop();
		}
												
		// Wrapper category title classes
		$wrap_classes_cat_title = array( 'bew-cat-title' );		

		if('yes' == $cat_title_absolute){
			$wrap_classes_cat_title[] ='cat-title-absolute';
		}
				
		if('yes' == $cat_title_absolute_translate){
			$wrap_classes_cat_title[] ='cat-title-absolute-translate';
		}
				
		if('yes' == $cat_title_count){
			$wrap_classes_cat_title[] ='cat-title-count';
		}
				
		$wrap_classes_cat_title[] = 'bew-cat-image-'. $category->term_id;
		$wrap_classes_cat_title = implode( ' ', $wrap_classes_cat_title );
				
		add_filter( 'woocommerce_subcategory_count_html', array( $this, 'subcategory_count_markup' ), 10, 2 );
				
		echo '<div class="'. esc_attr( $wrap_classes_cat_title ) . '">';
									
		//show the category title
		echo '<a href="' . esc_url( get_term_link( $category, 'product_cat' ) ) . '">';
			woocommerce_template_loop_category_title( $category );
		echo '</a>';					
				
		echo '</div>';
				
		if('yes' == $cat_title_absolute_translate){
		?>	
			<script type="text/javascript">
			( function( $ ) {
				$(document).ready(function() {						
					var image = $('.bew-cat-image');					
						
					// Title overlay image
					image.hover(function(e) {			
					$('.' + this.id)[e.type == 'mouseenter' ? 'addClass' : 'removeClass']('show-cat-title-overlay'); 		
					});
				});
			} )( jQuery );		
			</script>
		<?php
		}
	}
	
	/**
	 * Subcategory Count Markup
	 *
	 * @param  mixed  $content  Count Markup.
	 * @param  object $category Object of Category.
	 * @return mixed
	 */
	function subcategory_count_markup( $content, $category ) {

		$content = sprintf( // WPCS: XSS OK.
			/* translators: 1: number of products */
			_nx( '<mark class="count">%1$s Product</mark>', '<mark class="count">%1$s Products</mark>', $category->count, 'product categories', 'astra' ),
			number_format_i18n( $category->count )
		);

		return $content;
	}

}