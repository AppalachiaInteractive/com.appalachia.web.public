<?php require_once '../../inc/url_set.php'; ?>
<script type="text/javascript" src="<?php echo htmlspecialchars(remove_http($_GET['vp'])); ?>js/sub.general.view.js"></script>
<div class="hero_views">
	<!--<div class="hero_section_holder">
        <div class="hero_col_12">
            <div class="hero_col_6">
                <h2 class="hero_red size_18">
                    Slider Name<br />
                    <strong class="size_11 hero_grey">The name of your slider. This is for your reference only.</strong>
                </h2>
            </div>
            <div class="hero_col_6">
                <input type="text" data-size="lrg" id="txt_name4" name="txt_name4" data-node_val="slider/sliderName">
            </div>
        </div>
    </div>-->
    <div class="hero_section_holder">
    	<div class="hero_col_12"> 
        	<h2 class="hero_red size_18">
                Responsive options<br />
                <strong class="size_11 hero_grey">Toggle responsive settings and set your slider's dimensions.</strong>
            </h2>
        </div>
        <div class="hero_col_12 hslider_type_options">   
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_green">Fixed</h2></label>
                <input type="radio" data-size="sml" id="responsive_type_fixed" data-node_val="slider/sliderType" name="responsive_group" value="fixed" checked>
            </div>
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_green">Responsive Scaling</h2></label>
                <input type="radio" data-size="sml" id="responsive_type_responsive" data-node_val="slider/sliderType" name="responsive_group" value="responsive">
            </div>
            <!--<div class="hero_col_3">
                <label><h2 class="size_14 hero_green">Full Width</h2></label>
                <input type="radio" data-size="sml" id="responsive_type_full_width" data-node_val="slider/sliderType" name="responsive_group" value="full">
            </div>
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_green">Full Screen</h2></label>
                <input type="radio" data-size="sml" id="responsive_type_full_screen" data-node_val="slider/sliderType" name="responsive_group" value="fullscreen">
            </div>-->
        </div>
        <div class="hero_col_12"> 
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_grey">Slider width</h2></label>
                <input type="text" data-size="lrg" id="slider_width" data-hero_type="px" name="slider_width" data-node_val="slider/width">
                <input type="text" data-size="lrg" id="slider_width_100" data-hero_type="perc" name="slider_width_100" value="100">
            </div>
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_grey">Slider height</h2></label>
                <input type="text" data-size="lrg" id="slider_height" data-hero_type="px" name="slider_height" data-node_val="slider/height">
            </div>
        </div>
    </div>
    <div class="hero_section_holder">
    	<div class="hero_col_12"> 
        	<h2 class="hero_red size_18">
                Shortcode examples<br />
                <strong class="size_11 hero_grey">Select which shortcode you want to use.</strong>
            </h2>
        </div>
        <div class="hero_col_12"> 
        	<div class="hero_col_3"> 
                <label><h2 class="size_14 hero_grey">Standard shortcode</h2></label>
                <div class="shortcode_holder_standard">
                    <div class="short_inner" style="width:100%;">
                        <input class="hero_ctc" style="width:100%;" onclick="jQuery(this).select();" type="text" readonly style="width:90%;" id="the_short">
                    </div>
                </div>
            </div>
            <div class="hero_col_6"> 
                <label><h2 class="size_14 hero_grey">Do shortcode example</h2></label>
                <div class="shortcode_holder_standard">
                    <div class="short_inner" style="width:100%;">
                    	<input class="hero_ctc" style="width:100%;" onclick="jQuery(this).select();" type="text" readonly style="width:80%;" id="do_short">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hero_section_holder">
        <div class="hero_col_12">
            <div class="hero_col_9">
                <h2 class="hero_red size_18">
                    Autoplay Video<br />
                    <strong class="size_11 hero_grey">
                    	Autoplay the video when the slide is in position.
                    </strong>
                </h2>
            </div>
            <div class="hero_col_3">
                <input type="checkbox" data-size="lrg" id="setting_video_autoplay" name="setting_video_autoplay" value="true" data-node_val="slider/video/autoPlay">
            </div>
        </div>
        <!--<div class="hero_col_12">
            <div class="hero_col_9">
                <h2 class="hero_red size_18">
                    Video slide autopause<br />
                    <strong class="size_11 hero_grey">
                    	This will pause the slide while the video is playing.
                    </strong>
                </h2>
            </div>
            <div class="hero_col_3">
                <input type="checkbox" data-size="lrg" id="setting_video_autopause" name="setting_video_autopause" value="true" data-node_val="slider/video/autoPause">
            </div>
        </div>-->
    </div>
</div>
