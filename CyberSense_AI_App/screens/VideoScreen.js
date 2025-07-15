import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScreenHeaderWithBack } from '../components/ui/ScreenHeaderWithBack';
import { PlayCircle } from 'phosphor-react-native';

const VideoPlayerPlaceholder = () => (
  <View style={videoStyles.playerContainer}>
    <PlayCircle color="#FFFFFF" size={60} weight="fill" style={{ opacity: 0.8 }} />
    <Text style={videoStyles.playerText}>Video Player Placeholder</Text>
  </View>
);

const VideoScreen = ({ navigation, route }) => {
  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Introduction to the Internet" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={videoStyles.description}>
          Please watch the following video. This presents the basic introduction of internet.
        </Text>
        <VideoPlayerPlaceholder />
        <Text style={videoStyles.thanksText}>
          Thanks for watching, please complete the following quiz to test your understanding.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
           <Text style={videoStyles.quizLink}>Go to Quiz: Introduction to the Internet</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

const videoStyles = StyleSheet.create({
  description: { color: '#8D8D93', fontSize: 16, lineHeight: 24, marginBottom: 24 },
  playerContainer: { height: 220, backgroundColor: '#1C1C22', borderRadius: 20, borderWidth: 1, borderColor: '#2D2D33', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  playerText: { color: '#8D8D93', marginTop: 10 },
  thanksText: { color: '#FFFFFF', fontSize: 16, lineHeight: 24, marginBottom: 16, textAlign: 'center' },
  quizLink: { color: '#8A63D2', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});

export default VideoScreen;