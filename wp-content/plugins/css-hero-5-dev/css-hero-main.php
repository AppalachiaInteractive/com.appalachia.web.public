<?php
/* Plugin Name: CSS Hero
Plugin URI: https://www.csshero.org
Description: A live WordPress Theme editor that works without modifying any of your theme files. Very low performance footprint: only generates and adds a single static  CSS file to your site.
Version: 5.0.6
Author: The CSS Hero Team
Author URI: https://www.csshero.org
License: Commercial
*/ 

require_once ("storage_engine.php");

//enable css uploads 
add_filter('upload_mimes', 'csshero_enable_extended_upload');
function csshero_enable_extended_upload ( $mime_types =array() ) {  $mime_types['css']  = 'text/css'; return $mime_types;}

//add launch trigger/icon styles
add_action( 'admin_head', 'csshero_print_launch_icon_styles' ); // on backend area
add_action( 'wp_head', 'csshero_print_launch_icon_styles' ); // on frontend area
function csshero_print_launch_icon_styles(){
	if(!is_user_logged_in() OR !current_user_can('edit_theme_options')) return;
	?>
	<style>
		#wp-admin-bar-wpcss-css-hero-go a,#wp-admin-bar-wpcss-css-hero-go:hover a  {
			margin: 0 10px !important;
			text-indent: -9999px; white-space: nowrap; outline: none;
			width: 56px; height: 100%; 	filter:invert(1); 
			background-size: contain !important; background-repeat: no-repeat !important;
			background-image: url('<?php echo plugin_dir_url( __FILE__ ) ?>logo.svg') !important;
			background-position:center !important;	background-color: transparent !important;
			}
		#wp-admin-bar-wpcss-css-hero-go:hover a {  filter:invert(0.8); } 
	</style>
	<?php
}

// Place new  Customize with CSS Hero LINKS in post/page backend listing
add_filter('page_row_actions', 'csshero_add_action_links', 10, 2);
add_filter('post_row_actions', 'csshero_add_action_links', 10, 2);
function csshero_add_action_links($actions, $page_object) {
	if ( current_user_can('edit_theme_options') &&  wpcss_check_license() )  
		$actions['edit_page_with_ch'] = "<a class='edit_page_with_ch' href='" . esc_url( add_query_arg(array( 'csshero_action'=> 'edit_page', 'rand'=>rand(0,1024)), get_permalink($page_object->ID)))  . "'>".__( 'Customize with CSS Hero', 'ch' ) ."</a>";
	return $actions;
}

// Place in admin menu a launch/trigger link
add_action('admin_bar_menu', 'csshero_add_toolbar_items', 100);
function csshero_add_toolbar_items($admin_bar){
	if ( !current_user_can('edit_theme_options') OR !wpcss_check_license() ) return;
	
	if (!is_admin())
		$admin_bar->add_menu( array(
								'id'    => 'wpcss-css-hero-go',
								'title' => '<span id="csshero-icon-launch-editing"> </span>'.'Customize with CSS Hero',
								'href' =>   add_query_arg(array(
									'csshero_action' => 'edit_page',
									'rand' => rand(1000,10000)
								)) 
							));
	else 
		$admin_bar->add_menu( array(
		'id'    => 'wpcss-css-hero-go',
		'title' => '<span id="csshero-icon-launch-editing"> </span>'.'Customize with CSS Hero',
		'href' =>     csshero_get_trigger_url()
	));
}

function csshero_get_trigger_url() {
	$the_url=get_bloginfo('wpurl');
	if(is_admin() && isset($_GET['post']) && is_numeric($_GET['post'])) $the_url=get_permalink($_GET['post']);
	if(!is_admin()) { global $wp; $the_url = home_url(add_query_arg(array(),$wp->request)); } //v3 //if (is_singular() ) { global $wp_query; $the_url=get_permalink($wp_query->post->ID); } //v2 //if (is_singular() && isset($_GET['p']) )	$the_url=get_permalink($_GET['p']); //old v1
	return esc_url(add_query_arg(array( 'csshero_action'=>'edit_page', 'rand'=> (rand(0,1024)) ), $the_url ) );
}

function csshero_get_active_theme_slug(){ $theme_name = wp_get_theme(); return sanitize_title($theme_name);}

