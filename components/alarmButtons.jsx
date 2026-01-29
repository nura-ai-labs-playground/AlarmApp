import React, { useEffect, useRef, useState } from 'react';
import { Alert, View, StyleSheet, TextInput,Button,Modal } from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidCategory,
  TriggerType,
  AuthorizationStatus,
} from '@notifee/react-native';
import dbInteraction from '../dbInteractions';
import AlarmControls from './AlarmControls';
import AlarmsList from './AlarmsList';
import InputAlert from './InputAlert';


export default function AlarmButtons({ selectedDate }) {
    const [showInput, setShowInput] = useState(false);
const [text, setText] = useState('');
  if (!selectedDate) return null;

  const notificationIdRef = useRef(null);
  const [alarms, setAlarms] = useState([]);
  console.log("ALL ALARMS "+alarms);

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

  // 🔹 Fetch alarms from Notifee
  async function listAlarms() {
    const allAlarms = await dbInteraction().getAlarms();
    console.log(allAlarms);
    setAlarms(allAlarms);
  }

  // 🔹 Create alarm
  const startAlarm = async (text) => {
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
        body: text,
        android: {
          channelId,
          category: AndroidCategory.ALARM,
          importance: AndroidImportance.HIGH,
          sound: 'alarm',
          fullScreenAction: { id: 'default' },
          pressAction: {
    id: 'default',        // ⭐ REQUIRED
    launchActivity: 'default', // ⭐ THIS OPENS APP
  },
        },
      },
      trigger
    );

    // 🔹 DB insert
    await dbInteraction().dbInsertAlarm(selectedDate.getTime(), id,text);

    notificationIdRef.current = id;
    Alert.alert('Reminder Set Successfully', selectedDate.toLocaleString());
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
      await notifee.cancelTriggerNotification(alarm.event_id);
      await dbInteraction().dbUpdateAlarm(alarm);
    } else {
      // ON → re-create
      try {
        const channelId = await notifee.createChannel({
          id: 'alarm',
          name: 'Alarm Channel',
          importance: AndroidImportance.HIGH,
          sound: 'alarm',
        });
        const trigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: Number(alarm.time),
          alarmManager: { allowWhileIdle: true },
        };
        await notifee.createTriggerNotification({
        title: '⏰ Alarm',
        body: alarm.label,
        android: {
          channelId,
          category: AndroidCategory.ALARM,
          importance: AndroidImportance.HIGH,
          sound: 'alarm',
          fullScreenAction: { id: 'default' },
          pressAction: {
    id: 'default',        // ⭐ REQUIRED
    launchActivity: 'default', // ⭐ THIS OPENS APP
  },
        },
      }, trigger);
      console.log(alarm.time, typeof alarm.time)

        await dbInteraction().dbUpdateAlarm(alarm);
      } catch (e) {
        console.log(e);
        return Alert.alert('Invalid Time', "❌ Can't set alarm for a past time");
      }
    }
      
    setAlarms(prev =>
      prev.map((a, i) => (i === index ? { ...a, enabled: !a.enabled } : a))
    );
  };


   async function deleteAlarm(event_id) {
    try {
      await dbInteraction().deleteAlarm(event_id);
      Alert.alert("Alarm removed","Successfully Deleted the alarm.")
      listAlarms();
      
    } catch (e) {
      Alert.alert("Invalid action","Alarm cant be deleted.")
      console.log(e);
    }

  }



  return (
    <View style={styles.container}>
      <InputAlert
  visible={showInput}
  text={text}
  setText={setText}
  onClose={() => setShowInput(false)}
  onSubmit={() => {
    setShowInput(false);
    startAlarm(text);
    setText('');
  }}
/>

      <AlarmControls startAlarm={()=> setShowInput(true)} stopAlarm={stopAlarm} />
      {alarms.length > 0 && (
        <AlarmsList alarms={alarms} toggleAlarm={toggleAlarm} deleteAlarm={deleteAlarm}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
