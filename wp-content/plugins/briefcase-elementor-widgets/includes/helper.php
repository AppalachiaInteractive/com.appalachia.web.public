<?php
namespace Briefcase;

use Elementor;
use Elementor\Plugin;
use WP_Query;

class Helper{
	
	function get_bew_active_template($post_id,$post_type){
        $bew_product_template = get_post_meta($post_id, 'bew_post_template', true);

        if(isset($bew_product_template) && $bew_product_template == 'none'){
            return false;
        }

        if(!isset($bew_product_template) || empty($bew_product_template)){
            // apply global template
            $args = array(
                'post_type' => 'elementor_library',
                'meta_query' => array(
                    array(
                        'key' => 'briefcase_template_layout',
                        'value'   => $post_type,
                        'compare' => '='
                    )
                )
            );
            $templates = new WP_Query($args);
            if($templates->found_posts){
                $templates->the_post();
                $bew_tid = get_the_ID();
            }else{
                return false;
            }
            wp_reset_postdata();

        }else{
            // set individual post template
            $bew_tid = $bew_post_template;
        }

        return $bew_tid;
    }

	function get_woo_archive_template(){
			
                $args = array(
                    'post_type' => 'elementor_library',
                    'meta_query' => array(
						'relation'    => 'AND',
                        array(
                            'key' => 'briefcase_template_layout',
                            'value'   => 'woo-shop',
                            'compare' => '='
                        ),
						array(
                            'key' => 'briefcase_template_layout_shop',
                            'value'   => 'on',
                            'compare' => '='
                        ), 
                    )
                );
                $templates = new WP_Query($args);
				
                if($templates->found_posts){
                    $templates->the_post();					
                    $bew_tid = get_the_ID();
					
                }else{
                    return false;
                }
                wp_reset_postdata();
                return $bew_tid;
			
    }
	
	function get_woo_category_template(){			
        
            if(is_shop() || is_tax('product_cat') || is_product() || is_singular('elementor_library')|| is_page() || Elementor\Plugin::instance()->editor->is_edit_mode()){
                $args = array(
                    'post_type' => 'elementor_library',
                    'meta_query' => array(
						'relation'    => 'AND',
                        array(
                            'key' => 'briefcase_template_layout',
                            'value'   => 'woo-cat',
                            'compare' => '='
                        ),
						array(
                            'key' => 'briefcase_template_layout_cat',
                            'value'   => 'on',
                            'compare' => '='
                        ), 
                    )
                );
                $templates = new WP_Query($args);

                if($templates->found_posts){
                    $templates->the_post();
                    $bew_tid = get_the_ID();
                }else{
                    return false;
                }				
                wp_reset_postdata();
                return $bew_tid;
					
            }
        
        return false;
    }
	
	function get_woo_thankyou_template(){	
	
            $args = array(
                'post_type' => 'elementor_library',
                'meta_query' => array(
	    		'relation'    => 'AND',
                    array(
                        'key' => 'briefcase_template_layout',
                        'value'   => 'woo-thankyou',
                        'compare' => '='
                    ),				    
                )
            );
            $templates = new WP_Query($args);
				
            if($templates->found_posts){
                $templates->the_post();					
                $bew_tid = get_the_ID();
			
            }else{
                return false;
            }
            wp_reset_postdata();
            return $bew_tid;
				
    }

	function get_woo_account_template(){	
	
            $args = array(
                'post_type' => 'elementor_library',
                'meta_query' => array(
	    		'relation'    => 'AND',
                    array(
                        'key' => 'briefcase_template_layout',
                        'value'   => 'woo-account',
                        'compare' => '='
                    ),				    
                )
            );
            $templates = new WP_Query($args);
				
            if($templates->found_posts){
                $templates->the_post();					
                $bew_tid = get_the_ID();
			
            }else{
                return false;
            }
            wp_reset_postdata();
            return $bew_tid;
				
    }

	function get_woo_login_template(){	
	
            $args = array(
                'post_type' => 'elementor_library',
                'meta_query' => array(
	    		'relation'    => 'AND',
                    array(
                        'key' => 'briefcase_template_layout',
                        'value'   => 'woo-login',
                        'compare' => '='
                    ),				    
                )
            );
            $templates = new WP_Query($args);
				
            if($templates->found_posts){
                $templates->the_post();					
                $bew_tid = get_the_ID();
			
            }else{
                return false;
            }
            wp_reset_postdata();
            return $bew_tid;
				
    }
	
