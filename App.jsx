import { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import Datetime from "./components/dateTime";
import Alarmbuttons from "./components/alarmButtons";
import AppNavigator from './src/navigation/AppNavigator';

 export default function App() {
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