// Basic react packages
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';

ItemScanner;
// Import assets
import Icon from 'react-native-vector-icons/MaterialIcons';

// React Native Library to retrieve TensorFlow Lite API
import Tflite from 'tflite-react-native';

// Camera Package
import {RNCamera} from 'react-native-camera';

// TOOD: Export the embedded style component to the external style sheet

let tflite = new Tflite();

function ItemScanner(props) {
  const [recognitions, setRecognitions] = useState([]);
  const [resultsLoaded, setResultsLoaded] = useState(false);

  useEffect(() => {
    if (resultsLoaded) {
      //renderResults();
      // Release recources from TFlite before returning results to HomeScreen
      tflite.close();
      props.onReturn(recognitions);
    }
  });

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

      await loadMobileNetModel();

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
            console.log('Image Classified');
            setRecognitions(res);
            setResultsLoaded(true);
          }
        },
      );
    }
  };

  const renderResults = () => {
    if (resultsLoaded) {
      console.log('Results from ItemScanner: *******************************');
      recognitions.map(res => {
        console.log(
          res['label'] + '-' + (res['confidence'] * 100).toFixed(0) + '%',
        );
      });
    }
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
      <View style={{flex: 1, direction: 'row', justifyContent: 'flex-end'}}>
        <Button
          type="outline"
          icon={<Icon reverse name="camera-alt" size={48} />}
          onPress={takePicture}
        />
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
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
