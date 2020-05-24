/**
 * Main app
 */

// Basic react packages
import React from 'react';
import {
   ThemeProvider 
} 
from 'react-native-elements';

// Navigation react package
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import components
import HomeScreen from './components/HomeScreen';
import ResultsScreen from './components/ResultsScreen';
import DetailedScreen from './components/DetailedScreen';

const Stack = createStackNavigator()

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>  
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Details" component={DetailedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