//////////// SAVE CURRENT STATE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
add_action( 'wp_ajax_csshero_save_state', 'csshero_ajax_save_state_func' );
function csshero_ajax_save_state_func() {
	
	if (!current_user_can("edit_theme_options")) return;
	check_ajax_referer( "csshero-saving", 'nonce' );

	//PRE FLIGHT tests
	if ( empty($_POST['csshero-livearray-saving-field']) )  { echo 'No data in csshero-livearray-saving-field.';  die(); }
	if ( empty($_POST['csshero-css-saving-field']) )  { echo 'No data in csshero-css-saving-field.';  die(); }

	//GET FROM $_POST CURRENT SETTINGS   
	$csshero_livearray_jsondata = wp_unslash ($_POST['csshero-livearray-saving-field']); 
	
	//DETERMINE A STEP NAME
	if (strlen($csshero_livearray_jsondata)<5 ) $step_name="Theme Reset ".date('h:i:s a m/d/Y', time()); else $step_name=date('h:i:s a m/d/Y', time());
	
	//SAVE TO STORAGE AS  A NEW STEP
	$inserted_step_id=csshero_storage_save_new_step($step_name, $csshero_livearray_jsondata,'frontend-css-step');
	
	//DELETE old static CSS file
	$last_uploaded_css_data=get_option('csshero_static_css_data_'.csshero_get_active_theme_slug());
	if (is_array($last_uploaded_css_data) && isset($last_uploaded_css_data['file']) ) unlink($last_uploaded_css_data['file']);
	
	//SAVE THE CSS  static file
	$uploaded= wp_upload_bits( "csshero-static-style-".csshero_get_active_theme_slug().".css", FALSE, wp_unslash( $_POST['csshero-css-saving-field']) );
	
	if ($uploaded['error']==FALSE) {
		 //echo "<h3>Uploaded ok</h3> File URL : ".$uploaded['url'];
		 $uploaded['relative_upload_path'] = _wp_relative_upload_path( $uploaded['file'] );
		 $uploaded['version']=$inserted_step_id;
		 update_option('csshero_static_css_data_'.csshero_get_active_theme_slug(),$uploaded);
		 echo "Saved";
	 } else {  echo ("Error saving CSS file to your uploads directory. ".$uploaded['error']);	}

	//LOG
	if ($_POST['csshero-log-field']!=''):
		$args = array(
			//'timeout'     => 45,		//'redirection' => 5,		//'httpversion' => '1.0',
			'blocking'    => false,	'headers' => array(), 'cookies' => array(),
			'body'        => array( 'log' =>  $_POST['csshero-log-field'] ),
		);
		
		$the_response = wp_remote_post("https://p.csshero.org/production-v5-test/heroes-event-logger.php?version=5&key=".get_site_option('csshero-license'), $args);
	endif;	

	wp_die();
	 
}



////////////  SAVE AS PRESET /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
add_action( 'wp_ajax_csshero_save_preset', 'csshero_ajax_save_preset_func' );
function csshero_ajax_save_preset_func() {
	 
	if (!current_user_can("edit_theme_options")) return;
	check_ajax_referer( "csshero-saving", 'nonce' );

	//GET FROM $_POST CURRENT SETTINGS   
	$csshero_livearray_jsondata = wp_unslash ($_POST['csshero-livearray-saving-field']); 
	//print_r($csshero_livearray_jsondata); //useful for debug
	$the_saving_action=csshero_storage_save_new_step($_POST['csshero_preset_name'], $csshero_livearray_jsondata,'frontend-css-step','preset-step');
	//CONFIRM
	if($the_saving_action) echo "Saved Preset"; else echo "Saving error";
	wp_die();
}



////////////  IMAGE UPLOAD /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
add_action( 'wp_ajax_csshero_upload_image', 'wp_ajax_csshero_upload_image_func' );
function wp_ajax_csshero_upload_image_func() {
	 
	if (!current_user_can("edit_theme_options")) return;
	check_ajax_referer( "csshero-saving", 'nonce' );

	$wordpress_upload_dir = wp_upload_dir();
	// $wordpress_upload_dir['path'] is the full server path to wp-content/uploads/2017/05, for multisite works good as well
	// $wordpress_upload_dir['url'] the absolute URL to the same folder, actually we do not need it, just to show the link to file
	$i = 1; // number of tries when the file with the same name is already exists
	 
	$the_new_image = $_FILES['newpicture'];
	$new_file_path = $wordpress_upload_dir['path'] . '/' . $the_new_image['name'];
	$new_file_mime = mime_content_type( $the_new_image['tmp_name'] );
	 
	if( empty( $the_new_image ) )
		die( 'File is not selected.' );
	 
	if( $the_new_image['error'] )
		die( $the_new_image['error'] );
	 
	if( $the_new_image['size'] > wp_max_upload_size() )
		die( 'It is too large than expected.' );
	
	$allowed_file_types = array('image/jpg','image/jpeg','image/gif','image/png','image/svg+xml');
 
	if( !in_array( $new_file_mime, $allowed_file_types) )
		die( 'WordPress doesn\'t allow this type of uploads.' );
	 
	while( file_exists( $new_file_path ) ) {
		$i++;
		$new_file_path = $wordpress_upload_dir['path'] . '/' . $i . '_' . $the_new_image['name'];
	}
	 
	// looks like everything is OK
	if( move_uploaded_file( $the_new_image['tmp_name'], $new_file_path ) ) {
	 
	 
		$upload_id = wp_insert_attachment( array(
			'guid'           => $new_file_path, 
			'post_mime_type' => $new_file_mime,
			'post_title'     => preg_replace( '/\.[^.]+$/', '', $the_new_image['name'] ),
			'post_content'   => '',
			'post_status'    => 'inherit'
		), $new_file_path );
	 
		// wp_generate_attachment_metadata() won't work if you do not include this file
		require_once( ABSPATH . 'wp-admin/includes/image.php' );
	 
		// Generate and save the attachment metas into the database
		wp_update_attachment_metadata( $upload_id, wp_generate_attachment_metadata( $upload_id, $new_file_path ) );
		
		
		$attachment_metadata=wp_get_attachment_metadata($upload_id);
		//print_r($attachment_metadata);
		$array_formats_new=array();
		foreach($attachment_metadata['sizes'] as $format=>$array_info):
				$array_formats_new[]=array($format,$wordpress_upload_dir['url'] . '/' . basename( $array_info['file'] ));
				//echo $format.":".$wordpress_upload_dir['url'] . '/' . basename( $array_info['file'] )  .'<br>';	
		endforeach;
		$array_formats_new[]=array('original',$wordpress_upload_dir['url'] . '/' . basename( $attachment_metadata['file']  ));
		
		echo json_encode($array_formats_new);
	 
	} else echo "File upload ERROR";
	wp_die();
}
///////////////////






