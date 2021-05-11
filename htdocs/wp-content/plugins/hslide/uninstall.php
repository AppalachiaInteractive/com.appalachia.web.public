<?php

	#UNINSTALL PLUGIN
	if(!defined('WP_UNINSTALL_PLUGIN')){
		exit();
	}
	
	//access globals
	global $wpdb;
	
	//flag deleted
	$wpdb->query("UPDATE `". $wpdb->base_prefix ."hplugin_root` SET `deleted` = 1 WHERE `plugin_name` = 'hplugin';"); //flag deleted
	
	//clean up
	$wpdb->query("DROP TABLE IF EXISTS `". $wpdb->base_prefix ."hslide_default_storage_table`;"); //default storage table