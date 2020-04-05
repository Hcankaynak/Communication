import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  StyleSheet,
  TouchableHighlight,
  Picker,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'skyblue',
    height: 150,
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textHeaderSub: {
    fontSize: 20,
  },
  viewHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5,
  },
  button: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default class Test extends Component {
  state = {
    color: 'skyblue',
  };

  changeBackgroundColor = async (color) => {
    return 'blue';
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 6, marginTop: 22}}>
          <View
            style={{
              height: 100,
              backgroundColor: this.changeBackgroundColor('purple'),
            }}
          />
          <Button
            style={{width: '75%', alignSelf: 'center', marginTop: 20}}
            icon="camera"
            mode="contained"
            onPress={() => {}}>
            Press me
          </Button>
        </View>
      </View>
    );
  }
}
