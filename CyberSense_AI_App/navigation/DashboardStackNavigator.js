import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import ReportScreen from '../screens/ReportScreen';
import LiveThreatsScreen from '../screens/LiveThreatsScreen';
import ThreatDetailScreen from '../screens/ThreatDetailScreen';

const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardHome" component={DashboardScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="LiveThreats" component={LiveThreatsScreen} />
      <Stack.Screen name="ThreatDetail" component={ThreatDetailScreen} /> 
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;