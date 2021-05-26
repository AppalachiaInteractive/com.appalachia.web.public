<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Comments
 *
 * This class is for anything Product Comments related
 *
 * @class          Bew_dynamic_field_product_comments
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_comments {
	
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
		return $this->bew_product_comments();
	}

	protected function bew_product_comments() {
		
		$settings = &$this->settings;		
		$product  = &$this->product;
		
		$product_review_slider = $settings['product_review_slider'];
						
		$post = get_post($product->get_id());				
				
		add_filter( 'comments_template', array( $this, 'comments_template_loader' ) );
		add_filter( 'comment_form_fields', array( $this, 'woo_comment_form_fields' ), 9 );
				
		// Wrapper review classes
		$wrap_classes_review = array( 'bew-review' );
		$wrap_classes_review = implode( ' ', $wrap_classes_review );
				
		echo '<div class="'. esc_attr( $wrap_classes_review ) . '">';					
		echo comments_template();				
		echo '</div>';
				
		if ($product_review_slider == 'yes'){
			// Review slider
			?>
			<script type="text/javascript">
				jQuery(function($) {				
				$( '.commentlist' ).slick( {
				slidesToShow  : 1,
				slidesToScroll: 1,
				dots          : true,				
				} ); 
							
				});		
			</script>	
			<?php
		}
	}
	
	/**
	 * Load comments template.
	 *
	 * @param string $template template to load.
	 * @return string
	 */
	public static function comments_template_loader( $template ) {
		if ( get_post_type() !== 'product' ) {
			return $template;
		}

			$check_dirs = array(
				trailingslashit( BEW_PATH ) . WC()->template_path(),				
				trailingslashit( BEW_PATH ),
			);

			if ( WC_TEMPLATE_DEBUG_MODE ) {
				$check_dirs = array( array_pop( $check_dirs ) );
			}

			foreach ( $check_dirs as $dir ) {
				if ( file_exists( trailingslashit( $dir ) . 'single-product-reviews.php' ) ) {
					return trailingslashit( $dir ) . 'single-product-reviews.php';
				}
			}
	}
	
	function woo_comment_form_fields( $fields ){
		if( function_exists('is_product') && is_product()  ){
			$comment_field = $fields['comment'];
			unset( $fields['comment'] );
			$fields['comment'] = $comment_field;
		}
		return $fields;
	}
}