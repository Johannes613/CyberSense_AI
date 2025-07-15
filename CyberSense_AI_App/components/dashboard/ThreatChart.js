import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ThreatChart = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.placeholderText}>Chart will be rendered here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C22',
    borderWidth: 1,
    borderColor: '#2D2D33',
    borderRadius: 20,
    padding: 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#8D8D93',
    fontStyle: 'italic',
  }
});

export default ThreatChart;