	function get_woo_cart_empty_template(){	
	
            $args = array(
                'post_type' => 'elementor_library',
                'meta_query' => array(
	    		'relation'    => 'AND',
                    array(
                        'key' => 'briefcase_template_layout',
                        'value'   => 'woo-cart-empty',
                        'compare' => '='
                    ),				    
                )
            );
            $templates = new WP_Query($args);
				
            if($templates->found_posts){
                $templates->the_post();					
                $bew_tid = get_the_ID();
			
            }else{
                return false;
            }
            wp_reset_postdata();
            return $bew_tid;
				
    }
	
	public function custom_description() {
		// Custom description callback
			add_filter( 'woocommerce_product_tabs', 'woo_custom_description_tab', 98 );
			function woo_custom_description_tab( $tabs ) {

				$tabs['description']['callback'] = 'woo_custom_description_tab_content';	// Custom description callback

				return $tabs;
			}

			function woo_custom_description_tab_content() {
				global $product, $post;
				$bewglobal = get_post_meta($post->ID, 'briefcase_apply_global', true);
				if (is_product() and $bewglobal == 'off' ) {
				
				echo 'este es custom descrition';
				} else {
					
				echo $product->get_description();
				}
			}
		}

	public static function get_templates() {
		return Elementor\Plugin::instance()->templates_manager->get_source( 'local' )->get_items();
	}
	
	/**
		 * Get Product Data for the current product
		 *
		 * @since 1.0.0
		 */
	public static function product_data() {
			
			global $product;			
				
			// Show firts product for loop template				
			if(empty($product)){
				// Todo:: Get product from template meta field if available
					$args = array(
						'post_type' => 'product',
						'post_status' => 'publish',
						'posts_per_page' => 1
					);
					$preview_data = get_posts( $args );
					$product_data =  wc_get_product($preview_data[0]->ID);
				
					$product = $product_data; 
							
				
			}
		return $product;
	}
	
	
	/**
	* Calculate sale percentage
	*
	* @param $product
	*
	* @return float|int
	*/
	public static function get_sale_percentage( $product ) {
			$percentage    = 0;
			$regular_price = $product->get_regular_price();
			$sale_price    = $product->get_sale_price();

			if ( $product->get_regular_price() ) {
				$percentage = - round( ( ( $regular_price - $sale_price ) / $regular_price ) * 100 );
			}

			return $percentage . '%';
		}
		
		
	public static function is_briefcasewp_extras_installed() {
		$file_path = 'briefcasewp-extras/briefcasewp-extras.php';		
		return is_plugin_active( $file_path  );
	}
	
	public static function is_elementor_pro_installed() {
		$file_path = 'elementor-pro/elementor-pro.php';		
		return is_plugin_active( $file_path  );
	}
	
