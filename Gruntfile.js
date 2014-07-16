module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');


  grunt.initConfig({
    components_dir: 'docs/bower_components',
    dist_dir: 'docs',
    less: {
        options: {
            paths: [
                'less', '<%= components_dir %>', '<%= components_dir %>/ev-fdm/core/less'
            ]
        },
        demo: {
            options: {
                compress: true
            },
            ext: '.css',
            expand: true,
            cwd: "less",
            src: "**/*.less",
            dest: "<%= dist_dir %>/css/"
        }
    },
    copy: {
        'jquery-ui': {
            expand: true,
            cwd: '<%= components_dir %>/jquery-ui/themes/smoothness/images',
            src: '**',
            dest: '<%= dist_dir %>/images/'
        },
        'bootstrap': {
            expand: true,
            cwd: '<%= components_dir %>/bootstrap/fonts',
            src: '**',
            dest: '<%= dist_dir %>/fonts/'
        },
        'fonts': {
            expand: true,
            cwd: '<%= components_dir %>/ev-fdm/fonts',
            src: '**',
            dest: '<%= dist_dir %>/css/fonts/'
        }
    },
    exec: {
        serve: {
            cmd: 'jekyll serve --watch'
        },
        dist: {
            cmd: 'jekyll build'
        }
    },
    watch: {
        less: {
            files: 'less/*.less',
            tasks: 'less:demo'
        }
    }
  });

  grunt.registerTask('default', ['less:demo', 'copy', 'exec:dist']);
};
