import React from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Tflite from 'tflite-react-native';
import ImagePicker from 'react-native-image-picker';

let tflite = new Tflite();

const height = 350;
const width = 350;
const blue = '#25d5fd';
const mobile = 'MobileNet';

class ItemScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
      source: null,
      imageHeight: height,
      imageWidth: width,
      recognitions: [],
    };
  }

  onSelectModel(model) {
    this.setState({model});
    var modelFile = 'models/mobilenet_v1_1.0_224.tflite';
    var labelsFile = 'models/mobilenet_v1_1.0_224.txt';

    tflite.loadModel(
      {
        model: modelFile,
        labels: labelsFile,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      },
    );
  }

  openCamera() {
    const options = {
      title: 'Snap a pick',
      customButtons: [
        {name: 'customOptionsKey', title: 'Snap a pick, say cheese!'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var path =
          Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
        var w = response.width;
        var h = response.height;
        this.setState({
          source: {uri: path},
          imageHeight: (h * width) / w,
          imageWidth: width,
        });

        tflite.runModelOnImage(
          {
            path,
            imageMean: 128.0,
            imageStd: 128.0,
            numResults: 3,
            threshold: 0.05,
          },
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              this.setState({recognitions: res});
            }
          },
        );
      }
    });
  }

  renderResults() {
    const {model, recognitions, imageHeight, imageWidth} = this.state;

    return recognitions.map((res, id) => {
      return (
        <Text key={id} style={{color: 'black'}}>
          {res['label'] + '-' + (res['confidence'] * 100).toFixed(0) + '%'}
        </Text>
      );
    });
  }

  render() {
    const {model, source, imageHeight, imageWidth} = this.state;
    var renderButton = m => {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onSelectModel.bind(this, m)}>
          <Text style={styles.buttonText}>{m}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.container}>
        {model ? (
          <View>
            {source ? (
              <Image
                source={source}
                style={{
                  height: imageHeight,
                  width: imageWidth,
                }}
                resizeMode="contain"
              />
            ) : (
              this.openCamera(this)
            )}
            <View style={styles.boxes}>{this.renderResults()}</View>
          </View>
        ) : (
          <View>{renderButton('Tickle Me Heaehahehah')}</View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    borderColor: blue,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: blue,
  },
  button: {
    width: 200,
    backgroundColor: blue,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  box: {
    position: 'absolute',
    borderColor: blue,
    borderWidth: 2,
  },
  boxes: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
export default ItemScanner;
