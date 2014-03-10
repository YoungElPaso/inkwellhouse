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
                }
            }
        },
        watch: { // for development run 'grunt watch'
 /*          consolidate: {
               files: ['*.html'],
               tasks: ['consolidate:dev']
           },*/
           jekyll: {
                files: ['*.html', 'stylesheets/*.css', 'javascripts/*.js'],
                tasks: ['consolidate:dev', 'jekyll:server']
            }
        }
    });


    // Load grunt-jekyll plugin tasks.
    grunt.loadNpmTasks('grunt-jekyll');

    // Load contrib tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load contrib watch task.
    grunt.loadNpmTasks('grunt-contrib-watch');


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
