import { View, Image, StyleSheet } from "react-native";
import React from "react";

const AvatarImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
};

export default AvatarImage;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  container: {
    padding: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});
