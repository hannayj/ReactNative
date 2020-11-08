import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export default function App() {
  const [initialCurrency, setInitialCurrency] = useState('')
  const [text, setText] = useState('')
  const [rates, setRates] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('')

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest`)
      .then(response => response.json())
      .then(data => {
        setRates(data.rates)
        console.log(data.rates)
        console.log(Object.keys(data.rates))
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }, [])

  const showEuros = () => {
    //console.log(selectedCurrency)
    const key = Object.keys(rates)[selectedCurrency]
    const rate = rates[key]
    console.log('rate', rate)
    const value = (initialCurrency * (1 / rate)).toFixed(2)
    setText(value + ' €')
    console.log(value)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://www.clker.com/cliparts/d/T/b/R/g/I/euro-coins-md.png' }} style={{ width: '100%', height: 210 }} />
      <Text style={{ fontSize: 20 }}>{text}</Text>

      <View style={styles.containerButtons}>
        <TextInput
          style={styles.input}
          onChangeText={initialCurrency => setInitialCurrency(initialCurrency)}
          value={initialCurrency}
          keyboardType='number-pad'
        />
        <Button
          title='CONVERT'
          onPress={showEuros}
        />
      </View>

      <Picker
        selectedValue={selectedCurrency}
        style={{ height: 50, width: 100, textAlign: 'right' }}

        onValueChange={(item, index) => {
          setSelectedCurrency(item)
          //console.log(item)
        }}>
        {Object.keys(rates).map((item, index) => {
          return (<Picker.Item label={item} value={index} key={index} />)
        })}
      </Picker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 20
  },
  input: {
    width: 50,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
});
