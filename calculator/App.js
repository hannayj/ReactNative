import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [result, setResult] = useState(0);

  const sum = () => {
    const sum = parseInt(firstValue) + parseInt(secondValue)
    //console.log(sum)
    setResult(sum)
  }

  const substraction = () => {
    const sub = parseInt(firstValue) - parseInt(secondValue)
    //console.log(sum)
    setResult(sub)
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        onChangeText={firstValue => setFirstValue(firstValue)}
        value={firstValue}
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.input}
        onChangeText={secondValue => setSecondValue(secondValue)}
        value={secondValue}
        keyboardType={'numeric'}
      />

      <View style={styles.containerButtons}>
        <Button
          onPress={sum}
          title='+'
        />
        <Button
          onPress={substraction}
          title='-'
        />
      </View>

      <View style={styles.containerBottom}>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  containerButtons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  containerBottom: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
});
