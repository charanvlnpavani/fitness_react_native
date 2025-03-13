import { View, StyleSheet, SafeAreaView } from "react-native";
import Posts from "../components/Posts";
import { communityData } from "@/dataset/communityData";

export default function CommunityScreen() {
  const postsWithTimestamp = communityData.map((post) => ({
    ...post,
    timestamp: new Date(post.createdAt),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Posts posts={postsWithTimestamp} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0a7ea4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
