// The home screen with login or take picture

import React from 'react';
import { View, Text, Button } from 'react-native';
import { authorize } from 'react-native-app-auth';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }
  
  login = () => {
    console.log('login');
    const config = {
      issuer: 'https://accounts.google.com',
      clientId: '107256413984-b289he1lfrsdq5kmtal2htgheo9fvkf7.apps.googleusercontent.com',
      //clientId: '107256413984-himbdkj6rbv03pcj7sib3bjb8jvv45u0.apps.googleusercontent.com',
      redirectUrl: 'com.alphabit.rntest://',
      scopes: ['profile', 'email', 'openid', 'https://www.googleapis.com/auth/cloud-vision'],
    };

    // use the client to make the auth request and receive the authState
    try {
      authorize(config).then( result => {
        // result includes accessToken, accessTokenExpirationDate and refreshToken
        console.log(result);
        this.setState({
          accessToken: result.accessToken,
          idToken: result.idToken
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  gotoCamera = () => {
    this.props.navigation.navigate('Camera', this.state);
  }
  
  render() {
    return (
      <View>
        <Button title='Login' onPress={this.login}></Button>
        <Button title='Take Picture' onPress={this.gotoCamera}></Button>
      </View>
    );
  }
}
