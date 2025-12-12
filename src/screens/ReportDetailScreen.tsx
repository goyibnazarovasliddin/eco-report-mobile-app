import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, Modal, SafeAreaView as RNSafeAreaView, Animated, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Calendar, CheckCircle, Clock, Sparkles, Building2, Hash, Send, X } from 'lucide-react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

export function ReportDetailScreen({ navigation, route }: any) {
    const { report } = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');
    const [activeBeforeIndex, setActiveBeforeIndex] = useState(0);
    const [activeAfterIndex, setActiveAfterIndex] = useState(0);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Animation for Tab Indicator
    const [tabWidths, setTabWidths] = useState<{ [key: string]: number }>({});
    const [tabPositions, setTabPositions] = useState<{ [key: string]: number }>({});
    const slideAnim = useRef(new Animated.Value(0)).current;
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (Object.keys(tabWidths).length === 2 && Object.keys(tabPositions).length === 2) {
            const targetX = tabPositions[activeTab] || 0;
            const targetWidth = tabWidths[activeTab] || 0;

            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: targetX,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(widthAnim, {
                    toValue: targetWidth,
                    duration: 300,
                    useNativeDriver: false,
                })
            ]).start();
        }
    }, [activeTab, tabWidths, tabPositions]);

    const onTabLayout = (tab: 'before' | 'after', event: any) => {
        const { x, width } = event.nativeEvent.layout;
        setTabWidths(prev => ({ ...prev, [tab]: width }));
        setTabPositions(prev => ({ ...prev, [tab]: x }));
    };

    // Interpolate animated value to move the indicator
    // Container width is w-48 (12rem = 192px on default rem scale, or 48*4=192).
    // Padding p-1 (4px). Total internal width approx 192-8 = 184?
    // Indicator is w-1/2 of container? No, absolute typically takes parent bounds.
    // The previous implementation used w-1/2 on the indicator.
    // Let's assume standard Tailwind: w-48 is 192px. p-1 is 4px.
    // Usable width = 192 - 8 = 184px. 
    // Tab width = 184 / 2 = 92px.
    // Left position range: [4, 4 + 92] = [4, 96].

    const indicatorLeft = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 96]
    });

    const data = report || {
        id: '1',
        title: 'Chiqindi to\'planishi',
        status: 'new',
        images: ['https://via.placeholder.com/400'],
        address: 'Toshkent sh.',
        date: '---',
        description: 'Muammo haqida ma\'lumot'
    };

    const fullData = {
        ...data,
        images: data.images || [],
        resolvedImages: data.resolvedImages || [],
        ai_confidence: data.ai_confidence || 94,
        ai_description: data.description || 'Tizim tomonidan muammo aniqlandi.',
        ai_risk: 'Ushbu muammo atrof-muhitga salbiy ta\'sir ko\'rsatishi mumkin.',
        ai_actions: [
            'Tegishli organlarga xabar berish',
            'Muammoni bartaraf etish choralarini ko\'rish',
            'Doimiy nazoratga olish'
        ]
    };

    const beforeImages = fullData.images;
    const afterImages = fullData.resolvedImages;

    // Derived image sets
    const fullScreenImages = activeTab === 'before' ? beforeImages : afterImages;

    const handleScroll = (event: any) => {
        const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
        if (slide !== activeImageIndex) {
            setActiveImageIndex(slide);
        }
    };

    const isResolved = fullData.status === 'resolved';

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

    const openFullScreen = () => {
        setActiveTab('before');
        setModalVisible(true);
    };

    const renderPagination = (images: string[], activeIndex: number) => {
        if (images.length <= 1) return null;
        return (
            <View className="flex-row justify-center gap-2 absolute bottom-4 w-full">
                {images.map((_, index) => (
                    <View
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full border border-[#37a16a] ${index === activeIndex ? 'bg-[#37a16a]' : 'bg-white'}`}
                    />
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 border-b border-gray-100 flex-row items-center gap-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-gray-50 rounded-xl" activeOpacity={0.8}>
                    <ArrowLeft color="#374151" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Ariza tafsilotlari</Text>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Image Carousel (Main View) */}
                <View className="relative">
                    {isResolved && fullData.resolvedImages && fullData.resolvedImages.length > 0 ? (
                        <View className="h-72 bg-gray-100 flex-row">
                            {/* BEFORE Column */}
                            <View className="flex-1 border-r-2 border-white relative">
                                <ScrollView
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onMomentumScrollEnd={(e) => {
                                        const index = Math.round(e.nativeEvent.contentOffset.x / (width / 2));
                                        setActiveBeforeIndex(index);
                                    }}
                                >
                                    {(beforeImages || []).map((img: string, index: number) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.9}
                                            onPress={() => { setActiveTab('before'); setModalVisible(true); }}
                                            style={{ width: width / 2, height: 288 }}
                                        >
                                            <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded z-10">
                                    <Text className="text-white text-xs font-bold">AVVAL</Text>
                                </View>
                                {/* Pagination Dots for Before */}
                                {(beforeImages || []).length > 1 && (
                                    <View className="absolute bottom-2 right-2 flex-row justify-center gap-1 z-10">
                                        {(beforeImages || []).map((_: string, i: number) => (
                                            <View key={i} className={`w-2 h-2 rounded-full ${i === activeBeforeIndex ? 'bg-[#37a16a]' : 'bg-white'}`} />
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* AFTER Column */}
                            <View className="flex-1 relative">
                                <ScrollView
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onMomentumScrollEnd={(e) => {
                                        const index = Math.round(e.nativeEvent.contentOffset.x / (width / 2));
                                        setActiveAfterIndex(index);
                                    }}
                                >
                                    {(afterImages || []).map((img: string, index: number) => (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.9}
                                            onPress={() => { setActiveTab('after'); setModalVisible(true); }}
                                            style={{ width: width / 2, height: 288 }}
                                        >
                                            <Image source={{ uri: img }} className="w-full h-full" resizeMode="cover" />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <View className="absolute bottom-2 left-2 bg-green-600 px-2 py-1 rounded z-10">
                                    <Text className="text-white text-xs font-bold">KEYIN</Text>
                                </View>
                                {/* Pagination Dots for After */}
                                {(afterImages || []).length > 1 && (
                                    <View className="absolute bottom-2 right-2 flex-row justify-center gap-1 z-10">
                                        {(afterImages || []).map((_: string, i: number) => (
                                            <View key={i} className={`w-2 h-2 rounded-full ${i === activeAfterIndex ? 'bg-[#37a16a]' : 'bg-white'}`} />
                                        ))}
                                    </View>
                                )}
                            </View>
                        </View>
                    ) : (
                        <View>
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                className="w-full h-72 bg-gray-100"
                            >
                                {beforeImages.map((img: string, index: number) => (
                                    <TouchableOpacity key={index} onPress={openFullScreen} activeOpacity={1}>
                                        <Image
                                            source={{ uri: img }}
                                            style={{ width: width, height: 288 }}
                                            resizeMode="cover"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            {renderPagination(beforeImages, activeImageIndex)}
                        </View>
                    )}
                </View>

                {/* Content Body */}
                <View className="px-6 py-6">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-2xl font-bold text-gray-900 flex-1 mr-2">{fullData.title || 'Muammo'}</Text>
                        <View className={`px-3 py-1 rounded-full ${getStatusColor()}`}>
                            <Text className={`text-sm font-bold ${getStatusTextColor()}`}>
                                {getStatusText()}
                            </Text>
                        </View>
                    </View>

                    {isResolved && fullData.officialComment && (
                        <View className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-200">
                            <View className="flex-row items-center gap-2 mb-2">
                                <View className="bg-[#37a16a] p-1.5 rounded-lg">
                                    <CheckCircle size={16} color="white" />
                                </View>
                                <Text className="text-gray-900 font-bold">Idora javobi</Text>
                            </View>
                            <Text className="text-gray-800 text-sm leading-5">{fullData.officialComment}</Text>
                        </View>
                    )}

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

                    <View
                        className={`w-full py-4 rounded-2xl items-center justify-center mb-6 ${fullData.status === 'resolved' ? 'bg-[#37a16a] shadow-lg shadow-[#37a16a]/20' : 'bg-gray-200'}`}
                    >
                        <View className="flex-row items-center gap-2">
                            <CheckCircle size={20} color={fullData.status === 'resolved' ? 'white' : '#9ca3af'} />
                            <Text className={`font-bold text-lg ${fullData.status === 'resolved' ? 'text-white' : 'text-gray-400'}`}>
                                {fullData.status === 'resolved' ? 'Hal qilinganini tasdiqlash' : 'Tasdiqlash faqat hal qilingandan keyin'}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <RNSafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                    <View className="flex-1 relative">
                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full"
                        >
                            <X color="white" size={24} />
                        </TouchableOpacity>

                        {/* Tabs for Resolved */}
                        {isResolved && (
                            <View className="absolute top-12 left-0 right-0 z-40 items-center">
                                <View className="flex-row bg-gray-800/80 rounded-full p-1 border border-gray-600 relative justify-center">
                                    {/* Animated Indicator */}
                                    <Animated.View
                                        style={{
                                            position: 'absolute',
                                            top: 4,
                                            bottom: 4,
                                            left: 0,
                                            transform: [{ translateX: slideAnim }],
                                            width: widthAnim,
                                            backgroundColor: '#37a16a',
                                            borderRadius: 9999,
                                        }}
                                    />

                                    <TouchableOpacity
                                        onLayout={(e) => onTabLayout('before', e)}
                                        onPress={() => setActiveTab('before')}
                                        className="px-6 py-2 items-center justify-center rounded-full z-10"
                                        activeOpacity={0.8}
                                    >
                                        <Text className={`font-bold text-sm ${activeTab === 'before' ? 'text-white' : 'text-gray-300'}`}>AVVAL</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onLayout={(e) => onTabLayout('after', e)}
                                        onPress={() => setActiveTab('after')}
                                        className="px-6 py-2 items-center justify-center rounded-full z-10"
                                        activeOpacity={0.8}
                                    >
                                        <Text className={`font-bold text-sm ${activeTab === 'after' ? 'text-white' : 'text-gray-300'}`}>KEYIN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}

                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            className="flex-1 w-full h-full"
                            contentOffset={{ x: width * (activeTab === 'before' ? activeBeforeIndex : activeAfterIndex), y: 0 }}
                            onMomentumScrollEnd={(e) => {
                                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                                if (activeTab === 'before') {
                                    setActiveBeforeIndex(index);
                                } else {
                                    setActiveAfterIndex(index);
                                }
                            }}
                        >
                            {fullScreenImages && fullScreenImages.length > 0 ? (
                                fullScreenImages.map((img: string, index: number) => (
                                    <View key={index} style={{ width: width, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            source={{ uri: img }}
                                            style={{ width: width, height: '100%' }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                ))
                            ) : (
                                <View style={{ width: width, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text className="text-white">Rasm mavjud emas</Text>
                                </View>
                            )}
                        </ScrollView>

                        {/* Pagination for Modal */}
                        {fullScreenImages.length > 1 && (
                            <View className="absolute bottom-12 w-full flex-row justify-center gap-2">
                                {fullScreenImages.map((_: string, index: number) => {
                                    const isActive = index === (activeTab === 'before' ? activeBeforeIndex : activeAfterIndex);
                                    return (
                                        <View
                                            key={index}
                                            className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-[#37a16a]' : 'bg-gray-500'}`}
                                        />
                                    );
                                })}
                            </View>
                        )}

                    </View>
                </RNSafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}
