(function ($, window, document, undefined) {
    "use strict";
  
    var pluginName = "stickThis",
      defaults = {
        target:null,
        top: null,
        position: "top",
        minscreenwidth: null,
        maxscreenwidth: null,
        screen_small: true,
        screen_medium: true,
        screen_large: true,
        screen_extralarge: true,
        zindex: 1,
        bottom_trigger: "0",
        legacymode: false,
        dynamicmode: false,
        debugmode: false,
        pushup: "",
        adminbar: false,
        opacity: 100,
        scroll_range_min: 0,
        scroll_range_max: 100,
        fade_in: false,
        slide_down: false,
        bg_color: false,
        custom_css: false
      };
  
    var $activeEl = null;
    var bottomTrigger = 0;
  
    function Plugin(element, options) {
      this.element = element;
      this.settings = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;
      this.init();
    }
  
    $.extend(Plugin.prototype, {
      init: function () {
        $activeEl = $(this.element);
        var numElements = $(this.element).length;
        var numPushElements = $(this.settings.pushup).length;
        if (numPushElements < 1) {
          // There are no elements on the page with the called selector for the Push-up Element.
          if (this.settings.debugmode == true && this.settings.pushup) {
            console.error('STICKY ANYTHING DEBUG: There are no elements with the selector/class/ID you selected for the Push-up element ("' + this.settings.pushup + '").');
          }
          this.settings.pushup = "";
        } else if (numPushElements > 1) {
          // You can't use more than one element to push up the sticky element.
          // Make sure that you use a selector that applies to only ONE SINGLE element on the page.
          // Want to find out quickly where all the elements are that you targeted? Uncomment the next line to debug.
          // $(settings.pushup).css('border','solid 3px #ff0000');
          if (this.settings.debugmode == true) {
            console.error("STICKY ANYTHING DEBUG: There are " + numPushElements + ' elements on the page with the selector/class/ID you selected for the push-up element ("' + this.settings.pushup + '"). You can select only ONE element to push the sticky element up.');
          }
          // Resetting it to NOTHING.
          this.settings.pushup = "";
        }
  
        if (numElements < 1) {
          // There are no elements on the page with the called selector.
          if (this.settings.debugmode == true) {
            console.error('STICKY ANYTHING DEBUG: There are no elements with the selector/class/ID you selected for the sticky element ("' + this.selector + '").');
          }
        } else if (numElements > 1) {
          // This is not going to work either. You can't make more than one element sticky. They will only get in eachother's way.
          // Make sure that you use a selector that applies to only ONE SINGLE element on the page.
          // Want to find out quickly where all the elements are that you targeted? Uncomment the next line to debug.
          // $(this).css('border','solid 3px #00ff00');
          if (this.settings.debugmode == true) {
            console.error("STICKY ANYTHING DEBUG: There There are " + numPushElements + ' elements with the selector/class/ID you selected for the sticky element ("' + this.selector + '"). You can only make ONE element sticky.');
          }
        }
  
        if (this.settings.top == null) {
          this.settings.top = 0;
        } else {
          if (isNaN(parseInt(this.settings.top))) {
            this.settings.top = $(this.settings.top).height();
          } else {
            this.settings.top = parseInt(this.settings.top);
          }
        }
  
        /**
         * Modern way
         */
        $(this.element).addClass("sticky-element-original element-is-not-sticky sticky-element-active");
        var orgAssignedStyles = this.cssStyles(); // All original element styles, assigned by CSS.
        var orgInlineStyles = $(this.element).attr("style");
        if (orgInlineStyles == null) {
          orgInlineStyles = "";
        }
        this.createPlaceholder($(this.element));
  
        if (this.settings.position == "bottom") {
          if (this.settings.bottom_trigger.indexOf("%") > 0) {
            var percentage = parseInt(this.settings.bottom_trigger.substr(0, this.settings.bottom_trigger.indexOf("%")));
            bottomTrigger = $("body").height() * (percentage / 100);
          } else {
            bottomTrigger = parseInt(this.settings.bottom_trigger);
          }
        }
  
        var _debounceScroll = 0;
        var instance = this;
        $(window).scroll(function () {
          clearTimeout(_debounceScroll);
          _debounceScroll = setTimeout(function () {
            instance.check(instance.settings, orgInlineStyles);
          }, 10);
        });
  
        var _debounceResize = 0;
        $(window).resize(function () {
          clearTimeout(_debounceResize);
          _debounceResize = setTimeout(function () {
            instance.unstickIt(orgInlineStyles);
            instance.check(instance.settings, orgInlineStyles, orgAssignedStyles);
          }, 50);
        });
  
        this.check(this.settings, orgInlineStyles, orgAssignedStyles);
      },
      cssStyles: function () {
        var o = {};
        var el = $(this.element);
  
        o["display"] = el.css("display");
        o["float"] = el.css("float");
        o["flex"] = el.css("flex");
        o["box-sizing"] = el.css("box-sizing");
        o["clear"] = el.css("clear");
        o["overflow"] = el.css("overflow");
        o["transform"] = el.css("transform");
  
        return o;
      },
      createPlaceholder: function ($originalelement) {
        var $placeholder = $('<div class="sticky-element-placeholder" style="width:0; height:0;margin:0; padding:0; visibility:hidden;"></div>');
        $(this.element).before($placeholder).data("placeholder", $placeholder);
      },
      createClone: function (cloneTop, cloneZindex) {
        var $clone = $(this.element).clone();
        $(this.element).data("clone", $clone);
        $clone
          .insertAfter(this.element)
          .addClass("sticky-element-cloned")
          .removeClass("element-is-not-sticky")
          .addClass("element-is-sticky")
          .css("position", "fixed")
          .css("top", cloneTop + "px")
          .css("margin-left", "0")
          .css("z-index", cloneZindex)
          .removeClass("sticky-element-original")
          .hide();
      },
      check: function (settings, originalInlineStyles, originalAssignedStyles) {
        // Calculating actual viewport width
        var e = window,
          a = "inner";
        if (!("innerWidth" in window)) {
          a = "client";
          e = document.documentElement || document.body;
        }
        var viewport = e[a + "Width"];
        var viewporth = e[a + "Height"];
  
        var usingCsutomScreenSize = settings.minscreenwidth != null && settings.maxscreenwidth != null;
        if (usingCsutomScreenSize && (viewport < settings.minscreenwidth || viewport > settings.maxscreenwidth)) return;
  
        if (!usingCsutomScreenSize) {
          if (viewport < 768 && !settings.screen_small) return;
  
          if (viewport >= 768 && viewport < 992 && !settings.screen_medium) return;
  
          if (viewport >= 992 && viewport < 1200 && !settings.screen_large) return;
  
          if (viewport > 1200 && !settings.screen_extralarge) return;
        }
  
        var $listenerElement = $(this.element).hasClass("sticky-element-active") ? $(this.element) : $(this.element).data("placeholder");
  
        var orgElementPos = $listenerElement.offset();
        var orgElementTop = orgElementPos.top;
  
        var pushElementTop = 0;
        if (settings.pushup) {
          var pushElementPos = $(settings.pushup).offset();
          pushElementTop = pushElementPos.top;
        }
  
        var adminBarHeight = 0;
        if (settings.adminbar && $("body").hasClass("admin-bar") && viewport > 600) {
          // below 600, the adminbar is not fixed
          adminBarHeight = $("#wpadminbar").height();
        }
  
        var elementHeight = $(this.element).outerHeight();
        var amountToScroll = orgElementTop - settings.top - adminBarHeight;
        if (settings.fade_in || settings.slide_down) {
          amountToScroll += elementHeight;
        }
  
        var conditionIfTop = $(window).scrollTop() > amountToScroll;
        var conditionIfBottom = $(window).scrollTop() > bottomTrigger;
  
        var scroll_percent = ($(window).scrollTop() / viewporth) * 100;
  
        if ((settings.scroll_range_min > 0 && scroll_percent < settings.scroll_range_min) || (settings.scroll_range_max < 100 && scroll_percent > settings.scroll_range_max)) {
          conditionIfTop = false;
          conditionIfBottom = false;
        }
  
        var elementHeight = $(this.element).outerHeight();  
        if ($(this.element).data("isAnimating")) {
          return;
        }
  
        var isPushedUp = false;
        if ((settings.position == "top" && conditionIfTop) || (settings.position == "bottom" && conditionIfBottom)) {
          var isAlreadySticky = $(this.element).hasClass("element-is-sticky");
          
          if (settings.pushup && $(window).scrollTop() > pushElementTop - settings.top - elementHeight - adminBarHeight) {
            this.unstickIt(originalInlineStyles);
            var $listenerElement = $(this.element).hasClass("sticky-element-active") ? $(this.element) : $(this.element).data("placeholder");
            this.stickIt(settings, $listenerElement, originalAssignedStyles, adminBarHeight, pushElementTop, elementHeight, originalInlineStyles);
            isPushedUp = true;
          } else {
            if (!isAlreadySticky){
                
                this.stickIt(settings, $listenerElement, originalAssignedStyles, adminBarHeight, pushElementTop, elementHeight, originalInlineStyles);
            }
          }
  
          if (!isAlreadySticky && !isPushedUp) {
            this.stickIt(settings, $listenerElement, originalAssignedStyles, adminBarHeight, pushElementTop, elementHeight, originalInlineStyles);
          }
        } else {
          // not scrolled past the menu; only show the original element.
          this.unstickIt(originalInlineStyles);
          $(this.element).data("sticky", false);
        }
      },
      stickIt: function (settings, $listenerElement, originalAssignedStyles, adminBarHeight, pushElementTop, elementHeight, originalInlineStyles) {
        if ($(this.element).data("isAnimating")) {
          return;
        }
        // We've scrolled PAST the original position; this is where we need to make the element sticky.
  
        // Placeholder element should always have same left position as original element (see comment below).
        // The sticky element will NOT have a TOP or the LEFT margin. This is because the left/top reference point of the original
        // element does not consider the margin. So, we're checking the left/top point of the actual original element and then
        // use that position for the sticky element.
  
        // LEFT POSITION
        var coordsOrgElement = $listenerElement.offset();
        var leftOrgElement = coordsOrgElement.left; // This is the position REGARDLESS of the margin.
  
        // WIDTH/HEIGHT
        // The placeholder needs to have the width and height of the original element, WITHOUT the margins but WITH the padding and borders
        // Whatever margins the original has, the placeholder needs to have that too.
  
        var widthPlaceholder = $listenerElement[0].getBoundingClientRect().width;
        if (!widthPlaceholder) {
          widthPlaceholder = $listenerElement.css("width"); // FALLBACK for subpixels
        }
        widthPlaceholder = (widthPlaceholder + "").replace(/px/, "");
  
        var heightPlaceholder = $listenerElement[0].getBoundingClientRect().height;
        if (!heightPlaceholder) {
          heightPlaceholder = $listenerElement.css("height"); // FALLBACK for subpixels
        }
        heightPlaceholder = (heightPlaceholder + "").replace(/px/, "");
  
        // WIDTH/HEIGHT OF STICKY ELEMENT
        // The original element though, needs to have the inner width and height of the original (non-sticky) element
        // No padding, no borders, because that will be applied later anyway, regardless of box-sizing
        var widthSticky = $(this.element).css("width");
        if (widthSticky == "0px") {
          widthSticky = this.element.getBoundingClientRect().width;
        }
        var heightSticky = $(this.element).height();
  
        // PADDING
        // If padding is percentages, convert to pixels when it becomes sticky
        // Just a leftover from the old method. We will not use padding for the placeholder
        var paddingOrgElement = [$(this.element).css("padding-top"), $(this.element).css("padding-right"), $(this.element).css("padding-bottom"), $(this.element).css("padding-left")];
        var paddingSticky = paddingOrgElement.join(" ");
  
        // MARGIN
        var marginOrgElement = [$listenerElement.css("margin-top"), $listenerElement.css("margin-right"), $listenerElement.css("margin-bottom"), $listenerElement.css("margin-left")];
        var marginPlaceholder = marginOrgElement.join(" ");
  
        // OTHER ELEMENTS
        // if original has float, display, etc., we need to assign that to the placeholder
        // Though not as important as the width/height/margin/padding
  
        var assignedStyles = "";
        for (var importantStyle in originalAssignedStyles) {
          if (originalAssignedStyles[importantStyle] == "inline") {
            assignedStyles += importantStyle + ":inline-block; ";
          } else {
            assignedStyles += importantStyle + ":" + originalAssignedStyles[importantStyle] + "; ";
          }
        }
  
        // If scrolled position = pushup-element (top coordinate) - space between top and element - element height - admin bar
        // In other words, if the pushup element hits the bottom of the sticky element
  
        if (settings.pushup && $(window).scrollTop() > pushElementTop - settings.top - elementHeight - adminBarHeight) {
          settings.topMargin = pushElementTop - settings.top - elementHeight - $(window).scrollTop();
        } else {
          settings.topMargin = adminBarHeight;
        }

        assignedStyles += "height:" + heightPlaceholder + "px; margin:" + marginPlaceholder + ";";
        $(this.element)
          .removeClass("sticky-element-active")
          .removeClass("element-is-not-sticky")
          .addClass("element-is-sticky")
          .css("cssText", originalInlineStyles + "margin-top: " + settings.topMargin + "px !important; margin-left: 0 !important;" ) //
          .css("position", "fixed")
          .css("left", leftOrgElement + "px")
          .css("width", widthSticky)
          .css("padding", paddingSticky)
          .css("z-index", settings.zindex)
          .css(settings.position, settings.top - elementHeight)
          .css("opacity", 0);

        if(settings.bg_color && settings.bg_color.length>2){
            $(this.element).css("background-color", settings.bg_color);
        }

        if($(this.element).attr("style").indexOf('/**/') == -1){
            $(this.element).attr("style", $(this.element).attr("style") + '/**/' + settings.custom_css);
        }
  
        var isAlreadySticky = $(this.element).data("sticky");
        var durationFadeIn = settings.fade_in && !isAlreadySticky ? 500 : 0;
        var durationSlide = settings.slide_down && !isAlreadySticky ? 500 : 0;
  
        if (durationFadeIn == 500 || durationSlide == 500) {
          $(this.element).data("isAnimating", true);
          var $el = $(this.element);
          setTimeout(function () {
            $el.data("isAnimating", false);
          }, 500);
        }
  
        $(this.element).fadeTo(durationFadeIn, settings.opacity / 100);
        var animation = {};
        animation[settings.position] = settings.top;
        $(this.element).animate(animation, {
          duration: durationSlide,
          queue: false,
        });
  
        if (!$(this.element).data("placeholder").hasClass("sticky-element-active")) {
          $(this.element).data("placeholder").addClass("sticky-element-active").attr("style", assignedStyles);
        }
        $(this.element).data("sticky", true);
      },
      unstickIt: function (originalInlineStyles) {
        $(this.element).addClass("sticky-element-active").removeClass("element-is-sticky").addClass("element-is-not-sticky").attr("style", originalInlineStyles);
        if ($(this.element).data("placeholder").hasClass("sticky-element-active")) {
          $(this.element).data("placeholder").removeClass("sticky-element-active").removeAttr("style").css("width", "0").css("height", "0").css("margin", "0").css("padding", "0");
        }
      },
    });
  
    $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);
  