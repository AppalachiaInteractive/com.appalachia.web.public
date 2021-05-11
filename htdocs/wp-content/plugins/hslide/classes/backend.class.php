<?php

	#PLUGIN BACK-END MANAGEMENT
	class hslide_backend{
		
		#CONSTRUCT
		public function __construct(){
		}
		
		#GET PRODUCT COUNT
		public function check_woo(){
			
			#ACCESS GLOBALS
			global $wpdb,$hmenu_helper,$woocommerce;
			
			$woo_status = false;
			
			if ( class_exists( 'WooCommerce' ) ) {					  	
				#ACTIVE	
				$woo_status = true;
				echo json_encode($woo_status);			
				exit();						
			} else {
			  	#NOT ACTIVE
				echo json_encode($woo_status);			
				exit();	
			}
			
			
		}
		
		#INSERT OBJECT
		public function insert_object(){
			//check for object
			if(isset($_POST['object_name']) && isset($_POST['object'])){
				//access globals
				global $wpdb;
				//insert default object
				$sql_insert = $wpdb->query("
					INSERT INTO `". $wpdb->base_prefix ."hslide_default_storage_table` (`object_name`, `json_object`)
					VALUES('". str_replace('"','&quot;',str_replace('\'','&#8217;',$_POST['object_name'])) ."','". $_POST['object'] ."');
				");
				echo json_encode($wpdb->insert_id);
				exit();
			}
			//respond with error
			echo json_encode(false);
			exit();
		}		
		
		#GET OBJECT LIST
		public function get_object_list(){
			//access globals
			global $wpdb;
			//select object list
			$objects = $wpdb->get_results("
				SELECT
					*
				FROM
					`". $wpdb->base_prefix ."hslide_default_storage_table`
				WHERE
					`deleted` = 0;
			");
			//check that at least one object exists
			if(count($objects) > 0){
				//create return object
				$object_list = array();
				//iterate results
				foreach($objects as $object){
					array_push($object_list, array(
						'object_id' => intval($object->storage_id),
						'object_name' => $object->object_name
					));
				}
				//return object list
				echo json_encode($object_list);
				exit();				
			}
			//respond with nothing found
			echo json_encode(false);
			exit();
		}
		
		#GET OBJECT
		public function get_object(){
			//check for object
			if(isset($_POST['object_id'])){
				//access globals
				global $wpdb;
				//select object
				$object = $wpdb->get_results("
					SELECT
						*
					FROM
						`". $wpdb->base_prefix ."hslide_default_storage_table`
					WHERE
						`storage_id` = ". $_POST['object_id'] ."
						AND `deleted` = 0;
				");
				//check that object exists
				if(count($object) > 0){
					//return object
					echo json_encode(array(
						'object_name' => $object[0]->object_name,
						'object' => $object[0]->json_object,
					));
					exit();
				}
			}
			//respond with error
			echo json_encode(false);
			exit();
		}
		
		#UPDATE OBJECT
		public function update_object(){
			//check for object
			if(isset($_POST['object_id']) && isset($_POST['object'])){
				//access globals
				global $wpdb;
				//insert default object
				$sql_update = $wpdb->query("
					UPDATE
						`". $wpdb->base_prefix ."hslide_default_storage_table`
					SET
						`json_object` = '". $_POST['object'] ."'
					WHERE
						`storage_id` = ". $_POST['object_id'] .";
				");
				echo json_encode(true);
				exit();
			}
			//respond with error
			echo json_encode(false);
			exit();
		}
		
		#RENAME OBJECT
		public function rename_object(){
			//check for object
			if(isset($_POST['object_id']) && isset($_POST['object_name'])){
				//access globals
				global $wpdb;
				//insert default object
				$sql_update = $wpdb->query("
					UPDATE
						`". $wpdb->base_prefix ."hslide_default_storage_table`
					SET
						`object_name` = '". str_replace('"','&quot;',str_replace('\'','&#8217;',$_POST['object_name'])) ."'
					WHERE
						`storage_id` = ". $_POST['object_id'] .";
				");
				echo json_encode(true);
				exit();
			}
			//respond with error
			echo json_encode(false);
			exit();
		}
		
		#DELETE OBJECT
		public function delete_object(){
			//check for object_id
			if(isset($_POST['object_id'])){
				//access globals
				global $wpdb;
				//insert default object
				$sql_update = $wpdb->query("
					UPDATE
						`". $wpdb->base_prefix ."hslide_default_storage_table`
					SET
						`deleted` = 1
					WHERE
						`storage_id` = ". $_POST['object_id'] .";
				");
				echo json_encode(true);
				exit();
			}
			//respond with error
			echo json_encode(false);
			exit();
		}
		
		#DUPLICATE OBJECT
		public function duplicate_object(){
			//check for object_id
			if(isset($_POST['object_id'])){
				//access globals
				global $wpdb;
				//select object
				$object = $wpdb->get_results("
					SELECT
						*
					FROM
						`". $wpdb->base_prefix ."hslide_default_storage_table`
					WHERE
						`storage_id` = ". $_POST['object_id'] ."
						AND `deleted` = 0;
				");
				//check that object exists
				if(count($object) > 0){
					//create duplicate object
					$sql_insert = $wpdb->query("
						INSERT INTO `". $wpdb->base_prefix ."hslide_default_storage_table` (`object_name`, `json_object`)
						VALUES('". $object[0]->object_name ." (clone)','". $object[0]->json_object ."');
					");
					echo json_encode($wpdb->insert_id);
					exit();
				}
			}
			//respond with error
			echo json_encode(false);
			exit();
		}
		
		#CODE ASSIST EXAMPLE
		public function code_assist_example(){
			
			//access post data
			$post_data = $_POST['form_data'];
			
			//convert post data to PHP object
			$form_data = array();
			parse_str($post_data, $form_data);
			
			//define response
			$response_message = 'Data received: ';
			
			//respond with JSON object
			echo json_encode($response_message . $form_data['my_input']);
			exit();
			
		}
		
		#GET POST DATA
		public function get_post_data(){
			
			//globals
			global $wpdb, $post;
			
			//setup post data
			@setup_postdata($post); 
			
			//object
			$object = array(
				'categories' => array()		
			);
			
			//category arguments
			$cat_args = array(
				'orderby' => 'name',
				'order' => 'DESC',
				'taxonomy' => 'category'
			);	
			
			$the_categories = get_categories($cat_args);
			
			//categories
			if($the_categories){
				foreach($the_categories as $cat){
					array_push($object['categories'], array(
						'id' => $cat->term_id,
						'title' => $cat->name,
						'slug' => $cat->slug,
						'taxonomy' => $cat->taxonomy,
						'cat_id' => $cat->cat_ID,
						'link' => get_category_link( $cat->term_id )
					));		
				}
			} 			
			
			//respond with JSON object
			echo json_encode($object);
			exit();
			
		}
		
		#GET WOO DATA
		public function get_woo_data(){
			
			//globals
			global $wpdb, $post;
			
			//setup post data
			@setup_postdata($post); 
			
			//object
			$object = array(
				'categories' => array()		
			);
			
			//category arguments
			$args = array(
				'taxonomy'     => 'product_cat',
				'orderby'      => 'name',
				'show_count'   => 1,
				'pad_counts'   => 1,
				'hierarchical' => 0,
				'hide_empty'   => 1
			);
			
			$the_categories = get_categories($args);
			
			//categories
			if($the_categories){
				foreach($the_categories as $cat){
					array_push($object['categories'], array(
						'id' => $cat->term_id,
						'title' => $cat->name,
						'slug' => $cat->slug,
						'taxonomy' => $cat->taxonomy,
						'cat_id' => $cat->cat_ID,
						'link' => get_category_link( $cat->term_id )
					));		
				}
			} 	
			
			//respond with JSON object
			echo json_encode($object);
			exit();
			
		}
		
		#GET POST CONTENT
		public function get_post_content(){
			
			//globals
			global $wpdb, $post;
			
			//setup post data
			@setup_postdata($post); 
			
			//post data
			$category = $_POST['category'];
			$number = $_POST['number'];
			$size = $_POST['size'];
			
			//array
			$post_array = array();
			
			//arguments
			$args = array(
				'post_type' => 'post',
				'numberposts' => $number,
				'orderby' => 'date',
				'category' => $category,
				'order' => 'DESC'
			);		
					
			$the_posts = get_posts($args);
			
			if($the_posts){		
				foreach($the_posts as $p){
					
					//featured image
					$image_details = wp_get_attachment_image_src ( get_post_thumbnail_id ( $p->ID ), $size );
						
					//content
					if($p->post_excerpt != ''){
						$content = rtrim(substr($p->post_excerpt, 0, 100)).'...'; 
					} else {
						$content = rtrim(substr($p->post_content, 0, 100));
					}
					
					//array push
					array_push($post_array, array(
						'id' => $p->ID,
						'title' => $p->post_title,
						'content' => $content,
						'url' => get_permalink($p->ID),
						'image' => $image_details[0]
					));
					
				}
			}
			
			//respond with JSON object
			echo json_encode($post_array);
			exit();
			
		}
		
		#GET WOO CONTENT
		public function get_woo_content(){
			
			//globals
			global $wpdb, $post, $woocommerce;
			
			//setup post data
			@setup_postdata($post); 
			
			//post data
			$category = $_POST['category'];
			$number = $_POST['number'];
			$size = $_POST['size'];
			$custom = $_POST['custom'];
			$display = $_POST['display'];
			
			//array
			$post_array = array();
			
			//check custom id's if not empty use as priority
			if($display == 'woo_custom_display'){
				//arguments
				$args = array(
					'post_type' => 'product',
					'orderby' => 'date',
					'post__in' => explode(',',$custom),
					'order' => 'DESC'
				);	
			} else {
				//arguments
				$args = array(
					'post_type' => 'product',
					'posts_per_page' => $number,
					'orderby' => 'date',
					'product_cat' => $category,
					'order' => 'DESC'
				);	
			}
					
			$the_posts = query_posts($args);
			
			if($the_posts){		
				foreach($the_posts as $p){
					
					//featured image
					$image_details = wp_get_attachment_image_src ( get_post_thumbnail_id ( $p->ID ), $size );
						
					//content
					if($p->post_excerpt != ''){
						$content = rtrim(substr($p->post_excerpt, 0, 100)).'...'; 
					} else {
						$content = rtrim(substr($p->post_content, 0, 100));
					}
					
					//status is sale
					$status = false;
					$price = get_post_meta( $p->ID, '_regular_price', true );
       				$sale_price = get_post_meta( $p->ID, '_sale_price', true );
					
					if($sale_price != "" && $sale_price >= 0 && $sale_price <= $price){
						$status = true;
					}
					
					//array push
					array_push($post_array, array(
						'id' => $p->ID,
						'title' => $p->post_title,
						'content' => $content,
						'url' => get_permalink($p->ID),
						'image' => $image_details[0],
						'price' => $price,
						'sale_price' => $sale_price,
						'currency' => get_option('woocommerce_currency'),
						'symbol' => get_woocommerce_currency_symbol(get_option('woocommerce_currency')),
						'sale' => $status
					));
					
				}
			}
			
			//respond with JSON object
			echo json_encode($post_array);
			exit();
			
		}
		
		#GET WOO PRODUCTS
		public function get_woo_products(){
			
			//globals
			global $wpdb, $post, $woocommerce;
			
			//setup post data
			@setup_postdata($post);
			
			//post data
			$category = $_POST['slug'];
			$offset = $_POST['offset'];
			
			if($category == 'all'){
				$category = '';
			}
			
			//array
			$product_array = array(
				'products' => array(),
				'settings' => array()			
			);
			
			//variables
			$products_to_display = 30;
			
			//products arguments
			$args = array(
				'post_type' => 'product',
				'posts_per_page' => $products_to_display,
				'orderby' => 'date',
				'product_cat' => $category,
				'order' => 'DESC',
				'offset' => $offset
			);		
					
			$the_posts = query_posts($args);
			
			foreach($the_posts as $p){
				//featured image
				$image_details = wp_get_attachment_image_src ( get_post_thumbnail_id ( $p->ID ), $size );
				//price
				$price = get_post_meta( $p->ID, '_regular_price', true );
				//array push
				array_push($product_array['products'], array(
					'id' => $p->ID,
					'title' => $p->post_title,
					'url' => get_permalink($p->ID),
					'image' => $image_details[0],
					'price' => $price
				));
			}
			
			//settings query $wpdb->get_var( "SELECT COUNT(*) FROM ".$wpdb->base_prefix."posts WHERE post_type = 'product
			$display_count = count($the_posts);
			
			//total products 
			$total_products = count( get_posts( array('post_type' => 'product', 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => '-1', 'product_cat' => $category) ) );
			
			array_push($product_array['settings'], array(
				'post_count_displayed' => $display_count,
				'total_products' => $total_products,
				'display' => $products_to_display,
				'category' => $category,
				'offset' => $offset
			));
			
			//respond with JSON object
			echo json_encode($product_array);
			exit();
			
		}
		
	}