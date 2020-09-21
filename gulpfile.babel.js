import gulp from 'gulp';
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import sass from "gulp-sass";
import purgecss from "gulp-purgecss";
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

const cssPlugins = [
  cssnano(),
  autoprefixer()
];

const paths = {
  style: {
    src: './src/scss/style.scss',
    dest: './public/css/'
  },
  script: {
    src: './src/js/script.js',
    dest: './public/js/'
  }
};

gulp.task('babel', () => {
  return gulp.src(paths.script.src)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(terser())
    .pipe(concat(
      'script.js'
    ))
    .pipe(gulp.dest(
      paths.script.dest
    ))
})

gulp.task('sass', () => {
  return gulp.src(paths.style.src)
    .pipe(sass({
      outputStyle: "compressed"
    }))
    // .pipe(postcss(
    //   cssPlugins
    // ))
    .pipe(gulp.dest(
      paths.style.dest
    ))
})

gulp.task('purgecss', () => {
  return gulp.src(paths.style.dest + 'style.css')
    .pipe(purgecss({
      content: [
        paths.page.dest + '*.html'
      ]
    }))
    .pipe(gulp.dest(
      paths.style.dest
    ))
})

gulp.task('default', () => {
  gulp.watch('./src/**', gulp.parallel(
    'babel',
    'sass'
  ))
})
