// Ignore styles on server
require("ignore-styles");

// Make babel work
const babelRegister = require("babel-register");
babelRegister({
    ignore: /\/(build|node_modules)\//,
    presets: ["env", "react-app"]
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
