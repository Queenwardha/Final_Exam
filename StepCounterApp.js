import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Vibration, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const StepCounterApp = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [wasMoving, setWasMoving] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [sessionStepCount, setSessionStepCount] = useState(0);
  const [statusColor, setStatusColor] = useState('green'); // Default color is green for "In Motion"
  const navigation = useNavigation();

  useEffect(() => {
    const handleMovement = ({ x, y, z }) => {
      const now = Date.now();
      const timeDiff = now - lastUpdate;

      if (timeDiff > 50) {
        const acceleration = Math.abs(x + y + z) / 3;
        setIsMoving(acceleration > 0.5); // If acceleration exceeds a threshold, consider it as movement
        setLastUpdate(now);
      }

      if (isMoving && !wasMoving) {
        setStepCount((prevCount) => prevCount + 1); // Increment step count only when transitioning from stationary to moving
        setSessionStepCount((prevSessionCount) => prevSessionCount + 1); // Increment session step count
        Vibration.vibrate(100); // Vibrate on every step
        sendNotification('Step Made'); // Send notification for every step made
      }

      setWasMoving(isMoving);
    };

    const subscription = Accelerometer.addListener(handleMovement);

    return () => {
      subscription.remove();
    };
  }, [isMoving, lastUpdate, sessionStepCount, wasMoving]);

  const sendNotification = async (status) => {
    try {
      let notificationContent = {};

      switch (status) {
        case 'Step Made':
          notificationContent = {
            title: 'Step Made',
            body: 'You have made a step. Keep moving!',
          };
          setStatusColor('green');
          break;
        default:
          return; // Do nothing if status is not recognized
      }

      await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: null, // Send immediately
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const resetSessionStepCount = () => {
    setSessionStepCount(0); // Reset session step count
  };

  const navigateToHome = () => {
  navigation.navigate('AppSelection'); // Assuming 'AppSelection' is the name of your home screen defined in App.js
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Step Counter App</Text>
      <Text style={styles.text}>Steps Taken: {stepCount}</Text>
      <Text style={styles.text}>Session Steps: {sessionStepCount}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Reset Session" onPress={resetSessionStepCount} />
      </View>
      <Text style={[styles.status, { color: statusColor }]}>
        {isMoving ? 'In Motion' : 'Stopped Walking'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Back to Home" onPress={navigateToHome} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default StepCounterApp;
