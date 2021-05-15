<h3>Help us keep Sticky Menu updated &amp; free!</h3>

<?php
  $options = get_option('sticky_anything_pro_options');
  $dismiss_url = add_query_arg(array('action' => 'sticky_pro_hide_review_notification', 'redirect' => urlencode($_SERVER['REQUEST_URI'])), admin_url('admin.php'));
  $dismiss_url = wp_nonce_url($dismiss_url, 'sticky_pro_hide_review_notification');
?>