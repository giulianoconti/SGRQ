import React, { memo } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../constants/theme";

interface InfoRowProps {
  label?: string;
  value: string | number;
  totalValue?: string;
  percentage?: string;
  extraStyles?: ViewStyle;
}

export const InfoRow = memo(function InfoRow({
  label = "",
  value,
  totalValue = "",
  percentage,
  extraStyles = {},
}: InfoRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{label}</Text>
      <View style={[styles.text2Container, extraStyles]}>
        <Text
          style={[
            styles.value,
            { textAlign: totalValue ? "right" : "center", width: totalValue ? 50 : 180 },
          ]}
        >
          {value}
        </Text>
        {totalValue ? (
          <>
            <Text style={styles.text22}>de</Text>
            <Text style={styles.text23}>{totalValue}</Text>
          </>
        ) : null}
      </View>
      <Text style={styles.text3}>{percentage ? `${percentage}%` : ""}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    width: "100%",
  },
  text1: {
    color: colors.white,
    width: "30%",
  },
  text2Container: {
    color: colors.white,
    textAlign: "center",
    width: 180,
    flexDirection: "row",
    justifyContent: "center",
  },
  value: {
    color: colors.white,
  },
  text22: {
    color: colors.white,
    textAlign: "center",
    width: 30,
  },
  text23: {
    color: colors.white,
    textAlign: "left",
    width: 50,
  },
  text3: {
    color: colors.white,
    textAlign: "right",
    width: 50,
  },
});
