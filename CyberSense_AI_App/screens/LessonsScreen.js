import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScreenHeaderWithBack } from '../components/ui/ScreenHeaderWithBack'; 
import LessonListItem from '../components/lists/LessonListItem.js';
import { allLessonsData } from '../data/lessonData'; 

const lessonsDataArray = Object.values(allLessonsData);

const LessonsScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'GO_BACK') {
          e.preventDefault();
          navigation.navigate('Dashboard', { screen: 'DashboardHome' });
        }
      });
      return unsubscribe;
    }, [navigation])
  );

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Lessons" navigation={navigation} />
      <FlatList
        data={lessonsDataArray} 
        
        renderItem={({ item }) => <LessonListItem lesson={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
    separator: {
        height: 12,
    }
});

export default LessonsScreen; 