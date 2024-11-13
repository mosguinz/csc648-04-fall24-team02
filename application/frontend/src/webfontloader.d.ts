declare module 'webfontloader' {
    export interface Config {
        custom?: {
            families: string[];
            urls: string[];
        };
        active?: () => void;
        inactive?: () => void;
    }
    export function load(config: Config): void;
}

// this file declares the webfont loader module to have pixelfy sans to work