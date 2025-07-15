import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ScreenContainer from "../components/ui/ScreenContainer";
import { ScreenHeaderWithBack } from "../components/ui/ScreenHeaderWithBack";
import { allStoriesData } from "../data/lessonData";

const StoryScreen = ({ navigation, route }) => {
  const { storyId } = route.params;
  const [storyData, setStoryData] = useState(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (allStoriesData[storyId]) {
      setStoryData(allStoriesData[storyId]);
    }
  }, [storyId]);

  const handleSimulateAI = () => {
    if (isSimulating || !storyData) return;
    setIsSimulating(true);
    setDisplayedAnswer("");
    const fullAnswer = storyData.prompts[currentPromptIndex].aiResponse;
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedAnswer(fullAnswer.substring(0, index + 1));
      index++;
      if (index === fullAnswer.length) {
        clearInterval(intervalId);
        setIsSimulating(false);
      }
    }, 50);
  };

  const handleNext = () => {
    if (storyData && currentPromptIndex < storyData.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setDisplayedAnswer("");
    }
  };

  const handlePrevious = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
      setDisplayedAnswer("");
    }
  };

  if (!storyData)
    return (
      <ScreenContainer>
        <ScreenHeaderWithBack title="Loading..." navigation={navigation} />
      </ScreenContainer>
    );

  const prompt = storyData.prompts[currentPromptIndex];

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title={storyData.title} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={storyStyles.promptTitle}>{prompt.text}</Text>
        <TextInput
          style={storyStyles.textInput}
          value={displayedAnswer}
          placeholder="Click 'Submit' to see an example answer..."
          placeholderTextColor="#8D8D93"
          multiline
          editable={false}
        />
        <View style={storyStyles.buttonContainer}>
          <TouchableOpacity
            style={[storyStyles.button, storyStyles.clearButton]}
            onPress={() => setDisplayedAnswer("")}
          >
            <Text style={storyStyles.buttonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[storyStyles.button, storyStyles.submitButton]}
            onPress={handleSimulateAI}
          >
            <Text style={storyStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* The navigation container is now moved up */}
      <View style={storyStyles.navigationContainer}>
        <TouchableOpacity onPress={handlePrevious}>
          <Text style={storyStyles.navText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text style={storyStyles.navText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const storyStyles = StyleSheet.create({
  promptTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: "#1C1C22",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#2D2D33",
    borderRadius: 12,
    padding: 16,
    height: 150,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: { flexDirection: "row", justifyContent: "center", gap: 20 },
  button: { paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
  clearButton: { backgroundColor: "#D73A49" },
  submitButton: { backgroundColor: "#34C759" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 140,
  },
  navText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
});

export default StoryScreen;
