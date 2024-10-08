#!/usr/bin/env node

import fs from "node:fs";
import chalk from "chalk";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { execSync } from "child_process";

const rl = readline.createInterface({ input, output });

const projectName = await rl.question(
  chalk.bold.whiteBright("Your project name: ")
);
const authorName = await rl.question(chalk.bold.whiteBright("Your name: "));

async function createProject() {
  try {
    await fs.promises.mkdir(projectName, { recursive: true });
    process.chdir(projectName);

    // Create necessary directories and files
    await fs.promises.mkdir("public", { recursive: true });
    await fs.promises.writeFile(
      "public/index.html",
      `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${projectName}</title></head><body><div class="root"></div></body></html>`
    );
    await fs.promises.mkdir("src", { recursive: true });
    await fs.promises.mkdir("src/pages", { recursive: true });
    await fs.promises.writeFile(
      "src/pages/Home.jsx",
      `
      import React from "react";

      export default function Home() {
      return (
      <div>
      <h1>Home</h1>
      </div>
      )
      }
      `
    );
    await fs.promises.writeFile(
      "src/index.jsx",
      `
      import React from "react"
import "medhya/css/medhya.css";
import Home from "./pages/Home.jsx"
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
const container = document.querySelector(".root");
const root = createRoot(container);
root.render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={<Home/>}
      />
    </Routes>
  </Router>
);
`
    );

    await fs.promises.writeFile(".gitignore", "/node_modules");
    await fs.promises.writeFile(
      ".babelrc",
      `{"presets": ["@babel/preset-env", "@babel/preset-react"]}`
    );

    await fs.promises.writeFile(
      "package.json",
      `
        {
          "name": "${projectName}",
          "version": "1.0.0",
          "main": "./src/index.jsx",
          "scripts": {
            "build": "webpack",
            "start": "webpack-dev-server"
          },
          "keywords": [
            "react",
            "typescript",
            "application"
          ],
          "author": "${authorName}",
          "license": "ISC",
          "description": "",
          "dependencies": {          
            "medhya": "^1.0.130",
            "react": "^18.3.1",
            "react-router-dom": "^6.19.0"
          },
          "devDependencies": {
            "@babel/core": "^7.23.3",
            "@babel/preset-env": "^7.23.3",
            "@babel/preset-react": "^7.23.3",
            "@babel/preset-typescript": "^7.23.3",
            "babel-loader": "^9.1.3",
            "css-loader": "^6.8.1",
            "html-webpack-plugin": "^5.5.3",
            "style-loader": "^3.3.3",
            "webpack": "^5.89.0",
            "webpack-cli": "^5.1.4",
            "webpack-dev-server": "^4.15.1"
          }
        }
        
        `
    );
    await fs.promises.writeFile(
      "webpack.config.js",
      `
      const webpack = require("webpack");
      const path = require("path");
      const HtmlWebpackPlugin = require("html-webpack-plugin");
      module.exports = {
      entry: "./src/index.jsx",
      mode: "development",
      output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      },
  devServer: {
    open: true,
    port: 5000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /.module.css$/,
      },
      {
        test: /.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /.module.css$/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
      `
    );

    // Initialize Git repository
    execSync("git init -b main");
  } catch (error) {
    console.error("Error creating project:", error);
  } finally {
    rl.close();
  }
}

createProject();
