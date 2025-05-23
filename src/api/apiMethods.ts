// packages/api/apiMethods.ts
// api 方法
import api from './axiosInstance';
import {API_ENDPOINTS} from "./apiEndpoints";
import axios from "axios";

// Define types
interface Province {
    code: string;
    name: string;
}

interface ApiResponse {
    status: number;
    body: {
        code: number;
        message: string;
        data: Province[];
        meta: null;
    };
}

interface AMapResponse {
    status: string;
    info: string;
    province: string;
    city: string;
    // Add other fields as needed
}
const AMAP_KEY = import.meta.env.VITE_AMAP_KEY as string;
// 获取高德地图数据
export const getAMap = async () => {
    try {
        const response = await axios.get('https://restapi.amap.com/v3/ip', {
            params: {
                key: AMAP_KEY,
                output: 'json',
            },
        });
            return response.data;
    } catch (error) {
        console.error('无法获取高德地图数据:', error);
        throw error;
    }
};

// 获取省份数据
// Get provinces data
export const getProvinces = async (): Promise<ApiResponse> => {
    try {
        return await api.get(API_ENDPOINTS.provinces); // response is already response.data due to interceptor
    } catch (error) {
        console.error('无法获取省份数据:', error);
        throw error;
    }
};