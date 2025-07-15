import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const AnswerOption = ({ text, onPress, status = 'default' }) => {
  const statusStyles = {
    default: { backgroundColor: '#1C1C22', borderColor: '#2D2D33' },
    selected: { backgroundColor: '#4A90E2', borderColor: '#4A90E2' },
    correct: { backgroundColor: 'rgba(52, 199, 89, 0.2)', borderColor: '#34C759' },
    incorrect: { backgroundColor: 'rgba(215, 58, 73, 0.2)', borderColor: '#D73A49' },
  };
  return (
    <TouchableOpacity style={[ansStyles.container, statusStyles[status]]} onPress={onPress}>
      <Text style={ansStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const ansStyles = StyleSheet.create({
  container: { borderRadius: 12, padding: 18, marginBottom: 12, borderWidth: 1 },
  text: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
});
