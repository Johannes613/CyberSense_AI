import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShieldWarning, Fire, CaretRight, Bug } from 'phosphor-react-native';

const ThreatListItem = ({ item, onPress }) => {
  const severityStyles = {
    Critical: { color: '#D73A49', icon: <Fire color="#D73A49" size={24} weight="bold" /> },
    High: { color: '#F2994A', icon: <ShieldWarning color="#F2994A" size={24} weight="bold" /> },
    Medium: { color: '#4A90E2', icon: <ShieldWarning color="#4A90E2" size={24} /> },
    Low: { color: '#34C759', icon: <Bug color="#34C759" size={24} /> },
  };

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>{severityStyles[item.severity]?.icon}</View>
      <View style={styles.details}>
        <Text style={[styles.severity, { color: severityStyles[item.severity]?.color }]}>
          {item.severity}
        </Text>
        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.source}>{item.source} • {item.time}</Text>
      </View>
      <CaretRight color="#8D8D93" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#1C1C22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D33'
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  severity: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  source: {
    color: '#8D8D93',
    fontSize: 13,
  },
});

export default ThreatListItem;
