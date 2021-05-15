<div class="smoa-header">

    <img src="<?php echo SMOA_URL; ?>/assets/img/logo.png" class="smoa-logo"  <?php if(sticky_anything_pro_whitelabel_active()){ echo 'style="margin-top: -15px;"'; } ?>>
    <div class="smoa-header-title">
        <h3>WP Sticky</h3>
        <?php if(!sticky_anything_pro_whitelabel_active()){ ?>
        <span class="smoa-header-by">by <a href="https://www.webfactoryltd.com/" target="_blank">WebFactory Ltd</a></span>
        <?php } ?>
        <span class="smoa-header-pro">PRO</span>
    </div>

    <div class="smoa-buttons">
        <?php if (sticky_anything_pro_is_activated()) : ?>
            <button class="button-primary" id="smoa-save-button">
                <?php _e('Save Changes', 'sticky-menu-or-anything-on-scroll'); ?>
            </button>
            <a class="button-primary button-black" href="<?php echo home_url(); ?>" target="_blank" id="smoa-preview-button">
                <?php _e('Preview Sticky', 'sticky-menu-or-anything-on-scroll'); ?>
            </a>
        <?php endif; ?>
    </div>


</div>
<div class="smoa-notices"><h2></h2></div>
