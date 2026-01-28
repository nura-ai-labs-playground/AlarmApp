import AsyncStorage from '@react-native-async-storage/async-storage';

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

  return { dbInsertAlarm };
}
