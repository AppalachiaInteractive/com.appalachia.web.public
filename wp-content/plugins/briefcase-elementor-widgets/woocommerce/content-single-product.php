<?php
namespace Briefcase;
 
defined( 'ABSPATH' ) || exit;
global $product;

$frontend = Frontend::instance();
?>

<?php $bewglobal = get_post_meta($post->ID, 'briefcase_apply_global', true);?>
	  
<?php	 
	/**
	 * woocommerce_before_single_product hook.
	 *
	 * @hooked wc_print_notices - 10
	 */
	 do_action( 'woocommerce_before_single_product' );

	 if ( post_password_required() ) {
	 	echo get_the_password_form();
	 	return;
	 }
?>

<div id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

	<?php
	
	if ( $bewglobal == 'off' ) {
	
		the_content(); // WooCommerce content is added here	
		
	}else {

		$check_template = $frontend->check_wc_product_template();		
		
		if (empty($check_template )) {
			do_action( 'woocommerce_before_single_product_summary' ); ?>
			<div class="summary entry-summary">
			<?php do_action( 'woocommerce_single_product_summary' ); 
			?>
			</div><!-- .summary -->
			<?php do_action( 'woocommerce_after_single_product_summary' );
		}else {
			$frontend->apply_bew_wc_product_template(); // Product global template is added here
			
		}
	} ?>	

</div>

<?php do_action( 'woocommerce_after_single_product' ); ?>
