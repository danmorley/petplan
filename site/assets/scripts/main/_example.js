var project = project || {};

(function ($, project) {
	"use strict";

	project.example = (function () {
		// ----------------------------------------------------
	    // Module settings & private variables
	    // ----------------------------------------------------
	    var settings = {};
	    var classList = {};


		// ----------------------------------------------------
	    // Private methods
	    // ----------------------------------------------------
	    var privateMethod = function privateMethod () {
	    	console.log('settings:', project);
	    };


	    // --------------------------
	    // Public methods
	    // --------------------------
	    return {
	    	init : function init () {
	    		privateMethod();
	    	}
	    }

	}());

}(jQuery, project));
