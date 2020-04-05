import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
  Picker,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-paper';
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
      dataSource: {},
      modalVisible: false,
      button: '',
      text: '',
      color: '',
      0: '',
    };
  }

  componentDidMount() {
    var that = this;
    let items = Array.apply(null, Array(9)).map((v, i) => {
      return {
        id: i,
        src: 'http://placehold.it/200x200?text=' + (i + 1),
      };
    });
    that.setState({
      dataSource: items,
    });
  }
  setModalVisible(itemId, visible) {
    this.setState({modalVisible: visible, button: itemId});
  }
  storeData = async (itemId, text, color) => {
    try {
      await AsyncStorage.setItem(itemId.toString(), text);
      await AsyncStorage.setItem('color' + itemId.toString(), color);
      this.setState({button: '', text: '', color: ''});
    } catch (e) {
      // saving error
    }
  };
  getData = async (itemId, visible) => {
    try {
      this.setState({modalVisible: visible, button: itemId});

      const value = await AsyncStorage.getItem(itemId.toString());
      const color = await AsyncStorage.getItem('color' + itemId.toString());

      if (value !== null) {
        this.setState({text: value});
        // value previously stored
      }
      if (color !== null) {
        this.setState({color: color});
      }
    } catch (e) {
      // error reading value
    }
  };
  getSelectedColor = async () => {
    try {
      const value = await AsyncStorage.getItem(this.state.color.toString());
      if (value !== null) {
        return value;
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
  isLoading = async () => {
    try {
      await AsyncStorage.setItem('isLoading', 'true');
    } catch (e) {
      // saving error
    }
  };

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} name="Ayarlar" />
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
                    this.getData(item.id, true);
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View
              style={{
                justifyContent: 'center',
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'skyblue',
                padding: 20,
              }}>
              <Text style={{textAlign: 'center', fontSize: 32}}>
                Buton {this.state.button}
              </Text>
              <View style={{padding: 20}}>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 24,
                      margin: 10,
                    }}>
                    Renk Seçimi
                  </Text>
                  <Picker
                    mode="dropdown"
                    style={{alignItems: 'center', borderWidth: 0.5}}
                    selectedValue={this.state.color}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({color: itemValue})
                    }>
                    <Picker.Item label="Mavi" value="blue" />
                    <Picker.Item label="Sarı" value="yellow" />
                    <Picker.Item label="Yeşil" value="green" />
                    <Picker.Item label="Pembe" value="pink" />
                    <Picker.Item label="Kırmızı" value="red" />
                    <Picker.Item label="Mor" value="purple" />
                  </Picker>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      textAlign: 'center',
                    }}>
                    Metin
                  </Text>
                  <TextInput
                    placeholder="This is previous message."
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    style={{
                      textAlignVertical: 'top',
                      height: 150,
                      borderRadius: 10,
                      borderWidth: 0.5,
                      marginTop: 20,
                    }}
                    multiline={true}
                  />
                </View>

                <Button
                  style={{width: '25%', alignSelf: 'center', marginTop: 20}}
                  icon="content-save"
                  color="blue"
                  mode="contained"
                  onPress={() => {
                    this.storeData(
                      this.state.button,
                      this.state.text,
                      this.state.color,
                    );
                    this.setModalVisible('', !this.state.modalVisible);
                    this.isLoading();
                  }}>
                  Kaydet
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}
