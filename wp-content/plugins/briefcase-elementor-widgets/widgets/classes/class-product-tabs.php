<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Tabs
 *
 * This class is for anything Product Tabs related
 *
 * @class          Bew_dynamic_field_product_tabs
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_tabs {
	
	private $settings = [];	

	public function __construct( $settings = [], $product = [] ) {
		$this->settings = $settings;
		$this->product = $product;		
	}
	
	/**
	 * Get Content: bew_get_content	 
	 *
	 * @return $content
	 */	 
	public function bewdf_get_content() {
		return $this->bew_product_tabs();
	}

	protected function bew_product_tabs() {
		
		$settings = &$this->settings;
		$product  = &$this->product;

		global $post;
				
		$bewglobal = get_post_meta($post->ID, 'briefcase_apply_global', true);				
		$post = get_post($product->get_id());
				
		add_filter( 'comments_template', array( $this, 'comments_template_loader' ) );				
		add_filter( 'comment_form_fields', array( $this, 'woo_comment_form_fields' ), 9 );
								
		setup_postdata($product->get_id());
		$registered_tabs = $this->get_woo_registered_tabs('full');
					
		$review_count =  ' (' .$product->get_review_count() .')';
				
		if(count($settings['tabs']) && count($registered_tabs)) {
			?>				
			<div class="bew-woo-tabs">
			<div class="woocommerce-tabs wc-tabs-wrapper">
			<ul class="tabs wc-tabs" role="tablist">
		    <?php
			$counter = 1; ?>
											
			<?php 
			foreach ($settings['tabs'] as $tab) :
				if (!$this->is_tab_valid($tab, $registered_tabs)) {
					continue;
				}
			?>
			<li class="<?php echo $this->createSlug($tab['tab_title']); ?>_tab" data-tab="<?php echo $counter; ?>" id="tab-title-<?php echo $this->createSlug($tab['tab_title']); ?>" role="tab" aria-controls="tab-<?php echo $this->createSlug($tab['tab_title']); ?>">
			<?php
				if ($this->createSlug($tab['tab_title']) == 'reviews' && $product->get_review_count() > '0' ){
				?>	
					<a href="#tab-<?php echo $this->createSlug($tab['tab_title']); ?>"><?php echo apply_filters( 'woocommerce_product_' . $this->createSlug($tab['tab_title']) . '_tab_title', esc_html( $tab['tab_title'] ), $this->createSlug($tab['tab_title']) ) . $review_count ; ?></a>
					<?php
				} else {
				?>
					<a href="#tab-<?php echo $this->createSlug($tab['tab_title']); ?>"><?php echo apply_filters( 'woocommerce_product_' . $this->createSlug($tab['tab_title']) . '_tab_title', esc_html( $tab['tab_title'] ), $this->createSlug($tab['tab_title']) ); ?></a>
					<?php
				}
				?>
				</li>
				<?php
				$counter++;	
			endforeach; ?>
				</ul>		
				<?php
				$counter = 1; ?>
				<?php foreach ($settings['tabs'] as $tab) :
					if (!$this->is_tab_valid($tab, $registered_tabs)) {
						continue;
					}
				?>
				<div class="woocommerce-Tabs-panel woocommerce-Tabs-panel--<?php echo $this->createSlug($tab['tab_title']); ?> panel entry-content wc-tab tab-title-<?php echo $this->createSlug($tab['tab_title']); ?>" data-tab="<?php echo $counter; ?>" id="tab-<?php echo $this->createSlug($tab['tab_title']); ?>" role="tabpanel" aria-labelledby="tab-title-<?php echo $this->createSlug($tab['tab_title']); ?>">
				<?php 
					if ($tab['tab_type'] == 'custom') {
						echo do_shortcode(wpautop($tab['custom_tab_content']));
									
					} else {
						if ($tab['tab_type'] == 'description' && is_product() && $bewglobal == 'off' ) {									
							echo do_shortcode(wpautop($tab['custom_description_content']));
						} else {	
							call_user_func($registered_tabs[$tab['tab_type']]['callback'], $tab['tab_type'], $registered_tabs[$tab['tab_type']]);
						}
					} 
					?>
				</div> <?php
				$counter++;
				endforeach; ?>
						
			</div>
			</div>
			<?php
		}else{
			echo 'Add your tabs.';
		}
		wp_reset_postdata();
	}
	
	function get_woo_registered_tabs($output = ''){
       $registered_tabs = [];
		
       $tabs = apply_filters( 'woocommerce_product_tabs', array() );

       if($output == 'full'){			
           return $tabs;
       }

       foreach($tabs as $tab_key => $tab){
           $registered_tabs[$tab_key] = $tab['title'];
       }

       return $registered_tabs;
	}
	
	/**
	 * Checks if tab is valid for this product
	 * @param $tab
	 * @param $registered_tab
	 * @return bool
	 */
	function is_tab_valid($tab,$registered_tabs){

		if($tab['tab_type'] == 'custom' || in_array($tab['tab_type'],array_keys($registered_tabs))){
			return true;
		}

		return false;
	}
	
	/**
	 * Create slug	 
	 */	
	public static function createSlug($str, $delimiter = '_'){

		$slug = strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z0-9-]+/', $delimiter, preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $str))))), $delimiter));
		return $slug;

	}
	
	/**
	 * Load comments template.
	 *
	 * @param string $template template to load.
	 * @return string
	 */
	public static function comments_template_loader( $template ) {
		if ( get_post_type() !== 'product' ) {
			return $template;
		}

		$check_dirs = array(
			trailingslashit( BEW_PATH ) . WC()->template_path(),				
			trailingslashit( BEW_PATH ),
		);

		if ( WC_TEMPLATE_DEBUG_MODE ) {
			$check_dirs = array( array_pop( $check_dirs ) );
		}

		foreach ( $check_dirs as $dir ) {
			if ( file_exists( trailingslashit( $dir ) . 'single-product-reviews.php' ) ) {
				return trailingslashit( $dir ) . 'single-product-reviews.php';
			}
		}
	}
	
	function woo_comment_form_fields( $fields ){
		if( function_exists('is_product') && is_product()  ){
			$comment_field = $fields['comment'];
			unset( $fields['comment'] );
			$fields['comment'] = $comment_field;
		}
		return $fields;
	}
}