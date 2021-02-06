import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { captureScreen } from 'react-native-view-shot';


const SnapShot = () => {
  const [text, setText] = useState('');
  const [savedImagePath, setSavedImagePath] = useState('');
  const [showButton, setShowButton] = useState(false);

  const takeScreenShot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      (uri) => {
        setSavedImagePath(uri);
        setShowButton(false);
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SnapShot</Text>
      { !showButton &&
        <Image
          source={{uri: savedImagePath}}
          style={{
            width: 200,
            height: 300,
            resizeMode: 'contain',
            marginTop: 5
          }}
        />
      }
      <TextInput placeholder='Type any text you want' style={styles.inputText} onChangeText = { value => { setText([...text, value]); setShowButton(true)} } />
      { showButton &&
        <TouchableOpacity style={styles.buttonStyle} onPress={takeScreenShot}>
          <Text style={styles.buttonTextStyle}>
            Take Screenshot
          </Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default SnapShot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D068',
    alignItems: "center",
  },

  title: {
    top: 50,
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },

  textStyle: {
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 20,
    minWidth: 150,
    marginTop: 50,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  inputText: {
    width: 250,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'center',
  },
});
