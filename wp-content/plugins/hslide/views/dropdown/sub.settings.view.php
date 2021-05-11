<?php require_once '../../inc/url_set.php'; ?>
<script type="text/javascript" src="<?php echo htmlspecialchars(remove_http($_GET['vp'])); ?>js/sub.settings.view.js"></script>
<div class="hero_views">
	<!--<div class="hero_section_holder">
        <div class="hero_col_12">
            <div class="hero_col_9">
                <h2 class="hero_red size_18">
                    Touch enabled<br />
                    <strong class="size_11 hero_grey">
                    	Enable mobile touch friendly slider.
                    </strong>
                </h2>
            </div>
            <div class="hero_col_3">
                <input type="checkbox" data-size="lrg" id="setting_touch" name="setting_touch" value="true">
            </div>
        </div>
    </div>-->  
    <div class="hero_section_holder">
        <div class="hero_col_12">
            <div class="hero_col_9">
                <h2 class="hero_red size_18">
                    Video autoplay<br />
                    <strong class="size_11 hero_grey">
                    	Autoplay the video when the slide is in position.
                    </strong>
                </h2>
            </div>
            <div class="hero_col_3">
                <input type="checkbox" data-size="lrg" id="setting_video_autoplay" name="setting_video_autoplay" value="true" data-node_val="slider/video/autoPlay">
            </div>
        </div>
        <div class="hero_col_12">
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
        </div>
    </div>
</div>