<?php
namespace BriefcasewpExtras;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Importer
 *
 * Importer handles import of templates
 *
 * @since 1.0.0
 */
class Importer {


	/**
	 * Plugin page.
	 *
	 * Holds slug for plugin page.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var string
	 */
	private $importer_page = 'bew-templates';


	/**
	 * Tabs.
	 *
	 * Holds the settings page tabs, sections and fields.
	 *
	 * @access private
	 *
	 * @var array
	 */
	private $tabs;


	/**
	 * Get settings page title.
	 *
	 * Retrieve the title for the settings page.
	 *
	 * @since 1.0.0
	 * @access protected
	 *
	 * @return string Settings page title.
	 */
	protected function get_page_title() {
		/* translators: %s: Plugin name */
		return sprintf( esc_html__( 'Welcome to %s', 'bew-extras' ), esc_html( BEW_EXTRAS_NAME ) );
	}


	/**
	 * Get tabs.
	 *
	 * Retrieve the settings page tabs, sections and fields.
	 *
	 * @since 1.5.0
	 * @access public
	 *
	 * @return array Settings page tabs, sections and fields.
	 */
	public final function get_tabs() {
		return $this->tabs;
	}


	/**
	 * Plugin menu link.
	 *
	 * Adds link to admin menu under Wordpress menu
	 *
	 * Fired by `admin_menu` action.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function admin_pages() {
		/* translators: %s: Theme name */
		$temp = 'BriefcaseWp';
		
