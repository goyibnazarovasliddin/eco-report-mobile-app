import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, Brain } from 'lucide-react-native';

export function AddAnalysisScreen({ navigation, route }: any) {
    const { photoUri, location } = route.params;

    useEffect(() => {
        // Find me mock calculation
        const timer = setTimeout(() => {
            navigation.replace('AddSuccess');
        }, 3000); // 3 seconds analysis simulation

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
            <View className="bg-emerald-50 p-6 rounded-full mb-6 relative overflow-hidden">
                <Brain color="#37a16a" size={64} strokeWidth={1.5} />
                <View className="absolute top-0 right-0 bottom-0 left-0 bg-[#37a16a]/10" />
            </View>

            <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Sun'iy intellekt tahlil qilmoqda...
            </Text>
            <Text className="text-gray-500 text-center mb-8">
                Rasm va joylashuv ma'lumotlari o'rganilmoqda
            </Text>

            <ActivityIndicator size="large" color="#37a16a" />

            <View className="mt-8 flex-row items-center justify-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <Sparkles color="#eab308" size={16} />
                <Text className="text-gray-600 text-xs">EcoAI texnologiyasi</Text>
            </View>
        </SafeAreaView>
    );
}
