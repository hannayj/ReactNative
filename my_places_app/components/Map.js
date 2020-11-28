import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import Constants from 'expo-constants'

export default function Map({ route }) {
    const { address } = route.params
    const KEY = process.env.EXPO_MAPQUEST_API_KEY || Constants.manifest.extra.apiKey
    const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${address}`
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
    })

    useEffect(() => {
        try {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const { lat, lng } = data.results[0].locations[0].latLng
                    setRegion({ ...region, latitude: lat, longitude: lng })
                })
        } catch (error) {
            Alert.alert('Error', error)
        }
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
            >
                <Marker coordinate={region} />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
})