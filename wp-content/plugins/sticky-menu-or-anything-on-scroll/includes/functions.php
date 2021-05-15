<?php

/**
 * === FUNCTIONS ========================================================================================
 */

/**
 * --- TRIGGERED ON ACTIVATION --------------------------------------------------------------------------
 * --- IF DATABASE VALUES ARE NOT SET AT ALL, ADD DEFAULT OPTIONS TO DATABASE ---------------------------
 */
if (!function_exists('sticky_anything_pro_default_options')) {
    function sticky_anything_pro_default_options()
    {
        $versionNum = STICKY_MENU_WF_DB_v;
        if (get_option('sticky_anything_pro_options') === false) {

            //try to grab stuff to migrate if some
            $migrate_values = checkAndGetValuesToMigrateFromFree();
            $new_options = array();
            $new_options['sa_version'] = $versionNum;

            $default_el['sa_name'] = __('Sticky Element #', 'sticky-menu-or-anything-on-scroll') . '1';
            $default_el['sa_element_name'] = __('Sticky Element #', 'sticky-menu-or-anything-on-scroll') . '1';
            $default_el['sa_element'] = isset($migrate_values['sa_element']) ? $migrate_values['sa_element'] : '';
            $default_el['sa_topspace'] = isset($migrate_values['sa_topspace']) ? $migrate_values['sa_topspace'] : '';
            $default_el['sa_adminbar'] = isset($migrate_values['sa_adminbar']) ? $migrate_values['sa_adminbar'] : true;
            $default_el['sa_disabled'] = false;
            $default_el['sa_minscreenwidth'] = isset($migrate_values['sa_minscreenwidth']) ? $migrate_values['sa_minscreenwidth'] : '';
            $default_el['sa_maxscreenwidth'] = isset($migrate_values['sa_maxscreenwidth']) ? $migrate_values['sa_maxscreenwidth'] : '';
            $default_el['sa_zindex'] = isset($migrate_values['sa_zindex']) ? $migrate_values['sa_zindex'] : '';
            $default_el['sa_pushup'] = isset($migrate_values['sa_pushup']) ? $migrate_values['sa_pushup'] : '';
            $default_el['sa_position'] = 'top';
            $default_el['sa_fade_in'] = true;

            if (!isset($migrate_values['sa_minscreenwidth']) && !isset($migrate_values['sa_maxscreenwidth'])) {
                $default_el['sa_screen_small'] = true;
                $default_el['sa_screen_medium'] = true;
                $default_el['sa_screen_large'] = true;
                $default_el['sa_screen_extralarge'] = true;
            }

            $new_options['sa_legacymode'] = isset($migrate_values['sa_legacymode']) ? $migrate_values['sa_legacymode'] : false;
            $new_options['sa_dynamicmode'] = isset($migrate_values['sa_dynamicmode']) ? $migrate_values['sa_dynamicmode'] : false;
            $new_options['sa_whitelabel'] = isset($migrate_values['sa_whitelabel']) ? $migrate_values['sa_whitelabel'] : false;
            $new_options['sa_debugmode'] = isset($migrate_values['sa_debugmode']) ? $migrate_values['sa_debugmode'] : false;
            $new_options['sa_widgets_disable'] = isset($migrate_values['sa_widgets_disable']) ? $migrate_values['sa_widgets_disable'] : false;

            
            $new_options['sa_hide_review_notification'] = isset($migrate_values['sa_hide_review_notification']) ? $migrate_values['sa_hide_review_notification'] : false;
            $new_options['sa_migration_happened'] = isset($migrate_values['sa_element']);

            $new_options['elements'] = array();
            $new_options['elements'][] = $default_el;

            add_option('sticky_anything_pro_options', $new_options);
        }
    }
}

/**
 * --- IF DATABASE VALUES EXIST, THEN THIS IS AN UPGRADE, SO CHECK IF NEWER OPTIONS EXIST --------------
 * --- IF NOT, ADD THESE OPTIONS WITH DEFAULT VALUES ---------------------------------------------------
 * --- AND UPDATE VERSION NUMBER FOR SURE --------------------------------------------------------------
 */
