import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Alert, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('')
  const [recipes, setRecipes] = useState([])

  const findRecipes = () => {
    fetch(`http://www.recipepuppy.com/api/?i=${ingredient}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results)
        console.log(data.results)
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }

  const listSeparator = () => {
    return (
      <View
        style={{ 
          height: 1, 
          width: '95%', 
          backgroundColor: '#CED0CE' }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={ingredient => setIngredient(ingredient)}
        value={ingredient}
        placeholder='Type an ingredient'
      />
      <View style={styles.containerButtons}>
        <Button
          title='FIND'
          onPress={findRecipes}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.href}
          data={recipes}
          ItemSeparatorComponent={listSeparator}
          renderItem={({ item }) =>
            <View>
              <Text>{item.title}</Text>
              <Image source={{ uri: item.thumbnail }} style={{ width: 60, height: 60 }} />
            </View>
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
    marginTop: 30,
  },
  containerButtons: {
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
