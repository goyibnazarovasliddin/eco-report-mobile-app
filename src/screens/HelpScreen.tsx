import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_ITEMS = [
    {
        id: 1,
        question: 'Qanday qilib ariza yuboraman?',
        answer: 'Asosiy sahifadagi + tugmasini bosing, kamerani oching, muammoni rasmga oling, manzilni tasdiqlang va yuboring.'
    },
    {
        id: 2,
        question: 'Reyting qanday oshadi?',
        answer: 'Har bir yuborilgan ariza uchun 10 ball, u hal qilinganda 50 ball olasiz. Kunlik kirish uchun +5 ball beriladi.'
    },
    {
        id: 3,
        question: 'Arizam rad etildi, nega?',
        answer: 'Rasm noaniq bo\'lsa yoki muammo ekologiyaga oid bo\'lmasa, administrator tomonidan rad etilishi mumkin.'
    },
    {
        id: 4,
        question: 'Mukofotlar bormi?',
        answer: 'Ha, ma\'lum darajaga yetganda homiylarimiz tomonidan maxsus sovg\'alar va vaucherlar taqdim etiladi.'
    },
    {
        id: 5,
        question: 'Ilovadan foydalanish bepulmi?',
        answer: 'Ha, ilova to\'liq bepul va barcha funksiyalaridan cheklovsiz foydalanish mumkin.'
    },
    {
        id: 6,
        question: 'Mening shaxsiy ma\'lumotlarim xavfsizmi?',
        answer: 'Sizning ma\'lumotlaringiz shifrlangan holda saqlanadi va uchinchi shaxslarga berilmaydi.'
    },
    {
        id: 7,
        question: 'Qanday muammolar haqida xabar berish mumkin?',
        answer: 'Chiqindilar, suv ifloslanishi, noqonuniy daraxt kesish, havo ifloslanishi va boshqa eko-muammolar.'
    }
];

export function HelpScreen({ navigation }: any) {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggle = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenId(openId === id ? null : id);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl">
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Yordam</Text>
            </View>

            <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
                <Text className="text-2xl font-bold text-gray-900 mb-2">Tez-tez so'raladigan savollar</Text>
                <Text className="text-gray-500 mb-6">Quyida eng ko'p beriladigan savollarga javoblar</Text>

                <View className="gap-3">
                    {FAQ_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            className="bg-gray-50 p-4 rounded-2xl border border-gray-100"
                            onPress={() => toggle(item.id)}
                            activeOpacity={0.7}
                        >
                            <View className="flex-row justify-between items-center">
                                <Text className="font-bold text-gray-900 flex-1 pr-4">{item.question}</Text>
                                <ChevronDown
                                    size={20}
                                    color="#9ca3af"
                                    style={{
                                        transform: [{ rotate: openId === item.id ? '180deg' : '0deg' }],
                                        transition: 'transform 0.3s ease'
                                    }}
                                />
                            </View>
                            {openId === item.id && (
                                <Text className="text-gray-600 leading-5 mt-3 pt-3 border-t border-gray-200">
                                    {item.answer}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="mt-8 p-6 bg-blue-50 rounded-3xl items-center">
                    <Text className="text-blue-900 font-bold text-lg mb-2">Savolingiz bormi?</Text>
                    <Text className="text-blue-700 text-center mb-4">Bizning qo'llab-quvvatlash xizmatimizga yozing</Text>
                    <TouchableOpacity
                        className="bg-blue-500 px-6 py-3 rounded-xl"
                        onPress={() => Linking.openURL('https://t.me/goyibnazarovasliddin')}
                    >
                        <Text className="text-white font-bold">Operator bilan bog'lanish</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
