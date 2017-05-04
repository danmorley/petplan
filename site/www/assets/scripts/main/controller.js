"use strict";

var petplan = petplan || {};

(function($, petplan){

	// Project breakpoints
	petplan.bp = {
		phones 	: 480,
		tablets : 768,
		desktop : 960,
		large 	: 1200,
		xLarge 	: 1400
	};

	// Project timings
	petplan.timing = {
		instant : 100,
		normal 	: 300,
		slow 	: 500,
		slower 	: 750
	};

	$(window).setBreakpoints({
	    breakpoints: [320,480,768]
	});
	// init the example
	//petplan.example.init();

	petplan.debouncer = function( func , timeout ) {
	   var timeoutID , timeout = timeout || 200;
	   return function () {
	      var scope = this , args = arguments;
	      clearTimeout( timeoutID );
	      timeoutID = setTimeout( function () {
	          func.apply( scope , Array.prototype.slice.call( args ) );
	      } , timeout );
	   }
	}

	petplan.coverSelector.init();

	petplan.testimonialSlider.init();

	petplan.petAdviceSelector.init();

	petplan.tableRespond.init();

	



	equalheight = function(container){

	var currentTallest = 0,
	     currentRowStart = 0,
	     rowDivs = new Array(),
	     $el,
	     topPosition = 0;
	 $(container).each(function() {

	   $el = $(this);
	   $($el).height('auto')
	   topPostion = $el.position().top;

	   if (currentRowStart != topPostion) {
	     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	       rowDivs[currentDiv].height(currentTallest);
	     }
	     rowDivs.length = 0; // empty the array
	     currentRowStart = topPostion;
	     currentTallest = $el.height();
	     rowDivs.push($el);
	   } else {
	     rowDivs.push($el);
	     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
	  }
	   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
	     rowDivs[currentDiv].height(currentTallest);
	   }
	 });
	}

	$(window).load(function() {
	  equalheight('[data-equal-height]');
	});

	$(window).on('resize', function(){
	  equalheight('[data-equal-height]');
	});




}(jQuery, petplan));
