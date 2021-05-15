<h2 class="element-tab-title" id="sa_element_title-<?php echo $idx ?>"><?php echo isset($el['sa_element_name'])?esc_html(@@$el['sa_element_name']):'Sticky Element #' . $idx; ?></h2>
<table class="status-element">
    <tr>
        <th scope="row">Status:
        </th>
        <td>
            <div class="toggle-wrapper">
                <input data-element-id="<?php echo $idx ?>" class="sa_element_name_status" type="checkbox" id="sa_disabled-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_disabled]" <?php if (!array_key_exists('sa_disabled', $el) || $el['sa_disabled'] != true) echo ' checked="checked" '; ?> />
                <label for="sa_disabled-<?php echo $idx ?>" class="toggle"><span class="toggle_handler"></span></label>
            </div>
        </td>
    </tr>
</table>
<button type="button" class="smoa-collapsible" smoa-collapsible-id="<?php echo $idx ?>" smoa-collapsible-type="basic"><?php _e('Basic', 'sticky-menu-or-anything-on-scroll'); ?></button>
<div class="smoa-content" smoa-content-id="<?php echo $idx ?>" smoa-content-type="basic">
    <table class="form-table">
        <tr>
            <th scope="row">
                <label for="sa_element_name-<?php echo $idx ?>">
                    <?php _e('Element nickname:', 'sticky-menu-or-anything-on-scroll'); ?> (required)
                </label>
            </th>
            <td>
                <input data-element-id="<?php echo $idx ?>" class="sa_element_name" data-to-disable required <?php echo $isNew ? "disabled" : "" ?> type="text" id="sa_element_name-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_element_name]" value="<?php echo esc_html(@@$el['sa_element_name']); ?>" />
                <em class="smoa-input-help">
                    <?php _e('Nickname so you can remember what this element is, example: "Top bar, sidebar, etc..."', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="sa_element-<?php echo $idx ?>">
                    <?php _e('Sticky Element:', 'sticky-menu-or-anything-on-scroll'); ?> (required)
                </label>
            </th>
            <td>
                <div style="display: flex;">
                    <button data-element-id="<?php echo $idx ?>" data-element="sa_element-<?php echo $idx ?>" class="smoa-click-visual-btn button-primary button-blacky">
                        <i class="sa-icon sa-verify"></i>
                        <?php _e('Pick Element', 'sticky-menu-or-anything-on-scroll'); ?>
                    </button>
                    <input data-to-disable required <?php echo $isNew ? "disabled" : "" ?> type="text" id="sa_element-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_element]" value="<?php

                                                                                                                                                                                                    if (@@$el['sa_element'] != '#NO-ELEMENT') {
                                                                                                                                                                                                        echo esc_html(@@$el['sa_element']);
                                                                                                                                                                                                    }
                                                                                                                                                                                                    ?>" />
                </div>
                <em class="smoa-input-help">
                    <?php _e('(choose ONE element, e.g. <strong>#main-navigation</strong>, OR <strong>.main-menu-1</strong>, OR <strong>header nav</strong>, etc.)<br/>The element that needs to be sticky once you scroll. This can be your menu, or any other element like a sidebar, ad banner, etc. Make sure this is a unique identifier.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
    </table>
</div>
<button type="button" class="smoa-collapsible" smoa-collapsible-id="<?php echo $idx ?>" smoa-collapsible-type="visual"><?php _e('Visual', 'sticky-menu-or-anything-on-scroll'); ?></button>
<div class="smoa-content" smoa-content-id="<?php echo $idx ?>" smoa-content-type="visual">
    <table class="form-table">
        <tr>
            <th scope="row">
                <label for="sa_position-<?php echo $idx ?>">
                    <?php _e('Position:', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <select class="sa_position" id="sa_position-<?php echo $idx ?>" data-select-position="sa_bottom_trigger-<?php echo $idx ?>-row" name="elements[<?php echo $idx ?>][sa_position]">
                    <option <?php echo sticky_anything_pro_return_selected($el, 'sa_position', 'top') ?> value="top"><?php _e('Top', 'sticky-menu-or-anything-on-scroll'); ?></option>
                    <option <?php echo sticky_anything_pro_return_selected($el, 'sa_position', 'bottom') ?> value="bottom"><?php _e('Bottom', 'sticky-menu-or-anything-on-scroll'); ?></option>
                </select>
                <em class="smoa-input-help">
                    <?php _e('Choose whether to stick the element.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr id="sa_bottom_trigger-<?php echo $idx ?>-row" <?php echo sticky_anything_pro_return_selected($el, 'sa_position', 'bottom') === 'selected' ? '' : 'style="display: none;"' ?>>
            <th scope="row">
                <label for="sa_bottom_trigger-<?php echo $idx ?>"><?php _e('Stick to bottom after user scrolls:', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <input type="text" style="width:80px" id="sa_bottom_trigger-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_bottom_trigger]" value="<?php echo esc_html(@@$el['sa_bottom_trigger']); ?><?php ?>" />
                <?php _e('pixels or percentage', 'sticky-menu-or-anything-on-scroll'); ?>
                <em class="smoa-input-help">
                    <?php _e('Example: <strong>100</strong> or <strong>20%</strong><br/>Stick to bottom only when the user scrolls a specific amount of pixels or percentage of page height', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="sa_topspace-<?php echo $idx ?>">
                    <?php _e('Space between top of page and sticky element: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <input type="number" id="sa_topspace-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_topspace]" value="<?php echo esc_html(@@$el['sa_topspace']); ?>" style="width:80px;" /> pixels
                <em class="smoa-input-help">
                    <?php _e('If you don\'t want the element to be sticky at the very top of the page, but a little lower, add the number of pixels that should be between your element and the \'ceiling\' of the page.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="sa_adminbar-<?php echo $idx ?>">
                    <?php _e('Check for Admin Toolbar:', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <div class="toggle-wrapper">
                    <input type="checkbox" id="sa_adminbar-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_adminbar]" <?php if (@$el['sa_adminbar']) echo ' checked="checked" '; ?> class="smoa_use_normal_click" />
                    <label for="sa_adminbar-<?php echo $idx ?>" class="toggle"><span class="toggle_handler"></span></label>
                </div>
                <em class="smoa-input-help">
                    <?php _e('<strong>Move the sticky element down a little if there is an Administrator Toolbar at the top (for logged in users).</strong><br/>If the sticky element gets obscured by the Administrator Toolbar for logged in users (or vice versa), check this box.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label>
                    <?php _e('Devices', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <table class="form-table-compact">
                    <tr>
                        <td>
                            <div class="toggle-wrapper">
                                <input type="checkbox" id="elements[<?php echo $idx ?>][sa_screen_small]" name="elements[<?php echo $idx ?>][sa_screen_small]" <?php if (@$el['sa_screen_small']) echo ' checked="checked" '; ?> />
                                <label for="elements[<?php echo $idx ?>][sa_screen_small]" class="toggle"><span class="toggle_handler"></span></label>
                            </div>
                        </td>
                        <td><?php _e('Small', 'sticky-menu-or-anything-on-scroll') ?>(&lt;576px)</em></td>
                    </tr>

                    <tr>
                        <td>
                            <div class="toggle-wrapper">
                                <input type="checkbox" id="elements[<?php echo $idx ?>][sa_screen_medium]" name="elements[<?php echo $idx ?>][sa_screen_medium]" <?php if (@$el['sa_screen_medium']) echo ' checked="checked" '; ?> />
                                <label for="elements[<?php echo $idx ?>][sa_screen_medium]" class="toggle"><span class="toggle_handler"></span></label>
                            </div>
                        </td>
                        <td><?php _e('Medium', 'sticky-menu-or-anything-on-scroll') ?>(&lt;768px)</em></td>
                    </tr>

                    <tr>
                        <td>
                            <div class="toggle-wrapper">
                                <input type="checkbox" id="elements[<?php echo $idx ?>][sa_screen_large]" name="elements[<?php echo $idx ?>][sa_screen_large]" <?php if (@$el['sa_screen_large']) echo ' checked="checked" '; ?> />
                                <label for="elements[<?php echo $idx ?>][sa_screen_large]" class="toggle"><span class="toggle_handler"></span></label>
                            </div>
                        </td>
                        <td><?php _e('Large', 'sticky-menu-or-anything-on-scroll') ?>(&lt;992px)</em></td>
                    </tr>

                    <tr>
                        <td>
                            <div class="toggle-wrapper">
                                <input type="checkbox" id="elements[<?php echo $idx ?>][sa_screen_extralarge]" name="elements[<?php echo $idx ?>][sa_screen_extralarge]" <?php if (@$el['sa_screen_extralarge']) echo ' checked="checked" '; ?> />
                                <label for="elements[<?php echo $idx ?>][sa_screen_extralarge]" class="toggle"><span class="toggle_handler"></span></label>
                            </div>
                        </td>
                        <td><?php _e('Extra large', 'sticky-menu-or-anything-on-scroll') ?>(&lt;1200px)</em></td>
                    </tr>

                </table>
                <em class="smoa-input-help">
                    <?php _e('<strong>If you wanna customize scroll down</strong><br/>Stick element only for these devices', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="sa_zindex-<?php echo $idx ?>">
                    <?php _e('Z-index: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <input type="number" id="sa_zindex-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_zindex]" value="<?php echo esc_html(@@$el['sa_zindex']); ?>" style="width:80px;" />
                <em class="smoa-input-help">
                    <?php _e('If there are other elements on the page that obscure/overlap the sticky element, adding a Z-index might help. If you have no idea what that means, try entering 99999.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <label>
                    <?php _e('Effects:', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <table class="form-table-compact">
                    <tr>
                        <td>
                            <div class="toggle-wrapper">
                                <input type="checkbox" id="elements[<?php echo $idx ?>][sa_fade_in]" name="elements[<?php echo $idx ?>][sa_fade_in]" <?php if (@$el['sa_fade_in']) echo ' checked="checked" '; ?> />
                                <label for="elements[<?php echo $idx ?>][sa_fade_in]" class="toggle"><span class="toggle_handler"></span></label>
                            </div>
                        </td>
                        <td><?php _e('Fade-in', 'sticky-menu-or-anything-on-scroll'); ?></td>
                    </tr>

                    <tr>
                        <td>
                            <div class="toggle-wrapper">
                                <input type="checkbox" id="elements[<?php echo $idx ?>][sa_slide_down]" name="elements[<?php echo $idx ?>][sa_slide_down]" <?php if (@$el['sa_slide_down']) echo ' checked="checked" '; ?> />
                                <label for="elements[<?php echo $idx ?>][sa_slide_down]" class="toggle"><span class="toggle_handler"></span></label>
                            </div>
                        </td>
                        <td><?php _e('Slide down', 'sticky-menu-or-anything-on-scroll'); ?></td>
                    </tr>

                </table>

                <em class="smoa-input-help">
                    <?php _e('Choose the effect of the element when sticky', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <label for="sa_opacity-<?php echo $idx ?>">
                    <?php _e('Opacity: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td style="padding-top: 4px;">
                <table style="width: 400px">
                    <tr>
                        <td style="width:60px"><span id="opacity-<?php echo $idx ?>"><?php echo @$el['sa_opacity'] ?></span>%
                        </td>
                        <td>
                            <div data-for="<?php echo $idx ?>" data-smoa-slider data-value='<?php echo @$el['sa_opacity'] ?>'></div>
                        </td>
                    </tr>
                </table>
                <input id="sa_opacity-<?php echo $idx ?>" type="hidden" name="elements[<?php echo $idx ?>][sa_opacity]" class="skip-save">
                <em class="smoa-input-help">
                    <?php _e('Choose the opacity of the element when sticky', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <label for="sa_scroll_range-<?php echo $idx ?>">
                    <?php _e('Scroll Range: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td style="padding-top: 4px;">
                <table style="width: 400px">
                    <tr>
                        <td style="width:80px">
                            <span id="scroll_range_min-<?php echo $idx ?>"><?php echo isset($el['sa_scroll_range_min'])?$el['sa_scroll_range_min']:0; ?></span>% - 
                            <span id="scroll_range_max-<?php echo $idx ?>"><?php echo isset($el['sa_scroll_range_max'])?$el['sa_scroll_range_max']:100; ?></span>%
                        </td>
                        <td>
                            <div data-for="<?php echo $idx ?>" data-smoa-slider-range data-value-min='<?php echo isset($el['sa_scroll_range_min'])?$el['sa_scroll_range_min']:0; ?>' data-value-max='<?php echo isset($el['sa_scroll_range_max'])?$el['sa_scroll_range_max']:100; ?>'></div>
                        </td>
                    </tr>
                </table>
                <input id="sa_scroll_range_min-<?php echo $idx ?>" type="hidden" name="elements[<?php echo $idx ?>][sa_scroll_range_min]" class="skip-save">
                <input id="sa_scroll_range_max-<?php echo $idx ?>" type="hidden" name="elements[<?php echo $idx ?>][sa_scroll_range_max]" class="skip-save">
                <em class="smoa-input-help">
                    <?php _e('Choose the scroll range of the page in which the element will be sticky, for example between 20% and 50%', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <label for="sa_bg_color-<?php echo $idx ?>">
                    <?php _e('Background color when sticky: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <input class="sticky-color-field" type="text" id="sa_bg_color-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_bg_color]" value="<?php echo esc_html(@@$el['sa_bg_color']); ?>" style="width:80px;" />
                <em class="smoa-input-help">
                    <?php _e('Set a background color for the element when it is stiky.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <label for="sa_custom_css-<?php echo $idx ?>">
                    <?php _e('Custom CSS when sticky: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <textarea id="sa_custom_css-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_custom_css]" style="width:100%; height:140px;"><?php echo esc_html(@@$el['sa_custom_css']); ?></textarea>
                <em class="smoa-input-help">
                    <?php _e('CSS styles that will only be applied to the element when it is sticky. Do not wrap the styles in any selector, instead of <code>.classname{color:#FFF;}</code> just write <code>color:#FFF;</code>', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
    </table>
</div>
<button type="button" class="smoa-collapsible" smoa-collapsible-id="<?php echo $idx ?>" smoa-collapsible-type="advanced"><?php _e('Advanced', 'sticky-menu-or-anything-on-scroll'); ?></button>
<div class="smoa-content" smoa-content-id="<?php echo $idx ?>" smoa-content-type="advanced">
    <table class="form-table">
        <tr>
            <th scope="row">
                <label for="sa_minscreenwidth-<?php echo $idx ?>">
                    <?php _e('Do not stick element when screen is smaller than: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <input type="number" id="sa_minscreenwidth-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_minscreenwidth]" value="<?php echo esc_html(@$el['sa_minscreenwidth']); ?>" style="width:80px;" /> <?php _e('pixels', 'sticky-menu-or-anything-on-scroll'); ?>
                <em class="smoa-input-help">
                    <?php _e('Sometimes you do not want your element to be sticky when your screen is small (responsive menus, etc). If you enter a value here, your menu will not be sticky when your screen width is smaller than his value.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label for="sa_maxscreenwidth-<?php echo $idx ?>">
                    <?php _e('Do not stick element when screen is larger than: (optional)', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <input type="number" id="sa_maxscreenwidth-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_maxscreenwidth]" value="<?php echo esc_html(@$el['sa_maxscreenwidth']); ?>" style="width:80px;" /> <?php _e('pixels', 'sticky-menu-or-anything-on-scroll'); ?>
                <em class="smoa-input-help">
                    <?php _e('Sometimes you do not want your element to be sticky when your screen is large (responsive menus, etc). If you enter a value here, your menu will not be sticky when your screen width is wider than this value.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <label for="sa_pushup-<?php echo $idx ?>">
                    <?php _e('Push-up element (optional):', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <div style="display: flex;">
                    <button data-element-id="<?php echo $idx ?>" data-element="sa_pushup-<?php echo $idx ?>" class="smoa-click-visual-btn button-primary button-blacky">
                        <i class="sa-icon sa-verify"></i>
                        <?php _e('Pick Element', 'sticky-menu-or-anything-on-scroll'); ?>
                    </button>
                    <input type="text" id="sa_pushup-<?php echo $idx ?>" name="elements[<?php echo $idx ?>][sa_pushup]" value="<?php

                    if (@@$el['sa_pushup'] != '#NO-ELEMENT') {
                        echo esc_html(@@$el['sa_pushup']);
                    }
                    ?>" />
                </div>
                <em class="smoa-input-help">
                    <?php _e('(choose ONE element, e.g. <strong>#footer</strong>, OR <strong>.widget-bottom</strong>, etc.)<br/>If you want your sticky element to be \'pushed up\' again by another element lower on the page, enter it here. Make sure this is a unique identifier.', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
        <tr>
            <th scope="row">
                <label>
                    <?php _e('Do not stick here:', 'sticky-menu-or-anything-on-scroll'); ?>
                </label>
            </th>
            <td>
                <div class="smoa-exclude-item-list">
                    <?php _e('Pages', 'sticky-menu-or-anything-on-scroll') ?>:
                    <select name="elements[<?php echo $idx ?>][sa_pages][]" class='smoa-select2' multiple data-placeholder='Select pages'>
                        <?php foreach (get_pages() as $item) : ?>
                            <option <?php echo sticky_anything_pro_return_selected($el, 'sa_pages', $item->ID) ?> value="<?php echo $item->ID ?>"><?php echo $item->post_title ?></option>
                        <?php endforeach ?>
                    </select>
                </div>

                <div class="smoa-exclude-item-list">
                    <?php _e('Posts', 'sticky-menu-or-anything-on-scroll') ?>:
                    <select name="elements[<?php echo $idx ?>][sa_posts][]" class='smoa-select2' multiple data-placeholder='Select posts'>
                        <?php foreach (get_posts() as $item) : ?>
                            <option <?php echo sticky_anything_pro_return_selected($el, 'sa_posts', $item->ID) ?> value="<?php echo $item->ID ?>"><?php echo $item->post_title ?></option>
                        <?php endforeach ?>
                    </select>
                </div>

                <div class="smoa-exclude-item-list">
                    <?php _e('Categories', 'sticky-menu-or-anything-on-scroll') ?>:
                    <select name="elements[<?php echo $idx ?>][sa_categories][]" class='smoa-select2' multiple data-placeholder='Select categories'>
                        <?php foreach (get_categories(array('hide_empty' => false)) as $item) : ?>
                            <option <?php echo sticky_anything_pro_return_selected($el, 'sa_categories', $item->cat_ID) ?> value="<?php echo $item->cat_ID ?>"><?php echo $item->name ?></option>
                        <?php endforeach ?>
                    </select>
                </div>

                <div class="smoa-exclude-item-list">
                    <?php _e('Tags', 'sticky-menu-or-anything-on-scroll') ?>:
                    <select name="elements[<?php echo $idx ?>][sa_tags][]" class='smoa-select2' multiple data-placeholder='Select tags'>
                        <?php foreach (get_tags(array('hide_empty' => false)) as $item) : ?>
                            <option <?php echo sticky_anything_pro_return_selected($el, 'sa_tags', $item->term_id) ?> value="<?php echo $item->term_id ?>"><?php echo $item->name ?></option>
                        <?php endforeach ?>
                    </select>
                </div>

                <div class="smoa-exclude-item-list">
                    <?php _e('Post types', 'sticky-menu-or-anything-on-scroll') ?>:
                    <select name="elements[<?php echo $idx ?>][sa_posttypes][]" class='smoa-select2' multiple data-placeholder='Select post types'>
                        <?php foreach (get_post_types() as $item) : ?>
                            <option <?php echo sticky_anything_pro_return_selected($el, 'sa_posttypes', $item) ?> value="<?php echo $item ?>"><?php echo $item ?></option>
                        <?php endforeach ?>
                    </select>
                </div>
                <em class="smoa-input-help">
                    <?php _e('Exclude sticky element under the following conditions', 'sticky-menu-or-anything-on-scroll'); ?>
                </em>
            </td>
        </tr>
    </table>
</div>

<button type="button" class="smoa-collapsible smoa-collapsible-danger" smoa-collapsible-id="<?php echo $idx ?>" smoa-collapsible-type="delete"><?php _e('Delete Element', 'sticky-menu-or-anything-on-scroll'); ?></button>
<div class="smoa-content smoa-content-danger" smoa-content-id="<?php echo $idx ?>" smoa-content-type="delete">
    <?php if (!$isNew) : ?>
        <div class="smoa-content-danger-inner">
            <strong><?php _e('If you want to permanently delete this sticky element click the button below.', 'sticky-menu-or-anything-on-scroll') ?></strong>
            <a href="#" data-delete-element="<?php echo $idx ?>" class="button-primary button-black"><?php _e('Delete this sticky element', 'sticky-menu-or-anything-on-scroll') ?></a>
            <?php _e('PLEASE NOTE: There is NO UNDO', 'sticky-menu-or-anything-on-scroll') ?>
        </div>
    <?php endif ?>
</div>
