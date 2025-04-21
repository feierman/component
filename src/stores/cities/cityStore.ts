// stores/cityStore.ts
import { defineStore } from 'pinia';
import { getAMap } from '../../api/apiMethods';


const CACHE_KEY = 'amap_ip_location';
const CACHE_TIME = import.meta.env.VITE_CACHE_TIME;
interface CachedData {
    city: string;
    timestamp: number;
}

export const useCityStore = defineStore('city', {
    state: () => ({
        city: '' as string,
    }),

    actions: {
        // 获取缓存的城市数据
        async getCachedLocation(): Promise<string | null> {
            console.log('正在检查缓存...');
            const cached = localStorage.getItem(CACHE_KEY);
            if (!cached) {
                console.log('未找到缓存。');
                return null;
            }

            const { city, timestamp }: CachedData = JSON.parse(cached);
            const now = Date.now();
            console.log(`缓存时间戳: ${new Date(timestamp).toLocaleString()}, 当前时间: ${new Date(now).toLocaleString()}`);
            // 计算缓存是否过期
            const isExpired = now - timestamp > CACHE_TIME;
            if (!isExpired) {
                console.log(`缓存有效。使用缓存城市: ${city}`);
                this.city = city;  // 更新 store 状态
                return city;
            } else {
                console.log('缓存已过期。清除缓存.');
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
        },

        // 设置城市到缓存
        async setCachedLocation(city: string): Promise<void> {
            const data: CachedData = {
                city,
                timestamp: Date.now(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
            console.log(`缓存城市: ${city} 带时间戳: ${new Date(data.timestamp).toLocaleString()}`);
            this.city = city;  // 更新 store 状态
        },

        // 获取起点（先从缓存获取，如果没有缓存则从 API 获取）
        async fetchStartPoint(): Promise<string> {
            console.log('正在获取起点...');

            // 先检查缓存
            const cachedCity = await this.getCachedLocation();
            if (cachedCity) {
                console.log(`从缓存设置起点: ${cachedCity}`);
                this.city = cachedCity; // 更新 store 状态
                return cachedCity;
            }

            // 如果没有有效缓存，则从高德地图 API 获取
            console.log('没有有效的缓存。正在从高德地图 API 获取...');
            try {
                const data = await getAMap();  // 调用封装的 getAMap 函数
                console.log('API 响应:', data);


                if (data.status === '1' && data.city) {
                    await this.setCachedLocation(data.city); // 设置缓存
                    console.log(`从 API 设置起点: ${data.city}`);
                    return data.city;
                } else {
                    await this.setCachedLocation('临沂'); // 默认城市
                    console.log(`API 未返回有效的城市。默认为: 临沂`);
                    return '临沂';
                }
            } catch (error) {
                console.error('无法获取位置:', error);
                await this.setCachedLocation('临沂'); // 默认城市
                console.log(`发生错误。默认为: 临沂`);
                return '临沂';
            }
        },
    },
});
