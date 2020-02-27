import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from './components/HomePage';
import Settings from './components/Settings';
import FeedBack from './components/FeedBack';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Ana Sayfa">
        <Drawer.Screen name="Ana Sayfa" component={HomePage} />
        <Drawer.Screen name="Ayarlar" component={Settings} />
        <Drawer.Screen name="Bildirim" component={FeedBack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
