import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Chrome, Phone } from 'lucide-react-native';

export function RegisterPhoneScreen({ navigation }: any) {
    const [phone, setPhone] = useState('+998 ');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 32 }} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mb-6"
                    >
                        <ArrowLeft color="#374151" size={24} />
                    </TouchableOpacity>

                    <View className="mb-10">
                        <Text className="text-3xl font-bold text-gray-900 mb-2">Ro'yxatdan o'tish</Text>
                        <Text className="text-gray-500 text-lg">Telefon raqamingizni kiriting</Text>
                    </View>

                    <View className="gap-6 flex-1">
                        <View className="bg-gray-50 h-14 rounded-2xl border border-gray-200 flex-row items-center px-4 gap-3">
                            <Phone color="#9ca3af" size={20} />
                            <TextInput
                                className="flex-1 text-gray-900 text-base h-full"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                placeholder="+998 90 123 45 67"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <TouchableOpacity
                            className="w-full h-14 bg-[#37a16a] rounded-2xl items-center justify-center shadow-lg shadow-[#37a16a]/20"
                            onPress={() => navigation.navigate('RegisterData')}
                            activeOpacity={0.9}
                        >
                            <Text className="text-white font-bold text-lg">Davom etish</Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center gap-4 my-2">
                            <View className="flex-1 h-[1px] bg-gray-200" />
                            <Text className="text-gray-400 font-medium">yoki</Text>
                            <View className="flex-1 h-[1px] bg-gray-200" />
                        </View>

                        <TouchableOpacity
                            className="w-full h-14 bg-white border border-gray-200 rounded-2xl items-center flex-row justify-center gap-3"
                            activeOpacity={0.9}
                        >
                            <Image
                                source={require('../../assets/images/google-icon.png')}
                                style={{ width: 24, height: 24 }}
                                resizeMode="contain"
                            />
                            <Text className="text-gray-700 font-bold text-lg">Google bilan davom etish</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center gap-1 mt-6">
                        <Text className="text-gray-500 text-base">Akkauntingiz bormi?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-[#37a16a] font-bold text-base">Kirish</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
