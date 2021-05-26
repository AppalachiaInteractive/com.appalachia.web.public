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
use Briefcase\Helper;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Woo_Checkout_Form_Shipping extends Base_Widget {

	public function get_name() {
		return 'woo-checkout-form-shipping';
	}

	public function get_title() {
		return __( 'Checkout Form Shipping', 'bew-extras' );
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
			'woo_checkout_shipping_title',
			[
				'label' => __( 'Section Title', 'bew-extras' ),
				'tab' 	=> Controls_Manager::TAB_CONTENT,
			]
		);
				
		$this->add_control(
			'woo_checkout_shipping_steps',
			[
				'label'         => __( 'Checkout Steps', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'On', 'briefcase-extras' ),
				'label_off'     => __( 'Off', 'briefcase-extras' ),
				'return_value'  => 'active',
				'default'       => 'active',
			]
		);

		$this->add_control(
			'woo_checkout_shipping_vertical_line',
			[
				'label'         => __( 'Vertical Line', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				   'label_on'      => __( 'Show', 'bew-extras' ),
				   'label_off'     => __( 'Hide', 'bew-extras' ),
				'return_value'  => 'yes',
				'default'       => 'yes',
				'condition' => [
					   'woo_checkout_shipping_steps' => 'active'
				],
				'prefix_class' => 'steps-vertical-line-',
			]
		);
		
		$this->add_control(
            'woo_checkout_shipping_title_show',
            [
                'label'         => __( 'Title', 'bew-extras' ),
                'type'          => Controls_Manager::SWITCHER,
                'label_on'      => __( 'Show', 'elementor' ),
                'label_off'     => __( 'Hide', 'elementor' ),
                'return_value'  => 'yes',
                'default'       => 'yes',
            ]
        );
		
		$this->add_control(
		    'woo_checkout_shipping_title_text',
		    [
		        'label' 		=> __( 'Text', 'woocommerce' ),
		        'type' 			=> Controls_Manager::TEXT,
		        'default' 		=> __( 'Shipping Address', 'woocommerce' ),
                'condition' 	=> [
                    'woo_checkout_shipping_title_show' => 'yes'
                ],
				'label_block'   => true,
		        'dynamic' 		=> [
		            'active' 	=> true,
		        ]
		    ]
		);

		$this->add_control(
			'woo_checkout_shipping_title_tag',
			[
				'label' 	=> __( 'HTML Tag', 'elementor' ),
				'type' 		=> Controls_Manager::SELECT,
				'default' 	=> 'h2',
				'options' 	=> [
					'h1'  => __( 'H1', 'bew-extras' ),
					'h2'  => __( 'H2', 'bew-extras' ),
					'h3'  => __( 'H3', 'bew-extras' ),
					'h4'  => __( 'H4', 'bew-extras' ),
					'h5'  => __( 'H5', 'bew-extras' ),
					'h6'  => __( 'H6', 'bew-extras' ),
				],
                'condition' => [
                    'woo_checkout_shipping_title_show' => 'yes'
                ],
			]
		);
		
		$this->add_control(
			'woo_checkout_shipping_description_show',
			[
				'label'         => __( 'Show/Hide Description', 'briefcase-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'Show', 'briefcase-extras' ),
				'label_off'     => __( 'Hide', 'briefcase-extras' ),
				'return_value'  => 'yes',
				'default'       => 'yes',
			]
		);
		
		$this->add_control(
			'woo_checkout_shipping_description_text',
			[
				'label' 		=> __( 'Text', 'briefcase-extras' ),
				'type' 			=> Controls_Manager::TEXT,
				'default' 		=> __( "Enter the physical address where you want us to deliver your order.", 'briefcase-extras' ) ,
				'condition' 	=> [
					'woo_checkout_shipping_description_show' => 'yes'
				],
				'label_block'   => true,
				'dynamic' 		=> [
					'active' 	=> true,
				]
			]
		);

		$this->add_control(
            'woo_checkout_shipping_title_alignment',
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
                    'woo_checkout_shipping_title_show' => 'yes'
                ],
                'selectors' => [
                    '{{WRAPPER}} .bew-shipping-title' => 'text-align: {{VALUE}};',
                ],
            ]
        );

		$this->end_controls_section();

		$this->start_controls_section(
			'woo_checkout_content_section',
			[
				'label' => __( 'Shipping Fields', 'bew-extras' ),
				'tab' 	=> Controls_Manager::TAB_CONTENT,
			]
		);
		
		$this->add_control(
			'heading_woo_checkout_default_checked',
			[
				'label' => __( 'Ship to Different Address', 'bew-extras' ),
				'type' => Controls_Manager::HEADING,
			]
		);

		$this->add_control(
			'woo_checkout_default_checked_show',
			[
				'label'	 	=> __( 'Show Checkbox', 'bew-extras' ),
				'type' 		=> Controls_Manager::SWITCHER,
				'label_on' 	=> __( 'Yes', 'elementor' ),
				'label_off' => __( 'No', 'elementor' ),
				'return_value' 	=> 'yes',
				'default' 		=> 'yes',
			]
		);
		
		$this->add_control(
			'woo_checkout_default_checked',
			[
				'label'	 	=> __( 'Default Checked', 'bew-extras' ),
				'type' 		=> Controls_Manager::SWITCHER,
				'label_on' 	=> __( 'Yes', 'elementor' ),
				'label_off' => __( 'No', 'elementor' ),
				'return_value' 	=> 'yes',
				'default' 		=> '',
			]
		);
		
		$this->add_control(
            'woo_checkout_shipping_toggle_caption',
            [
                'label' 		=> __( 'Toggle Caption', 'bew-extras' ),
                'type' 			=> Controls_Manager::TEXT,
                'default' 		=> __( 'Ship to a different address?', 'woocommerce' ),
                'separator' 	=> 'after',
				'label_block'   => true,
                'dynamic' 		=> [
                    'active' 	=> true,
                ]
            ]
        );
		
		$this->add_control(
			'heading_woo_checkout_default_checkedb',
			[
				'label' => __( 'Use Address for Billing', 'bew-extras' ),
				'type' => Controls_Manager::HEADING,
			]
		);
		
		$this->add_control(
			'woo_checkout_default_checkedb_show',
			[
				'label'	 	=> __( 'Show Checkbox', 'bew-extras' ),
				'type' 		=> Controls_Manager::SWITCHER,
				'label_on' 	=> __( 'Yes', 'elementor' ),
				'label_off' => __( 'No', 'elementor' ),
				'return_value' 	=> 'yes',
				'default' 		=> 'yes',
			]
		);		
		
		$this->add_control(
			'woo_checkout_default_checkedb',
			[
				'label'	 	=> __( 'Default Checked', 'bew-extras' ),
				'type' 		=> Controls_Manager::SWITCHER,
				'label_on' 	=> __( 'Yes', 'elementor' ),
				'label_off' => __( 'No', 'elementor' ),
				'return_value' 	=> 'yes',
				'default' 		=> 'yes',
			]
		);
		
		if ( ( false === WC()->cart->needs_shipping_address() ) && ! Elementor\Plugin::instance()->editor->is_edit_mode() ) {
			$this->add_control(
				'woo_checkout_dont_need_shipping',
				[
					'label'	 	=> __( 'Dont Need Shipping', 'bew-extras' ),
					'type' 		=> Controls_Manager::SWITCHER,
					'label_on' 	=> __( 'Yes', 'elementor' ),
					'label_off' => __( 'No', 'elementor' ),
					'return_value' 	=> 'yes',
					'default' 		=> 'yes',
					'prefix_class' => 'dont-need-shipping-',
				]
			);			
		}
		
		$this->add_control(
			'woo_checkout_default_checkedb',
			[
				'label'	 	=> __( 'Default Checked', 'bew-extras' ),
				'type' 		=> Controls_Manager::SWITCHER,
				'label_on' 	=> __( 'Yes', 'elementor' ),
				'label_off' => __( 'No', 'elementor' ),
				'return_value' 	=> 'yes',
				'default' 		=> 'yes',
			]
		);
		
		$this->add_control(
            'woo_checkout_shipping_toggle_captionb',
            [
                'label' 		=> __( 'Toggle Caption', 'bew-extras' ),
                'type' 			=> Controls_Manager::TEXT,
                'default' 		=> __( 'Use same address for billing', 'woocommerce' ),
                'separator' 	=> 'after',
				'label_block'   => true,
                'dynamic' 		=> [
                    'active' 	=> true,
                ]
            ]
        );
		
		$this->add_control(
			'woo_checkout_shipping_field_editor',
			[
				'label'	 	=> __( 'Field Editor', 'bew-extras' ),
				'type' 		=> Controls_Manager::SWITCHER,
				'label_on' 	=> __( 'Yes', 'elementor' ),
				'label_off' => __( 'No', 'elementor' ),
				'return_value' 	=> 'yes',
				'default' 		=> 'yes',
			]
		);

		$this->add_control(
			'woo_checkout_billing_field_edito_notice',
			[
				'raw' => __( 'IMPORTANT: To apply all changes from fields editor, save and reload this template.', 'bew-extras' ),
				'type' => Controls_Manager::RAW_HTML,
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-warning',
				'condition' => [
					'woo_checkout_shipping_field_editor' => 'yes',
				],
			]
		);

		$repeater = new Repeater();

		$repeater->add_control(
			'shipping_input_label', 
			[
				'label' 	=> __( 'Input Label', 'woocommerce' ),
				'type' 		=> Controls_Manager::TEXT,
				'default' 	=> __( 'New Section' , 'woocommerce' ),
				'label_block' 	=> true,
			]
		);
		
		$repeater->add_control(
			'shipping_input_label_hide',
			[
				'label'         => __( 'Hide Label', 'briefcase-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'Yes', 'briefcase-extras' ),
				'label_off'     => __( 'No', 'briefcase-extras' ),
				'return_value'  => 'yes',
				'default'       => '',			
			]
		);	
			
		$repeater->add_control(
			'shipping_input_label_layout',
			[
				'label'         => __( 'Inside Layout', 'briefcase-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'yes', 'briefcase-extras' ),
				'label_off'     => __( 'no', 'briefcase-extras' ),
				'return_value'  => 'yes',
				'default'       => 'yes',
				'separator' => 'after',
			]
		);	

		$repeater->add_control(
			'shipping_input_class', 
			[
				'label' 	=> __( 'Class Name', 'bew-extras' ),
				'type' 		=> Controls_Manager::SELECT,
				'default' 	=> 'form-row-wide',
				'options' 	=> [
					'form-row-first' 	=> 'form-row-first',
					'form-row-last' 	=> 'form-row-last',
					'form-row-wide' 	=> 'form-row-wide',
				],
			]
		);

		$repeater->add_control(
			'shipping_input_field_key_custom', 
			[
				'label' => esc_html__( 'Custom Key', 'bew-extras' ),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__( 'customkey' , 'bew-extras' ),
				'label_block' => true,
				'condition'=>[
					'shipping_input_name'=>'shipping_custom_field',
				],
			]
		);
	
		$repeater->add_control(
			'shipping_input_type', 
			[
				'label' 	=> __( 'Input Type', 'bew-extras' ),
				'type' 		=> Controls_Manager::SELECT2,
				'default' 	=> 'text',
				'options' 	=> [
					'textarea'			=> __( 'Textarea', 'bew-extras' ),
					'checkbox'			=> __( 'Checkbox', 'bew-extras' ),
					'text'				=> __( 'Text', 'bew-extras' ),
					'password'			=> __( 'Password', 'bew-extras' ),
					'date'				=> __( 'Date', 'bew-extras' ),
					'number'			=> __( 'Number', 'bew-extras' ),
					'email'				=> __( 'Email', 'bew-extras' ),
					'url'				=> __( 'Url', 'bew-extras' ),
					'tel'				=> __( 'Tel', 'bew-extras' ),
					'select'			=> __( 'Select', 'bew-extras' ),
					'radio'				=> __( 'Radio', 'bew-extras' ),
				],
			]
		);

		$repeater->add_control(
			'shipping_input_options', 
			[
				'label' 	=> __( 'Options', 'bew-extras' ),
				'type' 		=> Controls_Manager::TEXTAREA,
				'default' 	=> implode( PHP_EOL, [ __( 'Option 1', 'bew-extras' ), __( 'Option 2', 'bew-extras' ), __( 'Option 3', 'bew-extras' ) ] ),
				'label_block' 	=> true,
				'conditions' 	=> [
					'relation' 	=> 'or',
					'terms' 	=> [
						[
							'name' 		=> 'shipping_input_type',
							'operator' 	=> '==',
							'value' 	=> 'select',
						],
						[
							'name' 		=> 'shipping_input_type',
							'operator' 	=> '==',
							'value' 	=> 'radio',
						],
					],
				],
			]
		);

		$repeater->add_control(
			'shipping_input_name', 
			[
				'label' 		=> __( 'Field Name', 'bew-extras' ),
				'type' => Controls_Manager::SELECT,
				'options' => $this->bew_checkout_fields_name( 'shipping' ),
				'default' => '',
				'label_block' 	=> true,
			]
		);

		$repeater->add_control(
			'shipping_input_placeholder', 
			[
				'label' 		=> __( 'Placeholder', 'bew-extras' ),
				'type' 			=> Controls_Manager::TEXT,
				'default' 		=> __( 'Placeholder' , 'bew-extras' ),
				'label_block' 	=> true,
			]
		);

		$repeater->add_control(
			'shipping_input_autocomplete', 
			[
				'label' 		=> __( 'Autocomplete Value', 'bew-extras' ),
				'type' 			=> Controls_Manager::TEXT,
				'default' 		=> __( 'Given value' , 'bew-extras' ),
				'label_block' 	=> true,
			]
		);

		$repeater->add_control(
			'shipping_input_required',
			[
				'label'         => __( 'Required', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'yes', 'bew-extras' ),
				'label_off'     => __( 'no', 'bew-extras' ),
				'return_value'  => true,
				'default'       => true,
			]
		);

		$repeater->add_control(
			'shipping_input_hide',
			[
				'label'         => __( 'Hide Field', 'briefcase-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => __( 'yes', 'briefcase-extras' ),
				'label_off'     => __( 'no', 'briefcase-extras' ),
				'return_value'  => 'yes',
				'default'       => '',
				'condition' 	=> [
					'shipping_input_name' => ['shipping_country','shipping_state'],
				],
			]
		);

		$repeater->add_control(
			'shipping_input_show_email',
			[
				'label'         => esc_html__( 'Show in Email', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => esc_html__( 'Yes', 'bew-extras' ),
				'label_off'     => esc_html__( 'No', 'bew-extras' ),
				'return_value'  => true,
				'default'       => '',
				'condition'=>[
					'shipping_input_name' => 'shipping_custom_field',
				],
			]
		);

		$repeater->add_control(
			'shipping_input_show_order',
			[
				'label'         => esc_html__( 'Show in Order Detail Page', 'bew-extras' ),
				'type'          => Controls_Manager::SWITCHER,
				'label_on'      => esc_html__( 'Yes', 'bew-extras' ),
				'label_off'     => esc_html__( 'No', 'bew-extras' ),
				'return_value'  => true,
				'default'       => '',
				'condition'=>[
					'shipping_input_name' => 'shipping_custom_field',
				],
			]
		);

		$this->add_control(
			'woo_checkout_shipping_form_items',
			[
				'label' 		=> __( '', 'bew-extras' ),
				'type' 			=> Controls_Manager::REPEATER,
				'fields' 		=> $repeater->get_controls(),
				'default' 		=> $this->bew_checkout_fields( 'shipping' ),
				'title_field' 	=> '{{{ shipping_input_label }}}',
				'condition'=>[
					'woo_checkout_shipping_field_editor'=>'yes',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'woo_checkout_shipping_error_section',
			[
				'label' => __( 'Error', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);
		
		$this->add_control(
			'woo_checkout_shipping_error_required_text',
			[
				'label' 		=> __( ' Required Error Text', 'bew-extras' ),
				'type' 			=> Controls_Manager::TEXT,
				'default' 		=> __( 'This information is required.', 'bew-extras' ),					
				'label_block'   => true,
				'dynamic' 		=> [
					'active' 	=> true,
				]
			]
		);

		$this->add_control(
			'woo_checkout_shipping_error_validation_text',
			[
				'label' 		=> __( 'Validation Error Text', 'bew-extras' ),
				'type' 			=> Controls_Manager::TEXT,
				'default' 		=> __( 'This information is not a valid', 'bew-extras' ),					
				'label_block'   => true,
				'dynamic' 		=> [
					'active' 	=> true,
				]
			]
		);
				
		$this->end_controls_section();
	
		//Section general style
		$this->start_controls_section(
			'woo_checkout_shipping_general_style',
			[
				'label' => __( 'General', 'bew-extras' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'woo_checkout_shipping_general_padding',
			[
				'label' => __( 'Padding', 'briefcase-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}}.elementor-widget-woo-checkout-form-shipping .bew-components-checkout-step' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'woo_checkout_shipping_general_margin',
			[
				'label' => __( 'Margin', 'briefcase-extras' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}}.elementor-widget-woo-checkout-form-shipping .bew-components-checkout-step' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();	

		//Section title style
		$this->start_controls_section(
			'woo_checkout_shipping_title_style',
			[
				'label' 	=> __( 'Title', 'bew-extras' ),
				'tab' 		=> Controls_Manager::TAB_STYLE,
                'condition' => [
                    'woo_checkout_shipping_title_show' => 'yes'
                ],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_shipping_title_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-shipping-title',
			]
		);

		$this->end_controls_section();

		//Checkbox		
		$this->start_controls_section(
			'woo_checkout_shipping_toggle',
			[
				'label' => __( 'Checkbox', 'bew-extras' ),
				'tab' 	=> Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_shipping_toggle_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-components-checkout-step .shipping-checkbox-area-b .shipping-checkbox-input-b[type=checkbox]+.shipping-checkbox-caption, 
				                {{WRAPPER}} .bew-components-checkout-step .shipping-checkbox-area .shipping-checkbox-input[type=checkbox]+.shipping-checkbox-caption',
			]
		);

		$this->add_control(
			'woo_checkout_shipping_toggle_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .shipping-checkbox-caption' => 'color: {{VALUE}} !important',
				],
			]
		);
		
		$this->add_control(
			'woo_checkout_shipping_toggle_size',
			[
				'label' 		=> __( 'Checkbox Size', 'bew-extras' ),
				'type' 			=> Controls_Manager::SLIDER,
				'size_units' 	=> [ 'px', '%' ],
				'range' => [
					'px' => [
						'min' 	=> 10,
						'max' 	=> 100,
						'step' 	=> 1,
					],
					'%' => [
						'min' => 0,
						'max' => 100,
					],
				],				
				'selectors' => [
					'{{WRAPPER}} .shipping-checkbox-area .shipping-checkbox-input[type=checkbox]:checked:before , {{WRAPPER}} .bew-shipping .shipping-checkbox-input-b[type=checkbox]:checked:before' => 'font-size: {{SIZE}}{{UNIT}};',
				],
			]
		);
		
		$this->add_control(
			'woo_checkout_shipping_checkbox_color',
			[
				'label'     => __( 'Checkbox Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
								'{{WRAPPER}} .shipping-checkbox-area .shipping-checkbox-input[type=checkbox]:checked:before , {{WRAPPER}} .bew-shipping .shipping-checkbox-input-b[type=checkbox]:checked:before' => 'color: {{VALUE}} !important',
				],
			]
		);

		$this->add_control(
			'woo_checkout_shipping_checkbox_background_color',
			[
				'label'     => __( 'Checkbox Background Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
								'{{WRAPPER}} .shipping-checkbox-area .shipping-checkbox-input[type=checkbox]:checked , {{WRAPPER}} .bew-shipping .shipping-checkbox-input-b[type=checkbox]:checked' => 'background-color: {{VALUE}} !important',
				],
			]
		);

        $this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' 		=> 'woo_checkout_shipping_checkbox_border',
				'label' 	=> __( 'Border', 'bew-extras' ),
				'separator' => 'before',
				'selector' 	=> '{{WRAPPER}} .bew-components-checkout-step .shipping-checkbox-area-b .shipping-checkbox-input-b[type=checkbox] , {{WRAPPER}} .bew-components-checkout-step .shipping-checkbox-area .shipping-checkbox-input[type=checkbox]',
			]
		);

        $this->add_control(
			'woo_checkout_shipping_checkbox_border_radius',
			[
				'label' => __( 'Border Radius', 'bew-extras' ),
				'type' 	=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%', 'em' ],
				'selectors' 	=> [
					'{{WRAPPER}} .shipping-checkbox-area .shipping-checkbox-input[type=checkbox] , {{WRAPPER}} .bew-shipping .shipping-checkbox-input-b[type=checkbox]' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
				],
			]
		);

		$this->add_control(
			'woo_checkout_shipping_checkbox_padding',
			[
				'label' => __( 'Padding', 'bew-extras' ),
				'type' 	=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%', 'em' ],
				'selectors' 	=> [
					'{{WRAPPER}} .shipping-checkbox-area .shipping-checkbox-input[type=checkbox] , {{WRAPPER}} .bew-shipping .shipping-checkbox-input-b[type=checkbox]:checked' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important;',
				],
			]
		);
		
		$this->end_controls_section();

		/**
		 * Input Label Color
		 */
		$this->start_controls_section(
			'woo_checkout_shipping_style',
			[
				'label' => __( 'Labels', 'bew-extras' ),
				'tab' 	=> Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_shipping_label_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content label',
			]
		);


        $this->add_control(
			'woo_checkout_shipping_label_color',
			[
				'label'     => __( 'Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content label' => 'color: {{VALUE}}',
				],
			]
		);

        $this->add_control(
        	'woo_checkout_shipping_label_padding',
        	[
        		'label' => __( 'Padding', 'bew-extras' ),
        		'type' 	=> Controls_Manager::DIMENSIONS,
        		'size_units' 	=> [ 'px', '%', 'em' ],
        		'selectors' 	=> [
        			'{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content label' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
        		],
        	]
        );

		$this->add_control(
			'woo_checkout_shipping_label_line_hight',
			[
				'label' 		=> __( 'Line Height', 'bew-extras' ),
				'type' 			=> Controls_Manager::SLIDER,
				'size_units' 	=> [ 'px', '%' ],
				'range' => [
					'px' => [
						'min' 	=> 20,
						'max' 	=> 100,
						'step' 	=> 1,
					],
					'%' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'default' 	=> [
					'unit' 	=> 'px',
					'size' 	=> 25,
				],
				'selectors' => [
					'{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content label' => 'line-height: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();

		/**
		 * Input Color
		 */
		$this->start_controls_section(
			'woo_checkout_shipping_input_style',
			[
				'label' => __( 'Input Fields', 'bew-extras' ),
				'tab' 	=> Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' 		=> 'woo_checkout_shipping_input_typography',
				'label' 	=> __( 'Typography', 'bew-extras' ),
				'selector' 	=> '{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content input, 
								{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content select,
								{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content .select2-selection,								
								{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content option,
								{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content textarea',
			]
		);

		$this->add_control(
			'woo_checkout_shipping_input_color',
			[
				'label'     => __( 'Input Text Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
								'{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content input, 
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content select,
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content .select2-selection .select2-selection__rendered,	
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content option,
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content. textarea' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'woo_checkout_shipping_input_background_color',
			[
				'label'     => __( 'Background Color', 'bew-extras' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
								'{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content input, 
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content select,
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content .select2-selection,	
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content option,
								 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content textarea' => 'background-color: {{VALUE}}',
				],
			]
		);

        $this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' 		=> 'woo_checkout_shipping_input_border',
				'label' 	=> __( 'Border', 'bew-extras' ),
				'separator' => 'before',
				'selector' 	=> '{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content input, 
								{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content select,
								{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content .select2-selection,
								{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content textarea',
			]
		);

        $this->add_control(
			'woo_checkout_shipping_input_border_radius',
			[
				'label' => __( 'Border Radius', 'bew-extras' ),
				'type' 	=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%', 'em' ],
				'selectors' 	=> [
					'{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content input, 
					 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content select,
					 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content .select2-selection,
					 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content textarea' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'woo_checkout_shipping_input_padding',
			[
				'label' => __( 'Padding', 'bew-extras' ),
				'type' 	=> Controls_Manager::DIMENSIONS,
				'size_units' 	=> [ 'px', '%', 'em' ],
				'selectors' 	=> [
					'{{WRAPPER}} .bew-shipping .bew-components-checkout-step__content input, 
					 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content select,
					 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content .select2-selection,
					 {{WRAPPER}} .bew-shipping .bew-components-checkout-step__content textarea' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();	
	}
	
	function bew_checkout_fields_name( $section = 'billing' ) {
		if( !function_exists( 'WC' ) ) return [];

		if ( is_admin() ) {
			WC()->session = new \WC_Session_Handler();
			WC()->session->init();
		}

		$get_fields = WC()->checkout->get_checkout_fields();
		
		$options = [];
				
		foreach ( $get_fields[ $section ] as $key => $field ) {
				$options[ $key ] = $field['label'];
		}
		
		$options[ 'shipping_phone' ] = 'Phone';						
		$options[ 'billing_custom_field'] = 'Custom';
		
		return $options;
	}	
		
	function bew_checkout_fields( $section = 'billing' ) {
		if( !function_exists( 'WC' ) ) return [];

		if ( is_admin() ) {
			WC()->session = new \WC_Session_Handler();
			WC()->session->init();
		}

		$get_fields = WC()->checkout->get_checkout_fields();

		$fields = [];
		foreach ( $get_fields[ $section ] as $key => $field ) {
			$fields[] = [
				"{$section}_input_label" 		=> $field['label'],
				"{$section}_input_name" 		=> $key,
				"{$section}_input_required" 	=> isset( $field['required'] ) ? $field['required'] : false,
				"{$section}_input_type" 		=> isset( $field['type'] ) ? $field['type'] : 'text',
				"{$section}_input_class" 		=> $field['class'] ,
				"{$section}_input_autocomplete" => isset( $field['autocomplete'] ) ? $field['autocomplete'] : '' ,
				"{$section}_input_placeholder"	=> isset( $field['placeholder'] ) ? $field['placeholder'] : '' ,
			];
		}

		return $fields;
	}

	protected function render() {
		if ( ( is_checkout() && !empty( is_wc_endpoint_url('order-received') ) ) ) return;
		
		$settings = $this->get_settings_for_display();
		
		//echo var_dump($this->bew_checkout_fields_name( 'shipping' ));
		//echo var_dump($this->bew_checkout_fields( 'shipping' ));
		
		$checkout_shipping_steps   = $settings['woo_checkout_shipping_steps'];
		$shipping_description_show = $settings['woo_checkout_shipping_description_show'];
		$shipping_description_text = $settings['woo_checkout_shipping_description_text'];		
		$shipping_form_items       = $settings['woo_checkout_shipping_form_items'];		
		$shipping_title_show       = $settings['woo_checkout_shipping_title_show'];
		$payment_title_tag	 	   = Utils::validate_html_tag( $settings['woo_checkout_shipping_title_tag'] );
		$shipping_title_text       = $settings['woo_checkout_shipping_title_text'];
		$shipping_toggle_caption   = $settings['woo_checkout_shipping_toggle_caption'];		
		$shipping_toggle_captionb  = $settings['woo_checkout_shipping_toggle_captionb'];
		$field_editor  	           = $settings['woo_checkout_shipping_field_editor'];	
		$error_required  	       = $settings['woo_checkout_shipping_error_required_text'];
		$error_validation  	       = $settings['woo_checkout_shipping_error_validation_text'];
				
		if ( ( true === WC()->cart->needs_shipping_address() ) || Elementor\Plugin::instance()->editor->is_edit_mode() ) {
			
			$default_checked_show      = $settings['woo_checkout_default_checked_show'];			
			$default_checked           = $settings['woo_checkout_default_checked'];			
			$default_checkedb          = $settings['woo_checkout_default_checkedb'];
			$default_checkedb_show     = $settings['woo_checkout_default_checkedb_show'];
			
		}else{
			$default_checked_show      = '';
			$default_checked           = '';			
			$default_checkedb          = '';
			$default_checkedb_show     = '';
		}
		
		$checked = $default_checked == 'yes' ? 'checked' : '';
		$checkedb = $default_checkedb == 'yes' ? 'checked' : '';
		
		//Save shipping first option, ship_to_different_address checked
		update_option( '_bew_ship_to_different_address', $default_checked );		
		
		if( $field_editor  == 'yes' ){
					
			$shipping_fields = [];
			foreach( $shipping_form_items as $item ) {
				
				$shipping_input_class = [];
				if (is_array( $item['shipping_input_class'] )){
					$shipping_input_class = $item['shipping_input_class'];			
				}else {	
					$shipping_input_class[] = $item['shipping_input_class'];
				}
				
				if ( ($item['shipping_input_name'] == 'shipping_first_name') || ($item['shipping_input_name'] == 'shipping_last_name') || ($item['shipping_input_name'] == 'shipping_company') || ($item['shipping_input_name'] == 'shipping_phone') ){	
					array_push($shipping_input_class, "label-inside-" . $item['shipping_input_label_layout'] . " label-hide-" . $item['shipping_input_label_hide']);
				}else{ 
					array_push($shipping_input_class, "address-field label-inside-" . $item['shipping_input_label_layout'] . " label-hide-" . $item['shipping_input_label_hide'] . " input-hide-" . $item['shipping_input_hide']);
				}

				$fkey = $item['shipping_input_name'];
				
				if( $item['shipping_input_name'] == 'shipping_custom_field' ){
					$fkey = 'shipping_'.$item['shipping_input_field_key_custom'];
				}
							
				$shipping_fields[ sanitize_text_field( $fkey ) ] = 
					[
						'label'			=> sanitize_text_field( __( $item['shipping_input_label'], 'woocommerce' )),
						'type'			=> $item['shipping_input_type'],
						'required'		=> $item['shipping_input_required'] == 'true' ? true : false,
						'class'			=> $shipping_input_class,
						'autocomplete'	=> sanitize_text_field( $item['shipping_input_autocomplete'] ), 
						'placeholder'	=> sanitize_text_field( $item['shipping_input_placeholder'] ), 
						'priority'		=> 10,
					];
					
					if( $item['shipping_input_name'] == 'shipping_custom_field' ){
						
							if ( isset( $item['shipping_input_options'] ) ) {
								//echo var_dump($item['shipping_input_options']);
								$options = explode( "\n", $item['shipping_input_options'] );
								//echo var_dump($options);
								$new_options = [];
								foreach ( $options as $option ) {
									$new_options[ strtolower( $option ) ] = $option;
								}							
							}
							
							//echo var_dump($new_options);
					
							$shipping_fields[$fkey]['custom']         = true;
							$shipping_fields[$fkey]['type']           = $item['shipping_input_type'];
							$shipping_fields[$fkey]['show_in_email']  = $item['shipping_input_show_email'];
							$shipping_fields[$fkey]['show_in_order']  = $item['shipping_input_show_order'];
							$shipping_fields[$fkey]['options']        = isset( $new_options ) ? $new_options : '';
					}
			
			}
					
			// Send Fields to regenerate				
			if( Elementor\Plugin::instance()->editor->is_edit_mode() ) {
				$_bew_checkout_fields = get_option( '_bew_checkout_fields', [] );
				if (is_array( $_bew_checkout_fields)){
					$_bew_checkout_fields['shipping'] = $shipping_fields;
					update_option( '_bew_checkout_fields', $_bew_checkout_fields );
				} else {
					update_option( '_bew_checkout_fields',  [] );
				}
				update_option( '_bew_checkout_fields_shipping', 'bew_fields_shipping');
			}
		
		}else{
			 delete_option( '_bew_checkout_fields_shipping' );
		}
		
		$helper = new Helper();
		
		?>
		<?php if ( ( true === WC()->cart->needs_shipping_address() ) || Elementor\Plugin::instance()->editor->is_edit_mode() ) : ?>
			<div class="bew-components-checkout-step bew-checkout-steps-<?php echo $checkout_shipping_steps; ?>">
				
					<?php if( 'yes' == $shipping_title_show ): ?>
						<div class="bew-checkout-step-heading">
						<<?php echo esc_attr( $payment_title_tag ); ?> class="bew-checkout-step-title bew-shipping-title"><?php echo esc_html( $shipping_title_text ); ?></<?php echo esc_attr( $payment_title_tag ); ?>>
						<div class="bew-woo-checkout">bew-woo-checkout</div>
						</div>
					<?php endif; ?>
				
				
				<p id="shipping-checkbox" class="shipping-checkbox-area <?php echo "ship-tda-" . $default_checked_show ?>">
					<label class="shipping-checkbox-label">
						<input id="shipping-checkbox-input" class="shipping-checkbox-input" type="checkbox" name="ship_to_different_address" value="1" <?php echo $checked; ?>> <span class="shipping-checkbox-caption"><?php echo esc_html( $shipping_toggle_caption ); ?></span>
					</label>
				</p>
				
				<div class="bew-checkout-step-container bew-shipping">
					<?php
					if('yes' == $shipping_description_show ){
					?>				
						<p class="bew-components-checkout-step__description"><?php echo esc_html( $shipping_description_text ); ?></p>
					<?php
					}
					?>
					<div class="bew-components-checkout-step__content">
					
					<?php
					if( $field_editor   == 'yes' ){
						
						foreach ( $shipping_fields as $key => $field ) {
							$helper->bew_woocommerce_form_field( $key, $field, WC()->checkout->get_value( $key ) );
						}
					}else{
						
						$fields = WC()->checkout->get_checkout_fields( 'shipping' );
                        foreach ( $fields as $key => $field ) {
                            woocommerce_form_field( $key, $field, WC()->checkout->get_value( $key ) );
                        }
						
					}
					
				?>
					</div>
					
					<?php if( 'yes' == $default_checkedb_show ): ?>
					<p id="shipping-checkbox-b" class="shipping-checkbox-area-b">
						<label class="shipping-checkbox-label">
							<input id="shipping-checkbox-input-b" class="shipping-checkbox-input-b" type="checkbox" name="use-address-for-billing" value="1" <?php echo $checkedb; ?>> <span class="shipping-checkbox-caption"><?php echo esc_html( $shipping_toggle_captionb ); ?></span>
						</label>
					</p>
					<?php endif; ?>
					
				</div>
			</div>
		<?php endif;
		
		// Enqueue checkout JS
		wp_localize_script( 'bew-checkout',
			'checkoutShipping',
			array(
				'default_checked'  => $default_checked,
				'default_checkedb' => $default_checkedb,
				'error_shipping_required'   => $error_required,
				'error_shipping_validation' => $error_validation,			
			) );

	}

	protected function _content_template() {
		
	}
	
}

