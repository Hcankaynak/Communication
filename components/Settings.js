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
  Modal,
  TouchableHighlight,
  Alert,
  Picker,
  AsyncStorage,
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
      modalVisible: false,
    };
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
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    return (
      <>
        <Header navigation={this.props.navigation} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{
              marginTop: 22,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  alignContent: 'stretch',
                  flex: 0.3,
                  borderRadius: 10,
                  borderWidth: 0.5,
                }}>
                <Text> {this._retrieveData()} </Text>
                <Picker
                  selectedValue={this.state.language}
                  style={{width: 150, height: 50}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              </View>
              <TouchableHighlight
                style={{flex: 0.3}}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
                    this.setState({modalVisible: true});
                  }}>
                  <View style={styles.imageThumbnail}>
                    <Text>{item.id}</Text>
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
