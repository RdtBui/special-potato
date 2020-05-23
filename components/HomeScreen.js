/**
 * Home screen
 */

// Basic react packages
import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import {
   SearchBar,
   Button,
   Text,
   Card,
} 
from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles'

import AboutScreen from './AboutScreen';
import SettingsScreen from './SettingsScreen';

function CameraScreen({navigation}) {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "flex-start"}}>
            <View style={Styles.floatingContainer}>
            <Button 
                type="outline" 
                buttonStyle={Styles.floatingContainerBtn}
                icon={
                <Icon reverse name="menu" size={24} />
                }
                onPress={() => navigation.toggleDrawer()}
            />
            <SearchBar 
                containerStyle={Styles.searchBar}
                placeholder="Search"
                lightTheme={true}
            />
            </View>
            <View style={{ flex: 1, direction: 'row', justifyContent: 'flex-end'}}>

            <Button 
                type="outline"
                icon={
                <Icon reverse name="camera-alt" size={48} />
                }
                onPress={() => navigation.push('Results')}
            />
            </View>
            
        </SafeAreaView >
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