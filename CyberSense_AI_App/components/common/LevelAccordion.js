import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { CaretDown } from 'phosphor-react-native';

// This component is the collapsible container for lessons (e.g., "Beginner Lessons")
export const LevelAccordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const rotationAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(rotationAnim, {
      toValue: !isExpanded ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();
  };

  const arrowStyle = {
    transform: [
      {
        rotate: rotationAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.8}>
        <Text style={styles.headerText}>{title}</Text>
        <Animated.View style={arrowStyle}>
          <CaretDown color="#FFFFFF" size={20} />
        </Animated.View>
      </TouchableOpacity>
      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const accordionStyles = StyleSheet.create({
  accordionContainer: {
    backgroundColor: 'rgba(20, 30, 55, 0.8)',
    borderRadius: 12,
    marginBottom: 15,
    borderColor: 'rgba(74, 144, 226, 0.5)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(30, 45, 75, 0.9)',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
});