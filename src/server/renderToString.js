import App from "../app/components/App";
import { getAssets } from "./utils";
import React from "react";
import { renderToString } from "react-dom/server";

const render = async (req, res, next) => {
    const assets = await getAssets();
    const html = renderToString(<App assets={assets} />);
    // There's no way to render a doctype in React so prepend manually.
    // Also append a bootstrap script tag.
    res.send(`<!DOCTYPE html> ${html}`);
};

export default render;
