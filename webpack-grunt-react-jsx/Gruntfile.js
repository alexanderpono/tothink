module.exports = function(grunt) {
    grunt.initConfig({
        // jshint: {},
        concat: {
            css: {
                src: [
                    'src/css/*.css'
                    // ,
                    // 'src/app/*.js',
                    // 'src/index.js',
                    // 'src/main.js'
                ],
                dest: './www/all.css'
                // dest: '/d/og/ns/ns/www/all.css'
            },
            js: {
                src: [
                    // 'src/lib/*.js',
                    // 'src/app/*.js',
                    'src/index.js'
                    // 'src/main.js'
                ],
                dest: './www/scripts.js'
            }
            // ,
            // html: {
            //     src: [
            //         'src/index.html',
            //     ],
            //     dest: './prod/index.html'
            // }
        },
        watch: {
            css: {
                // options: { // Live reload is now specific to this task
                //     livereload: true
                // },
                files: ['src/css/*.css'], //, 'src/index.html'
                tasks: ['concat:css']
            }
            ,
            configFiles: {
                files: [ 'Gruntfile.js'],
                options: {
                    reload: true
                }
            }
            ,
            runJS: {
                files: [ 'src/run.js'],
                tasks: ['run:ls']
            }
        }
        ,
        run: {
            ls: {
              exec: 'ls',
            }
        }        
        //,
        // connect: {
        //     testHost: {
        //         options: {
        //             port: 8000,
        //             hostname: '127.0.0.1',
        //             base: './prod',
        //             keepalive: true,
        //             livereload: true
        //         }
        //     }
        // }
        // uglify: {},
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-run');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    // grunt.loadNpmTasks('grunt-reload');
    grunt.registerTask('default', ['watch']);
    // grunt.registerTask('buildCSS1', ['buildCSS']);
};

