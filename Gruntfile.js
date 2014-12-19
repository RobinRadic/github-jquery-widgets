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
                'lib/radicjs': ['radicjs:githubwidgets', '--configfile=../../radicjs.yml']
            }
        },
        copy: {
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
                    src: '**/*.js',
                    dest: 'dist/dep/'
                }]
            }
        },
        clean: {
            radicjsdist: ['lib/radicjs/<%= config.radicjs.dest %>']
        },
        watch: {
            widgets: {
                files: ['src/**/*', '!src/**/*.tpls.js'],
                tasks: ['build:widgets']
            }
        }

    };

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('widget', 'List widgets or use widget:WIDGETNAME to build the widget', function (target) {
        if (target) {
            grunt.task.run('build_widget:github-' + target);
        } else {
            origHeader('Available widget build commands');
            grunt.log.write('- widget:' + config.widgets.join('"\n- widget:'))
        }
    });

    grunt.registerTask('build:dep', 'Builds dependencies', ['subgrunt:radicjs', 'copy:radicjs2dist', 'clean:radicjsdist']);

    grunt.registerTask('build:widgets', 'Builds all widgets', function (target) {
        var tasks = [];
        _.each(config.widgets, function(widgetName){
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

    gc.availabletasks = {           // task
        tasks: {
            options: {
                filter: 'exclude',
                showTasks: ['user'],
                tasks: ['default', 'showtime', 'header'],
                groups: {
                    'Deploy': ['demo:build', 'demo:publish', 'publish'],
                    'Build tasks': ['build:all', 'build:dep', 'build:widgets', 'widget'],
                    'Development': ['watch']
                }
            },
            descriptions: {
                'build:all': '',
                'build:dep': '',
                'widget': '',
                'watch': 'Task',
                'demo:build': ''
            }
        }
    };                          // target


    require('./tasks/adjust')(grunt);
    grunt.initConfig(gc);
};
