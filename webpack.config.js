/* eslint-env node */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // Each entry in here declares a file that needs to be transpiled
    // and included in the extension source.
    grade_page_remover: './src/grades.js',
    assignment_page_remover: './src/assignment.js',
    indev_assignment_page_remover: './src/individual_assignment.js',
    ecs_page_remover: './src/ecs.js'
  },
  output: {
    // This copies each source entry into the extension dist folder named
    // after its entry config key.
    path: path.join(__dirname, 'extension', 'dist'),
    filename: '[name].js',
  },
  // This will expose source map files so that errors will point to your
  // original source files instead of the transpiled files.
  devtool: 'source-map',
  mode: "development"
};