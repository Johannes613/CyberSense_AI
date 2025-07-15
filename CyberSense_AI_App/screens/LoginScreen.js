import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { Envelope, Lock, GoogleLogo } from 'phosphor-react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  
  const { login, googleSignIn, isGoogleRequestReady } = useAuth();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      return Alert.alert("Authentication Error", "Please fill in all fields.");
    }
    setEmailLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert("Login Failed", "The email or password you entered is incorrect.");
    }
    setEmailLoading(false);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey.</Text>

        <View style={styles.inputContainer}><Envelope color="#8D8D93" size={20} style={styles.inputIcon} /><TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#8D8D93" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} /></View>
        <View style={styles.inputContainer}><Lock color="#8D8D93" size={20} style={styles.inputIcon} /><TextInput style={styles.input} placeholder="Password" placeholderTextColor="#8D8D93" secureTextEntry value={password} onChangeText={setPassword} /></View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={emailLoading}>
          {emailLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity 
          style={[styles.button, styles.googleButton]} 
          onPress={() => googleSignIn()} 
          disabled={!isGoogleRequestReady} 
        >
          <GoogleLogo color="#FFFFFF" size={22} weight="bold" />
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.linkText}>Sign Up</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', paddingBottom: 20 },
  title: { color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#8D8D93', fontSize: 16, textAlign: 'center', marginBottom: 40 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C22', borderRadius: 12, borderWidth: 1, borderColor: '#2D2D33', marginBottom: 16 },
  inputIcon: { marginHorizontal: 16 },
  input: { flex: 1, color: '#FFFFFF', fontSize: 16, paddingVertical: 16 },
  button: { backgroundColor: '#8A63D2', borderRadius: 12, paddingVertical: 18, alignItems: 'center', marginTop: 16, minHeight: 58 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  orText: { color: '#8D8D93', textAlign: 'center', marginVertical: 24 },
  googleButton: { backgroundColor: '#2D2D33', flexDirection: 'row', justifyContent: 'center', gap: 12 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { color: '#8D8D93', fontSize: 14 },
  linkText: { color: '#8A63D2', fontSize: 14, fontWeight: 'bold' },
});

export default LoginScreen;