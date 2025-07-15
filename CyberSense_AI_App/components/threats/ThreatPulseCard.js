import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldWarning, CaretRight } from 'phosphor-react-native';

const ThreatPulseCard = ({ pulse }) => {
  const navigation = useNavigation();
  const severityStyles = {
    High: { color: '#D73A49', backgroundColor: 'rgba(215, 58, 73, 0.1)' },
    Medium: { color: '#F2994A', backgroundColor: 'rgba(242, 153, 74, 0.1)' },
    Low: { color: '#4A90E2', backgroundColor: 'rgba(74, 144, 226, 0.1)' },
  };

  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ThreatDetail', { threatId: pulse.id })}
    >
      <View style={styles.header}>
        <ShieldWarning color={severityStyles[pulse.severity]?.color || '#8D8D93'} size={28} weight="bold" />
        <Text style={styles.title} numberOfLines={1}>{pulse.name}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>{pulse.description}</Text>
      <View style={styles.footer}>
        <View style={styles.tagsContainer}>
          {pulse.tags.slice(0, 2).map(tag => <Text key={tag} style={styles.tag}>{tag}</Text>)}
        </View>
        <CaretRight color="#8D8D93" size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: { backgroundColor: '#1C1C22', borderRadius: 16, borderWidth: 1, borderColor: '#2D2D33', padding: 16, marginBottom: 12 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  title: { flex: 1, color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  description: { color: '#8D8D93', fontSize: 14, lineHeight: 20, marginBottom: 16 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tagsContainer: { flexDirection: 'row', gap: 8 },
  tag: { color: '#8A63D2', backgroundColor: 'rgba(138, 99, 210, 0.1)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
});

export default ThreatPulseCard;