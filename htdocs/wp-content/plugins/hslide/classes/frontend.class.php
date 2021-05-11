<?php

	#PLUGIN FRONT-END MANAGEMENT
	class hslide_frontend{
		
		#IMPLEMENT SHORTCODE LISTENER
		public function get_shortcode_content($atts){
			//fetch object and return
			return $this->get_object_from_database($atts['id']);
		}
		
		#GET OBJECT FROM DATABASE
		private function get_object_from_database($object_id){
			//check for object
			if(isset($object_id)){
				//access globals
				global $wpdb, $hslide_helper;
				//select object
				$object = $wpdb->get_results("
					SELECT
						*
					FROM
						`". $wpdb->base_prefix ."hslide_default_storage_table`
					WHERE
						`storage_id` = ". $object_id ."
						AND `deleted` = 0;
				");
				//check that object exists
				if(count($object) > 0){
					//generate unique name
					$unique_name = str_replace('-','',$hslide_helper->genGUID());
					
					$response = '
						<script type="text/javascript">
							var hslide_default_object_'. $unique_name .' = '. str_replace("'",'&quot;',str_replace('\'','&#8217;',str_replace('\"','&quot;',str_replace('\r\n','<br>',str_replace('\\\\','&#92;',$object[0]->json_object))))) .';
							jQuery(function(){
								hslide_initialise_frontend("'. $unique_name .'");
							});
						</script>
						
						<!-- < : MISC HOLDER - FOLD ANIMATION -->

							<div class="hslider_misc_holder" id="hslider_'. $unique_name .'">
							
								<div class="hslider_loader" id="hslider_loader_'. $unique_name .'"></div>
								
								<!-- LEFT BUTTON -->
								<div class="hslider_left hslider_side_btn" data-side-button="true" data-side="left">
									<!-- LOAD ARROW HTML HERE -->
								</div>
								
								<!-- RIGHT BUTTON -->
								<div class="hslider_right hslider_side_btn" data-side-button="true" data-side="right">
									<!-- LOAD ARROW HTML HERE -->
								</div>        
								
								<!-- PAGER -->
								<div class="hslider_pager_holder hslider_pager_scale"></div>
								
								<!-- TIMER -->
								<div class="hslider_timer_holder">
									<div class="hslider_inner_timer"></div>
								</div>
							  
								<!-- SLIDE HOLDER -->
								<div class="hslider_slide_holder"></div>
								
							</div>
							
							<div class="hslider_width_checker" id="hslider_width_checker_'.$unique_name.'"></div>
							
						<!-- > : MISC HOLDER  - FOLD ANIMATION -->
						
						<!-- HIDDEN -->
						
							<div class="hslider_hidden" id="hslider_hidden_'.$unique_name.'">
								
							</div>
							
						<!-- HIDDEN -->
						
					';
					
					return $response;
					
				}
			}
			//respond with not found
			return 'Unable to locate object with id: '. $object_id;
		}
		
		#GET POST CONTENT
		public function get_post_content(){
			
			//globals
			global $wpdb, $post;
			
			//setup post data
			@setup_postdata($post); 
			
			//post data
			$display = $_POST['display'];
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
			$display = $_POST['display'];
			$category = $_POST['category'];
			$number = $_POST['number'];
			$size = $_POST['size'];
			$display = $_POST['display'];
			$custom = $_POST['custom'];
			
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
					if($post->post_excerpt != ''){
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
		
	}	