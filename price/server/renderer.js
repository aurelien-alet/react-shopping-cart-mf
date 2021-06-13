import { renderToString } from "react-dom/server";
import React from "react";
import Price from "../src/components/Price"


function template(content) {
  let scripts = `<script src="build/client/index.js"></script>`
  let page = `
    <!DOCTYPE html>
      <html lang="en">
      <body>
        <div class="content">
          <div id="root-price" class="wrap-inner">${content}</div>
        </div>
          ${scripts}
      </body>
    </html>
  `;
  return page;
}

export default async (req, res, next) => {
  const html = renderToString(<Price price={48} id={1}></Price>);

  res.send(template(html));
};
