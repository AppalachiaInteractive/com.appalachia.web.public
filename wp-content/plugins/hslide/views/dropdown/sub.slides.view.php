<?php require_once '../../inc/url_set.php'; ?>
<script type="text/javascript" src="<?php echo htmlspecialchars(remove_http($_GET['vp'])); ?>js/sub.slides.view.js"></script>
<div class="hslider_slide_main">                
    <div class="hslider_slide_holder"><!-- ELEMENTS HERE --></div>                
</div>
<!-- WOO SIDEBAR: START -->
    <div class="hero_custom_sidebar">
        <div class="hero_custom_sidebar_heading">
            WooCommerce Products
            <div class="hero_custom_sidebar_close"></div>
        </div>
        <div class="hero_custom_sidebar_options">
            <select data-size="lrg" id="hslider_woo_selector" name="hslider_woo_selector" data-example-change="arrows">
                <option value="all">View All</option>
            </select>
            <div class="hero_custom_sidebar_pager">
            	<div class="sidebar_pager_holder">
                	<div class="sidebar_pager_left side_pager_arrow"></div>
                    <div class="sidebar_hide_pager">
                        <ul class="hslide_prod_pager">
                            <li>1</li>
                        </ul>
                    </div>
                    <div class="sidebar_pager_right side_pager_arrow"></div>
                </div>
                <div class="hero_custom_sidebar_pager_position">
                	Products found: <span class="hero_red"><span class="woo_viewing">30</span>/<span class="woo_total">132</span></span>
                </div>
            </div>
            <div class="hero_custom_sidebar_products">
                <!-- LOAD PRODUCTS HERE -->
            </div>
        </div>
    </div>
