/**
 * Results screen
 */

// Basic react packages
import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {Button, Tile} from 'react-native-elements';

// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../Styles';
import DataMapper from '../data/DataMapper';

// Import components
import SearchBarComponent from './SearchBarComponent';
import ItemList from './ItemList';

// const results = [
//   {key: 'Apple', n: 3, image: 'https://www.dw.com/image/47425871_401.jpg'},
//   {
//     key: 'Pear',
//     n: 1,
//     image: 'https://www.stemilt.com/wp-content/uploads/2016/07/Concorde.jpg',
//   },
//   {
//     key: 'Orange',
//     n: 2,
//     image:
//       'https://images2.minutemediacdn.com/image/upload/c_crop,h_2912,w_4328,x_20,y_0/v1562080363/shape/mentalfloss/29942-gettyimages-155302141.jpg?itok=UCIQE7-4',
//   },
//   {
//     key: 'Banana',
//     n: 0,
//     image:
//       'https://cdn.the-scientist.com/assets/articleNo/42182/aImg/35036/bananas-thumb-s.png',
//   },
//   {
//     key: 'Watermelon',
//     n: 0,
//     image:
//       'https://static.toiimg.com/thumb/msid-68374658,width-800,height-600,resizemode-75,imgsize-2359844,pt-32,y_pad-40/68374658.jpg',
//   },
//   {
//     key: 'Lemon',
//     n: 0,
//     image:
//       'https://assets.epicurious.com/photos/54d8e459baa3837e618b3be1/16:9/w_2560%2Cc_limit/9x4.jpg',
//   },
//   {
//     key: 'Strawberry',
//     n: 0,
//     image:
//       'https://hips.hearstapps.com/clv.h-cdn.co/assets/15/22/1432664914-strawberry-facts1.jpg',
//   },
// ];

function ResultsScreen({route, navigation}) {
  const {labels} = route.params;
  const [results, setResults] = useState([]);
  let dm = new DataMapper();

  // When the results are received in ResultsScreen, the DataMapper will fetch the fruit informations from Firebase
  useEffect(() => {
    if (labels != undefined) {
      labels.forEach(fruit => fetchDataResults(fruit));
    }
  }, [labels]);

  // Gets the data
  const fetchDataResults = async queryLabel => {
    // TODO: Replace hardcoded 'banana' with queryLabel and remove console logs once model is trained to recognize fruits
    // TODO: Make sure data is loaded completely before displaying FlatList
    let fruit = await dm.getFruit('banana');
    setResults(currentResults => [...currentResults, fruit]);
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      {/* Top Header */}
      <View style={Styles.headerFloatingContainer}>
        <Button
          type="outline"
          buttonStyle={Styles.floatingContainerBtn}
          onPress={() => navigation.pop()}
          icon={<Icon reverse name="arrow-back" size={30} />}
        />
        {/* Top Header Search Bar*/}
        <SearchBarComponent />
      </View>
      {/* Flatlist of results */}
      <ItemList listData={results} navigation={navigation} />
    </SafeAreaView>
  );
}

export default ResultsScreen;
