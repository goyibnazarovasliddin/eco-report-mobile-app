import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Mail, Camera, Save } from 'lucide-react-native';

export function SettingsScreen({ navigation }: any) {
    const [name, setName] = useState('Asliddin');
    const [surname, setSurname] = useState('Murodov');
    const [email, setEmail] = useState('asliddin@example.com');

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-100">
                <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-50 p-3 rounded-xl" activeOpacity={0.8}>
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Sozlamalar</Text>
                <View style={{ width: 48 }} />
            </View>

            <ScrollView className="flex-1 px-6 pt-6">

                {/* Profile Pic */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <View className="w-28 h-28 bg-emerald-100 rounded-full items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                            <User size={48} color="#37a16a" />
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-[#37a16a] p-2 rounded-full border-2 border-white shadow" activeOpacity={0.8}>
                            <Camera size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Forms */}
                <View className="gap-4">
                    <View>
                        <Text className="text-gray-700 font-bold mb-2 ml-1">Ism</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-700 font-bold mb-2 ml-1">Familiya</Text>
                        <TextInput
                            value={surname}
                            onChangeText={setSurname}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-700 font-bold mb-2 ml-1">Email</Text>
                        <View className="relative">
                            <TextInput
                                value={email}
                                editable={false}
                                className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500"
                            />
                            <View className="absolute right-4 top-3.5">
                                <Mail size={20} color="#9ca3af" />
                            </View>
                        </View>
                        <Text className="text-xs text-gray-400 mt-1 ml-1">Email manzilni o'zgartirib bo'lmaydi</Text>
                    </View>
                </View>

                <TouchableOpacity
                    className="bg-[#37a16a] w-full py-4 rounded-xl shadow-md flex-row justify-center items-center gap-2 mt-8"
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.8}
                >
                    <Save color="white" size={24} />
                    <Text className="text-white font-bold text-lg">Saqlash</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
