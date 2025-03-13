import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { initialComments as defaultComments } from "../../dataset/comments";

interface Comment {
  id: string;
  text: string;
  user?: {
    avatar: string;
    name: string;
    premium?: boolean;
    premiumLogo?: string;
  };
}

interface CommentButtonProps {
  initialComments?: Comment[];
  renderComments?: (comments: Comment[]) => React.ReactNode;
  post?: {
    title: string;
    author: string;
    authorAvatar: string;
    premium: boolean;
  };
}

const CommentButton: React.FC<CommentButtonProps> = ({
  initialComments = defaultComments,
  renderComments,
  post,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const MAX_CHARS = 280;

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setNewComment("");
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: String(Date.now()),
          text: newComment.trim(),
          user: {
            name: post?.author || "",
            avatar: post?.authorAvatar || "",
            image: post?.authorAvatar || "",
          },
        },
      ]);
      setNewComment("");
    }
  };

  const renderCommentItem = ({ item }: { item: Comment }) => {
    const isCurrentUser = item.user?.name === post?.author;
    const isPremiumUser = item.user?.premium;

    const getCommentStyle = () => {
      if (isCurrentUser) {
        return isPremiumUser
          ? styles.premiumAuthorComment
          : styles.authorComment;
      }
      return isPremiumUser
        ? styles.premiumUserComment
        : styles.otherUserComment;
    };

    return (
      <View style={[styles.commentItem, getCommentStyle()]}>
        <View style={styles.commentHeader}>
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: item.user?.avatar }}
              style={styles.authorAvatar}
            />
            <Text style={styles.commentAuthor}>{item.user?.name}</Text>
            {isPremiumUser && (
              <View style={styles.premiumBadge}>
                <MaterialCommunityIcons
                  name="check-bold"
                  size={12}
                  color="#FFF"
                />
              </View>
            )}
          </View>
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.commentButton} onPress={handleOpenModal}>
        <View style={styles.iconContainer}>
          <Icon name="comment" size={24} color="#555" />
          {renderComments ? (
            renderComments(comments)
          ) : (
            <Text style={styles.commentCount}>
              {formatCount(comments?.length || 0)}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.popupComment}>Comments</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Icon name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            <View style={styles.commentListContainer}>
              <FlatList
                data={comments || []}
                renderItem={renderCommentItem}
                keyExtractor={(item) => `comment-${item.id}`}
                style={styles.commentList}
                ListEmptyComponent={
                  <View style={styles.emptyCommentList}>
                    <FontAwesome name="comment" size={24} color="#555" />
                    <Text style={styles.emptyCommentText}>
                      No comments yet. Be the first to add one!
                    </Text>
                  </View>
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={
                    post?.title
                      ? `Add a comment to ${post.author}`
                      : "Add a comment..."
                  }
                  value={newComment}
                  onChangeText={(text) => {
                    if (text.length <= MAX_CHARS) {
                      setNewComment(text);
                    }
                  }}
                  maxLength={MAX_CHARS}
                  multiline
                />
                <Text style={styles.charCount}>
                  {MAX_CHARS - newComment.length}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddComment}
              >
                <MaterialCommunityIcons
                  name="send-circle"
                  size={40}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  commentButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%", // Or any desired width
    maxHeight: "80%", // Add this to prevent content overflow
    height: 600, // Fixed height (adjust as needed)
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  popupComment: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    paddingBottom: 10,
  },
  commentList: {
    flexGrow: 1,
    borderTopColor: "#ccc",
    marginTop: 0,
  },
  commentItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
  },
  authorComment: {
    backgroundColor: "#f8f8f8",
  },
  premiumAuthorComment: {
    backgroundColor: "#fff7e6",
  },
  premiumUserComment: {
    backgroundColor: "#fff7e6",
  },
  otherUserComment: {
    backgroundColor: "#e3f2fd",
  },
  commentHeader: {
    flexDirection: "column",
    gap: 4,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    marginRight: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    maxHeight: 100,
  },
  charCount: {
    position: "absolute",
    right: 5,
    bottom: 5,
    fontSize: 12,
    color: "#666",
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  commentCount: {
    marginLeft: 5,
    fontSize: 14,
    color: "#555",
  },
  commentListContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 10,
    flex: 1,
  },
  emptyCommentList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyCommentText: {
    marginTop: 10,
    color: "#555",
    fontSize: 14,
  },
  premiumBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
});

export default CommentButton;
