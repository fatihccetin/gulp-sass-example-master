const gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
const cleancss = require("gulp-clean-css");
var rename = require('gulp-rename');
const del = require("del");

gulp.task("scss", () => {
  return gulp
    .src("scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css/"));
});

gulp.task("clean", () => {
  return del(["./css/style.css","./css/style.min.css"]);
});
gulp.task("minify-css",() => {
  return gulp
    .src("./css/style.css")
    .pipe(
      cleancss({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log('/style.min.css: ' + `${details.stats.minifiedSize}`);
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("./css/"));
});

gulp.task("watch", () => {
  gulp.watch("scss/style.scss", (done) => {
    gulp.series(["clean", "scss","minify-css"])(done);
  });
});
gulp.task("default", gulp.series(["clean", "scss", "minify-css", "watch"]));
