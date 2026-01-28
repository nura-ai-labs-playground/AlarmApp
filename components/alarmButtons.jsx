import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Button,
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
  console.log(alarms)

  useEffect(() => {
    async function checkPermission() {
      const settings = await notifee.getNotificationSettings();
      if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
        await notifee.requestPermission();
        await notifee.openAlarmPermissionSettings();
      }
    }
    checkPermission();
   
  }, []);

  // 🔹 Fetch alarms from Notifee
  async function listAlarms() {
    const data = await notifee.getTriggerNotifications();

    const formatted = data.map(item => ({
      ...item,
      enabled: true, // default ON
    }));

    setAlarms(formatted);
  }

  // 🔹 Create alarm
  const startAlarm = async () => {
    if (selectedDate.getTime() <= Date.now()) {
      Alert.alert('Invalid Time', "❌ Can't set alarm for a past time");
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
      trigger
    );

    // 🔹 DB insert
    await dbInteraction().dbInsertAlarm(
      selectedDate.getTime(),
      id
    );
    


    notificationIdRef.current = id;
    Alert.alert('Reminder Set Successfully', selectedDate.toLocaleString());
    console.log(id);
    listAlarms();
  };

  // 🔹 Stop all alarms
  const stopAlarm = async () => {
    await notifee.cancelAllNotifications();
    setAlarms([]);
  };

  // 🔹 Toggle alarm ON / OFF
  const toggleAlarm = async (index) => {
    const alarm = alarms[index];
    console.log(alarm);
   

    if (alarm.enabled) {
      // OFF → cancel
      await notifee.cancelTriggerNotification(alarm.notification.id);
      await dbInteraction().dbUpdateAlarm(alarm);
    } else {
      // ON → re-create
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: Number(alarm.trigger.timestamp),
        alarmManager: { allowWhileIdle: true },
      };
      
      await notifee.createTriggerNotification(
        alarm.notification,
        trigger
      );
      await dbInteraction().dbUpdateAlarm(alarm);
    }

    setAlarms(prev =>
      prev.map((a, i) =>
        i === index ? { ...a, enabled: !a.enabled } : a
      )
    );
  };

  return (
    <View style={styles.container}>
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

      {alarms.length > 0 && (
        <View style={styles.alarmsCard}>
          <View style={styles.alarmsHeader}>
            <Text style={styles.alarmsTitle}>Active Alarms</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{alarms.length}</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {alarms.map((alarm, index) => (
              <View key={index} style={styles.alarmItem}>
                <View style={styles.alarmIcon}>
                  <Text style={styles.alarmIconText}>⏰</Text>
                </View>

                <View style={styles.alarmDetails}>
                  <Text style={styles.alarmTime}>
                    {new Date(
                      Number(alarm.trigger.timestamp)
                    ).toLocaleTimeString()}
                  </Text>
                  <Text style={styles.alarmDate}>
                    {new Date(
                      Number(alarm.trigger.timestamp)
                    ).toLocaleDateString()}
                  </Text>
                </View>

                <Button
                  title={alarm.enabled ? 'ON' : 'OFF'}
                  color={alarm.enabled ? 'green' : 'gray'}
                  onPress={() => toggleAlarm(index)}
                />
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
});
