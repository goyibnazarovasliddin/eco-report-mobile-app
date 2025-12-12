import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Leaf, Camera, BrainCircuit } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: 1,
        title: "EcoReportga Xush Kelibsiz!",
        description: "Bizning ilova orqali atrof-muhitni muhofaza qilishga o'z hissangizni qo'shing.",
        icon: Leaf,
        color: '#37a16a'
    },
    {
        id: 2,
        title: "Muammoni Suratga Oling",
        description: "Ko'chada, parkda yoki tabiatda duch kelgan ekologik muammolarni suratga oling.",
        icon: Camera,
        color: '#3b82f6'
    },
    {
        id: 3,
        title: "AI Tahlil va Yechim",
        description: "Sun'iy intellekt muammoni tahlil qiladi va tegishli idoraga yuboradi.",
        icon: BrainCircuit,
        color: '#eab308'
    }
];

export function OnboardingScreen({ navigation }: any) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            scrollRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
        } else {
            navigation.replace('Login');
        }
    };

    const handleSkip = () => {
        navigation.replace('Login');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <View className="flex-row justify-end p-6">
                    <TouchableOpacity onPress={handleSkip}>
                        <Text className="text-gray-500 font-medium text-base">O'tkazib yuborish</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {SLIDES.map((slide) => {
                        const Icon = slide.icon;
                        return (
                            <View key={slide.id} style={{ width, paddingHorizontal: 40 }} className="items-center justify-center -mt-20">
                                <View
                                    style={{ backgroundColor: slide.color + '15' }}
                                    className="w-72 h-72 rounded-full items-center justify-center mb-10"
                                >
                                    <View style={{ backgroundColor: slide.color + '30' }} className="w-48 h-48 rounded-full items-center justify-center">
                                        <Icon size={80} color={slide.color} />
                                    </View>
                                </View>

                                <Text className="text-3xl font-bold text-center text-gray-900 mb-4 leading-9">
                                    {slide.title}
                                </Text>
                                <Text className="text-gray-500 text-center text-lg leading-6 px-2">
                                    {slide.description}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>

                <View className="px-8 pb-8 mt-auto">
                    <View className="flex-row justify-center gap-2 mb-8">
                        {SLIDES.map((_, index) => (
                            <View
                                key={index}
                                className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-8' : 'w-2'}`}
                                style={{ backgroundColor: currentIndex === index ? SLIDES[currentIndex].color : '#e5e7eb' }}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={handleNext}
                        className="w-full py-4 rounded-2xl items-center justify-center shadow-lg shadow-black/5"
                        style={{ backgroundColor: SLIDES[currentIndex].color }}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold text-lg">
                            {currentIndex === SLIDES.length - 1 ? 'Boshlash' : 'Davom etish'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
