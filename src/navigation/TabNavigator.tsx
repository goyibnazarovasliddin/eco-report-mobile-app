import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AddCameraScreen } from '../screens/AddCameraScreen';
import { Home, Camera, User } from 'lucide-react-native';
import { View, TouchableOpacity, Text } from 'react-native';

// Empty component for tab placeholder
const EmptyComponent = () => null;

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 80,
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    paddingBottom: 20,
                    paddingTop: 0, // Removed top padding as requested
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarActiveTintColor: '#37a16a',
                tabBarInactiveTintColor: '#9ca3af',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: 4,
                },
            }}
        >
            <Tab.Screen
                name="TabHome"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Asosiy',
                    tabBarIcon: ({ color }) => <Home color={color} size={24} strokeWidth={2} />,
                }}
            />
            <Tab.Screen
                name="TabAdd"
                component={EmptyComponent}
                options={{
                    tabBarLabel: '', // No label
                    tabBarIcon: ({ focused }) => (
                        <View className="items-center justify-center">
                            <View className="bg-[#37a16a] p-4 rounded-full shadow-lg">
                                <Camera color="white" size={32} strokeWidth={2} />
                            </View>
                        </View>
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('AddCamera');
                    },
                })}
            />
            <Tab.Screen
                name="TabProfile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color }) => <User color={color} size={24} strokeWidth={2} />,
                }}
            />
        </Tab.Navigator>
    );
}
