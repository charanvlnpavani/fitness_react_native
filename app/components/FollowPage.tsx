import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AvatarImage from "./AvatarImage";
import { useRouter } from "expo-router";

interface FollowPageProps {
  image: string;
  title: string;
  onFollowPress?: () => void;
  premium?: boolean;
  follow?: boolean;
  authorId?: string;
}

const FollowPage = ({
  image,
  title,
  premium = false,
  authorId,
}: FollowPageProps) => {
  const router = useRouter();

  const handleProfilePress = () => {
    if (authorId) {
      router.push({
        pathname: "/profile/[id]",
        params: { id: authorId },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileSection}
        onPress={handleProfilePress}
      >
        <AvatarImage imageUrl={image} />
        <Text style={styles.title}>
          {title}{" "}
          {premium && (
            <MaterialIcons name="workspace-premium" size={24} color="#da9100" />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    color: "#000",
    fontSize: 16,
  },
  followButton: {
    backgroundColor: "#0278AE",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  followingButton: {
    backgroundColor: "#E8E8E8",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  followingButtonText: {
    color: "#666",
  },
  moreButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  moreButtonText: {
    color: "#000",
    fontSize: 18,
  },
});

export default FollowPage;
