var gulp = require('gulp'),
	rename = require("gulp-rename"),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
    uglyfly = require('gulp-uglyfly'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence'),
    ghelp = require('gulp-showhelp'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    filter = require('gulp-filter');

var cssDestPath = './../assets/css';

// Sprites
var spritesGroup = {
    chunksMask: '**/*.png',
    chunksMaskRetina: '**/*2x.png',
    cssBuiltDir: './../assets/_src/scss/sprites', // Relative paths also supports, eg: ../assets
    imgBuiltDir: './../assets/images/sprites-built', // eg: /sprite-one.png && /sprite-one-2x.png
    imgBuiltDirCss: './../images/sprites-built' // eg: /sprite-one.png && /sprite-one-2x.png
};

/**
 * @param spritesPath Относительный путь до директории со спрайтами. Используйте вложенность /sprites/main для создания файла спрайтов main.png
 * @param {*} png8b true|false|jpg-70 Использовать png8b или jpg со сжатием
 * @param disableRetina Отключить поиск retina-вариантов изображений
 * @param spriteNamePrefix Префикс для перменных спрайтов
 * @param subDirectory Поддиректория для конечных файлов стилей спрайтов. Удобно для создания mobile и desktop версий спрайтов
 * @returns {string}
 */
function spritesTaskCreate(spritesPath, png8b, disableRetina, spriteNamePrefix, subDirectory) {
    var waiteForOptimizer = false;

    var spriteName = path.basename(spritesPath),
        taskName = 'sprites-' + spritesPath,
        quality = typeof png8b === 'string' ? png8b : '100'; // set quality as '70-80' string

    var format = '.png';

    if (String(png8b).indexOf('jpg') != -1) {
        format = '.jpg';
        quality = String(png8b).split('-')[1] || 90;
        png8b = false
    }

    gulp.task(taskName, function(taskDone) {
        var imagemin = require('gulp-imagemin');
        var pngquant = require('imagemin-pngquant');
        var spritesmith = require('gulp.spritesmith');
        var defaults = require('lodash.defaults');
        var spritesSizeNormalizer = require('gulp-retina-sprites-normalizer');

        var replaceDotRegexp = new RegExp('@+');

        var imgName = spriteName + format,
            retinaImgName = spriteName + '-2x' + format,
            cssName = spriteName + '.scss';

        var winPathRegex = /\\+/g;

        subDirectory = subDirectory || '';

        var imgBuiltDirCss = path.join(spritesGroup.imgBuiltDirCss, subDirectory, imgName).replace(winPathRegex, '/'),
            retinaImgBuiltDirCss = path.join(spritesGroup.imgBuiltDirCss, subDirectory, retinaImgName).replace(winPathRegex, '/');

        var spritesStream = gulp.src(path.join(spritesPath, spritesGroup.chunksMask));

        if (!disableRetina) {
            spritesStream = spritesStream.pipe(spritesSizeNormalizer())
        }

        spritesStream = spritesStream.pipe(
            spritesmith(
                defaults(
                    {
                        padding: 4,
                        imgPath: imgBuiltDirCss,
                        cssName: cssName,
                        imgName: imgName,
                        cssVarMap: function (sprite) {
                            sprite.name = (spriteNamePrefix || '') + sprite.name.replace(replaceDotRegexp, '-')
                        }
                    },
                    !disableRetina &&
                    {
                        retinaSrcFilter: path.join(spritesPath, spritesGroup.chunksMaskRetina),
                        retinaImgPath: retinaImgBuiltDirCss,
                        retinaImgName: retinaImgName
                    },
                    format === '.jpg' &&
                    {
                        imgOpts: {quality: quality}
                    }
                )
            )
        );

        spritesStream.css.pipe(gulp.dest(path.join(spritesGroup.cssBuiltDir, subDirectory)));

        var spriteImageDest = path.join(spritesGroup.imgBuiltDir, subDirectory);

        var imagesCompletePromise = new Promise(function (resolve) {
            spritesStream.img.pipe(gulp.dest(spriteImageDest).on('end', resolve))
        });

        imagesCompletePromise.then(function () {
            gulp.src([path.join(spriteImageDest, imgName), path.join(spriteImageDest, retinaImgName)])
                .pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    optimizationLevel: 5,
                    use: png8b && [pngquant({quality: quality, speed: 4, nofs: true})]
                }))
                .pipe(gulp.dest(spriteImageDest).on('end', function () {
                    waiteForOptimizer && taskDone()
                }))
        });

        if (!waiteForOptimizer) {
            return spritesStream
        }
    });

    return taskName
}

/**
 * Makes wildecard path. From ../some/sub/path to ..\/**\/**\/**
 * @param wildeCardPath Path
 * @param suffix Path suffix
 */
function pathWildeCard(wildeCardPath, suffix) {
    return path.join(path.normalize(wildeCardPath).replace(/([\/\\])[^\/\\]+/ig, '$1**'), suffix || '')
}

function cssAddSuffix(suffix, path) {
    path.extname === '.css' && (path.basename += suffix)
}

gulp.task('build-sprites', function () {
    return runSequence(
        // Спрайты для main бандла десктоп и мобайл версия, префикс переменной icon-, retina
        spritesTaskCreate('./../assets/_src/images/sprites/desktop/main', false, false, 'icon-', 'desktop'),

        // Спрайты для илююстраций, retina отключена, общий файл спрайтов, префик перменной illustration-
        spritesTaskCreate('./../assets/_src/images/sprites/desktop/illustrations', false, true, 'illustration-')
    )
});

gulp.task('css', function() {
	gulp.src(['../assets/_src/scss/main.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', sourceComments: false}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))

        .pipe(rename(cssAddSuffix.bind(this, '.min')))
        .pipe(gulp.dest(cssDestPath))
        .pipe(filter([pathWildeCard(cssDestPath, '**.css')]))

        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 version', '> 1%', 'ie >= 8', 'Firefox > 15', 'iOS >= 5', 'Android >= 2.3'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDestPath))
        .pipe(connect.reload());
});

gulp.task('lint', function () {
    return gulp.src(['../assets/_src/js/main.js', '../assets/_src/js/modules/*.js', '../assets/_src/js/libs/*.js'])
        .pipe(eslint({
            extends: 'eslint:recommended',
            ecmaFeatures: {
                'modules': true
            },
            rules: {
                strict: 1,
                semi: 2
            },
            globals: {},
            envs: {
                "jquery" : true,
                "browser" : true
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('js', function () {
    gulp.src(['../assets/_src/js/vendors/*.js', '../assets/_src/js/libs/*.js', '../assets/_src/js/modules/*.js', '../assets/_src/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglyfly())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./../assets/js'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['../assets/_src/scss/**/*.sass', '../assets/_src/scss/**/*.scss', '!../assets/_src/scss/main.sass'], ['css']);
    //gulp.watch(['../assets/_src/js/main.js', '../assets/_src/js/modules/**/*.js'], ['lint']);
    gulp.watch('../assets/_src/js/**/*.js', ['js']);
});

gulp.task('connect', function() {
    connect.server({
        host: '0.0.0.0',
        root: '../',
        livereload: true
    });
});

gulp.task('w', ['css', 'js', 'watch', 'connect']).help = '(watch) первичная сборка, линт, запуск watch';
gulp.task('s', ['build-sprites']).help = '(sprite) сборка изображений в спрайты';
gulp.task('default', function() {
    ghelp.show('w', 's');
});
