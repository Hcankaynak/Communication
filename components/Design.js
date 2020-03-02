import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Design extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      deneme: {
        text: '',
        color: '',
      },
    };
  }
  storeData = async () => {
    try {
      await AsyncStorage.setItem('text', 'stored');
    } catch (e) {
      // saving error
    }
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('text');
      if (value !== null) {
        //this.setState({deneme: {text: value}});
        // value previously stored
        return value;
      }
    } catch (e) {
      return null;
      // error reading value
    }
  };
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          flex: 1,
        }}>
        <Text> {this.state.deneme.text} </Text>
        <TouchableOpacity
          onPress={() => {
            this.storeData();
          }}>
          <View
            style={{
              backgroundColor: 'aqua',
              width: 100,
              height: 20,
              borderWidth: 0.2,
              borderRadius: 20,
            }}>
            <Text style={{textAlign: 'center'}}>Kaydet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.getData();
          }}>
          <View
            style={{
              backgroundColor: 'aqua',
              width: 100,
              height: 20,
              borderWidth: 0.2,
              borderRadius: 20,
            }}>
            <Text style={{textAlign: 'center'}}>Getir</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
