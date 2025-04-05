/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_AMAP_KEY: string;
    readonly VITE_CACHE_TIME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}