		add_menu_page(
            $temp,
			$temp,
            'manage_options',
            $this->importer_page,
			[ $this, 'display_import_page' ],
            BEW_EXTRAS_IMPORTER_ASSETS_URL . 'images/icon.png'
        );
		
	}

	/**
	 * Display import page.
	 *
	 * Output the content for the import page.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function display_import_page() {
		if( !bew_is_elementor_installed() ){
			$this->fail_elementor();
			return;
		}
		if( !bew_is_plugin_active() ){
			$this->fail_plugin_active();
			return;
		}

		wp_enqueue_script( 'bew-admin' );
		wp_enqueue_style( 'bew-admin' );
		$tabs = $this->get_tabs();
		?>
		<div class="wrap">
		<div class="notices">
		<h2></h2>
		</div>
		<div class="bew-extras-plugin-page">
		
		<?php		
		?>
			<div id="bew-extras-header">
				<a href="https://briefcasewp.com" target="_blank" class="briefcasewp-logo"><img
						src="<?php echo esc_url( BEW_EXTRAS_IMPORTER_ASSETS_URL . 'images/logo-briefcasewp.png' ); ?>"></a>
				<div class="icons">
					<a href="https://www.briefcasewp.com" target="_blank">Briefcasewp Extras by Briefcasewp</a>
					<a href="https://www.briefcasewp.com" target="_blank">v<?php echo BEW_EXTRAS_VERSION; ?></a>
					<a href="https://facebook.com/briefcasewp" target="_blank"><i class="fa fa-facebook"></i></a>
					<a href="https://twitter.com/briefcasewp" target="_blank"><i class="fa fa-twitter"></i></a>					
					<br/><br/>
					<em>Create beautiful Woocommerce Websites!</em><br/>
					<em><a href="https://www.briefcasewp.com/bew-blocks-manager/" target="_blank">with the New Bew Block Manager</a></em>
				</div>				
			</div>
			
			<nav class="nav-tab-wrapper">
				<?php
				foreach ( $tabs as $tab_id => $tab ) {

					$active_class = '';

					if ( 'import' === $tab_id ) {
						$active_class = ' nav-tab-active';
					}

					echo '<a id="bew-settings-tab-'.esc_attr( $tab_id ).'" class="nav-tab'.esc_attr( $active_class ).'" href="#tab-'.esc_attr( $tab_id ).'">'.esc_html( $tab ).'</a>';
				}
				?>
			</nav>

			<?php

			foreach ( $tabs as $tab_id => $tab ) {

				$active_class = '';

				if ( 'import' === $tab_id ) {
					$active_class = ' active-section';
				}

				echo '<div id="tab-'.esc_attr( $tab_id ).'" class="bew-settings-section'.esc_attr($active_class).'">';

				$section_method = 'tab_section_'.$tab_id;

				if( method_exists( $this, $section_method ) ){
					$this->$section_method();
				}

				echo '</div>';
			}

				?>
		</div>
		</div><!-- /.wrap -->
		<?php
	}


	/**
	 * Importer main tab.
	 *
	 * Output Importer main tab.
	 *
	 * Called in $this->display_import_page()
	 *
	 * @since 1.0
	 * @access public
	 */
	public function tab_section_import() {		
		
		// Get Credentials for update the options.
		$options = get_site_option('briefcase-elementor-widgets_updater_options');
		$email= isset($options['email']) ? $options['email'] : '';
		
		$check_password = !empty(isset($options['password'])) ? "yes" : "no";
		
		//Check if is password is set.
		$option_bew_extras = get_site_option('bew_extras_options');
		$check_password_confirm = !empty(isset($option_bew_extras['confirm_password'])) ? "yes" : "no";
				
		$passedValue = array( 'check_password' => $check_password , 'check_password_confirm' => $check_password_confirm  );
		wp_localize_script( 'bew-admin', 'passed_object', $passedValue );
		
		?>
		<h2><?php esc_html_e( 'Import templates', 'bew-extras'); ?></h2>
		
		<p><img src="<?php echo BEW_EXTRAS_IMPORTER_ASSETS_URL .'images/import/templates.png' ?>" alt="<?php esc_html_e( 'Image of templates to import.', 'bew-extras'); ?>" /></p>
		<p><?php echo nl2br( esc_html__( 'Please use below button to import BEW Blocks and BEW Templates to your WordPress installation.', 'bew-extras') ); ?></p>
		<div id="popup_confirm" class="overlay">
			<div class="popup">				
				<div class="modal-header">	
				<h4 class="modal-title">Confirm your Account</h4>
				</div>
				<a class="close" id="close_popup" href="#">&times;</a>
				<div class="content">					
					<div id="bew-extras-body" class="modal-body">
					  <span>You are connected to Briefcase Elementor Widgets (login: <?php echo $email;?>)</span>					  
					  <input type="password"  style="width:220px;" placeholder="Enter your password" name="password" value="" required>
					  <button id="bew-extras-connect" type="submit" class="button button-primary bew-extras-connect"><?php _e('Connect', 'bew-extras');?></button>					  
					</div>					
				</div>
			</div>
		</div>
		<div class="import-section">
						
			<div class="import-templates-content">
			<button class="button button-primary button-hero" id="start-import"><?php esc_html_e( 'Import Templates', 'bew-extras'); ?></button>
			<div class="status">
				<strong id="demo_data_import_status"><?php esc_html_e( 'The Importer is ready to start.', 'bew-extras' ); ?></strong>
				<div class="import_progress_bar"><div class="import_progress"></div></div>
			</div>
			</div>

		</div>
		<hr />
		<p><?php echo esc_html__( 'We will be adding more templates. So please stay tuned.', 'bew-extras' ); ?>
		<p><a href="https://www.briefcasewp.com/briefcasewp-extras/"><?php echo esc_html__( 'Visit plugins page', 'bew-extras' ); ?></a></p>
		<?php
			
	}


	/**
	 * Importer instructions tab.
	 *
	 * Output Importer instructions tab.
	 *
	 * Called in $this->display_import_page()
	 *
	 * @since 1.0
	 * @access public
	 */
	public function tab_section_instructions() {
		?>
		<h2><?php esc_html_e( 'Plugin instructions', 'bew-extras'); ?></h2>
		<h3><?php esc_html_e( 'Elementor Templates', 'bew-extras'); ?></h3>
		<p><?php echo nl2br( esc_html__( 'Before Import the templates make sure, you have Elementor Pro installed, Woocommerce installed with at least one product.', 'bew-extras') ); ?></p>
		<p><?php echo nl2br( esc_html__( 'After you are done with importing on "Import Templates" tab, you will be able to add/use these templates in Elementor.', 'bew-extras') ); ?></p>		
		<p><?php echo nl2br( esc_html__( 'To use templates in Elementor choose "Add Template" you will find "Briefcasewp Templates" on Blocks and Pages tabs. Please see below:', 'bew-extras') ); ?></p>
		<p><?php echo nl2br( esc_html__( 'Note: If you have issues importing templates, we recommend use Elementor import template option. check ', 'bew-extras') ); ?> <a href="https://briefcasewp.com/docs/how-to-import-bew-blocks-manually/"><?php echo esc_html__( 'Tutorial Here:', 'bew-extras' ); ?></a></p>		
		<p><a href="https://www.briefcasewp.com/download/5064/"><?php echo esc_html__( 'Download Template Zip Here:', 'bew-extras' ); ?></a></p>
		<p class="bew-templates-gif" ><img src="https://www.briefcasewp.com/wp-content/uploads/2019/09/bew-template-new.gif" alt="<?php esc_html_e( 'Import templates in Elementor', 'bew-extras'); ?>" /></p>
		<hr />
		<p><?php echo esc_html__( 'We will be adding more templates. So please stay tuned.', 'bew-extras' ); ?>
		<p><a href="https://www.briefcasewp.com/briefcasewp-extras/"><?php echo esc_html__( 'Visit plugins page', 'bew-extras' ); ?></a></p>
		<?php
	}


	/**
	 * Importer "more from Briefcasewp" tab.
	 *
	 * Output info about different stuff from Briefcasewp
	 *
	 * Called in $this->display_import_page()
	 *
	 * @since 1.0
	 * @access public
	 */
	public function tab_section_briefcasewp() {
		?>
		<h2><?php esc_html_e( 'More from BriefcaseWp 2.0', 'bew-extras'); ?></h2>
		<h3><?php esc_html_e( 'Briefcase Elementor Widgets 2.0', 'bew-extras'); ?></h3>		
		<div class="more-briefcasewp"><img src="<?php echo BEW_EXTRAS_IMPORTER_ASSETS_URL .'images/more-briefcasewp.png' ?>" alt="<?php esc_html_e( 'Briefcasewp Designs.', 'bew-extras'); ?>" /></div>
		<p><?php echo nl2br( esc_html__( 'Create a unique and modern E-Commerce website for your business with Briefcase Elementor Widgets 2.0. 
		Make your own  homepage, shop page and single product just as you imagined it.', 'bew-extras') ); ?></p>
		<div class="cta-button"><a class="button button-primary button-hero" href="https://www.briefcasewp.com/briefcase-elementor-widgets/"><?php esc_html_e( 'Check the New Features', 'bew-extras'); ?></a></div>
		<?php
	}
	
	/**
	 * Importer "License" tab.
	 *	 
	 *
	 * Called in $this->display_import_page()
	 *
	 * @since 1.0
	 * @access public
	 */
	public function tab_section_license() {
		
		// Get Credentials for update the options.
		$options = get_site_option('briefcase-elementor-widgets_updater_options');
		$email= isset($options['email']) ? $options['email'] : '';		
		$check_password = !empty(isset($options['password'])) ? "yes" : "no";
		
		if ($check_password == "no"){
		//Check if is password is set.
		$option_bew_extras = get_site_option('bew_extras_options');
		$check_password_confirm = !empty(isset($option_bew_extras['confirm_password'])) ? "yes" : "no";
		}
	
		
		?>
		<h2><?php esc_html_e( 'License', 'bew-extras'); ?></h2>
		<div id="box_confirm">
			<div class="confirm_account">				
					<div class="header">	
					<h4 class="title">Confirm your Account</h4>
					</div>				
					<div class="content">					
						<div id="bew-extras-body-settings" class="modal-body">
						  <span>You are connected to Briefcase Elementor Widgets (login: <?php echo $email;?>)</span>					  
						  <?php 
						  if ($check_password == "yes" || $check_password_confirm == "yes"  ){
							  
						  }else{ 
						  ?>
						  <input type="password"  style="width:220px;" placeholder="Enter your password" name="password" value="" required>
						  <button id="bew-extras-connect-settings" type="submit" class="button button-primary bew-extras-connect"><?php _e('Connect', 'bew-extras');?></button>
						  <?php 
						  }
						  ?>
						  <?php 
						  if ($check_password == "yes" || $check_password_confirm == "yes"  ){ 
						  ?>
						  <span id="right">Your Account is Confirmed</span>
						  <?php 
						  }
						  ?>
						</div>					
					</div>
			</div>
		</div>				
		<?php
	}
	
	/**
	 * Importer "settings" tab.
	 *	 
	 *
	 * Called in $this->display_import_page()
	 *
	 * @since 1.0
	 * @access public
	 */
	public function tab_section_settings() {		
		?>
		<h2><?php esc_html_e( 'Settings', 'bew-extras'); ?></h2>
		
		<div id="box_woogrid_settings">
			<form method="post" action="options.php">
				<?php settings_fields( 'bew_extras_options_group' ); ?>
				<h4 class="title">BriefcaseWP Extras</h4>
				    <table class="form-table">
						<tr valign="top">
						<th scope="row">Disable Briefcasewp Extras Styles</th>
						<td>
							<label>
							<input type="checkbox" name="briefcasewp_extras_styles" value="1" class="bwp-checkbox" id="briefcasewp_extras_styles" <?php checked(get_option('briefcasewp_extras_styles'), 1); ?>>
							Checking this box will disable Briefcasewp Extras Styles.
							</label>
						</td>						
						</tr>        
					</table>
					<table class="form-table">
						<tr valign="top">
						<th scope="row">Disabled Briefcasewp Extras Scripts</th>
						<td>
							<label>
							<input type="checkbox" name="briefcasewp_extras_scripts" value="1" class="bwp-checkbox" id="briefcasewp_extras_scripts" <?php checked(get_option('briefcasewp_extras_scripts'), 1); ?>>
							Checking this box will disable Briefcasewp Extras Scripts.
							</label>
						</td>						
						</tr>        
					</table>
				<h4 class="title">Woo Grid Widget</h4>
				    <table class="form-table">
						<tr valign="top">
						<th scope="row">Disable Cache</th>
						<td>
							<label>
							<input type="checkbox" name="woo_grid_cache" value="1" class="bwp-checkbox" id="woo_grid_cache" <?php checked(get_option('woo_grid_cache'), 1); ?>>
							Checking this box will disable cache on custom woo grid queries, Use this option only for development purpose.
							</label>
						</td>						
						</tr>        
					</table>
					<table class="form-table">
						<tr valign="top">
						<th scope="row">Jet Smart Filter Compatibility</th>
						<td>
							<label>
							<input type="number" name="jsf_id_template" value="<?php echo get_option('jsf_id_template'); ?>" class="bwp-number" id="jsf_id_template" />
							Enter Template ID for your Shop page.
							</label>
						</td>					
						</tr>        
					</table>				
				<h4 class="title">Woo Bew Mini Cart</h4>
				    <table class="form-table">
						<tr valign="top">
						<th scope="row">Disable Woo Bew Mini Cart Styles</th>
						<td>
							<label>
							<input type="checkbox" name="woo_bew_cart" value="1" class="bwp-checkbox" id="woo_bew_cart" <?php checked(get_option('woo_bew_cart'), 1); ?>>
							Checking this box will disable Woo Bew Mini Cart styles. So you can use your theme cart with default theme styles.
							
							</label>
						</td>						
						</tr>        
					</table>
				<h4 class="title">Fullpage Widget</h4>
				    <table class="form-table">
						<tr valign="top">
						<th scope="row">Enable Parallax Extension</th>
						<td>
							<label>
							<input type="checkbox" name="fullpage_parallax" value="1" class="bwp-checkbox" id="fullpage_parallax" <?php checked(get_option('fullpage_parallax'), 1); ?>>
							Checking this box will enable Parallax Extension on Fullpage Widget.
							</label>
						</td>
						</tr>        
					</table>
					<table class="form-table">
						<tr valign="top">
						<th scope="row">Activation Key Parallax Extension</th>
						<td>
							<label>
							<input type="text" name="fullpage_parallax_key" value="<?php echo get_option('fullpage_parallax_key'); ?>" class="bwp-text" id="fullpage_parallax_key" />
							Enter your Activation Key.
							</label>
						</td>					
						</tr>        
					</table>
				<h4 class="title">Woo Orders</h4>
				    <table class="form-table">
						<tr valign="top">
						<th scope="row">Enable quick minimal checkout fields</th>
						<td>
							<label>
							<input type="checkbox" name="wo_fields" value="1" class="bwp-checkbox" id="wo_fields" <?php checked(get_option('wo_fields'), 1); ?>>
							Checking this box will enable quick minimal checkout fields for one page checkout layout.							
							</label>
						</td>						
						</tr>        
					</table>
				<h4 class="title">Bew Checkout</h4>
				    <table class="form-table">
						<tr valign="top">
						<th scope="row">Regenerate default checkout fields</th>
						<td>
							<button type="button" class="button reset-default-checkout">Regenerate</button>
						</td>						
						</tr>        
					</table>
				<?php  submit_button(); ?>
			</form>
		</div>
		<?php
	}
	
	/**
	 * Admin notice for non active Elementor.
	 *
	 * Warning when the site doesn't have active Elementor plugin
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	function fail_elementor() {
		echo '<div class="error">'.
		     wpautop(
			     esc_html__( 'Briefcasewp Extras requires Elementor plugin to be active. Without it import of templates will not work.', 'bew-extras' )
		     ).'</div>';
	}
	
	function fail_plugin_active() {
		echo '<div class="error">'.
		     wpautop(
			     esc_html__( 'Briefcasewp Extras requires Elementor plugin to be active. Without it import of templates will not work.', 'bew-extras' )
		     ).'</div>';
	}
	
	public function bew_confirm_password() {		
		
		//Get confirm password from ajax
		
		if (!get_site_option('bew_extras_options')) {
		add_site_option( 'bew_extras_options', '');
		}
		
		if(! empty( $_POST['confirm_password'] ) ){
			$confirm_password = esc_html($_POST['confirm_password']);
			$options = get_site_option('briefcase-elementor-widgets_updater_options');
				
			//Check if is password is right;	
			$check_link = 'https://briefcasewp.com/wp-content/uploads/private_import/check_link.json';			
			$username = isset($options['email']) ? $options['email'] : '';
			$password = $confirm_password;
			$auth = base64_encode( $username . ':' . $password );
			$context = stream_context_create([
				"http" => [
					"header" => "Authorization: Basic $auth"
				]
			]);			
			
			// get check json
			$check_file = file_get_contents($check_link, false, $context );
			$check_file2 = json_decode($check_file, true);			
			$message = $check_file2['message'];
			
			echo $message; 
			
			if( $message == 'connected' ){
				$option_bew_extras = get_site_option('bew_extras_options');
				if (!is_array($option_bew_extras)) $option_bew_extras = array();
				$option_bew_extras['confirm_password'] = base64_encode($confirm_password);		
				update_site_option('bew_extras_options', $option_bew_extras);
			}
		}
	}
	
	/**
	 * Import process
	 *
	 * Controls import process via AJAX calls.
	 *
	 * Fired by `wp_ajax_bew_import_templates` action.
	 *
	 * @since 1.0
	 * @access public
	 */
	public function import_templates() {
		$level         = isset( $_POST['level'] )? sanitize_text_field( wp_unslash( $_POST['level'] ) ) : '';
		$sublevel      = isset( $_POST['sublevel'] )? sanitize_text_field( wp_unslash( $_POST['sublevel'] ) ) : '';
		$pack          = isset( $_POST['pack'] )? sanitize_text_field( wp_unslash( $_POST['pack'] ) ) : 'free';
		$sublevel_name = '';
		$log           = '';
		$array_index   = 0;
		
		$levels = array(
			'_'                     => '', //empty to avoid bonus logic
			'start'                 => esc_html__( 'Starting import', 'bew-extras' ),
			'download_files'        => esc_html__( 'Downloading files', 'bew-extras' ),
			'install_content'       => esc_html__( 'Importing templates', 'bew-extras' ),
			'clean'                 => esc_html__( 'Cleaning...', 'bew-extras' ),
			'end'                   => esc_html__( 'Everything done!', 'bew-extras' ),
		);

		if($pack === 'free'){
			unset( $levels['start'] );			
			unset( $levels['clean'] );
		}

		//get current level key
		if ( strlen( $level ) === 0 ) {
			//get first level to process
			$level = key( $levels );
		}
		else {
			//move array pointer to current importing level
			while ( key( $levels ) !== $level ) {
				//and ask for next one
				next( $levels );
				$array_index++;
			}
			//save new current level
			$level = key( $levels );
		}

		//Execute current level function
		$method = 'import_' . $level;
		if ( method_exists( $this, $method ) ) {
			//no notices or other "echos", we put it in $log
			ob_start();

			$sublevel = $this->$method( $sublevel, $sublevel_name );

			//collect all produced output to log
			$log = ob_get_contents();
			ob_end_clean();

			//should we move to next level
			if ( $sublevel === true ) {
				$sublevel = ''; //reset
				next( $levels );
				$level = key( $levels );
			}
		}
		//no function - move to next level. Some steps are just information without action
		else {
			next( $levels );
			$array_index ++;
			$level = key( $levels );
		}

		//check if this is last element
		$is_it_end = false;
		end( $levels );
		if ( key( $levels ) === $level ) {
			$is_it_end = true;
		}

		//prepare progress info
		$progress = round( 100 * ( 1 + $array_index ) / count( $levels ) );

		$result = [
			'level'         => $level,
			'level_name'    => $levels[ $level ],
			'sublevel'      => $sublevel,
			'sublevel_name' => $sublevel_name,
			'log'           => $log,
			'progress'      => $progress,
			'is_it_end'     => $is_it_end
		];

		//send AJAX response
		echo json_encode( sizeof( $result ) ? $result : false );

		die(); //this is required to return a proper result
	}
	
	/**
	 * Import process - Download File
	 *
	 * Part of import process responsible for download file templates
	 *
	 * Fired by $this->import_templates()
	 *
	 * @since 1.0
	 * @access public
	 */
	private function import_download_files($sublevel, $sublevel_name){
		
		$file_name_m = 'templates_manually.zip';
		
		$upload = wp_upload_dir();
		$upload_dir = $upload['basedir'];
		$upload_dir = $upload_dir . '/bew-templates';
		if (! is_dir($upload_dir)) {
			mkdir( $upload_dir, 0755 );
		}
			
		$path = $upload_dir .'/' . $file_name_m;
				
		if (file_exists($path)) {
			
		} else {
			
			//Download templates from briefcasewp server
			
			// Using file_get_contents method
					
			// Define Filename and Download link
			$file_name = 'templates.zip';
			$download_link = 'https://briefcasewp.com/download/3156';		
			
			// Credentials for basic authentication.
			$options = get_site_option('briefcase-elementor-widgets_updater_options');
			$username = isset($options['email']) ? $options['email'] : '';
			$password = base64_decode(isset($options['password']) ? $options['password'] : '');
			
			if(empty ($password)){
			$option_bew_extras = get_site_option('bew_extras_options');
			$password = base64_decode(isset($option_bew_extras['confirm_password']) ? $option_bew_extras['confirm_password'] : '');	
			}
							
			$auth = base64_encode( $username . ':' . $password );
			$context = stream_context_create([
				"http" => [
					"header" => "Authorization: Basic $auth"
				]
			]);
						
			//Download Path			
			$upload = wp_upload_dir();
			$upload_dir = $upload['basedir'];
			$upload_dir = $upload_dir . '/bew-templates';
			if (! is_dir($upload_dir)) {
				mkdir( $upload_dir, 0755 );
			}
				
			$path = $upload_dir .'/' . $file_name;		
					
			// Download File Content
			$file_data = file_get_contents($download_link, false, $context );
		 
			// Create File
			$handle = fopen($file_name, 'w');
			fclose($handle);
		 
			// Save Content to file
			$downloaded = file_put_contents( $path , $file_data);
			
			if( empty($downloaded)){
				
				//Using CURL  method
				
				//FOLDER PATH
				$fp = fopen($path, 'w');
							
				//SETTING UP CURL REQUEST
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $download_link);
				curl_setopt($ch, CURLOPT_FAILONERROR, true);
				curl_setopt($ch, CURLOPT_HEADER, 0);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
				curl_setopt($ch, CURLOPT_AUTOREFERER, true);
				curl_setopt($ch, CURLOPT_BINARYTRANSFER,true);
				curl_setopt($ch, CURLOPT_TIMEOUT, 10);
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
				curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
				curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
				curl_setopt($ch, CURLOPT_FILE, $fp);
				$output = curl_exec($ch);
				$info = curl_getinfo($ch);
				
				//CONNECTION CLOSE
				curl_close($ch);
				fclose($fp);
				
			}
		}	

		// Manage the zip
		$zip = new \ZipArchive();

		$temp_path = $upload_dir .'/' ;

		$res = $zip->open( $path );
		if ($res === TRUE) {
		$zip->extractTo( $temp_path );
		$zip->close();
		}
		
		// Clear zip from local storage:
		unlink($path);
		
		$sublevel = true;
		
		return $sublevel;
	}

	/**
	 * Import process - import content
	 *
	 * Part of import process responsible for importing posts
	 *
	 * Fired by $this->import_templates()
	 *
	 * @since 1.0
	 * @access public
	 */
	private function import_install_content($sublevel, &$sublevel_name){
				
						
		//Imports templates from local
		$upload = wp_upload_dir();
		$upload_dir = $upload['basedir'];
		$upload_dir = $upload_dir . '/bew-templates';		
		$dir = $upload_dir .'/';
		
		$templates = array();
		
		//Get all templates to import
		if ( is_dir( $dir ) ) {
			//The GLOB_BRACE flag is not available on some non GNU systems, like Solaris. So we use merge:-)
			foreach ( (array) glob( $dir . '/*.json' ) as $file ) {
				$templates[] = basename( $file );
			}
		}
								
		if ( strlen( $sublevel ) === 0 ) {//we will import first template on list but in second call of this function
			$sublevel      = key( $templates );
			$sublevel_name = $templates[ $sublevel ];
		}
		else {
			//save last template
			end( $templates );
			$last_template = key( $templates );
			reset( $templates );

			$sublevel = (int) $sublevel;//convert from string type

			// template to import now
			$file = $dir . $templates[ $sublevel ];

			/** @var \Elementor\TemplateLibrary\Source_Local $source */
			$source = \Elementor\Plugin::instance()->templates_manager->get_source( 'local' );
			
			// Check if the template is imported before.
			
			$template_name = $templates[ $sublevel ];
			
			$bewtemplates = $source->get_items( array('type' => 'briefcasewp'));
			
			$dataTemplates = [];
		
			foreach ( $bewtemplates as $bewtemplate ) {
			
			$bewtemplate_name  = sanitize_title($bewtemplate['title']). '.json';
			$bewtemplate_id  	 = $bewtemplate['template_id'];
			
			$dataTemplates[] = array("id"=>$bewtemplate_id ,"name"=>$bewtemplate_name);			
				
			}
			
			sort($dataTemplates);
			
			$check_key = array_search($template_name,array_column($dataTemplates,'name'));
			
			if ( false === $check_key ) {
				//this import templates
				$source->import_template( $templates[ $sublevel ], $file );			
				
				// Get the Id
				$bewtemplates = $source->get_items( array('type' => 'briefcasewp'));
				
				array_multisort( array_column($bewtemplates, "template_id"), SORT_ASC, $bewtemplates );
				$last = end($bewtemplates);
				
				// Get the Bew_type
				$list = BEW_EXTRAS_PATH . 'extensions/bew-importer/data/list.json';			
				$templates_data = json_decode( file_get_contents( $list, FILE_USE_INCLUDE_PATH ), true );
				$templates_data = $templates_data['data'];
							
				$template_slug = sanitize_title($last['title']);
				
				sort($templates_data);
			
				$key = array_search($template_slug,array_column($templates_data,'id'));
				
				$template_data = $templates_data[$key];
				$bew_type = $template_data['bew_type'];				
				
				// Update template with the data
				$my_bew_type = esc_html($bew_type);
				$my_shop_disable = esc_html('off');
				$my_cat_disable = esc_html('off');	
				$my_id = esc_html($last['template_id']);			
				
				if ( ! empty( $my_bew_type && $my_id ) ) {
				update_post_meta( $my_id, 'briefcase_template_layout', $my_bew_type);				
				update_post_meta( $my_id, 'briefcase_template_layout_shop', $my_shop_disable);
				update_post_meta( $my_id, 'briefcase_template_layout_cat', $my_cat_disable);
				}		
			}
			
			//if this was last plugin on list then we end this process
			if ( $last_template === $sublevel ) {
				$sublevel = true;
			}
			else{
				//move to next template to import
				$sublevel++;
				$sublevel_name = $templates[ $sublevel ];
			}
		}

		return $sublevel;
	}
	
	function my_scripts(){
		
	//passing variables to the javascript file
		wp_localize_script('bew-admin', 'frontEndAjax', array(
		'ajaxurl' => admin_url( 'admin-ajax.php' )
		));	
	
	}
	
	function bew_extras_register_settings() {		
	   register_setting( 'bew_extras_options_group', 'briefcasewp_extras_styles');
	   register_setting( 'bew_extras_options_group', 'briefcasewp_extras_scripts');
	   register_setting( 'bew_extras_options_group', 'woo_grid_cache');
	   register_setting( 'bew_extras_options_group', 'jsf_id_template');
	   register_setting( 'bew_extras_options_group', 'woo_bew_cart');
	   register_setting( 'bew_extras_options_group', 'fullpage_parallax');
	   register_setting( 'bew_extras_options_group', 'fullpage_parallax_key');
	   register_setting( 'bew_extras_options_group', 'wo_fields');
	}

	/**
	 * Importer constructor.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'admin_pages' ], 600 ); //as last item
		add_action( 'wp_ajax_bew_import_templates', [ $this, 'import_templates' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'my_scripts' ] );
		add_action( 'wp_ajax_bew_confirm_password', [ $this, 'bew_confirm_password' ] );
		add_action( 'admin_init', [ $this,  'bew_extras_register_settings'] );
		
		$this->tabs = [
			'import'        => esc_html__( 'Import Templates', 'bew-extras' ),
			'instructions'  => esc_html__( 'Importer Instructions', 'bew-extras' ),
			'license' 		=> esc_html__( 'License', 'bew-extras' ),
			'settings' 		=> esc_html__( 'Settings', 'bew-extras' ),
			'briefcasewp' 	=> esc_html__( 'More from BriefcaseWp', 'bew-extras' )
			
		];
	}
}
