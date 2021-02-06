import React from 'react';
import { AsyncStorage } from 'react-native';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGUP = 'LOGUP';

export const logUp = (user) => dispatch => {

  // fetch('http://localhost:8000/signup', {
  //   method: 'post',
  //   mode: 'cors',
  //   cache: 'no-cache',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: user ? JSON.stringify(user) : undefined,
  // })
  // .then(response =>  response.text())
  // .then(data =>{
  let storage = [['user', JSON.stringify(user)], ['access_token', 'dddddddddddd']];
  AsyncStorage.multiSet(storage, (error)=> {
    if(error) alert("error!");
    else {
      dispatch ({
        type: LOGUP,
        payload: {token: 'dddddddddddd', loggedIn: true, loading: false, user: user},
      });
    }
  });
  // });
};
export const logOut = () => dispatch => {
  AsyncStorage.clear();
  dispatch ({
    type: LOGOUT,
    payload: {token:null, loggedIn: false, loading: false, user:{}},
  });
};

export const logIn = (user) => dispatch => {

  // console.log(`Basic ${base64.encode(`${username}:${password}`)}`);
  // fetch('http://localhost:8000/signin', {
  //   method: 'post',
  //   mode: 'cors',
  //   cache: 'no-cache',
  //   headers: new Headers({
  //     'Authorization': `Basic ${base64.encode(`${username}:${password}`)}`,
  //   }),
  // })
  //   .then(response =>  {
  //     console.log('response',response);
  //     response.text()
  //   });
  let storage = [['user', JSON.stringify(user)], ['access_token', 'dddddddddddd']];
  AsyncStorage.multiSet(storage, (error)=> {
    if(error) alert("error!");
    else {
      dispatch ({
        type: LOGIN,
        payload: {token: 'dddddddddddd', loggedIn: true, loading: false, user: user},
      });
    }
  });
};
