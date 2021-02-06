import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, RadioForm, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const Calculation = (props) => {
  const [calculateData, setCalculateData] = useState({});
  const [result, setResult] = useState('');
  const calculate = () => {
    console.log('calculateData', calculateData);
    fetch('https://simple-app-qusai.herokuapp.com/api/v1/calculate',{
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(calculateData),
    })
    .then(res => res.json())
    .then(data => setResult(data.result));
  }

  const operation = [
    { label: '+', value: '+' },
    { label: '-', value: '-' },
    { label: '*', value: '*' },
    { label: '/', value: '/' },
  ];

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>
      <View style={styles.fields}>
        <Text>1'st Number:</Text>
        <TextInput placeholder='Type First Number' keyboardType='numeric' style={styles.inputText} onChangeText={(value)=> setCalculateData({...calculateData, 'firstNumber': value})}/>
        <Text>2'nd Number:</Text>
        <TextInput placeholder='Type Second Number' keyboardType='numeric' style={styles.inputText} onChangeText={(value)=> setCalculateData({...calculateData, 'secondNumber': value})}/>
        <Text>Operation:</Text>
        <DropDownPicker
          items={operation}
          defaultValue={'+'}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{ justifyContent: 'flex-start' }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(value)=> setCalculateData({...calculateData, 'operation': value.value })}
        />
      </View>
      <Text>{result}</Text>
      <View style={{marginTop: 150}}>
        <Button onPress={()=> calculate()} title="Submit" color='green'/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D068',
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 30,
  },

  inputText: {
    width: 250,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 8,
  },

  fields: {
    marginVertical: 20,
  },
});


export default Calculation;
