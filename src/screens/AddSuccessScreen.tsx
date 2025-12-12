import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, ArrowRight } from 'lucide-react-native';

export function AddSuccessScreen({ navigation }: any) {
    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center p-6">
            <View className="bg-green-100 p-6 rounded-full mb-8">
                <Check color="#16a34a" size={48} strokeWidth={3} />
            </View>

            <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Ariza muvaffaqiyatli yuborildi!
            </Text>
            <Text className="text-gray-500 text-center mb-10 text-base leading-6">
                Sizning arizangiz qabul qilindi va tez orada mas'ul xodimlar tomonidan ko'rib chiqiladi. Tabiatga befarq emasligingiz uchun rahmat! 🌿
            </Text>

            <View className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-8">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Ariza raqami:</Text>
                    <Text className="font-bold text-gray-900">#ECO-11122025-134531</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Holat:</Text>
                    <View className="bg-yellow-100 px-2 py-0.5 rounded">
                        <Text className="text-yellow-700 text-xs font-bold">Yangi</Text>
                    </View>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-500">Kategoriya:</Text>
                    <Text className="font-bold text-gray-900">Chiqindi tashlanishi</Text>
                </View>
            </View>

            <View className="w-full gap-3">
                <TouchableOpacity
                    className="w-full bg-[#37a16a] p-4 rounded-xl items-center"
                    onPress={() => navigation.navigate('MainTabs')}
                >
                    <Text className="text-white font-semibold text-lg">Asosiy sahifaga qaytish</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full bg-white border border-gray-200 p-4 rounded-xl items-center flex-row justify-center gap-2"
                    onPress={() => navigation.navigate('MainTabs', { screen: 'TabProfile' })}
                >
                    <Text className="text-gray-700 font-semibold text-lg">Arizani kuzatish</Text>
                    <ArrowRight color="#374151" size={18} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