////////////  FONT UPLOAD /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
add_action( 'wp_ajax_csshero_upload_font', 'wp_ajax_csshero_upload_font_func' );
function wp_ajax_csshero_upload_font_func() {
	 
	if (!current_user_can("edit_theme_options")) return;
	check_ajax_referer( "csshero-saving", 'nonce' );

	$wordpress_upload_dir = wp_upload_dir();
	// $wordpress_upload_dir['path'] is the full server path to wp-content/uploads/2017/05, for multisite works good as well
	// $wordpress_upload_dir['url'] the absolute URL to the same folder, actually we do not need it, just to show the link to file
	$i = 1; // number of tries when the file with the same name is already exists
	 
	$the_new_font = $_FILES['newfont'];
	$new_file_path = $wordpress_upload_dir['path'] . '/' . $the_new_font['name'];
	$new_file_mime = mime_content_type( $the_new_font['tmp_name'] );
	 
	if( empty( $the_new_font ) )
		die( 'File is not selected.' );
	 
	if( $the_new_font['error'] )
		die( $the_new_font['error'] );
	 
	if( $the_new_font['size'] > wp_max_upload_size() )
		die( 'It is too large than expected.' );
	/*
	$allowed_file_types = array('application/octet-stream','application/vnd.ms-fontobject','application/vnd.ms-opentype','application/font-sfnt','application/x-font-woff','application/font-woff2','font/sfnt');
 
	if( !in_array( $new_file_mime, $allowed_file_types) )
		die( 'WordPress doesn\'t allow this type of uploads. = '.$new_file_mime );
	 */
	while( file_exists( $new_file_path ) ) {
		$i++;
		$new_file_path = $wordpress_upload_dir['path'] . '/' . $i . '_' . $the_new_font['name'];
	}
	 
	// looks like everything is OK
	if( move_uploaded_file( $the_new_font['tmp_name'], $new_file_path ) ) {
	 
	 
		$upload_id = wp_insert_attachment( array(
			'guid'           => $new_file_path, 
			'post_mime_type' => $new_file_mime,
			'post_title'     => preg_replace( '/\.[^.]+$/', '', $the_new_font['name'] ),
			'post_content'   => '',
			'post_status'    => 'inherit'
		), $new_file_path );
		
		
		// wp_generate_attachment_metadata() won't work if you do not include this file
		require_once( ABSPATH . 'wp-admin/includes/image.php' );
	 
		// Generate and save the attachment metas into the database
		wp_update_attachment_metadata( $upload_id, wp_generate_attachment_metadata( $upload_id, $new_file_path ) );
		
		
		$attachment_metadata=wp_get_attachment_metadata($upload_id);
		//print_r($attachment_metadata);
		echo '{"url":"'.wp_get_attachment_url( $upload_id ).'","id":"'.$upload_id.'"}';
	} else echo "File upload ERROR";
	wp_die();
}
///////////////////



