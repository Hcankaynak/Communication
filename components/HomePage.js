import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Tts from 'react-native-tts';
import {NavigationEvents} from 'react-navigation';
import Header from './Header';

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
      counter: 0,
      dataSource: {},
      isLoading: true,
      refreshing: false,
    };
    Tts.setDefaultLanguage('tr-TR');
    console.log('constructor');
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('focus');
      this.setState({isLoading: true});
      this.myUpdate();
    });
    var that = this;
    console.log('didmount');
    let items = Array.apply(null, Array(9)).map((v, i) => {
      return {
        id: i,
        src: 'http://placehold.it/200x200?text=' + (i + 1),
        color: 'aqua',
      };
    });
    var i = 0;
    for (const prop in items) {
      AsyncStorage.getItem('color' + prop.toString()).then(item => {
        if (item) {
          items[prop].color = item;
          console.log(prop + 'if(item): ' + item);
          that.setState({
            dataSource: items,
          });
        } else {
          items[prop].color = item;
          that.setState({
            dataSource: items,
          });
        }
      });
    }
    this.setState({isLoading: false});
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  myUpdate() {
    let items = this.state.dataSource;

    for (const prop in items) {
      AsyncStorage.getItem('color' + prop.toString()).then(item => {
        if (item) {
          items[prop].color = item;
          console.log(prop + 'if(item): ' + item);
          this.setState({
            dataSource: items,
          });
        }
      });
    }
    this.setState({isLoading: false});
  }

  async getBackgroundColor(itemId) {
    try {
      const color = await AsyncStorage.getItem('color' + itemId.toString());

      if (color != null) {
        //onsole.log(color);
        return color;
        // value previously stored
      } else {
        //console.log(color);
        return 'aqua';
      }
    } catch (e) {
      return 'aqua';
      // error reading value
    }
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
  checkLoading = async () => {
    try {
      console.log('hey');
      const value = await AsyncStorage.getItem('isLoading');
      if (value !== null) {
        this.setState({isLoading: value});
        await AsyncStorage.setItem('isLoading', 'false');
        // value previously stored
      }
    } catch (e) {
      // saving error
    }
  };

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} name="İletişim Uygulaması" />
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
                    this.setState({counter: this.state.counter + 1});
                    console.log(this.state.counter);
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 100,
                      backgroundColor: item.color,
                    }}>
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
