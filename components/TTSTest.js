import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Tts from 'react-native-tts';

function Header({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
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
          <Text style={styles.textHeader}> Ayarlar </Text>
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
    flex: 6,
  },
  button: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Settings extends Component {
  constructor(props) {
    super(props);
    Tts.setDefaultLanguage('tr-TR');
    this.state = {
      text: '',
    };
  }
  myFunction = async () => {
    try {
      await AsyncStorage.setItem('1', 'buralarda mısın');
    } catch (e) {
      // saving error
    }

    var test = this.state.text;
    Tts.speak(test);
    this.setState({text: ''});
  };

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} />
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 6}}>
          <TouchableOpacity
            myText={this.state.text}
            onPress={() => this.myFunction()}>
            <View style={styles.button}>
              <Image
                source={require('../assets/blabla.jpg')}
                style={{width: 64, height: 64}}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
        </View>
      </>
    );
  }
}
