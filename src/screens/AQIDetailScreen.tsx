import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Wind, AlertTriangle, ShieldCheck, Activity } from 'lucide-react-native';
import { getAQIDescription } from '../services/api';

export function AQIDetailScreen({ navigation, route }: any) {
    const { aqiData, locationName } = route.params || {};

    const currentAQI = aqiData?.current?.us_aqi || 42;
    const { status, color, text, advice } = getAQIDescription(currentAQI);
    const pollutants = {
        pm10: aqiData?.current?.pm10 || 20,
        pm2_5: aqiData?.current?.pm2_5 || 12,
        no2: aqiData?.current?.nitrogen_dioxide || 5,
        o3: aqiData?.current?.ozone || 30,
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl">
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Havo sifati (AQI)</Text>
            </View>

            <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
                {/* Main AQI Card */}
                <View className={`${color.replace('bg-', 'bg-')}/10 p-6 rounded-3xl mb-6 items-center border-2 ${text.replace('text-', 'border-').replace('700', '200')}`}>
                    <Text className="text-gray-600 mb-2">{locationName || "Hozirgi joylashuv"}</Text>
                    <Text className={`text-6xl font-bold ${text} mb-2`}>{currentAQI}</Text>
                    <View className={`${color} px-4 py-1 rounded-full mb-4`}>
                        <Text className="text-white font-bold">{status}</Text>
                    </View>
                    <Text className="text-center text-gray-600 text-sm">
                        AQI indeksi 0 dan 500 gacha. Pastroq qiymat toza havoni anglatadi.
                    </Text>
                </View>

                {/* AI Recommendation */}
                <View className="bg-gray-50 p-5 rounded-2xl border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
                        🤖 AI Tavsiyasi va Xulosa
                    </Text>
                    <Text className="text-gray-600 leading-5 mb-3">
                        {advice}
                    </Text>
                    <View className="flex-row gap-2">
                        {currentAQI > 100 ? (
                            <View className="flex-row items-center gap-1 bg-red-100 px-2 py-1 rounded-lg">
                                <AlertTriangle size={14} color="#b91c1c" />
                                <Text className="text-red-700 text-xs">Niqob taqing</Text>
                            </View>
                        ) : (
                            <View className="flex-row items-center gap-1 bg-green-100 px-2 py-1 rounded-lg">
                                <ShieldCheck size={14} color="#15803d" />
                                <Text className="text-green-700 text-xs">Xavfsiz</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Pollutants Grid */}
                <Text className="text-lg font-bold text-gray-900 mb-4">Ifloslantiruvchi moddalar</Text>
                <View className="flex-row flex-wrap gap-4 mb-8">
                    <View className="bg-gray-50 p-4 rounded-2xl w-[47%]">
                        <Text className="text-gray-500 text-xs mb-1">PM2.5</Text>
                        <Text className="text-gray-900 font-bold text-lg">{pollutants.pm2_5} <Text className="text-xs font-normal text-gray-400">µg/m³</Text></Text>
                    </View>
                    <View className="bg-gray-50 p-4 rounded-2xl w-[47%]">
                        <Text className="text-gray-500 text-xs mb-1">PM10</Text>
                        <Text className="text-gray-900 font-bold text-lg">{pollutants.pm10} <Text className="text-xs font-normal text-gray-400">µg/m³</Text></Text>
                    </View>
                    <View className="bg-gray-50 p-4 rounded-2xl w-[47%]">
                        <Text className="text-gray-500 text-xs mb-1">Azot dioksidi</Text>
                        <Text className="text-gray-900 font-bold text-lg">{pollutants.no2} <Text className="text-xs font-normal text-gray-400">µg/m³</Text></Text>
                    </View>
                    <View className="bg-gray-50 p-4 rounded-2xl w-[47%]">
                        <Text className="text-gray-500 text-xs mb-1">Ozon</Text>
                        <Text className="text-gray-900 font-bold text-lg">{pollutants.o3} <Text className="text-xs font-normal text-gray-400">µg/m³</Text></Text>
                    </View>
                </View>

                {/* Health Impact Info */}
                <Text className="text-lg font-bold text-gray-900 mb-4">Salomatlikka ta'siri</Text>
                <View className="gap-3 mb-8">
                    <View className="flex-row gap-3">
                        <View className="w-2 h-full bg-green-500 rounded-full" />
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900">0 - 50 (Yaxshi)</Text>
                            <Text className="text-gray-500 text-xs">Havo sifati qoniqarli, xavf deyarli yo'q.</Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3">
                        <View className="w-2 h-full bg-yellow-500 rounded-full" />
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900">51 - 100 (O'rtacha)</Text>
                            <Text className="text-gray-500 text-xs">Sezgir kishilar uchun ozgina xavf bo'lishi mumkin.</Text>
                        </View>
                    </View>
                    <View className="flex-row gap-3">
                        <View className="w-2 h-full bg-orange-500 rounded-full" />
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900">101 - 150 (Nosog'lom)</Text>
                            <Text className="text-gray-500 text-xs">Bolalar va qariyalar faollikni kamaytirishi kerak.</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
