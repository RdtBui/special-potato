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
  const {fruit} = route.params;

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
      <View style={{...Styles.headerFloatingContainer}}>
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          icon={<Icon reverse name="arrow-back" size={30} />}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <Card title={fruit.title}>
          <Image
            style={Styles.resultsItemImg}
            resizeMode="cover"
            source={{uri: fruit.imageUrl}}
          />
          <Text>Description: {fruit.description}</Text>
          <Text>Peak seasons are/is {fruit.peakSeason}</Text>
          <Text>How to select ripe fruit: {fruit.selectInstructions}</Text>
          <Text>How to eat: {fruit.eatInstructions}</Text>
          <Text>Color is {fruit.color}</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailedScreen;
