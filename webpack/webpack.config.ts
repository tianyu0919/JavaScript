import * as path from "path";
import * as webpack from "webpack";
import webpackBar from "webpackbar";
console.log("webpack");

const config: webpack.Configuration = {
  mode: "production",
  // entry: "../翻转卡片/js/demo.ts",
  entry: "../翻转卡片/js/index.ts",
  experiments: { outputModule: true },
  output: {
    path: path.resolve(__dirname, "../翻转卡片/dist"),
    filename: "翻转卡片.js",
    clean: true,
    library: {
      type: "module",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // browsers: '> 0.2% and not dead, last 2 versions, Firefox ESR, Edge > 10, Opera > 10',
                      stage:0,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(js|ts|tsx)$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-typescript",
                  {
                    useBuiltIns: "usage",
                    corejs: "3",
                  },
                ],
              ],
            },
          },
        ],
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new webpackBar({
      color: "pink",
    }),
  ],
};

export default config;
