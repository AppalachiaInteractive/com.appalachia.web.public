{
    "menu": {
        "config": {
            "development_mode": true
        },
        "structure": [
            {
                "id": "dashboard",
                "title": "Dashboard",
                "icon": "dashboard",
                "type": "link",
				"show_in_sidebar": true,
                "auto_load_subview": false,
                "viewpath": "dashboard/",
                "header": {
                    "auto_generate": false,
                    "show_save": false,
                    "header_label": "",
                    "header_title": ""
                }
            },
            {
                "id": "dropdown_default",
                "title": "Sliders",
                "icon": "slider",
                "type": "dropdown",
                "auto_load_subview": false,
                "submenu": [
                    {
                        "id": "dropdown_submenu_holder",
                        "type": "holder"
                    },
                    {
                        "id": "sidebar_add_new_btn",
                        "title": "Add New",
                        "type": "button"
                    }
                ],
                "viewpath": "dropdown/",
                "header": {
                    "auto_generate": true,
                    "show_save": true,
                    "header_label": "",
                    "header_title": ""
                },
                "views": [
                    {
                        "id": "sub_setup",
                        "title": "Setup",
                        "icon": "setup",
                        "submenu": [
                            {
                                "id": "sub_setup_general_view",
                                "title": "General",
								"auto_load_components": true,
                                "view": "sub.general"
                            }
                        ]
                    },
					{
                        "id": "sub_slides",
                        "title": "Slides",
                        "icon": "slides",
                        "submenu": [
                            {
                                "id": "sub_slides_view",
                                "title": "Slides",
								"auto_load_components": true,
                                "view": "sub.slides"
                            }
                        ]
                    },
					{
                        "id": "sub_style",
                        "title": "Styling",
                        "icon": "styling",
                        "submenu": [
                            {
                                "id": "sub_style_view",
                                "title": "Slider Styling",
								"auto_load_components": true,
                                "view": "sub.style"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}