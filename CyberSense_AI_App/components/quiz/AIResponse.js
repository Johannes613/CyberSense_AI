import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Robot } from 'phosphor-react-native';

export const AIResponse = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); 
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, 30);

    return () => clearInterval(intervalId); 
  }, [text]);

  return (
    <View style={aiStyles.container}>
      <View style={aiStyles.header}>
        <Robot color="#8A63D2" size={24} weight="fill" />
        <Text style={aiStyles.headerText}>AI Feedback</Text>
      </View>
      <Text style={aiStyles.responseText}>{displayedText}</Text>
    </View>
  );
};

const aiStyles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: 'rgba(138, 99, 210, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(138, 99, 210, 0.2)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    color: '#8A63D2',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  responseText: {
    color: '#EAEAEA',
    fontSize: 16,
    lineHeight: 24,
  },
});
