const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "src", "index.js")
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: "index.html", to: "index.html" }],
        }),
    ],
};
