import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Home, Camera, User } from 'lucide-react-native';

interface BottomNavProps {
    activeTab: 'home' | 'add' | 'profile';
    onTabChange: (tab: 'home' | 'add' | 'profile') => void;
    onAddReport: () => void;
}

export function BottomNav({ activeTab, onTabChange, onAddReport }: BottomNavProps) {
    return (
        <View className="bg-white border-t border-gray-200 px-6 pb-8 pt-2">
            <View className="flex-row items-end justify-around">
                {/* Home Tab */}
                <TouchableOpacity
                    onPress={() => onTabChange('home')}
                    className="items-center gap-1 py-2 px-6"
                >
                    <Home
                        color={activeTab === 'home' ? '#37a16a' : '#9ca3af'}
                        size={24}
                        strokeWidth={2}
                    />
                    <Text className={`text-xs ${activeTab === 'home' ? 'text-[#37a16a]' : 'text-gray-400'}`}>
                        Asosiy
                    </Text>
                </TouchableOpacity>

                {/* Add Report Button */}
                <TouchableOpacity
                    onPress={onAddReport}
                    className="relative -top-6 bg-[#37a16a] p-4 rounded-full shadow-lg"
                >
                    <Camera color="white" size={32} strokeWidth={2} />
                    <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
                </TouchableOpacity>

                {/* Profile Tab */}
                <TouchableOpacity
                    onPress={() => onTabChange('profile')}
                    className="items-center gap-1 py-2 px-6"
                >
                    <User
                        color={activeTab === 'profile' ? '#37a16a' : '#9ca3af'}
                        size={24}
                        strokeWidth={2}
                    />
                    <Text className={`text-xs ${activeTab === 'profile' ? 'text-[#37a16a]' : 'text-gray-400'}`}>
                        Profil
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
