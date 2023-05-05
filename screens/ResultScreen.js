import { View, Text, Alert, SafeAreaView, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ResultBox } from "../components/ResultBox";

const ResultScreen = () => {
  const [resultsArray, setResultsArray] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("results").then((value) => {
      if (value) {
        console.log(value);
        const results = JSON.parse(value);
        setResultsArray(results);
      } else {
        console.log("No hay resultados");
      }
    });
  }, []);

  const handleDeleteResult = (fullNameAndId) => {
    const filteredResults = resultsArray.filter((result) => result.fullNameAndId !== fullNameAndId);
    confirmAction("Advertencia", `¿Quieres borrar los resultados de ${fullNameAndId}?`, async () => {
      setResultsArray(filteredResults);
      await AsyncStorage.setItem("results", JSON.stringify(filteredResults));
    });
  };

  const confirmAction = (title, message, onConfirm) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Borrar",
          onPress: onConfirm,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "rgb(40, 80, 125)", flex: 1 }}>
      <View style={{ backgroundColor: "rgb(50, 110, 210)", padding: 8 }}>
        <Text style={{ color: "rgb(255, 255, 255)", fontSize: 30, textAlign: "center" }}>Resultados</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={resultsArray}
        keyExtractor={(item) => item.fullNameAndId}
        renderItem={({ item }) => (
          <ResultBox
            key={item.fullNameAndId}
            result={item}
            handleDeleteResult={handleDeleteResult}
          />
        )}
        ListEmptyComponent={() => (
          <View style={{ backgroundColor: "rgb(50, 110, 210)", marginVertical: 16, padding: 8 }}>
            <Text style={{ color: "rgb(255, 255, 255)", fontSize: 20, textAlign: "center" }}>No hay resultados</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ResultScreen;
