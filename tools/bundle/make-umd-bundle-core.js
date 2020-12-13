const rollupBundle = require('./rollup-bundle');

rollupBundle({
  input: 'dist/esm5_for_rollup/core/public.js',
  dest: 'dist/global/common-classes.core.umd.js',
  module: ['esm5', 'module', 'es2015'],
});
