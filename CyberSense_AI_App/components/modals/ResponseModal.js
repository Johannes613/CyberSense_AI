import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { CheckCircle, XCircle, ShieldCheck } from "phosphor-react-native";

const ResponseModal = ({ isVisible, onClose, type, title, message, score }) => {
  const modalIcons = {
    success: <CheckCircle size={48} color="#34C759" weight="fill" />,
    warning: <ShieldCheck size={48} color="#4A90E2" weight="fill" />,
    danger: <XCircle size={48} color="#D73A49" weight="fill" />,
  };

  const scoreColor = score > 0 ? "#34C759" : score < 0 ? "#D73A49" : "#8D8D93";
  const scorePrefix = score > 0 ? "+" : "";

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          <View style={modalStyles.iconContainer}>
            {modalIcons[type] || null}
          </View>
          <Text style={modalStyles.title}>{title}</Text>
         
          {score !== 0 && (
            <Text style={[modalStyles.scoreText, { color: scoreColor }]}>
              {scorePrefix}
              {score} Points
            </Text>
          )}
          <Text style={modalStyles.message}>{message}</Text>
          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Text style={modalStyles.closeButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#1C1C22",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
    borderWidth: 1,
    borderColor: "#2D2D33",
  },
  iconContainer: { marginBottom: 16 },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  scoreText: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  message: {
    color: "#8D8D93",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: "#8A63D2",
    paddingVertical: 14,
    borderRadius: 30,
    width: "100%",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ResponseModal;
