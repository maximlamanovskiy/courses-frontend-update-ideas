const path = {
    css: './src/**/*.css',
    html: {
        pages: './src/pages/**/*.hbs',
        components: './src/components/**/*.hbs',
        componentsPath: './src/components/'
    },
    images: './src/**/images/*',
    build: {
        root: './build/**',
        css: './build/styles/main.css',
        html: './build/*.html',
        bs: './build/',
        images: './build/images/'
    }
};

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-handlebars-layouts');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.initConfig({
        handlebarslayouts: {
            home: {
                files: {
                    [path.build.html]: path.html.pages
                },
                options: {
                    partials: [
                        path.html.components
                    ],
                    basePath: path.html.componentsPath
                }
            }
        },
        concat: {
            dist: {
                src: path.css,
                dest: path.build.css,
            },
        },
        copy: {
            main: {
                expand: true,
                flatten: true,
                src: path.images,
                dest: path.build.images,
                filter: 'isFile',
            }
        },
        watch: {
            html: {
                files: [path.html.pages, path.html.components],
                tasks: ['handlebarslayouts'],
            },
            css: {
                files: [path.css],
                tasks: ['concat'],
            },
            images: {
                files: [path.images],
                tasks: ['copy'],
            }
        },
        browserSync: {
            bsFiles: {
                src: path.build.root,
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: path.build.bs
                }
            }
        }
    });

    grunt.registerTask('build', ['handlebarslayouts', 'concat', 'copy']);
    grunt.registerTask('default', ['build', 'browserSync', 'watch']);
}