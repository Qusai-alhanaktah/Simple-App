import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput } from 'react-native';

const Home = (props) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [showSignInForm, setShowSignInForm] = useState(false)

  const signIn = () => {

  }

  const signUp = () => {

  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Qusai App</Text>
      </View>
      <View style={styles.starting}>
        <Text style={styles.text}>Welcome To My App</Text>
        <Button title="Get Started" color="gray" onPress = { ()=> setShowSignUpForm(true) }/>
      </View>
      <Modal visible={showSignUpForm} style={styles.modal}>
        <Button onPress={()=> setShowSignUpForm(false)} title="X" color='red'/>
        <Text>Sign Up</Text>
        <View>
          <Text>UserName:</Text>
          <TextInput placeholder='Type Your Username' style={styles.modalText} onChangeText={(value)=> setUser({...user, 'username': value})}/>
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput placeholder='Type Your Password' style={styles.modalText} onChangeText={(value)=> setUser({...user, 'password': value})}/>
        </View>
        <View>
          <Text>Email:</Text>
          <TextInput placeholder='Type Your Email' style={styles.modalText} onChangeText={(value)=> setUser({...user, 'email': value})}/>
        </View>
        <Button onPress={()=> {setShowSignUpForm(false); signUp()}} title="Submit" color='#eeff41'/>
        <Text onPress={ ()=> { setShowSignUpForm(false); setShowSignInForm(true) }}>Sign In</Text>
      </Modal>
      <Modal visible={showSignInForm} style={styles.modal}>
        <Button onPress={()=> setShowSignInForm(false)} title="X" color='red'/>
        <Text>Sign In</Text>
        <View>
          <Text>UserName:</Text>
          <TextInput placeholder='Type Your Username' style={styles.modalText} onChangeText={(value)=> setUser({...user, 'username': value})}/>
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput placeholder='Type Your Password' style={styles.modalText} onChangeText={(value)=> setUser({...user, 'password': value})}/>
        </View>
        <Button onPress={()=> {setShowSignInForm(false); signIn()}} title="Submit" color='#eeff41'/>
        <Text onPress={ ()=> { setShowSignInForm(false); setShowSignUpForm(true) }}>Sign Up</Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D068'
  },
  modal: {

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

export default Home
