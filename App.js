import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import Home from './components/splash-screen.js'
import Tabs from './components/tabs.js'


PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default function App() {
  const [user, setUser] = useState({});
  const [accessApp, setAccessApp] = useState(false);

  const logedIn = (data) => {
    setAccessApp(data.access);
    setUser(data.user);
    storeData(data);
    fetch('https://simple-server-auth.herokuapp.com/api/v1/stopScheduleNotificaions')
    .then(res => res.text())
    .then(data => console.log(data));
  };

  const signOut = () => {
    auth().signOut().then(() => {
      alert('Signed out!')
      setAccessApp(false);
      AsyncStorage.clear();
      fetch('https://simple-server-auth.herokuapp.com/api/v1/scheduleNotificaions')
      .then(res => res.text())
      .then(data => console.log(data));
    });
  };

  const storeData = data => {
    let storage = [['user', JSON.stringify(data.user)], ['access', `${data.access}`]];
    AsyncStorage.multiSet(storage, (error)=> {
      if(error) console.warn("error!");
      else console.log('Data is stored');
    });
  };

  useEffect(() => {
    AsyncStorage.multiGet(['access', 'user'])
    .then((userSession) => {
      userSession[0][1] == 'true' ? setAccessApp(true) : setAccessApp(false);
      setUser(JSON.parse(userSession[1][1]));
    });
  }, []);

  return (
    <View style={styles.container}>
      { !accessApp && <Home logedIn = {logedIn} /> }
      { accessApp && <Tabs signOut = {signOut} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
