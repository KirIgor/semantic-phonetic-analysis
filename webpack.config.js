"use strict";

const path = require("path");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  plugins: [
    new CKEditorWebpackPlugin({
      // The main language that will be built into the main bundle.
      language: "ru"

      // Additional languages that will be emitted to the `outputDirectory`.
      // This option can be set to an array of language codes or `'all'` to build all found languages.
      // The bundle is optimized for one language when this option is omitted.
      // additionalLanguages: ["ru"]

      // An optional directory for emitted translations. Relative to the webpack's output.
      // Defaults to `'translations'`.
      // outputDirectory: 'ckeditor5-translations',

      // Whether the build process should fail if an error occurs.
      // Defaults to `false`.
      // strict: true,

      // Whether to log all warnings to the console.
      // Defaults to `false`.
      // verbose: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
    // Other webpack plugins...
  ],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag"
            }
          },
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
              },
              minify: true
            })
          }
        ]
      }
    ]
  },

  // Useful for debugging.
  devtool: "source-map",

  // By default webpack logs warnings if the bundle is bigger than 200kb.
  performance: { hints: false }
};