if (!function_exists('sticky_anything_pro_update')) {
    function sticky_anything_pro_update()
    {
        $versionNum = STICKY_MENU_WF_DB_v;
        $existing_options = get_option('sticky_anything_pro_options');
        $new_options = array();

        //try to grab stuff to migrate if some
        $migrate_values = checkAndGetValuesToMigrateFromFree();

        //if elements is missing then it's pre 5.0.0
        if (!isset($existing_options['elements'])) {

            $existing_options['sa_element_name'] = __('Sticky Element #', 'sticky-menu-or-anything-on-scroll') . '1';

            $existing_options['sa_disabled'] = false;
            $existing_options['sa_bottom_trigger'] = '';
            $existing_options['sa_topspace'] = '';
            $existing_options['sa_screen_small'] = true;
            $existing_options['sa_screen_medium'] = true;
            $existing_options['sa_screen_large'] = true;
            $existing_options['sa_screen_extralarge'] = true;
            $existing_options['sa_fade_in'] = true;
            $existing_options['sa_slide_down'] = false;

            $existing_options['sa_pages'] = [];
            $existing_options['sa_posts'] = [];
            $existing_options['sa_categories'] = [];
            $existing_options['sa_tags'] = [];
            $existing_options['sa_posttypes'] = [];

            if (!isset($existing_options['sa_minscreenwidth'])) {
                // Introduced in version 1.1
                $existing_options['sa_minscreenwidth'] = isset($migrate_values['sa_minscreenwidth']) ? $migrate_values['sa_minscreenwidth'] : '';
                $existing_options['sa_maxscreenwidth'] = isset($migrate_values['sa_maxscreenwidth']) ? $migrate_values['sa_maxscreenwidth'] : '';
            }

            if (!isset($existing_options['sa_position'])) {
                $existing_options['sa_position'] = 'top';
            }

            if (!isset($existing_options['sa_zindex'])) {
                $existing_options['sa_zindex'] = isset($migrate_values['sa_zindex']) ? $migrate_values['sa_zindex'] : '';
            }

            if (!isset($existing_options['sa_opacity'])) {
                $existing_options['sa_opacity'] = 100;
            }

            if (!isset($existing_options['sa_scroll_range_min'])) {
                $existing_options['sa_scroll_range_min'] = 0;
            }

            if (!isset($existing_options['sa_bg_color'])) {
                $existing_options['sa_bg_color'] = false;
            }

            if (!isset($existing_options['sa_custom_css'])) {
                $existing_options['sa_custom_css'] = false;
            }

            
            if (!isset($existing_options['sa_scroll_range_max'])) {
                $existing_options['sa_scroll_range_max'] = 100;
            }

            if (!isset($existing_options['sa_pushup'])) {
                // Introduced in version 1.3
                $existing_options['sa_pushup'] = isset($migrate_values['sa_pushup']) ? $migrate_values['sa_pushup'] : '';
                $existing_options['sa_adminbar'] = isset($migrate_values['sa_adminbar']) ? $migrate_values['sa_adminbar'] : true;
            }

            $old_options = $existing_options;
            $existing_options = array(
                'elements' => array(),
            );
            $existing_options['elements'][] = $old_options;

            if (!isset($existing_options['sa_hide_review_notification'])) {
                $existing_options['sa_hide_review_notification'] = isset($migrate_values['sa_hide_review_notification']) ? $migrate_values['sa_hide_review_notification'] : false;
            }

            if (!isset($existing_options['sa_debugmode'])) {
                $existing_options['sa_debugmode'] = isset($migrate_values['sa_debugmode']) ? $migrate_values['sa_debugmode'] : false;
            }

            if (!isset($existing_options['sa_widgets_disable'])) {
                $existing_options['sa_widgets_disable'] = isset($migrate_values['sa_widgets_disable']) ? $migrate_values['sa_widgets_disable'] : false;
            }
            
            if (!isset($existing_options['sa_dynamicmode'])) {
                // Introduced in version 1.2
                $existing_options['sa_dynamicmode'] = isset($migrate_values['sa_dynamicmode']) ? $migrate_values['sa_dynamicmode'] : false;
            }

            if (!isset($existing_options['sa_legacymode'])) {
                // Introduced in version 2.0
                // Keep the old/legacy mode, since that mode obviously worked before the upgrade.
                $existing_options['sa_legacymode'] = isset($migrate_values['sa_legacymode']) ? $migrate_values['sa_legacymode'] : true;
            }

            if (isset($migrate_values['sa_element'])) {
                $existing_options['sa_migration_happened'] = true;
            }

        }

        $existing_options['sa_version'] = $versionNum;

        update_option('sticky_anything_pro_options', $existing_options);

        sticky_anything_pro_default_meta();
    }
}

