import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default Home = (props) => {
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Qusai App</Text>
      </View>
      <View style={styles.starting}>
        <Text style={styles.text}>Welcome To My App</Text>
        <Button title="Get Started" color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D068'
  },

  header: {
    flex: 0.1,
    height: 40,
    marginVertical: 30,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },

  starting: {
    flex: 0.3,
    marginVertical: 30,
    backgroundColor: '#C6FFE3',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 30,
  }
});
