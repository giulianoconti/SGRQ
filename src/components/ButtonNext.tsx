import React, { memo } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { colors } from "../constants/theme";

interface ButtonNextProps {
  onPress: () => void;
}

export const ButtonNext = memo(function ButtonNext({ onPress }: ButtonNextProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>
        Siguiente <Fontisto name="arrow-right-l" size={16} color={colors.white} />
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderRadius: 8,
    padding: 8,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
