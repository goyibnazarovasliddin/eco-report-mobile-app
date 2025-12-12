import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Globe, Send, Instagram, Calendar } from 'lucide-react-native';

export function NewsDetailScreen({ navigation, route }: any) {
    const { news } = route.params;

    const openLink = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4 bg-white">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl" activeOpacity={0.8}>
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 flex-1" numberOfLines={1}>Yangiliklar</Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className={`h-48 ${news.color} w-full justify-end p-6`}>
                    <View className="bg-white/20 self-start px-3 py-1.5 rounded-lg mb-3">
                        <Text className="text-white text-xs font-bold uppercase">
                            {news.type === 'new' ? 'Yangi' : news.type === 'campaign' ? 'Kampaniya' : 'E\'lon'}
                        </Text>
                    </View>
                    <Text className="text-white text-2xl font-bold leading-8 mb-2">
                        {news.title}
                    </Text>
                    <View className="flex-row items-center gap-2">
                        <Calendar size={14} color="rgba(255,255,255,0.8)" />
                        <Text className="text-white/80 text-sm font-medium">{news.date}</Text>
                    </View>
                </View>

                <View className="p-6">
                    <View
                        className="border rounded-xl p-4 mb-8"
                        style={{
                            borderColor: news.color.includes('[')
                                ? news.color.match(/\[(.*?)\]/)?.[1]
                                : news.color.includes('blue') ? '#3b82f6'
                                    : news.color.includes('orange') ? '#f97316'
                                        : news.color.includes('green') ? '#22c55e'
                                            : '#e5e7eb'
                        }}
                    >
                        <Text className="text-gray-800 text-lg leading-7">
                            {news.fullDescription}
                        </Text>
                    </View>

                    <Text className="text-gray-900 font-bold text-lg mb-4">Batafsil ma'lumot:</Text>

                    <View className="gap-3">
                        {news.links.telegram && (
                            <TouchableOpacity
                                onPress={() => openLink(news.links.telegram)}
                                className="flex-row items-center bg-blue-50 p-4 rounded-xl border border-blue-100"
                                activeOpacity={0.8}
                            >
                                <View className="bg-blue-500 p-2 rounded-lg mr-3">
                                    <Send size={20} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-blue-900 font-bold">Telegram</Text>
                                    <Text className="text-blue-700 text-xs">Kanalimizga obuna bo'ling</Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        {news.links.instagram && (
                            <TouchableOpacity
                                onPress={() => openLink(news.links.instagram)}
                                className="flex-row items-center bg-pink-50 p-4 rounded-xl border border-pink-100"
                                activeOpacity={0.8}
                            >
                                <View className="bg-pink-500 p-2 rounded-lg mr-3">
                                    <Instagram size={20} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-pink-900 font-bold">Instagram</Text>
                                    <Text className="text-pink-700 text-xs">Rasmlarni tomosha qiling</Text>
                                </View>
                            </TouchableOpacity>
                        )}

                        {news.links.website && (
                            <TouchableOpacity
                                onPress={() => openLink(news.links.website)}
                                className="flex-row items-center bg-gray-50 p-4 rounded-xl border border-gray-100"
                                activeOpacity={0.8}
                            >
                                <View className="bg-gray-800 p-2 rounded-lg mr-3">
                                    <Globe size={20} color="white" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-900 font-bold">Web Sayt</Text>
                                    <Text className="text-gray-600 text-xs">Batafsil ma'lumot saytda</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
