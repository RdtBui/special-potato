// Basic react packages
import React from 'react';
import {SearchBar} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Import assets
import Styles from '../Styles';

function SearchBarComponent(props) {
  return (
    <SearchBar
      searchIcon={false}
      cancelIcon={false}
      inputStyle={{fontSize: 20, textAlignVertical: 'center'}}
      inputContainerStyle={Styles.searchBarInput}
      containerStyle={Styles.searchBarContainer}
      placeholder="Search"
      lightTheme={true}
    />
  );
}

export default SearchBarComponent;
