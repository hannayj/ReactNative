import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [result, setResult] = useState(0)
  const [data, setData] = useState([])
  //const [id, setId] = useState(0)

  const sum = () => {
    const sum = parseInt(firstValue) + parseInt(secondValue)
    //console.log(sum)
    setResult(sum)
    //setId(id + 1)
    setData([...data, {text: `${firstValue} + ${secondValue} = ${sum}`}])
  }

  const substraction = () => {
    const sub = parseInt(firstValue) - parseInt(secondValue)
    //console.log(sub)
    setResult(sub)
    //setId(id + 1)
    setData([...data, {text: `${firstValue} - ${secondValue} = ${sub}`}])
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        onChangeText={firstValue => setFirstValue(firstValue)}
        value={String(firstValue)}
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.input}
        onChangeText={secondValue => setSecondValue(secondValue)}
        value={String(secondValue)}
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
        <Text>History</Text>
        <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) =>
          <Text>{item.text}</Text>}
        />
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
    marginTop: 30,
  },
  input: {
    width: 200,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
});
