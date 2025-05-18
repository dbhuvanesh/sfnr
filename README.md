# [Sfnr](https://srishti.bhuvaneshduvvuri.online)

## Strategic, functional, new, react boilerplate generator

```
 npx sfnr
```

A single command creates your react web application, initializes git with a main branch, and installs all dependencies.

Navigate to your directory and start your application:

```
 cd your-project-name
 npm run start
```

## CLI Usage

Run the command and follow the interactive prompts:
```
 npx sfnr
```

You'll be asked for:
- Project name
- Author name
- Whether to initialize a Git repository
- Whether to install dependencies

## API Usage

You can also use sfnr programmatically in your Node.js applications. The API mode does not show any interactive prompts:

```javascript
import { generateReactProject } from 'sfnr';

async function createProject() {
  const result = await generateReactProject({
    projectName: 'my-react-app',
    authorName: 'John Doe',
    targetDirectory: '/path/to/projects', // optional
    initGit: true, // optional (default: true)
    installDependencies: true // optional (default: true)
  });

  if (result.success) {
    console.log(`Project created at: ${result.projectPath}`);
  } else {
    console.error(`Failed to create project: ${result.error}`);
  }
}
```

# SFNR

Strategic, functional, new, React boilerplate generator with TypeScript support.

## Installation

```bash
npm install -g sfnr
```

Or use directly with npx:

```bash
npx sfnr
```

## Usage

### CLI Usage

```bash
sfnr
# Follow the prompts to create your React project
```

### Programmatic Usage

```typescript
import { generateReactProject } from 'sfnr';

async function createProject() {
  const result = await generateReactProject({
    projectName: 'my-react-app',
    authorName: 'John Doe',
    targetDirectory: '/path/to/projects', // optional
    initGit: true, // optional (default: true)
    installDependencies: true // optional (default: true)
  });

  if (result.success) {
    console.log(`Project created at: ${result.projectPath}`);
  } else {
    console.error(`Failed to create project: ${result.error}`);
  }
}
```

## Features

- TypeScript support out of the box
- React 18 with TypeScript configuration
- React Router for navigation
- Webpack configuration with Hot Module Replacement
- CSS and CSS Modules support
- ESLint and Prettier configuration
- Jest testing setup
- Automatic Git initialization
- Automatic dependency installation

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm test
```

## License

MIT
