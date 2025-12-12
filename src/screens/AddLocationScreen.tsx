import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check, MapPin, LocateFixed, Plus, Minus } from 'lucide-react-native';
import { darkMapStyle } from '../constants/mapStyle';
import * as Location from 'expo-location';

export function AddLocationScreen({ navigation, route }: any) {
    const { photoUri } = route.params || {};
    const [location, setLocation] = useState({
        latitude: 41.2995,
        longitude: 69.2401,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });
    const [address, setAddress] = useState('Toshkent sh.');
    const [loading, setLoading] = useState(false);

    const getAddressFromCoords = async (lat: number, lon: number) => {
        try {
            const geocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
            if (geocode.length > 0) {
                const item = geocode[0];
                const addressParts = [item.district, item.city, item.region].filter(Boolean);
                setAddress(addressParts.join(', ') || 'Noma\'lum manzil');
            }
        } catch (error) {
            console.log('Geocoding error:', error);
            setAddress('Manzilni aniqlab bo\'lmadi');
        }
    };

    const onFindMe = async () => {
        setLoading(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Joylashuvga ruxsat berilmadi');
                setLoading(false);
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            const newRegion = {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
            setLocation(newRegion);
            getAddressFromCoords(loc.coords.latitude, loc.coords.longitude);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onRegionChangeComplete = (region: any) => {
        setLocation(region);
        getAddressFromCoords(region.latitude, region.longitude);
    };

    const mapRef = React.useRef<MapView>(null);

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

    return (
        <View className="flex-1 bg-white">
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={location}
                onRegionChangeComplete={onRegionChangeComplete}
            >
                <Marker coordinate={location} />
            </MapView>

            <SafeAreaView className="absolute top-0 w-full pointer-events-none">
                <View className="px-6 py-4 flex-row items-center justify-between pointer-events-auto">
                    <TouchableOpacity
                        onPress={() => {
                            // "report yuborishda lokatsiya tanlash pagedan chap tomon tepa burchakdagi orqaga tugma bosilganda rasmlarni review pagega otish kerak"
                            navigation.navigate('ImageReview', { photos: route.params?.existingPhotos || [photoUri] });
                        }}
                        className="bg-white p-3 rounded-xl shadow-sm"
                    >
                        <ArrowLeft color="#374151" size={24} />
                    </TouchableOpacity>
                    <View className="bg-white px-4 py-2 rounded-xl shadow-sm">
                        <Text className="font-bold text-gray-900">Joylashuvni belgilang</Text>
                    </View>
                    <View style={{ width: 48 }} />
                </View>
            </SafeAreaView>

            {/* Map Controls */}
            <View className="absolute bottom-[240px] right-6 z-10 gap-2">
                <TouchableOpacity onPress={onZoomIn} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 active:bg-gray-50">
                    <Plus color="#374151" size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onZoomOut} className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 active:bg-gray-50">
                    <Minus color="#374151" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onFindMe}
                    className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 active:bg-gray-50 mt-2 items-center justify-center"
                >
                    {loading ? <ActivityIndicator color="#374151" size="small" /> : <LocateFixed size={24} color="#374151" />}
                </TouchableOpacity>
            </View>

            {/* Hint */}
            <View className="absolute bottom-[240px] left-6 z-10 max-w-[200px]">
                <View className="bg-[#37a16a] px-3 py-2 rounded-xl shadow-sm border border-green-600">
                    <Text className="text-xs text-white font-medium">Xaritadan qo'lda tanlashingiz mumkin</Text>
                </View>
            </View>

            {/* Bottom Sheet */}
            <View className="absolute bottom-0 w-full p-6 bg-white rounded-t-3xl shadow-xl">
                <View className="flex-row items-center gap-4 mb-6">
                    <Image source={{ uri: photoUri }} className="w-16 h-16 rounded-xl bg-gray-200" />
                    <View className="flex-1">
                        <Text className="font-bold text-gray-900 text-lg">Manzil</Text>
                        <Text className="text-gray-500" numberOfLines={2}>{address}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    className="bg-[#37a16a] w-full py-4 rounded-xl flex-row items-center justify-center gap-2"
                    onPress={() => navigation.navigate('AddAnalysis', { photoUri, location, address })}
                >
                    <Check color="white" size={24} />
                    <Text className="text-white font-bold text-lg">Tasdiqlash</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
