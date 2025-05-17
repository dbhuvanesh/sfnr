import fs from "node:fs";
import path from "node:path";
<<<<<<< HEAD
=======
import { fileURLToPath } from "node:url";
// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
>>>>>>> dev
export const generateReactProject = async ({ projectName, authorName, targetDirectory = process.cwd() }) => {
    try {
        const projectPath = path.join(targetDirectory, projectName);
        await fs.promises.mkdir(projectPath, { recursive: true });
        process.chdir(projectPath);
        await createDirectories();
        await createFiles({ projectName, authorName });
        return {
            success: true,
            projectPath,
            message: `React project '${projectName}' created successfully`
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
};
const createDirectories = async () => {
    await fs.promises.mkdir("public", { recursive: true });
    await fs.promises.mkdir("src", { recursive: true });
    await fs.promises.mkdir("src/pages", { recursive: true });
};
<<<<<<< HEAD
const createFiles = async ({ projectName, authorName }) => {
    const files = {
        'public/index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${projectName}</title></head><body><div class="root"></div></body></html>`,
        'src/pages/Home.tsx': `
      import React from "react";

      export default function Home(): JSX.Element {
        return (
          <div>
            <h1>Home</h1>
          </div>
        );
      }`,
        'src/index.tsx': `
      import React from "react"
      import Home from "./pages/Home"
      import { createRoot } from "react-dom/client";
      import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
      
      const container = document.querySelector(".root");
      if (!container) throw new Error("Root element not found");
      
      const root = createRoot(container);
      root.render(
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </Router>
      );`,
        '.gitignore': '/node_modules\n/dist\n*.tsbuildinfo',
        '.babelrc': JSON.stringify({
            "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
        }, null, 2),
        'package.json': JSON.stringify({
            name: projectName,
            version: "1.0.0",
            main: "./src/index.tsx",
            scripts: {
                build: "webpack",
                start: "webpack-dev-server",
                type: "check-types",
                lint: "eslint src --ext .ts,.tsx"
            },
            keywords: ["react", "typescript", "application"],
            author: authorName,
            license: "MIT",
            description: "",
            dependencies: {
                "react": "^18.3.1",
                "react-dom": "^18.3.1",
                "react-router-dom": "^6.19.0"
            },
            devDependencies: {
                "@babel/core": "^7.23.3",
                "@babel/preset-env": "^7.23.3",
                "@babel/preset-react": "^7.23.3",
                "@babel/preset-typescript": "^7.23.3",
                "@types/react": "^18.2.0",
                "@types/react-dom": "^18.2.0",
                "typescript": "^5.0.0",
                "babel-loader": "^9.1.3",
                "css-loader": "^6.8.1",
                "html-webpack-plugin": "^5.5.3",
                "style-loader": "^3.3.3",
                "webpack": "^5.89.0",
                "webpack-cli": "^5.1.4",
                "webpack-dev-server": "^4.15.1"
            }
        }, null, 2),
        'tsconfig.json': JSON.stringify({
            compilerOptions: {
                target: "ES2020",
                module: "ESNext",
                moduleResolution: "Node",
                jsx: "react",
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
                forceConsistentCasingInFileNames: true
            },
            include: ["src/**/*"],
            exclude: ["node_modules"]
        }, null, 2),
        'webpack.config.js': `
      const webpack = require("webpack");
      const path = require("path");
      const HtmlWebpackPlugin = require("html-webpack-plugin");
      
      module.exports = {
        entry: "./src/index.tsx",
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
              test: /\\.(ts|tsx|js|jsx)$/,
              use: "babel-loader",
              exclude: /node_modules/,
            },
            {
              test: /\\.css$/,
              use: ["style-loader", "css-loader"],
              exclude: /\\.module\\.css$/,
            },
            {
              test: /\\.module\\.css$/,
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
            },
          ],
        },
        resolve: {
          extensions: ['.tsx', '.ts', '.js', '.jsx']
        },
        plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
      };`
    };
=======
const loadTemplateFile = async (templatePath) => {
    try {
        // Templates are stored relative to the 'templates' directory
        const fullPath = path.join(__dirname, '../templates', templatePath);
        return await fs.promises.readFile(fullPath, 'utf-8');
    }
    catch (error) {
        console.error(`Error loading template ${templatePath}:`, error);
        throw error;
    }
};
const processTemplate = (content, variables) => {
    let processedContent = content;
    // Replace all variables in the format {{variableName}}
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        processedContent = processedContent.replace(regex, value);
    }
    return processedContent;
};
const createFiles = async ({ projectName, authorName }) => {
    // Define which templates to use for which files
    const templateMappings = {
        'public/index.html': 'public/index.html',
        'src/pages/Home.tsx': 'src/pages/Home.tsx',
        'src/index.tsx': 'src/index.tsx',
        '.gitignore': 'gitignore',
        '.babelrc': 'babelrc',
        'package.json': 'package.json',
        'tsconfig.json': 'tsconfig.json',
        'webpack.config.js': 'webpack.config.js'
    };
    const variables = {
        projectName,
        authorName
    };
    const files = {};
    // Load each template and process it with variables
    for (const [filePath, templatePath] of Object.entries(templateMappings)) {
        try {
            const templateContent = await loadTemplateFile(templatePath);
            files[filePath] = processTemplate(templateContent, variables);
        }
        catch (error) {
            console.error(`Failed to load template for ${filePath}:`, error);
            throw error;
        }
    }
    // Write processed files to disk
>>>>>>> dev
    for (const [filePath, content] of Object.entries(files)) {
        await fs.promises.writeFile(filePath, content);
    }
};
