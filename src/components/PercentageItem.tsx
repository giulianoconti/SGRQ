import React, { memo } from "react";
import { StyleSheet, Text, View, type ViewStyle } from "react-native";
import { colors } from "../constants/theme";

interface PercentageItemProps {
  title?: string;
  percentage?: string | number;
}

export const PercentageItem = memo(function PercentageItem({
  title = "Síntomas",
  percentage = "100",
}: PercentageItemProps) {
  const pct = String(percentage);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.w70}>
        <View style={styles.percentageBg} />
        <View style={[styles.percentageFill, { width: (pct + "%") as ViewStyle["width"] }]} />
        <Text style={styles.text}>{pct}%</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    width: "30%",
  },
  w70: {
    width: "70%",
  },
  percentageBg: {
    backgroundColor: colors.gray,
    borderRadius: 6,
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  percentageFill: {
    backgroundColor: colors.progressBar,
    borderRadius: 6,
    height: "100%",
    position: "absolute",
  },
  text: {
    color: colors.black,
    fontSize: 16,
    textAlign: "center",
  },
});
