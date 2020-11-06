import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

function calculatorScreen({ navigation }) {
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [result, setResult] = useState(0)
  const [data, setData] = useState([])
  const initialFocus = useState(null)

  const sum = () => {
    const sum = Number(firstValue) + Number(secondValue)
    //console.log(sum)
    setResult(sum)
    setData([...data, { text: `${firstValue} + ${secondValue} = ${sum}` }])
    setFirstValue('')
    setSecondValue('')
    initialFocus.current.focus()
  }

  const substraction = () => {
    const sub = Number(firstValue) - Number(secondValue)
    //console.log(sub)
    setResult(sub)
    setData([...data, { text: `${firstValue} - ${secondValue} = ${sub}` }])
    setFirstValue('')
    setSecondValue('')
    initialFocus.current.focus()
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={styles.input}
        onChangeText={firstValue => setFirstValue(firstValue)}
        value={String(firstValue)}
        keyboardType={'numeric'}
        ref={initialFocus}
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
        <Button
          onPress={() => navigation.navigate('History', { data: data })}
          title='HISTORY'
        />
      </View>
    </View>
  )
}

function historyScreen({ route }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
      <Text>History</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) =>
          <Text>{item.text}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Calculator' component={calculatorScreen} />
        <Stack.Screen name='History' component={historyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  containerButtons: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  input: {
    width: 200,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
});
