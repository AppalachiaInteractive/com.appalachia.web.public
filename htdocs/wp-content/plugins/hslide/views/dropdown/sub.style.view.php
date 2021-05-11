<?php require_once '../../inc/url_set.php'; ?>
<script type="text/javascript" src="<?php echo htmlspecialchars(remove_http($_GET['vp'])); ?>js/sub.style.view.js"></script>

<div class="hero_views">
	<div class="hero_section_holder toggle_arrow">
    	<div class="hero_col_12"> 
        	<div class="hero_col_8">
                <h2 class="hero_red size_18">
                    Navigation Arrows<br />
                    <strong class="size_11 hero_grey">Style the navigation arrows for your slider.</strong>
                </h2>
            </div>
            <div class="hero_col_4">
                <input type="checkbox" data-size="lrg" id="arrow_status" data-toggle="toggle_arrow" data-node_val="slider/arrows/status" name="arrow_status" value="true">
            </div>
        </div>
        <div class="hero_col_12  hero_grey size_14"> 
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_grey">Arrow Type</h2></label>
                <select data-size="lrg" id="arrow_type" name="arrow_type" data-example-change="arrows" data-node_val="slider/arrows/type">
                    <option value="fold">Image slide out</option>
                    <option value="fullarrow" selected="selected">Flat image view</option>
                    <option value="sideslide">Image &amp; description</option>
                    <option value="circle">Rounded image</option>
                    <option value="rounded">Rounded description</option>
                    <option value="doubleflip">Fold out</option>
                    <option value="bend">Simple description</option>
                </select>
            </div>
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_grey">Primary color</h2></label>
                <input type="text" data-size="lrg" id="arrow_primary_color" name="arrow_primary_color" class="color_picker" data-node_val="slider/arrows/primaryColor">
            </div>
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_grey">Secondary color</h2></label>
                <input type="text" data-size="lrg" id="arrow_secondary_color" name="arrow_secondary_color" class="color_picker" data-node_val="slider/arrows/secondaryColor">
            </div>
        </div>
        <div class="hero_col_12">
        	<div class="hero_button_auto darkgrey_button rounded_3 custom_popup_open" id="show_arrow_examples" data-function="show_arrow_examples">View live arrow example</div>
        </div>
        <div class="hero_col_12">
        	<div class="hslider_image_placeholder example_arrows" data-image-type="example_view" data-example-type="arrows">
            	<!-- LOAD EXAMPLE IMAGE HERE -->
            </div>
        </div>
      	<div class="hero_col_12"> 
            <h2 class="hero_green size_14">
                Description styling<br />
                <strong class="size_11 hero_grey">Change the appearance of text descriptions on arrows (where applicable)</strong>
            </h2>
        </div>
        <div class="hero_col_12 hero_grey size_14"> 
        	<div class="hero_col_3">
            	<label><h2 class="size_14 hero_grey">Font family</h2></label>
                <select data-size="lrg" id="arrow_font_family" name="arrow_font_family" data-node_val="slider/arrows/descriptionFamily" class="load_fonts" data-height="100">
                    <option value="Verdana">Verdana</option>
                    <option value="Arial">Arial</option>
                </select>
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font weight</h2></label>
                <select data-size="lrg" id="arrow_font_weight" name="arrow_font_weight" data-node_val="slider/arrows/descriptionWeight">
                    <option value="bold">Bold</option>
                    <option value="lighter">Lighter</option>
                    <option value="inherit">Inherit</option>
                    <option value="normal">Normal</option>
                </select>
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font size</h2></label>
                <input type="text" data-size="lrg" class="hero_int_only" maxlength="2" id="arrow_font_size" name="arrow_font_size" data-node_val="slider/arrows/descriptionSize">
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font sizing</h2></label>
                <select data-size="lrg" id="arrow_font_sizing" name="arrow_font_sizing" data-node_val="slider/arrows/descriptionSizing">                    
                    <option value="px">px</option>
                    <option value="em">em</option>
                </select>
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font color</h2></label>
                <input type="text" data-size="lrg" id="arrow_secondary_color" name="arrow_secondary_color" class="color_picker" data-node_val="slider/arrows/descriptionColor">
            </div>
        </div>
        <div class="hero_col_12"> 
            <h2 class="hero_green size_14">
                Number/Count styling<br />
                <strong class="size_11 hero_grey">Set the styling for your side arrow number count.</strong>
            </h2>
        </div>
        <div class="hero_col_12 hero_grey size_14"> 
        	<div class="hero_col_3">
            	<label><h2 class="size_14 hero_grey">Font family</h2></label>
                <select data-size="lrg" id="arrow_count_family" name="arrow_count_family" data-node_val="slider/arrows/countFamily" class="load_fonts" data-height="100">
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font weight</h2></label>
                <select data-size="lrg" id="arrow_count_weight" name="arrow_count_weight" data-node_val="slider/arrows/countWeight">
                    <option value="bold">Bold</option>
                    <option value="lighter">Lighter</option>
                    <option value="inherit">Inherit</option>
                    <option value="normal">Normal</option>
                </select>
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font size</h2></label>
                <input type="text" data-size="lrg" class="hero_int_only" maxlength="2" id="arrow_count_size" name="arrow_count_size" data-node_val="slider/arrows/countSize">
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font sizing</h2></label>
                <select data-size="lrg" id="arrow_count_sizing" name="arrow_count_sizing" data-node_val="slider/arrows/countSizing">
                    <option value="em">em</option>
                    <option value="px">px</option>
                </select>
            </div>
            <div class="hero_col_2">
            	<label><h2 class="size_14 hero_grey">Font color</h2></label>
                <input type="text" data-size="lrg" id="arrow_count_color" name="arrow_count_color" class="color_picker" data-node_val="slider/arrows/countColor">
            </div>
        </div>
    </div>
    <div class="hero_section_holder toggle_pager">
    	<div class="hero_col_12"> 
        	<div class="hero_col_8">
                <h2 class="hero_red size_18">
                    Pager<br />
                    <strong class="size_11 hero_grey">Change the appearance of your pager on your slider.</strong>
                </h2>
            </div>
            <div class="hero_col_4">
                <input type="checkbox" data-size="lrg" id="pager_status" data-toggle="toggle_pager" data-node_val="slider/pager/status" name="pager_status" value="true">
            </div>
        </div>
        <div class="hero_col_12  hero_grey size_14"> 
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_grey">Position</h2></label>
                <select data-size="lrg" id="pager_position" data-height="70" name="pager_position" data-node_val="slider/pager/position">
                    <option value="bottom_center">Bottom Center</option>
                    <option value="bottom_left">Bottom Left</option>
                    <option value="bottom_right">Bottom Right</option>
                    <option value="top_center">Top Center</option>
                    <option value="top_left">Top Left</option>
                    <option value="top_right">Top Right</option>
                </select>
            </div>
            <div class="hero_col_3">
                <label><h2 class="size_14 hero_grey">Type</h2></label>
                <select data-size="lrg" id="pager_type" data-height="70" data-example-change="pager" name="pager_type" data-node_val="slider/pager/type">
                    <option value="scale_up">Scale up pager</option>
                    <option value="fill_up">Fill up pager</option>
                    <option value="inner_circle">Inner circle pager</option>
                </select>
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Primary color</h2></label>
                <input type="text" data-size="lrg" id="pager_primary_color" name="pager_primary_color" class="color_picker" data-node_val="slider/pager/primaryColor">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Secondary color</h2></label>
                <input type="text" data-size="lrg" id="pager_secondary_color" name="pager_secondary_color" class="color_picker" data-node_val="slider/pager/secondaryColor">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Transparency</h2></label>
                <select data-size="lrg" id="pager_transparency" data-height="70" name="pager_transparency" data-node_val="slider/pager/transparency">
                    <option value="0.0">0%</option>
                    <option value="0.1">10%</option>
                    <option value="0.2">20%</option>
                    <option value="0.3">30%</option>
                    <option value="0.4">40%</option>
                    <option value="0.5">50%</option>
                    <option value="0.6">60%</option>
                    <option value="0.7">70%</option>
                    <option value="0.8">80%</option>
                    <option value="0.9">90%</option>
                    <option value="1">100%</option>
                </select>
            </div>
        </div>
        <div class="hero_col_12">
        	<div class="hero_button_auto darkgrey_button rounded_3 custom_popup_open" id="show_pager_examples" data-function="show_pager_examples">View live pager example</div>
        </div>
        <div class="hero_col_12">
        	<div class="hslider_image_placeholder example_pager" data-image-type="example_view" data-example-type="pager">
            	<!-- LOAD EXAMPLE IMAGE HERE -->
            </div>
            <!--<a class="hero_green custom_popup_open" id="show_pager_examples" data-function="show_pager_examples">View live examples</a>-->
        </div>        
    </div>
    <div class="hero_section_holder toggle_timer">
    	<div class="hero_col_12"> 
        	<div class="hero_col_8">
                <h2 class="hero_red size_18">
                    Timer<br />
                    <strong class="size_11 hero_grey">Change the appearance of the timer.</strong>
                </h2>
            </div>
            <div class="hero_col_4">
                <input type="checkbox" data-size="lrg" id="timer_status" data-toggle="toggle_timer" data-node_val="slider/timer/autoPlay" name="timer_status" value="true">
            </div>
        </div>
        <div class="hero_col_12  hero_grey size_14"> 
            <!--<div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Position</h2></label>
                <select data-size="lrg" id="timer_position" data-height="70" name="timer_position" data-node_val="slider/timer/position">
                    <option value="bottom">Bottom</option>
                    <option value="top">Top</option>
                </select>
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Type</h2></label>
                <select data-size="lrg" id="timer_type" data-height="70" name="timer_type" data-node_val="slider/timer/type">
                    <option value="circle_load">Circle Load</option>
                </select>
            </div>-->
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Primary color</h2></label>
                <input type="text" data-size="lrg" id="timer_primary_color" name="timer_primary_color" class="color_picker" data-node_val="slider/timer/primaryColor">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Secondary color</h2></label>
                <input type="text" data-size="lrg" id="timer_secondary_color" name="timer_secondary_color" class="color_picker" data-node_val="slider/timer/secondaryColor">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Transparency</h2></label>
                <select data-size="lrg" id="timer_transparency" data-height="70" name="timer_transparency" data-node_val="slider/timer/transparency">
                    <option value="0.0">0%</option>
                    <option value="0.1">10%</option>
                    <option value="0.2">20%</option>
                    <option value="0.3">30%</option>
                    <option value="0.4">40%</option>
                    <option value="0.5">50%</option>
                    <option value="0.6">60%</option>
                    <option value="0.7">70%</option>
                    <option value="0.8">80%</option>
                    <option value="0.9">90%</option>
                    <option value="1">100%</option>
                </select>
            </div>
        </div> 
        <!--<div class="hero_col_12">
        	<div class="timer_example_display">
            	<div class="timer_example_inner">
                	
                </div>
            </div>
        </div>--> 
        <div class="hero_col_12">
            <div class="hero_col_8">
                <h2 class="hero_green size_14">
                    Pause on hover<br />
                    <strong class="size_11 hero_grey">
                    	Pause timer when mouse cursor is placed over the slider.
                    </strong>
                </h2>
            </div>
            <div class="hero_col_4">
                <input type="checkbox" data-size="sml" id="timer_stop_hover" name="timer_stop_hover" value="true" data-node_val="slider/timer/hoverStop">
            </div>
        </div>   
    </div>
    <div class="hero_section_holder toggle_border">
    	<div class="hero_col_12"> 
        	<div class="hero_col_8">
                <h2 class="hero_red size_18">
                    Border<br />
                    <strong class="size_11 hero_grey">Toggle and change appearance of your slider's border.</strong>
                </h2>
            </div>
            <div class="hero_col_4">
                <input type="checkbox" data-size="lrg" id="border_status" data-toggle="toggle_border" data-node_val="slider/border/status" name="border_status" value="true">
            </div>
        </div>
        <div class="hero_col_12  hero_grey size_14">             
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Type</h2></label>
                <select data-size="lrg" id="border_type" name="border_type" data-node_val="slider/border/borderType">
                    <option value="solid">Solid</option>
                    <option value="dotted">Dotted</option>
                    <option value="dashed">Dashed</option>
                </select>
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Size</h2></label>
                <input type="text" data-size="lrg" class="hero_int_only" id="border_size" name="border_size" data-node_val="slider/border/borderSize">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Border color</h2></label>
                <input type="text" data-size="lrg" id="border_color" name="border_color" class="color_picker" data-node_val="slider/border/borderColor">
            </div> 
        </div> 
        <div class="hero_col_12"> 
        	<div class="hero_col_8">
                <h2 class="hero_green size_14">
                    Rounded corners<br />
                    <strong class="size_11 hero_grey">Adjust the roundness of corners on your slider's border.</strong>
                </h2>
            </div>
            <div class="hero_col_4">
            	<input type="checkbox" data-size="sml" id="radius_status" data-node_val="slider/border/borderRadius" name="radius_status" value="true">
            </div>
        </div>
        <div class="hero_col_12  hero_grey size_14">
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Top left</h2></label>
                <input type="text" data-size="lrg" class="hero_int_only" id="border_top_left" name="border_size" data-node_val="slider/border/borderRadiusTopLeft">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Top right</h2></label>
                <input type="text" data-size="lrg" class="hero_int_only" id="border_top_right" name="border_size" data-node_val="slider/border/borderRadiusTopRight">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Bottom left</h2></label>
                <input type="text" data-size="lrg" class="hero_int_only" id="border_bottom_right" name="border_size" data-node_val="slider/border/borderRadiusBottomLeft">
            </div>
            <div class="hero_col_2">
                <label><h2 class="size_14 hero_grey">Bottom right</h2></label>
                <input type="text" data-size="lrg" class="hero_int_only" id="border_bottom_right" name="border_size" data-node_val="slider/border/borderRadiusBottomRight">
            </div>
        </div>    
    </div>
</div>