import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {fetch} from '@tensorflow/tfjs-react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as jpeg from 'jpeg-js';
import ImagePicker from 'react-native-image-picker';
import Amplify, {API} from 'aws-amplify';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: '<Your-API-Name>',
        endpoint: '<Your-API-Endpoint>',
      },
    ],
  },
});

class App extends React.Component {
  state = {
    isTfReady: false,
    isModelReady: false,
    predictions: null,
    image: null,
    base64String: '',
    capturedImage: '',
    imageSubmitted: false,
    s3ImageUrl: '',
  };

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });
    this.model = await mobilenet.load();
    this.setState({isModelReady: true});
    this.askCameraPermission();
  }

  askCameraPermission = async () => {
    if (Constants.platform.android) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Please provide camera roll permissions to make this work!');
      }
    }
  };

  imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true;
    const {width, height, data} = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  }

  classifyImage = async () => {
    try {
      const imageAssetPath = this.state.s3ImageUrl;
      const response = await fetch(imageAssetPath, {}, {isBinary: true});
      const rawImageData = await response.arrayBuffer();
      const imageTensor = this.imageToTensor(rawImageData);
      const predictions = await this.model.classify(imageTensor);
      this.setState({predictions});
    } catch (error) {
      console.log(error);
    }
  };

  renderPrediction = prediction => {
    return (
      <Text key={prediction.className} style={styles.text}>
        {prediction.className}
      </Text>
    );
  };

  captureImageButtonHandler = () => {
    this.setState({
      imageSubmitted: false,
      predictions: null,
    });
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          const source = {uri: 'data:image/jpeg;base64,' + response.data};
          this.setState({
            capturedImage: response.uri,
            base64String: source.uri,
          });
        }
      },
    );
  };

  submitButtonHandler = () => {
    if (
      this.state.capturedImage == '' ||
      this.state.capturedImage == undefined ||
      this.state.capturedImage == null
    ) {
      alert('Please Capture the Image');
    } else {
      this.setState({
        imageSubmitted: true,
      });
      const apiName = '<Your-API-Name>';
      const path = '<Your-API-Path>';
      const init = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-amz-json-1.1',
        },
        body: JSON.stringify({
          Image: this.state.base64String,
          name: 'testImage.jpg',
        }),
      };

      API.post(apiName, path, init).then(response => {
        this.setState({
          s3ImageUrl: response,
        });
        {
          this.state.s3ImageUrl !== '' ? this.classifyImage() : '';
        }
      });
    }
  };

  render() {
    const {isModelReady, predictions} = this.state;
    const capturedImageUri = this.state.capturedImage;
    const imageSubmittedCheck = this.state.imageSubmitted;

    return (
      <View style={styles.MainContainer}>
        <ScrollView>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              textAlign: 'center',
              marginBottom: 15,
              marginTop: 10,
            }}>
            Object Detection
          </Text>

          {this.state.capturedImage !== '' && (
            <View style={styles.imageholder}>
              <Image
                source={{uri: this.state.capturedImage}}
                style={styles.previewImage}
              />
            </View>
          )}

          {this.state.capturedImage != '' && imageSubmittedCheck && (
            <View style={styles.predictionWrapper}>
              {isModelReady && capturedImageUri && imageSubmittedCheck && (
                <Text style={styles.text}>
                  Predictions: {predictions ? '' : 'Loading...'}
                </Text>
              )}
              {isModelReady &&
                predictions &&
                predictions.map(p => this.renderPrediction(p))}
            </View>
          )}

          <TouchableHighlight
            style={[styles.buttonContainer, styles.captureButton]}
            onPress={this.captureImageButtonHandler}>
            <Text style={styles.buttonText}>Capture Image</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.submitButton]}
            onPress={this.submitButtonHandler}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
  predictionWrapper: {
    height: 100,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%',
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 30,
  },
  captureButton: {
    backgroundColor: '#337ab7',
    width: 350,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#C0C0C0',
    width: 350,
    marginTop: 5,
  },
  imageholder: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#eee',
    width: '50%',
    height: 150,
    marginTop: 10,
    marginLeft: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});

export default App;
