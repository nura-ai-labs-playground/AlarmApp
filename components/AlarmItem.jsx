import { Trash2 } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import dbInteraction from '../dbInteractions';


export default function AlarmItem({ alarm, index, toggleAlarm ,deleteAlarm}) {

 

  return (
    <View style={styles.alarmItem}>
      <View style={styles.alarmIcon}>
        <Text style={styles.alarmIconText}>⏰</Text>
      </View>

      <View style={styles.alarmDetails}>
        <Text style={styles.alarmTime}>
          {new Date(alarm.time).toLocaleTimeString('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
})}
        </Text>
        <Text style={styles.alarmDate}>
          {new Date(alarm.time).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.buttons}>

      <Button
        title={alarm.enabled ? 'ON' : 'OFF'}
        color={alarm.enabled ? 'green' : 'gray'}
        style={{}}
        onPress={() => toggleAlarm(index)}
      />
      <TouchableOpacity>

      <Trash2 size={25} color={"red"} onPress={()=>deleteAlarm(alarm.event_id)}/>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  alarmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  alarmIcon: {
    marginRight: 14,
  },
  alarmIconText: {
    fontSize: 20,
  },
  alarmDetails: {
    flex: 1,
  },
  alarmTime: {
    fontSize: 16,
    fontWeight: '700',
  },
  alarmDate: {
    fontSize: 13,
    color: '#6C757D',
  },
  buttons:{
    flexDirection:'row',
    gap:6,
    justifyContent:'center',
    alignItems:"center"
  }
});
