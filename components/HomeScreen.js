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
} 
from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles'

function HomeScreen() {

    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "flex-start"}}>
            <View style={Styles.floatingContainer}>
            <Button 
                type="outline" 
                buttonStyle={Styles.floatingContainerBtn}
                icon={
                <Icon reverse name="menu" size={24} />
                }
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

export default HomeScreen;