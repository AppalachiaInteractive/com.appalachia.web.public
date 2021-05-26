<?php
namespace Briefcase\Widgets\Classes;

use Elementor;
use Elementor\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Dynamic Field Product Title
 *
 * This class is for anything Product Title related
 *
 * @class          Bew_dynamic_field_product_title
 * @version        1.8.2
 * @category       Class
 * @author         Briefcasewp
 */
class Bew_dynamic_product_title {
	
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
		return $this->bew_product_title();
	}

	protected function bew_product_title() {
		
		$settings = &$this->settings;
		$product  = &$this->product;	
		
		$product_title_limit 	= $settings['product_title_limit']; 
		$product_title_link 	= $settings['product_title_link'];
		
				
		if(Elementor\Plugin::instance()->editor->is_edit_mode()){
			$temp_post = $post;
			$post = get_post($product->get_id());		
		}					
					
		if("yes" == $product_title_limit){
			add_filter( 'the_title', array($this,'bew_shorten_my_product_title'), 10, 2 );
		}
				
		echo '<div class="bew-product-title">'; 
		if('yes' == $product_title_link){					
			echo '<a href="'.esc_url( get_the_permalink()) .'">';
			echo '<h2 class="woocommerce-loop-product__title product_title">' . get_the_title() . '</h2>';
			echo '</a>';
		}else {
			echo woocommerce_template_single_title();
		}
		echo '</div>';
			
		if(Elementor\Plugin::instance()->editor->is_edit_mode()){							
			$post = $temp_post;
		}
	}
	
	/**
     * param $title
     * param $id
     * return mixed
     */
    public function bew_shorten_my_product_title( $title, $id ) {
        $settings = &$this->settings;		
        $pos = 0;
                                    
        if($settings['product_title_limit_dots'] == "" && $settings['product_title_limit_character'] < strlen($title)){
            if ($settings['product_title_limit_wordcutter'] == "yes"){
                $pos = strpos($title, ' ', $settings['product_title_limit_character']);
                    if(!$pos){
                        return $title;
                    }else{
                        return substr( $title, 0, $pos );
                    }
            }else{
                return substr( $title, 0, $settings['product_title_limit_character'] );
            }
        }else if($settings['product_title_limit_dots'] == "yes" && $settings['product_title_limit_character'] < strlen($title)){
            if ($settings['product_title_limit_wordcutter'] == "yes"){
                $pos = strpos($title, ' ', $settings['product_title_limit_character']);
                    if(!$pos){
                        return $title;
                    }else{
                        return substr( $title, 0, $pos ).'...';
                    }
            }else{
                return substr( $title, 0, $settings['product_title_limit_character'] ).'...';
			}
        }else{
            return $title;
        }
         
    }
}