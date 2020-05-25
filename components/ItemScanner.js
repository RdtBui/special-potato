// Basic react packages
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

// React Native Library to retrieve TensorFlow Lite API
import Tflite from 'tflite-react-native';

// Camera Package
import {RNCamera} from 'react-native-camera';

// TODO: Release resources by adding tflite.close() somewhere
// TODO: Might need to configure for iOS for the dependencies and packages
// TODO: Find a more practical way to load the model (currently inside function that loads the model)
// TOOD: Export the embedded style component to the external style sheet

let tflite = new Tflite();

function ItemScanner(props) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [recognitions, setRecognitions] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);

  const loadMobileNetModel = () => {
    const modelPath = 'models/mobilenet_v1_1.0_224.tflite';
    const labelsPath = 'models/mobilenet_v1_1.0_224.txt';
    tflite.loadModel(
      {
        model: modelPath,
        labels: labelsPath,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          setModelLoaded(res);
          console.log('Model loaded: ' + res);
        }
      },
    );
  };

  // Takes a camera shot and proccesses the image to return the classification of the image
  const takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      const path = data.uri;
      console.log('Image URI path: ' + path);

      tflite.runModelOnImage(
        {
          path,
          imageMean: 128.0,
          imageStd: 128.0,
          numResults: 6,
          threshold: 0.05,
        },
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            /* The results returned into recognitions are arrays containing dictionaries.
               Output Format:
               {
                 index:0,
                 label: "crispy chicken",
                 confidence: 0.666
               }
            */
            setRecognitions(res);
            setResultsLoaded(true);
            console.log('Image Classified');
          }
        },
      );
    }
  };

  const renderResults = () => {
    if (resultsLoaded) {
      recognitions.map(res => {
        console.log(
          res['label'] + '-' + (res['confidence'] * 100).toFixed(0) + '%',
        );
      });
    }
  };

  const instructionAlert = () => {
    loadMobileNetModel();
    Alert.alert(
      'chicken noodle soup',
      'Press Cheese first to take a picture, then press Shawarma. The results should display in the console in debug mode.',
      [
        {
          text: 'Gotcha!',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={modelLoaded ? takePicture : instructionAlert}
          style={styles.capture}>
          <Text style={{fontSize: 14}}>Cheese</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={renderResults} style={styles.capture}>
          <Text style={{fontSize: 14}}>Shawarma</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    backgroundColor: 'pink',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ItemScanner;
