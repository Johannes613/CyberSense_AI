import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Exam, CaretRight } from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";

const QuizListItem = ({
  id,
  title,
  questionCount = 0,
  isSuggested = false,
  isPersonalized = false,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Quiz", {
      quizId: id,
      isPersonalized: isPersonalized,
    });
  };

  const gradientColors = isSuggested
    ? ["#8A63D2", "#6A40A9"]
    : ["#2D2D33", "#1C1C22"];

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinearGradient colors={gradientColors} style={styles.container}>
        <View style={styles.iconContainer}>
          <Exam color="#FFFFFF" size={26} weight="bold" />
        </View>
        <View style={styles.details}>
          {isSuggested && (
            <Text style={styles.suggestedText}>
              Suggested from CyberSense AI
            </Text>
          )}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.questionCount}>{questionCount} Questions</Text>
        </View>
        <CaretRight color="#8D8D93" size={22} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  iconContainer: {
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  suggestedText: {
    color: "#E0CFFC",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  personalizedText: {
    color: "#FFD580",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  questionCount: {
    color: "#8D8D93",
    fontSize: 14,
    marginTop: 4,
  },
});

export default QuizListItem;
