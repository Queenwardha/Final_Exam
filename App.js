import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons library
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Import StyleSheet from 'react-native'
import LightSensorApp from './LightSensorApp';
import GPSTrackerApp from './GPSTrackerApp';
import StepCounterApp from './StepCounterApp';
import CompassApp from './CompassApp';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AppSelection"
          component={AppSelectionScreen}
          options={{ headerShown: false }} // Hide header for app selection screen
        />
        <Stack.Screen
          name="LightSensorApp"
          component={LightSensorApp}
          options={{
            title: 'Light Sensor',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="ios-sunny"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="GPSTrackerApp"
          component={GPSTrackerApp}
          options={{
            title: 'GPS Tracker',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="ios-pin"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="StepCounterApp"
          component={StepCounterApp}
          options={{
            title: 'Step Counter',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="ios-walk"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="CompassApp"
          component={CompassApp}
          options={{
            title: 'Compass',
            headerStyle: { backgroundColor: '#f4511e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="ios-compass"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Define a separate screen for app selection
const AppSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose an App</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LightSensorApp')}>
        <View style={styles.appButtonContainer}>
          <Ionicons name="ios-sunny" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.appButton}>Light Sensor App</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('GPSTrackerApp')}>
        <View style={styles.appButtonContainer}>
          <Ionicons name="ios-pin" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.appButton}>GPS Tracker App</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('StepCounterApp')}>
        <View style={styles.appButtonContainer}>
          <Ionicons name="ios-walk" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.appButton}>Step Counter App</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CompassApp')}>
        <View style={styles.appButtonContainer}>
          <Ionicons name="ios-compass" size={24} color="#007bff" style={styles.icon} />
          <Text style={styles.appButton}>Compass App</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Styles
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
  appButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appButton: {
    fontSize: 20,
    marginBottom: 10,
    color: '#007bff', // Blue color for app buttons
  },
  icon: {
    marginRight: 10,
  },
});
export default App;
