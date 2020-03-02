import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Tts from 'react-native-tts';

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
          <Text style={styles.textHeader}> İletişim Uygulaması </Text>
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
    flex: 5,
  },
  button: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainContainer: {
    justifyContent: 'center',
    alignContent: 'space-around',
    flex: 6,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'aqua',
  },
});
export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: {},
    };
    Tts.setDefaultLanguage('tr-TR');
  }
  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(9)).map((v, i) => {
      return {id: i, src: 'http://placehold.it/200x200?text=' + (i + 1)};
    });
    that.setState({
      dataSource: items,
    });
  }
  consoleLogtest(itemId) {
    console.log('button' + itemId);
  }
  speak = async itemId => {
    try {
      const value = await AsyncStorage.getItem(itemId.toString());
      if (value !== null) {
        Tts.speak(value);
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  render() {
    return (
      <>
        <Header navigation={this.props.navigation} />
        <View style={styles.MainContainer}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1,
                  padding: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.speak(item.id);
                  }}>
                  <View style={styles.imageThumbnail}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                      {item.id}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </>
    );
  }
}
