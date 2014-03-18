// Sample grunt-jekyll grunt.js file
// https://github.com/dannygarcia/grunt-jekyll

/*global module:false*/
module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        // Config for jekyll task.
        jekyll: {
            server: {
                options: {
                   serve: true,
                    auto : true,
                    config: '_config.dev.yml',
                }
            },
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
        watch: {
            dev: {
                files: ['**/*.html','**/*.md','**/*.markdown', 'dev-assets/**/*.css', 'dev-assets/**/*.js', '!app/*', '!fonts/*', '!node_modules/*', '!_site/*', '!_site/**/*'],
                tasks: ['concat:css']
            }
        },
        // Config for concurrent task. Need it cause server might be blocking or watch, or vice versa.
        concurrent: {
            dev: {
                tasks:  ['watch:dev', 'jekyll:server'],
                options: {
                    logConcurrentOutput: true
                }
            }    
        }
    });


    // Load grunt-jekyll plugin tasks.
    grunt.loadNpmTasks('grunt-jekyll');

    // Load grunt-concurrent tasks.
    grunt.loadNpmTasks('grunt-concurrent');

    // Load contrib tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
