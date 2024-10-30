import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Выбор категории' }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: 'Выбор изображения' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
