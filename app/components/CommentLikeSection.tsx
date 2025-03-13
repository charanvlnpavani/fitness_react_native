import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CommentLikeSection = ({
  likedBy,
  comment,
}: {
  likedBy: string;
  comment: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getFirstWords = (text: string, limit: number) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>
        <Text style={styles.username}>{likedBy} </Text>{" "}
        {isExpanded ? comment : getFirstWords(comment, 10)}
        {comment.split(" ").length > 10 && !isExpanded && (
          <TouchableOpacity onPress={handleToggleExpand}>
            <Text style={styles.moreText}>... more</Text>
          </TouchableOpacity>
        )}
        {comment.split(" ").length > 10 && isExpanded && (
          <TouchableOpacity onPress={handleToggleExpand}>
            <Text style={styles.lessText}> less</Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentText: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
    lineHeight: 25,

  },
  username: {
    fontWeight: "bold",
  },
  moreText: {
    color: "gray",
  },
  lessText: {
    color: "gray",
  },
});

export default CommentLikeSection;
