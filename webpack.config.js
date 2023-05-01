const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/script.js', './src/style.css'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // путь к папке, куда будут сохраняться файлы после сборки
    filename: 'bundle.js', // имя собранного файла
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      // правила для обработки различных типов файлов
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // обработка JS с помощью Babel
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // обработка CSS
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // обработка изображений
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource', // обработка шрифтов
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'], // обработка HTML
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // путь к исходному HTML-файлу
    }),
  ],
};
