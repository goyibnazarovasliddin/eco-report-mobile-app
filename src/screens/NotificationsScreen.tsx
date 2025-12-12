import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react-native';

const mockNotifications = [
    {
        id: 1,
        title: 'Tasdiqlash kerak!',
        message: 'Chiqindi to\'planishi muammosi hal qilindi. Iltimos, natijani tasdiqlang',
        time: '5 daqiqa oldin',
        status: 'verify',
        icon: 'bell',
        clickable: true,
    },
    {
        id: 2,
        title: 'Arizangiz qabul qilindi',
        message: 'Chiqindi to\'planishi haqidagi arizangiz ko\'rib chiqilmoqda',
        time: '10 daqiqa oldin',
        status: 'new',
        icon: 'bell',
        clickable: false,
    },
    {
        id: 3,
        title: 'Muammo hal qilindi',
        message: 'Plastik qoplarda to\'planishi muammosi hal qilindi',
        time: '2 soat oldin',
        status: 'resolved',
        icon: 'check',
        clickable: false,
    },
    {
        id: 4,
        title: 'Yangi level!',
        message: 'Tabriklaymiz! Siz Level 5: Eco Guardian darajasiga chiqdingiz',
        time: '2 kun oldin',
        status: 'resolved',
        icon: 'check',
        clickable: false,
    },
];

export function NotificationsScreen({ navigation }: any) {
    const getIcon = (iconType: string) => {
        switch (iconType) {
            case 'check':
                return <CheckCircle color="#16a34a" size={20} />;
            case 'alert':
                return <AlertCircle color="#ca8a04" size={20} />;
            case 'clock':
                return <Clock color="#2563eb" size={20} />;
            default:
                return <Bell color="#37a16a" size={20} />;
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'verify':
                return 'bg-orange-50 border-orange-200';
            case 'resolved':
                return 'bg-green-50 border-green-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'progress':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-white border-gray-200';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl">
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Bildirishnomalar</Text>
            </View>

            <ScrollView className="flex-1 px-6 py-4">
                <View className="gap-3">
                    {mockNotifications.map((notification) => (
                        <TouchableOpacity
                            key={notification.id}
                            disabled={!notification.clickable}
                            className={`border rounded-2xl p-4 ${getStatusStyles(notification.status)}`}
                            onPress={() => {
                                if (notification.clickable) {
                                    // In real app, pass notification ID
                                    navigation.navigate('ReportDetail', { id: notification.id });
                                }
                            }}
                        >
                            <View className="flex-row gap-3">
                                <View className="mt-1">
                                    {getIcon(notification.icon)}
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-900 font-bold mb-1">{notification.title}</Text>
                                    <Text className="text-sm text-gray-600 mb-2">{notification.message}</Text>
                                    <Text className="text-xs text-gray-400">{notification.time}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
