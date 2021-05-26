jQuery( function ( $ ) {
	
$(document).ready(function (){	
	
    elementor.hooks.addAction( 'panel/open_editor/widget', function( panel, model, view ) {
        var widget_type = model.attributes.widgetType;
		
        if(widget_type == 'woo-cart-table' ){
								
				//check if tablet content has padding
				$('body').on('change','.elementor-control-table_cell_padding input',  function(){	
					
					if(parseInt($('.bew-cart-items tr.cart_item').css("padding")) != "0") {
						$('.bew-cart-items tr.cart_item').css( "border-collapse", "unset" );
						console.log(parseInt($('.bew-cart-items tr.cart_item').css("padding")) );
					}
				});

        }
    } );
		
});


});