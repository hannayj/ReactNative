import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, Icon, ListItem } from 'react-native-elements';
import { StyleSheet, View, FlatList, Text, Keyboard } from 'react-native';

const db = SQLite.openDatabase('myplacesdb.db')

export default function Places({ navigation }) {
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
        Keyboard.dismiss()
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from myplaces;', [], (_, { rows }) =>
                setList(rows._array)
            )
        })
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from myplaces where id = ?;', [id])
        }, null, updateList
        )
    }

    return (
        <View style={styles.container}>
            <Header
                placement='left'
                containerStyle={styles.header}
                centerComponent={{ text: 'My Places', style: { color: '#fff', fontSize: 22, fontWeight: 'bold' } }}
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
                data={list}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ListItem
                        onPress={() => navigation.navigate('Map', { address: item.address })}
                        onLongPress={() => deleteItem(item.id)}
                        bottomDivider>
                        <ListItem.Content style={styles.listcontainer}>
                            <ListItem.Title>{item.address}</ListItem.Title>
                        </ListItem.Content>
                        <Text >show on map &gt;</Text>
                    </ListItem>
                )}
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
    header: {
        backgroundColor: 'green',
        paddingBottom: 17
    },
    inputcontainer: {
        flexDirection: 'column',
        width: '93%',
        marginTop: 5
    },
    input: {
        width: '100%',
        height: 30,
        fontSize: 16
    },
    buttoncontainer: {
        marginTop: 5,
        marginBottom: 25,
        alignItems: 'center'
    },
    button: {
        width: 330,
    },
    listheading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listcontainer: {
        width: '93%'
    },
});
