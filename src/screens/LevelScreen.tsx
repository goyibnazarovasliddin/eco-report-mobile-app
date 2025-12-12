import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trophy, Star, Shield, Lock } from 'lucide-react-native';

const LEVELS = [
    { level: 1, name: 'Eco Beginner', points: '0-100', icon: Star, color: 'text-gray-500', bg: 'bg-gray-100' },
    { level: 2, name: 'Eco Watcher', points: '100-300', icon: Star, color: 'text-blue-500', bg: 'bg-blue-100' },
    { level: 3, name: 'Eco Activist', points: '300-600', icon: Shield, color: 'text-green-500', bg: 'bg-green-100' },
    { level: 4, name: 'Eco Warrior', points: '600-1000', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-100' },
    { level: 5, name: 'Eco Guardian', points: '1000+', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-100' },
];

export function LevelScreen({ navigation }: any) {
    const currentLevel = 5;
    const currentPoints = 1250;

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center gap-4 border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-50 p-2 rounded-xl">
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Mening Darajam</Text>
            </View>

            <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
                {/* Current Status */}
                <View className="bg-emerald-50 rounded-3xl p-6 items-center mb-8 border border-emerald-100">
                    <View className="bg-white p-4 rounded-full mb-4 shadow-sm">
                        <Trophy size={48} color="#eab308" fill="#eab308" />
                    </View>
                    <Text className="text-emerald-900 font-bold text-2xl mb-1">Eco Guardian</Text>
                    <Text className="text-emerald-700 opacity-80 mb-4">Level 5</Text>

                    <View className="w-full bg-white h-3 rounded-full overflow-hidden mb-2">
                        <View className="bg-[#37a16a] h-full w-full" />
                    </View>
                    <Text className="text-sm text-emerald-800">{currentPoints} ball (Maksimal daraja)</Text>
                </View>

                {/* Instructions */}
                <View className="mb-8">
                    <Text className="text-lg font-bold text-gray-900 mb-3">Qanday qilib darajani oshirish mumkin?</Text>
                    <View className="bg-gray-50 p-4 rounded-2xl border border-gray-100 gap-3">
                        <View className="flex-row gap-3 items-center">
                            <View className="bg-green-100 p-2 rounded-full">
                                <Text className="text-green-700 font-bold text-xs">+10</Text>
                            </View>
                            <Text className="text-gray-700 flex-1">Har bir yuborilgan ariza uchun</Text>
                        </View>
                        <View className="flex-row gap-3 items-center">
                            <View className="bg-green-100 p-2 rounded-full">
                                <Text className="text-green-700 font-bold text-xs">+50</Text>
                            </View>
                            <Text className="text-gray-700 flex-1">Ariza hal qilinganda va tasdiqlanganda</Text>
                        </View>
                        <View className="flex-row gap-3 items-center">
                            <View className="bg-green-100 p-2 rounded-full">
                                <Text className="text-green-700 font-bold text-xs">+5</Text>
                            </View>
                            <Text className="text-gray-700 flex-1">Kundalik kirish uchun</Text>
                        </View>
                    </View>
                </View>

                {/* Levels Path */}
                <Text className="text-lg font-bold text-gray-900 mb-4">Darajalar tizimi</Text>
                <View className="gap-4 pb-10">
                    {LEVELS.map((lvl) => {
                        const isUnlocked = lvl.level <= currentLevel;
                        const isCurrent = lvl.level === currentLevel;

                        return (
                            <View key={lvl.level} className={`flex-row items-center p-4 rounded-2xl border ${isCurrent ? 'bg-white border-[#37a16a] shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                                <View className={`p-3 rounded-xl mr-4 ${lvl.bg}`}>
                                    {isUnlocked ? (
                                        <lvl.icon size={24} className={lvl.color} color={lvl.color.replace('text-', '').replace('-500', '')} /> // Simple hack for tailwind colors if not parsed, using Lucide props ideally
                                    ) : (
                                        <Lock size={24} color="#9ca3af" />
                                    )}
                                </View>
                                <View className="flex-1">
                                    <View className="flex-row justify-between items-center mb-1">
                                        <Text className={`font-bold text-lg ${isUnlocked ? 'text-gray-900' : 'text-gray-400'}`}>Level {lvl.level}</Text>
                                        <Text className="text-xs text-gray-500 font-medium">{lvl.points} ball</Text>
                                    </View>
                                    <Text className={`${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>{lvl.name}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
