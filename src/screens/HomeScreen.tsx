import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, PanResponder, Dimensions, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Leaf, Plus, Minus, Filter, Wind, Sun, Check, LocateFixed, X, Navigation, Droplets } from 'lucide-react-native';
import * as Location from 'expo-location';
import { MOCK_REPORTS } from '../data/mockReports';
import { fetchWeather, fetchAQI, getWeatherDescription, getAQIDescription, getWeatherRecommendation } from '../services/api';
import { getAQIColor, getHumidityColor, getTempColor } from '../utils/colorUtils';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

export function HomeScreen({ navigation }: any) {
    const onNotifications = () => navigation.navigate('Notifications');
    const [showFilter, setShowFilter] = useState(false);

    const mapRef = useRef<MapView>(null);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [userLocation, setUserLocation] = useState<any>(null);

    // Weather & AQI State
    const [weather, setWeather] = useState<any>(null);
    const [aqi, setAQI] = useState<any>(null);

    // Location Name State
    const [locationName, setLocationName] = useState('Toshkent');

    // Filter states
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    useEffect(() => {
        loadData(41.2995, 69.2401); // Default Tashkent
    }, []);

    const loadData = async (lat: number, lon: number) => {
        try {
            const wData = await fetchWeather(lat, lon);
            const aData = await fetchAQI(lat, lon);
            setWeather(wData);
            setAQI(aData);
        } catch (e) {
            console.log("Error loading weather/aqi", e);
        }
    };

    const filteredReports = MOCK_REPORTS.filter(r => {
        const statusMatch = filterStatus === 'all' || r.status === filterStatus;
        return statusMatch;
    });

    const onZoomIn = () => {
        mapRef.current?.getCamera().then((cam: any) => {
            if (cam && cam.zoom) {
                mapRef.current?.animateCamera({ zoom: cam.zoom + 1 });
            }
        });
    };

    const onZoomOut = () => {
        mapRef.current?.getCamera().then((cam: any) => {
            if (cam && cam.zoom) {
                mapRef.current?.animateCamera({ zoom: cam.zoom - 1 });
            }
        });
    };

    const onFindMe = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Joylashuvga ruxsat berilmadi');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            const region = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            };
            setUserLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            });
            mapRef.current?.animateToRegion(region, 1000);
            loadData(loc.coords.latitude, loc.coords.longitude);

            // Reverse Geocode
            const address = await Location.reverseGeocodeAsync({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            });

            if (address && address.length > 0) {
                const city = address[0].city || address[0].district || address[0].region || 'Mening joylashuvim';
                setLocationName(city);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const getMarkerColor = (status: string) => {
        switch (status) {
            case 'new': return 'red';
            case 'pending': return 'orange';
            case 'resolved': return 'green';
            default: return 'gray';
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) {
                    setShowFilter(false);
                }
            },
        })
    ).current;

    const reportPanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) {
                    setSelectedReport(null);
                }
            },
        })
    ).current;

    // Helpers for render
    const wCurrent = weather?.current;
    const wDesc = wCurrent ? getWeatherDescription(wCurrent.weather_code) : 'Yuklanmoqda...';
    const wRec = wCurrent ? getWeatherRecommendation(wCurrent.weather_code, wCurrent.temperature_2m) : '';

    const aCurrent = aqi?.current?.us_aqi;
    const aInfo = aCurrent ? getAQIDescription(aCurrent) : null;

    // Dynamic Colors
    const wColor = wCurrent ? getTempColor(wCurrent.temperature_2m) : { bg: 'bg-blue-50', text: 'text-blue-900', icon: '#EAB308' };
    const aColor = aCurrent ? getAQIColor(aCurrent) : { bg: 'bg-green-50', text: 'text-green-900', border: 'border-green-100', icon: '#16A34A' };
    const hColor = aqi?.current?.humidity ? getHumidityColor(aqi.current.humidity) : { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-100', icon: '#3B82F6' };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 pt-4 pb-4 bg-white border-b border-gray-100 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                    <View className="bg-[#37a16a] p-2 rounded-xl">
                        <Leaf color="white" size={20} strokeWidth={2} />
                    </View>
                    <View>
                        <Text className="text-xl text-gray-900 font-bold">Salom, Asliddin!</Text>
                        <Text className="text-sm text-gray-500">EcoReport</Text>
                    </View>
                </View>
                <TouchableOpacity className="relative p-2 bg-gray-50 rounded-xl" onPress={onNotifications}>
                    <Bell color="#374151" size={24} />
                    <View className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="h-[380px] bg-gray-100 relative">
                    <MapView
                        ref={mapRef}
                        style={{ width: '100%', height: '100%' }}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: 41.2995,
                            longitude: 69.2401,
                            latitudeDelta: 0.12,
                            longitudeDelta: 0.12,
                        }}
                        onPress={() => setSelectedReport(null)}
                    >
                        {filteredReports.map((report) => (
                            <Marker
                                key={report.id}
                                coordinate={{ latitude: report.lat, longitude: report.lon }}
                                onPress={() => setSelectedReport(report)}
                            >
                                <View className="bg-white p-1 rounded-full border-2 shadow-sm" style={{ borderColor: getMarkerColor(report.status) }}>
                                    <View className="w-3 h-3 rounded-full" style={{ backgroundColor: getMarkerColor(report.status) }} />
                                </View>
                            </Marker>
                        ))}
                        {userLocation && (
                            <Marker coordinate={userLocation} zIndex={999}>
                                <View className="bg-blue-500 p-2 rounded-full border-2 border-white shadow-lg">
                                    <View className="w-2 h-2 bg-white rounded-full" />
                                </View>
                            </Marker>
                        )}
                    </MapView>

                    <View className="absolute top-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

                    <View className="absolute top-4 right-4 gap-2">
                        <TouchableOpacity onPress={onZoomIn} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 active:bg-gray-50">
                            <Plus color="#374151" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onZoomOut} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 active:bg-gray-50">
                            <Minus color="#374151" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onFindMe} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 active:bg-gray-50 mt-2">
                            <Navigation color={userLocation ? "#3b82f6" : "#374151"} size={24} fill={userLocation ? "#3b82f6" : "none"} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-gray-100 flex-row items-center gap-2"
                        onPress={() => setShowFilter(true)}
                    >
                        <Filter color="#374151" size={18} />
                        <Text className="text-gray-900 font-bold">Filter</Text>
                    </TouchableOpacity>
                </View>

                {/* Widgets */}
                <View className="px-6 py-6 gap-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('WeatherDetail', { weather, locationName })} // Pass dynamic location name
                        className={`${wColor.bg} rounded-2xl p-4 flex-row justify-between items-center active:opacity-80`}
                    >
                        <View className="flex-1 mr-2">
                            <Text className={`text-sm ${wColor.text} opacity-70 mb-1`}>Ob-havo</Text>
                            <Text className={`text-3xl ${wColor.text} font-bold mb-1`}>{wCurrent ? Math.round(wCurrent.temperature_2m) : '--'}°C</Text>
                            <Text className={`text-sm ${wColor.text} opacity-70 mb-1`}>{wDesc}</Text>
                            <Text className={`text-xs ${wColor.text} font-medium bg-white/40 self-start px-2 py-1 rounded-lg overflow-hidden`}>{wRec || 'Ma\'lumot olinmoqda...'}</Text>
                        </View>
                        <Sun color={wColor.icon} size={64} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('AQIDetail', { aqiData: aqi, locationName })}
                        className={`${aColor.bg} rounded-2xl p-4 flex-row justify-between items-center active:opacity-80`}
                    >
                        <View className="flex-1 mr-2">
                            <Text className={`text-sm ${aColor.text} opacity-70 mb-1`}>Havo sifati</Text>
                            <View className="flex-row items-baseline gap-2 mb-1">
                                <Text className={`text-3xl ${aColor.text} font-bold`}>{aCurrent || '--'}</Text>
                                {aInfo && (
                                    <View className={`${aInfo.color} rounded-full px-2 py-1`}>
                                        <Text className="text-white text-xs">{aInfo.status}</Text>
                                    </View>
                                )}
                            </View>
                            <Text className={`text-sm ${aColor.text} opacity-70 mt-1 mb-1`}>AQI indeksi</Text>
                            <Text className={`text-xs ${aColor.text} font-medium bg-white/40 self-start px-2 py-1 rounded-lg overflow-hidden`}>{aInfo?.advice || 'Ma\'lumot olinmoqda...'}</Text>
                        </View>
                        <Wind color={aColor.icon} size={48} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('HumidityDetail', { humidity: aqi?.current?.humidity, locationName })}
                        className={`${hColor.bg} rounded-2xl p-4 flex-row justify-between items-center active:opacity-80`}
                    >
                        <View className="flex-1 mr-2">
                            <Text className={`text-sm ${hColor.text} opacity-70 mb-1`}>Namlik (IQAir)</Text>
                            <Text className={`text-3xl ${hColor.text} font-bold mb-1`}>{aqi?.current?.humidity ? aqi.current.humidity + '%' : '--'}</Text>
                            <Text className={`text-sm ${hColor.text} opacity-70 mb-1`}>Havo namligi</Text>
                            <Text className={`text-xs ${hColor.text} font-medium bg-white/40 self-start px-2 py-1 rounded-lg overflow-hidden`}>
                                {aqi?.current?.humidity > 60 ? 'Yuqori namlik' : aqi?.current?.humidity < 30 ? 'Quruq havo' : 'Me\'yorda'}
                            </Text>
                        </View>
                        <Droplets color={hColor.icon} size={64} />
                    </TouchableOpacity>

                    <View className="mb-4 -mx-6">
                        <View className="flex-row items-center gap-2 mb-3 px-6">
                            <Leaf color="#37a16a" size={20} />
                            <Text className="text-gray-900 font-bold">Ekologiya yangiliklari</Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 24 }}
                            decelerationRate="fast"
                            snapToInterval={CARD_WIDTH + 16}
                        >
                            <View style={{ width: CARD_WIDTH }} className="bg-[#37a16a] rounded-2xl p-4 mr-4 h-40 justify-between">
                                <View>
                                    <View className="bg-white/20 self-start px-2 py-1 rounded-lg mb-2">
                                        <Text className="text-white text-xs">Yangi</Text>
                                    </View>
                                    <Text className="text-white font-bold text-lg leading-6">Toshkentda "Yashil Belbog'" loyihasi</Text>
                                </View>
                                <Text className="text-white/80 text-xs">2 soat oldin</Text>
                            </View>

                            <View style={{ width: CARD_WIDTH }} className="bg-blue-500 rounded-2xl p-4 mr-4 h-40 justify-between">
                                <View>
                                    <View className="bg-white/20 self-start px-2 py-1 rounded-lg mb-2">
                                        <Text className="text-white text-xs">Kampaniya</Text>
                                    </View>
                                    <Text className="text-white font-bold text-lg leading-6">Plastiksiz kun: Ishtirok eting!</Text>
                                </View>
                                <Text className="text-white/80 text-xs">5 soat oldin</Text>
                            </View>

                            <View style={{ width: CARD_WIDTH }} className="bg-orange-500 rounded-2xl p-4 mr-4 h-40 justify-between">
                                <View>
                                    <View className="bg-white/20 self-start px-2 py-1 rounded-lg mb-2">
                                        <Text className="text-white text-xs">Diqqat</Text>
                                    </View>
                                    <Text className="text-white font-bold text-lg leading-6">Dam olish kunlari hashari</Text>
                                </View>
                                <Text className="text-white/80 text-xs">1 kun oldin</Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                        <View className="flex-row items-center gap-2 mb-2">
                            <Leaf color="#047857" size={20} />
                            <Text className="text-emerald-900 font-bold">Ekologik tavsiya (AI)</Text>
                        </View>
                        <Text className="text-sm text-emerald-900 leading-5">
                            Bugun chiqindilarni ajrating va qayta ishlashga yordam bering.
                            Plastik idishlarni maxsus qutilarga tashlash orqali tabiatni asrashga hissa qo'shasiz! 🌱
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Filter Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showFilter}
                onRequestClose={() => setShowFilter(false)}
            >
                <View className="flex-1 justify-end">
                    <View
                        className="bg-white rounded-t-3xl p-6 h-[450px] shadow-3xl z-10"
                        {...panResponder.panHandlers}
                    >
                        <View className="items-center mb-4 pt-2">
                            <View className="w-16 h-1.5 bg-gray-300 rounded-full" />
                        </View>
                        <Text className="text-xl font-bold text-gray-900 mb-6">Filterlar</Text>

                        <Text className="text-gray-900 font-medium mb-3">Holat</Text>
                        <View className="flex-row gap-3 mb-6 flex-wrap">
                            {['all', 'new', 'pending', 'resolved'].map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    onPress={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-lg border ${filterStatus === status ? 'bg-[#37a16a] border-[#37a16a]' : 'bg-white border-gray-200'}`}
                                >
                                    <Text className={filterStatus === status ? 'text-white' : 'text-gray-600'}>
                                        {status === 'all' ? 'Barchasi' : status === 'new' ? 'Yangi' : status === 'pending' ? 'Jarayonda' : 'Hal qilingan'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text className="text-gray-900 font-medium mb-3">Vaqt bo'yicha</Text>
                        <View className="flex-row gap-3 mb-8 flex-wrap">
                            {['all', 'day', 'week', 'month', 'year'].map((d) => (
                                <TouchableOpacity
                                    key={d}
                                    onPress={() => setDateFilter(d)}
                                    className={`px-4 py-2 rounded-lg border ${dateFilter === d ? 'bg-[#37a16a] border-[#37a16a]' : 'bg-white border-gray-200'}`}
                                >
                                    <Text className={dateFilter === d ? 'text-white' : 'text-gray-600'}>
                                        {d === 'all' ? 'Barcha vaqt' : d === 'day' ? 'Kunlik' : d === 'week' ? 'Haftalik' : d === 'month' ? 'Oylik' : 'Yillik'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            className="w-full bg-[#37a16a] p-4 rounded-xl flex-row items-center justify-center gap-2 mt-auto"
                            onPress={() => setShowFilter(false)}
                        >
                            <Check color="white" size={20} />
                            <Text className="text-white font-bold text-lg">Qo'llash</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Report Detail Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={!!selectedReport}
                onRequestClose={() => setSelectedReport(null)}
            >
                <View className="flex-1 justify-end">
                    <TouchableOpacity
                        className="absolute top-0 bottom-0 left-0 right-0 bg-transparent"
                        activeOpacity={1}
                        onPress={() => setSelectedReport(null)}
                    />

                    <View
                        className="bg-white rounded-t-3xl p-6 shadow-3xl z-20 pb-10"
                        {...reportPanResponder.panHandlers}
                    >
                        <View className="items-center mb-4 pt-2">
                            <View className="w-16 h-1.5 bg-gray-300 rounded-full" />
                        </View>

                        {selectedReport && (
                            <>
                                <View className="flex-row gap-4 mb-6">
                                    <Image
                                        source={{ uri: selectedReport.image }}
                                        className="w-24 h-24 rounded-2xl bg-gray-200"
                                    />
                                    <View className="flex-1 justify-between py-1">
                                        <View>
                                            <View className={`self-start px-2 py-1 rounded-md mb-2 ${selectedReport.status === 'new' ? 'bg-red-100' : selectedReport.status === 'pending' ? 'bg-orange-100' : 'bg-green-100'}`}>
                                                <Text className={`text-xs font-bold uppercase ${selectedReport.status === 'new' ? 'text-red-700' : selectedReport.status === 'pending' ? 'text-orange-700' : 'text-green-700'}`}>
                                                    {selectedReport.status === 'new' ? 'Yangi' : selectedReport.status === 'pending' ? 'Jarayonda' : 'Hal qilingan'}
                                                </Text>
                                            </View>
                                            <Text className="text-xl font-bold text-gray-900 leading-6" numberOfLines={2}>{selectedReport.title}</Text>
                                        </View>
                                        <Text className="text-gray-500 text-sm" numberOfLines={1}>{selectedReport.address}</Text>
                                    </View>
                                </View>

                                <View className="flex-row gap-3">
                                    <TouchableOpacity
                                        className="flex-1 bg-[#37a16a] py-4 rounded-xl items-center shadow-md active:opacity-90"
                                        onPress={() => {
                                            const report = selectedReport;
                                            setSelectedReport(null);
                                            navigation.navigate('ReportDetail', { report });
                                        }}
                                    >
                                        <Text className="text-white font-bold text-lg">Batafsil ko'rish</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
