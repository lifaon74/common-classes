const makeUglify = require('./make-uglify');

makeUglify('dist/global/common-classes.esnext.umd.js', {
  compress: {
    inline: false
  },
});
