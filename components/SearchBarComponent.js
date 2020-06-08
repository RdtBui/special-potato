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
        size: 30,
        backgroundColor: '#cdeac0',
        height: 55,
        width: 55,
        justifyContent: 'center',
        color: Colors.white,
      }}
      leftIconContainerStyle={{
        transform: [{translateX: -8}],
      }}
      inputStyle={{fontSize: 20, textAlignVertical: 'center'}}
      inputContainerStyle={Styles.searchBarInput}
      containerStyle={Styles.searchBarContainer}
      placeholder="Search"
      lightTheme={true}
    />
  );
}

export default SearchBarComponent;
