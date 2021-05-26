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

class Woo_Checkout_Payment extends Base_Widget {

	public function get_name() {
		return 'woo-checkout-payment';
	}

	public function get_title() {
		return __( 'Checkout Payment', 'bew-extras' );
	}

	public function get_icon() {
		return 'eicon-woocommerce';
	}

	public function get_categories() {
		return [ 'bew-extras-checkout' ];
	}
	
	public function get_script_depends() {
		return [ 'woo-general' , 'bew-extras-scripts' ];
	}
	
	public function is_reload_preview_required() {
		return true;
	}

	protected function _register_controls() {
		
		$this->start_controls_section(
			'woo_checkout_payment_section_title',
			[
				'label' => __( 'Section Title', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'woo_checkout_payment_steps',
			[
				'label'         => __( 'Checkout Steps', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'On', 'bew-extras' ),
				'label_off'     => __( 'Off', 'bew-extras' ),
				'return_value'  => 'active',
				'default'       => 'active',
			]
		);

		$this->add_control(
			'woo_checkout_payment_vertical_line',
			[
				'label'         => __( 'Vertical Line', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
				'return_value'  => 'yes',
				'default'       => '',
				'condition' => [
                    'woo_checkout_payment_steps' => 'active'
                ],
				'prefix_class' => 'steps-vertical-line-',
			]
		);
		
		$this->add_control(
            'woo_checkout_payment_title_show',
            [
                'label'         => __( 'Title', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
            ]
        );
		
		//order_button_text
		$this->add_control(
		    'woo_checkout_payment_section_title_text',
		    [
		        'label' 		=> __( 'Text', 'bew-extras' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Payment Methods', 'bew-extras' ) ,
                'condition' => [
                    'woo_checkout_payment_title_show' => 'yes'
                ],
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ]
		    ]
		);

		$this->add_control(
			'woo_checkout_payment_title_tag',
			[
				'label' 	=> __( 'HTML Tag', 'bew-extras' ),
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
                    'woo_checkout_payment_title_show' => 'yes'
                ],
			]
		);
		
		$this->add_control(
			'woo_checkout_payment_description_show',
			[
				'label'         => __( 'Show/Hide Description', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'Show', 'bew-extras' ),
				'label_off'     => __( 'Hide', 'bew-extras' ),
				'return_value'  => 'yes',
				'default'       => 'yes',
			]
		);
		
		$this->add_control(
			'woo_checkout_payment_description_text',
			[
				'label' 		=> __( 'Text', 'bew-extras' ),
				'type' 			=> Controls_Manager::TEXT,
				'default' 		=> __( "Select payment options below.", 'bew-extras' ) ,
				   'condition' 	=> [
					   'woo_checkout_payment_description_show' => 'yes'
				   ],
				'dynamic' 		=> [
					'active' 		=> true,
				]
			]
		);

		$this->add_responsive_control(
            'woo_checkout_payment_title_alignment',
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
                'condition' => [
                    'woo_checkout_payment_title_show' => 'yes'
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-payment-title' => 'text-align: {{VALUE}};',
                ],
            ]
        );

		$this->end_controls_section();

		$this->start_controls_section(
			'woo_checkout_payment_methods_content',
			[
				'label' => __( 'Payment Methods', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);
		
		$this->add_control(
			'woo_checkout_payment_methods_layout',
			[
				'label' 	=> __( 'Layout', 'bew-extras' ),
				'type' 		=> Controls_Manager::SELECT,
				'default' 	=> 'tabs',
				'options' 	=> [
					'tabs'  => __( 'Tabs', 'bewe-extras' ),
					'radio'  => __( 'Radio', 'bew-extras' ),
					'checkbox'  => __( 'Checkbox', 'bew-extras' ),					
				],				
			]
		);
		
		$this->add_control(
			'woo_checkout_payment_methods_paypal',
			[
				'label'         => __( 'Hide Paypal Description', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'On', 'bew-extras' ),
				'label_off'     => __( 'Off', 'bew-extras' ),
				'return_value'  => 'yes',
				'default'       => '',
				'prefix_class' => 'hide-paypal-description-',
			]
		);	
				
		$this->add_control(
			'woo_checkout_payment_form_review',
			[
				'label'         => __( 'Multistep Review', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'Show', 'bew-extras' ),
				'label_off'     => __( 'Hide', 'bew-extras' ),
				'return_value'  => 'yes',
				'default'       => '',
				'separator'     => 'before',
			]
		);

		$this->add_control(
			'woo_checkout_payment_contact', [
				'label' => __( 'Contact text', 'bew-extras' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Contact' , 'bew-extras' ),
				'placeholder' => __( 'Custom text here' , 'bew-extras' ),
				'label_block' => true,	
				'condition' => [
				   'woo_checkout_payment_form_review' => 'yes'
				],
			]
		);

		$this->add_control(
			'woo_checkout_payment_ship', [
				'label' => __( 'Ship To text', 'bew-extras' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Ship To' , 'bew-extras' ),
				'placeholder' => __( 'Custom text here' , 'bew-extras' ),
				'label_block' => true,	
				'condition' => [
				   'woo_checkout_payment_form_review' => 'yes'
				],
			]
		);

		$this->add_control(
			'woo_checkout_payment_bill', [
				'label' => __( 'Bill To text', 'bew-extras' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Bill To' , 'bew-extras' ),
				'placeholder' => __( 'Custom text here' , 'bew-extras' ),
				'label_block' => true,	
				'condition' => [
				   'woo_checkout_payment_form_review' => 'yes'
				],
			]
		);	

		$this->add_control(
			'woo_checkout_payment_method', [
				'label' => __( 'Method text', 'bew-extras' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Method' , 'bew-extras' ),
				'placeholder' => __( 'Custom text here' , 'bew-extras' ),
				'label_block' => true,	
				'condition' => [
				   'woo_checkout_payment_form_review' => 'yes'
				],
			]
		);			

		$this->add_control(
			'woo_checkout_payment_change', [
				'label' => __( 'Change text', 'bew-extras' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Change' , 'bew-extras' ),
				'placeholder' => __( 'Custom text here' , 'bew-extras' ),
				'label_block' => true,	
				'condition' => [
				   'woo_checkout_payment_form_review' => 'yes'
				],
			]
		);		
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'woo_checkout_payment_methods_button',
			[
				'label' => __( 'Order Button', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);
		
		//order_button
		$this->add_control(
            'woo_checkout_order_button_show',
            [
                'label'         => __( 'Place Order Button', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
            ]
        );
		
		$this->add_control(
		    'woo_checkout_order_button_text',
		    [
		        'label' 		=> __( 'Order Button Text', 'bew-extras' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Place Order', 'bew-extras' ) ,
		        'dynamic' 		=> [
		            'active' 		=> true,
		        ]
		    ]
		);
		
		$this->add_control(
            'woo_checkout_order_button_icon_show',
            [
                'label'         => __( 'Arrow Icon Button', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => '',
				'prefix_class' => 'bew-order-button-icon-show-',
            ]
        );
		
		$this->add_control(
            'woo_checkout_privacy_policy',
            [
                'label'         => __( 'Privacy Policy Text', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'bew-extras' ),
                'label_off'     => __( 'Hide', 'bew-extras' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
				'prefix_class' => 'bew-order-privacy-policy-show-',
            ]
        );
		
		$this->add_control(
			'woo_checkout_privacy_policy_position',
			[
				'label' 	=> __( 'Layout', 'bew-extras' ),
				'type' 		=> Controls_Manager::SELECT,
				'default' 	=> 'privacy-bottom',
				'options' 	=> [
					'privacy-top'  => __( 'Top', 'bew-extras' ),
					'privacy-bottom'  => __( 'Bottom', 'bew-extras' ),					
				],
				'condition' => [
                    'woo_checkout_privacy_policy' => 'yes'
                ],
			]
		);	
				
		$this->add_responsive_control(
            'woo_checkout_order_button_alignment',
            [
                'label' 	   => __( 'Alignment', 'bew-extras' ),
                'type' 		   => Controls_Manager::CHOOSE,
                'options' 	   => [
                    'flex-start' 		=> [
                        'title' 	=> __( 'Left', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-left',
                    ],
                    'center' 	=> [
                        'title' 	=> __( 'Center', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-center',
                    ],
                    'flex-end' 	=> [
                        'title' 	=> __( 'Right', 'bew-extras' ),
                        'icon' 		=> 'fa fa-align-right',
                    ],
                ],
                'default' 	=> 'center',
                'toggle' 	=> true,
                'condition' => [
                    'woo_checkout_order_button_show' => 'yes'
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-payment .place-order .button' => 'justify-content: {{VALUE}};',
                ],
            ]
        );

		$this->end_controls_section();

		//Section general style
		$this->start_controls_section(
			'woo_checkout_payment_general_style',
			[
				'label' => __( 'General', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'woo_checkout_payment_general_padding',
			[
				'label' => __( 'Padding', 'bew-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}}.elementor-widget-woo-checkout-payment .bew-components-checkout-step' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_payment_general_margin',
			[
				'label' => __( 'Margin', 'bew-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}}.elementor-widget-woo-checkout-payment .bew-components-checkout-step' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);
		
		$this->end_controls_section();

		//Section title style
		$this->start_controls_section(
			'woo_checkout_payment_title_style',
			[
				'label' => __( 'Title', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'woo_checkout_payment_title_show' => 'yes'
                ],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_payment_title_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-payment-title',
			]
		);
		
		$this->add_responsive_control(
			'woo_checkout_payment_title_padding',
			[
				'label' => __( 'Padding', 'bew-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .bew-checkout-step-heading .bew-payment-title' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_payment_title_margin',
			[
				'label' => __( 'Margin', 'bew-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .bew-checkout-step-heading' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		//Input Label Color	
		$this->start_controls_section(
			'woo_checkout_pm_style',
			[
				'label' => __( 'Payment Methods', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

        $this->add_control(
			'woo_checkout_pm_bg_color',
			[
				'label'     => __( 'Background Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods, {{WRAPPER}} .bew-payment #payment .payment_methods' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_pm_padding',
			[
				'label'         => __( 'Padding', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods, {{WRAPPER}} .bew-payment #payment .payment_methods' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->start_controls_tabs('payment methods');

		$this->start_controls_tab(
		    'woo_checkout_pm_titles',
		    [
		        'label' => __( 'Titles', 'bew-extras' ),
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'tabs'
                ],
		    ]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_pm_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'tabs'
                ],
				'selector' 	=> '{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .bew-components-tabs__item .bew-components-tabs__item-content',
			]
		);

        $this->add_control(
			'woo_checkout_pm_text_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'tabs'
                ],
				'selectors' => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .bew-components-tabs__item .bew-components-tabs__item-content' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->add_control(
			'woo_checkout_pm_text_active_color',
			[
				'label'     => __( 'Active Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'tabs'
                ],
				'selectors' => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .bew-components-tabs__item .bew-components-tabs__item-content.active' => 'color: {{VALUE}}',
				],
			]
		);
		
		$this->end_controls_tab();

		$this->start_controls_tab(
		    'woo_checkout_pm_label',
		    [
		        'label' => __( 'Label', 'bew-extras' ),
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'radio'
                ],
		    ]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_pm_label_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-payment #payment .payment_methods .wc_payment_method label',
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'radio'
                ],
			]
		);

        $this->add_control(
			'woo_checkout_pm_label_text_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment #payment .payment_methods .wc_payment_method label' => 'color: {{VALUE}}',
				],
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'radio'
                ],
			]
		);
		
		$this->add_control(
			'woo_checkout_pm_label_bg_color',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment #payment .payment_methods .wc_payment_method label' => 'background-color: {{VALUE}}',
				],
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'radio'
                ],
			]
		);
		
		$this->end_controls_tab();
		
		$this->start_controls_tab(
		    'woo_checkout_pm_checkbox',
		    [
		        'label' => __( 'Checkbox', 'bew-extras' ),
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'checkbox'
                ],
		    ]
		);

        $this->add_control(
			'woo_checkout_pm_checkbox_color',
			[
				'label'     => __( 'Box Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment .checkbox #payment .payment_methods input[type="radio"] + label:before' => 'border-color: {{VALUE}}',
				],
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'checkbox'
                ],
			]
		);
		
		$this->add_control(
			'woo_checkout_pm_checkbox_active_color',
			[
				'label'     => __( 'Box Checked Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment .checkbox #payment .payment_methods input[type="radio"]:checked + label:before' => 'border-color: {{VALUE}} ',
				],
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'checkbox'
                ],
			]
		);

		$this->add_control(
			'woo_checkout_pm_checkbox_checked_color',
			[
				'label'     => __( 'Check Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment .checkbox #payment .payment_methods input[type="radio"]:checked + label:before' => 'color: {{VALUE}};',
				],
				'condition' => [
                    'woo_checkout_payment_methods_layout' => 'checkbox'
                ],
			]
		);
		
		$this->end_controls_tab();

		$this->start_controls_tab(
		    'woo_checkout_pm_contents',
		    [
		        'label' => __( 'Contents', 'bew-extras' ),
		    ]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_pm_content_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .tab-content .bew-components-tabs__content,
					 {{WRAPPER}} .bew-payment #payment .payment_methods .payment_box',
				],
			]
		);

        $this->add_control(
			'woo_checkout_pm_content_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .tab-content .bew-components-tabs__content,
					 {{WRAPPER}} .bew-payment #payment .payment_methods .payment_box' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'woo_checkout_pm_content_bg_color',
			[
				'label'     => __( 'Background Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .tab-content .bew-components-tabs__content, 
					 {{WRAPPER}} .bew-payment #payment .payment_methods .payment_box' => 'background-color: {{VALUE}};',
					'{{WRAPPER}} .bew-payment #payment .payment_methods .payment_box::before' => 'border-bottom-color: {{VALUE}}'
				],
			]
		);
		
		$this->add_responsive_control(
			'woo_checkout_pm_content_padding',
			[
				'label'         => __( 'Padding', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .tab-content .bew-components-tabs__content,
					 {{WRAPPER}} .bew-payment #payment .payment_methods .payment_box' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_pm_content_margin',
			[
				'label'         => __( 'Margin', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} .bew-payment #payment .bew-components-checkout-payment-methods .tab-content .bew-components-tabs__content,
					 {{WRAPPER}} .bew-payment #payment .payment_methods .payment_box' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_tab();
		$this->end_controls_tabs();

		$this->end_controls_section();

		//section button style
		$this->start_controls_section(
			'woo_checkout_payment_btn_style',
			[
				'label' => __( 'Order Button', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_payment_btn_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .form-row.place-order #place_order',
			]
		);

		$this->add_responsive_control(
			'woo_checkout_pm_btn_padding',
			[
				'label'         => __( 'Padding', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} #payment .form-row.place-order #place_order' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; min-height: auto;',
				],
			]
		);
		
		$this->add_responsive_control(
			'woo_checkout_pm_btn_margin',
			[
				'label'         => __( 'Margin', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} #payment .form-row.place-order #place_order' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'woo_checkout_pm_btn_border_radius',
			[
				'label'         => __( 'Border Radius', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} #payment .form-row.place-order #place_order' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->start_controls_tabs(
			'woo_checkout_pm_btn_separator',
			[
				'separator' => 'before'
			]
		);

		$this->start_controls_tab(
			'woo_checkout_pm_btn_normal',
			[
				'label'     => __( 'Normal', 'bew-extras' ),
			]
		);

		$this->add_control(
			'woo_checkout_pm_btn_text_color',
			[
				'label'     => __( 'Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #payment .form-row.place-order #place_order' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'woo_checkout_pm_btn_color',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #payment .form-row.place-order #place_order' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'          => 'woo_checkout_pm_btn_border',
				'label'         => __( 'Border', 'bew-extras' ),
				'selector'      => '{{WRAPPER}} #payment .form-row.place-order #place_order',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'woo_checkout_pm_btn_hover',
			[
				'label'     => __( 'Hover', 'bew-extras' ),
			]
		);
		
		$this->add_control(
			'woo_checkout_pm_btn_text_color_hover',
			[
				'label'     => __( 'Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #payment .form-row.place-order #place_order:hover' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'woo_checkout_pm_btn_color_hover',
			[
				'label'     => __( 'Background', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #payment .form-row.place-order #place_order:hover' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'          => 'woo_checkout_pm_btn_border_hover',
				'label'         => __( 'Border', 'bew-extras' ),
				'selector'      => '{{WRAPPER}} #payment .form-row.place-order #place_order:hover',
			]
		);

        $this->add_control(
            'woo_checkout_pm_btn_border_hover_transition',
            [
                'label' 	=> __( 'Transition Duration', 'bew-extras' ),
                'type' 		=> Controls_Manager::SLIDER,
                'range' 	=> [
                    'px' 	=> [
                        'max' 	=> 3,
                        'step' 	=> 0.1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} #payment .form-row.place-order #place_order:hover' => 'transition-duration: {{SIZE}}s',
                ],
            ]
        );

		$this->end_controls_tab();
		$this->end_controls_tabs();
		$this->end_controls_section();
		
		//section footer style
		$this->start_controls_section(
			'woo_checkout_payment_footer_style',
			[
				'label' => __( 'Terms and Conditions', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_payment_footer_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .form-row.place-order .woocommerce-terms-and-conditions-wrapper',
			]
		);

		$this->add_control(
			'woo_checkout_pm_footer_content_color',
			[
				'label'     => __( 'Background Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .form-row.place-order' => 'background-color: {{VALUE}}',
				],
			]
		);
		$this->add_control(
			'woo_checkout_pm_footer_content_text_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .form-row.place-order .woocommerce-terms-and-conditions-wrapper' => 'color: {{VALUE}}',
					'{{WRAPPER}} .form-row.place-order .woocommerce-terms-and-conditions-wrapper a' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_pm_footer_padding',
			[
				'label'         => __( 'Padding', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} .form-row.place-order .woocommerce-terms-and-conditions-wrapper' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_pm_footert_margin',
			[
				'label'         => __( 'Margin', 'bew-extras' ),
				'type'          => Controls_Manager::DIMENSIONS,
				'size_units'    => [ 'px', '%' ],
				'selectors'     => [
					'{{WRAPPER}} .form-row.place-order .woocommerce-terms-and-conditions-wrapper' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}
		
	function bew_woocommerce_checkout_payment() {
		
		$settings = $this->get_settings_for_display();
		
		$payment_order_button_show = $settings['woo_checkout_order_button_show'];
		$payment_order_button_text = $settings['woo_checkout_order_button_text'];
		$payment_methods_layout    = $settings['woo_checkout_payment_methods_layout'];
		$policy_position 		   = $settings['woo_checkout_privacy_policy_position'];	
				
		if ( Elementor\Plugin::instance()->editor->is_edit_mode() ) {
			update_option( '_payment_order_button', $payment_order_button_show );
			update_option( '_payment_order_button_text', $payment_order_button_text );
			update_option( '_payment_order_policy_position', $policy_position );
			update_option( '_payment_order_methods_layout', $payment_methods_layout );
		}
		
        if ( WC()->cart->needs_payment() ) {
            $available_gateways = WC()->payment_gateways()->get_available_payment_gateways();
            WC()->payment_gateways()->set_current_gateway( $available_gateways );
        } else {
            $available_gateways = array();
        }

        wc_get_template(
            'checkout/payment.php',
            array(
                'checkout'           => WC()->checkout(),
                'available_gateways' => $available_gateways,
				'payment_methods_layout' => $payment_methods_layout,
				'order_button_show'  => $payment_order_button_show,
                'order_button_text'  => apply_filters( 'woocommerce_order_button_text', __( $payment_order_button_text, 'woocommerce' ) ),	
            )
        );
    }

	function bew_review_form_block($name, $fill, $target, $content = '') {
		$settings = $this->get_settings_for_display();
		
		$payment_methods_form_change_text   = $settings['woo_checkout_payment_change'];
		
		?>
		<div class="bew-formReview-block">
			<div class="bew-formReview-title">
				<?php echo esc_html_x($name, 'Title in checkout steps form review.', 'bew-extras') ?>
			</div>
			<div class="bew-formReview-content" data-fill="<?php esc_attr_e($fill) ?>">
				<?php echo $content; ?>
			</div>
			<div class="bew-formReview-action">
				<a href="#" data-target="<?php esc_attr_e($target) ?>"><?php echo esc_html_x($payment_methods_form_change_text, 'Action to take in checkout steps form review', 'bew-extras') ?></a>
			</div>
		</div>
		<?php
	}

	protected function render() {
		if ( ( is_checkout() && !empty( is_wc_endpoint_url('order-received') ) ) ) return;
			
			$settings = $this->get_settings_for_display();
			
			$checkout_payment_steps   	 		= $settings['woo_checkout_payment_steps'];			
			$payment_title_show 				= $settings['woo_checkout_payment_title_show'];
			$payment_title_tag 					= Utils::validate_html_tag( $settings['woo_checkout_payment_title_tag'] );
			$payment_section_title_text 		= $settings['woo_checkout_payment_section_title_text'];			
			$payment_order_button_show 			= $settings['woo_checkout_order_button_show'];
			$payment_order_button_text 			= $settings['woo_checkout_order_button_text'];
		    $payment_description_show       	= $settings['woo_checkout_payment_description_show'];			
			$payment_description_text   		= $settings['woo_checkout_payment_description_text'];
			$payment_methods_layout         	= $settings['woo_checkout_payment_methods_layout'];	
			$payment_methods_form_review    	= $settings['woo_checkout_payment_form_review'];
			$payment_methods_form_contact_text  = $settings['woo_checkout_payment_contact'];
			$payment_methods_form_ship_text  	= $settings['woo_checkout_payment_ship'];
			$payment_methods_form_bill_text  	= $settings['woo_checkout_payment_bill'];
			$payment_methods_form_method_text  	= $settings['woo_checkout_payment_method'];
						
			// Get shipping first option, ship_to_different_address checked 
			$ship_to_different_address = get_option( '_bew_ship_to_different_address' );
			
			// Check if shipping methods are added
			$shipping_needed = WC()->cart->needs_shipping();
		
			// Save page Id for elementor editor on custom templates
			if( Elementor\Plugin::instance()->editor->is_edit_mode() ) {
				global $post;
				$post_id = $post->ID;
				update_option( '_bew_checkout_id', $post_id );									
			}
			
			?>
			<div class="bew-payment-methods">
				<?php 
				if($payment_methods_form_review == "yes"){ ?>
					<div class="bew-formReview">
						<?php
							$this->bew_review_form_block(esc_html_x($payment_methods_form_contact_text, 'Title in checkout steps form review.', 'bew-extras'), 'email', 'step-information');
							if( $ship_to_different_address == 'yes' ){							
								if( $shipping_needed ){
									$this->bew_review_form_block(esc_html_x($payment_methods_form_ship_text , 'Title in checkout steps form review.', 'bew-extras'), 'address_ship', 'step-information');
								}
							}
							else {
								$this->bew_review_form_block(esc_html_x($payment_methods_form_bill_text, 'Title in checkout steps form review.', 'bew-extras'), 'address_bill', 'step-information');
								if( $shipping_needed ){
									$this->bew_review_form_block(esc_html_x($payment_methods_form_ship_text, 'Title in checkout steps form review.', 'bew-extras'), 'address_ship', 'step-shipping-option');
								}
								
							}

							if( $shipping_needed ){
								$this->bew_review_form_block(esc_html_x($payment_methods_form_method_text, 'Title in checkout steps form review.', 'bew-extras'), 'method', 'step-shipping-option');
							}
						?>
					</div>
				<?php
				}
				?>
					<div class="bew-components-checkout-step bew-checkout-steps-<?php echo $checkout_payment_steps; ?>">
						<?php if( 'yes' == $payment_title_show ){ ?>
							<div class="bew-checkout-step-heading">
							<<?php echo esc_attr( $payment_title_tag ); ?> class="bew-checkout-step-title  bew-payment-title"><?php echo esc_html( $payment_section_title_text ); ?></<?php echo esc_attr( $payment_title_tag ); ?>>
							</div>
						<?php } ?>
						
						<div class="bew-checkout-step-container bew-payment">
							<?php
							if('yes' == $payment_description_show ){
							?>			
								<p class="bew-components-checkout-step__description"><?php echo esc_html( $payment_description_text ); ?></p>
							<?php
							}
							?>
						
							<div class="bew-components-checkout-step__content <?php echo esc_html( $payment_methods_layout ); ?>">					
								<?php
								if ( Elementor\Plugin::instance()->editor->is_edit_mode() ) {           
										$this->bew_woocommerce_checkout_payment();         
								}else{
									if( is_checkout() ){               
										$this->bew_woocommerce_checkout_payment();              
									}
								}
								?>					
							</div>
						</div>
					</div>
				
			</div>
			<?php
			
	}

	protected function _content_template() {
		
	}
	
}
