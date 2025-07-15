import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenContainer from "../components/ui/ScreenContainer";
import { ScreenHeaderWithBack } from "../components/ui/ScreenHeaderWithBack";
import ThreatListItem from "../components/lists/ThreatListItem";
import { useNavigation } from "@react-navigation/native";

const API_KEY =
  "d170751e06865ed5b93775369e3ac9ad51ec09313179ef6d0483ef3ae8d9e700";
const PULSE_URL = "https://otx.alienvault.com/api/v1/pulses/subscribed";

const PAGE_LIMIT = 50;
const MAX_PAGES = 5;
const CACHE_KEY = "cachedThreats";
const CACHE_TIME_KEY = "cachedThreatsTime";
const SIX_HOURS = 6 * 60 * 60 * 1000;

const inferSeverityFromTags = (tags = []) => {
  const tagsLower = tags.map((t) => t.toLowerCase());
  if (tagsLower.includes("critical") || tagsLower.includes("zero-day"))
    return "Critical";
  if (tagsLower.includes("ransomware") || tagsLower.includes("phishing"))
    return "High";
  if (tagsLower.includes("malware") || tagsLower.includes("smishing"))
    return "Medium";
  return "Low";
};

const mapPulse = (pulse, index) => ({
  id: pulse.id || `${index}`,
  name: pulse.name,
  severity: inferSeverityFromTags(pulse.tags),
  source: pulse.author_name || "AlienVault OTX",
  time: pulse.modified,
  tags: pulse.tags || [],
  description: pulse.description || "No description provided.",
  indicators: (pulse.indicators || []).map((ind) => ({
    type: ind.type || "Unknown",
    indicator: ind.indicator || "N/A",
  })),
});

const LiveThreatsScreen = () => {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;

    const fetchThreats = async () => {
      try {
        const cachedTimeStr = await AsyncStorage.getItem(CACHE_TIME_KEY);
        const cachedDataStr = await AsyncStorage.getItem(CACHE_KEY);
        const now = Date.now();

        if (cachedTimeStr && cachedDataStr) {
          const cachedTime = parseInt(cachedTimeStr, 10);
          if (now - cachedTime < SIX_HOURS) {
            const cachedData = JSON.parse(cachedDataStr);
            if (isMounted) {
              setThreats(cachedData);
              setLoading(false);
            }
            return;
          }
        }

        const allPulses = [];
        let page = 1;

        while (page <= MAX_PAGES && allPulses.length < 100) {
          const res = await fetch(
            `${PULSE_URL}?limit=${PAGE_LIMIT}&page=${page}`,
            {
              headers: { "X-OTX-API-KEY": API_KEY },
            }
          );
          const json = await res.json();
          const mapped = json.results.map(mapPulse);
          allPulses.push(...mapped);
          page++;
        }

        const medium = allPulses
          .filter((t) => t.severity === "Medium")
          .slice(0, 2);
        const high = allPulses.filter((t) => t.severity === "High").slice(0, 2);
        const low = allPulses.filter((t) => t.severity === "Low").slice(0, 4);

        const selected = [...high, ...medium, ...low];
        const sorted = selected.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(sorted));
        await AsyncStorage.setItem(CACHE_TIME_KEY, now.toString());

        if (isMounted) setThreats(sorted);
      } catch (err) {
        console.error("Failed to fetch OTX data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchThreats();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <ScreenContainer>
        <ScreenHeaderWithBack title="Live Threats" navigation={navigation} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#8A63D2" />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Live Threats" navigation={navigation} />
      <FlatList
        data={threats}
        renderItem={({ item }) => (
          <ThreatListItem
            item={item}
            onPress={() =>
              navigation.navigate("ThreatDetail", { threat: item })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.flatListContent}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 12,
  },
  flatListContent: {
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
});

export default LiveThreatsScreen;
