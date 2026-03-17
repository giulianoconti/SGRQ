import React, { memo } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Footer } from "../components/Footer";
import { ButtonSimple } from "../components/ButtonSimple";
import { colors, UNANSWERED_VALUE } from "../constants/theme";
import { SECTIONS } from "../constants/questionnaireData";
import type { HomeScreenProps } from "../types/navigation";

const initialAnswers = Array(SECTIONS[0].questions.length).fill(UNANSWERED_VALUE);

export default memo(function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={styles.title}>CUESTIONARIO RESPIRATORIO DE SAINT GEORGE</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          CUESTIONARIO SOBRE CALIDAD DE VIDA DIRIGIDO A PACIENTES CON ENFERMEDAD RESPIRATORIA
          CRÓNICA
        </Text>

        <ButtonSimple
          onPress={() =>
            navigation.navigate("Questionnaire", {
              SECTIONArrayNumber: 0,
              selectedAnswers: initialAnswers,
            })
          }
          text="Empezar Cuestionario"
        />
        <ButtonSimple onPress={() => navigation.navigate("Result")} text="Resultados" />
      </View>
      <Footer />
    </SafeAreaView>
  );
});

const styles = {
  container: { flex: 1 },
  header: {
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.white,
    fontSize: 36,
    textAlign: "center" as const,
  },
  content: {
    paddingHorizontal: 16,
  },
  subtitle: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center" as const,
    marginVertical: 48,
  },
};
