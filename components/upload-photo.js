import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, Button, Image, View, Text } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function PhotoUploaded() {
  const [image, setImage] = useState('');
  const [showImage, setShowImage] = useState(false);

  const pickImage = async () => {
    const option = {
        NoData: true,
    };

    launchImageLibrary(option, response => {
      setImage(response.uri);
      setShowImage(true);
    });
  };

  const TakePhoto = async () => {
    const option = {
        NoData: true,
    };

    launchCamera(option, response => {
      setImage(response.uri);
      setShowImage(true);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Upload Image</Text>
      </View>
      <View style={styles.imageField}>
        { showImage &&
          <Image source={{ uri: image }} style={styles.image}/>
        }
      </View>
      <View style={styles.body}>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={() => pickImage()}> Pick image</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText} onPress={() => TakePhoto()}>Take photo</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageField: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    height: 200,
    width: 240,
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
  body: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 50,
  },
  button: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: '#98FFA9',
    padding: 10,
    borderRadius: 50,
    color: 'black'
  },
});
