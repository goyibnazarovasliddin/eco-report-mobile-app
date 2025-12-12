import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Droplets, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react-native';

export function HumidityDetailScreen({ navigation, route }: any) {
    const { humidity, locationName } = route.params || {};
    const currentHumidity = humidity ?? 45;

    // Helper to determine status
    const getStatus = (h: number) => {
        if (h < 30) return { status: 'Quruq', color: 'text-red-500', bg: 'bg-red-500', icon: AlertTriangle, advice: 'Havo namligi juda past. Namlantirgichdan foydalanish tavsiya etiladi.' };
        if (h <= 60) return { status: 'Me\'yorda', color: 'text-green-500', bg: 'bg-green-500', icon: CheckCircle2, advice: 'Havo namligi ideal darajada. Hech qanday chora ko\'rish shart emas.' };
        return { status: 'Yuqori namlik', color: 'text-blue-500', bg: 'bg-blue-500', icon: Droplets, advice: 'Havo namligi yuqori. Xonani tez-tez shamollatib turing.' };
    };

    const { status, color, bg, icon: StatusIcon, advice } = getStatus(currentHumidity);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl">
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Namlik darajasi</Text>
            </View>

            <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
                {/* Main Card */}
                <View className={`${bg.replace('bg-', 'bg-')}/10 p-8 rounded-3xl mb-6 items-center border-2 ${color.replace('text-', 'border-').replace('500', '200')}`}>
                    <Text className="text-gray-600 mb-2">{locationName || "Hozirgi joylashuv"}</Text>
                    <View className="flex-row items-baseline">
                        <Text className={`text-7xl font-bold ${color} mb-2`}>{currentHumidity}</Text>
                        <Text className={`text-2xl font-bold ${color} ml-1`}>%</Text>
                    </View>
                    <View className={`${bg} px-4 py-1 rounded-full mb-4`}>
                        <Text className="text-white font-bold">{status}</Text>
                    </View>
                    <Text className="text-center text-gray-600 text-sm">
                        Optimallik darajasi: 30% - 60%
                    </Text>
                </View>

                {/* AI Recommendation */}
                <View className="bg-gray-50 p-5 rounded-2xl border border-gray-200 mb-6">
                    <Text className="text-gray-900 font-bold mb-3 flex-row items-center gap-2">
                        💡 Tavsiya va Ma'lumot
                    </Text>
                    <View className="flex-row gap-3">
                        <StatusIcon color={color.replace('text-', '').replace('-500', '') === 'red' ? '#ef4444' : color.replace('text-', '').replace('-500', '') === 'green' ? '#22c55e' : '#3b82f6'} size={24} className="mt-0.5" />
                        <Text className="text-gray-600 leading-5 flex-1">
                            {advice}
                        </Text>
                    </View>
                </View>

                {/* Info Grid */}
                <Text className="text-lg font-bold text-gray-900 mb-4">Namlik haqida</Text>
                <View className="gap-3 mb-8">
                    <View className="flex-row gap-3 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <View className="bg-red-100 p-2 rounded-full">
                            <AlertTriangle size={20} color="#ef4444" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 text-base">0% - 30% (Quruq)</Text>
                            <Text className="text-gray-500 text-xs">Teri quruqlashishi va nafas yo'llari ta'sirlanishi mumkin.</Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <View className="bg-green-100 p-2 rounded-full">
                            <CheckCircle2 size={20} color="#22c55e" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 text-base">30% - 60% (Optimal)</Text>
                            <Text className="text-gray-500 text-xs">Inson salomatligi va qulayligi uchun eng yaxshi daraja.</Text>
                        </View>
                    </View>

                    <View className="flex-row gap-3 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <View className="bg-blue-100 p-2 rounded-full">
                            <Droplets size={20} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 text-base">60%+ (Yuqori)</Text>
                            <Text className="text-gray-500 text-xs">Mog'or paydo bo'lish xavfi ortadi, nafas olish qiyinlashishi mumkin.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
