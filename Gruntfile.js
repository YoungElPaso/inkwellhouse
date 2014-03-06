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
            consolidate: {}
        },

        watch: { // for development run 'grunt watch'
            jekyll: {
                files: ['templates/*.html'],
                tasks: ['jekyll:dev']
            }
        }
    });


    // Load grunt-jekyll plugin tasks.
    grunt.loadNpmTasks('grunt-jekyll');

    // Load contrib tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');


    // Define new jekyll task consolidate.
    var jekyllConsolidateDesc = 'A simple consolidator task for asset folders';
    var jekyllConsolidate =  function() {
        grunt.log.write('running consolidation...');
    }
    grunt.registerTask('jekyll:consolidate', jekyllConsolidateDesc, jekyllConsolidate);

    // Register jekyll-serve task. Consolidates front-end assets,
    // and runs standard jekyll server.
    grunt.registerTask('jekyll-serve', ['jekyll:consolidate', 'jekyll:server']);
};
