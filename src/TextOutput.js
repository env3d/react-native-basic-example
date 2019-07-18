
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class TextOutput extends React.Component {
  render() {
    let json = this.props.navigation.getParam('json');
    let output = 'No text detected';
    if (json.responses && json.responses[0] && json.responses[0].fullTextAnnotation) {
      output = json.responses[0].fullTextAnnotation.text;
	  }
    return (
      <View>
        <Text>{output}</Text>
      </View>
    )
  }
}
