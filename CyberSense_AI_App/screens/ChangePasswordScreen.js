import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScreenHeaderWithBack } from '../components/ui/ScreenHeaderWithBack';
import { useAuth } from '../contexts/AuthContext';
import { Lock } from 'phosphor-react-native';
import zxcvbn from 'zxcvbn';
import { db } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

const ChangePasswordScreen = ({ navigation }) => {
  const { user, reauthenticate, updateUserPassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'New passwords do not match.');
    }
    if (newPassword.length < 6) {
      return Alert.alert('Error', 'New password must be at least 6 characters long.');
    }

    setLoading(true);
    try {
      await reauthenticate(currentPassword);
      await updateUserPassword(newPassword);

      const result = zxcvbn(newPassword);
      const strengthScore = Math.round((result.score / 4) * 100); 

      const metricsRef = doc(collection(db, 'users', user.uid, 'securityMetrics'));
      await setDoc(metricsRef, {
        strengthScore,
        passwordLength: newPassword.length,
        timestamp: serverTimestamp(),
      });

      Alert.alert('Success', 'Your password has been changed successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Password Change Failed',
        'The current password you entered is incorrect or your session has expired. Please sign out and sign back in.'
      );
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Change Password" navigation={navigation} />
      <ScrollView contentContainerStyle={passwordStyles.container}>
        <Text style={passwordStyles.label}>Current Password</Text>
        <View style={passwordStyles.inputContainer}>
          <Lock color="#8D8D93" size={20} style={passwordStyles.inputIcon} />
          <TextInput
            style={passwordStyles.input}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>

        <Text style={passwordStyles.label}>New Password</Text>
        <View style={passwordStyles.inputContainer}>
          <Lock color="#8D8D93" size={20} style={passwordStyles.inputIcon} />
          <TextInput
            style={passwordStyles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        <Text style={passwordStyles.label}>Confirm New Password</Text>
        <View style={passwordStyles.inputContainer}>
          <Lock color="#8D8D93" size={20} style={passwordStyles.inputIcon} />
          <TextInput
            style={passwordStyles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity
          style={passwordStyles.button}
          onPress={handleChangePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={passwordStyles.buttonText}>Update Password</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

const passwordStyles = StyleSheet.create({
  container: { padding: 20 },
  label: { color: '#8D8D93', fontSize: 14, marginBottom: 8, marginLeft: 4 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D2D33',
    marginBottom: 24,
  },
  inputIcon: { marginHorizontal: 16 },
  input: { flex: 1, color: '#FFFFFF', fontSize: 16, paddingVertical: 16 },
  button: {
    backgroundColor: '#8A63D2',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 16,
    minHeight: 58,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default ChangePasswordScreen;
