import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, RefreshCcw, ArrowRight, X, Plus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export function ImageReviewScreen({ navigation, route }: any) {
    const { photos } = route.params || { photos: [] };
    const [currentPhotos, setCurrentPhotos] = React.useState<string[]>(photos);
    const [activeIndex, setActiveIndex] = React.useState(0);

    // Update currentPhotos if route params change (e.g. returning from Retake)
    React.useEffect(() => {
        if (route.params?.photos) {
            setCurrentPhotos(route.params.photos);
        }
    }, [route.params?.photos]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveIndex(roundIndex);
    };

    const handleDelete = (index: number) => {
        const newPhotos = [...currentPhotos];
        newPhotos.splice(index, 1);
        setCurrentPhotos(newPhotos);

        if (newPhotos.length === 0) {
            navigation.navigate('AddCamera');
        }
    };

    const handleRetake = () => {
        // Simple logic: Go back to camera, passing current photos? 
        // Or just go back and let user take new ones to append?
        // User request: "qayta olish bosilsa yanan shu rasm orniga boshqa oladi".
        // Simplest implementation: Delete ALL and restart? Or just start adding more?
        // "rasm reviewda ochribtashloasa kameraga qaytadi avtomatik" -> If deleted, go back.
        // "qayta olish" -> Retake specific photo?
        // Let's implement Retake as: Go back to camera to CAPTURE MORE, or replace?
        // I will implement "Go back to Camera" to add more or replace.
        navigation.navigate('AddCamera', { existingPhotos: currentPhotos });
    };

    const handleNext = () => {
        if (currentPhotos.length > 0) {
            // Take the first photo as the main one for location, or pass all?
            // Existing logic uses `photoUri` (string). Now we should pass `photos` (array).
            // But we need to update `AddLocationScreen` to handle array or just pick one thumbnail.
            // Let's pass `photoUri: currentPhotos[0]` for compatibility and `photos: currentPhotos` for future.
            navigation.navigate('AddLocation', { photoUri: currentPhotos[0], photos: currentPhotos });
        }
    };

    if (currentPhotos.length === 0) {
        return null; // Should have navigated back
    }

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 justify-center">
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    className="h-[500px]"
                    onMomentumScrollEnd={handleScroll}
                >
                    {currentPhotos.map((photo, index) => (
                        <View key={index} style={{ width: width, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={{ uri: photo }}
                                style={{ width: width - 40, height: 500, borderRadius: 24 }}
                                resizeMode="cover"
                            />
                            <View className="absolute top-4 right-8 bg-black/50 p-2 rounded-full">
                                <Text className="text-white font-bold">{index + 1}/{currentPhotos.length}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleDelete(index)}
                                className="absolute top-4 right-8 mt-12 bg-red-500 p-3 rounded-full"
                            >
                                <Trash2 color="white" size={24} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View className="flex-row justify-between items-center px-6 pb-8 gap-3">
                {/* Replace Button (Qayta olish) */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddCamera', {
                            existingPhotos: currentPhotos,
                            replaceIndex: activeIndex
                        });
                    }}
                    className="flex-1 flex-row items-center justify-center gap-2 bg-gray-800 py-4 rounded-2xl"
                >
                    <RefreshCcw color="white" size={20} />
                    <Text className="text-white font-bold text-base">Qayta olish</Text>
                </TouchableOpacity>

                {/* Add Button (Qo'shish) - Only if < 3 */}
                {currentPhotos.length < 3 && (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AddCamera', { existingPhotos: currentPhotos });
                        }}
                        className="flex-1 flex-row items-center justify-center gap-2 bg-gray-800 py-4 rounded-2xl"
                    >
                        <Plus color="white" size={20} />
                        <Text className="text-white font-bold text-base">Qo'shish</Text>
                    </TouchableOpacity>
                )}

                {/* Next Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    className="flex-1 flex-row items-center justify-center gap-2 bg-[#37a16a] py-4 rounded-2xl"
                >
                    <Text className="text-white font-bold text-base">Keyingi</Text>
                    <ArrowRight color="white" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
