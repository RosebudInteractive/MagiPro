module.exports = {
  entry: __dirname + "/client.js",
  output: {
    path: __dirname + "/static",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
}