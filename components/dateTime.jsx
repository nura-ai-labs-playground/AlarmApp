import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Alarmbuttons from './alarmButtons';

export default function Datetime() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showPicker = pickerMode => {
    setMode(pickerMode);
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Alarm Scheduler</Text>
          <Text style={styles.headerSubtitle}>Set your reminder</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.displayContainer}>
              <Text style={styles.label}>Selected Date & Time</Text>
              
              <View style={styles.dateTimeDisplay}>
                <View style={styles.timeSection}>
                  <Text style={styles.timeIcon}>🕐</Text>
                  <View>
                    <Text style={styles.timeValue}>
                      {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                    </Text>
                    <Text style={styles.timeLabel}>Time</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.dateSection}>
                  <Text style={styles.dateIcon}>📅</Text>
                  <View>
                    <Text style={styles.dateValue}>
                      {date.toLocaleDateString([], {month: 'short', day: 'numeric'})}
                    </Text>
                    <Text style={styles.dateLabel}>Date</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.fullDateTime}>{date.toLocaleString()}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.dateButton} 
                onPress={() => showPicker('date')}
                activeOpacity={0.8}
              >
                <Text style={styles.dateButtonIcon}>📅</Text>
                <Text style={styles.dateButtonText}>Pick Date</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.timeButton} 
                onPress={() => showPicker('time')}
                activeOpacity={0.8}
              >
                <Text style={styles.timeButtonIcon}>🕐</Text>
                <Text style={styles.timeButtonText}>Pick Time</Text>
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour
                display={Platform.OS === 'android' ? 'default' : 'spinner'}
                onChange={onChange}
              />
            )}
          </View>
        </View>

        <Alarmbuttons selectedDate={date} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6C757D',
    fontWeight: '500',
  },
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  displayContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#6C757D',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
    textAlign: 'center',
  },
  dateTimeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeIcon: {
    fontSize: 22,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  timeLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 40,
    marginHorizontal:10,
    backgroundColor: '#DEE2E6',
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateIcon: {
    fontSize: 22,
  },
  dateValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  dateLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
    marginTop: 2,
  },
  fullDateTime: {
    textAlign: 'center',
    fontSize: 13,
    color: '#868E96',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#E7F3FF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  dateButtonIcon: {
    fontSize: 20,
  },
  dateButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  timeButton: {
    flex: 1,
    backgroundColor: '#E7F3FF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  timeButtonIcon: {
    fontSize: 20,
  },
  timeButtonText: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});