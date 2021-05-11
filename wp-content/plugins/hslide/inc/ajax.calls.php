<?php

	/*
		notes:
		------
		- All actions are prefixed by the plugin prefix
			e.g. if the plugin prefix is "hplugin_" and the action name is "get_data", the actions, as referenced by the ajax call, will be "hplugin_get_data"
		- Ensure that all "actions" are unique
		- User registrations are registered for administrators as well to ensure that functionslity remains the same if logged in
	*/

	#ADMIN AJAX CALLS
	$backend_ajax_calls = array( //all methods must be contained by the backend class
		array('action' => 'insert_object','method' => 'insert_object'),
		array('action' => 'get_object_list','method' => 'get_object_list'),
		array('action' => 'get_object','method' => 'get_object'),
		array('action' => 'update_object','method' => 'update_object'),
		array('action' => 'delete_object','method' => 'delete_object'),
		array('action' => 'get_post_data','method' => 'get_post_data'),
		array('action' => 'get_post_content','method' => 'get_post_content'),
		array('action' => 'get_woo_data','method' => 'get_woo_data'),
		array('action' => 'get_woo_content','method' => 'get_woo_content'),
		array('action' => 'get_woo_products','method' => 'get_woo_products'),
		array('action' => 'get_check_woo','method' => 'check_woo'),
		array('action' => 'rename_object','method' => 'rename_object'),
		array('action' => 'duplicate_object','method' => 'duplicate_object'),
		/* TO BE REMOVED: CODE ASSIST EXAMPLE HOOK */
		array('action' => 'code_assist_example','method' => 'code_assist_example')
	);
	
	#USER AJAX CALLS
	$frontend_ajax_calls = array( //all methods must be contained by the frontend class
		//array('action' => '','method' => '')
		array('action' => 'get_post_content','method' => 'get_post_content'),
		array('action' => 'get_woo_content','method' => 'get_woo_content')
	);