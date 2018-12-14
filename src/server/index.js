require("ignore-styles");
const babelRegister = require("babel-register");
const proxy = require("http-proxy-middleware");

babelRegister({
    ignore: /\/(build|node_modules)\//,
    presets: ["env", "react-app"]
});

const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

// Application
if (process.env.NODE_ENV === "development") {
    app.get("/", function(req, res) {
        // In development mode we clear the module cache between each request to
        // get automatic hot reloading.
        for (var key in require.cache) {
            delete require.cache[key];
        }
        const render = require("./render").default;
        res.send(render(req.url));
    });
} else {
    const render = require("./render").default;
    app.get("/", function(req, res) {
        res.send(render(req.url));
    });
}

// Static resources
app.use(express.static(path.resolve(__dirname, "..", "..", "build")));

// Proxy everything else to create-react-app's webpack development server
if (process.env.NODE_ENV === "development") {
    app.use(
        "/",
        proxy({
            ws: true,
            target: "http://localhost:3001"
        })
    );
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.on("error", function(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
});
