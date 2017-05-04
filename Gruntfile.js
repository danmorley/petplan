 /*global module:true, require:true*/
(function () {

	'use strict';

	module.exports = function(grunt) {

		// Loads all the grunt tasks
		require('load-grunt-tasks')(grunt);

		// Creates a handy time bar
		require('time-grunt')(grunt);


		grunt.initConfig({

			/**
			 * Gloabal Configuration variables
			 */
			config: {
				src: 'site',
				assets: '<%= config.src %>/assets',
				scripts: '<%= config.assets %>/scripts',
				dist: 'dist',
				distAssets: '<%= config.dist %>/assets'
			},


			/**
			 * Validate JS files (JSHINT)
			 * https://github.com/gruntjs/grunt-contrib-jshint
			 */
			jshint: {
				all: [
					'Gruntfile.js',
					'<%= config.scripts %>/main/**/*.js'
				]
			},


			/**
			 * Uglify and minifit js scripts
			 * https://github.com/gruntjs/grunt-contrib-uglify
			 */
			uglify: {
				dist: {
					options: {
						compress: {
							drop_console: true
						}
					},
					files: {
						'<%= config.distAssets %>/scripts/main.min.js': ['<%= config.distAssets %>/scripts/main.min.js']
					}
				}
			},


			/**
			 * Concatenate js files
			 * https://github.com/gruntjs/grunt-contrib-concat
			 */
			concat: {
				options: {
      				separator: ';',
      				sourceMap: true
    			},
	    		main: {
	    			src: [ '<%= config.scripts %>/plugins/**/*.js', '<%= config.scripts %>/main/**/*.js'],
	    			dest: '<%= config.scripts %>/main.min.js'
	    		}
			},


			/**
			* Runs tasks against changed watched files
			* https://github.com/gruntjs/grunt-contrib-watch
			*/
			watch: {
				concat: {
					files: ['<%= config.scripts %>/main/**/*.js', '<%= config.scripts %>/plugins/**/*.js'],
					tasks: ['concat:main', 'jshint:all']
				},
				livereload: {
					options: {
						livereload: true
					},
					files: [
						'site/**/*.ejs',
						'<%= config.scripts %>/**/*.js',
						'<%= config.assets %>/styles/**/*.scss',
					]
				}
			},


			/**
			 * Modernizr
			 * https://github.com/Modernizr/grunt-modernizr
			 */
			modernizr: {
				dist: {
					'dest' : '<%= config.distAssets %>/scripts/vendor/modernizr.js',
					'devFile': false,
					'parseFiles': true,
					'options': [
						"setClasses",
						'html5printshiv',
						'html5shiv'
					],
					'uglify': true,
					'files': {
						'src' : [
							'<%= config.distAssets %>/**/*.css',
							'<%= config.distAssets %>/**/*.js',
							'<%= config.dist %>/**/*.html',
							'!vendor/**/*'
						]
					}
				}
			},


			/**
			 * optimise images
			 * https://www.npmjs.com/package/grunt-contrib-imagemin
			 */
			imagemin: {
				dist: {
					files: [{
						expand: true,
						cwd: '<%= config.dist %>',
						src: ['**/*.{png,jpg,gif,svg}'],
						dest: '<%= config.distAssets %>/images/'
					}]
				}
			},


			/**
			 * run shell commands
			 * https://github.com/sindresorhus/grunt-shell
			 */
			shell: {
        		harpCompile: {
            		command: 'harp compile'
        		},
        		harpServer: {
        			command: 'harp server site'
        		},
        		cssComb: {
        			command: 'csscomb site/assets/styles/_base && csscomb site/assets/styles/_components && csscomb site/assets/styles/_overides && csscomb site/assets/styles/_objects && csscomb site/assets/styles/_mixins'
        		}
    		},


    		/**
			 * Copy files
			 * https://www.npmjs.com/package/grunt-contrib-copy
			 */
			copy : {
				dist : {
					cwd: 'www/site/',
    				src: ['**/*', '!**/*.map', '!**/*.scss', '!**/scripts/main/**'],
    				dest: '<%= config.dist %>/',
    				expand: true
				}
			},


			/**
			 * Compress and zip the site
			 * https://www.npmjs.com/package/grunt-contrib-compress
			 */
			compress: {
				dist: {
					options: {
						archive: '<%= config.dist %>/download.zip',
						mode: 'zip'
					},
					files: [{
						src: ['**/*'],
						cwd: '<%= config.dist %>/',
						expand: true
					}]
				}
			},


			/**
			 * Clean files and directories
			 * https://www.npmjs.com/package/grunt-contrib-clean
			 */
			clean: {
				dist : '<%= config.dist %>',
				harp : 'www'
			},


			/**
			 * Runs multiple tasks at the same time
			 * https://www.npmjs.com/package/grunt-concurrent
			 */
			concurrent: {
				site: ['shell:harpServer', 'watch']
			}



		});





		/**
		 * Default task
		 * Run `grunt` on the command line
		 */
		grunt.registerTask('default', []);


		/**
		 * Server task
		 * Run `grunt sever` on the command line
		 */
		grunt.registerTask('cssComb', [
			'shell:cssComb'
		]);


		/**
		 * Server task
		 * Run `grunt sever` on the command line
		 */
		grunt.registerTask('server', [
			'concat:main',
			'concurrent:site'
		]);


		/**
		 * Build task
		 * Run `grunt build` on the command line
		 */
		grunt.registerTask('build', [
			'clean:harp',
			'clean:dist',
			'concat:main',
			'shell:harpCompile',
			'copy:dist',
			'clean:harp',
			'uglify:dist',
			'modernizr:dist'
		]);


		/**
		 * Production task
		 * Run `grunt production` on the command line
		 */
		grunt.registerTask('production', [
			'build',
			'imagemin:dist',
			'compress:dist'
		]);


	};

}());






