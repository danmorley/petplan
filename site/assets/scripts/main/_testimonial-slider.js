var petplan = petplan || {};

(function($, petplan){
	"use strict";

	petplan.testimonialSlider = (function(){

		// ----------------------------------------------------
	    // Module settings & private variables
	    // ----------------------------------------------------
	    var settings = {
	    	modalOffset : 10
	    };
	    var classList = {
	    	wrapper : '.testimonial-wrapper',
	    	slider : '.testimonial-slider',
	    	next: '.cover-selector__button--next',
	    	prev: '.cover-selector__button--prev'
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
	    	buildCarousel();
	    };


	    var buildCarousel = function(){
			$(classList.wrapper).each(function(i){

				var $self = $(this);
				var $slider = $self.find(classList.slider);

				bxSlider = $slider.bxSlider({
				  	controls: false,
				  	adaptiveHeight: true,
				  	infiniteLoop: false,
				  	pager: true,
				  	touchEnabled: true,
					minSlides: 1,
					maxSlides: 3,
				  	slideWidth: 370,
				  	slideMargin: 15,
				  	moveSlides: 1
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
