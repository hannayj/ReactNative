import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import * as Speech from 'expo-speech'

export default function App() {
  const [text, setText] = useState('')

  const startSpeaking = () => {
    Speech.speak(text)
    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder='Write here'
      />
      <Button
        title='PRESS TO HEAR TEXT'
        onPress={startSpeaking}
      />
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
    width: 200,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
});
