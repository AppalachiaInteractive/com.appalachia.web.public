<div class="smoa-body smoa-clearfix">
    <nav>
        <div class="smoa-float-left">
            <div class="smoa-mobile-menu"></div>
            <?php
            if (sticky_anything_pro_is_activated()) :
            ?>
            <a id="add-new-element" class="add-new-element" data-enable-new="true" href="#new-element">
                <?php _e('Add New Sticky Element', 'sticky-menu-or-anything-on-scroll'); ?>
            </a>
            <h4>Your Sticky Elements</h4>
            <ul class="smoa-main-menu smoa-elements">
                <?php if (sticky_anything_pro_is_activated()) : ?>
                    <?php
                    $idx = 0;
                    if(empty($sticky_anything_options['elements'])){
                        echo '<li class="no-elements"><a class="add-new-element">No Elements - Add New</a></li>';
                    }
                    foreach ($sticky_anything_options['elements'] as $el) :
                    ?>
                        <li id="li-element-<?php echo $idx; ?>">
                            <a href="#element-<?php echo $idx; ?>" class="smoa-element-text <?php echo (isset($el['sa_disabled']) && $el['sa_disabled'] ? "disabled-item" : "active-item") ?>">
                                <span id="sa_element_name-<?php echo $idx; ?>"><?php echo isset($el['sa_element_name']) ? $el['sa_element_name'] : '' ?></span>
                            </a>
                        </li>
                    <?php
                        ++$idx;
                    endforeach;
                    ?>

                <?php endif; ?>
            </ul>
            <?php endif; ?>
            <h4>Plugin Options</h4>

            <ul class="smoa-main-menu">
                <?php if (sticky_anything_pro_is_activated()) : ?>
                    <li>
                        <a href="#welcome"><i class="sa-icon sa-welcome"></i>
                            <?php _e('Welcome', 'sticky-menu-or-anything-on-scroll'); ?>
                        </a>
                    </li>
                <?php
                endif;
                if (sticky_anything_pro_is_activated()) :
                ?>
                    <li>
                        <a href="#faq"><i class="sa-icon sa-faq"></i>
                            <?php _e('FAQ', 'sticky-menu-or-anything-on-scroll'); ?>
                        </a>
                    </li>
                <?php
                endif;
                /*
<li>
                    <a id="li-support" href="#support"><i class="sa-icon sa-support"></i>
                        <?php _e('Support', 'sticky-menu-or-anything-on-scroll'); ?>
                    </a>
                </li>
                */
                if (sticky_anything_pro_is_activated()) :
                ?>
                    <li>
                        <a href="#advanced"><i class="sa-icon sa-settings"></i>
                            <?php _e('Advanced Options', 'sticky-menu-or-anything-on-scroll'); ?>
                        </a>
                    </li>
                <?php endif; ?>

                <?php if(!sticky_anything_pro_whitelabel_active()){ ?>
                <li <?php echo (!sticky_anything_pro_is_activated()) ? 'class="active"' : '' ?>>
                    <a href="#license"><i class="sa-icon sa-check"></i>
                        <?php _e('License', 'sticky-menu-or-anything-on-scroll'); ?>
                    </a>
                </li>
                <?php } ?>
            </ul>
        </div>
    </nav>
    <form method="post" action="admin-post.php" id="sa_form">
        <input type="hidden" name="action" value="save_sticky_anything_options" />
        <input type="hidden" name="sa_tab" value="" />
        <input type="hidden" name="sa_delete" id="sa_delete" value="" />
        <?php wp_nonce_field('sticky_anything'); ?>

        <div class="smoa-float-right tab-pages">
            <div class="smoa-tab" id="welcome">
                <?php include 'partial/tab-welcome.php' ?>
            </div>
            <div class="smoa-tab" id="faq">
                <?php include 'partial/tab-faq.php' ?>
            </div>
            <div class="smoa-tab" id="advanced">
                <?php include 'partial/tab-advanced.php' ?>
            </div>

            <?php if(!sticky_anything_pro_whitelabel_active()){ ?>
            <div class="smoa-tab" id="license">
                <?php include 'partial/tab-license.php' ?>
            </div>
            <?php } ?>

            <div class="smoa-tab" id="support">
                <?php include 'partial/tab-support.php' ?>
            </div>
            <?php $idx = 0;
            $isNew = false; ?>
            <?php foreach ($sticky_anything_options['elements'] as $el) : ?>
                <div class="smoa-tab" id="element-<?php echo $idx ?>">
                    <?php include 'partial/tab-settings.php' ?>
                </div>
                <?php ++$idx; ?>
            <?php endforeach; ?>
        </div>
    </form>
    <div class="smoa-modal">
        <div class="smoa-modal-header">
            <div style="padding: 5px;">
                <div class="smoa-modal-header-logo">
                    <img src="<?php echo SMOA_URL; ?>/assets/img/logo.png" class="smoa-logo" <?php if(sticky_anything_pro_whitelabel_active()){ echo 'style="margin-top: -5px;"'; } ?>>
                    <div class="smoa-header-title">
                        <h2><span>Sticky</span>Anything</h2>
                        <?php if(!sticky_anything_pro_whitelabel_active()){ ?>
                        <span class="smoa-header-by"> by <a href="https://www.webfactoryltd.com/" target="_blank">WebFactory Ltd</a></span>
                        <?php } ?>
                        <span class="smoa-header-pro">PRO</span>
                    </div>
                </div>

                <div class="smoa-modal-header-info">
                    <div class="modal-title"><?php _e('Please Pick and Element by Hover and Click the element You want to Stick', 'sticky-menu-or-anything-on-scroll'); ?></div>
                    <strong><?php _e('Element Path to Stick: ', 'sticky-menu-or-anything-on-scroll'); ?></strong><br />
                    <span class="smoa-modal-selected-path"></span>
                </div>

                <div class="smoa-modal-header-right">
                    <strong><?php _e('Use click to navigate', 'sticky-menu-or-anything-on-scroll'); ?></strong>
                    <div class="toggle-wrapper">
                        <input type="checkbox" id="smoa_use_normal_click" name="smoa_use_normal_click" class="smoa_use_normal_click" />
                        <label for="smoa_use_normal_click" class="toggle"><span class="toggle_handler"></span></label>
                    </div>
                </div>


            </div>
            <button class="smoa-modal-close-btn"><i class="sa-icon sa-close"></i></button>
        </div>
        <div class="smoa-modal-content">
            <iframe id="smoa-modal-iframe" class="smoa-modal-content"></iframe>
        </div>
    </div>
</div>

<div id="smoa-new-sticky-html" style="display:none;">
    <?php
    $idx = 999999;
    
    $el = array();
    $el['sa_screen_small'] = true;
    $el['sa_screen_medium'] = true;
    $el['sa_screen_large'] = true;
    $el['sa_screen_extralarge'] = true;
    include 'partial/tab-settings.php'; 
    
    ?>
</div>
