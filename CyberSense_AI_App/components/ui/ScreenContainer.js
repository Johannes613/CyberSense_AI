import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const ScreenContainer = ({ children }) => {
  return (
    <SafeAreaView style={containerStyles.safeArea}>
      <View style={containerStyles.container}>{children}</View>
    </SafeAreaView>
  );
};

const containerStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101014',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});

export default ScreenContainer;