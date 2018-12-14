import React, { Component } from "react";

import "./Chrome.css";

export default class Chrome extends Component {
    render() {
        const assets = this.props.assets;

        // The vendor file does not have an easy to reference name, but it should
        // be the first code split chunk.
        let vendorFile = "";
        for (let key in assets) {
            if (vendorFile === "" && key.startsWith("static/js/1.")) {
                vendorFile = key;
                break;
            }
        }

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link rel="shortcut icon" href="favicon.ico" />
                    <link rel="stylesheet" href={assets["main.css"]} />
                    <title>{this.props.title}</title>
                </head>
                <body>
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<b>Enable JavaScript to run this app.</b>`
                        }}
                    />
                    {this.props.children}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `assetManifest = ${JSON.stringify(assets)};`
                        }}
                    />
                    {/* With CRA2 we need to inject the runtime, the vendor file and the main code */}
                    <script src={assets["runtime~main.js"]} />
                    <script src={assets[vendorFile]} />
                    <script src={assets["main.js"]} />
                </body>
            </html>
        );
    }
}
