const makeTerser = require('./make-terser');

makeTerser('dist/global/common-classes.esnext.umd.js', {
  compress: {
    inline: false
  },
  format: {
    comments: false,
  }
});
