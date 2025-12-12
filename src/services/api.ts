import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// For Android Emulator use 10.0.2.2, for iOS/Web use localhost
const DEV_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8000/api/v1' : 'http://localhost:8000/api/v1';

const api = axios.create({
    baseURL: DEV_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error);
    }
);

export default api;

// Mock Weather & AQI Services
// Real Weather Service (Open-Meteo)
export const fetchWeather = async (lat: number, lon: number) => {
    try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: lat,
                longitude: lon,
                current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min',
                timezone: 'auto'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Weather API Error:", error);
        throw error;
    }
};

// IQAir API Key (Get a free key from https://www.iqair.com/dashboard/api)
const IQAIR_API_KEY = '23e4b35b-7988-454b-83c1-966adbfbfb7c';

// Real AQI Service (IQAir)
export const fetchAQI = async (lat: number, lon: number) => {
    try {
        const response = await axios.get('http://api.airvisual.com/v2/nearest_city', {
            params: {
                lat: lat,
                lon: lon,
                key: IQAIR_API_KEY
            }
        });

        const data = response.data.data;

        // Transform IQAir data to match our app's expected structure
        return {
            current: {
                us_aqi: data.current.pollution.aqius,
                pm2_5: data.current.pollution.aqius, // IQAir free tier might not separate pm2.5/pm10 in 'pollution' object easily, mapping main AQI to pm2.5 as proxy or check docs.
                // Note: IQAir free tier gives main pollutant AQI. 
                // For better mapping we'd need more granular data, but let's map available fields.
                // For now, let's just mapped what we can.
                // IQAir response: data.current.pollution = { ts, aqius, mainus, aqicn, maincn }

                // Let's rely on us_aqi for the main display.
                // We'll mock specific pollutants if missing or just leave undefined and handle in UI.
                pm10: 0, // Not always available in basic response
                nitrogen_dioxide: 0,
                ozone: 0,
                humidity: data.current.weather.hu // Added humidity from IQAir
            }
        };
    } catch (error) {
        console.error("AQI API Error (IQAir):", error);
        // Fallback or rethrow. 
        // If key is invalid, this will fail.
        throw error;
    }
};

export const getWeatherDescription = (code: number) => {
    switch (code) {
        case 0: return 'Ochiq havo';
        case 1:
        case 2:
        case 3: return 'Bulutli';
        case 45:
        case 48: return 'Tuman';
        case 51:
        case 53:
        case 55: return 'Yengil yomg\'ir';
        case 61:
        case 63:
        case 65: return 'Yomg\'ir';
        default: return 'Ochiq havo';
    }
};

export const getAQIDescription = (aqi: number) => {
    if (aqi <= 50) return { status: 'Yaxshi', color: 'bg-green-500', text: 'text-green-700', advice: 'Havo toza, sayr qilish uchun ajoyib vaqt!' };
    if (aqi <= 100) return { status: 'O\'rtacha', color: 'bg-yellow-500', text: 'text-yellow-700', advice: 'Sezgir kishilar uchun noqulay bo\'lishi mumkin.' };
    if (aqi <= 150) return { status: 'Nosog\'lom', color: 'bg-orange-500', text: 'text-orange-700', advice: 'Niqob taqish tavsiya etiladi.' };
    return { status: 'Xavfli', color: 'bg-red-500', text: 'text-red-700', advice: 'Ko\'chaga chiqmang!' };
};

export const getWeatherRecommendation = (code: number, temp: number) => {
    if (code >= 51) return 'Soyabon olishni unutmang!';
    if (temp > 30) return 'Ko\'proq suyuqlik iching, quyoshdan saqlaning.';
    if (temp < 5) return 'Issiq kiyining.';
    return 'Ob-havo ajoyib!';
};
