import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Phosphor from 'phosphor-react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const StatCard = ({ icon, color, value, label }) => {
  const IconComponent = Phosphor[icon];
  return (
    <View style={statCardStyles.cardContainer}>
      <LinearGradient
        colors={['#2D2D33', '#1C1C22']}
        style={statCardStyles.gradient}
      >
        {IconComponent && <IconComponent color={color} size={28} weight="bold" />}
        <Text style={statCardStyles.value}>{value}</Text>
        <Text style={statCardStyles.label}>{label}</Text>
      </LinearGradient>
    </View>
  );
};

const statCardStyles = StyleSheet.create({
  cardContainer: {
    width: '48%', 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  gradient: {
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    height: 140,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: '#8D8D93',
    marginTop: 4,
  },
});

export default StatCard;
