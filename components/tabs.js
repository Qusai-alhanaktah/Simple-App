import * as React from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Notification from './notification.js';
import PhotoUploaded from './upload-photo.js';
import SnapShot from './snapshot.js';
import Calculation from './calculation.js';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="PhotoUploaded" component={PhotoUploaded} />
      <Tab.Screen name="SnapShot" component={SnapShot} />
      <Tab.Screen name="Calculation" component={Calculation} />
    </Tab.Navigator>
  );
}

const Tabs = () => {
  return (
    <SafeAreaView style={{flex: 1,}}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default Tabs;
