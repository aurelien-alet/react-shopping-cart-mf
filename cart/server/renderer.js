import { renderToString } from "react-dom/server";
import React from "react";
import Cart from "../src/components/Cart"


function template(content) {
  let scripts = `<script src="build/client/index.js"></script>`
  let page = `
    <!DOCTYPE html>
      <html lang="en">
      <body>
        <div class="content">
          <div id="root-cart" class="wrap-inner">${content}</div>
        </div>
          ${scripts}
      </body>
    </html>
  `;
  return page;
}

export default async (req, res, next) => {
  const html = renderToString(<Cart 
    cartItems={[{id: 3, image: "https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg", name: "Cucumber - 1 Kg", price: 48, quantity: 1}]}>
    </Cart>);

  res.send(template(html));
};
