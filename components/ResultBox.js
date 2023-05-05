import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PercentageItem } from "./PercentageItem";
import { InfoRow } from "./InfoRow";

export const ResultBox = ({ result, handleDeleteResult }) => {
  const [isVisible, setIsVisible] = useState(false);
  const height = useRef(new Animated.Value(0)).current;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    Animated.timing(height, {
      toValue: isVisible ? 0 : 216,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textDate}>{result.QuestionnaireDate}</Text>
        <Text style={styles.textFullName}>{result.fullNameAndId}</Text>
        <View style={styles.containerDelete}>
          <TouchableWithoutFeedback onPress={() => handleDeleteResult(result.fullNameAndId)}>
            <AntDesign
              color="rgb(255, 255, 255)"
              name="delete"
              size={20}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.p_8}>
        <View style={styles.flex_col}>
          <PercentageItem
            title="SÍNTOMAS"
            percentage={result.sintomasPercentage.toFixed(0)}
          />
          <PercentageItem
            title="ACTIVIDADES"
            percentage={result.actividadesPercentage.toFixed(0)}
          />
          <PercentageItem
            title="IMPACTO"
            percentage={result.impactoPercentage.toFixed(0)}
          />
          <PercentageItem
            title="TOTAL"
            percentage={result.totalPercentage.toFixed(0)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={toggleVisibility}>
        <View style={styles.touchableContainer}>
          <Text style={[styles.touchableText, { width: isVisible ? "100%" : "auto" }]}>
            {isVisible ? "Ocultar detalles" : "Mostrar detalles"}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.extraInfoContainer}>
        <Animated.View style={{ height, justifyContent: "space-between" }}>
          <InfoRow
            label="- FECHA:"
            value={result.QuestionnaireDate}
          />
          <InfoRow
            label="- PACIENTE:"
            value={result.fullNameAndId}
            extraStyles={{ marginBottom: 8 }}
          />
          <InfoRow
            label="- SÍNTOMAS:"
            value={result.sintomas.toFixed(1)}
            totalValue="662.5"
            percentage={result.sintomasPercentage.toFixed(0)}
          />
          <InfoRow
            label="- ACTIVIDADES:"
            value={result.actividades.toFixed(1)}
            totalValue="1209.1"
            percentage={result.actividadesPercentage.toFixed(0)}
          />
          <InfoRow
            label="- IMPACTO:"
            value={result.impacto.toFixed(1)}
            totalValue="2117.8"
            percentage={result.impactoPercentage.toFixed(0)}
          />
          <InfoRow
            label="- TOTAL:"
            value={result.total.toFixed(1)}
            totalValue="3989.4"
            percentage={result.totalPercentage.toFixed(0)}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(50, 110, 210)",
    borderRadius: 8,
    marginTop: 16,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDate: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    marginLeft: 4,
  },
  textFullName: {
    color: "rgb(255, 255, 255)",
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  containerDelete: {
    backgroundColor: "rgb(255, 0 ,0)",
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 26,
    padding: 2,
  },
  p_8: {
    padding: 8,
  },
  flex_col: {
    flexDirection: "column",
  },
  touchableContainer: {
    alignItems: "center",
    paddingBottom: 8,
  },
  touchableText: {
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 1,
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: "center",
  },
  extraInfoContainer: {
    overflow: "hidden",
    paddingBottom: 8,
  },
});
