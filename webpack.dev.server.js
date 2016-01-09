const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.dev')

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
  stats: {colors: true}, // webpackのログを色付けする
  proxy: {
    '/*': 'http://localhost:8001' // /api以下にアクセスがあった場合はhttp://localhost:8080に流す
  }
}).listen(3000, 'localhost', (err, result) => {
  if (err)
    console.log(err)
  else
    console.log('Listening at localhost:3000')
})