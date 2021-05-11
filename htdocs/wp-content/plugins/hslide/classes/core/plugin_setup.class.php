<?php
	
	#PLUGIN SETUP
	class hslide_setup{
		
		#CLASS VARS
		private $capability = 'publish_posts';
		private $plugin_name;
		private $plugin_friendly_name;
		private $plugin_version;
		private $plugin_prefix;
		private $plugin_dir;
		private $plugin_url;
		private $first_release;
		private $last_update;
		private $plugin_friendly_description;
		private $display;
		
		#CONSTRUCT
		public function __construct($plugin_name,$plugin_dir,$plugin_url,$plugin_friendly_name,$plugin_version,$plugin_prefix,$first_release,$last_update,$plugin_friendly_description){	
			//define class vars
			$this->plugin_name = $plugin_name;
			$this->plugin_dir = $plugin_dir;
			$this->plugin_url = $plugin_url;
			$this->plugin_friendly_name = $plugin_friendly_name;
			$this->plugin_version = $plugin_version;
			$this->plugin_prefix = $plugin_prefix;
			$this->first_release = $first_release;
			$this->last_update = $last_update;
			$this->plugin_friendly_description = $plugin_friendly_description;
			//construct admin menu
			add_action('admin_menu', array(&$this, 'construct_admin_menu'));
			//add meta
			add_action('admin_head',array(&$this,'add_admin_meta'));
			//load javascript
			add_action('admin_enqueue_scripts', array(&$this, 'load_admin_javascript'));
			//load css
			add_action('admin_enqueue_scripts', array(&$this, 'load_admin_css'));
			//instantiate display class
			$this->display = new hslide_display($this->plugin_dir);
			//initialise shortcode listener
			$shortcode = new hslide_shortcodes($this->plugin_prefix,$this->plugin_name,$this->plugin_dir,$this->plugin_url);
			add_action('init', array(&$shortcode,'initialise_shortcode_listener'));
		}
		
		#PAGE LOADER
		public function load_page(){
			//load global helper
			global $hslide_helper;
			//load page content
			$this->display->output_admin($hslide_helper,$this->plugin_name,$this->plugin_friendly_name,$this->plugin_version,$this->plugin_url,$this->first_release,$this->last_update, $this->plugin_friendly_description);
		}
		
		#CONSTRUCT ADMIN MENU ITEM
		public function construct_admin_menu(){
			add_menu_page($this->plugin_friendly_name, 'Hero Slider' , $this->capability, 'hslide', array(&$this,'load_page'), 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlVudGl0bGVkLTEuZnctUGFnZV94MjVfMjAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOm5vbmU7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9Cgkuc3Qxe2ZpbGw6I0RFNTI1QjtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDJ7ZmlsbDojMjMxRjIwO30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTk3Mi41LTQ5MC41Ii8+CjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05NzIuNS00OTAuNSIvPgo8cGF0aCBjbGFzcz0ic3QyIiBkPSJNODcuNSw2Mi42TDEwMCw1MS40djIyLjR2MjIuNEw4Ny41LDg1TDc1LDczLjhMODcuNSw2Mi42eiBNNzUsNzFMNzUsNzFsMTIuNS0xMS4yTDEwMCw0OC42TDg3LjUsMzcuNEw3NSwyNi4yCglsMCwwTDYyLjUsMzcuNEw1MCw0OC42aDB2MGwwLDBsMCwwdjBoMEwzNy41LDM3LjRMMjUsMjYuMmwwLDBMMTIuNSwzNy40TDAsNDguNmwxMi41LDExLjJMMjUsNzF2MHYwbDEyLjUsMTEuMkw1MCw5My4zVjcxVjQ4LjZsMCwwCglsMCwwVjcxdjIyLjRsMTIuNS0xMS4yTDc1LDcxTDc1LDcxeiBNMCw1MS40djIyLjR2MjIuNEwxMi41LDg1TDI1LDczLjhMMTIuNSw2Mi42TDAsNTEuNHogTTUwLDQ1LjhWMjMuNFYzLjhMMjYuNSwyNC43bDExLDkuOAoJTDUwLDQ1Ljh6IE03My40LDI0LjhMNTAsMy44djE5LjZ2MjIuNGwxMi41LTExLjJMNzMuNCwyNC44eiIvPgo8L3N2Zz4=');
		}
		
		#ADD META TO ADMIN
		public function add_admin_meta(){
			//load global helper
			global $hslide_helper;
			if(is_admin() && $hslide_helper->onAdmin()){ //admin panel
				echo "<meta name='robots' content='noindex, nofollow' />\n";
			}
		}
		
		/*
			<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
			<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/plugins/CSSPlugin.min.js"></script>
			<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/easing/EasePack.min.js"></script>
			<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenLite.min.js"></script>
		*/
		
		#LOAD JAVASCRIPT
		public function load_admin_javascript(){
			//load global helper
			global $hslide_helper;
			//load jQuery
			wp_enqueue_script('jquery');
			wp_enqueue_script('jquery-ui-core');
			//load plugin js
			if(is_admin() && $hslide_helper->onAdmin()){ //admin panel
				
				//admin core scripts
				wp_register_script($this->plugin_prefix .'admin', $this->plugin_url .'assets/js/admin_core.js');
				wp_enqueue_script($this->plugin_prefix .'admin');
				
				//component manager scripts
				wp_register_script($this->plugin_prefix .'component_manager', $this->plugin_url .'assets/js/component_manager.js');
				wp_enqueue_script($this->plugin_prefix .'component_manager');
				
				//default object management scripts
				wp_register_script($this->plugin_prefix .'hslide_object_manager', $this->plugin_url .'assets/js/hslide_object_manager.js');
				wp_enqueue_script($this->plugin_prefix .'hslide_object_manager');
								
				//TWEENLITE INCLUDE
				
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
				
				wp_register_script($this->plugin_prefix .'hslide_animations', $this->plugin_url .'assets/js/main/hslider_animations.js');
				wp_enqueue_script($this->plugin_prefix .'hslide_animations');
				
				wp_register_script($this->plugin_prefix .'hslide_button_animations', $this->plugin_url .'assets/js/main/hslider_button_animations.js');
				wp_enqueue_script($this->plugin_prefix .'hslide_button_animations');
				
				//enqueue media uploader
				wp_enqueue_media();
			}
		}

		#LOAD STYLES
		public function load_admin_css(){
			//load global helper
			global $hslide_helper;
			//load plugin css
			if(is_admin() && $hslide_helper->onAdmin()){ //admin panel
				//admin core css
				wp_register_style($this->plugin_prefix .'adminstyles', $this->plugin_url .'assets/css/admin_styles.css');
				wp_enqueue_style($this->plugin_prefix .'adminstyles');
				//backend user css
				wp_register_style($this->plugin_prefix .'backendstyles', $this->plugin_url .'assets/css/backend_styles.css');
				wp_enqueue_style($this->plugin_prefix .'backendstyles');
				//backend font css
				wp_register_style($this->plugin_prefix .'hsliderfonts', $this->plugin_url .'assets/css/hslider_fonts.css');
				wp_enqueue_style($this->plugin_prefix .'hsliderfonts');
				//google fonts
				wp_register_style($this->plugin_prefix .'googlefonts', '//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,400,300,600,700');
				wp_enqueue_style($this->plugin_prefix .'googlefonts');
				
			}
		}
		
	}