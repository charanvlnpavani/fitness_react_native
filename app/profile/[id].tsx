import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AvatarImage from "../components/AvatarImage";
import { communityData } from "../../dataset/communityData";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();

  // Find the user data from communityData
  const userData = communityData.find((post) => post.authorId === id);

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <View style={styles.profileHeader}>
            <AvatarImage imageUrl={userData.authorAvatar} />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{userData.author}</Text>
              {userData.premium && (
                <MaterialIcons
                  name="workspace-premium"
                  size={24}
                  color="#da9100"
                />
              )}
            </View>
            <View style={styles.profileHeader}>
              <Text style={styles.profileText}>Profile ID: {id}</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.text}>Profile not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: "center",
    gap: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  profileText: {
    fontSize: 12,
    color: "#333",
  },
});
