<?php
namespace BriefcasewpExtras;

use Elementor;	
use Elementor\Utils;
use Elementor\Core\Settings\Manager as SettingsManager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Main class plugin
 */
class Plugin {

	/**
	 * @var Plugin
	 */
	private static $_instance;

	/**
	 * @var Manager
	 */
	private $_modules_manager;

	/**
	 * @deprecated
	 *
	 * @return string
	 */
	public function get_version() {
		return BEW_EXTRAS_VERSION;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'bew-extras' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'bew-extras' ), '1.0.0' );
	}

	/**
	 * @return \Elementor\Plugin
	 */
	public static function elementor() {
		return \Elementor\Plugin::$instance;
	}

	/**
	 * @return Plugin
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function _includes() {
		require BEW_EXTRAS_PATH . 'includes/modules-manager.php';
		require BEW_EXTRAS_PATH . 'includes/bew-manager.php';	
		require( BEW_EXTRAS_PATH  . 'extensions/bew-importer/bew-importer.php' );
		require( BEW_EXTRAS_PATH  . 'extensions/bew-extensions/bew-extensions.php' );
		
		$active_extensions = get_option( 'briefcasewp_active_extensions', array() );
		if( $active_extensions ) {
			// Check If Bew Blocks Builder extension is active.
			if (in_array("Bew_Blocks", $active_extensions)) {				
				require( BEW_EXTRAS_PATH  . 'extensions/bew-builder/bew-builder.php' );
			}
		}
		
		//require( BEW_EXTRAS_PATH  . 'extensions/bew-wc-cart-pdf/bew-wc-cart-pdf.php' );
		
		// Add templates to library	
		require( BEW_EXTRAS_PATH  . 'includes/theme-builder/inc/bew-templates-for-elementor.php' );
	}

	public function autoload( $class ) {
		if ( 0 !== strpos( $class, __NAMESPACE__ ) ) {
			return;
		}

		$filename = strtolower(
			preg_replace(
				[ '/^' . __NAMESPACE__ . '\\\/', '/([a-z])([A-Z])/', '/_/', '/\\\/' ],
				[ '', '$1-$2', '-', DIRECTORY_SEPARATOR ],
				$class
			)
		);
		$filename = BEW_EXTRAS_PATH . $filename . '.php';

		if ( is_readable( $filename ) ) {
			include( $filename );
		}
	}
	
	public function enqueue_styles() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '';
		$direction_suffix = is_rtl() ? '-rtl' : '';	
					
	}
	
	public function enqueue_widgets_styles() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '';
		$direction_suffix = is_rtl() ? '-rtl' : '';	
		
		$briefcasewp_extras_styles = get_option('briefcasewp_extras_styles');
	
			$bew_frontend_file_name = 'bew-extras-widgets-style' . $direction_suffix . $suffix .  '.css';
			
			$bew_frontend_file_url = BEW_EXTRAS_ASSETS_URL . 'css/' . $bew_frontend_file_name;
			
			wp_enqueue_style(
				'bew-extras-widgets',
				$bew_frontend_file_url,
				[],
				BEW_EXTRAS_VERSION
			);
			
			wp_enqueue_style(
				'bew-snackbar',
				BEW_EXTRAS_URL . 'assets/css/snackbar.min.css',
				[],
				BEW_EXTRAS_VERSION
			);
	}

	public function enqueue_frontend_scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '';
						
			wp_enqueue_script(
				'bew-extras-widgets',
				BEW_EXTRAS_URL . 'assets/js/bew-extras-widgets' . $suffix . '.js',
				array( 'jquery' ),
				BEW_EXTRAS_VERSION,
				true
			);
			
			wp_enqueue_script(
				'bew-snackbar',
				BEW_EXTRAS_URL . 'assets/js/snackbar.min.js',
				array( 'jquery' ),
				BEW_EXTRAS_VERSION,
				true
			);
	}

	public function enqueue_editor_scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
		
		wp_enqueue_script(
			'bew-extras-editor',
			BEW_EXTRAS_URL . 'assets/js/bew-extras-editor' . $suffix . '.js',
			[],
			BEW_EXTRAS_VERSION,
			true
		);
	}
	
	public function enqueue_editor_styles() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		$direction_suffix = is_rtl() ? '-rtl' : '';

		wp_enqueue_style(
			'bew-extras-editor',
			BEW_EXTRAS_URL . 'assets/css/bew-extras-editor' . $direction_suffix . '.css',
			[
			  'elementor-editor',
			],
			BEW_EXTRAS_VERSION
		);
		
		$ui_theme = SettingsManager::get_settings_managers( 'editorPreferences' )->get_model()->get_settings( 'ui_theme' );

		if ( 'light' !== $ui_theme ) {
			$ui_theme_media_queries = 'all';

			if ( 'auto' === $ui_theme ) {
				$ui_theme_media_queries = '(prefers-color-scheme: dark)';
			}

			wp_enqueue_style(
				'bew-extras-editor-dark-mode',
				BEW_EXTRAS_URL . 'assets/css/bew-extras-editor-dark-mode' . '.css',
				[
				  'elementor-editor',
				],
				BEW_EXTRAS_VERSION,
				$ui_theme_media_queries
			);
		}
	}
	
	public function register_frontend_scripts() {
		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';	
		
		if( class_exists( 'WooCommerce' ) ) { 
		wp_register_script(
			'bew-checkout',
			BEW_EXTRAS_URL . 'assets/js/bew-checkout.js',
			[
				'jquery',
			],
			BEW_EXTRAS_VERSION,
			true
		);
		}
	}

	public function bew_extras_init() {
		$this->_modules_manager = new Manager();

		$elementor = Elementor\Plugin::$instance;

		// Add element category in panel
		$elementor->elements_manager->add_category(
			'bew-extras',
			[
				'title' => __( 'Briefcasewp Extras', 'bew-extras' ),
				'icon' => 'font',
			],
			1
		);
		
		$elementor->elements_manager->add_category(
			'bew-extras-cart',
			[
				'title' => __( 'Bew Woo Cart', 'bew-extras' ),
				'icon' => 'font',
			],
			1
		);
		
		$elementor->elements_manager->add_category(
			'bew-extras-checkout',
			[
				'title' => __( 'Bew Woo Checkout', 'bew-extras' ),
				'icon' => 'font',
			],
			1
		);
		
		$elementor->elements_manager->add_category(
			'bew-extras-account',
			[
				'title' => __( 'Bew Woo My Account', 'bew-extras' ),
				'icon' => 'font',
			],
			1
		);
		
		$elementor->elements_manager->add_category(
			'bew-extras-thankyou',
			[
				'title' => __( 'Bew Woo Thank You', 'bew-extras' ),
				'icon' => 'font',
			],
			1
		);

		do_action( 'elementor_controls/init' );
	}	
	
	public function register_controls() {			
		
		// Define dir
		$dir = BEW_EXTRAS_PATH .'includes/controls/';			

		// Array of new widgets			
		$build_controls = apply_filters( 'bew_controls', array(			
			'choose_imagery' => $dir .'choose_imagery.php',	
		) );
		
		// Load files
		foreach ( $build_controls as $control_filename ) {
			include $control_filename;
		}
	}
		
	public function bew_templates_scripts() {	
		require_once BEW_EXTRAS_PATH .'includes/theme-builder/templates/bew-templates.php';	
	}
			
	public function bew_elementor_init(){		
		//load templates types				
		require_once BEW_EXTRAS_PATH .'includes/theme-builder/init.php';
	}

    public function body_class( $classes ){
        $post_type = get_post_type();
        if( $post_type == 'elementor_library' ){
            $classes[] = 'woocommerce';
            $classes[] = 'woocommerce-page';
            $classes[] = 'bew-woocommerce-builder';
        }
        return $classes;
    }
	
	private function setup_hooks() {
		add_action( 'elementor/init', [ $this, 'bew_extras_init' ] );		
		add_action( 'elementor/editor/after_enqueue_styles', [ $this, 'enqueue_editor_styles' ] );
		add_action( 'elementor/preview/enqueue_styles', [ $this, 'enqueue_editor_scripts' ] );
		add_action( 'elementor/frontend/before_enqueue_scripts', [ $this, 'enqueue_frontend_scripts' ] );
		add_action( 'elementor/frontend/after_enqueue_styles', [ $this, 'enqueue_styles' ] );
		add_action( 'elementor/frontend/after_enqueue_styles', [ $this, 'enqueue_widgets_styles' ] );
		add_action( 'elementor/frontend/after_register_scripts', array( $this, 'register_frontend_scripts' ) );	
		add_filter( 'body_class', array($this, 'body_class') );
	}
		
	/**
	 * Plugin constructor.
	 */
	private function __construct() {
		spl_autoload_register( [ $this, 'autoload' ] );

		$this->_includes();
		$this->setup_hooks();
		
		// Register controls
		add_action( 'elementor/controls/controls_registered', [ $this, 'register_controls' ] );
		add_action( 'elementor_pro/init', [ $this, 'bew_elementor_init' ] );
		add_action( 'elementor/editor/footer', [ $this, 'bew_templates_scripts' ] );	
	}
}

if ( ! defined( 'BEW_EXTRAS_TESTS' ) ) {
	// In tests we run the instance manually.
	Plugin::instance();
}