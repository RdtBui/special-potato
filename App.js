/**
 * Main app
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
  FlatList
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
   SearchBar,
   Button,
   ThemeProvider 
} 
from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Navigation react package
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView  style={{ flex: 1, justifyContent: "flex-start"}}>
      <View style={styles.floatingContainer}>
        <Button 
          type="outline" 
          buttonStyle={styles.floatingContainerBtn}
          icon={
            <Icon reverse name="menu" size={24} />
          }
        />
        <SearchBar 
          containerStyle={styles.searchBar}
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

function ResultsScreen({navigation}) {
  return (
    <SafeAreaView  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.floatingContainer}>
        <Button 
          type="outline" 
          buttonStyle={styles.floatingContainerBtn}
          icon={
            <Icon reverse name="arrow-back" size={24} />
          }
          onPress={() => navigation.pop()}
        />
        <SearchBar 
          containerStyle={styles.searchBar}
          placeholder="Search"
          lightTheme={true}
        />
      </View>
      <Text>Results Screen</Text>
      <FlatList>

      </FlatList>
    </SafeAreaView >
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    backgroundColor: Colors.lighter,
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 0,
    paddingLeft: 0
  },
  floatingContainer: {
    justifyContent: 'flex-start',
    flexDirection: "row",
    borderRadius: 0,
    borderWidth: 0
  },
  floatingContainerBtn: {
    flex: 1,
    padding: 8,
    margin: 8,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    borderWidth: 0
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: "center"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
