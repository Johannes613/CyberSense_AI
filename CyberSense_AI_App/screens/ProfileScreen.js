import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import ScreenContainer from "../components/ui/ScreenContainer";
import ScreenHeader from "../components/ui/ScreenHeader";
import { useAuth } from "../contexts/AuthContext";
import {
  UserCircle,
  Key,
  CaretRight,
  SignOut,
} from "phosphor-react-native";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const settings = [
    { icon: UserCircle, text: "Edit Profile", screen: "EditProfile" },
    { icon: Key, text: "Change Password", screen: "ChangePassword" },
  ];

  const displayName = user?.displayName || "CyberSense User";
  const email = user?.email || "No email provided";
  const initial = displayName.charAt(0).toUpperCase();

  const handlePress = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    } else {
      Alert.alert("Feature Coming Soon", "This feature is currently under development.");
    }
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Profile" />

        <View style={profileStyles.profileHeader}>
          {user?.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={profileStyles.profilePic}
            />
          ) : (
            <View style={profileStyles.initialCircle}>
              <Text style={profileStyles.initialText}>{initial}</Text>
            </View>
          )}
          <Text style={profileStyles.name}>{displayName}</Text>
          <Text style={profileStyles.email}>{email}</Text>
        </View>

        <Text style={profileStyles.sectionTitle}>Account Settings</Text>
        <View style={profileStyles.settingsContainer}>
          {settings.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={profileStyles.settingItem}
              onPress={() => handlePress(item.screen)}
            >
              <View style={profileStyles.settingItemLeft}>
                <item.icon color="#8A63D2" size={24} weight="bold" />
                <Text style={profileStyles.settingText}>{item.text}</Text>
              </View>
              <CaretRight color="#8D8D93" size={20} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={profileStyles.logoutButton} onPress={logout}>
          <SignOut color="#D73A49" size={24} weight="bold" />
          <Text style={profileStyles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

const profileStyles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#8A63D2",
    marginBottom: 16,
  },
  initialCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#8A63D2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "rgba(138, 99, 210, 0.5)",
  },
  initialText: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "bold",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  email: {
    fontSize: 16,
    color: "#8D8D93",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  settingsContainer: {
    backgroundColor: "#1C1C22",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2D2D33",
    marginHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2D2D33",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 40,
    padding: 16,
  },
  logoutText: {
    color: "#D73A49",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
