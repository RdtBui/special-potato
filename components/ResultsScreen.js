/**
 * Results screen
 */

// Basic react packages
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';

function ResultsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={Styles.floatingContainer}>
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          icon={<Icon reverse name="arrow-back" size={24} />}
          onPress={() => navigation.pop()}
        />
        <SearchBar
          containerStyle={Styles.searchBar}
          placeholder="Search"
          lightTheme={true}
        />
      </View>
      <Text>Results Screen</Text>
      <FlatList />
    </SafeAreaView>
  );
}

export default ResultsScreen;
