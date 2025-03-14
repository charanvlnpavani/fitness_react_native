import React from "react";
import { Stack } from "expo-router";
import { View } from "react-native";
import AddButton from "../components/AddButton";
import CommonHeader from "../components/CommonHeader";

export default function ProfileLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="[id]"
          options={CommonHeader({
            title: "Profile",
            onSettingsPress: () => {
              // Handle settings press
            },
          })}
        />
      </Stack>
      <AddButton />
    </View>
  );
}
