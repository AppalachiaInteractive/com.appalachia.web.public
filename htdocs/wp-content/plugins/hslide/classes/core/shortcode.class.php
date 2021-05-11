<?php
	
	#PLUGIN SHORTCODE MANAGEMENT
	class hslide_shortcodes{
		
		#CLASS VARS
		private $shortcode; //plugin shortcode is the same as the plugin name
		private $plugin_prefix;
		private $plugin_dir;
		private $plugin_url;
		private $display;
		private $frontend;
		
		#CONSTRUCT
		public function __construct($plugin_prefix,$plugin_name,$plugin_dir,$plugin_url){
			$this->plugin_prefix = $plugin_prefix;
			$this->shortcode = $plugin_name;
			$this->plugin_dir = $plugin_dir;
			$this->plugin_url = $plugin_url;
			$this->display = new hslide_display($this->plugin_dir);
			$this->frontend = new hslide_frontend();
		}
		
		#INITIALISE SHORTCODE LISTENER
		public function initialise_shortcode_listener(){
			//remove shortcode listener
			remove_shortcode($this->shortcode);
			//add shortcode listener
			add_shortcode($this->shortcode, array(&$this,'use_shortcode'));
		}
		
		#USE SHORTCODE
		public function use_shortcode($atts){ //all front-end code can be initialised here...
			//load front-end css
			$this->load_frontend_css();
			//load front-end scripts
			$this->load_frontend_javascript();
			//output front-end JS references
			add_action('wp_footer', array( $this, 'add_vars_script_footer'));
			// echo '
			// 	<script type="text/javascript">
			// 		var ajax_url = "'. admin_url('admin-ajax.php') .'";
			// 		var '. $this->plugin_prefix .'dir = "'. str_replace('\\','/',$this->plugin_dir) .'/";
			// 		var '. $this->plugin_prefix .'url = "'. $this->plugin_url .'";
			// 	</script>
			// ';
			//define content
			$content = $this->frontend->get_shortcode_content($atts);
			//display content on front-end
			return $this->display->output_frontend($content); //this ensure output buffering takes place
		}

		function add_vars_script_footer() {
			//output front-end JS references
			echo '<script type="text/javascript" data-cfasync="false">
					var ajax_url = "'. admin_url('admin-ajax.php') .'";
					var '. $this->plugin_prefix .'url = "'. $this->plugin_url .'";
				</script>';
		}
		
		
		#IMPLEMENT FRONT-END JS
		private function load_frontend_javascript(){
			
			//tweenmax include
			wp_register_script($this->plugin_prefix .'hslide_mobile', $this->plugin_url .'assets/js/jquery.mobile.min.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_mobile');
			wp_register_script($this->plugin_prefix .'hslide_pops', $this->plugin_url .'assets/js/greensock/plugins/ThrowPropsPlugin.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_pops');
			wp_register_script($this->plugin_prefix .'hslide_tweenmax', $this->plugin_url .'assets/js/greensock/TweenMax.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_tweenmax');
			wp_register_script($this->plugin_prefix .'hslide_draggable', $this->plugin_url .'assets/js/greensock/utils/Draggable.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_draggable');
			wp_register_script($this->plugin_prefix .'hslide_tweenmax_css', $this->plugin_url .'assets/js/greensock/plugins/CSSPlugin.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_tweenmax_css');
			wp_register_script($this->plugin_prefix .'hslide_tweenmax_easing', $this->plugin_url .'assets/js/greensock/easing/EasePack.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_tweenmax_easing');
			wp_register_script($this->plugin_prefix .'hslide_tweenmax_tweenlite', $this->plugin_url .'assets/js/greensock/TweenLite.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_tweenmax_tweenlite');
			wp_register_script($this->plugin_prefix .'hslide_tweenlite_timeline', $this->plugin_url .'assets/js/greensock/TimelineLite.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_tweenlite_timeline');
			wp_register_script($this->plugin_prefix .'hslide_animations', $this->plugin_url .'assets/js/main/hslider_animations.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_animations');			
			wp_register_script($this->plugin_prefix .'hslide_button_animations', $this->plugin_url .'assets/js/main/hslider_button_animations.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_button_animations');
			wp_register_script($this->plugin_prefix .'hslide_frooga', 'https://f.vimeocdn.com/js/froogaloop2.min.js');
			wp_enqueue_script($this->plugin_prefix .'hslide_frooga');


			//front-end javascript
			wp_register_script($this->plugin_prefix .'user', $this->plugin_url .'assets/js/frontend_script.js');
			wp_enqueue_script($this->plugin_prefix .'user');
			
		}		
		
		#IMPLEMENT FRONT-END CSS
		private function load_frontend_css(){
			//front-end css
			wp_register_style($this->plugin_prefix .'userstyles', $this->plugin_url .'assets/css/frontend_styles.css');
			wp_enqueue_style($this->plugin_prefix .'userstyles');
			//backend font css
			wp_register_style($this->plugin_prefix .'hsliderfonts', $this->plugin_url .'assets/css/hslider_fonts.css');
			wp_enqueue_style($this->plugin_prefix .'hsliderfonts');
			//google fonts
			wp_register_style($this->plugin_prefix .'googlefonts', '//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,300,600,700');
			wp_enqueue_style($this->plugin_prefix .'googlefonts');
		}
		
	}