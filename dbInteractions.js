import AsyncStorage from '@react-native-async-storage/async-storage';
import { useId } from 'react';

export default function dbInteraction() {
  const apiUrl = 'https://7eb8defe9f25.ngrok-free.app/alarms';

  const getDetails = async () => {
    const details = await AsyncStorage.getItem('userDetails');
    if (!details) return null;

    const userParse = JSON.parse(details);
    return userParse.user; // phone number
  };

  async function dbInsertAlarm(
      time,
      event_id,
      label = 'Not Set',
      enabled = true,
    ) {
        
        const phone_num = await getDetails(); // ✅ await missing earlier
        if (!phone_num) {
            throw new Error('User not logged in');
        }

    const data = JSON.stringify({
      phone_num,
      time,
      label,
      enabled,
      event_id,
    });

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (!res.ok) {
      const err = await res.text();
      console.log('DB Error:', err);
      throw new Error('Database error');
    }

    return await res.json();
  }
async function dbUpdateAlarm(alarm) {
  const userId = await getDetails();

  const res = await fetch(`${apiUrl}/${alarm.notification.id}?phone_num=${userId}`, {
    method: 'PUT', // or POST (backend epdi expect pannudho)
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        time:alarm.trigger.timestamp,
      enabled: !alarm.enabled,
      event_id:alarm.notification.id,
      label:"Not Defined"
    
    }),
  });
  console.log(res);
}

async function getAlarms() {
  const userId = await getDetails();

  const res = await fetch(`${apiUrl}?phone_num=${userId}`);
  const data = await res.json();

  console.log(data);
}

  return { dbInsertAlarm ,getAlarms,dbUpdateAlarm};
}
