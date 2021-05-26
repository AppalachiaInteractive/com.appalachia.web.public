<?php
/**
 * Image Featured style thumbnail
 *
 * @package BriefcaseWP
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
// Data for Elementor Pro Archive products templates				
	global $bewshop;
					
	if (!empty($bewshop)){					
		$product = $bewshop;
		$temp_post = $GLOBALS['post'];
		$GLOBALS['post'] = get_post($product->get_id());
	}
		

// Display featured image if defined
?>

	<div class="woo-entry-image bew-featured-image clr">
		<a href="<?php the_permalink(); ?>" class="woocommerce-LoopProduct-link">
			<?php			
			// Single Image
			echo woocommerce_get_product_thumbnail( $size = isset($product_image_size) ? $product_image_size : 'woocommerce_thumbnail' ); ?>
			<?php
			// Variation Image
			if ( class_exists( 'Woo_Variation_Swatches_Pro' ) ){
			?>	
			<img width="" height="" src="" class="woo-entry-image-variation wp-post-image" alt="" itemprop="image">
			<?php
			}
			?>
	    </a>
		
		<?php		
		if (wp_get_theme(get_template()) == 'OceanWP') {
		do_action( 'ocean_after_product_entry_image' );	
		}
		?>
	</div><!-- .woo-entry-image -->

<?php

