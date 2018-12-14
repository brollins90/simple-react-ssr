// Ignore styles on server
require("ignore-styles");

// Make babel work
const babelRegister = require("@babel/register");
babelRegister({
    ignore: [/\/(build|node_modules)\//],
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
    ]
});

// Add hot reloading to the server
const production = process.env.NODE_ENV === "production";
if (!production) {
    if (
        !require("piping")({
            hook: true,
            ignore: /(\/\.|~$|\.json|\.scss$)/i
        })
    ) {
        return;
    }
}

// And go..
require("../src/server/index");
