// The home screen with login or take picture

import React from 'react';
import { View, Text, Button, Image } from 'react-native';
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
          accessToken: session.accessToken,
          idToken: session.idToken,

          email: session.email,
          name: session.name,
          pic: session.picture
        });
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
  
  login = async () => {
    let result = await login();
    
    // result includes accessToken, email, name, picture
    this.setState({
      accessToken: result.accessToken,
      idToken: result.idToken,

      email: result.email,
      name: result.name,
      pic: result.picture
    });

  }
  
  gotoCamera = () => {
    this.props.navigation.navigate('Camera', this.state);
  }
  
  render() {

    console.log('rendering home');
    let login = this.state['accessToken'] ?
        (
          <View style={{}}>
            <Text>{this.state['name']}</Text>
            <Image style={{width: 50, height: 50, alignSelf: 'center'}} source={{uri: this.state['pic']}}/>
          </View>
        ) :
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
