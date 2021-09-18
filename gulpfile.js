const gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
const cleancss = require("gulp-clean-css");
var rename = require('gulp-rename');
const del = require("del");

gulp.task("scss", () => {
  return gulp
    .src("scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/css/"));
});

gulp.task("clean", () => {
  return del(["./public/css/main.css","./public/css/main.min.css"]);
});

gulp.task("minify-css",() => {
  return gulp
    .src("./public/css/main.css")
    .pipe(
      cleancss({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log('/main.min.css: ' + `${details.stats.minifiedSize}`);
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./public/css/"));
});

gulp.task("watch", () => {
  gulp.watch("scss/main.scss", (done) => {
    gulp.series(["clean", "scss","minify-css"])(done);
  });
});
gulp.task("default", gulp.series(["clean", "scss", "minify-css", "watch"]));
