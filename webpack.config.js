const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [ nodeExternals() ],
  entry: resolve(__dirname, './src/index.js'),
  output: {
    path: resolve(__dirname),
    filename: 'gatsby-node.js',
    library: 'onPostBuild',
    libraryTarget: 'commonjs',
    libraryExport: 'onPostBuild'
  }
}
