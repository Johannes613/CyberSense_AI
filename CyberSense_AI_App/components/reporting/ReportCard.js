import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ReportCard = ({ logo, title, description, url }) => {
  return (
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={['#2D2D33', '#1C1C22']}
        style={styles.cardContainer}
      >
        <View style={styles.logoContainer}>
          {logo}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(url)}>
          <Text style={styles.link}>(Click to visit website)</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 24,
  },
  cardContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.3)',
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#8D8D93',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  link: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportCard;
