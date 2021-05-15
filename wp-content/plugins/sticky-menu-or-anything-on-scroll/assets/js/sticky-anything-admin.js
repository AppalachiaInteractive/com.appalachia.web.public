/**
 * @preserve Sticky Anything 2.1.1 | @senff | GPL2 Licensed
 */

var ids_array_new_elements_to_delete = [];

jQuery(function ($) {
  /* License Stuff */
  $("#smoa_save_license").on("click", function (e) {
    e.preventDefault();

    safe_refresh = true;
    trigger_loading_spinner(false);

    $.post(
      ajaxurl,
      {
        action: "smoa_activate",
        smoa_license_key: $("#smoa_license_key").val(),
        _ajax_nonce: smoa.lic.nonce_activate_license_key,
        _rand: Math.floor(Math.random() * 9999) + 1,
      },
      function (response) {
        if (response.success) {
          Swal.close();
          location.reload();
        } else {
          verify_licence_ajax($("#smoa_license_key").val());
        }
      }
    ).fail(function () {
      trigger_message(
        "error",
        smoa.lic.messages.errors.unknown.title,
        smoa.lic.messages.errors.unknown.msg
      );
    });

    return false;
  });

  $("#smoa_deactivate_license").on("click", function (e) {
    e.preventDefault();

    safe_refresh = true;
    trigger_loading_spinner(false);

    $.post(
      ajaxurl,
      {
        action: "smoa_deactivate",
        _ajax_nonce: smoa.lic.nonce_activate_license_key,
        _rand: Math.floor(Math.random() * 9999) + 1,
      },
      function (response) {
        if (response.success) {
          Swal.close();
          location.reload();
        } else {
          trigger_message(
            "error",
            smoa.lic.messages.errors.unknown.title,
            smoa.lic.messages.errors.unknown.msg
          );
        }
      }
    ).fail(function () {
      trigger_message(
        "error",
        smoa.lic.messages.errors.unknown.title,
        smoa.lic.messages.errors.unknown.msg
      );
    });

    return false;
  });

  $("#smoa_license_key").on("keypress", function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $("#smoa_save_license").trigger("click");
    }
  });

  function verify_licence_ajax(licence_code) {
    $.get(
      smoa.lic.lc_ep,
      {
        action: "validate_license",
        license_key: licence_code,
        version: smoa.lic.lc_version,
        code_base: "pro",
        site: smoa.lic.lc_site,
        _rand: Math.floor(Math.random() * 9999) + 1,
      },
      function (response) {
        if (response.data) {
          $.post(
            ajaxurl,
            {
              license_key: licence_code,
              license_active: response.data.license_active,
              license_type: response.data.license_type,
              license_expires: response.data.license_expires,
              _ajax_nonce: smoa.lic.nonce_save_license_key,
              action: "smoa_activate_ajax",
            },
            function (response) {
              if (response.success) {
                location.reload();
              } else {
                trigger_message(
                  "error",
                  smoa.lic.messages.errors.unknown.title,
                  smoa.lic.messages.errors.unknown.msg
                );
              }
            }
          ).fail(function () {
            trigger_message(
              "error",
              smoa.lic.messages.errors.ups.title,
              smoa.lic.messages.errors.ups.msg
            );
          });

          if (response.data.error) {
            trigger_message(
              "error",
              smoa.lic.messages.errors.unknown.title,
              response.data.error
            );
          }
        }
        $(this).removeClass("loading");
      }
    ).fail(function () {
      trigger_message(
        "error",
        smoa.lic.messages.errors.unknown.title,
        smoa.lic.messages.errors.unknown.msg
      );
    });
  }

  $(".change-tab").on("click", function (e) {
    e.preventDefault();
    $('.smoa-main-menu a[href="' + $(this).attr("href") + '"]').trigger(
      "click"
    );
  });

  $('.sticky-color-field').wpColorPicker();

  /* /License Stuff */
  $(".add-new-element").on("click", function () {
    const newElementID = smoa.total_elements;
    const newLiElement = get_new_li_element(newElementID);
    const newSettingsPage = get_new_settings_page(newElementID);

    $("ul.smoa-elements").append(newLiElement);
    $("div.tab-pages").append(newSettingsPage);

    var print_id = Number(smoa.total_elements) + 1;
    $("h2#sa_element_title-" + smoa.total_elements).text(
      "Sticky Element #" + print_id
    );

    $tab = "#element-" + newElementID;

    ids_array_new_elements_to_delete.push(newElementID);

    smoa.total_elements++;
    $(".no-elements").remove();
    smoa_change_menu_item($("#li-element-" + newElementID), $tab, true);
  });

  $(".smoa-main-menu").on("click", "li a", function (e) {
    e.preventDefault();

    if ($(this).hasClass("parent-menu")) {
      $(this).siblings(".smoa-submenu").find("a:first-child").trigger("click");
      return false;
    }

    smoa_change_menu_item($(this), $(this).attr("href"));
  });

  function smoa_change_menu_item($this, $tab, $new) {
    localStorage.removeItem("smoa_menu");

    $(".smoa-main-menu li").removeClass("active");
    $this.parents("li").addClass("active");
    $(".smoa-main-menu li").removeClass("active-secondary");
    $this.parents("li").addClass("active-secondary");

    $(".smoa-tab").hide();
    $($tab).show();
    $state = $tab;

    localStorage.setItem("smoa_menu", $tab);

    load_smoa_collapsible();

    if ($(this).data("enable-new")) {
      $("#new-element [data-to-disable]").removeAttr("disabled");
    } else {
      $("#new-element [data-to-disable]").attr("disabled", "disabled");
    }

    if ($new == true) {
      load_all_events_and_component_interaction($);
      $this.addClass("active");
    }
  }

  $("a.smoa-change-tab").on("click", function (e) {
    e.preventDefault();

    $("a#li-support").trigger("click");
  });

  // open Help Scout Beacon
  $(".settings_page_stickyanythingpromenu").on(
    "click",
    ".open-beacon",
    function (e) {
      e.preventDefault();

      Beacon("open");

      return false;
    }
  );

  if(!smoa.whitelabel){
    // init Help Scout beacon
    Beacon("config", {
        enableFabAnimation: false,
        display: {},
        contactForm: {},
        labels: {},
    });
    Beacon("prefill", {
        name: "\n\n\n" + smoa.support_name,
        subject: "WP Sticky PRO in-plugin support",
        email: "",
        text: "\n\n\n" + smoa.support_text,
    });
    Beacon("init", "0e86cca7-1806-4b9d-9235-8699adfa4c28");

    // open HS docs and show article based on tool name
    $(".documentation-link").on("click", function (e) {
        e.preventDefault();

        search = $(this).data("tool-title");
        Beacon("search", search);
        Beacon("open");

        return false;
    });
  }

  $("button#smoa-save-button").on("click", function () {
    //$( "#sa_form" ).submit();

    var required = $("input,textarea,select").filter("[required]:visible");

    var allRequired = true;
    required.each(function () {
      if ($(this).val() == "") {
        allRequired = false;
      }
    });

    if (allRequired) {
      save_form_ajax($);
    } else {
      trigger_message(
        "warning",
        smoa.form_warning_empty_fields,
        smoa.form_warning_empty_fields_text
      );
    }
  });

  $("#smoa_use_normal_click").on("change", function () {
    const iframe = $("iframe#smoa-modal-iframe")[0];
    iframe.contentWindow.postMessage(
      {
        messageType: "smoa-tick",
        canClick: this.checked,
      },
      "*"
    );
  });

  $(document).ready(function () {
    old_settings = $("form#sa_form *").not(".skip-save").serialize();

    $("a#smoa-preview-button").on("click", function (e) {
      if ($("form#sa_form *").not(".skip-save").serialize() != old_settings) {
        e.preventDefault();
        Swal.fire(smoa.oops, smoa.warning_leaving_without_save, "error");
      }

      return true;
    });

    ids_array_new_elements_to_delete = [];
    load_all_events_and_component_interaction($);
    load_smoa_collapsible();
    load_forms($);
  });
});

