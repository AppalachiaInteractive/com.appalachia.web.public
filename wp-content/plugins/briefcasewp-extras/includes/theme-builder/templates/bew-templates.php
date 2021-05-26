<?php
namespace BriefcasewpExtras;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

?>
	
	<script type="text/template" id="tmpl-popup-not-confirm">
		<?php
		$url = get_site_url() . '/wp-admin/admin.php?page=bew-templates#tab-settings';
				
		// Get Credentials for update the options.
		$options = get_site_option('briefcase-elementor-widgets_updater_options');
		$email= isset($options['email']) ? $options['email'] : '';		
		$check_password = !empty(isset($options['password'])) ? "yes" : "no";
		
		if ($check_password == "no"){
		//Check if is password is set.
		$option_bew_extras = get_site_option('bew_extras_options');
		$check_password_confirm = !empty(isset($option_bew_extras['confirm_password'])) ? "yes" : "no";
		}
		
		if ($check_password == "yes" || $check_password_confirm == "yes"  ){
			
		}else{ 
		?>
		<div id="popup_confirm" class="overlay">
			<div class="popup">				
				<div class="modal-header">	
				<h4 class="modal-title">Confirm your Account</h4>
				</div>
				<a class="close" id="close_popup" href="#">&times;</a>
				<div class="content">					
					<div id="bew-extras-body" class="modal-body">
					  <span>You need to confirm your Briefcasewp Account</span>
					  <a class="link_confirm" id="link_confirm" href="<?php echo  $url; ?>">Click Here</a>					  
					</div>					
				</div>
			</div>
		</div>
		<?php 
		}
		?>

	</script>	
	<script>
		jQuery(document).ready(function($) {
			
			var template = $("#tmpl-popup-not-confirm").html();			
			$('body').append(template);
			
		});		
	</script>
	<script>	
		
		jQuery(document).ajaxComplete(function(){				
			jQuery('#elementor-template-library-menu-bew-templates').click(function(){	
				jQuery('#popup_confirm').addClass('show');
			});
			
			jQuery('#close_popup').click(function(){	
				jQuery('#popup_confirm').removeClass('show');
			});
			
		});	
	</script>
  
     <?php
