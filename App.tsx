// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './ProductListScreen';
import IntroScreen from './Intro';
import EvaluationForm from './EvaluationForm';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroScreen">
        <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
        <Stack.Screen name="EvaluationForm" component={EvaluationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
