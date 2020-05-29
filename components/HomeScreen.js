/**
 * Home screen
 */

// Basic react packages
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {SearchBar, Button, Text, Card} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';

// Import components
import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';
import ItemScanner from './ItemScanner';

function CameraScreen({navigation}) {
  const returnResultsHandler = results => {
    console.log('You returned to HomeScreen: *******************************');
    // Display returned results from ItemScanner in the console
    results.map(res => {
      console.log(
        res['label'] + '-' + (res['confidence'] * 100).toFixed(0) + '%',
      );
    });
    // Pushes ResultsScreen on top of screen stack upon receiving results from ItemScanner
    console.log('Navigating from HomeScreen to ResultsScreen');
    navigation.push('Results');
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
      {/* Main view */}
      <ItemScanner onReturn={returnResultsHandler} />
      {/* Top search bar */}
      <View style={{position: 'absolute', ...Styles.floatingContainer}}>
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          icon={<Icon reverse name="menu" size={24} />}
          onPress={() => navigation.toggleDrawer()}
        />
        <SearchBar
          containerStyle={Styles.searchBar}
          placeholder="Search"
          lightTheme={true}
        />
      </View>
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={CameraScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default HomeScreen;
