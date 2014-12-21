'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var util = require('util');
var hooker = require('hooker');

module.exports = function (grunt) {

    var config = {
        widgets: ['profile', 'events'],
        radicjs: grunt.file.readYAML('radicjs.yml')
    };
    var gc = {
        config: config,
        build_widget: {
            options: {
                rootDir: 'src',
                dest: 'dist'
            },
            'github-profile': {
                minify: true
            },
            'github-events': {
                minify: true
            }
        },
        subgrunt: {
            radicjs: {
                'lib/radicjs': ['radicjs:githubwidgets', '--configfile=' + process.cwd() + '/radicjs.yml', '--stack']
            }
        },
        sass: {
            options: {
                sourcemap: 'none'
            },
            bootstrap: {
                src: 'src/bootstrap.scss',
                dest: 'test/bootstrap.css'
            },
            ghwidgets: {
                src: 'src/github-widgets.scss',
                dest: 'dist/github-widgets.css'
            }
        },
        preprocess: {
            options: {
                context: {
                    DEBUG: true
                }
            },
            testhtml: {
                options: {
                    inline: true
                },

                src: ['test/*.html']
            }
        },
        copy: {

            srctest2test: {
                files: [{
                    expand: true,
                    cwd: 'src/test',
                    src: '**',
                    dest: 'test/'
                }]
            },
            radicjs2dist: {
                files: [{
                    expand: true,
                    cwd: 'lib/radicjs/<%= config.radicjs.dest %>',
                    src: '**/*.js',
                    dest: 'dist/dep/'
                }]
            },
            dist2demo: {
                files: [{
                    expand: true,
                    cwd: 'lib/radicjs/<%= config.radicjs.dest %>',
                    src: ['**/*.js', '*.js'],
                    dest: 'dist/dep/'
                }]
            }
        },
        clean: {
            radicjsdist: ['lib/radicjs/<%= config.radicjs.dest %>'],
            radicjsyaml: ['radicjs.yml']
        },
        watch: {
            widgets: {
                files: ['src/**/*', '!src/**/*.tpls.js'],
                tasks: ['header', 'build:widgets']
            },
            testhtml: {
                files: ['src/test/**'],
                tasks: ['header', 'copy:srctest2test', 'preprocess:testhtml']
            },
            bootstrapsass: {
                files: ['src/bootstrap.scss', 'src/_base.scss'],
                tasks: ['header', 'sass:bootstrap']
            },
            ghwidgets: {
                files: ['src/github-widgets.scss'],
                tasks: ['header', 'sass:ghwidgets']
            }
        }

    };

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('widget', 'List widgets or use widget:WIDGETNAME to build the widget', function (target) {
        grunt.task.run('sass:ghwidgets');
        if (target) {
            grunt.task.run('build_widget:github-' + target);
        } else {
            origHeader('Available widget build commands');
            grunt.log.write('- widget:' + config.widgets.join('"\n- widget:'))
        }
    });

    grunt.registerTask('build:dep', 'Builds dependencies', ['subgrunt:radicjs', 'copy:radicjs2dist']); //, 'clean:radicjsdist']);

    grunt.registerTask('build:widgets', 'Builds all widgets', function (target) {
        var tasks = ['sass:ghwidgets'];
        _.each(config.widgets, function (widgetName) {
            tasks.push('build_widget:github-' + widgetName);
        });
        grunt.task.run(tasks)
    });

    grunt.registerTask('build:all', 'Builds all widgets, dependencies and creates minified versions to the dist folder', [
        'build:dep'
    ]);

    grunt.registerTask('demo:build', 'Create demonstration github pages from current dist', ['copy:dist2demo']);
    grunt.registerTask('demo:publish', 'Publish demonstration to github pages', ['copy:dist2demo']);
    grunt.registerTask('publish', 'Builds dependencies, widgets, demo. Increases version number, creates a git tag and pushes it to remote', ['copy:dist2demo']);


    grunt.initConfig(gc);
    require('./tasks/adjust')(grunt);
};
