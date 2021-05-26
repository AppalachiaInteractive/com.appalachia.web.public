<?php
namespace BriefcasewpExtras\Modules\BewScroll;

use Elementor;
use Elementor\Plugin;
use Elementor\Controls_Manager;
use Elementor\Controls_Stack;
use BriefcasewpExtras\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class Module extends Module_Base {

	public function __construct() {
		parent::__construct();

		$this->add_actions();
	}

	public function get_name() {
		return 'bew-scroll';
	}

	public function register_controls( Controls_Stack $element ) {
		$element->start_controls_section(
			'section_bew_scroll',
			[
				'label' => __( 'Bew Scroll', 'briefcase-extras' ),
				'tab' => Controls_Manager::TAB_ADVANCED,				
			]
		);

		$element->add_control(
			'bew_scroll',
			[
				'label' => __( 'Scrolling Effects', 'briefcase-extras' ),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'On', 'briefcase-extras' ),
				'label_off' => __( 'Off', 'briefcase-extras' ),
				'return_value' => 'yes',
				'default' => '',
				'frontend_available' => true,
				'prefix_class'  => 'bew-scroll-'
			]
		);
		
		$element->add_control(
			'bew_scroll_bg',
			[
				'label' => __( 'Change Background', 'briefcase-extras' ),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'On', 'briefcase-extras' ),
				'label_off' => __( 'Off', 'briefcase-extras' ),
				'return_value' => 'yes',
				'default' => '',
				'frontend_available' => true,
				'condition' => [
					'bew_scroll' => 'yes',					
				],
				'prefix_class'  => 'bew-scroll-background-'
			]
		);
		
		$element->add_control(
			'bew_section_bg_color',
			[
				'label' 		=> __( 'Background Color', 'briefcase-elementor-widgets' ),
				'type' 			=> Controls_Manager::COLOR,				
				'frontend_available' => true,
				'condition' => [
					'bew_scroll' => 'yes',
					'bew_scroll_bg' => 'yes',
				],
				
			]
		);
		
		$element->end_controls_section();
	}

	private function add_actions() {
				
		add_action( 'elementor/element/column/section_custom_css/before_section_start', [ $this, 'register_controls' ] );	
		add_action( 'elementor/element/section/section_advanced/after_section_end', [ $this, 'register_controls' ] );		
		//add_action( 'elementor/frontend/column/after_render', [ $this, 'after_render_bew_mobile_first'], 10, 1 );
		//add_action( 'elementor/frontend/section/after_render', [ $this, 'after_render_bew_mobile_first'], 10, 1 );
		//add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		
	}
	
	public function after_render_bew_scroll($element) {
					
	}
		
	public function enqueue_styles() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
						
		wp_enqueue_style(

		);
		
	}
		
	public function enqueue_scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		wp_enqueue_script(
	
		);
	}
	
	
}
