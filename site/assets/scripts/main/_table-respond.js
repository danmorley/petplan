var petplan = petplan || {};

(function($, petplan){
	"use strict";

	petplan.tableRespond = (function(){

		// ----------------------------------------------------
	    // Module settings & private variables
	    // ----------------------------------------------------
	    var settings = {

	    };
	    var classList = {
	    	wrapper : '.tablesaw-wrap'
	    };

	    var $table;
	    var sliderExists;

		// ----------------------------------------------------
	    // Private methods
	    // ----------------------------------------------------
	    var init = function init() {

	 		$table = $('.table-tablesaw');
	    	
	    	if ( !$(classList.wrapper).length ) { return }

	    	if (matchMedia) {
			  var mq = window.matchMedia("(min-width: 768px)");
			  mq.addListener(WidthChange);
			  WidthChange(mq);
			}

			// media query change
			function WidthChange(mq) {
				
				if (mq.matches) {
					console.log('desktop');
			//		$table.removeData();
				    if (sliderExists){
		
				    	
				    }
			  	} 
			  	else 
			  	{
		  			console.log('mobile');
			  	//	$table.table().data( "table" ).refresh();

			        if (!sliderExists){
				    	
					}
				}
			}
			
	    };


	    var mobileiseTable = function(){

	    	var $tables = $( e.target ).find( ".tablesaw" );
$tables.data( "table" ).destroy();
$tables.attr( "data-tablesaw-mode", "swipe" ); // this step should not be needed.
$( e.target ).trigger( "enhance.tablesaw" );
			
	    }	 

	    // --------------------------
	    // Public methods
	    // --------------------------
	    return {
	    	init : init
	    }

	}());

}(jQuery, petplan));
