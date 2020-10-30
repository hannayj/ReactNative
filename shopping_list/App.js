import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';

export default function App() {
  const [text, setText] = useState('')
  const [data, setData] = useState([])

  const add = () => {
    //console.log(text)

    if (data.some(item => item.key === text)) {
      Alert.alert(`${text} is already on the list`)
      setText('')
    } else {
      setData([...data, { key: text }])
    }
  }

  const clear = () => {
    setData([])
    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
      />
      <View style={styles.containerButtons}>
        <Button
          title={'ADD'}
          onPress={add}
        />
        <Button
          title={'CLEAR'}
          onPress={clear}
        />
      </View>
      <View style={styles.containerBottom}>
        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Shopping List</Text>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <Text>{item.key}</Text>
          }
        />
      </View>
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
