import { StyleSheet } from "react-native"

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
    searchBar: {
      flex: 1,
      backgroundColor: Colors.lighter,
      borderWidth: 0,
      borderRadius: 0,
      borderBottomWidth: 0,
      paddingLeft: 0
    },
    floatingContainer: {
      justifyContent: 'flex-start',
      flexDirection: "row",
      borderRadius: 0,
      borderWidth: 0,
      height: 65,
    },
    floatingContainerBtn: {
      flex: 1,
      padding: 8,
      margin: 8,
      paddingLeft: 8,
      paddingRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: "hidden",
      borderWidth: 0
    },
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
      textAlign: "center"
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
});
