import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export const ButtonNext = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.text}>
        Siguiente{" "}
        <Fontisto
          name="arrow-right-l"
          size={16}
          color="rgb(255, 255, 255)"
        />
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(0, 150, 0)",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    borderRadius: 8,
    padding: 8,
  },
  text: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
