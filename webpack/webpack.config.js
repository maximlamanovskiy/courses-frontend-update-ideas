const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
    },

    mode: "development",

    plugins: [
        new HandlebarsPlugin({
            entry: path.resolve(__dirname, "src", "pages", "*", "*.hbs"),
            output: path.resolve(__dirname, "build", "[name].html"),
            partials: [
                path.resolve(__dirname, "src", "components", "*", "*.hbs"),
            ],
        }),
        new WebpackConcatPlugin({
            bundles: [
                {
                    dest: path.resolve(__dirname, "build", "styles", "main.css"),
                    src: path.resolve(__dirname, "src", "**", "*.css"),
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "**", "images", "*.png"),
                    to: path.resolve(__dirname, "build", "images", "[name].png"),
                },
            ],
        }),
        new BrowserSyncPlugin(
            {
                host: "localhost",
                port: 3000,
                server: {baseDir: path.resolve(__dirname, "build")},
            },
            {
                reload: true,
            },
        ),
    ],
}
