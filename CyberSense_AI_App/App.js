import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./contexts/AuthContext";

const AppLogo = ({ size = 120 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Defs>
      <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#8A63D2" />
        <Stop offset="100%" stopColor="#4A90E2" />
      </LinearGradient>
    </Defs>
    <Path
      d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12c4.16-1.26 8-6.45 8-12V5l-8-3zm0 2.08L18 6.22v4.78c0 4.2-2.93 8.3-6 9.87c-3.07-1.57-6-5.67-6-9.87V6.22L12 4.08zM12 12.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 5.5 12 5.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
      fill="url(#grad)"
    />
  </Svg>
);

const SplashScreen = () => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.View
        style={{ opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}
      >
        <AppLogo />
      </Animated.View>
      <Animated.View style={{ opacity: opacityAnim }}>
        <Text style={styles.logoText}>CyberSense AI</Text>
        <Text style={styles.tagline}>Your Digital Guardian</Text>
      </Animated.View>
    </View>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        {isLoading ? <SplashScreen /> : <RootNavigator />}
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101014",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
  },
  tagline: {
    color: "#8D8D93",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
});