////////////  UTILS: to HANDLE AJAX ACTIONS for authorized & logged in users only /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
add_action( 'wp_ajax_csshero_do_action', 'wp_ajax_csshero_do_action_func' );
function wp_ajax_csshero_do_action_func() {
	 
	if (!current_user_can("edit_theme_options")) return;
	check_ajax_referer( "csshero-saving", 'nonce' );
	
	///cases of private actions /////////////////

	//PRESET LISTING (no more HISTORY)
	if (isset($_POST['csshero_action']) && $_POST['csshero_action']=='list_saved_snapshots'){
		$csshero_steps_array=csshero_get_saved_steps('frontend-css-step', 'preset'); 
		$response = json_encode($csshero_steps_array);
		header( "Content-Type: application/json" );
		echo $response;
	} //END CASE

	//GET A LOCAL PRESET / HISTORY STEP data
	if (isset($_POST['csshero_action']) && $_POST['csshero_action']=='get_snapshot') {
		$step_id=$_POST['step_id'];
		if (!is_numeric($step_id)) die ('invalid step');
		header( "Content-Type: application/json" );
		echo csshero_get_data($step_id);
	} //end case
	

	//DELETE LOCAL PRESET CASE
	if (isset($_POST['csshero_action']) && $_POST['csshero_action']=='delete_snapshot') {
		if (!is_numeric($_POST['step_id'])) die ("Invalid step id, not numeric!");
		csshero_storage_delete_step($_POST['step_id']);
		echo ("Snapshot  deleted.");
	} //end delete case
	

	
	///end actions ///////////////////////////

	wp_die();
}
function csshero_handle_actions(){		 		

	//EDITOR   LOADING FOR DEMO CASE //can be killed in your local install
	if (function_exists('csshero_demo_plugin_is_active')):
			if (isset($_GET['csshero_action']) && $_GET['csshero_action']=='edit_page')  {require_once('edit-page.php'); exit; }			   
	endif; //END CASE

	/////////////////////////ALLOW THE FOLLOWING ACTIONS ONLY FOR LOGGED IN USERS THAT  can edit_theme_options //////////////////////////////////////////////////////////////
	if (!is_user_logged_in() OR !current_user_can('edit_theme_options')  ) return; //quit function if user cannot edit_theme_options
		
	//EDIT PAGE: the editing interface LOADING case
	if (isset($_GET['csshero_action']) && $_GET['csshero_action']=='edit_page')  {require_once('edit-page.php'); exit;}
		

	//DELETE LICENSE
	if ( isset($_GET['wpcss_action']) && $_GET['wpcss_action']=='delete_license') {delete_option('csshero-license');wp_redirect(admin_url()); }

	//CHECK LICENSE DEBUG
	if ( isset($_GET['wpcss_action']) && $_GET['wpcss_action']=='check_license') { echo wpcss_check_license(); die; }

	//CSSHERO SHUTDOWN case	
	if (isset($_GET['csshero_action']) && $_GET['csshero_action'] =="shutdown") {
		//setcookie('csshero_is_on', 0, time()+1209600, COOKIEPATH, COOKIE_DOMAIN, false);
		wp_redirect(add_query_arg( array('csshero_action' => false ) ));die;
	}

	//WHEN CSSHERO IS ON ELIMINATE WP ADMIN BAR WHEN PERFORMING EDITING ACTIONS
	if (csshero_is_editing_page() ) { add_filter('show_admin_bar', '__return_false'); add_filter( 'edit_post_link', '__return_false' ); }

	//VIEW LOGIN PAGE CASE
	if (isset($_GET['csshero_style_wp_login_page'])) {
		$response = wp_remote_get( wp_login_url());
		if ( is_array( $response ) )   echo $response['body'];  else echo "<h1>No response from server</h1>";
		die();
	} //end case

	//VIEW PAGE AS UNLOGGED: USEFUL FOR SPECIAL EDITING
	if (isset($_GET['csshero_view_as_unlogged'])) {
		//global $wp;$current_url = home_url( add_query_arg( array(), $wp->request ) ); 
		$current_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		//echo $current_url;die;
		$current_url_without_parameter= add_query_arg(array( 'csshero_view_as_unlogged'=>FALSE, 'rand'=> (rand(0,1024)) ), $current_url );
		//fetch the URL
		$response = wp_remote_get( $current_url_without_parameter);
		if ( is_array( $response ) )   echo $response['body'];  else echo "<h1>No response from server</h1>";
		die();
	} //end case

	//GET ATTACHMENT IMAGES FROM WORDPRESS LIBRARY
	if (isset($_GET['csshero_get_images'])){
			
		$per_page = 9;
			
		$query_images_args = array(
			'post_type'      => 'attachment',
			'post_mime_type' => 'image',
			'post_status'    => 'inherit',
			'posts_per_page' => $per_page,
			'offset'		 => $per_page*$_GET['load_offset'],
			
		);
		
		$query_images = new WP_Query( $query_images_args );
		
		$ret = '[';
		foreach ( $query_images->posts as $image ) {
			$csshero_thumb_url = wp_get_attachment_image_src( $image->ID, 'thumbnail');
			$csshero_thumb_url = $csshero_thumb_url[0];
			$sizes = wp_get_attachment_metadata($image->ID);
			
			if ($sizes) $sizes = $sizes['sizes'];
			 
			$flat_sizes = array();
			 
			if ($sizes){
				$size_vals = array_keys($sizes);
				foreach ($size_vals as $s){
					$size_url = wp_get_attachment_image_src( $image->ID, $s);
					$flat_sizes[$s] = $size_url[0];
				}
			}
			$flat_sizes = json_encode($flat_sizes);
			
			$ret .= '{"original":"'.$csshero_thumb_url.'","formats":['.$flat_sizes.']},';
			//echo '<div class="csshero-media-img" data-url="'.$csshero_thumb_url.'" data-available-sizes="'.htmlspecialchars($flat_sizes).'" style="background-image:url(\''.$csshero_thumb_url.'\');"></div>';
			 
		}
		$ret .= '{}]';
		echo $ret;
			
		die();

	} //end image upload case
	
} //end handle actions func

	 
add_action ('wp_loaded','csshero_handle_actions');
 
 
 
 
 





