import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Modal, TextInput, AsyncStorage } from 'react-native';
import auth from '@react-native-firebase/auth';

const Home = (props) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);
  const [userData, setUserData] = useState({});

  const validation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (!reg.test(userData.email) && userData.password.length < 6) {
      alert('Your Email is invalid, And password must to be 6 character at least');
    } else if (userData.password.length < 6) {
      alert('Your password must to be 6 character at least');
    } else if (!reg.test(userData.email)) {
      alert('Your Email is invalid');
    } else {
      signUp();
      setUserData({});
    }
  };

  const signIn = () => {
    auth().signInWithEmailAndPassword(userData.email, userData.password).then((data) => {
      props.logedIn({user: data.user, access: true})
      console.log(data.user);
    }).catch(error => {
      alert(error.message);
      console.log(error);
    });
    setUserData({});
    setShowSignUpForm(false);
  };

  const signUp = async () => {
    auth().createUserWithEmailAndPassword(userData.email, userData.password)
    .then((data) => {
      props.logedIn({user: data.user, access: true})
    })
    .catch(error => {
      alert(error.message);
      console.log(error);
    });
    setShowSignInForm(false);
  };

  const forgetPassword = () => {
    auth().sendPasswordResetEmail(userData.email)
      .then(user => {
        console.log('user', user);
        alert('Please check your email... create a new password then signIn');
      }).catch(e => {
        if (e.code == 'auth/user-not-found') alert(' There is no user record with this email');
        console.log(e)
      })
      setShowForgetPasswordForm(false);
  };


  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Simple App</Text>
      </View>
      <View style={styles.starting}>
        <Text style={styles.text}>Welcome To My App</Text>
        <Button title="Get Started" color="black" onPress = { ()=> setShowSignUpForm(true) }/>
      </View>
      <Modal visible={showSignUpForm} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Text onPress={() => setShowSignUpForm(false)}>X</Text>
          </View>
          <Text style={styles.modalHeader}>Sign Up</Text>
          <View style={styles.fields}>
            <Text>Email:</Text>
            <TextInput placeholder='Type Your Email' style={styles.modalText} value={userData.email} onChangeText={(value)=> setUserData({...userData, 'email': value})}/>
            <Text>Password:</Text>
            <TextInput placeholder='Type Your Password' style={styles.modalText} value={userData.password} secureTextEntry={true} onChangeText={(value)=> setUserData({...userData, 'password': value})}/>
          </View>
          <Button onPress={()=> validation()} title="Sign Up" color='black'/>
          <View style={styles.swapModal}>
            <Text onPress={ ()=> { setShowSignUpForm(false); setShowSignInForm(true) }} style={styles.swapModalText}>I have account, Sign In</Text>
          </View>
        </View>
      </Modal>
      <Modal visible={showSignInForm} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Text onPress={() => setShowSignInForm(false)}>X</Text>
          </View>
          <Text style={styles.modalHeader}>Sign In</Text>
          <View style={styles.fields}>
            <Text>Email:</Text>
            <TextInput placeholder='Type Your Email' style={styles.modalText} value={userData.email} onChangeText={(value)=> setUserData({...userData, 'email': value})}/>
            <Text>Password:</Text>
            <TextInput placeholder='Type Your Password' style={styles.modalText} value={userData.password} secureTextEntry={true} onChangeText={(value)=> setUserData({...userData, 'password': value})}/>
          </View>
          <Button onPress={()=>  signIn()} title="Log In" color='black'/>
          <View style={styles.swapModal}>
            <Text onPress={ ()=> { setShowSignInForm(false); setShowSignUpForm(true) }} style={styles.swapModalText}>Don't have account, Sign Up</Text>
            <Text onPress={ ()=> { setShowSignInForm(false); setShowForgetPasswordForm(true) }} style={styles.swapModalText}>Forget my password !!</Text>
          </View>
        </View>
      </Modal>
      <Modal visible={showForgetPasswordForm} animationType="slide" transparent={true}>
        <View style={styles.modal}>
          <View style={styles.closeButton}>
            <Text onPress={() => setShowForgetPasswordForm(false)}>X</Text>
          </View>
          <Text style={styles.modalHeader}>Forget my password</Text>
          <View style={styles.fields}>
            <Text>Email:</Text>
            <TextInput placeholder='Type Your Email' style={styles.modalText} value={userData.email} onChangeText={(value)=> setUserData({...userData, 'email': value})}/>
          </View>
          <Button onPress={()=>  forgetPassword()} title="Create new password" color='black'/>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#98FFA9',
    margin: 20,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    margin: 20,
    backgroundColor: "#E5FFCC",
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },

  title: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#98FFA9',
    padding: 30,
    borderRadius: 100,
  },

  starting: {
    flex: 4,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 120,
    backgroundColor: '#98FFA9',
    borderRadius: 100,
  },

  text: {
    fontSize: 25,
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
    color: 'green',
    paddingVertical: 5,
    fontWeight: 'bold',
  },
});

export default Home;
