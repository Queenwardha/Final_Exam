import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SensorDataDisplay = ({ sensorName, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sensorName}>{sensorName}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sensorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  data: {
    fontSize: 16,
  },
});

export default SensorDataDisplay;
