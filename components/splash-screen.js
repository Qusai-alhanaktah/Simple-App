import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput, AsyncStorage } from 'react-native';
import base64 from 'react-native-base64';

const Home = (props) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
  const [showCreatePasswordForm, setShowCreatePasswordForm] = useState(false);
  const [userData, setUserData] = useState({});

  const signIn = () => {
    let { username, password } = userData;
    fetch('https://simple-app-qusai.herokuapp.com/signin', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${base64.encode(`${username}:${password}`)}`,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.access) props.isLogedIn(data);
      alert(data.message);
    });
  }

  const signUp = () => {
    fetch('https://simple-app-qusai.herokuapp.com/signup', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: userData ? JSON.stringify(userData) : undefined,
    })
    .then(response => response.json())
    .then(data => {
      if (data.access) props.isLogedIn(data);
      alert(data.message);
    });
  }

  const forgetPassword = () => {
    fetch('https://simple-app-qusai.herokuapp.com/forgetPass', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: userData ? JSON.stringify(userData) : undefined,
    })
    .then(response => response.json())
    .then(data => {
      if (data.access) {
        setUserData(data.user);
        setShowCreatePasswordForm(true);
      } else {
        setShowForgetPasswordForm(false);
        alert(data.message);
      }
    });
  }

  const createPassword = () => {
    console.log(userData);
    if (userData.confirmPassword === userData.password) {
      fetch('https://simple-app-qusai.herokuapp.com/changePassword', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: userData ? JSON.stringify(userData) : undefined,
      })
      .then(response => response.json())
      .then(data => {
        props.isLogedIn(data)
        alert(data.message);
      });
    } else {
      alert("Passwords didn't match")
    }
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
      <Modal visible={showSignUpForm} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Button onPress={()=> setShowSignUpForm(false)} title="X" color='black'/>
          </View>
          <Text style={styles.modalHeader}>Sign Up</Text>
          <View style={styles.fields}>
            <Text>UserName:</Text>
            <TextInput placeholder='Type Your Username' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'username': value})}/>
            <Text>Password:</Text>
            <TextInput placeholder='Type Your Password' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'password': value})}/>
            <Text>Email:</Text>
            <TextInput placeholder='Type Your Email' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'email': value})}/>
          </View>
          <Button onPress={()=> {setShowSignUpForm(false); signUp()}} title="Submit" color='green'/>
          <View style={styles.swapModal}>
            <Text onPress={ ()=> { setShowSignUpForm(false); setShowSignInForm(true) }} style={styles.swapModalText}>I have account, Sign In</Text>
          </View>
        </View>
      </Modal>
      <Modal visible={showSignInForm} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Button onPress={()=> setShowSignInForm(false)} title="X" color='black'/>
          </View>
          <Text style={styles.modalHeader}>Sign In</Text>
          <View style={styles.fields}>
            <Text>UserName:</Text>
            <TextInput placeholder='Type Your Username' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'username': value})}/>
            <Text>Password:</Text>
            <TextInput placeholder='Type Your Password' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'password': value})}/>
          </View>
          <Button onPress={()=> {setShowSignInForm(false); signIn()}} title="Submit" color='green'/>
          <View style={styles.swapModal}>
            <Text onPress={ ()=> { setShowSignInForm(false); setShowSignUpForm(true) }} style={styles.swapModalText}>Don't have account, Sign Up</Text>
            <Text onPress={ ()=> { setShowSignInForm(false); setShowForgetPasswordForm(true) }} style={styles.swapModalText}>Forget my password !!</Text>
          </View>
        </View>
      </Modal>
      <Modal visible={showForgetPasswordForm} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Button onPress={()=> setShowForgetPasswordForm(false)} title="X" color='black'/>
          </View>
          <Text style={styles.modalHeader}>Forget my password</Text>
          <View style={styles.fields}>
            <Text>UserName:</Text>
            <TextInput placeholder='Type Your Username' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'username': value})}/>
            <Text>Email:</Text>
            <TextInput placeholder='Type Your Email' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'email': value})}/>
          </View>
          <Button onPress={()=> {setShowForgetPasswordForm(false); forgetPassword()}} title="Submit" color='green'/>
        </View>
      </Modal>
      <Modal visible={showCreatePasswordForm} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Button onPress={()=> setShowCreatePasswordForm(false)} title="X" color='black'/>
          </View>
          <Text style={styles.modalHeader}>Create a new Password</Text>
          <View style={styles.fields}>
            <Text>Password:</Text>
            <TextInput placeholder='Type Your New Password' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'password': value})}/>
            <Text>Confirm Password:</Text>
            <TextInput placeholder='Type Your New Password again' style={styles.modalText} onChangeText={(value)=> setUserData({...userData, 'confirmPassword': value})}/>
          </View>
          <Button onPress={()=> {setShowCreatePasswordForm(false); createPassword()}} title="Submit" color='green'/>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
    backgroundColor: '#98FFA9',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: '20%',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 30,
  },

  modalText: {
    width: 250,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'center',
  },

  fields: {
    marginVertical: 20,
  },

  closeButton: {
    width: '100%',
    alignItems: 'flex-end',
  },

  swapModal: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 30,
  },

  modalHeader: {
    fontSize: 23,
  },

  swapModalText: {
    color: 'blue',
    paddingVertical: 5,
  },
});

export default Home;
