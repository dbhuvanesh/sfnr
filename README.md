# [Sfnr](https://srishti.bhuvaneshduvvuri.online)

## Strategic, functional, new, react boilerplate generator

```
 npx sfnr
```

A single command creates your react web application.

Navigate to your directory and install your npm dependencies

```
 npm i
```

```
 npm run start
```

## API Usage

You can also use sfnr programmatically in your Node.js applications:

```javascript
import { generateReactProject } from 'sfnr';

async function createProject() {
  const result = await generateReactProject({
    projectName: 'my-react-app',
    authorName: 'John Doe',
    targetDirectory: '/path/to/projects' // optional
  });

  if (result.success) {
    console.log(`Project created at: ${result.projectPath}`);
  } else {
    console.error(`Failed to create project: ${result.error}`);
  }
}
```
