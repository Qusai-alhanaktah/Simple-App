import * as React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

export default function LogOut (props) {
  return(
    <View style={styles.container}>
      <TouchableHighlight style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle} onPress={props.signOut()}>Log Out</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
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
