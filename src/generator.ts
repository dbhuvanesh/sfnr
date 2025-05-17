import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { GeneratorOptions, GeneratorResult, ProjectFiles } from "./types.js";

// Get the directory path of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateReactProject = async ({
  projectName,
  authorName,
  targetDirectory = process.cwd(),
  installDependencies = true,
  initGit = true
}: GeneratorOptions): Promise<GeneratorResult> => {
  try {
    const projectPath = path.join(targetDirectory, projectName);
    await fs.promises.mkdir(projectPath, { recursive: true });
    
    // Store original directory to return to later
    const originalDir = process.cwd();
    
    // Change into project directory
    process.chdir(projectPath);

    await createDirectories();
    await createFiles({ projectName, authorName });

    // Initialize Git repository
    if (initGit) {
      try {
        console.log("Initializing Git repository...");
        execSync("git init -b main", { stdio: "ignore" });
        console.log("Git repository initialized with main branch.");
      } catch (error) {
        console.warn("Failed to initialize Git repository:", error);
      }
    }

    // Install dependencies
    if (installDependencies) {
      try {
        console.log("Installing dependencies...");
        execSync("npm install", { stdio: "inherit" });
        console.log("Dependencies installed successfully.");
      } catch (error) {
        console.warn("Failed to install dependencies:", error);
      }
    }

    // Return to original directory
    process.chdir(originalDir);

    return {
      success: true,
      projectPath,
      message: `React project '${projectName}' created successfully${initGit ? " with Git initialization" : ""}${installDependencies ? " and dependencies installed" : ""}`
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

const createDirectories = async (): Promise<void> => {
  await fs.promises.mkdir("public", { recursive: true });
  await fs.promises.mkdir("src", { recursive: true });
  await fs.promises.mkdir("src/pages", { recursive: true });
};

const loadTemplateFile = async (templatePath: string): Promise<string> => {
  try {
    // Templates are stored relative to the 'templates' directory
    const fullPath = path.join(__dirname, '../templates', templatePath);
    return await fs.promises.readFile(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Error loading template ${templatePath}:`, error);
    throw error;
  }
};

const processTemplate = (content: string, variables: Record<string, string>): string => {
  let processedContent = content;
  
  // Replace all variables in the format {{variableName}}
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    processedContent = processedContent.replace(regex, value);
  }
  
  return processedContent;
};

const createFiles = async ({ projectName, authorName }: Omit<GeneratorOptions, 'targetDirectory'>): Promise<void> => {
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

  const files: ProjectFiles = {};

  // Load each template and process it with variables
  for (const [filePath, templatePath] of Object.entries(templateMappings)) {
    try {
      const templateContent = await loadTemplateFile(templatePath);
      files[filePath] = processTemplate(templateContent, variables);
    } catch (error) {
      console.error(`Failed to load template for ${filePath}:`, error);
      throw error;
    }
  }

  // Write processed files to disk
  for (const [filePath, content] of Object.entries(files)) {
    await fs.promises.writeFile(filePath, content);
  }
};
