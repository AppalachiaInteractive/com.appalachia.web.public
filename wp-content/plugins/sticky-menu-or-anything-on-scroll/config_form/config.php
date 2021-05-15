<div id="sticky-anything-settings-general" class="wrap">

    <?php
    // header
    include 'config_header.php';

    //review notice if needed
    if (!empty($sticky_anything_options['elements'][0]['sa_element']) && !empty($sticky_anything_options['sa_migration_happened']) && $sticky_anything_options['sa_migration_happened']) {
        $dismiss_migration_url = add_query_arg(
            array(
                'action' => 'sticky_pro_hide_migration_notification',
                'redirect' => urlencode($_SERVER['REQUEST_URI'])
            ),
            admin_url('admin.php')
        );

        $dismiss_migration_url = wp_nonce_url(
            $dismiss_migration_url,
            'sticky_pro_hide_migration_notification'
        );

        include 'config_migration_notice.php';
    }
    ?>


    <div class="main-content">
        <?php
        //body config settings
        include 'config_body.php';
        ?>
    </div>
</div>