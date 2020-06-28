/**
 * ItemList to display a FlatList component
 */

// Basic react packages
import React from 'react';
import {View, FlatList} from 'react-native';
import {Tile} from 'react-native-elements';

// Import assets
import Styles from '../Styles';

function ItemList(props) {
  const renderFruitItem = itemData => (
    <Tile
      featured
      containerStyle={Styles.resultsItem}
      title={itemData.item.title}
      titleStyle={Styles.resultsItemText}
      imageContainerStyle={Styles.resultsItemImg}
      imageSrc={{uri: itemData.item.imageUrl}}
      onPress={() =>
        props.navigation.navigate('Details', {
          fruit: itemData.item,
        })
      }
    />
  );

  return (
    // Flatlist of results
    <View style={Styles.resultsContainer}>
      <FlatList
        data={props.listData}
        keyExtractor={item => item.id}
        renderItem={renderFruitItem}
      />
    </View>
  );
}

export default ItemList;