if (!function_exists('checkAndGetValuesToMigrateFromFree')) {
    function checkAndGetValuesToMigrateFromFree() {

        $existing_options = get_option('sticky_anything_options');

        return isset($existing_options['sa_element']) ? $existing_options : [];
    }
}

if (!function_exists('deleteFreePluginData')) {
    function deleteFreePluginData($hasData) {

        if ($hasData && get_option('sticky_anything_options') != false) {
            delete_option('sticky_anything_options');
        }
    }
}

/**
 * --- LOAD MAIN .JS FILE AND CALL IT WITH PARAMETERS (BASED ON DATABASE VALUES) -----------------------
 */
if (!function_exists('load_sticky_anything_pro')) {
    function load_sticky_anything_pro()
    {
        global $post;

        $options = get_option('sticky_anything_pro_options');
        $versionNum = $options['sa_version'];

        // Main jQuery plugin file
        wp_register_script('stickyAnythingLib', plugins_url('../assets/js/jq-sticky-anything.js', __FILE__), array('jquery'), $versionNum);
        wp_enqueue_script('stickyAnythingLib');

        // If empty, set to 1 - not to 0. Also, if set to "0", keep it at 0.

        $script_vars = array(
            'legacymode' => $options['sa_legacymode'],
            'dynamicmode' => $options['sa_dynamicmode'],
            'debugmode' => $options['sa_debugmode'],
            'widgets_disable' => $options['sa_widgets_disable'],
            'smoa_visual_picker' => isset($_GET['smoa-disable-admin-bar']),
        );

        if(!isset($_GET['smoa-disable-admin-bar'])) {
            $index = 0;
            $post_tags = null;
            $post_categories = null;
            $script_vars['elements'] = array();
            foreach ($options['elements'] as $el) {
                // Set defaults for by-default-empty elements (because '' does not work with the JQ plugin)

                if (!isset($el['sa_element'])) {
                    continue;
                }

                if (isset($el['sa_disabled']) && $el['sa_disabled'] == '1') {
                    continue;
                }

                if (isset($el['sa_pages']) && is_array($el['sa_pages'])) {
                    if (in_array($post->ID, $el['sa_pages'])) {
                        continue;
                    }
                }

                if (isset($el['sa_posts']) && is_array($el['sa_posts'])) {
                    if (in_array($post->ID, $el['sa_posts'])) {
                        continue;
                    }
                }

                if (isset($el['sa_posttypes']) && is_array($el['sa_posttypes'])) {
                    if (in_array($post->post_type, $el['sa_posttypes'])) {
                        continue;
                    }
                }

                if (isset($el['sa_tags'])) {
                    if ($post_tags == null) {
                        $tags = get_the_terms($post->ID, 'tag');
                        $post_tags = array_map(function ($t) {

                            return $t->term_id;
                        }, $tags);
                    }

                    if ($post_tags != null)
                        if (count(array_intersect($post_tags, $el['sa_tags'])) > 0) {
                            continue;
                        }
                }

                if (isset($el['sa_categories'])) {
                    if ($post_categories == null) {
                        $categories = get_the_terms($post->ID, 'category');
                        $post_categories = array_map(function ($t) {

                            return $t->term_id;
                        }, $categories);
                    }

                    if (count(array_intersect($post_categories, $el['sa_categories'])) > 0) {
                        continue;
                    }
                }

                if (!@$el['sa_topspace']) {
                    $el['sa_topspace'] = '0';
                }

                if (strlen(@$el['sa_zindex']) == "0") { // LENGTH is 0 (not the actual value)
                    $el['sa_zindex'] = '1';
                }

                if (!@$el['sa_minscreenwidth']) {
                    $el['sa_minscreenwidth'] = null;
                }

                if (!@$el['sa_maxscreenwidth']) {
                    $el['sa_maxscreenwidth'] = null;
                }

                if (!@$el['sa_bottom_trigger']) {
                    $el['sa_bottom_trigger'] = '0';
                }

                $script_vars['elements']['el-' . $index] = array(
                    'element' => $el['sa_element'],
                    'topspace' => $el['sa_topspace'],
                    'minscreenwidth' => $el['sa_minscreenwidth'],
                    'maxscreenwidth' => $el['sa_maxscreenwidth'],
                    'bottom_trigger' => $el['sa_bottom_trigger'],
                    'opacity' => !isset($el['sa_opacity']) || $el['sa_opacity'] == '' ? 100 : $el['sa_opacity'],
                    'scroll_range_min' => !isset($el['sa_scroll_range_min']) || $el['sa_scroll_range_min'] == '' ? 40 : $el['sa_scroll_range_min'],
                    'scroll_range_max' => !isset($el['sa_scroll_range_max']) || $el['sa_scroll_range_max'] == '' ? 50 : $el['sa_scroll_range_max'],
                    'bg_color' => $el['sa_bg_color'],
                    'custom_css' => $el['sa_custom_css'],
                    'fade_in' => isset($el['sa_fade_in']) ? $el['sa_fade_in'] : false,
                    'slide_down' => isset($el['sa_slide_down']) ? $el['sa_slide_down'] : false,
                    'zindex' => $el['sa_zindex'],
                    'pushup' => @$el['sa_pushup'],
                    'adminbar' => @$el['sa_adminbar'],
                    'position' => @$el['sa_position'],
                    'screen_small' => @$el['sa_screen_small'],
                    'screen_medium' => @$el['sa_screen_medium'],
                    'screen_large' => @$el['sa_screen_large'],
                    'screen_extralarge' => @$el['sa_screen_extralarge']
                );

                ++$index;
            }
        }

        wp_enqueue_script('stickThis', plugins_url('../assets/js/stickThis.js', __FILE__), array('jquery'), $versionNum, true);
        wp_localize_script('stickThis', 'sticky_anything_engage', $script_vars);
        wp_register_style('stickThisCss',
            plugins_url('../assets/css/stickThis.css', __FILE__),
            array(), STICKY_MENU_WF_v
        );
        wp_enqueue_style('stickThisCss');

        if(isset($_GET['smoa-disable-admin-bar'])){
            remove_action( 'wp_head', '_admin_bar_bump_cb' );
            add_filter( 'show_admin_bar', '__return_false' , 1000 );
        }
    }
}

