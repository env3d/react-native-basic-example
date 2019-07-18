// Camera

import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends React.Component {

  sendToVisionAPI(dataUrl, token) {    
    fetch(`https://vision.googleapis.com/v1/images:annotate`, {
	    method: 'POST',
	    headers: {
        'Authorization': `Bearer ${token}`,
		    'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
		    requests: [
		      {
			      features: [
			        {
				        type: 'LABEL_DETECTION'
			        },
			        {
				        type: 'TEXT_DETECTION'
			        }			      
			      ],
			      image: {
			        // have to extract only the image data from dataURL
			        content: dataUrl
			      }
		      }
		    ]
	    })
	  }).then( resp => {
	    return resp.json();
	  }).then( json => {
      console.log(json);
      this.props.navigation.navigate('Output', {json: json});
    });
  }
  
  takePicture() {
    console.log('pic');
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      this.camera.takePictureAsync(options).then( data => {        
        console.log(Object.keys(data));
        console.log(data.base64);
        console.log(data.uri);        
        let token = this.props.navigation.getParam('accessToken');
        if (token) {
          console.log('Sending to vision API using token ', token);
          this.sendToVisionAPI(data.base64, token);
        } else {
          console.log('No token specified');
        }
      });
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
          </RNCamera>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>      
    );
  }  
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    marginTop: 100,
    backgroundColor: 0x000
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
