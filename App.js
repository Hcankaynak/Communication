import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './components/HomePage';
import Settings from './components/Settings';
import FeedBack from './components/FeedBack';
import Test from './components/Test';
import TTS from './components/TTSTest';
import Design from './components/Design';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Ana Sayfa">
        <Drawer.Screen name="Ana Sayfa" component={HomePage} />
        <Drawer.Screen name="Ayarlar" component={Settings} />
        <Drawer.Screen name="Geri Bildirim" component={FeedBack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
/*

<Drawer.Screen name="Test" component={Test} />
<Drawer.Screen name="TTS" component={TTS} />
<Drawer.Screen name="Design" component={Design} />

*/
