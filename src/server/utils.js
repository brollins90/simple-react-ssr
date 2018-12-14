import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const assetsFile = path.resolve(__dirname, "../../build/asset-manifest.json");

export const getAssets = () =>
    new Promise((resolve, reject) => {
        // In dev we check the dev server
        if (process.env.NODE_ENV === "development") {
            fetch("http://localhost:3001/asset-manifest.json")
                .then(res => res.json())
                .then(json => resolve(json));
        } else {
            // In prod we want the built file
            if (fs.existsSync(assetsFile)) {
                return resolve(require("../../build/asset-manifest.json"));
            } else {
                return reject(
                    "assets file is missing, make sure you run a full build"
                );
            }
        }
    });
