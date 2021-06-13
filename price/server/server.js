import express from "express";
import path from 'path'
import React from "react";
import initMiddleware from "./middleware";

const app = express();

// Serving static files
app.use('/build', express.static(path.resolve(__dirname, "..")));

const done = () => {
  app.listen(4003, () => {
    console.log(`Server is listening on port: 4003`);
  });
};

initMiddleware(express, app, done);
