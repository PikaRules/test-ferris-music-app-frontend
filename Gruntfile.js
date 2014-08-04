module.exports = function(grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/* \n * <%= pkg.name %> - v<%= pkg.version %> - ' + 
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
			'<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' + 
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n */'
		},
		jshint: {
			files: ['assets/js/**/*.js','assets/js/app.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				forin: true,
				browser: true,
				devel: true, //TODO: Remove this in production.
				globals: {
					exports: true,
					module: false,
					can: true,
					$: true,
					Modernizr: true,
					Helpers: true,
					Models: true,
					Controllers: true,
                    Components: true,
					ActiveXObject: true,
					flowplayer: true,
					BrowserDetect: true,
					Zenbox: true,
					FB: true,
					MaintenanceScreen:true,
					getActualDateTimeFormat: true,//, //recordar quitar esto...
					formatAMPM: true,
					Faye: true,
					_gaq: true,
					ga:true,
					qq: true,
					kWidget: true,
					respond: true,
					Pixastic: true,
					YT: true,
					onYouTubeIframeAPIReady: true,
					jwplayer: true,
					yourls: true,
					escape: true,
					ZeroClipboard: true,
					demand: true,
					moment: true,
					ga: true,
					AmCharts: true
				},
			}
		},
		watch: {
		      files: ['assets/js/**/*.js','assets/js/app.js'],
    		  tasks: ['jshint', 'concat'],
    		  options:{
    		  	interrupt:true,
    		  	globals: {
					exports: true,
					module: false,
					can: true,
					$: true,
					Modernizr: true,
					Helpers: true,
					Models: true,
					Controllers: true,
                    Components: true,
					ActiveXObject: true,
					flowplayer: true,
					BrowserDetect: true,
					Zenbox: true,
					FB: true,
					MaintenanceScreen:true,
					getActualDateTimeFormat: true,//, //recordar quitar esto...
					formatAMPM: true,
					Faye: true,
					_gaq: true,
					ga:true,
					qq: true,
					kWidget: true,
					respond: true,
					Pixastic: true,
					YT: true,
					onYouTubeIframeAPIReady: true,
					jwplayer: true,
					yourls: true,
					escape: true,
					ZeroClipboard: true,
					demand: true,
					moment: true,
					ga: true
				}
    		  }
		},
		cssmin: {
		  minify: {
		   	expand:true,
		   	src:['assets/css/**/*css'],
		   	dest:'min/css/',
		   	ext:'.min.css'
		  }
		},	
		uglify: {
			options: {
				compress: {
					drop_console: true
				}
			},
			build:{
				files:[{
					expand:true,
					src:'assets/js/*.js',
					dest:'min',
				}]
			}
		},	
		qunit:{
			files:['index.html']
		},
		connect: {
		    watch: {
		      	options: {
		        	port: 8081,
		        	base: '.'
		      }
		    }
		},
        strip: {
			dist: {
				src: 'js/*.js'
			},
            options: {
                inline : true,
                nodes : ['console.log','console.warn','console.trace','window.console.log']
            }
		},
		concat:{
			"main":{
				"src":[
					"libs/*.js"
				],
				"dest":"js/main.js"
			},
			"app":{
				"src":[
					"app/services/**/*.js",
					"app/controllers/**/*.js",
					"app/app.js"
				],
				"dest":"assets/js/app.js"
			}
		},
		test:{}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-htmlclean');
    grunt.loadNpmTasks('grunt-strip');

	// Default task.
	grunt.registerTask('default', ['concat']);
    grunt.registerTask('dev-clean', ['concat','strip']);
	grunt.registerTask('dev', ['concat']);
	grunt.registerTask('production', ['concat','uglify','cssmin']);
	grunt.registerTask('server:watch',['concat','connect','watch','jshint']);
	grunt.registerTask('test', ['qunit']);
};
