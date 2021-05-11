<?php
		
	#ACTIVATE PLUGIN
	class hslide_activate{
		
		#CLASS VARS
		private $plugin_name;
		private $plugin_version;
		private $plugin_dir;
		private $plugin_old_version;
		
		#CONSTRUCT
		public function __construct($plugin_name,$plugin_version,$plugin_dir){
			//define class vars
			$this->plugin_name = $plugin_name;
			$this->plugin_version = $plugin_version;
			$this->plugin_dir = $plugin_dir;
			//update check
			$this->update_check();
		}
		
		#CHECK FOR UPGRADE
		private function update_check(){
			global $wpdb;
			$plugin_lookup = $wpdb->get_results("SELECT * FROM `". $wpdb->base_prefix ."hplugin_root` WHERE `plugin_name` = '". $this->plugin_name ."';");
			if($plugin_lookup){
				$this->plugin_old_version = $plugin_lookup[0]->plugin_version;
				if(version_compare($this->plugin_old_version,$this->plugin_version,'<')){
					$update = new hslide_update_plugin($this->plugin_name,$this->plugin_version,$this->plugin_old_version,$this->plugin_dir);
					$update->update_plugin();
				}
			}
		}
		
		#ACTIVATE
		private function activate(){
			//access globals
			global $wpdb;
			global $hslide_helper;
			//create the hplugin_root table if it doesn't exist
			$sql_create = "
				CREATE TABLE IF NOT EXISTS `". $wpdb->base_prefix ."hplugin_root` (
				  `hplugin_id` int(11) NOT NULL AUTO_INCREMENT,
				  `plugin_name` varchar(45) NOT NULL,
				  `plugin_version` varchar(10) NOT NULL,
				  `plugin_uuid` varchar(36) NOT NULL,
				  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
				  `last_modified` datetime DEFAULT NULL,
				  `active` tinyint(1) NOT NULL DEFAULT '1',
				  `deleted` tinyint(1) NOT NULL DEFAULT '0',
				  PRIMARY KEY (`hplugin_id`)
				) ENGINE=InnoDB DEFAULT CHARSET=latin1;
			";
			dbDelta($sql_create);
			$sql_drop = "
				DROP TRIGGER IF EXISTS `". $wpdb->base_prefix ."hplugin_root`;
			";
			$wpdb->query($sql_drop);
			$sql_create = "
				CREATE TRIGGER `". $wpdb->base_prefix ."hplugin_root`
				BEFORE UPDATE ON `". $wpdb->base_prefix ."hplugin_root`
				FOR EACH ROW SET NEW.last_modified = NOW();
			";
			dbDelta($sql_create);
			//check if plugin exists in hplugin_root table
			$plugin_lookup = $wpdb->get_results("SELECT * FROM `". $wpdb->base_prefix ."hplugin_root` WHERE `plugin_name` = '". $this->plugin_name ."';");
			if(!$plugin_lookup){ //add if not exists
				$wpdb->query("INSERT INTO `". $wpdb->base_prefix ."hplugin_root` (`plugin_name`,`plugin_version`,`plugin_uuid`) VALUES('". $this->plugin_name ."','". $this->plugin_version ."','". $hslide_helper->genGUID() ."');");
			}else{ //ensure that deleted = 0
				$wpdb->query("UPDATE `". $wpdb->base_prefix ."hplugin_root` SET `deleted` = 0, `active` = 1 WHERE `plugin_name` = '". $this->plugin_name ."';");
			}
		}
		
		#SETUP PLUGIN
		public function setup_plugin(){
			//activate plugin
			$this->activate();
			//create plugin tables
			$this->create_default_storage_table(); //default storage table
			/*
				-- create your plugin specific tables here --
				
				note: Ensure that CREATE TABLE "IF NOT EXISTS" is used.
			*/
		}
		
		#CREATE DEFAULT STORAGE TABLE
		private function create_default_storage_table(){
			//access globals
			global $wpdb;
			//create the default_storage_table table if it doesn't exist
			$sql_create = "
				CREATE TABLE IF NOT EXISTS `". $wpdb->base_prefix ."hslide_default_storage_table` (
					`storage_id` int(11) NOT NULL AUTO_INCREMENT,
					`object_name` varchar(100) NOT NULL,
					`json_object` longblob NOT NULL,
					`created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
					`last_modified` datetime DEFAULT NULL,
					`deleted` tinyint(1) NOT NULL DEFAULT '0',
					PRIMARY KEY (`storage_id`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8;
			";
			dbDelta($sql_create);
			//drop trigger if exists
			$sql_drop = "
				DROP TRIGGER IF EXISTS `". $wpdb->base_prefix ."hslide_default_storage_table`;
			";
			$wpdb->query($sql_drop);
			//re-create trigger
			$sql_create = "
				CREATE TRIGGER `". $wpdb->base_prefix ."hslide_default_storage_table`
				BEFORE UPDATE ON `". $wpdb->base_prefix ."hslide_default_storage_table`
				FOR EACH ROW SET NEW.last_modified = NOW();
			";
			dbDelta($sql_create);
			return true;
		}
		
	}