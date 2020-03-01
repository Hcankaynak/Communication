import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

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
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 50}}>
              Konu
            </Text>
            <TextInput
              style={{
                height: 40,
                alignSelf: 'stretch',
                borderRadius: 10,
                borderWidth: 0.5,
                marginLeft: 10,
                marginRight: 10,
              }}
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
            <TextInput
              style={{
                height: 200,
                borderRadius: 10,
                borderWidth: 0.5,
                textAlignVertical: 'top',
                marginLeft: 10,
                marginRight: 10,
              }}
              placeholder="Konu yazmak için tıklayınız."
              onChangeText={text => this.setState({text})}
              value={this.state.text}
              multiline={true}
            />
          </View>
          <View
            style={{
              marginTop: 100,
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 50,
                  width: 200,
                  backgroundColor: 'skyblue',
                  borderWidth: 0.5,
                }}>
                <Text>Gönder</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
