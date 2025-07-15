import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const StyledButton = ({ title, onPress }) => (
  <TouchableOpacity style={btnStyles.button} onPress={onPress}>
    <Text style={btnStyles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const btnStyles = StyleSheet.create({
  button: { backgroundColor: '#8A63D2', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});