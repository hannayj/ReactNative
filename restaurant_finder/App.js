import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import Constants from 'expo-constants'

export default function App() {
  const KEY = Constants.manifest.extra.apiKey
  const PLACESKEY = Constants.manifest.extra.placesApiKey
  const [address, setAddress] = useState()
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  })
  const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`
  const [restaurants, setRestaurants] = useState([])

  const findAddress = () => {
    //console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        //console.log(data.results[0].locations[0].latLng)

        let lat = Number(data.results[0].locations[0].latLng.lat)
        let lng = Number(data.results[0].locations[0].latLng.lng)

        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        })

        setAddress('')
        
        let secondUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${PLACESKEY}`
        fetch(secondUrl)
          .then(response => response.json())
          .then(data => {
            //console.log(data.results)
            setRestaurants(data.results)
          })
          .catch((error) => {
            Alert.alert('Error in finding restaurants', error)
          })
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }

  if (region.latitudeDelta == 0) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={address => setAddress(address)}
          value={address}
          placeholder='Type the address'
        />
        <View style={styles.button}>
          <Button
            title='SHOW'
            onPress={findAddress}
          />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={address => setAddress(address)}
          value={address}
          placeholder='Type the address'
        />
        <View style={styles.button}>
          <Button
            title='SHOW'
            onPress={findAddress}
          />
        </View>

        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}
        >
        {restaurants.map((restaurant, index) => (
          <Marker
              key={index}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng
              }}
              title={restaurant.name}
              description={restaurant.vicinity}

            />
        ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  input: {
    width: '80%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});