function csshero_admin_actions(){
  
		//CHECK IF PRODUCT ACTIVATED, OR SHOW NOTICE
		if (!wpcss_check_license()) add_action( 'admin_notices', 'csshero_activation_notice' );
		
		//GET REMOTE LICENSE
		if ( isset($_GET['wpcss_action']) && $_GET['wpcss_action']=='get_license'&& get_option('wpcss_accept_license')=='yes' && is_user_logged_in()&& current_user_can('edit_theme_options'))
					{ 
									if (strlen($_GET['license_key'])!=35 ) wp_die("Wrong license key length");
									if (!preg_match("/([A-Za-z0-9]+)/", $_GET['license_key'])) wp_die("Bad chars in license key");
									
									if( is_multisite() ) add_site_option('csshero-license',$_GET['license_key']);
										else csshero_update_option('csshero-license',$_GET['license_key']);
										
									delete_option('wpcss_accept_license');
															
									$license=wpcss_check_license();
									if ($license!=FALSE) { ?>
													  <body style="padding: 0; margin: 0; background: #f0f4f3;">
													  <div style="margin: 0; padding:10px 100px; ">	 
															
																<img src="https://p.csshero.org/production-v4/activation-img/new_courtesy_page.png" alt="CSS Hero Activated" style="display:block; margin: 0 auto; max-width:600px" />														
																
																<a href="<?php echo esc_url(admin_url()) ?>">
																<img src="https://p.csshero.org/production-v4/activation-img/new_courtesy_btn.png" alt="CSS Hero Activated" style="display:block; margin: 20px auto 0; max-width:190px" />
															</a>			
													  </div>
													</body>	
														<?php die;
									}
									
									else {
												$redirect_url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
												$redirect_url_array=explode('?',$redirect_url);
												$redirect_url=$redirect_url_array[0];
												wp_redirect($redirect_url.'/?wpcss_message=activation_invalid');
										  }
									
										die;
										
					}
									
		 
		 
} //end func

add_action( 'admin_init', 'csshero_admin_actions', 1 );
 
 
function csshero_activation_admin_js() {
	if (wpcss_check_license()) return;
	$data=array( 'admin_url'=>admin_url(), 'url' => get_bloginfo('wpurl'), 'email' => get_bloginfo('admin_email'),'product'=>'CSSHEROv4');
	$encoded_data= rawurlencode( base64_encode( serialize($data)));
	if( is_multisite() ) $par1="ms=1&"; else $par1="ms=0&";
	?>
	<script>
	document.addEventListener("DOMContentLoaded", function() { 
		var remote_activation_url = "https://www.csshero.org/request-license/?v=2&<?php echo $par1 ?>data=<?php echo $encoded_data ?>&admin_url_js_btoa=" + encodeURIComponent(btoa(window.location));
		document.getElementById('csshero-get-license-button').setAttribute("href",remote_activation_url); 
	});	
	</script>
	<?php
} //end func

add_action('admin_head', 'csshero_activation_admin_js');
 

function csshero_activation_notice() {
	csshero_update_option('wpcss_accept_license','yes');
    ?>
    <div class="notice notice-info is-dismissible">
			<h1> Welcome to CSS Hero!</h1>
			<p> Let's activate your product. It's fast and easy. </p>
			<p> Click the button below and let's go.</p>
			<p> <a id="csshero-get-license-button" class="button button-primary button-hero " href="#">Proceed to Product Activation</a></p>
    </div>
    <?php
}
 

 /* PATCHed  get_upload_dir */
function csshero_get_upload_dir( $param, $subfolder = '' ) {
    $upload_dir = wp_upload_dir();
    $url = $upload_dir[ $param ];
    if ( $param === 'baseurl' && is_ssl() ) {
        $url = str_replace( 'http://', 'https://', $url );
    }
    return $url . $subfolder;
}

 
function csshero_get_style_url() {
	$base_url=csshero_get_upload_dir( 'baseurl');
	$last_uploaded_css_data=get_option('csshero_static_css_data_'.csshero_get_active_theme_slug());
	if (is_array($last_uploaded_css_data) && isset($last_uploaded_css_data['relative_upload_path']) ) {
		return $base_url .'/'.$last_uploaded_css_data['relative_upload_path'];
		//classic alernative: return ($last_uploaded_css_data['url']);
		}
	else return $base_url.'/no-css-saved-yet.css';
}



function csshero_get_style_version() {
	$last_uploaded_css_data=get_option('csshero_static_css_data_'.csshero_get_active_theme_slug());
	if (is_array($last_uploaded_css_data) && isset($last_uploaded_css_data['version']) )  return $last_uploaded_css_data['version']; else return FALSE;
}

