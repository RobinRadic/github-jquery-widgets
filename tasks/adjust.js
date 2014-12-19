module.exports = function(grunt){

    var origHeader = grunt.log.header;

    grunt.log.header = function () {
    };

    grunt.registerTask('showtime', function () {
        require('time-grunt')(grunt);
    });


    grunt.registerTask('default', 'Overview', function () {
        grunt.task.run(['availabletasks']);
    });
    grunt.registerTask('header', function (target) {
        grunt.log.header = target == 'enable' ? origHeader : function(){};
    });

    var origRun = grunt.task.run;
    grunt.task.run = function () {
        var args = _.toArray(arguments);
        if (args[0] !== 'default' && args[0][0] !== 'availabletasks' && args[0] !== 'availabletasks:tasks') {
            //grunt.log.header = origHeader;
        }
        // console.log(_.toArray(arguments));
        origRun.apply(grunt.task, args);
    };
};
