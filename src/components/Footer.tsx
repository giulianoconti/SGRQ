import React, { memo } from "react";
import { View, Text, StyleSheet, Pressable, Linking, Platform } from "react-native";
import { colors } from "../constants/theme";

const LINKEDIN_URL = "https://www.linkedin.com/in/giulianoconti/";

function openLinkedIn(): void {
  if (Platform.OS === "ios") {
    Linking.openURL("linkedin://profile/giulianoconti").catch(() => Linking.openURL(LINKEDIN_URL));
  } else if (Platform.OS === "android") {
    const intent =
      "intent://www.linkedin.com/in/giulianoconti#Intent;scheme=https;package=com.linkedin.android;S.browser_fallback_url=" +
      encodeURIComponent(LINKEDIN_URL) +
      ";end";
    Linking.openURL(intent).catch(() => Linking.openURL(LINKEDIN_URL));
  } else {
    Linking.openURL(LINKEDIN_URL);
  }
}

export const Footer = memo(function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Desarrollado por </Text>
        <Pressable onPress={openLinkedIn}>
          <Text style={[styles.text, styles.link]}>Giuliano Conti</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 8,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  text: {
    color: colors.white,
    fontSize: 12,
  },
  link: {
    textDecorationLine: "underline",
  },
});
