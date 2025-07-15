import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LessonsScreen from '../screens/LessonsScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';

const Stack = createStackNavigator();

const LessonStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LessonsList" component={LessonsScreen} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
    </Stack.Navigator>
  );
};

export default LessonStackNavigator;
