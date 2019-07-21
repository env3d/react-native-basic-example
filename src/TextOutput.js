
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import login from '../src/utils/Login';
import save from '../src/utils/Save';

import session from '../src/Globals';

export default class TextOutput extends React.Component {

  constructor(props) {
    super(props);
  }
  
  // Save scan to user's google drive
  save = async (token, output) => {
    json = await save(token, output);
    console.log('finished saving to google drive', json);
    this.props.navigation.pop();
  }

  
  login = (output) => {
    login().then( result => {
      // result contains accessToken, send to save
      console.log('login successful');       
      this.save(result.accessToken, output);
    });
  }
  
  render() {
    let json = this.props.navigation.getParam('json');
    let output = 'No text detected';
    if (json.responses && json.responses[0] && json.responses[0].fullTextAnnotation) {
      output = json.responses[0].fullTextAnnotation.text;
	  }
    let token = session['accessToken']
    let button;
    if (token) {      
      button = (<Button title='Save scan' onPress={ () => this.save(token, output) }/>)
    } else {
      button = (<Button title='Login to save scan' onPress={ () => this.login(output)}/>)
    }
    
    return (
      <View>
        {button}        
        <Text>{output}</Text>
      </View>
    )
  }
}
