import React, { useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import * as Notifications from 'expo-notifications';

export const initializeNotifications = async () => {
  await Notifications.requestPermissionsAsync();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true, // should keep on to work on Android
      shouldSetBadge: false,
    }),
  });
};

initializeNotifications();

const Settings = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const notificationIdentifierRef = useRef<string | null>(null);

  const scheduleNotification = async (seconds = 1) => {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { seconds },
    });
    return identifier;
  };

  const handleShowNotification = () => {
    scheduleNotification();
  };

  const handleScheduleNotification = async () => {
    const id = await scheduleNotification(5);
    notificationIdentifierRef.current = id;
  };

  const handleCancelScheduledNotification = () => {
    const identifier = notificationIdentifierRef.current;
    if (!identifier) return;
    Notifications.cancelScheduledNotificationAsync(identifier);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title..."
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Body..."
        value={body}
        onChangeText={setBody}
        style={styles.input}
      />
      <Button title="Show notification" onPress={handleShowNotification} />
      <Button
        title="Schedule notification"
        onPress={handleScheduleNotification}
      />
      <Button
        title="Cancel scheduled notification"
        onPress={handleCancelScheduledNotification}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 16,
  },
});