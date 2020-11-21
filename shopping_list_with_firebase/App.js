import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import * as firebase from 'firebase'
import Constants from 'expo-constants'

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: "shoppinglist-e1b84.firebaseapp.com",
  databaseURL: "https://shoppinglist-e1b84.firebaseio.com",
  projectId: "shoppinglist-e1b84",
  storageBucket: "shoppinglist-e1b84.appspot.com",
  messagingSenderId: "418718447107",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [items, setItems] = useState([])

  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val()
      const prods = Object.values(data);
      setItems(prods)
    })
  }, [])

  const saveItem = () => {
    firebase.database().ref('items/').push(
      {'product': product, 'amount': amount}
    )
    updateList()
    setProduct('')
    setAmount('')
  }

  const updateList = () => {
      firebase.database().ref('items/').on('value', snapshot => {
        const data = snapshot.val()
        const prods = Object.values(data);
        setItems(prods)
      })
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          onChangeText={product => setProduct(product)}
          value={product}
          placeholder='Product'
        />
        <TextInput
          style={styles.input}
          onChangeText={amount => setAmount(amount)}
          value={amount}
          placeholder='Amount'
        />
        <View style={styles.button}>
          <Button
            title={'SAVE'}
            onPress={saveItem}
          />
        </View>
      </View>
      <Text style={styles.listheading}>Shopping List</Text>
      <FlatList style={styles.listcontainer}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) =>
          <View style={styles.listitem}>
            <Text style={styles.textitem}>{item.product}, {item.amount}</Text>
          </View>}
        data={items}
        ItemSeparatorComponent={listSeparator}
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
    marginTop: 30
  },
  inputcontainer: {
    flexDirection: 'column',
    width: 200
  },
  input: {
    width: 200,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    fontSize: 18
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 25
  },
  listheading: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  listcontainer: {
    //width: 200
  },
  listitem: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textitem: {
    fontSize: 18
  },
  link: {
    color: '#0000ff'
  }
});
