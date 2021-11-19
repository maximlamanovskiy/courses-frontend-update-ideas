const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { web } = require("webpack");

module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
    },

    target: "web",

    plugins: [
        new HandlebarsPlugin({
            entry: path.resolve(__dirname, "src", "pages", "*", "*.hbs"),
            output: path.resolve(__dirname, "build", "[name].html"),
            partials: [
                path.resolve(__dirname, "src", "components", "*", "*.hbs")
            ],
        }),
        new WebpackConcatPlugin({
            bundles: [
                {
                    dest: path.resolve(__dirname, "build", "styles", "main.css"),
                    src: path.resolve(__dirname, "src", "**", "*.css"),
                }
            ]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "**", "images", "*.png"),
                    to: path.resolve(__dirname, "build", "images", "[name].png"),
                }
            ]
        }),
    ],

    devServer: {
        open: true,
    },
}
