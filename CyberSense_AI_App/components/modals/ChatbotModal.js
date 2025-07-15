import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Modal,
  ActivityIndicator,
} from "react-native";
import { PaperPlaneRight } from "phosphor-react-native";

const { height: deviceHeight } = Dimensions.get("window");
const MODAL_HEIGHT = deviceHeight * 0.85;
const MAX_MODAL_HEIGHT = 700;
const VISIBLE_HEIGHT = Math.min(MODAL_HEIGHT, MAX_MODAL_HEIGHT);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ChatbotModal = ({ isVisible, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I am your CyberSense AI assistant. How can I help you with your cybersecurity questions today?",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollViewRef = useRef(null);
  const pan = useRef(new Animated.Value(VISIBLE_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(pan, {
      toValue: isVisible ? 0 : VISIBLE_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > VISIBLE_HEIGHT / 3) {
          onClose();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const getGeminiResponse = async (chatHistory) => {
    setIsBotTyping(true);
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      const formattedHistory = chatHistory.map((msg) => ({
        role: msg.sender === "bot" ? "model" : "user",
        parts: [{ text: msg.text }],
      }));

      const baseContext = {
        role: "user",
        parts: [
          {
            text: `You are CyberSense AI, a cybersecurity chatbot assistant integrated into a mobile app.
The app helps users learn about phishing, scams, password safety, and general digital security.
You can simulate phishing scenarios, provide security tips, and guide users through educational lessons and quizzes.
When users ask about the app itself, explain that it is an educational tool for improving cybersecurity awareness, especially for non-technical users.`,
          },
        ],
      };

      const payload = {
        contents: [baseContext, ...formattedHistory],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`API Error: ${errorBody.error.message}`);
      }

      const result = await response.json();
      const botResponseText =
        result.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't process that.";

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Gemini API call failed:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "" || isBotTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText("");
    getGeminiResponse(newMessages);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onClose}
      animationType="none"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View
          style={[styles.chatModal, { transform: [{ translateY: pan }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.chatHeader}>
            <View style={styles.closeHandle} />
            <Text style={styles.headerTitle}>CyberSense AI Assistant</Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            style={styles.chatBody}
            contentContainerStyle={styles.chatBodyContent}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.chatMessage,
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                <Text style={styles.chatText}>{msg.text}</Text>
              </View>
            ))}
            {isBotTyping && (
              <View style={[styles.chatMessage, styles.botMessage]}>
                <ActivityIndicator size="small" color="#FFFFFF" />
              </View>
            )}
          </ScrollView>

          <View style={styles.chatInputArea}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask me anything..."
              placeholderTextColor="#8D8D93"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={isBotTyping}
            >
              <PaperPlaneRight color="#FFFFFF" size={22} weight="fill" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  chatModal: {
    height: VISIBLE_HEIGHT,
    backgroundColor: "rgba(28, 28, 34, 0.95)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(45, 45, 51, 0.5)",
    flexDirection: "column",
    overflow: "hidden",
  },
  chatHeader: {
    padding: 16,
    alignItems: "center",
  },
  closeHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#8D8D93",
    borderRadius: 2.5,
    marginBottom: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  chatBody: {
    flex: 1,
  },
  chatBodyContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chatMessage: {
    padding: 12,
    borderRadius: 18,
    maxWidth: "80%",
    marginBottom: 12,
  },
  botMessage: {
    backgroundColor: "#2D2D33",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: "#8A63D2",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  chatText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
  },
  chatInputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopColor: "#2D2D33",
    borderTopWidth: 1,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#101014",
    color: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: "#8A63D2",
    padding: 12,
    borderRadius: 20,
  },
});

export default ChatbotModal;
