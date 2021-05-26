<?php
namespace BriefcasewpExtras\Modules\WooCart;

use Elementor;
use Elementor\Plugin;
use Elementor\Controls_Manager;
use Elementor\Controls_Stack;
use Briefcase\Helper;
use BriefcasewpExtras\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Module extends Module_Base {
	
	public static function is_active() {
		return class_exists( 'woocommerce' );
	}

	public function get_name() {
		return 'woo-cart';
	}

	public function get_widgets() {
		return [
			'Woo_Cart_Table',
			'Woo_Cart_Totals',
			'Woo_Return_To_Shop',
			'Woo_Cross_Sells',
			'Woo_Empty_Cart_Message',
		];
	}
	
	public function register_controls( $element, $section_id, $args ) {
		if ( 'section' === $element->get_name() && 'section_structure' == $section_id ) {
			
			global $post;
			$post_id = $post->ID;
			$cart_id = wc_get_page_id( 'cart' );
						
			if($post_id != $cart_id ){			
			return;
			}
			
			$element->start_controls_section(
				'section_bew_cart',
				[
					'label' => __( 'Bew Cart', 'bew-extras' ),
					'tab' => Controls_Manager::TAB_LAYOUT,				
				]
			);

			$element->add_control(
				'bew_cart',
				[
					'label'	=> __( 'Enable Bew Cart', 'bew-extras' ),
					'type' => Controls_Manager::SWITCHER,
					'label_on' => __( 'On', 'bew-extras' ),
					'label_off' => __( 'Off', 'bew-extras' ),
					'return_value' => 'yes',
					'default' => '',
					'frontend_available' => true,
					'prefix_class' => 'bew-cart-',
					'description'	=> __( 'Enable Bew Cart on this section.', 'bew-extras' )
				]
			);
			
			$element->add_control(
				'bew_cart_loading',
				[
					'label'	=> __( 'Enable Loading', 'bew-extras' ),
					'type' => Controls_Manager::SWITCHER,
					'label_on' => __( 'On', 'bew-extras' ),
					'label_off' => __( 'Off', 'bew-extras' ),
					'return_value' => 'yes',
					'default' => 'yes',
					'frontend_available' => true,
					'description'	=> __( 'Enable Bew Cart loading effect.', 'bew-extras' ),
					'condition' => [
						'bew_cart' => 'yes',
					],
				]
			);
			
			$element->add_responsive_control(
				'bew_cart_loading_layout',
				[
					'label' 		=> __( 'Loading Layout', 'bew-extras' ),
					'type' 			=> Controls_Manager::CHOOSE,
					'options' 		=> [
						'one' => [
							'title' => __( 'One Column', 'bew-extras' ),
							'icon'  => 'fa fa-window-maximize',
						],
						'two' => [
							'title' => __( 'Two Columns', 'bew-extras' ),
							'icon'  => 'fa fa-columns',
						],					
					],
					'default' 		=> 'two',
					'condition' => [
						'bew_cart_loading' => 'yes',
					],
				]
			);
			
			$element->end_controls_section();
		}
	}
		
	public function bew_cart_start ( $element ) {
		$settings = $element->get_settings_for_display();
		if( $settings['bew_cart'] == 'yes' && $settings['bew_cart_loading'] == 'yes' ) {
			if ( ( is_cart() ) ) {				
				
			if ( \WC()->cart->is_empty() ) {
				echo $this->bew_cart_skeleton_empty($element);
			} else{
				echo $this->bew_cart_skeleton($element);
			}	
											
			}		
		}
	}
	
	function bew_cart_skeleton($element){
		$settings = $element->get_settings_for_display();
		if( $settings['bew_cart_loading_layout'] == 'one' ) {
			$bew_cart_skeleton = "bew-cart-skeleton-one";
		} else {
			$bew_cart_skeleton = "bew-cart-skeleton-two";
		}	
		?>
		<section class="elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section <?php echo esc_attr( $bew_cart_skeleton  ); ?>" data-element_type="section" data-settings="{&quot;bew_cart&quot;:&quot;yes&quot;}">
			<div class="elementor-container elementor-column-gap-default">
				<div class="bew-skeleton bew-components-sidebar-layout bew-cart bew-cart--is-loading bew-cart--skeleton" aria-hidden="true">
					<div class="bew-components-main bew-cart__main">
						<h2><span></span></h2>
						<table class="bew-cart-items">
							<thead>
								<tr class="bew-cart-items__header">
									<th class="bew-cart-items__header-image"><span></span></th>
									<th class="bew-cart-items__header-product"><span></span></th>
									<th class="bew-cart-items__header-quantity"><span></span></th>
									<th class="bew-cart-items__header-total"><span></span></th>
								</tr>
							</thead>
							<tbody>
								<tr class="bew-cart-items__row">
									<td class="bew-cart-item__image">
										<div><img loading="lazy" src="" width="1" height="1"></div>
									</td>
									<td class="bew-cart-item__product">
										<div class="bew-cart-item__product-name"></div>
										<div class="bew-cart-item__product-metadata"></div>
									</td>
									<td class="bew-cart-item__quantity">
									<div class="bew-components-quantity-selector">
										<input class="bew-components-quantity-selector__input" type="number" step="1" min="0" value="1">
										<button class="bew-components-quantity-selector__button bew-components-quantity-selector__button--minus">－</button>
										<button class="bew-components-quantity-selector__button bew-components-quantity-selector__button--plus">＋</button>
									</div>
									</td>
									<td class="bew-cart-item__total">
										<div class="bew-cart-item__price"></div>
									</td>
								</tr>
								<tr class="bew-cart-items__row">
									<td class="bew-cart-item__image">
										<div><img loading="lazy" src="" width="1" height="1"></div>
									</td>
									<td class="bew-cart-item__product">
										<div class="bew-cart-item__product-name">&nbsp;</div>
										<div class="bew-cart-item__product-metadata">&nbsp;</div>
									</td>
									<td class="bew-cart-item__quantity">
									<div class="bew-components-quantity-selector">
										<input class="bew-components-quantity-selector__input" type="number" step="1" min="0" value="1">
										<button class="bew-components-quantity-selector__button bew-components-quantity-selector__button--minus">－</button>
										<button class="bew-components-quantity-selector__button bew-components-quantity-selector__button--plus">＋</button>
									</div>
									</td>
									<td class="bew-cart-item__total">
										<div class="bew-cart-item__price"></div>
									</td>
								</tr>
								<tr class="bew-cart-items__row">
									<td class="bew-cart-item__image">
										<div><img loading="lazy" src="" width="1" height="1"></div>
									</td>
									<td class="bew-cart-item__product">
										<div class="bew-cart-item__product-name"></div>
										<div class="bew-cart-item__product-metadata"></div>
									</td>
									<td class="bew-cart-item__quantity">
									<div class="bew-components-quantity-selector">
										<input class="bew-components-quantity-selector__input" type="number" step="1" min="0" value="1">
										<button class="bew-components-quantity-selector__button bew-components-quantity-selector__button--minus">－</button>
										<button class="bew-components-quantity-selector__button bew-components-quantity-selector__button--plus">＋</button>
									</div>
									</td>
									<td class="bew-cart-item__total">
										<div class="bew-cart-item__price"></div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="bew-components-sidebar bew-cart__sidebar">
						<div class="components-card"></div>
					</div>
				</div>
			</div>
		</section>
	<?php

	}

	function bew_cart_skeleton_empty($element){
	
		?>
		<section class="elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default elementor-section elementor-top-section" data-element_type="section" data-settings="{&quot;bew_cart&quot;:&quot;yes&quot;}">
			<div class="elementor-container elementor-column-gap-default">
				<div class="bew-skeleton bew-components-empty-layout bew-cart bew-cart--is-loading bew-cart--skeleton" aria-hidden="true">
					<div class="bew-components-main bew-cart__main">
						<div class="bew-cart-image">
							<div><img loading="lazy" src="" width="1" height="1"></div>
						</div>
						<h2><span></span></h2>
						<div class="bew-cart-button">
							<div class="bew-components-button-content"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	<?php

	}

	public function cart_empty_content(){
		
		$helper = new Helper();
		$bew_cart_empty_page_id = $helper->get_woo_cart_empty_template();
		$with_css = true;
				
		if(!empty($bew_cart_empty_page_id)){			
			echo Elementor\Plugin::instance()->frontend->get_builder_content( $bew_cart_empty_page_id,$with_css  );
		}
	}
	
	private function add_actions() {
		
		add_action( 'elementor/element/after_section_end', [ $this, 'register_controls' ], 10, 3  );		
		add_action( 'elementor/frontend/section/before_render', [ $this, 'bew_cart_start'] );
		add_action( 'bew_cart_empty_content', array($this,'cart_empty_content') );
	
	}
				
	public function __construct() {
		parent::__construct();
		
		if(is_admin()){
			add_filter( 'is_bew_woo_cart', function( $is_bwc ) {
				return true;
			} );
		}
		
		require_once BEW_EXTRAS_PATH . 'modules/woo-cart/classes/bew-woo-cart.php';
				
		$this->add_actions();
	}

}
