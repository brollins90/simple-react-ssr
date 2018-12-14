import App from "../app/components/App";
import { getAssets } from "./utils";
import React from "react";
import { renderToNodeStream } from "react-dom/server";

const render = async (req, res, next) => {
    const assets = await getAssets();
    const reactNode = <App assets={assets} />;
    const componentStream = renderToNodeStream(reactNode);
    componentStream.pipe(res);
};

export default render;
