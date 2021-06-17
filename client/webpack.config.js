module.exports = {
  entry: [
    './index.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  module: {
      loaders: [
          {
              test: /(\.js|\.jsx)$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: { presets: ['es2015', 'react'] }
          },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
      ]
  },
  output: {
      filename: "index_bundle.js",
      path: __dirname + '/dist'
  }
}