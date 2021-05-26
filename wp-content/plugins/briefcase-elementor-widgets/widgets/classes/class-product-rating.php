<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Rating
 *
 * This class is for anything Product Rating related
 *
 * @class          Bew_dynamic_field_product_rating
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_rating {
	
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
		return $this->bew_product_rating();
	}

	protected function bew_product_rating() {
		
		$settings = &$this->settings;
		$product  = &$this->product;
		
		$product_no_rating  = $settings['product_no_rating'];
											
		//Wrapper rating classes
		$wrap_classes_rating = array( 'bew-rating' );
		$wrap_classes_rating = implode( ' ', $wrap_classes_rating );
				
		echo '<div class="'. esc_attr( $wrap_classes_rating ) . '">';
		echo woocommerce_template_single_rating();
				
		$rating_count = $product->get_rating_count();
		if($rating_count == 0 && (Elementor\Plugin::instance()->editor->is_edit_mode()|| ($product_no_rating == 'yes') ) ){
					
		$count = 0;
		$rating  = 0;
		$average      = 0;	
		// Html Ranting on editor
		?>				
		<div class="woocommerce-product-rating">
			<div class="star-rating">
				<span style="width:0%">
				<?php
				sprintf( _n( 'Rated %1$s out of 5 based on %2$s customer rating', 'Rated %1$s out of 5 based on %2$s customer ratings', $count, 'woocommerce' ), '<strong class="rating">' . esc_html( $rating ) . '</strong>', '<span class="rating">' . esc_html( $count ) . '</span>' );
				?>	
				</span>
			</div>
			<a href="#reviews" class="woocommerce-review-link" rel="nofollow">(<?php printf( _n( '%s customer review', '%s customer reviews', $count, 'woocommerce' ), '<span class="count">' . esc_html( $count ) . '</span>' ); ?>)</a>
		</div>
		<?php
		}
		echo '</div>';
	}
}