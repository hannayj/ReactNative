import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db')

export default function App() {
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount text);')
    })
    updateList();
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (product, amount) values (?, ?);',
        [product, amount])
    }, null, updateList
    )
    setProduct('')
    setAmount('')
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setList(rows._array)
      )
    })
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from shoppinglist where id = ?;', [id])
    }, null, updateList
    )
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
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={styles.listitem}>
            <Text style={styles.textitem}>{item.product}, {item.amount}</Text>
            <Text style={[styles.textitem, styles.link]} onPress={() => deleteItem(item.id)}> Bought </Text>
          </View>}
        data={list}
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
