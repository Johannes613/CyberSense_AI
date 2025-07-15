import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Question = ({ number, text }) => (
  <View style={qStyles.container}>
    <Text style={qStyles.number}>Question {number}</Text>
    <Text style={qStyles.text}>{text}</Text>
  </View>
);

const qStyles = StyleSheet.create({
  container: { marginBottom: 24 },
  number: { color: '#8A63D2', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  text: { color: '#FFFFFF', fontSize: 20, fontWeight: '600', lineHeight: 28 },
});
