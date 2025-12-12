import "./global.css";
import React from 'react';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';

// Disable strict mode for Reanimated to avoid library-internal warnings
configureReanimatedLogger({
    strict: false,
});

import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation/AppNavigator';

import { AuthProvider } from './src/context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}
