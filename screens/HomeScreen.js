import { View, Text, SafeAreaView } from "react-native";
import { Footer } from "../components/Footer";
import { ButtonSimple } from "../components/ButtonSimple";

const HomeScreen = ({ navigation }) => (
  <SafeAreaView style={{ backgroundColor: "rgb(40, 80, 125)", flex: 1 }}>
    <View style={{ backgroundColor: "rgb(50, 110, 210)", paddingVertical: 48, paddingHorizontal: 16 }}>
      <Text style={{ color: "rgb(255, 255, 255)", fontSize: 36, textAlign: "center" }}>CUESTIONARIO RESPIRATORIO DE SAINT GEORGE</Text>
    </View>
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{ color: "rgb(255, 255, 255)", fontSize: 20, textAlign: "center", marginVertical: 48 }}>
        CUESTIONARIO SOBRE CALIDAD DE VIDA DIRIGIDO A PACIENTES CON ENFERMEDAD RESPIRATORIA CRÓNICA
      </Text>

      <ButtonSimple
        onPress={() =>
          navigation.navigate("Questionnaire", { SECTIONArrayNumber: 0, selectedAnswers: [404, 404, 404, 404, 404, 404, 404, 404] })
        }
        text="Empezar Cuestionario"
      />
      <ButtonSimple
        onPress={() => navigation.navigate("Result")}
        text="Resultados"
      />
    </View>
    <Footer />
  </SafeAreaView>
);

export default HomeScreen;
