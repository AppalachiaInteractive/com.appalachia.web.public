<?php

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$csshero_version="5-dev";
$csshero_version_styles="5-dev";
$theme_slug=csshero_get_active_theme_slug();
//$html_theme_slug = $theme_slug;
//$rocket_mode_string="";
if (is_child_theme()) $theme_slug=strtolower(get_template()); //gets the parent if we are using a child

//you can force here to override default configuration being applied to your theme | EXAMPLE: $theme_slug="yourtheme";
if (isset($_GET['override_theme_config'])) $theme_slug=sanitize_title($_GET['override_theme_config']);


if (function_exists("csshero_demo_plugin_is_active")) $is_demo_additional_par="cache_subject=demo&"; else $is_demo_additional_par="";

$site_base_url = site_url().'/';
$plugin_root_url= plugin_dir_url( __FILE__ );
?>

<?php function heroSBLooper($type,$pre){
   

   $args = array(
       'post_type'=> $type,
       'orderby'    => 'ID',
       'post_status' => 'publish',
       'order'    => 'DESC',
       'posts_per_page' => 999
   );
   $result = new WP_Query( $args );
   $rets = array();
   $preloads = array();
   if ( $result-> have_posts() ) :
       while ( $result->have_posts() ) : $result->the_post();
       $perma = get_the_permalink();

       
       $rets[] = '"'.get_the_title().'":"'.$perma.'"';
       $preloads[] = '<link rel="prerender" href="'.$perma.'" as="document">';
       
       endwhile;
       endif;
       wp_reset_postdata();
   
       $js = '"'.$type.'":{'.join(',',$rets).'}';
       $pr = join(' ',$preloads);

   $ret = $pre ? $pr : $js;
   return $ret;

} ?>

<?php
    $pTypes = array('post','page');
    $args = array(
        'public'   => true,
        '_builtin' => false,
    );
 
    $output = 'names'; // names or objects, note names is the default
    $operator = 'and'; // 'and' or 'or'

    $post_types = get_post_types( $args, $output, $operator ); 

    foreach ( $post_types  as $post_type ){
        $pTypes[] = $post_type;
    }
?>

<!DOCTYPE html>
<html data-child-theme-slug="<?php echo $theme_slug; ?>">
<head>
	<meta charset="UTF-8">
	<meta name="robots" content="noindex,nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<title>CSS Hero &mdash; <?php echo $csshero_version; ?></title>
	<link rel="stylesheet" href="<?php echo $plugin_root_url ?>dist/main.css"/>
</head>
<body id="csshero-body" data-js-version="<?php echo $csshero_version;?>" data-css-version="<?php echo $csshero_version_styles; ?>">
<div id="root"></div>
<textarea hidden id='cssheroSaveData'>
    <?php echo ((csshero_get_data())); //addslashes ?>
</textarea>




<textarea hidden id='cssheroSBlist'>
    {
    "Home":{
        "Home":"<?php bloginfo('url'); ?>"
    },
    <?php 
    foreach ($pTypes as $pType){
        echo heroSBLooper($pType,false).',';
    } ?>
    
    "Templates":{
        "Search":"<?php echo get_search_link('search'); ?>",
        "Login page":"<?php bloginfo('url');?>/?csshero_style_wp_login_page=1"
    }
    }
    
    
</textarea>
</body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<script>
window.LoadHEROWorker = new Worker('<?php echo $plugin_root_url ?>dist/worker.js');
window.baseUrl = '<?php echo $site_base_url; ?>';
window.adminAjaxUrl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
window.nonce = '<?php echo wp_create_nonce( "csshero-saving" ) ?>';


window.getPath = function(el) {
    el = $(el);
    var pathes = [];
    el.each(function(index, element) {
        var path, $node = jQuery(element);
        while ($node.length) {
            var realNode = $node.get(0), name = realNode.localName;
            if (!name) { break; }
            name = name.toLowerCase();
            
            var parent = $node.parent();
            var sameTagSiblings = parent.children(name);

            if (sameTagSiblings.length > 1){
                allSiblings = parent.children();
                var index = allSiblings.index(realNode) +1;
                if (index > 0) {
                    name += ':nth-child(' + index + ')';
                }
            }
            
            // FIND IF IT'S A POST OR PAGE
            
            classes = jQuery(realNode).attr('class');
            
            if (jQuery(realNode).attr('id')){
                name = '#'+jQuery(realNode).attr('id');
            } else {
            
                if(classes && classes.indexOf('post-')>-1){
	                classes_arr = classes.split(' ');
	                single_post_class =  jQuery.grep(classes_arr, function( a ) {
						return  a.indexOf('post-') == 0;
					});
					if (single_post_class.length > 0){
						name = '.'+single_post_class.join('.');
					}
				}
			}
			
			
			
			path = name + (path ? ' > ' + path : '');
			$node = parent;
		}
					
		pathes.push(path);
    });
    const joined = pathes.join(',')
    let ret = joined;
    if (joined.indexOf('#')>-1){
        ret = joined.split('#')
        ret = '#'+ret[ret.length -1]
    }


    return ret;
}

</script>
<script data-cfasync="false" type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lite@2.2.3/dist/jquery.min.js"></script>
<script data-cfasync="false" charset="UTF-8" type="text/javascript" src='https://p.csshero.org/production-v5-test/heroes-loader-v5.php?<?php echo $is_demo_additional_par ?>version=<?php echo $csshero_version ?>&key=<?php echo  wpcss_check_license() ?>&theme=<?php echo $theme_slug ?>&thv=<?php $my_theme = wp_get_theme(); echo   $my_theme->get( 'Version' ); ?>&plugins=<?php echo csshero_get_active_site_plugins() ?>'></script> 
<script src="<?php echo $plugin_root_url ?>dist/main.js"></script>
</html>