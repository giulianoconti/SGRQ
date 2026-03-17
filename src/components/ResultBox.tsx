import React, { memo, useState, useRef, useCallback } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PercentageItem } from "./PercentageItem";
import { InfoRow } from "./InfoRow";
import { colors } from "../constants/theme";
import type { StoredResult } from "../types/result";

const DETAIL_HEIGHT = 216;

interface ResultBoxProps {
  result: StoredResult;
  onDelete: (fullNameAndId: string) => void;
}

export const ResultBox = memo(function ResultBox({ result, onDelete }: ResultBoxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const height = useRef(new Animated.Value(0)).current;

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => {
      Animated.timing(height, {
        toValue: prev ? 0 : DETAIL_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start();
      return !prev;
    });
  }, [height]);

  const handleDelete = useCallback(() => {
    onDelete(result.fullNameAndId);
  }, [onDelete, result.fullNameAndId]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textDate}>{result.QuestionnaireDate}</Text>
        <Text style={styles.textFullName}>{result.fullNameAndId}</Text>
        <View style={styles.containerDelete}>
          <Pressable onPress={handleDelete}>
            <AntDesign color={colors.white} name="delete" size={20} />
          </Pressable>
        </View>
      </View>
      <View style={styles.p8}>
        <View style={styles.flexCol}>
          <PercentageItem title="SÍNTOMAS" percentage={result.sintomasPercentage.toFixed(0)} />
          <PercentageItem
            title="ACTIVIDADES"
            percentage={result.actividadesPercentage.toFixed(0)}
          />
          <PercentageItem title="IMPACTO" percentage={result.impactoPercentage.toFixed(0)} />
          <PercentageItem title="TOTAL" percentage={result.totalPercentage.toFixed(0)} />
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
          <InfoRow label="- FECHA:" value={result.QuestionnaireDate} />
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
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.header,
    borderRadius: 8,
    marginTop: 16,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textDate: {
    color: colors.white,
    fontSize: 16,
    marginLeft: 4,
  },
  textFullName: {
    color: colors.white,
    flex: 1,
    flexWrap: "wrap",
    fontSize: 16,
    paddingHorizontal: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  containerDelete: {
    backgroundColor: colors.red,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 26,
    padding: 2,
  },
  p8: {
    padding: 8,
  },
  flexCol: {
    flexDirection: "column",
  },
  touchableContainer: {
    alignItems: "center",
    paddingBottom: 8,
  },
  touchableText: {
    borderColor: colors.white,
    borderWidth: 1,
    color: colors.white,
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
