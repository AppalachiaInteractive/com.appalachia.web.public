<?php
	
	#UPDATE PLUGIN
	class hslide_update_plugin{
		
		#CLASS VARS
		private $plugin_name;
		private $plugin_version;
		private $plugin_old_version;
		private $plugin_dir;
		private $object_manager;
		
		#CONSTRUCT
		public function __construct($plugin_name,$plugin_version,$plugin_old_version,$plugin_dir){
			//set class vars
			$this->plugin_name = $plugin_name;
			$this->plugin_version = $plugin_version;
			$this->plugin_old_version = $plugin_old_version;
			$this->plugin_dir = $plugin_dir;
			$this->object_manager = new hslide_object_management($this->plugin_dir);
		}
		
		#TEARDOWN PLUGIN
		public function update_plugin(){
			//access globals
			global $wpdb;
			//update plugin tables
			
			// < 1.0.4
			if(version_compare($this->plugin_old_version .'', '1.0.4', "<")){
				
				//UPDATE SLIDE OBJECTS WITH NEW MOUSEOVER NODE
				
				//get slider objects
				$update_obj = $wpdb->get_results("
					SELECT
						*
					FROM
						`". $wpdb->base_prefix ."hslide_default_storage_table`
					WHERE
						`deleted` = 0;
				");
				
				$json_object_change;
				
				foreach($update_obj as $slider){	
					
					//variables
					$sub_index = 0;
					$json_object_change = json_decode($slider->json_object, true);
					$save_status = false;
					
					//check and insert new data
					foreach($json_object_change['slider']['slides'] as $slide){
						if(!$slide['mouseMove']){
							$json_object_change['slider']['slides'][$sub_index]['mouseMove'] = 0;
							$save_status = true;
						}			
						$sub_index++;				
					}	
					
					//update
					if($save_status){
						$sql_update = "
							UPDATE `". $wpdb->base_prefix ."hslide_default_storage_table`
							SET `json_object` = '". json_encode($json_object_change) ."'
							WHERE `storage_id` = ". intval($slider->storage_id) .";
						";
						$wpdb->query($sql_update);
					}
						
				}
				
			}
			
			//update existing database objects with default object data
			$this->object_manager->update_database_objects();
			//mark the upgrade as successful
			$this->mark_update_complete();
		}
		
		#MARK UPDATE COMPLETE
		private function mark_update_complete(){
			//access globals
			global $wpdb;
			//once updates are complete, mark the plugin version in the DB
			$wpdb->query("UPDATE `". $wpdb->base_prefix ."hplugin_root` SET `plugin_version` = '". $this->plugin_version ."' WHERE `plugin_name` = '". $this->plugin_name ."';");
		}
		
	}