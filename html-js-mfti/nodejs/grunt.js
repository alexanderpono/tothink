package.json
=
{
    "author": "Geol",
    "name": "myProject",
    "version": "0.0.1",
    "devDependencies" : {
        "grunt" : ">= 0.4",
        "grunt-cli":">= 0.1.6",
        "grunt-contrib-cssmin":">=0.5.0",
        "grunt-contrib-uglify":">=0.2.0",
        "grunt-contrib-concat":">=0.1.3",
        "grunt-contrib-jshint":"~0.10.0",
        "grunt-contrib-watch":"*",
        "grunt-contrib-imagemin": "^0.7.1",
        "grunt-contrib-watch": "^0.6.1"
    }
}
$ npm install grunt-contrib-stylus --save-dev
$ npm install grunt-contrib-watch --save-dev
$ npm install grunt-contrib-connect --save-dev

Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig(
        jshint: {
            all: [ 'Gruntfile.js', 'index.js', 'main.js', 'app/*.js']
        },
        concat: {
            main: {
                src: [
                    'lib/*.js',
                    'app/*.js',
                    'index.js'
                    'main.js
                ],
                dest: 'scripts.js'
            },
            options: {
                separator: ';'
            }
        },
        uglify: {
            main: {
                files: {
                    'scripts.min.js': 'scripts.js'
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/min/'
                }],
                files: {
                'dist/img.png': 'src/img.png',
                    'dist/img.jpg': 'src/img.jpg',
                    'dist/img.gif': 'src/img.gif'
                }

            },
        },
        stylus: {
            compile: {
                files: {
                    'css/main.css': 'stylus/main.styl',
                    'css/users.css': 'stylus/users.styl',
                    'css/bandsmain.css': 'stylus/bands.styl'
                }
            }
        },
        stylus: {
            compile: {
                files: {
                    'css/all.css': ['stylus/*.styl'];
                }
            }
        },
        stylus: {
            compile: {
                options: {
                    paths: ['path/to/import', 'another/to/import'],
                        urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                    use: [
                        require('fluidity') // use stylus plugin at compile time
                    ],
                    import: [    // @import 'foo', 'bar/moo', etc. into e very .styl file
                        'foo',   // that is compiled. These might be findable based on values you gave
                        'bar/moo' // to `paths`, or a plugin you added under `use`
                    ]
                },
            files: {
                    'path/to/result.css': 'path/to/source.styl', // 1:1 compile
                    'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.styl'] //compile and concat into single file
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                    tasks
            :
                ['concat', 'uglify']
            }
        },
        watch: {
            scripts: {
                files: '**/*.js',
                tasks: ['generateFileManifest'],
                options: {
                    event: ['added', 'deleted'], //‘changed’, ‘added’,’delete’, ‘all’.
                },
            },
        },
        connect: {
            testHost: {
                options: {
                    port: 8000,
                    hostname: '127.0.0.1',
                    base: 'C:\Users\Geol\node\grunt',
                    keepalive: true,
                }
            }
        }
        ............
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'stylus']);
};

