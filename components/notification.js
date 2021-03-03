import React, { useState, useEffect } from 'react';
import PushNotification from "react-native-push-notification";
import { Text, InteractionManager, View, TouchableOpacity, StyleSheet } from 'react-native';



export default function Notification() {

  PushNotification.createChannel(
    {
      channelId: "simple-app-channel-id",
      channelName: "My channel",
      channelDescription: "A channel to categorise your notifications",
      playSound: false,
      soundName: "default",
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );
  const makeNotification = () => {
      PushNotification.localNotification({
        channelId: "simple-app-channel-id",
        autoCancel: true,
        title: "App Notification 🔥🔥",
        message: "Have fun with this app :)",
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notification</Text>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => makeNotification()}>
        <Text style={styles.buttonTextStyle}>
          Puth Notification
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  result: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98FFA9',
    borderRadius: 80,
    margin: 20,
  },
  headerText: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonStyle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    borderRadius: 100,
    color: 'black',
    textAlign: 'center',
    padding: 20,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor: '#98FFA9',
  },
});
