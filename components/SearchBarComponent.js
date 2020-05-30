// Basic react packages
import React from 'react';
import {SearchBar} from 'react-native-elements';

// Import assets
import Styles from '../Styles';

function SearchBarComponent(props) {
  return (
    <SearchBar
      inputContainerStyle={Styles.searchBarInput}
      containerStyle={Styles.searchBarContainer}
      placeholder="Search"
      lightTheme={true}
    />
  );
}

export default SearchBarComponent;
