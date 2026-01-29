import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AlarmControls({ startAlarm, stopAlarm }) {
  return (
    <View style={styles.card}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.setButton}
          onPress={startAlarm}
          activeOpacity={0.8}
        >
          <Text style={styles.setButtonText}>⏰ Set Alarm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stopButton}
          onPress={stopAlarm}
          activeOpacity={0.8}
        >
          <Text style={styles.stopButtonText}>🛑 Stop Alarms</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  buttonContainer: {
    gap: 12,
  },
  setButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  setButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  stopButton: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DC3545',
  },
  stopButtonText: {
    color: '#DC3545',
    fontSize: 16,
    fontWeight: '700',
  },
});
