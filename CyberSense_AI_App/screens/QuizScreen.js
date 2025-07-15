import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ScreenContainer from "../components/ui/ScreenContainer";
import { ScreenHeaderWithBack } from "../components/ui/ScreenHeaderWithBack";
import { Question } from "../components/quiz/Question";
import { AnswerOption } from "../components/quiz/AnswerOption";
import { ShortAnswerInput } from "../components/quiz/ShortAnswerInput";
import { AIResponse } from "../components/quiz/AIResponse";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = 'cachedQuiz';
const CACHE_TIME_KEY = 'cachedQuizTime';
const SIX_HOURS = 6 * 60 * 60 * 1000;

const QuizScreen = ({ navigation, route }) => {
  const { quizId, isPersonalized } = route.params;
  const { user } = useAuth();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);

      try {
        const cacheKey = `${CACHE_KEY}_${quizId}_${isPersonalized}`;
        const cacheTimeKey = `${CACHE_TIME_KEY}_${quizId}_${isPersonalized}`;
        const now = Date.now();
        const cachedTimeStr = await AsyncStorage.getItem(cacheTimeKey);
        const cachedDataStr = await AsyncStorage.getItem(cacheKey);

        if (cachedTimeStr && cachedDataStr) {
          const cachedTime = parseInt(cachedTimeStr, 10);
          if (now - cachedTime < SIX_HOURS) {
            const cachedQuiz = JSON.parse(cachedDataStr);
            setQuizData(cachedQuiz);
            setAnswers(Array(cachedQuiz.questions.length).fill(null));
            setLoading(false);
            return;
          }
        }

        let docRef;
        if (isPersonalized) {
          docRef = doc(db, "users", user.uid, "personalizedQuizzes", quizId);
        } else {
          docRef = doc(db, "quizzes", quizId);
        }

        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setQuizData(data);
          setAnswers(Array(data.questions.length).fill(null));

          await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
          await AsyncStorage.setItem(cacheTimeKey, now.toString());
        } else {
          console.warn("No such quiz document!");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId, isPersonalized, user]);

  const handleShortAnswerSubmit = (userText) => {
    const question = quizData.questions[currentQuestionIndex];
    setIsAILoading(true);
    setAiResponse("");
    setTimeout(() => {
      setIsAILoading(false);
      setAiResponse(question.answer);
    }, 1500);
  };

  const handleNext = () => {
    if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAiResponse("");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAiResponse("");
    }
  };

  const handleFinishQuiz = async () => {
    setIsFinishing(true);
    try {
      let score = 0;
      const quizBreakdown = [];

      quizData.questions.forEach((question, index) => {
        const userAnswer = answers[index];
        let isCorrect = false;
        let questionScore = 0;

        if (question.type === "multiple-choice") {
          isCorrect = userAnswer === question.correctAnswer;
          questionScore = isCorrect ? 1 : 0;
          score += questionScore;
        }

        quizBreakdown.push({
          questionId: question.id,
          questionText: question.text,
          questionType: question.type,
          userAnswer: userAnswer || null,
          correctAnswer: question.correctAnswer || null,
          isCorrect: question.type === "multiple-choice" ? isCorrect : null,
          score: question.type === "multiple-choice" ? questionScore : null,
        });
      });

      const attemptData = {
        userId: user.uid,
        quizId,
        title: quizData.title,
        completedAt: new Date(),
        score,
        totalQuestions: quizData.questions.filter(
          (q) => q.type === "multiple-choice"
        ).length,
        breakdown: quizBreakdown,
      };

      const attemptsCollectionRef = collection(
        db,
        "users",
        user.uid,
        "quizAttempts"
      );
      await addDoc(attemptsCollectionRef, attemptData);

      navigation.replace("QuizResults", {
        score,
        totalQuestions: attemptData.totalQuestions,
        quizData,
        userAnswers: answers,
      });
    } catch (error) {
      console.error("Failed to save quiz attempt:", error);
      alert("There was an error saving your results.");
    } finally {
      setIsFinishing(false);
    }
  };

  if (loading || !quizData) {
    return (
      <ScreenContainer>
        <ScreenHeaderWithBack title="Loading Quiz..." navigation={navigation} />
        <ActivityIndicator size="large" color="#8A63D2" style={{ flex: 1 }} />
      </ScreenContainer>
    );
  }

  const question = quizData.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title={quizData.title} navigation={navigation} />
      <ScrollView style={{ flex: 1 }}>
        <Question number={currentQuestionIndex + 1} text={question.text} />

        {question.type === "multiple-choice" && (
          <>
            {question.options.map((option, index) => (
              <AnswerOption
                key={index}
                text={option}
                status={
                  answers[currentQuestionIndex] === option
                    ? "selected"
                    : "default"
                }
                onPress={() => {
                  const newAnswers = [...answers];
                  newAnswers[currentQuestionIndex] = option;
                  setAnswers(newAnswers);
                }}
              />
            ))}
          </>
        )}

        {question.type === "short-answer" && (
          <>
            <ShortAnswerInput
              onSubmit={handleShortAnswerSubmit}
              isLoading={isAILoading}
            />
            {aiResponse ? <AIResponse text={aiResponse} /> : null}
          </>
        )}
      </ScrollView>

      <View style={quizStyles.navigationContainer}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text
            style={[
              quizStyles.navText,
              currentQuestionIndex === 0 && quizStyles.navTextDisabled,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>
        {isLastQuestion ? (
          <TouchableOpacity
            style={quizStyles.finishButton}
            onPress={handleFinishQuiz}
            disabled={isFinishing}
          >
            {isFinishing ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={quizStyles.finishButtonText}>Finish Quiz</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNext}>
            <Text style={quizStyles.navText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
};

const quizStyles = StyleSheet.create({
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#2D2D33",
  },
  navText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  navTextDisabled: { color: "#4A4A58" },
  finishButton: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    minHeight: 45,
    justifyContent: "center",
  },
  finishButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});

export default QuizScreen;