function csshero_is_editing_page() { 
	return ( (is_user_logged_in() OR function_exists('csshero_demo_plugin_is_active')) && isset($_GET['csshero_editing'])); 
}

function csshero_animations_are_currently_used(){
	$csshero_status_object = json_decode(csshero_get_data());
	if (!isset($csshero_status_object->animatedEls)) return FALSE;
	$csshero_animations_object=$csshero_status_object->animatedEls;
	return (count((array)$csshero_animations_object,COUNT_RECURSIVE)>0);
}

///ADD HEADER SCRIPTS
//add_action('wp_enqueue_scripts', 'csshero_add_scripts');  
add_action('wp_print_styles', 'csshero_add_scripts'); //load'em later
function csshero_add_scripts() {
	$csshero_get_style_url=csshero_get_style_url();
	wp_register_style( 'csshero-main-stylesheet', $csshero_get_style_url, array(), csshero_get_style_version());
	
	if (strpos($csshero_get_style_url, 'no-css-saved-yet') !== false) $csshero_css_is_empty=TRUE; else $csshero_css_is_empty=FALSE;

	if (!$csshero_css_is_empty OR csshero_is_editing_page()) wp_enqueue_style( 'csshero-main-stylesheet' );
	
	// HOT RELOAD ME BABY
	$peerID = substr(wpcss_check_license(),0,10).'-'.get_option('stylesheet');
	
	//TODO: maybe login has to be optional
	if (current_user_can('edit_theme_options') OR function_exists('csshero_demo_plugin_is_active')):
		wp_enqueue_script('peerjs','https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js','1.3.1');
		wp_enqueue_script('csshero_hotreload', plugins_url('/js/hotreload.js', __FILE__),array(),rand(1,100));
		
		$script= 'var peerID = "'. $peerID .'"; ';
		wp_add_inline_script('csshero_hotreload', $script, 'before');

	endif;

	// ANIMATIONS LIB
	if ( function_exists('csshero_demo_plugin_is_active') OR csshero_is_editing_page() OR csshero_animations_are_currently_used() ):
		wp_enqueue_script('csshero_aos', plugins_url('/js/aos.js', __FILE__));
		wp_register_style('csshero-aos-stylesheet', plugins_url('/styles/aos.css',__FILE__), array(),444);
		wp_enqueue_style('csshero-aos-stylesheet' );
		wp_enqueue_script('csshero_aos-trigger', plugins_url('/js/aos-trigger.js', __FILE__));
		
		//TWEAK ATTRIBUTES FOR CLOUDFLARE
		add_filter('script_loader_tag', 'csshero_add_data_attribute', 10, 2);
		
		//END TWEAK


	endif;
}

function csshero_add_data_attribute($tag, $handle) {
	if ( $handle =="csshero_aos" OR $handle =="csshero_aos-trigger")  return str_replace( ' src', ' data-cfasync="false" src', $tag );
	return $tag;
 }

//ADD INLINE ANIMATOR DATA
add_action('wp_head', 'csshero_add_header_code');
function csshero_add_header_code(){
	if (!csshero_animations_are_currently_used()) return; //only if we have data
	?>
	<script>
			csshero_animations_json='<?php
			$csshero_status_object= json_decode(csshero_get_data());
			$csshero_animations_object=$csshero_status_object->animatedEls;
			echo json_encode($csshero_animations_object);
			
			?>';
	</script>
	<?php
};


///ADD THE CSS TO THE LOGIN PAGE
function csshero_add_login_page_css() {
	$csshero_get_style_url=csshero_get_style_url();
	wp_register_style( 'csshero-main-stylesheet', $csshero_get_style_url, array(), csshero_get_style_version());
	if (strpos($csshero_get_style_url, 'no-css-saved-yet') !== false) $csshero_css_is_empty=TRUE; else $csshero_css_is_empty=FALSE;
    if (!$csshero_css_is_empty) wp_enqueue_style( 'csshero-main-stylesheet');//, get_template_directory_uri() . '/css/admin.css', array(), filemtime( get_template_directory() . '/css/admin.css' ) );
}
add_action( 'login_enqueue_scripts', 'csshero_add_login_page_css', 10 );

// VIDEO BGS
add_action('wp_footer', 'csshero_add_videojs_code');

