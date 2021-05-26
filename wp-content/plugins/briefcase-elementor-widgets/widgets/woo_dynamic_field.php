<?php
namespace Briefcase;

use Elementor;
use Elementor\Plugin;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Text_Shadow	;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Css_Filter;
use Elementor\Repeater;
use Briefcase\Widgets\Classes\Bew_dynamic_product_title;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;

if ( ! defined( 'ABSPATH' ) ) { exit; // Exit if accessed directly
}

/**
 * Creates our custom Elementor widget
 *
 * Class briefcase elementor widget
 *
 * @package Elementor
 */
class Bew_Widget_Dynamic_Field extends Widget_Base {
		
	/**
	 * Get Widgets name
	 *
	 * @return string
	 */
	public function get_name() {
		return 'bew_dynamic';
	}

	/**
	 * Get widgets title
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'Woo Dynamic Field', 'briefcase-elementor-widgets' );
	}

	/**
	 * Get the current icon for display on frontend.
	 * The extra 'dtbaker-elementor-widget' class is styled differently in frontend.css
	 *
	 * @return string
	 */
	public function get_icon() {
		return 'eicon-parallax';
	}

	/**
	 * Get available categories for this widget. Which is our own category for page builder options.
	 *
	 * @return array
	 */
	public function get_categories() {
		return [ 'briefcasewp-elements' ];
	}
	
	public function get_script_depends() {
		return [ 'woo-general',
				 'woo-qty',
				 'woo-avm',
				 'woo-add-to-cart',
				 'woo-single-product',				 
				 'wc-single-product',				 
				 'flexslider',				 
				 'jquery-slick',
				 'zoom',
				 'sticky-kit',
				 'woo-slider',
				 'woo-addtocart-ajax' ];
	}
	
	public function is_reload_preview_required() {
		return true;
	}

	/**
	 * We always show this item in the panel.
	 *
	 * @return bool
	 */
	public function show_in_panel() {
		return true;
	}

	public function on_export( $element ) {
		unset( $element['settings']['product_id'] );

		return $element;
	}
		
