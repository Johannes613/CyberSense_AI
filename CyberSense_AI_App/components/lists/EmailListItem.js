import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EmailListItem = ({ id, initial, color, sender, subject, time }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={emailStyles.listItem}
      onPress={() => navigation.navigate('EmailDetail', { emailId: id })}
    >
        <View style={[emailStyles.icon, { backgroundColor: color }]}>
            <Text style={emailStyles.iconText}>{initial}</Text>
        </View>
        <View style={emailStyles.details}>
            <Text style={emailStyles.sender}>{sender}</Text>
            <Text style={emailStyles.subject} numberOfLines={1}>{subject}</Text>
        </View>
        <Text style={emailStyles.time}>{time}</Text>
    </TouchableOpacity>
  );
};

const emailStyles = StyleSheet.create({
    listItem: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, backgroundColor: '#1C1C22', borderRadius: 12, borderWidth: 1, borderColor: '#2D2D33'},
    icon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    iconText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
    details: { flex: 1 },
    sender: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
    subject: { color: '#8D8D93', fontSize: 14, marginTop: 2 },
    time: { color: '#8D8D93', fontSize: 12 },
});

export default EmailListItem;