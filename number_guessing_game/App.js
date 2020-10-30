import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100 + 1))//number = Math.floor(Math.random() * 100 + 1)
  const [guess, setGuess] = useState('')
  const [text, setText] = useState('Guess a number between 1-100')
  const [amount, setAmount] = useState(0)

  const makeTheGuess = () => {
    //console.log(guess)
    //console.log(number)
    //console.log(amount)
    if (guess > number) {
      setText('Your guess is too high')
      setAmount(amount + 1)
    } else if (guess < number) {
      setText('Your guess is too low')
      setAmount(amount + 1)
    } else {
      Alert.alert(`You guessed the number in ${amount} guesses`)
      setAmount(0)
      setNumber(Math.floor(Math.random() * 100 + 1))
      setGuess('')
      //console.log(number)
      //console.log(amount)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        style={styles.input}
        onChangeText={guess => setGuess(guess)}
        value={guess}
        keyboardType={'numeric'}
      />
      <Button
        onPress={makeTheGuess}
        title='MAKE A GUESS'
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 50,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 15,
  },
  text: {
    fontSize: 16,
  },
});
