<?php
namespace BriefcasewpExtras\Modules\WooCheckout\Widgets;

use Elementor;
use Elementor\Plugin;
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

class Woo_Checkout_Multistep_Timeline extends Base_Widget {

	public function get_name() {
		return 'woo-checkout-multistep-timeline';
	}

	public function get_title() {
		return __( 'Checkout Multistep Timeline', 'bew-extras' );
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
		'woo_checkout_content_section',
		[
			'label' => __( 'Multistep Timeline', 'bew-extras' ),
			'tab' => Controls_Manager::TAB_CONTENT,
		]
	);
	
	$this->add_control(
		'woo_checkout_multistep_timeline_layout',
		[
			'label' 	=> __( 'Layout', 'bew-extras' ),
			'type' 		=> Controls_Manager::SELECT,
			'default' 	=> 'simple',
			'options' 	=> [
				'simple'  => __( 'Simple', 'bew-extras' ),
				'arrow'  => __( 'Arrow', 'bew-extras' ),
			],            
		]
	);
	
	$repeater = new Repeater();

	$repeater->add_control(
		'multistep_timeline_name', [
			'label' => __( 'Step name', 'bew-extras' ),
			'type' => Controls_Manager::TEXT,
			'default' => __( 'New Step' , 'bew-extras' ),
			'label_block' => true,			
		]
	);
	
	$repeater->add_control(
		'multistep_timeline_type', [
			'label' => __( 'Input Type', 'bew-extras' ),
			'type' => Controls_Manager::SELECT,
			'default' => 'login',
			'options' => [
				'cart'				=> __( 'Cart', 'bew-extras' ),
				'login'				=> __( 'Login', 'bew-extras' ),
				'information'		=> __( 'Information', 'bew-extras' ),
				'shipping'			=> __( 'Shipping', 'bew-extras' ),
				'payment'			=> __( 'Payment', 'bew-extras' ),
			],
		]
	);
	
	if ( ( false === WC()->cart->needs_shipping_address() ) && ! Elementor\Plugin::instance()->editor->is_edit_mode() ) {
		$this->add_control(
			'multistep_timeline_dont_need_shipping',
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
		'multistep_timeline_items',
		[
			'label' => __( '', 'bew-extras' ),
			'type' => Controls_Manager::REPEATER,
			'fields' => $repeater->get_controls(),
			'default' => [
					[
						'multistep_timeline_name' => __( 'Cart', 'bew-extras' ),
						'multistep_timeline_type' => 'login',
					],
					[
						'multistep_timeline_name' => __( 'Information', 'bew-extras' ),
						'multistep_timeline_type' => 'billing',
					],
					[
						'multistep_timeline_name' => __( 'Shipping', 'bew-extras' ),
						'multistep_timeline_type' => 'shipping',
					],
					[
						'multistep_timeline_name' => __( 'Payment', 'bew-extras' ),
						'multistep_timeline_type' => 'payment',
					],
				],
			'title_field' => '{{{ multistep_timeline_name }}}',
		]
	);

	$this->end_controls_section();

	}
		

	protected function render() {
		if ( ( is_checkout() && !empty( is_wc_endpoint_url('order-received') ) ) ) return;
		
		$settings = $this->get_settings_for_display();
		$form_timeline_items 	  = $settings['multistep_timeline_items'];
		$timeline_layout 	      = $settings['woo_checkout_multistep_timeline_layout'];
		
		$enable_login_reminder = 'yes' === $settings['multistep_timeline_enable_login_reminder'] ? true : false;
		$is_logged_in          = is_user_logged_in();
		$show_login_step       = ! $is_logged_in && $enable_login_reminder;
		
		$multistep_timeline_dont_need_shipping 	  = $settings['multistep_timeline_dont_need_shipping'];
		
		// Classes
		$classes 	= array( 'bew-woo-checkout-timeline');
						
				
		if ( 'arrow' == $timeline_layout) {
			$classes[]  = 'clr';		
		}		
						
		$classes = implode( ' ', $classes );
		
		// Vars.
		$i = 0;
		$step_count = 0;
			
		
		?>
		<div class="bew-multistep-timeline <?php echo esc_attr( $timeline_layout ); ?>">
			<ul id="bew-checkout-timeline" class="<?php echo esc_attr( $classes ); ?>">
	
				<?php
				foreach ( $form_timeline_items as $key => $item ) { 
				
					$step_name = sanitize_title($item['multistep_timeline_name']);
				
					if($step_name == 'login'){
						$login_active = ! $is_logged_in ? 'active' : '';
					}
					
					if($step_name == 'information'){
						$login_active_show = ! $show_login_step ? 'active' : '';						
					}
					
					if(($multistep_timeline_dont_need_shipping == 'yes') && ($step_name == 'shipping')){
						continue;
					}
					
					//if(($timeline_layout == 'arrow') && ($step_name == 'cart')){
					//	continue;
					//}
					
					?>
					<li id="timeline-<?php echo $step_count; ?>" data-step="<?php echo $step_count ?>" data-step-name="<?php echo esc_html_e($item['multistep_timeline_name'], 'bew-extras' ); ?>" class="timeline <?php echo $step_name; ?> <?php echo $step_name == 'login' ? $login_active : ''; ?> <?php echo $step_name == 'information' ? $login_active_show : ''; ?> ">
						<div class="timeline-wrapper">
							<span class="timeline-step"><?php echo $i = $i + 1 ?>.</span>
							<?php if($step_name == 'cart'){  ?>
							
							<a href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( $item['multistep_timeline_name'] , 'bew-extras' ); ?></a>
							<?php } else {  ?>
							<span class="timeline-label"><?php esc_html_e($item['multistep_timeline_name'], 'bew-extras' ) ; ?></span>
							 <?php } ?> 
						</div>
					</li>
				<?php
				$step_count++;
				}
				?>
			</ul>
		</div>
		<?php
		
		wp_localize_script( 'bew-checkout', 'checkouTimeline', array(
				'ajax_url'         		  => admin_url( 'admin-ajax.php' ),
				'is_logged_in'            => is_user_logged_in(),
				'login_reminder_enabled'  => $enable_login_reminder,
				'no_account_btn' 		  => esc_html__( 'I don&rsquo;t have an account', 'bew-extras' ),
			)
		);
		
	}

	protected function _content_template() {
		
	}
	
}

