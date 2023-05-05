import React, { useState } from "react";
import { SafeAreaView, FlatList, Alert, TextInput, Text, Animated, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TitlesQuestionOptions } from "../components/TitlesQuestionOptions";
import { ButtonNext } from "../components/ButtonNext";
import { ButtonSimple } from "../components/ButtonSimple";

// síntomas = parte 1      // impacto = parte 2 - sección 2-6      // actividades = parte 2 - sección 3-4-5-7-terminando

const SECTIONS = [
  // parte 1 (síntomas)
  {
    id: 1,
    title: "Parte 1",
    questions: [
      {
        id: 1,
        titles: [
          "PARTE 1",
          "A continuación, algunas preguntas para saber cuántos problemas respiratorios ha tenido durante el último año.",
          "Por favor marque una sola respuesta en cada pregunta.",
        ],
        question: "Durante el último año, he tenido tos",
        options: [
          { value: 80.6, label: "Casi todos los días de la semana" },
          { value: 63.2, label: "Varios días a la semana" },
          { value: 29.3, label: "Unos pocos días al mes" },
          { value: 28.1, label: "Solo cuando tuve una infección respiratoria" },
          { value: 0, label: "Nunca" },
        ],
      },
      {
        id: 2,
        question: "Durante el último año, he tenido expectoración (catarro o flema) ...",
        options: [
          { value: 76.8, label: "Casi todos los días de la semana" },
          { value: 60, label: "Varios días a la semana" },
          { value: 34, label: "Unos pocos días al mes" },
          { value: 30.2, label: "Solo cuando tuve una infección respiratoria" },
          { value: 0, label: "Nunca" },
        ],
      },
      {
        id: 3,
        question: "Durante el último año, he tenido falta de aire o fatiga...",
        options: [
          { value: 87.2, label: "Casi todos los días de la semana" },
          { value: 71.4, label: "Varios días a la semana" },
          { value: 43.7, label: "Unos pocos días al mes" },
          { value: 35.7, label: "Solo cuando tuve una infección respiratoria" },
          { value: 0, label: "Nunca" },
        ],
      },
      {
        id: 4,
        question: "Durante el último año, he tenido ataques de silbidos en los pulmones...",
        options: [
          { value: 86.2, label: "Casi todos los días de la semana" },
          { value: 71, label: "Varios días a la semana" },
          { value: 45.6, label: "Unos pocos días al mes" },
          { value: 36.4, label: "Solo cuando tuve una infección respiratoria" },
          { value: 0, label: "Nunca" },
        ],
      },
      {
        id: 5,
        question: "Durante el último año, cuántos ataques tuvo por problemas respiratorios que fueran graves o muy desagradables?...",
        options: [
          { value: 86.7, label: "Más de 3 ataques" },
          { value: 73.5, label: "3 ataques" },
          { value: 60.3, label: "2 ataques" },
          { value: 44.2, label: "1 ataque" },
          { value: 0, label: "Ningún ataque" },
        ],
      },
      {
        id: 6,
        question: "Cuánto le duró el peor ataque que tuvo por problemas respiratorios?",
        options: [
          { value: 89.7, label: "Una semana o mas" },
          { value: 73.5, label: "De 3 a 6 días" },
          { value: 58.8, label: "De 1 a 2 días" },
          { value: 41.9, label: "Menos de 1 día" },
          { value: 0, label: "Ninguno" },
        ],
      },
      {
        id: 7,
        question: "Durante el último año, cuántos días buenos (con pocos problemas respiratorios) tuvo en una semana habitual?",
        options: [
          { value: 93.3, label: "Ninguno" },
          { value: 76.6, label: "1 o 2 días" },
          { value: 61.5, label: "3 o 4 días" },
          { value: 15.4, label: "Casi todos los días" },
          { value: 0, label: "Todos los días" },
        ],
      },
      {
        id: 8,
        question: "Si tiene silbidos en el pecho, son peor por la mañana?",
        options: [
          { value: 0, label: "No" },
          { value: 62, label: "Si" },
        ],
      },
    ],
  },
  // parte 2 - sección 1(impacto)-2(actividades)-3(impact)-4(impact)
  {
    id: 2,
    title: "Parte 2 - Sección 1-2-3-4",
    questions: [
      // section 1
      {
        id: 9,
        titles: ["Parte 2 - Sección 1"],
        question: "Cómo diría usted que está de los pulmones? Por favor, marque una sola de las siguientes frases:",
        options: [
          { value: 83.2, label: "Es el problema más importante que tengo" },
          { value: 82.5, label: "Me causa bastantes problemas" },
          { value: 34.5, label: "Me causa algunos problemas" },
          { value: 0, label: "No me causa problemas" },
        ],
      },
      {
        id: 10,
        question: "Si ha tenido algún trabajo remunerado, por favor marque una sola de las siguientes frases:",
        options: [
          {
            value: 88.9,
            label: "Mis problemas respiratorios me obligaron a dejar de trabajar",
          },
          {
            value: 77.6,
            label: "Mis problemas respiratorios me dificultan en mi trabajo o me obligaron a cambiar de trabajo",
          },
          {
            value: 0,
            label: "Mis problemas respiratorios no me afectan (o no me afectaron) en ningún trabajo",
          },
        ],
      },
      // section 2
      {
        id: 11,
        titles: [
          "PARTE 2 - SECCIÓN 2",
          "A continuación, algunas preguntas sobre otras actividades que normalmente le pueden hacer sentir que le falta la respiración.",
          "Por favor, marque todas las respuestas que correspondan a cómo usted está actualmente: ",
        ],
        question: "Me falta el aire estando sentado o incluso acostado y quieto",
        options: [
          { value: 90.6, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 12,
        question: "Me falta el aire cuando me lavo los dientes o cuando me visto",
        options: [
          { value: 82.8, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 13,
        question: "Me falta el aire al caminar dentro de mi casa",
        options: [
          { value: 80.2, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 14,
        question: "Me falta el aire al caminar fuera de mi casa, en terreno llano",
        options: [
          { value: 81.4, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 15,
        question: "Me falta el aire al subir un piso por escalera",
        options: [
          { value: 76.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 16,
        question: "Me falta el aire al subir una cuesta",
        options: [
          { value: 75.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 17,
        question: "Me falta el aire al jugar o hacer algún deporte",
        options: [
          { value: 72.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      // section 3
      {
        id: 18,
        titles: [
          "PARTE 2 - SECCIÓN 3",
          "Algunas preguntas más sobre la tos y la falta de respiración.",
          "Por favor, marque todas las respuestas que correspondan a como está usted actualmente: ",
        ],
        question: "Tengo dolor cuando toso",
        options: [
          { value: 81.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 19,
        question: "Toser me agota",
        options: [
          { value: 79.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 20,
        question: "Me falta el aire cuando hablo",
        options: [
          { value: 84.5, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 21,
        question: "Me falta el aire cuando me agacho",
        options: [
          { value: 76.8, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 22,
        question: "La tos o la respiración me molestan cuando duermo",
        options: [
          { value: 87.9, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 23,
        question: "Enseguida me agoto",
        options: [
          { value: 84, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      // section 4
      {
        id: 24,
        titles: [
          "PARTE 2 - SECCIÓN 4",
          "A continuación, algunas preguntas sobre otras consecuencias que sus problemas respiratorios le pueden causar.",
          "Por favor, marque todas las respuestas a cómo está usted en estos días: ",
        ],
        question: "Las tos o la respiración me apenan en público",
        options: [
          { value: 74.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 25,
        question: "Mis problemas respiratorios son una molestia para mi familia, mis amigos o mis vecinos",
        options: [
          { value: 79.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 26,
        question: "Me asusto o me alarmo cuando no puedo respirar",
        options: [
          { value: 87.7, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 27,
        question: "Siento que no puedo controlar mis problemas respiratorios",
        options: [
          { value: 90.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 28,
        question: "No espero que mis problemas respiratorios mejoren",
        options: [
          { value: 82.3, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 29,
        question: "Por causa de mis problemas respiratorios me he convertido en una persona insegura o inválida",
        options: [
          { value: 89.9, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 30,
        question: "Hacer ejercicio no es seguro para mí",
        options: [
          { value: 75.7, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 31,
        question: "Cualquier cosa que hago me parece que es un esfuerzo excesivo",
        options: [
          { value: 84.5, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
    ],
  },
  // parte 2 - sección 5(impact)-6(actividades)-7(impact)-terminando(impact)
  {
    id: 5,
    title: "Parte 2 - Sección 5-6-7-terminando",
    questions: [
      // section 5
      {
        id: 32,
        titles: ["SECCIÓN 5", "A continuación, algunas preguntas sobre su medicación."],
        question: "Mis medicamentos no me ayudan mucho",
        options: [
          { value: 88.2, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 33,
        question: "Me apena usar mis medicamentos en público",
        options: [
          { value: 53.9, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 34,
        question: "Mis medicamentos me producen efectos desagradables",
        options: [
          { value: 81.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 35,
        question: "Mis medicamentos afectan mucho mi vida",
        options: [
          { value: 70.3, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      // section 6
      {
        id: 36,
        titles: [
          "PARTE 2 - SECCIÓN 6",
          "Estas preguntas se refieren a cómo sus problemas respiratorios pueden afectar sus actividades.",
          "Por favor, marque SI cuando usted cree que una o más partes de cada frase le describen de lo contrario marque NO: ",
        ],
        question: "Me tardo mucho tiempo para lavarme o vestirme",
        options: [
          { value: 74.2, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 37,
        question: "No me puedo bañar o, me tardo mucho tiempo",
        options: [
          { value: 81, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 38,
        question: "Camino más despacio que los demás o, tengo que parar a descansar",
        options: [
          { value: 71.7, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 39,
        question: "Tardo mucho para hacer trabajos como las tareas domésticas o, tengo que parar a descansar",
        options: [
          { value: 70.6, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 40,
        question: "Para subir un tramo de escaleras, tengo que ir más despacio o parar",
        options: [
          { value: 71.6, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 41,
        question: "Si corro o camino rápido, tengo que parar o ir más despacio",
        options: [
          { value: 72.3, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 42,
        question:
          "Mis problemas respiratorios me dificultan hacer cosas tales como, caminar de subida, cargar cosas subiendo escaleras, caminar durante un buen rato, arreglar un poco el jardín, bailar o jugar boliche",
        options: [
          { value: 74.5, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 43,
        question:
          "Mis problemas respiratorios me dificultan hacer cosas tales como, llevar cosas pesadas, caminar a unos 7 kilómetros por hora, trotar, nadar, jugar tenis, escarbar en el jardín o en el campo",
        options: [
          { value: 71.4, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 44,
        question:
          "Mis problemas respiratorios me dificultan hacer cosas tales como, un trabajo manual muy pesado, correr, ir en bicicleta, nadar rápido o practicar deportes de competencia",
        options: [
          { value: 63.5, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      // section 7
      {
        id: 45,
        titles: [
          "PARTE 2 - SECCIÓN 7",
          "Nos gustaría saber ahora cómo sus problemas respiratorios afectan normalmente su vida diaria.",
          "Por favor, marque 'SI' si aplica la frase a usted debido a sus problemas respiratorios: ",
        ],
        question: "No puedo hacer deportes o jugar",
        options: [
          { value: 64.8, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 46,
        question: "No puedo salir a distraerme O divertirme",
        options: [
          { value: 79.8, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 47,
        question: "No puedo salir de casa para ir de compras",
        options: [
          { value: 81, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 48,
        question: "No puedo hacer el trabajo de la casa",
        options: [
          { value: 79.1, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      {
        id: 49,
        question: "No puedo alejarme mucho de la cama o la silla",
        options: [
          { value: 94, label: "Si" },
          { value: 0, label: "No" },
        ],
      },
      // Terminando
      {
        id: 50,
        titles: [
          "TERMINANDO",
          "A continuación, hay una lista de otras actividades que sus problemas respiratorios pueden impedirle hacer (no tiene que marcarlas, sólo son para recordarle la manera cómo sus problemas respiratorios pueden afectarle)",
          "- Ir a pasear o sacar al perro.",
          "- Hacer cosas en la casa o en el jardín.",
          "- Tener relaciones sexuales.",
          "- Ir a la iglesia o a un lugar de distracción.",
          "- Salir cuando hace mal tiempo o estar en habitaciones llenas de humo.",
          "- Visitar a la familia o a los amigos, o jugar con los niños.",
        ],
        question:
          "A continuación ¿Podría marcar sólo una frase que usted crea que describe mejor cómo le afectan sus problemas respiratorios?",
        options: [
          {
            value: 0,
            label: "No me impiden hacer nada de lo que me gustaría hacer",
          },
          {
            value: 42,
            label: "Me impiden hacer una o dos cosas de las que me gustaría hacer",
          },
          {
            value: 84.2,
            label: "Me impiden hacer la mayoría de las cosas que me gustaría hacer",
          },
          {
            value: 96.7,
            label: "Me impiden hacer todo lo que me gustaría hacer",
          },
        ],
      },
    ],
  },
];

const QuestionnaireScreen = ({ navigation, route }) => {
  const { SECTIONArrayNumber, selectedAnswers } = route.params;
  const section = SECTIONS[SECTIONArrayNumber];
  const isTheLastSection = SECTIONArrayNumber === SECTIONS.length - 1;
  const [answers, setAnswers] = useState([...selectedAnswers] || Array(section.questions.length).fill(404));
  const [fullNameAndId, setFullNameAndId] = useState("");

  const handleSelect = (questionId, value) => {
    const newAnswers = [...answers];
    newAnswers[questionId - 1] = value;
    setAnswers(newAnswers);
  };

  const handleNextSection = async () => {
    if (answers.includes(404)) {
      Alert.alert("Tienes que responder todas las preguntas para continuar");
    } else if (isTheLastSection) {
      if (fullNameAndId.length > 6) {
        const QuestionnaireDate = new Date().toLocaleDateString();
        const [sintomas, actividades, impacto, total] = [
          plusArray(answers.slice(0, 8)),
          plusArray([...answers.slice(10, 17), ...answers.slice(35, 44)]),
          plusArray([...answers.slice(8, 10), ...answers.slice(17, 35), ...answers.slice(44, 50)]),
          plusArray(answers),
        ];

        const data = {
          fullNameAndId,
          QuestionnaireDate,
          sintomas,
          sintomasPercentage: (sintomas * 100) / 662.5,
          actividades,
          actividadesPercentage: (actividades * 100) / 1209.1,
          impacto,
          impactoPercentage: (impacto * 100) / 2117.8,
          total,
          totalPercentage: (total * 100) / 3989.2,
        };

        try {
          const value = await AsyncStorage.getItem("results");
          let results = [];
          if (value) {
            results = JSON.parse(value);
          }
          results.unshift(data);
          await AsyncStorage.setItem("results", JSON.stringify(results));
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert("Tienes que introducir tu nombre, apellido y DNI para continuar");
      }
    } else {
      const nextSectionQuestions = Array(SECTIONS[SECTIONArrayNumber + 1].questions.length).fill(404);
      const selectedAnswers = [...answers, ...nextSectionQuestions];
      navigation.push("Questionnaire", {
        SECTIONArrayNumber: SECTIONArrayNumber + 1,
        selectedAnswers,
      });
    }
  };

  const plusArray = (array) => array.reduce((a, b) => a + b, 0);

  const renderTitlesQuestionOptions = ({ item: question }) => (
    <TitlesQuestionOptions
      key={question.id}
      titles={question?.titles}
      question={question.question}
      options={question.options}
      onSelect={(value) => handleSelect(question.id, value)}
    />
  );

  const [position] = useState(new Animated.Value(0));

  const animatePositionFocus = () => {
    Animated.timing(position, {
      toValue: -320,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animatePositionBlur = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.backgroundPage}>
      <Animated.View style={Platform.OS === "ios" && { transform: [{ translateY: position }] }}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 16 }}
          data={section.questions}
          keyExtractor={(item) => item.id.toString()}
          removeClippedSubviews={false}
          renderItem={renderTitlesQuestionOptions}
          ListFooterComponent={
            isTheLastSection ? (
              <>
                <View style={styles.containerPink}>
                  <Text style={styles.textInContainerPink}>
                    Introduzca su nombre, apellido y DNI en el siguiente campo para poder identificar sus resultados.
                  </Text>
                </View>

                <TextInput
                  multiline={true}
                  numberOfLines={null}
                  onBlur={animatePositionBlur}
                  onChangeText={(text) => setFullNameAndId(text)}
                  onFocus={animatePositionFocus}
                  placeholder="Escriba su nombre, apellido y DNI."
                  placeholderTextColor={"rgb(100, 100, 100)"}
                  style={styles.input}
                  value={fullNameAndId}
                />

                <ButtonSimple
                  onPress={handleNextSection}
                  text="Terminar"
                />
              </>
            ) : (
              <ButtonNext onPress={handleNextSection} />
            )
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  backgroundPage: {
    backgroundColor: "rgb(40, 80, 125)",
  },
  containerPink: {
    backgroundColor: "rgb(200, 0, 150)",
    borderRadius: 8,
    marginVertical: 8,
    padding: 8,
  },
  textInContainerPink: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "rgb(255, 255, 255)",
    color: "rgb(0, 0, 0)",
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
