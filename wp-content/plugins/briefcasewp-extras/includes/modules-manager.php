<?php
namespace BriefcasewpExtras;

use BriefcasewpExtras\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

final class Manager {
	/**
	 * @var Module_Base[]
	 */
	private $modules = [];

	public function __construct() {
		$modules = [
			'mobile-first-design',
			'mobile-menu',
			'bew-scroll',
			'bew-effects',
			'bew-sticky',
			'bew-template',			
		];
				
		$active_extensions = get_option( 'briefcasewp_active_extensions', array() );
		if( $active_extensions ) {
			// Check If Bew Oders extension is active.
			if (in_array("Bew_Orders", $active_extensions)) {
				array_push($modules, 'woo-orders');
			}
			
			// Check If Bew Cart & Checkout extension is active.
			if (in_array("Bew_Checkout", $active_extensions)) {
				array_push($modules, 'woo-cart' , 'woo-checkout', 'woo-thankyou', 'woo-account'  );
			}
			
		}
				
		foreach ( $modules as $module_name ) {
			$class_name = str_replace( '-', ' ', $module_name );

			$class_name = str_replace( ' ', '', ucwords( $class_name ) );

			$class_name = __NAMESPACE__ . '\\Modules\\' . $class_name . '\Module';

			/** @var Module_Base $class_name */
			if ( $class_name::is_active() ) {
				$this->modules[ $module_name ] = $class_name::instance();
			}
		}		
	}

	/**
	 * @param string $module_name
	 *
	 * @return Module_Base|Module_Base[]
	 */
	public function get_modules( $module_name ) {
		if ( $module_name ) {
			if ( isset( $this->modules[ $module_name ] ) ) {
				return $this->modules[ $module_name ];
			}

			return null;
		}

		return $this->modules;
	}
}
