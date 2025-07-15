import React, { useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenContainer from "../components/ui/ScreenContainer";
import { ScreenHeaderWithBack } from "../components/ui/ScreenHeaderWithBack";
import QuizListItem from "../components/lists/QuizListItem";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BACKEND_URL} from '@env';

const CACHE_KEY = 'cachedQuizzes';
const CACHE_TIME_KEY = 'cachedQuizzesTime';
const SIX_HOURS = 6 * 60 * 60 * 1000;

const QuizListScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllQuizzes = async () => {
        setLoading(true);

        try {
          const now = Date.now();
          const cachedTimeStr = await AsyncStorage.getItem(CACHE_TIME_KEY);
          const cachedDataStr = await AsyncStorage.getItem(CACHE_KEY);

          if (cachedTimeStr && cachedDataStr) {
            const cachedTime = parseInt(cachedTimeStr, 10);
            if (now - cachedTime < SIX_HOURS) {
              const cachedQuizzes = JSON.parse(cachedDataStr);
              setQuizzes(cachedQuizzes);
              setLoading(false);
              return;
            }
          } else {
            setLoading(true);
          }

          const publicQuery = query(
            collection(db, "quizzes"),
            orderBy("isSuggested", "desc")
          );
          const publicSnap = await getDocs(publicQuery);
          const publicQuizzes = publicSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            isPersonalized: false,
            questionCount: doc.data().questions?.length || 0,
          }));

          let personalizedQuizzes = [];
          if (user) {
            const personalizedSnap = await getDocs(
              collection(db, "users", user.uid, "personalizedQuizzes")
            );
            personalizedQuizzes = personalizedSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
              isPersonalized: true,
              questionCount: doc.data().questions?.length || 0,
            }));

            if (personalizedQuizzes.length > 1) {
              personalizedQuizzes = personalizedQuizzes.map((quiz, index) => ({
                ...quiz,
                title: `Your Personalized Quiz ${index + 1}`,
              }));
            }
          }

          const combinedQuizzes = [...personalizedQuizzes, ...publicQuizzes];
          setQuizzes(combinedQuizzes);

          await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(combinedQuizzes));
          await AsyncStorage.setItem(CACHE_TIME_KEY, now.toString());
        } catch (error) {
          console.error("Failed to fetch quizzes:", error);
          alert("Could not load quizzes. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchAllQuizzes();
    }, [user])
  );

  const handleGenerateQuiz = async () => {
    if (!user) {
      Alert.alert("Error", "You need to be logged in to generate a quiz.");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("BACKEND_URL/api/quizzes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.uid }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const result = await response.json();
      Alert.alert("Success", "Your personalized quiz has been generated!");

      await AsyncStorage.removeItem(CACHE_KEY);
      await AsyncStorage.removeItem(CACHE_TIME_KEY);

      navigation.replace("QuizList");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not generate quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <ScreenContainer>
        <ScreenHeaderWithBack title="Quizzes" navigation={navigation} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#8A63D2" />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Quizzes" navigation={navigation} />

      <FlatList
        data={quizzes}
        renderItem={({ item }) => (
          <QuizListItem
            {...item}
            onPress={() => {
              navigation.navigate("Quiz", {
                quizId: item.id,
                isPersonalized: item.isPersonalized,
              });
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No quizzes available.</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        onPress={handleGenerateQuiz}
        disabled={isGenerating}
        activeOpacity={0.8}
        style={{ marginHorizontal: 20, marginTop: 20 }}
      >
        <LinearGradient
          colors={["#8A63D2", "#6A40A9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.generateButton}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.generateButtonText}>Generate My Quiz</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  separator: { height: 16 },
  emptyText: { color: "#8D8D93", textAlign: "center", marginTop: 50 },

  generateButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6A40A9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizListScreen;
