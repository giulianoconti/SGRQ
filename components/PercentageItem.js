import { StyleSheet, Text, View } from "react-native";

export const PercentageItem = ({ title = "Síntomas", percentage = 100 }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.w_70}>
      <View style={styles.percentageBg} />
      <View style={[styles.percentageFill, { width: `${percentage}%` }]} />
      <Text style={styles.text}>{percentage}%</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    width: "30%",
  },
  w_70: {
    width: "70%",
  },
  percentageBg: {
    backgroundColor: "rgb(200, 200, 200)",
    borderRadius: 6,
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  percentageFill: {
    backgroundColor: "rgb(55, 155, 200)",
    borderRadius: 6,
    height: "100%",
    position: "absolute",
  },
  text: {
    color: "rgb(0, 0, 0)",
    fontSize: 16,
    textAlign: "center",
  },
});
