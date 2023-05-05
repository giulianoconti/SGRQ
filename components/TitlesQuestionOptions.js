import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, Text, View } from "react-native";

const handleSelect = (value, onSelect, setSelectedOption) => {
  setSelectedOption(value);
  onSelect(value);
};

export const TitlesQuestionOptions = ({ titles, question, options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(404);

  return (
    <>
      {/* render titles if they exist */}
      {titles && titles.length > 0 && (
        <View style={styles.containerPink}>
          {titles?.map((title, index) => (
            <Text
              key={index}
              style={styles.textInContainerPink}
            >
              {title}
            </Text>
          ))}
        </View>
      )}

      {/* render question and options */}
      <View style={[styles.containerBlue, { flexDirection: options.length > 2 ? "column" : "row" }]}>
        <Text style={[styles.textInContainerBlue, options.length <= 2 && { flex: 1 }]}>{question}</Text>
        {options.map((option, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleSelect(option.value, onSelect, setSelectedOption)}
          >
            <View style={styles.touchableContainer}>
              <Text style={[styles.touchableText, options.length > 2 && { flex: 1 }]}>{option.label}</Text>
              <View
                style={[
                  styles.touchableCircle,
                  { backgroundColor: selectedOption === option.value ? "rgb(200, 0, 150)" : "rgb(255, 255, 255)" },
                ]}
              >
                {selectedOption === option.value && <View style={styles.touchableInnerCircle} />}
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundPage: {
    backgroundColor: "rgb(40, 80, 125)",
  },
  containerBlue: {
    backgroundColor: "rgb(50, 110, 210)",
    borderRadius: 8,
    marginVertical: 8,
  },
  containerPink: {
    backgroundColor: "rgb(200, 0, 150)",
    borderRadius: 8,
    marginVertical: 8,
    padding: 8,
  },
  textInContainerBlue: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16,
    marginVertical: 4,
    padding: 8,
  },
  textInContainerPink: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  touchableContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  touchableText: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    marginRight: 4,
  },
  touchableInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgb(255, 255, 255)",
  },
  touchableCircle: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 24,
    justifyContent: "center",
    marginLeft: 0,
    width: 24,
  },
  row: {
    flexDirection: "row",
  },
});
