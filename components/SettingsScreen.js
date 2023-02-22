/**
 * About screen
 */

// Basic react packages
import React from 'react';
import {useState} from 'react';
import {SafeAreaView, Switch, View} from 'react-native';
import {Button, Card, Text} from 'react-native-elements';

// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import {ScrollView} from 'react-native-gesture-handler';

function SettingsScreen({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
      <View style={Styles.headerFloatingContainer}>
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          icon={<Icon reverse name="arrow-back" size={30} />}
          onPress={() => navigation.navigate('Home')}
        />
        <Text h4 h4Style={Styles.headerTitle}>
          Settings
        </Text>
      </View>
      <Card>
        <ScrollView>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>Test</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
        </ScrollView>
      </Card>
    </SafeAreaView>
  );
}

export default SettingsScreen;
