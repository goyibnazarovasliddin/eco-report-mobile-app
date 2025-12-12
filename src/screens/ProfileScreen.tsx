import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, FileText, HelpCircle, LogOut, ChevronRight, Trophy } from 'lucide-react-native';
export function ProfileScreen({ navigation }: any) {
    // Tab navigation is handled by TabNavigator now


    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-gray-900">Profil</Text>
                <TouchableOpacity
                    className="p-2 bg-gray-50 rounded-xl"
                    onPress={() => navigation.navigate('Settings')}
                    activeOpacity={0.8}
                >
                    <Settings color="#374151" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                {/* Profile Stats Header */}
                <View className="bg-emerald-50 px-6 py-8 items-center">
                    <View className="p-1 bg-[#37a16a] rounded-full mb-4">
                        <View className="bg-white p-5 rounded-full">
                            <User color="#37a16a" size={64} strokeWidth={2} />
                        </View>
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 mb-1">Asliddin Do'stov</Text>
                    <Text className="text-gray-600 mb-6">+998 90 123 45 67</Text>

                    <TouchableOpacity
                        className="bg-white border border-green-200 rounded-2xl px-6 py-3 flex-row items-center gap-2 shadow-sm"
                        onPress={() => navigation.navigate('Level')}
                        activeOpacity={0.8}
                    >
                        <Trophy color="#eab308" size={20} />
                        <Text className="text-gray-900 font-medium">Level 5: Eco Guardian</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats Grid */}
                <View className="px-6 py-6 flex-row justify-between gap-3">
                    <View className="flex-1 bg-blue-50 rounded-2xl p-4 items-center">
                        <Text className="text-2xl font-bold text-blue-900 mb-1">34</Text>
                        <Text className="text-xs text-blue-900 opacity-70">Yuborilgan</Text>
                    </View>
                    <View className="flex-1 bg-green-50 rounded-2xl p-4 items-center">
                        <Text className="text-2xl font-bold text-green-900 mb-1">18</Text>
                        <Text className="text-xs text-green-900 opacity-70">Hal qilingan</Text>
                    </View>
                    <View className="flex-1 bg-red-50 rounded-2xl p-4 items-center">
                        <Text className="text-2xl font-bold text-red-900 mb-1">6</Text>
                        <Text className="text-xs text-red-900 opacity-70">Yangi</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="px-6 pb-6 gap-2">
                    <TouchableOpacity
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex-row items-center gap-4"
                        onPress={() => navigation.navigate('MyReports')}
                        activeOpacity={0.8}
                    >
                        <View className="bg-green-100 p-3 rounded-xl">
                            <FileText color="#37a16a" size={20} />
                        </View>
                        <Text className="flex-1 text-gray-900 text-lg">Mening arizalarim</Text>
                        <ChevronRight color="#9ca3af" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex-row items-center gap-4"
                        onPress={() => navigation.navigate('Help')}
                        activeOpacity={0.8}
                    >
                        <View className="bg-blue-100 p-3 rounded-xl">
                            <HelpCircle color="#3b82f6" size={20} />
                        </View>
                        <Text className="flex-1 text-gray-900 text-lg">Yordam</Text>
                        <ChevronRight color="#9ca3af" size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-red-50 border border-red-200 rounded-2xl p-4 flex-row items-center gap-4 mt-4"
                        onPress={() => navigation.navigate('Splash')}
                        activeOpacity={0.8}
                    >
                        <View className="bg-red-100 p-3 rounded-xl">
                            <LogOut color="#ef4444" size={20} />
                        </View>
                        <Text className="flex-1 text-red-600 text-lg">Chiqish</Text>
                        <ChevronRight color="#f87171" size={20} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
