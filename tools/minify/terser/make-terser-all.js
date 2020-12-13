const makeTerser = require('./make-terser');

makeTerser('dist/global/common-classes.umd.js', {
  format: {
    comments: false,
  }
});
