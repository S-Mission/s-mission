import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import Tabs from './navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [fonts] = Font.useFonts(Ionicons.font);

  if (!fonts) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}