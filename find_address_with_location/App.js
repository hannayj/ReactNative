import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import Constants from 'expo-constants'
import * as Location from 'expo-location'

export default function App() {
  const KEY = Constants.manifest.extra.apiKey
  const [address, setAddress] = useState()
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  })
  const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`
  const [location, setLocation] = useState(null)

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('No permission to access location')
    } else {
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      })
    }
  }

  const findAddress = () => {
    //console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        //console.log(data.results[0].locations[0].latLng)

        setRegion({
          latitude: Number(data.results[0].locations[0].latLng.lat),
          longitude: Number(data.results[0].locations[0].latLng.lng),
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        })

        setAddress('')
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }

  let text = 'Loading location...'
  if (!location) {
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
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
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude
            }}
          />
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
