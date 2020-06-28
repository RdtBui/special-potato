/**
 * About screen
 */

// Basic react packages
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Card, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';

function FavoriteScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-start'}}>
      <View style={Styles.headerFloatingContainer}>
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          icon={<Icon reverse name="arrow-back" size={30} />}
          onPress={() => navigation.navigate('Home')}
        />
        <Text h4 style={{textAlignVertical: 'center'}}>
          Favorites
        </Text>
      </View>
      <ScrollView>
        <Card>
          <Text>Insert FlatList Here</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FavoriteScreen;