function load_all_events_and_component_interaction($) {
  // --- HANDLING THE TABS -----------------------------------

  $(".nav-tab-wrapper").on("click", "a, a.faq", function (t) {
    var tab_id = $(this).attr("href").replace("#", ".tab-sticky-");
    var tab_name = $(this).attr("href").replace("#", "");

    // Set the current tab active
    $(this).parent().children().removeClass("nav-tab-active");
    $(this).addClass("nav-tab-active");

    // Show the active content
    $(".tab-content").addClass("hide");
    $(".tabs-content div" + tab_id).removeClass("hide");
    $('input[name="sa_tab"]').val(tab_name);

    // Change the URL
    var currentURL = window.location.href;
    if (currentURL.indexOf("&tab") > 0) {
      var newURL =
        currentURL.substring(0, currentURL.indexOf("&tab")) +
        "&tab=" +
        tab_name;
    } else {
      var newURL = currentURL + "&tab=" + tab_name;
    }

    switch (tab_name) {
      case "advanced":
        var tab_title = "Advanced Settings";
        break;
      case "faq":
        var tab_title = "FAQ";
        break;
      default:
        var tab_title = "Basic Settings";
    }

    window.history.pushState(tab_title, tab_title, newURL);
    t.preventDefault();
  });

  $("a.faq").on("click", function (t) {
    $(".nav-tab-wrapper a").removeClass("nav-tab-active");
    $('.nav-tab-wrapper a[href="#faq"]').addClass("nav-tab-active");
  });

  $("#sa_legacymode").on("change", function () {
    if ($("#sa_legacymode").is(":checked")) {
      $("#row-dynamic-mode").removeClass("disabled-feature");
      $("#row-dynamic-mode .showhide").slideDown();
    } else {
      $("#row-dynamic-mode").addClass("disabled-feature");
      $("#row-dynamic-mode .showhide").slideUp();
    }
  });

  var $state = localStorage.getItem("smoa_menu");
  console.log($state);
  if($state == '#license' && smoa.whitelabel == true){
    $state = '#welcome';
  }
  if ($state) {
    if ($state.indexOf("-") != -1) {
      state = $state.split("-");
      $(".smoa-main-menu li").removeClass("active");
      $(".smoa-main-menu li a").removeClass("active-secondary");
      $('a[href="' + state[0] + '"]')
        .parent("li")
        .addClass("active");
      $('a[href="' + $state + '"]').parent().addClass("active");
      $($state).show();
    } else {
      $(".smoa-main-menu li").removeClass("active");
      $('a[href="' + $state + '"]')
        .parent("li")
        .addClass("active");
      $($state).show();
    }
  } else {
    $("a[href=\"#license\"]").parent().addClass("active");
    $("#license").show();
  }

  $(".smoa-tab .smoa-select2").select2({ width: "100%" });

  $("[data-smoa-slider]").each(function () {
    var value = $(this).data("value");
    if (!value) {
      value = 100;
    }

    var $el = $(this);
    var index = $(this).data("for");
    $el
      .slider({
        min: 0,
        max: 100,
        slide: function (event, ui) {
          $("#opacity-" + index).text(ui.value);
        },
        change: function (event, ui) {
          $("#sa_opacity-" + index).val(ui.value);
          $("#opacity-" + index).text(ui.value);
        },
      })
      .slider("value", value);
  });

  $("[data-smoa-slider-range]").each(function () {
    var value_min = $(this).data("value-min");
    if (!value_min) {
        value_min = 0;
    }

    var value_max = $(this).data("value-max");
    if (!value_max) {
        value_max = 100;
    }

    var $el = $(this);
    var index = $(this).data("for");
    $el
      .slider({
        range: true,  
        min: 0,
        max: 100,
        slide: function (event, ui) {
          $("#scroll_range_min-" + index).text(ui.values[0]);
          $("#scroll_range_max-" + index).text(ui.values[1]);
        },
        change: function (event, ui) {
          $("#sa_scroll_range_min-" + index).val(ui.values[0]);
          $("#sa_scroll_range_max-" + index).val(ui.values[1]);
        },
      })
      .slider("values", [value_min, value_max]);
  });

  $("[data-delete-element]").on("click", function (e) {
    e.preventDefault();

    const id = $(this).data("delete-element");

    $("#sa_delete").val(id);
    $("li#li-element-" + id).remove();
    $("div#element-" + id).remove();

    smoa.total_elements--;

    if (smoa.total_elements == 0) {
      $(".smoa-elements").html(
        '<li class="no-elements"><a class="add-new-element">No Elements - Add New</a></li>'
      );
    }

    save_form_ajax($, true);
  });

  $("button.smoa-click-visual-btn").on("click", function (e) {
    e.preventDefault();
    $("body").css("overflow", "hidden");
    $("span.smoa-modal-selected-path").innerText = "";
    $("div.smoa-modal").css("display", "block");
    const id = $(this).attr("data-element-id");
    const element = $(this).attr("data-element");
    $("div.smoa-modal").attr("data-element-id", id);
    $("div.smoa-modal").attr("data-element", element);
    const content = $("div.smoa-modal-content");
    const iframe = $("iframe#smoa-modal-iframe")[0];
    iframe.style.top = "0px";
    iframe.style.width = "100%";
    iframe.style.height = content.height() + "px";
    iframe.src = smoa.smoa_wp_url + "&smoa-element-id=" + id;
  });

  $(".smoa-mobile-menu a").on("click", function () {
    $(".smoa-main-menu").slideToggle();
  });

  $("select.sa_position").on("change", function () {
    const element = $(this).attr("data-select-position");
    const content = $(this).parent().closest("div.smoa-content")[0];
    if (this.value === "bottom") {
      $("#" + element).show();
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      $("#" + element).hide();
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  $("button.smoa-modal-close-btn").on("click", function () {
    $("body").css("overflow", "");
    $("div.smoa-modal").css("display", "none");
  });

  $("input.sa_element_name").on("keyup", function () {
    const id = $(this).attr("data-element-id");
    $("span#sa_element_name-" + id).text(" " + this.value);
    $("h2#sa_element_title-" + id).text(" " + this.value);
  });

  $("input.sa_element_name_status").on("change", function () {
    const id = $(this).attr("data-element-id");

    const element = $("span#sa_element_name_status-" + id);

    if (this.checked) {
      $("li#li-element-" + id + " a").removeClass("disabled-item");
      $("li#li-element-" + id + " a").addClass("active-item");
    } else {
      $("li#li-element-" + id + " a").removeClass("active-item");
      $("li#li-element-" + id + " a").addClass("disabled-item");
    }
  });

  $(".tooltip").tooltipster({ maxWidth: "300" });
}

function save_form_ajax($, isDelete = false) {
  const data = $("form#sa_form").serialize();
  trigger_loading_spinner(isDelete);

  $.post(
    ajaxurl,
    {
      form_data: data,
      _ajax_nonce: smoa.nonce_save_settings,
      action: "smoa_pro_save_settings",
    },
    "json"
  )
    .success(function () {
      trigger_message(
        "success",
        isDelete ? smoa.form_success_deleted : smoa.form_success
      );

      if (isDelete) {
        localStorage.removeItem("smoa_menu");
        $(".smoa-main-menu li").removeClass("active");
        $(".smoa-main-menu li a").removeClass("active-secondary");
        $('.smoa-main-menu li a[href*="#welcome"]')
          .parents("li")
          .addClass("active");
        $('.smoa-main-menu li a[href*="#welcome"]').addClass(
          "active-secondary"
        );

        $("#welcome").show();
        localStorage.setItem("smoa_menu", "#welcome");
      }

      old_settings = $("form#sa_form *").not(".skip-save").serialize();
    })
    .error(function () {
      trigger_message(
        "error",
        isDelete ? smoa.form_error_delete_title : smoa.form_error_title,
        smoa.form_error
      );
    });
}

function trigger_loading_spinner(isDelete = false) {
  Swal.fire({
    title: smoa.form_loading_title,
    text: isDelete ? smoa.form_loading_delete : smoa.form_loading,
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    onOpen: () => {
      Swal.showLoading();
    },
  });
}

function trigger_message(message_type, title, text = "", position = "center") {
  Swal.fire({
    position: "center",
    icon: message_type,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
}

function load_smoa_collapsible() {
  var coll = document.getElementsByClassName("smoa-collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    const element = coll[i];
    var id = element.getAttribute("smoa-collapsible-id");
    var type = element.getAttribute("smoa-collapsible-type");

    if (type != "faq" && type != "delete") {
      var state = localStorage.getItem(type + "-" + id);

      if (state !== null) {
        if (state && element.classList.contains("active"))
          element.classList.toggle("active");

        var content = element.nextElementSibling;
        content.style.maxHeight =
          state === "true" ? content.scrollHeight + "px" : null;
      }
    }

    coll[i].removeEventListener("click", collapsibleClickEvt, false);
    coll[i].addEventListener("click", collapsibleClickEvt);
  }
}

function collapsibleClickEvt(e) {
  var id = this.getAttribute("smoa-collapsible-id");
  var type = this.getAttribute("smoa-collapsible-type");
  this.classList.toggle("active");

  var content = this.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    content.classList.remove("active");
    localStorage.setItem(type + "-" + id, false);
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    content.classList.add("active");
    localStorage.setItem(type + "-" + id, true);
  }
  e.stopPropagation();
  e.preventDefault();
}

function save_form_state($form) {
  var old_state = $form.serialize();
  $form.data("old_state", old_state);
}

function load_forms($) {
  // On load, save form current state
  $("form").each(function () {
    save_form_state($(this));
  });

  // On submit, save form current state
  $("form").submit(function () {
    save_form_state($(this));
  });

  // Before unload, confirm navigation if any field has been edited
  $(window).on("beforeunload", function (e) {
    let rv;
    if ($("form#sa_form *").not(".skip-save").serialize() != old_settings) {
      rv = smoa.warning_leaving_without_save;
    }
    return rv;
  });
}

function get_new_li_element(id) {
  const liElement = document.createElement("li");
  liElement.id = "li-element-" + id;
  liElement.className = "active-item active";

  const aElement = document.createElement("a");
  aElement.href = "#element-" + id;
  aElement.className = "smoa-element-text active-item";

  const spanStatusIcon = document.createElement("span");
  spanStatusIcon.id = "sa_element_name_status-" + id;

  const spanElementText = document.createElement("span");
  spanElementText.id = "sa_element_name-" + id;
  var display_id = Number(id) + 1;
  spanElementText.innerText =
    " " + smoa.settings_page.default_element_text + display_id;

  aElement.append(spanStatusIcon);
  aElement.append(spanElementText);

  liElement.append(aElement);

  return liElement;
}

function get_new_settings_page(id) {
  const newSmoaTab = document.createElement("div");
  newSmoaTab.className = "smoa-tab";
  newSmoaTab.id = "element-" + id;
  var newSmoaTabHTML = document.querySelector("#smoa-new-sticky-html")
    .innerHTML;
  newSmoaTab.innerHTML = newSmoaTabHTML.replace(/999999/g, id);
  return newSmoaTab;
}

window.onmessage = function (e) {
  if (e.data.messageType == "smoa-iframe") {
    document.querySelector("span.smoa-modal-selected-path").innerText =
      e.data.pathToSelect;
  }
  if (e.data.messageType == "smoa-close-iframe") {
    const pathToSelect = document.querySelector("span.smoa-modal-selected-path")
      .innerText;
    const id = document
      .querySelector("div.smoa-modal")
      .getAttribute("data-element-id");
    const element = document
      .querySelector("div.smoa-modal")
      .getAttribute("data-element");
    document.querySelector("input#" + element).value = pathToSelect;
    document.querySelector("div.smoa-modal").style.display = "none";
    document.querySelector("body").style.overflow = "";
  }
};
