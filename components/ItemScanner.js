import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Tflite from 'tflite-react-native';
import {RNCamera} from 'react-native-camera';

let tflite = new Tflite();

function ItemScanner(props) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [recognitions, setRecognitions] = useState([]);
  const [uriPath, setUriPath] = useState();
  const [rendered, setRendered] = useState(false);
  const [proccessed, setProccessed] = useState(false);

  useEffect(() => {
    if (modelLoaded) {
      console.log('MMODEL LOADEDED!!!');
    }
  }, [modelLoaded]);
  useEffect(() => {
    if (uriPath) {
      console.log(uriPath);
    }
  }, [uriPath]);
  useEffect(() => {
    if (proccessed) {
      console.log('recogniaazeeeedddddddd ANDD PROCCESSEDDD');
    }
  }, [proccessed]);
  useEffect(() => {
    if (recognitions) {
      console.log('diarrhea' + recognitions);
    }
  }, [recognitions]);

  const loadMobileNetModel = () => {
    var modelPath = 'models/mobilenet_v1_1.0_224.tflite';
    var labelsPath = 'models/mobilenet_v1_1.0_224.txt';
    tflite.loadModel(
      {
        model: modelPath,
        labels: labelsPath,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          setModelLoaded(true);
        }
      },
    );
  };

  const takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      setUriPath(data.uri);
    }
  };

  ///@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ inspect here @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const proccessImage = () => {
    tflite.runModelOnImage(
      {
        uriPath,
        imageMean: 128.0,
        imageStd: 128.0,
        numResults: 6,
        threshold: 0.05,
      },
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          setRecognitions(res);
          setProccessed(true);
        }
      },
    );
  };

  const renderResults = () => {
    console.log('Rendering raslt');
    setRendered(true);
    return recognitions.map((res, id) => {
      return (
        <Text key={id}>
          {res['label'] + '-' + (res['confidence'] * 100).toFixed(0) + '%'}
        </Text>
      );
    });
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
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message:
            'WE NEED YOUR FRIGGING PERMISSION TO USE YOUR CAMERA CMON MAN',
          buttonPositive: 'Yes sure why not',
          buttonNegative: 'Nahh',
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={modelLoaded ? takePicture : loadMobileNetModel}
          style={styles.capture}>
          <Text style={{fontSize: 14}}>SNAP</Text>
        </TouchableOpacity>
        <View style={styles.capture}>
          <View>{proccessed ? proccessImage : renderResults}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
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
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default ItemScanner;
