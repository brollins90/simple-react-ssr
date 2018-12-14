import express from "express";
import path from "path";
import proxy from "http-proxy-middleware";
import renderToString from "./renderToString";

const app = express();
const port = process.env.PORT || 3000;

// Application
app.get("/", renderToString);

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