	public function bew_get_templates_id($template_slug) {
		
		// Get unique domain name
		$url = get_site_url();
		$parseUrl = parse_url($url);
		$name = str_replace(['.', '-', '_'], '', $parseUrl['host']);		
		$path = str_replace(['/', '-'], ['_', ''], $parseUrl['path']);
						
		$unique_name = "my_shop_query_result_" .$name . $path;	
		
		if( $this->is_briefcasewp_extras_installed()){
			
			if(Elementor\Plugin::instance()->editor->is_edit_mode()){	
			// Get the bew templates
			
			// Get session to verify changes on briefcasewp templates
				if(!isset($_SESSION)){ 
				session_start();
				}
				if (isset($_SESSION['verify_templates_shop_render'])) {
				$verify_templates_shop_render = $_SESSION['verify_templates_shop_render'];				
				}
								
				//No cache
				if(empty($verify_templates_shop_render) ) {
					
					//This is the super slow query.	
					$templates_query = new \WP_Query(
						[
							'post_type' => 'elementor_library',
							'post_status' => 'publish',
							'posts_per_page' => -1,
							'orderby' => 'date',
							'order' => 'ASC',
							'meta_query'  => [
								'relation' => 'OR',
								[
									'relation' => 'AND',
									[
										'key' => '_elementor_template_type',
										'value' => 'briefcasewp',
									],					
									[
										'key' => 'briefcase_template_layout',
										'value' => 'woo-shop',
									],
								],
								[
									'relation' => 'AND',
									[
										'key' => '_elementor_template_type',
										'value' => 'page',
									],
									[
										'key' => 'briefcase_template_layout',
										'value' => 'woo-shop',
									],
								],
							],
						]
					);
					
					$templates = $templates_query;				
					$dataTemplates = [];
					
					foreach ( $templates->get_posts() as $post ) {		
					$template_title  = sanitize_title($post->post_title);
					$template_id  	 = $post->ID;		
					$dataTemplates[] = array("id"=>$template_id ,"title"=>$template_title);
					}
					wp_reset_postdata();
					
					//Cache it!		
					if (!get_site_option($unique_name)) {
					add_site_option( $unique_name, $dataTemplates);		
					}else {				
					update_site_option($unique_name, $dataTemplates);	
					}
									
					// Save session to verify changes on briefcasewp templates
					if(!isset($_SESSION)){ 
					session_start();
					}
					$verify_templates_shop_render = count($dataTemplates);
					$_SESSION['verify_templates_shop_render'] = $verify_templates_shop_render;
					
				} else {
					//Get data from Cache					
					$dataTemplates = get_site_option($unique_name);						
				}
			
			}else {	
					$dataTemplates = get_site_option($unique_name);
					
					// look for templates if is not cached
					if(empty($dataTemplates) ) {
						
						// Get the bew templates
						$templates_query = new \WP_Query(
							[
								'post_type' => 'elementor_library',
								'post_status' => 'publish',
								'posts_per_page' => -1,
								'orderby' => 'date',
								'order' => 'ASC',
								'meta_query'  => [
									'relation' => 'OR',
									[
										'relation' => 'AND',
										[
											'key' => '_elementor_template_type',
											'value' => 'briefcasewp',
										],					
										[
											'key' => 'briefcase_template_layout',
											'value' => 'woo-shop',
										],
									],
									[
										'relation' => 'AND',
										[
											'key' => '_elementor_template_type',
											'value' => 'page',
										],
										[
											'key' => 'briefcase_template_layout',
											'value' => 'woo-shop',
										],
									],
								],
							]
						);
							
						$templates = $templates_query;				
						$dataTemplates = [];
						
						foreach ( $templates->get_posts() as $post ) {		
						$template_title  = sanitize_title($post->post_title);
						$template_id  	 = $post->ID;		
						$dataTemplates[] = array("id"=>$template_id ,"title"=>$template_title);
						}
						wp_reset_postdata();
						
					}
			}
						
			if(! empty($dataTemplates)){
				sort($dataTemplates);		
				$key = array_search($template_slug,array_column($dataTemplates,'title'));		
				$dataTemplate = $dataTemplates[$key];
				$dataTemplate_id  = $dataTemplate['id'];	
			}
			
			$template_id = $dataTemplate_id;
						
		}else{
			$template_id = $template_slug;	
		}
		
		
		return $template_id; 
	}
	
