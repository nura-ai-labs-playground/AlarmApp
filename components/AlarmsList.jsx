import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AlarmItem from './AlarmItem';

export default function AlarmsList({ alarms, toggleAlarm ,deleteAlarm}) {
  return (
    <View style={styles.alarmsCard}>
      <View style={styles.alarmsHeader}>
        <Text style={styles.alarmsTitle}>Active Alarms</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{alarms.length}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {alarms.map((alarm, index) => (
          <AlarmItem
            key={index}
            alarm={alarm}
            index={index}
            toggleAlarm={toggleAlarm}
            deleteAlarm={deleteAlarm}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  alarmsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    elevation: 4,
  },
  alarmsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  alarmsTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: '700',
  },
});
