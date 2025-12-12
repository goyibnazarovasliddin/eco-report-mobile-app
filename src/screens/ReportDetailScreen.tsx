import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Calendar, CheckCircle, Clock, AlertCircle, Sparkles, Building2, Hash, Send } from 'lucide-react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export function ReportDetailScreen({ navigation, route }: any) {
    const { report } = route.params || {};

    const data = report || {
        id: '1',
        title: 'Chiqindi to\'planishi',
        status: 'new',
        image: 'https://via.placeholder.com/400',
        address: 'Toshkent sh.',
        date: '---',
        description: 'Muammo haqida ma\'lumot'
    };

    const fullData = {
        ...data,
        ai_confidence: data.ai_confidence || 94,
        ai_description: data.description || 'Tizim tomonidan muammo aniqlandi.',
        ai_risk: 'Ushbu muammo atrof-muhitga salbiy ta\'sir ko\'rsatishi mumkin.',
        ai_actions: [
            'Tegishli organlarga xabar berish',
            'Muammoni bartaraf etish choralarini ko\'rish',
            'Doimiy nazoratga olish'
        ]
    };

    const getStatusColor = () => {
        if (fullData.status === 'new') return 'bg-red-100';
        if (fullData.status === 'pending') return 'bg-orange-100';
        return 'bg-green-100';
    };

    const getStatusTextColor = () => {
        if (fullData.status === 'new') return 'text-red-700';
        if (fullData.status === 'pending') return 'text-orange-700';
        return 'text-green-700';
    };

    const getStatusText = () => {
        if (fullData.status === 'new') return 'Yangi';
        if (fullData.status === 'pending') return 'Jarayonda';
        return 'Hal qilingan';
    };

    const getDepartment = () => {
        if (fullData.status === 'resolved') return 'Ekologiya va atrof-muhitni muhofaza qilish qo\'mitasi';
        if (fullData.status === 'pending') return 'Ko\'rib chiqilmoqda - Mahalliy hokimlik';
        return 'Toshkent shahar ekologiya bo\'limi';
    };

    const timeline = [
        {
            status: 'Yuborildi',
            time: fullData.date,
            done: true,
            icon: CheckCircle,
            color: 'bg-green-500',
            iconColor: '#ffffff'
        },
        {
            status: 'Idoraga topshirildi',
            time: fullData.status !== 'new' ? 'Bajarildi' : 'Kutilmoqda',
            done: fullData.status !== 'new',
            icon: Send,
            color: fullData.status !== 'new' ? 'bg-green-500' : 'bg-gray-200',
            iconColor: fullData.status !== 'new' ? '#ffffff' : '#9ca3af'
        },
        {
            status: 'Jarayonda',
            time: fullData.status === 'pending' || fullData.status === 'resolved' ? 'Bajarilmoqda' : 'Kutilmoqda',
            done: fullData.status === 'pending' || fullData.status === 'resolved',
            icon: Clock,
            color: (fullData.status === 'pending' || fullData.status === 'resolved') ? 'bg-green-500' : 'bg-gray-200',
            iconColor: (fullData.status === 'pending' || fullData.status === 'resolved') ? '#ffffff' : '#9ca3af'
        },
        {
            status: 'Hal qilindi',
            time: fullData.status === 'resolved' ? 'Tugatildi' : 'Kutilmoqda',
            done: fullData.status === 'resolved',
            icon: CheckCircle,
            color: fullData.status === 'resolved' ? 'bg-green-500' : 'bg-gray-200',
            iconColor: fullData.status === 'resolved' ? '#ffffff' : '#9ca3af'
        }
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl" activeOpacity={0.8}>
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Ariza tafsilotlari</Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Image
                    source={{ uri: fullData.image }}
                    className="w-full h-64 bg-gray-100"
                    resizeMode="cover"
                />

                <View className="px-6 py-6">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-2xl font-bold text-gray-900 flex-1 mr-2">{fullData.title || 'Muammo'}</Text>
                        <View className={`px-3 py-1 rounded-full ${getStatusColor()}`}>
                            <Text className={`text-sm font-bold ${getStatusTextColor()}`}>
                                {getStatusText()}
                            </Text>
                        </View>
                    </View>

                    <View className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 mb-6 border border-emerald-100">
                        <View className="flex-row items-center gap-2 mb-3">
                            <View className="bg-emerald-500 p-1.5 rounded-lg">
                                <Sparkles size={16} color="white" />
                            </View>
                            <Text className="text-gray-900 font-bold">Batafsil AI Izoh</Text>
                        </View>
                        <View className="gap-3">
                            <View>
                                <Text className="text-gray-900 font-bold text-sm">Aniqlangan muammo:</Text>
                                <Text className="text-gray-700 text-sm leading-5">{fullData.ai_description}</Text>
                            </View>
                            <View>
                                <Text className="text-gray-900 font-bold text-sm">Ekologik xavf:</Text>
                                <Text className="text-gray-700 text-sm leading-5">{fullData.ai_risk}</Text>
                            </View>
                            <View>
                                <Text className="text-gray-900 font-bold text-sm mb-1">Tavsiya etiladigan choralar:</Text>
                                {fullData.ai_actions.map((action: string, idx: number) => (
                                    <View key={idx} className="flex-row gap-2 ml-2 mb-1">
                                        <Text className="text-gray-700 text-sm">•</Text>
                                        <Text className="text-gray-700 text-sm flex-1">{action}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>

                    <View className="bg-gray-50 rounded-2xl p-4 mb-6">
                        <View className="flex-row items-center gap-3 mb-3">
                            <View className="bg-blue-100 p-2 rounded-lg">
                                <MapPin size={20} color="#3b82f6" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 mb-1">Manzil</Text>
                                <Text className="text-gray-900 font-medium">{fullData.address}</Text>
                            </View>
                        </View>

                        <View className="h-[1px] bg-gray-200 my-3" />

                        <View className="flex-row items-center gap-3 mb-3">
                            <View className="bg-purple-100 p-2 rounded-lg">
                                <Calendar size={20} color="#a855f7" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 mb-1">Sana</Text>
                                <Text className="text-gray-900 font-medium">{fullData.date}</Text>
                            </View>
                        </View>

                        <View className="h-[1px] bg-gray-200 my-3" />

                        <View className="flex-row items-center gap-3 mb-3">
                            <View className="bg-green-100 p-2 rounded-lg">
                                <Building2 size={20} color="#16a34a" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 mb-1">Mas'ul idora</Text>
                                <Text className="text-gray-900 font-medium">{getDepartment()}</Text>
                            </View>
                        </View>

                        <View className="h-[1px] bg-gray-200 my-3" />

                        <View className="flex-row items-center gap-3">
                            <View className="bg-orange-100 p-2 rounded-lg">
                                <Hash size={20} color="#f97316" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 mb-1">ID raqam</Text>
                                <Text className="text-gray-900 font-medium">#{fullData.id}</Text>
                            </View>
                        </View>
                    </View>

                    <View className="h-48 rounded-2xl overflow-hidden bg-gray-100 mb-6 border border-gray-200">
                        <MapView
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: fullData.lat || 41.2995,
                                longitude: fullData.lon || 69.2401,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker coordinate={{ latitude: fullData.lat || 41.2995, longitude: fullData.lon || 69.2401 }} />
                        </MapView>
                    </View>

                    {/* Timeline */}
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-gray-900 mb-4">Jarayon tarixi</Text>
                        {timeline.map((step, index) => (
                            <View key={index} className="flex-row gap-3 mb-4">
                                <View className="items-center">
                                    <View className={`${step.color} p-2 rounded-full`}>
                                        <step.icon size={16} color={step.iconColor} />
                                    </View>
                                    {index < timeline.length - 1 && (
                                        <View className={`w-0.5 flex-1 mt-2 ${step.done ? 'bg-green-500' : 'bg-gray-200'}`} style={{ minHeight: 20 }} />
                                    )}
                                </View>
                                <View className="flex-1 pb-2">
                                    <Text className={`font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</Text>
                                    <Text className={`text-sm ${step.done ? 'text-gray-600' : 'text-gray-400'}`}>{step.time}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Confirmation Button */}
                    <View
                        className={`w-full py-4 rounded-2xl items-center justify-center mb-6 ${fullData.status === 'resolved' ? 'bg-[#37a16a] shadow-lg shadow-[#37a16a]/20' : 'bg-gray-200'}`}
                    >
                        <View className="flex-row items-center gap-2">
                            <CheckCircle size={20} color={fullData.status === 'resolved' ? 'white' : '#9ca3af'} />
                            <Text className={`font-bold text-lg ${fullData.status === 'resolved' ? 'text-white' : 'text-gray-400'}`}>
                                {fullData.status === 'resolved' ? 'Hal qilinganini tasdiqlash' : 'Faqat hal qilingandan keyin'}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
