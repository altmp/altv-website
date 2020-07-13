const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../public/'),
    historyApiFallback: true,
    overlay: true
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
})
