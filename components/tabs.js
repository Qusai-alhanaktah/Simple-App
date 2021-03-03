import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Notification from './notification.js';
import SnapShot from './snapshot.js';
import Calculation from './calculation.js';
import PhotoUploaded from './upload-photo.js';
import LogOut from './log-out.js';

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
       tabBarOptions={{
           keyboardHidesTabBar: true
       }}>
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="PhotoUploaded" component={PhotoUploaded} />
        <Tab.Screen name="SnapShot" component={SnapShot} />
        <Tab.Screen name="Calculation" component={Calculation} />
        <Tab.Screen name="LogOut" children={() => <LogOut signOut = {props.signOut} />}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Tabs;
