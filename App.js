import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';

import store from './components/store.js';
import Home from './components/splash-screen.js'
import Tabs from './components/tabs.js'

export default function App() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [accessApp, setAccessApp] = useState(false);

  const isLogedIn = (token) => {
    setToken(token);
    setAccessApp(true);
  }

  const isLogedOut = () => {
    setToken('');
    setAccessApp(false);
  }

  useEffect(() => {
    AsyncStorage.clear();
    // AsyncStorage.multiGet(['access_token', 'user'])
    // .then((userSession) => {
    //   console.log('userSession', userSession);
    //   setToken(userSession[0][1]);
    //   setUser(JSON.parse(userSession[1][1]));
    //   userSession[0][1] ? setAccessApp(true) : setAccessApp(false);
    // });
  }, [])

  return (
    <View style={styles.container}>
      <Provider store={store}>
        {!accessApp && <Home isLogedIn = {isLogedIn} />}
        {accessApp && <Tabs isLogedOut = {isLogedOut} />}
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D068',
  },
});
