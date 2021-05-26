<?php
namespace Elementor;

use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class BEW_Widget_Woo_Button extends Widget_Base {
	
	public function get_name() {
		return 'bew-woo-button';
	}

	public function get_title() {
		return __( 'Woo Action Button', 'briefcase-elementor-widgets' );
	}

	public function get_icon() {
		// Upload "eicons.ttf" font via this site: http://bluejamesbond.github.io/CharacterMap/
		return 'eicon-button';
	}

	public function get_categories() {
		return [ 'briefcasewp-elements' ];
	}
	
	public function get_script_depends() {
		return [ ];
	}
	
	public function is_reload_preview_required() {
		return true;
	}
	
	protected function _register_controls() {
		
		$this->start_controls_section(
			'section_woo_button',
			[
				'label' 		=> __( 'Action Button', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'woo_button_type',
			[
				'label' => __( 'Button Type', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'compare',
				'options' => [
					'compare' => __( 'Compare', 'briefcase-elementor-widgets' ),
					'wishlist' => __( 'Wishlist', 'briefcase-elementor-widgets' ),
					'quickview' => __( 'Quick View', 'briefcase-elementor-widgets' ),
					'custom' => __( 'Custom', 'briefcase-elementor-widgets' ),
				],				
			]

		);
		
		$this->add_control(
			'woo_button_compare_notice',
			[
				'raw' => __( 'IMPORTANT: "Compare" button. This feature requires <a href="https://wordpress.org/plugins/woo-smart-compare/" target="_blank">WPC Smart Compare for WooCommerce plugin</a> .', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::RAW_HTML,
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
				'condition' => [				    
					'woo_button_type' => 'compare',
				],
			]
		);
		
		$this->add_control(
			'woo_button_wishlist_notice',
			[
				'raw' => __( 'IMPORTANT: "Wishlist" button. This feature requires <a href="https://wordpress.org/plugins/ti-woocommerce-wishlist/" target="_blank">TI WooCommerce Wishlist plugin</a> .', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::RAW_HTML,
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
				'condition' => [				    
					'woo_button_type' => 'wishlist',
				],
			]
		);
		
		$this->add_control(
			'woo_button_quickview_notice',
			[
				'raw' => __( 'IMPORTANT: "QuickView" button. This feature requires <a href="https://wordpress.org/plugins/yith-woocommerce-quick-view/" target="_blank">YITH WooCommerce Quick View plugin</a> .', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::RAW_HTML,
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
				'condition' => [				    
					'woo_button_type' => 'quickview',
				],
			]
		);
			
		$this->add_control(
			'woo_button__text',
			[
				'label' => __( 'Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'placeholder' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'condition' => [				    
					'woo_button_type' => 'custom',
				],
			]
		);		
		
		$this->add_control(
			'woo_button_icon',
			[
				'label' => __( 'Icon', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::ICON,
				'label_block' => true,
				'default' => '',
				'condition' => [				    
					'woo_button_type' => 'custom',
				],
			]
		);
		
		$this->add_control(
			'woo_button_icon_align',
			[
				'label' => __( 'Icon Position', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'left',
				'options' => [
					'left' => __( 'Before', 'briefcase-elementor-widgets' ),
					'right' => __( 'After', 'briefcase-elementor-widgets' ),
				],	
				'condition' => [				    
					'woo_button_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'woo_button_icon_indent',
			[
				'label' => __( 'Icon Spacing', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 50,
					],
				],				
				'selectors' => [
					'{{WRAPPER}} #bew-woo-button .bew-align-icon-right i' => 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} #bew-woo-button .bew-align-icon-left i' => 'margin-right: {{SIZE}}{{UNIT}};',
				],
				'condition' => [				    
					'woo_button_type' => 'custom',
				],
			]
		);
		
		$this->end_controls_section();	
		
		$this->start_controls_section(
			'section_woo_button_compare',
			[
				'label' => __( 'Compare', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'woo_button_type' => 'compare',					
				]
			]
		);
		
		$this->add_control(
			'woo_button_compare_position',
			[
				'label' 		=> __( 'Absolute', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'compare-position-',
				'condition' => [
                    'woo_button_type' => 'compare',					
				]
			]
		);
		
		$this->add_control(
			'woo_button_compare_icon_style',
			[
				'label' 		=> __( 'Icon style', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-compare-icon-',
				'condition' => [
                    'woo_button_type' => 'compare',					
				]
			]
		);
				
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_woo_button_wishlist',
			[
				'label' => __( 'Wishlist', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'woo_button_type' => 'wishlist',					
				]
			]
		);

		$this->add_control(
			'woo_button_wishlist_position',
			[
				'label' 		=> __( 'Absolute', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'wishlist-position-',
				'condition' => [
                    'woo_button_type' => 'wishlist',					
				]
			]
		);
				
		$this->end_controls_section();
		
		
		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'General', 'briefcase-elementor-widgets' ),
			]
		);

				
		$this->add_responsive_control(
			'position',
			[
				'label' 		=> __( 'Position', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::CHOOSE,
				'options' 		=> [
					'left' => [
						'title' => __( 'Left', 'briefcase-elementor-widgets' ),
						'icon'  => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'briefcase-elementor-widgets' ),
						'icon'  => 'fa fa-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'briefcase-elementor-widgets' ),
						'icon'  => 'fa fa-align-right',
					],
				],
				'default' 		=> '',
				'selectors' 	=> [
					'{{WRAPPER}} #bew-woo-action-button' => 'text-align: {{VALUE}};',
				],
				'separator' => 'before',
			]
		);
		
		$this->end_controls_section();
				
		$this->start_controls_section(
			'section_woo_button_style',
			[
				'label' => __( 'Woo Button', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,				
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'woo_button_typo',
				'selector' 		=> '{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart, {{WRAPPER}} #bew-woo-action-button .wooscp-btn, {{WRAPPER}} #bew-woo-action-button .button',
			]
		);
		
		$this->start_controls_tabs( 'tabs_woo_button_style' );

		$this->start_controls_tab(
			'tab_woo_button_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'woo_button_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart .tinvwl_add_to_wishlist_button, {{WRAPPER}} #bew-woo-action-button .wooscp-btn , {{WRAPPER}} #bew-woo-action-button .button' => 'color: {{VALUE}};'
				],
			]
		);
		
		$this->add_control(
			'woo_button_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart, {{WRAPPER}} #bew-woo-action-button .wooscp-btn, {{WRAPPER}} #bew-woo-action-button .button' => 'background: {{VALUE}};',
				],
				
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_woo_button_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'woo_button_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart:hover .tinvwl_add_to_wishlist_button, {{WRAPPER}} #bew-woo-action-button .wooscp-btn:hover, {{WRAPPER}} #bew-woo-action-button .button:hover' => 'color: {{VALUE}};'
				],
			]
		);
		
		$this->add_control(
			'woo_button_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart:hover, {{WRAPPER}} #bew-woo-action-button .wooscp-btn:hover, {{WRAPPER}} #bew-woo-action-button .button:hover' => 'background-color: {{VALUE}};',
				],
				
			]
		);

			
		$this->add_control(
			'woo_button_hover_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'woo_button_border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart:hover, {{WRAPPER}} #bew-woo-action-button .wooscp-btn:hover, {{WRAPPER}} #bew-woo-action-button .button:hover' => 'border-color: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'woo_button_animation',
			[
				'label' => __( 'Animation', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'woo_button_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart, {{WRAPPER}} #bew-woo-action-button .wooscp-btn, {{WRAPPER}} #bew-woo-action-button .button',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'border_radius_woo_button',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart, {{WRAPPER}} #bew-woo-action-button .wooscp-btn, {{WRAPPER}} #bew-woo-action-button .button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'woo_button_box_shadow',
				'selector' => '{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart, {{WRAPPER}} #bew-woo-action-button .wooscp-btn, {{WRAPPER}} #bew-woo-action-button .button',
			]
		);
		
		$this->add_responsive_control(
			'woo_button_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [					
					'unit' => 'px',
				],
				'tablet_default' => [
					'unit' => 'px',
				],
				'mobile_default' => [
					'unit' => 'px',
				],
				'size_units' => [ '%', 'px', 'vw' ],
				'range' => [
					'%' => [
						'min' => 1,
						'max' => 100,
					],
					'px' => [
						'min' => 1,
						'max' => 1000,
					],
					'vw' => [
						'min' => 1,
						'max' => 100,
					],
				],							
				'selectors' => [
					'{{WRAPPER}}.elementor-widget-bew-woo-button' => 'width: {{SIZE}}{{UNIT}} !important;',
				],
				'separator' => 'before',
			]
		);
		
		$this->add_responsive_control(
			'woo_button_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [					
					'unit' => 'px',
				],
				'tablet_default' => [
					'unit' => 'px',
				],
				'mobile_default' => [
					'unit' => 'px',
				],
				'size_units' => [ '%', 'px', 'vw' ],
				'range' => [
					'%' => [
						'min' => 1,
						'max' => 100,
					],
					'px' => [
						'min' => 1,
						'max' => 1000,
					],
					'vw' => [
						'min' => 1,
						'max' => 100,
					],
				],				
				'selectors' => [
					'{{WRAPPER}}.elementor-widget-bew-woo-button .wooscp-btn, {{WRAPPER}}.elementor-widget-bew-woo-button .tinv-wishlist, {{WRAPPER}} .elementor-widget-bew-woo-button .button' => 'height: {{SIZE}}{{UNIT}} !important;',
				],				
			]
		);
				
		$this->add_responsive_control(
			'button_woo_button_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart, {{WRAPPER}} #bew-woo-action-button .wooscp-btn, {{WRAPPER}} #bew-woo-action-button .button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',	
			]
		);
		
		$this->add_responsive_control(
			'button_woo_button_margin',
			[
				'label' => __( 'Button Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-woo-action-button .tinv-wishlist.tinvwl-shortcode-add-to-cart, {{WRAPPER}} #bew-woo-action-button .wooscp-btn, {{WRAPPER}} #bew-woo-action-button .button' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
        $this->end_controls_section();
	}
	
	protected function add_woo_button_button() {
		global $product;
		$args = array( 'product' => $product );
		echo $this->generate_button( $args );		
	}


	public function generate_button( $args ) {
		
		$settings = $this->get_settings();	
			
		$woo_button_show = $settings['woo_button_show'];
		$woo_button_text = $settings['woo_button_text'];
		$woo_button_icon = $settings['woo_button_icon'];
				
		$default_args = array(
			'product'         => null,
			'label'           => $woo_button_text,
			'class'           => ' bew-buy-now',
			//'hide_in_cart'    => true,
			//'hide_outofstock' => wc_qb_option( 'hide_outofstock' ),
			'tag'             => 'link',
		);

		$args     = wp_parse_args( $args, $default_args );
		$_arg_val = array( true, 'yes', '1', 1, 'on' );

		if ( in_array( $args['hide_in_cart'], $_arg_val, true ) ) {
			$args['hide_in_cart'] = 'yes';
		} else {
			$args['hide_in_cart'] = 'no';
		}

		extract( $args );
		$return = '';
				
		if ( $product == null ) {
			return;
		}
		$type = $product->get_type();
		if ( $woo_button_show == null ) {
			return;
		}
		if ( ! in_array( 'all', $woo_button_show ) && ! in_array( $type, $woo_button_show ) ) {
			return;
		}
		$pid = $product->get_id();
		$quantity  = 1;

		$defined_class = 'wc_woo_button_button woo_button_button woo_button_' . $type . ' woo_button_' . $pid . '_button woo_button_' . $pid . '' . $class;
		$defined_id    = 'woo_button_' . $pid . '_button';
		$defined_attrs = 'name=""  data-product-type="' . $type . '" data-product-id="' . $pid . '" data-quantity="' . $quantity . '"';

		if ( 'yes' === $args['hide_in_cart'] ) {
			$defined_attrs .= ' style="display:none;" ';
		}


		$return .= '<div class="woo_button_container woo_button_' . $pid . '_container" id="woo_button_' . $pid . '_container" >';

		if ( $tag == 'button' ) {
			$return .= '<input value="' . $label . '" type="button" id="' . $defined_id . '" ' . $defined_attrs . '  class="wcbn_button ' . $defined_class . '">';
		}

		if ( $tag == 'link' ) {
			$qty    = isset( $quantity ) ? $quantity : 1 ;
			$link   = $this->get_product_addtocartLink( $product, $qty );			
			$return .= '<a href="' . $link . '" id="' . $defined_id . '" ' . $defined_attrs . '  class="wcbn_button ' . $defined_class . '"><i class="' .$woo_button_icon . '" aria-hidden="true"></i>';
			$return .= $label;
			$return .= '</a>';
		}

		$return .= '</div>';
		return $return;
	}
	
	/**
	* Get Product Data for Woo Grid Loop template
	*
	* @since 1.0.0
	*/
	public static function product_data_loop() {
			
		global $product;				
			
		// Show firts product for loop template				
		if(empty($product)){
			// Todo:: Get product from template meta field if available
				$args = array(
					'post_type' => 'product',
					'post_status' => 'publish',
					'posts_per_page' => 1
				);
				$preview_data = get_posts( $args );
				$product_data =  wc_get_product($preview_data[0]->ID);
			
				$product = $product_data;  
			}	
	}	
	
	protected function render() {
		
		$settings = $this->get_settings();
		
		$woo_button_type 			= $settings['woo_button_type'];		
		$woo_button_by_id		 	= (isset($settings['woo_button_by_id']) ? $settings['woo_button_by_id'] : null);
		$woo_button_id_custom 	 	= (isset($settings['woo_button_id']) ? $settings['woo_button_id'] : null);
		$woo_button_icon_align 		= $settings['woo_button_icon_align'];		
		$woo_button_underlines		= (isset($settings['woo_button_underlines']) ? $settings['woo_button_underlines'] : null); 
		$product_addtocart_text 	= $settings['woo_button__text'];		
		
		// classes
		
		$classes 		= array();
		
		if ( 'compare' == $woo_button_type  ) {
			$classes[]  = 'bew-compare';
		}
		
		if ( 'wishlist' == $woo_button_type  ) {
			$classes[]  = 'bew-wishlist';
		}
		
		if ( 'quickview' == $woo_button_type  ) {
			$classes[]  = 'bew-quickview';
		}
		
		$classes = implode( ' ', $classes );
		
		// Inner classes
		$inner_classes 		= array( 'woo-button-action');
				
		if ( '' == $product_addtocart_text ) {
			$inner_classes[]  = 'button-no-text';
		}		
		
		$inner_classes[]  = 'bew-align-icon-' . $woo_button_icon_align;
						
		$inner_classes = implode( ' ', $inner_classes );		
			
			// Data for Bew Templates
				$this->product_data_loop();
					
			// Data for Elementor Pro Templates option
				global $product;
					
				if(is_string($product)){
					$product = wc_get_product();
				}
					
		// Made Woo button.		
		echo'<div id="bew-woo-action-button"' . 'class="'. esc_attr( $classes ) .'">';
			
			switch ( $woo_button_type ) {
			case 'compare':
				// Made the compare button.
				
				if ( class_exists( 'WPCleverWooscp' ) ){
					echo do_shortcode( '[wooscp]' );	
				}
							
			break;
			case 'wishlist':
				// Made the wishlist button.
				if ( class_exists('TInvWL_Public_AddToWishlist') ){
					if (is_product()){
						echo do_shortcode( '[ti_wishlists_addtowishlist]' );
					} else{
					echo do_shortcode("[ti_wishlists_addtowishlist loop=yes]");
					}
				}
			break;
			case 'quickview':
				// Made the quickview button.
				if ( class_exists('YITH_WCQV') ){					
					echo do_shortcode("[yith_quick_view]");					
				}		
			
			break;
			default:
				 // Button section
				   if ( version_compare( WC()->version, '3.0.0', '>=' ) ) {
							$product_id = $product->get_id();
							$product_type = $product->get_type();
						} else {
							$product_id = $product->id;
							$product_type = $product->product_type;
						}

						$class = implode( ' ', array_filter( [
							'button bew-element-woo-button-btn',
							'product_type_' . $product_type,				
						] ) );

				   
				   if ( $product && $product->is_type( 'simple' ) && $product->is_purchasable() && $product->is_in_stock() && ! $product->is_sold_individually() ) {
					echo'<div class="'. esc_attr( $inner_classes ) .'">';	
					// add the buy now button					
					$this->add_woo_button_button();	
			}
			
		   // Compare button
			
		  		
			
			echo '</div>';
			
		   }
		   
		echo '</div>';   
		
	}
	
}

Plugin::instance()->widgets_manager->register_widget_type( new BEW_Widget_Woo_Button() );