import React, { memo, useState, useCallback } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { colors } from "../constants/theme";
import type { Question } from "../types/questionnaire";

const UNANSWERED = 404;

interface TitlesQuestionOptionsProps {
  titles?: string[];
  question: string;
  options: Question["options"];
  onSelect: (value: number) => void;
}

export const TitlesQuestionOptions = memo(function TitlesQuestionOptions({
  titles,
  question,
  options,
  onSelect,
}: TitlesQuestionOptionsProps) {
  const [selectedOption, setSelectedOption] = useState(UNANSWERED);

  const handleSelect = useCallback(
    (value: number) => {
      setSelectedOption(value);
      onSelect(value);
    },
    [onSelect]
  );

  const isRow = options.length <= 2;

  return (
    <>
      {titles && titles.length > 0 && (
        <View style={styles.containerPink}>
          {titles.map((title, index) => (
            <Text key={index} style={styles.textInContainerPink}>
              {title}
            </Text>
          ))}
        </View>
      )}

      <View style={[styles.containerBlue, { flexDirection: isRow ? "row" : "column" }]}>
        <Text style={[styles.textInContainerBlue, isRow && { flex: 1 }]}>{question}</Text>
        {options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelect(option.value)}
            style={styles.touchableContainer}
          >
            <Text style={[styles.touchableText, !isRow && { flex: 1 }]}>{option.label}</Text>
            <View
              style={[
                styles.touchableCircle,
                {
                  backgroundColor: selectedOption === option.value ? colors.pink : colors.white,
                },
              ]}
            >
              {selectedOption === option.value && <View style={styles.touchableInnerCircle} />}
            </View>
          </Pressable>
        ))}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  containerBlue: {
    backgroundColor: colors.header,
    borderRadius: 8,
    marginVertical: 8,
  },
  containerPink: {
    backgroundColor: colors.pink,
    borderRadius: 8,
    marginVertical: 8,
    padding: 8,
  },
  textInContainerBlue: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 16,
    marginVertical: 4,
    padding: 8,
  },
  textInContainerPink: {
    color: colors.white,
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
    color: colors.white,
    fontSize: 16,
    marginRight: 4,
  },
  touchableInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
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
});
