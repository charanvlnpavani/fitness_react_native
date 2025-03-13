import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

interface LikeButtonProps {
  initialLikes?: number;
  renderLikes?: (likes: number) => React.ReactNode;
}

const formatLikeCount = (count: number): string => {
  if (count < 1000) return count.toString();
  if (count < 1000000)
    return `${(count / 1000).toFixed(count < 10000 ? 1 : 0)}k`;
  return `${(count / 1000000).toFixed(count < 10000000 ? 1 : 0)}M`;
};

const LikeButton = ({ initialLikes = 0, renderLikes }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    if (newLikedState) {
      setLikes(likes + 1);
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setLikes(likes - 1);
    }
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLike}>
      <Animated.View style={animatedStyle}>
        <Icon
          name={isLiked ? "heart" : "hearto"}
          size={18}
          color={isLiked ? "red" : "black"}
        />
      </Animated.View>
      {renderLikes ? (
        renderLikes(likes)
      ) : (
        <Text style={styles.likeCount}>{formatLikeCount(likes)}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 5,
  },
});

export default LikeButton;
