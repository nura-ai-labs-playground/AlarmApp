import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button
} from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidCategory,
  TriggerType,
  AuthorizationStatus,
} from '@notifee/react-native';
import dbInteraction from '../dbInteractions';

export default function Alarmbuttons({ selectedDate }) {
  if (!selectedDate) return null;

  const notificationIdRef = useRef(null);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    async function checkPermission() {
      const settings = await notifee.getNotificationSettings();
      if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
        await notifee.requestPermission();
        await notifee.openAlarmPermissionSettings();
      }
    }
    checkPermission();
    listAlarms();
  }, []);

  async function listAlarms() {
    const data = await notifee.getTriggerNotifications();
    setAlarms(data);
  }

  const startAlarm = async () => {
    if (selectedDate.getTime() <= Date.now()) {
      Alert.alert('Invalid Time', '❌ Past time alarm set panna mudiyadhu');
      return;
    }

    const channelId = await notifee.createChannel({
      id: 'alarm',
      name: 'Alarm Channel',
      importance: AndroidImportance.HIGH,
      sound: 'alarm',
    });

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: selectedDate.getTime(),
      alarmManager: { allowWhileIdle: true },
    };

    const id = await notifee.createTriggerNotification(
      {
        title: '⏰ Alarm',
        body: 'Wake up machi!',
        android: {
          channelId,
          category: AndroidCategory.ALARM,
          importance: AndroidImportance.HIGH,
          sound: 'alarm',
          fullScreenAction: { id: 'default' },
        },
      },
      trigger,
    );

    const dbInsert = dbInteraction().dbInsertAlarm(
     selectedDate.getTime(),
       id,
    );

    notificationIdRef.current = id;
    Alert.alert('Reminder Set Successfully', selectedDate.toLocaleString());

    listAlarms();
  };

  const stopAlarm = async () => {
    if (notificationIdRef.current) {
      await notifee.cancelNotification(notificationIdRef.current);
    }
    await notifee.cancelAllNotifications();
    setAlarms([]);
  };


const toggleAlarm

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <View style={styles.selectedTimeContainer}>
          <Text style={styles.labelText}>Selected Time</Text>
          <Text style={styles.timeText}>{selectedDate.toLocaleTimeString()}</Text>
          <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
        </View> */}

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

      {alarms.length > 0 && (
        <View style={styles.alarmsCard}>
          <View style={styles.alarmsHeader}>
            <Text style={styles.alarmsTitle}>Active Alarms</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{alarms.length}</Text>
            </View>
          </View>

          <ScrollView
            style={styles.alarmsList}
            showsVerticalScrollIndicator={false}
          >
            {alarms.map((alarm, index) => (
              <View key={index} style={styles.alarmItem}>
                <View style={styles.alarmIcon}>
                  <Text style={styles.alarmIconText}>⏰</Text>
                </View>
                <View style={styles.alarmDetails}>
                  <Text style={styles.alarmTime}>
                    {new Date(
                      Number(alarm.trigger.timestamp),
                    ).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.alarmDate}>
                    {new Date(
                      Number(alarm.trigger.timestamp),
                    ).toLocaleDateString()}
                  </Text>
                </View>
                <View>
                  
                  <Button title="on" onPress={toggleAlarm}/>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedTimeContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 20,
  },
  labelText: {
    fontSize: 13,
    color: '#6C757D',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 15,
    color: '#495057',
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 12,
  },
  setButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  setButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
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
    letterSpacing: 0.3,
  },
  alarmsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  alarmsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  alarmsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  badge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 28,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  alarmsList: {
    maxHeight: 240,
  },
  alarmItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  alarmIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E7F3FF',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#212529',
    marginBottom: 2,
  },
  alarmDate: {
    fontSize: 13,
    color: '#6C757D',
    fontWeight: '500',
  },
});
