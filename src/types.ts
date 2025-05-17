export interface GeneratorOptions {
  projectName: string;
  authorName: string;
  targetDirectory?: string;
  installDependencies?: boolean;
  initGit?: boolean;
}

export interface GeneratorResult {
  success: boolean;
  projectPath?: string;
  message?: string;
  error?: string;
}

export interface ProjectFiles {
  [key: string]: string;
}
