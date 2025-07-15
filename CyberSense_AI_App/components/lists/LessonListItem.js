import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Phosphor from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

const LessonListItem = ({ lesson }) => {
  const navigation = useNavigation();
  
  const { id, icon, title, duration, level, status } = lesson;

  const IconComponent = Phosphor[icon];
  const statusStyles = {
    completed: { backgroundColor: 'rgba(52, 199, 89, 0.1)', color: '#34C759' },
    'in-progress': { backgroundColor: 'rgba(74, 144, 226, 0.1)', color: '#4A90E2' },
  };
  
  const handlePress = () => {
    navigation.navigate('LessonDetail', { lessonId: id });
  };

  return (
    <TouchableOpacity 
      style={listItemStyles.listItem} 
      onPress={handlePress}
    >
      {IconComponent && <IconComponent color="#8A63D2" size={24} weight="bold" />}
      <View style={listItemStyles.details}>
        <Text style={listItemStyles.title}>{title}</Text>
        <Text style={listItemStyles.detailsText}>{`${duration} • ${level}`}</Text>
      </View>
      <View style={[listItemStyles.statusTag, statusStyles[status]]}>
        <Text style={{ color: statusStyles[status].color, fontWeight: '600', textTransform: 'capitalize' }}>
          {status.replace('-', ' ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const listItemStyles = StyleSheet.create({
    listItem: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#1C1C22', borderRadius: 12, borderWidth: 1, borderColor: '#2D2D33'},
    details: { flex: 1 },
    title: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
    detailsText: { color: '#8D8D93', fontSize: 14, marginTop: 4 },
    statusTag: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
});

export default LessonListItem;