	public function bew_get_templates_cat_id($template_slug) {
		
		// Get unique domain name
		$url = get_site_url();
		$parseUrl = parse_url($url);
		$name = str_replace(['.', '-', '_'], '', $parseUrl['host']);		
		$path = str_replace(['/', '-'], ['_', ''], $parseUrl['path']);
						
		$unique_name_cat = "my_cat_query_result_" .$name . $path;
		
		if( $this->is_briefcasewp_extras_installed()){					
			
			if(Elementor\Plugin::instance()->editor->is_edit_mode()){	
			// Get the bew templates
			
			// Get session to verify changes on briefcasewp templates
				if(!isset($_SESSION)){ 
				session_start();
				}
				if (isset($_SESSION['verify_templates_cat_render'])) {
				$verify_templates_cat_render = $_SESSION['verify_templates_cat_render'];				
				}
								
				//No cache
				if(empty($verify_templates_cat_render) ) {
					
					//This is the super slow query.	
					$templates_query = new \WP_Query(
						[
							'post_type' => 'elementor_library',
							'post_status' => 'publish',
							'posts_per_page' => -1,
							'orderby' => 'date',
							'order' => 'ASC',
							'meta_query'  => [
								'relation' => 'OR',
								[
									'relation' => 'AND',
									[
										'key' => '_elementor_template_type',
										'value' => 'briefcasewp',
									],					
									[
										'key' => 'briefcase_template_layout',
										'value' => 'woo-cat',
									],
								],
								[
									'relation' => 'AND',
									[
										'key' => '_elementor_template_type',
										'value' => 'page',
									],
									[
										'key' => 'briefcase_template_layout',
										'value' => 'woo-cat',
									],
								],
							],
						]
					);
					
					$templates = $templates_query;				
					$dataTemplates = [];
					
					foreach ( $templates->get_posts() as $post ) {		
					$template_title  = sanitize_title($post->post_title);
					$template_id  	 = $post->ID;		
					$dataTemplates[] = array("id"=>$template_id ,"title"=>$template_title);
					}
					wp_reset_postdata();
					
					//Cache it!				
					if (!get_site_option($unique_name_cat)) {
					add_site_option( $unique_name_cat, $dataTemplates);		
					}else {				
					update_site_option($unique_name_cat, $dataTemplates);	
					}
					
					// Save session to verify changes on briefcasewp templates
					if(!isset($_SESSION)){ 
					session_start();
					}
					$verify_templates_cat_render = count($dataTemplates);
					$_SESSION['verify_templates_cat_render'] = $verify_templates_cat_render;
					
				} else {
					//Get data from Cache
							
					$dataTemplates = get_site_option($unique_name_cat);	
				}
					
			} else {

				$dataTemplates = get_site_option($unique_name_cat);
				
				if(empty($dataTemplates) ) {
					
					// Get the bew templates				
					$templates_query = new \WP_Query(
						[
							'post_type' => 'elementor_library',
							'post_status' => 'publish',
							'posts_per_page' => -1,
							'orderby' => 'date',
							'order' => 'ASC',
							'meta_query'  => [
								'relation' => 'OR',
								[
									'relation' => 'AND',
									[
										'key' => '_elementor_template_type',
										'value' => 'briefcasewp',
									],					
									[
										'key' => 'briefcase_template_layout',
										'value' => 'woo-cat',
									],
								],
								[
									'relation' => 'AND',
									[
										'key' => '_elementor_template_type',
										'value' => 'page',
									],
									[
										'key' => 'briefcase_template_layout',
										'value' => 'woo-cat',
									],
								],
							],
						]
					);
							
					$templates = $templates_query;				
					$dataTemplates = [];
						
					foreach ( $templates->get_posts() as $post ) {		
					$template_title  = sanitize_title($post->post_title);
					$template_id  	 = $post->ID;		
					$dataTemplates[] = array("id"=>$template_id ,"title"=>$template_title);
					}
					wp_reset_postdata();
					
				} 	
			}
						
			if(! empty($dataTemplates)){
				sort($dataTemplates);		
				$key = array_search($template_slug,array_column($dataTemplates,'title'));		
				$dataTemplate = $dataTemplates[$key];
				$dataTemplate_id  = $dataTemplate['id'];	
			}			
						
			$template_id = $dataTemplate_id;
						
		}else{
			$template_id = $template_slug;	
		}	
		
		return $template_id; 
	}
	
