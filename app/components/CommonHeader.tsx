import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

interface CommonHeaderProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  onSettingsPress?: () => void;
}

const CommonHeader = ({
  title = "",
  showBack = true,
  showSettings = true,
  onSettingsPress,
}: CommonHeaderProps): NativeStackNavigationOptions => {
  const router = useRouter();

  return {
    title: title,
    headerTitleAlign: "center" as const,
    headerLeft: showBack
      ? () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )
      : undefined,
    headerRight: showSettings
      ? () => (
          <TouchableOpacity
            onPress={onSettingsPress}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        )
      : undefined,
  };
};

export default CommonHeader;
