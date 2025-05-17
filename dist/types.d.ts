export interface GeneratorOptions {
    projectName: string;
    authorName: string;
    targetDirectory?: string;
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
