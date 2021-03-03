import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';


const SnapShot = () => {
  const [text, setText] = useState('');
  const [snapShot, setSnapShot] = useState('');
  const [showSnapShot, setShowSnapShot] = useState(false);

  const takeSnapShot = () => {
    setSnapShot(text);
    if (text.length > 0) setShowSnapShot(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SnapShot</Text>
      </View>
      <View style={styles.snapShot}>
        {showSnapShot && (
          <Text style={styles.snapShotText}>{snapShot}</Text>
        )}
      </View>
      <View style={styles.fields}>
        <TextInput placeholder='Type any text you want' style={styles.inputText} onChangeText = { value => setText(value) } />
        <TouchableOpacity style={styles.buttonStyle} onPress={() => takeSnapShot()}>
          <Text style={styles.buttonTextStyle}>
            Take Screenshot
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SnapShot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  snapShot: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  snapShotText: {
    backgroundColor: '#98FFA9',
    padding: 40,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98FFA9',
    borderRadius: 100,
    margin: 20,
  },
  headerText: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },

  textStyle: {
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    backgroundColor: '#98FFA9',
    padding: 5,
    borderRadius: 20,
    minWidth: 150,
    marginTop: 50,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'black',
    textAlign: 'center',
  },
  fields: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  inputText: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    textAlign: 'center',
  },
});