	public function bew_get_templates_id_no_cache($template_slug) {
						
		if( $this->is_briefcasewp_extras_installed()){
				
			// Get the bew templates
				$templates_query = new \WP_Query(
					[
						'post_type' => 'elementor_library',
						'post_status' => 'publish',
						'posts_per_page' => -1,
						'orderby' => 'date',
						'order' => 'ASC',
						'meta_query'  => [
							'relation' => 'OR',
							[
								'relation' => 'AND',
								[
									'key' => '_elementor_template_type',
									'value' => 'briefcasewp',
								],					
								[
									'key' => 'briefcase_template_layout',
									'value' => 'woo-shop',
								],
							],
							[
								'relation' => 'AND',
								[
									'key' => '_elementor_template_type',
									'value' => 'page',
								],
								[
									'key' => 'briefcase_template_layout',
									'value' => 'woo-shop',
								],
							],
						],
					]
				);
					
				$templates = $templates_query;				
				$dataTemplates = [];
				
				foreach ( $templates->get_posts() as $post ) {		
				$template_title  = sanitize_title($post->post_title);
				$template_id  	 = $post->ID;		
				$dataTemplates[] = array("id"=>$template_id ,"title"=>$template_title);
				}
				wp_reset_postdata();
									
			if(! empty($dataTemplates)){
				sort($dataTemplates);		
				$key = array_search($template_slug,array_column($dataTemplates,'title'));		
				$dataTemplate = $dataTemplates[$key];
				$dataTemplate_id  = $dataTemplate['id'];	
			}
			
			$template_id = $dataTemplate_id;
						
		}else{
			$template_id = $template_slug;	
		}	
		
		return $template_id; 
	}
	
	public function bew_get_templates_cat_id_no_cache($template_slug) {		
		
		if( $this->is_briefcasewp_extras_installed()){					
				
			// Get the bew templates
				
			//This is the super slow query.	
				$templates_query = new \WP_Query(
					[
						'post_type' => 'elementor_library',
						'post_status' => 'publish',
						'posts_per_page' => -1,
						'orderby' => 'date',
						'order' => 'ASC',
						'meta_query'  => [
							'relation' => 'OR',
							[
								'relation' => 'AND',
								[
									'key' => '_elementor_template_type',
									'value' => 'briefcasewp',
								],					
								[
									'key' => 'briefcase_template_layout',
									'value' => 'woo-cat',
								],
							],
							[
								'relation' => 'AND',
								[
									'key' => '_elementor_template_type',
									'value' => 'page',
								],
								[
									'key' => 'briefcase_template_layout',
									'value' => 'woo-cat',
								],
							],
						],
					]
				);
					
				$templates = $templates_query;				
				$dataTemplates = [];
				
				foreach ( $templates->get_posts() as $post ) {		
				$template_title  = sanitize_title($post->post_title);
				$template_id  	 = $post->ID;		
				$dataTemplates[] = array("id"=>$template_id ,"title"=>$template_title);
				}
				wp_reset_postdata();
									
			if(! empty($dataTemplates)){
				sort($dataTemplates);		
				$key = array_search($template_slug,array_column($dataTemplates,'title'));		
				$dataTemplate = $dataTemplates[$key];
				$dataTemplate_id  = $dataTemplate['id'];	
			}			
						
			$template_id = $dataTemplate_id;
						
		}else{
			$template_id = $template_slug;	
		}	
		
		return $template_id; 
	}
	
	/**
	 * Get base shop page link
	 *
	 * @param bool $keep_query
	 *
	 * @return false|string|void|WP_Error
	 */
	public static function get_shop_page_link( $keep_query = false ) {

		// Base Link decided by current page
		if ( defined( 'SHOP_IS_ON_FRONT' ) ) {
			$link = home_url();
		} elseif ( is_post_type_archive( 'product' ) || is_page( wc_get_page_id( 'shop' ) ) ) {
			$link = get_post_type_archive_link( 'product' );
		} elseif ( is_product_category() ) {
			$link = get_term_link( get_query_var( 'product_cat' ), 'product_cat' );
		} elseif ( is_product_tag() ) {
			$link = get_term_link( get_query_var( 'product_tag' ), 'product_tag' );
		} else {
			$link = get_term_link( get_query_var( 'term' ), get_query_var( 'taxonomy' ) );
		}

		if ( $keep_query ) {

			// Keep query string vars intact
			foreach ( $_GET as $key => $val ) {

				if ( 'orderby' === $key || 'submit' === $key || 'product-page' === $key ) {
					continue;
				}

				$link = add_query_arg( $key, $val, $link );
			}
		}

		return $link;
	}
	
	public static function is_shop() {
			return ( function_exists( 'is_shop' ) && is_shop() ) || ( function_exists( 'is_product_taxonomy' ) && is_product_taxonomy() );
	}
			
	/** Forms */