function csshero_add_videojs_code(){?>
	<script>
		window.placeVidElementInner = function(selector,options,frame,showOnlyPoster){
		const {pos,url,customizations,thumbnail} = options;
		const {outer,inner} = customizations;
		const outerCustomStyle = [];
		const innerCustomStyle = [];
		let outS = {};
		let inS = {}
		for (let o in outer){
			outerCustomStyle.push(o+':'+outer[o])
			let niceO = o;
			if (o === 'background-color') niceO = 'backgroundColor'
			
			outS[niceO] = outer[o]
		}
		
		for (let o in inner){
			innerCustomStyle.push(o+':'+inner[o])
			let niceO = o;
			if (o === 'mix-blend-mode') niceO = 'mixBlendMode'
			inS[niceO] = inner[o]
		}
		const destination = frame ? frame.document : document;
		const els = destination.querySelectorAll(selector);
		const defSty = 'position:absolute;top:0;left:0;z-index:-1;height:100%;width:100%;'

		els.forEach(e=>{
			const outerEl = document.createElement('div')
			outerEl.setAttribute('style',defSty+outerCustomStyle.join(';'))
			outerEl.className = 'heroVideoBg'
			const vidEl = document.createElement('video');
			vidEl.src = !showOnlyPoster ? url : '';
			vidEl.autoplay = true;
			vidEl.poster = thumbnail;
			vidEl.loop = true
			vidEl.muted = true
			vidEl.playsInline = true
			vidEl.preload = 'none'
			vidEl.setAttribute('style',defSty+'object-fit:cover;object-position:'+pos+';'+innerCustomStyle.join(';'))
			outerEl.appendChild(vidEl)
			e.appendChild(outerEl)
		})
		
		return {inS,outS,thumbnail,url}
	}
	</script>
<?php 
}

//ADD JAVASCRIPT LIBS AND CODE, AND VIDEO BACKGROUNDS CODE
add_action('wp_footer', 'csshero_add_js_code');

function csshero_add_js_code(){
	if(csshero_is_editing_page() ) return;
	
	$csshero_data=json_decode(csshero_get_data());
	
	//JS LIBS
	$js_libs=$csshero_data->storedJS->libs;
	if (is_array($js_libs)) foreach($js_libs as $js_lib):
		?><script class="csshero-js-lib" src="<?php echo $js_lib; ?>"  ></script>
		<?php  
	endforeach;
	
	//JS CODE
	$js_code=$csshero_data->storedJS->stripped;
	
	?><script id="csshero-js-code">
		<?php echo $js_code; ?>		
	</script>
	<?php


	//VIDS DATA
	$videoBgs=$csshero_data->videoBgs
	
	?>
	<script id="CSSHEROVids">
		const k = '<?php echo json_encode( $videoBgs ); ?>';
		let vd = false
		try{
			vd = JSON.parse(k)
		} catch(err){
			console.log(err)
		}
		if (vd){
			
			for (let v in vd){
				const {url,pos,customizations,thumbnail,disableOnMobile} = vd[v];
				
				
				const posterOnly = disableOnMobile && window.matchMedia('(max-width: 1024px)').matches
				
				placeVidElementInner(v,{url,pos,customizations,thumbnail},false,posterOnly)
			}
		}
	</script>
	<?php



};

function wpcss_check_license(){
	$license= get_site_option('csshero-license');
	if ($license !=FALSE && strlen($license)>10) return $license; else return FALSE;
}

