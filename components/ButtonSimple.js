import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export const ButtonSimple = ({ onPress, text }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(0, 150, 0)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderRadius: 8,
    padding: 8,
  },
  text: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    textAlign: "center",
  },
});
