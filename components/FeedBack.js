import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

function Header({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.button}>
              <Image
                source={require('../assets/blabla.jpg')}
                style={{width: 64, height: 64}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewHeader}>
          <Text style={styles.textHeader}>Geri Bildirim </Text>
          <Text style={styles.textHeaderSub}>Havva Bayır</Text>
        </View>
      </View>
    </View>
  );
}

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
        <Header navigation={this.props.navigation} />
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
              type="outlined"
              placeholder="Konu yazmak için tıklayınız."
              onChangeText={topic => this.setState({topic})}
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
            placeholder="mesaj yazmak için tıklayınız."
            value={this.state.text}
            mode="outlined"
            label="Mesaj"
            onChangeText={text => this.setState({text})}
            dense={true}
            multiline={true}
            textAlignVertical="top"
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
