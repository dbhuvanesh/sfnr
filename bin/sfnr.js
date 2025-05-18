#!/usr/bin/env node

// This is a CommonJS wrapper for the sfnr CLI
// It helps ensure compatibility with different Node.js environments

// Set an environment variable to indicate this is being run as a CLI
// This helps the module distinguish between being required/imported vs run directly
process.env.SFNR_CLI_MODE = 'true';

// Simply execute the ESM module
import('../dist/index.js').catch(err => {
  console.error('Error starting SFNR CLI:', err);
  process.exit(1);
});
