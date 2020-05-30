import {StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  // Results Page
  resultsContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  resultsItem: {
    padding: 10,
    height: 200,
  },
  resultsItemImg: {
    height: 190,
  },
  resultsItemText: {
    textShadowColor: '#101010',
    textShadowRadius: 20,
    fontSize: 36,
    fontWeight: 'bold',
  },
  // Search bar
  searchBarInput: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  searchBarContainer: {
    flex: 1,
    // backgroundColor: Colors.lighter,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 0,
    margin: 5,
  },

  floatingContainer: {
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0,
    marginTop: 10,
  },
  floatingContainerBtn: {
    flex: 1,
    padding: 7,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 0,
    borderRadius: 25,
    width: 60,
  },
  // Camera
  cameraView: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // Other
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
    textAlign: 'center',
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
