import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, Icon, ListItem } from 'react-native-elements';

const db = SQLite.openDatabase('shoppinglistdb.db')

export default function App() {
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [list, setList] = useState([])
  const initialFocus = useRef(null)

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
    initialFocus.current.focus()
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

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff', fontSize: 16 } }}
      />
      <View style={styles.inputcontainer}>
        <Input
          style={styles.input}
          onChangeText={product => setProduct(product)}
          value={product}
          placeholder='Product'
          label='PRODUCT'
          ref={initialFocus}
        />
        <Input
          style={styles.input}
          onChangeText={amount => setAmount(amount)}
          value={amount}
          placeholder='Amount'
          label='AMOUNT'
        />
        <View style={styles.buttoncontainer}>
          <Button
            buttonStyle={styles.button}
            icon={<Icon name='save' color='#fff' />}
            title={'SAVE'}
            onPress={saveItem}
          />
        </View>
      </View>

      <FlatList style={styles.listcontainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content style={styles.listcontainer}>
              <ListItem.Title>{item.product}</ListItem.Title>
              <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon name='delete' color='red' onPress={() => deleteItem(item.id)} />
          </ListItem>
        )}
        data={list}
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
    width: '90%',
    marginTop: 5
  },
  input: {
    width: '100%',
    height: 30,
    fontSize: 18
  },
  buttoncontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 25
  },
  button: {
    width: 200,
  },
  listheading: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  listcontainer: {
    width: '90%'
  },
});
