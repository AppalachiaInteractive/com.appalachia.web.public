<?php
defined( 'ABSPATH' ) || exit;

$cdi = "&nbsp"  . esc_html( $extra_information ) . "&nbsp";
?>
	 
	
	<div class="woocommerce-customer-details-before">
		<?php echo esc_html( $before_text); ?>
	</div>
	
	<div class="woocommerce-customer-details-information">	
		<?php echo $cdi ?>
	</div>
	
	<div class="woocommerce-customer-details-after">
		<?php echo esc_html( $after_text); ?>
	</div>


