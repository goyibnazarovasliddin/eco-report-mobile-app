import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Chrome } from 'lucide-react-native';

export function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 32, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
                    <View className="items-center mb-10">
                        <Text className="text-3xl font-bold text-gray-900 mb-2">Xush kelibsiz!</Text>
                        <Text className="text-gray-500 text-lg">Hisobingizga kiring</Text>
                    </View>

                    <View className="gap-4 mb-6">
                        <View className="bg-gray-50 h-14 rounded-2xl border border-gray-200 flex-row items-center px-4 gap-3">
                            <Mail color="#9ca3af" size={20} />
                            <TextInput
                                placeholder="Email yoki telefon"
                                className="flex-1 text-gray-900 text-base h-full"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                        <View className="bg-gray-50 h-14 rounded-2xl border border-gray-200 flex-row items-center px-4 gap-3">
                            <Lock color="#9ca3af" size={20} />
                            <TextInput
                                placeholder="Parol"
                                className="flex-1 text-gray-900 text-base h-full"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                        <TouchableOpacity className="self-end">
                            <Text className="text-[#37a16a] font-medium">Parolni unutdingizmi?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="w-full h-14 bg-[#37a16a] rounded-2xl items-center justify-center mb-6 shadow-lg shadow-[#37a16a]/20"
                        onPress={() => navigation.navigate('MainTabs')}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold text-lg">Kirish</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-4 mb-6">
                        <View className="flex-1 h-[1px] bg-gray-200" />
                        <Text className="text-gray-400 font-medium">yoki</Text>
                        <View className="flex-1 h-[1px] bg-gray-200" />
                    </View>

                    <TouchableOpacity
                        className="w-full h-14 bg-white border border-gray-200 rounded-2xl items-center flex-row justify-center gap-3 mb-8"
                        activeOpacity={0.8}
                    >
                        <Chrome color="#EA4335" size={24} />
                        <Text className="text-gray-700 font-bold text-lg">Google bilan davom etish</Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-center gap-1">
                        <Text className="text-gray-500 text-base">Hisobingiz yo'qmi?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterPhone')}>
                            <Text className="text-[#37a16a] font-bold text-base">Ro'yxatdan o'tish</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
