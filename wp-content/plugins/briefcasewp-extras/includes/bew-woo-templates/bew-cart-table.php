<?php
/**
 * Cart Page
 *
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.5.0
 */

defined( 'ABSPATH' ) || exit;	

do_action( 'woocommerce_before_cart' ); 

$cart_count  =  wc()->cart->get_cart_contents_count();

?>

<div class="bew-block-components-main bew-cart__main">

<form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
	<?php do_action( 'woocommerce_before_cart_table' ); ?>
	
	<h2 class="bew-components-title"><?php printf( _n( '%1$s <span>(%2$s item)</span>', '%1$s <span>(%2$s items)</span>', $cart_count , 'bew-extras' ), esc_html_e( $cart_title_text , 'bew-extras' ) , $cart_count ) ?></h2>

	<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents bew-cart-items" cellspacing="0">
		<thead>
			<tr>
				<?php
					foreach ( $cartitem as $itemvalue ) {
												
						if( $itemvalue['table_items'] == 'customadd' ){
							?>
							<th class="product-<?php echo esc_attr( uniqid('bewcustomitem_') ); ?> elementor-repeater-item-<?php echo $itemvalue['_id']; ?>"  colspan="<?php echo $itemvalue['colspan']; ?>"> <?php echo esc_html_e( $itemvalue['table_heading_title'] , 'woocommerce' ); ?> </th>								
							<?php
						}else{							
							if($itemvalue['table_items'] == 'name'){
								?>
								<th class="product-<?php echo esc_attr( $itemvalue['table_items'] ); ?> elementor-repeater-item-<?php echo $itemvalue['_id']; ?>" colspan="<?php echo $itemvalue['colspan']; ?>"> <?php echo esc_html_e( $itemvalue['table_heading_title'] , 'woocommerce' ); ?> </th>								
								<?php								
							}else{
								if($itemvalue['table_items'] == 'remove' || $itemvalue['table_items'] == 'thumbnail' ){
									
								} else{
								?>
								<th class="product-<?php echo esc_attr( $itemvalue['table_items'] ); ?> elementor-repeater-item-<?php echo $itemvalue['_id']; ?> " colspan="<?php echo $itemvalue['colspan']; ?>"> <?php echo esc_html_e( $itemvalue['table_heading_title'] , 'woocommerce' ); ?> </th>								
								<?php
								}
							}
							
						}
					}
				?>
			</tr>
		</thead>
		<tbody>
			<?php do_action( 'woocommerce_before_cart_contents' ); ?>

			<?php
			foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
				$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
				$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

				if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
					$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
					?>
					<tr class="woocommerce-cart-form__cart-item <?php echo esc_attr( apply_filters( 'woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key ) ); ?>">

						<?php
							foreach ( $cartitem as $itemvalue ) {

								switch ( $itemvalue['table_items'] ) {

									case 'remove':
										echo '<td class="product-remove elementor-repeater-item-'.$itemvalue['_id']. ' remove-icon-'.$itemvalue['remove_icon']. ' hide-element-mobile-'.$itemvalue['hide_element_mobile'].'">';
											echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf(
												'<a href="%s" class="remove" aria-label="%s" data-product_id="%s" data-product_sku="%s"><span class="ti-close"></span><span class="remove-link">%s</span></a>',
												esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
												esc_html__( 'Remove this item', 'woocommerce' ),
												esc_attr( $product_id ),
												esc_attr( $_product->get_sku() ),
												$itemvalue['remove_icon'] == "yes" ? "&times" : $itemvalue['table_heading_title'],
											), $cart_item_key );
										echo '</td>';
										break;

									case 'thumbnail':
										echo '<td class="product-thumbnail elementor-repeater-item-'.$itemvalue['_id'].'">';
											$thumbnail = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
											if ( ! $product_permalink ) {
												echo ( $thumbnail ); // PHPCS: XSS ok.
											} else {
												printf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $thumbnail ); // PHPCS: XSS ok.
											}
										echo '</td>';
										break;

									case 'name':
										echo '<td class="product-name elementor-repeater-item-'.$itemvalue['_id'].'" data-title=" '.$itemvalue['table_heading_title'].' ">';
											if ( ! $product_permalink ) {
												echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key ) . '&nbsp;' );
											} else {
												echo wp_kses_post( apply_filters( 'woocommerce_cart_item_name', sprintf( '<a href="%s">%s</a>', esc_url( $product_permalink ), $_product->get_name() ), $cart_item, $cart_item_key ) );
											}

											do_action( 'woocommerce_after_cart_item_name', $cart_item, $cart_item_key );

											// Meta data.
											echo wc_get_formatted_cart_item_data( $cart_item ); // PHPCS: XSS ok.

											// Backorder notification.
											if ( $_product->backorders_require_notification() && $_product->is_on_backorder( $cart_item['quantity'] ) ) {
												echo wp_kses_post( apply_filters( 'woocommerce_cart_item_backorder_notification', '<p class="backorder_notification">' . esc_html__( 'Available on backorder', 'briefcase-extras' ) . '</p>', $product_id ) );
											}
										echo '</td>';
										break;

									case 'price':
										echo '<td class="product-price elementor-repeater-item-'.$itemvalue['_id']. ' hide-element-mobile-'.$itemvalue['hide_element_mobile']. '" data-title=" '.$itemvalue['table_heading_title'].' ">';
											echo apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key );
										echo '</td>';
										break;

									case 'quantity':
										echo '<td class="product-quantity show-remove-' .$itemvalue['show_remove'] . ' show-remove-tablet-' .$itemvalue['show_remove_tablet'] . ' show-remove-mobile-' .$itemvalue['show_remove_mobile'] . ' elementor-repeater-item-'.$itemvalue['_id'].'" data-title=" '.$itemvalue['table_heading_title'].' ">';
										echo '<div class="product-quantity-content">';	
											if ( $_product->is_sold_individually() ) {
												$product_quantity = sprintf( '1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key );
											} else {
												$product_quantity = woocommerce_quantity_input( array(
													'input_name'  => "cart[{$cart_item_key}][qty]",
													'input_value' => $cart_item['quantity'],
													'max_value'   => $_product->get_max_purchase_quantity(),
													'min_value'   => '0',
												), $_product, false );
											}

											echo apply_filters( 'woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item );
																						
												echo '<div class="bew-product-remove product-remove-qty">';
													echo apply_filters( 'woocommerce_cart_item_remove_link', sprintf(
														'<a href="%s" class="bew-remove" aria-label="%s" data-product_id="%s" data-product_sku="%s"><span class="ti-trash"></span><span class="remove-link">%s</span></a>',
														esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
														esc_html__( 'Remove this item', 'woocommerce' ),
														esc_attr( $product_id ),
														esc_attr( $_product->get_sku() ),
														esc_html__( 'Remove Item', 'bew-extras' )
													), $cart_item_key );
												echo '</div>';
											
										echo '</div>';	
										echo '</td>';									
										break;

									case 'subtotal':
										echo '<td class="product-subtotal elementor-repeater-item-'.$itemvalue['_id'].'" data-title=" '.$itemvalue['table_heading_title'].' ">';
											echo apply_filters( 'woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal( $_product, $cart_item['quantity'] ), $cart_item, $cart_item_key );
										echo '</td>';
										break;

									case 'customadd':
										echo '<td class="product-wlcustomdata elementor-repeater-item-'.$itemvalue['_id'].'">';
											$cart_custom_data = get_post_meta( $product_id, 'bew_cart_custom_content', true );
											echo ( isset( $cart_custom_data ) ? esc_html( $cart_custom_data ) : '' );
										echo '</td>';
										break;

									default:
										break;
								}

							}
						?>

					</tr>
					<?php
				}
			}
			?>

			<?php do_action( 'woocommerce_cart_contents' ); ?>
			<tr>
				<td colspan="<?php echo count( $cartitem ); ?>" class="actions">
					
					<?php if ( wc_coupons_enabled() ) { ?>
						<div class="coupon bew-coupon">
							<label for="coupon_code"><?php esc_html_e( 'Coupon:', 'woocommerce' ); ?></label> 
							<input type="text" name="coupon_code" class="input-text bew-coupon-field" id="coupon_code" value="" placeholder="<?php echo esc_html_e( esc_attr( $coupon_button_placeholder ), 'woocommerce' ); ?>" /> 
							<button type="submit" class="button bew-coupon-button" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'woocommerce' ); ?>"><?php echo esc_html_e( $coupon_button_name , 'woocommerce' ); ?>
																		
							</button>
							<?php do_action( 'woocommerce_cart_coupon' ); ?>
						</div>
					<?php } ?>
					
					<button type="submit" class="button bew-update-cart-button" name="update_cart" value="<?php esc_attr_e( 'Update cart', 'woocommerce' ); ?>"><?php echo esc_html_e( $update_cart_button_name , 'woocommerce' ); ?></button>
					
					<?php do_action( 'woocommerce_cart_actions' ); ?>

					<?php wp_nonce_field( 'woocommerce-cart' ); ?>					
					
					<div class="bew-proceed-to-checkout">
						<a href="<?php echo get_permalink( wc_get_page_id( 'checkout' ) ); ?>" class="button checkout-button alt wc-forward">
							<?php echo esc_html_e( $checkout_button_name , 'woocommerce' ); ?></a>
					</div>
					
					<div class="cart-subtotal-table cart-subtotal bew-components-totals-item">
						<div class="bew-components-totals-item__label"><?php esc_html_e( 'Subtotal', 'woocommerce' ); ?></div>
						<div class="bew-formatted-money-amount bew-components-formatted-money-amount bew-components-totals-item__value"><?php wc_cart_totals_subtotal_html(); ?></div>
						<div class="bew-components-totals-item__description"></div>
					</div>
					
				</td>
			</tr>
			<?php do_action( 'woocommerce_after_cart_contents' ); ?>
			
		</tbody>
	</table>
	<?php do_action( 'woocommerce_after_cart_table' ); ?>
</form>
</div>
<div class="bew-woo-cart">bew-woo-cart</div>

<?php do_action( 'woocommerce_after_cart' ); ?>