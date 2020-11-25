import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    getContacts()
  }, [])

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      //console.log(data)
      if (data.length > 0) {
        const onlyWithNumbers = data
          .filter(item => item.phoneNumbers)
        console.log(onlyWithNumbers)
        setContacts(onlyWithNumbers)
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) =>
          <Text>{item.name} {item.phoneNumbers[0].number}</Text>
        }
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
});
