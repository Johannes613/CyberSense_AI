import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CaretLeft } from 'phosphor-react-native';

export const ScreenHeaderWithBack = ({ title, navigation, onBackPress }) => (
  <View style={headerStyles.header}>
    <TouchableOpacity 
      onPress={onBackPress ? onBackPress : () => navigation.goBack()} 
      style={headerStyles.backButton}
    >
      <CaretLeft color="#FFFFFF" size={22} weight="bold" />
      <Text style={headerStyles.backText}>Back</Text>
    </TouchableOpacity>
    <Text style={headerStyles.title} numberOfLines={1}>{title}</Text>
    <View style={{ width: 50 }} />
  </View>
);

const headerStyles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backText: { color: '#FFFFFF', fontSize: 17, marginLeft: 6 },
  title: { flex: 1, textAlign: 'center', color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});