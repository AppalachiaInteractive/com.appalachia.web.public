<?php
/*
Plugin Name: WP Sticky PRO
Plugin URI: https://wpsticky.com/
Description: Pick any element on the page, and it will stick when it reaches the top of the page when you scroll down. Handy for navigation menus, but can be used for any element on the page.
Author: WebFactory Ltd
Author URI: https://www.webfactoryltd.com/
Version: 5.28
Tested up to: 5.6
Requires PHP: 5.6

(c) WebFactory Ltd, 2020; support@webfactoryltd.com
Any unauthorized distribution of this software is prohibited without explicit permission from WebFactory Ltd.
*/

defined('ABSPATH') or die('You can\'t open this file directly');

define('STICKY_MENU_WF_v', sticky_pro_plugin_version());
define('STICKY_MENU_WF_DB_v', 5);
define('SMOA_URL', plugins_url('', __FILE__));

include 'includes/license.php';
include 'includes/functions.php';

/**
 * --- THE WHOLE ADMIN SETTINGS PAGE ----------------------------------------------------
 */
if (!function_exists('sticky_anything_pro_config_page')) {
    function sticky_anything_pro_config_page()
    {

        // Retrieve plugin configuration options from database
        $sticky_anything_options = get_option('sticky_anything_pro_options');

        include 'config_form/config.php';
    }
}

if (!function_exists('sticky_anything_pro_admin_init')) {
    function sticky_anything_pro_admin_init()
    {
        add_action('admin_post_save_sticky_anything_pro_options', 'process_sticky_anything_pro_options');
    }
}

/**
 * --- PROCESS THE SETTINGS FORM AFTER SUBMITTING ------------------------------------------------------
 */
if (!function_exists('process_sticky_anything_pro_options')) {
    function process_sticky_anything_pro_options()
    {

        smoa_pro_save($_POST, 'sticky_anything_pro');

        $tabValue = $_POST['sa_tab'];

        wp_redirect(add_query_arg(
            array('page' => 'stickyanythingpromenu', 'message' => '1', 'tab' => $tabValue),
            admin_url('options-general.php')
        ));

        exit;
    }
}

/**
 * --- ADD THE .CSS AND .JS TO ADMIN MENU --------------------------------------------------------------
 */
