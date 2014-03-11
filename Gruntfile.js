// Sample grunt-jekyll grunt.js file
// https://github.com/dannygarcia/grunt-jekyll

/*global module:false*/
module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({

        jekyll: {
            server: {
                options: {
                    //src : 'templates',
                    //dest: 'dev',
                    serve: true,
                    auto : true,
                }
            },
            dev: {
                src: 'templates',
                dest: 'dev'
            },
            prod: {
                src: 'templates',
                dest: 'prod'
            },
        },

        // Config for new consolidate task.
        consolidate: {
            dev: {
                options: {
                    dest: 'foobar'
                },
            }
        },
        // Config for copy task.
        copy: {
            dev: {
                files: [
                  {expand: true, src:['dev-assets/css/**'], dest: 'stylesheets/', flatten:true, filter: 'isFile'},
                                             {expand: true, src:['dev-assets/js/**'], dest: 'javascripts/', flatten:true, filter: 'isFile'}

                ]
            }
        },
        // Config for concat task.
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                options: {
                    stripBanners: true,
                    banner: '/*! <%= pkg.name %> */'
                },
                src: ['dev-assets/css/**/*.css'],
                dest: 'stylesheets/concat-style.css',
                nonull: true
            },
            js: {
                src: ['dev-assets/js/**/*.js'],
                dest: 'javascripts/concat-js.js',
                nonull: true
            }
        }, 
        // Config for watch task.
        watch: { // for development run 'grunt watch'
 /*          consolidate: {
               files: ['*.html'],
               tasks: ['consolidate:dev']
           },*/
           dev: {
                files: ['*.html', 'dev-assets/**/*.css', 'dev-assets/**/*.js'],
                tasks: ['concat:css', 'jekyll:server']
            }
        }
    });


    // Load grunt-jekyll plugin tasks.
    grunt.loadNpmTasks('grunt-jekyll');

    // Load contrib tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');


    // Define new task consolidate.
    var consolidateDesc = 'A simple consolidator task for asset folders';
    var consolidate =  function() {
        var options = this.options();
        grunt.log.write(options);
       // grunt.log.write(JSON.stringify(this));
       // grunt.log.write('running consolidation into...' + options.dest);
    }
    grunt.registerMultiTask('consolidate', consolidateDesc, consolidate);

    // Register jekyll-serve task. Consolidates front-end assets,
    // and runs standard jekyll server.
    grunt.registerTask('jekyll-serve', ['consolidate', 'jekyll:server']);
};
