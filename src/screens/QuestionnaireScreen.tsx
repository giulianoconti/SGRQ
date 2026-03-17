import React, { useState, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  FlatList,
  Alert,
  TextInput,
  Text,
  Animated,
  View,
  StyleSheet,
  Platform,
  ListRenderItemInfo,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TitlesQuestionOptions } from "../components/TitlesQuestionOptions";
import { ButtonNext } from "../components/ButtonNext";
import { ButtonSimple } from "../components/ButtonSimple";
import { SECTIONS } from "../constants/questionnaireData";
import { colors, SCORE_TOTALS, UNANSWERED_VALUE } from "../constants/theme";
import type { QuestionnaireScreenProps } from "../types/navigation";
import type { Question } from "../types/questionnaire";
import type { StoredResult } from "../types/result";

const STORAGE_KEY = "results";

function sumArray(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

const isIOS = Platform.OS === "ios";

export default function QuestionnaireScreen({ navigation, route }: QuestionnaireScreenProps) {
  const { SECTIONArrayNumber, selectedAnswers } = route.params;
  const section = SECTIONS[SECTIONArrayNumber];
  const isTheLastSection = SECTIONArrayNumber === SECTIONS.length - 1;

  const [answers, setAnswers] = useState<number[]>(
    selectedAnswers?.length === section.questions.length
      ? [...selectedAnswers]
      : Array(section.questions.length).fill(UNANSWERED_VALUE)
  );
  const [fullNameAndId, setFullNameAndId] = useState("");
  const [position] = useState(() => new Animated.Value(0));

  const handleSelect = useCallback((questionId: number, value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionId - 1] = value;
      return next;
    });
  }, []);

  const animatePositionFocus = useCallback(() => {
    Animated.timing(position, {
      toValue: -320,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [position]);

  const animatePositionBlur = useCallback(() => {
    Animated.timing(position, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [position]);

  const handleNextSection = useCallback(async () => {
    if (answers.includes(UNANSWERED_VALUE)) {
      Alert.alert("Tienes que responder todas las preguntas para continuar");
      return;
    }

    if (isTheLastSection) {
      if (fullNameAndId.length <= 6) {
        Alert.alert("Tienes que introducir tu nombre, apellido y DNI para continuar");
        return;
      }

      const sintomas = sumArray(answers.slice(0, 8));
      const actividades = sumArray([...answers.slice(10, 17), ...answers.slice(35, 44)]);
      const impacto = sumArray([
        ...answers.slice(8, 10),
        ...answers.slice(17, 35),
        ...answers.slice(44, 50),
      ]);
      const total = sumArray(answers);

      const data: StoredResult = {
        fullNameAndId,
        QuestionnaireDate: new Date().toLocaleDateString(),
        sintomas,
        sintomasPercentage: (sintomas * 100) / SCORE_TOTALS.sintomas,
        actividades,
        actividadesPercentage: (actividades * 100) / SCORE_TOTALS.actividades,
        impacto,
        impactoPercentage: (impacto * 100) / SCORE_TOTALS.impacto,
        total,
        totalPercentage: (total * 100) / SCORE_TOTALS.total,
      };

      try {
        const value = await AsyncStorage.getItem(STORAGE_KEY);
        const results: StoredResult[] = value ? JSON.parse(value) : [];
        results.unshift(data);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results));
        navigation.navigate("Home");
      } catch {
        Alert.alert("Error al guardar los resultados");
      }
      return;
    }

    const nextSectionQuestions = Array(SECTIONS[SECTIONArrayNumber + 1].questions.length).fill(
      UNANSWERED_VALUE
    );
    navigation.push("Questionnaire", {
      SECTIONArrayNumber: SECTIONArrayNumber + 1,
      selectedAnswers: [...answers, ...nextSectionQuestions],
    });
  }, [answers, fullNameAndId, isTheLastSection, SECTIONArrayNumber, navigation]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Question>) => (
      <TitlesQuestionOptions
        key={item.id}
        titles={item.titles}
        question={item.question}
        options={item.options}
        onSelect={(value) => handleSelect(item.id, value)}
      />
    ),
    [handleSelect]
  );

  const keyExtractor = useCallback((item: Question) => String(item.id), []);

  const listFooter = useMemo(() => {
    if (isTheLastSection) {
      return (
        <>
          <View style={styles.containerPink}>
            <TextInput
              multiline
              numberOfLines={undefined}
              onBlur={animatePositionBlur}
              onChangeText={setFullNameAndId}
              onFocus={animatePositionFocus}
              placeholder="Escriba su nombre, apellido y DNI."
              placeholderTextColor={colors.grayMedium}
              style={styles.input}
              value={fullNameAndId}
            />
          </View>
          <View style={styles.containerPink}>
            <TextInput
              multiline
              numberOfLines={undefined}
              onBlur={animatePositionBlur}
              onChangeText={setFullNameAndId}
              onFocus={animatePositionFocus}
              placeholder="Escriba su nombre, apellido y DNI."
              placeholderTextColor={colors.grayMedium}
              style={styles.input}
              value={fullNameAndId}
            />
          </View>
          <ButtonSimple onPress={handleNextSection} text="Terminar" />
        </>
      );
    }
    return <ButtonNext onPress={handleNextSection} />;
  }, [
    isTheLastSection,
    fullNameAndId,
    animatePositionBlur,
    animatePositionFocus,
    handleNextSection,
  ]);

  return (
    <SafeAreaView style={styles.backgroundPage}>
      <Animated.View
        style={isIOS ? { transform: [{ translateY: position }] } : undefined}
      >
        <FlatList
          contentContainerStyle={styles.listContent}
          data={section.questions}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListFooterComponent={listFooter}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundPage: {
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  containerPink: {
    backgroundColor: colors.pink,
    borderRadius: 8,
    marginVertical: 8,
    padding: 8,
  },
  textInContainerPink: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: colors.white,
    color: colors.black,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    minHeight: 88,
    textAlignVertical: "top",
  },
});
