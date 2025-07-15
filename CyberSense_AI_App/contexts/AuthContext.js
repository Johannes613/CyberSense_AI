import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "345945658053-sjpilv57kptn7kaonjhb020a1e81ain1.apps.googleusercontent.com",
    iosClientId:
      "345945658053-i4d99og69tmtn14nk0kpj800tn045hfc.apps.googleusercontent.com",
    webClientId:
      "345945658053-sjpilv57kptn7kaonjhb020a1e81ain1.apps.googleusercontent.com",
    androidClientId: "345945658053-0q3k1f8g5j4l",
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, { displayName: name });
    if (auth.currentUser) setUser({ ...auth.currentUser });
    return userCredential;
  };

  const updateUserProfile = async (name) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName: name });
    setUser({ ...auth.currentUser });
  };

  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return reauthenticateWithCredential(user, credential);
  };

  const updateUserPassword = (newPassword) => {
    if (!auth.currentUser) return;
    return updatePassword(auth.currentUser, newPassword);
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const savePhishingResult = async (emailId, wasCorrect, score) => {
    if (!auth.currentUser) return;

    const attemptRef = doc(
      collection(db, "users", auth.currentUser.uid, "phishingAttempts")
    );

    const attemptData = {
      emailId,
      wasCorrect,
      score,
      timestamp: serverTimestamp(),
    };

    try {
      await setDoc(attemptRef, attemptData);
      console.log("Phishing attempt saved.");
    } catch (error) {
      console.error("Error saving phishing attempt:", error);
      throw error;
    }
  };
  const getUserStats = async () => {};

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    googleSignIn: promptAsync,
    isGoogleRequestReady: !!request,
    savePhishingResult,
    getUserStats,
    updateUserProfile,
    reauthenticate,
    updateUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
