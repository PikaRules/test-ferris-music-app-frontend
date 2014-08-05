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
			files: ['app/**/*.js'],
			options: {
				curly: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: false,
				boss: true,
				eqnull: true,
				forin: true,
				browser: true,
				devel: true, //TODO: Remove this in production.
				globals: {
					angular: true,
					exports: true,
					module: false,
					can: true,
					$: true,
					Modernizr: true,
					Helpers: true,
					Models: true,
					Controllers: true,
                    Components: true
				},
			}
		},
		watch: {
		      files: ['libs/**/*.js','app/**/*.js','assets/css/**/*.css','index.html','app/views/**/*.html'],
    		  tasks: ['jshint', 'concat'],
    		  options:{
    		  	interrupt:true,
    		  	globals: {
    		  		angular: true,
					exports: true,
					module: false,
					can: true,
					$: true,
					Modernizr: true,
					Helpers: true,
					Models: true,
					Controllers: true,
                    Components: true
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
		        	base: '.',
		        	files: ['**/*.js','**/*.html']
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
					"libs/angular.js",
					"libs/angular-route.min.js"
				],
				"dest":"deploy/main.js"
			},
			"app":{
				"src":[
					"app/appConfig.js",
					"app/services/**/*.js",
					"app/directives/**/*.js",
					"app/controllers/**/*.js",
					"app/app.js"
				],
				"dest":"deploy/app.js"
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
	grunt.registerTask('server:watch',['concat','jshint','connect','watch']);
	grunt.registerTask('test', ['qunit']);
};
