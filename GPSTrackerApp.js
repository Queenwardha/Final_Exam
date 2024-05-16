import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GPSTrackerApp = () => {
  const [region, setRegion] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // Request high accuracy location updates
        });
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    getLocation();
  }, []);

  const navigateToHome = () => {
    navigation.navigate('AppSelection'); // Navigate to the home screen
  };

  return (
    <View style={styles.container}>
      {/* Navigation to home button */}
      <TouchableOpacity style={styles.navButton} onPress={navigateToHome}>
        <Ionicons name="ios-home" size={24} color="black" />
      </TouchableOpacity>
      <MapView style={styles.map} region={region}>
        {region && <Marker coordinate={region} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  navButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20, // Adjust top position based on platform
    right: 20,
    zIndex: 1,
  },
});

export default GPSTrackerApp;
