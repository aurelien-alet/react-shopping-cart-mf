import { renderToString } from "react-dom/server";
import React from "react";
import Product from "../src/components/Product"


function template(content) {
  let scripts = `<script src="build/client/index.js"></script>`
  let page = `
    <!DOCTYPE html>
      <html lang="en">
      <body>
        <div class="content">
          <div id="root-product" class="wrap-inner">${content}</div>
        </div>
          ${scripts}
      </body>
    </html>
  `;
  return page;
}

export default async (req, res, next) => {
  const html = renderToString(<Product
    price={48}
    name={"Cucumber - 1 Kg"}
    image={"https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg"}
    id={1}
  ></Product>);

  res.send(template(html));
};
