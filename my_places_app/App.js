import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, Icon, ListItem } from 'react-native-elements';

const db = SQLite.openDatabase('myplacesdb.db')

export default function App() {
  const [address, setAddress] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists myplaces (id integer primary key not null, address text);')
    })
    updateList();
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into myplaces (address) values (?);',
        [address])
    }, null, updateList
    )
    setAddress('')
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from myplaces;', [], (_, { rows }) =>
        setList(rows._array)
      )
    })
  }

 /* const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from myplaces where id = ?;', [id])
    }, null, updateList
    )
  }*/

  return (
    <View style={styles.container}>
      <Header 
        placement='left'
        containerStyle={styles.header}
        centerComponent={{ text: 'My Places', style: { color: '#fff', fontSize: 20, fontWeight: 'bold' } }}
      />
      <View style={styles.inputcontainer}>
        <Input
          style={styles.input}
          onChangeText={address => setAddress(address)}
          value={address}
          placeholder='Type in address'
          label='PLACEFINDER'
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
              <ListItem.Title>{item.address}</ListItem.Title>
            </ListItem.Content>
            {/*<Text onPress={() => deleteItem(item.id)}>show on map `&gt;`</Text>*/}
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
  header: {
    backgroundColor: 'green',
  },
  inputcontainer: {
    flexDirection: 'column',
    width: '93%',
    marginTop: 5
  },
  input: {
    width: '100%',
    height: 30,
    fontSize: 18
  },
  buttoncontainer: {
    marginTop: 5,
    marginBottom: 25,
  },
  button: {
    //width: '100%',
  },
  listheading: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  listcontainer: {
    width: '93%'
  },
});

