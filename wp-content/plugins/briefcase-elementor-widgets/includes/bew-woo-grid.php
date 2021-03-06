<?php
/**
 * Class: Jet_Smart_Filters_Provider_Bew_Grid
 * Name: Bew Woo Grid
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

if ( ! class_exists( 'Jet_Smart_Filters_Provider_Bew_Grid' ) ) {

	/**
	 * Define Jet_Smart_Filters_Provider_WooCommerce_Shortcode class
	 */
	class Jet_Smart_Filters_Provider_Bew_Grid extends Jet_Smart_Filters_Provider_Base {

		/**
		 * Watch for default query
		 */
		public function __construct() {

			if ( ! jet_smart_filters()->query->is_ajax_filter() ) {
				add_filter( 'woocommerce_shortcode_products_query', array( $this, 'store_shortcode_query' ), 0, 3 );
			}

		}

		/**
		 * Store default query args
		 *
		 * @param  array  $args       Query arguments.
		 * @param  array  $attributes Shortcode attributes.
		 * @param  string $type       Shortcode type.
		 * @return array
		 */
		public function store_shortcode_query( $args, $attributes, $type ) {

			if ( empty( $attributes['class'] ) ) {
				$query_id = 'default';
			} else {
				$query_id = $attributes['class'];
			}

			$args['suppress_filters']  = false;
			$args['no_found_rows']     = false;
			$args['jet_smart_filters'] = jet_smart_filters()->query->encode_provider_data(
				$this->get_id(),
				$query_id
			);

			jet_smart_filters()->query->store_provider_default_query( $this->get_id(), $args, $query_id );

			if ( isset( $_REQUEST['paged'] ) ) {
				$attributes['page'] = absint( $_REQUEST['paged'] );
			}

			jet_smart_filters()->providers->store_provider_settings( $this->get_id(), array(
				'query_type'     => 'shortcode',
				'shortcode_type' => $type,
				'attributes'     => $attributes,
			), $query_id );


			add_action( 'woocommerce_shortcode_before_' . $type . '_loop', array( $this, 'store_props' ) );

			return $args;

		}

		/**
		 * Get provider name
		 *
		 * @return string
		 */
		public function get_name() {
			return __( 'Bew Woo Grid', 'jet-smart-filters' );
		}

		/**
		 * Get provider ID
		 *
		 * @return string
		 */
		public function get_id() {
			return 'bew-woo-grid';
		}
		
		/**
		 * Returns Elementor Pro apropriate widget name
		 * @return [type] [description]
		 */
		public function widget_name() {
			return 'bew-woo-grid';
		}
		
		/**
		 * Save default widget settings
		 *
		 * @param  [type] $widget [description]
		 * @return [type]         [description]
		 */
		public function store_default_settings( $widget ) {

			if ( $this->widget_name() !== $widget->get_name() ) {
				return;
			}

			$settings         = $widget->get_settings();
			$store_settings   = $this->settings_to_store();
			$default_settings = array();

			if ( ! empty( $settings['_element_id'] ) ) {
				$query_id = $settings['_element_id'];
			} else {
				$query_id = 'default';
			}

			foreach ( $store_settings as $key ) {
				$default_settings[ $key ] = isset( $settings[ $key ] ) ? $settings[ $key ] : '';
			}

			$default_settings['_el_widget_id'] = $widget->get_id();

			jet_smart_filters()->providers->store_provider_settings( $this->get_id(), $default_settings, $query_id );

		}
		
		/**
		 * Get filtered provider content
		 *
		 * @return string
		 */
		public function ajax_get_content() {

			if ( ! function_exists( 'wc' ) ) {
				return;
			}

			add_filter( 'woocommerce_shortcode_products_query', array( $this, 'add_query_args' ), 10, 2 );

			$settings   = jet_smart_filters()->query->get_query_settings();
			
			var_dump($settings );
			$type       = $settings['shortcode_type'];
			$attributes = $settings['attributes'];

			global $post;
			$post = null;


			add_action( 'woocommerce_shortcode_before_' . $type . '_loop', array( $this, 'store_props' ) );

			$shortcode = new WC_Shortcode_Products_Bew( $attributes, $type );
			echo $shortcode->get_content();

		}

		/**
		 * Store query ptoperties
		 *
		 * @return [type] [description]
		 */
		public function store_props() {
			global $woocommerce_loop;

			jet_smart_filters()->query->set_props(
				$this->get_id(),
				array(
					'found_posts'   => $woocommerce_loop['total'],
					'max_num_pages' => $woocommerce_loop['total_pages'],
					'page'          => $woocommerce_loop['current_page'],
				)
			);
		}

		/**
		 * Get provider wrapper selector
		 *
		 * @return string
		 */
		public function get_wrapper_selector() {
			return 'body .woocommerce[class*="columns"]';
		}

		/**
		 * Action for wrapper selector - 'insert' into it or 'replace'
		 *
		 * @return string
		 */
		public function get_wrapper_action() {
			return 'replace';
		}

		/**
		 * Set prefix for unique ID selector. Mostly is default '#' sign, but sometimes class '.' sign needed
		 *
		 * @return bool
		 */
		public function id_prefix() {
			return '.';
		}

		/**
		 * Add custom settings for AJAX request
		 */
		public function add_settings( $settings ) {
			return jet_smart_filters()->query->get_query_settings();
		}

		/**
		 * Pass args from reuest to provider
		 */
		public function apply_filters_in_request() {

			$args = jet_smart_filters()->query->get_query_args();

			if ( ! $args ) {
				return;
			}

			add_filter( 'woocommerce_shortcode_products_query', array( $this, 'add_query_args' ), 10, 2 );

		}

		/**
		 * Add custom query arguments
		 *
		 * @param array $args [description]
		 */
		public function add_query_args( $args = array(), $attributes = array() ) {

			$filter_args = jet_smart_filters()->query->get_query_args();

			if ( ! isset( $filter_args['jet_smart_filters'] ) ) {
				return $args;
			}

			if ( $filter_args['jet_smart_filters'] !== jet_smart_filters()->render->request_provider( 'raw' ) ) {
				return $args;
			}

			if ( ! jet_smart_filters()->query->is_ajax_filter() ) {

				if ( empty( $attributes['class'] ) ) {
					$query_id = 'default';
				} else {
					$query_id = $attributes['class'];
				}

				if ( $query_id !== jet_smart_filters()->render->request_provider( 'query_id' ) ) {
					return $args;
				}
			}

			if ( isset( $filter_args['no_found_rows'] ) ){
				$filter_args['no_found_rows'] = filter_var( $filter_args['no_found_rows'], FILTER_VALIDATE_BOOLEAN );
			}

			if( isset( $filter_args['ignore_sticky_posts'] ) ){
				$filter_args['ignore_sticky_posts'] = filter_var( $filter_args['ignore_sticky_posts'], FILTER_VALIDATE_BOOLEAN );
			}

			return array_merge( $args, $filter_args );

		}
	}

}
