import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentsButton";
import FollowPage from "./FollowPage";
import CarouselPage from "./CarouselImagePage";
import CommentLikeSection from "./CommentLikeSection";

interface Media {
  id: string;
  url: string;
  type: string;
}

interface Comment {
  id: string;
  text: string;
  user: {
    name: string;
    avatar: string;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  createdAt: string;
  premium: boolean;
  updatedAt: string;
  likes: number;
  comments: Comment[];
  media: Media[];
}

interface PostsProps {
  posts: Post[];
}

function Posts({ posts }: PostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <View style={styles.postHeader}>
            <FollowPage
              image={post.authorAvatar}
              title={post.author}
              premium={post.premium}
              authorId={post.authorId}
            />
          </View>

          {post.media && post.media.length > 0 && (
            <View style={styles.mediaContainer}>
              <CarouselPage data={post.media} />
            </View>
          )}

          <View style={styles.contentContainer}>
            <CommentLikeSection likedBy={post.author} comment={post.content} />
          </View>

          <View style={styles.interactionContainer}>
            <View style={styles.interactionItem}>
              <LikeButton initialLikes={post.likes || 0} />
            </View>
            <View style={styles.interactionItem}>
              <CommentButton initialComments={post.comments} post={post} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  postContainer: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  mediaContainer: {
    marginHorizontal: -15,
    marginVertical: 10,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  contentContainer: {
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  interactionContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
  },
  interactionItem: {
    marginRight: 24,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Posts;
