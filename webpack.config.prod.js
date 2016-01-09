const path = require('path')
const webpack = require('webpack')

const node_modules_dir = path.join(__dirname, 'node_modules')

const deps = [
 // 'react/dist/react.min.js',
  //'react-dom/dist/react-dom.min.js',
  //'react-addons-css-transition-group/index.js',
  //'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
  'babel-polyfill/dist/polyfill.min.js',
  'jquery/dist/jquery.min.js'
]

const noParse = []
const alias = {}

deps.forEach((dep) => {
  const depPath = path.resolve(node_modules_dir, dep)
  alias[dep.split(path.sep)[0]] = depPath
  noParse.push(depPath)
})


module.exports = {
  devtool: 'source-map',
  entry: [
    './src/entry'
  ],

  resolve: {
    alias,
    modulesDirectories: ['src', 'node_modules', 'shared']
  },

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],

  module: {
    noParse,
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
}