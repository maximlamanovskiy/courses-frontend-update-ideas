const { src, dest, watch, parallel, series } = require('gulp');
const handlebars = require('gulp-static-handlebars');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


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
        css: './build/styles/',
        html: './build/',
        images: './build/images/'
    }
};

function html() {
    return src(path.html.pages)
    .pipe(handlebars({}, {partials: src(path.html.components)}))
    .pipe(rename({
        dirname: '.',
        extname: '.html'
    }))
    .pipe(dest(path.build.html))
}

function css() {
    return src(path.css)
    .pipe(concat('main.css'))
    .pipe(dest(path.build.css))
}

function images() {
    return src(path.images)
    .pipe(rename({
        dirname: '.'
    }))
    .pipe(dest(path.build.images));
}

function watchChanges() {
    watch(path.html.pages, html);
    watch(path.html.components, html);
    watch(path.css, css);
    watch(path.images, images);
}

function browserSyncWatch() {
    browserSync.init({
        server: {
            baseDir: path.build.html
        }
    });
    watch(path.build.root).on('change', browserSync.reload)
}

exports.build = parallel(html, css, images)
exports.default = series(parallel(html, css, images), parallel(watchChanges, browserSyncWatch))