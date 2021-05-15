<?php
  $sticky_anything_pro_licensing_servers = array('https://license1.wpsticky.com/', 'https://license2.wpsticky.com/');

  function sticky_anything_pro_is_activated($license_type = false) {
    $options = sticky_anything_pro_get_meta();

    if (!empty($options['license_active']) && $options['license_active'] === true &&
        !empty($options['license_expires']) && $options['license_expires'] >= date('Y-m-d')) {


      if (mt_rand(0, 100) > 98 && is_admin()) {
        $tmp = sticky_anything_pro_validate_license_key($options['license_key']);
        if ($tmp['success']) {
          $update['license_type'] = $tmp['license_type'];
          $update['license_expires'] = $tmp['license_expires'];
          $update['license_active'] = $tmp['license_active'];
          update_option('sticky_anything_pro_meta', array_merge($options, $update));
        }
      } // random license revalidation

      // check for specific license type?
      if ($license_type == 'agency') {
        if (stripos(strtolower($options['license_type']), 'agency') !== false || stripos(strtolower($options['license_type']), 'extra') !== false) {
          return true;
        } else {
          return false;
        }
      } // check for specific license type

      return true;
    } else {
      return false;
    }
  } // is_activated

  function sticky_anything_pro_whitelabel_active() {
    $sticky_anything_options = get_option('sticky_anything_pro_options');
    if (sticky_anything_pro_is_activated('agency') && isset($sticky_anything_options['sa_whitelabel'])){
        return $sticky_anything_options['sa_whitelabel'];
    } else {
        return false;
    }
  }

  // check if activation code is valid
  function sticky_anything_pro_validate_license_key($code) {
    $out = array('success' => false, 'license_active' => false, 'license_key' => $code, 'error' => '', 'license_type' => '', 'license_expires' => '0');
    $result = sticky_anything_pro_query_licensing_server('validate_license', array('license_key' => $code));

    if (false === $result || empty($result['data'])) {
      $out['error'] = 'Unable to contact licensing server. Please try again in a few moments.';
    } elseif (!is_array($result['data']) || sizeof($result['data']) != 4) {
      $out['error'] = 'Invalid response from licensing server. Please try again later.';
    } else {
      $out['success'] = true;
      $out = array_merge($out, $result['data']);
    }

    return $out;
  } // validate_license_key


  // run any query on licensing server
  function sticky_anything_pro_query_licensing_server($action, $data = array(), $method = 'GET') {
    global $sticky_anything_pro_licensing_servers;
    $options = sticky_anything_pro_get_meta();
    $request_params = array('sslverify' => false, 'timeout' => 25, 'redirection' => 2);
    $default_data = array('license_key' => $options['license_key'],
                          'code_base' => 'pro',
                          '_rand' => rand(1000, 9999),
                          'version' => STICKY_MENU_WF_v,
                          'site' => get_home_url());

    $request_data = array_merge($default_data, $data, array('action' => $action));

    $url = add_query_arg($request_data, $sticky_anything_pro_licensing_servers[0]);
    $response = wp_remote_get(esc_url_raw($url), $request_params);

    if (is_wp_error($response) || !($body = wp_remote_retrieve_body($response)) || !($result = @json_decode($body, true))) {
      $url = add_query_arg($request_data, $sticky_anything_pro_licensing_servers[1]);
      $response = wp_remote_get(esc_url_raw($url), $request_params);
      $body = wp_remote_retrieve_body($response);
      $result = @json_decode($body, true);
    }

    if (!is_array($result) || !isset($result['success'])) {
      return false;
    } else {
      return $result;
    }
  } // query_licensing_server


  // get plugin info for lightbox
  function sticky_anything_pro_update_details($result, $action, $args) {
    if (!sticky_anything_pro_is_activated()) {
      return $result;
    }

    error_log('Check details');
    global $sticky_anything_pro_licensing_servers;
    global $response;
    $response = false;
    $options = sticky_anything_pro_get_meta();
    $plugin = 'sticky-menu-or-anything-on-scroll';

    if ($action != 'plugin_information' || empty($args->slug) || ($args->slug != $plugin)) {
      return $result;
    }

    if(empty($response) || is_wp_error($response)) {
      $request_params = array('sslverify' => false, 'timeout' => 15, 'redirection' => 2);
      $request_args = array('action' => 'plugin_information',
                            'request_details' => serialize($args),
                            'timestamp' => time(),
                            'codebase' => 'pro',
                            'version' => STICKY_MENU_WF_v,
                            'license_key' => $options['license_key'],
                            'license_expires' => $options['license_expires'],
                            'license_type' => $options['license_type'],
                            'license_active' => $options['license_active'],
                            'site' => get_home_url());

      $url = add_query_arg($request_args, $sticky_anything_pro_licensing_servers[0]);
      $response = wp_remote_get(esc_url_raw($url), $request_params);

      if (is_wp_error($response) || !wp_remote_retrieve_body($response)) {
        $url = add_query_arg($request_args, $sticky_anything_pro_licensing_servers[1]);
        $response = wp_remote_get(esc_url_raw($url), $request_params);
      }
    } // if !$response

    if (is_wp_error($response) || !wp_remote_retrieve_body($response)) {
      $res = new WP_Error('plugins_api_failed', __('An unexpected HTTP error occurred during the API request.', 'under-construction-page'), $response->get_error_message());
    } else {
      $res = json_decode(wp_remote_retrieve_body($response), false);

      if (!is_object($res)) {
        $res = new WP_Error('plugins_api_failed', __('Invalid API respone.', 'under-construction-page'), wp_remote_retrieve_body($response));
      } else {
        $res->sections = (array) $res->sections;
        $res->banners = (array) $res->banners;
        $res->icons = (array) $res->icons;
      }
    }

    return $res;
  } // update_details

  function sticky_anything_pro_check_licence_ajax(){
    check_ajax_referer('smoa_pro_activate_license_key');
    $meta = sticky_anything_pro_get_meta();
    $key = trim($_POST['smoa_license_key']);
    if (empty($key)) {
      $meta['license_type'] = '';
      $meta['license_expires'] = '';
      $meta['license_active'] = false;
      $meta['license_key'] = '';
      set_transient('sticky_anything_pro_err_'.get_current_user_id(),'<div class="alert alert-info"><strong>License key saved.</strong><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>',60);
      update_option('sticky_anything_pro_meta', $meta);
      wp_send_json_success('empty');
    } else {
      $tmp = sticky_anything_pro_validate_license_key($key);
      $meta['license_key'] = $key;
      if ($tmp['success']) {
        $meta['license_type'] = $tmp['license_type'];
        $meta['license_expires'] = $tmp['license_expires'];
        $meta['license_active'] = $tmp['license_active'];
        if ($tmp['license_active']) {
          set_transient('sticky_anything_pro_err_'.get_current_user_id(),'<div class="alert alert-success"><strong>License key saved and activated!</strong><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>',60);
        } else {
          set_transient('sticky_anything_pro_err_'.get_current_user_id(),'<div class="alert alert-danger"><strong>License not active.</strong> ' . $tmp['error'] . '<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>',60);
        }
        update_option('sticky_anything_pro_meta', $meta);
        wp_send_json_success($tmp);
      } else {
        set_transient('sticky_anything_pro_err_'.get_current_user_id(),'<div class="alert alert-danger"><strong>Unable to contact licensing server. Please try again in a few moments.</strong><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>',60);
        wp_send_json_error($tmp);
      }
      
    }

    die();
  }

  function sticky_anything_pro_save_licence_ajax(){
    check_ajax_referer('smoa_pro_save_license_key');
    $meta['license_key'] = $_POST['license_key'];
    $meta['license_type'] = $_POST['license_type'];
    $meta['license_expires'] = $_POST['license_expires'];
    $meta['license_active'] = $_POST['license_active'] == 'true'?true:false;      
    update_option('sticky_anything_pro_meta', $meta);
    set_transient('sticky_anything_pro_err_'.get_current_user_id(),'<div class="alert alert-success"><strong>License key saved and activated!</strong><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>',60);
    wp_send_json_success($meta);
    die();
  }

  // get info on new plugin version if one exists
  function sticky_anything_pro_update_filter($current) {
    if (!sticky_anything_pro_is_activated()) {
      return $current;
    }
    
    global $sticky_anything_pro_licensing_servers;
    global $response;
    $response = false;
   
    $options = sticky_anything_pro_get_meta();
    $plugin = 'sticky-menu-or-anything-on-scroll/sticky-menu-or-anything-on-scroll.php';
    $slug = 'sticky-menu-or-anything-on-scroll';
    if(empty($response) || is_wp_error($response)) {
      $request_params = array('sslverify' => false, 'timeout' => 15, 'redirection' => 2);
      $request_args = array('action' => 'update_info',
                            'timestamp' => time(),
                            'codebase' => 'pro',
                            'version' => STICKY_MENU_WF_v,
                            'license_key' => $options['license_key'],
                            'license_expires' => $options['license_expires'],
                            'license_type' => $options['license_type'],
                            'license_active' => $options['license_active'],
                            'site' => get_home_url());

      $url = add_query_arg($request_args, $sticky_anything_pro_licensing_servers[0]);
      $response = wp_remote_get(esc_url_raw($url), $request_params);
      if (is_wp_error($response)) {
        $url = add_query_arg($request_args, $sticky_anything_pro_licensing_servers[1]);
        $response = wp_remote_get(esc_url_raw($url), $request_params);
      }
    } // if !$response

    if (!is_wp_error($response) && wp_remote_retrieve_body($response)) {
      $data = json_decode(wp_remote_retrieve_body($response), false);
      error_log(serialize($data));
      if (empty($current)) {
        $current = new stdClass();
      }
      if (empty($current->response)) {
        $current->response = array();
      }
      if (!empty($data) && is_object($data)) {
        $data->icons = (array) $data->icons;
        $data->banners = (array) $data->banners;
        $current->response[$plugin] = $data;
      }
    }

    return $current;
  } // update_filter
