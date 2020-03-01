import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Design extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
