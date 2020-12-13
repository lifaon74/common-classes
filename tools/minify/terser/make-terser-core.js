const makeTerser = require('./make-terser');

makeTerser('dist/global/common-classes.core.umd.js', {
  format: {
    comments: false,
  }
});
