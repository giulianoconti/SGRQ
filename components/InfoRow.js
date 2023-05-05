import { StyleSheet, Text, View } from "react-native";

export const InfoRow = ({ label = "", value, totalValue = "", percentage, extraStyles = {} }) => (
  <View style={styles.container}>
    <Text style={styles.text1}>{label}</Text>
    <View style={[styles.text2Container, { ...extraStyles }]}>
      <Text
        style={{
          color: "rgb(255, 255, 255)",
          textAlign: totalValue ? "right" : "center",
          width: totalValue ? 50 : 180,
        }}
      >
        {value}
      </Text>
      {totalValue && (
        <>
          <Text style={styles.text22}>de</Text>
          <Text style={styles.text23}>{totalValue}</Text>
        </>
      )}
    </View>
    <Text style={styles.text3}>{percentage && `${percentage}%`}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    width: "100%",
  },
  text1: { color: "rgb(255, 255, 255)", width: "30%" },
  text2Container: {
    color: "rgb(255, 255, 255)",
    textAlign: "center",
    width: 180,
    flexDirection: "row",
    justifyContent: "center",
  },
  text22: {
    color: "rgb(255, 255, 255)",
    textAlign: "center",
    width: 30,
  },
  text23: {
    color: "rgb(255, 255, 255)",
    textAlign: "left",
    width: 50,
  },
  text3: {
    color: "rgb(255, 255, 255)",
    textAlign: "right",
    width: 50,
  },
});
