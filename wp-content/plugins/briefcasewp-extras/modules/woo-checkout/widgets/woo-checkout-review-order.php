<?php
namespace BriefcasewpExtras\Modules\WooCheckout\Widgets;

use Elementor;
use Elementor\Plugin;
use Elementor\Utils;
use Elementor\Controls_Manager;
use Elementor\Icons_Manager;  
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Background;   
use Elementor\Group_Control_Box_Shadow;
use Elementor\Repeater;
use Elementor\Scheme_Color;
use Elementor\Scheme_Typography;
use BriefcasewpExtras\Base\Base_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Woo_Checkout_Review_Order extends Base_Widget {

	public function get_name() {
		return 'woo-checkout-review-order';
	}

	public function get_title() {
		return __( 'Checkout Review Order', 'bew-extras' );
	}

	public function get_icon() {
		return 'eicon-woocommerce';
	}

	public function get_categories() {
		return [ 'bew-extras-checkout' ];
	}
	
	public function get_script_depends() {
		return [ 'woo-general' ];
	}
	
	public function is_reload_preview_required() {
		return true;
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'woo_checkout_order_review_title',
			[
				'label' => __( 'Title', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
            'woo_checkout_order_review_title_show',
            [
                'label'         => __( 'Show/Hide Title', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
            ]
        );
		//order_button_text
		$this->add_control(
		    'woo_checkout_order_review_title_text',
		    [
		        'label' 		=> __( 'Text', 'woocommerce' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Your order', 'woocommerce' ) ,
                'condition' => [
                    'woo_checkout_order_review_title_show' => 'yes'
                ],
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ]
		    ]
		);

		$this->add_control(
			'woo_checkout_order_review_title_tag',
			[
				'label' 	=> __( 'HTML Tag', 'elementor' ),
				'type' 		=> Controls_Manager::SELECT,
				'default' 	=> 'h3',
				'options' 	=> [
					'h1'  => __( 'H1', 'bew-extras' ),
					'h2'  => __( 'H2', 'bew-extras' ),
					'h3'  => __( 'H3', 'bew-extras' ),
					'h4'  => __( 'H4', 'bew-extras' ),
					'h5'  => __( 'H5', 'bew-extras' ),
					'h6'  => __( 'H6', 'bew-extras' ),
				],
                'condition' => [
                    'woo_checkout_order_review_title_show' => 'yes'
                ],
			]
		);

		$this->add_responsive_control(
            'woo_checkout_order_review_title_alignment',
            [
                'label' 	   => __( 'Alignment', 'elementor' ),
                'type' 		   => Controls_Manager::CHOOSE,
                'options' 	   => [
                    'left' 		=> [
                        'title' 	=> __( 'Left', 'elementor' ),
                        'icon' 		=> 'fa fa-align-left',
                    ],
                    'center' 	=> [
                        'title' 	=> __( 'Center', 'elementor' ),
                        'icon' 		=> 'fa fa-align-center',
                    ],
                    'right' 	=> [
                        'title' 	=> __( 'Right', 'elementor' ),
                        'icon' 		=> 'fa fa-align-right',
                    ],
                ],
                'default' 	=> 'left',
                'toggle' 	=> true,
                'condition' => [
                    'woo_checkout_order_review_title_show' => 'yes'
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-order-review-title #bew-order-summary' => 'text-align: {{VALUE}};',
                ],
            ]
        );

		$this->end_controls_section();

		$this->start_controls_section(
			'woo_checkout_order_review_content',
			[
				'label' => __( 'Review Order Content', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);
		
		$this->add_control(
			'woo_checkout_order_review_heading',
			[
				'label'     => __( 'Order Headings', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
			]
		);
				
		$this->add_control(
            'woo_checkout_order_review_heading_show',
            [
                'label'         => __( 'Show/Hide Headings', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
            ]
        );

		$this->add_control(
		    'woo_checkout_order_review_table_th1',
		    [
		        'label' 		=> __( 'Product Column Heading', 'bew-extras' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Product', 'woocommerce' ) ,
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ],
				'condition' => [
                    'woo_checkout_order_review_heading_show' => 'yes'
                ],
		    ]
		);

		$this->add_control(
		    'woo_checkout_order_review_table_th2',
		    [
		        'label' 		=> __( 'Price Column Heading', 'bew-extras' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Subtotal', 'woocommerce' ) ,
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ],
				'condition' => [
                    'woo_checkout_order_review_heading_show' => 'yes'
                ],
		    ]
		);
		
		$this->add_control(
			'woo_checkout_order_review_list',
			[
				'label'     => __( 'Order Products', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_control(
            'woo_checkout_order_review_collapse',
            [
                'label'         => __( 'Collapse', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'On', 'bew-extras' ),
                'label_off'     => __( 'Off', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-collapse-',
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_review_collapse_mobile',
            [
                'label'         => __( 'Open on Mobile', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'On', 'bew-extras' ),
                'label_off'     => __( 'Off', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => '',
				'condition' => [
                    'woo_checkout_order_review_collapse' => 'yes'
                ],
				'prefix_class' => 'order-review-collapse-mobile-',
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_review_images_show',
            [
                'label'         => __( 'Show Images', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-images-',
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_review_qty_show',
            [
                'label'         => __( 'Show Quantity', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-qty-',
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_review_remove_show',
            [
                'label'         => __( 'Show Remove', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => '',
				'prefix_class' => 'order-review-remove-',
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_review_subtotal_show',
            [
                'label'         => __( 'Show Subtotal', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-subtotal-',
            ]
        );
		
		$this->add_control(
			'woo_checkout_order_review_shipping',
			[
				'label'     => __( 'Shipping', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_control(
            'woo_checkout_order_review_shipping_show',
            [
                'label'         => __( 'Show Shipping', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-shipping-',
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_review__shipping_description_show',
            [
                'label'         => __( 'Show Shipping Description', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'condition' => [
                    'woo_checkout_order_review_shipping_show' => 'yes'
                ],
				'prefix_class' => 'order-review-shipping-description-',
            ]
        );
				
		$this->add_control(
			'woo_checkout_order_review_coupon',
			[
				'label'     => __( 'Order Coupon', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_control(
            'woo_checkout_order_review_coupon_show',
            [
                'label'         => __( 'Show/Hide Coupon', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-coupon-',
            ]
        );
		
		$this->add_control(
			'woo_checkout_order_review_coupon_layout', [
				'label' => __( 'Coupon Layout', 'bew-extras' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'collapse',
				'options' => [
					'collapse' => 'Collapse',
					'input' => 'Input',
				],
				'prefix_class' => 'order-review-coupon-layout-',
			]
		);
		
		$this->add_control(
		    'woo_checkout_order_review_coupon_title_text',
		    [
		        'label' 		=> __( 'Title Text', 'bew-extras' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Coupon Code?', 'bew-extras' ) ,
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ],
				'condition' => [
                    'woo_checkout_order_review_coupon_layout' => 'collapse'
                ],
		    ]
		);

		$this->add_control(
		    'woo_checkout_order_review_coupon_button_text',
		    [
		        'label' 		=> __( 'Button Text', 'bew-extras' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Apply', 'woocommerce' ) ,
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ],
		    ]
		);
		
		$this->add_control(
            'woo_checkout_order_review_coupon_label_show',
            [
                'label'         => __( 'Show/Hide Label', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-coupon-label-',
            ]
        );
		
		$this->add_control(
		    'woo_checkout_order_review_coupon_label_text',
		    [
		        'label' 		=> __( 'Label Text', 'bew-extras' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Enter Code', 'bew-extras' ) ,
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ],
				'condition' => [
                    'woo_checkout_order_review_coupon_label_show' => 'yes'
                ],
		    ]
		);

		$this->add_control(
            'woo_checkout_order_review_coupon_label_layout',
            [
                'label'         => __( 'Inside Label', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'condition' => [
                    'woo_checkout_order_review_coupon_label_show' => 'yes'
                ],
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_review_coupon_order',
            [
                'label'         => __( 'Move Coupon to bottom', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Yes', 'bew-extras' ),
                'label_off'     => __( 'No', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => '',
				'prefix_class' => 'move-coupon-to-bottom-',
            ]
        );		
		
		$this->add_control(
			'woo_checkout_order_review_totals',
			[
				'label'     => __( 'Order Totals', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_control(
            'woo_checkout_order_review_totals_show',
            [
                'label'         => __( 'Show/Hide Totals', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'order-review-totals-',
            ]
        );	

		$this->end_controls_section();

		//Section general style
		$this->start_controls_section(
			'woo_checkout_order_review_general_style',
			[
				'label' => __( 'General', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);
		
		$this->add_group_control(
		    Group_Control_Border::get_type(),
		    [
		        'name'      => 'woo_checkout_table_border_type',
		        'label'     => __( 'Border', 'bew-extras' ),
		        'selector'  => '{{WRAPPER}} .bew-review-order-content .bew-woocommerce-checkout-review-order-table',
		    ]
		);

		$this->add_responsive_control(
			'woo_checkout_order_review_general_padding',
			[
				'label' => __( 'Padding', 'briefcase-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .woocommerce-checkout-review-order' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_order_review_general_margin',
			[
				'label' => __( 'Margin', 'briefcase-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .woocommerce-checkout-review-order' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		//section title style
		$this->start_controls_section(
			'woo_checkout_order_review_title_style',
			[
				'label' => __( 'Title', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'woo_checkout_order_review_title_show' => 'yes'
                ],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_review_title_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-order-review-title',
			]
		);
		
		$this->add_responsive_control(
			'woo_checkout_order_review_title_padding',
			[
				'label' => __( 'Padding', 'briefcase-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} #bew-order-summary' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_order_review_title_margin',
			[
				'label' => __( 'Margin', 'briefcase-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} #bew-order-summary' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		//Table Header controll		
		$this->start_controls_section(
			'woo_checkout_order_table_header_style',
			[
				'label' => __( 'Order Review Header', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_thead_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-review-order-content .product-titles',
			]
		);


        $this->add_control(
			'woo_checkout_order_thead_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-review-order-content .product-titles' => 'color: {{VALUE}}',
				],
			]
		);

        $this->add_control(
			'woo_checkout_order_thead_bg_color',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-review-order-content .product-titles' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
            'woo_checkout_order_thead_alignment',
            [
                'label' 	   => __( 'Alignment', 'bew-extras' ),
                'type' 		   => Controls_Manager::CHOOSE,
                'options' 	   => [
                    'left' 		=> [
                        'title' 	=> __( 'Left', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-left',
                    ],
                    'center' 	=> [
                        'title' 	=> __( 'Center', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-center',
                    ],
                    'right' 	=> [
                        'title' 	=> __( 'Right', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-right',
                    ],
                ],
                'default' 	=> 'left',
                'toggle' 	=> true,
                'selectors' => [
                    '{{WRAPPER}} .bew-review-order-content .product-titles' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
        	'woo_checkout_order_thead_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-review-order-content .product-titles' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );

		$this->end_controls_section();

		/**
		 * Order Review List
		 */
		$this->start_controls_section(
			'woo_checkout_order_list_style',
			[
				'label' => __( 'Order Review Products', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'woo_checkout_order_products_general',
			[
				'label'     => __( 'General', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_bg_color',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-order-summary-item' => 'background-color: {{VALUE}}',
				],
			]
		);
		
		$this->add_group_control(
		    Group_Control_Border::get_type(),
		    [
		        'name'      => 'woo_checkout_order_products_list_border_type',
		        'label'     => __( 'Border', 'bew-extras' ),
		        'selector'  => '{{WRAPPER}} .bew-components-order-summary-item',
		    ]
		);
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_list_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-order-summary-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_list_margin',
        	[
        		'label' => __( 'Margin', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-order-summary-item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
		$this->add_control(
			'woo_checkout_order_products_images',
			[
				'label'     => __( 'Images', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_img_size',
			[
				'label' 		=> __( 'Image Size', 'bew-extras' ),
				'type' 			=> Controls_Manager::SLIDER,
				'size_units' 	=> [ 'px', '%' ],
				'range' => [
					'px' => [
						'min' 	=> 10,
						'max' 	=> 200,
						'step' 	=> 1,
					],
					'%' => [
						'min' => 0,
						'max' => 100,
					],
				],				
				'selectors' => [
					'{{WRAPPER}} .bew-components-order-summary-item__image > img' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);
		
		$this->add_group_control(
		    Group_Control_Border::get_type(),
		    [
		        'name'      => 'woo_checkout_order_products_list_img_border_type',
		        'label'     => __( 'Image Border', 'bew-extras' ),
		        'selector'  => '{{WRAPPER}} .bew-components-order-summary-item__image > img',
		    ]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_img_border_radius',
			[
				'label' => __( 'Image Border Radius', 'bew-extras' ),
				'type' 	=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%', 'em' ],
				'selectors' 	=> [
					'{{WRAPPER}} .bew-components-order-summary-item__image > img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_list_img_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-order-summary-item__image > img' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );

		$this->add_control(
			'woo_checkout_order_products_qty',
			[
				'label'     => __( 'Quantity', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_qty_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-order-summary-item__quantity',
				'separator' => 'before',
			]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_qty_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-order-summary-item__quantity' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_qty_bg_color',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-order-summary-item__quantity' => 'background-color: {{VALUE}}',
				],
			]
		);
				
		$this->add_control(
			'woo_checkout_order_products_list_qty_size',
			[
				'label' 		=> __( 'Size', 'bew-extras' ),
				'type' 			=> Controls_Manager::SLIDER,
				'size_units' 	=> [ 'px', '%' ],
				'range' => [
					'px' => [
						'min' 	=> 10,
						'max' 	=> 200,
						'step' 	=> 1,
					],
					'%' => [
						'min' => 0,
						'max' => 100,
					],
				],				
				'selectors' => [
					'{{WRAPPER}} .bew-components-order-summary-item__quantity' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
				],
			]
		);
		
		$this->add_group_control(
		    Group_Control_Border::get_type(),
		    [
		        'name'      => 'woo_checkout_order_products_list_qty_border_type',
		        'label'     => __( 'Border', 'bew-extras' ),
		        'selector'  => '{{WRAPPER}} .bew-components-order-summary-item__quantity',
		    ]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_qty_border_radius',
			[
				'label' => __( 'Border Radius', 'bew-extras' ),
				'type' 	=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%', 'em' ],
				'selectors' 	=> [
					'{{WRAPPER}} .bew-components-order-summary-item__quantity' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_list_qty_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-order-summary-item__quantity' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );		

		$this->add_control(
			'woo_checkout_order_products_description',
			[
				'label'     => __( 'Names', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_desc_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-product-name',
				'separator' => 'before',
			]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_desc_color',
			[
				'label'     => __( 'Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-product-name' => 'color: {{VALUE}}',
				],
			]
		);
		
        $this->add_responsive_control(
            'woo_checkout_order_products_name_width',
            [
                'label' => __( 'Name Width', 'briefcase-extras' ),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ 'px', '%' ],
                'range' => [
                    'px' => [
                        'min' => 10,
                        'max' => 200,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],                    
                'selectors' => [
                    '{{WRAPPER}} .bew-components-product-name' => 'width: {{SIZE}}{{UNIT}} !important;',
                ],
            ]
        );

		$this->add_control(
			'woo_checkout_order_products_price',
			[
				'label'     => __( 'Price', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_price_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-product-price .woocommerce-Price-amount.amount',
			]
		);
        
		
		$this->add_control(
			'woo_checkout_order_products_list_price_color',
			[
				'label'     => __( 'Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-product-price .woocommerce-Price-amount.amount' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'woo_checkout_order_products_subtotal',
			[
				'label'     => __( 'Subtotal', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_subtotal_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-order-subtotal .bew-components-totals-item__label , {{WRAPPER}} bew-components-order-subtotal .woocommerce-Price-amount.amount',
				'separator' => 'before',
			]
		);

        $this->add_control(
			'woo_checkout_order_products_list_subtotal_color',
			[
				'label'     => __( 'Subtotal Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-order-subtotal .bew-components-totals-item__label , {{WRAPPER}} bew-components-order-subtotal .woocommerce-Price-amount.amount' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_list_subtotal_padding',
        	[
        		'label' => __( 'Subtotal Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-order-subtotal' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
		$this->add_control(
			'woo_checkout_order_products_discount',
			[
				'label'     => __( 'Discount', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_title_discount_typography',
				'label' 	=> __( 'Title Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-totals-discount .bew-components-totals-item__label',
				
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_price_discount_typography',
				'label' 	=> __( 'Amount Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-totals-discount .woocommerce-Price-amount.amount',				
			]
		);

        $this->add_control(
			'woo_checkout_order_products_list_discount_color',
			[
				'label'     => __( 'Amount Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-totals-discount .woocommerce-Price-amount.amount' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_discount_code_color',
			[
				'label'     => __( 'Code Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-totals-discount .bew-components-chip' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_control(
			'woo_checkout_order_products_list_discount_code_bg_color',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-totals-discount .bew-components-chip' => 'background-color: {{VALUE}}',
				],
			]
		);
		
        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'woo_checkout_order_products_list_discount_border',
                'label' => __( 'Border', 'briefcase-extras' ),
                'selector' => '{{WRAPPER}} .bew-components-totals-discount',
            ]
        );
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_list_discount_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-totals-discount' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );

		$this->add_responsive_control(
        	'woo_checkout_order_products_list_discount_margin',
        	[
        		'label' => __( 'Margin', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-totals-discount' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
		$this->add_control(
			'woo_checkout_order_products_shipping',
			[
				'label'     => __( 'Shipping', 'bew-extras' ),
				'type'      => Controls_Manager::HEADING,				
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_shipping_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-totals-shipping .bew-components-totals-item__label , {{WRAPPER}} .bew-components-totals-shipping .woocommerce-Price-amount.amount',
				'separator' => 'before',
			]
		);
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_shipping_des_typography',
				'label' 	=> __( 'Description Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-totals-item__description',			
			]
		);

        $this->add_control(
			'woo_checkout_order_products_list_shipping_color',
			[
				'label'     => __( 'Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-totals-shipping .bew-components-totals-item__label , {{WRAPPER}} .bew-components-totals-shipping .woocommerce-Price-amount.amount' => 'color: {{VALUE}}',
				],
			]
		);
				
		$this->add_responsive_control(
        	'woo_checkout_order_products_list_shipping_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-totals-discount' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );

		$this->end_controls_section();
		
        //Table Coupon
		$this->start_controls_section(
			'woo_checkout_order_coupon_style',
			[
				'label' => __( 'Coupon', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
            'woo_checkout_order_products_coupon_general_heading',
            [
                'label' => __( 'Coupon General', 'briefcase-extras' ),
                'type' => Controls_Manager::HEADING,                
            ]
        );

		$this->add_responsive_control(
        	'woo_checkout_order_products_list_coupon_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-totals-coupon.bew-components-panel' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );

		$this->add_responsive_control(
        	'woo_checkout_order_products_list_coupon_margin',
        	[
        		'label' => __( 'Margin', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-totals-coupon.bew-components-panel' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
		$this->add_group_control(
		    Group_Control_Border::get_type(),
		    [
		        'name'      => 'woo_checkout_order_products_list_coupon_border_type',
		        'label'     => __( 'Quantity Border', 'bew-extras' ),
		        'selector'  => '{{WRAPPER}} .bew-components-totals-coupon.bew-components-panel.has-border:after',
		    ]
		);			
		
        $this->add_control(
            'woo_checkout_order_products_coupon_title_heading',
            [
                'label' => __( 'Coupon Title', 'briefcase-extras' ),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );
		
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_products_list_coupon_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-order-review-coupon',				
			]
		);
		
        $this->add_control(
			'woo_checkout_order_products_list_coupon_color',
			[
				'label'     => __( 'Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-order-review-coupon' => 'color: {{VALUE}}',
				],
			]
		);
	
        $this->add_control(
            'woo_checkout_order_products_coupon_inputbox_heading',
            [
                'label' => __( 'Input Box', 'briefcase-extras' ),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );

        $this->add_control(
            'woo_checkout_order_products_coupon_inputbox_color',
            [
                'label' => __( 'Input Box Color', 'briefcase-extras' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon input.input-text' => 'color: {{VALUE}}',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'      => 'woo_checkout_order_products_coupon_inputbox_typography',
                'label'     => __( 'Typography', 'briefcase-extras' ),
                'selector'  => '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon input.input-text',
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'woo_checkout_order_products_coupon_inputbox_border',
                'label' => __( 'Border', 'briefcase-extras' ),
                'selector' => '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon input.input-text',
            ]
        );

        $this->add_responsive_control(
            'woo_checkout_order_products_coupon_inputbox_border_radius',
            [
                'label' => __( 'Border Radius', 'briefcase-extras' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon input.input-text' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'woo_checkout_order_products_coupon_inputbox_padding',
            [
                'label' => __( 'Padding', 'briefcase-extras' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon input.input-text' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; height:auto',
                ],
            ]
        );
		
		$this->add_responsive_control(
            'woo_checkout_order_products_coupon_inputbox_margin',
            [
                'label' => __( 'Margin', 'briefcase-extras' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon input.input-text' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; height:auto',
                ],
            ]
        );

        $this->add_responsive_control(
            'woo_checkout_order_products_coupon_inputbox_width',
            [
                'label' => __( 'Input Box Width', 'briefcase-extras' ),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ 'px', '%' ],
                'range' => [
                    'px' => [
                        'min' => 10,
                        'max' => 200,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],                    
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .form-row-first ' => 'width: {{SIZE}}{{UNIT}} !important;',
                ],
            ]
        );
		
		$this->add_control(
            'woo_checkout_order_products_coupon_button_heading',
            [
                'label' => __( 'Coupon Button', 'briefcase-extras' ),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );		

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'      => 'woo_checkout_order_products_coupon_button_typography',
                'label'     => __( 'Typography', 'briefcase-extras' ),
                'selector'  => '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button',
            ]
        );

        $this->add_control(
            'woo_checkout_order_products_coupon_button_color',
            [
                'label' => __( 'Color', 'briefcase-extras' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button' => 'color: {{VALUE}}',
                ],
            ]
        );

        $this->add_control(
            'woo_checkout_order_products_coupon_button_bg_color',
            [
                'label' => __( 'Background Color', 'briefcase-extras' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button' => 'background-color: {{VALUE}}; transition:0.4s',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'woo_checkout_order_products_coupon_button_border',
                'label' => __( 'Border', 'briefcase-extras' ),
                'selector' => '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button , .woocommerce-page {{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon__content form .form-row-last .button',
            ]
        );

        $this->add_responsive_control(
            'woo_checkout_order_products_coupon_button_border_radius',
            [
                'label' => __( 'Border Radius', 'briefcase-extras' ),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'woo_checkout_order_products_coupon_button_hover_color',
            [
                'label' => __( 'Hover Color', 'briefcase-extras' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button:hover' => 'color: {{VALUE}}',
                ],
            ]
        );

        $this->add_control(
            'woo_checkout_order_products_coupon_button_hover_bg_color',
            [
                'label' => __( 'Hover Background Color', 'briefcase-extras' ),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button:hover' => 'background-color: {{VALUE}}; transition:0.4s',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name' => 'woo_checkout_order_products_coupon_hover_button_border',
                'label' => __( 'Border', 'briefcase-extras' ),                    
				'selector' => '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button:hover',
            ]
        );
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_coupon_button_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button, .woocommerce-page {{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon__content form .form-row-last .button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; height: auto;',
        		],
        	]
        );
		
		$this->add_responsive_control(
        	'woo_checkout_order_products_coupon_button_margin',
        	[
        		'label' => __( 'Margin', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .button, .woocommerce-page {{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon__content form .form-row-last .button' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
		$this->add_responsive_control(
            'woo_checkout_order_products_coupon_button_width',
            [
                'label' => __( 'Button Width', 'briefcase-extras' ),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ 'px', '%' ],
                'range' => [
                    'px' => [
                        'min' => 10,
                        'max' => 200,
                        'step' => 1,
                    ],
                    '%' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],                    
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .form-row-last' => 'width: {{SIZE}}{{UNIT}} !important;',
                ],
            ]
        );
		
		$this->add_responsive_control(
            'woo_checkout_order_products_coupon_button_alignment',
            [
                'label' 	   => __( 'Alignment', 'bew-extras' ),
                'type' 		   => Controls_Manager::CHOOSE,
                'options' 	   => [
                    'left' 		=> [
                        'title' 	=> __( 'Left', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-left',
                    ],
                    'center' 	=> [
                        'title' 	=> __( 'Center', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-center',
                    ],
                    'right' 	=> [
                        'title' 	=> __( 'Right', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-right',
                    ],
                ],
                'default' 	=> 'center',
                'toggle' 	=> true,
                'selectors' => [
                    '{{WRAPPER}} #bew-checkout-review-order .bew-components-totals-coupon .form-row-last .button' => 'text-align: {{VALUE}};',
                ],
            ]
        );		
		
		$this->end_controls_section();

		//Table totals footer controll		
		$this->start_controls_section(
			'woo_checkout_order_tfoot_style',
			[
				'label' => __( 'Totals', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_order_tfoot_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__label,
								{{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__value',
			]
		);


        $this->add_control(
			'woo_checkout_order_tfoot_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__label,
					 {{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__value' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'woo_checkout_order_tfoot_bg_color',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__label,
					{{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__value' => 'background-color: {{VALUE}}',
				],
			]
		);

        $this->add_responsive_control(
        	'woo_checkout_order_tfoot_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-totals-footer-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
        $this->add_responsive_control(
        	'woo_checkout_order_tfoot_margin',
        	[
        		'label' => __( 'Margin', 'bew-extras' ),
        		'type' => Controls_Manager::DIMENSIONS,
        		'size_units' => [ 'px', '%', 'em' ],
        		'selectors' => [
        			'{{WRAPPER}} .bew-components-totals-footer-item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );
		
		$this->add_group_control(
		    Group_Control_Border::get_type(),
		    [
		        'name'      => 'woo_checkout_order_tfoot_border_type',
		        'label'     => __( 'Border', 'bew-extras' ),
		        'selector'  => '{{WRAPPER}} .bew-components-totals-footer-item',
		    ]
		);

		$this->add_responsive_control(
            'woo_checkout_order_tfoot_alignment',
            [
                'label' 	   => __( 'Alignment', 'bew-extras' ),
                'type' 		   => Controls_Manager::CHOOSE,
                'options' 	   => [
                    'left' 		=> [
                        'title' 	=> __( 'Left', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-left',
                    ],
                    'center' 	=> [
                        'title' 	=> __( 'Center', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-center',
                    ],
                    'right' 	=> [
                        'title' 	=> __( 'Right', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-right',
                    ],
                ],
                'default' 	=> 'left',
                'toggle' 	=> true,
                'selectors' => [
                    '{{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__label,
					 {{WRAPPER}} .bew-components-totals-footer-item .bew-components-totals-item__value' => 'text-align: {{VALUE}};',
                ],
            ]
        );		

		$this->end_controls_section();

	}

	protected function render() {
		if ( ( is_checkout() && !empty( is_wc_endpoint_url('order-received') ) ) ) return;
		
		$settings = $this->get_settings_for_display();
		
		$order_review_title_show   = $settings['woo_checkout_order_review_title_show'];
		$order_review_title_tag    = Utils::validate_html_tag( $settings['woo_checkout_order_review_title_tag'] );
		$order_review_title_text   = $settings['woo_checkout_order_review_title_text'];
		$order_review_heading_show = $settings['woo_checkout_order_review_heading_show'];
		$order_review_table_th1    = $settings['woo_checkout_order_review_table_th1'];
		$order_review_table_th2    = $settings['woo_checkout_order_review_table_th2'];
		
		$order_review_coupon_label       = $settings['woo_checkout_order_review_coupon_label_layout'];
		$order_review_coupon_title_text  = $settings['woo_checkout_order_review_coupon_title_text'];
		$order_review_coupon_button_text = $settings['woo_checkout_order_review_coupon_button_text'];
		$order_review_coupon_label_text  = $settings['woo_checkout_order_review_coupon_label_text'];
		
		$order_review_collpase        =  $settings['woo_checkout_order_review_collapse'];
		$order_review_collpase_mobile =  $settings['woo_checkout_order_review_collapse_mobile'];
				
		if ( $order_review_collpase_mobile == 'yes' ) { 
			$show_summary_mobile = "show-summary-mobile";
		}
		
		if ( Elementor\Plugin::instance()->editor->is_edit_mode() ) {
			update_option( '_order_review_coupon_label', $order_review_coupon_label );
			update_option( '_order_review_coupon_title_text', $order_review_coupon_title_text );
			update_option( '_order_review_coupon_button_text', $order_review_coupon_button_text );
			update_option( '_order_review_coupon_label_text', $order_review_coupon_label_text );
		}			
		
		if( is_null( WC()->cart ) ) {
			include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
			include_once WC_ABSPATH . 'includes/class-wc-cart.php';
			wc_load_cart();
		}
				
		?>
		<div id= "bew-checkout-review-order" class="woocommerce-checkout-review-order show-summary <?php echo $show_summary_mobile;?>">
			<?php if( 'yes' == $order_review_title_show ){ ?>
				<<?php echo esc_attr( $order_review_title_tag ); ?> class="bew-order-review-title">			
				<div id= "bew-order-summary" class="bew-components-panel__button">
				<span class="wc-block-components-order-summary__button-text"><?php echo esc_html( $order_review_title_text ); ?></span>
				</div> 
				</<?php echo esc_attr( $order_review_title_tag ); ?>>
			<?php } ?>

		<div class="bew-review-order-content">
			<?php if( 'yes' == $order_review_heading_show ){ ?>
					<div class="product-titles">
						<div class="product-name"><?php esc_html_e( $order_review_table_th1 , 'woocommerce' ); ?></div>
						<div class="product-total"><?php esc_html_e( $order_review_table_th2 , 'woocommerce' ); ?></div>
					</div>
			<?php } ?>
			<?php include BEW_EXTRAS_PATH . 'includes/bew-woo-templates/bew-review-order.php'; ?>
		</div>
		
		</div>
		
		<script type="text/javascript">
			jQuery(function($){
				$( '#billing_state, #billing_city, #billing_postcode' ).on( 'change', function() {
					$( document.body ).trigger( 'update_checkout' );
				} )
			})
		</script>
		
		<?php
	}

	protected function _content_template() {
		
	}
	
}

