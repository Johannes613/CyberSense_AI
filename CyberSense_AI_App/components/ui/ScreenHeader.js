import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScreenHeader = ({ title, subtitle, icon }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitle: {
    color: '#8D8D93',
    marginTop: 4,
    fontSize: 16,
  },
});

export default ScreenHeader;
