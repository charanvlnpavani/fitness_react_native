import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsAdd() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSettings = () => {
    // Handle settings menu
    console.log("Settings pressed");
  };

  const handleSubmit = () => {
    // Here you would typically handle the form submission to your backend
    setShowSuccess(true);
    // Auto-hide the success message and navigate after 1.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      router.push("/profile");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={showSuccess} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.successPopup}>
            <Text style={styles.successText}>Successfully added!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  successPopup: {
    backgroundColor: "#90EE90",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successText: {
    color: "#006400",
    fontSize: 16,
    fontWeight: "bold",
  },
});
