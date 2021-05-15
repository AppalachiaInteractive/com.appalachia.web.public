<h2 class="smoa-tab-title"><i class="sa-icon sa-settings"></i> Advanced Options</h2>
<table class="form-table form-table-advanced">
    <tr>
        <th scope="row">
            <div class="toggle-wrapper">
                <input type="checkbox" id="sa_legacymode" name="sa_legacymode" <?php if ($sticky_anything_options['sa_legacymode'] == true) echo ' checked="checked" '; ?> class="smoa_use_normal_click" />
                <label for="sa_legacymode" class="toggle"><span class="toggle_handler"></span></label>
            </div>
        </th>
        <td>
            <label for="sa_legacymode"><strong><?php _e('Legacy Mode (only recommended if you upgraded from earlier version).', 'sticky-menu-or-anything-on-scroll'); ?></strong><span class="tooltip" title="<?php _e('If you upgraded from an earlier version and it always worked before, use legacy mode to keep using the old method.', 'sticky-menu-or-anything-on-scroll'); ?>"><i class="sa-icon sa-question-circle"></i></span></label>
            <p class="description"><?php _e('In version 2.0, a new/better method for making elements sticky was introduced. However, if you upgraded this plugin from an earlier version, and the old method always worked for you, there is no need to use the new method and you should keep this option checked.<br>More information about this setting can be found in the <a href="#faq" class="change-tab">FAQ</a>.', 'sticky-menu-or-anything-on-scroll'); ?></p>
        </td>
    </tr>

    <tr class="showhide <?php if ($sticky_anything_options['sa_legacymode'] == false) echo 'disabled-feature'; ?>" id="row-dynamic-mode">
        <th scope="row">

            <div class="toggle-wrapper">
                <input type="checkbox" id="sa_dynamicmode" name="sa_dynamicmode" <?php if ($sticky_anything_options['sa_dynamicmode'] == true) echo ' checked="checked" '; ?> />
                <label for="sa_dynamicmode" class="toggle"><span class="toggle_handler"></span></label>
            </div>
        </th>
        <td>
            <div>
                <label for="sa_dynamicmode"><strong><?php _e('If the plugin doesn\'t work in your theme (often the case with responsive themes), try it in Dynamic Mode.', 'sticky-menu-or-anything-on-scroll'); ?></strong><span class="tooltip" title="<?php _e('When Dynamic Mode is OFF, a cloned element will be created upon page load. If this mode is ON, a cloned element will be created every time your scrolled position hits the \'sticky\' point (option available in Legacy Mode only).', 'sticky-menu-or-anything-on-scroll'); ?>"><i class="sa-icon sa-question-circle"></i></span></label>
                <p class="description"><?php _e('NOTE: this is not a \'Magic Checkbox\' that fixes all problems. It simply solves some issues that frequently appear with some responsive themes, but doesn\'t necessarily work in ALL situations.', 'sticky-menu-or-anything-on-scroll'); ?></p>
            </div>
        </td>
    </tr>

    <tr>
        <th scope="row">
            <div class="toggle-wrapper">
                <input type="checkbox" id="sa_debugmode" name="sa_debugmode" <?php if ($sticky_anything_options['sa_debugmode'] == true) echo ' checked="checked" '; ?> />
                <label for="sa_debugmode" class="toggle"><span class="toggle_handler"></span></label>
            </div>
        </th>
        <td>
            <label for="sa_debugmode"><strong><?php _e('Log plugin errors in browser console', 'sticky-menu-or-anything-on-scroll'); ?></strong><span class="tooltip" title="<?php _e('When Debug Mode is on, error messages will be shown in your browser\'s console when the element you selected either doesn\'t exist, or when there are more elements on the page with your chosen selector.', 'sticky-menu-or-anything-on-scroll'); ?>"><i class="sa-icon sa-question-circle"></i></span></label>
            <p class="description"><?php _e('This will help debugging the plugin in case of problems. Do NOT check this option in production environments.', 'sticky-menu-or-anything-on-scroll'); ?></p>
        </td>
    </tr>

    <tr>
        <th scope="row">
            <div class="toggle-wrapper">
                <input type="checkbox" id="sa_widgets_disable" name="sa_widgets_disable" <?php if (array_key_exists('sa_widgets_disable', $sticky_anything_options) && $sticky_anything_options['sa_widgets_disable'] == true) echo ' checked="checked" '; ?> />
                <label for="sa_widgets_disable" class="toggle"><span class="toggle_handler"></span></label>
            </div>
        </th>
        <td>
            <label for="sa_widgets_disable"><strong><?php _e('Disable widgets support', 'sticky-menu-or-anything-on-scroll'); ?></strong><span class="tooltip" title="<?php _e('Disable widget support if you encounter compatibility issues with your theme widget display.', 'sticky-menu-or-anything-on-scroll'); ?>"><i class="sa-icon sa-question-circle"></i></span></label>
            <p class="description"><?php _e('This will disable widgets support. Enable this if you encounter compatibility issues with your themes widgets.', 'sticky-menu-or-anything-on-scroll'); ?></p>
        </td>
    </tr>
</table>