//  STYLE THE upload ADMIN AREA
function csshero_custom_upload_style() {
      echo '<style type="text/css">
				.ml-submit, .theme-layouts-post-layout, tr.post_title , tr.align , tr.image_alt, tr.post_excerpt, tr.post_content ,tr.url{display:none}
				td.savesend{text-align: right;}
				tr.submit .savesend input:hover,
				tr.submit .savesend input {background: url(http://www.csshero.org/csshero-nano-service/assets/img/esprit.png) no-repeat 0px -862px; height: 70px !important; z-index:999;border: 0px;padding:0px;width: 208px;border-radius: 0px;-moz-border-radius: 0px;-webkit-border-radius: 0px; text-indent: -9999px;}
				#media-upload a.del-link:active,
				tr.submit .savesend input:active{position: relative; top: 1px;}
				
				#media-upload a.del-link:hover,
				#media-upload a.del-link{height: 70px; width: 101px; background: url(http://www.csshero.org/csshero-nano-service/assets/img/esprit.png) no-repeat -208px -862px; display: inline-block; float: right; margin: 0px 2px 0px 10px; text-indent: 999px;}
				
				
				tr.submit{border-top: 1px solid #dfdfdf;}
				tr.submit .savesend{padding-top: 15px;}
				
				div#media-upload-header{padding: 0px; border: 0px; background: #222; position: fixed; top: 0px; left: 0px; width: 100%; height: 48px; z-index: 9999;}
				#sidemenu a.current {padding-left: 20px; padding-right: 20px; font-weight: normal; text-decoration: none; background: #3e7cff; color: white;-webkit-border-top-left-radius: 0px;-webkit-border-top-right-radius: 0px;border-top-left-radius: 0px;border-top-right-radius: 0px;border-width: 0px;}
				#sidemenu a{padding: 10px 20px; border: 0px; background: transparent; color: white; font-size: 10px; text-transform: uppercase;}
				body#media-upload{padding-top: 50px; background: #f5f5f5; height: 100%;}
				body#media-upload ul#sidemenu{bottom: 0; margin: 0px; padding: 0px;}
				#sidemenu a:hover{background:#222;}
				h3.media-title{font-family: sans-serif; font-size: 10px; font-weight: bold; text-transform: uppercase;}
				h3.media-title,.upload-flash-bypass,.max-upload-size{display: block;text-align: center;}
				.upload-flash-bypass{margin-top: 20px;}
				.max-upload-size{margin-bottom: 20px;}
				#sidemenu li#tab-type_url,
				#sidemenu li#tab-grabber{display: none;}
        	</style>';
}

if (isset($_GET['csshero_upload']) && $_GET['csshero_upload']==1) add_action('admin_head', 'csshero_custom_upload_style');

function csshero_get_active_site_plugins() {
	$out="";
	$the_plugs = get_option('active_plugins'); 
	
    if ($the_plugs) foreach($the_plugs as $key => $value) {
        $string = explode('/',$value); // Folder name will be displayed
        $out.=$string[0] .',';
    }
	
	 $the_network_plugs=get_site_option('active_sitewide_plugins');
 
	 if ($the_network_plugs)  foreach($the_network_plugs as $key => $value) {
        $string = explode('/',$key); // Folder name will be displayed
        $out.=$string[0] .',';
    }
    return $out;
}

 
function csshero_update_option($option_name,$new_value) {
	if ( get_option( $option_name ) !== false ) {		  
		// The option already exists, so we just update it.
		update_option( $option_name, $new_value );

	} else {
		// The option hasn't been added yet. We'll add it with $autoload set to 'no'.
		$deprecated = null;
		$autoload = 'no';
		add_option( $option_name, $new_value, $deprecated, $autoload );
	}
}
 

//////////////////////////////RSS FEED UPDATES BOX ///////////////////
function csshero_register_widgets() {
	global $wp_meta_boxes;
	if (get_option('wpcss_hidedashnews')!=1)
	    wp_add_dashboard_widget('widget_cssheronews', __('From  the  CSS Hero world', 'csshero'), 'csshero_create_rss_box');
}
add_action('wp_dashboard_setup', 'csshero_register_widgets'); //comment this line to get rid of dashboard updates

function csshero_make_url_https ($string) { return str_replace('http://','https://',$string); }
function csshero_create_rss_box() {
	// Get RSS Feed(s)
	include_once(ABSPATH . WPINC . '/feed.php');
	$rss = fetch_feed( 'https://www.csshero.org/feed/' );
	if (!is_wp_error( $rss ) ) : // Checks that the object is created correctly 
		// Figure out how many total items there are, and choose a limit 
		$maxitems = $rss->get_item_quantity( 3 ); 
		// Build an array of all the items, starting with element 0 (first element).
		$rss_items = $rss->get_items( 0, $maxitems );  
	endif;
	?>
	<style>
		#csshero-blog-feed img { margin: 0 auto;display: block; } #csshero-blog-feed li {border-bottom: 1px solid #ccc;} #csshero-blog-feed li p:nth-of-type(2) {display: none;}
	</style>
	<?php 
	echo '<div class="rss-widget" id="csshero-blog-feed">'; 
	echo "<img style='float:left; margin:0 5px' src='https://www.csshero.org/wp-content/uploads/2015/05/diamond.jpg' width='64' height='64' /> <strong>Start earning now! Become a CSS Hero affiliate</strong><br />Earn 40% on each sale right now. Spread the CSS Hero word and share the wealth with us! </p>
		<a target='_blank' href='https://www.csshero.org/affiliate/' style='float:right' class='button button-primary'>Start Earning</a>
		<div style='clear:both'></div>
		<hr style='border: 0; background-color: #DFDFDF; height: 1px;'>
		<strong>Latest News</strong>
		<ul>";
	if ( $maxitems == 0 ) {
		echo '<li>'.__( 'No item', 'rc_mdm').'.</li>';
	} else { 
		foreach ( $rss_items as $item ) :
			$item_date = human_time_diff( $item->get_date('U'), current_time('timestamp')).' '.__( 'ago', 'rc_mdm' );
			echo '<li> <a target="_blank" href="'.esc_url( $item->get_permalink() ).'" title="'.$item_date.'">'. esc_html( $item->get_title() ). '</a>  <span class="rss-date">'.$item_date.'</span><br />'.csshero_make_url_https( $item->get_content()).'</li>';
		endforeach;
	}
	echo '</ul> </div>';
}


//NEXTGEN GALLERY FIX
add_filter('run_ngg_resource_manager',  'wpcss_check_csshero_editpage' );
function wpcss_check_csshero_editpage($valid_request) {    if (!empty($_GET['csshero_action']) OR !empty($_GET['rand'])) $valid_request = FALSE; return $valid_request; }


//ENABLE AUTOUPDATES 
require 'plugin-update-checker/plugin-update-checker.php';

$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://u.csshero.org/v5/plugin-info.json',
	__FILE__, //Full path to the main plugin file or functions.php.
	'css-hero'
);

//end main csshero file, never close php :)