import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Sun, Cloud, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react-native';
import { getWeatherDescription, getWeatherRecommendation } from '../services/api';

export function WeatherDetailScreen({ navigation, route }: any) {
    const { weather, locationName } = route.params || {};

    // Fallback if accessed without params
    const current = weather?.current || { temperature_2m: 24, weather_code: 0, wind_speed_10m: 10, relative_humidity_2m: 40, apparent_temperature: 26 };
    const daily = weather?.daily || { time: [], temperature_2m_max: [], temperature_2m_min: [], weather_code: [] };

    const description = getWeatherDescription(current.weather_code);
    const recommendation = getWeatherRecommendation(current.weather_code, current.temperature_2m);

    const getIcon = (code: number, size = 24, color = "black") => {
        if (code === 0) return <Sun color={color} size={size} />;
        if (code >= 1 && code <= 3) return <Cloud color={color} size={size} />;
        if (code >= 51) return <CloudRain color={color} size={size} />;
        return <Sun color={color} size={size} />;
    };

    const getColor = (temp: number) => {
        if (temp <= 0) return 'bg-blue-500 shadow-blue-200';
        if (temp <= 15) return 'bg-cyan-500 shadow-cyan-200';
        if (temp <= 25) return 'bg-green-500 shadow-green-200';
        if (temp <= 35) return 'bg-orange-500 shadow-orange-200';
        return 'bg-red-500 shadow-red-200';
    };

    const cardColor = getColor(current.temperature_2m);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl" activeOpacity={0.8}>
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Ob-havo tafsilotlari</Text>
            </View>

            <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
                {/* Current Weather Card */}
                <View className={`${cardColor} rounded-3xl p-6 mb-6 shadow-lg`}>
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-white/80 text-lg">{locationName || 'Toshkent'}</Text>
                            <Text className="text-white font-bold text-5xl mt-2">{Math.round(current.temperature_2m)}°</Text>
                            <Text className="text-white text-xl mt-1">{description}</Text>
                        </View>
                        {getIcon(current.weather_code, 64, "white")}
                    </View>
                    <View className="flex-row gap-6 mt-6 bg-white/20 p-4 rounded-2xl">
                        <View className="items-center flex-1">
                            <Wind color="white" size={20} />
                            <Text className="text-white/80 text-xs mt-1">Shamol</Text>
                            <Text className="text-white font-bold">{current.wind_speed_10m} km/s</Text>
                        </View>
                        <View className="w-0.5 bg-white/30" />
                        <View className="items-center flex-1">
                            <Thermometer color="white" size={20} />
                            <Text className="text-white/80 text-xs mt-1">Sezilish</Text>
                            <Text className="text-white font-bold">{Math.round(current.apparent_temperature || current.temperature_2m)}°</Text>
                        </View>
                    </View>
                </View>

                {/* AI Recommendation */}
                <View className="bg-gray-50 p-5 rounded-2xl border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-bold mb-2 flex-row items-center">
                        🤖 AI Tavsiyasi
                    </Text>
                    <Text className="text-gray-600 leading-5">
                        {recommendation}
                    </Text>
                </View>

                {/* Weekly Forecast */}
                <Text className="text-lg font-bold text-gray-900 mb-4">Haftalik prognoz</Text>
                <View className="gap-3 mb-8">
                    {daily.time.slice(0, 7).map((date: string, index: number) => {
                        const dayName = new Date(date).toLocaleDateString('uz-UZ', { weekday: 'long' });
                        const isToday = index === 0;
                        return (
                            <View key={date} className="flex-row items-center justify-between bg-white border border-gray-100 p-4 rounded-xl">
                                <Text className={`w-24 ${isToday ? 'font-bold text-blue-600' : 'text-gray-600'}`}>{isToday ? 'Bugun' : dayName}</Text>
                                <View className="flex-row items-center gap-2 flex-1 justify-center">
                                    {getIcon(daily.weather_code[index], 20, "#6b7280")}
                                    <Text className="text-gray-500 text-xs">{getWeatherDescription(daily.weather_code[index])}</Text>
                                </View>
                                <Text className="text-gray-900 font-bold w-12 text-right">
                                    {Math.round(daily.temperature_2m_max[index])}° <Text className="text-gray-400 text-xs">/ {Math.round(daily.temperature_2m_min[index])}°</Text>
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
