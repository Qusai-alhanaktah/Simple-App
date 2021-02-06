import * as React from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import { logOut } from './action.js';
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

  const signOut = () => {
    console.log(';;;;;;;;;;;;;;;;;;;;;;;');
    props.logOut();
    console.log(props);
    if(!props.loggedIn) {
      props.isLogedOut()
      alert("See you");
    };
  }

const Tabs = () => {
  return (
    <SafeAreaView style={{flex: 1,}}>
      <NavigationContainer>
        <View style={{width: '100%', alignItems: 'flex-end', top: 50,}}>
          <Button title="LOGOUT" onPress={(value) => signOut() } color="black" />
        </View>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
    user: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn,
    loading: state.authReducer.loading,
  });
const mapDispatchToProps = { logOut };

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
