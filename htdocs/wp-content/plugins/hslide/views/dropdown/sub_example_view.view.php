<?php require_once '../../inc/url_set.php'; ?>
<script type="text/javascript" src="<?php echo htmlspecialchars(remove_http($_GET['vp'])); ?>js/sub_example_view.view.js"></script>
<div class="hero_views">
    <div class="hero_col_12">
        <h1 class="hero_red size_18">
            Example<br />
            <strong class="size_11 hero_grey">Example copy</strong>
        </h1>
        <div class="hero_section_holder hero_green size_14">       
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="colour_val">
                        <h2 class="size_14 hero_green">Colour Picker</h2>
                        <p class="size_12 hero_grey">A canvas based colour selection input</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="text" id="colour_val" data-node_val="test_data/colour_picker" class="color_picker" name="colour_val" value="">
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="txt_name4">
                        <h2 class="size_14 hero_green">Text Input</h2>
                        <p class="size_12 hero_grey">Size: small</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="text" data-size="sml" id="txt_name4" name="txt_name4" data-node_val="test_data/text_input">
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="txt_name5">
                        <h2 class="size_14 hero_green">Text Input (pixels)</h2>
                        <p class="size_12 hero_grey">Size: small</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="text" data-size="sml" id="txt_name5" name="txt_name4" data-hero_type="px" data-node_val="test_data/text_input_px">
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="txt_name6">
                        <h2 class="size_14 hero_green">Text Input (milliseconds)</h2>
                        <p class="size_12 hero_grey">Size: small</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="text" data-size="sml" id="txt_name6" name="txt_name4" data-hero_type="ms" data-node_val="test_data/text_input_ms">
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="txt_name7">
                        <h2 class="size_14 hero_green">Text Input (percentage)</h2>
                        <p class="size_12 hero_grey">Size: small</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="text" data-size="sml" id="txt_name7" name="txt_name4" data-hero_type="perc" data-node_val="test_data/text_input_perc">
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="text_area">
                        <h2 class="size_14 hero_green">Textarea</h2>
                        <p class="size_12 hero_grey">Size: large</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <textarea data-size="lrg" id="text_area" name="text_area" data-node_val="test_data/text_area"></textarea>
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="radio_field_grouped1">
                        <h2 class="size_14 hero_green">Radio Button (grouped)</h2>
                        <p class="size_12 hero_grey">Size: large</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="radio" data-size="lrg" id="radio_field_grouped1" name="radio_field_group" value="radio_1" data-node_val="test_data/radio_button" checked>
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="radio_field_grouped2">
                        <h2 class="size_14 hero_green">Radio Button (grouped)</h2>
                        <p class="size_12 hero_grey">Size: large</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="radio" data-size="lrg" id="radio_field_grouped2" name="radio_field_group" value="radio_2" data-node_val="test_data/radio_button">
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="check_field1">
                        <h2 class="size_14 hero_green">Checkbox</h2>
                        <p class="size_12 hero_grey">Size: large</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <input type="checkbox" data-size="lrg" id="check_field1" name="check_field1" value="check_1" data-node_val="test_data/check_box">
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="my_select_box">
                        <h2 class="size_14 hero_green">Select Box (with error)</h2>
                        <p class="size_12 hero_grey">Size: large</p>
                    </label>
                </div>
                <div class="hero_col_6">
                    <select data-size="lrg" id="my_select_box" name="my_select_box" data-height="60" data-node_val="test_data/select_box">
                        <option value="value_1" selected="selected">Value One</option>
                        <option value="value_2">Value Two</option>
                        <option value="value_3">Value Three</option>
                        <option value="value_4">Value Four</option>
                        <option value="value_5">Value Five</option>
                    </select>
                </div>
            </div>
            <div class="hero_col_12">
                <div class="hero_col_6">
                    <label for="media">
                        <h2 class="size_14 hero_green">Media Selector</h2>
                        <p class="size_12 hero_grey">Size: large</p>
                    </label>
                </div>
           		<div class="hero_col_6">
                    <div class="hero_col_4">
                        <div class="hero_button_auto green_button rounded_3 hero_media_uploader" data-connect-with="media_url" data-multiple="false">Add Image</div>
                    </div>
                    <div class="hero_col_8">
                        <input type="text" data-size="lrg" data-hero_type="img" id="media_url" name="media_url" data-node_val="test_data/media" value="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>