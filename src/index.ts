#!/usr/bin/env node

import chalk from "chalk";
import { generateReactProject } from './generator.js';
import prompts from "prompts";

const runCLI = async (): Promise<void> => {
  try {
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'Your project name:',
        validate: (value: string) => value.length > 0 ? true : 'Project name is required'
      },
      {
        type: 'text',
        name: 'authorName',
        message: 'Your name:',
        validate: (value: string) => value.length > 0 ? true : 'Author name is required'
      },
      {
        type: 'confirm',
        name: 'initGit',
        message: 'Initialize Git repository?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'installDependencies',
        message: 'Install dependencies?',
        initial: true
      }
    ], {
      onCancel: () => {
        console.log(chalk.red('Project creation cancelled'));
        process.exit(0);
      }
    });
    
    const { projectName, authorName, initGit, installDependencies } = response;
    
    console.log(chalk.blue(`Creating project ${projectName}...`));
    
    const result = await generateReactProject({ 
      projectName, 
      authorName,
      initGit,
      installDependencies
    });
    
    if (result.success) {
      console.log(chalk.green(result.message));
      console.log(chalk.green(`\nTo get started with your project:`));
      console.log(chalk.white(`  cd ${projectName}`));
      
      if (!installDependencies) {
        console.log(chalk.white(`  npm install`));
      }
      
      console.log(chalk.white(`  npm run start`));
    } else {
      console.error(chalk.red(`Error: ${result.error}`));
    }
  } catch (error) {
    console.error(chalk.red(`An unexpected error occurred: ${error}`));
  }
};

// Only run CLI when the module is executed directly (not when imported)
// This fixes the issue of prompts showing when used as an API
if (import.meta.url === `file://${process.argv[1]}`) {
  runCLI();
}

export { generateReactProject };
