import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScreenHeaderWithBack } from '../components/ui/ScreenHeaderWithBack';
import ResponseModal from '../components/modals/ResponseModal';
import { allEmailsData } from '../data/lessonData';
import { useAuth } from '../contexts/AuthContext';
import { Trash, Shield, LinkSimple } from 'phosphor-react-native';

const EmailBody = ({ text }) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = text.split(urlRegex);
  return (<Text style={styles.bodyText}>{parts.map((part, index) => part.match(urlRegex) ? <Text key={index} style={styles.linkText}>{part}</Text> : part)}</Text>);
};

const EmailDetailScreen = ({ navigation, route }) => {
  const { emailId } = route.params;
  const { savePhishingResult } = useAuth();
  const [emailData, setEmailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', title: '', message: '', score: 0 });
  const [actionTaken, setActionTaken] = useState(false);

  useEffect(() => {
    if (allEmailsData[emailId]) {
      setEmailData(allEmailsData[emailId]);
    }
  }, [emailId]);

  const handleAction = async (actionType) => {
    if (!emailData || actionTaken) return;
    setActionTaken(true);
    
    const response = emailData.responses[actionType];
    const wasCorrect = (actionType === emailData.correctAction);
    
    try {
      await savePhishingResult(emailId, wasCorrect, response.score);
    } catch (error) {
        console.error("Failed to save phishing result:", error);
    }

    setModalContent(response);
    setModalVisible(true);
  };

  if (!emailData) return <ScreenContainer><ScreenHeaderWithBack title="Loading..." navigation={navigation} /></ScreenContainer>;

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Email Simulation" navigation={navigation} />
      <ScrollView>
        <View style={styles.emailCard}>
            <Text style={styles.subject}>{emailData.subject}</Text>
            <View style={styles.separator} />
            <View style={styles.emailHeader}>
                <View style={[styles.icon, { backgroundColor: emailData.color }]}>
                    <Text style={styles.iconText}>{emailData.initial}</Text>
                </View>
                <View style={styles.headerMeta}>
                    <Text style={styles.senderName}>{emailData.sender}</Text>
                    <Text style={styles.toLine}>to me</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
              <EmailBody text={emailData.body} />
            </View>
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleAction('delete')} disabled={actionTaken}>
          <Trash size={26} color={actionTaken ? "#4A4A58" : "#8D8D93"} />
          <Text style={[styles.actionText, actionTaken && styles.disabledText]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleAction('report')} disabled={actionTaken}>
          <Shield size={26} color={actionTaken ? "#4A4A58" : "#4A90E2"} />
          <Text style={[styles.actionText, actionTaken && styles.disabledText]}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleAction('click')} disabled={actionTaken}>
          <LinkSimple size={26} color={actionTaken ? "#4A4A58" : "#D73A49"} />
          <Text style={[styles.actionText, actionTaken && styles.disabledText]}>Click Link</Text>
        </TouchableOpacity>
      </View>

      <ResponseModal
        isVisible={modalVisible}
       
        onClose={() => setModalVisible(false)}
        type={modalContent.type}
        title={modalContent.title}
        message={modalContent.message}
        score={modalContent.score}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  emailCard: { backgroundColor: '#1C1C22', borderRadius: 20, borderWidth: 1, borderColor: '#2D2D33', padding: 20 },
  subject: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  separator: { height: 1, backgroundColor: '#2D2D33', marginBottom: 16 },
  emailHeader: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  iconText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  headerMeta: { flex: 1 },
  senderName: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  toLine: { color: '#8D8D93', fontSize: 14 },
  bodyContainer: { paddingVertical: 24 },
  bodyText: { color: '#EAEAEA', fontSize: 16, lineHeight: 26 },
  linkText: { color: '#4A90E2', textDecorationLine: 'underline' },
  actionBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#2D2D33', backgroundColor: '#101014', paddingBottom: 20 },
  actionButton: { alignItems: 'center', gap: 6, paddingHorizontal: 10 },
  actionText: { color: '#8D8D93', fontSize: 12, fontWeight: '500' },
  disabledText: { color: '#4A4A58' },
});

export default EmailDetailScreen;