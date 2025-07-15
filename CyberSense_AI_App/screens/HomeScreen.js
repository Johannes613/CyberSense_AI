import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
// Assuming your folder structure is as planned
import { LevelAccordion } from '../components/common/LevelAccordion';
import { ListItem } from '../components/common/ListItem';
import Svg, { Path, Defs, RadialGradient, Stop } from 'react-native-svg';

const lessonsData = {
  beginner: [
    { id: 'b1', title: 'Introduction to the Internet', type: 'video' },
    { id: 'b2', title: 'Personal Information', type: 'video' },
    { id: 'b3', title: 'Strangers on the Internet', type: 'video' },
  ],
  intermediate: [
    { id: 'i1', title: 'Understanding Phishing', type: 'story' },
    { id: 'i2', title: 'Creating Strong Passwords', type: 'scenario' },
  ],
  advanced: [
    { id: 'a1', title: 'Reporting Incidents', type: 'scenario' },
    { id: 'a2', title: 'Two-Factor Authentication', type: 'video' },
  ],
};

const BackgroundGlow = () => (
  <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
    <Defs>
      <RadialGradient id="grad" cx="50%" cy="30%" r="70%">
        <Stop offset="0" stopColor="#1A2A57" stopOpacity="1" />
        <Stop offset="1" stopColor="#101014" stopOpacity="1" />
      </RadialGradient>
    </Defs>
    <Path d="M0 0 H1000 V2000 H0 Z" fill="url(#grad)" />
  </Svg>
);

const HomeScreen = ({ navigation }) => {
  const handleItemPress = (item) => {
    console.log(`Navigating to ${item.type} screen with item:`, item.title);
    alert(`Pretend this navigates to the "${item.title}" lesson.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <BackgroundGlow />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.levelText}>Your Level is: BEGINNER</Text>
        </View>

        <LevelAccordion title="Beginner Lessons">
          {lessonsData.beginner.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              onPress={() => handleItemPress(item)}
            />
          ))}
        </LevelAccordion>

        <LevelAccordion title="Intermediate Lessons">
          {lessonsData.intermediate.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              onPress={() => handleItemPress(item)}
            />
          ))}
        </LevelAccordion>

        <LevelAccordion title="Advanced Lessons">
          {lessonsData.advanced.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              onPress={() => handleItemPress(item)}
            />
          ))}
        </LevelAccordion>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101014',
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.6)',
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default HomeScreen;
