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
            }
        },
        clean: {
            radicjsdist: ['lib/radicjs/<%= config.radicjs.dest %>']
        }

    };

    require('load-grunt-tasks')(grunt);


    grunt.registerTask('build:dep', 'Builds dependencies', ['subgrunt:radicjs', 'copy:radicjs2dist', 'clean:radicjsdist']);

    grunt.registerTask('widget', 'List widgets or use widget:WIDGETNAME to build the widget', function (target) {
        if (target) {
            grunt.task.run('build_widget:github-' + target);
        } else {
            origHeader('Available widget build commands');
            grunt.log.write('- widget:' + config.widgets.join('"\n- widget:'))
        }
    });

    grunt.registerTask('build:all', [
        'build:dep'
    ]);


    gc.availabletasks = {           // task
        tasks: {
            options: {
                filter: 'exclude',
                showTasks: ['user'],
                tasks: ['default', 'showtime', 'header'],
                groups: {
                    'Build tasks': ['build:all', 'build:dep', 'widget'],
                    'Development': ['watch']
                }
            },
            descriptions: {
                'build:all': 'Builds all widgets, dependencies and creates minified versions to the dist folder',
                'build:dep': 'Task',
                'widget': 'Task',
                'watch': 'Task'
            }
        }
    };                          // target


    require('./tasks/adjust')(grunt);
    grunt.initConfig(gc);
};
