import { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import AppNavigator from './src/navigation/AppNavigator';
import notifee, { EventType } from '@notifee/react-native';

 export default function App() {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    console.log('Notification clicked - app opening');
  }
});
  return(
    
      <AppNavigator />

  ) ;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#444',
  },
});