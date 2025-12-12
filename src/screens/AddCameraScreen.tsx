import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { X, FlipHorizontal, Zap, ZapOff, ArrowRight } from 'lucide-react-native';

import { useEffect } from 'react';

export function AddCameraScreen({ navigation, route }: any) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState(false);
    const cameraRef = useRef<CameraView>(null);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);

    useEffect(() => {
        if (route.params?.existingPhotos) {
            setCapturedImages(route.params.existingPhotos);
        }
    }, [route.params]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-white text-center mb-4">Kamera ruxsati kerak</Text>
                <TouchableOpacity onPress={requestPermission} className="bg-green-500 px-6 py-3 rounded-xl">
                    <Text className="text-white font-bold">Ruxsat berish</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const handleClose = () => {
        // "kamera pageda tep chap burchakdagi x bosilsa homepage qaytsin"
        navigation.navigate('MainTabs');
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo && photo.uri) {
                // Check if we are replacing a specific index
                if (route.params?.replaceIndex !== undefined && route.params?.replaceIndex !== null) {
                    const updatedImages = [...capturedImages];
                    updatedImages[route.params.replaceIndex] = photo.uri;
                    // Go back to Review immediately with updated list
                    navigation.navigate('ImageReview', { photos: updatedImages });
                } else {
                    // Normal "Add" mode
                    const newImages = [...capturedImages, photo.uri];
                    setCapturedImages(newImages);

                    // If we reached 3, or if we were "Adding" from Review page (which implies we want to go back to review after taking one usually? 
                    // User said: "uni bosib rasmni 3tagacha toldirish mumkni boladi". 
                    // If user came from "Add" button in Review, they might want to take multiple until 3. 
                    // Current logic: If 3, go to Review. 
                    if (newImages.length >= 3) {
                        navigation.navigate('ImageReview', { photos: newImages });
                    }
                }
            }
        }
    };

    const handleNext = () => {
        if (capturedImages.length > 0) {
            navigation.navigate('ImageReview', { photos: capturedImages });
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                ref={cameraRef}
                enableTorch={flash}
            />

            {/* Controls Overlay */}
            <View style={styles.overlay}>
                {/* Top Controls */}
                <View style={styles.topControls}>
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.iconButton}
                    >
                        <X color="white" size={28} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setFlash(!flash)}
                        style={styles.iconButton}
                    >
                        {flash ? <Zap color="#fbbf24" size={28} /> : <ZapOff color="white" size={28} />}
                    </TouchableOpacity>
                </View>

                {/* Bottom Controls */}
                <View style={styles.bottomControlsContainer}>

                    {/* Instruction Banner - Moved to bottom */}
                    <View style={styles.instructionBanner}>
                        <Text style={styles.instructionText}>Muammoni Suratga Oling</Text>
                    </View>
                    <Text className="text-white text-xs text-center mb-4 opacity-70">Maksimum 3 tagacha rasm</Text>

                    <View style={styles.bottomControls}>
                        {/* Left: Thumbnail (Previous taken photo) */}
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            {capturedImages.length > 0 ? (
                                <TouchableOpacity
                                    style={styles.thumbnailContainer}
                                    onPress={() => navigation.navigate('ImageReview', { photos: capturedImages })}
                                >
                                    <Image source={{ uri: capturedImages[capturedImages.length - 1] }} style={styles.thumbnail} />
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{capturedImages.length}</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <View style={{ width: 60 }} />
                            )}
                        </View>

                        {/* Center: Capture Button */}
                        <TouchableOpacity
                            onPress={takePicture}
                            style={styles.captureButton}
                        >
                            <View style={styles.captureButtonInner} />
                        </TouchableOpacity>

                        {/* Right: Next Button or Flip */}
                        <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            {capturedImages.length > 0 ? (
                                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                                    <ArrowRight color="white" size={24} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={toggleCameraFacing}
                                    style={styles.iconButton}
                                >
                                    <FlipHorizontal color="white" size={28} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
    },
    topControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomControlsContainer: {
        paddingBottom: 40,
        alignItems: 'center',
    },
    instructionBanner: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 24,
        paddingVertical: 8, // Reduced vertical padding
        borderRadius: 16,
        borderWidth: 1, // Thinner border
        borderColor: '#22c55e',
        marginBottom: 4,
    },
    instructionText: {
        color: '#22c55e',
        fontSize: 16, // Slightly smaller
        fontWeight: 'bold',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 10,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    captureButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'white',
    },
    thumbnailContainer: {
        position: 'relative',
        width: 56,
        height: 56,
    },
    thumbnail: {
        width: 56,
        height: 56,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'white',
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#ef4444',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'white',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    nextButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#22c55e',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
