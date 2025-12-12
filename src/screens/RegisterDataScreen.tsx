import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Lock } from 'lucide-react-native';

export function RegisterDataScreen({ navigation }: any) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white p-6">
            <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
                <ArrowLeft color="#374151" size={24} />
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-gray-900 mb-2">Shaxsiy ma'lumotlar</Text>
            <Text className="text-gray-500 mb-8">
                Ism va familiyangizni kiriting
            </Text>

            <View className="gap-4 mb-6">
                <View className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex-row items-center gap-3">
                    <User color="#9ca3af" size={20} />
                    <TextInput
                        className="flex-1 text-lg text-gray-900"
                        placeholder="Ism"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>
                <View className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex-row items-center gap-3">
                    <User color="#9ca3af" size={20} />
                    <TextInput
                        className="flex-1 text-lg text-gray-900"
                        placeholder="Familiya"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>
            </View>

            <TouchableOpacity
                className="w-full bg-[#37a16a] p-4 rounded-xl items-center"
                onPress={() => navigation.navigate('MainTabs')} // Proceed to app after registration
            >
                <Text className="text-white font-semibold text-lg">Yakunlash</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
