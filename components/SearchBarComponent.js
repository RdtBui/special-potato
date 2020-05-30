// Basic react packages
import React from 'react';
import {SearchBar} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Import assets
import Styles from '../Styles';

function SearchBarComponent(props) {
  return (
    <SearchBar
      searchIcon={{
        size: 35,
        backgroundColor: '#56C596',
        height: 55,
        width: 55,
        justifyContent: 'center',
        color: Colors.white,
      }}
      leftIconContainerStyle={{
        transform: [{translateX: -8}],
      }}
      inputStyle={{fontSize: 25}}
      inputContainerStyle={Styles.searchBarInput}
      containerStyle={Styles.searchBarContainer}
      placeholder="Search"
      lightTheme={true}
    />
  );
}

export default SearchBarComponent;
