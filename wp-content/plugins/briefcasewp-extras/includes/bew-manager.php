<?php
namespace BriefcasewpExtras;

class Bewmanager{
	
	private static $_instance = null;
   

    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
	
	public function __construct() {
		// Main Bew Filters
			add_action( 'admin_enqueue_scripts', array( $this, 'bew_scripts' ) );
			add_action( 'wp_ajax_default_bew_checkout_fields', array( $this, 'default_bew_checkout_fields' ) );
			add_action( 'wp_ajax_nopriv_default_bew_checkout_fields', array( $this, 'default_bew_checkout_fields' ) );
	}
	
	function bew_scripts(){
		
	//file where AJAX code will be found
		wp_enqueue_script(
			'bew-settings',
			BEW_EXTRAS_URL . 'assets/js/bew-settings.js',
			array( 'jquery' ),
			BEW_EXTRAS_VERSION,
			true
		);

	//passing variables to the javascript file
		wp_localize_script('bew-settings', 'admintEndAjax', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' )
		));	
	
	}
		
	function default_bew_checkout_fields() {
		if ( isset( $_POST['set_bew_checkout_fields']) ) {

			$reset = esc_html($_POST['set_bew_checkout_fields']);
			echo $reset;
		    //update_option( '_bew_checkout_fields',  [] );
	
			wp_die();
			
		}
	}
	 	
}
Bewmanager::instance();
