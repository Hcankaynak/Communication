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
          <Text style={styles.textHeader}>Testing </Text>
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
});
export default class Test extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <View style={{flex: 6, marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View
              style={{
                margin: 30,
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'skyblue',
                padding: 20,
              }}>
              <Text style={{textAlign: 'center', fontSize: 32}}>Buton 1</Text>
              <View style={{padding: 20}}>
                <View>
                  <Text style={{textAlign: 'center', fontSize: 24, margin: 10}}>
                    Renk Seçimi
                  </Text>
                  <Picker
                    mode="dropdown"
                    style={{alignItems: 'center'}}
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
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={{alignItems: 'center', marginTop: 20}}>
                  <View style={{backgroundColor: 'blue', width: 100}}>
                    <Text style={{fontSize: 14, textAlign: 'center'}}>
                      Kaydet
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Show Modal</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
