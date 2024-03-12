module.exports = function (grunt) {
    grunt.initConfig({
        watch: [
            {
                options: {
                    // Live reload is now specific to this task
                    livereload: true
                },
                files: ['src/machine*.ts'],
                tasks: ['exec:build']
            }
        ],
        exec: {
            build: {
                cmd: 'npm run build-l'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default', ['watch']);
};
