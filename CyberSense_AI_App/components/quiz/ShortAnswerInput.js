import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PaperPlaneRight } from 'phosphor-react-native';

export const ShortAnswerInput = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Write your answer here..."
        placeholderTextColor="#8D8D93"
        multiline
        value={text}
        onChangeText={setText}
        editable={!isLoading}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <PaperPlaneRight color="#FFFFFF" size={22} weight="fill" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  textInput: {
    backgroundColor: '#1C1C22',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2D2D33',
    borderRadius: 12,
    padding: 16,
    height: 150,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#8A63D2',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
