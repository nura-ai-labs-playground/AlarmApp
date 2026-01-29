import React, {useEffect, useRef} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Datetime from './components/dateTime';
import Alarmbuttons from './components/AlarmButtons';

export default function App() {
  
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Datetime></Datetime>
        <Alarmbuttons></Alarmbuttons>
      </View>
    </SafeAreaView>
  );
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
  },
});
