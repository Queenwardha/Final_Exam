import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { LightSensor } from 'expo-sensors';
import * as Brightness from 'expo-brightness';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const LightSensorApp = () => {
  const [lightIntensity, setLightIntensity] = useState(0);
  const [brightnessLevel, setBrightnessLevel] = useState('Unknown');
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const setBrightnessAsync = async (brightness) => {
      await Brightness.setBrightnessAsync(brightness);
    };

    const handleLightChange = ({ light }) => {
      setLightIntensity(light);
      updateBrightnessLevel(light); // Update brightness level notification
    };

    const updateBrightnessLevel = (light) => {
      let level = 'Unknown';
      if (light > 0.7) {
        level = 'High'; // High environment light
      } else if (light > 0.4) {
        level = 'Medium'; // Medium environment light
      } else {
        level = 'Low'; // Low environment light
      }

      if (level !== brightnessLevel) {
        setBrightnessLevel(level);
        setBrightnessAsync(light); // Adjust screen brightness based on light intensity
        Alert.alert('Brightness Level Changed', `Brightness level is now ${level}`);
      }
    };

    LightSensor.setUpdateInterval(100);
    const subscription = LightSensor.addListener(handleLightChange);

    return () => {
      subscription.remove();
    };
  }, [brightnessLevel]); // Added brightnessLevel as a dependency

  const navigateToHome = () => {
    navigation.navigate('AppSelection'); // Navigate to the home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Light Intensity: {lightIntensity}</Text>
      <Text style={styles.notification}>Brightness Level: {brightnessLevel}</Text>
      <Button title="Back to Home" onPress={navigateToHome} />
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
  notification: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: '#007bff', // Blue color for notification
  },
});

export default LightSensorApp;
