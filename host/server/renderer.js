import { renderToString } from "react-dom/server";
import React from "react";
import App from "../src/components/App"


function template(content) {
  let scripts = `<script src="build/client/index.js"></script>`
  let page = `
    <!DOCTYPE html>
      <html lang="en">
      <body>
        <div class="content">
          <div id="root" class="wrap-inner">${content}</div>
        </div>
          ${scripts}
      </body>
    </html>
  `;
  return page;
}

export default async (req, res, next) => {
  const html = renderToString(<App></App>);

  res.send(template(html));
};
