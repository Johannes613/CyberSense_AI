import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuizListScreen from '../screens/QuizListScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultsScreen from '../screens/QuizResultsScreen'; 

const Stack = createStackNavigator();

const QuizStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuizList" component={QuizListScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="QuizResults" component={QuizResultsScreen} /> 
    </Stack.Navigator>
  );
};

export default QuizStackNavigator;