<!-- WOO SIDEBAR: END -->
<div class="hero_views">
	<div class="hero_section_holder">
        <div class="hero_col_12">
        	<div class="hero_col_12 hslider_slide_transettings" style="padding-right:0 !important;">
               
                <label><h2 class="size_14 hero_grey">Transition</h2></label>  
                <select data-size="sml" id="transition" name="transition" data-example-change="arrows">
                    <option value="slide">Slide</option>
                    <option value="lax">Parralax</option>
                    <option value="split">Split</option>
                    <option value="fade">Fade</option>
                    <option value="zoom">Zoom</option>
                </select>              
           
                <label><h2 class="size_14 hero_grey">Idle time</h2></label>           
                <select data-size="sml" data-height="100" id="arrow_idle" name="arrow_idle" data-example-change="arrows">
					<option value="1">1 sec</option>
					<option value="2">2 sec</option>
					<option value="3">3 sec</option>
					<option value="4">4 sec</option>
					<option value="5">5 sec</option>
					<option value="6">6 sec</option>
					<option value="7">7 sec</option>
					<option value="8">8 sec</option>
					<option value="9">9 sec</option>
                    <option value="10">10 sec</option>
					<option value="15">15 sec</option>
                    <option value="20">20 sec</option>
                    <option value="30">30 sec</option>
                    <option value="40">40 sec</option>
                    <option value="50">50 sec</option>
                    <option value="60">60 sec</option>
                    <option value="70">70 sec</option>
                    <option value="80">80 sec</option>
                    <option value="90">90 sec</option>
                </select>
                
                <div style="float:left; display:table; padding-top:7px; margin-right:20px; position:relative">
                    <label data-tooltip="Move elements when you mouseover the slide." style="padding-top:0 !important;"><h2 class="size_14 hero_grey">Mouse move elements</h2></label>          
                    <input type="checkbox" data-size="sml" id="move_elements_active" name="move_elements_active" value="1">
                </div>
                
                <div style="float:left; display:table; padding-top:7px; position:relative">
                    <label data-tooltip="Enable or disable slide" style="padding-top:0 !important;"><h2 class="size_14 hero_grey">Slide </h2></label>
                	<input type="checkbox" data-size="sml" id="slide_active" name="slide_active" value="1">
                </div>
                
                <div class="slide_delete_btn" data-tooltip="Delete current slide"></div>
                
            </div>
                      
        </div>
    </div>
    <div class="hslider_sandbox">
    	<div class="hslider_ux_holder">
        	<div class="hslider_ux_tools">
            	<div class="hslider_ux_items data_popup_launch slide_icon_text" data-load="text" data-action="insert" data-title="Text Element">
                	Text
                </div>
                <div class="hslider_ux_items data_popup_launch slide_icon_element" data-load="element" data-action="insert" data-title="Element">
                	Image (PNG, JPEG, GIF)
                </div>
                <div class="hslider_ux_items data_popup_launch slide_icon_post" data-load="post" data-action="insert" data-title="Posts">
                	Post
                </div>
                <div class="hslider_ux_items data_popup_launch slide_icon_video" data-load="video" data-action="insert" data-title="Video">
                	Video
                </div>
                <div class="hslider_ux_items data_popup_launch slide_icon_button" data-load="button" data-action="insert" data-title="Button Element">
                	Button
                </div>
                <div class="hslider_ux_items data_popup_launch slide_icon_woo" data-load="woo" data-action="insert" data-title="WooCommerce">
                	WooCommerce
                </div>
                <div class="hslider_ux_items slide_icon_bg hero_media_uploader" data-connect-with="background_image" data-size="full" data-load="bg" data-action="insert" data-title="Background Image">
                	Background
                </div>
            </div>
            <div class="hslider_ux_grid" data-grid-toggle="off">
            	<div class="hslider_ux_items">
                	Grid On
                </div>
            </div>
        </div>
        <div class="hslider_build_options">
        	<div class="hslider_zoom_holder">
            	<div class="hslider_zoom_drag"></div>
                <div class="hslider_zoom_line"></div>
                <div class="hslider_line_perc">10%</div>
            </div>
        </div>
        <div class="slide_holder_adjust"></div>
    </div>
    <div class="hero_section_holder">
        <div class="hero_col_12">
            <div class="hero_col_8">
                <h2 class="hero_red size_18">
                    Element Animation Controls<br />
                    <strong class="size_11 hero_grey">Manage the animation of all the elements on your slide.</strong>
                </h2>
            </div>
        </div>        
        <div class="hero_list_holder hero_grey size_11">
            <div class="element_list_heading hero_white">
                <span>Elements</span>
            </div>
            <div id="element_list_holder">
            	<!-- LOAD ELEMENTS HERE INTO LIST -->
            </div>
        </div>
    </div>
    <div class="hero_section_holder">
        <div class="hero_col_12">
            <h2 class="hero_red size_18">
                Slide Background<br />
                <strong class="size_11 hero_grey">Add an image or video to your slide's background.</strong>
            </h2>
        </div>
        <div class="hero_col_12">
            <div class="hero_col_2">
            	<div style="width:80%" class="hero_button_auto green_button rounded_3 toggle_bg_type" data-type="image">Image</div>
            </div>
            <div class="hero_col_2">
            	<div style="width:80%" class="hero_button_auto green_button rounded_3 toggle_bg_type" data-type="video">Video</div>
            </div>
        </div>
    </div>
    <div class="hero_section_holder slide_bg_settings" id="image">
    	<div class="hero_col_12">
            <h2 class="hero_green size_14">
                Background Preview:<br />
                <strong class="size_11 hero_grey">This is an exact preview of what your background will look like. This example is scaled down to give you a sense of background position.</strong>
            </h2>
        </div>
        <div class="hero_col_12" style="display:block;">
        	<div class="hslider_bg_preview"></div>
        </div>
        <div class="hero_col_12">
            <h2 class="hero_green size_14">
                Background Image Settings:<br />
                <strong class="size_11 hero_grey">Manage the positioning of your background image.</strong>
            </h2>
        </div>
        <div class="hero_col_12">
            <div class="hero_col_3">
            	<label><h2 class="size_14 hero_grey">Background position</h2></label>
                <select data-size="lrg" id="background_position" name="background_position">
                    <option value="center">center</option>
                    <option value="left">left</option>
                    <option value="right">right</option>
                    <option value="top">top</option>
                    <option value="bottom">bottom</option>
                </select>
            </div>
            <div class="hero_col_3">
            	<label><h2 class="size_14 hero_grey">Background repeat</h2></label>
                <select data-size="lrg" id="background_repeat" name="background_repeat">
                    <option value="no-repeat">no-repeat</option>
                    <option value="repeat">repeat</option>
                    <option value="repeat-x">repeat-x</option>
                    <option value="repeat-y">repeat-y</option>
                </select>
            </div>
            <div class="hero_col_3">
            	<label><h2 class="size_14 hero_grey">Background size</h2></label>
                <select data-size="lrg" id="background_size" name="background_size">
                    <option value="cover">cover</option>
                    <option value="contain">contain</option>
                    <option value="auto">auto</option>
                </select>
            </div>
            <div class="hero_col_3">
            	<label><h2 class="size_14 hero_grey">Background color</h2></label>
                <input type="text" data-size="lrg" id="slide_bg_color" name="slide_bg_color" class="color_picker" value="#DC4551">
            </div>
        </div>
        <div class="hero_col_12">
            <label><h2 class="size_14 hero_grey">Background source:</h2></label>
            <div class="hero_col_11">
            	<input type="text" data-size="lrg" id="background_image" name="background_image" placeholder="background source...">
            </div>
            <div class="hero_col_1">
            	<div class="hero_button_auto green_button rounded_3 hero_media_uploader" data-connect-with="background_image" data-multiple="false" data-size="full">Add</div>
            </div>
        </div>
        <div class="hero_col_12">
            <div class="hero_col_8">
                <h2 class="hero_red size_18">
                    Background Animation<br />
                    <strong class="size_11 hero_grey">This will determine the animation for your slide.</strong>
                </h2>
            </div>
        </div>
        <div class="hero_col_12">
        	<div class="hero_col_2">
                <label><h2 class="size_14 hero_green">Static</h2></label>
                <input type="radio" data-size="sml" id="slide_bg_animation_static" name="slide_bg_animation" value="static" checked>
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_green">Parallax</h2></label>
                <input type="radio" data-size="sml" id="slide_bg_animation_para" name="slide_bg_animation" value="para">
            </div>
            <div class="hero_col_4">
                <label><h2 class="size_14 hero_green">Ken Burns Effect</h2></label>
                <input type="radio" data-size="sml" id="slide_bg_animation_zoom" name="slide_bg_animation" value="zoom"><br>
                <p class="size_12 hero_green"></p>
            </div>
            <div class="hero_col_11 effect_burns">
                <div class="hero_col_4">
                    <label><h2 class="size_14 hero_grey">Ken burns transition direction</h2></label>
                    <select data-size="lrg" id="burns_direction" name="burns_direction">
                        <option value="left top">Left Top</option>
                        <option value="right top">Right Top</option>
                        <option value="left bottom">Left Bottom</option>
                        <option value="right bottom">Right Bottom</option>
                        <option value="center">Center</option>
                    </select>
                </div>
                <div class="hero_col_4">
                    <label><h2 class="size_14 hero_grey">Zoom distance</h2></label>
                    <select data-height="100" data-size="lrg" id="burns_distance" name="burns_distance">                        
                        <option value="0.1">-90%</option>
                        <option value="0.2">-80%</option>
                        <option value="0.3">-70%</option>
                        <option value="0.4">-60%</option>
                        <option value="0.5">-50%</option>
                        <option value="0.6">-40%</option>
                        <option value="0.7">-30%</option>
                        <option value="0.8">-20%</option>
                        <option value="0.9">-10%</option>
                        <option value="1.1">+10%</option>
                        <option value="1.2">+20%</option>
                        <option value="1.3">+30%</option>
                        <option value="1.4">+40%</option>
                        <option value="1.5">+50%</option>
                        <option value="1.6">+60%</option>
                        <option value="1.7">+70%</option>
                        <option value="1.8">+80%</option>
                        <option value="1.9">+90%</option>
                    </select>
                </div>
            </div>
            <!--<div class="hero_col_11 effect_para">
                <div class="hero_col_4">
                    <label><h2 class="size_14 hero_grey">Paralax direction</h2></label>
                    <select data-size="lrg" id="para_direction" name="para_direction">
                        <option value="top_down">Top Down</option>
                        <option value="down_top">Down Top</option>
                    </select>
                </div>
            </div>-->
        </div>
    </div>
    <div class="hero_section_holder slide_video_settings" id="video">       
        <div class="hero_col_12">
            <h2 class="hero_green size_14">
                Video Source:<br />
                <strong class="size_11 hero_grey">Source URL for the video formats required for a video background.</strong>
            </h2>
        </div>
        <div class="hero_col_12">
            <label><h2 class="size_14 hero_grey">MP4 source:</h2></label>
            <div class="hero_col_11">
            	<input type="text" data-size="lrg" id="video_mp4" name="video_mp4" placeholder=".mp4 file format source...">
            </div>
            <div class="hero_col_1">
            	<div class="hero_button_auto green_button rounded_3 hero_media_uploader" data-connect-with="video_mp4" data-multiple="false" data-size="full">Find</div>
            </div>
        </div>
        <div class="hero_col_12">
            <label><h2 class="size_14 hero_grey">OGG source:</h2></label>
            <div class="hero_col_11">
            	<input type="text" data-size="lrg" id="video_ogg" name="video_ogg" placeholder=".ogg file format source...">
            </div>
            <div class="hero_col_1">
            	<div class="hero_button_auto green_button rounded_3 hero_media_uploader" data-connect-with="video_ogg" data-multiple="false" data-size="full">Find</div>
            </div>
        </div>
        <div class="hero_col_12">
        	<label><h2 class="size_14 hero_grey">WEBM source:</h2></label>
        	<div class="hero_col_11">
                <input type="text" data-size="lrg" id="video_webm" name="video_webm" placeholder=".webm file format source...">
            </div>
            <div class="hero_col_1">
            	<div class="hero_button_auto green_button rounded_3 hero_media_uploader" data-connect-with="video_webm" data-multiple="false" data-size="full">Find</div>
            </div>
        </div>
        <div class="hero_col_12">
            <h2 class="hero_green size_14">
                Video default background image:<br />
                <strong class="size_11 hero_grey">Define a default image that appears if your video fails to load.</strong>
            </h2>
        </div>
        <div class="hero_col_12">
            <label><h2 class="size_14 hero_grey">Image source:</h2></label>
            <input type="text" data-size="lrg" id="video_default_image" name="video_default_image" placeholder="">
        </div>
        <div class="hero_col_12">
            <div class="hero_button_auto green_button rounded_3 hero_media_uploader" data-connect-with="video_default_image" data-multiple="false" data-size="full">Upload default image</div>
        </div>
    </div>
    <div class="hero_section_holder">
        <div class="hero_col_12">
            <div class="hero_col_8">
                <h2 class="hero_red size_18">
                    Slide Description<br />
                    <strong class="size_11 hero_grey">This is the description that appears on your navigation arrows (where applicable).</strong>
                </h2>
            </div>
        </div>
        <div class="hero_col_12">
            <input type="text" data-size="lrg" id="slide_description" name="slide_description" placeholder="Slide desription goes here...">
        </div>
    </div>
</div>