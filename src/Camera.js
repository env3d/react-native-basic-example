// Camera

import React from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      working: false
    }
  }
  
  async sendToVisionAPI(dataUrl, token) {
    // default API token
    let visionUrl = 'https://vision.googleapis.com/v1/images:annotate'
    let headers = {
		    'Content-Type': 'application/json'      
    }
    
    if (!token) {
      visionUrl += '?key=AIzaSyBc7VMHDMfnsOcIZmD-YAsB9xOe5tefURI';
    } else {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let res = await fetch(visionUrl, {
	    method: 'POST',
	    headers: headers,
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
	  });

    let json = await res.json();
    return json;    
  }
  
  async takePicture() {
    console.log('pic');
    if (this.camera) {
      this.setState({ working: true });
      
      const options = { quality: 0.5, base64: true };
      let data = await this.camera.takePictureAsync(options);
      
      console.log(Object.keys(data));
      console.log(data.base64);
      console.log(data.uri);        
      let token = this.props.navigation.getParam('accessToken');
      
      console.log('Sending to vision API using token ', token);
      let json = await this.sendToVisionAPI(data.base64, token);
      console.log('successful scan from vision api, forwarding to output',json);

      this.setState({ working: false });
      this.props.navigation.navigate('Output', {json: json, token:token});    
    }
  }
  
  render() {
    let working;
    if (this.state.working) { 
      working = (<ActivityIndicator style={styles.activity} size="large" color="#00ff00"/>);
    } else {
      working = (<View></View>);      
    }

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
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            {working}
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
  activity: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 100
  },
});
