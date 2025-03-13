import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TimestampProps {
  time: Date;
}

const Timestamp = ({ time }: TimestampProps) => {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const timeAgoString = getTimeAgo(time);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{timeAgoString}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  timeText: {
    fontSize: 12,
    color: "gray", 
  },
});

export default Timestamp;
