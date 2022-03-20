export interface IEntrypoint {
    js: string[];
    mjs: string[];
    css: string[];
    svg?: string[];
}

export interface IWebpackManifest {
    filePaths: string[];
    entrypoints: {
        [key: string]: IEntrypoint;
    };
}

export interface SvgFile {
    path: string;
    content: string;
}
