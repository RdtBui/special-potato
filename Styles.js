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
    height: 45,
    backgroundColor: Colors.white,
    borderRadius: 0,
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
    margin: 0,
  },

  headerFloatingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0,
    marginTop: 0,
    paddingRight: 12,
  },

  floatingContainerBtn: {
    width: 60,
    height: 40,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  // Camera
  cameraView: {
    flex: 4,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
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
