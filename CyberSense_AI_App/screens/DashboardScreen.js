import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import ScreenContainer from "../components/ui/ScreenContainer";
import ScreenHeader from "../components/ui/ScreenHeader";
import StatCard from "../components/dashboard/StatCard";
import NavButton from "../components/dashboard/NavButton";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

import {
  Bell,
  ShieldWarning,
  Bug,
  Exam,
  BookOpenText,
  Siren,
} from "phosphor-react-native";

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [phishingScore, setPhishingScore] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const greetingName = user?.displayName
    ? user.displayName.split(" ")[0]
    : "User";

  useFocusEffect(
    useCallback(() => {
      if (!user) return;

      const fetchPhishingScore = async () => {
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "phishingAttempts")
        );
        let total = 0;
        let totalScore = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (typeof data.score === "number") {
            total++;
            totalScore += data.score;
          }
        });

        const maxPossible = total * 1;
        const scorePercent =
          maxPossible === 0
            ? 0
            : Math.round(((totalScore + total) / (2 * total)) * 100);
        setPhishingScore(`${scorePercent}%`);
      };

      const fetchQuizScore = async () => {
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "quizAttempts")
        );
        let total = 0;
        let correct = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (typeof data.score === "number") {
            total++;
            correct += Math.min(data.score, 1);
          }
        });
        setQuizScore(`${correct}/${total}`);
      };

      const fetchPasswordStrength = async () => {
        const metricsQuery = query(
          collection(db, "users", user.uid, "securityMetrics"),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const snapshot = await getDocs(metricsQuery);
        if (!snapshot.empty) {
          const latest = snapshot.docs[0].data();
          const strength = latest.strengthScore ?? null;
          setPasswordStrength(strength !== null ? `${strength}%` : "-");
        } else {
          setPasswordStrength("-");
        }
      };

      fetchPhishingScore();
      fetchQuizScore();
      fetchPasswordStrength();
    }, [user])
  );

  const stats = [
    {
      icon: "Fish",
      color: "#8A63D2",
      value: phishingScore ?? "-",
      label: "Phishing Score",
    },
    {
      icon: "Question",
      color: "#4A90E2",
      value: quizScore ?? "-",
      label: "Quizzes Passed",
    },
    {
      icon: "List",
      color: "#F2994A",
      value: "60%",
      label: "Courses Completed",
    },
    {
      icon: "Key",
      color: "#34C759",
      value: passwordStrength ?? "-",
      label: "Password Strength",
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={<Text>{`Hi, ${greetingName}!`}</Text>}
          subtitle={<Text>Welcome back, stay secure.</Text>}
          icon={<Bell color="#8D8D93" size={26} weight="bold" />}
        />

        <View style={styles.grid}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>

        <View style={styles.navSection}>
          <NavButton
            title="My Courses"
            icon={<BookOpenText color="#4A90E2" size={28} weight="bold" />}
            onPress={() => navigation.navigate("Lessons")}
          />
          <NavButton
            title="Take a Quiz"
            icon={<Exam color="#34C759" size={28} weight="bold" />}
            onPress={() =>
              navigation.navigate("QuizStack", { screen: "QuizList" })
            }
          />
          <NavButton
            title="Phishing Simulation"
            icon={<Bug color="#D73A49" size={28} weight="bold" />}
            onPress={() => navigation.navigate("Simulator")}
          />
          <NavButton
            title="Live Threats"
            icon={<ShieldWarning color="#F2994A" size={28} weight="bold" />}
            onPress={() => navigation.navigate("LiveThreats")}
          />
          <NavButton
            title="Report Cybersecurity Issues"
            icon={<Siren color="#F2994A" size={28} weight="bold" />}
            onPress={() => navigation.navigate("Report")}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  navSection: {
    marginTop: 24,
  },
});

export default DashboardScreen;
