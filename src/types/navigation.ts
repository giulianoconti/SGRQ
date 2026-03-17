import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Questionnaire: {
    SECTIONArrayNumber: number;
    selectedAnswers: number[];
  };
  Result: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type QuestionnaireScreenProps = NativeStackScreenProps<RootStackParamList, "Questionnaire">;
export type ResultScreenProps = NativeStackScreenProps<RootStackParamList, "Result">;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
