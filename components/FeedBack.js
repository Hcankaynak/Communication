import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Header from './Header';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'skyblue',
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
  textInput: {
    margin: 10,
  },
});

export default class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', topic: ''};
  }

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} name="Geri Bildirim" />
        <View
          style={{
            flex: 6,
          }}>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginTop: 50,
                textAlign: 'center',
              }}>
              Konu
            </Text>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              placeholder="Konu yazmak için tıklayınız."
              onChangeText={(topic) => this.setState({topic})}
              value={this.state.topic}
            />
          </View>
          <View style={{marginTop: 50}}>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'center'}}>
              Mesaj
            </Text>
          </View>
          <TextInput
            style={{margin: 20, height: 150, textAlignVertical: 'top'}}
            placeholder="Mesaj yazmak için tıklayınız."
            value={this.state.text}
            mode="outlined"
            onChangeText={(text) => this.setState({text})}
            multiline={true}
          />
          <View
            style={{
              marginTop: 100,
              alignItems: 'center',
            }}>
            <Button
              icon="send"
              color="blue"
              mode="contained"
              onPress={() => console.log('Pressed')}>
              Gönder
            </Button>
          </View>
        </View>
      </>
    );
  }
}
