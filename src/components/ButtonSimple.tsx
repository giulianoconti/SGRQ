import React, { memo } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { colors } from "../constants/theme";

interface ButtonSimpleProps {
  onPress: () => void;
  text: string;
}

export const ButtonSimple = memo(function ButtonSimple({ onPress, text }: ButtonSimpleProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderRadius: 8,
    padding: 8,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
  },
});
