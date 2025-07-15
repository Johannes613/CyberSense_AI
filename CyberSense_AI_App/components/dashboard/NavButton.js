import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CaretRight } from 'phosphor-react-native';

const NavButton = ({ title, icon, onPress }) => {
  return (
    
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <CaretRight color="#8D8D93" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C22',
    borderWidth: 1,
    borderColor: '#2D2D33',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NavButton;