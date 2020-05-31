/**
 * Detailed screen
 */

// Basic react packages
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Card, Image, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';

function DetailedScreen({route, navigation}) {
  const {name} = route.params;
  const {uri} = route.params;

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
      <View style={Styles.floatingContainer}>
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          icon={<Icon reverse name="arrow-back" size={40} />}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <Card title={name}>
          <Image
            style={Styles.resultsItemImg}
            resizeMode="cover"
            source={{uri: uri}}
          />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailedScreen;
