import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { X, FlipHorizontal, Zap, ZapOff } from 'lucide-react-native';

export function AddCameraScreen({ navigation }: any) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [flash, setFlash] = useState(false);
    const cameraRef = useRef<CameraView>(null);

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

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            navigation.navigate('AddLocation', { photo });
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
                        onPress={() => navigation.goBack()}
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

                {/* Instruction Banner */}
                <View style={styles.instructionBanner}>
                    <Text style={styles.instructionText}>Muammoni Suratga Oling</Text>
                </View>

                {/* Bottom Controls */}
                <View style={styles.bottomControls}>
                    <View style={{ width: 60 }} />

                    <TouchableOpacity
                        onPress={takePicture}
                        style={styles.captureButton}
                    >
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={toggleCameraFacing}
                        style={styles.iconButton}
                    >
                        <FlipHorizontal color="white" size={28} />
                    </TouchableOpacity>
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
    instructionBanner: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#22c55e',
        marginBottom: 6,
    },
    instructionText: {
        color: '#22c55e',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 40,
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
});
