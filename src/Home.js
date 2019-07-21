// The home screen with login or take picture

import React from 'react';
import { View, Text, Button } from 'react-native';
import login from '../src/utils/Login';
import save from '../src/utils/Save';

import session from '../src/Globals';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }  

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      if (session.accessToken) {
        this.setState({
          accessToken: session.accessToken
        });
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
  
  login = () => {
    login().then( (result) => {
      // result includes accessToken, accessTokenExpirationDate and refreshToken
      this.setState({
        accessToken: result.accessToken,
        idToken: result.idToken
      });
    });
  }
  
  gotoCamera = () => {
    this.props.navigation.navigate('Camera', this.state);
  }
  
  render() {

    console.log('rendering home');
    let login = this.state['accessToken'] ? ( <View></View> ) :
        (
          <Button style={{flex: 1}} title='Login' onPress={this.login}></Button>          
        );
    
    return (
      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>

        {login}
        <Button style={{flex: 1}} title='Take Picture' onPress={this.gotoCamera}></Button>

      </View>
    );
  }
}
