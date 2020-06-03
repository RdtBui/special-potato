/**
 * Home screen
 */

// Basic react packages
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Text, Card} from 'react-native-elements';
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
import SearchBarComponent from './SearchBarComponent';

function CameraScreen({navigation}) {
  const [resultsReturned, setResultsReturned] = useState([]);

  const returnResultsHandler = results => {
    setResultsReturned(results);
  };

  // Once HomeScreen receives the results from ItemScanner, it will hand them to ResultsScreen
  // useEffect ensures that navigation to ResultsScreen happens only after the results returned from ItemScanner and are defined
  useEffect(() => {
    if (resultsReturned !== undefined) {
      navigation.push('Results', {resultz: resultsReturned});
    }
  }, [resultsReturned]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
      {/* Main view */}
      <ItemScanner onReturn={returnResultsHandler} />
      {/* Top Header */}
      <View style={{position: 'absolute', ...Styles.floatingContainer}}>
        {/* Top Header Menu Button */}
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          onPress={() => navigation.toggleDrawer()}
          icon={<Icon reverse name="menu" size={40} />}
        />
        {/* Top Header Search Bar*/}
        <SearchBarComponent />
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
