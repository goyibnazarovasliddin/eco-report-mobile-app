import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Leaf } from 'lucide-react-native';

export function SplashScreen({ navigation }: any) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center px-8">
                <View className="bg-[#37a16a] p-5 rounded-3xl mb-8 shadow-sm">
                    <Leaf color="white" size={64} strokeWidth={2} />
                </View>
                <Text className="text-4xl font-bold text-gray-900 mb-2 text-center tracking-tight">
                    EcoReport
                </Text>
                <Text className="text-gray-500 text-center text-lg leading-6 font-medium">
                    Tabiat Uchun Barchamiz Javobgarmiz
                </Text>
            </View>

            <View className="px-8 pb-8">
                <TouchableOpacity
                    className="w-full bg-[#37a16a] py-4 rounded-2xl items-center justify-center shadow-lg shadow-[#37a16a]/20"
                    onPress={() => navigation.navigate('Onboarding')}
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-bold text-lg">Boshlash</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
