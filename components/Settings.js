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
      button: '',
      text: '',
      color: {
        zero: 'aqua',
        one: 'aqua',
        two: 'aqua',
        three: 'aqua',
        four: 'aqua',
        five: 'aqua',
        six: 'aqua',
        seven: 'aqua',
        eight: 'aqua',
      },
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
  storeData = async (itemId, text) => {
    try {
      await AsyncStorage.setItem(itemId.toString(), text);
      this.setState({button: '', text: ''});
    } catch (e) {
      // saving error
    }
  };
  getData = async (itemId, visible) => {
    try {
      this.setState({modalVisible: visible, button: itemId});

      const value = await AsyncStorage.getItem(itemId.toString());
      if (value !== null) {
        this.setState({text: value});
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
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Mavi" value="mavi" />
                    <Picker.Item label="Sarı" value="sari" />
                    <Picker.Item label="Yeşil" value="yesil" />
                    <Picker.Item label="Pembe" value="pembe" />
                    <Picker.Item label="Kırmızı" value="kirmizi" />
                    <Picker.Item label="Mor" value="mor" />
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
                    onChangeText={text => this.setState({text})}
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
                    this.storeData(this.state.button, this.state.text);
                    this.setModalVisible('', !this.state.modalVisible);
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
