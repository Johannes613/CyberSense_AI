import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SimulatorScreen from '../screens/SimulatorScreen';
import EmailDetailScreen from '../screens/EmailDetailScreen';

const Stack = createStackNavigator();

const SimulatorStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SimulatorList" component={SimulatorScreen} />
      <Stack.Screen name="EmailDetail" component={EmailDetailScreen} />
    </Stack.Navigator>
  );
};

export default SimulatorStackNavigator;
