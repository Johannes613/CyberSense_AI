import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, BookOpenText, Bug, User } from 'phosphor-react-native';
import DashboardStackNavigator from './DashboardStackNavigator';
import LessonStackNavigator from './LessonStackNavigator';
import SimulatorStackNavigator from './SimulatorStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator'; 

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#18181D', borderTopColor: '#2D2D33', height: 85, paddingTop: 10 },
        tabBarActiveTintColor: '#8A63D2',
        tabBarInactiveTintColor: '#8D8D93',
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardStackNavigator} options={{ tabBarIcon: ({ color }) => (<House color={color} size={30} weight="fill" />) }} />
      <Tab.Screen name="Lessons" component={LessonStackNavigator} options={{ tabBarIcon: ({ color }) => (<BookOpenText color={color} size={30} weight="fill" />) }} listeners={({ navigation }) => ({ tabPress: (e) => { e.preventDefault(); navigation.navigate('Lessons', { screen: 'LessonsList' }); }, })} />
      <Tab.Screen name="Simulator" component={SimulatorStackNavigator} options={{ tabBarIcon: ({ color }) => (<Bug color={color} size={30} weight="fill" />) }} />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator} 
        options={{ tabBarIcon: ({ color }) => (<User color={color} size={30} weight="fill" />) }} 
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;