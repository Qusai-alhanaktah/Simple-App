import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Thank you for using my App, Mr.Ronak! 🔥🔥",
      body: "You've got this notification from Qusai Al-hanaktah",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

export default function Notification() {

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <View style={styles.result}>
        <Button title="Press to get a notification" onPress={async () => { await schedulePushNotification() }} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D068',
    alignItems: "center",
  },

  result: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    top: 60,
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
});
