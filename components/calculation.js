import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const Calculation = (props) => {
  const [calculateData, setCalculateData] = useState({operation: '+'});
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    let { firstNumber, secondNumber, operation } = calculateData;
    if (firstNumber && secondNumber) {
      firstNumber = parseInt(firstNumber);
      secondNumber = parseInt(secondNumber);
      if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
        switch (operation) {
          case '+':
            setResult(firstNumber + secondNumber);
            break;
          case '-':
            setResult(firstNumber - secondNumber);
            break;
          case '*':
            setResult(firstNumber * secondNumber);
            break;
          case '/':
            setResult(firstNumber / secondNumber);
            break;
          default:
            break;
        }
        setShowResult(true);
      } else {
        alert('You have to type numbers only')
      }
    } else {
      alert('Fill the blank field');
    }
    setCalculateData({operation: '+'});
  }

  const operations = [
    { label: '+', value: '+' },
    { label: '-', value: '-' },
    { label: '*', value: '*' },
    { label: '/', value: '/' },
  ];

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Simple Calculator</Text>
      </View>
      <View style={styles.fields}>
        <TextInput placeholder='Type First Number' keyboardType='numeric' value={calculateData.firstNumber} style={styles.inputText} onChangeText={(value)=> setCalculateData({...calculateData, 'firstNumber': value})}/>
        <TextInput placeholder='Type Second Number' keyboardType='numeric'value={calculateData.secondNumber} style={styles.inputText} onChangeText={(value)=> setCalculateData({...calculateData, 'secondNumber': value})}/>
        <View style={styles.operation}>
          <View style={{flex: 1, justifyContent:'center', alignItems: 'center',}}>
            <Text style={{fontSize: 20, fontWeight: 'bold',}}>Operation:</Text>
          </View>
          <View style={{flex: 2, justifyContent:'center', alignItems: 'center', width: '10%', marginVertical: 30,}}>
            <RadioForm
              radio_props={operations}
              initial={0}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'gray'}
              animation={true}
              onPress={(value)=> setCalculateData({...calculateData, 'operation': value})} />
          </View>
        </View>
      </View>
      <View style={styles.result}>
        {showResult && (
          <Text style={styles.resultText}>{result}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => calculate()}>
        <Text style={styles.buttonTextStyle}>
          Calculate
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98FFA9',
    borderRadius: 100,
    margin: 20,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  result: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  resultText: {
    backgroundColor: '#98FFA9',
    padding: 30,
    borderRadius: 20,
  },
  operation: {
    flex: 3,
    justifyContent: 'center',
    marginTop: 40,
  },
  inputText: {
    width: '70%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 8,
    marginVertical: 10,
  },
  fields: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#98FFA9',
    borderRadius: 20,
    borderWidth: 3,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 100,
    margin: 20,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonTextStyle: {
    borderRadius: 20,
    padding: 15,
    backgroundColor: '#98FFA9',
    color: 'black',
    textAlign: 'center',
  },
});


export default Calculation;
