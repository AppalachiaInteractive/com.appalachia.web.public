/**
* @preserve Sticky Anything 2.1.1 | @senff | GPL2 Licensed
*/

var canClick = false;

function activateStickThis() {
	for(var el in sticky_anything_engage.elements) {
		var conf = sticky_anything_engage.elements[el];
		jQuery(conf.element).stickThis({
            target: conf.element,
			top:conf.topspace,
			position:conf.position,
			minscreenwidth:conf.minscreenwidth,
			maxscreenwidth:conf.maxscreenwidth,
			screen_small: conf.screen_small,
			screen_medium: conf.screen_medium,
			screen_large: conf.screen_large,
			screen_extralarge: conf.screen_extralarge,
			zindex:conf.zindex,
			legacymode:sticky_anything_engage.legacymode,
			dynamicmode:sticky_anything_engage.dynamicmode,
			fade_in: conf.fade_in,
			slide_down: conf.slide_down,
			bottom_trigger: conf.bottom_trigger,
            opacity: conf.opacity,
            scroll_range_min: conf.scroll_range_min,
            scroll_range_max: conf.scroll_range_max,
			debugmode:sticky_anything_engage.debugmode == "1",
			pushup:conf.pushup,
            adminbar:conf.adminbar,
            bg_color:conf.bg_color,
            custom_css: conf.custom_css
		});
	}
}

function activateStickThisVisualPicker($) {
	jQuery.fn.extend({
		getPath: function () {
			var path,
				node = this,
				realNode,
				name,
				parent,
				index,
				sameTagSiblings,
				allSiblings,
				className,
				classSelector,
				nestingLevel = true;

			while (node.length && nestingLevel) {
				realNode = node[0];
				name = realNode.localName;

				if (!name) break;

				name = name.toLowerCase();
				parent = node.parent();
				sameTagSiblings = parent.children(name);

				if (realNode.id) {
					name += "#" + node[0].id;

					nestingLevel = false;

				} else if (realNode.className.length) {
                    className =  realNode.className.trim().split(' ');
					classSelector = '';

					className.forEach(function (item) {
						classSelector += '.' + item;
					});

					name += classSelector;

				} else if (sameTagSiblings.length > 1) {
					allSiblings = parent.children();
					index = allSiblings.index(realNode) + 1;

					if (index > 1) {
						name += ':nth-child(' + index + ')';
					}
				}

				path = name + (path ? '>' + path : '');
				node = parent;
			}

			return path;
		}
	});

	function handlerMouseEnter(ev) {
		var target = $(ev.target);

		var pathToSelect = target.getPath();

		$(pathToSelect).addClass("smoa-visual-picker-selected");
		$(pathToSelect).mouseout(handlerMouseLeave);
		$(pathToSelect).click(handlerClick);

		window.top.postMessage({
			messageType: 'smoa-iframe',
			pathToSelect: pathToSelect
		}, '*');
	}

	function handlerMouseLeave(ev) {
		$(ev.target).removeClass("smoa-visual-picker-selected");
	}

	function handlerClick(ev) {
		if (!canClick) {
			ev.preventDefault();

			window.top.postMessage({
				messageType: 'smoa-close-iframe'
			}, '*');
		}
	}

	$("body").mouseover(handlerMouseEnter);
}

(function($) {
	$(document).ready(function($) {
        activateStickThis();
        
		if (sticky_anything_engage.smoa_visual_picker) {
            activateStickThisVisualPicker($);
            
            var urlParams = new URLSearchParams(window.location.search);
            if(urlParams.has('smoa-can-click')){
                canClick = urlParams.get('smoa-can-click');
            }

            $('a').on('click', function(){
                var href = new URL($(this).attr('href'));
                href.searchParams.set('smoa-disable-admin-bar', true);
                href.searchParams.set('smoa-can-click', canClick);
                $(this).attr('href', href.toString());
            });
			window.onmessage = function(e){
				if (e.data.messageType == 'smoa-tick') {
                    canClick = e.data.canClick;
				}
			};
		}
	});
}(jQuery));