	/**
	 * This registers our controls for the widget. Currently there are none but we may add options down the track.
	 */
	protected function _register_controls() {
		
		
		$this->start_controls_section(
			'section_dynamic',
			[
				'label' => __( 'Dynamic Field', 'briefcase-elementor-widgets' ),
			]
		);

		$this->add_control(
			'desc',
			[
				'label' => __( 'Choose from the available dynamic fields below.', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::RAW_HTML,
			]
		);

		$dynamic_select = array(
			'' => esc_html__( ' - choose - ', 'briefcase-elementor-widgets' ),
		);

		$dynamic_select = array_merge( $dynamic_select, $this->get_dynamic_fields( true ) );


		$this->add_control(
			'dynamic_field_value',
			[
				'label'   => esc_html__( 'Choose Field', 'briefcase-elementor-widgets' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '',
				'options' => $dynamic_select,				
			]
		);
	if( class_exists( 'WooCommerce' ) ) {
		
		global $post;
		$post_type = get_post_type($post->ID);
		
		//echo "hola" . $post_type;
				
		switch ( $post_type ) {
        case 'product':
		
		if ( is_product() ){
			
			//echo "hola2" . $post_type;			
			$this->add_control(
			'product_add_to_cart_options',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'product_add_to_cart_single',
			]
			);			
		}			
        
		break;
        case 'elementor_library':
				
        $bew_template_type = get_post_meta($post->ID, 'briefcase_template_layout', true);
		
		if (empty($bew_template_type)) {		
			if (!isset($_SESSION) && !headers_sent()) {
			session_start();
			}
			if (isset($_SESSION['selss'])) {				
			$bew_template_type = $_SESSION['selss'];					
			}
		}
		
		if (empty($bew_template_type)){
		$bew_template_type = get_post_meta($post->ID, '_elementor_template_type', true);
		}
				
			switch ( $bew_template_type ) {
			case 'woo-product':
			$this->add_control(
			'product_add_to_cart_options',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'product_add_to_cart_single',
			]
			);
						
			break;
			case 'woo-shop':
			$this->add_control(
			'product_add_to_cart_options',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'product_add_to_cart_loop',
			]
			);
						
			break;
			case 'product':
			$this->add_control(
			'product_add_to_cart_options',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'product_add_to_cart_single',
			]
			);
						
			break;
			case 'product-archive':
			$this->add_control(
			'product_add_to_cart_options',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'product_add_to_cart_loop',
			]
			);
						
			break;
			default:		
			$this->add_control(
			'product_add_to_cart_options',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'product_add_to_cart',
			]
			); 
			}
		
        break;
		default:		
        $this->add_control(
			'product_add_to_cart_options',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'product_add_to_cart',
			]
			);   
        }
	}
				
		$this->end_controls_section();		
				
		$this->start_controls_section(
			'section_add_to_cart',
			[
				'label' => __( 'Add to cart', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',					
				]
			]
		);		
				
		
		$this->add_control(
			'product_type',
			[
				'label' 		=> __( 'Custom Add to cart by ID', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => 'product_add_to_cart',
				]
				
			]
		);
				
		$this->add_control(
			'product_id',
			[
				'label' 		=> __( 'Product ID', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::TEXT,
				'placeholder' 	=> __( 'Your Product ID', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_type' => 'yes',
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => 'product_add_to_cart',
					
                ]
					
			]
		);
				
		$this->add_control(
			'product_addtocart_text',
			[
				'label' => __( 'Single Product Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Add to cart', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Add to cart', 'briefcase-elementor-widgets' ),
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop', 'product_add_to_cart_single'],	
				]
			]
		);
		
		$this->add_control(
			'product_addtocart_text_variable',
			[
				'label' => __( 'Variable Product Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Select options', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Select options', 'briefcase-elementor-widgets' ),
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],	
				]
			]
		);
		
		$this->add_control(
			'product_addtocart_text_grouped',
			[
				'label' => __( 'Grouped Product Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'View products', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'View products', 'briefcase-elementor-widgets' ),
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],	
				]
			]
		);
						
		$this->add_control(
			'product_addtocart_icon',
			[
				'label' => __( 'Add to Cart Icon', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::ICON,
				'label_block' => true,
				'default' => '',
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop', 'product_add_to_cart_single'],	
				]
			]
		);
				
		$this->add_control(
			'product_addtocart_icon_align',
			[
				'label' => __( 'Icon Position', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'left',
				'options' => [
					'left' => __( 'Before', 'briefcase-elementor-widgets' ),
					'right' => __( 'After', 'briefcase-elementor-widgets' ),
				],
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop', 'product_add_to_cart_single'],
					'product_addtocart_icon!' => '',
				],
			]
		);

		$this->add_control(
			'product_addtocart_icon_indent',
			[
				'label' => __( 'Icon Spacing', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 50,
					],
				],
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop', 'product_add_to_cart_single'],
					'product_addtocart_icon!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-align-icon-right .add_to_cart_button i, {{WRAPPER}} #bew-cart-avm.bew-align-icon-right i' => 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} #bew-cart.bew-align-icon-left .add_to_cart_button i, {{WRAPPER}} #bew-cart-avm.bew-align-icon-left i' => 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);
		
		$this->add_control(
			'product_show_qty_box',
			[
				'label' 		=> __( 'Show Quantity Box', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',				
				]
				
			]
		);
		
		$this->add_control(
			'product_show_qty_text',
			[
				'label' 		=> __( 'Show Quantity Text', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_show_qty_box' => 'yes',				
				]
				
			]
		);
		
		$this->add_control(
			'product_qty_text',
			[
				'label' => __( 'Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,				
				'placeholder' => __( 'Quantity', 'briefcase-elementor-widgets' ),
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_show_qty_text' => 'yes',
				]
			]
		);
						
		$this->add_responsive_control(
            'product_buttom_direction',
            [
                'label' => __( 'Style	', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'inline-block' => [
                        'title' => __( 'Horizontal', 'briefcase-elementor-widgets' ),
                        'icon' => 'fa fa-arrows-h',
                    ],
                    'block' => [
                        'title' => __( 'Vertical', 'briefcase-elementor-widgets' ),
                        'icon' => 'fa fa-arrows-v',
                    ]
                ],
                'default' => 'inline-block',
                'condition' => [
                    'product_show_qty_box' => 'yes'
                ],
				'devices' => [ 'desktop', 'tablet', 'mobile' ],
				'prefix_class' => 'bew-cart-direction%s-',
				'selectors' => [
					'{{WRAPPER}} #bew-cart .single_add_to_cart_button, {{WRAPPER}} #bew-cart.button-by-id' => 'display: {{VALUE}}; vertical-align: middle; margin: 10px auto',
				],
                
            ]
        );
					
		$this->add_control(
			'field_preview',
			[
				'label'   => esc_html__( 'Code', 'briefcase-elementor-widgets' ),
				'type'    => Controls_Manager::RAW_HTML,
				'separator' => 'none',
				'show_label' => false,
				'raw' => '<div id="bew-dynamic-code"></div>',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => 'product_add_to_cart',
				]
			]
		);
		
		$this->add_control(
			'heading_addtocart_view_cart',
			[
				'label' => __( 'View Cart', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single', 'product_add_to_cart_loop'],					
				]				
			]
		);
				
		$this->add_control(
			'product_addtocart_text_view_cart',
			[
				'label' => __( 'View Cart Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'View Cart', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'View Cart', 'briefcase-elementor-widgets' ),
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],	
				]
			]
		);
		
		$this->add_control(
			'product_addtocart_icon_view_cart',
			[
				'label' => __( 'View Cart Icon', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::ICON,
				'label_block' => true,
				'default' => '',
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop', 'product_add_to_cart_single'],	
				]
			]
		);
		
		$this->add_control(
			'product_addtocart_icon_align_view_cart', 
			[
				'label' => __( 'Icon Position', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'left',
				'options' => [
					'left' => __( 'Before', 'briefcase-elementor-widgets' ),
					'right' => __( 'After', 'briefcase-elementor-widgets' ),
				],
				'condition' => [					
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop', 'product_add_to_cart_single'],
					'product_addtocart_icon_view_cart!' => '',					
				],
			]
		);

		$this->add_control(
			'product_addtocart_view_cart_icon_indent',
			[
				'label' => __( 'Icon Spacing', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 50,
					],
				],
				'condition' => [					
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop', 'product_add_to_cart_single'],
					'product_addtocart_icon_view_cart!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-align-icon-view-cart-right .added_to_cart i' => 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} #bew-cart.bew-align-icon-view-cart-left .added_to_cart i' => 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);
		
		$this->add_control(
			'product_addtocart_view_cart_link',
			[
				'label' 		=> __( 'Enabled Link', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'Show', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Hide', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
			]
		);

		$this->add_control(
			'product_addtocart_view_cart_link_url',
			[
				'label' => __( 'View Cart Link', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'placeholder' => __( 'http://', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_addtocart_view_cart_link' => 'yes',					
				]
			]
		);
		
		$this->add_control(
			'heading_addtocart_ajax',
			[
				'label' => __( 'Ajax Add to cart', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],					
				]
				
			]
		);

		$this->add_control(
			'product_addtocart_ajax',
			[
				'label' 		=> __( 'Enable', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'active',				
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],
				]
			]
		);

		$this->add_control(
			'product_opencart_ajax',
			[
				'label' 		=> __( 'Open Menu Cart on Ajax', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'active',				
				'condition' => [                    
					'product_addtocart_ajax' => 'active',
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],
				]
			]
		);
		
		$this->add_control(
			'heading_addtocart_visible',
			[
				'label' => __( 'Always Visible Mode', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],
				]
				
			]
		);
		
		$this->add_control(
			'product_addtocart_visible_buttom',
			[
				'label' 		=> __( 'Activate Mode', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],
				]
				
				
			]
		);
		
		$this->add_control(
			'product_showqtyv',
			[
				'label' 		=> __( 'Show Quantity Box', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [                    
					'product_addtocart_visible_buttom' => 'yes',
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],
				]
			]
		);
		
		$this->add_control(
			'heading_addtocart_hover',
			[
				'label' => __( 'Overlay Mode', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],
				]
				
			]
		);
		
		$this->add_control(
			'product_addtocart_hover_buttom',
			[
				'label' 		=> __( 'Activate Mode', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',				
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],
				]
			]
		);
		
		$this->add_control(
            'overlay_button',
            [
                'label' => __( 'Overlay Button Type', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
					'custom' => [
						'title' => __( 'Custom', 'briefcase-elementor-widgets' ),
						'icon' => 'icon-note',
					],
					'square' => [
						'title' => __( 'Square', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-square-o',
					],
					'circle' => [
						'title' => __( 'Circle', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-circle-o',
					],					
				],				
				'default' => 'custom',
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_addtocart_hover_buttom' => 'yes',
				]
            ]
        );
		
		$this->add_control(
			'heading_addtocart_underlines',
			[
				'label' => __( 'Underlines Button', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],					
				]
				
			]
		);
		
		$this->add_control(
			'product_addtocart_underlines',
			[
				'label' 		=> __( 'Activate Style', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',				
				'condition' => [                    
					'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],
				]
			]
		);
		
		$this->add_control(
			'heading_addtocart_product_variation',
			[
				'label' => __( 'Product Variation', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],					
				]
				
			]
		);
		
		$this->add_control(
			'product_addtocart_variation_price_dynamic',
			[
				'label' 		=> __( 'Dynamic Variation Price', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
				
			]
		);

		$this->add_control(
			'variation_price_dynamic_description',
			[
				'label' 		=> __( 'Variation Description', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'Show', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Hide', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'product_addtocart_variation_price_dynamic' => 'yes',
				]
				
			]
		);
		
		$this->add_control(
			'variation_price_dynamic_availability',
			[
				'label' 		=> __( 'Variation Availability', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'Show', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Hide', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'product_addtocart_variation_price_dynamic' => 'yes',
				]
				
			]
		);
		
						
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_product_image',
			[
				'label' => __( 'Image', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_image',
				]	
			]
		);
		
		$this->add_control(
            'product_image_style',
            [
                'label' => __('Image Style', 'briefcase-elementor-widgets'),
                'type'  => Controls_Manager::SELECT,
                'options' => [
                    'featured-image' 	=> __( 'Featured Image', 'briefcase-elementor-widgets' ),
                    'swap-image' 		=> __( 'Swap Image', 'briefcase-elementor-widgets' ),
					'slider-image' 		=> __( 'Slider Image', 'briefcase-elementor-widgets' ),	
                ],
				'prefix_class' => 'bew-product-image-type-',
                'default' => 'featured-image',
            ]
        );
		
		$this->add_control(
            'product_image_slider_layout',
            [
                'label' => __('Layout', 'briefcase-elementor-widgets'),
                'type'  => Controls_Manager::SELECT,
                'options' => [
                    'horizontal' => __( 'Horizontal', 'briefcase-elementor-widgets' ),
                    'vertical' => __( 'Vertical', 'briefcase-elementor-widgets' ),
                ],
                'prefix_class' => 'bew-woo-slider-image-view-',
                'default' => 'horizontal',
				'condition' => [
                    'product_image_style' => 'slider-image',
				]
            ]
        );
		
		$this->add_control(
			'product_image_style_slider_thumbnails',
			[
				'label' 		=> __( 'Show slider thumbnails', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-slider-thumbnail-',
				'condition' => [
                    'product_image_style' => 'slider-image',
				]
			]
		);
				
		$this->add_control(
			'product_image_link',
			[
				'label' 		=> __( 'Image Link', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',				
			]
		);
		
		$this->add_control(
            'product_image_size',
            [
                'label' => __('Image Size', 'briefcase-elementor-widgets'),
                'type'  => Controls_Manager::SELECT,
                'options' => [
                    'full' => __( 'Full', 'briefcase-elementor-widgets' ),
                    'woocommerce_thumbnail' => __( 'Woocommerce Thumbnail', 'briefcase-elementor-widgets' ),					
                ],               
                'default' => 'full'

            ]
        );
				
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_image_labels',
			[
				'label' => __( 'Labels', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_image',
				]	
			]
		);
		
		
		$this->add_control(
			'product_image_labels_new',
			[
				'label' 		=> __( 'New', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-image-new-show-',
				
			]
		);
		
		$this->add_control(
			'product_image_labels_new_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'New', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'New', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_image_labels_new' => 'yes',
				]
			]
		);
		
		$this->add_control(
			'product_image_labels_new_days',
			[
				'label' => __( 'Published Days', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::NUMBER,				
				'default' 		=> 60,					
				'condition' => [
                    'product_image_labels_new' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'product_image_labels_featured',
			[
				'label' 		=> __( 'Featured', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-image-featured-show-',
				
			]
		);
		
		$this->add_control(
			'product_image_labels_featured_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Hot', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Hot', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_image_labels_featured' => 'yes',
				]
			]
		);
		
		$this->add_control(
			'product_image_labels_outofstock',
			[
				'label' 		=> __( 'Out of Stock', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-image-outofstock-show-',
				
			]
		);
		
		$this->add_control(
			'product_image_labels_outofstock_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Out of Stock', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Out of Stock', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_image_labels_outofstock' => 'yes',
				]
			]
		);		
		
		$this->add_control(
			'product_image_labels_sale',
			[
				'label' 		=> __( 'Sale', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-image-sale-show-',
				
			]
		);
		
		$this->add_control(
			'product_image_labels_sale_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Sale', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Sale', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_image_labels_sale' => 'yes',
				]
			]
		);
		
		$this->add_control(
			'product_image_labels_sale_percent',
			[
				'label' 		=> __( 'Sale Percent', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-image-sale-percent-show-',
				'condition' => [
                    'product_image_labels_sale' => 'yes',
				]
			]
		);	
		
		$this->add_control(
            'product_image_labels_type',
            [
                'label' => __( 'Labels Type', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
					'square' => [
						'title' => __( 'Square', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-square-o',
					],
					'circle' => [
						'title' => __( 'Circle', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-circle-o',
					]
				],
				'default' => 'square',
				'prefix_class' => 'bew-image-labels-type-',
            ]
        );
		
		$this->end_controls_section();
				
		$this->start_controls_section(
			'section_gallery',
			[
				'label' => __( 'Gallery', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_gallery',
				]	
			]
		);
		
		$this->add_control(
            'product_gallery_layout',
            [
                'label' => __('Layout', 'briefcase-elementor-widgets'),
                'type'  => Controls_Manager::SELECT,
                'options' => [
                    'horizontal' => __( 'Horizontal', 'briefcase-elementor-widgets' ),
                    'vertical' => __( 'Vertical', 'briefcase-elementor-widgets' ),
					'sticky' => __( 'Sticky', 'briefcase-elementor-widgets' ),
                ],
                'prefix_class' => 'bew-woo-gallery-view-',
                'default' => 'horizontal'

            ]
        );
		
			$this->add_control(
			'product_gallery_zoom',
			[
				'label' 		=> __( 'Zoom', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-zoom-show-',
				
			]
		);
				
		$this->add_control(
			'product_gallery_lightbox',
			[
				'label' 		=> __( 'Lightbox', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-lightbox-show-',
				
			]
		);
		
		$this->add_control(
			'product_gallery_woo_default',
			[
				'label' 		=> __( 'Original WooCommerce Gallery', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-woo-default-',
				'description' 	=> __( 'Use this option to show the Original WooCommerce Gallery.', 'briefcase-elementor-widgets' ),
				
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_navigation',
			[
				'label' => __( 'Navigation', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_gallery',
				]	
			]
		);	
		
		$this->add_control(
			'product_gallery_arrows',
			[
				'label' 		=> __( 'Arrows', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-arrows-show-',
				
			]
		);
		
		$this->add_control(
			'product_gallery_dots',
			[
				'label' 		=> __( 'Dots', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-dots-show-',
				
			]
		);
		
		$this->add_control(
			'product_gallery_thumbnails',
			[
				'label' 		=> __( 'Thumbnails', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-thumbnails-show-',
				
			]
		);
				
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_labels',
			[
				'label' => __( 'Labels', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_gallery',
				]	
			]
		);		
		
		$this->add_control(
			'product_gallery_labels_new',
			[
				'label' 		=> __( 'New', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-new-show-',
				
			]
		);
		
		$this->add_control(
			'product_gallery_labels_new_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'New', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'New', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_gallery_labels_new' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'product_gallery_labels_new_days',
			[
				'label' => __( 'Published Days', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::NUMBER,				
				'default' 		=> 60,					
				'condition' => [
                    'product_gallery_labels_new' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'product_gallery_labels_featured',
			[
				'label' 		=> __( 'Featured', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-featured-show-',
				
			]
		);
		
		$this->add_control(
			'product_gallery_labels_featured_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Hot', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Hot', 'briefcase-elementor-widgets' ),				
			]
		);
		
		$this->add_control(
			'product_gallery_labels_outofstock',
			[
				'label' 		=> __( 'Out of Stock', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-outofstock-show-',
				
			]
		);
		
		$this->add_control(
			'product_gallery_labels_outofstock_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Out of Stock', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Out of Stock', 'briefcase-elementor-widgets' ),				
			]
		);
		
		$this->add_control(
			'product_gallery_labels_sale',
			[
				'label' 		=> __( 'Sale', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-sale-show-',
				
			]
		);
		
		$this->add_control(
			'product_gallery_labels_sale_text',
			[
				'label' => __( 'Custom Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Sale', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Sale', 'briefcase-elementor-widgets' ),				
			]
		);
		
		$this->add_control(
			'product_gallery_labels_sale_percent',
			[
				'label' 		=> __( 'Sale Percent', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-gallery-sale-percent-show-',
				'condition' => [
                    'product_gallery_labels_sale' => 'yes',
				]
			]
		);		
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_title',
			[
				'label' => __( 'Title', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_title',
				]	
			]
		);		
		
		$this->add_control(
			'product_title_link',
			[
				'label' 		=> __( 'Title Link', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				
			]
		);
		
		$this->add_control(
			'product_title_limit',
			[
				'label' 		=> __( 'Title Limit', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				
			]
		);
		
		$this->add_control(
			'product_title_limit_character',
			[
				'label' => __( 'Character Limit', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::NUMBER,
				'condition' => [
                    'product_title_limit' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'product_title_limit_dots',
			[
				'label' 		=> __( 'Add "..."', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'product_title_limit' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'product_title_limit_wordcutter',
			[
				'label' 		=> __( 'Dont break words in title', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'product_title_limit' => 'yes',
                ]
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_product_category',
			[
				'label' => __( 'Category', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_category',
				]	
			]
		);
		
		$this->add_control(
			'product_category_truncate',
			[
				'label' 		=> __( 'Categories List Truncate', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'separator' => 'before',				
			]
		);
		
		$this->add_responsive_control(
            'product_category_truncate_width',
            [
                'label' => __( 'Truncate Width', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 200,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 500,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-category li.category' => 'max-width: {{SIZE}}{{UNIT}} ;',
                ],
            ]
        );
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_price',
			[
				'label' => __( 'Price', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_price',
				]	
			]
		);
		
		$this->add_control(
			'product_price_absolute',
			[
				'label' 		=> __( 'Position Absolute', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'heading_product_price_RS',
			[
				'label' => __( 'Regular/Sale Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,				
				'separator' => 'before',				
			]
		);
		
		
		$this->add_control(
			'product_price_regular',
			[
				'label' 		=> __( 'Show Regular Price', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
				
			]
		);
		
		$this->add_control(
			'product_price_sale',
			[
				'label' 		=> __( 'Show Sale Price', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
				
			]
		);
		
		$this->add_control(
			'heading_product_price_variation',
			[
				'label' => __( 'Variation Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,				
				'separator' => 'before',				
			]
		);
		
		
		$this->add_control(
			'product_price_low',
			[
				'label' 		=> __( 'Show Lowest Price', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
				
			]
		);
		
		$this->add_control(
			'product_price_low_text',
			[
				'label' => __( 'Text Before Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( '', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'From:', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_price_low' => 'yes',
				]
			]
		);
				
		$this->add_control(
			'product_price_high',
			[
				'label' 		=> __( 'Show Highest Price', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
				
			]
		);
		
		$this->add_control(
			'product_price_high_text',
			[
				'label' => __( 'Text Before Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( '', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Up to:', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'product_price_high' => 'yes',
				]
			]
		);
		
		$this->add_control(
			'product_price_hide',
			[
				'label' 		=> __( 'Hide Price Until Select', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
				
			]
		);
				
		$this->end_controls_section();
		
		$this->start_controls_section(
            'section_tabs_title',
            [
                'label' => __( 'Tabs', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_tabs',
                ]
				
            ]
        );

        $this->add_control(
            'tab_layout',
            [
                'label' => __('Layout', 'briefcase-elementor-widgets'),
                'type'  => Controls_Manager::SELECT,
                'options' => [
                    'horizontal' => __( 'Horizontal', 'briefcase-elementor-widgets' ),
                    'vertical' => __( 'Vertical', 'briefcase-elementor-widgets' ),
                ],
                'prefix_class' => 'bew-woo-tabs-view-',
                'default' => 'horizontal'

            ]
        );    

        $repeater = new Repeater();
	
        if(is_singular('elementor_library')){
			
            $registered_tabs = $this->get_woo_registered_tabs();			
        }
        $registered_tabs['description'] = __('Description', 'woocommerce');
        $registered_tabs['additional_information'] = __('Additional information','woocommerce');
        $registered_tabs['reviews'] = __('Reviews','woocommerce');
        $registered_tabs['custom'] = __('Custom','briefcase-elementor-widgets');
		
        $repeater->add_control(
            'tab_type',
            [
                'label' => __( 'Tab Type', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SELECT,
                'options' => $registered_tabs,
                'default' => 'description',
            ]
        );

        $repeater->add_control(
            'tab_title',
            [
                'label' => __( 'Tab Title', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::TEXT,
                'default' => 'Description',
            ]
        );

        $repeater->add_control(
            'custom_tab_content',
            [
                'label' => __( 'Tab Content', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::WYSIWYG,
				'dynamic' => [
					'active' => true,
				],
                'default' => '',
                'condition' => [
                    'tab_type' => 'custom',
                ],
            ]
        );
		
		global $post;
		$bewglobal = get_post_meta($post->ID, 'briefcase_apply_global', true);
		if ($bewglobal == 'off' ){
		$repeater->add_control(
            'custom_description_content',
            [
                'label' => __( 'Tab Content', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::WYSIWYG,
                'default' => '',
                'condition' => [
                    'tab_type' => 'description',
                ],
            ]
        );
		}
		
        $this->add_control(
            'tabs',
            [
                'label' => __( 'Tabs', 'briefcase-elementor-widgets'),
                'type'  => Controls_Manager::REPEATER,
                'fields' => $repeater->get_controls(),
                'default' => [
                    [
                        'tab_type' => 'description',
                        'tab_title' => __('Description','woocommerce')
                    ],
                    [
                        'tab_type' => 'additional_information',
                        'tab_title' => __('Additional information','woocommerce')
                    ],
                    [
                        'tab_type' => 'reviews',
                        'tab_title' => __('Reviews','woocommerce')
                    ],
                ],
                'title_field' => '{{{ tab_title }}}'

            ]
        );

        $this->end_controls_section();
		
		$this->start_controls_section(
			'section_meta',
			[
				'label' => __( 'Meta', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_meta',
				]
				
			]
		);
		
		$this->add_control(
			'product_meta_sku',
			[
				'label' 		=> __( 'Show Product SKU', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',	
				'prefix_class' => 'bew-product-meta-sku-show-',
				
			]
		);
		
		$this->add_control(
			'product_meta_categories',
			[
				'label' 		=> __( 'Show Product Categories', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
				'prefix_class' => 'bew-product-meta-categories-show-',
			]
		);
		
		$this->add_control(
			'product_meta_tags',
			[
				'label' 		=> __( 'Show Product Tags', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',		
				'prefix_class' => 'bew-product-meta-tags-show-',
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_rating',
			[
				'label' => __( 'Rating', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_rating',
				]
				
			]
		);
		
		$this->add_control(
			'product_rating_start',
			[
				'label' 		=> __( 'Show Rating Stars', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',	
				'prefix_class' => 'bew-product-rating-stars-show-',
				
			]
		);
		
		$this->add_control(
			'product_rating_count',
			[
				'label' 		=> __( 'Show Rating Review Count', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',	
				'prefix_class' => 'bew-product-rating-count-show-',
				
			]
		);
		
		$this->add_control(
			'product_no_rating',
			[
				'label' 		=> __( 'Show Rating without reviews', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_review',
			[
				'label' => __( 'Review', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'product_comments',
				]
				
			]
		);
		
		$this->add_control(
			'product_review_layout',
			[
				'label' => __( 'Layout', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SELECT,
			'options' => [				
				'' => __( 'None', 'briefcase-elementor-widgets' ),
				'vertical' => __( 'Vertical', 'briefcase-elementor-widgets' ),	
				'horizontal' => __( 'Horizontal', 'briefcase-elementor-widgets' ),							
			],
			'prefix_class' => 'bew-review-layout-',			
			]
		);
		
		$this->add_control(
			'product_review_slider',
			[
				'label' 		=> __( 'Review Slider', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',	
				'prefix_class' => 'bew-review-show-',				
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_cat_title',
			[
				'label' => __( 'Title', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'category_title',
				]
				
			]
		);
		
		$this->add_control(
			'cat_title_count',
			[
				'label' 		=> __( 'Display Products Count', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'separator' => 'before',				
			]
		);
		
		$this->add_control(
			'cat_title_absolute',
			[
				'label' 		=> __( 'Position Absolute', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
								
			]
		);
		
		$this->add_control(
			'cat_title_absolute_translate',
			[
				'label' 		=> __( 'Translate Effect', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'condition' => [
                    'cat_title_absolute' => 'yes',
				]
								
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_cat_image',
			[
				'label' => __( 'Image', 'briefcase-elementor-widgets' ),
				'condition' => [
                    'dynamic_field_value' => 'category_image',
				]
				
			]
		);
		
		$this->add_control(
			'cat_image_scale',
			[
				'label' 		=> __( 'Scale Effect', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-cat-image-scale-show-',
								
			]
		);
		
		$this->add_control(
			'cat_image_hover_black',
			[
				'label' 		=> __( 'Overlay Effect', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
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
			'align',
			[
				'label' => __( 'Alignment', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::CHOOSE,
				'options' => [
					'left' => [
						'title' => __( 'Left', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-align-right',
					],
					'justify' => [
						'title' => __( 'Justified', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-align-justify',
					],
				],
				'default' => '',
				'selectors' => [
					'{{WRAPPER}}' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'view',
			[
				'label' => __( 'View', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HIDDEN,
				'default' => 'traditional',
			]
		);
				
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_title_style',
			[
				'label' => __( 'Title', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_title',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'title_typography',				
				'selector' => '{{WRAPPER}} .product_title, .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title',
			]
		);
				
		$this->start_controls_tabs( 'tabs_title_style' );

		$this->start_controls_tab(
			'tab_title_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'title_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product_title, .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_control(
			'title_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product_title, .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title' => 'background: {{VALUE}};',
				],
				
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_title_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'title_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product_title:hover,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'title_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product_title:hover,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title:hover' => 'background-color: {{VALUE}};',
				],
				
			]
		);

			
		$this->add_control(
			'title_hover_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .product_title:hover,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title:hover' => 'border-color: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'title_hover_animation',
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
				'name' => 'title_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .product_title, .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'title_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product_title,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
				
		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name' => 'title_text_shadow',
				'selector' => '{{WRAPPER}} .product_title,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title',
			]
		);
		
		$this->add_responsive_control(
			'title_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product_title,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'title_margin',
			[
				'label' => __( 'Text Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product_title,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->add_responsive_control(	
			'title_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .product_title,  .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .product_title.woocommerce-loop-product__title' => ' height: {{SIZE}}{{UNIT}};',					
				],				
			]
		);
		

		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_price_style',
			[
				'label' => __( 'Price', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_price',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'price_typography',				
				'selector' => '{{WRAPPER}} .bew-price-grid .price, {{WRAPPER}} .bew-price-grid .price ins, .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .bew-price-grid .price',
			]
		);
		
		$this->add_control(
			'price_color',
			[
				'label' => __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,				
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price .amount, {{WRAPPER}} .bew-price-grid .price, .elementor-widget-wc-archive-products.elementor-wc-products ul.products li.product {{WRAPPER}} .bew-price-grid .price .amount' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'price_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-price-grid .price' => 'background: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'heading_price_regular',
			[
				'label' => __( 'Regular Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'product_price_regular' => 'yes',
                ]
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'price_regular_typography',				
				'selector' => '{{WRAPPER}} .bew-price-grid .price del .amount',
				'condition' => [
                    'product_price_regular' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'price_regular_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-price-grid .price del .amount' => 'color: {{VALUE}};',
				],
				'condition' => [
                    'product_price_regular' => 'yes',
                ]
				
			]
		);
				
		$this->add_control(
			'price_regular_opacity',
			[
				'label' => __( 'Opacity', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 1,
						'min' => 0.10,
						'step' => 0.01,
					],
				],
				'default' => [
					'size' => 0.5,
				],
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .product-on-sale.show-price-regular .price del' => 'opacity: {{SIZE}};',
				],
				'condition' => [
                    'product_price_regular' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'price_regular_linethrough',
			[
				'label' 		=> __( 'Line through', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'line-through-',
				'condition' => [
                    'product_price_regular' => 'yes',
                ]				
			]
		);
		
		$this->add_control(
			'price_regular_linethrough_color',
			[
				'label' 		=> __( 'Line Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}}.line-through-yes .bew-price-grid .product-on-sale.show-price-regular .price del' => 'color: {{VALUE}};',
				],
				'condition' => [
					'product_price_regular' => 'yes',
                    'price_regular_linethrough' => 'yes',
					
                ]
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'price_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .bew-price-grid .price',
				'separator' => 'before',				
			]
		);
		
		$this->add_control(
			'price_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'price_box_shadow',
				'selector' => '{{WRAPPER}} .bew-price-grid .price',
			]
		);
		
		$this->add_responsive_control(
			'price_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'price_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		
		
		$this->add_control(
			'heading_price_dimension',
			[
				'label' => __( 'Dimensions', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
				
			]
		);		
		
		$this->add_responsive_control(
			'price_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'width: {{VALUE}}px;',						
				],					
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_responsive_control(
			'price_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'height: {{VALUE}}px; line-height: {{VALUE}}px;',
				],
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_control(
			'heading_price_position',
			[
				'label' => __( 'Position', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
				
			]
		);
		
		$this->add_responsive_control(
			'price_position_top',
			[
				'label' => __( 'Top', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'top: {{VALUE}}px; bottom:unset;',
				],
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_responsive_control(
			'price_position_bottom',
			[
				'label' => __( 'Bottom', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'bottom: {{VALUE}}px; top:unset;',
				],
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_responsive_control(
			'price_position_left',
			[
				'label' => __( 'Left', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'left: {{VALUE}}px; right:unset;',
				],
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_responsive_control(
			'price_position_right',
			[
				'label' => __( 'Right', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-price-grid .price' => 'right: {{VALUE}}px; left:unset;',
				],
				'condition' => [
                    'product_price_absolute' => 'yes',
                ]
			]
		);
		
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_meta_style',
			[
				'label' => __( 'Meta', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_meta',
                ]
			]
		);
				
		$this->add_control(
			'meta_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product_meta' => 'background: {{VALUE}};',
				],
				
			]
		);		
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'meta_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .product_meta',
				'separator' => 'before',				
			]
		);
		
		$this->add_control(
			'meta_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product_meta' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],				
			]
		);
				
		$this->add_responsive_control(
			'meta_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product_meta' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],					
			]
		);
						
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_meta_titles_style',
			[
				'label' => __( 'Titles', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_meta',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'meta_typography_titles',				
				'selector' => '{{WRAPPER}} .bew-product-meta table.product_meta td.label',
			]
		);
		
		$this->add_control(
			'meta_color_titles',
			[
				'label' => __( 'Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,				
				'selectors' => [
					'{{WRAPPER}} .product_meta .posted_in td.label , {{WRAPPER}} .product_meta .tagged_as td.label , {{WRAPPER}} .product_meta .sku_wrapper td.label, {{WRAPPER}} .product_meta td.label' => 'color: {{VALUE}};',
				], 
			]
		);
		
		$this->add_responsive_control(
			'meta_padding_titles',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-product-meta table.product_meta td.label' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_meta_content_style',
			[
				'label' => __( 'Content', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_meta',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'meta_typography_content',				
				'selector' => '{{WRAPPER}} .bew-product-meta table.product_meta td.value',
			]
		);
		
		$this->start_controls_tabs( 'tabs_meta_style' );
		
		$this->start_controls_tab(
			'tab_meta_content_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'meta_color',
			[
				'label' 		=> __( 'Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product_meta .posted_in a , {{WRAPPER}} .product_meta .tagged_as a,{{WRAPPER}} .product_meta .sku_wrapper .sku, {{WRAPPER}} .product_meta tr a' => 'color: {{VALUE}};',
				],
			] 
		);
		
		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_meta_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'meta_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product_meta .posted_in a:hover , {{WRAPPER}} .product_meta .tagged_as a:hover, {{WRAPPER}} .product_meta tr a:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->end_controls_tab();

		$this->end_controls_tabs();
		
		
		$this->add_responsive_control(
			'meta_padding_content',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-product-meta table.product_meta td.value' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
				
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_rating_style',
			[
				'label' => __( 'Rating', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_rating',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'rating_typography',				
				'selector' => '{{WRAPPER}} .bew-rating .woocommerce-product-rating, {{WRAPPER}} .bew-rating .woocommerce-product-rating .star-rating',
			]
		);
		
		$this->start_controls_tabs( 'tabs_rating_style' );
		
		$this->start_controls_tab(
			'tab_rating_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'rating_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-rating .woocommerce-product-rating a' => 'color: {{VALUE}};',
				],
			] 
		);
		
		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_rating_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'rating_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-rating .woocommerce-product-rating a:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->end_controls_tab();

		$this->end_controls_tabs();
		
		$this->add_control(
			'rating_color_star',
			[
				'label' => __( 'Stars Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,				
				'selectors' => [
					'{{WRAPPER}} .bew-rating .woocommerce-product-rating .star-rating span, {{WRAPPER}} .bew-rating .woocommerce-product-rating .star-rating  span::before' => 'color: {{VALUE}};',
				], 
			]
		);		
		
		$this->add_control(
			'rating_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-rating .woocommerce-product-rating' => 'background: {{VALUE}};',
				],
				
			]
		);		
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'rating_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .bew-rating .woocommerce-product-rating',
				'separator' => 'before',				
			]
		);
		
		$this->add_control(
			'rating_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-rating .woocommerce-product-rating' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],				
			]
		);
		
		$this->add_responsive_control(
			'rating_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-rating .woocommerce-product-rating' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',	
			]
		);
		
		$this->add_responsive_control(
			'rating_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-rating .woocommerce-product-rating' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],					
			]
		);
						
		$this->end_controls_section();		
		
		$this->start_controls_section(
			'section_cart_style',
			[
				'label' => __( 'Add to cart', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'button_typo',
				'selector' 		=> '{{WRAPPER}} #bew-cart .button,{{WRAPPER}} #bew-cart .button i, {{WRAPPER}} #bew-cart .added_to_cart',
			]
		);
		
		$this->start_controls_tabs( 'tabs_button_style' );

		$this->start_controls_tab(
			'tab_button_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'button_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart .button, {{WRAPPER}} #bew-cart .added_to_cart' => 'color: {{VALUE}};',
					'{{WRAPPER}} .btn-underlines svg path' => 'fill: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'button_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart .button, {{WRAPPER}} #bew-cart .added_to_cart' => 'background: {{VALUE}};',
				],
				
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'button_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart .button:hover,{{WRAPPER}} #bew-cart .added_to_cart:hover' => 'color: {{VALUE}};',
					'{{WRAPPER}} .btn-underlines:hover svg path' => 'fill: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'button_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart .button:hover, {{WRAPPER}} #bew-cart .added_to_cart:hover' => 'background-color: {{VALUE}};',
				],
				
			]
		);

			
		$this->add_control(
			'button_hover_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart .button:hover, {{WRAPPER}} #bew-cart .added_to_cart:hover' => 'border-color: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'button_hover_animation',
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
				'name' => 'border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} #bew-cart .button, {{WRAPPER}} #bew-cart .added_to_cart',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart .button, {{WRAPPER}} #bew-cart .added_to_cart' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'button_box_shadow',
				'selector' => '{{WRAPPER}} #bew-cart .button, {{WRAPPER}} #bew-cart .added_to_cart',
			]
		);
		
		$this->add_responsive_control(
			'button_width',
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
					'{{WRAPPER}}.elementor-widget-bew_dynamic' => 'width: {{SIZE}}{{UNIT}} !important;',
				],
				'separator' => 'before',
			]
		);
				
		$this->add_responsive_control(
			'button_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart .button, {{WRAPPER}} #bew-cart .added_to_cart' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',	
			]
		);
				
		$this->add_responsive_control(
			'button_margin',
			[
				'label' => __( 'Button Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart .button, {{WRAPPER}} #bew-cart .added_to_cart' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
        $this->end_controls_section();
		
		$this->start_controls_section(
			'section_overlay_style',
			[
				'label' => __( 'Overlay Mode', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_addtocart_hover_buttom' => 'yes',
                ]
			]
		);
						
		$this->add_control(
			'overlay_heading_button',
			[
				'label' => __( 'Add to Cart Button', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,				
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',					
				],
			]
		);
		
		$this->add_responsive_control(
			'overlay_button_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ) . ' (%)',
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
				],
				'size_units' => [ '%' ],
				'range' => [
					'%' => [
						'min' => 1,
						'max' => 100,
					],
				],				
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart, {{WRAPPER}} #bew-cart.bew-add-to-cart .button' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);
							
		$this->add_responsive_control(
			'button_position_top',
			[
				'label' => __( 'Top', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart' => 'top: {{VALUE}}px;',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'button_position_bottom',
			[
				'label' => __( 'Bottom', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart' => 'bottom: {{VALUE}}px;',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'button_position_left',
			[
				'label' => __( 'Left', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart' => 'left: {{VALUE}}px;',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'button_position_right',
			[
				'label' => __( 'Right', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart' => 'right: {{VALUE}}px;',
				],
				
			]
		);
		
		$this->add_control(
			'button_absolute_hover_animation',
			[
				'label' => __( 'Hover Animation', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SELECT,
			'options' => [
				'' => __( 'None', 'briefcase-elementor-widgets' ),
				'fade-in' => __( 'Fade In', 'briefcase-elementor-widgets' ),
				'fade-up' => __( 'Fade Up', 'briefcase-elementor-widgets' ),				
			],
			'prefix_class' => 'hover-animation-',
			]
		);
				
		$this->add_responsive_control(	
			'overlay_height',
			[
				'label' => __( 'Dimensions', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.hover-buttom.btn-square .button' => ' width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}}; line-height: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} #bew-cart.hover-buttom.btn-circle .button' => ' width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}}; line-height: {{SIZE}}{{UNIT}};',
				],
				'condition' => [					
					'overlay_button' => [ 'square', 'circle'],
				],
			]
		);
		
		$this->add_control(
			'overlay_heading_button_view_cart',
			[
				'label' => __( 'View Cart Button', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,				
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',						
				],
				'separator' => 'before',
			]
		);
		
		$this->add_responsive_control(	
			'overlay_height_view_cart',
			[
				'label' => __( 'Dimensions', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.hover-buttom .added_to_cart' => ' width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',					
				],				
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'overlay_view_cart_button_typo',
				'selector' 		=> '{{WRAPPER}} #bew-cart.hover-buttom .added_to_cart'
			]
		);
		
		$this->add_responsive_control(
			'overlay_view_cart_button_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.hover-buttom .added_to_cart' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'overlay_view_cart_button_margin',
			[
				'label' => __( 'Button Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.hover-buttom .added_to_cart' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
				
		
		$this->start_controls_section(
			'section_qty_style',
			[
				'label' => __( 'Quantity Box', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],
					
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'qty_typo',
				'selector' 		=> '{{WRAPPER}} #bew-cart.show-qty .quantity .qty,{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus',
			]
		);
		
		$this->start_controls_tabs( 'tabs_qty_style' );

		$this->start_controls_tab(
			'tab_qty_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'qty_color',
			[
				'label' 		=> __( 'Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty,{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'qty_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty,{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus' => 'background: {{VALUE}};',
				],
				
			]
		);
				
		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_qty_hover',
			[
				'label' => __( 'Hover', 'elementor' ),
			]
		);
		
		$this->add_control(
			'qty_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty:hover,{{WRAPPER}} #bew-cart.show-qty .quantity .minus:hover , {{WRAPPER}} #bew-cart.show-qty .quantity .plus:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'qty_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty:hover,{{WRAPPER}} #bew-cart.show-qty .quantity .minus:hover , {{WRAPPER}} #bew-cart.show-qty .quantity .plus:hover' => 'background-color: {{VALUE}};' ,
					
				],
				
			]
		);

			
		$this->add_control(
			'qty_hover_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty:hover,{{WRAPPER}} #bew-cart.show-qty .quantity .minus:hover , {{WRAPPER}} #bew-cart.show-qty .quantity .plus:hover' => 'border-color: {{VALUE}};' ,					
				],
				
			]
		);
		
		$this->add_control(
			'qty_hover_animation',
			[
				'label' => __( 'Animation', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
		
		$this->add_responsive_control(
			'qty_size_width',
			[
				'label' => __( 'Quantity Box Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 6,
						'max' => 300,
					],
				],				
				'size_units' => [ 'px'],	
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .qty' => 'width: {{SIZE}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'qty_size_height',
			[
				'label' => __( 'Quantity Box Height', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 6,
						'max' => 300,
					],
				],				
				'size_units' => [ 'px'],	
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .qty' => 'height: {{SIZE}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'control_qty_width',
			[
				'label' => __( '(-/+) Box Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 6,
						'max' => 300,
					],
				],				
				'size_units' => [ 'px'],	
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .minus , {{WRAPPER}} .product-by-id.show-qty #bew-qty .quantity .plus' => 'width: {{SIZE}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'control_qty_height',
			[
				'label' => __( '(-/+) Box Height', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 6,
						'max' => 300,
					],
				],				
				'size_units' => [ 'px'],	
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .minus , {{WRAPPER}} .product-by-id.show-qty #bew-qty .quantity .plus' => 'height: {{SIZE}}{{UNIT}}; line-height:{{SIZE}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'qty_separation',
			[
				'label' => __( 'Quantity Box Separation', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],				
				'size_units' => [ 'px'],	
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .qty' => 'margin-left: {{SIZE}}{{UNIT}} !important ; margin-right: {{SIZE}}{{UNIT}} !important;',
				],
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'qty_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} #bew-cart.show-qty .quantity .qty,{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .qty,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .minus , {{WRAPPER}} .product-by-id.show-qty #bew-qty .quantity .plus',
				'separator' => 'before',
				
			]
		);
		
		$this->add_responsive_control(
		'border_width_minus',
			[
			'label' => __( 'Border Width Minus Box', 'briefcase-elementor-widgets' ),
			'type' => Controls_Manager::DIMENSIONS,
			'selectors' => [
				'{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} .product-by-id.show-qty #bew-qty .quantity .minus ' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
			],
			'condition' => [
					'qty_border_border!' => '',
			],
		]
		);
		
		$this->add_responsive_control(
		'border_width_plus',
			[
			'label' => __( 'Border Width Plus Box', 'briefcase-elementor-widgets' ),
			'type' => Controls_Manager::DIMENSIONS,
			'selectors' => [
				'{{WRAPPER}} #bew-cart.show-qty .quantity .plus , {{WRAPPER}} .product-by-id.show-qty #bew-qty .quantity .plus ' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
			],
			'condition' => [
					'qty_border_border!' => '',
			],
		]
		);
		
		$this->add_control(
			'qty_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty,{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .qty,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .minus , {{WRAPPER}} .product-by-id.show-qty #bew-qty .quantity .plus' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
								
		$this->add_responsive_control(
			'qty_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity .qty,{{WRAPPER}} #bew-cart.show-qty .quantity .minus , {{WRAPPER}} #bew-cart.show-qty .quantity .plus ,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .qty,{{WRAPPER}} .product-by-id.show-qty #bew-qty  .quantity .minus , {{WRAPPER}} .product-by-id.show-qty #bew-qty .quantity .plus' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',	
			]
		);
		
		$this->add_responsive_control(
			'qty_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.show-qty .quantity, {{WRAPPER}} .product-by-id.show-qty #bew-qty' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],					
			]
		);
		
		$this->add_control(
			'qty_text',
			[
				'label' => __( 'Quantity Text', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,				
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',						
				],
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'qty_text_typo',
				'selector' 		=> '{{WRAPPER}} .bew-qty-text',
			]
		);
		
		$this->add_responsive_control(
			'qty_text__color',
			[
				'label' 		=> __( 'Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-qty-text' => 'color: {{VALUE}};' ,
					
				],
				
			]
		);
		
		$this->add_responsive_control(
			'qty_text_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-qty-text' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],					
			]
		);
		


        $this->end_controls_section();
		
		
		$this->start_controls_section(
			'section_avm_style',
			[
				'label' => __( 'Always Visible Mode', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_single'],
                ]
			]
		);
						
		$this->add_control(
			'avm_heading_bar',
			[
				'label' => __( 'Top Bar', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,				
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',
				],
			]
		);
		
		$this->add_responsive_control(	
			'avm_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 300,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .productadd' => 'height: {{SIZE}}{{UNIT}}',
				],
			]
		);
		
		$this->add_responsive_control(
			'avm_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .productadd' => 'background-color: {{VALUE}};' ,
					
				],
				
			]
		);
		
		$this->add_responsive_control(
			'avm_bar_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .productadd' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->add_control(
			'avm_heading_title',
			[
				'label' => __( 'Title', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'avm_title_typo',
				'selector' 		=> '{{WRAPPER}} .product-title h2, {{WRAPPER}} .product-title p',
			]
		);
		
		$this->add_responsive_control(
			'avm_title_color',
			[
				'label' 		=> __( 'Title Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .productadd, {{WRAPPER}} .product-title h2, {{WRAPPER}} .product-title p' => 'color: {{VALUE}};',
				],
			]
		);
				
		$this->add_control(
			'avm_heading_price',
			[
				'label' => __( 'Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'avm_price_typo',
				'selector' 		=> '{{WRAPPER}} .product-buttom p',
			]
		);
		
		$this->add_responsive_control(
			'avm_price_color',
			[
				'label' 		=> __( 'Price Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .always-visible .amount' => 'color: {{VALUE}};',
				],
			]
		);		
		
		$this->add_control(
			'avm_heading_buttom',
			[
				'label' => __( 'Add to Cart Buttom', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
					'dynamic_field_value' => 'product_add_to_cart',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'avm_button_typo',
				'selector' 		=> '{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart',
			]
		);
		
		$this->start_controls_tabs( 'avm_tabs_button_style' );

		$this->start_controls_tab(
			'avm_tab_button_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_responsive_control(
			'avm_button_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_responsive_control(
			'avm_button_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart' => 'background: {{VALUE}};',
				],
				
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'avm_tab_button_hover',
			[
				'label' => __( 'Hover', 'elementor' ),
			]
		);
		
		$this->add_responsive_control(
			'avm_button_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .always-visible button.button:hover,{{WRAPPER}} .always-visible #bew-cart-avm .button:hover, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_responsive_control(
			'avm_button_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,				
				'selectors' 	=> [
					'{{WRAPPER}} .always-visible button.button:hover,{{WRAPPER}} .always-visible #bew-cart-avm .button:hover, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart:hover' => 'background-color: {{VALUE}};',
				],
				
			]
		);

			
		$this->add_responsive_control(
			'avm_button_hover_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'avm_button_border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .always-visible button.button:hover,{{WRAPPER}} .always-visible #bew-cart-avm .button:hover, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart:hover' => 'border-color: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'avm_hover_animation',
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
				'name' => 'avm_button_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart',
				'separator' => 'before',
				
			]
		);
				
		$this->add_responsive_control(
			'avm_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'avm_button_box_shadow',
				'selector' => '{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart',
			]
		);
				
				
		$this->add_responsive_control(
			'avm_button_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart , .woocommerce div.product {{WRAPPER}} .always-visible form.cart button.button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator' => 'before',	
			]
		);
		
		$this->add_responsive_control(
			'avm_button_margin',
			[
				'label' => __( 'Button Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .always-visible button.button,{{WRAPPER}} .always-visible #bew-cart-avm .button, {{WRAPPER}} .always-visible #bew-cart-avm .added_to_cart' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_view_cart_style',
			[
				'label' => __( 'View Cart Button', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => [ 'product_add_to_cart', 'product_add_to_cart_loop'],
					'product_addtocart_hover_buttom' => '',
                ]
			]
		);
		
		$this->add_responsive_control(	
			'view_cart_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart .added_to_cart' => ' width: {{SIZE}}{{UNIT}};',					
				],				
			]
		);
		
		$this->add_responsive_control(	
			'view_cart_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart .added_to_cart' => ' height: {{SIZE}}{{UNIT}};',					
				],				
			]
		);		

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 			=> 'view_cart_button_typo',
				'selector' 		=> '{{WRAPPER}} #bew-cart.bew-add-to-cart .added_to_cart'
			]
		);
		
		$this->add_responsive_control(
			'view_cart_button_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart .added_to_cart' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'view_cart_button_margin',
			[
				'label' => __( 'Button Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart.bew-add-to-cart .added_to_cart' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
		
		
		$this->start_controls_section(
			'section_divider_style',
			[
				'label' => __( 'Divider', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
                ]
			]
		);
					
		$this->add_control(
			'divider_weight',
			[
				'label' => __( 'Weight', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 10,
					],
				],
				'selectors' => [
					'{{WRAPPER}} form.cart' => 'border-top: {{SIZE}}{{UNIT}} solid ; border-bottom: {{SIZE}}{{UNIT}} solid;',
				],
			]
		);
		
		$this->add_control(
			'divider_color',
			[
				'label' 		=> __( 'Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} form.cart' => 'border-color: {{VALUE}};',
				],
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_message_style',
			[
				'label' => __( 'Message', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',
					'product_add_to_cart_options' => 'product_add_to_cart_single',	
                ]
			]
		);
		
		$this->add_control(
			'message_position',
			[
				'label' => __( 'Position Top', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 500,
					],
				],
				'selectors' => [
					' .woocommerce-message' => 'top: {{SIZE}}{{UNIT}}; position: absolute; z-index: 9;',
				],
			]
		);
		
		$this->add_responsive_control(
			'message_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					' .woocommerce-message' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'message_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					' .woocommerce-message' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->end_controls_section();

		$this->start_controls_section(
			'section_product_variation_style',
			[
				'label' => __( 'Product Variation', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_add_to_cart',					
                ]
			]
		);
		
		$this->add_responsive_control(
            'product_variation_layout',
            [
                'label' => __( 'Layout', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'inline' => [
                        'title' => __( 'Inline', 'briefcase-elementor-widgets' ),
                        'icon' => 'fa fa-arrows-h',
                    ], 
					'stacked' => [
                        'title' => __( 'Stacked', 'briefcase-elementor-widgets' ),
                        'icon' => 'fa fa-arrows-v',
                    ]					                   
                ],
                'default' => 'inline', 
				'devices' => [ 'desktop', 'tablet', 'mobile' ],
				'prefix_class' => 'bew-variation-layout-%s-',		
                
            ]
        );
		
		$this->add_control(
			'product_variation_spacing',
			[
				'label' => __( 'Spacing', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart .variations' => 'margin-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);
		
		$this->add_control(
			'product_variation_space_between',
			[
				'label' => __( 'Space Between', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart table.variations' => 'border-spacing: 0 {{SIZE}}{{UNIT}}; border-collapse: separate;',
				],
			]
		);
		
		$this->add_responsive_control(
			'product_variation_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart table.variations' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'product_variation_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} #bew-cart form.cart table.variations',							
			]
		);
		
		$this->add_control(
			'heading_product_variation_label',
			[
				'label' => __( 'Label', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);
		
		$this->add_control(
			'product_variation_label_show',
			[
				'label' 		=> __( 'Hide Labels', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'On', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Off', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',
				'prefix_class' => 'bew-hide-variation-label-',
			]
		);
		
		$this->add_control(
			'product_variation_label_color',
			[
				'label' => __( 'Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart table.variations label' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'product_variation_label_typography',
				'selector' => '{{WRAPPER}} #bew-cart form.cart table.variations label',
			]
		);		
				
		$this->add_responsive_control(
			'product_variation_label_width',
			[
				'label' => __( 'Label Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
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
					'{{WRAPPER}} #bew-cart form.cart .variations td.label, .woo-variation-swatches.wvs-show-label {{WRAPPER}} #bew-cart .variations td' => 'width: {{SIZE}}{{UNIT}}; !important',
				],
			]
		);
		
		$this->add_responsive_control(
			'product_variation_label_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart .variations td.label,  {{WRAPPER}} #bew-cart form.cart .variations td.value .theme-select' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
				
		
		$this->add_control(
			'heading_product_variation_drop_down',
			[
				'label' => __( 'Select Fields', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);
		
		$this->add_control(
			'product_variation_drop_down_color',
			[
				'label' => __( 'Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart table.variations td.value select, {{WRAPPER}} #bew-cart form.cart table.variations td.value .theme-select' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'product_variation_drop_down_bg_color',
			[
				'label' => __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart table.variations td.value:before , {{WRAPPER}} #bew-cart form.cart table.variations td.value select ,{{WRAPPER}} #bew-cart form.cart table.variations td.value .theme-select' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'product_variation_drop_down_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart table.variations td.value:before, {{WRAPPER}} #bew-cart form.cart table.variations td.value select ,{{WRAPPER}} #bew-cart form.cart table.variations td.value .theme-select' => 'border: 1px solid {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'product_variation_drop_down_typography',
				'selector' => '{{WRAPPER}} #bew-cart form.cart table.variations td.value select, {{WRAPPER}} #bew-cart form.cart table.variations td.value:before, {{WRAPPER}} #bew-cart form.cart table.variations td.value .theme-select',
			]
		);

		$this->add_control(
			'product_variation_drop_down_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart table.variations td.value:before, {{WRAPPER}} #bew-cart form.cart table.variations td.value select, {{WRAPPER}} #bew-cart form.cart table.variations td.value .theme-select' => 'border-radius: {{SIZE}}{{UNIT}}',
				],
			]
		);
						
		$this->add_responsive_control(
			'product_variation_drop_down_width',
			[
				'label' => __( 'Select Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
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
					'{{WRAPPER}} #bew-cart form.cart .variations td.value select,  {{WRAPPER}} #bew-cart form.cart .variations td.value .theme-select' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);
				
		$this->add_responsive_control(
			'product_variation_drop_down_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart .variations td.value select,  {{WRAPPER}} #bew-cart form.cart .variations td.value .theme-select' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
				
		$this->add_responsive_control(
            'product_variation_drop_down_reset',
            [
                'label' => __( 'Clear Button', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'stacked' => [
                        'title' => __( 'Stacked', 'briefcase-elementor-widgets' ),
                        'icon' => 'fa fa-arrows-v',
                    ],
					'inline' => [
                        'title' => __( 'Inline', 'briefcase-elementor-widgets' ),
                        'icon' => 'fa fa-arrows-h',
                    ]                    
                ],
                'default' => 'stacked',
				'devices' => [ 'desktop', 'tablet', 'mobile' ],
				'prefix_class' => 'bew-variation-reset-%s-',
                
            ]
        );
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'product_variation_drop_down_reset_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} #bew-cart form.cart .variations .reset_variations',							
			]
		);
		
		
		
		$this->add_control(
			'heading_product_variation_description',
			[
				'label' => __( 'Description', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'product_variation_description_typography',
				'selector' => '{{WRAPPER}} #bew-cart form.cart .single_variation_wrap .woocommerce-variation-description',
			]
		);
		
		$this->add_control(
			'product_variation_description_color',
			[
				'label' => __( 'Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart .single_variation_wrap .woocommerce-variation-description' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_responsive_control(
			'product_variation_description_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart form.cart .single_variation_wrap .woocommerce-variation-description' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);	
				
		$this->add_control(
			'heading_product_variation_price',
			[
				'label' => __( 'Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'price_variation_typography',				
				'selector' => '{{WRAPPER}} #bew-cart .woocommerce-variation-price .price',
			]
		);
		
		$this->add_control(
			'price_variation_color',
			[
				'label' => __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,				
				'selectors' => [
					'{{WRAPPER}} #bew-cart .woocommerce-variation-price .price .amount, {{WRAPPER}} #bew-cart .woocommerce-variation-price .price' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'price_variation_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} #bew-cart .woocommerce-variation-price .price' => 'background: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'price_variation_text',
			[
				'label' => __( 'Text Before Price', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( '', 'briefcase-elementor-widgets' ),
				'placeholder' => __( 'Total Price', 'briefcase-elementor-widgets' ),				
			]
		);
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'price_variation_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} #bew-cart .woocommerce-variation-price .price',							
			]
		);
		
		$this->add_control(
			'price_variation_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart .woocommerce-variation-price .price' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'price_variation_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart .woocommerce-variation-price .price' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'price_variation_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} #bew-cart .woocommerce-variation-price' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_style_image',
			[
				'label' => __( 'Image', 'briefcase-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_image',
                ]
			]
		);
		
		$this->add_responsive_control(
			'width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
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
					'{{WRAPPER}} .bew-product-image img' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'space',
			[
				'label' => __( 'Max Width', 'briefcase-elementor-widgets' ) . ' (%)',
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
				],
				'size_units' => [ '%' ],
				'range' => [
					'%' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-product-image img' => 'max-width: {{SIZE}}{{UNIT}};',
				],
			]
		);
		
		$this->add_control(
			'image_equal_heights',
			[
				'label' 		=> __( 'Equal Heights', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> '',
				'label_on' 		=> __( 'Show', 'briefcase-elementor-widgets' ),
				'label_off' 	=> __( 'Hide', 'briefcase-elementor-widgets' ),
				'return_value' 	=> 'yes',			
			]
		);
		
		$this->add_responsive_control(
			'image_height',
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
				'size_units' => [ 'px', '%', 'vw' ],
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
					'{{WRAPPER}} .bew-product-image .woo-entry-image' => 'height: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
                    'image_equal_heights' => 'yes',
                ]
			]
		);
		
		
		$this->start_controls_tabs( 'image_effects' );

		$this->start_controls_tab( 'normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'css_filters',
				'selector' => '{{WRAPPER}} .bew-product-image img',
			]
		);

		$this->add_control(
			'opacity',
			[
				'label' => __( 'Opacity', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 1,
						'min' => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-product-image img' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab( 'hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'css_filters_hover',
				'selector' => '{{WRAPPER}} .bew-product-image:hover img',
			]
		);

		$this->add_control(
			'opacity_hover',
			[
				'label' => __( 'Opacity', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 1,
						'min' => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-product-image:hover img' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_control(
			'background_hover_transition',
			[
				'label' => __( 'Transition Duration', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0.3,
				],
				'range' => [
					'px' => [
						'max' => 3,
						'step' => 0.1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-product-image img' => 'transition-duration: {{SIZE}}s',
				],
			]
		);

		$this->add_control(
			'image_hover_animation',
			[
				'label' => __( 'Hover Animation', 'elementor' ),
				'type' => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'image_border',
				'label' => __( 'Image Border', 'briefcase-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .bew-product-image img',
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'image_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-product-image img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'image_box_shadow',
				'exclude' => [
					'box_shadow_position',
				],
				'selector' => '{{WRAPPER}} .bew-product-image img',
			]
		);
		
		$this->add_responsive_control(
			'img_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-product-image img' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'img_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-product-image img' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);

		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_image_labels_style',
			[
				'label' => __( 'Labels', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_image',
				]	
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'image_labels_typography',				
				'selector' => '{{WRAPPER}} .product-image .bew-product-badges span, {{WRAPPER}} .product-image .bew-product-badges span.onsale, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span.onsale',
			]
		);
		
		$this->add_control(
			'image_labels_color',
			[
				'label' 		=> __( 'Labels Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product-image .bew-product-badges span, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'image_label_new_color',
			[
				'label' 		=> __( 'New Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product-image .bew-product-badges span.new, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span.new' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'image_label_featured_color',
			[
				'label' 		=> __( 'Featured Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product-image .bew-product-badges span.hot, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span.hot' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'image_label_outofstock_color',
			[
				'label' 		=> __( 'Out of Stock Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product-image .bew-product-badges span.outofstock, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span.outofstock' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'image_label_sale_color',
			[
				'label' 		=> __( 'Sale Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .product-image .bew-product-badges span.onsale, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span.onsale' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'image_label_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .product-image .bew-product-badges span, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'image_label_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges span, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_control(
			'heading_image_label_title_position',
			[
				'label' => __( 'Position', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);
		
		$this->add_responsive_control(
			'image_label_position_top',
			[
				'label' => __( 'Top', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges' => 'top: {{VALUE}}px; bottom:unset;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'image_label_position_bottom',
			[
				'label' => __( 'Bottom', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges' => 'bottom: {{VALUE}}px; top:unset;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'image_label_position_left',
			[
				'label' => __( 'Left', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges' => 'left: {{VALUE}}px; right:unset;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'image_label_position_right',
			[
				'label' => __( 'Right', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges' => 'right: {{VALUE}}px; left:unset;',
				],				
			]
		);
				
		$this->add_responsive_control(
			'image_label_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,
				'separator' => 'before',
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges span, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span' => 'width: {{VALUE}}px;',						
				],
			]
		);
		
		$this->add_responsive_control(
			'image_label_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges span, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span' => 'height: {{VALUE}}px; line-height: {{VALUE}}px;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'image_label_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges span, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'image_label_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .product-image .bew-product-badges span, .woocommerce ul.products li.product {{WRAPPER}} .product-image .bew-product-badges span' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_gallery_style',
			[
				'label' => __( 'Gallery', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_gallery',
                ]
			]
		);
		
		$this->add_control(
            'heading_gallery_image',
            [
                'label' => __( 'Image', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::HEADING,
                
            ]
        );
				
		$this->add_responsive_control(
			'gallery_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
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
					'{{WRAPPER}} .bew-gallery-images .images, .woocommerce div.product {{WRAPPER}} .bew-gallery-images div.images, .woocommerce #content div.product {{WRAPPER}} .bew-gallery-images div.images' => 'width: {{SIZE}}{{UNIT}} !important;',
				],
			]
		);
		
		

		$this->add_responsive_control(
			'gallery_space',
			[
				'label' => __( 'Max Width', 'briefcase-elementor-widgets' ) . ' (%)',
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
				],
				'size_units' => [ '%' ],
				'range' => [
					'%' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .images, .woocommerce div.product {{WRAPPER}} .bew-gallery-images div.images, .woocommerce #content div.product {{WRAPPER}} .bew-gallery-images div.images' => 'max-width: {{SIZE}}{{UNIT}} !important;',
				],
			]
		);
		
		$this->start_controls_tabs( 'gallery_effects' );

		$this->start_controls_tab( 'gallery_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'gallery_css_filters',
				'selector' => '{{WRAPPER}} .bew-gallery-images .images',
			]
		);

		$this->add_control(
			'gallery_opacity',
			[
				'label' => __( 'Opacity', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 1,
						'min' => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .images' => 'opacity: {{SIZE}} !important;',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab( 'gallery_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'gallery_css_filters_hover',
				'selector' => '{{WRAPPER}} .bew-gallery-images .images:hover',
			]
		);

		$this->add_control(
			'gallery_opacity_hover',
			[
				'label' => __( 'Opacity', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 1,
						'min' => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .images:hover' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_control(
			'gallery_background_hover_transition',
			[
				'label' => __( 'Transition Duration', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0.3,
				],
				'range' => [
					'px' => [
						'max' => 3,
						'step' => 0.1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .images:hover' => 'transition-duration: {{SIZE}}s',
				],
			]
		);

		$this->add_control(
			'gallery_hover_animation',
			[
				'label' => __( 'Hover Animation', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'gallery_border',
				'label' => __( 'Image Border', 'briefcase-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .bew-gallery-images .images .woocommerce-product-gallery__wrapper .woocommerce-product-gallery__image',
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'gallery_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .images .woocommerce-product-gallery__wrapper .woocommerce-product-gallery__image' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'gallery_box_shadow',
				'exclude' => [
					'box_shadow_position',
				],
				'selector' => '{{WRAPPER}} .bew-gallery-images .images .woocommerce-product-gallery__wrapper .woocommerce-product-gallery__image',
			]
		);
				
		$this->add_control(
			'gallery_arrows_color',
			[
				'label' 		=> __( 'Arrows Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images button.slick-arrow' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
            'gallery_arrows_size',
            [
                'label' => __( 'Arrows Size', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 30,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-gallery-images button.slick-arrow' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};', 
					'{{WRAPPER}} .bew-gallery-images button.slick-arrow:before' => 'font-size: {{SIZE}}{{UNIT}};',
				],
            ]
        );
		
		
		$this->add_control(
			'gallery_dots_color',
			[
				'label' 		=> __( 'Dot Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .slick-dots li button' => 'background-color: {{VALUE}} !important;',
				],
			]
		);
		
		$this->add_control(
            'gallery_dots_size',
            [
                'label' => __( 'Dots Size', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 6,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-gallery-images .slick-dots li button' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );
		
		$this->add_control(
			'gallery_dots_color_active',
			[
				'label' 		=> __( 'Dots Active Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .slick-dots li.slick-active button' => 'background-color: {{VALUE}} !important;',
				],
			]
		);		
		
		$this->add_control(
            'gallery_dots_size_active',
            [
                'label' => __( 'Dot Size', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 14,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-gallery-images .slick-dots li.slick-active button' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );
		
		$this->add_control(
			'gallery_zoom_color',
			[
				'label' 		=> __( 'Zoom Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .lightbox-btn' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'gallery_zoom_color_hover',
			[
				'label' 		=> __( 'Zoom Hover Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .lightbox-btn:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_responsive_control(
			'gallery_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .images .woocommerce-product-gallery__wrapper' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'gallery_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .images .woocommerce-product-gallery__wrapper' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->add_control(
            'heading_gallery_thumbnails',
            [
                'label' => __( 'Thumbnails', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );
		
		$this->add_responsive_control(
            'gallery_thumbnails_width',
            [
                'label' => __( 'Thumbnails Width', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 120,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 200,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-gallery-images .thumbnails-slider .slick-slide, .woocommerce #content div.product{{WRAPPER}} .bew-gallery-images div.thumbnails a, 
					.woocommerce div.product{{WRAPPER}} .bew-gallery-images div.thumbnails a, .woocommerce-page #content div.product{{WRAPPER}} .bew-gallery-images div.thumbnails a, 
					.woocommerce-page div.product{{WRAPPER}} .bew-gallery-images div.thumbnails a' => 'width: {{SIZE}}{{UNIT}} !important;',
                ],
            ]
        );
				
		$this->add_control(
			'gallery_th_arrows_color',
			[
				'label' 		=> __( 'Arrows Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .thumbnails-slider.slick-slider .slick-arrow' => 'color: {{VALUE}};',
				],
			]
		);			
		
		$this->add_control(
            'gallery_th_arrows_size',
            [
                'label' => __( 'Arrows Size', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 20,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],
                'selectors' => [                   
					'{{WRAPPER}} .bew-gallery-images .thumbnails-slider.slick-slider .slick-arrow' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};', 
					'{{WRAPPER}} .bew-gallery-images .thumbnails-slider.slick-slider .slick-arrow:before' => 'font-size: {{SIZE}}{{UNIT}};',
                ],
            ]
        );
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'thumbnail_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .bew-gallery-images .thumbnails-slider .slick-slide.slick-current img',
				
			]
		);
				
		$this->add_control(
			'thumbnails_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .thumbnails-slider .slick-slide img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'thumbnails_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .thumbnails-slider .slick-slide' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'thumbnails_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .thumbnails-slider .slick-slide' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
		
		
		$this->start_controls_section(
			'section_labels_style',
			[
				'label' => __( 'Labels', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_gallery',
				]	
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'gallery_labels_typography',				
				'selector' => '{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span',
			]
		);
		
		$this->add_control(
			'gallery_labels_color',
			[
				'label' 		=> __( 'Labels Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'gallery_label_new_color',
			[
				'label' 		=> __( 'New Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span.new' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'gallery_label_featured_color',
			[
				'label' 		=> __( 'Featured Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span.hot' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'gallery_label_outofstock_color',
			[
				'label' 		=> __( 'Out of Stock Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span.outofstock' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'gallery_label_sale_color',
			[
				'label' 		=> __( 'Sale Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span.onsale' => 'background: {{VALUE}};',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'gallery_label_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'gallery_label_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_control(
			'heading_gallery_label_title_position',
			[
				'label' => __( 'Position', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);
		
		$this->add_responsive_control(
			'gallery_label_position_top',
			[
				'label' => __( 'Top', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges' => 'top: {{VALUE}}px; bottom:unset;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'gallery_label_position_bottom',
			[
				'label' => __( 'Bottom', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges' => 'bottom: {{VALUE}}px; top:unset;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'gallery_label_position_left',
			[
				'label' => __( 'Left', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges' => 'left: {{VALUE}}px; right:unset;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'gallery_label_position_right',
			[
				'label' => __( 'Right', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges' => 'right: {{VALUE}}px; left:unset;',
				],				
			]
		);
				
		$this->add_responsive_control(
			'gallery_label_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,
				'separator' => 'before',
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span' => 'width: {{VALUE}}px;',						
				],
			]
		);
		
		$this->add_responsive_control(
			'gallery_label_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span' => 'height: {{VALUE}}px; line-height: {{VALUE}}px;',
				],				
			]
		);
		
		$this->add_responsive_control(
			'gallery_label_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'gallery_label_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-gallery-images .woocommerce-product-gallery .bew-product-badges span' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
				
		$this->end_controls_section();
		
	
		$this->start_controls_section(
			'section_category_style',
			[
				'label' => __( 'Category', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_category',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'category_typography',				
				'selector' => '{{WRAPPER}} .bew-category .category',
			]
		);
				
		$this->start_controls_tabs( 'tabs_category_style' );

		$this->start_controls_tab(
			'tab_category_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'category_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-category .category a' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'category_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-category .category' => 'background: {{VALUE}};',
				],
				
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_category_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'category_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-category .category a:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'category_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-category .category:hover' => 'background-color: {{VALUE}};',
				],
				
			]
		);
			
		$this->add_control(
			'category_hover_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .bew-category .category:hover' => 'border-color: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'category_hover_animation',
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
				'name' => 'category_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .bew-category .category',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'category_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-category .category' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
				
		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name' => 'category_text_shadow',
				'selector' => '{{WRAPPER}} .bew-category .category',
			]
		);
		
		$this->add_responsive_control(
			'category_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-category .category' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);

		$this->add_responsive_control(
			'category_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-category .category' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);

		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_excerpt_style',
			[
				'label' => __( 'Short Description', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_excerpt',
                ]
			]
		);
		
		$this->add_control(
			'excerpt_color',
			[
				'label' 		=> __( 'Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-excerpt' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'excerpt_typography',				
				'selector' => '{{WRAPPER}} .bew-excerpt',
			]
		);
		
		$this->add_responsive_control(
			'excerpt_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-excerpt' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'excerpt_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-excerpt' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_description_style',
			[
				'label' => __( 'Description', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_description',
                ]
			]
		);
		
		$this->add_control(
			'description_color',
			[
				'label' 		=> __( 'Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-description' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'description_typography',				
				'selector' => '{{WRAPPER}} .bew-description',
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
            'section_tabs_style',
            [
                'label' => __( 'Tabs', 'briefcase-elementor-widgets' ),
                'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'product_tabs',
                ]
            ]
        );

        $this->add_control(
            'navigation_width',
            [
                'label' => __( 'Navigation Width', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'unit' => '%',
                ],
                'range' => [
                    '%' => [
                        'min' => 10,
                        'max' => 50,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}}.bew-woo-tabs-view-vertical .bew-woo-tabs .woocommerce-tabs ul.tabs' => 'width: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}}.bew-woo-tabs-view-vertical .bew-woo-tabs .woocommerce-tabs .panel' => 'width: calc(100% - {{SIZE}}{{UNIT}});',
                ],
                'condition' => [
                    'tab_layout' => 'vertical',
                ],
            ]
        );

        $this->add_responsive_control(
            'tab_padding',
            [
                'label'  => __('Tab Padding','briefcase-elementor-widgets'),
                'type'   => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'tab_border_width',
            [
                'label' => __( 'Border Width', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 1,
                ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 10,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs' => 'border-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'tab_border_color',
            [
                'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::COLOR,
                'scheme' => [
                    'type' => Scheme_Color::get_type(),
                    'value' => Scheme_Color::COLOR_1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'background_color',
            [
                'label' => __( 'Background Color', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs' => 'background-color: {{VALUE}};',                    
                ],
            ]
        );
		
		$this->add_responsive_control(
			'tab_align',
			[
				'label' => __( 'Alignment', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::CHOOSE,
				'options' => [
					'left' => [
						'title' => __( 'Left', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'briefcase-elementor-widgets' ),
						'icon' => 'fa fa-align-right',
					],					
				],
				'default' => '',
				'selectors' => [
					'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs' => 'text-align: {{VALUE}};',
				],
				'condition' => [
                    'tab_layout'    => 'horizontal'
                ]
			]
		);

        $this->add_control(
            'heading_title',
            [
                'label' => __( 'Title', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

     		
		$this->start_controls_tabs( 'tabs_tabs_style' );
		
		$this->start_controls_tab(
			'tab_tabs_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
            'tab_color',
            [
                'label' => __( 'Text Color', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li a' => 'color: {{VALUE}};',
                ],                
            ]
        );
		
		$this->add_control(
			'tab_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li a' => 'background: {{VALUE}};',
				],
				
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_tabs_hover',
			[
				'label' => __( 'Hover', 'elementor' ),
			]
		);
		
		$this->add_control(
			'tabs_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li a:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'tabs_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li a:hover' => 'background-color: {{VALUE}};',
				],
				
			]
		);
		

		$this->end_controls_tab();
		
		$this->start_controls_tab(
			'tab_tabs_active',
			[
				'label' => __( 'Active', 'briefcase-elementor-widgets' ),
			]
		);
		
        $this->add_control(
            'tabs_color_active',
            [
                'label' => __( 'Text Color', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li.active a' => 'color: {{VALUE}}; border-color: {{VALUE}}',					
					'{{WRAPPER}}.bew-woo-tabs-view-vertical .bew-woo-tabs .woocommerce-tabs ul.tabs li a:after' => 'background-color: {{VALUE}}',
                ],                
            ]
        );
				
		$this->add_control(
			'tabs_background_color_active',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li.active a' => 'background-color: {{VALUE}};',
				],
				
			]
		);
				
		$this->add_control(
			'tabs_active_border_type',
			[
				'label' => _x( 'Border Type', 'Border Control', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SELECT,
				'options' => [
					'' => __( 'None', 'briefcase-elementor-widgets' ),
					'solid' => _x( 'Solid', 'Border Control', 'briefcase-elementor-widgets' ),
					'double' => _x( 'Double', 'Border Control', 'briefcase-elementor-widgets' ),
					'dotted' => _x( 'Dotted', 'Border Control', 'briefcase-elementor-widgets' ),
					'dashed' => _x( 'Dashed', 'Border Control', 'briefcase-elementor-widgets' ),
					'groove' => _x( 'Groove', 'Border Control', 'briefcase-elementor-widgets' ),
				],
				'selectors' => [
				'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li.active a' => 'border-style: {{VALUE}};', 
				
				],
			]
		);

		$this->add_control(
			'tabs_active_border_width',
			[
			'label' => _x( 'Width', 'Border Control', 'briefcase-elementor-widgets' ),
			'type' => Controls_Manager::DIMENSIONS,
			'selectors' => [
				'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li.active a' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li a' => 'border-top: {{TOP}}{{UNIT}} solid transparent; border-bottom: {{BOTTOM}}{{UNIT}} solid transparent;',
			],
			'condition' => [
				'tabs_active_border_type!' => '',
			],
			]
		);
		

		$this->add_control(
			'tabs_active_border_color',
			[
			'label' => _x( 'Color', 'Border Control', 'briefcase-elementor-widgets' ),
			'type' => Controls_Manager::COLOR,
			'default' => '',
			'selectors' => [
				'{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li.active a' => 'border-color: {{VALUE}};',
			],
			'condition' => [
				'tabs_active_border_type!' => '',
			],
			]
		);
				
		$this->end_controls_tab();

		$this->end_controls_tabs();

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'tab_typography',
                'selector' => '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs li a',
                'scheme' => Scheme_Typography::TYPOGRAPHY_1,
            ]
        );
		
		$this->add_responsive_control(
            'tab_title_padding',
            [
                'label'  => __('Titles Padding','briefcase-elementor-widgets'),
                'type'   => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs ul.tabs' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

		
        $this->add_control(
            'heading_content',
            [
                'label' => __( 'Content', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'content_color',
            [
                'label' => __( 'Color', 'briefcase-elementor-widgets' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs .panel, {{WRAPPER}} .bew-woo-tabs .woocommerce-tabs .panel h2:first-child' => 'color: {{VALUE}};',
                ],
                'scheme' => [
                    'type' => Scheme_Color::get_type(),
                    'value' => Scheme_Color::COLOR_3,
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name' => 'content_typography',
                'selector' => '{{WRAPPER}} .bew-woo-tabs .woocommerce-tabs .panel, {{WRAPPER}} .bew-woo-tabs .woocommerce-tabs .panel h2:first-child',
                'scheme' => Scheme_Typography::TYPOGRAPHY_3,
            ]
        );

        $this->end_controls_section();
		
		$this->start_controls_section(
			'section_cat_title_style',
			[
				'label' => __( 'Title', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'category_title',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'cat_title_typography',				
				'selector' => '{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title',
			]
		);
				
		$this->start_controls_tabs( 'tabs_cat_title_style' );

		$this->start_controls_tab(
			'tab_cat_title_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'cat_title_color',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title, {{WRAPPER}} .bew-cat-title .woocommerce-category-title' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'cat_title_background_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title' => 'background: {{VALUE}};',
				],
				
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_cat_title_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);
		
		$this->add_control(
			'cat_title_color_hover',
			[
				'label' 		=> __( 'Text Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title:hover,{{WRAPPER}} .bew-cat-title.cat-title-absolute.show-cat-title-overlay .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title:hover' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_control(
			'cat_title_background_color_hover',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title:hover , {{WRAPPER}} .bew-cat-title .woocommerce-category-title:hover' => 'background-color: {{VALUE}};',
				],
				
			]
		);

			
		$this->add_control(
			'cat_title_hover_border_color',
			[
				'label' => __( 'Border Color', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::COLOR,
				'condition' => [
					'border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title:hover , {{WRAPPER}} .bew-cat-title .woocommerce-category-title:hover' => 'border-color: {{VALUE}};',
				],
				
			]
		);
		
		$this->add_control(
			'cat_title_hover_animation',
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
				'name' => 'cat_title_border',
				'label' => __( 'Border', 'briefcase-elementor-widgets' ),
				'placeholder' => '1px',
				'default' => '1px',
				'selector' => '{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title',
				'separator' => 'before',
				
			]
		);
		
		$this->add_control(
			'cat_title_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
				
		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name' => 'cat_title_text_shadow',
				'selector' => '{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title',
			]
		);
		
		$this->add_responsive_control(
			'cat_title_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'cat_title_margin',
			[
				'label' => __( 'Text Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->add_responsive_control(	
			'cat_title_height',
			[
				'label' => __( 'Height', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,				
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title , {{WRAPPER}} .bew-cat-title .woocommerce-category-title' => ' height: {{SIZE}}{{UNIT}};',					
				],				
			]
		);
		
		$this->add_control(
			'heading_cat_title_position',
			[
				'label' => __( 'Position', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => [
                    'cat_title_absolute' => 'yes',
                ]
				
			]
		);
		
		$this->add_responsive_control(
			'cat_title_position_top',
			[
				'label' => __( 'Top', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title.cat-title-absolute' => 'top: {{VALUE}}px;',
				],
				'condition' => [
                    'cat_title_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_responsive_control(
			'cat_title_position_bottom',
			[
				'label' => __( 'Bottom', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title.cat-title-absolute' => 'bottom: {{VALUE}}px;',
				],
				'condition' => [
                    'cat_title_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_responsive_control(
			'cat_title_position_left',
			[
				'label' => __( 'Left', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title.cat-title-absolute' => 'left: {{VALUE}}px;',
				],
				'condition' => [
                    'cat_title_absolute' => 'yes',
                ]
			]
		);
		
		$this->add_responsive_control(
			'cat_title_position_right',
			[
				'label' => __( 'Right', 'briefcase-elementor-widgets' ) . ' (px)',
				'type' => Controls_Manager::NUMBER,				
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title.cat-title-absolute' => 'right: {{VALUE}}px;',
				],
				'condition' => [
                    'cat_title_absolute' => 'yes',
                ]
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_cat_title_count_style',
			[
				'label' => __( 'Count', 'briefcase-elementor-widgets' ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'category_title',
					'cat_title_count' => 'yes',
                ]
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'cat_title_count_typography',				
				'selector' => '{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title .count',
			]
		);
		
		$this->add_control(
			'cat_title_count_color',
			[
				'label' 		=> __( 'Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,
				'selectors' 	=> [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title .count' => 'color: {{VALUE}};',
				],
			]
		);
		
		$this->add_responsive_control(
			'cat_title_count_padding',
			[
				'label' => __( 'Text Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title .count' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'cat_title_count_margin',
			[
				'label' => __( 'Text Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-title .woocommerce-loop-category__title .count' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'section_style_cat_image',
			[
				'label' => __( 'Image', 'briefcase-elementor-widgets' ),
				'tab'   => Controls_Manager::TAB_STYLE,
				'condition' => [
                    'dynamic_field_value' => 'category_image',
                ]
			]
		);
		
		$this->add_responsive_control(
			'cat_width',
			[
				'label' => __( 'Width', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
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
					'{{WRAPPER}} .bew-cat-image img' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'cat_space',
			[
				'label' => __( 'Max Width', 'briefcase-elementor-widgets' ) . ' (%)',
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
				],
				'size_units' => [ '%' ],
				'range' => [
					'%' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-image img' => 'max-width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->start_controls_tabs( 'cat_image_effects' );

		$this->start_controls_tab( 'cat_normal',
			[
				'label' => __( 'Normal', 'briefcase-elementor-widgets' ),
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'cat_css_filters',
				'selector' => '{{WRAPPER}} .bew-cat-image img',
			]
		);

		$this->add_control(
			'cat_opacity',
			[
				'label' => __( 'Opacity', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 1,
						'min' => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-image img' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab( 'cat_hover',
			[
				'label' => __( 'Hover', 'briefcase-elementor-widgets' ),
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'cat_css_filters_hover',
				'selector' => '{{WRAPPER}} .bew-product-image:hover img',
			]
		);

		$this->add_control(
			'cat_opacity_hover',
			[
				'label' => __( 'Opacity', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 1,
						'min' => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-image:hover img' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_control(
			'cat_background_hover_transition',
			[
				'label' => __( 'Transition Duration', 'elementor' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 0.3,
				],
				'range' => [
					'px' => [
						'max' => 3,
						'step' => 0.1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-image img' => 'transition-duration: {{SIZE}}s',
				],
			]
		);

		$this->add_control(
			'cat_image_hover_animation',
			[
				'label' => __( 'Hover Animation', 'elementor' ),
				'type' => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
		
		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'cat_image_border',
				'label' => __( 'Image Border', 'briefcase-elementor-widgets' ),
				'selector' => '{{WRAPPER}} .bew-cat-image img',
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'cat_image_border_radius',
			[
				'label' => __( 'Border Radius', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-image img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name' => 'cat_image_box_shadow',
				'exclude' => [
					'box_shadow_position',
				],
				'selector' => '{{WRAPPER}} .bew-cat-image img',
			]
		);
		
		$this->add_responsive_control(
			'cat_img_padding',
			[
				'label' => __( 'Padding', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-image img' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				
			]
		);
		
		$this->add_responsive_control(
			'cat_img_margin',
			[
				'label' => __( 'Margin', 'briefcase-elementor-widgets' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors' => [
					'{{WRAPPER}} .bew-cat-image img' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
					
			]
		);

		$this->end_controls_section();

	}

	public function get_dynamic_fields($flat = false){

	    $fields = array();
		
		// Woocommerce Product.
		$fields[] = array(
			'code' => 'product_image',
			'name' => 'Product Image',
		);
		
		$fields[] = array(
			'code' => 'product_gallery',
			'name' => 'Product Gallery',
		);
		
		$fields[] = array(
			'code' => 'product_title',
			'name' => 'Product Title',
		);
		
		$fields[] = array(
			'code' => 'product_price',
			'name' => 'Product Price',
		);
		$fields[] = array(
			'code' => 'product_add_to_cart',
			'name' => 'Product Add to cart',
		);
				
		$fields[] = array(
			'code' => 'product_meta',
			'name' => 'Product Meta',
		);
		
		$fields[] = array(
			'code' => 'product_excerpt',
			'name' => 'Product Short Description',
		);
		
		$fields[] = array(
			'code' => 'product_description',
			'name' => 'Product Description',
		);
				
		$fields[] = array(
			'code' => 'product_tabs',
			'name' => 'Product Tabs',
		);
		
		$fields[] = array(
			'code' => 'product_comments',
			'name' => 'Product Reviews',
		);
		
		$fields[] = array(
			'code' => 'product_rating',
			'name' => 'Product Rating',
		);
		
		$fields[] = array(
			'code' => 'product_category',
			'name' => 'Product Category',
		);
				
		// Woocommerce Categories.
		
		$fields[] = array(
			'code' => 'category_title',
			'name' => 'Category Title',
		);
		
		$fields[] = array(
			'code' => 'category_image',
			'name' => 'Category Image',
		);
		
		if($flat) {
		    $all = array();
			foreach ( $fields as $field ) {
				$all[ $field['code'] ] = $field['name'];
			}
			return $all;
		}

	    return $fields;
    }
	
	protected function bew_get_last_product_id(){
		global $wpdb;
		
		// Getting last Product ID (max value)
		$results = $wpdb->get_col( "
			SELECT MAX(ID) FROM {$wpdb->prefix}posts
			WHERE post_type LIKE 'product'
			AND post_status = 'publish'" 
		);
		return reset($results);
	}
		
	/**
	* Get Product Data for Woo Grid Loop template
	*
	* @since 1.0.0
	*/
	protected function product_data_loop() {
			
		global $product;	
				
		// Show last product for loop template				
		if(empty($product)){
			
			$product_id = $this->bew_get_last_product_id();	
			$product_data =  wc_get_product($product_id );	
			
			$product = $product_data;  
		}
				
	}
		
	function get_woo_registered_tabs($output = ''){
       $registered_tabs = [];
		
       $tabs = apply_filters( 'woocommerce_product_tabs', array() );

       if($output == 'full'){			
           return $tabs;
       }

       foreach($tabs as $tab_key => $tab){
           $registered_tabs[$tab_key] = $tab['title'];
       }

    }
	
	// Deprecate Function.	
	protected function dynamic_field_checker(){
		
	$settings = &$this->settings;	
	$dynamic_field_value = $settings['dynamic_field_value'];	
	
	$callback = false;
				$available_callbacks = $this->get_dynamic_fields(true);
				if( $settings && !empty($dynamic_field_value) ){
					$callback = '{{'.$dynamic_field_value.'}}';
				}
				if( $settings && !empty($settings['dynamic_html']) ){
					$callback = $settings['dynamic_html'];
				}
				if($callback) {	        
					require_once BEW_PATH . '/widgets/class.dynamic-field.php';
					$dyno_generator = \BewDynamicField::get_instance();

					if( preg_match_all('#\{\{([a-z_]+)\}\}#imsU', $callback, $matches)){
						foreach($matches[1] as $key=>$field){
							if( isset($available_callbacks[$field])){
								$replace = $dyno_generator->$field();
								$callback = str_replace('{{' . $field . '}}', $replace, $callback);
							}
						}
					}
				}
				
				echo $callback;	
	}	
	
	/**
	 * Render our custom field onto the page.
	 */
	protected function render() {
		$settings = $this->get_settings();
		
		$dynamic_field_value = $settings['dynamic_field_value'];		
				
		$this->add_render_attribute( 'title', 'class', 'bew-heading-title' );
		$this->add_render_attribute( 'price', 'class', 'bew-heading-price' );	

		// Data for Bew Templates
		$this->product_data_loop();
				
		// Data for Elementor Pro Templates option
		global $product,$post;
					
		if(is_string($product)){
			$product = wc_get_product();
		}
					
		// Data for Elementor Pro Archive products templates				
		global $bewshop;
				
		if (!empty($bewshop)){					
			$product = $bewshop;
			$post = get_post($product->get_id());
		}
			
		if($dynamic_field_value){		
			// Content from dynamic class				
			$className = "Briefcase\Widgets\Classes\Bew_dynamic_" . $dynamic_field_value;
		
			$dynamic_field = new $className( $settings , $product  );				
			$content = $dynamic_field->bewdf_get_content();
		}
		
		echo $content;
					
	}

	/**
	 * This is outputted while rending the page.
	 */
	protected function content_template() {
				
	}

}

Plugin::instance()->widgets_manager->register_widget_type( new Bew_Widget_Dynamic_Field() );