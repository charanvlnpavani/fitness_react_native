import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentsButton";

export default function IconPage({ post }: { post: any }) {
  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return Math.floor(count / 1000000) + "M"; // Remove decimal
    } else if (count >= 100000) {
      return Math.floor(count / 100000) + "00k"; // Remove decimal
    } else if (count >= 10000) {
      return Math.floor(count / 10000) + "0k"; // Remove decimal
    } else if (count >= 1000) {
      return Math.floor(count / 1000) + "k"; // Remove decimal
    } else if (count >= 100) {
      return Math.floor(count / 100) + "0"; // Remove decimal
    } else if (count >= 1) {
      return count.toString();
    } else {
      return "0";
    }
  };

  return (
    <View style={styles.interactionContainer}>
      <View style={styles.interactionItem}>
        <LikeButton
          initialLikes={post.likes || 0}
          renderLikes={(likes) => <Text> {formatCount(likes)}</Text>}
        />
      </View>
      <View style={styles.interactionItem}>
        <CommentButton
          initialComments={post.comments}
          renderComments={(comments) => (
            <Text>{formatCount(comments.length)}</Text>
          )}
          post={post}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  interactionContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 20,
  },
});
