var petplan = petplan || {};

(function($, petplan){
	"use strict";

	petplan.petAdviceSelector = (function(){

		// ----------------------------------------------------
	    // Module settings & private variables
	    // ----------------------------------------------------
	    var settings = {
	    	modalOffset : 10
	    };
	    var classList = {
	    	wrapper : '.pet-advice-selector',
	    	slider : '.pet-advice-slider',
	    	next: '.pet-advice-selector__button--next',
	    	prev: '.pet-advice-selector__button--prev'
	    };

	    var winWidth = $(window).width();
	    var sliderExists = false;
	    var isMobile;
	    var bxSlider;
		// ----------------------------------------------------
	    // Private methods
	    // ----------------------------------------------------
	    var init = function init() {

	 	
	    
	    	if ( !$(classList.wrapper).length ) { return }

	    	if (matchMedia) {
			  var mq = window.matchMedia("(min-width: 768px)");
			  mq.addListener(WidthChange);
			  WidthChange(mq);
			}

			// media query change
			function WidthChange(mq) {
				
				if (mq.matches) {
				    if (sliderExists){
		
				    	bxSlider.destroySlider();
				    	$(classList.prev).unbind('click');
				    	$(classList.next).unbind('click');
				    	sliderExists = false;
				    }
			  	} 
			  	else 
			  	{
			        if (!sliderExists){
				    	buildCarousel();
					}
				}
			}
			
	    };


	    var buildCarousel = function(){
			$(classList.wrapper).each(function(i){

				var $self = $(this);
				var $slider = $self.find(classList.slider);

				bxSlider = $slider.bxSlider({
			  		controls: false,
			  		pager: false,
				  	adaptiveHeight: false,
				  	infiniteLoop: true,
				  	touchEnabled: false,
					maxSlides: 1
				});

				sliderExists = true;

				$(classList.next).on('click', function(event) {
					event.preventDefault();
					bxSlider.goToNextSlide();
				});

				$(classList.prev).on('click', function(event) {
					event.preventDefault();
					bxSlider.goToPrevSlide();
				});

				$(window).on('resize', function(){
					 if (sliderExists){
				   		bxSlider.reloadSlider();
				   	}
				});

			});

	    }	 

	    // --------------------------
	    // Public methods
	    // --------------------------
	    return {
	    	init : init
	    }

	}());

}(jQuery, petplan));
