// 路径: packages/api/apiConfig.ts

// API 配置
export const API_BASE_URL = '/api';
export const TIMEOUT = 10000;
export const AMAP_BASE_URL = 'https://restapi.amap.com/v3';

// 环境变量检查
export const AMAP_KEY = import.meta.env.VITE_AMAP_KEY as string | undefined;

if (!AMAP_KEY && import.meta.env.DEV) {
    console.warn('VITE_AMAP_KEY 未配置，请在 .env 文件中设置');
}