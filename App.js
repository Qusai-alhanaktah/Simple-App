import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import Home from './components/splash-screen.js'
import Tabs from './components/tabs.js'

export default function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [accessApp, setAccessApp] = useState(false);

  const isLogedIn = (data) => {
    setAccessApp(data.access);
    setUser(data.user);
    setToken(data.token);
    storeData(data);
    alert('The App will Log Out after 1 min, you can Log In again')
    if (data.access)  setTimeout( () => { signOut() }, 99999)
  }

  const signOut = () => {
    setAccessApp(false);
    AsyncStorage.clear();
  }

  const storeData = data => {
    let storage = [['user', JSON.stringify(data.user)], ['access_token', data.token]];
    AsyncStorage.multiSet(storage, (error)=> {
      if(error) console.warn("error!");
      else console.log('storage', storage);
    });
  }

  useEffect(() => {
    AsyncStorage.multiGet(['access_token', 'user'])
    .then((userSession) => {
      setToken(userSession[0][1]);
      setUser(JSON.parse(userSession[1][1]));
      userSession[0][1] ? setAccessApp(true) : setAccessApp(false);
    });
  }, [])

  return (
    <View style={styles.container}>
      { !accessApp && <Home isLogedIn = {isLogedIn} /> }
      { accessApp && <Tabs /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D068',
  },
});
