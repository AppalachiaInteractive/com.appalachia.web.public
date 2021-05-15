<?php
$meta = sticky_anything_pro_get_meta();
?>
<h2 class="smoa-tab-title"><i class="sa-icon sa-check"></i> License</h2>
<div class="tile" id="license">
    <div class="tile-body">
        <p class="smoa-tab-description">Please enter your license key to activate the plugin. In case of any problems <a href="#" class="open-beacon">contact support</a>.</p>

        <div class="section-content">

            <div class="double-group clearfix" style="border-bottom: none; padding-bottom: 0;">

                <div class="smoa-license-info">
                    <?php
                    if (sticky_anything_pro_is_activated()) {
                        if ($meta['license_expires'] == '2035-01-01') {
                            $valid = 'indefinitely';
                        } else {
                            $valid = 'until ' . date('F jS, Y', strtotime($meta['license_expires']));
                            if (date('Y-m-d') == $meta['license_expires']) {
                                $valid .= '; expires today';
                            } elseif (date('Y-m-d', time() + 30 * DAY_IN_SECONDS) > $meta['license_expires']) {
                                $tmp = (strtotime($meta['license_expires'] . date(' G:i:s')) - time()) / DAY_IN_SECONDS;
                                $valid .= '; expires in ' . round($tmp) . ' days';
                            }
                        }
                        echo '<div>License Status: <b style="color: #66b317;">Active</b></div>';
                        echo '<div>Type: <strong style="color:#0075a1;">' . str_replace(array('pro', 'agency'), array('PRO', 'AGENCY'), $meta['license_type']) . '</strong></div>';
                        echo '<div>Valid: ' . $valid . '</div>';
                    } else { // not active
                        echo '<div>License Status: <strong style="color: #ea1919;">Inactive</strong>';
                        if (!empty($meta['license_type'])) {
                            echo '<div>Type: ' . $meta['license_type'] . '</div>';
                        }
                        if (!empty($meta['license_expires']) && $meta['license_expires'] != '1900-01-01') {
                            echo '<div>Expired on ' . date('F jS, Y', strtotime($meta['license_expires'])) . '</div>';
                        }
                    }

                    ?>
                </div>
            </div>

            <div class="form-group" style="text-align:center;">
                <p class="form-help-block">License key is located in the confirmation email you received after purchasing.
                    <?php
                    if (!sticky_anything_pro_is_activated()) {
                        echo '<br>If you don\'t have a license - <a target="_blank" href="https://wpsticky.com/#pricing">purchase one now</a>; in case of problems <a href="#" class="open-beacon">contact support</a>.';
                    }
                    ?>
                </p>
                <p><input type="text" name="smoa_license_key" id="smoa_license_key" value="<?php echo (!empty($meta['license_key']) ? $meta['license_key'] : ''); ?>" placeholder="License key" class="skip-save"></p>
                <p><input type="hidden" value="0" id="smoa_license_changed" name="smoa_license_changed">
                    <a href="#" class="button-primary button-green" id="smoa_save_license">Save &amp; Validate License Key</a>
                    <?php
                    if (sticky_anything_pro_is_activated()) {
                    echo '<a href="#" class="button-primary button-black" id="smoa_deactivate_license">Deactivate License</a>';
                    }
                    ?>
                </p>
            </div>
        </div>

        <div class="group clearfix">
            <div class="form-group" style="border-bottom: none; padding-bottom: 0; text-align:center;">
                
            <?php if (sticky_anything_pro_is_activated('agency')) { ?>

            <br><br><hr>
            <p><a href="<?php echo admin_url('options-general.php?page=stickyanythingpromenu&sticky_wl=true'); ?>" class="button-primary">Enable White-Label License Mode</a></p>
            <p>Enabling the white-label license mode hides License tab, and removes visible mentions of WebFactory Ltd.<br>
            To disable it append <strong>&amp;sticky_wl=false</strong> to the WP Sticky settings page URL.
            Or save this URL and open it when you want to disable the white-label license mode:<br> <?php echo '<a href="' . admin_url('options-general.php?page=stickyanythingpromenu&sticky_wl=false') . '">' . admin_url('options-general.php?page=stickyanythingpromenu<strong>&amp;sticky_wl=false</strong>') . '</a>'; ?></p>
            <?php } ?>
                
            </div>
        </div>

    </div>
</div><!-- #basic -->
