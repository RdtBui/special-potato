import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import Tflite from 'tflite-react-native';
import {RNCamera} from 'react-native-camera';

let tflite = new Tflite();

function ItemScanner(props) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [model, setModel] = useState();
  const [recognitions, setRecognitions] = useState([]);
  const [uriPath, setUriPath] = useState();
  const [rendered, setRendered] = useState(false);
  const [classified, setClassified] = useState(false);
  const [path, setPath] = useState('');

  useEffect(() => {
    if (modelLoaded) {
      console.log('Model reloaded: ' + model);
    }
  });
  useEffect(() => {
    if (uriPath) {
      console.log(uriPath);
      classifyImage();
      //() => console.log('Classified just after uripath defined:' + classified);
    }
  }, [uriPath, classified]);
  useEffect(() => {
    if (classified) {
      console.log('recogniaazeeeedddddddd ANDD PROCCESSEDDD');
    }
  }, [classified]);

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
          console.log('Model loaded: ' + res);
          setModelLoaded(true);
          setModel(res);
        }
      },
    );
  };

  const takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      const path = data.uri;
      // const path = data.uri.replace('file:///', 'content://');
      console.log(data.uri);
      console.log(path);
      setUriPath(path);
    }
  };

  ///@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ inspect here @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const classifyImage = () => {
    console.log('before running model on image: ' + model);
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
          () =>
            console.log(
              'tflite: ' + tflite + ' and uriPath: ' + uriPath + ' res: ' + res,
            );
          setRecognitions(res);
          //setClassified(true);
        }
      },
    );
  };

  const renderr = () => {
    if (uriPath) {
      return (
        <ImageBackground
          style={{width: 200, height: 200}}
          source={{uri: uriPath}}
        />
      );
    }
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
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{fontSize: 14}}>SNAP</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  // TODO: Automatically load model at beginning of app and store it in a global variable
  Alert.alert('chicken noodle soup', 'Say cheese weezz', [
    {
      text: 'Gotcha!',
      onPress: () => loadMobileNetModel(),
    },
  ]);

  return renderr();
  // <View style={styles.container}>
  //   <RNCamera
  //     ref={ref => {
  //       this.camera = ref;
  //     }}
  //     style={styles.preview}
  //     type={RNCamera.Constants.Type.back}
  //     flashMode={RNCamera.Constants.FlashMode.on}
  //     androidCameraPermissionOptions={{
  //       title: 'Permission to use camera',
  //       message:
  //         'WE NEED YOUR FRIGGING PERMISSION TO USE YOUR CAMERA CMON MAN',
  //       buttonPositive: 'Yes sure why not',
  //       buttonNegative: 'Nahh',
  //     }}
  //   />
  //   <View style={styles.buttonContainer}>
  //     <TouchableOpacity
  //       onPress={modelLoaded ? takePicture : null}
  //       style={styles.capture}>
  //       <Text style={{fontSize: 14}}>SNAP</Text>
  //     </TouchableOpacity>
  //     <View style={styles.capture}>
  //       <View>{renderResults}</View>
  //     </View>
  //   </View>
  // </View>
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
