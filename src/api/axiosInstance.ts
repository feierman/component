//路径 packages/api/axiosInstance.ts
//axios 实例配置
import axios from 'axios';
import { API_BASE_URL, TIMEOUT } from './apiConfig';

// 创建 axios 实例
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: TIMEOUT, // 设置请求超时
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // 假设从本地存储获取认证令牌
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 添加认证头部
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        if (response.data.success) {
            return response.data.data; // 返回接口数据
        } else {
            return Promise.reject(new Error('Response data error'));
        }
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error); // 错误处理
    }
);

export default api;
