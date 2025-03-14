import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import DetailsAdd from "./detailsAdd";

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <DetailsAdd />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
