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

import Markdown from 'react-native-markdown-display';

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
        <Text h4 h4Style={Styles.headerTitle}>
          {fruit.title}
        </Text>
      </View>
      <ScrollView>
        <Card containerStyle={Styles.detailedCard}>
          <Image
            style={Styles.resultsItemImg}
            resizeMode="cover"
            source={{uri: fruit.imageUrl}}
          />
          <View style={Styles.cardContent}>
            <Markdown>{fruit.description}</Markdown>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailedScreen;