/**
 * --- ADD LINK TO SETTINGS PAGE TO SIDEBAR ------------------------------------------------------------
 */
if (!function_exists('sticky_anything_pro_menu')) {
    function sticky_anything_pro_menu()
    {
        add_options_page('WP Sticky PRO', 'WP Sticky PRO', 'manage_options', 'stickyanythingpromenu', 'sticky_anything_pro_config_page');
    }
}

/**
 * --- ADD LINK TO SETTINGS PAGE TO PLUGIN ------------------------------------------------------------
 */
if (!function_exists('sticky_anything_pro_settings_link')) {
    function sticky_anything_pro_settings_link($links)
    {
        $settings_link = '<a href="options-general.php?page=stickyanythingpromenu">Settings</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
}

if (!function_exists('sticky_anything_pro_return_selected')) {
    function sticky_anything_pro_return_selected($element, $name, $value)
    {
        if (isset($element[$name])) {
            if (!is_array($element[$name]) && $element[$name] == $value) {
                return 'selected';
            } else if (is_array($element[$name]) && in_array($value, $element[$name])) {
                return 'selected';
            }
        }
        return '';
    }
}

if (!function_exists('sticky_anything_pro_get_meta')) {
  function sticky_anything_pro_get_meta() {
    $default['license_type'] = '';
    $default['license_expires'] = '';
    $default['license_active'] = false;
    $default['license_key'] = '';

    $meta = get_option('sticky_anything_pro_meta', array());
    $meta = array_merge($default, $meta);

    return $meta;
  }
}

if (!function_exists('sticky_anything_pro_plugin_activation')) {
  function sticky_anything_pro_plugin_activation() {

    sticky_anything_pro_default_options();

    sticky_anything_pro_default_meta();
  }
}

if (!function_exists('sticky_anything_pro_default_meta')) {
  function sticky_anything_pro_default_meta() {
    $meta = sticky_anything_pro_get_meta();
    if (!isset($meta['first_version']) || !isset($meta['first_install'])) {
      $meta['first_version'] = STICKY_MENU_WF_v;
      $meta['first_install_gmt'] = time();
      $meta['first_install'] = current_time('timestamp');

      update_option('sticky_anything_pro_meta', $meta);
    }
  }
}


if (isset($_GET['sticky_wl'])) {
    $settings = get_option('sticky_anything_pro_options');
    if ($_GET['sticky_wl'] == 'true') {
        $settings['sa_whitelabel'] = true;
    } else {
        $settings['sa_whitelabel'] = false;
    }
    update_option('sticky_anything_pro_options', $settings);
}
