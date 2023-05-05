import { View, Text, StyleSheet } from "react-native";

export const Footer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Desarrollado por Giuliano Conti</Text>
    <Text style={styles.text}>giuliconti1@gmail.com</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 8,
  },
  text: {
    color: "rgb(255, 255, 255)",
    fontSize: 12,
    textAlign: "center",
  },
});
