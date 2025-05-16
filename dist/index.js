#!/usr/bin/env node
import chalk from "chalk";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { generateReactProject } from './generator.js';
const runCLI = async () => {
    const rl = readline.createInterface({ input, output });
    try {
        const projectName = await rl.question(chalk.bold.whiteBright("Your project name: "));
        const authorName = await rl.question(chalk.bold.whiteBright("Your name: "));
        const result = await generateReactProject({ projectName, authorName });
        if (result.success) {
            console.log(chalk.green(result.message));
        }
        else {
            console.error(chalk.red(`Error: ${result.error}`));
        }
    }
    finally {
        rl.close();
    }
};
// Run CLI if executed directly
if (process.argv[1] === import.meta.url) {
    runCLI();
}
export { generateReactProject };
