// ThreatDetailScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import ScreenContainer from "../components/ui/ScreenContainer";
import { ScreenHeaderWithBack } from "../components/ui/ScreenHeaderWithBack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ThreatDetailScreen = ({ navigation, route }) => {
  const { threat } = route.params;
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const enrichThreatDetails = async () => {
      if (threat.description && threat.indicators?.length > 0) {
        setDetails(threat);
        setIsLoading(false);
        return;
      }

      try {
        const cacheKey = `threat_${threat.id}_details`;

        // Try loading from AsyncStorage cache
        const cachedData = await AsyncStorage.getItem(cacheKey);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setDetails(parsedData);
          setIsLoading(false);
          return;
        }

        if (!GEMINI_API_KEY) {
          throw new Error(
            "Gemini API key is not configured in your environment."
          );
        }

        const tags = (threat.tags || []).join(", ");
        const prompt = `
You are a cybersecurity analyst expert. Your task is to summarize a threat based on its title and tags.

Threat Title: "${threat.name}"
Tags: [${tags}]

Your response MUST STRICTLY follow these rules:
1.  Generate a "description" that is a maximum of two sentences.
2.  Generate a list of EXACTLY 4 "indicators" of compromise. Do not provide more or less than 4.

Return ONLY a valid JSON object with two keys: "description" and "indicators". Do not include any other text, explanations, or markdown formatting.

Example: 
{
  "description": "A sophisticated phishing campaign is actively targeting banking users in the UAE. The attackers use deceptive emails with malicious links to steal online banking credentials and personal information.",
  "indicators": [
    {"type": "URL", "indicator": "http://uae-bank-secure-login.com"},
    {"type": "Email Subject", "indicator": "Urgent: Your Account Requires Verification"},
    {"type": "File Hash (SHA-256)", "indicator": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"},
    {"type": "IP Address", "indicator": "198.51.100.12"}
  ]
}
`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" },
            }),
          }
        );

        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(`API Error: ${errorBody.error.message}`);
        }

        const geminiResponse = await res.json();
        const enrichedData = JSON.parse(
          geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
        );

        if (enrichedData.indicators && Array.isArray(enrichedData.indicators)) {
          enrichedData.indicators = enrichedData.indicators.slice(0, 4);
        }

        const finalData = {
          ...threat,
          description: enrichedData.description || "No description available.",
          indicators: enrichedData.indicators || [],
        };

        await AsyncStorage.setItem(cacheKey, JSON.stringify(finalData));

        setDetails(finalData);
      } catch (err) {
        console.error("Failed to enrich threat data:", err);
        Alert.alert(
          "Error",
          "Could not fetch additional threat details. Please check your API key and network connection."
        );
        setDetails({
          ...threat,
          description:
            threat.description || "Details could not be loaded at this time.",
          indicators: threat.indicators || [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (threat) {
      enrichThreatDetails();
    } else {
      Alert.alert("Error", "No threat data was provided to this screen.");
      setIsLoading(false);
    }
  }, [threat]);

  if (isLoading || !details) {
    return (
      <ScreenContainer>
        <ScreenHeaderWithBack title="Loading Details" navigation={navigation} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#8A63D2" />
          <Text style={styles.loadingText}>Enriching threat details...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Threat Details" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{details.name}</Text>

        <View style={styles.tagsContainer}>
          {(details.tags || []).map((tag) => (
            <Text key={tag} style={styles.tag}>
              {String(tag)}
            </Text>
          ))}
        </View>

        <Text style={styles.description}>{String(details.description)}</Text>

        <Text style={styles.sectionTitle}>Indicators of Compromise (IOCs)</Text>
        <View style={styles.iocContainer}>
          {details.indicators?.length > 0 ? (
            details.indicators.map((ioc, i) => (
              <View key={i} style={styles.iocRow}>
                <Text style={styles.iocType}>
                  {String(ioc?.type || "Unknown")}
                </Text>
                <Text style={styles.iocIndicator} selectable>
                  {String(ioc?.indicator || "N/A")}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noIocText}>
              No specific indicators available.
            </Text>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#8D8D93",
    marginTop: 10,
    fontSize: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    color: "#8A63D2",
    backgroundColor: "rgba(138, 99, 210, 0.1)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginRight: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  description: {
    color: "#AEAEB2",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  iocContainer: {
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  iocRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#2D2D33",
    paddingVertical: 12,
  },
  iocType: {
    color: "#8D8D93",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "500",
  },
  iocIndicator: {
    color: "#EAEAEA",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  noIocText: {
    color: "#8D8D93",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
});

export default ThreatDetailScreen;