	/**
	 * Outputs a checkout/address form field.
	 *
	 * @param string $key Key.
	 * @param mixed  $args Arguments.
	 * @param string $value (default: null).
	 * @return string
	 */
	function bew_woocommerce_form_field( $key, $args, $value = null ) {
		$defaults = array(
			'type'              => 'text',
			'label'             => '',
			'description'       => '',
			'placeholder'       => '',
			'maxlength'         => false,
			'required'          => false,
			'autocomplete'      => false,
			'id'                => $key,
			'class'             => array(),
			'label_class'       => array(),
			'input_class'       => array(),
			'return'            => false,
			'options'           => array(),
			'custom_attributes' => array(),
			'validate'          => array(),
			'default'           => '',
			'autofocus'         => '',
			'priority'          => '',
		);

		$args = wp_parse_args( $args, $defaults );
		$args = apply_filters( 'woocommerce_form_field_args', $args, $key, $value );

		if ( $args['required'] ) {
			$args['class'][] = 'validate-required';
			$required        = '&nbsp;<abbr class="required" title="' . esc_attr__( 'required', 'woocommerce' ) . '">*</abbr>';
		} else {
			$required = '&nbsp;<span class="optional">(' . esc_html__( 'optional', 'woocommerce' ) . ')</span>';
		}

		if ( is_string( $args['label_class'] ) ) {
			$args['label_class'] = array( $args['label_class'] );
		}

		if ( is_null( $value ) ) {
			$value = $args['default'];
		}

		// Custom attribute handling.
		$custom_attributes         = array();
		$args['custom_attributes'] = array_filter( (array) $args['custom_attributes'], 'strlen' );

		if ( $args['maxlength'] ) {
			$args['custom_attributes']['maxlength'] = absint( $args['maxlength'] );
		}

		if ( ! empty( $args['autocomplete'] ) ) {
			$args['custom_attributes']['autocomplete'] = $args['autocomplete'];
		}

		if ( true === $args['autofocus'] ) {
			$args['custom_attributes']['autofocus'] = 'autofocus';
		}

		if ( $args['description'] ) {
			$args['custom_attributes']['aria-describedby'] = $args['id'] . '-description';
		}
			
		// add custom bew data attributes
		if ( ! empty( $args['show_in_email'] ) ) {
			$args['custom_attributes']['show_in_email'] = $args['show_in_email'];
		}
		
		if ( ! empty( $args['show_in_order'] ) ) {
			$args['custom_attributes']['show_in_order'] = $args['show_in_order'];
		}
		
		if ( ! empty( $args['conditional'] ) ) {
			$args['custom_attributes']['conditional'] = $args['conditional'];
		}
		
		if ( ! empty( $args['superior_field'] ) ) {
			$args['custom_attributes']['superior_field'] = $args['superior_field'];
		}
		
		if ( ! empty( $args['superior_field_option'] ) ) {
			$args['custom_attributes']['superior_field_option'] = $args['superior_field_option'];
		}
		
		if ( ! empty( $args['custom_attributes'] ) && is_array( $args['custom_attributes'] ) ) {
			foreach ( $args['custom_attributes'] as $attribute => $attribute_value ) {
				$custom_attributes[] = esc_attr( $attribute ) . '="' . esc_attr( $attribute_value ) . '"';
			}
		}

		if ( ! empty( $args['validate'] ) ) {
			foreach ( $args['validate'] as $validate ) {
				$args['class'][] = 'validate-' . $validate;
			}
		}
		
		$field           = '';
		$label_id        = $args['id'];
		$sort            = $args['priority'] ? $args['priority'] : '';
		$conditional     = $args['conditional'] ? "field-conditional-". $args['conditional'] : '';
		$option_layout   = $args['option_layout'] ? "option-layout-". $args['option_layout'] : '';
		$row_class       = array_values($args['class'])[0];
		$custom_class    = $args['custom_class'];
		
		$field_container = '<div class="form-row ' . esc_attr( $option_layout ) . ' '. esc_attr( $conditional ) . ' '. esc_attr( $custom_class ) . ' %1$s" id="%2$s" data-row = "' . esc_attr( $row_class ) . '" data-priority="' . esc_attr( $sort ) . '">%3$s</div>';

		switch ( $args['type'] ) {
			case 'country':
				$countries = 'shipping_country' === $key ? WC()->countries->get_shipping_countries() : WC()->countries->get_allowed_countries();

				if ( 1 === count( $countries ) ) {

					$field .= '<strong>' . current( array_values( $countries ) ) . '</strong>';

					$field .= '<input type="hidden" name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" value="' . current( array_keys( $countries ) ) . '" ' . implode( ' ', $custom_attributes ) . ' class="country_to_state" readonly="readonly" />';

				} else {

					$field = '<select name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" class="country_to_state country_select ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" ' . implode( ' ', $custom_attributes ) . '><option value="default">' . esc_html__( 'Select a country / region&hellip;', 'woocommerce' ) . '</option>';

					foreach ( $countries as $ckey => $cvalue ) {
						$field .= '<option value="' . esc_attr( $ckey ) . '" ' . selected( $value, $ckey, false ) . '>' . esc_html( $cvalue ) . '</option>';
					}

					$field .= '</select>';

					$field .= '<noscript><button type="submit" name="woocommerce_checkout_update_totals" value="' . esc_attr__( 'Update country / region', 'woocommerce' ) . '">' . esc_html__( 'Update country / region', 'woocommerce' ) . '</button></noscript>';

				}

				break;
			case 'state':
				/* Get country this state field is representing */
				$for_country = isset( $args['country'] ) ? $args['country'] : WC()->checkout->get_value( 'billing_state' === $key ? 'billing_country' : 'shipping_country' );
				$states      = WC()->countries->get_states( $for_country );

				if ( is_array( $states ) && empty( $states ) ) {

					$field_container = '<div class="form-row %1$s" id="%2$s" data-row = "' . esc_attr( $row_class ). '" style="display: none">%3$s</div>';

					$field .= '<input type="hidden" class="hidden" name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" value="" ' . implode( ' ', $custom_attributes ) . ' placeholder="' . esc_attr( $args['placeholder'] ) . '" readonly="readonly" data-input-classes="' . esc_attr( implode( ' ', $args['input_class'] ) ) . '"/>';

				} elseif ( ! is_null( $for_country ) && is_array( $states ) ) {

					$field .= '<select name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" class="state_select ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" ' . implode( ' ', $custom_attributes ) . ' data-placeholder="' . esc_attr( $args['placeholder'] ? $args['placeholder'] : esc_html__( 'Select an option&hellip;', 'woocommerce' ) ) . '"  data-input-classes="' . esc_attr( implode( ' ', $args['input_class'] ) ) . '">
						<option value="">' . esc_html__( 'Select an option&hellip;', 'woocommerce' ) . '</option>';

					foreach ( $states as $ckey => $cvalue ) {
						$field .= '<option value="' . esc_attr( $ckey ) . '" ' . selected( $value, $ckey, false ) . '>' . esc_html( $cvalue ) . '</option>';
					}

					$field .= '</select>';

				} else {

					$field .= '<input type="text" class="input-text ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" value="' . esc_attr( $value ) . '"  placeholder="' . esc_attr( $args['placeholder'] ) . '" name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" ' . implode( ' ', $custom_attributes ) . ' data-input-classes="' . esc_attr( implode( ' ', $args['input_class'] ) ) . '"/>';

				}

				break;
			case 'textarea':
				$field .= '<textarea name="' . esc_attr( $key ) . '" class="input-text ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" id="' . esc_attr( $args['id'] ) . '" placeholder="' . esc_attr( $args['placeholder'] ) . '" ' . ( empty( $args['custom_attributes']['rows'] ) ? ' rows="2"' : '' ) . ( empty( $args['custom_attributes']['cols'] ) ? ' cols="5"' : '' ) . implode( ' ', $custom_attributes ) . '>' . esc_textarea( $value ) . '</textarea>';

				break;
			case 'checkbox':
				$field = '<label class="checkbox ' . implode( ' ', $args['label_class'] ) . '" ' . implode( ' ', $custom_attributes ) . '>
						<input type="' . esc_attr( $args['type'] ) . '" class="input-checkbox ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" value="1" ' . checked( $value, 1, false ) . ' /> ' . $args['label'] . $required . '</label>';

				break;
			case 'text':
			case 'password':
			case 'datetime':
			case 'datetime-local':
			case 'date':
			case 'month':
			case 'time':
			case 'week':
			case 'number':
			case 'email':
			case 'url':
			case 'tel':
				$field .= '<input type="' . esc_attr( $args['type'] ) . '" class="input-text ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" placeholder="' . esc_attr( $args['placeholder'] ) . '"  value="' . esc_attr( $value ) . '" ' . implode( ' ', $custom_attributes ) . ' />';

				break;
			case 'hidden':
				$field .= '<input type="' . esc_attr( $args['type'] ) . '" class="input-hidden ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" value="' . esc_attr( $value ) . '" ' . implode( ' ', $custom_attributes ) . ' />';

				break;
			case 'select':
				$field   = '';
				$options = '';

				if ( ! empty( $args['options'] ) ) {
					foreach ( $args['options'] as $option_key => $option_text ) {
						if ( '' === $option_key ) {
							// If we have a blank option, select2 needs a placeholder.
							if ( empty( $args['placeholder'] ) ) {
								$args['placeholder'] = $option_text ? $option_text : __( 'Choose an option', 'woocommerce' );
							}
							$custom_attributes[] = 'data-allow_clear="true"';
						}
						$options .= '<option value="' . esc_attr( $option_key ) . '" ' . selected( $value, $option_key, false ) . '>' . esc_html( $option_text ) . '</option>';
					}

					$field .= '<select name="' . esc_attr( $key ) . '" id="' . esc_attr( $args['id'] ) . '" class="select ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" ' . implode( ' ', $custom_attributes ) . ' data-placeholder="' . esc_attr( $args['placeholder'] ) . '">
							' . $options . '
						</select>';
				}

				break;
			case 'radio':
				$label_id .= '_' . current( array_keys( $args['options'] ) );
											
				if ( ! empty( $args['options'] ) ) {
					$field .= '<div class="bew-input-radio">';
					foreach ( $args['options'] as $option_key => $option_text ) {						
						$field .= '<input type="radio" class="input-radio ' . esc_attr( implode( ' ', $args['input_class'] ) ) . '" value="' . esc_attr( $option_key ) . '" name="' . esc_attr( $key ) . '" ' . implode( ' ', $custom_attributes ) . ' id="' . esc_attr( $args['id'] ) . '_' . esc_attr( $option_key ) . '"' . checked( $value, $option_key, false ) . ' />';
						$field .= '<label for="' . esc_attr( $args['id'] ) . '_' . esc_attr( $option_key ) . '" class="radio ' . implode( ' ', $args['label_class'] ) . '">' . esc_html( $option_text ) . '</label>';
					}
					$field .= '</div>';
				}

				break;
		}

		if ( ! empty( $field ) ) {
			$field_html = '';

			$field_html .= '<span class="woocommerce-input-wrapper">' . $field;

			if ( $args['description'] ) {
				$field_html .= '<span class="description" id="' . esc_attr( $args['id'] ) . '-description" aria-hidden="true">' . wp_kses_post( $args['description'] ) . '</span>';
			}
			
			if ( $args['label'] && 'checkbox' !== $args['type'] ) {
				$field_html .= '<label for="' . esc_attr( $label_id ) . '" class="' . esc_attr( implode( ' ', $args['label_class'] ) ) . '">' . wp_kses_post( $args['label'] ) . $required . '</label>';
			}
			$field_html .= '</span>';

			$container_class = esc_attr( implode( ' ', $args['class'] ) );
			$container_id    = esc_attr( $args['id'] ) . '_field';
			$field           = sprintf( $field_container, $container_class, $container_id, $field_html );
		}

		/**
		 * Filter by type.
		 */
		$field = apply_filters( 'bew_woocommerce_form_field_' . $args['type'], $field, $key, $args, $value );

		/**
		 * General filter on form fields.
		 *
		 * @since 3.4.0
		 */
		$field = apply_filters( 'bew_woocommerce_form_field', $field, $key, $args, $value );

		if ( $args['return'] ) {
			return $field;
		} else {
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo $field;
		}
	}

	

}

