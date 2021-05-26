<?php
namespace BriefcasewpExtras\Modules\WooAccount;

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
		return 'woo-account';
	}

	public function get_widgets() {
		return [
			'Woo_Dashboard',
			'Woo_Downloads',
			'Woo_Extra_Endpoint',
			'Woo_Edit_Account',
			'Woo_Edit_Address',
			'Woo_Login',
			'Woo_Logout',
			'Woo_Register',
			'Woo_Orders',
			'Woo_Navigation',
			'Woo_Content',
		];
	}
	
	public function register_controls( $element, $section_id, $args ) {
		if ( 'section' === $element->get_name() && 'section_structure' == $section_id ) {
			
			global $post;
			$post_type = get_post_type($post->ID);
			$bew_template_type = get_post_meta($post->ID, 'briefcase_template_layout', true);

			if( (is_account_page()) || (($post_type == 'elementor_library') && ( $bew_template_type == 'woo-account')) ){			
									
				$element->start_controls_section(
					'section_bew_account',
					[
						'label' => __( 'Bew Account', 'bew-extras' ),
						'tab' => Controls_Manager::TAB_LAYOUT,				
					]
				);

				$element->add_control(
					'bew_account',
					[
						'label'	=> __( 'Enable Account', 'bew-extras' ),
						'type' => Controls_Manager::SWITCHER,
						'label_on' => __( 'On', 'bew-extras' ),
						'label_off' => __( 'Off', 'bew-extras' ),
						'return_value' => 'yes',
						'default' => '',
						'frontend_available' => true,
						'prefix_class' => 'bew-account-',
						'description'	=> __( 'Enable Bew Account page on this section', 'bew-extras' )
					]
				);
				
				$element->end_controls_section();
				
			}
		}
	}
	
	public function account_content(){
		
		$helper = new Helper();
		$bew_account_page_id = $helper->get_woo_account_template();
		if(!empty($bew_account_page_id)){
			
			echo Elementor\Plugin::instance()->frontend->get_builder_content( $bew_account_page_id );
			
		}
	}
	
	public function account_login(){
		
		$helper = new Helper();
		$bew_login_page_id = $helper->get_woo_login_template();
		if(!empty($bew_login_page_id)){
			
			echo Elementor\Plugin::instance()->frontend->get_builder_content( $bew_login_page_id );
			
		}
	}
	
	function bew_account_skeleton(){		

	}
	
	private function add_actions() {
				
		add_action( 'elementor/element/after_section_end', [ $this, 'register_controls' ], 10, 3  );
		
		add_action( 'bew_account_content', array($this,'account_content') );
		add_action( 'bew_login_content', array($this,'account_login') );
	}
			
	public function __construct() {
		parent::__construct();
		
		$this->add_actions();
		
		//require_once BEW_EXTRAS_PATH . 'modules/woo-account/classes/bew-woo-account.php';	
		
	
	}
	
}
