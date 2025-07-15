import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// A reusable button for "Submit", "Clear", etc.
export const StyledButton = ({ title, onPress, type = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[
        styledButtonStyles.button,
        type === 'primary' ? styledButtonStyles.primary : styledButtonStyles.secondary,
      ]}
      onPress={onPress}
    >
      <Text style={styledButtonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styledButtonStyles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primary: {
    backgroundColor: '#4CAF50', // Green for submit/confirm
  },
  secondary: {
    backgroundColor: '#F44336', // Red for clear/cancel
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
