import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CompassApp = () => {
  const [heading, setHeading] = useState(0);
  const [direction, setDirection] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const subscription = Magnetometer.addListener(({ x, y }) => {
      const angle = Math.atan2(y, x);
      let angleDegrees = angle * (180 / Math.PI);
      angleDegrees = angleDegrees >= 0 ? angleDegrees : 360 + angleDegrees;

      setHeading(angleDegrees);
      setDirection(getDirection(angleDegrees));
    });

    Magnetometer.setUpdateInterval(100);

    return () => {
      subscription.remove();
    };
  }, []);

  const getDirection = (angle) => {
    if (angle >= 337.5 || angle < 22.5) {
      return 'North';
    } else if (angle >= 22.5 && angle < 67.5) {
      return 'Northeast';
    } else if (angle >= 67.5 && angle < 112.5) {
      return 'East';
    } else if (angle >= 112.5 && angle < 157.5) {
      return 'Southeast';
    } else if (angle >= 157.5 && angle < 202.5) {
      return 'South';
    } else if (angle >= 202.5 && angle < 247.5) {
      return 'Southwest';
    } else if (angle >= 247.5 && angle < 292.5) {
      return 'West';
    } else if (angle >= 292.5 && angle < 337.5) {
      return 'Northwest';
    }
  };

  const navigateToHome = () => {
    navigation.navigate('AppSelection'); // Navigate to the home screen
  };

  return (
    <View style={styles.container}>
      {/* Navigation to home button */}
      <TouchableOpacity style={styles.navButton} onPress={navigateToHome}>
        <Ionicons name="ios-home" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>Compass Heading: {Math.round(heading)}°</Text>
      <Text style={styles.text}>Direction: {direction}</Text>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  navButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default CompassApp;
