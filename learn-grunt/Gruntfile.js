module.exports = function(grunt) {
    grunt.initConfig({
        // jshint: {},
        concat: {
            main: {
                src: [
                    'src/lib/*.js',
                    'src/app/*.js',
                    'src/index.js',
                    'src/main.js'
                ],
                dest: './prod/scripts.js'
            },
            html: {
                src: [
                    'src/index.html',
                ],
                dest: './prod/index.html'
            }
        },
        reload: {
            port: 6002,
            proxy: {
                host: 'localhost',
                port: 8000
            }
        },
        watch: {
            // scripts: {
                options: { // Live reload is now specific to this task
                    livereload: true
                },
                files: ['src/**/*.js', 'src/index.html'],
                tasks: ['concat', 'reload']
            // }
        },
        connect: {
            testHost: {
                options: {
                    port: 8000,
                    hostname: '127.0.0.1',
                    base: './prod',
                    keepalive: true,
                    livereload: true
                }
            }
        }
        // uglify: {},
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-reload');
    grunt.registerTask('default', ['concat', 'watch']);
};

