import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, RadioForm, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const Calculation = (props) => {
  const [calculateData, setCalculateData] = useState({});
  const [result, setResult] = useState('');
  const calculate = () => {
    fetch('http://192.168.49.108:8000/api/v1/calculate',{
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(calculateData),
    })
    .then(res => {
      console.log(res.json());
      res.json()
    })
    .then(data => setResult(data));
  }

  const operation = [
    { label: '+', value: '+' },
    { label: '-', value: '-' },
    { label: '*', value: '*' },
    { label: '/', value: '/' },
  ];

  return(
    <View style={styles.container}>
      <Text>Simple Calculator</Text>
      <View style={styles.fields}>
        <Text>1'st Number:</Text>
        <TextInput placeholder='Type First Number' style={styles.modalText} onChangeText={(value)=> setCalculateData({...calculateData, 'firstNumber': value})}/>
        <Text>2'nd Number:</Text>
        <TextInput placeholder='Type Second Number' style={styles.modalText} onChangeText={(value)=> setCalculateData({...calculateData, 'secondNumber': value})}/>
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
      <Button onPress={()=> calculate()} title="Submit" color='green'/>
      <Text>{result}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },

  fields: {

  },
});

export default Calculation;
// <RadioForm
//   radio_props={operation}
//   initial={-1}
//   onPress={ value => setCalculateData({...calculateData, 'operation': value})}
//   buttonSize={20}
//   buttonOuterSize={25}
//   selectorButtonColor={'green'}
// />