if (!function_exists('sticky_anything_pro_styles')) {
    function sticky_anything_pro_styles($hook)
    {
        global $sticky_anything_pro_licensing_servers;
        if ($hook != 'settings_page_stickyanythingpromenu') {
            return;
        }

        $sticky_anything_options = get_option('sticky_anything_pro_options');

        wp_register_script('stickyAnythingAdminScript', plugins_url('/assets/js/sticky-anything-admin.js', __FILE__), array('jquery', 'jquery-ui-core', 'jquery-ui-slider'), STICKY_MENU_WF_v);
        $meta = sticky_anything_pro_get_meta();
        $current_user = wp_get_current_user();
        $support_text = 'My site details: WP ' . get_bloginfo('version') . ', WP Sticky v' . STICKY_MENU_WF_v . ', ';
        if (!empty($meta['license_key'])) {
            $support_text .= 'license key: ' . $meta['license_key'] . '.';
        } else {
            $support_text .= 'no license info.';
        }
        if (strtolower($current_user->display_name) != 'admin' && strtolower($current_user->display_name) != 'administrator') {
            $support_name = $current_user->display_name;
        } else {
            $support_name = '';
        }

        // Localize the script with new data
        $translation_array = array(
            'warning_leaving_without_save' => __('Are you sure you want to navigate away from this page without saving first?', 'sticky-menu-or-anything-on-scroll'),
            'warning_preview_without_save' => __('You still haven\'t saved Your changes. Please do it before proceed to preview.', 'sticky-menu-or-anything-on-scroll'),
            'oops' => __('Ooops...', 'sticky-menu-or-anything-on-scroll'),
            'form_success' => __('Settings Updated.', 'sticky-menu-or-anything-on-scroll'),
            'form_success_deleted' => __('Settings Updated.', 'sticky-menu-or-anything-on-scroll'),
            'form_loading_title' => __('Please wait!', 'sticky-menu-or-anything-on-scroll'),
            'form_loading' => __('We are saving things for You.', 'sticky-menu-or-anything-on-scroll'),
            'form_loading_delete' => __('We are deleting the elements for You.', 'sticky-menu-or-anything-on-scroll'),
            'form_error_title' => __('Settings Failed to Update.', 'sticky-menu-or-anything-on-scroll'),
            'form_error_delete_title' => __('Delete process failed.', 'sticky-menu-or-anything-on-scroll'),
            'form_error' => __('Try again. If problem still exist please ping us.', 'sticky-menu-or-anything-on-scroll'),
            'form_warning_empty_fields' => __('Fill all fields', 'sticky-menu-or-anything-on-scroll'),
            'form_warning_empty_fields_text' => __('There are still required fields without data. Please fill all required fields.', 'sticky-menu-or-anything-on-scroll'),
            'nonce_save_settings' => wp_create_nonce('smoa_pro_save_settings'),
            'lic' => array(
                'nonce_save_settings' => wp_create_nonce('smoa_pro_save_lic_settings'),
                'is_activated' => sticky_anything_pro_is_activated(),
                'lc_ep' => $sticky_anything_pro_licensing_servers[0],
                'lc_version' => STICKY_MENU_WF_v,
                'lc_site' => get_home_url(),
                'nonce_activate_license_key' => wp_create_nonce('smoa_pro_activate_license_key'),
                'nonce_save_license_key' => wp_create_nonce('smoa_pro_save_license_key'),
                'messages' => array(
                    'errors' => array(
                        'unknown' => array(
                            'title' => 'Undocumented error',
                            'msg' => 'Undocumented error. Please reload the page and try again.',
                        ),
                        'ups' => array(
                            'title' => 'Something is not right',
                            'msg' => 'Something is not right. Please reload the page and try again',
                        ),
                    ),
                ),
            ),
            'support_text' => $support_text,
            'support_name' => $support_name,
            'whitelabel'   => isset($sticky_anything_options['sa_whitelabel'])?$sticky_anything_options['sa_whitelabel']:false,
            'total_elements' => isset($sticky_anything_options['elements']) ? count($sticky_anything_options['elements']) : 0,
            'smoa_wp_url' => home_url() . '?smoa-disable-admin-bar=1',
            'settings_page' => array(
                'default_element_text' => __('Sticky Element #', 'sticky-menu-or-anything-on-scroll'),
                'status_on' => __('ON', 'sticky-menu-or-anything-on-scroll'),
                'status_off' => __('OFF', 'sticky-menu-or-anything-on-scroll'),
                'delete_element' => __('Delete this element', 'sticky-menu-or-anything-on-scroll'),
                'required' => __('required', 'sticky-menu-or-anything-on-scroll'),
                'pick_element' => __('Pick Element', 'sticky-menu-or-anything-on-scroll'),
                'basic_settings_header' => __('Basic', 'sticky-menu-or-anything-on-scroll'),
                'basic_settings_element_nickname' => __('Element nickname:', 'sticky-menu-or-anything-on-scroll'),
                'basic_settings_element_nickname_hint' => __('Nickname so you can remember what this element is, example: "Top bar, sidebar, etc...".', 'sticky-menu-or-anything-on-scroll'),
                'basic_settings_element_sticky' => __('Sticky Element:', 'sticky-menu-or-anything-on-scroll'),
                'basic_settings_element_sticky_hint' => __('(choose ONE element, e.g. <strong>#main-navigation</strong>, OR <strong>.main-menu-1</strong>, OR <strong>header nav</strong>, etc.)<br/>The element that needs to be sticky once you scroll. This can be your menu, or any other element like a sidebar, ad banner, etc. Make sure this is a unique identifier.', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_header' => __('Visual', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position' => __('Position:', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_option_top' => __('Top', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_option_bottom' => __('Bottom', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_hint' => __('Choose whether to stick the element.', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_bottom' => __('Stick to bottom after user scrolls:', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_bottom_px_percentage' => __('pixels or percentage', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_bottom_hint' => __('Example: <strong>100</strong> or <strong>20%</strong><br/>Stick to bottom only when the user scrolls a specific amount of pixels or percentage of page height', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_top' => __('Space between top of page and sticky element: (optional)', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_top_hint' => __('number of <strong>pixels</strong> or <strong>CSS selector</strong><br/>If you don\'t want the element to be sticky at the very top of the page, but a little lower, add the number of pixels that should be between your element and the \'ceiling\' of the page.', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_admin' => __('Check for Admin Toolbar:', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_admin_hint' => __('<strong>Move the sticky element down a little if there is an Administrator Toolbar at the top (for logged in users).</strong><br/>If the sticky element gets obscured by the Administrator Toolbar for logged in users (or vice versa), check this box.', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_devices' => __('Devices', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_devices_small' => __('Small', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_devices_medium' => __('Medium', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_devices_large' => __('Large', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_devices_extra_large' => __('Extra Large', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_devices_hint' => __('<strong>If you wanna customize scroll down</strong><br/>Stick element only for these devices', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_z_index' => __('Z-index: (optional)', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_z_index_hint' => __('If there are other elements on the page that obscure/overlap the sticky element, adding a Z-index might help. If you have no idea what that means, try entering 99999.', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_opacity' => __('Opacity: (optional)', 'sticky-menu-or-anything-on-scroll'),
                'visual_settings_element_position_opacity_hint' => __('\'Choose the opacity of the element when sticky', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_header' => __('Advanced', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_screen_px' => __('pixels', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_screen_is_smaller_than' => __('Do not stick element when screen is smaller than: (optional)', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_screen_is_smaller_than_hint' => __('Sometimes you do not want your element to be sticky when your screen is small (responsive menus, etc). If you enter a value here, your menu will not be sticky when your screen width is smaller than his value.', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_screen_is_larger_than' => __('Do not stick element when screen is larger than: (optional)', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_screen_is_larger_than_hint' => __('Sometimes you do not want your element to be sticky when your screen is large (responsive menus, etc). If you enter a value here, your menu will not be sticky when your screen width is wider than this value.', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_effects' => __('Effects: (optional)', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_effects_fade_in' => __('Fade-in', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_effects_slide_down' => __('Slide down', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_effects_hint' => __('Choose the effect of the element when sticky', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_push_up' => __('Push-up element (optional):', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_push_up_hint' => __('(choose ONE element, e.g. <strong>#footer</strong>, OR <strong>.widget-bottom</strong>, etc.)<br/>If you want your sticky element to be \'pushed up\' again by another element lower on the page, enter it here. Make sure this is a unique identifier.', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick' => __('Do not stick here:', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_pages' => __('Pages', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_pages_placeholder' => __('Select pages', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_pages_items' => get_pages(),
                'advanced_settings_element_do_not_stick_posts' => __('Posts', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_posts_placeholder' => __('Select posts', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_posts_items' => get_posts(),
                'advanced_settings_element_do_not_stick_categories' => __('Categories', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_categories_placeholder' => __('Select categories', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_categories_items' => get_categories(array('hide_empty' => false)),
                'advanced_settings_element_do_not_stick_tags' => __('Tags', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_tags_placeholder' => __('Select tags', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_tags_items' => get_tags(array('hide_empty' => false)),
                'advanced_settings_element_do_not_stick_post_types' => __('Post types', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_post_types_placeholder' => __('Select post types', 'sticky-menu-or-anything-on-scroll'),
                'advanced_settings_element_do_not_stick_post_types_items' => get_post_types(),
                'advanced_settings_element_do_not_stick_hint' => __('Exclude sticky element under the following conditions', 'sticky-menu-or-anything-on-scroll'),
            ),
        );
        wp_localize_script('stickyAnythingAdminScript', 'smoa', $translation_array);
        wp_enqueue_script('stickyAnythingAdminScript');

        wp_enqueue_script('sticky-tooltipster', plugins_url('/assets/js/tooltipster.bundle.min.js', __FILE__), array('jquery'), STICKY_MENU_WF_v, true);
        wp_enqueue_style('sticky-tooltipster', plugins_url('/assets/css/tooltipster.bundle.min.css', __FILE__), array(), STICKY_MENU_WF_v);

        wp_register_script('select2', plugins_url('/assets/js/select2.full.min.js', __FILE__), array('jquery'), STICKY_MENU_WF_v);
        wp_enqueue_script('select2');

        wp_register_script('sweetalert2', plugins_url('/assets/js/sweetalert2.min.js', __FILE__), array('jquery'), STICKY_MENU_WF_v);
        wp_enqueue_script('sweetalert2');

        wp_enqueue_style('wp-color-picker');
        wp_enqueue_script('wp-color-picker');

        $wp_scripts = wp_scripts();
        wp_enqueue_style(
            'plugin_name-admin-ui-css',
            plugins_url('/assets/css/jqueryui/jquery-ui.min.css', __FILE__),
            false,
            STICKY_MENU_WF_v,
            false
        );
        wp_register_style(
            'stickyAnythingAdminStyle',
            plugins_url('/assets/css/sticky-anything-admin.css', __FILE__),
            array(),
            STICKY_MENU_WF_v
        );
        wp_enqueue_style('stickyAnythingAdminStyle');
        wp_enqueue_style('sticky-google-font-roboto', 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap', array(), STICKY_MENU_WF_v);
        wp_register_style('select2', plugins_url('/assets/css/select2.min.css', __FILE__));
        wp_enqueue_style('select2');

        wp_register_style('sweetalert2', plugins_url('/assets/css/sweetalert2.min.css', __FILE__));
        wp_enqueue_style('sweetalert2');
    }
}

/**
 * Helper function for adding plugins to featured list
 *
 * @return array
 */
function sticky_pro_featured_plugins_tab($args)
{
    add_filter('plugins_api_result', 'sticky_pro_plugins_api_result', 10, 3);
    return $args;
} // sticky_featured_plugins_tab


function sticky_pro_plugin_version()
{
    $plugin_data = get_file_data(__FILE__, array('version' => 'Version'), 'plugin');

    return $plugin_data['version'];
} // get_plugin_version


/**
 * Add single plugin to featured list
 *
 * @return object
 */
function sticky_pro_add_plugin_featured($plugin_slug, $res)
{
    // check if plugin is already on the list
    if (!empty($res->plugins) && is_array($res->plugins)) {
        foreach ($res->plugins as $plugin) {
            if (is_object($plugin) && !empty($plugin->slug) && $plugin->slug == $plugin_slug) {
                return $res;
            }
        } // foreach
    }

    $plugin_info = get_transient('wf-plugin-info-' . $plugin_slug);

    if (!$plugin_info) {
        $plugin_info = plugins_api('plugin_information', array(
            'slug' => $plugin_slug,
            'is_ssl' => is_ssl(),
            'fields' => array(
                'banners' => true,
                'reviews' => true,
                'downloaded' => true,
                'active_installs' => true,
                'icons' => true,
                'short_description' => true,
            ),
        ));
        if (!is_wp_error($plugin_info)) {
            set_transient('wf-plugin-info-' . $plugin_slug, $plugin_info, DAY_IN_SECONDS * 7);
        }
    }

    if (!empty($res->plugins) && is_array($res->plugins) && $plugin_info && is_object($plugin_info)) {
        array_unshift($res->plugins, $plugin_info);
    }

    return $res;
} // sticky_pro_add_plugin_featured

/**
 * Add plugins to featured plugins list
 *
 * @return object
 */
function sticky_pro_plugins_api_result($res, $action, $args)
{
    remove_filter('plugins_api_result', 'sticky_pro_plugins_api_result', 10, 3);

    $res = sticky_pro_add_plugin_featured('wp-external-links', $res);
    $res = sticky_pro_add_plugin_featured('wp-force-ssl', $res);
    $res = sticky_pro_add_plugin_featured('eps-301-redirects', $res);

    return $res;
} // sticky_pro_plugins_api_result

function sticky_pro_hide_review_notification()
{
    if (false == wp_verify_nonce(@$_GET['_wpnonce'], 'sticky_pro_hide_review_notification')) {
        wp_die('Please click back, reload the page and try again.');
    }

    $sticky_anything_options = get_option('sticky_anything_pro_options');
    $sticky_anything_options['sa_hide_review_notification'] = true;
    update_option('sticky_anything_pro_options', $sticky_anything_options);

    if (!empty($_GET['redirect'])) {
        wp_safe_redirect(esc_url($_GET['redirect']));
    } else {
        wp_safe_redirect(admin_url('options-general.php?page=stickyanythingpromenu'));
    }

    exit;
} // sticky_pro_hide_review_notification

function sticky_pro_hide_migration_notification()
{
    if (false == wp_verify_nonce(@$_GET['_wpnonce'], 'sticky_pro_hide_migration_notification')) {
        wp_die('Please click back, reload the page and try again.');
    }

    $sticky_anything_options = get_option('sticky_anything_pro_options');
    $sticky_anything_options['sa_migration_happened'] = false;
    update_option('sticky_anything_pro_options', $sticky_anything_options);

    if (!empty($_GET['redirect'])) {
        wp_safe_redirect(esc_url($_GET['redirect']));
    } else {
        wp_safe_redirect(admin_url('options-general.php?page=stickyanythingpromenu'));
    }

    exit;
} // sticky_pro_hide_migration_notification

/**
 * === HOOKS AND ACTIONS AND FILTERS AND SUCH ==========================================================
 */

$plugin = plugin_basename(__FILE__);

register_activation_hook(__FILE__, 'sticky_anything_pro_plugin_activation');
add_action('init', 'sticky_anything_pro_update', 1);
add_action('wp_enqueue_scripts', 'load_sticky_anything_pro');
add_action('admin_menu', 'sticky_anything_pro_menu');
add_action('admin_init', 'sticky_anything_pro_admin_init');
add_action('admin_enqueue_scripts', 'sticky_anything_pro_styles');
add_filter("plugin_action_links_$plugin", 'sticky_anything_pro_settings_link');
add_filter('install_plugins_table_api_args_featured', 'sticky_pro_featured_plugins_tab');
add_action('admin_action_sticky_pro_hide_review_notification', 'sticky_pro_hide_review_notification');
add_action('admin_action_sticky_pro_hide_migration_notification', 'sticky_pro_hide_migration_notification');

/**
 * Add sticky option to widgets
 */
function sticky_pro_menu_widget_add_option($widget, $return, $instance)
{
    $options = get_option('sticky_anything_pro_options');
    if (array_key_exists('sa_widgets_disable', $options) && $options['sa_widgets_disable'] == true){
        return false;
    }

    $id = $widget->id;
    $name = $widget->name;
    $sticky = isset($instance['smoa_pro_is_sticky']) ? $instance['smoa_pro_is_sticky'] : '';
?>
    <p>
        <input type="hidden" name="<?php echo $widget->get_field_name("smoa_pro_widget_name"); ?>" value="<?php echo $name ?>">
        <input type="hidden" name="<?php echo $widget->get_field_name("smoa_pro_widget_id"); ?>" value="<?php echo $id ?>">
        <input class="checkbox" type="checkbox" id="<?php echo $widget->get_field_id("smoa_pro_is_sticky-$id"); ?>" name="<?php echo $widget->get_field_name("smoa_pro_is_sticky") ?>" <?php checked(true, $sticky); ?> />
        <label for="<?php echo $widget->get_field_id("smoa_pro_is_sticky-$id"); ?>">
            <?php _e('Make this widget sticky', 'sticky-menu-or-anything-on-scroll'); ?>
        </label>
    </p>
<?php

}

add_filter('in_widget_form', 'sticky_pro_menu_widget_add_option', 10, 3);

// add links to plugin's description in plugins table
function sticky_pro_plugin_meta_links($links, $file)
{
    if ($file ==  plugin_basename(__FILE__) && sticky_anything_pro_whitelabel_active()) {
        unset($links[1]);
        unset($links[2]);
        return $links;
    }

    if ($file == plugin_basename(__FILE__)) {
        $links[] = '<a target="_blank" href="https://wpsticky.com/contact/" title="Get help">Support</a>';
    }

    return $links;
} // csmm_plugin_meta_links

add_filter('plugin_row_meta', 'sticky_pro_plugin_meta_links', 10, 2);
/**
 * Manage sticky option of widgets
 */
function sticky_pro_menu_widget_save($instance, $new_instance, $data)
{
    $options = get_option('sticky_anything_pro_options');
    if (array_key_exists('sa_widgets_disable', $options) && $options['sa_widgets_disable'] == true){
        return $instance;
    }
    /**
     * We make sure we have the ID of the widget,
     * otherwise there's not much we can do
     */
    if (!isset($new_instance['smoa_pro_widget_id'])) {
        return;
    }

    /**
     * User added (or kept) a sticky widget
     */
    if (!empty($new_instance['smoa_pro_is_sticky'])) {
        $new_instance['smoa_pro_is_sticky'] = 1;
        /**
         * Get the ID of the widget
         */
        $id = $new_instance['smoa_pro_widget_id'];
        /**
         * We should always have a name for the widget,
         * if we don't have it we'll use the ID
         */
        $name = isset($new_instance['smoa_pro_widget_name']) ? $new_instance['smoa_pro_widget_name'] : $id;
        /**
         * SMOA css selector
         */
        $selector = ".smoa_pro_$id.widget";
        $add_element = true;

        /**
         * We should have 'elements' in options
         * but we check for it anyway
         */
        if (!isset($options['elements'])) {
            $options['elements'] = array();
        }

        foreach ($options['elements'] as $element) {
            if (isset($element['sa_disabled']) && $element['sa_disabled'] == "on") {
                $element['sa_disabled'] = false;
            } else {
                $element['sa_disabled'] = true;
            }
            if (isset($element['sa_element']) && $element['sa_element'] == $selector) {
                /**
                 * If we already have this selector, just skip
                 */
                $add_element = false;
                break;
            }
        }

        if ($add_element) {
            $options['elements'][] = array(
                "sa_element" => $selector,
                "sa_name" => $name,
                "sa_element_name" => $name,

                /**
                 * This is currently not used but it could be useful
                 */
                "is_widget" => true,
            );

            update_option('sticky_anything_pro_options', $options);
        }
    }
    /**
     * User removed (or kept unchecked) a sticky widget
     */
    else {
        $id = $new_instance['smoa_pro_widget_id'];
        /**
         * SMOA css selector
         */
        $selector = ".smoa_pro_$id";

        $keyToRemove = -1;
        if (isset($options['elements'])) {
            foreach ($options['elements'] as $k => $element) {
                if (isset($element['sa_disabled']) && $element['sa_disabled'] == "on") {
                    $element['sa_disabled'] = false;
                } else {
                    $element['sa_disabled'] = true;
                }
                if ($element['sa_element'] == $selector) {
                    $keyToRemove = $k;
                    break;
                }
            }

            if ($keyToRemove > -1) {
                unset($options['elements'][$keyToRemove]);
                update_option('sticky_anything_pro_options', $options);
            }
        }
    }

    return $new_instance;
}

add_filter('widget_update_callback', 'sticky_pro_menu_widget_save', 10, 3);

function sticky_pro_menu_widget_display($instance, $obj, $args)
{

    $options = get_option('sticky_anything_pro_options');
    if (array_key_exists('sa_widgets_disable', $options) && $options['sa_widgets_disable'] == true){
        return $instance;
    }
    
    $id = $obj->id;
    $new_class = "class=\"smoa_pro_$id ";
    $args['before_widget'] = str_replace('class="', $new_class, $args['before_widget']);
    $obj->widget($args, $instance);

    return $instance;
}

add_filter('widget_display_callback', 'sticky_pro_menu_widget_display', 999, 3);

function smoa_pro_ajax_save_settings()
{
    parse_str($_POST['form_data'], $data);
    smoa_pro_save($data, 'smoa_pro_save_settings', true);
    // $data = get_updated_config_page_html();
    wp_send_json_success($data);
} //smoa_pro_ajax_save_settings
add_action('wp_ajax_smoa_pro_save_settings', 'smoa_pro_ajax_save_settings');

add_action('wp_ajax_smoa_activate', 'sticky_anything_pro_check_licence_ajax');
add_action('wp_ajax_smoa_deactivate', 'sticky_anything_pro_check_licence_ajax');
add_action('wp_ajax_smoa_activate_ajax', 'sticky_anything_pro_save_licence_ajax');
add_action('wp_ajax_smoa_deactivate_ajax', 'sticky_anything_pro_save_licence_ajax');

function get_updated_config_page_html()
{
    ob_start();
    sticky_anything_pro_config_page();
    return ob_get_clean();
} //get_updated_config_page_html

function smoa_pro_save($data, $check_admin_referer, $ajax = false)
{

    if (!current_user_can('manage_options')) {
        wp_die('Not allowed');
    }

    $ajax ? check_ajax_referer($check_admin_referer) : check_admin_referer($check_admin_referer);

    $options = get_option('sticky_anything_pro_options');
    $sanitize = array(
        'sa_element', 'sa_topspace', 'sa_minscreenwidth', 'sa_name', 'sa_element_name',
        'sa_maxscreenwidth', 'sa_zindex', 'sa_pushup', 'sa_adminbar',
        'sa_position', 'sa_bottom_trigger', 'sa_opacity', 'sa_scroll_range_min', 'sa_scroll_range_max', 'sa_bg_color', 'sa_custom_css'
    );
    $arrays = array('sa_pages', 'sa_posts', 'sa_categories', 'sa_tags', 'sa_posttypes');
    $booleans = array(
        'sa_adminbar', 'sa_fade_in', 'sa_slide_down',
        'sa_screen_small', 'sa_screen_medium', 'sa_screen_large',
        'sa_screen_extralarge', 'sa_disabled'
    );

    $elements = array();
    if (isset($data['elements'])) {
        $index = 0;
        foreach ($data['elements'] as $el) {

            if (!isset($el['sa_element'])) {
                continue;
            }

            if (isset($el['sa_disabled']) && $el['sa_disabled'] == "on") {
                unset($el['sa_disabled']);
            } else {
                $el['sa_disabled'] = false;
            }

            $el_options = array();
            foreach ($sanitize as $option_name) {
                if (isset($el[$option_name])) {
                    $el_options[$option_name] = sanitize_text_field($el[$option_name]);
                }
            }

            foreach ($arrays as $option_name) {
                if (isset($el[$option_name])) {
                    $el_options[$option_name] = $el[$option_name];
                }
            }

            foreach ($booleans as $option_name) {
                if (isset($el[$option_name])) {
                    $el_options[$option_name] = true;
                } else {
                    $el_options[$option_name] = false;
                }
            }

            $elements[] = $el_options;
            ++$index;
        }
    }

    foreach (array('sa_tab') as $option_name) {
        if (isset($data[$option_name])) {
            $options[$option_name] = sanitize_text_field($data[$option_name]);
        }
    }

    foreach (array('sa_legacymode', 'sa_dynamicmode', 'sa_debugmode', 'sa_widgets_disable') as $option_name) {
        if (isset($data[$option_name])) {
            $options[$option_name] = true;
        } else {
            $options[$option_name] = false;
        }
    }

    $options["elements"] = $elements;

    update_option('sticky_anything_pro_options', $options);

    if (!empty($_POST['smoa_license_changed'])) {
        $meta = sticky_anything_pro_get_meta();
        $key = trim($_POST['smoa_license_key']);
        if (empty($key)) {
            $meta['license_type'] = '';
            $meta['license_expires'] = '';
            $meta['license_active'] = false;
            $meta['license_key'] = '';
            set_transient('sticky_anything_pro_err_' . get_current_user_id(), '<div class="alert alert-info"><strong>License key saved.</strong><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>', 60);
            update_option('sticky_anything_pro_meta', $meta);
        } else {
            $tmp = sticky_anything_pro_validate_license_key($key);
            $meta['license_key'] = $key;
            if ($tmp['success']) {
                $meta['license_type'] = $tmp['license_type'];
                $meta['license_expires'] = $tmp['license_expires'];
                $meta['license_active'] = $tmp['license_active'];
                if ($tmp['license_active']) {
                    set_transient('sticky_anything_pro_err_' . get_current_user_id(), '<div class="alert alert-success"><strong>License key saved and activated!</strong><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>', 60);
                } else {
                    set_transient('sticky_anything_pro_err_' . get_current_user_id(), '<div class="alert alert-danger"><strong>License not active.</strong> ' . $tmp['error'] . '<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>', 60);
                }
            } else {
                set_transient('sticky_anything_pro_err_' . get_current_user_id(), '<div class="alert alert-danger"><strong>Unable to contact licensing server. Please try again in a few moments.</strong><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>', 60);
            }
            update_option('sticky_anything_pro_meta', $meta);
        }
    }
} //smoa_pro_save

add_filter('pre_set_site_transient_update_plugins', 'sticky_anything_pro_update_filter');
add_filter('plugins_api', 'sticky_anything_pro_update_details', 100, 3);


function smoa_admin_footer_text($text)
{
    if(!smoa_is_plugin_page()){
        return $text;
    }
    
    $text = '<i class="smoa-footer"><a href="' . smoa_generate_web_link('admin_footer') . '" title="' . __('Visit WP Sticky PRO', 'sticky-menu-or-anything-on-scroll') . '" target="_blank">WP Sticky PRO</a> v' . STICKY_MENU_WF_v . '.</i>';
    echo '<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script>';

    return $text;
} // admin_footer_text

if(!sticky_anything_pro_whitelabel_active()){
    add_filter('admin_footer_text', 'smoa_admin_footer_text');
}

function smoa_is_plugin_page()
{
    $current_screen = get_current_screen();

    if ($current_screen->id == 'settings_page_stickyanythingpromenu') {
        return true;
    } else {
        return false;
    }
} // is_plugin_page

function smoa_generate_web_link($placement = '', $page = '/', $params = array(), $anchor = '')
{
    $base_url = 'https://wpsticky.com/';

    if ('/' != $page) {
        $page = '/' . trim($page, '/') . '/';
    }
    if ($page == '//') {
        $page = '/';
    }

    $parts = array_merge(array('utm_source' => 'wp-sticky', 'utm_medium' => 'plugin', 'utm_content' => $placement, 'utm_campaign' => 'wp-sticky-pro-v' . STICKY_MENU_WF_v), $params);

    if (!empty($anchor)) {
        $anchor = '#' . trim($anchor, '#');
    }

    $out = $base_url . $page . '?' . http_build_query($parts, '', '&amp;') . $anchor;

    return $out;
} // generate_web_link
