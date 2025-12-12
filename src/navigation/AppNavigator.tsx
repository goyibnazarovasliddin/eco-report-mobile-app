import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterPhoneScreen } from '../screens/RegisterPhoneScreen';
import { RegisterDataScreen } from '../screens/RegisterDataScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';

// ProfileScreen is in TabNavigator

import { TabNavigator } from './TabNavigator';
import { AddCameraScreen } from '../screens/AddCameraScreen';
import { AddLocationScreen } from '../screens/AddLocationScreen';
import { AddAnalysisScreen } from '../screens/AddAnalysisScreen';
import { AddSuccessScreen } from '../screens/AddSuccessScreen';
import { MyReportsScreen } from '../screens/MyReportsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { LevelScreen } from '../screens/LevelScreen';
import { ReportDetailScreen } from '../screens/ReportDetailScreen';
import { WeatherDetailScreen } from '../screens/WeatherDetailScreen';
import { AQIDetailScreen } from '../screens/AQIDetailScreen';
import { HumidityDetailScreen } from '../screens/HumidityDetailScreen';
import { NewsDetailScreen } from '../screens/NewsDetailScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
      <Stack.Screen name="RegisterData" component={RegisterDataScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="AddCamera" component={AddCameraScreen} options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="AddLocation" component={AddLocationScreen} />
      <Stack.Screen name="AddAnalysis" component={AddAnalysisScreen} />
      <Stack.Screen name="AddSuccess" component={AddSuccessScreen} />
      <Stack.Screen name="MyReports" component={MyReportsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
      <Stack.Screen name="WeatherDetail" component={WeatherDetailScreen} />
      <Stack.Screen name="AQIDetail" component={AQIDetailScreen} />
      <Stack.Screen name="HumidityDetail" component={HumidityDetailScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
